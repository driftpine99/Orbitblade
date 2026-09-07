'use strict';
/* pruefe_kampagne.js — Phase-1-Regression für die Galaxie-Kampagne (EOS-Slice).
   Prüft die Kartenlogik, die dauerhafte Befreiung über einen ECHTEN Sieg und die
   Semantik der Niederlage. Kein Balance- oder Spaßnachweis.

   Wichtig: Nicht-Perf-Start (sim.start({})) verwenden — nur dann ist messlauf=false
   und sieg() darf den Planeten tatsächlich als befreit vermerken. */
const assert = require('node:assert/strict');
const sim = require('./sim');
let failed = 0;
function test(name, fn){
  try { fn(); console.log('GRUEN ' + name); }
  catch (e) { failed++; console.error('ROT   ' + name + ': ' + (e.message || e)); }
}

test('Frische Galaxie: EOS erreichbar, Rest gesperrt', () => {
  const s = sim.start({});
  s.G('save.kampagne={planeten:{},introGesehen:false};');
  assert.equal(s.G('planetBefreit("eos")'), false);
  assert.equal(s.G('planetStatus(planetById("eos"))'), 'erreichbar');
  assert.equal(s.G('planetStatus(planetById("kryos"))'), 'gesperrt');
  assert.equal(s.G('planetStatus(planetById("nexus1"))'), 'gesperrt');
  assert.equal(s.G('planetErreichbar(planetById("eos"))'), true);
  assert.equal(s.G('planetErreichbar(planetById("kryos"))'), false);
});

test('markiereBefreit: Erstbefreiung, wiederholbar & migrationsfest', () => {
  const s = sim.start({});
  s.G('save.kampagne={planeten:{},introGesehen:false};');
  assert.equal(s.G('markiereBefreit("eos")'), true);    // Erstbefreiung
  assert.equal(s.G('markiereBefreit("eos")'), false);   // schon befreit
  assert.equal(s.G('planetStatus(planetById("eos"))'), 'befreit');
  assert.equal(s.G('planetErreichbar(planetById("eos"))'), true);   // wiederholbar (§26)
  assert.equal(s.G('planetStatus(planetById("kryos"))'), 'erreichbar'); // Route öffnet den nächsten Planeten
  s.G('globalThis.__m=migrateSave(JSON.parse(JSON.stringify(save)));');
  assert.equal(s.G('__m.kampagne.planeten.eos'), 'befreit');
});

test('EOS-Sieg (God) befreit den Planeten dauerhaft', () => {
  const s = sim.start({});
  s.G('save.kampagne={planeten:{},introGesehen:false}; aktiverPlanet="eos";');
  const stat = sim.run(s, { god:true, minutes:20 });
  assert.equal(stat.sieg, true, 'Lauf muss gewonnen werden (God)');
  assert.equal(s.G('save.kampagne.planeten.eos'), 'befreit');
  assert.equal(s.G('planetStatus(planetById("eos"))'), 'befreit');
});

test('EOS-Niederlage lässt den Planeten besetzt', () => {
  const s = sim.start({});
  s.G('save.kampagne={planeten:{},introGesehen:false}; aktiverPlanet="eos";');
  // gameOver() darf NICHTS befreien — der Planet bleibt besetzt (§13.6).
  s.G('state="playing"; wave=7; player.hp=1; gameOver();');
  assert.equal(s.G('save.kampagne.planeten.eos'), undefined);
  assert.equal(s.G('planetStatus(planetById("eos"))'), 'erreichbar');
});

// ---- Phase 2: Heldenkern ----

test('Heldenkern: Kauf verändert die zentralen Werte', () => {
  const s = sim.start({});
  s.G('save.stars=5000; save.kampagne.held={klinge:0,leben:0,macht:0,fokus:0};');
  const macht0=s.G('machtFaktor("wirbel")');
  const fz0=s.G('fokusZiel()');
  const klinge0=s.G('heldKlinge()');
  assert.equal(s.G('kaufeHeld("macht")'), true);
  assert.equal(s.G('kaufeHeld("fokus")'), true);
  assert.equal(s.G('kaufeHeld("klinge")'), true);
  assert.ok(s.G('machtFaktor("wirbel")') > macht0, 'Machtkern erhöht machtFaktor');
  assert.ok(s.G('fokusZiel()') < fz0, 'Fokusleiter senkt das Fokusziel (lädt schneller)');
  assert.ok(s.G('heldKlinge()') > klinge0, 'Klingenreaktor erhöht den Orbit-Faktor');
});

