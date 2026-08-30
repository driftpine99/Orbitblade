'use strict';
/* Regressionsanker für Schwierigkeitsstufen.
   Misst Druck bei fester Welle über ein festes Zeitfenster, ohne Tod. Nicht die
   Schwelle bis zum Spielertod, sondern der objektive Gegendruck bei verschiedenen
   Hilfsstufen.

   Gemessen werden für jede Kombination aus Stufe (entdecker/standard/meister) und
   Welle (8,14,19,26) über fünf Startwerte [101,202,303,404,505], je 30 Sekunden:
   - Schaden erlitten je Sekunde
   - Kills je Sekunde
   - Schaden je Kill (Verhältnis: das Hauptmaß für Druckvergleich)
   - Gegner gleichzeitig (Mittelwert)

   Aufruf: node tools/anker.js */

const { start, makeOrbitBot } = require('./sim.js');

const STUFEN = ['entdecker', 'standard', 'meister'];
// Warum "Schaden je Kill" und nicht "Schaden/s": Meister bekommt Panzergegner ab
// Welle 5 (HILFEN.meister.panzerAb), Standard erst ab Welle 12. Panzer sind zaeh
// (145 statt 60 Leben) und langsam (86 statt 138 px/s) — sie senken die Kills UND
// den erlittenen Schaden. Nur das Verhaeltnis beider Groessen zeigt die Haerte.
const WELLEN = [8, 14, 19, 26];  // Nur normale Wellen (keine Bosswellen wave%5===0)
const STARTWERTE = [101, 202, 303, 404, 505];
const FRAMES_30S = 1800;  // 30 sekunden * 60 fps

// Bosswellen messen einen einzelnen Boss statt Wellendruck und gehoeren nicht in
// diesen Anker. Sicherheit: Abbruch mit klarer Fehlermeldung.
for (const welle of WELLEN) {
  if (welle % 5 === 0) {
    console.error(`FEHLER: Welle ${welle} ist eine Bosswelle (wave%5===0). Messung bricht ab.`);
    process.exit(1);
  }
}

// Fortschritt im Terminal
let kombinationCount = 0;
const totalKombinationen = STUFEN.length * WELLEN.length * STARTWERTE.length;

function messeKombination(stufe, welle, startwert) {
  kombinationCount++;
  process.stderr.write(`\r[${kombinationCount}/${totalKombinationen}] ${stufe.padEnd(10)} W${welle} seed=${startwert}...`);

  const api = start({ search: '?perf=1' });

  // Überschreibe renderSkillTree, damit requestAnimationFrame nicht blockiert
  api.G('renderSkillTree=function(){};');

  // Setze Hilfsstufe VOR resetGame, weil hilfe() save.hilfe liest
  api.G('save.hilfe="' + stufe + '";');
  api.G('resetGame()');

  // Setze Seed NACH resetGame
  api.G('setzeLaufSeed(' + startwert + ');');

  // Starte Lauf in der Zielwelle
  api.G(`state="playing";
wave=${welle};
enemies=[];
shots=[];
orbs=[];
if(typeof enemyShots!=="undefined") enemyShots=[];
if(typeof bossHazards!=="undefined") bossHazards=[];
startWave();`);

  // Hook auf hurtPlayer zum Zählen von Schaden
  api.G(`globalThis.__schaden=0;
hurtPlayer=(function(f){
  return function(d){
    const v=player.hp;
    const r=f(d);
    globalThis.__schaden+=Math.max(0,v-player.hp);
    return r;
  };
})(hurtPlayer);`);

  // Hook auf killEnemy zum Zählen von Kills
  api.G(`globalThis.__kills=0;
killEnemy=(function(f){
  return function(){
    f.apply(null,arguments);
    globalThis.__kills++;
  };
})(killEnemy);`);

  // Bot erzeugen
  const bot = makeOrbitBot(api, { tempoFaktor: 1.0 });

  // Gegner zählen: alle 10 Frames abtasten
  api.G('globalThis.__gegnerSumme=0; globalThis.__gegnerAnzahl=0;');
  // Tode zählen (wie oft der Spieler ohne Reparatur gestorben wäre)
  api.G('globalThis.__tode=0;');

  // 1800 Frames laufen lassen
  let gelaufen = 0;  // Tatsächlich simulierte Frames
  for (let f = 0; f < FRAMES_30S; f++) {
    // Tote Zustände abfangen
    const state = api.G('state');
    if (state === 'auslese') {
      api.G('if(ausleseKarten && ausleseKarten.length) waehleAuslese(ausleseKarten[0]); else schliesseAuslese();');
      continue;
    }
    if (state === 'countdown') {
      api.G('finishCombatResume();');
      continue;
    }

    // Simulationsschritt
    bot(1/60);
    api.step(1);
    gelaufen++;

    // Zustand UND Leben wiederherstellen: Der Spieler darf getroffen werden (sonst
    // zählt hurtPlayer nichts), aber der Lauf darf nicht enden — wir messen Druck,
    // keine Todesschwelle.
    api.G('if(state!=="playing") { state="playing"; globalThis.__tode++; } player.hp=player.maxHp;');
    const nachher = api.G('state');

    // Notfall-Abbruch: Wenn sich der Zustand nicht reparieren lässt
    if (nachher !== 'playing') {
      break;
    }

    // Alle 10 Frames Gegner zählen
    if ((f % 10) === 0) {
      api.G('globalThis.__gegnerSumme+=enemies.length; globalThis.__gegnerAnzahl++;');
    }
  }

  // Ergebnisse auslesen
  const schaden = api.G('globalThis.__schaden || 0');
  const kills = api.G('globalThis.__kills || 0');
  const gegnerMittel = api.G('(globalThis.__gegnerAnzahl > 0) ? (globalThis.__gegnerSumme / globalThis.__gegnerAnzahl) : 0');
  const tode = api.G('globalThis.__tode || 0');

  const sekunden = gelaufen / 60.0;
  const schadeneS = sekunden > 0 ? schaden / sekunden : 0;
  const killsS = sekunden > 0 ? kills / sekunden : 0;
  // Verhaeltnis: Schaden je Kill (nur wenn Kills > 0)
  const schadeneKill = killsS > 0.001 ? schadeneS / killsS : 0;

  return { schaden: schadeneS, kills: killsS, schadeneKill, gegner: gegnerMittel, tode };
}

