'use strict';

/* Charakterisierung vor dem Bandumbau. Kein Spielcode und kein Harness werden
 * geaendert; alle Hooks leiten an die unveraenderte Originalfunktion weiter.
 *
 * A: Die Ausdruecke werden aus den laufenden Funktionsdefinitionen gelesen und
 * ohne update() ausgewertet. So bewegt auch eine geaenderte .86/.78-Ableitung
 * ihren eigenen Messwert. 21 Textfundstellen sind 19 Aufrufe, eine Definition
 * und ein Kommentar. Jeder Aufruf und die abgeleiteten bladeLen-Aliase werden
 * einzeln erfasst. Geaenderte/zusatzliche Leser verlangen eine bewusste Zuordnung.
 * Doppel-/Praezisionsorbit kommen ausschliesslich aus kaufenTreeKnoten().
 * bonuses.range hat KEINEN Erwerbsweg und CONFIG.caps.rangeMult keinen aktiven
 * Anwender mehr. Die vierte Geometrie ist daher explizit eine ANALYTISCHE Probe:
 * echte Praezisionsform, aber lokale Rechenparameter mit range=rangeMult-1.
 * Weder bonuses noch treeFlags des Spiels werden dafuer beschrieben.
 *
 * B: Je Zustand ungepanzerte UND gepanzerte Soldaten; W20, 16 Gegner genau an
 * der Klingenspitze, 1200 Bilder/20 s, Original-Startposition, normale KI und
 * Kontaktschaden, keine aktive Macht, KEIN god=1. Karten werden zuerst als neu,
 * fuer Rang 2 danach als verstaerkt wirklich gewaehlt. Nach JEDEM api.step(1):
 * HP-Verluste der 16 Gegner summieren, deren HP/maxHp/Panzerkennzeichen sowie
 * Spielerposition und player.hp=player.maxHp, gegebenenfalls state restaurieren.
 * Gegnerpositionen, hitCd, Stun, Slow und Nachfassen bleiben unangetastet.
 * Abbrueche/HP-Verlust und die echte Gegnerbewegung werden mit ausgewiesen.
 *
 * Kennzahlen (gezaehlt vor einer moeglichen Audio-/Float-Drossel):
 * - Gesamtschaden: Summe der HP-Differenzen, nicht aus CONFIG zurueckgerechnet.
 * - Klingentreffer: sfx('sweet'|'armor'|'bladeHit') im echten Trefferpfad.
 * - Volltreffer: tutorialSweetSpotTreffer(), AUCH abgeprallte Panzertreffer.
 * - Fokus: tatsaechliche positive Fokusdifferenz in orbitSweetPulse(); dessen
 *   Rueckgabewert zaehlt separat getroffene Umlaeufe. Kein Volltreffer-Ersatz.
 * - Schneide/Glasklinge/Klingenteilung: betroffene Treffer; es sind dauerhafte
 *   Modifikatoren, keine erfundenen periodischen Ausloesungen.
 * - Nachfassen: beim Volltreffer wirklich gesetztes Flag; Verbrauch einmal je
 *   Frame. Erneutes Laden im selben Frame verdeckt den Verbrauch dadurch nicht.
 * - Funken/Splitter: Anstieg der individuellen Treffer-CD (auch neue Objekte).
 * - Taktschlag/Nachhall: echte 'counter'-Aufrufe in ihren isolierten Kartenfaellen;
 *   Kettenblitz: addBolt-Spruenge; Splittersalven: 'SPLITTER!'-Ereignisse;
 *   Konter, Machtblitz und Bombe: doCounter/machtblitzEinschlag/plasmaEinschlag.
 * - Alle Raten teilen durch 20 s, Volltrefferquote durch primaere Klingentreffer.
 *
 * Determinismus: fester RAF-Ursprung VOR resetGame, lokales performance-Objekt,
 * Date.now und performance.now folgen derselben Simulationsuhr. Math.random
 * bekommt einen LCG, nach resetGame folgt setzeLaufSeed(SEED). Der 20-s-Pruefstand
 * beginnt ohne alte Effektfenster. Es gibt keine Rundung, Toleranz oder Zufalls-
 * Mittelung: jede einzelne Zahl muss exakt reproduzierbar sein.
 * Nicht abgedeckt: echte Kills/Heilung, aktiver Machtgebrauch, komplette Kronen-
 * builds, Spielgefuehl und reale Bildrate. Dies ist eine Ist-Basis, kein Balancing.
 *
 * node tools/charakterisierung.js --neu   Basislinie bewusst schreiben
 * node tools/charakterisierung.js         vergleichen, Abweichung => Exit 1
 * node tools/charakterisierung.js --zeige  alle Messwerte als JSON, kein Vergleich
 */
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { start } = require('./sim.js');
const BASE = path.join(__dirname, 'charakterisierung.json');
const GAME = path.join(__dirname, '..', 'konzept', 'game.js');
const SEED = 20260831, START = 1000000, EPOCH = 1800000000000;
const DT = 1000 / 60, FRAMES = 1200, HP = 1e9;

