'use strict';
/* tools/pruefe.js — Ebene 1: vier maschinelle Regeln.
   Ein Befehl, gruen oder rot:  node tools/pruefe.js

   Jede Regel steht gegen genau einen Fehler, der schon einmal bis zum Spieler
   durchgerutscht ist. Sie ersetzen keine Balance- und keine Gefuehlspruefung.

     1  Ereignisbudget     gegen den Dauerstrom (Phaser feuerte ~20-mal je Sekunde)
     2  Textinvarianten    gegen Texte, die entfernte Mechanik erklaeren
     3  Auslieferung       gegen den Stand, der das Geraet nie erreicht
     4  Zustandsinvariante gegen Knoepfe, die nur scheinbar versteckt sind

   Optionen:  --nur=1,4     nur diese Regeln
              --kalibrieren gemessene Hoechstwerte zeigen, statt sie zu bewerten
*/

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const sim = require('./sim.js');

const WURZEL = path.join(__dirname, '..');
const P = (...t) => path.join(WURZEL, ...t);
const lies = f => fs.readFileSync(P(f), 'utf8');

const argv = process.argv.slice(2);
const nurArg = (argv.find(a => a.startsWith('--nur=')) || '').slice(6);
const NUR = nurArg ? nurArg.split(',').map(Number) : null;
const KALIBRIEREN = argv.includes('--kalibrieren');

/* ------------------------------------------------------------------ */
/* Regel 1 — Ereignisbudget                                            */
/* ------------------------------------------------------------------ */

/* Ab etwa acht Ausloesungen je Sekunde liest ein Mensch keine Ereignisse mehr,
   sondern einen Strom. Genau das war der Befund am alten Phaser. Die Grenze ist
   bewusst grosszuegig: die heutigen Banger liegen bei 1,2 bis 2,75 je Sekunde. */
const EREIGNIS_GRENZE = 8;
const EREIGNIS_FUNKTIONEN = [
  ['machtblitzEinschlag', 'Machtblitz'],
  ['plasmaEinschlag', 'Plasmabombe'],
  ['feuereSplitterfaecher', 'Splitterfaecher'],
  ['triggerDurchschlag', 'Orbitkrone-Durchschlag'],
  ['kartenEvoWelle', 'Karten-Evolutionswelle'],
];

/* Gleichzeitige Objekte je Liste — der zweite Wall gegen Effekte, die sich
   stapeln statt zu feuern. Die Ratenregel oben bleibt der Hauptwall; eine
   Menge faellt erst auf, wenn Objekte lange liegenbleiben.
   Kalibriert am 31.08.2026 aus vier Laeufen (--kalibrieren), rund das
   Zweieinhalbfache des dort gemessenen Hoechstwerts:
     eigeneSchuesse 6-10 · felder 1-4 · kartenWellen 0-5 · machtblitze 5
     plasmabomben 2 · schuesse 2-6 · splitter 7 · partikel 232-338 · zahlen 36
   Partikel und Zahlen stehen so schon als Deckel in CONFIG. */
const MENGEN_BUDGET = {
  schuesse: 60, eigeneSchuesse: 40, bomben: 12, felder: 20, echos: 20,
  splitter: 30, kartenWellen: 20, machtblitze: 10, plasmabomben: 6,
  partikel: 360, zahlen: 40,
};

