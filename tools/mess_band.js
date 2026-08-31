'use strict';
/* tools/mess_band.js — Entscheidungsgrundlage fuer den Innenrand (Schritt 3).
   node tools/mess_band.js [--sekunden=30] [--wiederholungen=3]

   FRAGE
   Der Innenrand soll Gegner nach aussen druecken, statt sie nur nicht zu treffen.
   Ein einziger konstanter Schub kann das Feld nicht bedienen: Gegnertempi reichen
   von 86 (Panzer) bis 180 px/s (Drohne), der Spieler laeuft 175. Zu schwach, und
   die Drohne klebt im toten Loch. Stark genug fuer die Drohne, und Panzer
   erreichen den Spieler nie mehr.

   AUFBAU
   Je Gegnertyp ein eigener Lauf mit nur diesem Typ, damit die Zahlen sauber
   einem Tempo zuzuordnen sind. Der Spieler wird vom Orbitbot bewegt. Der
   Abstossmechanismus laeuft als Nachbearbeitung nach jedem Bild — das bildet
   einen Regler ab, der im Spiel jedes Bild einmal greift.

   GEMESSEN WIRD ZENTRUM ZU ZENTRUM, ABER HUELLENBEZOGEN
   Alle Schwellen tragen den Gegnerradius, genau wie Trefferpruefung und
   Kontaktschaden es heute schon tun:
     Kontakt      d < player.radius + en.radius + 4
     Innenrand    d < player.radius + BAND_INNEN + en.radius
     Aussenrand   d < player.radius + BAND_AUSSEN + en.radius
   Dadurch ist das Band fuer jeden Gegner gleich breit.

   BEWERTET WIRD
     totzone%   Zeitanteil innerhalb des Innenrands — soll klein sein
     band%      Zeitanteil im Band — soll gross sein
     Tiefe px   mittlere Eindringtiefe unter dem Innenrand
     max px     tiefste erreichte Stelle
     Kontakt%   Zeitanteil im Kontaktabstand — darf nicht fuer alle auf null
                fallen, sonst gibt es keinen Nahkampf mehr. Geometrisch
                gemessen, nicht ueber hurtPlayer: sonst zaehlen Projektile mit.
*/

const sim = require('./sim.js');

const args = process.argv.slice(2);
const zahl = (name, vorgabe) => {
  const t = args.find(a => a.startsWith('--' + name + '='));
  return t ? Number(t.slice(name.length + 3)) : vorgabe;
};
const SEKUNDEN = zahl('sekunden', 30);
const WIEDERHOLUNGEN = zahl('wiederholungen', 3);
const nurArg = (args.find(a => a.startsWith('--nur=')) || '').slice(6);
const NUR = nurArg ? nurArg.split(',') : null;

/* Zielgeometrie aus dem Konzept, huellenbezogen gerechnet:
   Aussenrand 65 ergibt fuer einen Soldaten 18+65+18 = 101 px zum Mittelpunkt,
   Innenrand 20 liegt 16 px oberhalb des Kontaktabstands. Bandbreite 45 px. */
const BAND_INNEN = 20;
const BAND_AUSSEN = 65;

const TYPEN = ['panzer', 'schwer', 'exploder', 'soldat', 'jaeger', 'drohne'];

/* DIE KANDIDATEN — und warum die zwei aus dem Konzept beide scheitern.

   Ein Gegner steht still, wo Schub und Eigentempo sich aufheben. Diese
   Gleichgewichtstiefe entscheidet alles: liegt sie tiefer als der
   Kontaktabstand (16 px unter dem Innenrand), erreicht der Gegner den Spieler,
   sonst nie.

   A  konstant s:            Gleichgewicht bei v > s gar nicht, bei v < s sofort
                             am Rand. Es gibt keinen Wert, der 86 und 180 px/s
                             zugleich bedient — nur ein Umkippen dazwischen.
   B  tiefenproportional k:  Schub = k*tiefe, Gleichgewicht bei tiefe = v/k.
                             Haengt direkt am Tempo. k=5,4 laesst den Panzer
                             gerade an, die Drohne aber 33 px tief einsinken —
                             sie steht dann auf dem Spieler. k=11 sperrt die
                             Drohne bei 16 px aus, den Panzer schon bei 7,6.
   C  rein geschwindigkeits-
      relativ (k>=1):        hebt jede Annaeherung auf. Niemand kommt je durch,
                             also gibt es keinen Nahkampf mehr.

   Die Loesung ist das Produkt statt der Alternative:
   D  Schub = eigenes Tempo * (tiefe / D).
      Gleichgewicht: v = v*(tiefe/D)  ->  tiefe = D, unabhaengig vom Tempo.
      Jeder Gegnertyp sinkt gleich tief ein. D ist damit ein direkt lesbarer
      Regler: D unter 16 sperrt alle aus, D ueber 16 laesst alle an den Spieler.

   Jeder Kandidat bekommt Tiefe, Annaeherung seit dem letzten Bild und das
   Eigentempo des Gegners und liefert den Schub in px fuer dieses Bild. */
