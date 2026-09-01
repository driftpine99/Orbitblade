'use strict';
/* tools/mess_fuellrate.js — wie viel Flaeche fuellt ein Bild?
   node tools/mess_fuellrate.js [--welle=20] [--sekunden=6]

   WARUM DIESE GROESSE
   Der historische Engpass des Spiels ist laut CLAUDE.md die Fuellrate, nicht die
   Zahl der Zeichenbefehle. Weniger Pfadoperationen beseitigen keine Fuellrate.
   Gemessen wird deshalb die ueberstrichene FLAECHE je Bild, getrennt nach
   Mischmodus: `lighter` (additiv) ist am teuersten, weil jedes Pixel gelesen
   UND geschrieben wird.

   Die Zahl ist ein geraeteunabhaengiger Vergleichswert, keine Millisekunde. Sie
   beantwortet "ist es mehr geworden und wodurch", nicht "wie schnell laeuft es
   auf einem Pixel 9".

   AUFBAU
   sim.js teilt sich das Kontextobjekt mit dem Spiel, deshalb lassen sich seine
   Methoden von aussen mitschreiben. save/restore und scale werden nachgebildet,
   weil die Stubs sie sonst verschlucken und der Mischmodus falsch zugeordnet
   wuerde. Flaechen sind Naeherungen aus dem zuletzt gelegten Pfad.
*/

const sim = require('./sim.js');

const args = process.argv.slice(2);
const zahl = (n, v) => {
  const t = args.find(a => a.startsWith('--' + n + '='));
  return t ? Number(t.slice(n.length + 3)) : v;
};
const WELLE = zahl('welle', 20);
const SEKUNDEN = zahl('sekunden', 6);

const MITSCHRIFT = `(function(){
  globalThis.__mess = { flaeche:{}, aufrufe:{}, bilder:0 };
  var M = globalThis.__mess;
  var compStapel = [], skalaStapel = [];
  var skala = 1;
  var pfadFlaeche = 0, pfadUmfang = 0;
  function comp(){ return ctx.globalCompositeOperation || 'source-over'; }
  M.orte = {};
  M.blur = 0; M.blurFlaeche = 0;
  function buche(art, flaeche){
    var k = comp();
    /* shadowBlur kostet keine Flaeche, sondern einen Weichzeichner je Form —
       in Canvas2D um Groessenordnungen teurer als dieselbe Form ohne. Getrennt
       zaehlen, sonst bleibt der Posten unsichtbar. */
    if(ctx.shadowBlur > 0){ M.blur++; M.blurFlaeche += flaeche; }
    M.flaeche[k] = (M.flaeche[k] || 0) + flaeche;
    M.aufrufe[art] = (M.aufrufe[art] || 0) + 1;
    // Herkunft mitschreiben: ohne sie weiss man, DASS viel gefuellt wird,
    // aber nicht wo. Die dritte Stapelzeile ist der Aufrufer im Spielcode.
    if(flaeche > 0){
      var st = (new Error()).stack.split(String.fromCharCode(10));
      var ort = 'unbekannt';
      for(var i=1;i<st.length;i++){
        if(st[i].indexOf('game.js') >= 0){ ort = st[i].trim().replace(/^at\s+/,''); break; }
      }
      if(!M.orte[ort]) M.orte[ort] = { flaeche:0, n:0, comp:k };
      M.orte[ort].flaeche += flaeche; M.orte[ort].n++;
    }
  }
  ctx.save = function(){ compStapel.push(comp()); skalaStapel.push(skala); };
  ctx.restore = function(){
    if(compStapel.length){ ctx.globalCompositeOperation = compStapel.pop(); skala = skalaStapel.pop(); }
  };
  ctx.scale = function(x){ skala *= Math.abs(x) || 1; };
  ctx.beginPath = function(){ pfadFlaeche = 0; pfadUmfang = 0; };
  ctx.arc = function(x,y,r){ pfadFlaeche += Math.PI*r*r; pfadUmfang += 2*Math.PI*r; };
  ctx.ellipse = function(x,y,rx,ry){ pfadFlaeche += Math.PI*rx*ry; pfadUmfang += Math.PI*(rx+ry); };
  ctx.rect = function(x,y,w,h){ pfadFlaeche += Math.abs(w*h); pfadUmfang += 2*(Math.abs(w)+Math.abs(h)); };
  ctx.roundRect = function(x,y,w,h){ pfadFlaeche += Math.abs(w*h); pfadUmfang += 2*(Math.abs(w)+Math.abs(h)); };
  // Linienzuege: der Umfang genuegt als Naeherung fuer die spaetere Strichflaeche.
  ctx.moveTo = function(x,y){ ctx.__lx = x; ctx.__ly = y; };
  ctx.lineTo = function(x,y){
    var dx = x - (ctx.__lx||0), dy = y - (ctx.__ly||0);
    pfadUmfang += Math.hypot(dx,dy); ctx.__lx = x; ctx.__ly = y;
  };
  ctx.fill = function(){ buche('fill', pfadFlaeche * skala * skala); };
  ctx.stroke = function(){ buche('stroke', pfadUmfang * Math.max(1, ctx.lineWidth||1) * skala * skala); };
  ctx.fillRect = function(x,y,w,h){ buche('fillRect', Math.abs(w*h) * skala * skala); };
  ctx.drawImage = function(bild,a,b,c,d){
    var f = (typeof c === 'number' && typeof d === 'number') ? Math.abs(c*d) : 0;
    buche('drawImage', f * skala * skala);
  };
  ctx.fillText = function(){ buche('fillText', 0); };
  ctx.strokeText = function(){ buche('strokeText', 0); };
})()`;