// Sammle Ergebnisse: results[welle][stufe] = [{schaden, kills, schadeneKill, gegner, tode}, ...]
const results = {};
for (const welle of WELLEN) {
  results[welle] = {};
  for (const stufe of STUFEN) {
    results[welle][stufe] = [];
  }
}

// Hauptschleife
for (const welle of WELLEN) {
  for (const stufe of STUFEN) {
    for (const startwert of STARTWERTE) {
      const messung = messeKombination(stufe, welle, startwert);
      results[welle][stufe].push(messung);
    }
  }
}

process.stderr.write('\n\n');

// Formatierungshilfe
function fmt(zahl, genauheit = 2) {
  return zahl.toFixed(genauheit);
}

function berechneStats(werte) {
  const n = werte.length;
  if (n === 0) return { mean: 0, se: 0 };
  const mean = werte.reduce((a, b) => a + b, 0) / n;
  const variance = werte.reduce((a, x) => a + (x - mean) ** 2, 0) / (n - 1);
  const sd = Math.sqrt(variance);
  const se = sd / Math.sqrt(n);
  return { mean, se };
}

console.log('='.repeat(100));
console.log('REGRESSIONSANKER – Schwierigkeitsstufen');
console.log('Datum: ' + new Date().toISOString());
console.log('Messung: Druck (Schaden je Kill) bei fester Welle, 30 s, ohne Tod');
console.log('Je Stufe/Welle: 5 Startwerte [101,202,303,404,505]');
console.log('='.repeat(100));
console.log();

const pruefungen = {};

for (const welle of WELLEN) {
  console.log('Welle ' + welle);
  console.log('-'.repeat(130));
  console.log('Stufe      | Schaden/s           | Kills/s             | Schaden/Kill        | Gegner gleichzeitig | Tode');
  console.log('-'.repeat(130));

  pruefungen[welle] = true;
  let vorherigSchadenJeKill = -Infinity;

  for (const stufe of STUFEN) {
    const messungen = results[welle][stufe];

    const schadenWerte = messungen.map(m => m.schaden);
    const killsWerte = messungen.map(m => m.kills);
    const schadeneKillWerte = messungen.map(m => m.schadeneKill);
    const gegnerWerte = messungen.map(m => m.gegner);
    const todeWerte = messungen.map(m => m.tode);

    const schadenStats = berechneStats(schadenWerte);
    const killsStats = berechneStats(killsWerte);
    // Schaden je Kill: die Verhältnisse pro Startwert bereits berechnet, jetzt mitteln
    const schadeneKillStats = berechneStats(schadeneKillWerte);
    const gegnerStats = berechneStats(gegnerWerte);
    const todeSumme = todeWerte.reduce((a, b) => a + b, 0);

    const zeile =
      stufe.padEnd(10) + ' | ' +
      (fmt(schadenStats.mean, 2) + ' ±' + fmt(schadenStats.se, 2)).padEnd(19) + ' | ' +
      (fmt(killsStats.mean, 2) + ' ±' + fmt(killsStats.se, 2)).padEnd(19) + ' | ' +
      (fmt(schadeneKillStats.mean, 2) + ' ±' + fmt(schadeneKillStats.se, 2)).padEnd(19) + ' | ' +
      (fmt(gegnerStats.mean, 1) + ' ±' + fmt(gegnerStats.se, 1)).padEnd(19) + ' | ' +
      todeSumme;

    console.log(zeile);

    // Prüfe Monotonie über Schaden je Kill: entdecker < standard < meister
    if (schadeneKillStats.mean < vorherigSchadenJeKill) {
      pruefungen[welle] = false;
    }
    vorherigSchadenJeKill = schadeneKillStats.mean;
  }

  console.log();
}

console.log('='.repeat(100));
console.log('PRÜFUNG – Monotonie (Schaden/Kill sollte monoton steigen: entdecker < standard < meister)');
console.log('-'.repeat(100));

let allesOk = true;
for (const welle of WELLEN) {
  const status = pruefungen[welle] ? 'OK' : 'VERLETZT';
  console.log('Welle ' + welle + ': ' + status);
  if (!pruefungen[welle]) allesOk = false;
}

console.log('-'.repeat(100));
console.log('Gesamt: ' + (allesOk ? 'OK' : 'VERLETZT'));
console.log('='.repeat(100));