const KANDIDATEN = [
  { id: 'aus', name: 'ohne Abstosser', schub: () => 0 },

  { id: 'konst_120', name: 'A  konstant 120 px/s', schub: (o) => 120 * o.dtSek },
  { id: 'konst_200', name: 'A  konstant 200 px/s', schub: (o) => 200 * o.dtSek },

  { id: 'tiefe_6', name: 'B  tiefe x6/s', schub: (o) => o.tiefe * 6 * o.dtSek },
  { id: 'tiefe_11', name: 'B  tiefe x11/s', schub: (o) => o.tiefe * 11 * o.dtSek },

  { id: 'rel_100', name: 'C  relativ k=1,0', schub: (o) => o.annaeherung },

  { id: 'norm_10', name: 'D  tempo x tiefe/10', schub: (o) => o.tempo * (o.tiefe / 10) * o.dtSek },
  { id: 'norm_16', name: 'D  tempo x tiefe/16', schub: (o) => o.tempo * (o.tiefe / 16) * o.dtSek },
  { id: 'norm_20', name: 'D  tempo x tiefe/20', schub: (o) => o.tempo * (o.tiefe / 20) * o.dtSek },
  { id: 'norm_24', name: 'D  tempo x tiefe/24', schub: (o) => o.tempo * (o.tiefe / 24) * o.dtSek },
];