function stressLauf(sekunden) {
  // Spaeter Einstieg nach CLAUDE.md 6.4: dichte regulaere Welle, volles Budget.
  const api = sim.start({ search: '?perf=1&god=1&wave=26&pts=15' });
  api.G('resetGame()');

  // Moeglichst viele Karten auf Rang 2 — ein Effekt allein sagt nichts ueber Gedraenge.
  api.G([
    '(function(){',
    "  var ids = Object.keys(AUSLESE_MODULE).map(function(id){ return {id:id, kind:'modul'}; })",
    "    .concat(PASSIVE_IDS.map(function(id){ return {id:id, kind:'passive'}; }));",
    '  for (var runde = 0; runde < 2; runde++) {',
    '    for (var i = 0; i < ids.length; i++) {',
    '      try {',
    "        state = 'auslese';",
    "        waehleAuslese({ id: ids[i].id, kind: runde ? 'verstaerkt' : 'neu' });",
    '      } catch (e) { /* eine gesperrte Karte ist kein Fehler des Pruefstands */ }',
    '    }',
    '  }',
    "  state = 'playing';",
    '})()',
  ].join('\n'));

  for (const [fn, name] of EREIGNIS_FUNKTIONEN) {
    if (!api.G('typeof ' + fn + " === 'function'")) continue;
    const key = JSON.stringify(name);
    api.G([
      'globalThis.__ez = globalThis.__ez || {};',
      'globalThis.__ez[' + key + '] = 0;',
      fn + ' = (function(f){ return function(){',
      '  globalThis.__ez[' + key + ']++; return f.apply(null, arguments); }; })(' + fn + ');',
    ].join('\n'));
  }

  const bot = sim.makeOrbitBot(api, { tempoFaktor: 1 });
  const max = {};
  let spielFrames = 0;
  // Gemessen wird nur, was im Kampf passiert. Overlays sind keine Spielzeit —
  // und ein Pruefstand, der in der Auslese haengenbleibt, misst sonst Nullen.
  while (spielFrames < sekunden * 60) {
    const st = api.G('state');
    if (st === 'sieg' || st === 'gameover') break;
    if (st === 'auslese') {
      // Bei vollem Kartenfeld hat die Auslese nichts mehr anzubieten.
      if (api.G('!!(ausleseKarten && ausleseKarten.length)')) api.G('waehleAuslese(ausleseKarten[0])');
      else api.G("schliesseAuslese('')");
    } else if (st === 'countdown') {
      api.G('finishCombatResume()');
    } else {
      bot(1 / 60);
      spielFrames++;
    }
    api.step(1);
    if (api.G('state') !== 'playing') continue;
    const m = api.G('perfMengenJetzt()');
    for (const k of Object.keys(m)) max[k] = Math.max(max[k] || 0, m[k]);
  }
  const ez = api.G('globalThis.__ez || {}');
  const raten = {};
  const kampfSekunden = Math.max(1, spielFrames / 60);
  for (const k of Object.keys(ez)) raten[k] = ez[k] / kampfSekunden;
  // Welche Effekte sollten ueberhaupt feuern? Nur so faellt auf, wenn der
  // Pruefstand gar nichts ausgeloest hat und deshalb faelschlich gruen zeigt.
  const erwartet = [];
  if (api.G("isCarried('phaser')")) erwartet.push('Machtblitz');
  if (api.G("modulRang('brandspur')>0")) erwartet.push('Plasmabombe');
  return { max, raten, ereignisse: ez, erwartet, kampfSekunden };
}

function regel1() {
  const zeilen = [];
  let ok = true;
  const lauf = stressLauf(30);
  const max = lauf.max, raten = lauf.raten;

  if (KALIBRIEREN) {
    zeilen.push('gemessene Hoechstwerte (' + lauf.kampfSekunden.toFixed(0)
      + ' s Kampf, Welle 26, volles Kartenfeld):');
    for (const k of Object.keys(max).sort()) zeilen.push('  ' + k.padEnd(16) + max[k]);
    zeilen.push('gemessene Raten je Sekunde:');
    for (const k of Object.keys(raten).sort()) zeilen.push('  ' + k.padEnd(24) + raten[k].toFixed(2));
    return { ok: true, zeilen };
  }

  // Ein Pruefstand, der nichts ausloest, darf nicht gruen leuchten.
  for (const name of lauf.erwartet) {
    if (!(lauf.ereignisse[name] > 0)) {
      ok = false;
      zeilen.push('Pruefstand untauglich: ' + name
        + ' ist ausgeruestet, hat aber in ' + lauf.kampfSekunden.toFixed(0)
        + ' s Kampf kein einziges Mal ausgeloest');
    }
  }

  for (const name of Object.keys(raten)) {
    const rate = raten[name];
    if (rate > EREIGNIS_GRENZE) {
      ok = false;
      zeilen.push('Dauerstrom: ' + name + ' loest ' + rate.toFixed(1)
        + '-mal je Sekunde aus (Grenze ' + EREIGNIS_GRENZE + ')');
    }
  }
  for (const liste of Object.keys(MENGEN_BUDGET)) {
    const gemessen = max[liste];
    if (gemessen === undefined) continue;
    if (gemessen > MENGEN_BUDGET[liste]) {
      ok = false;
      zeilen.push('Gedraenge: ' + liste + ' erreicht ' + gemessen
        + ' gleichzeitige Objekte (Budget ' + MENGEN_BUDGET[liste] + ')');
    }
  }
  if (ok) {
    const spitze = Object.keys(raten).map(k => [k, raten[k]]).sort((a, b) => b[1] - a[1])[0];
    zeilen.push(spitze
      ? 'hoechste Rate ' + spitze[0] + ' ' + spitze[1].toFixed(2) + '/s, alle Mengen im Budget'
      : 'keine getakteten Effekte im Lauf, alle Mengen im Budget');
  }
  return { ok, zeilen };
}