function fresh(form = 'frisch') {
  const api = start({ search: '?perf=1' });
  let now = START;
  api.ctx.performance = { now: () => now }; // Niemals das geteilte Hostobjekt aendern.
  api.G(`Date.now=()=>${EPOCH}+performance.now();
    let charRng=${SEED};
    Math.random=()=>{charRng=(Math.imul(charRng,1664525)+1013904223)>>>0;return charRng/4294967296;};`);
  api.step(1, START - api.time); // RAF auf einen identischen Ursprung, noch im Menue.
  api.G(`resetGame();setzeLaufSeed(${SEED});lastTime=performance.now();`);
  if (form !== 'frisch') {
    const id = form === 'doppel' ? 'blade_multi' : 'blade_single';
    api.G(`skillPoints=1;kaufenTreeKnoten('${id}');`);
    assert.equal(api.G(`treeRang('${id}')`), 1, 'Orbitkauf fehlgeschlagen');
    assert.equal(api.G(form === 'doppel' ? '!!treeFlags.doppelorbit' : '!!treeFlags.singularorbit'), true);
  }
  return { api, step() { now += DT; api.step(1); } };
}

// Kommentare und Literale fuer die Leser-Inventur maskieren (keine Zeilennummern).
function codeOnly(s) {
  return s.replace(/\/\*[\s\S]*?\*\/|\/\/[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`/g,
    m => m.replace(/[^\n]/g, ' '));
}
function countCalls(s) {
  return (codeOnly(s).replace(/function\s+bladeLength\s*\(/g, '').match(/\bbladeLength\s*\(\s*\)/g) || []).length;
}
function expressions(api) {
  const gameSource=fs.readFileSync(GAME,'utf8');
  const counts = { orbitSweetPulse:2, entladeGewitterherz:1, zeichneKartenEvos:1,
    handlePowerModule:1, resolvePowerEcho:2, executeWirbel:2, executeSog:3, update:6, draw:1 };
  assert.equal(countCalls(gameSource), 19, 'bladeLength-Leserinventur geaendert');
  const src = Object.fromEntries(Object.entries(counts).map(([fn, n]) => {
    // sim.start ersetzt draw nach seiner Canvas-Probe durch einen leeren Rumpf.
    let text=api.G(`${fn}.toString()`);
    if(fn==='draw'){
      const masked=codeOnly(gameSource),start=masked.indexOf('function draw(');
      assert.ok(start>=0,'draw-Definition fehlt');
      const open=masked.indexOf('{',start);let depth=1,end=open+1;
      for(;end<masked.length&&depth;end++){if(masked[end]==='{')depth++;else if(masked[end]==='}')depth--;}
      assert.equal(depth,0,'draw-Klammern nicht aufloesbar');text=gameSource.slice(start,end);
    }
    assert.equal(countCalls(text), n, `Neue/entfernte Leser in ${fn}`);
    return [fn, text];
  }));
  const take = (fn, re, label) => {
    const found = [...src[fn].matchAll(new RegExp(re.source, 'g'))];
    assert.equal(found.length, 1, `Geometrie nicht eindeutig: ${label}`);
    return found[0][1];
  };
  const expr = {};
  const add = (name, fn, re) => { expr[name] = take(fn, re, name); };
  add('klingenchor_ausloesespitze', 'orbitSweetPulse', /const tip=([^;]+);/);
  add('klingenchor_wellenradius', 'orbitSweetPulse', /Math\.sin\(a\)\*tip,([^,]+),twDmg/);
  add('taktschlag_grundradius', 'orbitSweetPulse', /Math\.hypot\(en\.x-player\.x,en\.y-player\.y\)<([^+]+)\+en\.radius/);
  add('gewitterherz_radius', 'entladeGewitterherz', /const radius=([^;]+);/);
  add('klingenchor_zeichenspitze', 'zeichneKartenEvos', /const tip=([^;]+);/);
  add('wirbel_folgefeld_radius', 'handlePowerModule', /kind:'module_follow'[^\n]*?,r:([^,]+),/);
  add('machtecho_zug_zielradius', 'resolvePowerEcho', /const ziel=Math\.max\(0,d-\(([^;]+)\)\);/);
  add('sogecho_orbit_zielradius', 'resolvePowerEcho', /,rr=([^;]+);en\.x=/);
  add('wirbel_mutation_zielradius', 'executeWirbel', /const ziel=([^,]+),zug=/);
  add('sonnenorbit_radius', 'executeWirbel', /kind:'sunOrbit'[^\n]*?,r:([^,]+),/);
  add('sog_halteradius', 'executeSog', /const halteRadius=([^;]+);/);
  add('sog_sonnenorbit_ring', 'executeSog', /const rr=([^;]+); en\.x=/);
  add('gravitationsbruch_radius', 'executeSog', /Math\.hypot\(en\.x-player\.x,en\.y-player\.y\)<([^)]*\(\)[^)]*)\) en\.hp-=nd/);
  add('trefferblock_klingenlaenge', 'update', /const bladeLen\s*=\s*([^;]+);/);
  add('nachhall_zielradius', 'update', /const a=Math\.atan2\(o\.y-player\.y,o\.x-player\.x\), rr=([^;]+);/);
  const funken = take('update', /const radius=([^;]+\+F\.radius\[rang\]);/, 'funkenkranz_orbit');
  expr.funkenkranz_orbit_rang1 = funken.replace(/rang/g, '0');
  expr.funkenkranz_orbit_rang2 = funken.replace(/rang/g, '1');
  add('gegnerki_sog_orbit', 'update', /const rr=([^;]+);\s*en\.x=player\.x\+Math\.cos\(en\.moduleOrbitAngle\)/);
  add('gegenstrom_zielradius', 'update', /kind==='module_counter'[\s\S]*?const ziel=([^,]+),zug=/);
  add('rueckleiter_zielradius', 'update', /kind==='module_stoss_return'[\s\S]*?const ziel=([^,]+),zug=/);
  add('darstellung_klingenlaenge', 'draw', /const bladeLen\s*=\s*([^;]+);/);
  // Ableitungen aus den zwei lokal zwischengespeicherten bladeLen-Werten.
  add('leuchtfeuer_spitzenabstand', 'update', /tx=player\.x\+Math\.cos\(ta\)\*\(([^)]+)\)/);
  add('sweet_schwelle_soldat', 'update', /return d<([^&]+) && anglesNow/);
  add('trefferschwelle_soldat', 'update', /if\(d >= ([^)]+)\) continue;/);
  add('zeichen_reichweitenring', 'draw', /ctx\.arc\(player\.x,player\.y, (bladeLen\+player\.radius), 0, Math\.PI\*2\); ctx\.stroke\(\);/);
  // Marke der Abstandskurve: ab hier steht der Faktor auf 1 oder darueber.
  add('vollschaden_ring', 'draw', /ctx\.arc\(player\.x,player\.y, (vollschadenRadius\(bladeLen\)), 0, Math\.PI\*2\); ctx\.stroke\(\);/);
  add('tutorial_reichweitenring', 'draw', /ctx\.arc\(player\.x,player\.y,([^,]*bladeLen[^,]*),0,Math\.PI\*2\); ctx\.stroke\(\); ctx\.restore\(\);/);
  add('tutorial_upgrade_markierung', 'draw', /ctx\.arc\(0,0,([^,]+),a-\.22,a\+\.22\)/);
  add('klingenschweif_laenge', 'draw', /roundRect\(player\.radius, -2\.5, ([^,]+), 5, 2\.5\)/);
  add('kronenrahmen_laenge', 'draw', /roundRect\(player\.radius-2,-5,([^,]+),10,5\)/);
  add('kronenmarkierung_spitzenabstand', 'draw', /ctx\.arc\((player\.radius\+bladeLen[^,]*),0,3\.5,0,Math\.PI\*2\)/);
  add('gezeichnete_klinge_laenge', 'draw', /zeichneKlinge\(ctx, player\.radius\+bandInnen\(\), ([^,]+), currentForm/);
  // Der Innenrand ist seit `?band=1` vorhanden; ohne den Schalter ist er 0.
  expr.sichtbare_klingenspitze = expr.zeichen_reichweitenring;
  expr.kontaktschaden_soldat = take('update', /d < ([^)]+)\)\{\s*if\(en\.hitCd<=0\)/, 'Kontaktschaden');
  return expr;
}

function geometry(form) {
  const { api } = fresh(form), expr = expressions(api);
  const cap = form === 'praezision_deckel';
  // Reale Funktionsformel, lokale Parametervariation; keine Mutation im Spiel.
  const length = cap ? api.G(`(function(){
    const calc=Function('CONFIG','bonuses','figur','treeFlags','return ('+bladeLength.toString()+')()');
    return calc(CONFIG,{...bonuses,range:CONFIG.caps.rangeMult-1},figur,treeFlags);
  })()`) : api.G('bladeLength()');
  const values = api.G(`((bladeLength)=>{
    const bladeLen=bladeLength(),F=CONFIG.funkenkranz,en={radius:CONFIG.enemyTypes.soldat.radius};
    return {${Object.entries(expr).map(([k,v])=>`${JSON.stringify(k)}:(${v})`).join(',')}};
  })(()=>${length})`);
  return { art:cap?'analytische_Grenzrechnung_ohne_Kaufweg':'real_gekauft_oder_frisch',
    spielzustand:api.G('({orbit:runTree,bonusesRange:bonuses.range,klingen:effektiveKlingen(),maxHp:player.maxHp})'),
    rechenparameter:{ rangeBonus:cap?api.G('CONFIG.caps.rangeMult-1'):api.G('bonuses.range'), klingenlaenge:length },
    werte:values,
    festeAbstaende:api.G(`({jaegerHaltNah:CONFIG.jaeger.haltNah,jaegerRadius:CONFIG.enemyTypes.jaeger.radius,
      machtblitzReichweite:CONFIG.phaser.range,plasmabombeReichweite:CONFIG.brandspur.range,
      plasmabombeKern:CONFIG.brandspur.core,novaRadius:CONFIG.nova.range,
      funkenTrefferradius1:CONFIG.funkenkranz.hitRadius[0],funkenTrefferradius2:CONFIG.funkenkranz.hitRadius[1],
      rangeMultDeklaration:CONFIG.caps.rangeMult})`) };
}

function choose(api, id, rank) {
  for (const kind of rank === 2 ? ['neu','verstaerkt'] : ['neu']) {
    api.G(`state='auslese';waehleAuslese({id:'${id}',kind:'${kind}'});finishCombatResume();`);
  }
  const expected = api.G(`AUSLESE_MODULE['${id}']?${rank}:(${rank}===2?SPRUNG_STUFE:1)`);
  assert.equal(api.G(`AUSLESE_MODULE['${id}']?modulRang('${id}'):passivStufe('${id}')`), expected, `Kauf ${id}`);
}
function instrument(api, card) {
  api.G(`const charCard=${JSON.stringify(card)};
    const charStat={volltreffer:0,klingentreffer:0,abgeprallt:0,orbitimpulse:0,fokusGeladen:0,
      nachfassenVerbraucht:0,nachfassenVolltreffer:0,nachfassenGeladen:0,impulse:0,kettenspruenge:0,
      splitterSalven:0,konter:0,blitze:0,bomben:0,kontaktversuche:0};
    let charFrame=0,charNachFrame=-1;
    tutorialSweetSpotTreffer=((fn)=>function(...args){
      charStat.volltreffer++;
      if(nachfassenBereit){charStat.nachfassenVolltreffer++;if(charNachFrame!==charFrame){charNachFrame=charFrame;charStat.nachfassenVerbraucht++;}}
      return fn.apply(this,args);
    })(tutorialSweetSpotTreffer);
    orbitSweetPulse=((fn)=>function(...args){const vorher=fokus;const ok=fn.apply(this,args);
      if(ok)charStat.orbitimpulse++;charStat.fokusGeladen+=Math.max(0,fokus-vorher);return ok;
    })(orbitSweetPulse);
    sfx=((fn)=>function(name,...args){
      if(['sweet','armor','bladeHit'].includes(name))charStat.klingentreffer++;
      if(name==='armor')charStat.abgeprallt++;
      if(name==='counter'&&['taktschlag','nachhall'].includes(charCard))charStat.impulse++;
      return fn.call(this,name,...args);
    })(sfx);
    hurtPlayer=((fn)=>function(...args){const vorher=nachfassenBereit;charStat.kontaktversuche++;
      const result=fn.apply(this,args);if(!vorher&&nachfassenBereit)charStat.nachfassenGeladen++;return result;
    })(hurtPlayer);
    addBolt=((fn)=>function(...args){if(charCard==='kettenblitz')charStat.kettenspruenge++;return fn.apply(this,args);})(addBolt);
    pushFloat=((fn)=>function(...args){if(args[2]==='SPLITTER!')charStat.splitterSalven++;return fn.apply(this,args);})(pushFloat);
    doCounter=((fn)=>function(...args){charStat.konter++;return fn.apply(this,args);})(doCounter);
    machtblitzEinschlag=((fn)=>function(...args){charStat.blitze++;return fn.apply(this,args);})(machtblitzEinschlag);
    plasmaEinschlag=((fn)=>function(...args){charStat.bomben++;return fn.apply(this,args);})(plasmaEinschlag);
  `);
}
function behavior(form, card, rank, armored) {
  const { api, step } = fresh(form);
  if (card) choose(api, card, rank);
  api.G(`wave=20;enemies=[];shots=[];orbs=[];stars=[];bombs=[];powerFields=[];pShots=[];bossHazards=[];
    for(let i=0;i<16;i++){const en=makeEnemy('soldat'),a=i*Math.PI/8,r=player.radius+bladeLength();
      en.x=player.x+Math.cos(a)*r;en.y=player.y+Math.sin(a)*r;en.hp=en.maxHp=${HP};en.panzer=${armored};enemies.push(en);}
    state='playing';lastTime=performance.now();`);
  instrument(api, card);
  const p = api.G('player'), x=p.x, y=p.y, enemies=api.G('enemies');
  const initial = enemies.map(e=>({x:e.x,y:e.y}));
  const setup = api.G('({maxHp:player.maxHp,gegnerSchaden:enemies[0].dmg,ringradius:player.radius+bladeLength(),klingen:effektiveKlingen(),sweetArcHalf:sweetArcHalf(),karten:{...runModule,...runAbilities},orbit:{...runTree}})');
  let damage=0, received=0, aborted=0, funken=0, splitter=0, moved=0;
  for(let f=0;f<FRAMES;f++) {
    api.G(`charFrame=${f};`);
    const cds = new Map(api.G('shards').map(s=>[s,s.cd]));
    step();
    if(api.G('state')!=='playing')aborted++;
    assert.equal(api.G('enemies.length'),16,'Pruefstand hat Gegner verloren/erzeugt');
    assert.equal(api.G('wave'),20,'Pruefstand hat Welle verlassen');
    received+=Math.max(0,p.maxHp-p.hp);
    for(let i=0;i<enemies.length;i++) {
      const en=enemies[i];assert.ok(Number.isFinite(en.hp)&&Number.isFinite(en.x)&&Number.isFinite(en.y));
      damage+=HP-en.hp;
      if(Math.hypot(en.x-initial[i].x,en.y-initial[i].y)>.001)moved++;
      en.hp=en.maxHp=HP;en.panzer=armored;
    }
    for(const s of api.G('shards'))if(s.cd>0&&s.cd>(cds.get(s)||0)) {
      if(s.kind==='funkenkranz')funken++;else splitter++;
    }
    p.x=x;p.y=y;p.hp=p.maxHp;
    api.G(`if(state!=='playing')state='playing';`);
  }
  const st=api.G('charStat');
  assert.ok(st.klingentreffer>0&&st.volltreffer>0&&moved>0,'Leerer oder eingefrorener Pruefstand');
  assert.ok(st.volltreffer<=st.klingentreffer,'Volltrefferzaehler unplausibel');
  const events={};
  if(card==='schneide')events.verstaerkteVolltreffer=st.volltreffer;
  if(card==='glasklinge')events.verstaerkteKlingentreffer=st.klingentreffer;
  if(card==='klingenteilung')events.verstaerkteVolltreffer=st.volltreffer;
  if(card==='nachfassen')Object.assign(events,{geladen:st.nachfassenGeladen,verbraucht:st.nachfassenVerbraucht,verbreiterteVolltreffer:st.nachfassenVolltreffer});
  if(card==='funkenkranz')events.funkenTreffer=funken;
  if(['taktschlag','nachhall'].includes(card))events.druckwellen=st.impulse;
  if(card==='kettenblitz')events.kettenspruenge=st.kettenspruenge;
  if(card==='splitter')Object.assign(events,{orbitTreffer:splitter,splitterSalven:st.splitterSalven});
  if(card==='konterstoss')events.konterstoesse=st.konter;
  if(card==='phaser')events.blitzeinschlaege=st.blitze;
  if(card==='brandspur')events.bombeneinschlaege=st.bomben;
  if(card)assert.ok(Object.values(events).some(n=>n>0),`Karte ${card} blieb ungeprueft`);
  return {aufbau:setup,gesamtschaden:damage,schadenProSekunde:damage/20,
    klingentreffer:st.klingentreffer,volltreffer:st.volltreffer,volltrefferProSekunde:st.volltreffer/20,
    volltrefferquote:st.volltreffer/st.klingentreffer,abgeprallteKlingentreffer:st.abgeprallt,
    fokusGeladen:st.fokusGeladen,fokusLaderate:st.fokusGeladen/20,orbitimpulse:st.orbitimpulse,
    ausloesungen:events,ausloesungenProSekunde:Object.fromEntries(Object.entries(events).map(([k,v])=>[k,v/20])),
    erlittenerHpVerlust:received,kontaktversuche:st.kontaktversuche,zustandsabbrueche:aborted,
    bewegteGegnerbilder:moved};
}

function measure() {
  const geometrie=Object.fromEntries(['frisch','doppel','praezision','praezision_deckel'].map(f=>[f,geometry(f)]));
  const cases=[['frisch','frisch',null,0],['doppel','doppel',null,0],['praezision','praezision',null,0]];
  for(const card of ['schneide','nachfassen','glasklinge','klingenteilung','funkenkranz','taktschlag','nachhall','kettenblitz','splitter','konterstoss','phaser','brandspur'])
    for(const rank of [1,2])cases.push([`${card}_${rank}`,'frisch',card,rank]);
  const verhalten=Object.fromEntries(cases.map(([name,form,card,rank])=>[name,{
    normal:behavior(form,card,rank,false),gepanzert:behavior(form,card,rank,true)}]));
  return {schema:2,bedingungen:{seed:SEED,rafStart:START,dateEpoch:EPOCH,frameMs:DT,bilder:FRAMES,
    sekunden:20,welle:20,gegner:16,gegnerHp:HP,god:false,aktiveMacht:false,vergleichstoleranz:0},
    geometrie,verhalten};
}
function differences(a,b,prefix='') {
  if(a&&b&&typeof a==='object'&&typeof b==='object')return [...new Set([...Object.keys(a),...Object.keys(b)])]
    .flatMap(k=>differences(a[k],b[k],prefix?prefix+'.'+k:k));
  return Object.is(a,b)?[]:[{pfad:prefix,vorher:a,nachher:b}];
}
function finite(o) {
  if(typeof o==='number')assert.ok(Number.isFinite(o),'Ungueltiger Messwert');
  else if(o&&typeof o==='object')Object.values(o).forEach(finite);
}
function main() {
  const args=process.argv.slice(2);
  if(args.length>1||args.some(a=>!['--neu','--zeige'].includes(a)))throw new Error('Aufruf: node tools/charakterisierung.js [--neu|--zeige]');
  const values=measure();finite(values);
  if(args[0]==='--zeige'){console.log(JSON.stringify(values,null,2));return;}
  if(args[0]==='--neu'){
    fs.writeFileSync(BASE,JSON.stringify(values,null,2)+'\n');
    console.log('Basislinie geschrieben: tools/charakterisierung.json (4 Geometriezustaende, 54 Verhaltensfaelle).');return;
  }
  if(!fs.existsSync(BASE))throw new Error('Basislinie fehlt. Einmal bewusst mit --neu schreiben.');
  const diff=differences(JSON.parse(fs.readFileSync(BASE,'utf8')),values);
  if(diff.length){
    console.log(`ROT Charakterisierung: ${diff.length} Abweichungen.`);
    for(const d of diff)console.log(`  ${d.pfad}: ${JSON.stringify(d.vorher)} -> ${JSON.stringify(d.nachher)}`);
    process.exitCode=1;
  } else console.log('GRUEN Charakterisierung: 4 Geometriezustaende, 54 Verhaltensfaelle; 0 Abweichungen.');
}
if(require.main===module)try{main();}catch(e){console.error('ROT Messwerkzeug: '+e.message);process.exitCode=1;}
module.exports={measure,differences};
