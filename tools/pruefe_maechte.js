'use strict';
// Gezielte Funktionsregressionen; kein Balance- oder Spaßnachweis.
const assert = require('node:assert/strict');
const sim = require('./sim');
let failed = 0;
function test(name, fn) {
  try { fn(); console.log('GRUEN ' + name); }
  catch (e) { failed++; console.error('ROT   ' + name + ': ' + e.message); }
}
function start(main='wirbel') {
  const s = sim.start({search:'?perf=1&god=1'});
  // Vorhandener Spielstand mit freigeschalteten Hauptmaechten; der Startpfad bleibt echt.
  s.G(`for(const id of ACTIVE_IDS){ save.unlocks['ability:'+id]=true;
    const p=BLUEPRINT_PROJECTS['ability:'+id]; if(p) save.meta[p]=1; }
    save.startMaechte.slot1=${JSON.stringify(main)};`);
  s.G('resetGame(); enemies=[]; player.x=0; player.y=0;');
  return s;
}
function pick(s, id, kind='neu') {
  s.G(`state='auslese'; waehleAuslese(${JSON.stringify({id,kind})}); finishCombatResume();`);
}
const target = `(x,y=0,hp=10000)=>Object.assign(makeEnemy('soldat'),{x,y,hp,maxHp:hp,speed:0,radius:5})`;
test('Fuenf Hauptmaechte: Start und Partnerausschluss', () => {
  for(const id of ['wirbel','stoss','bombe','nova','sog']){
    const s=start(id);
    assert.equal(s.G('activeSlot1'),id);
    assert.equal(s.G('ausleseTopf().length'),13);
    assert.ok(s.G('!ausleseTopf().some(k=>k.id===ausleseAusschluss())'));
  }
});
test('Wurf: Hinweg am Umkehrpunkt, Rueckweg separat', () => {
  const s=start(); pick(s,'energieklingenwurf');
  s.G(`enemies=[(${target})(320)]; starteWurf(); wurfCd=9999; wurfklinge.x=310; wurfklinge.dist=310; updateBangers(20);`);
  assert.equal(s.G('wurfklinge.hin.length'),1);
  assert.equal(s.G('wurfklinge.zurueck.length'),0);
  s.G('updateBangers(20)');
  assert.equal(s.G('wurfklinge.zurueck.length'),1);
});
test('Wurf: streifender Segmenttreffer und letzter Rueckflug', () => {
  const s=start(); pick(s,'energieklingenwurf');
  s.G(`enemies=[(${target})(13,20)]; starteWurf(); wurfCd=9999; wurfklinge.dirX=1; wurfklinge.dirY=0; updateBangers(50);`);
  assert.ok(s.G('enemies[0].hp<10000'),'Treffer zwischen Frames fehlt');
  s.G(`enemies=[(${target})(5)]; wurfklinge.x=25; wurfklinge.y=0; wurfklinge.phase='zurueck'; updateBangers(50);`);
  assert.ok(s.G('enemies[0].hp<10000'),'Andockframe trifft nicht');
  assert.equal(s.G('wurfklinge'),null);
});
test('Arsenal: verschiedene Startziele', () => {
  const s=start(); pick(s,'splitter');
  s.G(`enemies=[(${target})(150),(${target})(-150)]; telekinetischesArsenal();`);
  assert.equal(s.G('pShots.length'),s.G('new Set(pShots.map(p=>p.zielRef)).size'));
});
test('Phaser: nahe Ziele zuerst, Fusion am letzten Treffer', () => {
  const s=start(); pick(s,'phaser');
  s.G(`enemies=[300,220,140,60].map(x=>(${target})(x)); starteMachtblitz(); phaserCd=9999; updateBangers(16);`);
  assert.ok(s.G('enemies[3].hp<10000'),'Naechstes Ziel durch Arrayreihenfolge uebersprungen');
  assert.equal(s.G('enemies[0].hp'),10000);
  assert.equal(s.G('machtblitze[0].lastHit.x'),220);
  assert.equal(s.G('kartenEvoWellen.length'),0,'Explosion ohne Fusion');
});
test('Echo: gleiche Bewegung bei 30 und 120 FPS', () => {
  function position(dt) {
    const s=start(); pick(s,'macht_echo');
    s.G('spielerPfad=Array.from({length:40},(_,i)=>({x:i*10,y:0})); starteMachtEcho(); machtEcho.phase="lauf"; echoCd=9999;');
    for(let t=0;t<200-.01;t+=dt) s.G(`updateBangers(${dt})`);
    return s.G('machtEcho ? machtEcho.idx : 40');
  }
  assert.ok(Math.abs(position(1000/30)-position(1000/120))<.001);
});
test('Arsenal: tote Koerper verbrauchen kein Geschoss', () => {
  const s=start();
  s.G(`enemies=[(${target})(200,0,0),(${target})(210)];
    pShots=[{x:200,y:0,vx:0,vy:0,dmg:25,life:1,hitsLeft:1}]; update(1);`);
  assert.ok(s.G('enemies.some(e=>e.hp===9975) || pShots.length===1'));
});
test('Machtgriff: Boss ohne Stun, verschwundenes Ziel sicher', () => {
  const s=start(); pick(s,'machtgriff');
  s.G(`enemies=[Object.assign((${target})(200),{type:'boss'})]; starteMachtgriff(); machtgriffCd=9999; updateBangers(900);`);
  assert.ok(s.G('enemies[0].hp<10000 && !enemies[0].stunT'));
  s.G('starteMachtgriff(); enemies=[]; updateBangers(16);');
  assert.equal(s.G('machtgriffAktiv'),null);
});
test('Jaeger: begrenzte Warnfenster, feste Richtung, Erholung', () => {
  const s=start();
  s.G(`enemies=Array.from({length:6},(_,i)=>Object.assign(makeEnemy('jaeger'),{
    x:140*Math.cos(i),y:140*Math.sin(i),hp:10000,maxHp:10000,speed:0,jagdPhase:'laden'}));
    update(16); globalThis.j=enemies.find(e=>e.chargeT>0); globalThis.aim=[j.aimX,j.aimY];`);
  assert.equal(s.G('enemies.filter(e=>e.chargeT>0).length'),2);
  s.G('player.x=20; update(16)');
  assert.equal(s.G('JSON.stringify([j.aimX,j.aimY])'),s.G('JSON.stringify(aim)'));
  for(let i=0;i<17;i++) s.G('update(50)');
  assert.equal(s.G('j.jagdPhase'),'erholung');
  assert.ok(s.G('j.jaegerErholT>0'));
});
test('Alle Karten: beide Raenge, Rezepttexte, Zeichnen, Pause, Reset', () => {
  const s=start();
  const ids=s.G('[...PASSIVE_IDS,...Object.keys(AUSLESE_MODULE)]');
  for(const id of ids) {
    pick(s,id); assert.equal(s.G(`kartenRang('${id}')`),1,id+' I');
    pick(s,id,'verstaerkt'); assert.equal(s.G(`kartenRang('${id}')`),2,id+' II');
    s.G(`kartenRezeptText('${id}')`);
  }
  s.G(`enemies=Array.from({length:12},(_,i)=>(${target})(140*Math.cos(i),140*Math.sin(i)));`);
  for(let i=0;i<600;i++){ s.step(); if(i%60===0) s.G('__drawEcht()'); }
  s.G('pauseGame()');
  const snapshot='JSON.stringify([kwelleCd,ketteCd,arsenalCd,singCd,machtgriffCd,wurfCd,echoCd,spielerPfad,machtEcho,wurfklinge,singularities])';
  const before=s.G(snapshot); s.step(120); assert.equal(s.G(snapshot),before);
  s.G('resetGame()');
  assert.ok(s.G('!machtEcho && !wurfklinge && !machtgriffAktiv && !spielerPfad.length && !singularities.length'));
});
test('Alle sechs Fusionen: echte Auswahl und erhaltene Zutatenwirkung', () => {
  const probe=start(), recipes=probe.G('KARTEN_EVOLUTIONEN');
  for(const [id,e] of Object.entries(recipes)) {
    // Pro Rezept eine Hauptmacht ohne gesperrte Zutat.
    const main=['wirbel','stoss','bombe','nova','sog'].find(a=>{
      const p=start(a); return !e.zutaten.includes(p.G('ausleseAusschluss()'));
    });
    const s=start(main);
    for(const z of e.zutaten) pick(s,z);
    pick(s,e.zutaten[0],'verstaerkt');
    assert.ok(s.G(`kartenEvoBereit('${id}')`),id);
    s.G(`state='auslese'; waehleAuslese({id:'${id}',evolution:true}); finishCombatResume(); __drawEcht();`);
    for(const z of e.zutaten) assert.ok(s.G(`kartenVerschmolzen('${z}')`),z);
    for(const z of e.zutaten) assert.equal(s.G(`AUSLESE_MODULE['${z}'] ? modulRang('${z}') : abilityLevel('${z}')`),s.G(`AUSLESE_MODULE['${z}'] ? 2 : SPRUNG_STUFE`),z);
  }
});
test('Save v11: Werte erhalten, Migration idempotent', () => {
  const s=start();
  s.G(`globalThis.alt=JSON.parse(JSON.stringify(DEFAULT_SAVE)); alt.v=11; alt.stars=4321; alt.best={normal:30}; alt.unlocks={'ability:nova':true,'module:funkenkranz':true}; alt.meta={helfer:2}; delete alt.kampagne; globalThis.neu=migrateSave(JSON.parse(JSON.stringify(alt)));`);
  assert.equal(s.G('neu.v'),13); assert.equal(s.G('neu.stars'),4321);
  assert.equal(s.G('JSON.stringify(neu.best)'),s.G('JSON.stringify(alt.best)'));
  assert.equal(s.G('JSON.stringify(neu.meta)'),s.G('JSON.stringify(alt.meta)'));
  assert.ok(s.G('neu.unlocks["ability:nova"]'));
  // v12→v13 additiv: Kampagnenfeld entsteht, Funkenkranz-Rest verschwindet.
  assert.ok(s.G('neu.kampagne && typeof neu.kampagne.planeten==="object"'));
  assert.equal(s.G('neu.kampagne.introGesehen'),false);
  assert.ok(!s.G('neu.unlocks["module:funkenkranz"]'));
  assert.equal(s.G('JSON.stringify(migrateSave(JSON.parse(JSON.stringify(neu))))'),s.G('JSON.stringify(neu)'));
});
test('Save v12→v13: befreite Planeten bleiben erhalten', () => {
  const s=start();
  s.G(`globalThis.alt12=JSON.parse(JSON.stringify(DEFAULT_SAVE)); alt12.v=12; alt12.stars=999; alt12.kampagne={planeten:{eos:'befreit'},introGesehen:true}; globalThis.neu12=migrateSave(JSON.parse(JSON.stringify(alt12)));`);
  assert.equal(s.G('neu12.v'),13);
  assert.equal(s.G('neu12.stars'),999);
  assert.equal(s.G('neu12.kampagne.planeten.eos'),'befreit');
  assert.equal(s.G('neu12.kampagne.introGesehen'),true);
  assert.equal(s.G('JSON.stringify(migrateSave(JSON.parse(JSON.stringify(neu12))))'),s.G('JSON.stringify(neu12)'));
});
process.exitCode=failed?1:0;
