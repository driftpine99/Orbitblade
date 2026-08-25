'use strict';
/* Messung Tageslauf & Wellenereignisse.
   Geprüft wird — bewusst genau — was der Tages-Seed garantieren kann:
   1) Signal identisch über zwei frische Ladevorgänge,
   2) Startkomposition identisch, solange nur der Seed hineinspielt,
   3) Ereignisfolge indexbasiert und damit tempo-unabhängig,
   4) erstes Kartenangebot am selben Tag identisch (Zustand noch leer),
   5) Tageslohn genau einmal pro Tag.
   Vollständige Lauf-Determinismus ist NICHT behauptbar: Kill-Timing verschiebt
   Spawns und damit den reaktiven Strom. Das ist kein Fehler, sondern Design.
   Aufruf: node tools/mess_tageslauf.js */
const { start, makeOrbitBot } = require('./sim.js');

function frisch(){
  const api=start({});
  api.G('resetGame()');
  api.G('randomEnemyType=(function(f){ return function(){ const t=f(); globalThis.__typen=(globalThis.__typen||[]); __typen.push(t); return t; }; })(randomEnemyType);');
  api.G('waehleWellenEreignis=(function(f){ return function(){ f(); if(laufEreignis){ globalThis.__ereignisse=(globalThis.__ereignisse||[]); __ereignisse.push(wave+":"+laufEreignis.id);} }; })(waehleWellenEreignis);');
  api.G('oeffneAuslese=(function(f){ return function(){ f(); try{ const k=(typeof ausleseKarten!=="undefined"&&ausleseKarten)?ausleseKarten:[]; if(k.length){ globalThis.__karten=(globalThis.__karten||[]); __karten.push(k.map(c=>c.id+(c.kind==="verstaerkt"?"+":"-")).join(",")); waehleAuslese(k[0]); } else schliesseAuslese(); if(state==="countdown") state="playing"; }catch(e){} }; })(oeffneAuslese);');
  return api;
}

console.log('== 1) Signal ==');
const sigA=frisch().G('(startTageslauf(), JSON.stringify({figur:laufVorgabe.figur,s1:laufVorgabe.slot1,s2:laufVorgabe.slot2,twist:laufVorgabe.twist.id,regel:laufVorgabe.regel.id}))');
const sigB=frisch().G('(startTageslauf(), JSON.stringify({figur:laufVorgabe.figur,s1:laufVorgabe.slot1,s2:laufVorgabe.slot2,twist:laufVorgabe.twist.id,regel:laufVorgabe.regel.id}))');
console.log(sigA);
console.log('Signal identisch:', sigA===sigB);

console.log('== 2) Startkomposition ==');
function startKomposition(){
  const api=frisch();
  api.G('startTageslauf()');
  // Die ersten 24 Typwürfe direkt nach dem Start hängen nur vom Seed ab.
  for(let i=0;i<24;i++) api.G('randomEnemyType()');
  return api.G('__typen.join(",")');
}
const kompA=startKomposition(), kompB=startKomposition();
console.log('Erste 24 Typwürfe identisch:', kompA===kompB);

console.log('== 3) Ereignisfolge (tempo-unabhängig) ==');
function ereignisFolge(schnell){
  const api=frisch();
  api.G('startTageslauf()');
  const bot=makeOrbitBot(api,{tempoFaktor:schnell?1.6:0.8});
  api.G('hurtPlayer=function(){return;}; hurtPlayer.__simBlank=true;');
  for(let f=0;f<60*60*16;f++){
    api.step(1); bot(1/60);
    if(api.G('state')==='gameover'||api.G('state')==='sieg') break;
    if(api.G('wave')>=27 && api.G('enemies').length===0) break;
  }
  return { ev:api.G('typeof __ereignisse!=="undefined"?__ereignisse.join(","):""'), welle:+api.G('wave') };
}
const folgeA=ereignisFolge(false), folgeB=ereignisFolge(true);
console.log('langsam:', folgeA.ev||'(keine)', '| bis Welle', folgeA.welle);
console.log('schnell:', folgeB.ev||'(keine)', '| bis Welle', folgeB.welle);
const gemeinsameWelle=Math.min(...[folgeA.welle, folgeB.welle].map(w=>Math.floor((w-2)/4)));
console.log('Ereignisfolge identisch bis gemeinsamer Slot:', folgeA.ev===folgeB.ev);

console.log('== 4) Erstes Kartenangebot ==');
function ersteKarten(){
  const api=frisch();
  api.G('startTageslauf()');
  const bot=makeOrbitBot(api,{});
  api.G('hurtPlayer=function(){return;}; hurtPlayer.__simBlank=true;');
  for(let f=0;f<60*60*6;f++){
    api.step(1); bot(1/60);
    if(api.G('typeof __karten!=="undefined"&&__karten.length')) break;
    if(api.G('state')==='gameover') break;
  }
  return api.G('typeof __karten!=="undefined"?__karten.join("|"):"(keine)"');
}
const kA=ersteKarten(), kB=ersteKarten();
console.log('Angebot A:', kA);
console.log('Angebot B:', kB);
console.log('Erstes Angebot identisch:', kA===kB);

console.log('== 5) Tageslohn ==');
{
  const c=frisch(); c.G('startTageslauf()');
  for(let i=0;i<120;i++) c.step(1);
  const vor=c.G('save.stars'), datum=c.G('tagesDatum()');
  c.G('gameOver()');
  const tag=c.G('save.tagesLohnTag');
  console.log('Lohn gezahlt:', c.G('save.stars')-vor===250, '('+vor+'->'+c.G('save.stars')+')', '| Tag gemerkt:', tag===datum);
  // Zweiter Lauf mit demselben gespeicherten Stand darf nicht erneut zahlen.
  const d=frisch();
  d.G('startTageslauf()');
  d.G('save.tagesLohnTag='+JSON.stringify(tag));
  for(let i=0;i<120;i++) d.step(1);
  const v2=d.G('save.stars'); d.G('gameOver()');
  console.log('Zahlung genau einmal:', d.G('save.stars')-v2===0);
}

console.log('== 6) Tagübergreifend & Hilfsstufen-Rückgabe ==');
{
  const x=start({});
  const sig1=x.G('JSON.stringify(tagesSignal("2026-08-25"))');
  const sig2=x.G('JSON.stringify(tagesSignal("2026-08-26"))');
  console.log('Signal an verschiedenen Tagen unterschiedlich:', sig1!==sig2);
  x.G('setzeLaufSeed(tagesSeed("2026-08-25")); const s1=[...Array(8)].map(()=>laufRnd().toFixed(6)).join(",");');
  const stromA=x.G('s1');
  x.G('setzeLaufSeed(tagesSeed("2026-08-26")); const s2=[...Array(8)].map(()=>laufRnd().toFixed(6)).join(",");');
  const stromB=x.G('s2');
  console.log('Zufallsströme verschiedener Tage unterschiedlich:', stromA!==stromB);

  const y=start({});
  y.G('save.hilfe="meister"');
  y.G('startTageslauf()');
  const waehrend=y.G('save.hilfe + "/" + (laufVorgabe?laufVorgabe.figur:"keine")');
  y.G('laufBeenden()');
  console.log('Während Tageslauf standard+Vorgabe:', waehrend==='standard/held'||waehrend.startsWith('standard/'));
  console.log('Nach Ende zurückgegeben:', y.G('save.hilfe')==='meister' && y.G('laufVorgabe')===null);
}
