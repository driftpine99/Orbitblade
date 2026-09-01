'use strict';
/* sim.js — Headless-Harness für Orbitblade v5.
   Lädt konzept/game.js mit DOM-, Canvas- und Audio-Stubs in eine VM und treibt
   echte Simulationsschritte. Kein Spielcode wird verändert.

   CLI:  node tools/sim.js [--god] [--wave=N] [--minutes=M] [--endlos]
   Modul: const sim=require('./sim.js'); const s=sim.start({search:''}); ... */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

/* ---------- Stubs ---------- */

function makeCtx() {
  const gradient = { addColorStop() {} };
  const target = {
    measureText: () => ({ width: 10 }),
    createLinearGradient: () => gradient,
    createRadialGradient: () => gradient,
    createPattern: () => null,
    getImageData: (x, y, w, h) => ({ data: new Uint8ClampedArray(Math.max(1,(w|0)*(h|0))*4), width: w|0 || 1, height: h|0 || 1 }),
  };
  return new Proxy(target, {
    get(t, k) {
      if (k === 'canvas') return null;
      if (k in t) return t[k];
      if (typeof t[k] !== 'function') { t[k] = () => undefined; }
      return t[k];
    },
    set(t, k, v) { t[k] = v; return true; },
  });
}
/* Jede Leinwand bekommt ihren EIGENEN Kontext, so wie im Browser. Vorher teilten
   sich alle einen — damit war jede Zwischenleinwand (Hintergrundpuffer, Nebel-
   Vorrat) vom Hauptcanvas ununterscheidbar, und Code, der genau darauf prueft,
   nahm im Harness stets den Notpfad. */

function makeEl(tag) {
  const cls = new Set();
  const style = {
    setProperty() {}, getProperty: () => '', removeProperty() {},
  };
  const el = {
    tagName: String(tag || 'div').toUpperCase(),
    style, dataset: {}, children: [], attributes: {},
    classList: {
      add(...c) { c.forEach(x => cls.add(x)); },
      remove(...c) { c.forEach(x => cls.delete(x)); },
      toggle(c, f) {
        if (f === undefined) { cls.has(c) ? cls.delete(c) : cls.add(c); } else { f ? cls.add(c) : cls.delete(c); }
        return cls.has(c);
      },
      contains: c => cls.has(c),
    },
    setAttribute(k, v) { el.attributes[k] = String(v); el[k] = v; },
    getAttribute(k) { return k in el.attributes ? el.attributes[k] : null; },
    appendChild(c) { el.children.push(c); return c; },
    removeChild(c) { el.children = el.children.filter(x => x !== c); return c; },
    insertBefore(c) { el.children.push(c); return c; },
    remove() {},
    querySelector() { return makeEl('div'); },
    querySelectorAll() { return []; },
    addEventListener() {}, removeEventListener() {},
    focus() {}, blur() {}, click() {},
    getBoundingClientRect() { return { left: 0, top: 0, right: 1280, bottom: 720, width: 1280, height: 720 }; },
    textContent: '', innerHTML: '', value: '', title: '',
    offsetWidth: 100, offsetHeight: 40,
    width: 300, height: 150,
    getContext(kind) {
      if (kind !== '2d') return null;
      if (!el.__ctx) el.__ctx = makeCtx();
      return el.__ctx;
    },
    toDataURL: () => '',
  };
  // Das Spielfeld braucht feste Ausmaße; alle anderen Elemente bekommen dieselben Werte.
  el.clientWidth = 1280; el.clientHeight = 720;
  return el;
}

function makeDocument() {
  const els = new Map();
  return {
    getElementById(id) {
      if (!els.has(id)) els.set(id, id === 'game' ? makeEl('canvas') : makeEl('div'));
      return els.get(id);
    },
    createElement: t => makeEl(t),
    createElementNS: (ns, t) => makeEl(t),
    querySelector() { return makeEl('div'); },
    querySelectorAll() { return []; },
    addEventListener() {}, removeEventListener() {},
    documentElement: { clientWidth: 1280, clientHeight: 720 },
    body: makeEl('body'),
    hidden: false,
  };
}

/* ---------- Start ---------- */