test('Heldenkern: wirkt auf maxHp im echten Lauf', () => {
  const s = sim.start({});
  s.G('save.kampagne.held={klinge:0,leben:0,macht:0,fokus:0}; resetGame();');
  const hpBasis=s.G('player.maxHp');
  s.G('save.kampagne.held.leben=5; resetGame();');
  assert.ok(s.G('player.maxHp') > hpBasis, 'Vitalmatrix erhöht maxHp nach resetGame');
});

test('Heldenkern: Cap bei 5 und Kostenprüfung', () => {
  const s = sim.start({});
  s.G('save.stars=100000; save.kampagne.held={klinge:0,leben:0,macht:0,fokus:0};');
  for(let i=0;i<5;i++) assert.equal(s.G('kaufeHeld("klinge")'), true);
  assert.equal(s.G('heldLevel("klinge")'), 5);
  assert.equal(s.G('kaufeHeld("klinge")'), false);   // am Cap
  s.G('save.stars=0;');
  assert.equal(s.G('kaufeHeld("macht")'), false);     // zu wenig Fragmente
});

test('Heldenkern-Stufen überstehen die Migration', () => {
  const s = sim.start({});
  s.G('save.kampagne.held={klinge:3,leben:2,macht:1,fokus:4}; globalThis.__mh=migrateSave(JSON.parse(JSON.stringify(save)));');
  assert.equal(s.G('__mh.kampagne.held.klinge'), 3);
  assert.equal(s.G('__mh.kampagne.held.fokus'), 4);
});

test('Starterbonus: einmalig, sichert Tier I, kein Exploit', () => {
  const s = sim.start({});
  // Frühe Niederlage mit wenig Fragmenten -> Bonus füllt auf mind. 300 auf
  s.G('save.stars=60; save.kampagne.starterBonusGewaehrt=false; aktiverPlanet="eos"; state="playing"; wave=5; player.hp=1; player.stars=0; gameOver();');
  assert.ok(s.G('save.stars') >= 300, 'nach erster Niederlage ist Tier I leistbar');
  assert.equal(s.G('save.kampagne.starterBonusGewaehrt'), true);
  // Zweiter Lauf: kein weiterer Bonus
  s.G('save.stars=10; aktiverPlanet="eos"; state="playing"; wave=5; player.hp=1; player.stars=0; gameOver();');
  assert.equal(s.G('save.stars'), 10, 'kein wiederholter Starterbonus');
  // Reicher Spieler bekommt nichts geschenkt, Flag wird aber gesetzt
  const s2 = sim.start({});
  s2.G('save.stars=1000; save.kampagne.starterBonusGewaehrt=false;');
  assert.equal(s2.G('gewaehreStarterBonus()'), 0);
  assert.equal(s2.G('save.stars'), 1000);
  assert.equal(s2.G('save.kampagne.starterBonusGewaehrt'), true);
});

// ---- Phase 3: Fragmentökonomie ----

test('Abschlussbonus: Erstbefreiung > Wiederholung > Niederlage', () => {
  const s = sim.start({});
  s.G('aktiverPlanet="eos"; wave=30; kampagneBonusVergeben=false;');
  const win=s.G('kampagneAbschluss(true,true).summe');
  s.G('kampagneBonusVergeben=false;');
  const reclear=s.G('kampagneAbschluss(true,false).summe');
  s.G('kampagneBonusVergeben=false; wave=5;');
  const loss=s.G('kampagneAbschluss(false,false).summe');
  assert.ok(win>reclear, 'Erstbefreiung gibt mehr als Wiederholung');
  assert.ok(reclear>loss, 'Sieg gibt klar mehr als frühe Niederlage');
  assert.ok(loss>0, 'auch die Niederlage sichert etwas Bergung');
});

test('Abschlussbonus nur EINMAL pro Lauf (kein Endlos-Doppel)', () => {
  const s = sim.start({});
  s.G('aktiverPlanet="eos"; wave=30; kampagneBonusVergeben=false;');
  const erst=s.G('kampagneAbschluss(true,true).summe');
  const zweit=s.G('kampagneAbschluss(false,false).summe');
  assert.ok(erst>0);
  assert.equal(zweit,0,'zweiter Abschluss im selben Lauf zahlt nicht');
});