function lauf(karten, name) {
  const api = sim.start({ search: '?perf=1&god=1&wave=' + WELLE + '&pts=15' });
  let jetzt = 1000000;
  const DT = 1000 / 60;
  api.ctx.performance = { now: () => jetzt };
  api.G('Date.now=()=>1800000000000+performance.now(); let r=20260901;'
    + 'Math.random=()=>{r=(Math.imul(r,1664525)+1013904223)>>>0;return r/4294967296;};');
  api.step(1, jetzt - api.time);
  api.G('resetGame(); setzeLaufSeed(20260901); lastTime=performance.now();');

  for (const k of karten) {
    api.G('state="auslese"; try{ waehleAuslese(' + JSON.stringify(k) + '); }catch(e){}');
  }
  api.G('state="playing"');
  // Ein volles Feld, sonst misst der Prueftstand ein leeres Bild.
  api.G('for(var i=0;i<40;i++) enemies.push(makeEnemy(randomEnemyType()));');

  // Erst jetzt mitschreiben und das echte draw zurueckholen.
  api.G(MITSCHRIFT);
  // Wie oft wird der Nebelvorrat tatsaechlich neu gemalt? Seine Flaeche landet
  // auf einer eigenen Leinwand und taucht in der Mitschrift sonst nicht auf.
  api.G('globalThis.__nebel=0; malNebel=(function(f){return function(){__nebel++;return f.apply(null,arguments);};})(malNebel);');
  api.G('draw = globalThis.__drawEcht;');

  const bot = sim.makeOrbitBot(api, { tempoFaktor: 1 });
  let bilder = 0;
  for (let i = 0; i < SEKUNDEN * 60; i++) {
    const st = api.G('state');
    if (st === 'sieg' || st === 'gameover') break;
    if (st === 'auslese') {
      api.G('if(ausleseKarten&&ausleseKarten.length) waehleAuslese(ausleseKarten[0]); else schliesseAuslese("");');
    } else if (st === 'countdown') {
      api.G('finishCombatResume()');
    } else {
      bot(1 / 60);
      bilder++;
    }
    jetzt += DT;
    api.step(1);
  }

  const m = api.G('__mess');
  const gegner = api.G('enemies.length');
  const nebel = api.G('__nebel') / Math.max(1, bilder);
  const blur = api.G('__mess.blur') / Math.max(1, bilder);
  const blurFlaeche = api.G('__mess.blurFlaeche') / Math.max(1, bilder) / (1280*720);
  const schirm = 1280 * 720;
  const raus = { name, bilder, gegner, nebel, blur, blurFlaeche, schirme: {} };
  for (const k of Object.keys(m.flaeche)) raus.schirme[k] = m.flaeche[k] / Math.max(1, bilder) / schirm;
  raus.aufrufe = {};
  for (const k of Object.keys(m.aufrufe)) raus.aufrufe[k] = m.aufrufe[k] / Math.max(1, bilder);
  raus.orte = Object.keys(m.orte || {})
    .map(k => [k, m.orte[k].flaeche / Math.max(1, bilder) / schirm, m.orte[k].comp, m.orte[k].n / Math.max(1, bilder)])
    .sort((a, b) => b[1] - a[1]).slice(0, 12);
  return raus;
}