function lauf(typ, kandidat, seed) {
  const api = sim.start({ search: '?perf=1' });
  // Eigene Uhr, damit Effektfenster nicht mit der echten Zeit davonlaufen.
  let jetzt = 1000000;
  const DT = 1000 / 60;
  api.ctx.performance = { now: () => jetzt };
  api.G('Date.now=()=>1800000000000+performance.now();'
    + 'let bandRng=' + seed + ';'
    + 'Math.random=()=>{bandRng=(Math.imul(bandRng,1664525)+1013904223)>>>0;return bandRng/4294967296;};');
  api.step(1, jetzt - api.time);
  api.G('resetGame(); setzeLaufSeed(' + seed + '); wave=14; lastTime=performance.now();');

  // Unsterblich, damit der Lauf nicht abbricht. Kontakt wird NICHT ueber
  // hurtPlayer gezaehlt: das zaehlt auch Jaeger-Projektile mit, die mit dem
  // Innenrand nichts zu tun haben. Kontakt wird unten geometrisch bestimmt.
  api.G('hurtPlayer=function(){ return false; };');

  // Nur der gefragte Gegnertyp, in fester Zahl, ohne Nachschub aus der Welle.
  api.G('enemies=[]; waveEnemiesToSpawn=0; waveSpawned=0; state="playing";'
    + '(function(){ for(var i=0;i<10;i++){ var en=makeEnemy("' + typ + '");'
    + ' en.hp=1e9; en.maxHp=1e9; enemies.push(en); } })()');

  const bot = sim.makeOrbitBot(api, { tempoFaktor: 1 });
  const frames = SEKUNDEN * 60;
  const dtSek = 1 / 60;
  let inTotzone = 0, inBand = 0, ausserhalb = 0, proben = 0;
  let tiefeSumme = 0, tiefeProben = 0, maxTiefe = 0, imKontakt = 0;
  const vorherD = new Map();

  for (let i = 0; i < frames; i++) {
    bot(dtSek);
    jetzt += DT;
    api.step(1);

    // Zustand lesen, Abstosser anwenden, Zustand zurueckschreiben.
    const zustand = api.G('(function(){ return { px:player.x, py:player.y, pr:player.radius,'
      + ' e: enemies.map(function(en,i){ return { i:i, x:en.x, y:en.y, r:en.radius, v:en.speed }; }) }; })()');
    const schuebe = [];
    for (const en of zustand.e) {
      const dx = en.x - zustand.px, dy = en.y - zustand.py;
      const d = Math.hypot(dx, dy) || 1e-6;
      const innen = zustand.pr + BAND_INNEN + en.r;
      const aussen = zustand.pr + BAND_AUSSEN + en.r;

      proben++;
      if (d < zustand.pr + en.r + 4) imKontakt++;          // genau die Bedingung des Kontaktschadens
      if (d < innen) {
        inTotzone++;
        const t = innen - d;
        tiefeSumme += t; tiefeProben++;
        if (t > maxTiefe) maxTiefe = t;
      } else if (d < aussen) inBand++;
      else ausserhalb++;

      const frueher = vorherD.has(en.i) ? vorherD.get(en.i) : d;
      const annaeherung = Math.max(0, frueher - d);   // px, die er seit dem letzten Bild gutgemacht hat
      vorherD.set(en.i, d);

      if (d >= innen) continue;
      const s = kandidat.schub({ tiefe: innen - d, annaeherung, dtSek, tempo: en.v });
      if (s <= 0) continue;
      // Nie ueber den Innenrand hinausschieben: der Abstosser stellt zurueck ins
      // Band, er schleudert nicht aus der Reichweite.
      const ziel = Math.min(d + s, innen);
      schuebe.push([en.i, zustand.px + dx / d * ziel, zustand.py + dy / d * ziel]);
    }
    if (schuebe.length) {
      api.G('(function(l){ for(var k=0;k<l.length;k++){ var e=enemies[l[k][0]];'
        + ' if(e){ e.x=l[k][1]; e.y=l[k][2]; } } })(' + JSON.stringify(schuebe) + ')');
    }
  }

  return {
    // Anteil der Zeit NAHE am Spieler, die innerhalb des Innenrands verbracht wird.
    // Das ist die eigentliche Kennzahl: der Rest ist Anmarsch und sagt nichts.
    innenAnteil: (inTotzone + inBand) ? inTotzone / (inTotzone + inBand) * 100 : 0,
    band: inBand / proben * 100,
    tiefe: tiefeProben ? tiefeSumme / tiefeProben : 0,
    maxTiefe,
    kontakt: imKontakt / proben * 100,
  };
}

function median(werte) {
  const s = werte.slice().sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

console.log('Innenrand ' + BAND_INNEN + ', Aussenrand ' + BAND_AUSSEN
  + ' (huellenbezogen, Bandbreite ' + (BAND_AUSSEN - BAND_INNEN) + ' px)');
console.log(SEKUNDEN + ' s je Lauf, ' + WIEDERHOLUNGEN + ' Wiederholungen, 10 Gegner je Typ, Welle 14\n');

const tempo = { panzer: 86, schwer: 95, exploder: 132, soldat: 138, jaeger: 165, drohne: 180 };

for (const kandidat of KANDIDATEN) {
  if (NUR && NUR.indexOf(kandidat.id) < 0) continue;
  console.log(kandidat.name);
  console.log('  Typ       Tempo   innen%   Tiefe px   max px   Kontakt%');
  for (const typ of TYPEN) {
    const laeufe = [];
    for (let w = 0; w < WIEDERHOLUNGEN; w++) laeufe.push(lauf(typ, kandidat, 20260831 + w * 7919));
    const innen = median(laeufe.map(l => l.innenAnteil));
    const tiefe = median(laeufe.map(l => l.tiefe));
    const mx = median(laeufe.map(l => l.maxTiefe));
    const kon = median(laeufe.map(l => l.kontakt));
    console.log('  ' + typ.padEnd(9) + String(tempo[typ]).padStart(4)
      + innen.toFixed(1).padStart(9) + tiefe.toFixed(1).padStart(11)
      + mx.toFixed(1).padStart(9) + kon.toFixed(2).padStart(11));
  }
  console.log('');
}