/* ------------------------------------------------------------------ */
/* Regel 2 — Textinvarianten                                           */
/* ------------------------------------------------------------------ */

/* Begriffe, die im sichtbaren Text nichts mehr verloren haben, mit dem Grund.
   Neue Zeile eintragen, sobald eine Mechanik verschwindet. */
const VERBOTENE_BEGRIFFE = [
  [/F[äa]higkeitenbaum|Skillbaum|Talentbaum/i, 'Der Faehigkeitenbaum ist entfernt'],
  [/Tippe\s+oben\s+rechts/i, 'Verweist auf den entfernten Baum-Knopf'],
  [/zweite[rn]?\s+Macht|zweiten\s+Macht|andere[rn]?\s+Macht|beide[rn]?\s+M[äa]chte|zweiten\s+Slot/i,
    'Es gibt nur noch einen aktiven Knopf'],
  [/Geschossstrom|Dauerfeuer|Brandmal/i, 'Phaser und Brandspur sind Machtblitz und Plasmabombe'],
];

/* Zeichenketten aus game.js holen, ohne Kommentare mitzunehmen: ein Kommentar
   darf eine alte Mechanik sehr wohl erklaeren, ein Spielertext nicht. */
function stringLiterale(quelltext) {
  const raus = [];
  let i = 0, zeile = 1;
  const n = quelltext.length;
  while (i < n) {
    const c = quelltext[i];
    if (c === '\n') { zeile++; i++; continue; }
    if (c === '/' && quelltext[i + 1] === '/') {
      while (i < n && quelltext[i] !== '\n') i++;
      continue;
    }
    if (c === '/' && quelltext[i + 1] === '*') {
      i += 2;
      while (i < n && !(quelltext[i] === '*' && quelltext[i + 1] === '/')) {
        if (quelltext[i] === '\n') zeile++;
        i++;
      }
      i += 2;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') {
      const start = zeile, ende = c, istVorlage = c === '`';
      let text = '';
      i++;
      while (i < n && quelltext[i] !== ende) {
        if (quelltext[i] === '\\') { text += quelltext[i + 1] || ''; i += 2; continue; }
        // ${...} in einer Vorlage ist Code, kein Spielertext. Ohne diese Zeile
        // meldete die Regel jedes p.slot2 im Ausdruck als sichtbaren Text.
        if (istVorlage && quelltext[i] === '$' && quelltext[i + 1] === '{') {
          let tiefe = 1;
          i += 2;
          while (i < n && tiefe > 0) {
            if (quelltext[i] === '{') tiefe++;
            else if (quelltext[i] === '}') tiefe--;
            else if (quelltext[i] === '\n') zeile++;
            i++;
          }
          text += ' ';
          continue;
        }
        if (quelltext[i] === '\n') zeile++;
        text += quelltext[i]; i++;
      }
      i++;
      raus.push({ text: text, zeile: start });
      continue;
    }
    i++;
  }
  return raus;
}

/* Aus index.html alles, was ein Mensch lesen kann: Textknoten und die
   Attribute, die als Text erscheinen. */
