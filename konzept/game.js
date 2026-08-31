/* Orbitblade — CONFIG zentral anpassbar */
const CONFIG = {
  baseDamage: 25,          // Basiswert, auf dem der Wirbelangriff aufbaut
  wirbelCooldown: 8000,
  wirbelRadius: 140,
  wirbelDamageMult: 1.5,
  stossCooldown: 12000,
  stossRange: 200,
  stossPush: 20,           // 120 schob Gegner aus der Klingenreichweite (72 px) heraus — derselbe Fehler wie einst counterPush 90
  stossDamage: 30,
  bombeCooldown: 5000,
  novaCooldown: 9000,
  // Fähigkeiten-System: jede Stufe skaliert die Werte um diesen Faktor.
  // Bewusst von 0,12 auf 0,10 gesenkt, seit Stufe 4 zusätzlich einen echten
  // mechanischen Sprung gibt (siehe STUFEN) — sonst wäre die Kurve zu steil.
  abilLevelScale: 0.10,
  bombe: { fuse: 1800, radius: 130, dmg: 70 },
  nova:  { range: 190, dmg: 40, stun: 500 },
  phaser:{ dmg: 8, rate: 50, speed: 420, life: 0.9, hits:3 },
  funkenkranz: { dmg:[40,48], hitCd:220, radius:[22,30], hitRadius:[7,11], count:[2,4], speed:3.8 },
  brandspur: { dmg:4, interval:120, tick:300, life:[1400,2000], radius:[14,22], cap:18 },
  healPerKill: 3,
  playerBaseSpeed: 175,
  playerRadius: 18,
  // Unsichtbarer Joystick: überall ziehen, keine Anzeige.
  // maxRadius klein halten -> kurzer Daumenweg bis Vollgas.
  stick: { maxRadius: 52, deadZone: 7, followEdge: true },
  // Plasmaklinge: Rundumschaden als verzeihende Basis, die echte Klingenposition
  // ("Sweet Spot") gibt deutlich mehr. Dadurch zählen Rotation und Doppelklinge wirklich.
  swordSpinSpeed: 6.0,     // Rotationstempo (rad/s)
  bladeBaseLen: 38,        // Klingenlänge bei 0% Reichweiten-Bonus
  spinDamage: 12,          // Rundum-Grundschaden pro Treffer-Tick
  spinArcBonus: 26,        // Zusatzschaden, wenn die Klinge den Gegner wirklich trifft
  spinArcHalf: 0.5,        // halbe Trefferbreite der Klinge (rad) → ca. 57° gesamt
  /* Fokusziel 18 statt 12. Bei 12 war die Leiste nach 5,3 s voll, die kuerzeste
     Abklingzeit liegt bei 5,0 s — die beworbene Entscheidung "sparen oder ausgeben"
     konnte rechnerisch nie existieren, gemessen war perfektes Timing 0,6 % wert. Bei 18
     dauert es 8,4 s: fuer Bombe und Sog entsteht eine echte Wahl, fuer Wirbel, Nova und
     Schock bleibt der Fokus bequem rechtzeitig da. Absichtlich nicht 20 — dort waeren
     die meisten Einsaetze unverstaerkt, und das Spiel soll nicht anspruchsvoller werden. */
  fokusZiel: 18,           // so viele Volltreffer laden die Fokus-Leiste
  fokusBonus: 1.9,         // damit schlägt die nächste aktive Macht zu
  panzerAbWelle: 12,       // ab hier tauchen Panzergegner auf (auf „Meister" früher)
  // Sog zieht Gegner heran, statt sie wegzustoßen — er SETZT Sweet-Spot-Treffer auf,
  // statt selbst viel Schaden zu machen. Deshalb bewusst schwach im Schaden.
  sog:   { range:300, kraft:150, dmg:8, cooldown:6500, stun:450 },
  schneide: { proStufe:0.08 },     // zusätzlicher Sweet-Spot-Schaden je Stufe
  /* Nachhall war nach der Verdichtung mit +268 % auf der Sprungstufe eine Pflichtkarte
     — dreimal so stark wie die zweitbeste. Flaecheneffekte profitieren am staerksten
     davon, dass jetzt bis zu 51 Gegner gleichzeitig da sind. Schaden 26 -> 10 und
     Radius 95 -> 82 bringen sie auf +34/+89 %, also auf Augenhoehe mit der Glasklinge.
     Gemessen bei dichter wie bei verteilter Gegnerlage nahezu gleich. */
  nachhall: { alle:4, radius:82, dmg:10 },
  siegWelle: 30,           // hier steht der Endgegner — bis dahin ist das Spiel gewinnbar
  spinHitInterval: 120,    // ms zwischen den Treffer-Ticks
  // Tempo bewusst nah am Spieler (175): Weglaufen soll Zeit kosten, nicht alles lösen
  enemyTypes: {
    // star = Meta-Währung, fällt direkt (keine Münzen mehr, keine Umrechnung)
    drohne: { hp:28, dmg:8, speed:180, radius:14, color:'#8ec8ff', star:1, xp:12 },
    soldat: { hp:60, dmg:12, speed:138, radius:18, color:'#ff8a3d', star:2, xp:20 },
    schwer: { hp:125, dmg:20, speed:95, radius:24, color:'#c94a4a', star:4, xp:30 },
    // Panzer: langsam und zäh, aber die Klinge prallt außerhalb des Sweet Spots ab
    panzer: { hp:145, dmg:18, speed:86, radius:23, color:'#93a6c2', star:6, xp:38, panzer:true },
    jaeger: { hp:45, dmg:14, speed:165, radius:16, color:'#ffd257', star:2, xp:22, shootRange:300 },
    exploder:{ hp:55, dmg:26, speed:132, radius:19, color:'#ff5aa2', star:3, xp:24 },
    boss:   { hp:1150, dmg:19, speed:115, radius:34, color:'#b84dff', star:12, xp:80 },
    // Brutknoten (Brutmutter-Exklusivfähigkeit): unbeweglicher Speiser statt Angreifer.
    // hp wird bei der Erzeugung relativ zum aktuellen Bosslebens überschrieben.
    knoten: { hp:1, dmg:0, speed:0, radius:16, color:'#4de0a0', star:0, xp:0 }
  },
  shots: { speed:340, radius:5, life:3.2 },        // Projektile der Distanz-Gegner
  // haltNah liegt knapp hinter der Klingenreichweite (~88 px bei Jaeger-Radius 16):
  // wer waehrend des Ladens hineingeht, riskiert die Position fuer den Kill. haltFern
  // ist nur die Zieldistanz des Rueckzugs — shootCd beendet ihn notfalls frueher.
  jaeger: { shootRange:300, chargeMs:850, cooldown:700, haltNah:115, haltFern:270 },
  exploder: { fuseMs:650, blast:95 },              // Zünd-Puls vor der Explosion, Schadensabfall
  xpOrb: { chance:0.15, pity:8, xp:30, radius:9 },
  // Rote Lebenskugeln: seltener als XP-Orbs, heilen einen festen Anteil der Leiste
  hpOrb: { chance:0.07, pity:16, heilAnteil:0.05, radius:9 }, // Bonus-XP-Orbs: 15 %, spätestens jeder 8. Kill
  // Barriere: eine Lebenskugel bei vollem Leben ist nicht mehr verschenkt, sondern
  // wird zu einem Puffer, der VOR den Trefferpunkten aufgebraucht wird.
  barriere: { proKugel:0.06, max:0.30 },
  // Etwas kürzere, dichtere Wellen: weniger Leerlauf und rund 10 % weniger Masse,
  // ohne die Gegnermechaniken oder den 30-Wellen-Bogen zu beschneiden.
  /* Gegner kommen in Schueben, nicht im Metronom. Vorher erschien alle 580 ms genau ein
     Gegner — dadurch bestimmte ein Timer die Wellendauer und nicht die Toetungsrate des
     Spielers. Gemessen: 1.418 Gegner in den Nicht-Bosswellen 1..29 ergaben 13:42 harte
     Untergrenze bei 19:04 Gesamtlauf, und zwischen einem Anfaengerbuild und einem
     unbesiegbaren Spieler lagen in Welle 29 nur 17 % Zeitunterschied. Kein Baumknoten
     und keine Karte konnte sich dadurch maechtig anfuehlen. */
  wave: { baseCount:5, perWave:2.55, hpScale:0.08, dmgScale:0.08, spawnInterval: 580,
          schubMin:5, schubMax:12,        // Groesse eines Schubs, waechst mit der Welle
          schubRest:0.35,                 // naechster Schub, sobald so wenig vom letzten uebrig ist
          schubMaxWarten:2600 },          // Notbremse, damit ein passiver Spieler nicht feststeckt
  // 15 reguläre Punkte sollen den kompakten Orbitbaum bis Welle 30 füllen. Die
  // Anforderungen liegen etwa beim alten Gesamt-XP bis Level 29: Derselbe Lauf endet
  // dadurch nahe Level 16, also bei den vorgesehenen 15 regulären Punkten.
  xpBase: 1000, xpPerLevel: 300,
  caps: { dmgMult:2.0, speedMult:1.6, rangeMult:1.8, fireRateMult:1.5, maxHpBonus:150 },
  // Freischaltbare Fähigkeiten (passiv, kein neuer Knopf)
  abil: {
    chainDamage:14, chainRange:140,          // Kettenblitz: springt zum nächsten Gegner
    counterDamage:22, counterRadius:110, counterCd:600, counterPush:20,  // Konterstoß bei Treffer;
    // Rueckstoss war 90 und schob Gegner aus der Klingenbahn — die Passive machte dadurch schwaecher
    splitterDamage:9, splitterCount:2, splitterRadius:70, splitterSpeed:3.2, splitterHitCd:250 // kreisende Splitter
  },
  // Boss-Fähigkeiten. shockInner MUSS klar größer sein als die Angriffsreichweite
  // (Klinge ~38 + Boss-Radius 34 ≈ 72), sonst steht man beim Angreifen zwangsläufig
  // im Gefahrenband und kommt nicht mehr heraus.
  boss: { warn:1100, cooldown:2600, ramSpeed:385, ramMs:520, ramRecovery:550, shockInner:95, shockOuter:175 },
  /* Der Begleiter aus der Werkstatt. Ein Kauf, danach fünf Stufen: jede erhöht
     Schaden und beide Reichweiten. Bewusst schwach genug, dass er unterstützt
     und das Spiel nicht abnimmt — die Reichweite wächst schneller als der Schaden. */
  helfer: { sammelBasis:130, sammelProStufe:38, schussBasis:200, schussProStufe:34,
            dmgBasis:7, dmgProStufe:4, rate:900, maxStufe:5 },
  hindernisAbWelle: 10,  // Deko-Felsen erscheinen ab dieser Welle (ohne Kollision)
  fxGegnerGrenze: 22,   // ab so vielen Gegnern wird das Leuchten abgeschaltet
  render: {
    // Pixel 9 und ähnliche Geräte rendern bei DPR 3 sonst über 2,5 Mio. Pixel pro
    // Bild. Der Unterschied ist im Spiel kaum sichtbar, die Wärmeentwicklung aber.
    touchDpr:1.5, desktopDpr:2, sparDprFaktor:0.80, hudIntervall:100
  },
  /* Obergrenzen für Effekte. Gemessen: Ohne sie wuchsen die Partikel linear mit der
     Gegnerzahl — bei den 86 Gegnern, die Welle 20 vorsieht, waren rund 1500 Partikel
     gleichzeitig unterwegs und machten drei Viertel aller Zeichenoperationen aus.
     Ab diesen Werten sieht man den Unterschied nicht mehr, spürt ihn aber deutlich. */
  maxPartikel: 340,
  maxFloats: 36,        // Schadenszahlen: Text ist auf Canvas besonders teuer
  playerHp: 190,       // ein Startwert für alle — die Kurve macht die Schwierigkeit
  // Eine einzige Schwierigkeitskurve, die mit der Welle wächst. Welle 1 entspricht dem
  // alten "Schüler", Welle 20 etwa "Meister", darüber geht es weiter hoch (Endlosmodus).
  ramp: { fullAtWave: 20, maxT: 1.6 }
};

// Hintergrund-Biome – alle 5 Wellen ein neues (passend zu den Boss-Wellen). Nur Optik, kollisionsfrei.
const BIOMES=[
  { name:'Orbitalring',  accent:'#7cc8ff', bg:'#05070d', glow:'28,58,104',  grid:'rgba(74,132,204,0.09)',  node:'rgba(96,166,236,0.16)',  star:'#7fb2ff', land:'ring',     landColor:'rgba(110,200,255,0.20)',
    neb:[[40,90,170],[20,50,120],[70,60,150]] },
  { name:'Asteroidenfeld', accent:'#ffb340', bg:'#0b0805', glow:'96,64,28', grid:'rgba(190,132,74,0.09)',  node:'rgba(214,160,96,0.16)',  star:'#d9b07f', land:'asteroid', landColor:'rgba(140,100,70,0.35)',
    neb:[[150,90,40],[110,60,30],[90,70,60]] },
  { name:'Nebelzone',    accent:'#c77dff', bg:'#0b0510', glow:'96,28,120',  grid:'rgba(150,90,200,0.09)',  node:'rgba(180,110,230,0.16)', star:'#c9a0ff', land:'nebula',   landColor:'rgba(170,80,220,0.16)',
    neb:[[130,50,180],[80,30,140],[170,60,140]] },
  { name:'Sternennebel', accent:'#6ec8ff', bg:'#040a0d', glow:'20,120,140', grid:'rgba(60,160,190,0.09)',  node:'rgba(90,190,220,0.16)',  star:'#8fd8e8', land:'galaxy',   landColor:'rgba(120,210,235,0.14)',
    neb:[[30,140,160],[20,90,130],[60,160,150]] },
];
function biomeForWave(){ return BIOMES[Math.min(BIOMES.length-1, Math.floor((wave-1)/5))]; }

/* ---- Hintergrund-Ebenen ----
   Einmalig erzeugt statt pro Bild neu berechnet: drei Sternenlagen mit
   unterschiedlicher Parallaxe, weiche Nebelschwaden und Staub im Vordergrund.
   Die verschiedenen Geschwindigkeiten erzeugen die Tiefenwirkung. */
const BG_TILE=560;
function rnd(seed){ const x=Math.sin(seed*127.1+311.7)*43758.5453; return x-Math.floor(x); }
function makeStars(count, seedBase, minR, maxR){
  const out=[];
  for(let i=0;i<count;i++){
    const a=rnd(seedBase+i*1.13), b=rnd(seedBase+i*2.71+5), c=rnd(seedBase+i*3.37+11);
    out.push({ x:a*BG_TILE, y:b*BG_TILE, r:minR+c*(maxR-minR), tw:rnd(seedBase+i*7.7)*6.28, br:0.5+c*0.5 });
  }
  return out;
}
const STAR_LAYERS=[
  { par:0.06, stars:makeStars(120, 1,  0.7, 1.6), flare:false },  // sehr fern
  { par:0.16, stars:makeStars(64,  90, 1.2, 2.4), flare:false },  // mittel
  { par:0.30, stars:makeStars(26,  300,2.0, 3.6), flare:true  },  // nah, mit Lichtkreuz
];
// Nebel deutlich kräftiger als beim ersten Versuch: mit Alpha 0.05 waren sie
// gegen den dunklen Grund faktisch unsichtbar (gemessen: 88 % des Bildes unter
// Helligkeit 20). Jetzt tragen sie die Farbe des Biomes wirklich sichtbar.
const NEBULAE=[];
// Alpha bewusst moderat: zu kräftiger Nebel flutet das Bild blau und die Gegner
// (selbst blau) verlieren Kontrast. Die Struktur kommt von den Sternen, der Nebel
// gibt nur Farbe und Tiefe.
for(let i=0;i<10;i++){
  NEBULAE.push({ x:rnd(i*5.1)*3400, y:rnd(i*9.3+3)*3400, r:420+rnd(i*2.2+7)*620, c:i%3, a:0.09+rnd(i*4.4)*0.14 });
}
const DUST=[];
for(let i=0;i<26;i++) DUST.push({ x:rnd(i*3.9)*1600, y:rnd(i*6.2+2)*1600, r:0.8+rnd(i*8.1)*1.6, sp:0.3+rnd(i*1.7)*0.5 });

/* Schwierigkeit als Funktion der Welle statt als Menüauswahl.
   t=0 bei Welle 1 (sehr verzeihend), t=1 bei Welle 20, darüber bis maxT weiter.
   Wichtig: bossWarn und Boss-Tempo sind nach unten begrenzt, damit die Flucht aus
   dem Gefahrenband auch in sehr späten Wellen rechnerisch möglich bleibt. */
function diffAt(w){
  const R=CONFIG.ramp;
  const t=Math.max(0, Math.min(R.maxT, (w-1)/(R.fullAtWave-1)));
  const L=(a,b)=>a+(b-a)*t;
  return {
    enemySpeed: L(0.75,1.20),
    enemyCount: L(0.70,1.40),
    enemyDmg:   L(0.70,1.25),
    enemyHp:    L(0.75,1.15),
    regen:      Math.max(0.25, L(0.80,0.30)),
    bossHp:     L(0.60,1.15),
    bossSpeed:  L(0.70,0.95),
    bossCd:     Math.max(0.80, L(1.70,0.85)),
    bossWarn:   Math.max(1.35, L(1.70,1.35)),
  };
}
function curDiff(){
  const d=diffAt(wave);
  /* Tageslauf-Regeln greifen zentral hier statt an jeder Gegnerstelle —
     so kann eine Regel keine Stelle vergessen werden. */
  if(tagesFaktoren.gegnerTempo) d.enemySpeed*=tagesFaktoren.gegnerTempo;
  if(tagesFaktoren.gegnerLeben) d.enemyHp*=tagesFaktoren.gegnerLeben;
  if(tagesFaktoren.bossLeben)   d.bossHp*=tagesFaktoren.bossLeben;
  return d;
}

/* ============================================================
   PROGRESSION — Skins, Meilensteine, Abzeichen, Speicherstand
   Bewusst: kein Server, keine personenbezogenen Daten (DSGVO/Jugendschutz simpel).
   Fortschritt macht das Spiel BREITER, nicht stärker.
   ============================================================ */

// Vollversion-Schalter. Für eine kostenlose Web-Demo später auf false setzen:
// Inhalte mit voll:true bleiben dann trotz erreichtem Meilenstein gesperrt ("Vollversion").
const FULL_VERSION = true;

// Klingenfarben. start:true = von Anfang an wählbar. voll:true = nur Vollversion.
const SKINS = {
  rubin:    { name:'Rubin',     blade:'#ff3b3b', core:'#ffffff', start:true },
  azur:     { name:'Azur',      blade:'#3b82ff', core:'#dbeaff', start:true },
  bernstein:{ name:'Bernstein', blade:'#ffb340', core:'#fff3d6' },
  smaragd:  { name:'Smaragd',   blade:'#3bd17a', core:'#e9fff1' },
  tuerkis:  { name:'Türkis',    blade:'#35e0e0', core:'#e0ffff', voll:true },
  amethyst: { name:'Amethyst',  blade:'#b45bff', core:'#f2e6ff', voll:true },
};

/* ORBITAUFTRAG — genau ein dauerhafter, nicht verfallender Anlass für den nächsten
   Lauf. Die Definitionen sind Code-Konstanten; Spielstandsdaten enthalten nur ID,
   Status und Zahl und werden beim Laden streng geprüft. */
const ORBIT_AUFTRAEGE={
  fokus_einsatz:{id:'fokus_einsatz',titel:'Fokus im Orbit',text:'Setze 5 fokussierte Hauptmächte ein.',kurz:'Fokusmächte',ziel:5,lohn:160},
  boss_makellos:{id:'boss_makellos',titel:'Makelloser Orbit',text:'Besiege 1 Boss ohne Lebensschaden.',kurz:'Boss makellos',ziel:1,lohn:200},
  panzer_sweet:{id:'panzer_sweet',titel:'Präzisionsbrecher',text:'Lande 20 Volltreffer auf Panzergegner.',kurz:'Panzer-Volltreffer',ziel:20,lohn:170},
  held_lichtbund:{id:'held_lichtbund',titel:'Lichtbund',text:'Erzeuge 3 Fokusbarrieren.',kurz:'Lichtbarrieren',ziel:3,lohn:170},
  leere_hunger:{id:'leere_hunger',titel:'Leerenhunger',text:'Lade 3-mal unter 45 % Leben den Fokus voll.',kurz:'Risiko-Fokus',ziel:3,lohn:190},
};
const ORBIT_UNIVERSELL=['fokus_einsatz','boss_makellos','panzer_sweet'];
function orbitDef(auftrag=save&&save.orbitauftrag){
  return auftrag&&typeof auftrag.id==='string'&&Object.prototype.hasOwnProperty.call(ORBIT_AUFTRAEGE,auftrag.id) ? ORBIT_AUFTRAEGE[auftrag.id] : null;
}
function orbitFigurLabel(def){ return def&&def.figur ? (def.figur==='held'?'Lichthüter':'Leerenklinge') : ''; }
function istGueltigerOrbitauftrag(auftrag){
  const def=orbitDef(auftrag);
  return !!(def && auftrag && Number.isInteger(auftrag.wert) && auftrag.wert>=0 &&
    ((auftrag.status==='aktiv' && auftrag.wert<def.ziel) ||
     (auftrag.status==='erledigt' && auftrag.wert===def.ziel)));
}
function neuerOrbitauftrag(ausschluss=''){
  const pool=[...ORBIT_UNIVERSELL,'held_lichtbund','leere_hunger'];
  const ohne=pool.filter(id=>id!==ausschluss && id!==save.orbitauftragLetzterId);
  const wahl=ohne.length?ohne:pool.filter(id=>id!==ausschluss);
  const id=wahl[Math.floor(Math.random()*wahl.length)]||pool[0];
  return {id,status:'aktiv',wert:0};
}
// Nur zwischen Läufen ersetzen: Ein erledigter Auftrag bleibt in Pause und Ergebnis sichtbar.
function sorgeOrbitauftrag(){
  if(messlaufSchutz) return false;
  if(istGueltigerOrbitauftrag(save.orbitauftrag) && save.orbitauftrag.status==='aktiv') return false;
  save.orbitauftrag=neuerOrbitauftrag(); persist(); return true;
}
// Eine noch unbegonnene Charakteraufgabe folgt der Auswahl. Begonnener Fortschritt
// bleibt dagegen erhalten; der Charakterhinweis und der Tagestausch verhindern Verlust.
function passeOrbitauftragAnFigurwahl(){
  const auftrag=save.orbitauftrag, def=orbitDef(auftrag);
  if(messlaufSchutz || !def || !def.figur || def.figur===figur().id || auftrag.status!=='aktiv' || auftrag.wert!==0) return false;
  save.orbitauftrag=neuerOrbitauftrag(def.id); return true;
}
function orbitFortschritt(id,anzahl=1){
  if(messlaufSchutz || !Number.isFinite(anzahl)) return false;
  const auftrag=save.orbitauftrag, def=orbitDef(auftrag);
  if(!def || auftrag.status!=='aktiv' || def.id!==id) return false;
  const neu=Math.max(0,Math.min(def.ziel,auftrag.wert+Math.max(0,Math.floor(anzahl))));
  if(neu===auftrag.wert) return false;
  auftrag.wert=neu;
  if(neu===def.ziel){
    // Erst vollständigen Zustand schreiben, dann genau einmal persistieren: kein Doppel-Lohn.
    auftrag.status='erledigt'; save.stars=Math.max(0,Math.floor(Number(save.stars)||0))+def.lohn;
    save.orbitauftragLetzterId=def.id; persist();
    pushToast('Orbitauftrag erledigt: +'+def.lohn+' ◆'); announce('Orbitauftrag erledigt!',def.titel+' · +'+def.lohn+' ◆','#ffd257');
    if(sfx) sfx('unlockBig');
  } else persist();
  renderOrbitauftrag(); updateHUD(true); return true;
}
function lokalerTag(){ const d=new Date(), z=n=>String(n).padStart(2,'0'); return d.getFullYear()+'-'+z(d.getMonth()+1)+'-'+z(d.getDate()); }
function tauscheOrbitauftrag(){
  if(state!=='menu' || messlaufSchutz) return;
  const heute=lokalerTag();
  if(save.orbitauftragTauschTag===heute){ pushToast('Orbitauftrag heute bereits getauscht.'); return; }
  const alt=save.orbitauftrag;
  if(alt&&alt.wert>0&&!window.confirm('Fortschritt dieses Orbitauftrags verfällt. Wirklich tauschen?')) return;
  save.orbitauftrag=neuerOrbitauftrag(alt&&alt.id||''); save.orbitauftragTauschTag=heute;
  persist(); renderOrbitauftrag(); if(sfx) sfx('pick');
}

/* HILFEN statt Schwierigkeitsgraden (Bushnells Gesetz, Mario-Kart-Muster).
   Es ist dasselbe Spiel, nur mit unterschiedlich viel Rückenwind. Entscheidend und
   bewusst so gebaut, nach dem Vorbild von Rogue Legacy 2: Hilfen sperren NICHTS —
   keine Freischaltung, kein Abzeichen, keinen Sieg. Wer Hilfen bestraft, drängt genau
   die Spieler hinaus, für die sie da sind. Getrennt geführt wird allein die Bestmarke,
   damit der Vergleich ehrlich bleibt. */
const HILFEN = {
  entdecker: { name:'Entdecker', desc:'Für jüngere Spieler und zum Kennenlernen',
               schaden:0.5, gegner:0.70, panzerDurchlass:0.55, wiederauf:true },
  standard:  { name:'Standard',  desc:'Das Spiel, wie es gedacht ist',
               schaden:1.0, gegner:1.00, panzerDurchlass:0.25, wiederauf:false },
  meister:   { name:'Meister',   desc:'Härter — und Panzergegner schon ab Welle 5',
               schaden:1.4, gegner:1.25, panzerDurchlass:0.10, wiederauf:false, panzerAb:5 },
};
const HILF_IDS=['entdecker','standard','meister'];
/* PRÜFSTUFEN — freiwillige, GESTAPELTE Erschwernisse OBERHALB von Meister, nach dem
   Endspiel-Muster von Hades/Slay the Spire/Dead Cells: nicht gekauft, sondern durch
   den Sieg der vorherigen Stufe freigeschaltet (siehe sieg()). Sie kosten nichts und
   geben — anders als Hilfen — NIE Kampfkraft, nur Erschwernis, Bestmarke und später
   Kosmetik. Nur Stufen 1–4; 5–8 folgen nach einem echten Spieltest dieser Fassung. */
const PRUEFSTUFEN=[
  {id:'pruef1', name:'Prüfstufe 1', kurz:'Dichte',      desc:'Gegnerzahl +12 %'},
  {id:'pruef2', name:'Prüfstufe 2', kurz:'Härte',       desc:'Panzerdurchlass halbiert'},
  {id:'pruef3', name:'Prüfstufe 3', kurz:'Knappe Wahl', desc:'Die Auslese bietet nur zwei Karten'},
  {id:'pruef4', name:'Prüfstufe 4', kurz:'Zäher Kern',  desc:'Bosse haben 25 % mehr Leben'},
];
// -1 für alles, was keine (bekannte) Prüfstufen-Id ist — auch für manipulierte Werte.
function pruefstufeIndex(id){ return PRUEFSTUFEN.findIndex(p=>p.id===id); }
let _pruefCache=[];
// Baut Stufe n (1-basiert): Meister-Basis plus die Bedingungen der Stufen 1..n
// GESTAPELT — Stufe 3 ist also Meister plus Dichte plus Härte plus Knappe Wahl.
// Zwischengespeichert, weil hilfe() sehr oft je Bild aufgerufen wird (Schaden, Panzer)
// und das Ergebnis für ein gegebenes n nie variiert.
function pruefstufeObjekt(n){
  if(_pruefCache[n]) return _pruefCache[n];
  const h=Object.assign({}, HILFEN.meister, { name:PRUEFSTUFEN[n-1].name });
  if(n>=1) h.gegner *= 1.12;                    // Dichte
  if(n>=2) h.panzerDurchlass *= 0.5;             // Härte
  if(n>=3) h.ausleseKarten = 2;                  // Knappe Wahl (Standard ist 3)
  if(n>=4) h.bossHp = 1.25;                      // Zäher Kern (Standard ist 1)
  return _pruefCache[n]=h;
}
function hilfe(){
  const idx=pruefstufeIndex(save.hilfe);
  // Nur freigeschaltete Stufen liefern das zusammengesetzte Objekt — sonst könnte ein
  // manipulierter Spielstand direkt eine ungespielte hohe Stufe wählen.
  if(idx>=0 && idx<(save.pruefFrei||0)) return pruefstufeObjekt(idx+1);
  return HILFEN[save.hilfe] || HILFEN.standard;
}
function hilfeId(){
  const idx=pruefstufeIndex(save.hilfe);
  if(idx>=0 && idx<(save.pruefFrei||0)) return save.hilfe;
  return HILFEN[save.hilfe] ? save.hilfe : 'standard';
}
function bestFuer(id){ return (save.best && save.best[id||hilfeId()]) || 0; }
// Hilfen verändern die Gegnerzahl, aber nicht den Build-Fortschritt. Ohne diesen
// Ausgleich hätte Entdecker deutlich weniger Tree-Punkte und Meister deutlich mehr.
function laufXp(wert){ return Math.max(1, Math.round(wert*1.10 / hilfe().gegner)); }

/* KLINGENFORMEN — zweite Kosmetik-Achse, unabhängig von der Farbe. Sechs Farben mal
   drei Formen ergeben 18 Kombinationen aus sehr wenig Code. Die Klinge ist das Ding,
   auf das man permanent schaut, deshalb bringt hier jede Änderung am meisten.
   Rein optisch: Reichweite und Schaden hängen nirgends an der Form. */
const FORMEN = {
  strahl:   { name:'Strahl',   desc:'Schlank und weit — die Standardform', start:true,
              dicke:6,   kern:2.4, rund:3,   glut:20 },
  wucht:    { name:'Wucht',    desc:'Breit und kantig, mit doppelter Kernader',
              dicke:9.5, kern:2.0, rund:1.5, glut:24, spitz:true, doppelkern:true },
  zwilling: { name:'Zwilling', desc:'Zwei getrennte Strahlen mit Lücke',
              dicke:3.4, kern:1.3, rund:1.7, glut:15, zwei:true },
};
/* CHARAKTERE — aus den bisher rein kosmetischen Figuren werden echte Charaktere.
   Die Orbit-Klinge bleibt bei ALLEN der Hauptangriff. Charaktere verändern, wie man
   sie führt: Licht belohnt Kontrolle und Schutz, Leere belohnt bewusstes Risiko. */
const FIGUREN = {
  held:      { id:'held', name:'Lichthüter', desc:'Hüter mit präzise geführter Orbit-Klinge', start:true,
               hp:1.08, tempo:1.0, reichweite:1.02, fokusZiel:1.0, barriereMal:1.25,
               staerke:'Lichtbund · Bewegung stärkt Präzision, voller Fokus erzeugt Barriere',
               fuer:'Kontrolliertes Positionieren, Schutz und präzise Orbit-Treffer' },
  // Die interne ID bleibt für vorhandene v5-Spielstände bestehen.
  konstrukt: { name:'Leerenklinge', desc:'Schwebender Träger einer instabilen Orbit-Klinge',
               id:'konstrukt', hp:0.88, tempo:1.07, reichweite:0.98, fokusZiel:0.88, barriereMal:0.75,
               staerke:'Leerenhunger · fehlendes Leben verstärkt Volltreffer und Orbit',
               fuer:'Hohes Risiko, aggressives Kreisen und starke Klingen-Kombos' },
};
/* EIN KÖRPER.
   Die Figurwahl fiel vor dem ersten Bild, also mit null Information — die
   schlechteste Art von Entscheidung — und verdoppelte die Balancearbeit. Es gibt
   jetzt genau einen Körper mit den Werten des Lichthüters; der Lichtbund ist seine
   Grundmechanik und gilt immer.
   Die Leerenklingen-Identität ist nicht verloren: Sie hängt an den Haltungen
   Verschlinger und Abgrund (siehe hatLeerenhunger). Dadurch lassen sich beide
   Identitäten erstmals mischen, statt sich vor dem Lauf auszuschliessen. */
function figur(){ return FIGUREN.held; }
/* Wer Verschlinger oder Abgrund gewählt hat, spielt die Leeren-Identität: fehlendes
   Leben beschleunigt den Orbit und verstärkt Volltreffer. */
function hatLeerenhunger(){ return !!(treeFlags.leerenHeilung || treeFlags.leerenRisikoBonus); }

/* ---- Tageslauf, Lauf-RNG, Wellenereignisse und Treffermomente ----
   Antwort auf „zu eintönig, der Spaß vergeht zu schnell": drei unabhängige
   Quellen für Abwechslung plus ein Grund, morgen wieder zu starten.
   - Tagessignal: ein festgelegter Lauf pro Tag (Charakter + Hauptmacht + je ein
     Twist und eine Regel), aus einem Datums-Seed gezogen — alle Spieler bekommen
     am selben Tag dasselbe Angebot. Kein Zwang, kein Streak, kein Login.
   - Lauf-RNG: der Inhalt eines Laufs (Gegnerarten, Bosswürfe, Karten, Drops)
     läuft über eine eigene zählwerksgesteuerte Zufallsquelle. Nur so ist der
     Tageslauf zwischen zwei Geräten vergleichbar; im normalen Lauf wird sie mit
     Zufall gesät.
   - Ereigniswellen: alle vierte reguläre Welle trägt einen angekündigten Modifikator
     aus vorhandenen Reglern — kein neues System, nur neue Kombinationen.
   - Hitstop und Killketten: kurze Zeitlupe in den größten Momenten, Serienzähler
     mit kleinem Fokuslohn. Alles über die vorhandenen Effektwege (Floats, Shake). */
var laufVorgabe=null;          // gesetzt, während ein Tageslauf läuft
var tagesFaktoren={};          // zusammengeführte Faktoren aus Twist+Regel
var laufEreignis=null, letztesEreignisId='';
var hitstopMs=0, kettenZahl=0, kettenBis=0;
var ausleseZiehungen=0;   // fortlaufende Nummer jeder Kartenziehung im Lauf
const TAGES_LOHN=250;

function mulberry32(a){
  return function(){
    a=(a+0x6D2B79F5)|0;
    let t=Math.imul(a^(a>>>15),1|a);
    t=(t+Math.imul(t^(t>>>7),61|t))^t;
    return ((t^(t>>>14))>>>0)/4294967296;
  };
}
let laufRndZustand=1;
var laufSeedRaw=1;
function setzeLaufSeed(seed){ laufSeedRaw=(seed>>>0)||1; laufRndZustand=laufSeedRaw; }
function laufRnd(){
  let a=laufRndZustand;
  a=(a+0x6D2B79F5)|0;
  let t=Math.imul(a^(a>>>15),1|a);
  t=(t+Math.imul(t^(t>>>7),61|t))^t;
  laufRndZustand=a;
  return ((t^(t>>>14))>>>0)/4294967296;
}
/* Eigene Zufallsströme pro Zweck: Der reaktive Kampf (Kills verschieben Spawns)
   verschiebt einen einzelnen Strom — Inhalte, die für alle Spieler am selben Tag
   gleich sein sollen, leiten sich deshalb indexbasiert vom Tages-Seed ab. */
function laufStrom(zweck, idx){
  let h=laufSeedRaw>>>0;
  const s=zweck+':'+(idx|0);
  for(let i=0;i<s.length;i++){ h^=s.charCodeAt(i); h=Math.imul(h,16777619); }
  return mulberry32(h>>>0);
}

/* Ein Twist verstärkt, eine Regel macht den Tag eigen — beide benutzen nur
   vorhandene Hebel, damit der Tageslauf nie ein zweites Balancing wird. */
const TAGES_TWISTS=[
  { id:'klinge', name:'Geschärfte Klinge', text:'Deine Klinge trifft heute deutlich härter.', faktor:{klinge:1.3} },
  { id:'fokus', name:'Strömender Fokus', text:'Volltreffer laden deinen Fokus doppelt so schnell.', faktor:{fokus:2} },
  { id:'tempo', name:'Leichtfuß', text:'Du läufst heute spürbar schneller.', faktor:{tempo:1.15} },
  { id:'beute', name:'Beutezug', text:'Gegner lassen heute deutlich mehr Fragmente fallen.', faktor:{beute:1.5} },
  { id:'start', name:'Fliegender Start', text:'Der Lauf beginnt mit zwei zusätzlichen Freischaltungen.' },
  { id:'quelle', name:'Quellwasser', text:'Lebenskugeln erscheinen heute doppelt so oft.', faktor:{hpOrb:2} },
];
const TAGES_REGELN=[
  { id:'eilig', name:'Eiliger Schwarm', text:'Gegner sind heute etwas schneller.', faktor:{gegnerTempo:1.12} },
  { id:'zah', name:'Zähe Haut', text:'Gegner halten heute etwas länger durch.', faktor:{gegnerLeben:1.15} },
  { id:'kronen', name:'Schwere Kronen', text:'Bossgegner haben heute mehr Leben.', faktor:{bossLeben:1.2} },
  { id:'duerre', name:'Dürre', text:'Lebenskugeln sind heute selten.', faktor:{hpOrb:0.5} },
  { id:'bleiwalze', name:'Bleiwalzen', text:'Gepanzerte Gegner kommen früh und häufig.', panzer:{ab:4, chance:0.38} },
  { id:'eng', name:'Enge Auslese', text:'Die Auslese bietet heute nur zwei Karten.', ausleseKarten:2 },
];

/* Ereigniswellen: kurz angekündigte Modifikatoren für genau eine Welle.
   Bewusst nur vier, alle aus vorhandenen Reglern — Abwechslung statt System.
   Die Zahlen sind gegen den Gott-Lauf kalibriert: mehr Volumen oder mehr Panzer
   haben die Laufzeit messbar aufgebläht (40 statt 34 min im Bot-Maßstab). */
const EREIGNISSE=[
  { id:'schwarm', name:'Der Schwarm', kurz:'SCHWARM', accent:'#4de0a0',
    text:'Mehr Gegner — aber jeder fällt fast von allein.', countMult:1.30, hpMult:0.55 },
  { id:'blei', name:'Bleiregen', kurz:'BLEI', accent:'#9aa7b8',
    text:'Panzer überall. Volltreffer durchschlagen hier doppelt so gut.',
    panzerChance:0.34, panzerAb:3, durchlassMult:0.5 },
  { id:'turbulenz', name:'Turbulenz', kurz:'TURBULENZ', accent:'#ffd257',
    text:'Alles ist schneller — und die Beute lohnt sich.', speedMult:1.20, beuteMult:1.6 },
  { id:'schatz', name:'Meteorschatz', kurz:'SCHATZ', accent:'#c77dff',
    text:'Träge Träger, reiche Fracht. Sammel, was fliegt!', schatz:true, beuteMult:1.25 },
];

function tagesDatum(){ return new Date().toISOString().slice(0,10); }
function tagesSeed(datum){
  const s='OB5-'+datum;
  let h=2166136261>>>0;
  for(let i=0;i<s.length;i++){ h^=s.charCodeAt(i); h=Math.imul(h,16777619); }
  return h>>>0;
}
/* Der Tagesvorschlag hängt nur am Datum und an den Freischaltungen: Am selben Tag
   sehen zwei Spieler mit gleichem Stand dasselbe Signal. */
function tagesSignal(datum){
  datum=datum||tagesDatum();
  const rng=mulberry32(tagesSeed(datum));
  const figuren=['held'];
  if(save.unlocks['figur:konstrukt']) figuren.push('konstrukt');
  const fig=figuren[Math.floor(rng()*figuren.length)];
  const frei=ACTIVE_IDS.filter(abilUnlocked);
  const m1=frei[Math.floor(rng()*frei.length)]||'wirbel';
  const rest=frei.filter(id=>id!==m1);
  const m2=rest.length? rest[Math.floor(rng()*rest.length)] : null;
  const twist=TAGES_TWISTS[Math.floor(rng()*TAGES_TWISTS.length)];
  const regel=TAGES_REGELN[Math.floor(rng()*TAGES_REGELN.length)];
  return { datum, seed:tagesSeed(datum), figur:fig, slot1:m1, slot2:m2, twist, regel };
}
function baueTagesFaktoren(){
  tagesFaktoren={};
  if(laufVorgabe&&laufVorgabe.twist&&laufVorgabe.twist.faktor) Object.assign(tagesFaktoren,laufVorgabe.twist.faktor);
  if(laufVorgabe&&laufVorgabe.regel&&laufVorgabe.regel.faktor) Object.assign(tagesFaktoren,laufVorgabe.regel.faktor);
}
function tagesFaktor(key){ return tagesFaktoren[key]||1; }
function beuteFaktor(){ return tagesFaktor('beute')*((laufEreignis&&laufEreignis.beuteMult)||1); }

function startTageslauf(){
  const sig=tagesSignal();
  sig.altHilfe=save.hilfe;
  laufVorgabe=sig;
  save.hilfe='standard';        // der Tageslauf zählt auf Standard — Bestmarken bleiben getrennt
  resetGame();
}
/* Ende eines Tageslaufs: die Hilfsstufe des Spielers wird zurückgegeben, damit der
   Tageslauf sie nicht dauerhaft überschreibt. */
function beendeTageslaufVorgabe(){
  if(laufVorgabe&&laufVorgabe.altHilfe) save.hilfe=laufVorgabe.altHilfe;
  laufVorgabe=null;
  renderTagessignal();
}
function tagesAbschluss(){
  if(!laufVorgabe||messlauf) return '';
  save.tage=save.tage||{};
  const tag=laufVorgabe.datum, vor=save.tage[tag]||0;
  if(wave>vor) save.tage[tag]=wave;
  const schluessel=Object.keys(save.tage).sort();
  while(schluessel.length>7) delete save.tage[schluessel.shift()];   // nur die letzten sieben Tage bleiben
  let text='';
  if(save.tagesLohnTag!==tag){
    save.tagesLohnTag=tag; save.stars+=TAGES_LOHN;
    text=' · +'+TAGES_LOHN+' ◆';
    pushToast('Tageslauf geschafft'+text);
  } else {
    pushToast('Tageslauf: beste Welle '+save.tage[tag]);
  }
  persist();
  return text;
}
function renderTagessignal(){
  const karte=document.getElementById('start-tagessignal');
  const knopf=document.getElementById('tages-btn');
  if(!karte&&!knopf) return;
  const sig=tagesSignal();
  const best=((save.tage||{})[sig.datum])||0;
  const machtnamen=[sig.slot1,sig.slot2].filter(Boolean).map(id=>ABILITIES[id]?ABILITIES[id].name:id).join(' + ');
  if(karte){
    karte.innerHTML=
      '<span class="orbitauftrag-label">Tageslauf · '+sig.datum+'</span>'+
      '<div class="orbitauftrag-kopf"><b>'+FIGUREN[sig.figur].name+'</b><span>'+(best>0?'Beste Welle '+best:'offen')+'</span></div>'+
      '<span class="orbitauftrag-figur">'+machtnamen+'</span>'+
      '<p>✦ '+sig.twist.name+' — '+sig.twist.text+'<br>⚑ '+sig.regel.name+' — '+sig.regel.text+'</p>'+
      '<div class="orbitauftrag-fuss"><span>'+(best>0? 'Erneut spielen erlaubt':'Lohn: '+TAGES_LOHN+' ◆ für den ersten Abschluss heute')+'</span></div>';
  }
  if(knopf) knopf.textContent='⚡ Tageslauf'+(best>0?' · Welle '+best:'');
}
function waehleWellenEreignis(){
  laufEreignis=null;
  if(wave%5===0) return;                                   // nie im Bosskampf
  /* Fünf Ereignisse pro Standardlauf, gleichmäßig zwischen die Bosse gelegt:
     6/11/16/21/26 — kollidiert nie mit dem Bossrhythmus 5/10/15/20/25/30. */
  if(wave>=6 && (wave-1)%5===0){
    const nr=(wave-6)/5;
    const pool=EREIGNISSE.filter(e=>e.id!==letztesEreignisId);
    // Indexbasiert aus dem Tages-Seed: dieselbe Ereignisfolge für alle,
    // unabhängig vom Spieltempo.
    laufEreignis=pool[Math.floor(laufStrom('ereignis',nr)()*pool.length)];
    letztesEreignisId=laufEreignis.id;
  }
}
function streueMeteorschatz(){
  for(let i=0;i<4;i++){
    const a=laufRnd()*Math.PI*2, rr=120+laufRnd()*160;
    dropStar(player.x+Math.cos(a)*rr, player.y+Math.sin(a)*rr, Math.round(12*beuteFaktor()));
  }
}
function hitstop(ms){ hitstopMs=Math.min(140,hitstopMs+ms); }

// Freischaltbare Fähigkeiten (Metadaten für Gating + Anzeige + Buff-Stufen)
// slot: 'active' (2 Slots, im Codex umrüstbar) | 'passive' (max 5) | 'weapon' (Waffen-Upgrade)
// Freischalt-Wellen stehen ausschließlich in MILESTONES — hier bewusst nicht doppelt.
const ABILITIES = {
  kettenblitz:   { name:'Kettenblitz',     desc:'Treffer springt zum nächsten Gegner',                      slot:'passive', iconKey:'kette'  },
  konterstoss:   { name:'Konterstoß',      desc:'Wirst du getroffen, schlägst du automatisch zurück',        slot:'passive', iconKey:'konter' },
  splitter:      { name:'Splitter',        desc:'Kreisende Energiesplitter richten Zusatzschaden an',         slot:'passive', iconKey:'splitter', voll:true },
  phaser:        { name:'Phaser',          desc:'Die Klingenspitze schießt durch bis zu drei Gegner in ihrer Bewegungsrichtung', slot:'passive', iconKey:'phaser' },
  lebensregen:   { name:'Lebensregen',     desc:'Regeneriert Leben pro getötetem Gegner',                     slot:'passive', iconKey:'leben' },
  dreifachklinge:{ name:'Dreifachklinge',  desc:'Dritte Klinge — lückenlose Deckung',                         slot:'weapon',  iconKey:'dreifach', voll:true },
  wirbel:        { name:'Wirbel',          desc:'Spirale rund um dich — massiver Schaden',                    slot:'active',  iconKey:'wirbel',  start:true },
  stoss:         { name:'Schock',          desc:'Elektrische Schockwelle — stößt Gegner weg',                 slot:'active',  iconKey:'stoss',  start:true },
  bombe:         { name:'Bombe',           desc:'Legt eine Bombe, die verzögert explodiert',                  slot:'active',  iconKey:'bombe' },
  nova:          { name:'Machtblitz-Nova', desc:'Elektrischer Ring — Schaden und kurze Betäubung',            slot:'active',  iconKey:'nova' },
  // Neu in der Konzeptfassung — zwei davon zahlen direkt auf den Volltreffer ein
  sog:           { name:'Sog',             desc:'Zieht alle Gegner heran — bringt sie in deine Klinge',       slot:'active',  iconKey:'reichweite' },
  schneide:      { name:'Schneide',        desc:'Volltreffer richten deutlich mehr Schaden an',               slot:'passive', iconKey:'schaden' },
  nachhall:      { name:'Nachhall',        desc:'Jeder vierte Volltreffer löst eine Druckwelle aus',          slot:'passive', iconKey:'nachhall' },
};
const ACTIVE_IDS=['wirbel','stoss','bombe','nova','sog'];
const MAX_ABIL_LEVEL=5;

/* WAS EINE STUFE BRINGT.
   Vorher stand auf einer Steigerungskarte nur "Stufe 2 von 5" — man wusste nicht,
   wofür man sich entscheidet. Jetzt steht der konkrete Zuwachs drauf.
   Zusätzlich gibt es EINEN echten mechanischen Sprung, immer beim Erreichen von
   Stufe 4. Das gibt jeder Macht einen Moment, auf den man hinspielt, statt einer
   flachen Prozentleiter. Zum Ausgleich ist abilLevelScale von 0,12 auf 0,10
   gesenkt: Stufe 5 liegt damit bei +40 % statt +48 %, der Sprung kommt obendrauf. */
const SPRUNG_STUFE=4;
const ACTIVE_MODS={
  wirbel:['A: Zieht nahe Gegner sanft zu deiner Klinge','B: Hinterlässt an deiner Position ein kurz nachbrennendes Feld'],
  stoss:['Weggestoßene Gegner rammen andere und verletzen beide','Hinterlässt ein Feld, das Gegner verlangsamt'],
  bombe:['Haftet automatisch am nächsten Gegner','Erneutes Drücken zündet die Bombe vorzeitig'],
  nova:['Treffer laden eine kleine Barriere auf','Gezielte Energiebögen treffen nahe Gegner'],
  sog:['Hält Gegner kurz in Klingenreichweite','Lässt Gegner kurz um dich kreisen'],
};
const STUFEN={
  wirbel:      { pro:'+10 % Schaden',                              sprung:'Ein zweiter, weiter außen liegender Ring schlägt mit' },
  stoss:       { pro:'+10 % Schaden',                              sprung:'Die Welle betäubt alle Getroffenen kurz' },
  bombe:       { pro:'+10 % Schaden, kürzere Zündzeit, mehr Radius',sprung:'Du legst zwei Bomben statt einer' },
  nova:        { pro:'+10 % Schaden, etwas mehr Reichweite',       sprung:'Eine zweite Welle zündet kurz danach nach' },
  kettenblitz: { pro:'+10 % Sprungschaden, mehr Sprungweite',      sprung:'Der Blitz springt auf zwei Gegner statt auf einen' },
  konterstoss: { pro:'+10 % Konterschaden',                        sprung:'Der Konter schleudert doppelt so weit weg' },
  splitter:    { pro:'+10 % Splitterschaden',                      sprung:'Ein dritter Splitter kreist mit' },
  phaser:      { pro:'+10 % Schussschaden',                        sprung:'Jeder Volltreffer feuert einen zusätzlichen Klingenschuss' },
  lebensregen: { pro:'+50 % Heilung pro besiegtem Gegner',         sprung:'Du regenerierst zusätzlich dauerhaft Leben' },
  sog:         { pro:'+10 % Reichweite und Zugkraft',              sprung:'Herangezogene Gegner werden kurz betäubt' },
  schneide:    { pro:'+8 % Schaden bei Volltreffern',               sprung:'Volltreffer durchschlagen jede Panzerung' },
  nachhall:    { pro:'+12 % Schaden der Druckwelle',               sprung:'Schon jeder dritte Treffer löst sie aus' },
};
// Text für den Schritt von `vonStufe` auf die nächste Stufe
function stufenText(id, vonStufe){
  const s=STUFEN[id]; if(!s) return ABILITIES[id]? ABILITIES[id].desc : '';
  return (vonStufe+1===SPRUNG_STUFE && s.sprung)? s.sprung : s.pro;
}
// Ist der mechanische Sprung dieser Macht schon freigeschaltet?
function hatSprung(id){ return abilityLevel(id)>=SPRUNG_STUFE; }
// Zeile für den Codex: Was bringt die nächste Steigerung dieser Macht?
function naechsteStufeText(id, lv){
  if(lv>=MAX_ABIL_LEVEL) return 'Höchststufe erreicht';
  const sprung=(lv+1===SPRUNG_STUFE) && STUFEN[id] && STUFEN[id].sprung;
  return (sprung? '★ Stufe '+(lv+1)+': ' : 'Stufe '+(lv+1)+': ')+stufenText(id, lv);
}

/* ENTWICKLUNGEN — der Langzeit-Haken (Vorbild: Vampire Survivors).
   Eine aktive Macht auf Maximalstufe PLUS die passende getragene Passive
   verschmelzen zu einer neuen Form, die sich anders verhält. Bewusst
   deterministisch: im Codex nachlesbar, man kann darauf hinspielen. */
const EVOLUTIONS={
  sturmwirbel:   { base:'wirbel', req:'splitter',    name:'Sturmwirbel',
                   desc:'Zwei gegenläufige Ringe kreisen kurz, danach schießt ein Kranz aus Geschossen nach außen' },
  kettengewitter:{ base:'stoss',  req:'kettenblitz', name:'Kettengewitter',
                   desc:'Die Schockwelle springt als Blitz auf alle Getroffenen über' },
  streubombe:    { base:'bombe',  req:'konterstoss', name:'Streubombe',
                   desc:'Die Bombe zerspringt in drei kleinere Sprengsätze' },
  novakaskade:   { base:'nova',   req:'phaser',      name:'Nova-Kaskade',
                   desc:'Die Nova feuert zusätzlich Phaser-Salven in alle Richtungen' },
  gravitationsbruch:{ base:'sog', req:'nachhall',    name:'Gravitationsbruch',
                   desc:'Festgehaltene Gegner kreisen in Klingenreichweite und enden in einer Druckwelle' },
};

/* BOSS-VARIANTEN — vier Typen, die reihum kommen. Jeder hat eine Leitfähigkeit,
   eine eigene Farbe und eine eigene Silhouette. Vorher sahen alle Bosse gleich aus,
   sodass nach dem ersten Kampf optisch nichts Neues mehr kam. */
const BOSS_KINDS=[
  { id:'waechter', name:'Wächter',      color:'#c77dff', rgb:'199,125,255', leit:'shock', exklusiv:'schild',
    tip:'Lauf um seinen Schild herum!',    form:'hex'   },
  { id:'brutmutter',name:'Brutmutter',  color:'#4de0a0', rgb:'77,224,160',  leit:'minions', exklusiv:'brut',
    tip:'Sie ruft ständig Verstärkung!',   form:'organic'},
  { id:'rammbock', name:'Rammbock',     color:'#ff7a3d', rgb:'255,122,61',  leit:'ram',
    tip:'Er nimmt Anlauf — geh zur Seite!',form:'wedge' },
  { id:'spiralwerfer',name:'Spiralwerfer',color:'#5ac8e0', rgb:'90,200,224',leit:'spiral', exklusiv:'sperre',
    tip:'Die Spirale dreht sich — lauf mit!',form:'ring' },
];
// Reihum, damit jeder Boss-Kampf anders aussieht (Welle 5,10,15,20 -> 0,1,2,3)
function bossKindFor(w){ return BOSS_KINDS[(Math.floor(w/5)-1+BOSS_KINDS.length*4) % BOSS_KINDS.length]; }
const PASSIVE_IDS=['kettenblitz','konterstoss','splitter','phaser','lebensregen','nachhall'];

/* DER ORBITPFAD V2
   Ein einziger, acht Stufen tiefer Laufpfad mit 19 möglichen Investitionen bei
   höchstens 15 regulären Punkten. Die zwei adaptiven Module schaffen echten Verzicht,
   ohne einen zweiten Ast oder zusätzliche Bedienung einzuführen. Slot 2 bleibt ein
   Werkzeug und erhält keinen eigenen Baum. */
function steigereMacht(id, stufe){ runAbilities[id]=Math.max(runAbilities[id]||1, stufe); }
function treeRang(id){ return Number(runTree[id])||0; }
function regularInvested(){
  return Object.entries(runTree).reduce((sum,[id,rank])=>sum+(id.startsWith('echo_')?0:Number(rank)||0),0);
}
const ACTIVE_MOD_SHORT={
  wirbel:['ZUG','ZONE'], stoss:['KOLL.','LANGSAM'], bombe:['HAFT','SOFORT'],
  nova:['SCHILD','BÖGEN'], sog:['HALT','ORBIT']
};
/* Zwei Knoten, aber pro Hauptmacht vier konkrete Mechaniken. Name und Kurzzeile
   zeigen stets den nächsten Rang, sodass kein Öffnen nötig ist, um den Kauf zu lesen. */
const MODULE_TEXT={
  wirbel:{
    blade:[['Wirbelkerbe','GRUPPENZUG','Jeder vierte Volltreffer zieht nahe Gegner sichtbar zum Treffpunkt.'],['Ringladung','WIRBEL LÄDT','Nach Wirbel hinterlassen deine nächsten Treffer kurz nachbrennende Felder.']],
    power:[['Wanderkern','FELD WANDERT','Deine Mutation wandert kurz mit dir oder setzt ein zweites Feld.'],['Gegenstrom','RING KEHRT UM','Ein verzögerter Gegenstrom zieht Gegner zurück in die Klingenbahn.']]},
  stoss:{
    blade:[['Leitkerbe','MARKE ZÜNDET','Volltreffer markieren ihr Ziel; ein weiterer Volltreffer entlädt die Marke.'],['Kettenkante','BLITZ SPRINGT','Entladungen springen formabhängig auf weitere Ziele.']],
    power:[['Rückleiter','ZIELE KEHREN','Weggestoßene Ziele werden nach kurzer Zeit zur Klinge zurückgeholt.'],['Feldbruch','MINI-SCHOCK','Die Rückkehr endet in einer kleinen betäubenden Schockwelle.']]},
  bombe:{
    blade:[['Zündkerbe','SCHNELLZÜNDUNG','Volltreffer nahe einer Bombe lassen sie früher zünden.'],['Bombenpass','BOMBE HEFTET','Der nächste Volltreffer heftet eine gelegte Bombe an sein Ziel.']],
    power:[['Sprengkette','FOLGELADUNG','Die Kernexplosion legt genau eine kleine Folgeladung.'],['Kernsplitter','4 SPLITTER','Ein Kernvolltreffer schleudert vier Splitter heraus.']]},
  nova:{
    blade:[['Phasenkante','2 SALVEN','Nova lädt zwei formabhängige Klingensalven.'],['Sternenring','LETZTE NOVA','Die letzte Salve erzeugt am Treffer eine kleine Nova.']],
    power:[['Sternenfänger','FÄNGT SCHUSS','Nova wandelt feindliche Geschosse in eigene Phaser um.'],['Sternenbruch','MINI-NOVA','Gefangene Phaser zünden beim Treffer eine kleine Nova.']]},
  sog:{
    blade:[['Kernkerbe','KERN LENKBAR','Volltreffer auf gezogene Gegner reißen die Nachbarn mit.'],['Gravschnitt','3. NACHHALL','Der dritte Kerntreffer löst einmalig eine Nachhallwelle aus.']],
    power:[['Gravbindung','ZIELE KREISEN','Gezogene Ziele kreisen kurz auf Klingenreichweite.'],['Kernbruch','UMLAUF ENDET','Der Umlauf endet in einer Gruppenwelle mit zusätzlichem Schaden.']]}
};
/* Machtmeisterschaft: früher EIN Knoten mit 3 Rängen, jetzt drei Knoten mit je
   einem — ein Punkt kauft eine ganze, benannte Mechanik statt eines Drittels davon.
   Die Wirkung selbst steht unverändert in den execute*-Funktionen (treeFlags.powerMaster
   bzw. der über steigereMacht() gesetzte Fähigkeitslevel); hier nur Name/Kurztext je Rang. */
const POWER_MASTER_TEXT={
  wirbel:[
    ['Außenbahn','ÄUSSERE BAHN','Dein Wirbel reicht spürbar weiter nach außen.'],
    ['Kernschlag','TRIFFT KERN','Ein zusätzlicher Kernschlag trifft zugleich alles direkt neben dir.'],
    ['Doppelring','ZWEITER RING','Ein zweiter äußerer Ring trifft zusätzlich mit halbem Schaden.']],
  stoss:[
    ['Schockmarke','MARKIERT ZIELE','Jeder Treffer markiert sein Ziel; ein Volltreffer löst dort eine Entladung aus.'],
    ['Marklähmung','MARKE: BETÄUBT','Die Entladung einer Marke betäubt das Ziel zusätzlich kurz.'],
    ['Stoßbetäubung','ALLE BETÄUBT','Jeder Stoßtreffer betäubt kurz – auch ohne Marke.']],
  bombe:[
    ['Kernzone','STARKER KERN','Treffer im Bombenkern verursachen deutlich mehr Schaden.'],
    ['Panzerbruch','ENTPANZERT','Kernnahe Treffer entfernen 2,6 s lang die Panzerung.'],
    ['Doppelwurf','2. BOMBE','Jeder Wurf legt eine zweite, versetzt zündende Bombe.']],
  nova:[
    ['Novasalve','4 GESCHOSSE','Nova feuert vier Geschosse radial aus.'],
    ['Novaecho','2. WELLE','Eine verzögerte zweite Nova-Welle folgt automatisch.'],
    ['Sternenschauer','8 GESCHOSSE','Doppelt so viele Geschosse – das Echo trifft deutlich härter.']],
  sog:[
    ['Kernbindung','KERN MARKIERT','Der nächstgezogene Gegner wird 3,6 s zum Gravitationskern.'],
    ['Kernsammlung','ZIEHT GRUPPE','Ein Volltreffer am Kern zieht nahe Gegner zusammen.'],
    ['Sogbetäubung','BETÄUBT ALLE','Jeder gezogene Gegner wird kurz betäubt.']]
};

/* DIE VIER HALTUNGEN
   Früher zwei Knoten, deren Inhalt von der Figur abhing. Jetzt vier eigene Knoten
   in derselben exclusiveGroup — die Weiche zieht zwei davon. Damit können sich
   Lichthüter- und Leerenklingen-Identität erstmals mischen. */
const HALTUNGEN=[
  {id:'haltung_waechter', name:'Wächter', short:'BARRIERE', icon:'◈',
   desc:'Voller Fokus gibt dir Barriere und verlangsamt Gegner in der Nähe.',
   apply:()=>{treeFlags.waechter=true;waechterLadung=false;},
   evo:['Leuchtfeuer','LICHTPFAD','Während einer Barriere hinterlässt deine Klinge bremsende Lichtspuren.',()=>{treeFlags.leuchtfeuer=true;}]},
  {id:'haltung_sonne', name:'Sonnenjäger', short:'SONNENSERIE', icon:'☀',
   desc:'Drei Volltreffer in Folge beschleunigen kurz deinen Orbit.',
   apply:()=>{treeFlags.sonnenjaeger=true;sonnenSerie=0;sonnenTempoUntil=0;},
   evo:['Sonnenorbit','SONNENBAHN','Solange dein Orbit beschleunigt ist, wird die Volltreffer-Zone schmaler und trifft härter.',()=>{treeFlags.sonnenorbit=true;}]},
  {id:'haltung_verschlinger', name:'Verschlinger', short:'LEBENSRAUB', icon:'◆',
   desc:'Besiegte Gegner heilen einen kleinen Teil deines Lebens.',
   apply:()=>{treeFlags.leerenHeilung=.006;},
   evo:['Satter Abgrund','HEIL-KOMBO','Besiegte Gegner heilen dich stärker, solange du angeschlagen bist.',()=>{treeFlags.satterAbgrund=true;}]},
  {id:'haltung_abgrund', name:'Abgrund', short:'RISIKO-SCHADEN', icon:'▼',
   desc:'Fehlendes Leben steigert deinen Volltreffer-Schaden stark.',
   apply:()=>{treeFlags.leerenRisikoBonus=.28;},
   evo:['Ereignishorizont','3 KLINGEN','Bei wenig Leben kreisen drei Klingen um dich.',()=>{treeFlags.ereignishorizont=true;}]},
];
const HALTUNG_IDS=HALTUNGEN.map(h=>h.id);
// Welche Haltung wurde in diesem Lauf gewählt? Leer, solange keine gekauft ist.
function gewaehlteHaltung(){ return HALTUNGEN.find(h=>treeRang(h.id)) || null; }

function treeNodes(){
  const id=activeSlot1, pair=Object.entries(EVOLUTIONS).find(([,e])=>e.base===id);
  const evoId=pair[0], evo=pair[1], power='power_'+id, partner='partner_'+id;
  // Vormals moduleText(kind,id) mit rangabhängiger Auswahl — jeder Rang ist jetzt ein
  // eigener Knoten und greift fest auf seinen Tabelleneintrag zu.
  const bm1=MODULE_TEXT[id].blade[0], bm2=MODULE_TEXT[id].blade[1];
  const pm1=MODULE_TEXT[id].power[0], pm2=MODULE_TEXT[id].power[1];
  const mt=POWER_MASTER_TEXT[id];
  const n=[
    {id:'blade_multi',stage:0,col:2,kind:'major',name:'Doppelorbit',short:'2 KLINGEN',desc:'Zwei Klingen kreisen dir gegenüber: verlässlich, aber jede trifft schwächer.',icon:'Ⅱ',exclusiveGroup:'orbit',spine:'blade',apply:()=>{bonuses.blades=2;treeFlags.doppelorbit=true;earnBadge('doppel');}},
    {id:'blade_single',stage:0,col:6,kind:'major',name:'Präzisionsorbit',short:'TREFFER ×1,45',desc:'Eine lange, schmale Klinge mit deutlich stärkerem Volltreffer, der Panzerung durchschlägt.',icon:'┃',exclusiveGroup:'orbit',spine:'blade',apply:()=>{treeFlags.singularorbit=true;}},
    {id:power+'_a',stage:1,col:2,kind:'major',name:ABILITIES[id].name+' · A',short:ACTIVE_MOD_SHORT[id][0],desc:ACTIVE_MODS[id][0].replace(/^A:\s*/,''),icon:'A',reqAny:['blade_multi','blade_single'],exclusiveGroup:'power_mod',spine:'mutation',apply:()=>treeFlags['mod_'+id]='a'},
    {id:power+'_b',stage:1,col:6,kind:'major',name:ABILITIES[id].name+' · B',short:ACTIVE_MOD_SHORT[id][1],desc:ACTIVE_MODS[id][1].replace(/^B:\s*/,''),icon:'B',reqAny:['blade_multi','blade_single'],exclusiveGroup:'power_mod',spine:'mutation',apply:()=>treeFlags['mod_'+id]='b'},
    {id:partner,stage:2,col:2,kind:'buff',power:id,passive:evo.req,name:ABILITIES[evo.req].name,short:'VOLL',desc:ABILITIES[evo.req].desc+'. '+STUFEN[evo.req].sprung+'.',icon:'✦',reqAny:[power+'_a',power+'_b'],spine:'partner',apply:()=>runAbilities[evo.req]=SPRUNG_STUFE},
    {id:'blade_module',stage:2,col:4,kind:'buff',name:bm1[0],short:bm1[1],desc:bm1[2],icon:'◒',reqAny:[power+'_a',power+'_b'],apply:()=>treeFlags.bladeModule=1},
    {id:'blade_module_2',stage:2,col:6,kind:'buff',name:bm2[0],short:bm2[1],desc:bm2[2],icon:'◒',reqAll:['blade_module'],apply:()=>treeFlags.bladeModule=2},
    ...HALTUNGEN.map((h,i)=>({id:h.id,stage:3,col:i<2?2:6,kind:'major',name:h.name,short:h.short,desc:h.desc,icon:h.icon,reqAll:[partner],reqRanks:{[partner]:1},exclusiveGroup:'char_route',spine:'char',apply:h.apply})),
    {id:'power_master_1',stage:4,col:2,kind:'buff',name:mt[0][0],short:mt[0][1],desc:mt[0][2],icon:'⬡',reqAny:HALTUNG_IDS,spine:'master',apply:()=>{steigereMacht(id,2);treeFlags.powerMaster=1;}},
    {id:'power_master_2',stage:4,col:4,kind:'buff',name:mt[1][0],short:mt[1][1],desc:mt[1][2],icon:'⬡',reqAll:['power_master_1'],apply:()=>{steigereMacht(id,3);treeFlags.powerMaster=2;}},
    {id:'power_master_3',stage:4,col:6,kind:'buff',name:mt[2][0],short:mt[2][1],desc:mt[2][2],icon:'⬡',reqAll:['power_master_2'],apply:()=>{steigereMacht(id,4);treeFlags.powerMaster=3;}},
    {id:'power_module',stage:5,col:2,kind:'buff',name:pm1[0],short:pm1[1],desc:pm1[2],icon:'◉',reqAny:HALTUNG_IDS,apply:()=>treeFlags.powerModule=1},
    {id:'power_module_2',stage:5,col:4,kind:'buff',name:pm2[0],short:pm2[1],desc:pm2[2],icon:'◉',reqAll:['power_module'],apply:()=>treeFlags.powerModule=2},
    (()=>{const h=gewaehlteHaltung(), e=h?h.evo:HALTUNGEN[0].evo;
      return {id:'blade_synergy',stage:5,col:6,kind:'major',name:e[0],short:e[1],desc:e[2],icon:'✦',reqAll:['power_master_1'],spine:'synergy',apply:e[3]};})(),
    {id:'evo_'+evoId,stage:6,col:2,kind:'evo',power:id,name:evo.name,short:'SUPER-MACHT',desc:evo.desc,icon:'✹',reqAll:['power_master_1',partner],spine:'evolution',evo:evoId,apply:()=>{steigereMacht(id,5);runEvolutions[id]=evoId;announce('Entwicklung!',evo.name,'#ffd257');unlockFx=1;}},
    {id:'orbit_resonance_1',stage:6,col:4,kind:'buff',name:'Kopplung',short:'KOPPELT MÄCHTE',desc:'Koppelt beide Mächte: ein Einsatz kürzt danach die Abklingzeit der anderen.',icon:'◎',reqAll:['blade_synergy','evo_'+evoId],spine:'resonance',apply:()=>{treeFlags.orbitResonanz=true;}},
    {id:'orbit_resonance_2',stage:6,col:6,kind:'buff',name:'Sofortschaltung',short:'SOFORT BEREIT',desc:'Ein fokussierter Einsatz macht die andere Macht sofort bereit.',icon:'◎',reqAll:['orbit_resonance_1'],apply:()=>{treeFlags.resonanzSofort=true;}},
    {id:'orbit_resonance_3',stage:7,col:2,kind:'buff',name:'Resonanzklinge',short:'ZUSATZKLINGE',desc:'Ein fokussierter Einsatz lässt 4 s eine Zusatzklinge mitkreisen.',icon:'◎',reqAll:['orbit_resonance_2'],apply:()=>{treeFlags.resonanzKlinge=true;}},
    {id:'orbit_crown',stage:7,col:5,kind:'capstone',name:'Orbitkrone',short:treeRang('orbit_crown')?'KERNRESERVE':'FINALE',desc:treeRang('orbit_crown')?'Kernreserve gibt +10 % maximales Leben und vollen Fokus bei jedem Bossbeginn.':(treeRang('blade_multi')?'Machtechos wechseln sauber zwischen 2 Zielklingen.':'Drei Volltreffer in Folge laden einen Strahl. Er durchschlägt beim nächsten Treffer alle Gegner auf seiner Linie.'),icon:'★',maxRank:metaLevel('startimpuls')?2:1,reqAll:['orbit_resonance_1','evo_'+evoId],minInvested:14,spine:'crown',apply:rank=>{if(rank===1){treeFlags.orbitKrone=true;treeFlags.kronenform=treeRang('blade_multi')?'dopp':'praez';praezSerie=0;kronenZielklinge=0;kronenMachtId='';kronenMachtUntil=0;}else{const vorher=player.maxHp;treeFlags.kernreserve=true;player.maxHp=Math.round(player.maxHp*1.1);player.hp=Math.min(player.maxHp,player.hp+player.maxHp-vorher);}}},
  ];
  if(regularTreeFrozen){
    n.push(
      {id:'echo_blade',stage:8,col:3,kind:'endless',endless:true,name:'Klingenecho',short:'KLINGEN-ECHO',desc:'Volltreffer feuern zusätzliche Schattenklingen ab, mit steigendem Rang öfter und stärker.',icon:'◐',maxRank:3,reqAll:['orbit_crown'],exclusiveGroup:'endless_echo',apply:rank=>treeFlags.bladeEcho=rank},
      {id:'echo_power',stage:8,col:5,kind:'endless',endless:true,name:'Machtecho',short:'MACHT-ECHO',desc:'Deine Hauptmacht wiederholt sich kurz danach von selbst. Höhere Ränge fügen die Mutation hinzu und lösen bei fokussiertem Einsatz einen zweiten Nachhall aus.',icon:'◉',maxRank:3,reqAll:['orbit_crown'],exclusiveGroup:'endless_echo',apply:rank=>treeFlags.powerEcho=rank}
    );
  }
  return n;
}

// Abzeichen (Sammlung). Bosse alle 5 Wellen sind die natürlichen Etappen.
const BADGES = {
  boss1:   { name:'Erster Boss',   desc:'Den ersten Boss bezwungen',        glyph:'V' },
  welle10: { name:'Standhaft',     desc:'Welle 10 überstanden',             glyph:'X' },
  welle15: { name:'Unaufhaltsam',  desc:'Welle 15 überstanden',             glyph:'XV' },
  welle20: { name:'Veteran',       desc:'Welle 20 überstanden',             glyph:'XX' },
  welle25: { name:'Legende',       desc:'Welle 25 überstanden',             glyph:'XXV' },
  welle30: { name:'Unsterblich',   desc:'Welle 30 überstanden',             glyph:'XXX' },
  doppel:  { name:'Zwei Klingen',  desc:'Die Doppelklinge in einem Lauf geholt', glyph:'≡' },
  makellos:{ name:'Makellos',      desc:'Einen Boss ohne einen Treffer besiegt',  glyph:'✦' },
  meister: { name:'Meisterprüfung',desc:'Zehn Bosse insgesamt besiegt',     glyph:'★' },
};

/* Etappen: ERREICHTE Welle schaltet frei (nicht erst der Boss-Kill).
   Bewusst früh gestaffelt: vorher lagen Freischaltungen bei Welle 25–40, also weit
   jenseits dessen, was Spieler tatsächlich erreichen — die Hälfte des Inhalts war tot.
   Abzeichen bleiben an ihren angestammten Wellen. */
/* Genau EINE Freischaltung je Etappe, gleichmäßig alle 3 Wellen.
   Vorher gab es teils zwei auf einmal und schon ab Welle 3 — dadurch fühlte sich
   keine davon nach etwas an. Die erste liegt jetzt auf dem ersten Boss (Welle 5). */
const MILESTONES = [
  // Macht- und Charakterfunde sind Blaupausen: Der Fund gewährt den großen
  // Werkstattrabatt, das Projekt macht den Inhalt anschließend dauerhaft startbar.
  { wave:5,  badge:'boss1',   unlocks:[{kind:'ability',id:'bombe'}] },
  { wave:10, badge:'welle10', unlocks:[{kind:'skin',id:'bernstein'}] },
  { wave:15, badge:'welle15', unlocks:[{kind:'figur',id:'konstrukt'}] },
  { wave:20, badge:'welle20', unlocks:[{kind:'ability',id:'nova'}] },
  { wave:25, badge:'welle25', unlocks:[{kind:'form',id:'wucht'}] },
  { wave:30, badge:'welle30', unlocks:[{kind:'ability',id:'sog'}] },
];
// Beim Erreichen einer Welle: Abzeichen + Freischaltungen gewähren
function checkMilestones(){
  const m=MILESTONES.find(x=>x.wave===wave);
  if(!m) return;
  if(m.badge) earnBadge(m.badge);
  if(m.unlocks) for(const u of m.unlocks) grantUnlock(u);
  persist();
}

/* TESTFASSUNG des Konzepts vom 11.8.2026 — läuft neben der stabilen Version.
   Eigener Speicherschlüssel, damit ein Testlauf den echten Spielstand nicht anfasst. */
const SAVE_KEY='orbitblade_konzept_save', SAVE_VERSION=10;
// opts: Bedien-Einstellungen (Seite und Anordnung der Fähigkeiten-Knöpfe)
// best ist jetzt je Hilfsstufe getrennt — sonst wäre die Bestmarke nicht vergleichbar
const DEFAULT_SAVE={ v:SAVE_VERSION, best:{}, badges:{}, unlocks:{}, skin:'rubin', muted:false, bossKills:0, stars:0, meta:{}, tutorialDone:false, tutorialVersion:0, focusTutorialSeen:false,
  hilfe:'standard', gewonnen:false, endlosFrei:false, pruefFrei:0,
  opts:{ seite:'rechts', anordnung:'nebeneinander' },
  // Mit welchen aktiven Mächten jeder Lauf beginnt. Vorher war das fest verdrahtet,
  // sodass später freigeschaltete Mächte nie am Start standen.
  startMaechte:{ slot1:'wirbel', slot2:'stoss' },
  klingenform:'strahl', figur:'held', orbitauftrag:null, orbitauftragTauschTag:'', orbitauftragLetzterId:'',
  tage:{}, tagesLohnTag:'' };
let save = clone(DEFAULT_SAVE);

function clone(o){ return JSON.parse(JSON.stringify(o)); }
function loadSave(){
  try{
    const raw = (typeof localStorage!=='undefined') && localStorage.getItem(SAVE_KEY);
    if(raw){
      const data=JSON.parse(raw);
      save = migrateSave(data);
    }
  }catch(e){ save = clone(DEFAULT_SAVE); }
  // Fehlende Felder aus den Defaults auffüllen (macht spätere Updates unkritisch)
  save = Object.assign(clone(DEFAULT_SAVE), save);
  if(!save.best || typeof save.best!=='object') save.best={};   // Sicherheitsnetz nach der Migration
  if(!SKINS[save.skin]) save.skin='rubin';
  if(!istGueltigerOrbitauftrag(save.orbitauftrag)) save.orbitauftrag=null;
  if(typeof save.orbitauftragTauschTag!=='string') save.orbitauftragTauschTag='';
  if(typeof save.orbitauftragLetzterId!=='string' || !Object.prototype.hasOwnProperty.call(ORBIT_AUFTRAEGE,save.orbitauftragLetzterId)) save.orbitauftragLetzterId='';
}
function migrateSave(data){
  if(!data || typeof data!=='object') return clone(DEFAULT_SAVE);
  // v1 → v2: Meta-Währung (Sterne) + dauerhafte Meta-Upgrades
  if(data.v<2){
    data.stars = (data.stars|0) || 0;
    data.meta = data.meta || {};
  }
  // v2 → v3: Schwierigkeitsgrade abgeschafft — beste Welle der drei Grade übernehmen,
  // damit niemand seinen Rekord verliert.
  if(data.v<3){
    if(data.best && typeof data.best==='object'){
      data.best = Math.max(0, ...Object.keys(data.best).map(k=>data.best[k]|0));
    } else if(typeof data.best!=='number'){
      data.best = 0;
    }
  }
  // v3 → v4: Begleiter und Kampfdroide sind zu EINEM levelbaren Begleiter verschmolzen.
  // Wer beide gekauft hatte, startet auf Stufe 2 — niemand verliert einen Kauf.
  if(data.v<4){
    data.meta = data.meta || {};
    const alt=(data.meta.pet?1:0)+(data.meta.droide?1:0);
    if(alt>0 && !data.meta.begleiter) data.meta.begleiter=alt;
    delete data.meta.pet; delete data.meta.droide;
  }
  // v4 → v5 (Konzeptfassung): Bestmarke je Hilfsstufe statt einer einzelnen Zahl
  if(data.v<5){
    if(typeof data.best==='number') data.best = data.best>0 ? {standard:data.best} : {};
    if(!data.best || typeof data.best!=='object') data.best = {};
  }
  // v5 → v6: Die Werkstatt verkauft keine dauerhaften Prozentwerte mehr. Bereits
  // ausgegebene Fragmente werden vollständig erstattet; mechanische Käufe bleiben.
  if(data.v<6){
    const alteMeta=data.meta||{};
    const altKosten={metaDmg:[120,1.32],metaRange:[120,1.32],metaRotation:[120,1.32],metaMove:[110,1.38],metaHp:[110,1.38],metaRegen:[130,1.38]};
    let erstattung=alteMeta.reroll?320:0;
    for(const id in altKosten){
      const [basis,wachstum]=altKosten[id];
      for(let stufe=0;stufe<(alteMeta[id]||0);stufe++) erstattung+=Math.round(basis*Math.pow(wachstum,stufe));
    }
    data.stars=(data.stars||0)+erstattung;
    data.meta={};
    if(alteMeta.slot2) data.meta.slot2=1;
    if(alteMeta.vorlauf) data.meta.startimpuls=1;
    if(alteMeta.begleiter) data.meta.begleiter=Math.min(CONFIG.helfer.maxStufe,alteMeta.begleiter);
  }
  // v6 → v7: `charakter` war ein ungenutztes Duplikat von `figur`. Alte
  // Spielstände übernehmen es nur dann, wenn noch keine gültige Figur existiert.
  if(data.v<7){
    if(!data.figur && data.charakter) data.figur=data.charakter;
    delete data.charakter;
  }
  // v7 → v8: Der eine fünfstufige Begleiter wird zu fünf sichtbaren Projekten.
  // Bereits freigespielte Startinhalte werden großzügig als gebaut übernommen.
  if(data.v<8){
    data.meta=data.meta||{};
    const altBegleiter=Math.min(5,data.meta.begleiter||0);
    for(let i=1;i<=altBegleiter;i++) data.meta['begleiter'+i]=1;
    delete data.meta.begleiter;
    const alt=[['ability:bombe','bombenkern'],['ability:nova','novakern'],['ability:sog','gravitationskern'],['figur:konstrukt','leerenprotokoll']];
    for(const [unlock,projekt] of alt) if(data.unlocks&&data.unlocks[unlock]) data.meta[projekt]=1;
  }
  // v8 → v9: die drei laufgebundenen Ziele werden durch einen persistenten Auftrag ersetzt.
  if(data.v<9){
    data.orbitauftrag=null;
    data.orbitauftragTauschTag='';
    data.orbitauftragLetzterId='';
  }
  // v9 → v10: Der zweite aktive Slot ist entfallen. Wer das Projekt gebaut hat,
  // bekommt die 1.000 Fragmente zurück — nichts darf kommentarlos verloren gehen.
  if(data.v<10){
    data.meta=data.meta||{};
    if(data.meta.slot2){ data.stars=(data.stars||0)+1000; delete data.meta.slot2; }
    if(data.startMaechte) data.startMaechte.slot2=null;
  }
  data.v = SAVE_VERSION;
  return data;
}
/* `var` mit Absicht: Der Perf-Block setzt die Flagge erst weiter unten, persist() darf
   aber schon vorher aufgerufen werden können, ohne in die TDZ einer `const` zu laufen. */
var messlaufSchutz=false;
function persist(){
  if(messlaufSchutz) return;   // ein Messlauf darf den echten Spielstand nicht überschreiben
  try{ if(typeof localStorage!=='undefined') localStorage.setItem(SAVE_KEY, JSON.stringify(save)); }catch(e){}
}

// Ist ein Inhalt aktuell nutzbar? (Start-Inhalt, oder freigeschaltet und nicht Vollversions-gesperrt)
/* Eine Stelle, die für jede Freischaltungsart weiß, wo ihre Beschreibung liegt.
   Vorher stand die Zuordnung dreimal als kind==='skin'?…:… im Code — mit einer
   dritten und vierten Art wäre das nicht mehr zu pflegen gewesen. */
const UNLOCK_ARTEN = {
  skin:    { tabelle:()=>SKINS,     label:'Klingenfarbe' },
  form:    { tabelle:()=>FORMEN,    label:'Klingenform'  },
  figur:   { tabelle:()=>FIGUREN,   label:'Aussehen'     },
  ability: { tabelle:()=>ABILITIES, label:'Fähigkeit'    },
};
const BLUEPRINT_PROJECTS={
  'ability:bombe':'bombenkern','ability:nova':'novakern','ability:sog':'gravitationskern','figur:konstrukt':'leerenprotokoll'
};
function unlockMeta(kind, id){
  const a=UNLOCK_ARTEN[kind] || UNLOCK_ARTEN.ability;
  return a.tabelle()[id];
}
function isAvailable(kind, id){
  const meta = unlockMeta(kind, id);
  if(!meta) return false;
  if(meta.start) return true;
  const projekt=BLUEPRINT_PROJECTS[kind+':'+id];
  if(projekt) return !!(save.meta&&save.meta[projekt]);
  if(kind==='skin' && save.meta&&save.meta.farblabor) return true;
  if(kind==='form' && save.meta&&save.meta.formarchiv) return true;
  if(!save.unlocks[kind+':'+id]) return false;
  if(meta.voll && !FULL_VERSION) return false;
  return true;
}
// Wurde ein Inhalt am Meilenstein erreicht (unabhängig von Vollversion)?
function isEarned(kind, id){ const m=unlockMeta(kind, id); return !!(m&&(m.start||save.unlocks[kind+':'+id])); }

/* Stufenweise Enthüllung: Ein 7-Jähriger soll beim ersten Start nur "Spiel starten"
   sehen. Meta-Shop, Sammlung und Codex tauchen erst auf, wenn sie etwas enthalten —
   für Teenager aufwärts ist dann alles da, nur eben zum richtigen Zeitpunkt. */
function showEl(el,on){ if(el) el.style.display = on ? '' : 'none'; }
function hasAny(o){ return o && Object.keys(o).length>0; }
function codexRelevant(){
  const acts=ACTIVE_IDS.filter(id=>isAvailable('ability',id)).length;
  const pass=PASSIVE_IDS.filter(id=>isAvailable('ability',id)).length;
  return acts>2 || pass>0;      // erst sinnvoll, wenn es wirklich etwas zu tauschen gibt
}
function refreshMenuVisibility(){
  showEl(document.getElementById('hangar-btn'), true);
  showEl(document.getElementById('codex-btn'), true);
  showEl(document.getElementById('startmaechte-btn'), true);
}

function earnBadge(id){ if(id && !save.badges[id]){ save.badges[id]=true; persist(); pushToast('Abzeichen: '+BADGES[id].name); return true; } return false; }
function grantUnlock(u){
  if(!u) return;
  const key=u.kind+':'+u.id;
  if(save.unlocks[key]) return;
  save.unlocks[key]=true; persist();
  const meta = unlockMeta(u.kind, u.id);
  if(!meta) return;
  const label = (UNLOCK_ARTEN[u.kind]||UNLOCK_ARTEN.ability).label+' '+meta.name;
  if(BLUEPRINT_PROJECTS[key]){
    announce('Blaupause gefunden!',meta.name+' · Werkstattpreis stark reduziert','#ffd257');
    unlockFx=1; if(sfx)sfx('unlockBig'); return;
  }
  if(meta.voll && !FULL_VERSION){ pushToast('In der Vollversion: '+label); return; }
  // Große Feier statt kleinem Hinweis — eine Freischaltung soll ein Moment sein
  announce('Freigeschaltet!', label, u.kind==='skin' ? meta.blade : '#4de0a0');
  unlockFx=1;
  if(sfx) sfx('unlockBig');
}

/* ---- Sound: prozedural über Web Audio, keine Asset-Dateien ---- */
let audioCtx=null, noiseBuffer=null, musicGain=null, musicPulseT=0, musicStep=0;
function initAudio(){
  if(audioCtx) return;
  try{ const AC=window.AudioContext||window.webkitAudioContext; if(AC){audioCtx=new AC();startSpaceBed();} }catch(e){ audioCtx=null; }
}
function tone(freq,dur,type,vol,when,slideTo){
  if(!audioCtx) return;
  /* Leichte Tonhöhenstreuung für Effektklänge: derselbe Treffer klingt nie exakt
     gleich — wiederholte Kills wirken weniger mechanisch. Musik ruft tone()
     mit klangVar=0 und bleibt sauber gestimmt. */
  if(klangVar!==0) freq=Math.max(30,freq*(1+klangVar));
  const t0=audioCtx.currentTime+(when||0);
  const o=audioCtx.createOscillator(), g=audioCtx.createGain();
  o.type=type||'square'; o.frequency.setValueAtTime(freq,t0);
  if(slideTo) o.frequency.exponentialRampToValueAtTime(Math.max(1,slideTo),t0+dur);
  g.gain.setValueAtTime(0.0001,t0);
  g.gain.exponentialRampToValueAtTime(vol||0.14,t0+0.008);
  g.gain.exponentialRampToValueAtTime(0.0001,t0+dur);
  o.connect(g); g.connect(audioCtx.destination);
  o.start(t0); o.stop(t0+dur+0.03);
}
// Kurze gefilterte Rauschfahnen geben den synthetischen Tönen Materialität:
// Klinge = heller Luftschnitt, Orbit/Macht = tiefer Impuls. Nur ereignisbasiert,
// damit Audio auf Mobilgeräten keine dauerhafte Rechenlast erzeugt.
function noiseBurst(dur=0.12,vol=0.045,when=0,freq=1800){
  if(!audioCtx) return;
  const t0=audioCtx.currentTime+when;
  if(!noiseBuffer){
    const len=audioCtx.sampleRate, buf=audioCtx.createBuffer(1,len,audioCtx.sampleRate), data=buf.getChannelData(0);
    for(let i=0;i<len;i++) data[i]=Math.random()*2-1;
    noiseBuffer=buf;
  }
  const src=audioCtx.createBufferSource(), filter=audioCtx.createBiquadFilter(), gain=audioCtx.createGain();
  filter.type='bandpass'; filter.frequency.value=freq; filter.Q.value=0.8;
  gain.gain.setValueAtTime(vol,t0); gain.gain.exponentialRampToValueAtTime(0.0001,t0+dur);
  src.buffer=noiseBuffer; src.connect(filter); filter.connect(gain); gain.connect(audioCtx.destination);
  src.start(t0,Math.random()*Math.max(.01,1-dur)); src.stop(t0+dur+0.02);
}
function startSpaceBed(){
  if(!audioCtx||musicGain)return;
  musicGain=audioCtx.createGain(); const filter=audioCtx.createBiquadFilter();
  filter.type='lowpass';filter.frequency.value=390;filter.Q.value=2.2;
  musicGain.gain.value=.0001;filter.connect(musicGain);musicGain.connect(audioCtx.destination);
  for(const [freq,type,vol] of [[48,'sawtooth',.32],[72,'sine',.55],[96.5,'sine',.22]]){
    const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type=type;o.frequency.value=freq;g.gain.value=vol;o.connect(g);g.connect(filter);o.start();
  }
  const lfo=audioCtx.createOscillator(),amount=audioCtx.createGain();lfo.frequency.value=.11;amount.gain.value=85;lfo.connect(amount);amount.connect(filter.frequency);lfo.start();
  setMusicLevel();
}
function setMusicLevel(){
  if(!musicGain||!audioCtx)return;
  const ziel=save.muted ? .0001 : (state==='playing' ? .012 : .0035);
  musicGain.gain.setTargetAtTime(ziel,audioCtx.currentTime,.35);
}
function musicTick(dt){
  if(save.muted||!audioCtx||state!=='playing')return;
  musicPulseT-=dt;if(musicPulseT>0)return;
  const folge=[110,146.83,164.81,130.81,196,164.81],note=folge[musicStep%folge.length];
  tone(note,.48,'sine',.012,0,note*.72);tone(note*2.01,.26,'triangle',.007,.08,note*1.35);
  musicPulseT=[920,920,1380,920,920,1840][musicStep%6];musicStep++;
}
function bladeSweep(up=true){
  tone(up?170:760,0.24,'sawtooth',0.055,0,up?920:150);
  tone(up?220:680,0.20,'triangle',0.045,0.025,up?1280:210);
  noiseBurst(0.18,0.035,0.015,2300);
}
function orbitPulse(freq=92){
  tone(freq,0.30,'sine',0.13,0,Math.max(32,freq*0.48));
  tone(freq*3.02,0.22,'triangle',0.055,0.015,freq*1.4);
  noiseBurst(0.16,0.025,0.01,520);
}
const SFX={
  kill:    ()=>{tone(520,0.065,'triangle',0.045,0,240);noiseBurst(0.045,0.018,0,2600);},
  hurt:    ()=>{tone(145,0.16,'sawtooth',0.12,0,62);noiseBurst(0.10,0.035,0,420);},
  wirbel:  ()=>bladeSweep(true),
  stoss:   ()=>orbitPulse(105),
  levelup: ()=>{tone(520,0.12,'triangle',0.13);tone(780,0.16,'triangle',0.11,0.10);},
  pick:    ()=>{tone(620,0.09,'sine',0.09);tone(930,0.12,'triangle',0.065,0.05);},
  buy:     ()=>{tone(540,0.07,'triangle',0.07);tone(810,0.10,'sine',0.055,0.045);},
  coin:    ()=>tone(1180,0.045,'sine',0.035,0,820),
  xp:      ()=>tone(760,0.06,'triangle',0.10,0,300),
  boss:    ()=>{tone(120,0.45,'sawtooth',0.16,0,70);tone(60,0.5,'sine',0.12);},
  bossdie: ()=>{tone(420,0.28,'sawtooth',0.15,0,120);tone(210,0.4,'sine',0.13,0.12);},
  shock:   ()=>orbitPulse(72),
  counter: ()=>{bladeSweep(false);tone(1120,0.09,'sine',0.055);},
  unlock:  ()=>{tone(700,0.10,'triangle',0.12);tone(1050,0.14,'triangle',0.10,0.08);},
  heal:    ()=>{tone(620,0.10,'sine',0.11);tone(880,0.14,'sine',0.10,0.07);},
  // Freischaltung: aufsteigende Fanfare, klar von allem anderen unterscheidbar
  unlockBig:()=>{tone(523,0.14,'triangle',0.14);tone(659,0.14,'triangle',0.13,0.11);tone(784,0.16,'triangle',0.13,0.22);tone(1047,0.30,'triangle',0.14,0.33);},
  wave:    ()=>tone(460,0.14,'triangle',0.10),
  gameover:()=>{tone(300,0.3,'sawtooth',0.15,0,120);tone(150,0.5,'sine',0.13,0.15,80);},
  shoot:   ()=>tone(1280,0.065,'triangle',0.055,0,420),
  laserPlayer:()=>{tone(1680,.09,'sawtooth',.045,0,310);tone(840,.12,'sine',.025,.025,210);},
  laserEnemy:()=>{tone(430,.13,'square',.04,0,105);noiseBurst(.055,.014,0,720);},
  bladeHit:()=>{tone(270,.045,'triangle',.025,0,170);noiseBurst(.035,.012,0,1850);},
  sweet:()=>{tone(960,.075,'sine',.055,0,1480);tone(1920,.055,'triangle',.025,.02,1040);noiseBurst(.045,.018,0,3100);},
  armor:()=>{tone(185,.075,'square',.045,0,110);noiseBurst(.065,.025,0,680);},
  minionDie:()=>{tone(620,.09,'sine',.04,0,170);tone(1240,.08,'triangle',.025,.015,320);},
  upgrade:()=>{orbitPulse(118);tone(740,.18,'sine',.08,.06,1180);tone(1480,.22,'triangle',.045,.12,920);},
  fuse:    ()=>tone(400,0.10,'sawtooth',0.10,0,80),
  boom:    ()=>{tone(70,0.35,'sawtooth',0.18,0,40);tone(50,0.4,'sine',0.14,0.05,30);},
  bombe:   ()=>{tone(210,0.12,'sine',0.09,0,560);noiseBurst(0.08,0.025,0.02,900);},
  nova:    ()=>{orbitPulse(82);tone(980,0.38,'sine',0.08,0.02,440);tone(1470,0.30,'sine',0.05,0.04,740);},
  focus:   ()=>{tone(360,.16,'sine',.08,0,720);tone(1080,.22,'triangle',.065,.04,1620);tone(2160,.12,'sine',.035,.1,1320);},
};
const SFX_LIMIT={bladeHit:75,sweet:90,armor:160,laserPlayer:70,laserEnemy:90,kill:45}, sfxLast={};
let klangVar=0;   // aktuelle Tonhöhenstreuung (nur innerhalb eines sfx-Aufrufs gesetzt)
function sfx(name){
  if(save.muted||!audioCtx)return;
  const now=performance.now(),limit=SFX_LIMIT[name]||0;if(limit&&now-(sfxLast[name]||0)<limit)return;sfxLast[name]=now;
  const f=SFX[name];if(f){try{ klangVar=Math.random()*0.06-0.03; f(); }catch(e){}finally{ klangVar=0; }}
}
function updateMuteBtn(){ const b=document.getElementById('mute-btn'); if(b) b.textContent=save.muted?'🔇':'🔊'; }
function toggleMute(){ save.muted=!save.muted; persist(); updateMuteBtn(); if(!save.muted){ initAudio(); if(audioCtx&&audioCtx.state==='suspended') audioCtx.resume(); } setMusicLevel(); }
// Audio erst nach erster Nutzer-Aktion starten (Browser-Autoplay-Sperre)
function unlockAudioOnce(){ initAudio(); if(audioCtx&&audioCtx.state==='suspended') audioCtx.resume(); setMusicLevel(); window.removeEventListener('pointerdown',unlockAudioOnce); window.removeEventListener('keydown',unlockAudioOnce); window.removeEventListener('touchstart',unlockAudioOnce); }
window.addEventListener('pointerdown',unlockAudioOnce); window.addEventListener('keydown',unlockAudioOnce); window.addEventListener('touchstart',unlockAudioOnce);

const canvas=document.getElementById('game'), ctx=canvas.getContext('2d');
const healthBar=document.getElementById('health-bar'), healthText=document.getElementById('health-text');
const barrierBar=document.getElementById('barrier-bar');
const xpBar=document.getElementById('xp-bar'), xpText=document.getElementById('xp-text');
const coinText=document.getElementById('coin-text'), waveText=document.getElementById('wave-text');
const healthWrap=document.getElementById('health-wrap');
const overlayStart=document.getElementById('overlay-start'), overlayPause=document.getElementById('overlay-pause');
const overlayOver=document.getElementById('overlay-gameover');
const combatResume=document.getElementById('combat-resume');
const overlayAuslese=document.getElementById('overlay-auslese');
const btnWirbel=document.getElementById('btn-wirbel');
let cdWirbel=document.getElementById('cd-wirbel');
const joystickZone=document.getElementById('joystick-zone');   // unsichtbare Ziehfläche über dem Spielfeld

loadSave();
let state='menu', raf=0, lastTime=0;
let player, enemies=[], stars=[], particles=[], floats=[], shots=[], orbs=[];
let swordAngle=0, spinHitTimer=0;
// Gemeinsamer Orbitimpuls: genau ein Impuls pro vollständigem Winkelumlauf.
let orbitRoundSweet=false, orbitRoundLight=false, orbitRoundDistance=0, orbitLastX=0, orbitLastY=0;
let waechterLadung=false, sonnenSerie=0, sonnenTempoUntil=0, praezSerie=0;
let kronenMachtId='', kronenMachtUntil=0, kronenZielklinge=0;
let wave=1, waveEnemiesToSpawn=0, waveSpawned=0, spawnTimer=0, killCount=0, hpKillCount=0;
let shake=0, activeCd={wirbel:0,stoss:0,bombe:0,nova:0,sog:0}, phaserCd=0, phaserSoundCd=0, brandspurCd=0;
let dmgBoostUntil=0, shieldUntil=0, moveBoostUntil=0;
let wiederaufBenutzt=false;      // „Entdecker": das eine Wiederaufstehen pro Lauf
let nachhallZaehler=0, splitterSweetZaehler=0; // sichtbare Partner-Kombos
let taktschlagZaehler=0, nachfassenBereit=false; // Auslese-Module Taktschlag/Nachfassen
/* Barriere: ein Puffer, der VOR den Trefferpunkten aufgebraucht wird. Er entsteht
   nur aus Lebenskugeln, die man bei vollem Leben einsammelt — vorher waren die
   schlicht verschenkt. Anders als das Schild (zeitbasiert, blockt alles) ist die
   Barriere eine Menge, die sich abnutzt. */
let barriere=0;
// Glasklinge Rang 2 sperrt die Barriere ganz — das ist der zweite Teil ihres Preises
function barriereMax(){ return runModule.glasklinge>=2 ? 0 : player.maxHp*CONFIG.barriere.max*(treeFlags.barriereMult||1); }
let bonuses={ dmg:0, speed:0, range:0, fireRate:0, maxHp:0, blades:1, chain:false, counter:false, splitter:0 };
let camX=0, camY=0, stossWaveT=0, wirbelT=0, wirbelShownR=0;
let renderDpr=1, sichtbareGegner=0, naechstesHudUpdate=0;
let sparmodus=false;                     // dauerhaft, wenn die Bildrate einbricht
const PERF_DEBUG=typeof location!=='undefined' && /(?:\?|&)perf=1(?:&|$)/.test(location.search||'');
/* MESSFASSUNG — der Welle-26-Einbruch lässt sich mit Momentanwerten nicht belegen.
   Über ein gleitendes Fenster von ~90 s laufen Schnitt, P95 und Maximum getrennt für
   Frame, Update und Draw, dazu die Phasen innerhalb beider Hälften und alle Mengen,
   die mit der Welle wachsen. Ohne `?perf=1` kostet das nichts: PERF_DEBUG ist eine
   Konstante, `perfMark` fällt dann sofort zurück.
   Reproduktion: `?perf=1&wave=26&pts=15&god=1` springt direkt in die fragliche Welle,
   gibt Punkte zum Bauen und verhindert den Tod. Ein solcher Lauf ist als `messlauf`
   markiert und schreibt weder Bestmarke noch Speicherstand. */
const perfZahl=(k)=>{
  const s=(typeof location!=='undefined' && location.search)||'';
  const m=new RegExp('(?:\\?|&)'+k+'=(\\d+)(?:&|$)').exec(s);
  return m? parseInt(m[1],10) : 0;
};
const PERF_WAVE = PERF_DEBUG ? perfZahl('wave') : 0;
const PERF_PTS  = PERF_DEBUG ? perfZahl('pts')  : 0;
const PERF_GOD  = PERF_DEBUG && /(?:\?|&)god=1(?:&|$)/.test(location.search||'');
const PERF_DPR  = PERF_DEBUG ? perfZahl('dpr') : 0;   // in Hundertstel, z. B. dpr=100 -> 1,00
const PERF_ZOOM = PERF_DEBUG ? (parseInt((location.search.match(/[?&]zoom=(\d+)/)||[])[1],10)||0) : 0;
/* `?perf=1&gpu=1`: liest nach jedem Bild ein einzelnes Pixel zurück. Das zwingt die
   Grafikpipeline leerzulaufen, wodurch die sonst unsichtbare, aufgestaute GPU-Zeit als
   Phase `gpuSync` messbar wird. Bewusst eingriffsintensiv — die erzwungene
   Synchronisation kostet selbst etwas und verfälscht die absolute Bildzeit. Aussagekräftig
   ist allein, ob `gpuSync` gross oder klein ist. Nur für die Diagnose, nie im Normalbetrieb. */
const PERF_GPU  = PERF_DEBUG && /(?:\?|&)gpu=1(?:&|$)/.test(location.search||'');
// `?perf=1&bg=voll` startet mit voller Hintergrundauflösung; Shift+H schaltet live um.
const PERF_BG   = PERF_DEBUG && /(?:\?|&)bg=voll(?:&|$)/.test(location.search||'');
const messlauf  = PERF_WAVE>0 || PERF_PTS>0 || PERF_GOD;
messlaufSchutz  = messlauf;

/* Der Ringpuffer trug bisher 5400 Bilder (~90 s), die Verteilung zählte dagegen alle.
   Bei einem 5818-Bilder-Lauf meldete die Statistik deshalb `max 17,2 ms`, während die
   Verteilung gleichzeitig 57 Bilder über 25 ms auswies — beides stimmte, betraf aber
   verschiedene Zeiträume. Der Puffer fasst jetzt ~5,5 Minuten; wird er doch voll,
   weist `gekappt` es aus, statt den Widerspruch stillschweigend zu erzeugen. */
const PERF_CAP=20000;
const PERF_SPRUNG=500;                      // größere Lücken sind Zustandswechsel, keine Bildrate
const perf={ frame:16.7, update:0, draw:0, fps:60 };
const perfRing={ frame:new Float32Array(PERF_CAP), update:new Float32Array(PERF_CAP), draw:new Float32Array(PERF_CAP) };
let perfIdx=0, perfLen=0, perfSeit=0, perfFrames=0, perfPhaseUhr=0, perfStatNext=0, perfStat=null;
let perfKampfMs=0;                          // reine Kampfzeit — Basis der echten Bildrate
const perfPhasen={};                        // Phasenname -> aufsummierte ms im Fenster
const perfMengenNamen=['gegner','sichtbar','schuesse','eigeneSchuesse','bomben','felder',
  'echos','splitter','partikel','zahlen','fragmente','kugeln'];
const perfMax={}, perfSum={};               // Mengen über das Fenster statt Momentaufnahme
/* Ein Schnitt kann seltene Ruckler nicht zeigen. Deshalb zusätzlich eine Verteilung
   der Bildzeiten und ein Mitschnitt der schlechtesten Bilder mit ihrem Kontext —
   ohne den weiß man, DASS es hakt, aber nie WOBEI. */
const PERF_KLASSEN=[17,20,25,34,50,1e9];    // Obergrenzen in ms
const PERF_KLASSEN_NAME=['≤17','≤20','≤25','≤34','≤50','>50'];
const perfKlassen=new Array(PERF_KLASSEN.length).fill(0);
const perfSchlimmste=[];                    // bis zu 6 Bilder, absteigend nach Bildzeit
const perfPhasenBild={};                    // Phasen NUR des laufenden Bildes
/* Zeichenebenen einzeln abschaltbar (nur mit ?perf=1, Shift+1..8).
   Der X1-Carbon-Lauf vom 16.08.2026 zeigte 19,5 ms Bildzeit bei nur 1,7 ms Update
   plus Draw. Die Differenz steckt im Rastern und Kompositieren, das kein Zeitstempel
   im Skript sehen kann — `draw()` misst nur das Absetzen der Canvas-Befehle. Mit
   diesen Schaltern lässt sich im laufenden Kampf halbierend eingrenzen, welche Ebene
   die Füllrate frisst. Jeder Umschalter setzt das Messfenster zurück. */
const zeichenEbenen={ nebel:true, sterne:true, deko:true, raster:true,
  staub:true, verlaeufe:true, gegner:true, partikel:true };
const EBENEN_TASTEN=['nebel','sterne','deko','raster','staub','verlaeufe','gegner','partikel'];
// Grenzstein zwischen zwei Phasen. Die Zeit seit der letzten Marke geht auf `name`.
/* `perfSammeln` schließt Nicht-Kampfbilder aus. Die Phasen liefen bisher in jedem Bild
   mit — auch im Orbitpfad und in Menüs, wo `draw()` weiterläuft —, geteilt wurde aber
   nur durch die Kampfbilder. Bei 60 % Kampfanteil ergab das Phasenschnitte oberhalb der
   gesamten Bildzeit, was sichtbar unmöglich war. */
let perfSammeln=false;
function perfMark(name){
  if(!PERF_DEBUG || !perfSammeln) return;
  const n=performance.now(), d=n-perfPhaseUhr;
  perfPhasen[name]=(perfPhasen[name]||0)+d;
  perfPhasenBild[name]=(perfPhasenBild[name]||0)+d;   // für den Mitschnitt schlechter Bilder
  perfPhaseUhr=n;
}
function perfPhaseStart(){ if(PERF_DEBUG) perfPhaseUhr=performance.now(); }
function perfReset(){
  perfIdx=0; perfLen=0; perfFrames=0; perfStat=null; perfKampfMs=0;
  for(const k in perfPhasen) delete perfPhasen[k];
  for(const k of perfMengenNamen){ perfMax[k]=0; perfSum[k]=0; }
  perfKlassen.fill(0); perfSchlimmste.length=0;
  for(const k in perfPhasenBild) delete perfPhasenBild[k];
  perfSeit=performance.now();
}
function perfMengenJetzt(){
  return { gegner:enemies.length, sichtbar:sichtbareGegner, schuesse:shots.length,
    eigeneSchuesse:pShots.length, bomben:bombs.length, felder:powerFields.length,
    echos:powerEchoes.length, splitter:shards.length, partikel:particles.length,
    zahlen:floats.length, fragmente:stars.length, kugeln:orbs.length };
}
function perfProbe(){
  /* Zustandswechsel — Menü, Orbitpfad, Tabwechsel — erzeugen Lücken von vielen hundert
     Millisekunden. Die sind keine Bildrate, sondern Pausen, und würden Schnitt und
     Maximum unbrauchbar machen. Echte Ruckler bleiben erhalten. */
  if(!(perf.frame>0) || perf.frame>PERF_SPRUNG) return;
  perfRing.frame[perfIdx]=perf.frame; perfRing.update[perfIdx]=perf.update; perfRing.draw[perfIdx]=perf.draw;
  perfIdx=(perfIdx+1)%PERF_CAP; if(perfLen<PERF_CAP) perfLen++;
  perfFrames++; perfKampfMs+=perf.frame;
  const m=perfMengenJetzt();
  for(const k of perfMengenNamen){
    const v=m[k];
    if(v>(perfMax[k]||0)) perfMax[k]=v;
    perfSum[k]=(perfSum[k]||0)+v;
  }
  // Verteilung: zeigt, ob gleichmäßig langsam oder gelegentlich hakend
  for(let i=0;i<PERF_KLASSEN.length;i++) if(perf.frame<=PERF_KLASSEN[i]){ perfKlassen[i]++; break; }
  // Kontext der schlechtesten Bilder festhalten
  if(perf.frame>20 && (perfSchlimmste.length<6 || perf.frame>perfSchlimmste[perfSchlimmste.length-1].frame)){
    let spitze='', spitzeMs=0;
    for(const k in perfPhasenBild) if(perfPhasenBild[k]>spitzeMs){ spitzeMs=perfPhasenBild[k]; spitze=k; }
    perfSchlimmste.push({
      frame:Math.round(perf.frame*10)/10, update:Math.round(perf.update*100)/100,
      draw:Math.round(perf.draw*100)/100, spitze, spitzeMs:Math.round(spitzeMs*100)/100,
      welle:wave, gegner:m.gegner, sichtbar:m.sichtbar, partikel:m.partikel,
      zahlen:m.zahlen, schuesse:m.schuesse+m.eigeneSchuesse, fx:fxAn, boss:bossActive
    });
    perfSchlimmste.sort((a,b)=>b.frame-a.frame);
    if(perfSchlimmste.length>6) perfSchlimmste.length=6;
  }
  for(const k in perfPhasenBild) delete perfPhasenBild[k];
}
function perfWerte(name){
  const n=perfLen;
  if(!n) return { avg:0, p95:0, max:0 };
  const c=perfRing[name].slice(0,n); c.sort();
  let sum=0; for(let i=0;i<n;i++) sum+=c[i];
  const r=(v)=>Math.round(v*100)/100;
  return { avg:r(sum/n), p95:r(c[Math.min(n-1,Math.floor(n*0.95))]), max:r(c[n-1]) };
}
// Vollständiger Messbericht — in der Konsole über `perfDump()` abrufbar.
function perfBericht(){
  const dauer=(performance.now()-perfSeit)/1000;
  const n=Math.max(1,perfFrames);
  const phasen={};
  for(const k in perfPhasen) phasen[k]=Math.round(perfPhasen[k]/n*1000)/1000;
  const mengen={};
  for(const k of perfMengenNamen) mengen[k]={ max:perfMax[k]||0, schnitt:Math.round((perfSum[k]||0)/n) };
  const frame=perfWerte('frame');
  const ebenenAus=EBENEN_TASTEN.filter(k=>!zeichenEbenen[k]);
  return {
    fensterSek:Math.round(dauer*10)/10, bilder:perfFrames,
    // Perzentile decken nur den Ringpuffer ab, Verteilung und Mengen alle Bilder.
    statistikUeber:perfLen, gekappt:perfFrames>PERF_CAP,
    // Echte Bildrate aus der reinen Kampfzeit. Bilder durch Wanduhrzeit zu teilen war
    // falsch: Orbitpfad- und Pausenzeit zählt zur Uhr, aber nicht zu den Bildern.
    fps:perfFrames&&perfKampfMs>0 ? Math.round(1000/(perfKampfMs/n)*10)/10 : 0,
    kampfAnteil:perfFrames? Math.round(perfKampfMs/10/Math.max(0.001,dauer))/100 : 0,
    frame, update:perfWerte('update'), draw:perfWerte('draw'),
    // Was bleibt, ist Rastern, Kompositieren und Warten auf Vsync — für das Skript unsichtbar.
    ausserhalbJs:Math.round(Math.max(0,frame.avg-perfWerte('update').avg-perfWerte('draw').avg)*100)/100,
    phasenMsProBild:phasen,
    verteilung:PERF_KLASSEN_NAME.reduce((o,name,i)=>{ o[name+' ms']=perfKlassen[i]; return o; },{}),
    schlimmsteBilder:perfSchlimmste,
    welle:wave, mengen,
    zustand:{ dpr:Math.round(renderDpr*100)/100, dprErzwungen:PERF_DPR>0,
      zoom:Math.round(weltZoom*100)/100, zoomErzwungen:PERF_ZOOM>0,
      hintergrund:hintergrundHalb?'halb':'voll',
      sparmodus, effekte:fxAn, messlauf, ebenenAus:ebenenAus.length? ebenenAus : 'keine' }
  };
}
function orbitSliceState(){
  return {fokus:Math.round(fokus*100)/100,fokusBereit,lichtbundDistanz:Math.round(orbitRoundDistance),lichtbundBereit:orbitRoundLight,waechterLadung,sonnenSerie,sonnenTempoRest:Math.max(0,sonnenTempoUntil-Date.now()),praezSerie,kronenZielklinge,active1Cd:Math.round(activeCd[activeSlot1]||0),form:treeFlags.kronenform||(treeFlags.singularorbit?'praez':treeFlags.doppelorbit?'dopp':'basis'),felder:powerFields.length,eigeneSchuesse:pShots.length,stormSchuesse:pShots.filter(s=>s.stormWirbel).length,debug:{orbitPulse:treeFlags.debugOrbitPulse||0,lichtbund:treeFlags.debugLichtbund||0,praezReduktionen:treeFlags.debugPraezReduktionen||0,praezCdGesamt:Math.round(treeFlags.debugPraezCdGesamt||0),kronenEchos:treeFlags.debugKronenEchos||0,wirbelBPulse:treeFlags.debugWirbelBPulse||0,sturmSchuesse:treeFlags.debugSturmSchuesse||0}};
}
if(PERF_DEBUG && typeof window!=='undefined'){
  window.perfDump=()=>{ const b=perfBericht(); console.log(JSON.stringify(b,null,2)); return b; };
  window.perfReset=perfReset;
  window.zeichenEbenen=zeichenEbenen;
  // e.code statt e.key: Shift+1 ist auf deutscher Tastatur '!', auf englischer '!'
  // — der Code bleibt in beiden Fällen 'Digit1'.
  window.addEventListener('keydown',(e)=>{
    if(!e.shiftKey) return;
    if(e.code==='KeyP'){ perfReset(); return; }
    // A/B-Vergleich der Hintergrundauflösung im laufenden Spiel
    if(e.code==='KeyH'){ hintergrundHalb=!hintergrundHalb; perfReset(); return; }
    const m=/^Digit([1-8])$/.exec(e.code||'');
    if(!m) return;
    const k=EBENEN_TASTEN[+m[1]-1];
    zeichenEbenen[k]=!zeichenEbenen[k];
    perfReset();                    // nach dem Umschalten zählt nur noch der neue Zustand
  });
  window.orbitSliceDump=orbitSliceState;
}
let counterCd=0, counterFx=0, shards=[]; // Konterstoß-Cooldown/Effekt, kreisende Splitter
// Nur EINE Macht am Start — der zweite Slot wird im Shop freigeschaltet und ist
// dadurch ein echter Fortschritt statt einer Selbstverständlichkeit.
let activeSlot1='wirbel', activeSlot2=null;
let runEvolutions={};                            // baseId -> evoId (nur für diesen Lauf)
let runTree={}, skillPoints=0, treeFlags={};     // ausschließlich für den aktuellen Lauf
let regularPointsEarned=0, regularTreeFrozen=false;
let echoPoints=0, echoMilestones=0, treeReturnState='playing';
/* Der Begleiter: EIN dauerhaft gekaufter Helfer, der den Spieler umkreist. Er zieht
   Fragmente und Kugeln an UND schießt auf Gegner. Vorher waren das zwei getrennte
   Käufe, die beide nach dem Kauf nichts mehr wurden — jetzt ist es ein Ziel, das
   über fünf Stufen weiterwächst. */
let helfer=[], helferOverdriveUntil=0;
function begleiterWerte(stufe){
  const H=CONFIG.helfer, s=Math.max(1,stufe);
  return { sammel:H.sammelBasis+H.sammelProStufe*(s-1),
           reichweite:H.schussBasis+H.schussProStufe*(s-1),
           dmg:H.dmgBasis+H.dmgProStufe*(s-1) };
}
function setzeHelfer(){
  helfer=[];
  const stufe=begleiterStufe();
  if(stufe>0) helfer.push({stufe, ang:0, r:58, cd:0});
}
function begleiterStufe(){
  let stufe=0;
  for(let i=1;i<=5;i++) if(save.meta&&save.meta['begleiter'+i]) stufe=i; else break;
  return stufe;
}
/* Der zweite aktive Slot ist entfallen: Das Spiel hat genau einen Knopf, die
   Hauptmacht. Die Funktion bleibt als false-Konstante stehen, weil mehrere
   Stellen sie abfragen. */
function hasSlot2(){ return false; }
/* Die gespeicherte Startbelegung, gegen die Wirklichkeit geprüft: Eine Macht, die
   (noch) nicht freigeschaltet ist oder doppelt in beiden Slots steht, würde sonst
   einen kaputten Lauf erzeugen. Liefert immer eine gültige Belegung. */
function startMaechte(){
  if(!save.startMaechte || typeof save.startMaechte!=='object') save.startMaechte={};
  const v=save.startMaechte;
  const frei=ACTIVE_IDS.filter(abilUnlocked);
  if(frei.indexOf(v.slot1)<0) v.slot1 = frei[0] || 'wirbel';
  if(frei.indexOf(v.slot2)<0 || v.slot2===v.slot1) v.slot2 = frei.find(id=>id!==v.slot1) || null;
  return v;
}
function evolvedOf(id){ return runEvolutions[id]||null; }
let runAbilities={};                            // getragene Fähigkeiten: id -> Stufe (1..10)
let runModule={};                     // Auslese-Module (zweite, unabhängige Kartenquelle): id -> Rang (1..2)
let bombs=[], pShots=[], powerFields=[], powerEchoes=[], novaFx=0; // Bomben, Projektile und sichtbare Machtfelder
/* Boss-Gefahrenzonen: gemeinsame Infrastruktur für Raumhebel, die den Spieler aus dem
   56–72-px-Sicherheitsband zwischen Kontaktschaden und Klingenreichweite vertreiben.
   kind:'brand' = ortsfester Kreis (Rammbock-Brandspur). kind:'arm' = rotierender Balken
   vom Bossmittelpunkt nach außen (Spiralwerfer-Drehsperre) — x/y folgen dem Boss,
   ang/len/drehen bestimmen Winkel, Länge und Drehgeschwindigkeit in rad/s. */
let bossHazards=[]; // {kind,x,y,r,until,dmg,farbe,ang,len,drehen,tick}
let novaEcho=0, novaEchoDmg=0, novaEchoRange=0; // nachzündende zweite Nova-Welle (ab Stufe 4)
let toasts=[], banner=null;              // kleine Hinweise oben, große Ansage in der Mitte
let bossActive=false, bossHitClean=true; // für das Abzeichen "Makellos"
let lastBossAbility='';                   // verhindert doppelte Boss-Fähigkeit hintereinander
let flashUntil=0;                        // kurzes Aufblitzen bei Spieler-Treffer
let unlockFx=0;                          // goldener Lichtkranz bei einer Freischaltung

// Kleine Info oben (Freischaltung/Abzeichen), stapelbar
function pushToast(text){ toasts.push({text, life:2.8, y:0}); if(sfx) sfx('unlock'); }
// Große, kurze Ansage in der Bildschirmmitte (Welle/Boss/Meilenstein)
function announce(title, sub, color){ banner={title, sub:sub||'', color:color||'#e6edf7', life:2.2, max:2.2}; }

/* Einstieg beim allerersten Spiel: drei kurze Einblendungen im Spiel statt einer
   Textwand im Menü — ein 7-Jähriger liest keinen Absatz, aber er sieht drei Sätze. */
const TUTORIAL_VERSION=2;
let tutStep=0, tutT=0, tutorialCircleUntil=0, tutorialBladeUntil=0;
const IS_TOUCH = (typeof window!=='undefined') && ('ontouchstart' in window);
function tutorialTick(dt){
  if((save.tutorialVersion||0)>=TUTORIAL_VERSION) return;
  tutT+=dt;
  if(tutStep===0 && tutT>600){
    announce(IS_TOUCH?'Zieh mit dem Finger':'Lauf mit WASD', IS_TOUCH?'irgendwo auf dem Bildschirm':'oder den Pfeiltasten', '#7cc8ff');
    tutStep=1;
  } else if(tutStep===1 && tutT>5000){
    tutorialCircleUntil=Date.now()+3200;
    announce('Dein ganzer Orbit trifft', 'Nahe Gegner nehmen im Kreis automatisch Schaden', '#7cc8ff');
    tutStep=2;
  } else if(tutStep===2 && tutT>12000){
    tutorialBladeUntil=Date.now()+2800;
    announce('VOLLTREFFER', 'Die sichtbare Klinge verursacht Extraschaden', '#ffffff');
    tutStep=3;
  } else if(tutStep===3 && tutT>16000){
    save.tutorialDone=true; save.tutorialVersion=TUTORIAL_VERSION; persist(); tutStep=4;
  }
}
function tutorialSweetSpotTreffer(){
  if((save.tutorialVersion||0)>=TUTORIAL_VERSION || tutStep!==2 || tutT<7200) return;
  tutorialBladeUntil=Date.now()+2800;
  announce('VOLLTREFFER!','Die sichtbare Klinge verursacht Extraschaden','#ffffff'); tutStep=3;
}

// Klingenlänge: multiplikativ, damit "+15% Reichweite" auch wirklich +15% bedeutet
function bladeLength(){ return CONFIG.bladeBaseLen * (1 + bonuses.range) * figur().reichweite * (treeFlags.singularorbit?1.20:1); }
function effektiveKlingen(){
  const basis=treeFlags.ereignishorizont && player.hp/player.maxHp<.35 ? Math.max(3,bonuses.blades) : bonuses.blades;
  return basis+(treeFlags.echoBladeImpulseUntil>Date.now()?1:0)+(treeFlags.resonanzKlingeUntil>Date.now()?1:0)+(runModule.klingenteilung||0);
}
// Winkel aller aktiven Klingen (Doppelklinge = zweite Klinge gegenüber)
function bladeAngles(){
  const out=[swordAngle];
  const anzahl=effektiveKlingen();
  for(let i=1;i<anzahl;i++) out.push(swordAngle + Math.PI*2*i/anzahl);
  return out;
}
// kleinster Abstand zweier Winkel (0..PI)
function angleDiff(a,b){ let d=Math.abs(a-b)%(Math.PI*2); return d>Math.PI ? Math.PI*2-d : d; }

/* SWEET SPOT — die halbe Trefferbreite je Klinge, abhängig von der Klingenzahl.
   Vorher war sie fest: Mit drei Klingen deckten die Zonen 48 % des Umkreises ab, damit
   war Positionieren praktisch egal — der Aufbau löschte die Kernmechanik aus.
   Jetzt schrumpft die Zone je zusätzlicher Klinge auf drei Viertel. Wichtig: Die
   Gesamtabdeckung WÄCHST weiter (16 % → 24 % → 27 %), nur langsamer. Sonst wären
   Doppel- und Dreifachklinge wertlos, und das sind die stärksten Karten im Spiel. */
function sweetArcHalf(){
  /* Auslese-Modul Nachfassen: die eigentliche Verbreiterung. Sie fehlte bisher komplett —
     nachfassenBereit wurde nur für den Panzerdurchschlag gelesen, weshalb die Karte
     gemessen 0,0 % brachte, obwohl sie "doppelt so breit" versprach. */
  const nachfassen=nachfassenBereit?2:1;
  const singular=treeFlags.singularorbit?0.68:1;
  const sync=treeFlags.sweetWeite||0;
  const sonne=sonnenTempoUntil>Date.now() && treeFlags.sonnenorbit ? .78 : 1;
  return CONFIG.spinArcHalf * nachfassen * singular * sonne * Math.pow(0.75+sync, Math.max(0, effektiveKlingen()-1));
}

function sweetKlingenFaktor(){
  /* Klingenteilung gleicht den Preis ihrer eigenen Zusatzklinge aus. Ohne das brachte
     sie gemessen einem Doppelorbit-Spieler nur +3 %, weil sweetArcHalf() die Zone je
     Klinge auf drei Viertel schrumpft und den Gewinn wieder auffrisst — für die Hälfte
     der Builds wäre sie eine tote Karte gewesen. Die Zone schrumpft weiterhin, damit
     Positionieren zählt; nur der Treffer wiegt schwerer. */
  let f=treeFlags.singularorbit?1.45:1;
  if(runModule.klingenteilung>=2) f*=1.42; else if(runModule.klingenteilung) f*=1.22;
  if(treeFlags.doppelorbit) f*=.84;   // war .72 — machte den Kauf schwaecher als gar keinen Kauf
  if(sonnenTempoUntil>Date.now() && treeFlags.sonnenorbit) f*=1.30;
  return f;
}
function orbitSweetPulse(){
  if(orbitRoundSweet) return false;
  orbitRoundSweet=true;
  if(PERF_DEBUG) treeFlags.debugOrbitPulse=(treeFlags.debugOrbitPulse||0)+1;
  if(treeFlags.sonnenjaeger){
    sonnenSerie++;
    if(sonnenSerie>=3){ sonnenSerie=0; sonnenTempoUntil=Date.now()+3000; pushFloat(player.x,player.y-42,'SONNENTEMPO','#ffd257',1.1); }
  }
  // Orbitkrone (Präzisionsorbit): drei Serientreffer laden den Durchschlag auf, statt wie
  // vorher nur die Abklingzeit zu kürzen. Die alte Bedingung "nur während laufender
  // Abklingzeit" ergab ausschließlich für die CD-Kürzung Sinn und entfällt deshalb.
  if(treeFlags.kronenform==='praez'){
    praezSerie++;
    if(praezSerie>=3){
      praezSerie=0; treeFlags.durchschlagBereit=true;
      if(PERF_DEBUG) treeFlags.debugDurchschlagLadungen=(treeFlags.debugDurchschlagLadungen||0)+1;
      pushFloat(player.x,player.y-42,'DURCHSCHLAG BEREIT','#ffd257',1.1);
      spawnParticles(player.x,player.y,'#ffd257',10);
    }
  }
  // Auslese-Modul Taktschlag: zählt volle (getroffene) Umläufe, stößt alle 3./2. eine Welle aus.
  if(runModule.taktschlag){
    taktschlagZaehler++;
    if(taktschlagZaehler>=(runModule.taktschlag>=2?2:3)){
      taktschlagZaehler=0;
      const twDmg=Math.round((CONFIG.spinDamage+CONFIG.spinArcBonus)*(1+bonuses.dmg)*0.6);
      for(const en of enemies){
        if(Math.hypot(en.x-player.x,en.y-player.y)<110+en.radius){
          en.hp-=twDmg; pushFloat(en.x,en.y-16,'-'+twDmg,'#ffd257');
          if(runModule.taktschlag>=2) en.slowT=Math.max(en.slowT||0,900);
        }
      }
      particles.push({ring:true,x:player.x,y:player.y,color:'#ffd257',life:.34,max:.34});
      if(sfx) sfx('counter');
    }
  }
  fokus=Math.min(fokusZiel(), fokus+Math.round(2*tagesFaktor('fokus')));
  if(fokus>=fokusZiel()) fokusVoll('orbit');
  return true;
}
function resetMissedOrbit(){
  if(!orbitRoundSweet){
    sonnenSerie=0; praezSerie=0;
  }
  orbitRoundSweet=false;
}

/* FOKUS — Sweet-Spot-Treffer laden eine Leiste. Ist sie voll, schlägt die nächste
   aktive Macht deutlich härter zu. Damit zahlt gutes Positionieren auch dann noch ein,
   wenn man rechnerisch längst genug Schaden macht — und jüngere Spieler sehen einen
   Balken, der sich füllt, statt einer Prozentrechnung. */
let fokus=0, fokusBereit=false, fokusAktiv=false;
// Der Bonus gilt genau für den einen Einsatz und wird dabei aufgebraucht
function fokusFaktor(){ return fokusAktiv? CONFIG.fokusBonus : 1; }
// Wie viele Sweet-Spot-Treffer die Leiste braucht — der Charakter verschiebt das
function fokusZiel(){ return Math.max(4, Math.round(CONFIG.fokusZiel*figur().fokusZiel)); }
function fokusVoll(quelle){
  if(fokusBereit) return false;
  fokus=fokusZiel(); fokusBereit=true;
  const barriereVorFokus=barriere;
  if(figur().id==='held'){
    const basis=player.maxHp*.08, ohneLadung=Math.min(barriereMax(),barriere+basis);
    barriere=Math.min(barriereMax(),barriere+basis+(waechterLadung?basis:0));
    const ladungHatGewirkt=waechterLadung && barriere>ohneLadung+.01;
    if(treeFlags.waechter){ enemies.forEach(en=>{if(Math.hypot(en.x-player.x,en.y-player.y)<150) en.slowT=Math.max(en.slowT||0,1200);}); if(ladungHatGewirkt) waechterLadung=false; }
  }
  if(figur().id==='held' && barriere>barriereVorFokus+.01) orbitFortschritt('held_lichtbund');
  if(player.hp/player.maxHp<.45) orbitFortschritt('leere_hunger');
  if(begleiterStufe()>=4){
    barriere=Math.min(barriereMax(),barriere+player.maxHp*.05);
    particles.push({ring:true,x:player.x,y:player.y,color:'#4de0a0',life:.32,max:.32});
  }
  pushFloat(player.x,player.y-38,quelle==='kernreserve'?'KERNRESERVE: FOKUS':'FOKUS BEREIT','#dcb5ff',1.3);
  particles.push({ring:true,x:player.x,y:player.y,color:'#c77dff',life:.48,max:.48});
  if(!save.focusTutorialSeen){
    save.focusTutorialSeen=true; persist();
    announce('FOKUS VOLL','Volltreffer laden ihn – Taste 1 ist jetzt '+CONFIG.fokusBonus.toFixed(1)+'× stärker','#dcb5ff');
  }
  if(sfx) sfx('focus');
  return true;
}
function synchronisiereFokus(){
  const ziel=fokusZiel();
  fokus=Math.min(fokus,ziel);
  if(!fokusBereit && fokus>=ziel) fokusVoll('ziel');
}
function currentSkin(){ const s=SKINS[save.skin]; return isAvailable('skin',save.skin)? s : SKINS.rubin; }
function currentForm(){ return isAvailable('form', save.klingenform)? FORMEN[save.klingenform] : FORMEN.strahl; }
function currentFigur(){ return isAvailable('figur', save.figur)? FIGUREN[save.figur] : FIGUREN.held; }

/* DER KLINGENLÄUFER — die ursprüngliche Figur: Beine, wehender Umhang, Brustpanzer,
   Kopf mit Kapuze und Visier. Ursprung ist die Körpermitte. */
function zeichneHeld(g, moving, lean, bobPhase, farbe, blur){
  const bl = blur || (v=>{ g.shadowBlur=v; });
  // Beine – wechseln beim Laufen, stehen im Stand ruhig
  const stride = moving ? Math.sin(bobPhase)*3.4 : 0;
  g.fillStyle='#0f1728';
  g.beginPath(); g.roundRect(-7+stride*0.5, 8, 5.5, 9, 2.5); g.fill();
  g.beginPath(); g.roundRect( 1.5-stride*0.5, 8, 5.5, 9, 2.5); g.fill();
  // Umhang – weht in Laufrichtung, mit Innenschattierung
  g.fillStyle='#101a2c'; g.beginPath();
  g.moveTo(-11,-7); g.quadraticCurveTo(-17+lean*0.3,7,-13+lean,16);
  g.lineTo(13+lean,16); g.quadraticCurveTo(17+lean*0.3,7,11,-7); g.closePath(); g.fill();
  g.fillStyle='rgba(124,180,255,0.07)'; g.beginPath();
  g.moveTo(-8,-6); g.quadraticCurveTo(-11+lean*0.3,6,-8+lean,15); g.lineTo(-2+lean,15);
  g.quadraticCurveTo(-4,4,-3,-6); g.closePath(); g.fill();
  g.strokeStyle='rgba(124,180,255,0.20)'; g.lineWidth=1;
  g.beginPath(); g.moveTo(-11,-7); g.quadraticCurveTo(-17+lean*0.3,7,-13+lean,16); g.stroke();
  g.beginPath(); g.moveTo(11,-7); g.quadraticCurveTo(17+lean*0.3,7,13+lean,16); g.stroke();
  // Rim-Light: schmale helle Kontur, hebt die Figur vom dunklen Grund ab
  g.strokeStyle='rgba(170,215,255,0.45)'; g.lineWidth=1;
  // Torso mit Brustpanzer
  g.fillStyle='#e9eef7'; g.beginPath(); g.roundRect(-9,-9,18,18,5); g.fill(); g.stroke();
  g.fillStyle='#cbd6e6'; g.beginPath(); g.roundRect(-6.5,-7.5,13,8,3); g.fill();
  g.fillStyle='#aab7cc'; g.beginPath(); g.roundRect(-9,-1,18,2.5,1); g.fill();
  // Energiekern in der Brust – pulsiert in Klingenfarbe, verbindet Held und Waffe
  const pul=0.55+0.45*Math.sin(Date.now()/380);
  g.save(); g.shadowColor=farbe; bl(10*pul);
  g.fillStyle=farbe; g.globalAlpha=0.85;
  g.beginPath(); g.arc(0,-3.5,2.4,0,Math.PI*2); g.fill();
  g.restore();
  // Schulterpanzer
  g.fillStyle='#dbe3f0';
  g.beginPath(); g.roundRect(-12.5,-8.5,5,7,2.5); g.fill(); g.stroke();
  g.beginPath(); g.roundRect( 7.5,-8.5,5,7,2.5); g.fill(); g.stroke();
  // Kopf mit Kapuze und leuchtendem Visier
  g.fillStyle='#f2dcc0'; g.beginPath(); g.arc(0,-15,7.5,0,Math.PI*2); g.fill(); g.stroke();
  g.fillStyle='#16203a'; g.beginPath(); g.arc(0,-16,8.6,Math.PI*0.95,Math.PI*2.05); g.fill();
  g.save(); g.shadowColor=farbe; bl(7); g.fillStyle=farbe; g.globalAlpha=0.9;
  g.beginPath(); g.roundRect(-4.5,-15.5,9,2.4,1.2); g.fill(); g.restore();
}

/* DAS KONSTRUKT — bewusst keine Umfärbung, sondern ein anderer Umriss. Es hat keine
   Beine und keinen Umhang (die beiden Formen, die den Helden auf Handygröße ausmachen),
   sondern schwebt: sechseckiger Rumpf, zwei frei fliegende Pods, eine große Optik.
   Der Umriss allein soll auf 30 Pixeln reichen, um beide zu unterscheiden. */
function zeichneKonstrukt(g, lean, farbe, kern, blur){
  const bl = blur || (v=>{ g.shadowBlur=v; });
  const t=Date.now();
  const schweb=Math.sin(t/520)*1.9;         // schwebt weiter, auch wenn man stillsteht
  g.translate(0, schweb);
  // Triebwerksglut nach unten — erklärt, warum es keine Beine braucht
  g.save(); g.globalAlpha=0.55; g.fillStyle=farbe; g.shadowColor=farbe; bl(12);
  g.beginPath(); g.ellipse(0, 13, 5.5, 2.6, 0, 0, Math.PI*2); g.fill();
  g.restore(); bl(0);
  g.strokeStyle='rgba(170,215,255,0.45)'; g.lineWidth=1;
  // Abgesetzte Pods: schweben eigenständig neben dem Rumpf
  for(const s of [-1,1]){
    const px=s*14 + lean*0.35, py=-4 + Math.sin(t/430 + s*1.7)*1.6;
    g.fillStyle='#16223a';
    g.beginPath(); g.roundRect(px-3.6, py-4.5, 7.2, 9, 2); g.fill(); g.stroke();
    g.save(); g.shadowColor=farbe; bl(6); g.fillStyle=farbe; g.globalAlpha=0.85;
    g.beginPath(); g.arc(px, py+1.6, 1.5, 0, Math.PI*2); g.fill(); g.restore(); bl(0);
  }
  // Rumpf: Sechseck statt Torso plus Kopf
  g.fillStyle='#d7e0ee'; g.beginPath();
  for(let i=0;i<6;i++){
    const a=Math.PI/6 + i*Math.PI/3;
    const x=Math.cos(a)*8.6 + lean*0.2, y=Math.sin(a)*12;
    if(i) g.lineTo(x,y); else g.moveTo(x,y);
  }
  g.closePath(); g.fill(); g.stroke();
  // dunkle Frontplatte
  g.fillStyle='#1b2740';
  g.beginPath(); g.roundRect(-6+lean*0.2, -6.5, 12, 9.5, 2.5); g.fill();
  // eine große Optik statt Kopf mit Visier
  g.save(); g.shadowColor=farbe; bl(12); g.fillStyle=farbe;
  g.beginPath(); g.arc(lean*0.2, -1.8, 3.5, 0, Math.PI*2); g.fill();
  bl(4); g.fillStyle=kern;
  g.beginPath(); g.arc(lean*0.2, -1.8, 1.4, 0, Math.PI*2); g.fill();
  g.restore(); bl(0);
  // Antennenfinne mit Signallicht — gibt der Silhouette oben eine klare Spitze
  g.strokeStyle='#aab7cc'; g.lineWidth=1.6;
  g.beginPath(); g.moveTo(0,-11.5); g.lineTo(0,-17.5); g.stroke();
  g.save(); g.shadowColor=farbe; bl(8); g.fillStyle=farbe;
  g.beginPath(); g.arc(0,-18.6,1.7,0,Math.PI*2); g.fill(); g.restore(); bl(0);
  g.translate(0, -schweb);
}

/* Neue Charakter-Silhouetten aus dem v5-Zielkonzept. Die alten Zeichenfunktionen
   bleiben vorerst als sichere Rueckfallebene im Quelltext; alle aktiven Aufrufe nutzen
   diese kompakteren, staerker unterscheidbaren Canvas-Figuren. */
function zeichneLichthueterNeu(g, moving, lean, bobPhase, farbe, blur){
  const bl=blur||(v=>{g.shadowBlur=v;}), t=Date.now();
  const stride=moving?Math.sin(bobPhase)*3.2:0;
  g.lineJoin='round';
  // Beine und geteilter, lichtdurchlaessiger Mantel.
  g.fillStyle='#c7d2df';
  g.beginPath(); g.roundRect(-7+stride*.5,7,5.5,10,2.5); g.fill();
  g.beginPath(); g.roundRect(1.5-stride*.5,7,5.5,10,2.5); g.fill();
  g.fillStyle='rgba(92,190,255,.22)';
  for(const s of [-1,1]){
    g.beginPath(); g.moveTo(s*7,-5); g.quadraticCurveTo(s*(18+lean*.25),6,s*(13+lean),18);
    g.lineTo(s*(4+lean*.35),11); g.lineTo(s*3,-3); g.closePath(); g.fill();
  }
  // Goldener Schutzhalo als sofort lesbares Merkmal des Hueters.
  g.save(); g.strokeStyle='rgba(229,185,91,.75)'; g.lineWidth=1.8;
  g.shadowColor='#e5b95b'; bl(6); g.globalAlpha=.82+Math.sin(t/650)*.08;
  g.beginPath(); g.arc(0,-14,11.8,0,Math.PI*2); g.stroke();
  for(let i=0;i<4;i++){
    const a=Math.PI/4+i*Math.PI/2;
    g.beginPath(); g.moveTo(Math.cos(a)*10,-14+Math.sin(a)*10); g.lineTo(Math.cos(a)*14,-14+Math.sin(a)*14); g.stroke();
  }
  g.restore(); bl(0);
  // Weiss-goldener, spitz zulaufender Brustpanzer.
  g.strokeStyle='#d9b45c'; g.lineWidth=1.15; g.fillStyle='#edf3f8';
  g.beginPath(); g.moveTo(-9,-8); g.lineTo(-11,1); g.lineTo(0,11); g.lineTo(11,1); g.lineTo(9,-8); g.closePath(); g.fill(); g.stroke();
  g.fillStyle='#c7d2df'; g.beginPath(); g.moveTo(-7,-6); g.lineTo(0,6); g.lineTo(7,-6); g.lineTo(0,-1); g.closePath(); g.fill();
  const pul=.55+.45*Math.sin(t/380);
  g.save(); g.shadowColor=farbe; bl(10*pul); g.fillStyle=farbe;
  g.beginPath(); g.arc(0,-1.5,2.5,0,Math.PI*2); g.fill(); g.restore(); bl(0);
  // Breite Schulterplatten.
  g.fillStyle='#f6f8fb';
  for(const s of [-1,1]){
    g.beginPath(); g.moveTo(s*7,-7); g.lineTo(s*15,-5); g.lineTo(s*12,1); g.lineTo(s*7,-1); g.closePath(); g.fill(); g.stroke();
  }
  // Geschlossener Helm mit Krone und cyanfarbenem Visier.
  g.fillStyle='#eef3f8'; g.beginPath();
  g.moveTo(0,-24); g.lineTo(7,-19); g.lineTo(6,-11); g.lineTo(0,-7); g.lineTo(-6,-11); g.lineTo(-7,-19); g.closePath(); g.fill(); g.stroke();
  g.fillStyle='#d9b45c'; g.beginPath(); g.moveTo(0,-26); g.lineTo(2,-21); g.lineTo(0,-18); g.lineTo(-2,-21); g.closePath(); g.fill();
  g.save(); g.shadowColor=farbe; bl(7); g.fillStyle=farbe;
  g.beginPath(); g.moveTo(-4.8,-17); g.lineTo(0,-14.5); g.lineTo(4.8,-17); g.lineTo(4.2,-14.5); g.lineTo(0,-12.6); g.lineTo(-4.2,-14.5); g.closePath(); g.fill(); g.restore(); bl(0);
}

function zeichneLeerenklingeNeu(g, lean, farbe, kern, blur){
  const bl=blur||(v=>{g.shadowBlur=v;}), t=Date.now();
  const schweb=Math.sin(t/520)*1.9, leere='#a855f7', leereHell='#e9d5ff';
  g.translate(0,schweb); g.lineJoin='round';
  // Instabiles Portal statt technischer Triebwerksglut.
  g.save(); g.globalAlpha=.62; g.strokeStyle=leere; g.lineWidth=2; g.shadowColor=leere; bl(12);
  g.beginPath(); g.ellipse(0,14,9,3.3,0,0,Math.PI*2); g.stroke(); g.restore(); bl(0);
  g.strokeStyle='rgba(216,180,254,.52)'; g.lineWidth=1;
  // Schwarze Energiefinnen reagieren sichtbar auf Bewegung.
  for(const s of [-1,1]){
    const flap=Math.sin(t/260+s)*2;
    g.fillStyle='#171022'; g.beginPath();
    g.moveTo(s*6,-7); g.lineTo(s*(19+Math.abs(lean)*.2),-11+flap); g.lineTo(s*13,-2); g.lineTo(s*18,7-flap); g.lineTo(s*6,4); g.closePath(); g.fill(); g.stroke();
    g.save(); g.strokeStyle=leere; g.shadowColor=leere; bl(7); g.globalAlpha=.75;
    g.beginPath(); g.moveTo(s*7,-5); g.lineTo(s*16,-8+flap); g.moveTo(s*8,2); g.lineTo(s*16,5-flap); g.stroke(); g.restore(); bl(0);
  }
  // Geschichteter schwarzer Panzer mit violetten Rissen.
  g.fillStyle='#100d17'; g.beginPath();
  g.moveTo(0,-20); g.lineTo(8,-11); g.lineTo(10,3); g.lineTo(0,13); g.lineTo(-10,3); g.lineTo(-8,-11); g.closePath(); g.fill(); g.stroke();
  g.fillStyle='#252033'; g.beginPath(); g.moveTo(0,-15); g.lineTo(6,-8); g.lineTo(5,4); g.lineTo(0,8); g.lineTo(-5,4); g.lineTo(-6,-8); g.closePath(); g.fill();
  g.save(); g.strokeStyle=leere; g.shadowColor=leere; bl(9); g.lineWidth=1.5;
  g.beginPath(); g.moveTo(-5,3); g.lineTo(0,8); g.lineTo(5,3); g.moveTo(0,-13); g.lineTo(0,-8); g.stroke();
  g.fillStyle=leere; g.beginPath(); g.ellipse(lean*.15,-5,4.8,2.8,0,0,Math.PI*2); g.fill();
  bl(3); g.fillStyle=leereHell; g.beginPath(); g.ellipse(lean*.15,-5,1.4,2,0,0,Math.PI*2); g.fill(); g.restore(); bl(0);
  // Hornplatten unterscheiden den Umriss auch ohne Farbe.
  g.fillStyle='#171220';
  g.beginPath(); g.moveTo(-5,-16); g.lineTo(-10,-24); g.lineTo(-2,-19); g.closePath(); g.fill(); g.stroke();
  g.beginPath(); g.moveTo(5,-16); g.lineTo(10,-24); g.lineTo(2,-19); g.closePath(); g.fill(); g.stroke();
  g.translate(0,-schweb);
}

/* Die Klinge zeichnet sich selbst — auf das Spielfeld oder auf eine Vorschau-Leinwand.
   `blur` ist der Setzer für das Leuchten: im Spiel sb(), das die Sparmodi kennt,
   in der Vorschau ein einfaches Setzen. Ursprung ist der Griff, +x zeigt zur Spitze. */
function zeichneKlinge(g, x0, laenge, form, farbe, kern, blur){
  const bl = blur || (v=>{ g.shadowBlur=v; });
  const strahlen = form.zwei ? [-3.7, 3.7] : [0];
  // Glasklinge (Auslese-Modul): der Lebens-Handel bleibt sonst unsichtbar. Heller,
  // schmalerer Kern statt der Skin-Kernfarbe plus ein wandernder kalter Lichtpunkt —
  // kein neues Bild, nur andere Werte im vorhandenen Zeichenpfad.
  const glas = !!runModule.glasklinge;
  const kernSkal = glas ? 0.55 : 1;
  const kernFarbe = glas ? '#eafdff' : kern;
  for(const off of strahlen){
    g.shadowColor=farbe; bl(form.glut); g.fillStyle=farbe;
    if(form.spitz){
      // verjüngt sich zur Spitze — als Vieleck statt Rechteck
      const h=form.dicke/2, hs=h*0.42;
      g.beginPath();
      g.moveTo(x0, off-h);
      g.lineTo(x0+laenge-7, off-hs);
      g.lineTo(x0+laenge, off);
      g.lineTo(x0+laenge-7, off+hs);
      g.lineTo(x0, off+h);
      g.closePath(); g.fill();
    } else {
      g.beginPath(); g.roundRect(x0, off-form.dicke/2, laenge, form.dicke, form.rund); g.fill();
    }
    bl(form.glut*0.5); g.fillStyle=kernFarbe;
    if(form.doppelkern){
      for(const k of [-form.kern*0.7, form.kern*0.7]){
        g.beginPath(); g.roundRect(x0+2, off+k-0.55*kernSkal, laenge-9, 1.1*kernSkal, 0.55*kernSkal); g.fill();
      }
    } else {
      g.beginPath(); g.roundRect(x0+1, off-form.kern*kernSkal/2, laenge-5, form.kern*kernSkal, form.kern*kernSkal/2); g.fill();
    }
    if(glas){
      // kalter Schimmer: heller Punkt läuft die Klingenlänge ab und zurück
      const lauf=Math.abs(((Date.now()/620)%2)-1);
      bl(form.glut*0.7); g.fillStyle='rgba(224,250,255,'+(0.5+0.35*Math.sin(Date.now()/95)).toFixed(2)+')';
      g.beginPath(); g.arc(x0+5+(laenge-14)*lauf, off, 2, 0, Math.PI*2); g.fill();
    }
  }
  bl(0);
  // Griff — die Form prägt auch ihn, sonst sähe alles am Ansatz gleich aus
  g.fillStyle='#c2cbdb'; g.beginPath(); g.roundRect(4,-3,15,6,2); g.fill();
  g.fillStyle='#5d6b82';
  g.beginPath(); g.rect(9,-3,2,6); g.fill();
  g.beginPath(); g.rect(13,-3,2,6); g.fill();
  if(form.spitz){   // Parierstange
    g.fillStyle='#aab7cc'; g.beginPath(); g.roundRect(x0-4, -7.5, 3.2, 15, 1.5); g.fill();
  }
  if(form.zwei){    // Gabel, aus der beide Strahlen austreten
    g.fillStyle='#aab7cc'; g.beginPath(); g.roundRect(x0-4, -5.8, 3.2, 11.6, 1.5); g.fill();
  }
}
// Fähigkeiten-Helfer: getragen? Stufe? Skalierung je Stufe? freigeschaltet?
function abilIcon(id){ return ICON[ABILITIES[id].iconKey]||''; }
function isCarried(id){
  if(ABILITIES[id].slot==='active') return activeSlot1===id || activeSlot2===id;
  return !!runAbilities[id];
}
function abilityLevel(id){
  if(!isCarried(id)) return 0;
  return runAbilities[id] || 1;
}
function abilScale(level){ return 1 + CONFIG.abilLevelScale*(level-1); }
function machtFaktor(id){ return treeFlags['powerDmg_'+id]||1; }
function abilUnlocked(id){ return isAvailable('ability', id); }
function activeCdMax(id){
  if(!id) return 0;
  const basis=id==='bombe'? CONFIG.bombeCooldown : id==='nova'? CONFIG.novaCooldown : id==='sog'? CONFIG.sog.cooldown : id==='stoss'? CONFIG.stossCooldown : CONFIG.wirbelCooldown;
  // Auslese-Modul Kurzschluss: −35 %/−60 % Abklingzeit, bezahlt in doActive() mit Leben.
  const kurzschluss=runModule.kurzschluss>=2?0.40:runModule.kurzschluss===1?0.65:1;
  return basis*(treeFlags['powerCd_'+id]||1)*kurzschluss;
}
const ACTIVE_COLORS={ wirbel:['#ffb340','255,179,64'], stoss:['#6ec8ff','110,200,255'], bombe:['#ff7a5a','255,122,90'], nova:['#c77dff','199,125,255'], sog:['#4de0a0','77,224,160'] };
// Aktiven-Buttons passend zu den gewählten Slots neu aufbauen (Icon, Name, Farbe)
function activeBtnHTML(key,keyLabel){
  const id = key==='a'? activeSlot1 : activeSlot2;
  const m=ABILITIES[id];
  return `<span class="cd-sweep" id="cd-${key}"></span>
    ${key==='a'?'<span class="focus-ring" aria-hidden="true"></span>':''}
    <svg class="s-icon" viewBox="0 0 24 24" aria-hidden="true">${abilIcon(id)}</svg>
    <span class="s-label">${m.name}</span>
    ${key==='a'?'<span class="focus-value">1 · F 0/'+fokusZiel()+'</span><span class="crown-series" aria-hidden="true"></span>':'<span class="s-key">'+keyLabel+'</span>'}`;
}
function updateActiveButtons(){
  const c1=ACTIVE_COLORS[activeSlot1]||['#6ec8ff','110,200,255'];
  btnWirbel.innerHTML=activeBtnHTML('a','1');
  cdWirbel=document.getElementById('cd-a');
  btnWirbel.style.setProperty('--c', c1[0]); btnWirbel.style.setProperty('--cRGB', c1[1]);
  btnWirbel.setAttribute('aria-label',(ABILITIES[activeSlot1]?.name||'Hauptmacht')+' · Taste 1');
  updateCooldownUI(btnWirbel, cdWirbel, activeCd[activeSlot1]||0, activeCdMax(activeSlot1), 'a');
}

let treeUndo=null;
const REGULAR_POINT_CAP=15;
const CROWN_SPINE=['blade','mutation','partner','char','master','synergy','evolution','resonance','crown'];
function crownSpineMissingAfter(node,nodes){
  const done=new Set(nodes.filter(n=>n.spine&&treeRang(n.id)>0).map(n=>n.spine));
  if(node&&node.spine) done.add(node.spine);
  return CROWN_SPINE.filter(id=>!done.has(id)).length;
}
/* Ein optionaler Rang wird nur dann angehalten, wenn er einen der noch nötigen
   Schritte bis zur Krone aus dem 15-Punkte-Budget verdrängen würde. */
function blocksCrownBudget(node,nodes){
  if(node.endless || treeRang('orbit_crown')) return false;
  return regularInvested()+1+crownSpineMissingAfter(node,nodes)>REGULAR_POINT_CAP;
}
function treeStatus(node, nodes){
  const rang=treeRang(node.id), max=node.maxRank||1;
  if(node.free) return {art:'bought',text:'Ausgangspunkt',rang:1,max:1};
  if(rang>=max) return {art:'bought', text:max>1?'Rang '+rang+' / '+max:'Freigeschaltet',rang,max};
  if(regularTreeFrozen && !node.endless) return {art:'locked',text:'Welle-30-Build ist eingefroren'};
  if(node.available && !node.available()) return {art:'locked', text:'Noch nicht dauerhaft freigeschaltet'};
  if(node.exclusiveGroup){
    const gegner=nodes.find(n=>n.exclusiveGroup===node.exclusiveGroup && n.id!==node.id && treeRang(n.id));
    if(gegner) return {art:'blocked',text:'Ausgeschlossen durch '+gegner.name};
  }
  const fehlt=(node.reqAll||node.req||[]).filter(id=>id!=='orbit_root'&&!treeRang(id));
  if(fehlt.length){
    const namen=fehlt.map(id=>(nodes.find(n=>n.id===id)||{name:'Verbindung'}).name).join(', ');
    return {art:'locked', text:'Benötigt: '+namen};
  }
  if(node.reqAny && !node.reqAny.some(id=>treeRang(id))){
    const namen=node.reqAny.map(id=>(nodes.find(n=>n.id===id)||{name:'Verbindung'}).name).join(' oder ');
    return {art:'locked',text:'Benötigt: '+namen};
  }
  const fehlendeRaenge=Object.entries(node.reqRanks||{}).filter(([id,min])=>treeRang(id)<min);
  if(fehlendeRaenge.length){
    const namen=fehlendeRaenge.map(([id,min])=>(nodes.find(n=>n.id===id)||{name:'Verbindung'}).name+' Rang '+min).join(', ');
    return {art:'locked',text:'Benötigt: '+namen};
  }
  if(node.minInvested && regularInvested()<node.minInvested)
    return {art:'locked',text:'Benötigt: '+node.minInvested+' investierte Punkte'};
  if(blocksCrownBudget(node,nodes)) return {art:'locked',text:'Zuerst den Kronenpfad sichern'};
  const punkte=node.endless?echoPoints:skillPoints;
  if(punkte<1) return {art:'locked', text:node.endless?'Kein Echo-Punkt verfügbar':'Kein Punkt verfügbar'};
  return {art:'ready', text:(node.endless?'1 Echo-Punkt':'1 Punkt')+' · Rang '+(rang+1)+' / '+max,rang,max};
}
function kaufenTreeKnoten(id){
  const nodes=treeNodes(), node=nodes.find(n=>n.id===id);
  if(!node || (regularTreeFrozen&&!node.endless)) return;
  if(!node || treeStatus(node,nodes).art!=='ready') return;
  if(node.endless) echoPoints--; else skillPoints--;
  const next=treeRang(id)+1; runTree[id]=next; node.apply(next);
  treeFlags.upgradeGlowUntil=Date.now()+2200; treeFlags.lastUpgrade=node.name;
  particles.push({ring:true,x:player.x,y:player.y,color:node.evo?'#ffd257':'#4de0a0',life:.65,max:.65});
  spawnParticles(player.x,player.y,node.evo?'#ffd257':'#4de0a0',node.evo?28:16);
  if(node.evo && sfx) sfx('unlockBig'); else if(sfx) sfx('upgrade');
  updateActiveButtons(); updateHUD(true); updateTreeButton();
}
/* AUTOMATISCHE FREISCHALTUNG
   Ein Levelaufstieg kauft den nächsten Kettenknoten selbst. Nur Knoten mit
   exclusiveGroup — Klingenführung, Mutation, Haltung — bleiben eine echte
   Entscheidung und lassen ihren Punkt stehen; der HUD-Knopf zeigt ihn dann an.
   Endlosknoten bleiben ebenfalls manuell. */
function autoFreischalten(){
  const namen=[];
  let sicherung=0;
  while((skillPoints>0 || echoPoints>0) && sicherung++<40){
    const nodes=treeNodes();
    const kandidat=nodes.find(n=>{
      if(treeStatus(n,nodes).art!=='ready') return false;
      if(istWahlKnoten(n,nodes)) return false;
      return n.endless ? echoPoints>0 : skillPoints>0;
    });
    if(!kandidat) break;
    kaufenTreeKnoten(kandidat.id);
    namen.push(kandidat.name);
  }
  treeUndo=null;
  return namen;
}
function updateTreeButton(){
  /* Der HUD-Knopf für den Orbitpfad ist entfallen — Fortschritt wird
     freigeschaltet, nicht verwaltet. Die Funktion bleibt als Leerrumpf
     stehen, weil sie an 19 Stellen gerufen wird; alle Aufrufe zu entfernen
     wäre mehr Risiko als Nutzen. */
}
let combatResumeUntil=0, combatResumeStep='';
function finishCombatResume(){
  if(state!=='countdown') return;
  state='playing'; combatResumeUntil=0; combatResumeStep='';
  if(combatResume) combatResume.classList.add('hidden');
  lastTime=performance.now(); setMusicLevel(); updateTreeButton();
}
function skipCombatResume(){ if(state==='countdown') finishCombatResume(); }
function startCombatResume(name){
  state='countdown'; combatResumeUntil=performance.now()+2000; combatResumeStep='';
  if(combatResume){
    const sub=combatResume.querySelector('span'); if(sub) sub.textContent=name||'Orbit stabilisiert';
    combatResume.classList.remove('hidden');
  }
  setMusicLevel(); updateTreeButton(); lastTime=performance.now();
}
function tickCombatResume(now){
  if(state!=='countdown') return;
  const rest=combatResumeUntil-now;
  if(rest<=0){ finishCombatResume(); return; }
  const step=rest>1000?'2':rest>220?'1':'LOS';
  if(step!==combatResumeStep && combatResume){
    combatResumeStep=step; const n=combatResume.querySelector('strong'); if(n) n.textContent=step;
    if(step==='LOS' && sfx) sfx('pick');
  }
}
/* AUSLESE — alle drei Wellen ein kurzer Zwischenstopp mit drei Karten aus den
   passiven Fähigkeiten. Sie ersetzt nichts am Orbitpfad, sondern ist eine zweite,
   unabhängige Quelle für dieselben Passiven. Je Fähigkeit gibt es nur "Neu" oder
   den mechanischen Sprung auf SPRUNG_STUFE — die Zwischenstufen 2/3 sind laut
   STUFEN reine +10 %/+20 %-Prozentkarten und in diesem Projekt unerwünscht. */
const AUSLESE_PREISE=[50,100,200,400];   // Index = bereits bezahlte Würfe in diesem Lauf, gedeckelt bei 400
let ausleseKarten=[], letzteAusleseWelle=0, ausleseReturnState='playing';
let ausleseFreiwurfBenutzt=false, ausleseBezahlteWuerfe=0, ausleseOffenSeit=0;
/* Eigene Karteneffekte, bewusst NICHT in
   ABILITIES — diese Tabelle speist nur die Auslese, nicht Vorbereitung, Sammlung
   oder Orbitpfad. Getragener Stand liegt in runModule (id -> Rang 1..2), getrennt
   von runAbilities. Wie bei den Passiven gibt es je Modul nur zwei Karten: "Neu"
   (desc, Rang 1) und "Verstärkt" (sprung, Rang 2) — keine Zwischenstufen. */
const AUSLESE_MODULE={
  klingenteilung:{ name:'Klingenteilung', icon:'klingenteilung',
                desc:'Eine zusätzliche Klinge kreist mit',
                sprung:'Noch eine Klinge; jeder Volltreffer wiegt deutlich schwerer' },
  taktschlag: { name:'Taktschlag',  icon:'taktschlag',
                desc:'Jeder 3. volle Umlauf stößt eine Schadenswelle aus',
                sprung:'Schon jeder 2. Umlauf; die Welle verlangsamt zusätzlich' },
  nachfassen: { name:'Nachfassen',  icon:'nachfassen',
                desc:'Wirst du getroffen, wird dein nächster Volltreffer doppelt so breit',
                sprung:'Dieser breite Treffer durchschlägt zusätzlich Panzerung' },
  glasklinge: { name:'Glasklinge',  icon:'glasklinge',
                desc:'Klingenschaden ×1,45, dafür nur 60 % maximales Leben',
                sprung:'Klingenschaden ×1,80; Barriere baut sich nicht mehr auf' },
  funkenkranz:{ name:'Funkenkranz', icon:'funkenkranz',
                desc:'Zwei Funken kreisen außen gegen die Klinge und verletzen bei Berührung',
                sprung:'Vier größere Funken ziehen einen weiteren Gegenorbit' },
  brandspur: { name:'Brandspur', icon:'brandspur',
                desc:'Die Klingenspitze hinterlässt brennende Male für 1,4 Sekunden',
                sprung:'Größere Brandmale bleiben 2 Sekunden liegen' },
};
// Die Passive, die der Orbitbaum für die aktuelle Hauptmacht als Partner ohnehin
// vergibt (EVOLUTIONS[...].req) — sonst würde sie mit dem Baum kollidieren.
function ausleseAusschluss(){
  const pair=Object.entries(EVOLUTIONS).find(([,e])=>e.base===activeSlot1);
  return pair? pair[1].req : null;
}
/* Die drei echten Entscheidungen des Orbitpfads — Klingenführung, Mutation, Haltung.
   Alles andere kauft autoFreischalten() selbst. Liefert das Paar der aktuell
   kaufbaren Alternativen, damit die Auslese sie als zwei Karten anbieten kann. */
/* Ein Knoten ist nur dann eine echte Wahl, wenn mindestens zwei Alternativen
   seiner Gruppe gleichzeitig kaufbar sind. Ist die Gegenwahl bereits gesperrt
   — etwa Rang 2 und 3 eines gewaehlten Endlos-Echos —, ist es keine
   Entscheidung mehr und die Automatik darf ihn nehmen. */
function istWahlKnoten(node, nodes){
  if(!node.exclusiveGroup) return false;
  return nodes.filter(n=>n.exclusiveGroup===node.exclusiveGroup
                      && treeStatus(n,nodes).art==='ready').length>=2;
}
function offeneWeiche(){
  if(skillPoints<1 && echoPoints<1) return [];
  const nodes=treeNodes();
  const kand=nodes.find(n=>treeStatus(n,nodes).art==='ready'
                        && istWahlKnoten(n,nodes)
                        && (n.endless? echoPoints>0 : skillPoints>0));
  if(!kand) return [];
  const gruppe=nodes.filter(n=>n.exclusiveGroup===kand.exclusiveGroup
                            && treeStatus(n,nodes).art==='ready');
  if(gruppe.length<=2) return gruppe;
  /* Mehr als zwei Alternativen — das sind die vier Haltungen. Es werden zwei
     gezogen, damit die Karte ihre Form behält: zwei große Karten statt vier
     kleiner. Der Laufseed bestimmt welche, also reproduzierbar und je Lauf anders. */
  const zufall=laufStrom('weiche', gruppe.length);
  const rest=gruppe.slice(), zwei=[];
  while(zwei.length<2 && rest.length) zwei.push(rest.splice(Math.floor(zufall()*rest.length),1)[0]);
  return zwei;
}
// Anzeige-Infos einer Auslese-Karte, unabhängig davon ob Weiche, Passive oder Modul.
function ausleseKartenInfo(karte){
  // Weichen tragen ein Textzeichen als Symbol, keine SVG-Pfade — daher glyph:true.
  if(karte.weiche) return { name:karte.name, icon:karte.icon, text:karte.desc, glyph:true };
  const mod=AUSLESE_MODULE[karte.id];
  if(mod) return { name:mod.name, icon:ICON[mod.icon]||'', text: karte.kind==='verstaerkt'? mod.sprung : mod.desc };
  return { name:ABILITIES[karte.id].name, icon:abilIcon(karte.id), text: karte.kind==='verstaerkt'? STUFEN[karte.id].sprung : ABILITIES[karte.id].desc };
}
// Höchstens eine Karte je Passive/Modul: "Neu" solange ungetragen, "Verstärkt" nur
// exakt auf Stufe/Rang 1 — danach ist der jeweilige Höchststand erreicht.
function ausleseTopf(){
  const ausschluss=ausleseAusschluss(), out=[];
  for(const id of PASSIVE_IDS){
    if(id===ausschluss) continue;
    if(!isCarried(id)) out.push({id,kind:'neu'});
    else if(abilityLevel(id)===1) out.push({id,kind:'verstaerkt'});
  }
  for(const id in AUSLESE_MODULE){
    const rang=runModule[id]||0;
    if(rang===0) out.push({id,kind:'neu'});
    else if(rang===1) out.push({id,kind:'verstaerkt'});
  }
  return out;
}
// Bis zu drei verschiedene Karten, ohne Gewichtung; ein kleinerer Topf zeigt entsprechend
// weniger. Prüfstufe „Knappe Wahl" senkt das Ziel auf zwei (hilfe().ausleseKarten).
/* Gewichtetes Ziehen (Auslese v3): Fundamente zuerst — eine noch nicht getragene
   Fähigkeit wiegt schwerer als ihre Vertiefung. So wird die Wahl eher eine
   Richtung als ein Zufallsstapel. Nach Hades-Vorbild zustandsabhängig, gemessen
   über den Topf: 11 Dinge tragen sich am Ende zu rund zwei Dritteln. */
function ausleseGewicht(karte){
  const istModul=!!AUSLESE_MODULE[karte.id];
  const besitzt=istModul? (runModule[karte.id]||0) : (runAbilities[karte.id]||0);
  if(istModul) return besitzt? 1.5 : 2.0;
  return karte.kind==='verstaerkt'? (besitzt? 2.4 : 1.4) : (besitzt? 2.4 : 3.0);
}
function ausleseZiehen(){
  const pool=ausleseTopf();
  // Tages-Regel „Enge Auslese": zwei Karten statt drei.
  const ziel=Math.min(hilfe().ausleseKarten||3, (laufVorgabe&&laufVorgabe.regel&&laufVorgabe.regel.ausleseKarten)||99);
  const gezogen=[];
  /* Jede Ziehung bekommt ihren eigenen, fortlaufend nummerierten Strom vom
     Lauf-Seed. Die erste Auslese eines Laufs ist damit für alle Spieler am selben
     Tag identisch — später weicht der Zustand (getragene Karten) ohnehin auseinander,
     und genau dafür ist die Gewichtung da. */
  const zufall=laufStrom('karte', ++ausleseZiehungen);
  while(pool.length && gezogen.length<ziel){
    let summe=0;
    for(const k of pool) summe+=ausleseGewicht(k);
    let r=zufall()*summe, idx=0;
    for(; idx<pool.length; idx++){ r-=ausleseGewicht(pool[idx]); if(r<=0) break; }
    if(idx>=pool.length) idx=pool.length-1;
    gezogen.push(pool.splice(idx,1)[0]);
  }
  return gezogen;
}
function auslesePreis(){ return AUSLESE_PREISE[Math.min(ausleseBezahlteWuerfe,AUSLESE_PREISE.length-1)]; }
function renderAuslese(){
  const istWeiche = ausleseKarten.length>0 && !!ausleseKarten[0].weiche;
  const hinweis=document.getElementById('auslese-hinweis');
  if(hinweis) hinweis.textContent=istWeiche
    ? 'Wähle deinen Weg — diese Wahl gilt den ganzen Lauf'
    : 'Welle '+wave+' · wähle eine Karte';
  const wrap=document.getElementById('auslese-karten'); wrap.innerHTML='';
  for(const karte of ausleseKarten){
    const stufe=istWeiche?'':(karte.kind==='verstaerkt'?'Verstärkt':'Neu');
    const info=ausleseKartenInfo(karte);
    const b=document.createElement('button');
    b.className='auslese-karte'+(karte.kind==='verstaerkt'?' stark':'');
    // Das Symbol kommt aus derselben Quelle wie Vorbereitung und Sammlung, damit
    // eine Faehigkeit ueberall gleich aussieht und man sie wiedererkennt.
    b.innerHTML='<span class="ak-icon">'+(info.glyph?info.icon:svg(info.icon))+'</span>'
      +'<span class="ak-body"><span class="ak-titel">'+info.name+'</span>'
      +'<span class="ak-text">'+info.text+'</span></span>'
      +'<span class="ak-stufe">'+stufe+'</span>';
    b.onclick=()=>waehleAuslese(karte);
    wrap.appendChild(b);
  }
  const reroll=document.getElementById('auslese-reroll'), preis=auslesePreis();
  // Eine exklusive Wahl darf nicht neu gewuerfelt werden.
  reroll.classList.toggle('hidden', istWeiche);
  reroll.textContent='Neu würfeln · '+(ausleseFreiwurfBenutzt?preis+' ◆':'gratis');
  reroll.disabled=ausleseFreiwurfBenutzt && player.stars<preis;
}
// Wellenstart prüft, ob diese Welle eine Auslese vorsieht — höchstens einmal je Welle,
// deshalb über die gemerkte Wellennummer statt eines Zählers abgesichert.
function pruefeAuslese(){
  if(wave%3!==0 || wave>=CONFIG.siegWelle || letzteAusleseWelle===wave) return;
  letzteAusleseWelle=wave;
  oeffneAuslese();
}
// Vorherigen state merken, eigenen state setzen,
// Overlay einblenden. update() läuft in diesem state nicht weiter (state!=='playing').
function oeffneAuslese(){
  if(state!=='playing') return false;
  ausleseKarten=ausleseZiehen();
  if(!ausleseKarten.length) return false;   // gar nichts wählbar -> Auslese komplett überspringen
  ausleseReturnState=state; state='auslese'; ausleseOffenSeit=Date.now(); setMusicLevel();
  overlayAuslese.classList.remove('hidden'); renderAuslese(); updateTreeButton();
  return true;
}
function oeffneWeichenAuslese(){
  if(state!=='playing') return false;
  const w=offeneWeiche();
  if(!w.length) return false;
  ausleseKarten=w.map(n=>({weiche:true,id:n.id,name:n.name,desc:n.desc,icon:n.icon}));
  ausleseReturnState=state; state='auslese'; ausleseOffenSeit=Date.now(); setMusicLevel();
  overlayAuslese.classList.remove('hidden'); renderAuslese(); updateTreeButton();
  return true;
}
function waehleAuslese(karte){
  if(state!=='auslese') return;
  if(karte.weiche){
    kaufenTreeKnoten(karte.id);
    autoFreischalten();          // die Weiche oeffnet die naechsten Kettenknoten
    pushToast(karte.name);
    updateHUD(true);
    schliesseAuslese(karte.name);
    return;
  }
  const info=ausleseKartenInfo(karte);
  if(AUSLESE_MODULE[karte.id]){
    const vorher=runModule[karte.id]||0;
    runModule[karte.id]=karte.kind==='verstaerkt'?2:1;
    /* Glasklinge senkt das maximale Leben genau einmal, beim ersten Kauf. Rang 2 legt
       nur noch die Barriere lahm (siehe barriereMax) und hebt den Schaden — sonst
       schrumpfte die Leiste ein zweites Mal und der Spieler stünde plötzlich vor dem Tod. */
    if(karte.id==='glasklinge' && vorher===0){
      const neuMax=Math.max(1,Math.round(player.maxHp*0.6));
      player.hp=Math.max(1,Math.min(player.hp,neuMax));
      player.maxHp=neuMax; barriere=Math.min(barriere,barriereMax());
    }
  }
  else runAbilities[karte.id]=karte.kind==='verstaerkt'?SPRUNG_STUFE:1;
  // pushToast() klingt selbst — ein zusätzliches sfx('pick') gäbe zwei Töne hintereinander.
  pushToast(info.name+' · '+(karte.kind==='verstaerkt'?'verstärkt':'neu'));
  updateHUD(true);
  schliesseAuslese(info.name);
}
function wuerfleAusleseNeu(){
  if(state!=='auslese') return;
  const preis=auslesePreis();
  if(ausleseFreiwurfBenutzt){
    if(player.stars<preis) return;   // doppelte Absicherung, der Knopf ist ohnehin disabled
    player.stars-=preis; ausleseBezahlteWuerfe=Math.min(ausleseBezahlteWuerfe+1,AUSLESE_PREISE.length-1);
  } else ausleseFreiwurfBenutzt=true;
  ausleseKarten=ausleseZiehen();
  if(!ausleseKarten.length){ schliesseAuslese(); return; }   // Absicherung, falls der Topf leerläuft
  if(sfx) sfx('pick');
  updateHUD(true); renderAuslese();
}
// Gemerkten state wiederherstellen, Overlay ausblenden.
function schliesseAuslese(name){
  if(state!=='auslese') return;
  overlayAuslese.classList.add('hidden');
  /* Bei Welle 15 spawnt der Boss im selben startWave()-Aufruf und startet die
     10 s Begleiter-Überladung über Date.now(). Die reale Uhr läuft weiter, während
     der Spieler Karten liest — deshalb wird die Restzeit um die Lesedauer verschoben. */
  const pause=Date.now()-ausleseOffenSeit;
  if(helferOverdriveUntil>Date.now()) helferOverdriveUntil+=pause;
  state=ausleseReturnState||'playing'; ausleseReturnState='playing'; setMusicLevel();
  // Gleiche Begründung wie nach dem Orbitpfad: neue Mechanik plus verlorener
  // Überblick über Gegner und Klingenbahn brauchen einen kurzen Wiedereinstieg.
  if(state==='playing'&&name) startCombatResume(name);
  else if(state==='playing') lastTime=performance.now();
  updateTreeButton();
}
document.getElementById('auslese-reroll').addEventListener('click',wuerfleAusleseNeu);

/* WELTZOOM
   Ohne Zoom entspricht eine Welteinheit einem CSS-Pixel — auf einem 390 px
   breiten Handy sieht man dadurch nur 1,1 s voraus, bevor ein Soldat von der
   Seite im Koerper steht. Der Zoom stellt eine Mindest-Weltbreite auf der
   KURZEN Bildschirmseite sicher; das ist die Seite, an der die Vorwarnzeit am
   knappsten ist, und sie ist in beiden Ausrichtungen die richtige Bezugsgroesse.
   Auf grossen Bildschirmen ist der Faktor 1 — dort wird bewusst nichts veraendert. */
const WELT_KURZ_MIN = 520;
let weltZoom = 1;
function berechneWeltZoom(w, h){
  if(PERF_ZOOM > 0) return PERF_ZOOM / 100;   // Messschalter ?zoom=75
  return Math.min(1, Math.min(w, h) / WELT_KURZ_MIN);
}

function resize(){
  const rawDpr=window.devicePixelRatio||1;
  const dprLimit=IS_TOUCH ? CONFIG.render.touchDpr : CONFIG.render.desktopDpr;
  renderDpr=Math.min(rawDpr, dprLimit)*(sparmodus?CONFIG.render.sparDprFaktor:1);
  /* Messschalter: `?perf=1&dpr=100` erzwingt DPR 1,00 (Wert in Hundertstel).
     Der unabhängige Gegentest zur Ebenen-Bisektion — sinkt die Bildzeit allein durch
     weniger Pixel, ist die Füllrate der Engpass und nicht die Zahl der Zeichenbefehle. */
  if(PERF_DPR>0) renderDpr=PERF_DPR/100;
  // Sichtbarer Viewport (Android-URL-Leiste ein/aus): visualViewport ist die
  // zuverlässige Größe, innerHeight enthält die Leiste und verzerrt das Spiel.
  const vv=window.visualViewport;
  const w=vv? vv.width : (document.documentElement.clientWidth||window.innerWidth);
  const h=vv? vv.height : (document.documentElement.clientHeight||window.innerHeight);
  weltZoom = berechneWeltZoom(w, h);
  canvas.width=Math.round(w*renderDpr); canvas.height=Math.round(h*renderDpr);
  canvas.style.width=w+'px'; canvas.style.height=h+'px';
  ctx.setTransform(renderDpr,0,0,renderDpr,0,0);
}
window.addEventListener('resize',resize);
if(window.visualViewport) window.visualViewport.addEventListener('resize',resize);
resize();

// Werkstatt: langfristige Möglichkeiten, keine dauerhaften Prozentwerte. Ein guter
// Lauf wird im Tree gebaut; Fragmente eröffnen nur neue Entscheidungen.
// Icon-Namen (Strings) werden erst beim Rendern über ICON aufgelöst, damit dieser
// Block vor newPlayer() stehen darf (newPlayer liest metaValue bereits beim Start).
const META_UPGRADES=[
  {gruppe:'Kernsysteme',id:'startimpuls',name:'Startimpuls',desc:'Jeder Lauf beginnt mit 1 zusätzlichen Freischaltung.',icon:'tempo',base:700},
  {gruppe:'Kernsysteme',id:'orbitarchiv',name:'Orbitarchiv',desc:'Speichert zwei Startkonfigurationen in der Vorbereitung.',icon:'reichweite',base:1800},
  {gruppe:'Blaupausen',id:'bombenkern',name:'Bombenkern',desc:'Macht die Bombe als Startmacht verfügbar.',icon:'bombe',base:1800,blueprint:['ability','bombe']},
  {gruppe:'Blaupausen',id:'novakern',name:'Novakern',desc:'Macht die Machtblitz-Nova als Startmacht verfügbar.',icon:'nova',base:2400,blueprint:['ability','nova']},
  {gruppe:'Blaupausen',id:'gravitationskern',name:'Gravitationskern',desc:'Macht den Sog als Startmacht verfügbar.',icon:'reichweite',base:3000,blueprint:['ability','sog']},
  {gruppe:'Blaupausen',id:'leerenprotokoll',name:'Leerenprotokoll',desc:'Schaltet die Leerenklinge als Aussehen frei.',icon:'boost',base:3000,blueprint:['figur','konstrukt']},
  {gruppe:'Begleiter',id:'begleiter1',name:'Sammlerkern',desc:'Begleiter sammelt Fragmente und XP-Kugeln ein.',icon:'splitter',base:1400},
  {gruppe:'Begleiter',id:'begleiter2',name:'Impulsauge',desc:'Begleiter feuert langsam auf nahe Gegner.',icon:'phaser',base:2300,req:'begleiter1'},
  {gruppe:'Begleiter',id:'begleiter3',name:'Jägerlogik',desc:'Priorisiert gepanzerte Gegner und erhält mehr Reichweite.',icon:'schaden',base:3600,req:'begleiter2'},
  {gruppe:'Begleiter',id:'begleiter4',name:'Schildprotokoll',desc:'Volle Fokusladung löst einen kleinen Schildpuls aus.',icon:'leben',base:5200,req:'begleiter3'},
  {gruppe:'Begleiter',id:'begleiter5',name:'Bossüberladung',desc:'Bei Bossbeginn arbeitet der Begleiter 10 Sekunden schneller.',icon:'tempo',base:7500,req:'begleiter4'},
  {gruppe:'Kosmetik',id:'farblabor',name:'Farblabor',desc:'Schaltet alle Klingenfarben in der Sammlung frei.',icon:'farbe',base:1200},
  {gruppe:'Kosmetik',id:'spurenlabor',name:'Spurenlabor',desc:'Bewegungsspuren leuchten in deiner Klingenfarbe.',icon:'nachhall',base:2200},
  {gruppe:'Kosmetik',id:'formarchiv',name:'Formarchiv',desc:'Schaltet alle Klingenformen in der Sammlung frei.',icon:'dreifach',base:3500},
  {gruppe:'Kosmetik',id:'hangarprojektion',name:'Hangarprojektion',desc:'Projiziert einen feinen kosmetischen Orbit um deinen Träger.',icon:'kette',base:5000},
];

function newPlayer(){
  const w = canvas.clientWidth || window.innerWidth;
  const h = canvas.clientHeight || window.innerHeight;
  // Ein Startwert für alle — die Schwierigkeit wächst über die Wellen.
  // Charakter-Werteschnitt fließt hier ein, damit er den ganzen Lauf über gilt.
  const hp = Math.round(CONFIG.playerHp * figur().hp);
  return { x: w/2, y: h/2, vx:0, vy:0, face:0, radius: CONFIG.playerRadius,
    hp, maxHp:hp, level:1, xp:0, xpNeed:CONFIG.xpBase, stars:0, hits:0, bobPhase:0, trailT:0 };
}
player = newPlayer();
window.playerRef = player;
window.addEventListener('load',()=>{ player = newPlayer(); window.playerRef = player; if(state==='menu'){ sorgeOrbitauftrag(); updateHUD(); renderOrbitauftrag(); renderTagessignal(); } });
function resetGame(){
  // Erst jetzt, vor dem nächsten Lauf, folgt auf einen erledigten Auftrag ein neuer.
  sorgeOrbitauftrag();
  player=newPlayer(); window.playerRef = player; enemies=[]; stars=[]; particles=[]; floats=[]; shots=[]; orbs=[]; killCount=0; hpKillCount=0;
  wave=1; waveEnemiesToSpawn=0; waveSpawned=0; spawnTimer=0;
  activeCd={wirbel:0,stoss:0,bombe:0,nova:0,sog:0}; phaserCd=0; phaserSoundCd=0; brandspurCd=0; dmgBoostUntil=0; shieldUntil=0; moveBoostUntil=0; stossWaveT=0; wirbelT=0; spinHitTimer=0;
  bonuses={dmg:0, speed:0, range:0, fireRate:0, maxHp:0, blades:1, regen:0};
  counterCd=0; shards=[]; bossActive=false; bossHitClean=true; flashUntil=0; helferOverdriveUntil=0;
  const vw = laufVorgabe ? { slot1:laufVorgabe.slot1, slot2:laufVorgabe.slot2 } : startMaechte();
  activeSlot1=vw.slot1; activeSlot2 = hasSlot2()? (vw.slot2||null) : null;
  runAbilities={}; runEvolutions={}; runTree={}; skillPoints=0; treeFlags={}; treeUndo=null; runModule={};
  regularPointsEarned=0; regularTreeFrozen=false; echoPoints=0; echoMilestones=0; treeReturnState='playing';
  bombs=[]; pShots=[]; powerFields=[]; powerEchoes=[]; novaFx=0; novaEcho=0; barriere=0; bossHazards=[];
  updateActiveButtons();   // ohne das behalten die Knöpfe die Beschriftung des letzten Laufs
  wiederaufBenutzt=false; nachhallZaehler=0; splitterSweetZaehler=0; fokus=0; fokusBereit=false; endlosLauf=false;
  taktschlagZaehler=0; nachfassenBereit=false;
  // Tageslauf und Ereigniswellen: Zustand gehört immer zum Lauf, nie zum letzten.
  setzeLaufSeed(laufVorgabe ? laufVorgabe.seed : (Math.random()*4294967296));
  baueTagesFaktoren();
  laufEreignis=null; letztesEreignisId=''; hitstopMs=0; kettenZahl=0; kettenBis=0;
  // Auslese ist laufgebunden: sonst wirkt der Freiwurf, die Preissteigerung oder eine
  // schon "verbrauchte" Welle aus dem vorigen Lauf im neuen Lauf nach.
  ausleseKarten=[]; letzteAusleseWelle=0; ausleseReturnState='playing'; ausleseFreiwurfBenutzt=false; ausleseBezahlteWuerfe=0; ausleseOffenSeit=0;
  ausleseZiehungen=0;
  swordAngle=0; orbitRoundSweet=false; orbitRoundLight=false; orbitRoundDistance=0; orbitLastX=player.x; orbitLastY=player.y;
  waechterLadung=false; sonnenSerie=0; sonnenTempoUntil=0; praezSerie=0; kronenMachtId=''; kronenMachtUntil=0; kronenZielklinge=0;
  toasts=[]; banner=null;
  tutStep=0; tutT=0; tutorialCircleUntil=0; tutorialBladeUntil=0; unlockFx=0; combatResumeUntil=0; combatResumeStep=''; setzeHelfer();
  if(metaLevel('startimpuls')>0) skillPoints=1;
  // Tages-Twist „Fliegender Start": zwei zusätzliche Punkte, wie beim Startimpuls
  // außerhalb der regulären Ökonomie — ein guter Tag darf mächtig beginnen.
  if(laufVorgabe&&laufVorgabe.twist&&laufVorgabe.twist.id==='start') skillPoints+=2;
  // Startpunkte sofort in die Kette schieben; nur Weichen bleiben offen.
  if(skillPoints>0) autoFreischalten();
  /* Messlauf-Einstieg (nur mit ?perf=1): direkt in die fragliche Welle springen und
     Orbitpunkte mitgeben, damit ein realistischer Build gebaut werden kann. Ohne das
     wäre Welle 26 nur mit einem 20-Minuten-Lauf erreichbar und damit nicht wiederholbar. */
  if(PERF_WAVE>1) wave=PERF_WAVE;
  if(PERF_PTS>0){ const p=Math.min(PERF_PTS, REGULAR_POINT_CAP); skillPoints+=p; regularPointsEarned+=p; }
  sparmodusNeuerLauf();
  shake=0; state='playing'; setMusicLevel(); hideAll(); updateTreeButton(); renderOrbitauftrag(); updateHUD(true); startWave();
  // Beim allerersten Spiel übernimmt der Einstieg die Ansage
  if(save.tutorialDone) announce('Welle 1', 'Überlebe die Arena', '#7cc8ff');
}
function hideAll(){
  overlayStart.classList.add('hidden'); overlayPause.classList.add('hidden');
  overlayOver.classList.add('hidden');
  document.getElementById('overlay-hangar').classList.add('hidden');
  overlayAuslese.classList.add('hidden');
  if(combatResume) combatResume.classList.add('hidden');
}
function startWave(){
  const d=curDiff();
  waehleWellenEreignis();   // jede vierte reguläre Welle trägt ein Ereignis — Abwechslung ohne neues System
  const ereignisCount=(laufEreignis&&laufEreignis.countMult)||1;
  const count=Math.max(3, Math.floor((CONFIG.wave.baseCount + wave*CONFIG.wave.perWave)*d.enemyCount*hilfe().gegner*ereignisCount));
  waveEnemiesToSpawn = (wave%5===0)? 1 : count;
  waveSpawned=0; spawnTimer=0;
  waveText.textContent='Welle '+wave+(laufEreignis?' · '+laufEreignis.kurz:'');
  if(wave%5===0) spawnBoss();                                  // Boss-Welle (mit eigener Ansage)
  else if(laufEreignis){
    announce(laufEreignis.name, laufEreignis.text, laufEreignis.accent);
    if(laufEreignis.schatz) streueMeteorschatz();
  }
  // Nur noch beim Zonenwechsel eine Ansage: 29 Wellenbanner je Lauf waren 13,4 % der
  // Laufzeit. Die Wellennummer steht ohnehin dauerhaft im HUD (waveText).
  else if(wave>1 && (wave-1)%5===0){ const b=biomeForWave(); announce(b.name, '', b.accent); }
  recordBest();
  checkMilestones();   // Erreichen der Welle genügt — Freischaltungen sollen ankommen
  pruefeAuslese();     // alle drei Wellen ein Kartenstopp, unabhängig vom Orbitpfad
  // Absicherung: faellt eine Weiche mit einer Wellen-Auslese zusammen, wird sie
  // dort nicht geoeffnet. Beim naechsten Wellenstart wird sie nachgeholt.
  if(state==='playing' && skillPoints>0) oeffneWeichenAuslese();
}
// Ist dies der Kampf, der den Lauf gewinnt?
function istFinale(){ return wave>=CONFIG.siegWelle && !endlosLauf; }
function spawnBoss(){
  const finale=istFinale();
  const k=bossKindFor(wave);
  const e=makeEnemy('boss');
  e.kind=k.id; e.color=k.color; e.rgb=k.rgb; e.leit=k.leit;   // Variante prägt Aussehen und Verhalten
  // Prüfstufe „Zäher Kern" multipliziert zuerst auf die Basiswerte; der Finalbonus
  // ×2.2 kommt danach obendrauf, damit sich beide Faktoren multiplizieren statt ersetzen.
  const pruefHp=hilfe().bossHp||1;
  if(pruefHp!==1) e.hp=e.maxHp=Math.round(e.maxHp*pruefHp);
  if(finale){
    /* Der Zerbrochene Mond — der Kampf, der das Spiel gewinnbar macht. Ohne einen
       solchen Punkt lief das Spiel endlos weiter, ohne Sieg und ohne Abspann; damit
       fehlte der Moment, auf den ein ganzer Lauf zuläuft. */
    e.finale=true;
    e.hp=e.maxHp=Math.round(e.maxHp*2.2);
    e.color='#ffd257'; e.rgb='255,210,87';
    announce('Der Zerbrochene Mond', 'Besiege ihn und du hast gewonnen', '#ffd257');
  } else {
    announce(k.name, k.tip, k.color);            // Name statt nur „Boss!" — jede Variante ist erkennbar
  }
  enemies.push(e); waveSpawned=1;
  bossActive=true; bossHitClean=true;
  if(treeFlags.kernreserve){
    fokusVoll('kernreserve');
    spawnParticles(player.x,player.y,'#ffd257',10); updateHUD(true);
  }
  if(begleiterStufe()>=5){
    helferOverdriveUntil=Date.now()+10000;
    const hf=helfer[0]; if(hf) pushFloat(hf.x||player.x,(hf.y||player.y)-24,'ÜBERLADUNG','#ffd257',1.25);
  }
  if(sfx) sfx('boss');
}
// Boss-Fähigkeiten: je später die Welle, desto mehr Repertoire
function bossAbilitiesEnabled(wave, leit){
  const list=['shock'];
  if(wave>=10) list.push('minions');
  if(wave>=15) list.push('ram');
  if(wave>=20) list.push('spiral');
  // Die Leitfähigkeit der Variante ist immer erlaubt — sonst wäre ein „Rammbock",
  // der nicht rammen darf, sinnlos.
  if(leit && !list.includes(leit)) list.push(leit);
  // Die Exklusivmechanik der Variante kennt nur sie selbst.
  const ex=(BOSS_KINDS.find(k=>k.leit===leit)||{}).exklusiv;
  if(ex && !list.includes(ex)) list.push(ex);
  return list;
}
function pickBossAbility(wave, leit){
  const erlaubt=bossAbilitiesEnabled(wave, leit);
  // Die Leitfähigkeit der Variante kommt doppelt so oft — dadurch fühlt sich jeder
  // Boss-Typ im Kampf anders an, nicht nur optisch.
  /* Gemessen: Ohne eigene Gewichtung kam der Spiegelschild bei Welle 25 nur in 17 %
     der Angriffe, der generische Schockring in 33 % — die Signatur des Bosses war
     seltener als die Allerweltsattacke. Die Exklusivmechanik traegt jetzt den
     Charakter (rund 37 %), die Leitfaehigkeit steht dahinter. */
  const gewichtet=[...erlaubt];
  const ex=(BOSS_KINDS.find(k=>k.leit===leit)||{}).exklusiv;
  if(ex && erlaubt.includes(ex)){
    gewichtet.push(ex, ex);
    if(leit && erlaubt.includes(leit)) gewichtet.push(leit);
  } else if(leit && erlaubt.includes(leit)) gewichtet.push(leit, leit);
  const list=gewichtet.filter(a=>a!==lastBossAbility);
  const a=list[Math.floor(laufRnd()*list.length)] || leit || 'shock';
  lastBossAbility=a;
  return a;
}
function fireBossAbility(en){
  const a=en.ability;
  if(a==='shock'){
    en.shockFx=1;
    const dist=Math.hypot(player.x-en.x, player.y-en.y);
    if(dist>CONFIG.boss.shockInner && dist<CONFIG.boss.shockOuter){ if(hurtPlayer(20)) return true; }   // im Gefahrenband? -> Treffer
    spawnParticles(en.x,en.y,'#c77dff',16); shake=Math.max(shake,9);
    if(sfx) sfx('shock');
  } else if(a==='minions'){
    const n = wave<10 ? 1 : (wave<20 ? 2 : 3);   // späte Wellen rufen mehr Verstärkung
    for(let k=0;k<n;k++){
      const ang=Math.random()*Math.PI*2;
      const e=makeEnemy('drohne');
      e.x=en.x+Math.cos(ang)*(en.radius+24);
      e.y=en.y+Math.sin(ang)*(en.radius+24);
      e.bossMinion=true;
      enemies.push(e);
    }
    spawnParticles(en.x,en.y,'#ff8a3d',18); announce('Verstärkung!','Der Boss ruft Hilfe','#ff8a3d');
    if(sfx) sfx('boss');
  } else if(a==='ram'){
    en.ramDir=Math.atan2(player.y-en.y, player.x-en.x);
    en.ramT=CONFIG.boss.ramMs;
  } else if(a==='spiral'){
    const base=Math.atan2(player.y-en.y, player.x-en.x);
    for(let k=0;k<8;k++){
      const ang=base+k*Math.PI/4;
      shots.push({x:en.x+Math.cos(ang)*en.radius, y:en.y+Math.sin(ang)*en.radius,
        vx:Math.cos(ang)*CONFIG.shots.speed*0.8, vy:Math.sin(ang)*CONFIG.shots.speed*0.8,
        dmg:Math.round(en.dmg*0.6), color:'#c77dff', r:CONFIG.shots.radius, life:CONFIG.shots.life});
    }
    if(sfx) sfx('laserEnemy');
  } else if(a==='schild'){
    // Spiegelschild: reine Verdrängung. Es gibt keine zentrale Schadensfunktion und
    // damit keinen echten Schadensblock — die Zeit bis zum Umrunden ist der Raumhebel.
    en.schildT=en.phase2?4000:3000;
    en.schildDir=Math.atan2(player.y-en.y, player.x-en.x);
    en.schildHitCd=0;
  } else if(a==='brut'){
    // Brutknoten: als echte Gegner in enemies eingetragen, damit die Klinge sie ohne
    // Sonderweg trifft. Winkel kamen schon in der Warnphase fest (en.brutTargets),
    // hier nur noch die konkreten Positionen daraus ableiten.
    // Aufgefüllt statt addiert: Ignoriert ein Spieler ältere Knoten dauerhaft, würden
    // sonst mit jedem weiteren Wurf mehr Knoten liegen bleiben, als die Heilungsdeckelung
    // vorsieht — unnötiger Wildwuchs im Feld ohne zusätzlichen Nutzen für den Boss.
    const knotenMax=en.phase2?3:2;
    const vorhandene=enemies.reduce((n,o)=>n+((o.brutknoten&&o.hp>0)?1:0),0);
    const zuErzeugen=Math.max(0, knotenMax-vorhandene);
    const ziele = (en.brutTargets && en.brutTargets.length) ? en.brutTargets.slice(0,zuErzeugen)
      : Array.from({length:zuErzeugen},(_,k)=>({ang:Math.random()*Math.PI*2+k*Math.PI, dist:180}));
    for(const z of ziele){
      const e=makeEnemy('knoten');
      e.x=en.x+Math.cos(z.ang)*z.dist; e.y=en.y+Math.sin(z.ang)*z.dist;
      e.hp=e.maxHp=Math.max(1,Math.round(en.maxHp*0.12));
      e.brutknoten=true; e.bossMinion=true;
      enemies.push(e);
    }
    en.brutTargets=null;
    if(ziele.length){ spawnParticles(en.x,en.y,'#4de0a0',14); announce('Brutknoten!','Zerstöre sie oder weiche der Heilung aus','#4de0a0'); }
    if(sfx) sfx('boss');
  } else if(a==='sperre'){
    // Drehsperre: zwei (Phase 2: drei) Balken überstreichen das sichere Band. 0,9 rad/s
    // ist bewusst langsamer als das Lauftempo auf 70 px (~2,5 rad/s) — überholbar.
    // Spieltest: zusammen mit dem alten Jäger-Kiten wirkte sie zu hart, weil sie genau
    // das Nahkampfband deckt. Schaden 14→9, Dauer 3500→2600 ms; Armzahl/Länge/Drehtempo
    // bleiben ihr Charakter und sind unverändert.
    const n=en.phase2?3:2;
    const dreh=en.phase2?1.3:0.9;
    const basis=en.sperreAng!=null ? en.sperreAng : Math.atan2(player.y-en.y, player.x-en.x);
    for(let k=0;k<n;k++){
      if(bossHazards.length>=40) break;
      bossHazards.push({kind:'arm', x:en.x, y:en.y, r:130, until:2600, dmg:9, farbe:en.color,
        ang:basis+k*(Math.PI*2/n), len:130, drehen:dreh, tick:0});
    }
    en.sperreAng=null;
    spawnParticles(en.x,en.y,en.color,10); if(sfx) sfx('boss');
  }
  return false;
}
// Boss besiegt -> Etappe geschafft: Abzeichen, Freischaltung, Statistik
function onBossDefeated(){
  bossActive=false;
  hitstop(140);   // der Boss-Tod ist der größte Moment des Laufs — kurz stehen lassen
  bossHazards=[];   // sonst blieben Brandspuren nach dem Kampf sichtbar liegen
  // Übrige Brutknoten überleben ihren Boss nicht — sonst stünde eine sinnlose Heilquelle
  // weiter im Feld. hp=0 statt Splice: die aufrufende Sweep-Schleife entfernt tote
  // Gegner ohnehin gleich selbst und mutiert dabei nicht die gerade laufende Indizierung.
  for(const e of enemies) if(e.brutknoten) e.hp=0;
  save.bossKills=(save.bossKills||0)+1;
  // Boss-Sauberkeit bleibt bewusst an echten Lebensschaden gebunden (siehe hurtPlayer).
  if(bossHitClean) orbitFortschritt('boss_makellos');
  if(istFinale()){
    // Boss-XP gehört noch zum regulären Lauf, bevor der Abschlussbildschirm einfriert.
    checkLevelUp(); persist(); sieg(); return;
  }
  if(bossHitClean) earnBadge('makellos');
  if((save.bossKills||0)>=10) earnBadge('meister');
  // Volle Heilung als Etappenbelohnung — behebt "Boss geschafft, dann sofort gestorben"
  if(player.hp < player.maxHp){
    player.hp = player.maxHp; updateHUD();
    announce('Vollständig geheilt', 'Etappe geschafft', '#4de0a0');
    if(sfx) sfx('heal');
  }   // Ausdauer über alle Läufe hinweg
  if(endlosLauf && wave===35) grantEchoMilestone(2);
  if(endlosLauf && wave===40) grantEchoMilestone(3);
  persist();   // Freischaltungen hängen an der erreichten Welle (checkMilestones), nicht am Boss
}
function recordBest(){
  if(messlauf) return;                           // ein gesprungener Lauf ist keine Leistung
  const id=hilfeId();
  if(!save.best || typeof save.best!=='object') save.best={};
  if(wave>(save.best[id]||0)){ save.best[id]=wave; persist(); }
}
// Höchste je erreichte Welle über alle Stufen — für Freischaltungen und Menü-Sichtbarkeit,
// denn Hilfen sollen nichts sperren.
function bestGesamt(){
  if(!save.best || typeof save.best!=='object') return 0;
  return Math.max(0, ...Object.keys(save.best).map(k=>save.best[k]|0));
}
function makeEnemy(type){
  const t=CONFIG.enemyTypes[type];
  const scale=1+ (wave-1)*CONFIG.wave.hpScale;
  const dScale=1+ (wave-1)*CONFIG.wave.dmgScale;
  const diff=curDiff();
  const w=canvas.clientWidth||window.innerWidth,h=canvas.clientHeight||window.innerHeight;
  const spawnDist=Math.hypot(w,h)/2/weltZoom + 60;
  const ang=laufRnd()*Math.PI*2;
  const x=player.x+Math.cos(ang)*spawnDist, y=player.y+Math.sin(ang)*spawnDist;
  // Leben nach Schwierigkeit: Bosse bekommen einen eigenen, stärkeren Nachlass
  const hpMult = (type==='boss' ? (diff.bossHp!==undefined?diff.bossHp:1) : (diff.enemyHp!==undefined?diff.enemyHp:1));
  let hp = Math.max(1, Math.round(t.hp*scale*hpMult));
  // Bosse zusätzlich verlangsamt UND hart gedeckelt: der Spieler muss dem Gefahrenband
  // in JEDER Welle entkommen können. Die Bedrohung kommt aus den Fähigkeiten (Ramme,
  // Minions, Spiralen), nicht aus reinem Hinterherlaufen.
  let spd = t.speed*diff.enemySpeed*(type==='boss' ? (diff.bossSpeed!==undefined?diff.bossSpeed:1) : 1);
  if(type==='boss') spd = Math.min(spd, CONFIG.playerBaseSpeed*0.6);
  // Ereigniswellen verändern nur normale Gegner — Bosse behalten ihre geprüfte Härte.
  if(type!=='boss'&&laufEreignis){
    if(laufEreignis.hpMult) hp=Math.max(1,Math.round(hp*laufEreignis.hpMult));
    if(laufEreignis.speedMult) spd*=laufEreignis.speedMult;
  }
  return { type, x,y, hp, maxHp:hp, dmg:Math.round(t.dmg*dScale*diff.enemyDmg), speed:spd, radius:t.radius, color:t.color, panzer:!!t.panzer, hitCd:0, bossTimer:0, shootRange:t.shootRange||0, chargeT:0, shootCd:0, jagdPhase:'an', bossPhase:'', ability:'', ramT:0, ramRecoverT:0, shockFx:0, warnT:0,
           phase2:false, phaseT:0, hpDavor:0, schildT:0, schildDir:0, schildHitCd:0, brandTick:0 };
}
function randomEnemyType(){
  const d=curDiff();
  // Distanz-/Exploder-Gegner: erst ab späteren Wellen, in frühen Wellen seltener,
  // in späten häufiger — die Schwierigkeitskurve steuert das über enemyCount.
  const exotic = d.enemyCount>=1.2 ? 0.28 : (d.enemyCount<=0.8 ? 0.10 : 0.18);
  // Panzer erscheinen ab der eingestellten Welle — auf „Meister" deutlich früher.
  // Sie sind der Grund, warum Positionieren spät im Lauf wieder zählt.
  // Tages-Regel und Bleiregen-Ereignis verschieben Welle und Häufigkeit nach oben.
  const panzerAb = (laufVorgabe&&laufVorgabe.regel&&laufVorgabe.regel.panzer&&laufVorgabe.regel.panzer.ab)
    || (laufEreignis&&laufEreignis.panzerAb) || hilfe().panzerAb || CONFIG.panzerAbWelle;
  const panzerChance = (laufEreignis&&laufEreignis.panzerChance)
    || (laufVorgabe&&laufVorgabe.regel&&laufVorgabe.regel.panzer&&laufVorgabe.regel.panzer.chance) || 0.22;
  // Die Gewichte werden nacheinander vom selben Zufallsraum abgezogen. Vorher
  // blockierte „Panzer" alle kleineren Schwellen: Exploder erschienen ab Welle 12
  // gar nicht mehr und Jäger fast nie.
  let r=laufRnd();
  if(wave>=panzerAb){ if(r<panzerChance) return 'panzer'; r-=panzerChance; }
  const exploderChance=wave>=8 ? exotic*0.45 : 0;
  if(r<exploderChance) return 'exploder'; r-=exploderChance;
  const jaegerChance=wave>=6 ? exotic : 0;
  if(r<jaegerChance) return 'jaeger';
  r=laufRnd();
  if(wave<3) return r<0.75? 'drohne':'soldat';   // frühe Wellen: nur leichte Gegner
  if(r<0.40) return 'drohne';
  if(r<0.68) return 'soldat';
  return 'schwer';
}

// Input
let moveVec={x:0,y:0}, joystickTouchId=null;
let keys={};

/* Unsichtbarer Joystick
   Irgendwo auf dem Bildschirm aufsetzen und ziehen — keine Anzeige, keine feste Zone.
   Der Ursprung wandert mit, sobald man über den Vollausschlag hinauszieht. Ohne das
   fühlt sich Zurückziehen "tot" an, weil die Richtung erst nach dem Rückweg reagiert. */
let stickOrigin=null;   // {x,y} Bildschirmkoordinate, an der der Finger aufsetzte

function setJoystick(vx,vy){
  moveVec.x=vx; moveVec.y=vy;
  if(vx||vy) player.face=Math.atan2(vy,vx);
}
// Ignorieren, wenn der Griff auf einem Bedienelement landet
function onControl(t){ return t && t.closest && t.closest('button,#special-zone,#hud-right,.overlay'); }

function stickMoveTo(cx,cy){
  if(!stickOrigin) return;
  const S=CONFIG.stick;
  let dx=cx-stickOrigin.x, dy=cy-stickOrigin.y;
  const len=Math.hypot(dx,dy);
  if(len<=S.deadZone){ setJoystick(0,0); return; }     // Totzone: ruhiger Finger = Stillstand
  if(state==='countdown') skipCombatResume();
  if(len>S.maxRadius){
    if(S.followEdge){                                   // Ursprung nachziehen (Kernfix)
      stickOrigin.x=cx-dx/len*S.maxRadius;
      stickOrigin.y=cy-dy/len*S.maxRadius;
    }
    setJoystick(dx/len, dy/len);                        // Vollausschlag
    return;
  }
  // zwischen Totzone und Vollausschlag sauber auf 0..1 abbilden
  const f=(len-S.deadZone)/(S.maxRadius-S.deadZone);
  setJoystick(dx/len*f, dy/len*f);
}
function stickStart(cx,cy){ stickOrigin={x:cx,y:cy}; setJoystick(0,0); }
function stickEnd(){ stickOrigin=null; joystickTouchId=null; setJoystick(0,0); }

function handleJoystickTouch(e){
  if(state!=='playing'&&state!=='countdown'){ stickEnd(); return; }
  if(e.type==='touchstart'){
    if(joystickTouchId!==null) return;                  // schon ein Finger am Steuern
    const t=e.changedTouches[0];
    if(!t || onControl(e.target)) return;               // Knöpfe bleiben Knöpfe
    e.preventDefault();
    joystickTouchId=t.identifier; stickStart(t.clientX,t.clientY);
    return;
  }
  if(joystickTouchId===null) return;
  let found=null;
  for(const t of e.touches) if(t.identifier===joystickTouchId) found=t;
  if(e.type==='touchmove'){
    if(found){ e.preventDefault(); stickMoveTo(found.clientX,found.clientY); }
    return;
  }
  // touchend / touchcancel
  for(const t of e.changedTouches) if(t.identifier===joystickTouchId) stickEnd();
}
joystickZone.addEventListener('touchstart',handleJoystickTouch,{passive:false});
joystickZone.addEventListener('touchmove',handleJoystickTouch,{passive:false});
joystickZone.addEventListener('touchend',handleJoystickTouch,{passive:false});
joystickZone.addEventListener('touchcancel',handleJoystickTouch,{passive:false});
// Maus-Ersatz am PC: gleiche Mechanik, überall ziehen (WASD bleibt der Hauptweg)
let mouseDown=false;
joystickZone.addEventListener('mousedown',e=>{
  if((state!=='playing'&&state!=='countdown') || onControl(e.target)) return;
  mouseDown=true; stickStart(e.clientX,e.clientY);
});
window.addEventListener('mousemove',e=>{ if(mouseDown) stickMoveTo(e.clientX,e.clientY); });
window.addEventListener('mouseup',()=>{ if(mouseDown){ mouseDown=false; stickEnd(); } });
window.addEventListener('keydown',e=>{
  keys[e.key.toLowerCase()]=true;
  if(['w','a','s','d','arrowup','arrowdown','arrowleft','arrowright'].includes(e.key.toLowerCase())) skipCombatResume();
  if(e.key==='1') doActive(1);
  if(e.key==='Escape' && state==='playing') pauseGame();
  if(e.key==='Escape' && state==='paused') resumeGame();
});
window.addEventListener('keyup',e=> keys[e.key.toLowerCase()]=false);
canvas.addEventListener('touchstart',e=>{
  // prevent scroll, but allow buttons: only prevent if not on button
  if(e.target.closest('button')) return;
  e.preventDefault();
},{passive:false});

// Orbitauftrag: dieselbe vollständige Karte zwischen den Läufen, im Kampf nur die Kurzzeile.
function orbitKartenHtml(mitTausch=false){
  const auftrag=save.orbitauftrag, def=orbitDef(auftrag);
  if(!def) return '';
  const fertig=auftrag.status==='erledigt', wert=Math.max(0,Math.min(def.ziel,auftrag.wert));
  const figurLabel=orbitFigurLabel(def), prozent=Math.round(wert/def.ziel*100);
  const heute=lokalerTag(), getauscht=save.orbitauftragTauschTag===heute;
  return '<span class="orbitauftrag-label">Orbitauftrag</span><div class="orbitauftrag-kopf"><b>'+(fertig?'✓ ':'')+def.titel+'</b><span>'+wert+' / '+def.ziel+'</span></div>'+
    (figurLabel?'<span class="orbitauftrag-figur">'+figurLabel+'</span>':'')+
    '<p>'+def.text+'</p><div class="orbitauftrag-leiste"><i style="width:'+prozent+'%"></i></div><div class="orbitauftrag-fuss"><span>'+(fertig?'Lohn erhalten: ':'Lohn: ')+def.lohn+' ◆</span>'+
    (mitTausch?'<button class="orbitauftrag-tausch" '+(getauscht?'disabled':'')+'>'+ (getauscht?'Heute getauscht':'Kostenlos tauschen')+'</button>':'')+'</div>';
}
function renderOrbitauftrag(){
  const auftrag=save.orbitauftrag, def=orbitDef(auftrag), fertig=!!(auftrag&&auftrag.status==='erledigt');
  const start=document.getElementById('start-orbitauftrag');
  if(start){ start.classList.toggle('erledigt',fertig); start.innerHTML=orbitKartenHtml(true); const b=start.querySelector('.orbitauftrag-tausch'); if(b) b.onclick=tauscheOrbitauftrag; }
  for(const id of ['pause-orbitauftrag','gameover-orbitauftrag','sieg-orbitauftrag']){
    const box=document.getElementById(id); if(!box) continue;
    box.classList.toggle('erledigt',fertig); box.innerHTML=orbitKartenHtml(false);
  }
  const hud=document.getElementById('hud-orbitauftrag');
  if(!hud) return;
  hud.classList.toggle('hidden',!def||fertig||state!=='playing');
  hud.textContent=def&&!fertig?'Auftrag: '+def.kurz+' '+auftrag.wert+'/'+def.ziel:'';
}
function pauseGame(){ if(state!=='playing') return; state='paused'; setMusicLevel(); updateTreeButton(); refreshMenuVisibility(); renderOrbitauftrag(); overlayPause.classList.remove('hidden'); }
function resumeGame(){ if(state!=='paused') return; state='playing'; setMusicLevel(); overlayPause.classList.add('hidden'); lastTime=performance.now(); updateTreeButton(); renderOrbitauftrag(); }
document.getElementById('pause-btn').addEventListener('click',pauseGame);
document.getElementById('resume-btn').addEventListener('click',resumeGame);
/* Lauf aufgeben — nach Genre-Konvention (Vampire Survivors, Hades, Brotato):
   Die Beschriftung nennt die Folge statt des Ziels, es wird einmal nachgefragt, und
   das Gesammelte bleibt erhalten. Bestraft man das Aufgeben, geben Spieler nicht auf,
   sondern lassen sich absichtlich töten — das ist für alle schlechter.
   Die Rückfrage kommt nur, wenn wirklich etwas auf dem Spiel steht. */
function laufBeenden(){
  tagesAbschluss();        // auch ein freiwilliges Ende zählt für den Tageslauf
  beendeTageslaufVorgabe();
  bucheFragmente();
  state='menu'; setMusicLevel();
  updateTreeButton();
  hideAll();
  document.getElementById('overlay-abbruch').classList.add('hidden');
  sorgeOrbitauftrag(); renderOrbitauftrag();
  refreshMenuVisibility();
  overlayStart.classList.remove('hidden');
}
function frageAbbruch(){
  if(wave<3 && player.stars<=0){ laufBeenden(); return; }   // nichts zu verlieren
  document.getElementById('abbruch-text').innerHTML =
    `Du bist in <b>Welle ${wave}</b>.` +
    (player.stars>0? ` Deine <b style="color:var(--gold)">${player.stars} ◆</b> werden gutgeschrieben.`
                   : ' Der Fortschritt dieses Laufs geht verloren.');
  overlayPause.classList.add('hidden');
  document.getElementById('overlay-abbruch').classList.remove('hidden');
}
function abbruchZurueck(){
  document.getElementById('overlay-abbruch').classList.add('hidden');
  overlayPause.classList.remove('hidden');
}
document.getElementById('beenden-btn').addEventListener('click', frageAbbruch);
document.getElementById('abbruch-ja').addEventListener('click', laufBeenden);
document.getElementById('abbruch-nein').addEventListener('click', abbruchZurueck);
// Codex: Lauf-Build nur ansehen; aktive Mächte werden ausschließlich vor dem Lauf gewählt.
function openCodex(){
  renderCodex();
  overlayPause.classList.add('hidden');
  document.getElementById('overlay-codex').classList.remove('hidden');
}
function closeCodex(){
  document.getElementById('overlay-codex').classList.add('hidden');
  overlayPause.classList.remove('hidden');
}
function openPick(art, slotNr){
  const liste=document.getElementById('pick-liste'), titel=document.getElementById('pick-titel');
  const hinweis=document.getElementById('pick-hinweis');
  liste.innerHTML=''; titel.textContent='Slot '+slotNr+' belegen';
  hinweis.textContent='Mit dieser Macht startest du künftig jeden Lauf.';
  const vw=startMaechte(), belegt=slotNr===1?vw.slot2:vw.slot1;
  for(const id of ACTIVE_IDS.filter(id=>abilUnlocked(id))){
    const a=ABILITIES[id], gesperrt=id===belegt, b=document.createElement('button');
    b.className='pick-karte'+(gesperrt?' locked':'');
    b.innerHTML=`${svg(abilIcon(id))}<div class="pick-info"><h3>${a.name}</h3><p>${a.desc}</p>
      <div class="pick-lv">Startet auf Stufe 1</div></div>${gesperrt?'<span class="slot-badge">im anderen Slot</span>':''}`;
    if(!gesperrt) b.onclick=()=>waehlePick(slotNr,id);
    liste.appendChild(b);
  }
  document.getElementById('overlay-startmaechte').classList.add('hidden');
  document.getElementById('overlay-pick').classList.remove('hidden');
}
function waehlePick(slotNr,id){
  const vw=startMaechte(); if(slotNr===1) vw.slot1=id; else vw.slot2=id;
  startMaechte(); persist(); if(sfx) sfx('pick'); schliessePick();
}
function schliessePick(){
  document.getElementById('overlay-pick').classList.add('hidden');
  renderStartMaechte(); document.getElementById('overlay-startmaechte').classList.remove('hidden');
}
// Die echte Freischalt-Welle steht in MILESTONES — ABILITIES.unlock war veraltet
// und zeigte teils falsche Zahlen an.
function unlockWave(id){
  const m=MILESTONES.find(x=>x.unlocks && x.unlocks.some(u=>u.kind==='ability'&&u.id===id));
  return m? m.wave : null;
}
function unlockText(id){
  const w=unlockWave(id);
  return w? `Freischaltung: Welle ${w}` : 'Noch nicht verfügbar';
}
function renderCodex(){
  // Aktive Slots als anklickbare Kacheln
  const slotBox=document.getElementById('codex-slots');
  slotBox.innerHTML='';
  for(const n of [1]){
    const id=n===1?activeSlot1:activeSlot2;
    const kachel=document.createElement('button');
    const a=ABILITIES[id]; if(!a) continue;
    const lv=runAbilities[id]||1, evo=evolvedOf(id);
    kachel.className='slot-kachel'+(evo?' is-evo':'');
    kachel.innerHTML=`<span class="slot-nr">Hauptmacht</span>${svg(abilIcon(id))}
      <span class="slot-name">${evo? EVOLUTIONS[evo].name : a.name}</span>
      <span class="slot-sub">${evo? 'Entwickelt' : 'Stufe '+lv+' von '+MAX_ABIL_LEVEL}</span>
      ${pipsHTML(lv)}
      ${evo? '' : '<span class="slot-next">'+naechsteStufeText(id, lv)+'</span>'}`;
    // Im Lauf nicht mehr tauschbar — die Wahl fällt vor dem Start unter „Startmächte".
    // Die Kachel bleibt als Anzeige (Stufe, Entwicklung, nächster Schritt) erhalten.
    kachel.classList.add('nurAnzeige');
    slotBox.appendChild(kachel);
  }
  // Genau eine Partnerfähigkeit gehört zur Hauptmacht. Kein Slot-Management und
  // keine Liste irrelevanter Passives: Der Codex zeigt nur, was dieser Lauf nutzt.
  const pSlots=document.getElementById('codex-passivslots');
  const pHint=document.getElementById('passiv-hinweis');
  if(pSlots){
    pSlots.innerHTML='';
    const pair=Object.entries(EVOLUTIONS).find(([,e])=>e.base===activeSlot1), partner=pair[1].req;
    const lv=runAbilities[partner]||0, kachel=document.createElement('div');
    kachel.className='slot-kachel'+(lv?'':' leer');
    kachel.innerHTML=`<span class="slot-nr">Partner</span>${svg(abilIcon(partner))}<span class="slot-name">${ABILITIES[partner].name}</span>
      <span class="slot-sub">${lv?'Rang '+lv+' von 3':'Im Lauf noch nicht freigeschaltet'}</span>${pipsHTML(lv)}`;
    pSlots.appendChild(kachel);
    if(pHint) pHint.textContent='Dieser Partner gehört fest zu '+ABILITIES[activeSlot1].name+' und entwickelt sich im Lauf von selbst.';
  }
  // Nur die eine relevante Super-Macht zeigen.
  const evoBox=document.getElementById('codex-evo');
  if(evoBox){
    evoBox.innerHTML='';
    const pair=Object.entries(EVOLUTIONS).find(([,e])=>e.base===activeSlot1), evoId=pair[0], e=pair[1], fertig=runEvolutions[e.base]===evoId;
    const row=document.createElement('div'); row.className='codex-row'+(fertig?' is-evo':' locked');
    row.innerHTML=`${svg(abilIcon(e.base))}<div class="info"><h3>${e.name}</h3><div class="desc">${e.desc}</div>
      <div class="lv">Im Lauf nach Machtmeisterschaft und ${ABILITIES[e.req].name}</div></div><span class="slot-badge ${fertig?'in':''}">${fertig?'Aktiv':'Ziel'}</span>`;
    evoBox.appendChild(row);
  }
}
document.getElementById('codex-btn').addEventListener('click',()=>openCodex('pause'));
document.getElementById('codex-back').addEventListener('click',closeCodex);
document.getElementById('pick-back').addEventListener('click',schliessePick);
// Info-Bildschirm: erreichbar aus Start- und Pausenmenü, merkt sich den Rückweg
let infoReturn='start';
function openInfo(from){
  infoReturn=from||'start';
  overlayStart.classList.add('hidden'); overlayPause.classList.add('hidden');
  document.getElementById('overlay-info').classList.remove('hidden');
}
function closeInfo(){
  document.getElementById('overlay-info').classList.add('hidden');
  (infoReturn==='pause'? overlayPause : overlayStart).classList.remove('hidden');
}
/* STARTMÄCHTE. Bis hierher begann jeder Lauf zwangsweise mit Wirbel (und Schock im
   zweiten Slot) — später freigeschaltete Mächte wie Bombe oder Nova standen nie am
   Start, was ihre Freischaltung entwertete. Die Wahl hier gilt dauerhaft, bis sie
   jemand ändert; passive Mächte bleiben bewusst außen vor, sie sind der Aufbau IM Lauf. */
// Charakterwahl: zeigt Werteschnitt und Besonderheit, damit die Wahl beurteilbar ist
function renderCharakterWahl(){
  const box=document.getElementById('charakter-wahl');
  if(!box) return;
  box.innerHTML='';
  for(const id in FIGUREN){
    const f=FIGUREN[id], frei=isAvailable('figur',id);
    const b=document.createElement('button');
    b.className='wahl-karte'+(save.figur===id?' an':'')+(frei?'':' locked');
    const proz=v=>(v>1?'+':'')+Math.round((v-1)*100)+' %';
    b.innerHTML=`<div class="wahl-kopf"><h3>${f.name}</h3>
        ${frei? (save.figur===id?'<span class="wahl-marke">gewählt</span>':'') : '<span class="wahl-marke aus">'+(isEarned('figur',id)?'◆ Werkstatt':'🔒 Blaupause Welle '+(skinReqWave(id,'figur')||'?'))+'</span>'}</div>
      <p class="wahl-fuer">${f.desc}</p>`;
    const farbe=currentSkin();
    const portrait=vorschauLeinwand(76,64,g=>{
      g.translate(0,5); g.scale(1.12,1.12);
      const c1=frei?farbe.blade:'#63708a', c2=frei?farbe.core:'#9aa6bb';
      if(id==='konstrukt') zeichneLeerenklingeNeu(g,0,c1,c2);
      else zeichneLichthueterNeu(g,false,0,0,c1);
    });
    portrait.className='wahl-portrait';
    b.prepend(portrait);
    if(frei) b.onclick=()=>{ save.figur=id; passeOrbitauftragAnFigurwahl(); persist(); renderOrbitauftrag(); if(sfx) sfx('pick'); renderCharakterWahl(); };
    box.appendChild(b);
  }
  const d=document.getElementById('charakter-detail'), f=figur();
  if(d) d.innerHTML=`<h3>${f.name}</h3><p class="wahl-staerke">${f.staerke}</p><p class="wahl-fuer">${f.fuer}</p><div class="wahl-werte"><span>Leben ${Math.round(f.hp*100)} %</span><span>Tempo ${Math.round(f.tempo*100)} %</span><span>Reichweite ${Math.round(f.reichweite*100)} %</span></div>`;
}
// Hilfsstufe: dieselben Schalter, drei Voreinstellungen — plus freigeschaltete
// Prüfstufen und ein Ausblick auf die nächste noch gesperrte Stufe.
function renderHilfeWahl(){
  const box=document.getElementById('hilfe-wahl');
  if(!box) return;
  box.innerHTML='';
  for(const id of HILF_IDS){
    const h=HILFEN[id];
    const b=document.createElement('button');
    b.className='wahl-karte'+(hilfeId()===id?' an':'');
    const best=bestFuer(id);
    b.innerHTML=`<div class="wahl-kopf"><h3>${h.name}</h3>
        ${hilfeId()===id?'<span class="wahl-marke">gewählt</span>':''}</div>
      <p class="wahl-fuer">${h.desc}</p>
      <div class="wahl-werte">
        <span>Schaden an dir ${Math.round(h.schaden*100)} %</span>
        <span>Gegner ${Math.round(h.gegner*100)} %</span>
        ${h.wiederauf? '<span>Einmal wieder aufstehen</span>':''}
      </div>
      <div class="wahl-best">Bestmarke: ${best? 'Welle '+best : 'noch keine'}</div>`;
    b.onclick=()=>{ save.hilfe=id; persist(); if(sfx) sfx('pick'); renderHilfeWahl(); };
    box.appendChild(b);
  }
  // Freigeschaltete Prüfstufen: gleiches Kartenformat, aber mit den GESTAPELTEN
  // Bedingungen bis zur jeweiligen Stufe — sonst kann niemand einschätzen, worauf
  // er sich einlässt (Stufe 3 bedeutet z. B. auch schon Dichte und Härte).
  const frei=save.pruefFrei||0;
  for(let n=1; n<=Math.min(frei,PRUEFSTUFEN.length); n++){
    const p=PRUEFSTUFEN[n-1], id=p.id, best=bestFuer(id);
    const bedingungen=PRUEFSTUFEN.slice(0,n).map(x=>x.desc).join('<br>');
    const b=document.createElement('button');
    b.className='wahl-karte pruef'+(hilfeId()===id?' an':'');
    b.innerHTML=`<div class="wahl-kopf"><h3>${p.name} · ${p.kurz}</h3>
        ${hilfeId()===id?'<span class="wahl-marke">gewählt</span>':''}</div>
      <p class="wahl-fuer">${bedingungen}</p>
      <div class="wahl-best">Bestmarke: ${best? 'Welle '+best : 'noch keine'}</div>`;
    b.onclick=()=>{ save.hilfe=id; persist(); if(sfx) sfx('pick'); renderHilfeWahl(); };
    box.appendChild(b);
  }
  // Ausblick auf die nächste gesperrte Stufe: gedämpft, nicht antippbar. Ohne diesen
  // Hinweis wüsste niemand, dass es nach Meister überhaupt weitergeht.
  /* Der Ausblick erscheint erst NACH dem ersten Sieg. Wer noch nie Welle 30 geschafft
     hat, sieht exakt die drei Voreinstellungen wie bisher — eine gesperrte achte
     Schwierigkeitskarte wäre für ihn nur Rauschen. */
  if(frei>=1 && frei<PRUEFSTUFEN.length){
    const next=PRUEFSTUFEN[frei];
    const bedingungen=PRUEFSTUFEN.slice(0,frei+1).map(x=>x.desc).join('<br>');
    const vorherige=frei===0? 'Standard oder Meister' : PRUEFSTUFEN[frei-1].name;
    const b=document.createElement('button');
    b.className='wahl-karte pruef locked'; b.disabled=true;
    b.innerHTML=`<div class="wahl-kopf"><h3>${next.name} · ${next.kurz}</h3>
        <span class="wahl-marke aus">gesperrt</span></div>
      <p class="wahl-fuer">${bedingungen}</p>
      <p class="wahl-fuer">Gewinne Welle 30 auf ${vorherige}, um sie freizuschalten.</p>`;
    box.appendChild(b);
  }
}
function renderStartMaechte(){
  renderCharakterWahl();
  renderHilfeWahl();
  const box=document.getElementById('startmaechte-slots');
  if(!box) return;
  const vw=startMaechte();
  box.innerHTML='';
  for(const n of [1]){
    const id = n===1? vw.slot1 : vw.slot2;
    const kachel=document.createElement('div');
    if(!id){
      kachel.className='slot-kachel leer';
      kachel.innerHTML=`<span class="slot-nr">Hauptmacht</span><span class="slot-name">Frei</span>
        <span class="slot-sub">Noch keine Macht verfügbar</span>`;
    } else {
      const a=ABILITIES[id];
      kachel.className='slot-kachel';
      kachel.innerHTML=`<span class="slot-nr">Hauptmacht</span>${svg(abilIcon(id))}
        <span class="slot-name">${a.name}</span>
        <span class="slot-sub">${a.desc}</span>`;
      kachel.onclick=()=>openPick('vorwahl', n);
    }
    box.appendChild(kachel);
  }
  renderOrbitPresets();
}
function renderOrbitPresets(){
  const box=document.getElementById('orbit-presets'); if(!box) return;
  box.innerHTML=''; if(!metaLevel('orbitarchiv')) return;
  if(!Array.isArray(save.presets)) save.presets=[null,null];
  for(let i=0;i<2;i++){
    const p=save.presets[i], card=document.createElement('div'); card.className='preset-card';
    const text=p?`${(FIGUREN[p.figur]||FIGUREN.held).name} · ${(ABILITIES[p.slot1]||ABILITIES.wirbel).name}${p.slot2?' + '+(ABILITIES[p.slot2]||{}).name:''}`:'Noch nicht belegt';
    card.innerHTML=`<span><b>Konfiguration ${i+1}</b><small>${text}</small></span><button class="preset-load" ${p?'':'disabled'}>Laden</button><button class="preset-save">Aktuelles Set speichern</button>`;
    card.querySelector('.preset-load').onclick=()=>{
      if(!p) return; save.figur=isAvailable('figur',p.figur)?p.figur:'held';
      passeOrbitauftragAnFigurwahl(); save.startMaechte={slot1:p.slot1,slot2:p.slot2}; startMaechte(); persist(); renderOrbitauftrag(); renderStartMaechte(); if(sfx)sfx('pick');
    };
    card.querySelector('.preset-save').onclick=()=>{
      const vw=startMaechte(); save.presets[i]={figur:save.figur,slot1:vw.slot1,slot2:vw.slot2}; persist(); renderOrbitPresets(); if(sfx)sfx('pick');
    };
    box.appendChild(card);
  }
}
let startMaechteReturn='start';
function openStartMaechte(from){
  startMaechteReturn=from||'start';
  overlayStart.classList.add('hidden');
  renderStartMaechte();
  document.getElementById('overlay-startmaechte').classList.remove('hidden');
}
function closeStartMaechte(){
  document.getElementById('overlay-startmaechte').classList.add('hidden');
  overlayStart.classList.remove('hidden');
}
document.getElementById('startmaechte-btn').addEventListener('click',()=>openStartMaechte('start'));
document.getElementById('startmaechte-back').addEventListener('click',closeStartMaechte);
function zeigeVorbereitungTab(id){
  document.querySelectorAll('[data-prepare-panel]').forEach(p=>p.classList.toggle('active',p.dataset.preparePanel===id));
  document.querySelectorAll('[data-prepare]').forEach(b=>b.classList.toggle('active',b.dataset.prepare===id));
}
document.querySelectorAll('[data-prepare]').forEach(b=>b.addEventListener('click',()=>zeigeVorbereitungTab(b.dataset.prepare)));
document.getElementById('info-btn').addEventListener('click',()=>openInfo('start'));
document.getElementById('info-btn-pause').addEventListener('click',()=>openInfo('pause'));
document.getElementById('info-back').addEventListener('click',closeInfo);

/* EINSTELLUNGEN. Bisher gab es nur den Ton-Knopf im HUD. Wer links greift, hatte die
   Fähigkeiten-Knöpfe auf der falschen Seite und verdeckte sie beim Zielen — das ist
   nichts, was man erraten sollte, also ist es jetzt einstellbar und wird gespeichert. */
const OPT_GRUPPEN=[
  { key:'seite', titel:'Seite der Fähigkeiten-Knöpfe',
    hinweis:'Leg sie auf die Hand, mit der du nicht ziehst.',
    werte:[ {v:'links', t:'Unten links'}, {v:'rechts', t:'Unten rechts'} ] },
  { key:'anordnung', titel:'Anordnung',
    hinweis:'Übereinander braucht weniger Breite und verdeckt weniger Spielfeld.',
    werte:[ {v:'nebeneinander', t:'Nebeneinander'}, {v:'uebereinander', t:'Übereinander'} ] },
];
function opts(){
  if(!save.opts || typeof save.opts!=='object') save.opts={};
  if(save.opts.seite!=='links') save.opts.seite='rechts';
  if(save.opts.anordnung!=='uebereinander') save.opts.anordnung='nebeneinander';
  return save.opts;
}
// Überträgt die Einstellungen auf die Bedienelemente. Wird beim Start und nach
// jeder Änderung aufgerufen — der Zustand liegt allein in save.opts.
function wendeBedienungAn(){
  const o=opts(), zone=document.getElementById('special-zone');
  if(!zone || !zone.classList) return;
  zone.classList.toggle('links', o.seite==='links');
  zone.classList.toggle('gestapelt', o.anordnung==='uebereinander');
}
function renderSettings(){
  const box=document.getElementById('settings-liste');
  if(!box) return;
  const o=opts();
  box.innerHTML='';
  for(const g of OPT_GRUPPEN){
    const blk=document.createElement('div'); blk.className='opt-block';
    blk.innerHTML=`<h3>${g.titel}</h3><p class="sec-hinweis">${g.hinweis}</p>`+
      `<div class="opt-reihe">`+
      g.werte.map(w=>`<button class="opt-btn ${o[g.key]===w.v?'an':''}" data-v="${w.v}">${w.t}</button>`).join('')+
      `</div>`;
    box.appendChild(blk);
    const knoepfe=blk.querySelectorAll? blk.querySelectorAll('.opt-btn') : [];
    for(const b of knoepfe){
      b.onclick=()=>{ o[g.key]=b.dataset.v; persist(); wendeBedienungAn(); renderSettings(); if(sfx) sfx('pick'); };
    }
  }
  const tonBlk=document.createElement('div'); tonBlk.className='opt-block';
  tonBlk.innerHTML=`<h3>Ton</h3><p class="sec-hinweis">Gilt für alle Geräusche im Spiel.</p>`+
    `<div class="opt-reihe">`+
    `<button class="opt-btn ${!save.muted?'an':''}" data-m="an">An</button>`+
    `<button class="opt-btn ${save.muted?'an':''}" data-m="aus">Aus</button></div>`;
  box.appendChild(tonBlk);
  const tk=tonBlk.querySelectorAll? tonBlk.querySelectorAll('.opt-btn') : [];
  for(const b of tk){
    b.onclick=()=>{ const stumm=b.dataset.m==='aus'; if(stumm!==save.muted) toggleMute(); renderSettings(); };
  }
}
let settingsReturn='start';
function openSettings(from){
  settingsReturn=from||'start';
  overlayStart.classList.add('hidden'); overlayPause.classList.add('hidden');
  renderSettings();
  document.getElementById('overlay-settings').classList.remove('hidden');
}
function closeSettings(){
  document.getElementById('overlay-settings').classList.add('hidden');
  (settingsReturn==='pause'? overlayPause : overlayStart).classList.remove('hidden');
}
document.getElementById('settings-btn').addEventListener('click',()=>openSettings('start'));
document.getElementById('settings-btn-pause').addEventListener('click',()=>openSettings('pause'));
document.getElementById('settings-back').addEventListener('click',closeSettings);
wendeBedienungAn();
/* Nach dem Tod drei getrennte Wege. Vorher hieß der einzige Knopf „Neustart", führte
   aber ins Hauptmenü — ein echter Sofort-Neustart fehlte ganz, und wer ins Hauptmenü
   wollte, fand ihn hinter der falschen Beschriftung nicht. Seit die Startmächte dort
   festgelegt werden, muss der Weg dorthin außerdem offensichtlich sein. */
function zumHauptmenue(){
  overlayOver.classList.add('hidden');
  beendeTageslaufVorgabe();
  refreshMenuVisibility();
  document.getElementById('overlay-start').classList.remove('hidden');
  state='menu'; setMusicLevel();
  updateTreeButton(); sorgeOrbitauftrag(); renderOrbitauftrag();
}
document.getElementById('restart-btn').addEventListener('click', zumHauptmenue);
document.getElementById('sieg-weiter').addEventListener('click', endlosWeiter);
document.getElementById('sieg-einfrieren').addEventListener('click',()=>startEndlosmodus(true));
document.getElementById('sieg-menue').addEventListener('click',()=>{
  document.getElementById('overlay-sieg').classList.add('hidden');
  zumHauptmenue();
});
document.getElementById('wieder-btn').addEventListener('click',()=>resetGame());
document.getElementById('start-btn').addEventListener('click',resetGame);
document.getElementById('tages-btn').addEventListener('click',startTageslauf);
renderTagessignal();
function openHangar(){
  openMetaShop('start');
}
function closeHangar(){
  document.getElementById('overlay-hangar').classList.add('hidden');
  overlayStart.classList.remove('hidden');
}
document.getElementById('hangar-btn').addEventListener('click',openHangar);
document.getElementById('hangar-back').addEventListener('click',closeHangar);
// Fortschritts-Screen (Bestmarken, Skins, Abzeichen)
function skinReqWave(id, kind){
  const k=kind||'skin';
  const m=MILESTONES.find(x=>x.unlocks && x.unlocks.some(u=>u.kind===k&&u.id===id));
  return m?m.wave:null;
}
/* Vorschau-Leinwand für Kosmetik. Sie ruft exakt dieselben Zeichenfunktionen auf wie
   das Spielfeld — was man in der Sammlung sieht, ist deshalb garantiert das, was man
   später auch bekommt, und nicht eine nachgebaute Abbildung, die auseinanderläuft. */
function vorschauLeinwand(b, h, zeichner){
  const c=document.createElement('canvas');
  if(!c.getContext) return c;
  c.width=b; c.height=h;
  c.style.width=b+'px'; c.style.height=h+'px';
  const g=c.getContext('2d');
  if(!g) return c;
  g.translate(b/2, h/2);
  zeichner(g);
  return c;
}
function renderProgress(){
  const bg=document.getElementById('best-grid'); bg.innerHTML='';
  const cells=[
    ['Beste Welle', bestFuer()],
    ['Bosse besiegt', save.bossKills||0],
    ['Fragmente', save.stars||0],
  ];
  for(const [name,val] of cells){
    const d=document.createElement('div'); d.className='best-cell';
    d.innerHTML=`<span class="best-name">${name}</span><span class="best-val">${val}</span>`;
    bg.appendChild(d);
  }
  const sg=document.getElementById('skin-grid'); sg.innerHTML='';
  for(const id in SKINS){
    const s=SKINS[id], avail=isAvailable('skin',id), earned=isEarned('skin',id);
    const cell=document.createElement('button');
    cell.className='skin-cell'+(save.skin===id?' active':'')+(avail?'':' locked');
    let lock='';
    if(!avail){ const rw=skinReqWave(id); lock = (earned && s.voll) ? 'Vollversion' : (rw?'ab Welle '+rw:'gesperrt'); }
    cell.innerHTML=`<span class="skin-dot" style="background:${s.blade}"></span><span class="skin-name">${s.name}</span>`+
      (avail?'':`<span class="lock">🔒 ${lock}</span>`);
    if(avail) cell.onclick=()=>{ save.skin=id; persist(); if(sfx) sfx('pick'); renderProgress(); };
    sg.appendChild(cell);
  }
  // Klingenformen — zweite Achse neben der Farbe, in der aktuellen Farbe vorgezeigt
  const fg=document.getElementById('form-grid');
  if(fg){
    fg.innerHTML='';
    const farbe=currentSkin();
    for(const id in FORMEN){
      const f=FORMEN[id], avail=isAvailable('form',id);
      const cell=document.createElement('button');
      cell.className='kosm-cell'+(save.klingenform===id?' active':'')+(avail?'':' locked');
      const bild=vorschauLeinwand(104, 40, g=>{
        g.translate(-46, 0);
        zeichneKlinge(g, 18, 70, f, avail? farbe.blade : '#63708a', avail? farbe.core : '#9aa6bb');
      });
      cell.appendChild(bild);
      const txt=document.createElement('div');
      const w=skinReqWave(id,'form');
      txt.innerHTML=`<span class="kosm-name">${f.name}</span>`+
        `<span class="kosm-desc">${avail? f.desc : '🔒 '+(w? 'ab Welle '+w : 'gesperrt')}</span>`;
      cell.appendChild(txt);
      if(avail) cell.onclick=()=>{ save.klingenform=id; persist(); if(sfx) sfx('pick'); renderProgress(); };
      fg.appendChild(cell);
    }
  }
  // Figuren
  const fig=document.getElementById('figur-grid');
  if(fig){
    fig.innerHTML='';
    const farbe=currentSkin();
    for(const id in FIGUREN){
      const f=FIGUREN[id], avail=isAvailable('figur',id);
      const cell=document.createElement('button');
      cell.className='kosm-cell'+(save.figur===id?' active':'')+(avail?'':' locked');
      const bild=vorschauLeinwand(72, 58, g=>{
        g.translate(0, 4);
        const c1=avail? farbe.blade : '#63708a', c2=avail? farbe.core : '#9aa6bb';
        if(id==='konstrukt') zeichneLeerenklingeNeu(g, 0, c1, c2);
        else zeichneLichthueterNeu(g, false, 0, 0, c1);
      });
      cell.appendChild(bild);
      const txt=document.createElement('div');
      const w=skinReqWave(id,'figur');
      txt.innerHTML=`<span class="kosm-name">${f.name}</span>`+
        `<span class="kosm-desc">${avail? f.desc : (isEarned('figur',id)?'◆ Projekt in der Werkstatt':'🔒 '+(w? 'Blaupause ab Welle '+w : 'gesperrt'))}</span>`;
      cell.appendChild(txt);
      if(avail) cell.onclick=()=>{ save.figur=id; passeOrbitauftragAnFigurwahl(); persist(); renderOrbitauftrag(); if(sfx) sfx('pick'); renderProgress(); };
      fig.appendChild(cell);
    }
  }
  const bag=document.getElementById('badge-grid'); bag.innerHTML='';
  for(const id in BADGES){
    const b=BADGES[id], have=!!save.badges[id];
    const cell=document.createElement('div'); cell.className='badge-cell'+(have?' have':'');
    cell.innerHTML=`<span class="badge-medal">${have?b.glyph:'·'}</span><span class="badge-name">${b.name}</span>`+
      `<span class="badge-desc">${have?b.desc:'Noch nicht erreicht'}</span>`;
    bag.appendChild(cell);
  }
}
let progressReturn='start';
function openProgress(from){
  progressReturn=from||'start'; renderProgress();
  (progressReturn==='hangar'?document.getElementById('overlay-hangar'):overlayStart).classList.add('hidden');
  document.getElementById('overlay-progress').classList.remove('hidden');
}
function closeProgress(){
  document.getElementById('overlay-progress').classList.add('hidden');
  overlayStart.classList.remove('hidden');
}
document.getElementById('progress-back').addEventListener('click',closeProgress);
function zeigeSammlungTab(id){
  document.querySelectorAll('[data-collection-panel]').forEach(p=>p.classList.toggle('active',p.dataset.collectionPanel===id));
  document.querySelectorAll('[data-collection]').forEach(b=>b.classList.toggle('active',b.dataset.collection===id));
}
document.querySelectorAll('[data-collection]').forEach(b=>b.addEventListener('click',()=>zeigeSammlungTab(b.dataset.collection)));
document.getElementById('collection-workshop-tab').addEventListener('click',()=>{
  document.getElementById('overlay-progress').classList.add('hidden'); openMetaShop('start');
});
const muteBtn=document.getElementById('mute-btn'); if(muteBtn) muteBtn.addEventListener('click',toggleMute);
updateMuteBtn();
refreshMenuVisibility();   // beim allerersten Start bleiben Meta-Shop, Sammlung und Codex verborgen

// Die Tangente zeigt in Drehrichtung der Klinge, unabhängig von Gegnerpositionen.
function fireBladePhaser(angle=swordAngle){
  const tip=player.radius+bladeLength(), dir=angle+Math.PI/2, P=CONFIG.phaser;
  pShots.push({kind:'phaser',x:player.x+Math.cos(angle)*tip,y:player.y+Math.sin(angle)*tip,
    vx:Math.cos(dir)*P.speed,vy:Math.sin(dir)*P.speed,
    dmg:Math.round(P.dmg*abilScale(runAbilities.phaser)*(1+bonuses.dmg)),
    life:P.life,hitsLeft:P.hits,moduleColor:currentSkin().blade});
}

/* Adaptive Modulmechaniken. Beide Knoten bleiben im Baum gleich, reagieren aber auf
   Hauptmacht und Klingenform. Alle Hilfen verwenden vorhandene Projektile/Felder und
   harte Obergrenzen, damit sichtbare Macht nicht in Effektlast ausartet. */
function moduleShot(x,y,a,dmg,hitsLeft=1,extra={}){
  pShots.push({x,y,vx:Math.cos(a)*460,vy:Math.sin(a)*460,dmg:Math.max(1,Math.round(dmg)),life:1.05,hitsLeft,...extra});
}
function modulePulse(x,y,r,dmg,color,stun=0){
  let hits=0;
  for(const en of enemies){
    if(Math.hypot(en.x-x,en.y-y)>r+en.radius) continue;
    en.hp-=Math.max(1,Math.round(dmg)); if(stun) en.stunT=Math.max(en.stunT||0,stun); hits++;
    spawnParticles(en.x,en.y,color,3);
  }
  particles.push({ring:true,x,y,color,life:.32,max:.32});
  return hits;
}
function armBladeModule(id){
  const rank=treeFlags.bladeModule||0, now=Date.now(); if(!rank) return;
  if(id==='wirbel'&&rank>=2){treeFlags.wirbelBladeCharges=treeRang('blade_multi')?2:1;treeFlags.wirbelBladeUntil=now+4200;}
  if(id==='bombe'&&rank>=2) treeFlags.bombPassUntil=now+4200;
  if(id==='nova'){treeFlags.novaBladeCharges=2;treeFlags.novaBladeUntil=now+4200;}
  if(id==='sog'){
    treeFlags.sogBladeCharges=treeRang('blade_multi')?2:1;treeFlags.sogBladeHits=0;
    treeFlags.sogBladeTriggered=false;treeFlags.sogBladeUntil=now+4200;
  }
}
function handleBladeModuleSweet(en,toEnemy,dmg){
  const rank=treeFlags.bladeModule||0, id=activeSlot1, now=Date.now(); if(!rank) return;
  if(id==='wirbel'){
    treeFlags.wirbelKerben=(treeFlags.wirbelKerben||0)+1;
    if(treeFlags.wirbelKerben>=4&&!(treeFlags.bladeModuleLockUntil>now)){
      treeFlags.wirbelKerben=0;treeFlags.bladeModuleLockUntil=now+280;
      const radius=treeRang('blade_multi')?110:92,zug=treeRang('blade_multi')?24:40;
      for(const o of enemies){const d=Math.hypot(o.x-en.x,o.y-en.y);if(o!==en&&d<radius&&d>1){o.x+=(en.x-o.x)/d*zug;o.y+=(en.y-o.y)/d*zug;}}
      particles.push({ring:true,x:en.x,y:en.y,color:'#ffb340',life:.28,max:.28});pushFloat(en.x,en.y-34,'WIRBELKERBE','#ffb340',1.0);
    }
    if(rank>=2&&treeFlags.wirbelBladeCharges>0&&treeFlags.wirbelBladeUntil>now){
      treeFlags.wirbelBladeCharges--;
      powerFields.push({kind:'nachlauf',x:en.x,y:en.y,r:72,dmg:Math.round(dmg*.16),t:950,tick:0,color:'#ffb340'});
      pushFloat(en.x,en.y-28,'RINGLADUNG','#ffd257',.95);
    }
  } else if(id==='stoss'){
    if(en.moduleShockUntil>now){
      en.moduleShockUntil=0; const bonus=Math.round(dmg*.34); en.hp-=bonus;en.stunT=Math.max(en.stunT||0,420);addBolt(player.x,player.y,en.x,en.y);
      if(rank>=2){
        const ziele=enemies.filter(o=>o!==en&&Math.hypot(o.x-en.x,o.y-en.y)<175).sort((a,b)=>Math.hypot(a.x-en.x,a.y-en.y)-Math.hypot(b.x-en.x,b.y-en.y)).slice(0,treeRang('blade_multi')?2:1);
        for(const o of ziele){const kd=Math.round(bonus*(treeRang('blade_multi')?.42:.72));o.hp-=kd;addBolt(en.x,en.y,o.x,o.y);if(!treeRang('blade_multi'))o.stunT=Math.max(o.stunT||0,450);}
      }
      pushFloat(en.x,en.y-34,'LEITKERBE','#9ad0ff',1.0);
    } else {
      treeFlags.leitkerben=(treeFlags.leitkerben||0)+1;
      const ziel=treeRang('blade_multi')?4:3;
      if(treeFlags.leitkerben>=ziel){treeFlags.leitkerben=0;en.moduleShockUntil=now+3300;pushFloat(en.x,en.y-30,'MARKIERT','#6ec8ff',.9);}
    }
  } else if(id==='bombe'){
    let best=null,bd=Infinity;
    for(const b of bombs){const d=Math.hypot(b.x-en.x,b.y-en.y);if(d<b.r+90&&d<bd){best=b;bd=d;}}
    if(best&&!(best.moduleCutUntil>now)){
      best.moduleCutUntil=now+260;best.t=Math.max(40,best.t-(treeRang('blade_multi')?220:420));addBolt(en.x,en.y,best.x,best.y);pushFloat(best.x,best.y-24,'ZÜNDKERBE','#ff9a5a',.9);
    }
    if(rank>=2&&treeFlags.bombPassUntil>now){
      const pass=[...bombs].reverse().find(b=>!b.modulePassUsed);
      if(pass){pass.target=en;pass.x=en.x;pass.y=en.y;pass.modulePassUsed=true;treeFlags.bombPassUntil=0;pushFloat(en.x,en.y-34,'BOMBENPASS','#ffd257',1.0);}
    }
  } else if(id==='nova'&&treeFlags.novaBladeCharges>0&&treeFlags.novaBladeUntil>now){
    treeFlags.novaBladeCharges--;
    if(treeRang('blade_multi')){
      moduleShot(player.x,player.y,toEnemy,dmg*.30,1,{moduleColor:'#c77dff'});
      moduleShot(player.x,player.y,toEnemy+Math.PI,dmg*.30,1,{moduleColor:'#c77dff'});
    } else moduleShot(player.x,player.y,toEnemy,dmg*.58,3,{moduleColor:'#c77dff'});
    if(rank>=2&&treeFlags.novaBladeCharges===0){
      modulePulse(en.x,en.y,treeRang('blade_multi')?88:64,dmg*(treeRang('blade_multi')?.28:.45),'#c77dff',treeRang('blade_multi')?180:360);
      pushFloat(en.x,en.y-34,'STERNENRING','#d9b5ff',1.0);
    }
  } else if(id==='sog'&&en.sogModuleUntil>now&&treeFlags.sogBladeUntil>now){
    if(treeFlags.sogBladeCharges>0){
      treeFlags.sogBladeCharges--;const radius=treeRang('blade_multi')?115:145,zug=treeRang('blade_multi')?28:45;
      for(const o of enemies){const d=Math.hypot(o.x-en.x,o.y-en.y);if(o!==en&&d<radius&&d>1){o.x+=(en.x-o.x)/d*zug;o.y+=(en.y-o.y)/d*zug;if(!treeRang('blade_multi'))o.stunT=Math.max(o.stunT||0,240);}}
      particles.push({ring:true,x:en.x,y:en.y,color:'#4de0a0',life:.3,max:.3});
    }
    treeFlags.sogBladeHits=(treeFlags.sogBladeHits||0)+1;
    if(rank>=2&&treeFlags.sogBladeHits>=3&&!treeFlags.sogBladeTriggered){
      treeFlags.sogBladeTriggered=true;modulePulse(en.x,en.y,118,dmg*.38,'#4de0a0',220);pushFloat(en.x,en.y-34,'GRAVSCHNITT','#4de0a0',1.0);
    }
  }
}
function handleBladeEchoSweet(en,toEnemy,dmg){
  const rank=treeRang('echo_blade'),now=Date.now();if(!rank||treeFlags.echoBladeLockUntil>now)return;
  treeFlags.echoBladeHits=(treeFlags.echoBladeHits||0)+1;
  const takt=rank>=2?4:5;
  if(treeFlags.echoBladeHits>=takt){
    treeFlags.echoBladeHits=0;treeFlags.echoBladeLockUntil=now+160;
    if(rank>=2&&treeRang('blade_multi')){
      moduleShot(player.x,player.y,toEnemy,dmg*.32,2,{spectral:true});moduleShot(player.x,player.y,toEnemy+Math.PI,dmg*.32,2,{spectral:true});
    } else moduleShot(player.x,player.y,toEnemy,dmg*(rank>=2?.58:.38),rank>=2?3:1,{spectral:true});
    pushFloat(en.x,en.y-36,'KLINGENECHO','#c77dff',1.0);
  }
  if(rank>=3&&treeFlags.echoBladeBurst>0){
    treeFlags.echoBladeBurst--;treeFlags.echoBladeLockUntil=now+160;
    for(const off of [-.26,0,.26]) moduleShot(player.x,player.y,toEnemy+off,dmg*.30,2,{spectral:true});
    particles.push({ring:true,x:player.x,y:player.y,color:'#c77dff',life:.34,max:.34});
  }
}
function handleOrbitCrownSweet(en,toEnemy,bladeIndex){
  if(treeFlags.kronenform!=='dopp' || !kronenMachtId || Date.now()>kronenMachtUntil || bladeIndex!==kronenZielklinge) return;
  powerEchoes.push({id:kronenMachtId,x:en.x,y:en.y,t:0,rank:1,crown:true});
  if(powerEchoes.length>4) powerEchoes.splice(0,powerEchoes.length-4);
  kronenZielklinge=1-kronenZielklinge; kronenMachtId=''; kronenMachtUntil=0;
  if(PERF_DEBUG) treeFlags.debugKronenEchos=(treeFlags.debugKronenEchos||0)+1;
  pushFloat(en.x,en.y-38,'KRONENECHO','#ffd257',1.0); particles.push({ring:true,x:en.x,y:en.y,color:'#ffd257',life:.3,max:.3});
}
/* Orbitkrone (Präzisionsorbit): der von orbitSweetPulse() aufgeladene Durchschlag. Löst beim
   nächsten Volltreffer einen kurzen Strahl entlang der treffenden Klinge aus — 900 px lang,
   26 px Halbbreite, ignoriert Panzerung. Schaden ist grob das Vierfache eines normalen
   Volltreffers, das ist der Abschlussmoment dieser Kronenform. Nutzt powerFields als
   kurzlebiges Feld, damit weder Lebenszyklus noch Aufräumen einen Sonderweg brauchen. */
function triggerDurchschlag(ang, dmgEinzel){
  treeFlags.durchschlagBereit=false;
  const dmg=Math.round(dmgEinzel*4), len=900, half=26;
  const dx=Math.cos(ang)*len, dy=Math.sin(ang)*len;
  let getroffen=0;
  for(const en of enemies){
    // Projektion auf den Strahl: t=0 am Spieler, t=1 am Strahlende; nur dazwischen zaehlt.
    const t=((en.x-player.x)*dx+(en.y-player.y)*dy)/(len*len);
    if(t<0||t>1) continue;
    const px=player.x+dx*t, py=player.y+dy*t;
    if(Math.hypot(en.x-px,en.y-py)>half+en.radius) continue;
    en.hp-=dmg; getroffen++;
    pushFloat(en.x,en.y-18,dmg+'!','#ffd257',1.3);
    spawnParticles(en.x,en.y,'#ffd257',6);
  }
  powerFields.push({kind:'strahl',hidden:true,x:player.x,y:player.y,ang,len,half,t:220,max:220,tick:0,color:'#ffd257'});
  particles.push({ring:true,x:player.x,y:player.y,color:'#ffd257',life:.3,max:.3});
  if(PERF_DEBUG){ treeFlags.debugDurchschlagAusloesungen=(treeFlags.debugDurchschlagAusloesungen||0)+1; treeFlags.debugDurchschlagTreffer=(treeFlags.debugDurchschlagTreffer||0)+getroffen; }
  if(sfx) sfx('nova');
  return getroffen;
}
function handlePowerModule(id){
  const rank=treeFlags.powerModule||0;if(!rank)return;
  if(id==='wirbel'){
    if(treeFlags.mod_wirbel==='a') powerFields.push({kind:'module_follow',x:player.x,y:player.y,r:player.radius+bladeLength()*.86,t:1150,tick:0,color:'#ffb340'});
    else powerFields.push({kind:'nachlauf',x:player.x,y:player.y,r:CONFIG.wirbelRadius*.62,dmg:Math.round(CONFIG.baseDamage*.34*(1+bonuses.dmg)),delay:720,t:1050,tick:0,color:'#ffb340'});
    if(rank>=2) powerFields.push({kind:'module_counter',x:player.x,y:player.y,r:CONFIG.wirbelRadius*1.15,dmg:Math.round(CONFIG.baseDamage*.42*(1+bonuses.dmg)),delay:650,t:260,tick:0,color:'#ffd257'});
  } else if(id==='stoss'){
    powerFields.push({kind:'module_stoss_return',x:player.x,y:player.y,r:CONFIG.stossRange*1.8,dmg:rank>=2?Math.round(CONFIG.stossDamage*.28*(1+bonuses.dmg)):0,delay:480,t:260,tick:0,color:'#6ec8ff'});
  } else if(id==='nova'){
    const caught=shots.filter(s=>Math.hypot(s.x-player.x,s.y-player.y)<CONFIG.nova.range*1.25).slice(0,4);
    for(const s of caught) shots.splice(shots.indexOf(s),1);
    const count=Math.max(2,caught.length);
    for(let i=0;i<count;i++){
      let target=null,bd=Infinity;for(const en of enemies){const d=Math.hypot(en.x-player.x,en.y-player.y);if(d<bd){bd=d;target=en;}}
      const a=target?Math.atan2(target.y-player.y,target.x-player.x)+(i-(count-1)/2)*.12:i/count*Math.PI*2;
      moduleShot(player.x,player.y,a,CONFIG.nova.dmg*.30*(1+bonuses.dmg),1,{moduleNova:rank,moduleColor:'#c77dff'});
    }
    pushFloat(player.x,player.y-38,'STERNENFÄNGER','#c77dff',1.0);
  }
}
function queueEndlessPowerEcho(id,wasFocused){
  const rank=treeRang('echo_power');if(!rank)return;
  powerEchoes.push({id,x:player.x,y:player.y,t:620,rank});
  if(rank>=3&&wasFocused)powerEchoes.push({id,x:player.x,y:player.y,t:1180,rank,focused:true});
  if(powerEchoes.length>4)powerEchoes.splice(0,powerEchoes.length-4);
}
function resolvePowerEcho(e){
  const id=e.id,color=(ACTIVE_COLORS[id]||['#c77dff'])[0],rank=e.rank;
  const mutation=treeFlags['mod_'+id];
  const base=Math.round((id==='stoss'?CONFIG.stossDamage:id==='nova'?CONFIG.nova.dmg:id==='sog'?CONFIG.sog.dmg:CONFIG.baseDamage)*.42*(1+bonuses.dmg));
  if(id==='bombe'){
    let target=null,x=e.x,y=e.y;
    if(rank>=2&&mutation==='a'&&enemies.length){
      target=enemies.reduce((a,b)=>Math.hypot(a.x-e.x,a.y-e.y)<Math.hypot(b.x-e.x,b.y-e.y)?a:b);x=target.x;y=target.y;
    }
    const fern=rank>=2&&mutation==='b';
    bombs.push({x,y,target,t:fern?40:80,max:80,r:CONFIG.bombe.radius*(fern?.46:.58),dmg:Math.round(CONFIG.bombe.dmg*(fern?.58:.42)*(1+bonuses.dmg)),moduleChild:true});
  } else {
    const r=id==='sog'?CONFIG.sog.range*.68:id==='stoss'?CONFIG.stossRange*.72:id==='nova'?CONFIG.nova.range*.7:CONFIG.wirbelRadius*.75;
    let hits=0;
    for(const en of enemies){const dx=e.x-en.x,dy=e.y-en.y,d=Math.hypot(dx,dy);if(d>r+en.radius||d<1)continue;en.hp-=base;
      hits++;
      if(id==='wirbel'||id==='sog'){
        const ziel=Math.max(0,d-(player.radius+bladeLength()*.78));
        const keinZug=e.crown&&id==='wirbel'&&mutation==='b';
        const zug=keinZug?0:rank>=2&&mutation==='a'?64:rank>=2?52:35;
        en.x+=dx/d*Math.min(ziel,zug);en.y+=dy/d*Math.min(ziel,zug);
        if(id==='sog'&&rank>=2){
          if(mutation==='a')en.stunT=Math.max(en.stunT||0,650);
          else {const a=Math.atan2(en.y-player.y,en.x-player.x)+.7,rr=player.radius+bladeLength()*.78;en.x=player.x+Math.cos(a)*rr;en.y=player.y+Math.sin(a)*rr;}
        }
      }
      if(id==='stoss'){const a=Math.atan2(-dy,-dx);en.x+=Math.cos(a)*(rank>=2&&mutation==='a'?52:rank>=2?34:22);en.y+=Math.sin(a)*(rank>=2&&mutation==='a'?52:rank>=2?34:22);if(rank>=2&&mutation==='b')en.slowT=Math.max(en.slowT||0,900);else if(rank>=2)en.stunT=Math.max(en.stunT||0,260);}
      if(id==='nova')en.stunT=Math.max(en.stunT||0,rank>=2?480:260);
    }
    particles.push({ring:true,x:e.x,y:e.y,color,life:.42,max:.42});
    if((rank>=2||e.crown)&&id==='wirbel'&&mutation==='b')powerFields.push({kind:'nachlauf',x:e.x,y:e.y,r:r*(e.crown?.55:.66),dmg:Math.round(base*(e.crown?.18:.28)),t:e.crown?650:950,tick:0,color});
    if(rank>=2&&id==='stoss'&&mutation==='b')powerFields.push({kind:'stase',x:e.x,y:e.y,r:r*.62,dmg:0,t:900,tick:0,color});
    if(id==='nova'&&rank>=2){
      if(mutation==='a'&&hits)barriere=Math.min(barriereMax(),barriere+Math.min(player.maxHp*.07,hits));
      const angles=mutation==='b'?[swordAngle-.22,swordAngle,swordAngle+.22]:[0,Math.PI/2,Math.PI,Math.PI*1.5];
      for(const a of angles)moduleShot(e.x,e.y,a,base*.45,1,{spectral:true});
    }
  }
  pushFloat(e.x,e.y-34,'MACHTECHO',color,1.05);if(sfx)sfx(id==='bombe'?'bombe':'nova');
}

// Specials — 2 frei belegbare Slots; doActive löst die im Slot gewählte Fähigkeit aus
function doActive(slot){
  const id = slot===1? activeSlot1 : activeSlot2;
  if(state==='playing' && id==='bombe' && treeFlags.mod_bombe==='b' && bombs.length){
    bombs.forEach(b=>b.t=0); return;
  }
  if(state!=='playing' || !id || activeCd[id]>0) return;
  activeCd[id]=activeCdMax(id);
  // Fokus gehört zur Hauptmacht: Das Werkzeug auf Taste 2 kann die Ladung nicht stehlen.
  const natuerlicherFokus=slot===1&&fokusBereit;
  const echoLadung=slot===1&&treeFlags.echoPowerCharge>0&&treeFlags.echoPowerChargeUntil>Date.now();
  if(slot===1&&treeFlags.echoPowerCharge&& !echoLadung) treeFlags.echoPowerCharge=0;
  fokusAktiv = natuerlicherFokus||echoLadung;
  // Auslese-Modul Kurzschluss: Tempo gegen Leben. Rang 2 verschont nur den echten
  // Vollfokus-Einsatz (natuerlicherFokus) — Echo-Ladung zählt nicht als "voller Fokus".
  if(runModule.kurzschluss && !(runModule.kurzschluss>=2 && natuerlicherFokus)){
    const kosten=player.maxHp*.04;
    player.hp=Math.max(1, player.hp-kosten);   // darf den Spieler nie töten
    pushFloat(player.x,player.y-30,'-'+Math.round(kosten)+' KURZSCHLUSS','#ff6b6b',0.9);
    spawnParticles(player.x,player.y,'#ff6b6b',5);
  }
  if(natuerlicherFokus){
    fokusBereit=false; fokus=0;
    spawnParticles(player.x,player.y,'#dcb5ff',24);
    particles.push({ring:true,x:player.x,y:player.y,color:'#ffffff',life:.62,max:.62});
    pushFloat(player.x,player.y-42,'FOKUS ×'+fokusFaktor().toFixed(1),'#f2e5ff',1.15);
    shake=Math.max(shake,9);
    if(sfx) sfx('focus');
    orbitFortschritt('fokus_einsatz');
  } else if(echoLadung){
    treeFlags.echoPowerCharge=0;
    spawnParticles(player.x,player.y,'#c77dff',16);
    pushFloat(player.x,player.y-34,'ECHO-FOKUS','#c77dff',1.05);
  }
  if(treeFlags.nachsetzen) moveBoostUntil=Date.now()+1200;
  if(id==='wirbel') executeWirbel();
  else if(id==='stoss') executeStoss();
  else if(id==='bombe') executeBombe();
  else if(id==='nova') executeNova();
  else if(id==='sog') executeSog();
  if(slot===1){
    armBladeModule(id);
    handlePowerModule(id);
    queueEndlessPowerEcho(id,fokusAktiv);
    if(treeRang('echo_blade')>=3) treeFlags.echoBladeBurst=3;
  }
  if(treeFlags.kronenform==='dopp'){ kronenMachtId=id; kronenMachtUntil=Date.now()+4000; }
  if(treeFlags.orbitResonanz){
    const sofort=treeFlags.resonanzSofort && fokusAktiv;
    const anderes=slot===1?activeSlot2:activeSlot1;
    if(anderes){
      if(sofort) activeCd[anderes]=0;
      else activeCd[anderes]=Math.max(0,(activeCd[anderes]||0)*.78);
    } else treeFlags.resonanzUntil=Date.now()+(sofort?3000:1300);
    if(treeFlags.resonanzKlinge && fokusAktiv) treeFlags.resonanzKlingeUntil=Date.now()+4000;
  }
  fokusAktiv=false;
}
function executeWirbel(){
  const lv=abilityLevel('wirbel');
  const master=activeSlot1==='wirbel'?(treeFlags.powerMaster||0):0;
  const evo=evolvedOf('wirbel')==='sturmwirbel';
  let dmg=Math.round(CONFIG.baseDamage*(1+bonuses.dmg)*CONFIG.wirbelDamageMult*abilScale(lv)*machtFaktor('wirbel') * (dmgBoostUntil>Date.now()?2:1) * fokusFaktor());
  let r=CONFIG.wirbelRadius*(1+bonuses.range*0.5)*(master>=1?1.14:1);
  if(evo){ r*=1.55; dmg=Math.round(dmg*1.5); }     // Sturmwirbel: größer und härter
  for(const en of enemies){
    const dist=Math.hypot(en.x-player.x,en.y-player.y);
    if(dist < r + en.radius){
      en.hp-=dmg; spawnParticles(en.x,en.y,en.color,8); pushFloat(en.x,en.y-20,'-'+dmg,'#ffcc33');
      if(treeFlags.mod_wirbel==='a' && dist>1){ const ziel=player.radius+bladeLength()*.82,zug=Math.min(70,Math.max(0,dist-ziel)); en.x+=(player.x-en.x)/dist*zug; en.y+=(player.y-en.y)/dist*zug; }
    }
  }
  if(treeFlags.mod_wirbel==='b') powerFields.push({kind:'nachlauf',x:player.x,y:player.y,r:r*.78,dmg:Math.round(dmg*.12),t:1550,tick:300,interval:300,sliceWirbelB:true,color:'#ffb340',snapshotDmg:dmg});
  if(fokusAktiv && treeFlags.sonnenorbit) powerFields.push({kind:'sunOrbit',x:player.x,y:player.y,r:player.radius+bladeLength(),dmg:Math.round(dmg*.10),t:900,tick:0,pulses:3,color:'#ffd257'});
  if(master>=2){
    const kernDmg=Math.round(dmg*.42);
    for(const en of enemies) if(Math.hypot(en.x-player.x,en.y-player.y)<r*.48+en.radius){
      en.hp-=kernDmg; pushFloat(en.x,en.y-28,'KERN '+kernDmg,'#ffffff');
    }
    particles.push({ring:true,x:player.x,y:player.y,color:'#ffffff',life:.32,max:.32});
  }
  // Sprung ab Stufe 4: ein zweiter Ring weiter außen, mit halbem Schaden.
  // Er greift genau den Bereich ab, der vorher knapp außerhalb lag.
  if(lv>=SPRUNG_STUFE){
    const r2=r*1.6, d2=Math.round(dmg*0.5);
    for(const en of enemies){
      const ed=Math.hypot(en.x-player.x,en.y-player.y);
      if(ed >= r+en.radius && ed < r2+en.radius){
        en.hp-=d2; spawnParticles(en.x,en.y,en.color,5); pushFloat(en.x,en.y-20,'-'+d2,'#ffcc33');
      }
    }
    r=r2;   // die Optik zeigt den tatsächlich getroffenen Außenrand
  }
  // Sturmwirbel: zwei gegenläufige Ringe, danach ein gedeckeltes verzögertes Feld.
  if(evo){
    particles.push({stormRing:true,x:player.x,y:player.y,life:.7,max:.7,r});
    const praezBoost=treeFlags.kronenform==='praez'?Math.min(2,praezSerie):0;
    const stormDmg=Math.round(dmg*.35*(1+.10*praezBoost));
    powerFields.push({kind:'storm_projectiles',x:player.x,y:player.y,r:8,hidden:true,t:700,tick:700,dmg:stormDmg,color:'#ffd257',snapshotDmg:dmg,slow:!!(treeFlags.orbitKrone&&figur().id==='held'&&barriere>0)});
    if(treeFlags.kronenform==='praez') praezSerie=0;
  }
  spawnParticles(player.x,player.y,'#ffcc33',evo?26:14);
  wirbelT=1; wirbelShownR=r;   // Optik nutzt exakt den Trefferradius
  shake=evo?11:8; if(sfx) sfx('wirbel');
}
function executeStoss(){
  const lv=abilityLevel('stoss');
  const master=activeSlot1==='stoss'?(treeFlags.powerMaster||0):0;
  const dmg=Math.round(CONFIG.stossDamage*(1+bonuses.dmg)*abilScale(lv)*machtFaktor('stoss')*(dmgBoostUntil>Date.now()?2:1)*fokusFaktor());
  const range=CONFIG.stossRange*(1+bonuses.range*0.3);
  const getroffen=[];
  // 360°-Schubwelle: stößt alle Gegner im Umkreis radial nach außen
  for(const en of enemies){
    const dx=en.x-player.x, dy=en.y-player.y;
    const d=Math.hypot(dx,dy);
    if(d < range+en.radius){
      en.hp-=dmg;
      const a = d>0.001 ? Math.atan2(dy,dx) : Math.random()*Math.PI*2;
      en.x += Math.cos(a)*CONFIG.stossPush;
      en.y += Math.sin(a)*CONFIG.stossPush;
      if(treeFlags.mod_stoss==='a'){
        const ziel=enemies.find(o=>o!==en && Math.hypot(o.x-en.x,o.y-en.y)<o.radius+en.radius+34);
        if(ziel){ const koll=Math.round(dmg*0.35);ziel.hp-=koll;en.hp-=koll; }
      }
      if(treeFlags.mod_stoss==='b') en.slowT=Math.max(en.slowT||0,1200);
      if(activeSlot1==='stoss'&&(treeFlags.powerModule||0)>0) en.moduleStossUntil=Date.now()+850;
      if(master>=1) en.shockMarkUntil=Date.now()+3200;
      // Sprung ab Stufe 4: die Welle betäubt zusätzlich — aus Wegstoßen wird Kontrolle
      if(lv>=SPRUNG_STUFE) en.stunT=Math.max(en.stunT||0, 600);
      spawnParticles(en.x,en.y,'#6ec8ff',6);
      pushFloat(en.x,en.y-18,'-'+dmg,'#6ec8ff');
      getroffen.push(en);
    }
  }
  if(treeFlags.mod_stoss==='b') powerFields.push({kind:'stase',x:player.x,y:player.y,r:range*.72,dmg:0,t:1800,tick:0,color:'#6ec8ff'});
  // Kettengewitter: von jedem Getroffenen springt ein Blitz auf den nächsten Gegner
  if(evolvedOf('stoss')==='kettengewitter'){
    const kdmg=Math.round(dmg*0.6);
    for(const src of getroffen){
      let best=null, bd=180;
      for(const o of enemies){ if(o===src || getroffen.includes(o)) continue;
        const cd=Math.hypot(o.x-src.x,o.y-src.y); if(cd<bd){ bd=cd; best=o; } }
      if(best){ best.hp-=kdmg; addBolt(src.x,src.y,best.x,best.y); pushFloat(best.x,best.y-14,'-'+kdmg,'#bfe3ff'); }
    }
  }
  spawnParticles(player.x,player.y,'#6ec8ff',18);
  stossWaveT=1;   // expandierender Ring-Effekt
  shake=7; if(sfx) sfx('stoss');
}
// Bombe: legt am Standort eine Bombe, die nach Zündzeit explodiert (höhere Stufe = kürzere Zündzeit + größerer Radius)
function executeBombe(){
  const lv=abilityLevel('bombe');
  const master=activeSlot1==='bombe'?(treeFlags.powerMaster||0):0;
  const powerModule=activeSlot1==='bombe'?(treeFlags.powerModule||0):0;
  const moduleActivation=powerModule?((treeFlags.bombModuleActivation||0)+1):0;
  if(powerModule) treeFlags.bombModuleActivation=moduleActivation;
  const bombe=(dx,dy,verzug)=>({ x:player.x+dx, y:player.y+dy,
    t:CONFIG.bombe.fuse*(1-0.03*(lv-1))+verzug, max:CONFIG.bombe.fuse,
    r:CONFIG.bombe.radius*(1+0.05*(lv-1)), dmg:Math.round(CONFIG.bombe.dmg*abilScale(lv)*machtFaktor('bombe')*(1+bonuses.dmg)*fokusFaktor()),
    streu: evolvedOf('bombe')==='streubombe', master, powerModule, moduleActivation, moduleRoot:true });
  let bx=0,by=0,haftZiel=null;
  if(treeFlags.mod_bombe==='a' && enemies.length){
    haftZiel=enemies.reduce((a,b)=>Math.hypot(a.x-player.x,a.y-player.y)<Math.hypot(b.x-player.x,b.y-player.y)?a:b);
    bx=haftZiel.x-player.x;by=haftZiel.y-player.y;
  }
  const erste=bombe(bx,by,0);erste.target=haftZiel;bombs.push(erste);
  // Sprung ab Stufe 4: eine zweite Bombe fällt versetzt und zündet kurz danach,
  // dadurch deckt ein Wurf eine Fläche statt eines Punktes ab.
  if(lv>=SPRUNG_STUFE){
    const a=Math.random()*Math.PI*2;
    bombs.push(bombe(Math.cos(a)*70, Math.sin(a)*70, 260));
  }
  spawnParticles(player.x,player.y,'#ff7a5a',8);
  if(sfx) sfx('bombe');
}
/* Sog — das Gegenstück zum Schockstoß: Er zieht Gegner in die Klinge, statt sie
   wegzuschieben. Damit ist er die erste aktive Macht, die den Sweet Spot AUFBAUT
   statt ihn zu ersetzen: Man holt sich die Gegner dorthin, wo man sie treffen will. */
function executeSog(){
  const lv=abilityLevel('sog');
  const master=activeSlot1==='sog'?(treeFlags.powerMaster||0):0;
  const R=CONFIG.sog.range*(1+0.10*(lv-1))*(1+bonuses.range*0.3);
  const kraft=CONFIG.sog.kraft*(1+0.10*(lv-1));
  const dmg=Math.round(CONFIG.sog.dmg*abilScale(lv)*machtFaktor('sog')*(1+bonuses.dmg)*fokusFaktor());
  let kern=null, kernDist=Infinity;
  for(const en of enemies){
    const dx=player.x-en.x, dy=player.y-en.y, d=Math.hypot(dx,dy);
    if(d>R || d<1) continue;
    // Nicht an den Spieler ziehen, sondern ins Trefferband: player.radius+30 waren 48 px,
    // also 58 ms vor dem Kontaktschaden. Die Klinge trifft bis bladeLength()+Gegnerradius.
    const halteRadius=player.radius+bladeLength()*.92;
    const ziel=Math.min(kraft, Math.max(0, d-halteRadius));
    en.x += dx/d*ziel; en.y += dy/d*ziel;
    en.hp -= dmg;
    if(master>=1 && d<kernDist){kern=en;kernDist=d;}
    if(activeSlot1==='sog'&&(treeFlags.bladeModule||0)>0) en.sogModuleUntil=Date.now()+4300;
    // Festhalten ist jetzt Grundverhalten: Ohne Halten ist das Trefferband gegen
    // bewegte Gegner nur 116 ms breit. Das Machtmodul verlängert nur noch.
    const halteMs=(activeSlot1==='sog'&&(treeFlags.powerModule||0)>0)?1200:900;
    en.moduleOrbitUntil=Date.now()+halteMs;
    en.moduleOrbitAngle=Math.atan2(en.y-player.y,en.x-player.x);
    en.moduleOrbitDir=treeFlags.mod_sog==='b'?1:-1;
    if(treeFlags.mod_sog==='a') en.stunT=Math.max(en.stunT||0,900);
    if(treeFlags.mod_sog==='b'){
      const a=Math.atan2(en.y-player.y,en.x-player.x)+0.8;
      const rr=player.radius+bladeLength()*0.72; en.x=player.x+Math.cos(a)*rr;en.y=player.y+Math.sin(a)*rr;
      en.stunT=Math.max(en.stunT||0,650);
    }
    if(lv>=SPRUNG_STUFE) en.stunT=Math.max(en.stunT||0, CONFIG.sog.stun);
    spawnParticles(en.x,en.y,'#4de0a0',4);
  }
  if(kern){kern.gravKernUntil=Date.now()+3600;pushFloat(kern.x,kern.y-28,'KERN','#4de0a0',1.1);}
  if(activeSlot1==='sog'&&(treeFlags.powerModule||0)>=2)
    powerFields.push({kind:'module_sog_end',x:player.x,y:player.y,r:R*.72,dmg:Math.round(dmg*.36),delay:1200,t:260,tick:0,color:'#4de0a0',mode:treeFlags.mod_sog});
  if(evolvedOf('sog')==='gravitationsbruch'){
    const nd=Math.round(CONFIG.nachhall.dmg*1.8*(1+bonuses.dmg));
    enemies.forEach(en=>{if(Math.hypot(en.x-player.x,en.y-player.y)<bladeLength()+90) en.hp-=nd;});
    particles.push({ring:true,x:player.x,y:player.y,color:'#4de0a0',life:.4,max:.4});
  }
  // Optik: einlaufender Ring
  for(let i=0;i<14;i++){
    const a=i/14*Math.PI*2;
    particles.push({ x:player.x+Math.cos(a)*R*0.8, y:player.y+Math.sin(a)*R*0.8,
      vx:-Math.cos(a)*280, vy:-Math.sin(a)*280, life:0.45, max:0.45, color:'#4de0a0', size:3 });
  }
  shake=Math.max(shake,4); if(sfx) sfx('stoss');
}
// Nova: elektrischer Ring — Schaden + kurzer Stun
function executeNova(){
  const lv=abilityLevel('nova');
  const master=activeSlot1==='nova'?(treeFlags.powerMaster||0):0;
  const range=CONFIG.nova.range*(1+0.05*(lv-1));
  const dmg=Math.round(CONFIG.nova.dmg*abilScale(lv)*machtFaktor('nova')*(1+bonuses.dmg)*fokusFaktor());
  let treffer=0;
  for(const en of enemies){
    if(Math.hypot(en.x-player.x,en.y-player.y) < range+en.radius){
      en.hp-=dmg;
      en.stunT=Math.max(en.stunT||0, CONFIG.nova.stun);
      spawnParticles(en.x,en.y,'#c77dff',6);
      pushFloat(en.x,en.y-18,'-'+dmg,'#c77dff');
      treffer++;
    }
  }
  if(treeFlags.mod_nova==='a' && treffer) barriere=Math.min(barriereMax(),barriere+Math.min(player.maxHp*.12,treffer*2));
  if(treeFlags.mod_nova==='b'){
    enemies.slice().sort((a,b)=>Math.hypot(a.x-player.x,a.y-player.y)-Math.hypot(b.x-player.x,b.y-player.y)).slice(0,3).forEach(en=>{en.hp-=Math.round(dmg*.35);addBolt(player.x,player.y,en.x,en.y);});
  }
  if(master>=1){
    const n=master>=3?8:4;
    for(let i=0;i<n;i++){const a=i/n*Math.PI*2;pShots.push({x:player.x,y:player.y,vx:Math.cos(a)*420,vy:Math.sin(a)*420,dmg:Math.round(dmg*.28),life:.9,hitsLeft:1});}
  }
  // Nova-Kaskade: feuert zusätzlich eine Phaser-Salve in alle Richtungen
  if(evolvedOf('nova')==='novakaskade'){
    const n=12;
    for(let i=0;i<n;i++){
      const a=i/n*Math.PI*2;
      pShots.push({ x:player.x, y:player.y, vx:Math.cos(a)*420, vy:Math.sin(a)*420,
        r:4, life:1.0, dmg:Math.round(dmg*0.4) });
    }
  }
  // Sprung ab Stufe 4: eine zweite, weitere Welle zündet verzögert nach. Wer nach der
  // ersten Nova nachrückt, läuft in die zweite — belohnt Timing statt nur Zahlen.
  if(master>=2 || lv>=SPRUNG_STUFE){ novaEcho=420; novaEchoDmg=Math.round(dmg*(master>=3?.82:.6)); novaEchoRange=range*1.3; }
  novaFx=1; shake=7; if(sfx) sfx('nova');
}
/* Entdrängung über ein Raster: Jeder Gegner landet in genau einer Zelle, verglichen
   wird nur mit den eigenen und den acht Nachbarzellen. Kostet damit ungefähr
   linear statt quadratisch — der Hauptgrund fürs Ruckeln in späten Wellen. */
const SEP_ZELLE=56;                       // etwas größer als der größte Gegnerdurchmesser
const SEP_KEY=4194304;                    // 2^22 — Zeilenversatz für den eindeutigen Zahlenschlüssel
const sepRaster=new Map();
function separiereGegner(){
  if(enemies.length<2) return;
  sepRaster.clear();
  /* Zahlenschlüssel statt "cx,cy": Der String-Schlüssel erzeugte pro Bild rund
     115 + 115×9 ≈ 1150 neue Strings, allein dafür lief der Müllsammler mit. Die
     Multiplikation ist eindeutig umkehrbar, solange |cy| < 2^21 Zellen bleibt —
     das entspricht ±117 Mio. Pixel und ist im Spiel nicht erreichbar. */
  for(let i=0;i<enemies.length;i++){
    const e=enemies[i];
    const key=Math.floor(e.x/SEP_ZELLE)*SEP_KEY + Math.floor(e.y/SEP_ZELLE);
    let liste=sepRaster.get(key);
    if(!liste){ liste=[]; sepRaster.set(key,liste); }
    liste.push(i);
  }
  for(let i=0;i<enemies.length;i++){
    const a=enemies[i];
    const cx=Math.floor(a.x/SEP_ZELLE), cy=Math.floor(a.y/SEP_ZELLE);
    for(let ox=-1;ox<=1;ox++) for(let oy=-1;oy<=1;oy++){
      const liste=sepRaster.get((cx+ox)*SEP_KEY + (cy+oy));
      if(!liste) continue;
      for(const j of liste){
        if(j<=i) continue;                // jedes Paar nur einmal
        const b=enemies[j];
        const dx=b.x-a.x, dy=b.y-a.y; const minD=a.radius+b.radius;
        let od=Math.hypot(dx,dy);
        if(od>=minD) continue;
        let nx,ny;
        if(od<0.001){ const ang=(i*2.399+j); nx=Math.cos(ang); ny=Math.sin(ang); od=0.001; }
        else { nx=dx/od; ny=dy/od; }
        const push=(minD-od)/2;
        a.x-=nx*push; a.y-=ny*push; b.x+=nx*push; b.y+=ny*push;
      }
    }
  }
}

// Zentraler Spieler-Schaden: Effekte, Konterstoß, Tod an einer Stelle
function hurtPlayer(dmg){
  if(PERF_GOD) return false;                     // Messlauf: der Tod würde die Messung abbrechen
  /* Auslese-Modul Nachfassen: Der nächste Volltreffer wird breiter, nachdem man etwas
     eingesteckt hat. Vorher hing es an einem Umlauf ohne Treffer — im Gedränge verfehlt
     man nie, die Karte feuerte gemessen in 0,0 % der Fälle. */
  if(runModule.nachfassen) nachfassenBereit=true;
  if(Date.now()<=shieldUntil) return false;      // Schild absorbiert
  dmg *= hilfe().schaden;                        // Rückenwind der gewählten Hilfsstufe
  // Barriere zuerst: hält sie den Schlag komplett auf, bleibt die Lebensleiste unberührt
  if(barriere>0){
    const weg=Math.min(barriere, dmg);
    barriere-=weg; dmg-=weg;
    spawnParticles(player.x,player.y,'#7cc8ff',5);
    shake=Math.max(shake,4); flashUntil=Date.now()+90;
    if(dmg<=0.5){ updateHUD(); return false; }
  }
  player.hp-=dmg; shake=Math.max(shake,6); flashUntil=Date.now()+140;
  spawnParticles(player.x,player.y,'#ff4d4d',6);
  if(bossActive) bossHitClean=false;             // "Makellos" verwirkt
  if(sfx) sfx('hurt');
  if(runAbilities.konterstoss && counterCd<=0) doCounter();
  if(player.hp<=0){
    // Wiederaufstehen (nur „Entdecker", einmal pro Lauf): der Lauf endet nicht am
    // ersten Fehler. Für ein Kind ist das der Unterschied zwischen Weiterspielen
    // und Aufgeben — und es sperrt nichts, der Sieg zählt genauso.
    if(hilfe().wiederauf && !wiederaufBenutzt){
      wiederaufBenutzt=true;
      player.hp=player.maxHp*0.6;
      shieldUntil=Date.now()+2500;
      barriere=Math.min(barriereMax(), barriere+player.maxHp*0.15);
      announce('Wieder auf den Beinen!', 'Einmal pro Lauf · kurz unverwundbar', '#4de0a0');
      spawnParticles(player.x,player.y,'#4de0a0',20);
      if(sfx) sfx('unlockBig');
      updateHUD();
      return false;
    }
    player.hp=0; updateHUD(); gameOver(); return true;
  }
  return false;
}
// Konterstoß: automatische Mini-Schockwelle, wenn man getroffen wird
function doCounter(){
  counterCd=CONFIG.abil.counterCd; counterFx=1;
  const lv=runAbilities.konterstoss||1;
  if(lv>=3) counterCd*=.62;
  const R=CONFIG.abil.counterRadius*(lv>=3?1.32:1), dmg=Math.round(CONFIG.abil.counterDamage*abilScale(lv)*(lv>=3?1.35:1));
  // Sprung ab Stufe 4: der Konter schleudert doppelt so weit — er schafft echten Freiraum
  const push=CONFIG.abil.counterPush*(lv>=2?1.65:1);
  for(const en of enemies){
    const dx=en.x-player.x, dy=en.y-player.y, d=Math.hypot(dx,dy);
    if(d<R+en.radius){
      en.hp-=dmg;
      const a=d>0.001?Math.atan2(dy,dx):Math.random()*Math.PI*2;
      en.x+=Math.cos(a)*push; en.y+=Math.sin(a)*push;
    }
  }
  spawnParticles(player.x,player.y,'#ff9a6b',lv>=3?22:12);
  if(lv>=3) particles.push({ring:true,x:player.x,y:player.y,color:'#ff9a6b',life:.38,max:.38});
  if(sfx) sfx('counter');
}
// Kettenblitz zwischen zwei Punkten (nur Optik)
function addBolt(x1,y1,x2,y2){ particles.push({bolt:true, x:x1,y:y1, x2, y2, life:0.16, max:0.16}); }
btnWirbel.addEventListener('touchstart',e=>{e.preventDefault();doActive(1)});
btnWirbel.addEventListener('click',()=>doActive(1));

// Fragmente, Partikel, Textzahlen
// Fragmente fallen direkt — eine Währung, nichts verfällt
function dropStar(x,y, amount){ stars.push({x,y,amount, r:8, taken:false}); }
function dropOrb(x,y,big){ orbs.push({x:x+(Math.random()-0.5)*24, y:y+(Math.random()-0.5)*24, r:CONFIG.xpOrb.radius, big:!!big}); }
// Rote Lebenskugel — eigene Sorte in derselben Liste, damit Magnet und Einsammeln geteilt sind
function dropHpOrb(x,y){ orbs.push({x:x+(Math.random()-0.5)*24, y:y+(Math.random()-0.5)*24, r:CONFIG.hpOrb.radius, hp:true}); }
/* Wellenende: nichts bleibt liegen. Alles, was noch auf dem Feld liegt, bekommt einen
   Sog zum Spieler und wird auf dem Weg ganz normal eingesammelt — inklusive Ton und
   Zahlen. Vorher verlor man Fragmente einfach, weil die nächste Welle schon startete. */
function einsammelnAmWellenende(){
  for(const c of stars) c.sog=true;
  for(const o of orbs)  o.sog=true;
}
// Gegner besiegt: Fragmente, XP, ggf. Bonus-XP-Orb, Effekte – zentral für alle Todesfälle
function killEnemy(en,i){
  // Vom Boss gerufene Drohnen sind eine Kampfmechanik, keine endlose Beutequelle.
  // Ihr Tod schadet stattdessen dem Beschwörer: Wegräumen lohnt sich weiterhin,
  // absichtliches Verlängern des Bosskampfs aber nicht.
  if(en.bossMinion){
    // Brutknoten sind eine Heilquelle, keine Farm-Drohne: ihr Tod darf den Boss nicht
    // zusätzlich schwächen, sonst würde Stehenbleiben-und-alles-töten wieder belohnt
    // und der Raumhebel der Knoten wäre sinnlos.
    const boss=en.brutknoten ? null : enemies.find(o=>o.type==='boss' && o.hp>0);
    if(boss){
      const rueckschlag=Math.max(1,Math.round(boss.maxHp*.018));
      boss.hp-=rueckschlag; pushFloat(boss.x,boss.y-34,'RÜCKSCHLAG '+rueckschlag,'#4de0a0',1.05);
      spawnParticles(boss.x,boss.y,'#4de0a0',6);
    }
    spawnParticles(en.x,en.y,'#4de0a0',8); if(sfx)sfx('minionDie'); return;
  }
  dropStar(en.x,en.y, Math.round(CONFIG.enemyTypes[en.type].star*beuteFaktor()));
  player.xp+=laufXp(CONFIG.enemyTypes[en.type].xp)*beuteFaktor();
  if(treeFlags.leerenHeilung && player.hp<player.maxHp){
    const verwundet=1-player.hp/player.maxHp;
    const heilung=player.maxHp*treeFlags.leerenHeilung*(treeFlags.satterAbgrund && verwundet>.45?1.8:1);
    player.hp=Math.min(player.maxHp,player.hp+heilung);
    pushFloat(player.x,player.y-24,'+'+Math.round(heilung)+' HP','#c77dff');
  }
  // Lebensregen (passiv): heilt pro Kill, höhere Stufe = mehr
  if(runAbilities.lebensregen){
    const heal=CONFIG.healPerKill*(1+0.5*(runAbilities.lebensregen-1));
    if(player.hp<player.maxHp){ player.hp=Math.min(player.maxHp, player.hp+heal); pushFloat(player.x,player.y-26,'+'+Math.round(heal)+' HP','#4de0a0'); }
  }
  killCount++;
  // Killkette: Serien innerhalb von zwei Sekunden. Alle 15 ein kleiner Moment —
  // kurze Zeitlupe, Fokus, Float — damit Serien sich anfühlen statt nur zu zählen.
  const jetztMs=Date.now();
  kettenZahl = jetztMs<kettenBis ? kettenZahl+1 : 1;
  kettenBis=jetztMs+2000;
  if(kettenZahl%15===0){
    pushFloat(player.x,player.y-56,'KETTE '+kettenZahl,'#ffd257',1.25);
    hitstop(40); shake=Math.max(shake,2.5);
    fokus=Math.min(fokusZiel(), fokus+1);
  }
  let dropped=false;
  if(en.type==='boss'){ dropOrb(en.x,en.y,true); dropped=true; }
  else if(en.type==='schwer'){ dropOrb(en.x,en.y,false); dropped=true; }
  else if(killCount>=CONFIG.xpOrb.pity || laufRnd()<CONFIG.xpOrb.chance){ dropOrb(en.x,en.y,false); dropped=true; }
  if(dropped) killCount=0;
  // Lebenskugeln unabhängig davon, mit eigenem Pity-Zähler
  hpKillCount++;
  const hpOrbAllowed=(player.hp < player.maxHp) || (treeFlags.waechter && !waechterLadung);
  if(hpOrbAllowed && (hpKillCount>=CONFIG.hpOrb.pity || laufRnd()<CONFIG.hpOrb.chance*tagesFaktor('hpOrb'))){
    dropHpOrb(en.x,en.y); hpKillCount=0;
  }
  spawnParticles(en.x,en.y,en.color,en.type==='boss'?24:10);
  if(en.type==='boss'){ onBossDefeated(); shake=Math.max(shake,10); }
  if(sfx) sfx(en.type==='boss'?'bossdie':'kill');
}
/* Alle Effekte laufen durch diese drei Funktionen — deshalb genügt es, die Bremse
   hier einzubauen, statt an den rund dreißig Aufrufstellen. Ist das Budget knapp,
   werden weniger Partikel erzeugt statt gar keiner: Der Treffer bleibt sichtbar. */
function spawnParticles(x,y,color,n=6){
  const frei = CONFIG.maxPartikel - particles.length;
  if(frei<=0) return;
  if(!fxAn) n=Math.ceil(n*0.5);          // im Gedränge reicht die Hälfte
  if(n>frei) n=frei;
  for(let i=0;i<n;i++) particles.push({x,y, vx:(Math.random()-0.5)*240, vy:(Math.random()-0.5)*240, life:0.4+Math.random()*0.3, max:0.6, color, size:2+Math.random()*3});
}
function pushFloat(x,y,text,color,scale){
  // Älteste Zahl weichen lassen statt die neue zu verschlucken — die neue ist die,
  // die den Spieler interessiert.
  if(floats.length>=CONFIG.maxFloats) floats.shift();
  floats.push({x,y,text,color,life:0.9, vy:-40, scale:scale||1});
}
// Kurzer Funkenring am Treffpunkt — macht den Sweet Spot auf einen Blick erkennbar
function sparkRing(x,y,color){
  if(particles.length>=CONFIG.maxPartikel) return;
  particles.push({ring:true, x, y, color, life:0.22, max:0.22});
}

/* Icons — schlichte Linien-Symbole, passend zum futuristischen Stil */
const ICON={
  schaden:'<path d="M4.6 19.4 14.6 9.4" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/><path d="M13.2 8 20 4l-4 6.8z" fill="currentColor"/><path d="M17.4 14.6l1.05 2.35 2.35 1.05-2.35 1.05-1.05 2.35-1.05-2.35L14 18.05l2.35-1.05z" fill="currentColor"/>',
  reichweite:'<circle cx="12" cy="12" r="3" fill="currentColor"/><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-dasharray="3 3"/><path d="M12 3.5v3M12 17.5v3M3.5 12h3M17.5 12h3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  tempo:'<path d="M13 2 5 13h6l-2 9 8-11h-6z" fill="currentColor"/>',
  doppel:'<path d="M6 21 11 9" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M18 21 13 9" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><circle cx="12" cy="6" r="2.6" fill="currentColor"/>',
  leben:'<path d="M12 20s-7-4.6-7-9.4A4 4 0 0 1 12 8a4 4 0 0 1 7-.6c0 4.8-7 12.6-7 12.6z" fill="currentColor"/>',
  laufen:'<circle cx="14" cy="4.5" r="2.2" fill="currentColor"/><path d="M9 21l3-5-2.5-3 1-4 4 3 3 1" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/>',
  schild:'<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M9 12l2 2 4-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  boost:'<path d="M12 3c3 4 5 6 5 9a5 5 0 0 1-10 0c0-3 2-5 5-9z" fill="currentColor"/>',
  kette:'<path d="M4 13l4-4M16 15l4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M13 4l-4 8h4l-2 8 6-10h-4z" fill="currentColor"/>',
  konter:'<circle cx="12" cy="12" r="3.4" fill="currentColor"/><path d="M12 4.5a7.5 7.5 0 0 1 0 15M12 4.5a7.5 7.5 0 0 0 0 15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  splitter:'<circle cx="12" cy="12" r="2.4" fill="currentColor"/><circle cx="12" cy="4" r="1.8" fill="currentColor"/><circle cx="20" cy="12" r="1.8" fill="currentColor"/><circle cx="12" cy="20" r="1.8" fill="currentColor"/><circle cx="4" cy="12" r="1.8" fill="currentColor"/><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="2 3" opacity=".6"/>',
  dreifach:'<path d="M12 21V9M5 20l5-11M19 20l-5-11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="6" r="2.4" fill="currentColor"/>',
  wirbel:'<path d="M12 3a9 9 0 1 1-7.9 4.7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M12 9a3 3 0 1 1-2.6 1.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M4 3l1 5 5-1z" fill="currentColor"/>',
  stoss:'<circle cx="12" cy="12" r="2.4" fill="currentColor"/><path d="M12 6.8a5.2 5.2 0 0 1 0 10.4M12 6.8a5.2 5.2 0 0 0 0 10.4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  bombe:'<circle cx="12" cy="14" r="6" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 8V6M14.5 4.5a2 2 0 0 0 2-2 2 2 0 0 1 2 2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M10.2 13.6a2.2 2.2 0 0 1 2.2-2.2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  nova:'<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="12" r="2.2" fill="currentColor"/>',
  phaser:'<circle cx="5.5" cy="12" r="3" fill="currentColor"/><rect x="10" y="6.6" width="6.4" height="2.4" rx="1.2" fill="currentColor"/><rect x="10" y="15" width="6.4" height="2.4" rx="1.2" fill="currentColor"/><path d="M18.6 7.8h2.6M18.6 16.2h2.6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" opacity=".5"/>',
  // Nachhall ist eine Druckwelle vom Treffer aus. Vorher lieh er sich ICON.boost,
  // eine Flamme — die sagte nichts ueber die Wirkung.
  farbe:'<path d="M12 3a9 9 0 0 0 0 18c1.4 0 2-.8 2-1.8 0-.6-.4-1-.4-1.6 0-.9.7-1.5 1.6-1.5H17a4.4 4.4 0 0 0 4-4.4C21 6.6 17 3 12 3z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/><circle cx="7.6" cy="11" r="1.3" fill="currentColor"/><circle cx="11" cy="7.4" r="1.3" fill="currentColor"/><circle cx="15.4" cy="8.6" r="1.3" fill="currentColor"/>',
  nachhall:'<circle cx="6" cy="12" r="2.4" fill="currentColor"/><path d="M10.2 7.6a6.2 6.2 0 0 1 0 8.8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M14.2 5a9.9 9.9 0 0 1 0 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" opacity=".62"/><path d="M18.2 2.6a13.6 13.6 0 0 1 0 18.8" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity=".34"/>',
  // Auslese-Module: Jede Karte trägt ein eigenes Symbol.
  funkenkranz:'<path d="M5 6a8 8 0 0 1 14 2M19 18a8 8 0 0 1-14-2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="m4 4 3 3-3 3-3-3zm16 10 3 3-3 3-3-3z" fill="currentColor"/><path d="M12 8v8M8 12h8" stroke="currentColor" stroke-width="1.5" opacity=".5"/>',
  brandspur:'<path d="M5 21c-5-5 5-5 2-9M11 21c-4-4 4-5 2-9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M16 2c1 4 5 5 5 9a5 5 0 0 1-10 0c0-2 1-4 3-6v5c3-2 3-5 2-8z" fill="currentColor"/>',
  klingenteilung:'<path d="M12 4a8 8 0 1 1-6.93 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M4.2 4.6v4.2h4.2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 20a8 8 0 0 0 6.93-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity=".55"/><path d="M19.8 19.4v-4.2h-4.2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity=".55"/>',
  taktschlag:'<circle cx="12" cy="12" r="2.2" fill="currentColor"/><circle cx="12" cy="12" r="6.4" fill="none" stroke="currentColor" stroke-width="1.8" opacity=".75"/><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.5" opacity=".4"/>',
  nachfassen:'<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.4" stroke-dasharray="2 3" opacity=".5"/><path d="M12 3a9 9 0 0 1 6.36 15.36" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round"/>',
  glasklinge:'<path d="M12 2 19 9 12 22 5 9z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M12 2v20M5 9h14M9 9 12 2M15 9 12 2" stroke="currentColor" stroke-width="1" opacity=".55"/>',
  kurzschluss:'<path d="M12 19.2s-6.4-4.1-6.4-8.6A3.7 3.7 0 0 1 12 7.7a3.7 3.7 0 0 1 6.4 2.9c0 1-.3 2-.9 2.9" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.4 7.6 9 14h3l-1 4.6 5.6-7.6H13z" fill="currentColor"/>'
};
function svg(paths){ return `<svg class="card-icon" viewBox="0 0 24 24" aria-hidden="true">${paths}</svg>`; }

// Pip-Reihe für die kompakten Stufenanzeigen in Codex und Hangar.
function pipsHTML(level, max=MAX_ABIL_LEVEL){
  let s='<span class="pips">';
  for(let i=1;i<=max;i++) s+=`<i class="pip ${i<=level?'on':''}"></i>`;
  return s+'</span>';
}
/* Mehrere Stufen auf einmal werden gesammelt. Regulär entstehen höchstens 15 Punkte;
   danach steigen Level und XP weiter, ohne den Welle-30-Build aufzuweichen. Im
   Endlosmodus ersetzt Rang 3 tote Punkte durch einen kurzen, nicht stapelbaren Impuls. */
function triggerEndlessLevelImpulse(){
  if(treeRang('echo_blade')>=3){
    treeFlags.echoBladeImpulseUntil=Date.now()+5000;
    return 'Klingenecho pulsiert';
  }
  if(treeRang('echo_power')>=3){
    treeFlags.echoPowerCharge=1;
    treeFlags.echoPowerChargeUntil=Date.now()+5000;
    return 'Machtecho geladen';
  }
  return '';
}
function checkLevelUp(){
  let neuePunkte=0, neueLevel=0, impulse=false;
  while(player.xp >= player.xpNeed){
    player.xp-=player.xpNeed; player.level++; player.xpNeed=Math.round(CONFIG.xpBase + player.level*CONFIG.xpPerLevel);
    neueLevel++;
    if(!regularTreeFrozen && regularPointsEarned<REGULAR_POINT_CAP){
      regularPointsEarned++; skillPoints++; neuePunkte++;
    } else if(regularTreeFrozen && (treeRang('echo_blade')>=3||treeRang('echo_power')>=3)) impulse=true;
  }
  if(neueLevel){
    const echoText=impulse?triggerEndlessLevelImpulse():'';
    // Erst automatisch freischalten, dann berichten, was tatsächlich passiert ist.
    const frei=neuePunkte?autoFreischalten():[];
    let text;
    if(frei.length) text=frei.join(' · ');
    else if(skillPoints>0) text='Wähle deinen Weg';
    else text=echoText||'Nichts Neues';
    announce('Level '+player.level, text, '#ffd257');
    pushFloat(player.x,player.y-38,frei.length?frei[0]:text,'#ffd257',1.15);
    if(sfx) sfx('levelup');
    updateTreeButton(); updateHUD(true);
    if(skillPoints>0) oeffneWeichenAuslese();
  }
}
function metaLevel(id){ return (save.meta&&save.meta[id])||0; }
function metaValue(id){ return metaLevel(id); }
function metaPrice(id){
  const m=META_UPGRADES.find(u=>u.id===id); if(!m) return 0;
  if(m.blueprint && isEarned(m.blueprint[0],m.blueprint[1])) return Math.ceil((m.base/3)/50)*50;
  return m.base;
}
let metaShopReturn='start';
function openMetaShop(from){
  metaShopReturn=from||'start';
  (metaShopReturn==='gameover'? overlayOver : metaShopReturn==='hangar'?document.getElementById('overlay-hangar'):overlayStart).classList.add('hidden');
  renderMetaShop();
  document.getElementById('overlay-metashop').classList.remove('hidden');
}
function closeMetaShop(){
  document.getElementById('overlay-metashop').classList.add('hidden');
  (metaShopReturn==='gameover'? overlayOver : overlayStart).classList.remove('hidden');
}
function renderMetaShop(){
  document.getElementById('metashop-stars').textContent=save.stars;
  const grid=document.getElementById('metashop-grid'); grid.innerHTML='';
  let gruppe='';
  for(const u of META_UPGRADES){
    if(u.gruppe!==gruppe){
      gruppe=u.gruppe; const h=document.createElement('h3'); h.className='shop-gruppe'; h.textContent=gruppe; grid.appendChild(h);
    }
    const lv=metaLevel(u.id), full=lv>0, voraussetzung=!u.req||metaLevel(u.req)>0;
    const price=full? null : metaPrice(u.id);
    const rabatt=u.blueprint&&isEarned(u.blueprint[0],u.blueprint[1])&&!full;
    const c=document.createElement('div'); c.className='shop-card';
    c.innerHTML=`<div class="shop-head">${svg(ICON[u.icon]||'')}<h3>${u.name}</h3></div>
      <p>${u.desc}${!voraussetzung?' <b>Vorheriges Projekt erforderlich.</b>':''}${rabatt?' <b class="blueprint-rabatt">Blaupause gefunden: 67 % Rabatt.</b>':''}</p>
      <button ${(full||!voraussetzung||price>save.stars)?'disabled':''}>${full? '✓ Gebaut' : price+' ◆'}</button>`;
    c.querySelector('button').onclick=()=>{
      if(full || !voraussetzung || price>save.stars) return;
      save.meta[u.id]=1; save.stars-=price; persist();
      if(sfx) sfx('buy'); renderMetaShop();
      // Guthaben kurz aufblitzen lassen, damit der Abzug sichtbar wird
      const gh=document.querySelector('#overlay-metashop .guthaben');
      if(gh){ gh.classList.remove('abgebucht'); void gh.offsetWidth; gh.classList.add('abgebucht'); }
    };
    grid.appendChild(c);
  }
}
document.getElementById('metashop-back').addEventListener('click',closeMetaShop);
document.getElementById('metashop-btn').addEventListener('click',()=>openMetaShop('gameover'));
document.getElementById('hangar-workshop').addEventListener('click',()=>openMetaShop('hangar'));
document.getElementById('hangar-collection').addEventListener('click',()=>openProgress('hangar'));
document.getElementById('workshop-collection-tab').addEventListener('click',()=>{
  document.getElementById('overlay-metashop').classList.add('hidden'); openProgress('start');
});

// Auto attack
// Cooldown-Kreis + kurzer Puls im Moment der Bereitschaft
const wasReady={};
function updateCooldownUI(btn, sweep, cd, max, key){
  if(!btn||!sweep||!max||max<=0){
    if(btn) btn.classList.remove('on-cooldown');
    if(sweep) sweep.style.setProperty('--cd-ready','100');
    wasReady[key]=true; return;
  }
  const rest=Math.max(0,Math.min(1,cd/max)), fortschritt=(1-rest)*100;
  sweep.style.setProperty('--cd-ready',fortschritt.toFixed(1));
  const ready=cd<=0;
  btn.classList.toggle('on-cooldown', !ready);
  if(ready && wasReady[key]===false){
    btn.classList.remove('just-ready');
    void btn.offsetWidth;          // Animation neu starten
    btn.classList.add('just-ready');
  }
  wasReady[key]=ready;
}

// Update HUD
function updateHUD(force=false){
  const jetzt=performance.now();
  // DOM-Stiländerungen pro Frame kosten auf Mobilgeräten unnötig Layout und Compositing.
  // 10 Aktualisierungen pro Sekunde sind für Balken und Zahlen flüssig genug.
  if(!force && jetzt<naechstesHudUpdate) return;
  naechstesHudUpdate=jetzt+CONFIG.render.hudIntervall;
  if(PERF_DEBUG){ const debug=document.getElementById('orbit-slice-debug'); if(debug) debug.textContent=JSON.stringify(orbitSliceState()); }
  const pct=Math.max(0, player.hp/player.maxHp*100);
  synchronisiereFokus();
  healthBar.style.width=pct+'%';
  if(healthWrap) healthWrap.classList.toggle('leerenklinge',hatLeerenhunger());
  // Barriere liegt als eigenes Segment rechts auf der Leiste — sichtbar getrennt
  // von den Trefferpunkten, weil sie sich anders verhält.
  if(barrierBar){
    const bp=Math.max(0, Math.min(100, barriere/player.maxHp*100));
    barrierBar.style.width=bp+'%';
    barrierBar.classList.toggle('an', barriere>0.5);
  }
  healthText.textContent=Math.ceil(player.hp)+' / '+player.maxHp+(barriere>0.5? '  +'+Math.round(barriere) : '');
  xpBar.style.width=(player.xp/player.xpNeed*100)+'%';
  xpText.textContent='Level '+player.level+' · '+player.xp+' / '+player.xpNeed+' XP';
  coinText.textContent='◆ '+player.stars;
  // Fokus sitzt an der Hauptmacht statt als vierter Balken im linken HUD.
  if(btnWirbel){
    const ziel=fokusZiel(), wert=fokusBereit?ziel:Math.floor(fokus), prozent=Math.min(100,wert/ziel*100);
    btnWirbel.style.setProperty('--focus',prozent.toFixed(1));
    btnWirbel.classList.toggle('focus-ready',fokusBereit);
    const f=btnWirbel.querySelector('.focus-value'); if(f) f.textContent=fokusBereit?'1 · FOKUS':'1 · F '+wert+'/'+ziel;
    const cs=btnWirbel.querySelector('.crown-series'); if(cs) cs.textContent=treeFlags.kronenform==='praez'?'▰'.repeat(praezSerie)+'···'.slice(Math.min(3,praezSerie)):'';
    const macht=ABILITIES[activeSlot1]?.name||'Hauptmacht';
    btnWirbel.setAttribute('aria-label',macht+' · Taste 1 · '+(fokusBereit?'Fokus bereit':'Fokus '+wert+' von '+ziel));
  }
}

// Game over
/* Fragmente eines Laufs aufs Konto buchen. Das passierte früher NUR beim Tod — wer
   aus der Pause neu startete, verlor alles Gesammelte kommentarlos, obwohl überall
   sonst gilt: Fragmente verfallen nicht. Jetzt geht jeder Weg aus einem Lauf hier
   durch, und `player.stars` wird geleert, damit nichts doppelt gutgeschrieben wird. */
function bucheFragmente(){
  const verdient=player.stars;
  if(verdient>0){ save.stars+=verdient; player.stars=0; persist(); }
  return verdient;
}
/* SIEG — der Moment, den das Spiel bisher nicht hatte. Danach steht der Endlosmodus
   offen, aber als Entscheidung des Spielers, nicht als Zustand ohne Ausweg. */
let endlosLauf=false;
function ensureFinalRegularBudget(){
  if(regularTreeFrozen || regularPointsEarned>=REGULAR_POINT_CAP) return 0;
  const fehlend=REGULAR_POINT_CAP-regularPointsEarned;
  regularPointsEarned=REGULAR_POINT_CAP; skillPoints+=fehlend;
  return fehlend;
}
function updateSiegEndlosButton(){
  const btn=document.getElementById('sieg-weiter'); if(!btn) return;
  btn.textContent=skillPoints>0?'Orbit abschließen · '+skillPoints+' '+(skillPoints===1?'Punkt':'Punkte'):'Build einfrieren & Endlos';
  const freeze=document.getElementById('sieg-einfrieren');
  if(freeze) freeze.classList.toggle('hidden',!(skillPoints>0&&treeRang('orbit_crown')>0));
}
function sieg(){
  const finalePunkte=ensureFinalRegularBudget();
  state='sieg'; setMusicLevel();
  updateTreeButton();
  recordBest();
  // Prüfstufen schalten sich durch Sieg frei, nicht durch Kauf: Standard/Meister
  // schalten Stufe 1 frei, ein Sieg auf Stufe N schaltet N+1 frei (gedeckelt), aber
  // nur wenn die gespielte Stufe bereits die höchste freigeschaltete war — ein Sieg
  // auf einer längst übertroffenen Stufe darf pruefFrei nicht zurückdrehen oder erneut
  // "freischalten". Ein Messlauf ist keine Leistung (siehe recordBest()) und schaltet
  // nichts frei.
  let neuFrei=null;
  if(!messlauf){
    const id=hilfeId();
    let n=0;
    if(id==='standard'||id==='meister') n=1;
    else { const idx=pruefstufeIndex(id); if(idx>=0) n=Math.min(PRUEFSTUFEN.length, idx+2); }
    if(n>(save.pruefFrei||0)){ save.pruefFrei=n; neuFrei=PRUEFSTUFEN[n-1]; }
  }
  const verdient=bucheFragmente();
  const tagesLohn=tagesAbschluss();
  const ersterSieg=!save.gewonnen;
  save.gewonnen=true; save.endlosFrei=true; persist();
  document.getElementById('sieg-text').innerHTML=
    (ersterSieg? '<b>Zum ersten Mal!</b><br>' : '')+
    `Du hast den Zerbrochenen Mond bezwungen — auf <b>${hilfe().name}</b>.<br>`+
    `Level ${player.level} · Orbitpfad abgeschlossen`+
    (finalePunkte? `<br><b style="color:var(--gold)">+${finalePunkte} Finale-${finalePunkte===1?'Punkt':'Punkte'}</b> · Orbit jetzt abschließen` : '')+
    (neuFrei? `<br><b style="color:var(--gold)">${neuFrei.name} freigeschaltet</b> · ${neuFrei.kurz}` : '')+
    (verdient>0? `<br><b style="color:var(--gold)">+${verdient} ◆</b> Fragmente` : '')+
    (tagesLohn? `<br><b style="color:var(--accent)">Tageslauf geschafft${tagesLohn}</b>` : '');
  hideAll();
  document.getElementById('overlay-sieg').classList.remove('hidden');
  renderOrbitauftrag();
  updateSiegEndlosButton();
  if(sfx){ sfx('unlockBig'); setTimeout(()=>sfx('levelup'), 260); }
}
function grantEchoMilestone(target,openAfter=false){
  if(!regularTreeFrozen || target<=echoMilestones) return;
  const neu=Math.min(3,target)-echoMilestones;
  if(neu<=0) return;
  echoMilestones+=neu; echoPoints+=neu;
  announce(target===1?'Endlosresonanz':'Echo-Rang bereit',target===1?'Wähle Klinge oder Macht':'Ein neuer mechanischer Rang wartet','#c77dff');
  if(sfx)sfx('levelup'); updateTreeButton();
  // Rang 1 ist die Wahl Klingenecho/Machtecho und geht ueber die Auslese.
  // Rang 2 und 3 sind keine Wahl mehr — die nimmt die Automatik.
  autoFreischalten();
  if(state==='playing') oeffneWeichenAuslese();
}
// Nach dem Sieg weiterspielen: erst verteilen, dann Build unveränderlich einfrieren.
function startEndlosmodus(restVerwerfen=false){
  if(state!=='sieg') return;
  // Restpunkte in die Kette schieben, BEVOR eingefroren wird — danach sind
  // regulaere Knoten gesperrt. Bleibt eine Weiche offen, holt der Sicherungs-
  // aufruf in startWave() sie nach, sobald state wieder 'playing' ist.
  autoFreischalten();
  if(!treeRang('orbit_crown')) return;
  document.getElementById('overlay-sieg').classList.add('hidden');
  if(restVerwerfen) skillPoints=0;
  regularTreeFrozen=true; treeUndo=null; skillPoints=0; endlosLauf=true;
  state='playing'; setMusicLevel();
  renderOrbitauftrag();
  wave++; startWave();
  grantEchoMilestone(1,true);
}
function endlosWeiter(){ startEndlosmodus(false); }
function gameOver(){
  state='gameover'; if(sfx) sfx('gameover');
  setMusicLevel();
  updateTreeButton();
  recordBest();
  const tagesLohn=tagesAbschluss();
  const earned=bucheFragmente();
  const best=bestFuer();
  document.getElementById('gameover-stats').innerHTML=
    `Erreicht: <b>Welle ${wave}</b> · Level ${player.level}<br>`+
    (earned>0? `<b style="color:var(--gold)">+${earned} ◆</b> Fragmente · ${save.stars} ◆ insgesamt<br>`:'')+
    (tagesLohn? `<b style="color:var(--accent)">Tageslauf geschafft${tagesLohn}</b><br>`:'')+
    `<span style="color:var(--muted)">Bestmarke: Welle ${best}</span>`;
  renderOrbitauftrag();
  overlayOver.classList.remove('hidden');
}

// Loop
function update(dt){
  if(state!=='playing') return;
  /* Hitstop: In den größten Momenten (Ketten, Bosswechsel) steht die Simulation für
     wenige Millisekunden still — der Treffer bekommt Gewicht. dt=0 friert alles
     Simulierte, Date.now()-Effekte laufen weiter, was bei so kurzen Fenstern unsichtbar bleibt. */
  if(hitstopMs>0){ hitstopMs-=dt; dt=0; }
  if(kettenZahl&&Date.now()>kettenBis) kettenZahl=0;
  musicTick(dt);
  // cooldowns (aktive Fähigkeiten) + Cooldown-Anzeige auf den Buttons
  for(const id of ACTIVE_IDS) if(activeCd[id]>0) activeCd[id]=Math.max(0, activeCd[id]-dt);
  updateCooldownUI(btnWirbel, cdWirbel, activeCd[activeSlot1]||0, activeCdMax(activeSlot1), 'a');
  perfMark('cooldowns');

  // Bewegung – Spieler läuft frei durch die Welt, Kamera hält ihn zentriert
  const w=canvas.clientWidth || window.innerWidth, h=canvas.clientHeight || window.innerHeight;
  let ix=moveVec.x, iy=moveVec.y;
  if(keys['w']||keys['arrowup'])    iy-=1;
  if(keys['s']||keys['arrowdown'])  iy+=1;
  if(keys['a']||keys['arrowleft'])  ix-=1;
  if(keys['d']||keys['arrowright']) ix+=1;
  const mlen=Math.hypot(ix,iy);
  if(mlen>1){ ix/=mlen; iy/=mlen; }          // Diagonale nicht schneller; Joystick bleibt analog
  const pspeed=CONFIG.playerBaseSpeed*(1+bonuses.speed)*(moveBoostUntil>Date.now()?1.25:1)*figur().tempo*tagesFaktor('tempo');
  player.x += ix*pspeed*dt/1000;
  player.y += iy*pspeed*dt/1000;
  const moved=Math.hypot(player.x-orbitLastX,player.y-orbitLastY);
  orbitLastX=player.x; orbitLastY=player.y;
  if(figur().id==='held'){
    orbitRoundDistance=Math.min(110,orbitRoundDistance+moved);
    if(moved>0 && orbitRoundDistance>=110) orbitRoundLight=true;
  }
  // Lebensregeneration (schwächer auf höheren Schwierigkeiten) + Meta-Upgrade
  // Sprung ab Stufe 4 beim Lebensregen: heilt nicht mehr nur pro Kill, sondern laufend
  const regenAbil = (hatSprung('lebensregen')? 1.6 : 0) + (bonuses.regen||0);
  if(player.hp<player.maxHp) player.hp = Math.min(player.maxHp, player.hp + (curDiff().regen + regenAbil)*dt/1000);
  // Lauf-Animation: Bobbing + dezenter Partikel-Trail
  const moving = mlen>0.01;
  player.bobPhase = moving ? (player.bobPhase||0)+dt*0.014 : 0;
  if(moving){
    player.trailT=(player.trailT||0)-dt;
    if(player.trailT<=0){ player.trailT=75; particles.push({x:player.x-ix*24, y:player.y-iy*24, vx:(Math.random()-0.5)*40, vy:(Math.random()-0.5)*40, life:0.3, max:0.4, color:metaLevel('spurenlabor')?currentSkin().blade:'rgba(110,200,255,0.5)', size:2}); }
  }
  // Plasmaklinge rotiert permanent um den Spieler
  const fehlendesLeben=1-player.hp/player.maxHp;
  /* Leerenhunger war seinen Preis nicht wert: Die Leerenklinge hat dauerhaft 19 %
     weniger Leben (167 statt 205), bekam dafür bei halbem Leben aber nur +6 % Schaden
     und bei 20 % Leben +11 % — gemessen gegen den Lichthüter. Ein Fünftel der
     Lebensleiste für sechs Prozent ist kein Risiko-Charakter, sondern ein schlechter
     Handel. Beide Hälften des Passivs sind deshalb angezogen. */
  const leerenTempo=hatLeerenhunger() ? 1+fehlendesLeben*0.45 : 1;
  const vorSwordAngle=swordAngle;
  swordAngle += CONFIG.swordSpinSpeed * (1 + bonuses.fireRate*0.6) * leerenTempo * (sonnenTempoUntil>Date.now()?1.22:1) * dt/1000;
  if(swordAngle>Math.PI*2){ swordAngle-=Math.PI*2; resetMissedOrbit(); }
  player.face = swordAngle;
  // Ein Mal pro Takt, auch mit mehreren Klingen. Weltposition bleibt nach dem Setzen fest.
  if(runModule.brandspur && dt>0){
    const B=CONFIG.brandspur, rang=runModule.brandspur-1;
    brandspurCd-=dt;
    if(brandspurCd<=0){
      brandspurCd+=B.interval;
      if(powerFields.filter(f=>f.kind==='brandspur').length>=B.cap){
        const alt=powerFields.findIndex(f=>f.kind==='brandspur');
        powerFields.splice(alt,1);
      }
      const tip=player.radius+bladeLength(), life=B.life[rang];
      powerFields.push({kind:'brandspur',x:player.x+Math.cos(swordAngle)*tip,y:player.y+Math.sin(swordAngle)*tip,
        ang:swordAngle,r:B.radius[rang],t:life,max:life,tick:0,
        dmg:B.dmg*(1+bonuses.dmg),color:'#ff9c42'});
    }
  }
  // Effekt-Timer
  if(stossWaveT>0){ stossWaveT -= dt/380; if(stossWaveT<0) stossWaveT=0; }
  if(wirbelT>0){ wirbelT -= dt/420; if(wirbelT<0) wirbelT=0; }
  perfMark('spieler');
  // Schwert-Treffer: Rundum-Grundschaden + Bonus dort, wo die Klinge wirklich ist
  spinHitTimer -= dt;
  if(spinHitTimer<=0){
    spinHitTimer = CONFIG.spinHitInterval;
    const bladeLen = bladeLength();
    if(barriere>0 && treeFlags.leuchtfeuer && powerFields.filter(f=>f.kind!=='brandspur').length<14 && powerFields.filter(f=>f.kind==='lightTrail').length<6){
      const ta=swordAngle, tx=player.x+Math.cos(ta)*(player.radius+bladeLen), ty=player.y+Math.sin(ta)*(player.radius+bladeLen);
      powerFields.push({kind:'lightTrail',x:tx,y:ty,r:28,t:260,tick:0,color:'#ffd257',shown:false});
    }
    const boost = dmgBoostUntil>Date.now()?2:1;
    const resonanz=treeFlags.resonanzUntil>Date.now()?1.25:1;
    const dmgBase = Math.round(CONFIG.spinDamage * (1+bonuses.dmg) * boost * resonanz * tagesFaktor('klinge'));
    const leerenBonus=hatLeerenhunger() ? fehlendesLeben*(0.78+(treeFlags.leerenRisikoBonus||0)) : 0;
    const anglesNow=bladeAngles();
    const sweetTargets=enemies.filter(en=>{
      const dx=en.x-player.x,dy=en.y-player.y,d=Math.hypot(dx,dy);
      return d<player.radius+bladeLen+en.radius && anglesNow.some(a=>angleDiff(a,Math.atan2(dy,dx))<sweetArcHalf());
    });
    const tickSweet=sweetTargets.length>0;
    // Lichtbund ist absichtlich vom Orbitimpuls entkoppelt: Wird die Ladung nach
    // dem ersten Sweet derselben Runde voll, verstärkt bereits der nächste Sweet-Tick.
    const lightTick=figur().id==='held' && tickSweet && orbitRoundLight;
    // Schnappschuss VOR orbitSweetPulse(): So kann der Treffer, der die Serie erst auf drei
    // bringt und den Durchschlag laedt, ihn nicht im selben Tick auch schon entladen — das
    // waere kein "naechster" Volltreffer mehr, sondern derselbe.
    const durchschlagVorTick = treeFlags.kronenform==='praez' && !!treeFlags.durchschlagBereit;
    if(tickSweet && !orbitRoundSweet) orbitSweetPulse();
    const dmgArc  = Math.round((CONFIG.spinDamage+CONFIG.spinArcBonus) * (1+bonuses.dmg) * boost * resonanz * (1+leerenBonus) * sweetKlingenFaktor() * (lightTick?1.35:1) * tagesFaktor('klinge'));
    if(lightTick){ orbitRoundDistance=0; orbitRoundLight=false; if(PERF_DEBUG)treeFlags.debugLichtbund=(treeFlags.debugLichtbund||0)+1; pushFloat(player.x,player.y-38,'LICHTBUND ×1.35','#ffd257',1.05); }
    for(const en of enemies){
      const dx=en.x-player.x, dy=en.y-player.y;
      const d = Math.hypot(dx,dy);
      // Die Klinge wird ab dem Spielerrand gezeichnet (player.radius..player.radius+bladeLen).
      // Der Spieler-Radius muss deshalb mitgerechnet werden — sonst blieben die äußeren
      // 18 px der sichtbaren Klinge wirkungslos.
      if(d >= player.radius + bladeLen + en.radius) continue;
      // Trifft eine der Klingen den Gegner gerade wirklich?
      const toEnemy = Math.atan2(dy,dx);
      let trefferIndex=-1;
      for(let bi=0;bi<anglesNow.length;bi++) if(angleDiff(anglesNow[bi],toEnemy)<sweetArcHalf()){trefferIndex=bi;break;}
      const treffer=trefferIndex>=0;
      let dmg = treffer ? dmgArc : dmgBase;
      /* Glasklinge: hebt JEDEN Klingentreffer, nicht nur Sweet Hits. Die erste Fassung
         entfernte stattdessen die Rundumzone und sollte Präzision belohnen — gemessen
         war sie bei jeder Zielzahl schlechter als gar keine Karte (60–65 % auf Rang 1,
         78–85 % auf Rang 2), und zwar unabhängig davon, wie die Gegner standen. Grund:
         Die Klinge rotiert permanent und überstreicht ohnehin jeden Winkel — Präzision
         ist hier keine Achse, auf der man handeln kann. Der Preis sitzt jetzt beim
         Leben, wo er sichtbar und tatsächlich eine Entscheidung ist. */
      if(runModule.glasklinge) dmg = Math.round(dmg * (runModule.glasklinge>=2 ? 1.8 : 1.45));
      /* Panzergegner holen die Formentscheidung spät im Lauf zurück: Präzisions-Sweet
         und Schneide Rang 4 durchschlagen, Doppelorbit bezahlt seine sichere Abdeckung
         mit gedämpftem Schaden. Bewusst NICHT unverwundbar — auf „Entdecker" kommen
         55 % durch, sonst wäre es für ein Kind eine Wand statt einer Aufgabe. Aktive
         Mächte gehen ohnehin durch die Panzerung. */
      // Schneide: belohnt genau das Treffen der Zone, statt Schaden pauschal zu heben
      if(treffer && runAbilities.schneide){
        dmg = Math.round(dmg * (1 + CONFIG.schneide.proStufe*runAbilities.schneide));
      }
      // Präzisions-Sweet und Schneide Rang 4 durchschlagen Panzer vollständig.
      // Doppelorbit bezahlt seine Verlässlichkeit: Seine Sweet Hits werden von
      // aktiver Panzerung weiterhin gedämpft. Glasklinge Rang 2 und ein verbreiterter
      // Nachfassen-Treffer (Rang 2) durchschlagen ebenfalls.
      const durchschlag = runAbilities.schneide>=SPRUNG_STUFE || !!(treeFlags.singularorbit && treffer)
        || !!(runModule.nachfassen>=2 && nachfassenBereit && treffer);
      const abgeprallt = en.panzer && !(en.panzerAusUntil>Date.now()) && !durchschlag;
      if(abgeprallt) dmg = Math.max(1, Math.round(dmg*hilfe().panzerDurchlass*((laufEreignis&&laufEreignis.durchlassMult)||1)));
      en.hp -= dmg;
      if(treffer){
        if(hatSprung('phaser')) fireBladePhaser(anglesNow[trefferIndex]);
        tutorialSweetSpotTreffer();
        if(en.panzer) orbitFortschritt('panzer_sweet');
        handleBladeModuleSweet(en,toEnemy,dmg);
        handleBladeEchoSweet(en,toEnemy,dmg);
        handleOrbitCrownSweet(en,toEnemy,trefferIndex);
        // Orbitkrone (Präzisionsorbit): war der Durchschlag schon VOR diesem Tick geladen
        // (durchschlagVorTick), entlädt ihn der erste Volltreffer dieses Ticks. Die Funktion
        // löscht das Flag selbst, ein zweiter Treffer im selben Tick kann also nicht doppelt
        // auslösen — und der ladende dritte Serientreffer selbst kann es nicht vorzeitig tun.
        if(durchschlagVorTick && treeFlags.durchschlagBereit) triggerDurchschlag(anglesNow[trefferIndex],dmg);
        if(en.shockMarkUntil>Date.now()){
          const bonus=Math.round(dmg*.38); en.hp-=bonus; en.shockMarkUntil=0;
          if((treeFlags.powerMaster||0)>=2) en.stunT=Math.max(en.stunT||0,520);
          addBolt(player.x,player.y,en.x,en.y); pushFloat(en.x,en.y-34,'ENTLADUNG '+bonus,'#9ad0ff',1.05);
        }
        if(en.gravKernUntil>Date.now() && (treeFlags.powerMaster||0)>=2){
          for(const o of enemies){
            if(o===en)continue; const od=Math.hypot(o.x-en.x,o.y-en.y);
            if(od<125&&od>1){o.x+=(en.x-o.x)/od*34;o.y+=(en.y-o.y)/od*34;}
          }
          particles.push({ring:true,x:en.x,y:en.y,color:'#4de0a0',life:.3,max:.3});
        }
        // Splitter Rang 2 verbindet den Begleiter sichtbar mit der Kernmechanik:
        // jeder dritte Sweet Hit schleudert Energie entlang der Klinge. Rang 3
        // fächert den Rückflug auf und trifft dadurch eine ganze Linie.
        if(runAbilities.splitter>=2 && ++splitterSweetZaehler>=3){
          splitterSweetZaehler=0;
          const slv=runAbilities.splitter, fan=slv>=3?[-.22,0,.22]:[0];
          for(const off of fan){
            const a=toEnemy+off;
            pShots.push({x:player.x+Math.cos(a)*28,y:player.y+Math.sin(a)*28,vx:Math.cos(a)*470,vy:Math.sin(a)*470,
              dmg:Math.round(CONFIG.abil.splitterDamage*(slv>=3?2.2:1.8)),life:1.0,hitsLeft:slv>=3?2:1,storm:true});
          }
          pushFloat(en.x,en.y-34,'SPLITTER!','#9ad0ff',1.1); if(sfx)sfx('laserPlayer');
        }
        // Nachhall: jeder n-te Zonentreffer löst eine kleine Druckwelle aus
        if(runAbilities.nachhall){
          const nlv=runAbilities.nachhall;
          const alle = nlv>=SPRUNG_STUFE? 3 : CONFIG.nachhall.alle;
          if(++nachhallZaehler>=alle){
            nachhallZaehler=0;
            const nd=Math.round(CONFIG.nachhall.dmg*abilScale(nlv)*(1+bonuses.dmg));
            let nachTreffer=0;
            for(const o of enemies){
              if(Math.hypot(o.x-en.x,o.y-en.y) < CONFIG.nachhall.radius+o.radius){
                o.hp-=nd; pushFloat(o.x,o.y-14,'-'+nd,'#ffd257');
                nachTreffer++;
                if(nlv>=2 && o!==en){
                  const a=Math.atan2(o.y-player.y,o.x-player.x), rr=player.radius+bladeLength()*.78;
                  o.x=player.x+Math.cos(a)*rr; o.y=player.y+Math.sin(a)*rr;
                }
              }
            }
            particles.push({ring:true, x:en.x, y:en.y, color:'#ffd257', life:0.26, max:0.26});
            if(nlv>=3 && nachTreffer>=3){
              for(const o of enemies) if(Math.hypot(o.x-en.x,o.y-en.y)<CONFIG.nachhall.radius*1.45+o.radius) o.hp-=Math.round(nd*.55);
              particles.push({ring:true,x:en.x,y:en.y,color:'#ffffff',life:.42,max:.42});
            }
            if(sfx) sfx('counter');
          }
        }
      }
      if(abgeprallt){
        spawnParticles(en.x,en.y,'#c8d4e6',3);
        pushFloat(en.x,en.y-16,'abgeprallt','#c8d4e6');
        if(sfx)sfx('armor');
      } else if(treffer){
        // Klingentreffer laut inszenieren: das ist DER Kniff des Spiels und muss man sehen
        en.flashT=1;                                        // Gegner blitzt weiß auf
        spawnParticles(en.x,en.y,'#ffffff',10);
        spawnParticles(en.x,en.y,currentSkin().blade,8);
        sparkRing(en.x,en.y,currentSkin().blade);           // kurzer Funkenring am Treffpunkt
        shake=Math.max(shake,2.5);                           // minimaler Ruck, nur Gefühl
        pushFloat(en.x,en.y-18,dmg+'!', '#ffffff', 1.25);   // größere, weiße Trefferzahl
        if(sfx)sfx('sweet');
      } else {
        spawnParticles(en.x,en.y,'#ffec8b',3);
        pushFloat(en.x,en.y-16,'-'+dmg,'#ffec8b');
        if(sfx)sfx('bladeHit');
      }
      // Kettenblitz: der volle Klingentreffer springt auf den nächsten Gegner über
      if(treffer && runAbilities.kettenblitz){
        const clv=runAbilities.kettenblitz;
        const cDmg=Math.round(CONFIG.abil.chainDamage*abilScale(clv));
        const cR=CONFIG.abil.chainRange*(1+0.05*(clv-1));
        // Sprung ab Stufe 4: der Blitz sucht sich zwei Ziele statt eines
        const ziele=Math.min(3,clv);
        const getroffen=[];
        for(let z=0; z<ziele; z++){
          let best=null, bd=cR;
          for(const o of enemies){
            if(o===en || getroffen.includes(o)) continue;
            const cd=Math.hypot(o.x-en.x,o.y-en.y); if(cd<bd){ bd=cd; best=o; }
          }
          if(!best) break;
          best.hp-=cDmg; addBolt(en.x,en.y,best.x,best.y); pushFloat(best.x,best.y-14,'-'+cDmg,'#9ad0ff');
          getroffen.push(best);
        }
      }
      if(en.hp<=0) continue;
      const ang = Math.atan2(dy,dx);
      const sweetSchub=treeFlags.doppelorbit?16:treeFlags.singularorbit?10:14;
      en.x += Math.cos(ang)*(treffer?sweetSchub:6);
      en.y += Math.sin(ang)*(treffer?sweetSchub:6);
    }
    // Nachfassen: die einmalige Verbreiterung ist verbraucht, sobald sie wirklich traf.
    if(nachfassenBereit && tickSweet) nachfassenBereit=false;
  }
  perfMark('klinge');
  // Beide Begleiter teilen die Liste, aber nie ihren Bestand oder ihre Drehrichtung.
  if(runAbilities.splitter){
    const slv=runAbilities.splitter;
    // Sprung ab Stufe 4: ein dritter Splitter kreist mit — spürbar mehr Dauerschaden
    const anzahl=CONFIG.abil.splitterCount + (slv>=SPRUNG_STUFE? 1 : 0);
    if(shards.filter(s=>s.kind!=='funkenkranz').length!==anzahl){
      shards=shards.filter(s=>s.kind==='funkenkranz');
      for(let i=0;i<anzahl;i++) shards.push({kind:'splitter',ang:i/anzahl*Math.PI*2,cd:0,x:player.x,y:player.y});
    }
    const SR=CONFIG.abil.splitterRadius*(1+bonuses.range*0.4);
    const sDmg=Math.round(CONFIG.abil.splitterDamage*abilScale(slv));
    for(const s of shards){
      if(s.kind==='funkenkranz') continue;
      s.ang += CONFIG.abil.splitterSpeed*dt/1000; s.cd-=dt;
      s.x=player.x+Math.cos(s.ang)*SR; s.y=player.y+Math.sin(s.ang)*SR;
      if(s.cd<=0){
        for(const en of enemies){ if(Math.hypot(en.x-s.x,en.y-s.y)<en.radius+7){ en.hp-=sDmg; spawnParticles(s.x,s.y,'#9ad0ff',2); s.cd=CONFIG.abil.splitterHitCd; break; } }
      }
    }
  } else if(shards.some(s=>s.kind!=='funkenkranz')) shards=shards.filter(s=>s.kind==='funkenkranz');
  if(runModule.funkenkranz){
    const F=CONFIG.funkenkranz, rang=runModule.funkenkranz-1, anzahl=F.count[rang];
    const funken=shards.filter(s=>s.kind==='funkenkranz');
    if(funken.length!==anzahl){
      const phase=funken.length?funken[0].ang:-swordAngle;
      shards=shards.filter(s=>s.kind!=='funkenkranz');
      for(let i=0;i<anzahl;i++) shards.push({kind:'funkenkranz',ang:phase+i/anzahl*Math.PI*2,cd:0,x:player.x,y:player.y});
    }
    const radius=player.radius+bladeLength()+F.radius[rang];
    for(const s of shards){
      if(s.kind!=='funkenkranz') continue;
      s.ang=(s.ang-F.speed*dt/1000)%(Math.PI*2); s.cd-=dt; s.r=radius; s.size=F.hitRadius[rang];
      s.x=player.x+Math.cos(s.ang)*radius; s.y=player.y+Math.sin(s.ang)*radius;
      if(s.cd<=0){
        for(const en of enemies){
          if(Math.hypot(en.x-s.x,en.y-s.y)<en.radius+s.size){
            en.hp-=Math.round(F.dmg[rang]*(1+bonuses.dmg)); s.cd=F.hitCd; break;
          }
        }
      }
    }
  } else if(shards.some(s=>s.kind==='funkenkranz')) shards=shards.filter(s=>s.kind!=='funkenkranz');
  perfMark('splitter');

  // spawn
  if(wave%5!==0){
    spawnTimer+=dt;
    /* Schubweise statt tropfenweise: Der naechste Schub kommt, sobald der Spieler den
       vorigen weitgehend abgeraeumt hat — oder nach schubMaxWarten, damit auch ein
       zoegerlicher Spieler vorankommt. Damit bestimmt die Toetungsrate die Wellendauer. */
    if(waveSpawned < waveEnemiesToSpawn){
      const W=CONFIG.wave;
      const schub=Math.min(W.schubMax, Math.max(W.schubMin, Math.ceil(waveEnemiesToSpawn/8)));
      const abgeraeumt = enemies.length <= Math.ceil(schub*W.schubRest);
      if(abgeraeumt || spawnTimer > W.schubMaxWarten){
        spawnTimer=0;
        const n=Math.min(schub, waveEnemiesToSpawn-waveSpawned);
        for(let k=0;k<n;k++){ enemies.push(makeEnemy(randomEnemyType())); waveSpawned++; }
      }
    }
  }
  // Gegner drängen sich auseinander, statt exakt übereinander zu stapeln.
  // Über ein Raster statt jeder-gegen-jeden: bei 39 Gegnern waren das 741 Vergleiche
  // pro Bild, mit Raster sind es nur noch die aus den acht Nachbarzellen.
  separiereGegner();
  perfMark('separieren');
  // enemies update
  const recycleDist=Math.hypot(w,h)*0.95/weltZoom;   // weit außer Sicht = wird neu positioniert
  for(const en of enemies){
    let dx=player.x-en.x, dy=player.y-en.y; let d=Math.hypot(dx,dy);
    // Dauerhaftes Weglaufen soll die Welle nicht einfrieren: Nachzügler rücken nach
    if(d>recycleDist){
      const a=laufRnd()*Math.PI*2, sd=Math.hypot(w,h)/2/weltZoom+40;
      en.x=player.x+Math.cos(a)*sd; en.y=player.y+Math.sin(a)*sd;
      dx=player.x-en.x; dy=player.y-en.y; d=Math.hypot(dx,dy);
    }
    const modulOrbit=en.moduleOrbitUntil>Date.now();
    if(modulOrbit){
      en.moduleOrbitAngle=(en.moduleOrbitAngle||Math.atan2(en.y-player.y,en.x-player.x))+(en.moduleOrbitDir||1)*2.5*dt/1000;
      // .78 hielt bei 48 px — nur 8 px vor dem Kontaktschaden (40 px). .92 liegt im Trefferband.
      const rr=player.radius+bladeLength()*.92;
      en.x=player.x+Math.cos(en.moduleOrbitAngle)*rr;en.y=player.y+Math.sin(en.moduleOrbitAngle)*rr;
      dx=player.x-en.x;dy=player.y-en.y;d=Math.hypot(dx,dy);
    }
    // Jäger: Rhythmus aus Anrücken/Laden/Rückzug statt festem Stopp-Radius — vorher blieb
    // er ab shootRange (300 px) für immer stehen, weit außerhalb von Klinge (~72 px) und
    // fast jeder Macht. haltNah (115) liegt knapp hinter der Klingenreichweite: wer
    // während des Ladens hineingeht, tötet ihn, riskiert dafür die Position.
    let jaegerRueckwaerts=false;
    if(en.type==='jaeger'){
      if(en.jagdPhase==='an' && d<=CONFIG.jaeger.haltNah) en.jagdPhase='laden';
      // shootCd (bereits Vorframe-Wert) beendet den Rückzug notfalls auch fern von haltFern —
      // sonst bliebe ein verfolgter Jäger dauerhaft rückwärts in der Kartenmitte kleben.
      else if(en.jagdPhase==='zurueck' && (d>=CONFIG.jaeger.haltFern || en.shootCd<=0)) en.jagdPhase='an';
      jaegerRueckwaerts = en.jagdPhase==='zurueck';
    }
    // Distanz-Gegner halten nur noch während des Ladens die Position; zündende Exploder
    // bleiben stehen; Stun (Nova) friert ein.
    const keepRange = en.type==='jaeger' && en.jagdPhase==='laden';
    if(d>1 && !modulOrbit && !keepRange && !en.exploding && !(en.stunT>0) && !(en.type==='boss' && en.ramT>0) && !(en.type==='boss' && en.phaseT>0)){
      const langsam=en.slowT>0?.55:1, erholung=en.ramRecoverT>0?.32:1;
      const richtung = jaegerRueckwaerts ? -1 : 1;
      en.x+=richtung*dx/d*en.speed*langsam*erholung*dt/1000;en.y+=richtung*dy/d*en.speed*langsam*erholung*dt/1000;
    }
    // attack if close
    if(!en.exploding && !(en.stunT>0) && !(en.type==='boss'&&en.ramT>0) && d < en.radius + player.radius + 4){
      if(en.hitCd<=0){
        if(hurtPlayer(en.dmg)) return;
        en.hitCd=700;
      }
    }
    if(en.hitCd>0) en.hitCd-=dt;
    if(en.flashT>0){ en.flashT-=dt/120; if(en.flashT<0) en.flashT=0; }   // Aufblitzen nach Klingentreffer
    if(en.stunT>0) en.stunT-=dt;
    if(en.slowT>0) en.slowT-=dt;
    if(en.ramRecoverT>0) en.ramRecoverT-=dt;
    // Jäger (Distanz-Angreifer): lädt nur noch in Phase 'laden' sichtbar auf, sonst würde
    // er beim Anrücken schon unsichtbar vorladen. Schussmechanik selbst unverändert.
    if(en.type==='jaeger'){
      en.shootCd=(en.shootCd||0)-dt;
      if(en.jagdPhase==='laden' && en.shootCd<=0 && !(en.stunT>0)){
        en.chargeT=(en.chargeT||0)+dt;
        if(en.chargeT>=CONFIG.jaeger.chargeMs){
          en.chargeT=0; en.shootCd=CONFIG.jaeger.cooldown;
          const nx=dx/d, ny=dy/d;
          shots.push({x:en.x+nx*en.radius, y:en.y+ny*en.radius, vx:nx*CONFIG.shots.speed, vy:ny*CONFIG.shots.speed,
            dmg:en.dmg, color:en.color, r:CONFIG.shots.radius, life:CONFIG.shots.life});
          if(sfx) sfx('laserEnemy');
          en.jagdPhase='zurueck';   // nach dem Schuss Raum gewinnen statt sofort weiterzuladen
        }
      } else { en.chargeT=0; }
    }
    // Boss: Fähigkeiten mit Vorwarnung – je später die Welle, desto mehr; „Schüler" sieht die heftigen später
    if(en.type==='boss'){
      /* Phasenwechsel bei 50 % Leben: kurze Unverwundbarkeit. Es gibt keine zentrale
         Schadensfunktion — 32 Stellen ziehen direkt von en.hp ab. Deshalb wird der
         Schaden hier zentral zurückgesetzt, solange phaseT läuft; das betrifft auch
         den Finalboss, der denselben Boss-Code nutzt (nur mit 2,2× Leben). */
      if(en.phaseT>0){
        if(en.hp<en.hpDavor) en.hp=en.hpDavor;
        en.phaseT-=dt;
        if(en.phaseT<0) en.phaseT=0;
      } else if(!en.phase2 && en.hp>0 && en.hp/en.maxHp<=0.5){
        en.phase2=true; en.phaseT=900; en.hpDavor=en.hp;
        const bk=BOSS_KINDS.find(k=>k.id===en.kind)||BOSS_KINDS[0];
        announce(bk.name+' — Phase 2', 'Er wird gefährlicher', en.color||bk.color);
        spawnParticles(en.x,en.y,en.color||bk.color,22); shake=Math.max(shake,10);
        hitstop(90);   // der Phasenwechsel soll einen Moment stehen bleiben
      }
      // Brutknoten-Heilung: 0,6 % Bossleben/s je lebendem Knoten — der Raumhebel, der
      // reines Ankleben im sicheren Band bestraft. Läuft unabhängig von Stun/phaseT,
      // die Knoten selbst kennen keine Unverwundbarkeit.
      /* Gedeckelt wird die GESAMTE Heilung bei 1,2 %/s, nicht die Zahl der zählenden
         Knoten. Nachgemessen mit einem Spieler, der die Knoten dauerhaft ignoriert und
         nur am Boss klebt: bei ungedeckelten 1,8 %/s (drei Knoten in Phase 2) kippte
         Welle 30 von Nettoschaden auf Nettoheilung und wurde nie besiegt. Ein Deckel auf
         die Knotenzahl hätte denselben Effekt, aber der dritte Knoten wäre wirkungslose
         Deko — und die pulsierende Leitung zu ihm würde den Spieler belügen. So trägt
         jeder sichtbare Knoten bei, nur eben mit kleinerem Anteil. */
      const lebendeKnoten=enemies.reduce((n,o)=>n+((o.brutknoten&&o.hp>0)?1:0),0);
      const heilRate=Math.min(0.012, 0.006*lebendeKnoten);
      if(lebendeKnoten>0 && en.hp<en.maxHp) en.hp=Math.min(en.maxHp, en.hp+en.maxHp*heilRate*dt/1000);
      if(en.stunT>0){ en.stunT-=dt; en.warnT=0; en.shockFx=0; }   // Nova-Stun unterbricht jede Boss-Aktion
      else if(en.phaseT>0){ en.warnT=0; en.shockFx=0; }           // Unverwundbarkeit: steht still, startet nichts
      else {
      if(en.ramT>0){                                             // Ramme: geradliniger Sprint mit Trefferschaden
        en.ramT-=dt;
        en.x+=Math.cos(en.ramDir)*CONFIG.boss.ramSpeed*dt/1000;
        en.y+=Math.sin(en.ramDir)*CONFIG.boss.ramSpeed*dt/1000;
        // Brandspur: alle ~90 ms ein Brandfeld an der aktuellen Position — verknappt den Fluchtraum
        en.brandTick=(en.brandTick||0)-dt;
        if(en.brandTick<=0){
          en.brandTick=90;
          if(bossHazards.length<40) bossHazards.push({kind:'brand',x:en.x,y:en.y,r:34,until:en.phase2?5000:4000,dmg:6,farbe:'#ff7a3d',tick:0});
        }
        const rd=Math.hypot(player.x-en.x,player.y-en.y);
        if(rd<en.radius+player.radius+6){ if(hurtPlayer(Math.round(en.dmg*0.65))) return; en.ramT=0; en.ramRecoverT=CONFIG.boss.ramRecovery; }
        if(en.ramT<=0){ en.ramRecoverT=Math.max(en.ramRecoverT,CONFIG.boss.ramRecovery); en.bossPhase='cooldown'; en.bossTimer=0; }
      }
      if(en.schildT>0){                                          // Spiegelschild: dreht sich langsam zur Spielerseite
        en.schildT-=dt;
        const ziel=Math.atan2(player.y-en.y, player.x-en.x);
        const dreh=Math.atan2(Math.sin(ziel-en.schildDir),Math.cos(ziel-en.schildDir));
        const maxDreh=1.1*dt/1000;                                // Deckel: bei 175 px/s Lauftempo umrundbar — nicht verändern
        en.schildDir+=Math.max(-maxDreh,Math.min(maxDreh,dreh));
        const pdx=player.x-en.x, pdy=player.y-en.y, pd=Math.hypot(pdx,pdy);
        const bogen=en.phase2?Math.PI/2:(70*Math.PI/180);
        const winkel=Math.atan2(pdy,pdx)-en.schildDir;
        const awinkel=Math.atan2(Math.sin(winkel),Math.cos(winkel));
        if(pd>0.001 && pd<110 && Math.abs(awinkel)<=bogen){
          // Verdrängt kräftig nach außen; blockiert keinen Schaden — Verdrängung ist der Raumhebel
          player.x+=pdx/pd*420*dt/1000; player.y+=pdy/pd*420*dt/1000;
          en.schildHitCd=(en.schildHitCd||0)-dt;
          if(en.schildHitCd<=0){ en.schildHitCd=500; if(hurtPlayer(10)) return; }
        }
        if(en.schildT<=0){ en.schildT=0; en.bossPhase='cooldown'; en.bossTimer=0; }
      }
      en.bossTimer=(en.bossTimer||0)+dt;
      if(en.bossPhase==='ram'){
        // Bewegung übernimmt der ramT-Block oben
      } else if(en.bossPhase==='schild'){
        // Drehung und Verdrängung übernimmt der schildT-Block oben
      } else if(en.bossPhase==='warn'){
        if(en.ability==='ram') en.ramDir=Math.atan2(player.y-en.y, player.x-en.x);   // Band zeigt stets auf dich
        if(en.ability==='schild') en.schildDir=Math.atan2(player.y-en.y, player.x-en.x);   // Bogen zeigt stets auf die künftige Sperrseite
        if(en.ability==='sperre') en.sperreAng=(en.sperreAng!=null?en.sperreAng:Math.atan2(player.y-en.y, player.x-en.x))+(en.phase2?1.3:0.9)*dt/1000;   // Vorwarnung dreht schon mit
        const bw=CONFIG.boss.warn*curDiff().bossWarn;
        en.warnT=Math.min(1, en.bossTimer/bw);
        if(en.bossTimer>=bw){ en.bossPhase='fire'; en.bossTimer=0; en.warnT=0; }
      } else if(en.bossPhase==='fire'){
        if(fireBossAbility(en)) return;
        en.bossPhase = en.ability==='ram' ? 'ram' : (en.ability==='schild' ? 'schild' : 'cooldown');
        en.bossTimer=0;
        if(en.ability!=='ram' && en.ability!=='schild') en.bossNext='';
      } else if(en.bossPhase==='cooldown'){
        en.warnT=0;
        const bcd=CONFIG.boss.cooldown*curDiff().bossCd*(en.phase2?0.75:1);   // Phase 2: dauerhaft schnellere Fähigkeiten
        if(en.bossTimer>=bcd){ en.bossNext=''; en.bossPhase=''; en.bossTimer=0; }
      } else {                                                    // neuer Zyklus beginnt
        en.bossNext = en.bossNext || pickBossAbility(wave, en.leit);
        en.ability = en.bossNext;
        en.bossPhase='warn'; en.bossTimer=0;
        if(en.ability==='brut'){
          // Zielwinkel jetzt würfeln, nicht bei jedem Warnframe neu — sonst zeigen die
          // Vorwarnstrahlen woanders hin als die Knoten dann tatsächlich erscheinen.
          const zumSpieler=Math.atan2(player.y-en.y, player.x-en.x);
          const n=en.phase2?3:2;
          en.brutTargets=[];
          for(let k=0;k<n;k++){
            let a; do{ a=Math.random()*Math.PI*2; } while(angleDiff(a,zumSpieler)<0.35);
            en.brutTargets.push({ang:a, dist:150+Math.random()*70});
          }
        } else if(en.ability==='sperre'){
          en.sperreAng=Math.atan2(player.y-en.y, player.x-en.x);
        }
      }
      if(en.shockFx>0) en.shockFx-=dt/350;
      }
    }
  }
  perfMark('gegnerKI');
  // Projektile (Distanz-Gegner) – bewegen, treffen den Spieler, verglühen
  for(let i=shots.length-1;i>=0;i--){
    const s=shots[i];
    s.x+=s.vx*dt/1000; s.y+=s.vy*dt/1000; s.life-=dt/1000;
    if(s.life<=0){ shots.splice(i,1); continue; }
    const pd=Math.hypot(s.x-player.x,s.y-player.y);
    if(pd < s.r+player.radius+4){
      if(hurtPlayer(s.dmg)) return;
      spawnParticles(s.x,s.y,'#ffd257',6);
      shots.splice(i,1);
      if(sfx) sfx('hurt');
    }
  }
  // Phaser: gleichmäßiger Takt von der Klingenspitze entlang ihrer Tangente.
  if(runAbilities.phaser){
    phaserCd-=dt; phaserSoundCd-=dt;
    // 50 ms sind drei 60-Hz-Bilder; Rundungsreste dürfen den nächsten Schuss nicht verzögern.
    if(phaserCd<=1e-6 && dt>0){
      fireBladePhaser(); phaserCd+=CONFIG.phaser.rate;
      // Der schnelle Geschossstrom klingt höchstens alle 200 ms, ohne Gegner bleibt er still.
      if(phaserSoundCd<=0){
        if(enemies.length && sfx) sfx('laserPlayer');
        phaserSoundCd=200;
      }
    }
  }
  // Begleiter: umkreist den Spieler, zieht Beute an und schießt — beides zugleich
  for(const hf of helfer){
    const W=begleiterWerte(hf.stufe);
    const ueberladen=helferOverdriveUntil>Date.now();
    hf.ang += (ueberladen?2.1:1.3) * dt/1000;
    hf.x = player.x + Math.cos(hf.ang)*hf.r;
    hf.y = player.y + Math.sin(hf.ang)*hf.r;
    // zieht Fragmente und Kugeln in seiner Nähe zum Spieler
    const zieh=(liste)=>{ for(const o of liste){
      const d=Math.hypot(o.x-hf.x,o.y-hf.y);
      if(d<W.sammel){ o.x+=(player.x-o.x)*3.2*dt/1000; o.y+=(player.y-o.y)*3.2*dt/1000; }
    }};
    zieh(stars); zieh(orbs);
    hf.cd-=dt;
    if(hf.stufe>=2 && hf.cd<=0){
      let best=null, bd=W.reichweite;
      for(const en of enemies){
        const pd=Math.hypot(en.x-hf.x,en.y-hf.y), prioritaet=(hf.stufe>=3&&en.panzer) ? .62 : 1;
        if(pd*prioritaet<bd){ bd=pd*prioritaet; best=en; }
      }
      if(best){
        const dir=Math.atan2(best.y-hf.y, best.x-hf.x);
        pShots.push({x:hf.x, y:hf.y, vx:Math.cos(dir)*400, vy:Math.sin(dir)*400,
          dmg:W.dmg*(ueberladen?1.75:1), life:1.1});
        hf.cd=CONFIG.helfer.rate*(ueberladen?.45:1);
      }
    }
  }
  // eigene Projektile (Phaser) – treffen Gegner, verglühen
  for(let i=pShots.length-1;i>=0;i--){
    const s=pShots[i];
    s.x+=s.vx*dt/1000; s.y+=s.vy*dt/1000; s.life-=dt/1000;
    if(s.life<=0){ pShots.splice(i,1); continue; }
    let hit=false;
    for(const en of enemies){
      if(s.hitIds&&s.hitIds.includes(en)) continue;
      if(Math.hypot(en.x-s.x,en.y-s.y)<en.radius+5){
        const shotColor=s.moduleColor||(s.spectral?'#c77dff':'#9ad0ff');
        en.hp-=s.dmg; spawnParticles(s.x,s.y,shotColor,5); pushFloat(s.x,s.y-12,'-'+s.dmg,shotColor);
        if(s.stormSlow) en.slowT=Math.max(en.slowT||0,600);
        if(s.moduleNova>=2) modulePulse(en.x,en.y,55,Math.round(s.dmg*.52),'#c77dff',210);
        if(!s.hitIds)s.hitIds=[]; s.hitIds.push(en);
        s.hitsLeft=(s.hitsLeft||1)-1; hit=s.hitsLeft<=0; break;
      }
    }
    if(hit) pShots.splice(i,1);
  }
  perfMark('projektile');
  // Bomben: Ticken, dann verzögerte Explosion mit Schub
  for(let i=bombs.length-1;i>=0;i--){
    const b=bombs[i];
    // Haftladung bleibt bis zur Explosion am gewählten Ziel. Ist es bereits
    // besiegt, bleibt die Bombe an dessen letzter Position liegen.
    if(b.target && b.target.hp>0 && !b.target.exploding){ b.x=b.target.x; b.y=b.target.y; }
    else b.target=null;
    b.t-=dt;
    if(b.t<=0){
      const bombHits=[]; let coreHit=false;
      for(const en of enemies){
        const bd=Math.hypot(en.x-b.x,en.y-b.y);
        if(bd<b.r+en.radius){
          const kern=(b.master>=1||b.powerModule>=2)&&bd<b.r*.46;
          bombHits.push(en); if(kern)coreHit=true;
          const bDmg=Math.round(b.dmg*(kern?1.45:1)); en.hp-=bDmg;
          if(b.master>=2&&bd<b.r*.6) en.panzerAusUntil=Date.now()+2600;
          const ba=bd>0.001? Math.atan2(en.y-b.y,en.x-b.x) : Math.random()*Math.PI*2;
          en.x+=Math.cos(ba)*40; en.y+=Math.sin(ba)*40;
          spawnParticles(en.x,en.y,en.color,kern?8:4); pushFloat(en.x,en.y-16,(kern?'KERN ':'-')+bDmg,kern?'#ffffff':'#ff9a5a');
        }
      }
      spawnParticles(b.x,b.y,'#ff7a5a',26); spawnParticles(b.x,b.y,'#ffd257',14);
      shake=Math.max(shake,8); if(sfx) sfx('boom');
      if(b.powerModule>=1&&b.moduleRoot&&!b.moduleChild&&bombHits.length&&treeFlags.bombModuleTriggered!==b.moduleActivation){
        treeFlags.bombModuleTriggered=b.moduleActivation;
        const target=bombHits.reduce((best,en)=>Math.hypot(en.x-b.x,en.y-b.y)>Math.hypot(best.x-b.x,best.y-b.y)?en:best,bombHits[0]);
        bombs.push({x:target.x,y:target.y,target,t:540,max:540,r:b.r*.52,dmg:Math.round(b.dmg*.38),moduleChild:true});
        pushFloat(target.x,target.y-30,'FOLGELADUNG','#ff9a5a',.95);
      }
      if(b.powerModule>=2&&b.moduleRoot&&!b.moduleChild&&coreHit&&treeFlags.bombSplitterTriggered!==b.moduleActivation){
        treeFlags.bombSplitterTriggered=b.moduleActivation;
        for(let k=0;k<4;k++)moduleShot(b.x,b.y,k*Math.PI/2,b.dmg*.24,2,{moduleColor:'#ff9a5a'});
        particles.push({ring:true,x:b.x,y:b.y,color:'#ffffff',life:.3,max:.3});
      }
      // Streubombe: zerspringt in drei kleinere, die versetzt nachzünden
      if(b.streu){
        for(let k=0;k<3;k++){
          const a=k/3*Math.PI*2 + Math.random();
          bombs.push({ x:b.x+Math.cos(a)*55, y:b.y+Math.sin(a)*55,
            t:520, max:520, r:b.r*0.62, dmg:Math.round(b.dmg*0.5) });
        }
      }
      bombs.splice(i,1);
    }
  }
  // Mutationen sollen nicht nur Zahlen verändern: Stase hält einen Bereich
  // sichtbar langsam, der Wirbel-Nachlauf pulsiert mehrfach Schaden.
  for(let i=powerFields.length-1;i>=0;i--){
    const f=powerFields[i];
    let feldDt=dt;
    if(f.delay>0){
      const delayRest=f.delay-dt;
      if(delayRest>0){ f.delay=delayRest; continue; }
      // Nur der Rest des Bildes nach Ablauf der Verzögerung zählt für Feld und Tick.
      feldDt=Math.max(0,-delayRest); f.delay=0;
    }
    f.tick-=feldDt; f.t-=feldDt;
    if(f.kind==='brandspur'){
      if(f.tick<=0){
        for(const en of enemies) if(Math.hypot(en.x-f.x,en.y-f.y)<f.r+en.radius) en.hp-=f.dmg;
        f.tick+=CONFIG.brandspur.tick;
      }
    } else if(f.kind==='stase'){
      for(const en of enemies) if(Math.hypot(en.x-f.x,en.y-f.y)<f.r+en.radius)
        en.slowT=Math.max(en.slowT||0,260);
    } else if(f.kind==='lightTrail'){
      for(const en of enemies) if(Math.hypot(en.x-f.x,en.y-f.y)<f.r+en.radius) en.slowT=Math.max(en.slowT||0,220);
      if(!f.shown){ f.shown=true; particles.push({ring:true,x:f.x,y:f.y,color:f.color,life:.12,max:.12}); }
    } else if(f.kind==='sunOrbit' && f.tick<=0 && f.pulses>0){
      for(const en of enemies) if(Math.hypot(en.x-f.x,en.y-f.y)<f.r+en.radius) en.hp-=f.dmg;
      f.pulses--; f.tick=300; particles.push({ring:true,x:f.x,y:f.y,color:f.color,life:.2,max:.2});
    } else if(f.kind==='nachlauf' && f.tick<=0){
      const interval=f.interval||310;
      let pulse=0;
      // Restzeit behalten: auch ein langsames Bild darf keinen fälligen Puls schlucken.
      while(f.tick<=0 && pulse<7){
        let getroffen=0;
        for(const en of enemies) if(Math.hypot(en.x-f.x,en.y-f.y)<f.r+en.radius){
          en.hp-=f.dmg; getroffen++; spawnParticles(en.x,en.y,f.color,3);
        }
        if(getroffen) particles.push({ring:true,x:f.x,y:f.y,color:f.color,life:.18,max:.18});
        if(PERF_DEBUG&&f.sliceWirbelB) treeFlags.debugWirbelBPulse=(treeFlags.debugWirbelBPulse||0)+1;
        f.tick+=interval; pulse++;
      }
    } else if(f.kind==='module_follow'&&f.tick<=0){
      f.x=player.x;f.y=player.y;
      for(const en of enemies){const dx=player.x-en.x,dy=player.y-en.y,d=Math.hypot(dx,dy);if(d<f.r+85&&d>f.r){const zug=Math.min(10,(d-f.r)*.18);en.x+=dx/d*zug;en.y+=dy/d*zug;}}
      particles.push({ring:true,x:f.x,y:f.y,color:f.color,life:.16,max:.16});f.tick=95;
    } else if(f.kind==='module_counter'&&!f.fired){
      f.fired=true;
      f.x=player.x;f.y=player.y;
      for(const en of enemies){const dx=f.x-en.x,dy=f.y-en.y,d=Math.hypot(dx,dy);if(d<f.r+en.radius&&d>1){const ziel=player.radius+bladeLength()*.82,zug=Math.min(55,Math.max(0,d-ziel));en.x+=dx/d*zug;en.y+=dy/d*zug;en.hp-=f.dmg;}}
      particles.push({ring:true,x:f.x,y:f.y,color:f.color,life:.38,max:.38});pushFloat(f.x,f.y-42,'GEGENSTROM','#ffd257',1.0);
    } else if(f.kind==='module_stoss_return'&&!f.fired){
      f.fired=true;
      f.x=player.x;f.y=player.y;
      for(const en of enemies){const dx=f.x-en.x,dy=f.y-en.y,d=Math.hypot(dx,dy);if(en.moduleStossUntil>Date.now()&&d<f.r+en.radius&&d>1){const ziel=player.radius+bladeLength()*.82,zug=Math.min(95,Math.max(0,d-ziel));en.x+=dx/d*zug;en.y+=dy/d*zug;if(f.dmg){en.hp-=f.dmg;en.stunT=Math.max(en.stunT||0,220);}en.moduleStossUntil=0;}}
      particles.push({ring:true,x:f.x,y:f.y,color:f.color,life:.34,max:.34});pushFloat(f.x,f.y-42,f.dmg?'FELDBRUCH':'RÜCKLEITER','#6ec8ff',1.0);
    } else if(f.kind==='module_sog_end'&&!f.fired){
      f.fired=true;
      f.x=player.x;f.y=player.y;
      for(const en of enemies){const dx=en.x-f.x,dy=en.y-f.y,d=Math.hypot(dx,dy);if(d<f.r+en.radius&&d>1){en.hp-=f.dmg;const schub=f.mode==='a'?48:-34;en.x+=dx/d*schub;en.y+=dy/d*schub;en.moduleOrbitUntil=0;}}
      particles.push({ring:true,x:f.x,y:f.y,color:f.color,life:.4,max:.4});pushFloat(f.x,f.y-42,'KERNBRUCH','#4de0a0',1.0);
    } else if(f.kind==='storm_projectiles'&&!f.fired && f.t<=0){
      f.fired=true;
      for(let k=0;k<8;k++){ const a=k*Math.PI/4; moduleShot(f.x,f.y,a,f.dmg,1,{vx:Math.cos(a)*380,vy:Math.sin(a)*380,life:.9,storm:true,stormWirbel:true,moduleColor:f.color,stormSlow:f.slow}); }
      if(PERF_DEBUG) treeFlags.debugSturmSchuesse=(treeFlags.debugSturmSchuesse||0)+8;
      particles.push({ring:true,x:f.x,y:f.y,color:f.color,life:.42,max:.42});
    }
    if(f.t<=0) powerFields.splice(i,1);
  }
  for(let i=powerEchoes.length-1;i>=0;i--){
    const e=powerEchoes[i];e.t-=dt;
    if(e.t<=0){resolvePowerEcho(e);powerEchoes.splice(i,1);}
  }
  if(novaFx>0) novaFx-=dt/350;
  // Nachzündende zweite Nova-Welle (Sprung ab Stufe 4)
  if(novaEcho>0){
    novaEcho-=dt;
    if(novaEcho<=0){
      for(const en of enemies){
        if(Math.hypot(en.x-player.x,en.y-player.y) < novaEchoRange+en.radius){
          en.hp-=novaEchoDmg;
          en.stunT=Math.max(en.stunT||0, CONFIG.nova.stun);
          spawnParticles(en.x,en.y,'#c77dff',5);
          pushFloat(en.x,en.y-18,'-'+novaEchoDmg,'#c77dff');
        }
      }
      novaFx=1; shake=Math.max(shake,5); if(sfx) sfx('nova');
    }
  }
  if(counterCd>0) counterCd-=dt;
  if(counterFx>0){ counterFx-=dt/300; if(counterFx<0) counterFx=0; }
  // Boss-Gefahrenzonen: eigener Tick-Zähler je Eintrag (~400 ms), sonst würde
  // hurtPlayer() jedes Bild feuern und die Zone wäre sofort tödlich statt verknappend.
  for(let i=bossHazards.length-1;i>=0;i--){
    const hz=bossHazards[i];
    hz.until-=dt;
    if(hz.until<=0){ bossHazards.splice(i,1); continue; }
    if(hz.kind==='brand'){
      const d=Math.hypot(player.x-hz.x, player.y-hz.y);
      if(d<hz.r+player.radius){
        hz.tick=(hz.tick||0)-dt;
        if(hz.tick<=0){ hz.tick=400; if(hurtPlayer(hz.dmg)) return; }
      }
    } else if(hz.kind==='arm'){
      // Drehsperre: folgt dem Bossmittelpunkt und dreht mit drehen rad/s weiter.
      const boss=enemies.find(o=>o.type==='boss' && o.hp>0);
      if(boss){ hz.x=boss.x; hz.y=boss.y; }
      hz.ang=(hz.ang||0)+hz.drehen*dt/1000;
      // Gleicher Tick-Rhythmus wie brand, sonst würde hurtPlayer() jedes Bild feuern.
      hz.tick=(hz.tick||0)-dt;
      if(hz.tick<=0){
        hz.tick=400;
        const pdx=player.x-hz.x, pdy=player.y-hz.y, pd=Math.hypot(pdx,pdy);
        if(pd<hz.len && angleDiff(Math.atan2(pdy,pdx), hz.ang)<=0.16){ if(hurtPlayer(hz.dmg)) return; }
      }
    }
  }
  perfMark('felder');
  // remove dead – Exploder zünden erst nach einem sichtbaren Zünd-Puls
  for(let i=enemies.length-1;i>=0;i--){
    const en=enemies[i];
    if(en.type==='exploder' && en.hp<=0 && !en.exploding){
      en.exploding=true; en.explodeT=CONFIG.exploder.fuseMs;
      spawnParticles(en.x,en.y,'#ffd257',6); if(sfx) sfx('fuse');
    }
    if(en.exploding){
      en.explodeT-=dt;
      if(en.explodeT>0) continue;                    // Zünd-Puls läuft noch
      // Explosion mit Schadensabfall zur Mitte hin
      const maxR=CONFIG.exploder.blast;
      const ed=Math.hypot(player.x-en.x,player.y-en.y);
      if(ed<maxR && hurtPlayer(Math.max(5, Math.round(en.dmg*(1-ed/maxR))))) return;
      // Die Explosion trifft auch andere Gegner (schadet also nicht nur dir)
      for(const other of enemies){
        if(other===en) continue;
        const od=Math.hypot(other.x-en.x,other.y-en.y);
        if(od<maxR) other.hp-= Math.max(4, Math.round(en.dmg*0.6*(1-od/maxR)));
      }
      spawnParticles(en.x,en.y,'#ff5aa2',26); spawnParticles(en.x,en.y,'#ffd257',14);
      shake=Math.max(shake,8); if(sfx) sfx('boom');
      killEnemy(en,i);
      enemies.splice(i,1); continue;
    }
    if(en.hp<=0){
      killEnemy(en,i);
      enemies.splice(i,1);
    }
  }
  perfMark('tote');
  checkLevelUp();
  // Fragmente einsammeln — wandern direkt aufs Werkstatt-Konto
  for(let i=stars.length-1;i>=0;i--){
    const c=stars[i];
    const d=Math.hypot(c.x-player.x,c.y-player.y);
    if(d<28){ player.stars+=c.amount; pushFloat(c.x,c.y-10,'+'+c.amount+'◆','#ffd257'); if(sfx) sfx('coin'); stars.splice(i,1); continue; }
    // magnet — nach dem Wellenende zieht es unabhängig von der Entfernung und schneller
    if(c.sog){ c.x+=(player.x-c.x)*9*dt/1000; c.y+=(player.y-c.y)*9*dt/1000; }
    else if(d<90){ c.x+=(player.x-c.x)*4*dt/1000; c.y+=(player.y-c.y)*4*dt/1000; }
  }
  // XP-Orbs einsammeln (Magnet wie die Münzen)
  for(let i=orbs.length-1;i>=0;i--){
    const o=orbs[i];
    const d=Math.hypot(o.x-player.x,o.y-player.y);
    if(d<28){
      if(o.hp){
        // Bei vollem Leben wird die Kugel nicht verschenkt, sondern zur Barriere
        if(player.hp >= player.maxHp-0.5){
          if(treeFlags.waechter && !waechterLadung){ waechterLadung=true; pushFloat(o.x,o.y-10,'WÄCHTERLADUNG','#ffd257',1.05); if(sfx) sfx('unlock'); }
          else if(!treeFlags.waechter){
            const vorher=barriere;
            barriere=Math.min(barriereMax(),barriere+player.maxHp*CONFIG.barriere.proKugel*figur().barriereMal);
            const zuwachs=Math.round(barriere-vorher);
            if(zuwachs>0){ pushFloat(o.x,o.y-10,'+'+zuwachs+' Barriere','#7cc8ff'); if(sfx) sfx('unlock'); }
            else pushFloat(o.x,o.y-10,'Barriere voll','#7cc8ff');
          } else { pushFloat(o.x,o.y-10,'Wächterladung voll','#7cc8ff'); }
        } else {
          const heal=Math.round(player.maxHp*CONFIG.hpOrb.heilAnteil);
          player.hp=Math.min(player.maxHp, player.hp+heal);
          pushFloat(o.x,o.y-10,'+'+heal+' Leben','#ff5a5a'); if(sfx) sfx('heal');
        }
      } else {
        const amount=laufXp(o.big? Math.round(CONFIG.xpOrb.xp*2.5) : CONFIG.xpOrb.xp);
        player.xp+=amount; pushFloat(o.x,o.y-10,'+'+amount+' XP','#6ec8ff'); if(sfx) sfx('xp');
      }
      orbs.splice(i,1); continue;
    }
    if(o.sog){ o.x+=(player.x-o.x)*9*dt/1000; o.y+=(player.y-o.y)*9*dt/1000; }
    else if(d<90){ o.x+=(player.x-o.x)*4*dt/1000; o.y+=(player.y-o.y)*4*dt/1000; }
  }
  // particles
  for(let i=particles.length-1;i>=0;i--){
    const p=particles[i]; p.life-=dt/1000; if(p.life<=0){particles.splice(i,1); continue;}
    if(!p.sword && !p.bolt && !p.ring && !p.stormRing){ p.x+=p.vx*dt/1000; p.y+=p.vy*dt/1000; p.vy+= 300*dt/1000; }
  }
  for(let i=floats.length-1;i>=0;i--){ const f=floats[i]; f.life-=dt/1000; f.y+=f.vy*dt/1000; if(f.life<=0) floats.splice(i,1); }
  perfMark('beute');
  // Ansage & Hinweise altern lassen
  tutorialTick(dt);
  if(unlockFx>0){ unlockFx-=dt/900; if(unlockFx<0) unlockFx=0; }
  if(banner){ banner.life-=dt/1000; if(banner.life<=0) banner=null; }
  for(let i=toasts.length-1;i>=0;i--){ toasts[i].life-=dt/1000; if(toasts[i].life<=0) toasts.splice(i,1); }

  // wave clear check — der Shop zwischen den Wellen ist entfallen (#11):
  // Heilung/Stärke gibt es nur noch im Lauf (Regen, Fähigkeiten) und dauerhaft im Meta-Shop.
  /* Wellenwechsel: Früher musste das Feld LEER sein. Gemessen kostete das 12,6 % der
     Laufzeit als Restejagd und 19,4 % als fast leeres Feld. Jetzt startet die nächste
     Welle, sobald das Spawn-Budget verbraucht und der Rest klein genug ist; die
     Nachzügler laufen in die neue Welle über.
     Bosswellen behalten die alte Bedingung — ein Boss darf nicht überlaufen werden. */
  if(waveSpawned>=waveEnemiesToSpawn && state==='playing'){
    const bossWelle=(wave%5===0);
    const restGrenze=Math.max(3, Math.round(waveEnemiesToSpawn*CONFIG.wave.schubRest));
    const bereit = bossWelle ? (enemies.length===0 && !bossActive)
                             : (enemies.length<=restGrenze);
    if(bereit){
      einsammelnAmWellenende();
      wave++; startWave();
    }
  }
  if(shake>0) shake-= dt*0.04;
  updateHUD();
  perfMark('hud');
}

// #rrggbb -> rgba(...) mit gewünschter Deckkraft (für Auren und Verläufe)
function hexA(hex,a){
  const h=hex.replace('#','');
  const n=parseInt(h.length===3 ? h.split('').map(c=>c+c).join('') : h, 16);
  return 'rgba('+((n>>16)&255)+','+((n>>8)&255)+','+(n&255)+','+a+')';
}
/* Leuchten (shadowBlur) ist die mit Abstand teuerste Canvas-Operation — bei 39 Gegnern
   ab Welle 11 bricht ein Handy-GPU darauf ein. Diese Hilfsfunktion schaltet es ab,
   sobald viel los ist. Alle Zuweisungen laufen über sie, damit es keine Ausreißer gibt. */
let fxAn=true;
function sb(v){ ctx.shadowBlur = fxAn ? v : 0; }
/* Farbe und Stärke gemeinsam setzen. Ist das Leuchten aus, war `shadowColor` bisher
   wirkungslos, kostete aber trotzdem je Zuweisung eine Farbanalyse im Canvas — bei
   Welle 26 rund 115 Gegner plus Projektile und Partikel pro Bild. */
function sbc(color,v){ if(fxAn){ ctx.shadowColor=color; ctx.shadowBlur=v; } else ctx.shadowBlur=0; }
// Schriftstrings der Schadenszahlen einmal bauen statt pro Zahl und Bild
const FLOAT_FONT='800 13px system-ui';
const floatFontCache=new Map();
function floatFontFor(scale){
  const px=Math.round(13*scale);
  let s=floatFontCache.get(px);
  if(!s){ s='800 '+px+'px system-ui'; floatFontCache.set(px,s); }
  return s;
}

/* Bildschirmgroße Gradienten einmal bauen statt 60× pro Sekunde.
   Sie hängen nur von Größe und Biome ab. */
let glowCache=null, glowKey='', vigCache=null, vigKey='';
/* Die Verläufe werden von dem Kontext erzeugt, der sie später benutzt. Seit der
   Hintergrund wahlweise auf einer eigenen Zwischenleinwand entsteht, gibt es zwei
   mögliche Kontexte — der Cache muss sie unterscheiden, sonst gehörte ein Verlauf
   nach dem Umschalten zur falschen Zeichenfläche. */
function ctxKuerzel(g){ return g===ctx ? 'M' : 'B'; }
function holeGlow(g2,w,h,biome){
  const key=ctxKuerzel(g2)+w+'x'+h+'|'+biome.glow;
  if(key!==glowKey){
    const g=g2.createRadialGradient(w/2,h/2,0,w/2,h/2,Math.max(w,h)*0.7);
    g.addColorStop(0,'rgba('+biome.glow+',0.38)');
    g.addColorStop(0.5,'rgba('+biome.glow+',0.15)');
    g.addColorStop(1,'rgba(5,7,13,0)');
    glowCache=g; glowKey=key;
  }
  return glowCache;
}
function holeVignette(g2,w,h){
  const key=ctxKuerzel(g2)+w+'x'+h;
  if(key!==vigKey){
    const g=g2.createRadialGradient(w/2,h/2,Math.min(w,h)*0.45,w/2,h/2,Math.max(w,h)*0.9);
    g.addColorStop(0,'rgba(0,0,0,0)'); g.addColorStop(1,'rgba(0,0,0,0.42)');
    vigCache=g; vigKey=key;
  }
  return vigCache;
}
/* HINTERGRUND IN HALBER AUFLÖSUNG
   Auf dem X1 Carbon ist die Füllrate der Engpass, nicht die Rechenlast: DPR 1,0 statt
   1,5 senkte die verfehlten Bilder von 28 % auf 3,3 %. Der Hintergrund füllt den
   Bildschirm pro Bild acht- bis zehnmal vollständig und besteht fast nur aus weichen
   Verläufen — er verträgt eine geringere Auflösung, ohne dass es auffällt. Er entsteht
   deshalb auf einer eigenen Zwischenleinwand mit einem Viertel der Pixel und wird
   hochskaliert eingeblendet. Das Spielgeschehen bleibt in voller Auflösung. */
const BG_SKALA=0.5;                          // je Achse — also ein Viertel der Fläche
let hintergrundHalb=!PERF_BG;                // Standard; `?perf=1&bg=voll` startet voll
let bgLeinwand=null, bgCtx=null;
function holeHintergrundKontext(w,h){
  if(typeof document==='undefined' || !document.createElement) return null;
  if(!bgLeinwand){ bgLeinwand=document.createElement('canvas'); bgCtx=bgLeinwand.getContext&&bgLeinwand.getContext('2d'); }
  if(!bgCtx) return null;
  const dw=Math.max(1,Math.round(w*renderDpr*BG_SKALA)), dh=Math.max(1,Math.round(h*renderDpr*BG_SKALA));
  if(bgLeinwand.width!==dw || bgLeinwand.height!==dh){ bgLeinwand.width=dw; bgLeinwand.height=dh; }
  bgCtx.setTransform(dw/w,0,0,dh/h,0,0);     // dieselben logischen Koordinaten wie im Hauptcanvas
  return bgCtx;
}
// Alle Hintergrundebenen, in logischen Koordinaten, auf den übergebenen Kontext.
function zeichneHintergrund(g,w,h,biome,now,skala){
  g.fillStyle=biome.bg; g.fillRect(0,0,w,h);
  if(zeichenEbenen.verlaeufe){ g.fillStyle=holeGlow(g,w,h,biome); g.fillRect(0,0,w,h); }
  if(zeichenEbenen.nebel)  drawNebulae(g,w,h,camX,camY,biome);
  if(zeichenEbenen.sterne) drawStarLayers(g,w,h,camX,camY,biome,now);
  if(zeichenEbenen.deko)   drawBiomeDeko(g,w,h,camX,camY,biome);
  if(zeichenEbenen.raster) drawFadedGrid(g,w,h,camX,camY,biome,skala);
  if(zeichenEbenen.staub)  drawDust(g,w,h,camX,camY,biome);
  if(zeichenEbenen.verlaeufe){ g.fillStyle=holeVignette(g,w,h); g.fillRect(0,0,w,h); }
}
// Wird einmal pro Bild gesetzt: viele Gegner ODER schwaches Gerät -> Leuchten aus
function bestimmeEffektstufe(){
  fxAn = enemies.length <= CONFIG.fxGegnerGrenze && !sparmodus;
}
/* SPARMODUS — die alte Schwelle von 26 ms griff erst unter 38 fps. Ein Gerät, das
   dauerhaft bei 46 fps liegt (gemessen auf dem X1 Carbon: 21,5 ms), bekam deshalb nie
   Hilfe, obwohl es sichtbar ruckelte. Die neue Einschaltschwelle liegt bei 18,5 ms
   (~54 fps) und erwischt auch regelmäßig knapp verfehlte 60-fps-Bilder.

   Zwei Vorkehrungen gegen Pendeln, denn der Sparmodus verändert selbst die Bildrate,
   die ihn steuert: Erstens liegt die Ausschaltschwelle mit 16,9 ms klar unter der
   Einschaltschwelle und muss länger anhalten. Zweitens rastet der Sparmodus nach der
   zweiten Einschaltung dauerhaft ein — ein Gerät, das ihn zweimal gebraucht hat, wird
   ihn wieder brauchen, und ein springendes Bild ist schlimmer als ein weicheres. */
const SPAR_AN_MS=18.5, SPAR_AUS_MS=16.9;
const SPAR_FENSTER=90;                 // ~1,5 s bei 60 fps
/* Aufwärmen ausklammern: Die ersten Sekunden eines Laufs ruckeln immer — erste
   Zuweisung der Hintergrundleinwand, GPU-Texturupload, JIT. Gemessen auf dem
   X1 Carbon waren es 57 verspätete Bilder am Laufbeginn, danach 90 Sekunden ohne
   einen einzigen Ausreißer. Ohne diese Sperre holte sich der Sparmodus genau daraus
   seine zwei Einschaltungen, rastete dauerhaft ein und senkte die Auflösung eines
   Geräts, das längst sauber lief. */
const SPAR_AUFWAERM=180;               // ~3 s Kampfbilder
let fpsProbe=[], fpsLetzte=0, sparSchlecht=0, sparGut=0, sparEinschaltungen=0, sparAufwaerm=0;
function sparmodusNeuerLauf(){ sparAufwaerm=0; sparSchlecht=0; sparGut=0; fpsProbe.length=0; }
function messeBildrate(t){
  const d=fpsLetzte? t-fpsLetzte : 0;
  fpsLetzte=t;
  // Nur Kampfbilder, und keine Zustandssprünge aus Menü oder Orbitpfad: eine einzelne
  // Pause von zwei Sekunden würde den Schnitt sonst über jede Schwelle heben.
  if(state!=='playing' || !(d>0) || d>100) return;
  if(sparAufwaerm<SPAR_AUFWAERM){ sparAufwaerm++; return; }
  fpsProbe.push(d);
  if(fpsProbe.length<SPAR_FENSTER) return;
  let summe=0; for(const v of fpsProbe) summe+=v;
  const schnitt=summe/fpsProbe.length;
  fpsProbe.length=0;
  if(schnitt>SPAR_AN_MS){ sparGut=0; sparSchlecht++; }
  else if(schnitt<SPAR_AUS_MS){ sparSchlecht=0; sparGut++; }
  else { sparSchlecht=0; sparGut=0; }              // Graubereich ändert nichts
  if(!sparmodus && sparSchlecht>=2){
    sparmodus=true; sparEinschaltungen++; sparSchlecht=0; resize();
  } else if(sparmodus && sparGut>=5 && sparEinschaltungen<2){
    sparmodus=false; sparGut=0; resize();
  }
}
// Sichtprüfung vor teuren Canvas-Operationen. Die Simulation bleibt bewusst global,
// nur das Zeichnen unsichtbarer Gegner, Beute und Partikel entfällt.
/* Der Sichtbereich wird einmal je Bild in draw() gesetzt statt in jedem Aufruf neu aus
   dem DOM gelesen. Gemessen: `canvas.clientWidth`/`clientHeight` kosten zusammen rund
   1,57 µs, eine Variable 0,016 µs — Faktor 100. Bei Welle 26 laufen ~444 Sichtprüfungen
   pro Bild (115 Gegner, ~300 Partikel, Zahlen, Beute, Projektile), das waren allein
   ~0,70 ms pro Bild und damit rund ein Siebtel der gesamten Zeichenzeit. */
let vpW=0, vpH=0;
function sichtbar(x,y,rand=0){
  return x>=camX-rand && x<=camX+vpW+rand && y>=camY-rand && y<=camY+vpH+rand;
}
function zeichnePerfOverlay(w,h){
  if(!PERF_DEBUG) return;
  // Die Statistik kostet einen Sort über bis zu 5400 Werte — zweimal pro Sekunde genügt,
  // sonst misst das Messwerkzeug sich selbst.
  const jetzt=performance.now();
  if(!perfStat || jetzt>perfStatNext){ perfStat=perfBericht(); perfStatNext=jetzt+500; }
  const b=perfStat, m=b.mengen, z=b.zustand;
  const ms=(o)=>'Ø'+o.avg.toFixed(1)+'  p95 '+o.p95.toFixed(1)+'  max '+o.max.toFixed(1);
  const zeilen=[
    'FENSTER '+b.fensterSek+'s · '+b.bilder+' Bilder · '+b.fps+' fps · Kampf '+Math.round(b.kampfAnteil*100)+'%'
      +(b.gekappt? '  !Stat nur '+b.statistikUeber : ''),
    'Frame  '+ms(b.frame),
    'Update '+ms(b.update),
    'Draw   '+ms(b.draw),
    'Rest   '+b.ausserhalbJs.toFixed(1)+' ms  (Rastern + Vsync-Warten)'
  ];
  /* Die Verteilung ist die eigentliche Ruckel-Diagnose: bei sauberen 60 fps liegt
     alles in der ersten Klasse. Jede Zahl weiter rechts ist ein ausgelassenes Bild. */
  const v=b.verteilung, vk=Object.keys(v);
  zeilen.push('Bilder '+vk.map(k=>k.replace(' ms','')+':'+v[k]).join(' '));
  const s=b.schlimmsteBilder[0];
  if(s) zeilen.push('worst '+s.frame+'ms u'+s.update+' d'+s.draw+' '+s.spitze+' · '+s.gegner+'G '+s.partikel+'P'+(s.boss?' BOSS':'')+(s.fx?' FX':''));
  const ph=Object.keys(b.phasenMsProBild).sort((x,y)=>b.phasenMsProBild[y]-b.phasenMsProBild[x]).slice(0,6);
  for(const k of ph) zeilen.push('  '+(k+'            ').slice(0,13)+b.phasenMsProBild[k].toFixed(2)+' ms');
  // Mengen als Fenster-Maximum: eine Momentaufnahme zeigte im Leerlauf 0 Gegner und
  // sagte damit nichts über die belasteten Bilder aus.
  zeilen.push('max Gegner '+m.sichtbar.max+'/'+m.gegner.max+' (Ø '+m.gegner.schnitt+') · Felder '+m.felder.max);
  zeilen.push('max Partikel '+m.partikel.max+' · Zahlen '+m.zahlen.max+' · Schuss '+m.schuesse.max+'/'+m.eigeneSchuesse.max);
  zeilen.push('Welle '+b.welle+' · DPR '+z.dpr+(z.dprErzwungen?'!':'')+' · Zoom '+z.zoom.toFixed(2)+(z.zoomErzwungen?'!':''));
  zeilen.push('Spar '+(z.sparmodus?'AN':'aus')+' · FX '+(z.effekte?'an':'AUS')+(z.messlauf?' · MESSLAUF':''));
  zeilen.push('Hintergrund '+z.hintergrund.toUpperCase()+'   [Shift+H]');
  zeilen.push('aus: '+(Array.isArray(z.ebenenAus)? z.ebenenAus.join(' ') : 'keine')+'   [Shift+1..8]');
  const zh=13, hoehe=zeilen.length*zh+14, oben=h-hoehe-8;
  ctx.save();
  ctx.fillStyle='rgba(2,6,13,.86)'; ctx.fillRect(8,oben,342,hoehe);
  ctx.strokeStyle='rgba(110,200,255,.35)'; ctx.lineWidth=1; ctx.strokeRect(8.5,oben+0.5,341,hoehe-1);
  ctx.font='600 11px ui-monospace,monospace'; ctx.textAlign='left';
  for(let i=0;i<zeilen.length;i++){
    const z0=zeilen[i];
    ctx.fillStyle = i===0 ? '#ffd257' : (i===4 ? '#ff9a5a'
      : (i<4 ? '#bfe3ff' : (z0.startsWith('Bilder ')||z0.startsWith('worst ') ? '#4de0a0'
      : (z0.startsWith('  ') ? '#9ad0ff' : (z0.startsWith('aus:') ? '#8fa3bd' : '#c8d4e6')))));
    ctx.fillText(zeilen[i],16,oben+18+i*zh);
  }
  ctx.restore();
}
function hexPath(c,r){ c.beginPath(); for(let i=0;i<6;i++){ const a=Math.PI/3*i; const x=Math.cos(a)*r, y=Math.sin(a)*r; i?c.lineTo(x,y):c.moveTo(x,y);} c.closePath(); }
// Biome-Deko: Parallax-Sterne (deterministisch je Zelle) + Landmarken an einem Welt-Raster
/* Nebelschwaden: große, weiche Farbflächen mit sehr langsamer Parallaxe.
   Sie tragen den Großteil der Tiefenwirkung und kosten nur wenige Gradienten. */
function drawNebulae(ctx,w,h,camX,camY,bio){
  const par=0.04, span=4200;
  ctx.save(); ctx.globalCompositeOperation='lighter';
  for(const n of NEBULAE){
    // um die Kamera herum kacheln, damit sie nie ausgehen
    const bx=((n.x-camX*par)%span+span)%span - span*0.5 + w*0.5;
    const by=((n.y-camY*par)%span+span)%span - span*0.5 + h*0.5;
    if(bx<-n.r || bx>w+n.r || by<-n.r || by>h+n.r) continue;
    /* Der Verlauf hängt nur an Farbe und Radius, nicht an der Position. Einmal um den
       Ursprung gebaut, danach nur noch verschoben — bisher entstand er je Schwade und Bild neu. */
    if(!n._grad || n._gradBio!==bio || n._gradCtx!==ctx){
      const col=bio.neb[n.c%bio.neb.length];
      const g=ctx.createRadialGradient(0,0,0,0,0,n.r);
      g.addColorStop(0,'rgba('+col[0]+','+col[1]+','+col[2]+','+n.a.toFixed(3)+')');
      g.addColorStop(0.55,'rgba('+col[0]+','+col[1]+','+col[2]+','+(n.a*0.4).toFixed(3)+')');
      g.addColorStop(1,'rgba('+col[0]+','+col[1]+','+col[2]+',0)');
      n._grad=g; n._gradBio=bio; n._gradCtx=ctx;
    }
    ctx.save(); ctx.translate(bx,by);
    ctx.fillStyle=n._grad; ctx.beginPath(); ctx.arc(0,0,n.r,0,Math.PI*2); ctx.fill();
    ctx.restore();
  }
  ctx.restore();
}
// Sternenlagen: gekachelt, unterschiedliche Parallaxe, sanftes Funkeln
/* Hintergrund-Kacheln: Sterne und Deko wurden bisher Punkt für Punkt gemalt —
   gemessen über 750 Zeichenaufrufe pro Bild, unabhängig von der Gegnerzahl. Das war
   die Hauptlast auf schwächeren Geräten. Jetzt wird jede Lage EINMAL in eine
   Zwischengrafik gezeichnet und danach nur noch versetzt gekachelt: aus 750 Aufrufen
   werden eine Handvoll drawImage. Das Aussehen bleibt gleich. */
const kachelCache=new Map();
function holeKachel(schluessel, groesse, zeichner){
  let k=kachelCache.get(schluessel);
  if(k) return k;
  if(typeof document==='undefined' || !document.createElement) return null;
  const c=document.createElement('canvas');
  if(!c.getContext) return null;
  c.width=groesse; c.height=groesse;
  const g=c.getContext('2d');
  if(!g) return null;
  zeichner(g, groesse);
  kachelCache.set(schluessel,c);
  return c;
}
// Kachel versetzt über die ganze Fläche legen
function kacheln(ctx,bild,w,h,offX,offY,groesse){
  const ox=((offX%groesse)+groesse)%groesse, oy=((offY%groesse)+groesse)%groesse;
  for(let x=-ox; x<w; x+=groesse)
    for(let y=-oy; y<h; y+=groesse)
      ctx.drawImage(bild,x,y);
}
function drawStarLayers(ctx,w,h,camX,camY,bio,t){
  ctx.save();
  for(let i=0;i<STAR_LAYERS.length;i++){
    const L=STAR_LAYERS[i];
    const bild=holeKachel('stars'+i+'|'+bio.star, BG_TILE, (g)=>{
      g.fillStyle=bio.star;
      for(const s of L.stars){
        // Der Stern wird an allen vier Rändern wiederholt, damit die Kachel nahtlos schließt
        for(const dx of [0,-BG_TILE,BG_TILE]) for(const dy of [0,-BG_TILE,BG_TILE]){
          const x=s.x+dx, y=s.y+dy;
          if(x<-6||x>BG_TILE+6||y<-6||y>BG_TILE+6) continue;
          g.globalAlpha=s.br*0.9;
          g.beginPath(); g.arc(x,y,s.r,0,Math.PI*2); g.fill();
          if(L.flare && s.r>2.2){
            g.globalAlpha=s.br*0.32;
            g.fillRect(x-s.r*3.2, y-0.4, s.r*6.4, 0.8);
            g.fillRect(x-0.4, y-s.r*3.2, 0.8, s.r*6.4);
          }
        }
      }
      g.globalAlpha=1;
    });
    if(!bild){    // Rückfall (z. B. headless): wie bisher einzeln zeichnen
      ctx.fillStyle=bio.star;
      const ox=((camX*L.par)%BG_TILE+BG_TILE)%BG_TILE, oy=((camY*L.par)%BG_TILE+BG_TILE)%BG_TILE;
      for(let tx=-1; tx*BG_TILE-ox < w; tx++) for(let ty=-1; ty*BG_TILE-oy < h; ty++){
        const bx=tx*BG_TILE-ox, by=ty*BG_TILE-oy;
        for(const s of L.stars){
          const x=bx+s.x, y=by+s.y;
          if(x<-4||x>w+4||y<-4||y>h+4) continue;
          ctx.globalAlpha=s.br*0.9;
          ctx.beginPath(); ctx.arc(x,y,s.r,0,Math.PI*2); ctx.fill();
        }
      }
      continue;
    }
    // sanftes Flimmern der ganzen Lage statt je Stern — optisch kaum unterscheidbar
    ctx.globalAlpha=0.86+0.14*Math.sin(t*0.0009+i*1.7);
    kacheln(ctx,bild,w,h,camX*L.par,camY*L.par,BG_TILE);
  }
  ctx.globalAlpha=1; ctx.restore();
}
/* Tech-Raster auf eigener Ebene, zum Rand hin ausgeblendet.
   Eigene Ebene, weil die Ausblendung sonst auch Sterne und Nebel wegradieren würde.
   Ergebnis: das Raster wirkt wie eine Plattform unter dem Spieler statt wie ein
   gleichmäßiges Gitter über dem ganzen Bild — der Hintergrund gewinnt Tiefe. */
let gridLayer=null, gridCtx=null, gridFade=null, gridFadeKey='';
function drawFadedGrid(ctx,w,h,camX,camY,bio,skala=1){
  if(typeof document==='undefined' || !document.createElement) return;
  // Ist das Fenster (noch) 0 Pixel groß, wirft drawImage eine InvalidStateError —
  // das passiert real beim Laden in einem verborgenen Tab.
  if(w<1 || h<1) return;
  if(!gridLayer){ gridLayer=document.createElement('canvas'); gridCtx=gridLayer.getContext&&gridLayer.getContext('2d'); }
  if(!gridCtx) return;
  /* Das Raster hat eine eigene Ebene und muss derselben Auflösung folgen wie das
     Ziel — sonst bliebe es beim halbauflösenden Hintergrund die einzige Ebene in
     voller Größe und würde einen guten Teil der Ersparnis auffressen. */
  const gw=Math.max(1,Math.round(w*skala)), gh=Math.max(1,Math.round(h*skala));
  if(gridLayer.width!==gw || gridLayer.height!==gh){ gridLayer.width=gw; gridLayer.height=gh; }
  const g=gridCtx;
  g.setTransform(gw/w,0,0,gh/h,0,0);      // weiter in logischen Koordinaten zeichnen
  g.clearRect(0,0,w,h);
  /* Runde Arena-Andeutung statt Quadratgitter: konzentrische Ringe um den Spieler,
     die im Weltraum mitwandern. Wirkt organischer und ist zugleich viel billiger
     als hunderte Linien plus Knotenkreuze. */
  const cx=w/2 - (camX%1), cy=h/2 - (camY%1);
  const ringAbstand = w<600 ? 96 : 76;
  const versatz = -((Math.hypot(camX,camY)) % ringAbstand);
  g.lineWidth=1; g.strokeStyle=bio.grid;
  for(let rr=ringAbstand+versatz; rr<Math.max(w,h)*0.62; rr+=ringAbstand){
    g.beginPath(); g.arc(cx,cy,rr,0,Math.PI*2); g.stroke();
  }
  // wenige Radialstreben — geben Richtung, ohne ein Raster zu bilden
  g.strokeStyle=bio.node;
  g.beginPath();
  const dreh = (camX+camY)/900;
  for(let k=0;k<6;k++){
    const a=k*Math.PI/3 + dreh;
    g.moveTo(cx+Math.cos(a)*ringAbstand*0.8, cy+Math.sin(a)*ringAbstand*0.8);
    g.lineTo(cx+Math.cos(a)*Math.max(w,h)*0.58, cy+Math.sin(a)*Math.max(w,h)*0.58);
  }
  g.stroke();
  // nur diese Ebene zum Rand hin wegradieren
  g.save();
  g.globalCompositeOperation='destination-out';
  // Der Verlauf hängt allein an der Fenstergröße — er wurde bisher 60× pro Sekunde neu gebaut.
  const fadeKey=w+'x'+h+'@'+gw;
  if(fadeKey!==gridFadeKey){
    const fade=g.createRadialGradient(w/2,h/2,Math.min(w,h)*0.28,w/2,h/2,Math.min(w,h)*0.72);
    fade.addColorStop(0,'rgba(0,0,0,0)'); fade.addColorStop(1,'rgba(0,0,0,1)');
    gridFade=fade; gridFadeKey=fadeKey;
  }
  g.fillStyle=gridFade; g.fillRect(0,0,w,h);
  g.restore();
  // Zielgröße ausdrücklich angeben: die Ebene kann jetzt kleiner sein als das Ziel.
  ctx.drawImage(gridLayer,0,0,w,h);
}
// Staub im Vordergrund: bewegt sich SCHNELLER als die Welt und verkauft die Tiefe
function drawDust(ctx,w,h,camX,camY,bio){
  const par=1.35, span=1600;
  ctx.save(); ctx.fillStyle=bio.star; ctx.globalAlpha=0.18;
  for(const d of DUST){
    const x=((d.x-camX*par)%span+span)%span - span*0.5 + w*0.5;
    const y=((d.y-camY*par)%span+span)%span - span*0.5 + h*0.5;
    if(x<0||x>w||y<0||y>h) continue;
    ctx.beginPath(); ctx.arc(x,y,d.r,0,Math.PI*2); ctx.fill();
  }
  ctx.globalAlpha=1; ctx.restore();
}
/* Hindernisse ab Welle 10 — bewusst REINE DEKO ohne Kollision.
   Damit entfällt der Umbau an Bewegung, Projektilen und Gegner-KI (die läuft stur
   geradeaus und würde hinter echten Hindernissen verklumpen). Sie liegen in der
   Weltebene, wandern also 1:1 mit und lassen die Arena weniger leer wirken. */
function drawHindernisse(ctx,w,h,camX,camY,bio){
  const zelle=460;
  const x0=Math.floor(camX/zelle)-1, x1=Math.floor((camX+w)/zelle)+1;
  const y0=Math.floor(camY/zelle)-1, y1=Math.floor((camY+h)/zelle)+1;
  for(let cx=x0;cx<=x1;cx++) for(let cy=y0;cy<=y1;cy++){
    const h1=rnd(cx*73.1+cy*19.7);
    if(h1>0.42) continue;                       // nur ein Teil der Zellen trägt einen Felsen
    const px=cx*zelle + rnd(cx*11.3+cy*7.1)*zelle;
    const py=cy*zelle + rnd(cx*5.9+cy*23.3)*zelle;
    const gr=34 + rnd(cx*3.7+cy*13.9)*54;
    const zacken=6 + Math.floor(rnd(cx*2.2+cy*8.8)*3);
    ctx.save(); ctx.translate(px,py); ctx.rotate(rnd(cx*17.7+cy*4.4)*Math.PI);
    // Grundkörper: unregelmäßiges Vieleck, dunkel gegen den Hintergrund
    ctx.beginPath();
    for(let k=0;k<zacken;k++){
      const a=k/zacken*Math.PI*2;
      const rr=gr*(0.72+rnd(cx*31.1+cy*9.3+k)*0.42);
      const x=Math.cos(a)*rr, y=Math.sin(a)*rr*0.82;
      k?ctx.lineTo(x,y):ctx.moveTo(x,y);
    }
    ctx.closePath();
    ctx.fillStyle='rgba(8,12,20,0.88)'; ctx.fill();
    ctx.strokeStyle=bio.landColor; ctx.lineWidth=2; ctx.stroke();
    // Lichtkante oben links, damit er Volumen bekommt
    ctx.strokeStyle='rgba(255,255,255,0.10)'; ctx.lineWidth=1.5;
    ctx.beginPath(); ctx.arc(0,0,gr*0.66,Math.PI*0.9,Math.PI*1.7); ctx.stroke();
    ctx.restore();
  }
}
function drawBiomeDeko(ctx,w,h,camX,camY,bio){
  /* Deko-Punkte waren mit ~546 Einzelaufrufen pro Bild der größte Posten überhaupt.
     Jetzt als 640er-Kachel vorgerendert (10x10 Zellen). Das Muster wiederholt sich
     dadurch alle 640/Parallaxe Weltpixel — bei 0,15 also erst nach über 4000 px,
     was im Spiel nicht auffällt. */
  const KG=640, ZG=64;
  for(const par of [0.15,0.3]){
    const bild=holeKachel('deko'+par+'|'+bio.star, KG, (g)=>{
      g.fillStyle=bio.star;
      for(let cx=0;cx<KG/ZG;cx++) for(let cy=0;cy<KG/ZG;cy++){
        const hsh=Math.sin(cx*127.1+cy*311.7)*43758.5453;
        const r=hsh-Math.floor(hsh);
        if(r>0.55) continue;
        g.globalAlpha=(r+0.15)*0.85;
        const s=par>0.2?2:1.2;
        g.fillRect(cx*ZG+ZG*0.35, cy*ZG+ZG*0.45, s, s);
      }
      g.globalAlpha=1;
    });
    if(bild){ kacheln(ctx,bild,w,h,camX*par,camY*par,KG); continue; }
    // Rückfall ohne Canvas-Unterstützung
    const sx=((camX*par)%ZG+ZG)%ZG, sy=((camY*par)%ZG+ZG)%ZG;
    ctx.fillStyle=bio.star;
    for(let x=-sx;x<w;x+=ZG) for(let y=-sy;y<h;y+=ZG){
      const cxi=Math.floor((x+camX*par)/ZG), cyi=Math.floor((y+camY*par)/ZG);
      const hsh=Math.sin(cxi*127.1+cyi*311.7)*43758.5453;
      const r=hsh-Math.floor(hsh);
      if(r>0.55) continue;
      ctx.globalAlpha=(r+0.15)*0.85;
      ctx.fillRect(x+ZG*0.35, y+ZG*0.45, par>0.2?2:1.2, par>0.2?2:1.2);
    }
  }
  ctx.globalAlpha=1;
  const par=0.25, tile=2000;
  const bcx=Math.floor((camX*par)/tile), bcy=Math.floor((camY*par)/tile);
  for(let ox=-1;ox<=1;ox++) for(let oy=-1;oy<=1;oy++) drawLandmark(ctx,w,h,camX,camY,par,tile,bcx+ox,bcy+oy,bio);
}
// Landmarken je Welt-Tile. WICHTIG: der Hash kommt aus dem festen TILE-INDEX
// (Integer), NICHT aus der Live-Kamera-Position – sonst verformen und springen
// die Formen beim Laufen („sprunghafte gebogene Striche"). Position ist damit
// pro Tile fix, Bewegung nur noch die sanfte Parallax (wie bei den Sternen).
function drawLandmark(ctx,w,h,camX,camY,par,tile,ti,tj,bio){
  const hsh=Math.sin(ti*127.1+tj*311.7)*43758.5453;
  const r=hsh-Math.floor(hsh);
  const ax=ti*tile-camX*par, ay=tj*tile-camY*par;   // Anker im Sichtfeld (Parallax)
  if(ax<-1600 || ax>w+1600 || ay<-1600 || ay>h+1600) return;   // außerhalb → nicht zeichnen
  if(bio.land==='ring'){
    ctx.strokeStyle=bio.landColor; ctx.lineWidth=1.5;
    const cx=ax+260+r*900, cy=ay+200+r*700;
    ctx.beginPath(); ctx.ellipse(cx,cy, 110+r*140, 55+r*70, r*3, 0.2, Math.PI*1.7); ctx.stroke();
  } else if(bio.land==='asteroid'){
    ctx.fillStyle=bio.landColor;
    for(let k=0;k<3;k++){
      const R=30+r*70, bx=ax+((r*1000+k*370)%1300), by=ay+((r*900+k*260)%1000);
      ctx.beginPath(); ctx.moveTo(bx+R*0.5,by);
      ctx.quadraticCurveTo(bx+R,by-R*0.5,bx+R*0.2,by-R*0.7);
      ctx.quadraticCurveTo(bx-R*0.4,by-R,bx-R*0.8,by-R*0.2);
      ctx.quadraticCurveTo(bx-R,by+R*0.5,bx-R*0.3,by+R*0.6);
      ctx.closePath(); ctx.fill();
    }
  } else if(bio.land==='nebula'){
    for(let k=0;k<2;k++){
      const R=90+r*140, bx=ax+((r*700+k*520)%1300), by=ay+((r*600+k*340)%900);
      const g=ctx.createRadialGradient(bx,by,0,bx,by,R);
      g.addColorStop(0,'rgba(170,80,220,0.08)'); g.addColorStop(1,'rgba(170,80,220,0)');
      ctx.fillStyle=g; ctx.beginPath(); ctx.arc(bx,by,R,0,Math.PI*2); ctx.fill();
    }
  } else { // galaxy – langsam rotierende Spiralarme
    const bx=ax+((r*900)%1400), by=ay+((r*700)%1000), R=60+r*90;
    ctx.strokeStyle=bio.landColor; ctx.lineWidth=1.4;
    ctx.save(); ctx.translate(bx,by); ctx.rotate(r*6);
    for(let i=0;i<2;i++){ ctx.beginPath(); for(let k=0;k<=40;k++){ const f=k/40, ang=f*5.2, rad=R*f; const x=Math.cos(ang)*rad, y=Math.sin(ang)*rad; k?ctx.lineTo(x,y):ctx.moveTo(x,y);} ctx.stroke(); ctx.rotate(Math.PI); }
    ctx.restore();
  }
}
function draw(){
  const w=canvas.clientWidth||window.innerWidth,h=canvas.clientHeight||window.innerHeight;
  // Sichtbereich in Welteinheiten: bei Zoom 0,75 sieht man ein Drittel mehr Welt.
  vpW=w/weltZoom; vpH=h/weltZoom;
  ctx.clearRect(0,0,w,h);
  /* WICHTIG: Der Canvas-Zustand überlebt den Bildwechsel. Ohne diesen Reset behielt
     shadowBlur den Wert vom Ende des letzten Bildes — dadurch wurde der komplette
     Hintergrund (mehrere hundert Sterne und Deko-Punkte) weichgezeichnet. Gemessen
     waren über 600 von 750 Füll-Operationen pro Bild unnötig verwaschen, und zwar
     unabhängig von der Gegnerzahl. Das war die eigentliche Ruckel-Ursache. */
  ctx.shadowBlur=0; ctx.shadowColor='transparent';
  ctx.globalAlpha=1; ctx.globalCompositeOperation='source-over';
  bestimmeEffektstufe();
  camX = player.x - vpW/2; camY = player.y - vpH/2;   // Kamera zentriert den Spieler
  let sx=0,sy=0;
  if(shake>0){ sx=(Math.random()-0.5)*shake*2; sy=(Math.random()-0.5)*shake*2; }
  ctx.save(); ctx.translate(sx,sy);
  // — Hintergrund: Biome mit eigener Palette + Parallax-Deko; Kampfebene bleibt lesbar —
  const biome=biomeForWave();
  const now=Date.now();
  /* Tiefenebenen von hinten nach vorne: Grundfarbe, Glow, Nebel, Sterne, Landmarken,
     Tech-Raster (weltfest, zum Rand ausgeblendet, wirkt wie eine Plattform unter dem
     Spieler), Staub, Vignette. Wahlweise auf der halbauflösenden Zwischenleinwand. */
  const bg = hintergrundHalb ? holeHintergrundKontext(w,h) : null;
  if(bg){
    zeichneHintergrund(bg,w,h,biome,now,renderDpr*BG_SKALA);
    ctx.drawImage(bgLeinwand,0,0,w,h);      // hochskaliert; der Shake gilt bereits
  } else {
    zeichneHintergrund(ctx,w,h,biome,now,1);
  }
  perfMark('zHintergrund');

  // — Welt-Ebene (Kamera folgt Spieler) —
  ctx.save(); ctx.scale(weltZoom,weltZoom); ctx.translate(-camX,-camY);
  sichtbareGegner=0;
  if(wave>=CONFIG.hindernisAbWelle) drawHindernisse(ctx,vpW,vpH,camX,camY,biome);
  const bladeLen = bladeLength();
  // dezenter Reichweiten-Ring
  ctx.strokeStyle='rgba(120,180,255,0.05)'; ctx.lineWidth=1;
  ctx.beginPath(); ctx.arc(player.x,player.y, bladeLen+player.radius, 0, Math.PI*2); ctx.stroke();
  // Wirbelangriff: gefüllte, rotierende Spirale — Fläche = exakt der Trefferradius
  if(wirbelT>0){
    const t=1-wirbelT;                    // 0 -> 1 im Verlauf
    const R=wirbelShownR*Math.min(1,0.55+t*0.45);
    ctx.save(); ctx.translate(player.x,player.y);
    ctx.globalCompositeOperation='lighter';
    // Grundfläche: zeigt unmissverständlich, wie weit der Angriff reicht
    const g=ctx.createRadialGradient(0,0,R*0.15,0,0,R);
    g.addColorStop(0,'rgba(255,214,120,'+(0.34*wirbelT).toFixed(3)+')');
    g.addColorStop(0.7,'rgba(255,150,50,'+(0.18*wirbelT).toFixed(3)+')');
    g.addColorStop(1,'rgba(255,110,30,0)');
    ctx.fillStyle=g; ctx.beginPath(); ctx.arc(0,0,R,0,Math.PI*2); ctx.fill();
    // vier mitgerissene Schwaden
    ctx.rotate(t*5.0);
    ctx.strokeStyle='rgba(255,205,110,'+(0.75*wirbelT).toFixed(3)+')';
    ctx.lineWidth=3; ctx.lineCap='round';
    for(let s=0;s<4;s++){
      ctx.beginPath();
      for(let k=0;k<=16;k++){
        const f=k/16, ang=s*Math.PI/2 + f*2.1, rad=R*(0.18+f*0.82);
        const x=Math.cos(ang)*rad, y=Math.sin(ang)*rad;
        k?ctx.lineTo(x,y):ctx.moveTo(x,y);
      }
      ctx.stroke();
    }
    // scharfe Außenkante
    ctx.globalCompositeOperation='source-over';
    ctx.strokeStyle='rgba(255,190,90,'+(0.55*wirbelT).toFixed(3)+')'; ctx.lineWidth=2;
    ctx.beginPath(); ctx.arc(0,0,R,0,Math.PI*2); ctx.stroke();
    ctx.restore();
  }
  // Schockwelle (dünner Ring nach außen — bewusst anders als der Wirbel)
  if(stossWaveT>0){
    const rr = CONFIG.stossRange*(1-stossWaveT) + 8;
    ctx.save(); ctx.globalAlpha=stossWaveT*0.85;
    ctx.strokeStyle='#7cc8ff'; ctx.lineWidth=4; ctx.shadowColor='#7cc8ff'; sb(18);
    ctx.beginPath(); ctx.arc(player.x,player.y,rr,0,Math.PI*2); ctx.stroke();
    ctx.restore();
  }
  // Boss-Gefahrenzonen (z. B. Rammbock-Brandspur): kräftiger Rand, gefüllte Fläche,
  // blinkt in der letzten Sekunde vor Ablauf sichtbar aus.
  for(const hz of bossHazards){
    if(!sichtbar(hz.x,hz.y,hz.r+20)) continue;
    const blink = hz.until<1000 ? (0.35+0.65*Math.abs(Math.sin(now/90))) : 1;
    ctx.save(); ctx.translate(hz.x,hz.y);
    const farbe=hz.farbe||'#ff7a3d';
    if(hz.kind==='brand'){
      ctx.globalAlpha=blink*0.30; ctx.fillStyle=farbe;
      ctx.beginPath(); ctx.arc(0,0,hz.r,0,Math.PI*2); ctx.fill();
      ctx.globalAlpha=blink; ctx.strokeStyle=farbe; ctx.lineWidth=3;
      ctx.shadowColor=farbe; sb(14);
      ctx.stroke(); sb(0);
    } else if(hz.kind==='arm'){
      // Drehsperre: klar erkennbarer Balken mit weicher Kante an Pivot und Spitze.
      ctx.rotate(hz.ang);
      const grad=ctx.createLinearGradient(0,0,hz.len,0);
      grad.addColorStop(0, hexA(farbe,0.05));
      grad.addColorStop(0.18, hexA(farbe,0.5*blink));
      grad.addColorStop(0.85, hexA(farbe,0.5*blink));
      grad.addColorStop(1, hexA(farbe,0.08*blink));
      ctx.globalAlpha=1; ctx.fillStyle=grad;
      ctx.fillRect(0,-9,hz.len,18);
      ctx.strokeStyle=hexA(farbe,0.85*blink); ctx.lineWidth=2;
      ctx.shadowColor=farbe; sb(14);
      ctx.strokeRect(0,-9,hz.len,18); sb(0);
    }
    ctx.restore();
  }
  // Brutknoten-Leitung: sichtbare, pulsierende Verbindung vom Boss zu jedem lebenden
  // Knoten — ohne Text muss klar werden, dass sie ihn speisen.
  for(const en of enemies){
    if(en.type!=='boss' || en.hp<=0) continue;
    for(const kn of enemies){
      if(!kn.brutknoten || kn.hp<=0) continue;
      if(!sichtbar((en.x+kn.x)/2,(en.y+kn.y)/2, Math.hypot(kn.x-en.x,kn.y-en.y)/2+30)) continue;
      const puls=0.30+0.35*Math.abs(Math.sin(now/260));
      ctx.save(); ctx.globalCompositeOperation='lighter';
      ctx.strokeStyle=hexA('#4de0a0',puls); ctx.lineWidth=3;
      ctx.shadowColor='#4de0a0'; sb(12);
      ctx.beginPath(); ctx.moveTo(en.x,en.y); ctx.lineTo(kn.x,kn.y); ctx.stroke();
      sb(0); ctx.restore();
    }
  }
  // Boss-Vorwarnung je Fähigkeit: eigene Form pro Mechanik, damit klar wird, WELCHE
  // Handlung ansteht — nicht nur, DASS etwas kommt.
  for(const en of enemies){
    if(en.type!=='boss') continue;
    if(!sichtbar(en.x,en.y,CONFIG.boss.shockOuter+28)) continue;
    if(en.warnT>0){
      ctx.save(); ctx.translate(en.x,en.y); ctx.globalCompositeOperation='lighter';
      if(en.ability==='ram'){
        // Ramm-Band: zeigt die geplante Sprint-Linie, folgt dir bis zum Auslösen
        const cd=Math.cos(en.ramDir||0), sd=Math.sin(en.ramDir||0);
        ctx.strokeStyle='rgba(255,170,90,'+(0.35+0.5*en.warnT).toFixed(3)+')';
        ctx.lineWidth=4+3*en.warnT; ctx.lineCap='round';
        ctx.beginPath(); ctx.moveTo(cd*(en.radius+6), sd*(en.radius+6)); ctx.lineTo(cd*260, sd*260); ctx.stroke();
        ctx.strokeStyle='rgba(255,170,90,'+(0.5*en.warnT).toFixed(3)+')'; ctx.lineWidth=2;
        ctx.beginPath(); ctx.arc(0,0,en.radius+10,0,Math.PI*2); ctx.stroke();
      } else if(en.ability==='schild'){
        // Wachsender Bogen genau auf der Seite, die gleich gesperrt wird — zeigt die
        // Richtung, nicht nur "irgendetwas passiert".
        const bogenZiel=en.phase2?Math.PI/2:(70*Math.PI/180), bogen=bogenZiel*en.warnT;
        const dir=en.schildDir||0;
        ctx.strokeStyle='rgba('+(en.rgb||'199,125,255')+','+(0.4+0.5*en.warnT).toFixed(3)+')';
        ctx.lineWidth=7; ctx.lineCap='round'; ctx.shadowColor=en.color||'#c77dff'; sb(16);
        ctx.beginPath(); ctx.arc(0,0,en.radius+9, dir-bogen, dir+bogen); ctx.stroke(); sb(0);
      } else if(en.ability==='brut'){
        // Kurze Strahlen dorthin, wo die Knoten gleich erscheinen — die Winkel stehen
        // bereits fest (en.brutTargets), damit Vorwarnung und Spawn übereinstimmen.
        ctx.strokeStyle='rgba(77,224,160,'+(0.45+0.45*en.warnT).toFixed(3)+')'; ctx.lineWidth=3; ctx.lineCap='round';
        ctx.shadowColor='#4de0a0'; sb(12);
        for(const zt of (en.brutTargets||[])){
          ctx.beginPath();
          ctx.moveTo(Math.cos(zt.ang)*(en.radius+6), Math.sin(zt.ang)*(en.radius+6));
          ctx.lineTo(Math.cos(zt.ang)*(en.radius+6+55*en.warnT), Math.sin(zt.ang)*(en.radius+6+55*en.warnT));
          ctx.stroke();
        }
        sb(0);
      } else if(en.ability==='sperre'){
        // Kreuz/Doppelstrich in der künftigen Armstellung, dreht sich schon leicht mit
        const n=en.phase2?3:2;
        ctx.strokeStyle='rgba('+(en.rgb||'90,200,224')+','+(0.35+0.5*en.warnT).toFixed(3)+')';
        ctx.lineWidth=5; ctx.lineCap='round';
        for(let k=0;k<n;k++){
          const a=(en.sperreAng||0)+k*(Math.PI*2/n);
          ctx.beginPath();
          ctx.moveTo(Math.cos(a)*(en.radius+4), Math.sin(a)*(en.radius+4));
          ctx.lineTo(Math.cos(a)*(en.radius+30+40*en.warnT), Math.sin(a)*(en.radius+30+40*en.warnT));
          ctx.stroke();
        }
      } else if(en.ability==='minions'){
        // Kurze Ausbruchsmarken am Bossrand statt Vollring — "hier brechen sie aus"
        const n=8;
        ctx.strokeStyle='rgba(255,138,61,'+(0.4+0.5*en.warnT).toFixed(3)+')'; ctx.lineWidth=3; ctx.lineCap='round';
        for(let k=0;k<n;k++){
          const a=k*Math.PI*2/n + now/700;
          ctx.beginPath();
          ctx.moveTo(Math.cos(a)*(en.radius+2), Math.sin(a)*(en.radius+2));
          ctx.lineTo(Math.cos(a)*(en.radius+2+16*en.warnT), Math.sin(a)*(en.radius+2+16*en.warnT));
          ctx.stroke();
        }
      } else {
        // Schockwelle/Spirale: unverändert der bekannte Trefferzonen-Ring
        ctx.fillStyle='rgba('+(en.rgb||'199,125,255')+','+(0.08+0.14*en.warnT).toFixed(3)+')';
        ctx.beginPath(); ctx.arc(0,0,CONFIG.boss.shockOuter,0,Math.PI*2); ctx.arc(0,0,CONFIG.boss.shockInner,0,Math.PI*2); ctx.fill('evenodd'); // Anzeige = exakt die Trefferzone
        ctx.globalCompositeOperation='source-over';
        ctx.strokeStyle = en.ability==='spiral'? 'rgba(255,200,90,'+(0.35+0.5*en.warnT).toFixed(3)+')' : 'rgba('+(en.rgb||'199,125,255')+','+(0.45+0.5*en.warnT).toFixed(3)+')';
        ctx.lineWidth=2+3*en.warnT;
        ctx.beginPath(); ctx.arc(0,0,CONFIG.boss.shockInner+(CONFIG.boss.shockOuter-CONFIG.boss.shockInner)*en.warnT,0,Math.PI*2); ctx.stroke();   // Countdown-Rand
      }
      ctx.restore();
    }
    if(en.shockFx>0){
      ctx.save(); ctx.translate(en.x,en.y); ctx.globalCompositeOperation='lighter';
      ctx.strokeStyle='rgba('+(en.rgb||'199,125,255')+','+(0.7*en.shockFx).toFixed(3)+')'; ctx.lineWidth=10*en.shockFx+2;
      ctx.beginPath(); ctx.arc(0,0,130,0,Math.PI*2); ctx.stroke();
      ctx.restore();
    }
    if(en.schildT>0){
      // Spiegelschild: deutlicher heller Bogen auf der gesperrten Seite, direkt am Bossrand
      ctx.save(); ctx.translate(en.x,en.y); ctx.globalCompositeOperation='lighter';
      const bogen=en.phase2?Math.PI/2:(70*Math.PI/180);
      ctx.strokeStyle=en.color||'#c77dff'; ctx.lineWidth=9; ctx.lineCap='round';
      ctx.shadowColor=en.color||'#c77dff'; sb(20);
      ctx.beginPath(); ctx.arc(0,0,en.radius+8, en.schildDir-bogen, en.schildDir+bogen); ctx.stroke();
      sb(0); ctx.restore();
    }
    if(en.phaseT>0){
      // Kurze Unverwundbarkeit sichtbar machen: heller Pulsring statt stiller Pause
      ctx.save(); ctx.translate(en.x,en.y); ctx.globalCompositeOperation='lighter';
      const t=1-en.phaseT/900;
      ctx.strokeStyle='rgba(255,255,255,'+(0.8*(1-t)).toFixed(3)+')'; ctx.lineWidth=3;
      ctx.beginPath(); ctx.arc(0,0,en.radius+6+t*30,0,Math.PI*2); ctx.stroke();
      ctx.restore();
    }
  }
  // Konterstoß-Ring
  if(counterFx>0){
    ctx.save(); ctx.globalAlpha=counterFx; ctx.globalCompositeOperation='lighter';
    ctx.strokeStyle='#ff9a6b'; ctx.lineWidth=3; ctx.shadowColor='#ff9a6b'; sb(12);
    ctx.beginPath(); ctx.arc(player.x,player.y, CONFIG.abil.counterRadius*(1-counterFx)+18, 0, Math.PI*2); ctx.stroke();
    ctx.restore();
  }
  // Fragmente – die einzige Währung
  for(const c of stars){
    if(!sichtbar(c.x,c.y,18)) continue;
    ctx.save(); ctx.translate(c.x,c.y);
    ctx.shadowColor='#ffcf4d'; sb(12); ctx.fillStyle='#ffd257';
    // Kantiger Splitter statt Stern — passend zum Namen. Leichte Eigendrehung,
    // damit die Kante im Licht blitzt und man ihn im Getümmel wahrnimmt.
    ctx.rotate(Math.sin((now+c.x*7)/600)*0.5);
    ctx.beginPath();
    ctx.moveTo(0,-7.5); ctx.lineTo(4.5,-1.5); ctx.lineTo(2.6,6.5);
    ctx.lineTo(-2.8,5.8); ctx.lineTo(-4.6,-2.2);
    ctx.closePath(); ctx.fill();
    sb(0);
    ctx.fillStyle='rgba(255,255,255,0.75)';      // Glanzkante
    ctx.beginPath(); ctx.moveTo(0,-7.5); ctx.lineTo(4.5,-1.5); ctx.lineTo(1.4,-1.0); ctx.closePath(); ctx.fill();
    ctx.restore();
  }
  // XP-Orbs – kleine leuchtende Kugeln, große = Boss-Orb
  for(const o of orbs){
    if(!sichtbar(o.x,o.y,22)) continue;
    ctx.save(); ctx.translate(o.x,o.y);
    const r=o.r*(o.big?1.7:1)*(1+0.15*Math.sin(now/120));
    // Lebenskugeln rot, XP-Orbs blau — die Farbe muss auf einen Blick sagen, was es ist
    const oc = o.hp? '#ff5a5a' : (o.big?'#9fd6ff':'#6ec8ff');
    sbc(oc,14); ctx.fillStyle=oc;
    ctx.beginPath(); ctx.arc(0,0,r,0,Math.PI*2); ctx.fill();
    sb(0);
    if(o.hp){                                  // kleines Kreuz macht die Heilung eindeutig
      ctx.fillStyle='rgba(255,255,255,0.9)';
      ctx.fillRect(-r*0.55,-r*0.18,r*1.1,r*0.36);
      ctx.fillRect(-r*0.18,-r*0.55,r*0.36,r*1.1);
    } else {
      ctx.fillStyle='rgba(255,255,255,0.6)';
      ctx.beginPath(); ctx.arc(-r*0.25,-r*0.3,r*0.35,0,Math.PI*2); ctx.fill();
    }
    ctx.restore();
  }
  perfMark('zWeltFx');
  // enemies – futuristische Neon-Silhouetten
  if(zeichenEbenen.gegner) for(const en of enemies){
    const r=en.radius;
    if(!sichtbar(en.x,en.y,r*2.5+18)) continue;
    sichtbareGegner++;
    const ang = Math.atan2(player.y-en.y, player.x-en.x);
    // Lichtaura in Gegnerfarbe: hebt die Figur vom jetzt reicheren Hintergrund ab
    // und macht auf einen Blick klar, welcher Typ da kommt.
    if(fxAn){
      ctx.save(); ctx.globalCompositeOperation='lighter';
      const hg=ctx.createRadialGradient(en.x,en.y,0,en.x,en.y,r*2.1);
      hg.addColorStop(0, hexA(en.color,0.20)); hg.addColorStop(1, hexA(en.color,0));
      ctx.fillStyle=hg; ctx.beginPath(); ctx.arc(en.x,en.y,r*2.1,0,Math.PI*2); ctx.fill();
      ctx.restore();
    }
    if(en.bossMinion || en.shockMarkUntil>now || en.gravKernUntil>now || en.panzerAusUntil>now){
      ctx.save(); ctx.translate(en.x,en.y); ctx.setLineDash([4,4]); ctx.lineWidth=2;
      ctx.strokeStyle=en.bossMinion?'#4de0a0':en.shockMarkUntil>now?'#9ad0ff':en.gravKernUntil>now?'#4de0a0':'#ffffff';
      ctx.beginPath(); ctx.arc(0,0,r+6+Math.sin(now/100)*2,0,Math.PI*2); ctx.stroke(); ctx.restore();
    }
    // Bodenschatten (nicht rotiert)
    ctx.fillStyle='rgba(0,0,0,0.35)'; ctx.beginPath(); ctx.ellipse(en.x, en.y+r*0.75, r*0.85, r*0.35,0,0,Math.PI*2); ctx.fill();
    ctx.save(); ctx.translate(en.x,en.y); ctx.rotate(ang);
    ctx.lineJoin='round'; sbc(en.color,15); ctx.strokeStyle=en.color; ctx.lineWidth=2.5;
    const tNow=now;
    if(en.type==='drohne'){
      // Drohne: schnelle Pfeil-/Rautenform, Sensorauge pulsiert beim Scannen
      ctx.fillStyle='#0a1526';
      ctx.beginPath(); ctx.moveTo(r,0); ctx.lineTo(-r*0.2,r*0.8); ctx.lineTo(-r*0.7,0); ctx.lineTo(-r*0.2,-r*0.8); ctx.closePath(); ctx.fill(); ctx.stroke();
      const eye=0.12*Math.sin(tNow/90);
      sb(6); ctx.fillStyle=en.color; ctx.beginPath(); ctx.arc(r*0.28,0,r*0.2+eye,0,Math.PI*2); ctx.fill();
    } else if(en.type==='soldat'){
      // Soldat: gepanzertes Quadrat, Visier-Glow pulsiert („atmet")
      ctx.fillStyle='#1c1020';
      ctx.beginPath(); ctx.roundRect(-r*0.8,-r*0.8,r*1.6,r*1.6,6); ctx.fill(); ctx.stroke();
      sb(6+4*Math.sin(tNow/110)); ctx.fillStyle=en.color; ctx.beginPath(); ctx.roundRect(r*0.02,-r*0.3,r*0.5,r*0.6,3); ctx.fill();
    } else if(en.type==='schwer'){
      // Schwer: massiver Hexpanzer, Reaktorkern pulsiert
      ctx.fillStyle='#1e0d0d';
      hexPath(ctx,r); ctx.fill(); ctx.stroke();
      const core=1+0.18*Math.sin(tNow/130);
      sb(6); ctx.fillStyle=en.color; ctx.beginPath(); ctx.arc(0,0,r*0.34*core,0,Math.PI*2); ctx.fill();
    } else if(en.type==='panzer'){
      /* Panzer: massive Platten mit sichtbaren Fugen. Der Umriss muss auf einen Blick
         „hier prallt etwas ab" sagen, sonst wirkt der reduzierte Schaden wie ein Fehler. */
      ctx.fillStyle='#141b26';
      hexPath(ctx,r); ctx.fill();
      ctx.lineWidth=3; ctx.strokeStyle=en.color; ctx.stroke(); ctx.lineWidth=1.5;
      // Plattenfugen
      ctx.strokeStyle='rgba(200,215,235,0.35)';
      for(let i=0;i<3;i++){
        const a=i*Math.PI/3 + tNow/2600;
        ctx.beginPath();
        ctx.moveTo(Math.cos(a)*r*0.35, Math.sin(a)*r*0.35);
        ctx.lineTo(Math.cos(a)*r*0.92, Math.sin(a)*r*0.92);
        ctx.stroke();
      }
      // Kern: die verwundbare Stelle, sichtbar aber klein
      sb(7); ctx.fillStyle=en.color;
      ctx.beginPath(); ctx.arc(0,0,r*0.22,0,Math.PI*2); ctx.fill(); sb(0);
    } else if(en.type==='jaeger'){
      // Jäger: spitzer Pfeil mit Lauf nach vorn; Flügel-Flossen flattern, beim Laden glüht die Mündung
      ctx.fillStyle='#16100a';
      ctx.beginPath(); ctx.moveTo(r+4,0); ctx.lineTo(-r*0.5,r*0.7); ctx.lineTo(-r*0.8,0); ctx.lineTo(-r*0.5,-r*0.7); ctx.closePath(); ctx.fill(); ctx.stroke();
      const flap=Math.sin(tNow/70)*3;
      ctx.fillStyle='rgba(255,210,87,0.7)';
      ctx.beginPath(); ctx.moveTo(-r*0.2,r*0.3); ctx.lineTo(-r*0.7,r*0.7+flap); ctx.lineTo(-r*0.6,r*0.1); ctx.closePath(); ctx.fill();
      ctx.beginPath(); ctx.moveTo(-r*0.2,-r*0.3); ctx.lineTo(-r*0.7,-r*0.7-flap); ctx.lineTo(-r*0.6,-r*0.1); ctx.closePath(); ctx.fill();
      if(en.chargeT>0){
        sb(18); ctx.fillStyle='#ffe28a';
        ctx.beginPath(); ctx.arc(r+6,0,2.5+en.chargeT*6/CONFIG.jaeger.chargeMs,0,Math.PI*2); ctx.fill();
      } else {
        sb(6); ctx.fillStyle=en.color; ctx.beginPath(); ctx.arc(r*0.35,0,r*0.18,0,Math.PI*2); ctx.fill();
      }
    } else if(en.type==='exploder'){
      // Exploder: gepanzerte Kugel mit pulsierendem Kern; beim Zünden wächst ein heller Ring
      ctx.fillStyle='#2a0a18';
      ctx.beginPath(); ctx.arc(0,0,r*0.95,0,Math.PI*2); ctx.fill(); ctx.stroke();
      const pulse = 1+0.15*Math.sin(now/140);
      sb(10); ctx.fillStyle=en.exploding? '#ffd257' : en.color;
      ctx.beginPath(); ctx.arc(0,0,r*0.32*pulse,0,Math.PI*2); ctx.fill();
      if(en.exploding){
        const ft=Math.max(0, en.explodeT/CONFIG.exploder.fuseMs);   // 1 -> 0 während des Zündens
        sb(30); ctx.strokeStyle='rgba(255,90,162,'+(0.4+(1-ft)*0.6).toFixed(2)+')'; ctx.lineWidth=3;
        ctx.beginPath(); ctx.arc(0,0,r*0.9+(1-ft)*20,0,Math.PI*2); ctx.stroke();
      }
    } else if(en.type==='knoten'){
      // Brutknoten: unbewegliche Kapsel, pulsiert im Rhythmus der Bossheilung
      ctx.fillStyle='#0a2018';
      ctx.beginPath(); ctx.arc(0,0,r*0.9,0,Math.PI*2); ctx.fill(); ctx.stroke();
      const puls=1+0.18*Math.sin(tNow/220);
      sb(10); ctx.fillStyle=en.color;
      ctx.beginPath(); ctx.arc(0,0,r*0.42*puls,0,Math.PI*2); ctx.fill();
    } else { // boss — mehrteilige Erscheinung: gegenläufige Ringe, Panzerplatten, Auge
      const wob=1+0.05*Math.sin(tNow/200);
      const charging = en.warnT>0;               // lädt gerade eine Fähigkeit
      const form = (BOSS_KINDS.find(k=>k.id===en.kind)||BOSS_KINDS[0]).form;
      const rgb = en.rgb || '199,125,255';
      // 1) Äußerer Trabantenring, gegenläufig — vermittelt Masse und Maschine
      ctx.save(); ctx.rotate(-tNow/2600);
      ctx.strokeStyle='rgba('+rgb+',0.30)'; ctx.lineWidth=2; sb(10);
      ctx.beginPath(); ctx.arc(0,0,(r+20)*wob,0,Math.PI*2); ctx.stroke();
      const trabanten = form==='ring'? 10 : 6;
      for(let k=0;k<trabanten;k++){
        const a=k*Math.PI*2/trabanten, rr=(r+20)*wob;
        ctx.fillStyle= charging? '#ffd257' : en.color;
        ctx.beginPath(); ctx.arc(Math.cos(a)*rr, Math.sin(a)*rr, 3.4, 0, Math.PI*2); ctx.fill();
      }
      ctx.restore();
      // 2) Innerer Ring, mitlaufend
      ctx.save(); ctx.rotate(tNow/1500);
      ctx.strokeStyle='rgba('+rgb+',0.5)'; ctx.lineWidth=5; sb(14);
      ctx.setLineDash([r*0.9, r*0.55]);
      ctx.beginPath(); ctx.arc(0,0,(r+9)*wob,0,Math.PI*2); ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
      // 3) Panzerkörper — je Variante eine eigene Silhouette
      ctx.lineWidth=3; ctx.fillStyle='#140a1e';
      if(form==='organic'){
        // Brutmutter: rundlicher, atmender Leib mit Brutkammern
        const atem=1+0.07*Math.sin(tNow/430);
        ctx.beginPath(); ctx.ellipse(0,0,r*1.05*atem,r*0.92*atem,0,0,Math.PI*2); ctx.fill(); ctx.stroke();
        ctx.fillStyle='rgba('+rgb+',0.35)';
        for(let k=0;k<5;k++){
          const a=k*Math.PI*2/5 + tNow/2400;
          ctx.beginPath(); ctx.arc(Math.cos(a)*r*0.55, Math.sin(a)*r*0.55, r*0.19*atem, 0, Math.PI*2); ctx.fill();
        }
      } else if(form==='wedge'){
        // Rammbock: schwerer Keil, Spitze zeigt in Laufrichtung (Körper ist bereits gedreht)
        ctx.beginPath();
        ctx.moveTo(r*1.15,0); ctx.lineTo(r*0.1,r*0.95); ctx.lineTo(-r*0.85,r*0.55);
        ctx.lineTo(-r*0.85,-r*0.55); ctx.lineTo(r*0.1,-r*0.95);
        ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.fillStyle='rgba('+rgb+',0.5)';       // Rammplatte vorn
        ctx.beginPath(); ctx.roundRect(r*0.55,-r*0.42,r*0.36,r*0.84,4); ctx.fill(); ctx.stroke();
      } else if(form==='ring'){
        // Spiralwerfer: schlanker Kern mit weit auskragenden Werferarmen
        ctx.beginPath(); ctx.arc(0,0,r*0.72,0,Math.PI*2); ctx.fill(); ctx.stroke();
        ctx.save(); ctx.rotate(tNow/900);
        ctx.strokeStyle=en.color; ctx.lineWidth=4; sb(12);
        for(let k=0;k<3;k++){
          const a=k*Math.PI*2/3;
          ctx.beginPath(); ctx.moveTo(Math.cos(a)*r*0.6, Math.sin(a)*r*0.6);
          ctx.lineTo(Math.cos(a)*r*1.25, Math.sin(a)*r*1.25); ctx.stroke();
        }
        ctx.restore();
      } else {
        // Wächter: die bekannte Hexplatte mit Segmenten
        hexPath(ctx,r); ctx.fill(); ctx.stroke();
        ctx.fillStyle='rgba('+rgb+',0.22)';
        for(let k=0;k<6;k++){
          const a=k*Math.PI/3+Math.PI/6;
          ctx.save(); ctx.rotate(a);
          ctx.beginPath(); ctx.roundRect(r*0.52,-r*0.20,r*0.42,r*0.40,3); ctx.fill(); ctx.stroke();
          ctx.restore();
        }
      }
      // 4) Auge: großer Kern mit Iris; beim Aufladen wechselt es auf Warnfarbe
      const bossCore=1+0.2*Math.sin(tNow/160);
      const eyeCol = charging ? '#ffd257' : en.color;
      ctx.shadowColor=eyeCol; sb(charging?22:10);
      ctx.fillStyle=eyeCol;
      ctx.beginPath(); ctx.arc(r*0.10,0,r*0.40*bossCore,0,Math.PI*2); ctx.fill();
      ctx.fillStyle='#1a0a26';
      ctx.beginPath(); ctx.ellipse(r*0.16,0, r*0.13, r*0.28*bossCore, 0,0,Math.PI*2); ctx.fill();
      sb(0); ctx.fillStyle='#fff';
      ctx.beginPath(); ctx.arc(r*0.24,-r*0.06,r*0.07,0,Math.PI*2); ctx.fill();
      // 5) Energiezacken beim Aufladen — der Boss zeigt an, dass gleich etwas kommt
      if(charging){
        ctx.strokeStyle='rgba(255,210,87,'+(0.35+0.5*en.warnT).toFixed(2)+')'; ctx.lineWidth=2;
        for(let k=0;k<8;k++){
          const a=k*Math.PI/4 + tNow/300, l=r*(1.15+0.45*en.warnT);
          ctx.beginPath(); ctx.moveTo(Math.cos(a)*r*0.95, Math.sin(a)*r*0.95);
          ctx.lineTo(Math.cos(a)*l, Math.sin(a)*l); ctx.stroke();
        }
      }
    }
    ctx.restore();
    // Nova-Stun: kurzes weißes Blinken zeigt den Stun an
    if(en.stunT>0 && Math.floor(now/110)%2===0){
      ctx.strokeStyle='rgba(255,255,255,0.7)'; ctx.lineWidth=1.5;
      ctx.beginPath(); ctx.arc(en.x,en.y,r+6,0,Math.PI*2); ctx.stroke();
    }
    // Klingentreffer: Gegner blitzt kurz weiß auf (über der Silhouette)
    if(en.flashT>0){
      ctx.save(); ctx.globalCompositeOperation='lighter';
      ctx.globalAlpha=en.flashT*0.85; ctx.fillStyle='#ffffff';
      ctx.beginPath(); ctx.arc(en.x,en.y,r*1.05,0,Math.PI*2); ctx.fill();
      ctx.restore();
    }
    // HP-Bar (clean)
    const bw=r*2.4, bh=4, by=en.y-r-13;
    ctx.fillStyle='rgba(255,255,255,0.12)'; ctx.beginPath(); ctx.roundRect(en.x-bw/2,by,bw,bh,2); ctx.fill();
    ctx.fillStyle=en.type==='boss'?(en.color||'#c77dff'):'#4de0a0'; ctx.beginPath(); ctx.roundRect(en.x-bw/2,by,bw*Math.max(0,en.hp/en.maxHp),bh,2); ctx.fill();
  }
  perfMark('zGegner');
  // Projektile (Distanz-Gegner) – leuchtender Schweif + weißer Kern
  ctx.save(); ctx.globalCompositeOperation='lighter';
  for(const s of shots){
    if(!sichtbar(s.x,s.y,26)) continue;
    ctx.strokeStyle=s.color; sbc(s.color,14); ctx.lineWidth=3; ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(s.x - s.vx*0.035, s.y - s.vy*0.035); ctx.lineTo(s.x, s.y); ctx.stroke();
    ctx.fillStyle='#fff'; sb(18);
    ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fill();
  }
  // Eigene Projektile; Phaser übernimmt die Klingenfarbe und eine längere Strichform.
  for(const s of pShots){
    if(!sichtbar(s.x,s.y,22)) continue;
    const shotColor=s.moduleColor||(s.spectral?'#c77dff':'#9ad0ff');
    ctx.strokeStyle=shotColor; sbc(shotColor,12); ctx.lineWidth=3; ctx.lineCap='round';
    const spur=s.kind==='phaser'?.055:.03;
    ctx.beginPath(); ctx.moveTo(s.x - s.vx*spur, s.y - s.vy*spur); ctx.lineTo(s.x, s.y); ctx.stroke();
    ctx.fillStyle='#eaf6ff'; sb(14);
    ctx.beginPath(); ctx.arc(s.x,s.y,4,0,Math.PI*2); ctx.fill();
  }
  // Anhaltende Machtfelder: dezent genug für Lesbarkeit, aber als neue
  // Mechanik sofort erkennbar.
  for(const f of powerFields){
    if(f.hidden || !Number.isFinite(f.r)) continue;
    if(!sichtbar(f.x,f.y,f.r+16)) continue;
    if(f.kind==='brandspur'){
      // Verkohltes Mal mit drei Glutzungen statt eines weiteren Trefferrings.
      const fade=Math.min(1,Math.max(0,f.t/360)), pulse=.8+.2*Math.sin(now/95+f.ang);
      ctx.save(); ctx.translate(f.x,f.y); ctx.rotate(f.ang); ctx.globalAlpha=fade;
      ctx.globalCompositeOperation='source-over'; ctx.fillStyle='rgba(65,24,12,.5)'; sb(0);
      ctx.beginPath(); ctx.ellipse(0,0,f.r,f.r*.72,0,0,Math.PI*2); ctx.fill();
      ctx.globalCompositeOperation='lighter'; ctx.strokeStyle=f.color; sbc(f.color,8);
      ctx.lineWidth=2.5; ctx.lineCap='round';
      for(let k=-1;k<=1;k++){
        const x=k*f.r*.4, h=f.r*(k===0?.75:.45)*pulse;
        ctx.beginPath(); ctx.moveTo(x,f.r*.35); ctx.quadraticCurveTo(x-f.r*.25,0,x,-h); ctx.stroke();
      }
      ctx.strokeStyle='#ffe1a0'; ctx.lineWidth=1.2;
      ctx.beginPath(); ctx.moveTo(-f.r*.25,2); ctx.lineTo(0,-f.r*.35); ctx.lineTo(f.r*.2,1); ctx.stroke();
      ctx.restore(); continue;
    }
    const rest=Math.max(0,Math.min(1,f.t/1900));
    ctx.save(); ctx.globalAlpha=.18+.22*rest; ctx.fillStyle=f.color; ctx.strokeStyle=f.color;
    ctx.setLineDash(f.kind==='stase'?[5,7]:[12,5]); ctx.lineDashOffset=-now/65;
    ctx.lineWidth=2; ctx.beginPath(); ctx.arc(f.x,f.y,f.r,0,Math.PI*2); ctx.fill(); ctx.stroke();
    ctx.restore();
  }
  // Orbitkrone-Durchschlag: eigener Strahl statt der Kreisdarstellung oben, da er keine
  // Fläche sondern eine Linie ist. Kurz und deutlich, wie im Konzept gefordert.
  for(const f of powerFields){
    if(f.kind!=='strahl') continue;
    const mx=f.x+Math.cos(f.ang)*f.len/2, my=f.y+Math.sin(f.ang)*f.len/2;
    if(!sichtbar(mx,my,f.len/2+f.half)) continue;
    ctx.save(); ctx.globalAlpha=Math.max(0,f.t/f.max); ctx.strokeStyle=f.color; ctx.lineWidth=f.half*2; ctx.lineCap='round';
    sbc(f.color,30);
    ctx.beginPath(); ctx.moveTo(f.x,f.y); ctx.lineTo(f.x+Math.cos(f.ang)*f.len, f.y+Math.sin(f.ang)*f.len); ctx.stroke();
    ctx.restore();
  }
  // Bomben: ticken – Kern wächst, Ring läuft ab (Zünd-Anzeige)
  for(const b of bombs){
    if(!sichtbar(b.x,b.y,30)) continue;
    const frac=Math.max(0, b.t/b.max);
    ctx.strokeStyle='#ff7a5a'; ctx.fillStyle='rgba(255,122,90,0.10)'; sbc('#ff7a5a',18);
    ctx.beginPath(); ctx.arc(b.x,b.y,14,0,Math.PI*2); ctx.fill();
    ctx.lineWidth=3; ctx.beginPath(); ctx.arc(b.x,b.y,14,0,Math.PI*2*frac); ctx.stroke();
    ctx.lineWidth=1.5; ctx.beginPath(); ctx.arc(b.x,b.y,22,0,Math.PI*2); ctx.stroke();
    sb(0);
  }
  // Nova-Effekt: expandierender elektrischer Ring
  if(novaFx>0){
    const p=1-novaFx;
    ctx.strokeStyle=`rgba(199,125,255,${(0.75*(1-p)).toFixed(3)})`; ctx.lineWidth=3+4*p; ctx.shadowColor='#c77dff'; sb(24);
    ctx.beginPath(); ctx.arc(player.x,player.y,CONFIG.nova.range*p,0,Math.PI*2); ctx.stroke();
  }
  ctx.restore();

  perfMark('zProjektile');
  const angles=bladeAngles();
  if(now<tutorialCircleUntil){
    ctx.save(); ctx.strokeStyle='rgba(110,200,255,.9)'; ctx.lineWidth=2; ctx.setLineDash([7,6]); ctx.lineDashOffset=-now/80;
    ctx.shadowColor='#6ec8ff'; sb(14); ctx.beginPath(); ctx.arc(player.x,player.y,player.radius+bladeLen,0,Math.PI*2); ctx.stroke(); ctx.restore();
  }
  if(now<tutorialBladeUntil || treeFlags.upgradeGlowUntil>now){
    ctx.save(); ctx.translate(player.x,player.y); ctx.globalCompositeOperation='lighter';
    ctx.strokeStyle=now<tutorialBladeUntil?'rgba(255,255,255,.9)':'rgba(77,224,160,.65)'; ctx.lineWidth=4;
    for(const a of angles){ctx.beginPath();ctx.arc(0,0,player.radius+bladeLen*.72,a-.22,a+.22);ctx.stroke();}
    ctx.restore();
  }
  // — Spieler —
  const skin=currentSkin(), KLINGE=skin.blade;
  const KLINGE_KERN=figur().id==='held'&&orbitRoundLight?'#fff1ae':skin.core;
  const SPUR=sonnenTempoUntil>now?'#ffd257':KLINGE;
  // Nachleuchten jeder Klinge
  ctx.save(); ctx.translate(player.x,player.y);
  for(const a of angles){
    for(let i=1;i<=5;i++){
      ctx.save(); ctx.rotate(a - i*0.16);
      ctx.globalAlpha=0.12*(1-i/6); ctx.fillStyle=SPUR;
      ctx.beginPath(); ctx.roundRect(player.radius, -2.5, bladeLen, 5, 2.5); ctx.fill();
      ctx.restore();
    }
  }
  ctx.restore();

  ctx.save(); ctx.translate(player.x,player.y);
  // Bodenschatten (bleibt am Boden, die Figur bobbelt darüber). Das schwebende
  // Die schwebende Leerenklinge wirft einen kleineren, weicheren Schatten.
  const schwebt = currentFigur()===FIGUREN.konstrukt;
  ctx.fillStyle = schwebt? 'rgba(0,0,0,0.30)' : 'rgba(0,0,0,0.45)';
  ctx.beginPath(); ctx.ellipse(0,16, schwebt?11:16, schwebt?4:6, 0,0,Math.PI*2); ctx.fill();
  const moving = Math.hypot(moveVec.x,moveVec.y)>0.01;
  const bob = Math.sin(player.bobPhase||0);
  ctx.translate(0, bob*2.2);
  // Schild
  if(now<shieldUntil){
    ctx.strokeStyle='rgba(124,200,255,0.9)'; ctx.lineWidth=2; ctx.shadowColor='#7cc8ff'; sb(16);
    ctx.beginPath(); ctx.arc(0,0,player.radius+13,0,Math.PI*2); ctx.stroke(); sb(0);
  }
  // Barriere: eine Hülle, deren Deckkraft zeigt, wie viel noch übrig ist
  if(barriere>0.5){
    const anteil=Math.max(0.15, Math.min(1, barriere/barriereMax()));
    ctx.strokeStyle='rgba(124,200,255,'+(0.22+0.5*anteil).toFixed(2)+')'; ctx.lineWidth=3;
    ctx.beginPath(); ctx.arc(0,0,player.radius+8,0,Math.PI*2); ctx.stroke();
    ctx.fillStyle='rgba(124,200,255,'+(0.05+0.08*anteil).toFixed(2)+')';
    ctx.beginPath(); ctx.arc(0,0,player.radius+8,0,Math.PI*2); ctx.fill();
  }
  if(waechterLadung){ ctx.fillStyle='#ffd257'; ctx.shadowColor='#ffd257'; sb(8); ctx.beginPath(); ctx.arc(player.radius+8,-player.radius-3,3,0,Math.PI*2); ctx.fill(); sb(0); }
  if(treeFlags.sonnenjaeger && sonnenSerie>0){
    ctx.strokeStyle='rgba(255,210,87,.9)'; ctx.lineWidth=2;
    for(let si=0;si<Math.min(2,sonnenSerie);si++){ const sa=-1.2+si*2.4; ctx.beginPath(); ctx.arc(0,0,player.radius+13,sa-.28,sa+.28); ctx.stroke(); }
  }
  if(figur().id==='held' && orbitRoundDistance>0){
    ctx.strokeStyle=orbitRoundLight?'rgba(255,241,174,.98)':'rgba(255,210,87,.78)'; ctx.lineWidth=orbitRoundLight?2.4:1.5;
    if(orbitRoundLight){ ctx.shadowColor='#ffd257'; sb(10); }
    ctx.beginPath(); ctx.arc(0,0,player.radius+19,-Math.PI/2,-Math.PI/2+Math.PI*2*(orbitRoundDistance/110)); ctx.stroke();
    if(orbitRoundLight) sb(0);
  }
  // Voller Fokus bleibt bis zum Einsatz direkt am Spieler sichtbar. Das verbindet
  // den violetten Button-Ring mit dem Geschehen in der Arena, ohne neue HUD-Zeile.
  if(fokusBereit){
    const fp=.55+.18*Math.sin(now/150);
    ctx.strokeStyle='rgba(220,181,255,'+fp.toFixed(2)+')'; ctx.lineWidth=2.4;
    ctx.shadowColor='#c77dff'; sb(14);
    ctx.beginPath(); ctx.arc(0,0,player.radius+16+Math.sin(now/240)*1.5,0,Math.PI*2); ctx.stroke(); sb(0);
  }
  if(metaLevel('hangarprojektion')){
    ctx.save(); ctx.setLineDash([3,6]); ctx.lineDashOffset=-now/140;
    ctx.strokeStyle='rgba(110,200,255,.34)'; ctx.lineWidth=1.2;
    ctx.beginPath(); ctx.ellipse(0,0,player.radius+17,player.radius+8,now/1800,0,Math.PI*2); ctx.stroke(); ctx.restore();
  }
  if(hatLeerenhunger() && player.hp/player.maxHp<.5){
    const puls=0.58+Math.sin(now/90)*0.10;
    ctx.strokeStyle='rgba(199,125,255,'+puls.toFixed(2)+')'; ctx.lineWidth=2.5;
    ctx.shadowColor='#c77dff'; sb(18);
    ctx.beginPath(); ctx.arc(0,0,player.radius+12,0,Math.PI*2); ctx.stroke(); sb(0);
  }
  const lean = moving ? moveVec.x*7 : 0;
  // Figur — welche gezeichnet wird, kommt aus der Sammlung
  if(schwebt) zeichneLeerenklingeNeu(ctx, lean, KLINGE, KLINGE_KERN, sb);
  else zeichneLichthueterNeu(ctx, moving, lean, player.bobPhase||0, KLINGE, sb);
  // Plasmaklinge(n) – rotieren permanent, Form kommt aus der Sammlung
  for(let bi=0;bi<angles.length;bi++){
    const a=angles[bi];
    ctx.save(); ctx.rotate(a);
    if(treeFlags.kronenform==='dopp'&&kronenMachtId&&kronenMachtUntil>now&&bi===kronenZielklinge){
      ctx.strokeStyle='#ffd257';ctx.lineWidth=3;ctx.shadowColor='#ffd257';sb(14);
      ctx.beginPath();ctx.roundRect(player.radius-2,-5,bladeLen+4,10,5);ctx.stroke();
      ctx.fillStyle='#fff1ae';ctx.beginPath();ctx.arc(player.radius+bladeLen+4,0,3.5,0,Math.PI*2);ctx.fill();sb(0);
    }
    zeichneKlinge(ctx, player.radius, bladeLen, currentForm(), KLINGE, KLINGE_KERN, sb);
    ctx.restore();
  }
  ctx.restore();
  /* Der Begleiter: ein Körper, dem man beide Aufgaben ansieht — die grüne Sammelaura
     und das blaue Auge, mit dem er zielt. Höhere Stufen zeigen zusätzliche Ringe,
     damit ein Kauf auch sichtbar etwas verändert. */
  for(const hf of helfer){
    if(hf.x===undefined) continue;
    ctx.save(); ctx.translate(hf.x,hf.y);
    const puls=1+0.12*Math.sin(Date.now()/220 + hf.ang), ueberladen=helferOverdriveUntil>Date.now();
    if(ueberladen){
      ctx.strokeStyle='rgba(255,210,87,.82)';ctx.lineWidth=2.3;ctx.shadowColor='#ffd257';sb(16);
      ctx.beginPath();ctx.arc(0,0,14+Math.sin(now/90)*1.5,0,Math.PI*2);ctx.stroke();sb(0);
    }
    // Sammelaura
    ctx.strokeStyle='rgba(77,224,160,0.30)'; ctx.lineWidth=1;
    ctx.beginPath(); ctx.arc(0,0,10,0,Math.PI*2); ctx.stroke();
    // Rumpf, dreht sich in Blickrichtung
    ctx.rotate(hf.ang*1.6);
    ctx.shadowColor=ueberladen?'#ffd257':'#9ad0ff'; sb(ueberladen?18:12); ctx.fillStyle='#0d1a2c';
    ctx.beginPath(); ctx.roundRect(-6,-5,12,10,3); ctx.fill();
    ctx.strokeStyle='#9ad0ff'; ctx.lineWidth=1.6; ctx.stroke();
    sb(0);
    // Stufenmarken: je Stufe ein kurzer Strich am Rumpf
    ctx.strokeStyle='#4de0a0'; ctx.lineWidth=1.4;
    for(let s=0; s<Math.min(hf.stufe||1, CONFIG.helfer.maxStufe); s++){
      const a=Math.PI*0.75 + s*0.32;
      ctx.beginPath();
      ctx.moveTo(Math.cos(a)*8, Math.sin(a)*8);
      ctx.lineTo(Math.cos(a)*11, Math.sin(a)*11);
      ctx.stroke();
    }
    // Zielauge
    ctx.fillStyle='#bfe3ff';
    ctx.beginPath(); ctx.arc(3.5,0,2.2*puls,0,Math.PI*2); ctx.fill();
    ctx.restore();
  }
  // kreisende Splitter
  if(shards.length){
    ctx.save(); ctx.globalCompositeOperation='lighter';
    for(const s of shards){
      if(s.kind==='funkenkranz'){
        const color=['#3bd17a','#35e0e0'].includes(currentSkin().blade)?'#ffb5f5':'#65ffe0';
        sbc(color,12); ctx.strokeStyle=color; ctx.lineWidth=2; ctx.lineCap='round';
        ctx.beginPath(); ctx.arc(player.x,player.y,s.r,s.ang,s.ang+.42); ctx.stroke();
        ctx.save(); ctx.translate(s.x,s.y); ctx.rotate(s.ang-Math.PI/2); ctx.scale(s.size/7,s.size/7);
        ctx.fillStyle=color; ctx.beginPath(); ctx.moveTo(9,0); ctx.lineTo(-3,6); ctx.lineTo(-7,0); ctx.lineTo(-3,-6); ctx.closePath(); ctx.fill();
        ctx.fillStyle='#fff'; ctx.beginPath(); ctx.arc(0,0,2,0,Math.PI*2); ctx.fill();
        ctx.restore(); continue;
      }
      sbc('#9ad0ff',10); ctx.fillStyle='#bfe3ff';
      ctx.beginPath(); ctx.arc(s.x,s.y,4.5,0,Math.PI*2); ctx.fill();
    }
    ctx.restore();
  }
  perfMark('zSpieler');
  // particles (additiv = leuchtend)
  ctx.globalCompositeOperation='lighter';
  if(zeichenEbenen.partikel) for(const p of particles){
    if(p.sword) continue;   // Blade-Trail wird direkt am Spieler gezeichnet
    if(p.bolt){
      if(!sichtbar(p.x,p.y,40) && !sichtbar(p.x2,p.y2,40)) continue;
    } else if(!sichtbar(p.x,p.y,50)) continue;
    ctx.globalAlpha=Math.max(0,p.life/(p.max||0.6));
    if(p.bolt){   // Kettenblitz: zackige Linie zwischen zwei Gegnern
      ctx.strokeStyle='#bfe3ff'; ctx.lineWidth=2; sbc('#9ad0ff',8);
      ctx.beginPath(); ctx.moveTo(p.x,p.y);
      const seg=4; for(let k=1;k<seg;k++){ const f=k/seg; ctx.lineTo(p.x+(p.x2-p.x)*f+(Math.random()-0.5)*10, p.y+(p.y2-p.y)*f+(Math.random()-0.5)*10); }
      ctx.lineTo(p.x2,p.y2); ctx.stroke(); sb(0); continue;
    }
    if(p.ring){   // Sweet-Spot-Funkenring: dehnt sich kurz auf und verblasst
      const t=1-p.life/p.max, rr=6+t*22;
      ctx.strokeStyle=p.color; ctx.lineWidth=3*(1-t)+0.5;
      sbc(p.color,12);
      ctx.beginPath(); ctx.arc(p.x,p.y,rr,0,Math.PI*2); ctx.stroke(); sb(0); continue;
    }
    if(p.stormRing){
      const t=1-p.life/p.max, rr=p.r*(.52+.48*t);
      ctx.strokeStyle='#ffd257'; ctx.lineWidth=2.5; ctx.setLineDash([12,8]); ctx.lineDashOffset=now/90;
      ctx.beginPath(); ctx.arc(p.x,p.y,rr,0,Math.PI*2); ctx.stroke();
      ctx.lineDashOffset=-now/75; ctx.globalAlpha*=.72;
      ctx.beginPath(); ctx.arc(p.x,p.y,rr*.76,0,Math.PI*2); ctx.stroke(); ctx.setLineDash([]); continue;
    }
    ctx.fillStyle=p.color; ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,Math.PI*2); ctx.fill();
  }
  ctx.globalCompositeOperation='source-over';
  ctx.globalAlpha=1;
  // floats
  /* Jede Zuweisung an ctx.font parst den Schriftstring neu. Bisher wurde bei jeder
     skalierten Zahl zweimal umgeschaltet — bei bis zu 36 gleichzeitigen Zahlen also
     72 Parsevorgänge pro Bild. Jetzt nur noch beim echten Wechsel, mit gecachten Strings. */
  let floatFont=FLOAT_FONT; ctx.font=FLOAT_FONT; ctx.textAlign='center';
  for(const f of floats){
    if(!sichtbar(f.x,f.y,48)) continue;
    ctx.globalAlpha=Math.max(0,f.life/0.9);
    const wunsch=(f.scale && f.scale!==1) ? floatFontFor(f.scale) : FLOAT_FONT;
    if(wunsch!==floatFont){ ctx.font=wunsch; floatFont=wunsch; }
    ctx.fillStyle='rgba(0,0,0,0.6)'; ctx.fillText(f.text,f.x+1,f.y+1);
    ctx.fillStyle=f.color; ctx.fillText(f.text,f.x,f.y);
  }
  ctx.globalAlpha=1;
  perfMark('zPartikel');
  ctx.restore();   // Welt-Ebene schließen

  // — Bildschirm-Ebene (folgt nicht der Kamera) —
  // Treffer-Blitz: kurzer roter Rand, wenn der Spieler getroffen wird
  if(now<flashUntil){
    const a=(flashUntil-now)/140;
    const fg=ctx.createRadialGradient(w/2,h/2,Math.min(w,h)*0.3,w/2,h/2,Math.max(w,h)*0.7);
    fg.addColorStop(0,'rgba(255,40,40,0)'); fg.addColorStop(1,'rgba(255,30,30,'+(0.35*a).toFixed(3)+')');
    ctx.fillStyle=fg; ctx.fillRect(0,0,w,h);
  }
  /* Randpfeile: zeigen, wo Gegner außerhalb des Sichtfelds stehen.
     Ohne das weiß man nie, aus welcher Richtung die nächste Welle kommt.
     Ein Pfeil je Himmelsrichtung (16 Sektoren), damit es nicht flimmert;
     Bosse bekommen einen eigenen, größeren Pfeil mit Namen. */
  if(state==='playing' && enemies.length){
    const cx=w/2, cy=h/2, mx=w/2-34, my=h/2-34;   // Ellipse knapp innerhalb des Rands
    const sectors={};
    let bossArrow=null;
    for(const en of enemies){
      const dx=en.x-player.x, dy=en.y-player.y;
      const sx2=dx*weltZoom, sy2=dy*weltZoom;   // Bildschirmabstand für Sichtprüfung und Pfeile
      // sichtbar? (mit etwas Rand, damit Pfeile nicht direkt am Bildrand aufpoppen)
      if(Math.abs(sx2)<w/2-30 && Math.abs(sy2)<h/2-30) continue;
      const ang=Math.atan2(dy,dx);
      const dist=Math.hypot(sx2,sy2);
      if(en.type==='boss'){
        if(!bossArrow || dist<bossArrow.dist) bossArrow={ang,dist};
        continue;
      }
      const key=Math.round(ang/(Math.PI*2/16));
      if(!sectors[key] || dist<sectors[key].dist) sectors[key]={ang,dist,color:en.color};
    }
    const drawArrow=(ang,dist,color,big)=>{
      // Punkt auf der Ellipse in Blickrichtung
      const ex=cx+Math.cos(ang)*mx, ey=cy+Math.sin(ang)*my;
      const fade=Math.max(0.25, Math.min(1, 1-(dist-Math.max(w,h)/2)/900));
      ctx.save(); ctx.translate(ex,ey); ctx.rotate(ang);
      ctx.globalAlpha=fade; ctx.shadowColor=color; sb(big?16:8);
      ctx.fillStyle=color;
      const s=big?1.6:1;
      ctx.beginPath();
      ctx.moveTo(11*s,0); ctx.lineTo(-5*s,7*s); ctx.lineTo(-1*s,0); ctx.lineTo(-5*s,-7*s);
      ctx.closePath(); ctx.fill();
      ctx.restore();
      if(big){
        ctx.save(); ctx.globalAlpha=fade; ctx.fillStyle=color;
        ctx.font='800 11px system-ui'; ctx.textAlign='center';
        const lx=cx+Math.cos(ang)*(mx-26), ly=cy+Math.sin(ang)*(my-26);
        ctx.fillText('BOSS', lx, ly+4); ctx.restore();
      }
    };
    for(const k in sectors) drawArrow(sectors[k].ang, sectors[k].dist, sectors[k].color, false);
    if(bossArrow) drawArrow(bossArrow.ang, bossArrow.dist, '#c77dff', true);
    ctx.globalAlpha=1; sb(0);
  }
  // Freischaltung: goldener Lichtkranz vom Bildschirmrand nach innen
  if(unlockFx>0){
    const a=unlockFx;
    const ug=ctx.createRadialGradient(w/2,h/2,Math.min(w,h)*0.25,w/2,h/2,Math.max(w,h)*0.72);
    ug.addColorStop(0,'rgba(255,210,87,0)');
    ug.addColorStop(1,'rgba(255,210,87,'+(0.30*a).toFixed(3)+')');
    ctx.fillStyle=ug; ctx.fillRect(0,0,w,h);
  }
  // Große Ansage in der Mitte (Welle/Boss/Meilenstein)
  if(banner){
    const a=Math.min(1, banner.life*1.6), rise=(1-Math.min(1,banner.life/banner.max))*10;
    ctx.save(); ctx.globalAlpha=a; ctx.textAlign='center';
    ctx.fillStyle=banner.color; ctx.font='800 40px system-ui';
    ctx.shadowColor='rgba(0,0,0,0.6)'; sb(12);
    ctx.fillText(banner.title, w/2, h*0.30 - rise);
    if(banner.sub){ ctx.font='600 16px system-ui'; ctx.fillStyle='#cdd7e6'; ctx.fillText(banner.sub, w/2, h*0.30 + 24 - rise); }
    ctx.restore();
  }
  // Hinweise oben (Freischaltungen/Abzeichen), gestapelt
  if(toasts.length){
    ctx.save(); ctx.textAlign='center'; ctx.font='700 14px system-ui';
    for(let i=0;i<toasts.length;i++){
      const t=toasts[i], a=Math.min(1,t.life*1.4);
      const y=70+i*30;
      ctx.globalAlpha=a*0.9; ctx.fillStyle='rgba(10,18,32,0.9)';
      const tw=ctx.measureText(t.text).width+28;
      ctx.beginPath(); ctx.roundRect(w/2-tw/2, y-16, tw, 24, 12); ctx.fill();
      ctx.strokeStyle='rgba(110,200,255,0.5)'; ctx.lineWidth=1; ctx.stroke();
      ctx.globalAlpha=a; ctx.fillStyle='#e6edf7'; ctx.fillText(t.text, w/2, y);
    }
    ctx.restore();
  }
  ctx.restore();   // Shake schließen
  perfMark('zBildschirm');
  zeichnePerfOverlay(w,h);
}

function loop(t){
  raf=requestAnimationFrame(loop);
  if(!lastTime) lastTime=t;
  // Die Simulation bleibt bei 50 ms gedeckelt; gemessen wird der echte Abstand,
  // sonst meldet die Statistik den Deckel als Maximum statt den wahren Ruckler.
  const rohDt=t-lastTime;
  const dt=Math.min(50, rohDt); lastTime=t;
  messeBildrate(t);            // erkennt schwache Geräte und spart dauerhaft Effekte
  if(state==='countdown') tickCombatResume(t);
  const spielt=state==='playing';
  perfSammeln=spielt;              // Phasen nur aus Kampfbildern, passend zum Teiler
  const updateStart=performance.now();
  perfPhaseUhr=updateStart;
  if(spielt) update(dt);
  perf.update=performance.now()-updateStart;
  const drawStart=performance.now();
  perfPhaseUhr=drawStart;
  draw();
  perf.draw=performance.now()-drawStart;
  if(PERF_GPU && canvas.width>0 && canvas.height>0){
    perfPhaseUhr=performance.now();
    try{ ctx.getImageData(0,0,1,1); }catch(e){}
    perfMark('gpuSync');       // Wartezeit auf die Grafikpipeline
  }
  perf.frame=rohDt; perf.fps=rohDt>0?1000/rohDt:60;
  // Nur Kampfbilder zählen — Menü- und Baumframes würden das Fenster verwässern.
  if(PERF_DEBUG && spielt) perfProbe();
}
loop(performance.now());

// prevent context menu / selection
document.addEventListener('contextmenu',e=>e.preventDefault());
document.addEventListener('selectstart',e=>e.preventDefault());