function start(opts = {}) {
  const code = fs.readFileSync(path.join(__dirname, '..', 'konzept', 'game.js'), 'utf8');
  const storage = new Map();
  let rafCb = null;

  const sandbox = {
    console,
    performance,
    document: makeDocument(),
    location: { search: opts.search || '', href: 'http://localhost/' },
    localStorage: {
      getItem: k => (storage.has(k) ? storage.get(k) : null),
      setItem: (k, v) => storage.set(k, String(v)),
      removeItem: k => storage.delete(k),
      clear: () => storage.clear(),
    },
    requestAnimationFrame(cb) { rafCb = cb; return 1; },
    cancelAnimationFrame() { rafCb = null; },
    devicePixelRatio: 1,
    innerWidth: 1280, innerHeight: 720,
    addEventListener() {}, removeEventListener() {},
    dispatchEvent: () => true,
    setTimeout: () => 0, clearTimeout() {}, setInterval: () => 0, clearInterval() {},
    navigator: { userAgent: 'sim', vibrate() {} },
    matchMedia: () => ({ matches: false, addEventListener() {}, addListener() {} }),
  };
  sandbox.window = sandbox;
  sandbox.self = sandbox;
  sandbox.globalThis = sandbox;

  const ctx = vm.createContext(sandbox);
  vm.runInContext(code, ctx, { filename: 'konzept/game.js' });

  let simT = vm.runInContext('performance.now()', ctx);

  const api = {
    ctx: sandbox,
    /** Ausdruck im Spiel-Scope auswerten (sieht auch let/const-Bindungen). */
    G(expr) { return vm.runInContext(expr, ctx); },
    /** Ein Hook auf eine bestehende Funktionsdeklaration legen. */
    hook(fnName, wrapperFactorySrc) {
      return vm.runInContext('(' + wrapperFactorySrc + ')', ctx);
    },
    step(frames = 1, dtMs = 1000 / 60) {
      for (let i = 0; i < frames; i++) {
        simT += dtMs;
        const cb = rafCb; rafCb = null;
        if (!cb) break;
        cb(simT);
      }
    },
    get time() { return simT; },
  };

  // Ein einzelner draw()-Aufruf muss mit den Stubs durchlaufen; danach bleibt er
  // aus Geschwindigkeitsgründen blank, bis jemand ihn wieder freigibt.
  api.G('draw()');
  /* Das echte draw bleibt erreichbar, sonst ist die Zeichenlast headless gar
     nicht messbar — die Zuweisung unten wuerde es sonst endgueltig verwerfen.
     Siehe tools/mess_fuellrate.js. */
  api.G('globalThis.__drawEcht = draw;');
  api.G('draw = function(){};');

  return api;
}

/* ---------- Bot ---------- */

/* Kreisbot mit Ausweichen: hält Klingendistanz zum nächsten Gegner, weicht aber
   einem Gedränge seitlich aus und hält beim Boss mehr Abstand (Schockring).
   „Echter Klingenschaden", wie in CLAUDE.md für Pacing-Messungen gefordert. */
function makeOrbitBot(api, { tempoFaktor = 1.0 } = {}) {
  let winkel = 0;
  let frequenz = 0;
  /* dtSek hat bewusst einen Vorgabewert: Ein Aufruf ohne Argument machte speed
     zu NaN und damit die Spielerposition zu NaN. Der Lauf lief danach weiter,
     aber jede Entfernungsprüfung war falsch — die Messung sah still wie eine
     gültige aus. Ein fehlendes Argument darf keine stille Falschmessung ergeben. */
  return function bot(dtSek = 1 / 60) {
    const p = api.G('player');
    if (!p) return;
    if (!Number.isFinite(dtSek)) throw new Error('makeOrbitBot: dtSek ist ' + dtSek);
    const gegner = api.G('enemies') || [];
    let ziel = null, beste = Infinity;
    for (const en of gegner) {
      if (en.hp <= 0) continue;
      const d = (en.x - p.x) ** 2 + (en.y - p.y) ** 2;
      if (d < beste) { beste = d; ziel = en; }
    }
    const istBoss = ziel && ziel.type === 'boss';
    const radius = istBoss ? 118 : 88;
    const cx = ziel ? ziel.x : p.x, cy = ziel ? ziel.y : p.y;
    winkel += dtSek * 3.0;
    let tx = Math.cos(winkel) * radius, ty = Math.sin(winkel) * radius;
    // Gefahrenausweichen: nahe Gegner drücken den Zielvektor von ihnen weg.
    let ax = 0, ay = 0;
    for (const en of gegner) {
      if (en.hp <= 0 || en === ziel) continue;
      const dx = p.x - en.x, dy = p.y - en.y;
      const d2 = dx * dx + dy * dy;
      if (d2 < 90 * 90 && d2 > 0.01) { const d = Math.sqrt(d2); ax += dx / d * (90 - d); ay += dy / d * (90 - d); }
    }
    // Ziel in Weltkoordinaten relativ zum Orbitzentrum.
    const sx = cx + tx, sy = cy + ty;
    const speed = 175 * tempoFaktor * dtSek;
    let dx = sx - p.x, dy = sy - p.y;
    const dist = Math.hypot(dx, dy) || 1;
    dx /= dist; dy /= dist;
    const alen = Math.hypot(ax, ay);
    if (alen > 1) { ax /= alen / 1.6; ay /= alen / 1.6; }   // Ausweichen gewichtet
    let mx = dx + ax, my = dy + ay;
    const mlen = Math.hypot(mx, my) || 1;
    mx /= mlen; my /= mlen;
    p.x += mx * speed;
    p.y += my * speed;
    // Mächte einsetzen, sobald etwas in Reichweite ist — ein Bot ohne Aktiva
    // verliert deutlich früher als der Referenzbot aus CLAUDE.md.
    if ((frequenz++ & 7) === 0) {
      let nahe = Infinity;
      for (const en of gegner) {
        if (en.hp <= 0) continue;
        const d = Math.hypot(en.x - p.x, en.y - p.y) - (en.radius || 0);
        if (d < nahe) nahe = d;
      }
      if (nahe < 230) api.G('if(state==="playing"){ doActive(1); doActive(2); }');
    }
  };
}