function sichtbarerHtmlText(html) {
  const raus = [];
  const zeilenVon = pos => html.slice(0, pos).split('\n').length;
  const ohneKopf = html.replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, m => m.replace(/[^\n]/g, ' '));
  const re = />([^<]+)</g;
  let m;
  while ((m = re.exec(ohneKopf))) {
    const t = m[1].trim();
    if (t) raus.push({ text: t, zeile: zeilenVon(m.index) });
  }
  const attrRe = /\b(title|placeholder|aria-label|alt|value)\s*=\s*"([^"]*)"/gi;
  while ((m = attrRe.exec(html))) {
    if (m[2].trim()) raus.push({ text: m[2], zeile: zeilenVon(m.index) });
  }
  return raus;
}

function regel2() {
  const zeilen = [];
  let ok = true;
  const quellen = [
    ['konzept/index.html', sichtbarerHtmlText(lies('konzept/index.html'))],
    ['konzept/game.js', stringLiterale(lies('konzept/game.js'))],
  ];
  let geprueft = 0;
  for (const paar of quellen) {
    const datei = paar[0], stuecke = paar[1];
    for (const s of stuecke) {
      geprueft++;
      for (const regel of VERBOTENE_BEGRIFFE) {
        const treffer = s.text.match(regel[0]);
        if (!treffer) continue;
        ok = false;
        zeilen.push(datei + ':' + s.zeile + '  "' + treffer[0] + '" — ' + regel[1]);
        zeilen.push('    ' + s.text.trim().slice(0, 110));
      }
    }
  }
  if (ok) {
    zeilen.push(geprueft + ' sichtbare Textstellen gegen '
      + VERBOTENE_BEGRIFFE.length + ' Muster geprueft');
  }
  return { ok, zeilen };
}

/* ------------------------------------------------------------------ */
/* Regel 3 — Auslieferungsprobe                                        */
/* ------------------------------------------------------------------ */

function git() {
  try {
    return execFileSync('git', Array.prototype.slice.call(arguments),
      { cwd: WURZEL, encoding: 'utf8' }).trim();
  } catch (e) { return null; }
}

const AUSGELIEFERT = ['konzept/game.js', 'konzept/style.css'];

function regel3() {
  const zeilen = [];
  let ok = true;
  const html = lies('konzept/index.html');

  // a) Verweist die Seite ueberhaupt mit Kennung auf Skript und Stil?
  const kennungen = Array.from(html.matchAll(/(game\.js|style\.css)\?v=([A-Za-z0-9._-]+)/g));
  const gefunden = new Set(kennungen.map(m => m[1]));
  for (const datei of ['game.js', 'style.css']) {
    if (!gefunden.has(datei)) {
      ok = false;
      zeilen.push('index.html laedt ' + datei
        + ' ohne ?v=-Kennung — der Browser darf beliebig alt ausliefern');
    }
  }
  const werte = new Set(kennungen.map(m => m[2]));
  if (werte.size > 1) {
    ok = false;
    zeilen.push('uneinheitliche Kennungen: ' + Array.from(werte).join(', '));
  }
  const kennung = Array.from(werte)[0];

  // b) Ist ueberhaupt alles committet, was ausgeliefert werden soll?
  const schmutzig = (git('status', '--porcelain', '--',
    AUSGELIEFERT[0], AUSGELIEFERT[1], 'konzept/index.html') || '').split('\n').filter(Boolean);
  if (schmutzig.length) {
    ok = false;
    zeilen.push('nicht committet, erreicht das Geraet also nicht:');
    for (const s of schmutzig) zeilen.push('    ' + s.trim());
  }

  // c) Wurde die Kennung mitgezogen? Der Fehler, der vierzehn Tage gekostet hat:
  //    game.js aenderte sich, die Kennung blieb stehen, die Seite lud den alten Stand.
  if (kennung) {
    const einfuehrung = (git('log', '--format=%H', '-S', kennung, '--', 'konzept/index.html') || '')
      .split('\n').filter(Boolean).pop();
    if (!einfuehrung) {
      zeilen.push('Kennung "' + kennung + '" noch in keinem Commit — vor dem Push mitcommitten');
    } else {
      const spaeter = (git('log', '--oneline', einfuehrung + '..HEAD', '--',
        AUSGELIEFERT[0], AUSGELIEFERT[1]) || '').split('\n').filter(Boolean);
      if (spaeter.length) {
        ok = false;
        zeilen.push('Kennung "' + kennung + '" steht seit ' + spaeter.length
          + ' Commit(s) still, obwohl sich der Code aenderte:');
        for (const s of spaeter.slice(0, 5)) zeilen.push('    ' + s);
        zeilen.push('    Kennung in konzept/index.html hochzaehlen, sonst laedt das Geraet den alten Stand.');
      }
    }
  }

  // d) Ist der Stand auch draussen?
  const lokal = git('rev-parse', 'HEAD');
  const fern = git('rev-parse', 'origin/main');
  if (lokal && fern && lokal !== fern) {
    const vorne = (git('log', '--oneline', 'origin/main..HEAD') || '').split('\n').filter(Boolean);
    if (vorne.length) {
      ok = false;
      zeilen.push(vorne.length + ' Commit(s) noch nicht auf origin/main — GitHub Pages zeigt sie nicht');
    }
  }

  if (ok) zeilen.push('Kennung "' + kennung + '" aktuell, Arbeitsstand committet und gepusht');
  return { ok, zeilen };
}