const P = id => ({ id, kind: 'neu' });
const P2 = id => ({ id, kind: 'verstaerkt' });

const FAELLE = [
  ['ohne Karten', []],
  ['nur Machtblitz', [P('phaser'), P2('phaser')]],
  ['nur Plasmabombe', [P('brandspur'), P2('brandspur')]],
  ['nur Funkenkranz', [P('funkenkranz'), P2('funkenkranz')]],
  ['nur Splitter', [P('splitter'), P2('splitter')]],
  ['alle sechs Module', ['klingenteilung', 'taktschlag', 'nachfassen', 'glasklinge', 'funkenkranz', 'brandspur']
    .flatMap(id => [P(id), P2(id)])],
  ['voller Build', ['klingenteilung', 'taktschlag', 'nachfassen', 'glasklinge', 'funkenkranz', 'brandspur',
    'kettenblitz', 'konterstoss', 'splitter', 'phaser', 'lebensregen', 'nachhall']
    .flatMap(id => [P(id), P2(id)])],
];

console.log('Ueberstrichene Flaeche je Bild, in Bildschirmen (1280x720), Welle ' + WELLE + '\n');
console.log('Fall'.padEnd(20) + 'Gegner'.padStart(7) + 'additiv'.padStart(10)
  + 'normal'.padStart(9) + 'gesamt'.padStart(9) + '  Nebel/Bild'
  + '  Blur/Bild' + ' BlurFlaeche' + '  Befehle/Bild');
const zeilen = [];
let letzteOrte = null;
for (const [name, karten] of FAELLE) {
  let r;
  try { r = lauf(karten, name); }
  catch (e) { console.log(name.padEnd(20) + '  FEHLER ' + e.message.slice(0, 80)); continue; }
  const add = r.schirme['lighter'] || 0;
  const norm = (r.schirme['source-over'] || 0);
  const rest = Object.keys(r.schirme).filter(k => k !== 'lighter' && k !== 'source-over')
    .reduce((s, k) => s + r.schirme[k], 0);
  const befehle = Object.keys(r.aufrufe).reduce((s, k) => s + r.aufrufe[k], 0);
  zeilen.push([name, add]);
  letzteOrte = r.orte;
  console.log(name.padEnd(20) + String(r.gegner).padStart(7)
    + add.toFixed(2).padStart(10) + (norm + rest).toFixed(2).padStart(9)
    + (add + norm + rest).toFixed(2).padStart(9) + r.nebel.toFixed(2).padStart(12)
    + r.blur.toFixed(1).padStart(11) + r.blurFlaeche.toFixed(2).padStart(12)
    + befehle.toFixed(0).padStart(14));
}
if (letzteOrte) {
  console.log('\nGroesste Flaechenquellen im vollen Build (Bildschirme je Bild):');
  for (const [ort, flaeche, cmp, n] of letzteOrte) {
    console.log('  ' + flaeche.toFixed(2).padStart(7) + '  ' + String(cmp).padEnd(12)
      + n.toFixed(1).padStart(7) + 'x/Bild  ' + ort);
  }
}
const basis = zeilen[0] ? zeilen[0][1] : 0;
console.log('\nAdditive Flaeche gegenueber "ohne Karten":');
for (const [name, add] of zeilen.slice(1)) {
  console.log('  ' + name.padEnd(20) + (basis ? '+' + ((add / basis - 1) * 100).toFixed(0) + ' %' : '-'));
}