/* ---------- Lauf ---------- */

/** Führt einen vollständigen Lauf aus. Optionen:
    god, minutes (Abbruchgrenze), endlos (nach Sieg weiterspielen bis Tod/Grenze),
    bot (false schaltet ihn ab), botTempo, onWave(wave, state), wave, stopBeiWelle.
    Auslesen werden zufällig gewählt; Wiedereinstiegs-Countdowns werden übersprungen.
    URL-Messschalter werden beim Erzeugen der API über start({search}) gesetzt. */
function run(api, opts = {}) {
  const grenzeFrames = Math.round((opts.minutes ?? 30) * 60 * 60);
  const bot = opts.bot !== false ? makeOrbitBot(api, { tempoFaktor: opts.botTempo ?? 1 }) : null;
  const stat = { wellen: 1, kills: 0, dauerMin: 0, tod: false, sieg: false, abgebrochen: false, endlosWelle: 0, frames: 0 };

  api.G('resetGame()');
  if (opts.wave) {
    // Direkt in eine hohe Welle springen: Laufzustand leeren, damit keine Reste
    // aus Welle 1 übrig bleiben, dann die Zielwelle starten.
    api.G('wave = ' + opts.wave + '; enemies = []; shots = []; orbs = [];'
      + 'if(typeof enemyShots !== "undefined") enemyShots = [];'
      + 'if(typeof bossHazards !== "undefined") bossHazards = [];'
      + 'startWave();');
  }

  // Wellen- und Kill-Hooks: Funktionsdeklarationen sind zuweisbare Bindungen.
  api.G('startWave = (function(f){ return function(){ f(); if(globalThis.__onWave) globalThis.__onWave(wave); }; })(startWave);');
  api.G('killEnemy = (function(f){ return function(){ f.apply(null, arguments); globalThis.__kills = (globalThis.__kills||0)+1; }; })(killEnemy);');
  api.G('globalThis.__onWave = function(w){ globalThis.__lastWave = w; };');

  if (opts.god) {
    // Schon vor dem ersten Bild schützen: Nachheilen nach gameOver() wäre zu spät.
    api.G('if(typeof hurtPlayer === "function" && !hurtPlayer.__simBlank){ hurtPlayer = function(){ return; }; hurtPlayer.__simBlank = true; }');
  }

  let letzteWelle = api.G('typeof wave!=="undefined" ? wave : 1');

  for (let f = 0; f < grenzeFrames; f++) {
    // Beide Auslese-Arten (Karten und Weichen, auch Endlos-Echos) benutzen denselben
    // Zustand. Erst nach dem Öffnen antworten, damit die echte Spiellogik fertig ist.
    api.G(`if(state === 'auslese'){
      if(ausleseKarten.length) waehleAuslese(ausleseKarten[Math.floor(Math.random()*ausleseKarten.length)]);
      else schliesseAuslese();
    }
    if(state === 'countdown') finishCombatResume();`);
    api.step(1);
    stat.frames++;
    const st = api.G('state');
    if (bot && st === 'playing') bot(1 / 60);
    const w = api.G('typeof __lastWave!=="undefined" ? __lastWave : wave');
    if (w > letzteWelle) { if (opts.onWave) opts.onWave(w, st); letzteWelle = w; }
    if (st === 'gameover') { stat.tod = true; break; }
    if (st === 'sieg') {
      stat.sieg = true;
      if (opts.endlos) {
        api.G('startEndlosmodus()');
        stat.endlosWelle = api.G('wave');
      } else break;
    }
    if (opts.stopBeiWelle && api.G('wave') >= opts.stopBeiWelle) { stat.abgebrochen = true; break; }
  }
  stat.wellen = api.G('wave');
  stat.kills = api.G('typeof __kills !== "undefined" ? __kills : 0');
  stat.dauerMin = +(stat.frames / 3600).toFixed(2);
  stat.endstandHp = (() => { const p = api.G('player'); return p ? Math.round(p.hp) : null; })();
  return stat;
}

/* ---------- CLI ---------- */

if (require.main === module) {
  const arg = {};
  for (const a of process.argv.slice(2)) {
    const m = /^--(\w+)(?:=(.*))?$/.exec(a);
    if (m) arg[m[1]] = m[2] === undefined ? true : m[2];
  }
  const api = start({});
  const opts = {
    god: !!arg.god,
    minutes: Number(arg.minutes || 32),
    endlos: !!arg.endlos,
    wave: arg.wave ? Number(arg.wave) : undefined,
    stopBeiWelle: arg.wellestop ? Number(arg.wellestop) : undefined,
    botTempo: Number(arg.tempo || 1),
  };
  const t0 = Date.now();
  const stat = run(api, opts);
  console.log('[sim]', JSON.stringify(stat), '| echt', ((Date.now() - t0) / 1000).toFixed(1) + 's',
    '| hilfe', api.G('hilfeId()'), '| figur', api.G('save.figur'));
}

module.exports = { start, run, makeOrbitBot };