/* ------------------------------------------------------------------ */
/* Regel 4 — Zustandsinvarianten                                       */
/* ------------------------------------------------------------------ */

/* Eine Klasse zu setzen versteckt nichts. Es gibt in style.css bewusst keine
   allgemeine .hidden-Regel — jedes Element bringt seine eigene mit. Fehlt sie,
   ist der Knopf sichtbar und anklickbar, waehrend der Code ihn fuer versteckt
   haelt. Genau so stand der Wuerfelknopf in einer exklusiven Weiche. */

function versteckendeRegeln(css) {
  const raus = [];
  // Ohne diese Zeile schleppt der Selektor den davorstehenden Kommentar mit,
  // und "#auslese-reroll.hidden" wird nicht wiedererkannt.
  const ohneKommentare = css.replace(/\/\*[\s\S]*?\*\//g, ' ');
  const re = /([^{}]+)\{([^}]*)\}/g;
  let m;
  while ((m = re.exec(ohneKommentare))) {
    if (!/display\s*:\s*none|visibility\s*:\s*hidden/i.test(m[2])) continue;
    for (const sel of m[1].split(',')) {
      const s = sel.trim();
      if (/\.hidden$/.test(s)) raus.push(s);
    }
  }
  return raus;
}

function htmlElemente(html) {
  const raus = new Map();
  const re = /<([a-z0-9]+)\b([^>]*)>/gi;
  let m;
  while ((m = re.exec(html))) {
    const attrs = m[2];
    const idTreffer = attrs.match(/\bid\s*=\s*"([^"]+)"/i);
    if (!idTreffer) continue;
    const klassenTreffer = attrs.match(/\bclass\s*=\s*"([^"]*)"/i);
    const klassen = (klassenTreffer ? klassenTreffer[1] : '').split(/\s+/).filter(Boolean);
    raus.set(idTreffer[1], { tag: m[1].toLowerCase(), klassen: klassen });
  }
  return raus;
}

function wirdVersteckt(id, el, regeln) {
  return regeln.some(sel => {
    const basis = sel.replace(/\.hidden$/, '').trim();
    if (basis === '') return true;                       // allgemeine .hidden-Regel
    if (basis === '#' + id) return true;
    if (basis.charAt(0) === '.') return el.klassen.indexOf(basis.slice(1)) >= 0;
    return basis === el.tag;
  });
}

