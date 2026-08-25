'use strict';
/* Messung Juice & Auslese-Gewichtung:
   1) Hitstop wird ausgelöst (Ketten, Bossphasen, Boss-Tod) und bleibt im Rahmen,
   2) Killketten zählen und erreichen Meilensteine,
   3) Gewichtung: frische Passiv-Karten werden häufiger angeboten als Vertiefungen.
   Aufruf: node tools/mess_juice.js */
const { start, makeOrbitBot } = require('./sim.js');

const api = start({});
api.G('resetGame()');
api.G('startTageslauf()');   // voller Inhalt, Ereignisse inklusive
api.G('hitstop=(function(f){ return function(ms){ globalThis.__hs=((typeof __hs!=="undefined")?__hs:0)+1; globalThis.__hsMs=Math.min(200,((typeof __hsMs!=="undefined")?__hsMs:0)+ms); return f(ms); }; })(hitstop);');
api.G('oeffneAuslese=(function(f){ return function(){ f(); try{ const k=(typeof ausleseKarten!=="undefined"&&ausleseKarten)?ausleseKarten:[]; if(k.length){ globalThis.__angebote=(typeof __angebote!=="undefined"?__angebote:[]); for(const c of k) __angebote.push(c.id+(c.kind==="verstaerkt"?"+":"-")); waehleAuslese(k[0]); } else { schliesseAuslese(); } if(state==="countdown") state="playing"; }catch(e){ console.log("[auslese-fehler]", e&&e.message, "| state:", state); try{ schliesseAuslese(); if(state==="countdown") state="playing"; }catch(_e){} } }; })(oeffneAuslese);');

const bot = makeOrbitBot(api, {});
let maxKette = 0;
for (let f = 0; f < 60 * 60 * 45; f++) {
  api.step(1);
  bot(1 / 60);
  const kz = api.G('kettenZahl');
  if (kz > maxKette) maxKette = kz;
  const st = api.G('state');
  if (st === 'gameover' || st === 'sieg') break;
}

console.log('Hitstop-Auslösungen:', api.G('typeof __hs!=="undefined"?__hs:0'), '| Summe ms:', api.G('typeof __hsMs!=="undefined"?__hsMs:0'));
console.log('Längste Killkette:', maxKette);
console.log('Endstand:', api.G('state'), 'Welle', api.G('wave'));

// Gewichtung: über viele frische Läufe das erste Angebot je Position sammeln
const neuFirst = { neu: 0, verstaerkt: 0 };
for (let i = 0; i < 40; i++) {
  const a = start({});
  a.G('resetGame()');
  a.G('ausleseKarten=ausleseZiehen()');
  const erste = a.G('ausleseKarten[0] ? ausleseKarten[0].id+"_"+ausleseKarten[0].kind : ""');
  if (erste.includes('verstaerkt')) neuFirst.verstaerkt++; else if (erste) neuFirst.neu++;
}
console.log('Erste Karte je 40 Ziehungen -> Neu-Fundament:', neuFirst.neu, '| direkt Verstärkt:', neuFirst.verstaerkt);
console.log('(Erwartung: deutliche Mehrheit Neu — Fundamente zuerst)');