test('Kein Abschlussbonus außerhalb der Kampagne (kein Leak)', () => {
  const s = sim.start({});
  s.G('aktiverPlanet=null; wave=30; kampagneBonusVergeben=false;');
  assert.equal(s.G('kampagneAbschluss(true,true).summe'),0);
});

test('Sieg lohnender als wiederholtes Frühsterben', () => {
  const w = sim.start({}); w.G('save.stars=0; aktiverPlanet="eos";');
  const ws = sim.run(w,{god:true,minutes:20});
  assert.equal(ws.sieg,true);
  const siegKonto=w.G('save.stars');
  let todeKonto=0;
  for(let i=0;i<5;i++){
    const d=sim.start({});
    d.G('save.stars=0; save.kampagne.starterBonusGewaehrt=true; aktiverPlanet="eos";'); // Starter aus, reines Farmen messen
    sim.run(d,{god:false,minutes:20});
    todeKonto+=d.G('save.stars');
  }
  assert.ok(siegKonto>todeKonto, 'ein Sieg bringt mehr als fünf frühe Tode zusammen ('+siegKonto+' vs '+todeKonto+')');
});

// ---- Phase 4: Sektor I vollständig ----

test('Route Sektor I: EOS → KRYOS → VEGA → Kommando', () => {
  const s = sim.start({});
  const st = id => s.G(`planetStatus(planetById(${JSON.stringify(id)}))`);
  s.G('save.kampagne.planeten={};');
  assert.equal(st('eos'),'erreichbar');
  assert.equal(st('kryos'),'gesperrt');
  assert.equal(st('nexus1'),'gesperrt');
  s.G('save.kampagne.planeten={eos:"befreit"};');
  assert.equal(st('kryos'),'erreichbar');
  assert.equal(st('vega'),'gesperrt');
  s.G('save.kampagne.planeten={eos:"befreit",kryos:"befreit"};');
  assert.equal(st('vega'),'erreichbar');
  assert.equal(st('nexus1'),'gesperrt');
  s.G('save.kampagne.planeten={eos:"befreit",kryos:"befreit",vega:"befreit"};');
  assert.equal(st('nexus1'),'erreichbar');
});

test('Planet-Identität: mod nur in der Kampagne aktiv (kein Leak)', () => {
  const s = sim.start({});
  s.G('aktiverPlanet="kryos";');
  assert.ok(s.G('planetMod().panzerChance>0.3'), 'KRYOS erhöht Panzer');
  s.G('aktiverPlanet="vega";');
  assert.ok(s.G('planetMod().jaegerMult>1'), 'VEGA erhöht Jäger');
  s.G('aktiverPlanet=null;');
  assert.equal(s.G('Object.keys(planetMod()).length'), 0, 'kein Leak außerhalb der Kampagne');
});

test('Identität verschiebt die Gegnermischung', () => {
  const s = sim.start({}); s.G('resetGame(); wave=15;');
  const share = (planet,typ) => s.G(`(function(){aktiverPlanet=${JSON.stringify(planet)};let c=0;for(let i=0;i<3000;i++){if(randomEnemyType()===${JSON.stringify(typ)})c++;}return c/3000;})()`);
  assert.ok(share('kryos','panzer') > share(null,'panzer')*1.4, 'KRYOS deutlich mehr Panzer');
  assert.ok(share('vega','jaeger')  > share(null,'jaeger')*1.3, 'VEGA deutlich mehr Jäger');
});

test('Sektorabschluss: Kommando setzt Warpkern, Sektor II bleibt gesperrt', () => {
  const s = sim.start({});
  s.G('save.kampagne.planeten={eos:"befreit",kryos:"befreit",vega:"befreit"}; save.kampagne.warpkerne={}; aktiverPlanet="nexus1";');
  assert.equal(s.G('warpkernErreicht("s1")'), false);
  const st = sim.run(s,{god:true,minutes:20});
  assert.equal(st.sieg, true);
  assert.equal(s.G('warpkernErreicht("s1")'), true);
  assert.equal(s.G('planetStatus(planetById("ionos"))'), 'gesperrt'); // Sektor-II-Content erst Phase 7
});

test('Warpkerne überstehen die Migration', () => {
  const s = sim.start({});
  s.G('save.kampagne.warpkerne={s1:true}; globalThis.__mw=migrateSave(JSON.parse(JSON.stringify(save)));');
  assert.equal(s.G('__mw.kampagne.warpkerne.s1'), true);
});

process.exitCode = failed ? 1 : 0;