function regel4() {
  const zeilen = [];
  let ok = true;
  const regeln = versteckendeRegeln(lies('konzept/style.css'));
  const elemente = htmlElemente(lies('konzept/index.html'));

  const api = sim.start({ search: '?perf=1&god=1' });
  api.G('resetGame()');
  const bot = sim.makeOrbitBot(api, { tempoFaktor: 1 });
  const idListe = Array.from(elemente.keys());
  const abfrage = '(' + JSON.stringify(idListe) + ').filter(function(id){'
    + ' var el = document.getElementById(id);'
    + " return el && el.classList && el.classList.contains('hidden'); })";
  const versteckt = new Set();
  const probe = () => { for (const id of api.G(abfrage)) versteckt.add(id); };

  // Zustandsinvariante am bekannten Fall: in einer exklusiven Weiche darf der
  // Wuerfelknopf nicht bedienbar sein — ein Klick verbraucht sonst einen Punkt.
  let weicheGesehen = false;
  probe();
  for (let i = 0; i < 60 * 60 * 8; i++) {
    const st = api.G('state');
    if (st === 'sieg' || st === 'gameover') break;
    if (st === 'auslese') {
      probe();
      if (api.G('!!(ausleseKarten && ausleseKarten[0] && ausleseKarten[0].weiche)')) {
        weicheGesehen = true;
        const r = api.G('(function(){'
          + " var el = document.getElementById('auslese-reroll');"
          + " return { hidden: !!(el && el.classList.contains('hidden')), disabled: !!(el && el.disabled) };"
          + '})()');
        const el = elemente.get('auslese-reroll');
        const cssHilft = el ? wirdVersteckt('auslese-reroll', el, regeln) : false;
        if (!(r.disabled || (r.hidden && cssHilft))) {
          ok = false;
          zeilen.push('Weiche: #auslese-reroll ist bedienbar — ein Klick kostet einen Orbitpunkt'
            + ' (hidden=' + r.hidden + ', disabled=' + r.disabled + ', CSS versteckt=' + cssHilft + ')');
        }
        break;
      }
      api.G('waehleAuslese(ausleseKarten[0])');
    } else if (st === 'countdown') {
      api.G('finishCombatResume()');
    } else {
      bot(1 / 60);
    }
    api.step(1);
  }

  // Jedes tatsaechlich versteckte Element braucht eine CSS-Regel, die es versteckt.
  for (const id of Array.from(versteckt).sort()) {
    const el = elemente.get(id);
    if (!el) continue;
    if (!wirdVersteckt(id, el, regeln)) {
      ok = false;
      zeilen.push('#' + id + " bekommt die Klasse 'hidden', aber keine Regel in style.css versteckt es");
    }
  }

  if (!weicheGesehen) {
    zeilen.push('Hinweis: in acht Minuten kam keine Weiche — der Zustandsfall blieb ungeprueft');
  }
  if (ok) {
    zeilen.push(versteckt.size + ' versteckte Elemente haben eine passende CSS-Regel'
      + (weicheGesehen ? ', Wuerfelknopf in der Weiche gesperrt' : ''));
  }
  return { ok, zeilen };
}

/* ------------------------------------------------------------------ */

const REGELN = [
  [1, 'Ereignisbudget', regel1],
  [2, 'Textinvarianten', regel2],
  [3, 'Auslieferungsprobe', regel3],
  [4, 'Zustandsinvarianten', regel4],
];

let fehler = 0;
console.log('Ebene 1 — vier maschinelle Regeln\n');
for (const eintrag of REGELN) {
  const nr = eintrag[0], name = eintrag[1], fn = eintrag[2];
  if (NUR && NUR.indexOf(nr) < 0) continue;
  let erg;
  const t0 = Date.now();
  try { erg = fn(); }
  catch (e) { erg = { ok: false, zeilen: ['Regel selbst abgestuerzt: ' + e.message] }; }
  const dauer = ((Date.now() - t0) / 1000).toFixed(1);
  if (!erg.ok) fehler++;
  console.log((erg.ok ? 'GRUEN' : 'ROT  ') + '  ' + nr + '  ' + name + '   (' + dauer + 's)');
  for (const z of erg.zeilen) console.log('       ' + z);
  console.log('');
}
console.log(fehler ? fehler + ' Regel(n) rot.' : 'Alle Regeln gruen.');
process.exitCode = fehler ? 1 : 0;
