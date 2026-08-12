/* Orbitblade — CONFIG zentral anpassbar */
const CONFIG = {
  baseDamage: 25,          // Basiswert, auf dem der Wirbelangriff aufbaut
  wirbelCooldown: 8000,
  wirbelRadius: 140,
  wirbelDamageMult: 1.5,
  stossCooldown: 12000,
  stossRange: 200,
  stossPush: 120,
  stossDamage: 30,
  bombeCooldown: 5000,
  novaCooldown: 9000,
  // Fähigkeiten-System: jede Stufe skaliert die Werte um diesen Faktor.
  // Bewusst von 0,12 auf 0,10 gesenkt, seit Stufe 4 zusätzlich einen echten
  // mechanischen Sprung gibt (siehe STUFEN) — sonst wäre die Kurve zu steil.
  abilLevelScale: 0.10,
  bombe: { fuse: 1800, radius: 130, dmg: 70 },
  nova:  { range: 190, dmg: 40, stun: 500 },
  phaser:{ dmg: 10, range: 260, rate: 700 },
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
  fokusZiel: 12,           // so viele Sweet-Spot-Treffer laden die Fokus-Leiste
  fokusBonus: 1.9,         // damit schlägt die nächste aktive Macht zu
  panzerAbWelle: 12,       // ab hier tauchen Panzergegner auf (auf „Meister" früher)
  // Sog zieht Gegner heran, statt sie wegzustoßen — er SETZT Sweet-Spot-Treffer auf,
  // statt selbst viel Schaden zu machen. Deshalb bewusst schwach im Schaden.
  sog:   { range:300, kraft:150, dmg:8, cooldown:6500, stun:450 },
  schneide: { proStufe:0.08 },     // zusätzlicher Sweet-Spot-Schaden je Stufe
  nachhall: { alle:4, radius:95, dmg:26 },
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
    boss:   { hp:1150, dmg:19, speed:115, radius:34, color:'#b84dff', star:12, xp:80 }
  },
  shots: { speed:340, radius:5, life:3.2 },        // Projektile der Distanz-Gegner
  jaeger: { shootRange:300, chargeMs:850, cooldown:700 },
  exploder: { fuseMs:650, blast:95 },              // Zünd-Puls vor der Explosion, Schadensabfall
  xpOrb: { chance:0.15, pity:8, xp:30, radius:9 },
  // Rote Lebenskugeln: seltener als XP-Orbs, heilen einen festen Anteil der Leiste
  hpOrb: { chance:0.07, pity:16, heilAnteil:0.05, radius:9 }, // Bonus-XP-Orbs: 15 %, spätestens jeder 8. Kill
  // Barriere: eine Lebenskugel bei vollem Leben ist nicht mehr verschenkt, sondern
  // wird zu einem Puffer, der VOR den Trefferpunkten aufgebraucht wird.
  barriere: { proKugel:0.06, max:0.30 },
  // Etwas kürzere, dichtere Wellen: weniger Leerlauf und rund 10 % weniger Masse,
  // ohne die Gegnermechaniken oder den 30-Wellen-Bogen zu beschneiden.
  wave: { baseCount:5, perWave:2.55, hpScale:0.08, dmgScale:0.08, spawnInterval: 580 },
  // Der Orbitbaum soll bis Welle 30 ungefähr 24–32 Entscheidungen tragen. Ein Punkt
  // bleibt an jeden Level-Aufstieg gebunden, ohne den Kampf automatisch anzuhalten.
  xpBase: 140, xpPerLevel: 120,
  caps: { dmgMult:2.0, speedMult:1.6, rangeMult:1.8, fireRateMult:1.5, maxHpBonus:150 },
  // Freischaltbare Fähigkeiten (passiv, kein neuer Knopf)
  abil: {
    chainDamage:14, chainRange:140,          // Kettenblitz: springt zum nächsten Gegner
    counterDamage:22, counterRadius:110, counterCd:600, counterPush:90,  // Konterstoß bei Treffer
    splitterDamage:9, splitterCount:2, splitterRadius:70, splitterSpeed:3.2, splitterHitCd:250 // kreisende Splitter
  },
  // Boss-Fähigkeiten. shockInner MUSS klar größer sein als die Angriffsreichweite
  // (Klinge ~38 + Boss-Radius 34 ≈ 72), sonst steht man beim Angreifen zwangsläufig
  // im Gefahrenband und kommt nicht mehr heraus.
  boss: { warn:1100, cooldown:2600, ramSpeed:420, ramMs:550, shockInner:95, shockOuter:175 },
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
function curDiff(){ return diffAt(wave); }

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

/* LAUFZIELE — der Beinahe-Motor. Vampire Survivors zieht seine Sogwirkung aus der
   30-Minuten-Marke: Wer sie knapp verfehlt, startet sofort neu. Orbitblade hatte keinen
   solchen Punkt. Drei wechselnde Aufgaben je Lauf schaffen ihn — und sie ersetzen für
   jüngere Spieler die Bauplanung, die sie noch nicht leisten können: Es steht immer
   konkret da, worauf man hinspielen kann. */
const ZIELE = [
  { id:'welle',     name:'Erreiche Welle {z}',            ziel:12,  lohn:60, art:'stand' },
  { id:'kills',     name:'Besiege {z} Gegner',            ziel:150, lohn:50, art:'zaehl' },
  { id:'fokus',     name:'Löse {z} Fokus-Einsätze aus',   ziel:6,   lohn:70, art:'zaehl' },
  { id:'panzer',    name:'Zerlege {z} Panzergegner',      ziel:10,  lohn:70, art:'zaehl' },
  { id:'makellos',  name:'Besiege einen Boss makellos',   ziel:1,   lohn:80, art:'zaehl' },
  { id:'stufe5',    name:'Bring eine Macht auf Stufe 5',  ziel:1,   lohn:60, art:'zaehl' },
  { id:'entwicklung',name:'Entwickle eine Macht',         ziel:1,   lohn:90, art:'zaehl' },
  { id:'fragmente', name:'Sammle {z} Fragmente im Lauf',  ziel:250, lohn:40, art:'stand' },
  { id:'barriere',  name:'Baue eine volle Barriere auf',  ziel:1,   lohn:50, art:'zaehl' },
];
let laufziele=[];
function setzeLaufziele(){
  const topf=[...ZIELE];
  // Panzer-Ziel nur, wenn in diesem Lauf überhaupt Panzer vorkommen können
  const panzerAb = hilfe().panzerAb || CONFIG.panzerAbWelle;
  laufziele=[];
  for(let i=0;i<3 && topf.length;i++){
    const k=Math.floor(Math.random()*topf.length);
    const def=topf.splice(k,1)[0];
    if(def.id==='panzer' && panzerAb>14){ i--; continue; }
    laufziele.push({ def, wert:0, fertig:false });
  }
}
// Zählendes Ziel weiterzählen
function zielZaehl(id, n){
  for(const z of laufziele){
    if(z.def.id!==id || z.fertig) continue;
    z.wert += (n||1);
    if(z.wert>=z.def.ziel) zielErfuellt(z);
  }
}
// Standsziel auf einen absoluten Wert setzen (Welle, Fragmentkonto)
function zielStand(id, wert){
  for(const z of laufziele){
    if(z.def.id!==id || z.fertig) continue;
    if(wert>z.wert) z.wert=wert;
    if(z.wert>=z.def.ziel) zielErfuellt(z);
  }
}
function zielErfuellt(z){
  z.fertig=true; z.wert=z.def.ziel;
  player.stars += z.def.lohn;
  pushToast('Ziel geschafft: +'+z.def.lohn+' ◆');
  announce('Ziel geschafft!', zielText(z.def), '#ffd257');
}
function zielText(def){ return def.name.replace('{z}', def.ziel); }

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
function hilfe(){ return HILFEN[save.hilfe] || HILFEN.standard; }
function hilfeId(){ return HILFEN[save.hilfe] ? save.hilfe : 'standard'; }
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
               fuer:'Kontrolliertes Positionieren, Schutz und eine sichere Lichtbahn',
               signatur:{name:'Lichtbahn', glyph:'➤', cooldown:6500} },
  // Die interne ID bleibt für vorhandene v5-Spielstände bestehen.
  konstrukt: { name:'Leerenklinge', desc:'Schwebender Träger einer instabilen Orbit-Klinge',
               id:'konstrukt', hp:0.88, tempo:1.07, reichweite:0.98, fokusZiel:0.88, barriereMal:0.75,
               staerke:'Leerenhunger · fehlendes Leben verstärkt Sweet Spot und Orbit',
               fuer:'Hohes Risiko, aggressives Kreisen und mächtige Überladung',
               signatur:{name:'Leerenüberladung', glyph:'◆', cooldown:9000} },
};
function figur(){ return isAvailable('figur', save.figur)? FIGUREN[save.figur] : FIGUREN.held; }

// Freischaltbare Fähigkeiten (Metadaten für Gating + Anzeige + Buff-Stufen)
// slot: 'active' (2 Slots, im Codex umrüstbar) | 'passive' (max 5) | 'weapon' (Waffen-Upgrade)
// Freischalt-Wellen stehen ausschließlich in MILESTONES — hier bewusst nicht doppelt.
const ABILITIES = {
  kettenblitz:   { name:'Kettenblitz',     desc:'Treffer springt zum nächsten Gegner',                      slot:'passive', iconKey:'kette'  },
  konterstoss:   { name:'Konterstoß',      desc:'Wirst du getroffen, schlägst du automatisch zurück',        slot:'passive', iconKey:'konter' },
  splitter:      { name:'Splitter',        desc:'Kreisende Energiesplitter richten Zusatzschaden an',         slot:'passive', iconKey:'splitter', voll:true },
  phaser:        { name:'Phaser',          desc:'Schießt automatisch auf Gegner in Reichweite',               slot:'passive', iconKey:'phaser' },
  lebensregen:   { name:'Lebensregen',     desc:'Regeneriert Leben pro getötetem Gegner',                     slot:'passive', iconKey:'leben' },
  dreifachklinge:{ name:'Dreifachklinge',  desc:'Dritte Klinge — lückenlose Deckung',                         slot:'weapon',  iconKey:'dreifach', voll:true },
  wirbel:        { name:'Wirbel',          desc:'Spirale rund um dich — massiver Schaden',                    slot:'active',  iconKey:'wirbel',  start:true },
  stoss:         { name:'Schock',          desc:'Elektrische Schockwelle — stößt Gegner weg',                 slot:'active',  iconKey:'stoss',  start:true },
  bombe:         { name:'Bombe',           desc:'Legt eine Bombe, die verzögert explodiert',                  slot:'active',  iconKey:'bombe' },
  nova:          { name:'Machtblitz-Nova', desc:'Elektrischer Ring — Schaden und kurzer Stun',                slot:'active',  iconKey:'nova' },
  // Neu in der Konzeptfassung — zwei davon zahlen direkt auf den Sweet Spot ein
  sog:           { name:'Sog',             desc:'Zieht alle Gegner heran — bringt sie in deine Klinge',       slot:'active',  iconKey:'reichweite' },
  schneide:      { name:'Schneide',        desc:'Sweet-Spot-Treffer richten deutlich mehr Schaden an',        slot:'passive', iconKey:'schaden' },
  nachhall:      { name:'Nachhall',        desc:'Jeder vierte Sweet-Spot-Treffer löst eine Druckwelle aus',   slot:'passive', iconKey:'boost' },
};
const ACTIVE_IDS=['wirbel','stoss','bombe','nova','sog'];
// Buff-Stufen und Passiv-Slots bewusst klein: ein Lauf bringt ~8 Karten, alles darüber
// wäre unerreichbar. Wenige Stufen heißt außerdem: jede einzelne ist spürbar.
const MAX_ABIL_LEVEL=5, MAX_PASSIVE_SLOTS=3;

/* WAS EINE STUFE BRINGT.
   Vorher stand auf einer Steigerungskarte nur "Stufe 2 von 5" — man wusste nicht,
   wofür man sich entscheidet. Jetzt steht der konkrete Zuwachs drauf.
   Zusätzlich gibt es EINEN echten mechanischen Sprung, immer beim Erreichen von
   Stufe 4. Das gibt jeder Macht einen Moment, auf den man hinspielt, statt einer
   flachen Prozentleiter. Zum Ausgleich ist abilLevelScale von 0,12 auf 0,10
   gesenkt: Stufe 5 liegt damit bei +40 % statt +48 %, der Sprung kommt obendrauf. */
const SPRUNG_STUFE=4;
const ACTIVE_MODS={
  wirbel:['Zieht Gegner während des Wirbels heran','Hinterlässt kurz eine rotierende Schadenszone'],
  stoss:['Weggestoßene Gegner verursachen Kollisionsschaden','Hinterlässt ein verlangsamendes Feld'],
  bombe:['Haftet automatisch am nächsten Gegner','Erneutes Drücken zündet die Bombe vorzeitig'],
  nova:['Treffer laden etwas Barriere','Gezielte Energiebögen treffen nahe Gegner'],
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
  phaser:      { pro:'+10 % Schussschaden',                        sprung:'Du feuerst zwei Geschosse gleichzeitig' },
  lebensregen: { pro:'+50 % Heilung pro besiegtem Gegner',         sprung:'Du regenerierst zusätzlich dauerhaft Leben' },
  sog:         { pro:'+10 % Reichweite und Zugkraft',              sprung:'Herangezogene Gegner werden kurz betäubt' },
  schneide:    { pro:'+8 % Schaden im Sweet Spot',                 sprung:'Sweet-Spot-Treffer durchschlagen jede Panzerung' },
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
                   desc:'Der Wirbel reißt deine Splitter mit und schleudert sie nach außen' },
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
  { id:'waechter', name:'Wächter',      color:'#c77dff', rgb:'199,125,255', leit:'shock',
    tip:'Meide den lila Ring!',            form:'hex'   },
  { id:'brutmutter',name:'Brutmutter',  color:'#4de0a0', rgb:'77,224,160',  leit:'minions',
    tip:'Sie ruft ständig Verstärkung!',   form:'organic'},
  { id:'rammbock', name:'Rammbock',     color:'#ff7a3d', rgb:'255,122,61',  leit:'ram',
    tip:'Er nimmt Anlauf — geh zur Seite!',form:'wedge' },
  { id:'spiralwerfer',name:'Spiralwerfer',color:'#5ac8e0', rgb:'90,200,224',leit:'spiral',
    tip:'Die Spirale dreht sich — lauf mit!',form:'ring' },
];
// Reihum, damit jeder Boss-Kampf anders aussieht (Welle 5,10,15,20 -> 0,1,2,3)
function bossKindFor(w){ return BOSS_KINDS[(Math.floor(w/5)-1+BOSS_KINDS.length*4) % BOSS_KINDS.length]; }
const PASSIVE_IDS=['kettenblitz','konterstoss','splitter','phaser','lebensregen','schneide','nachhall'];

/* LAUFGEBUNDENER SKILL-TREE
   Keine Kartenlotterie mehr: Jeder Knoten ist sichtbar, hat klare Voraussetzungen
   und kostet genau einen Punkt. Aktive Mächte sind die vorher gewählte Ausrüstung;
   passive Mächte und Entwicklungen werden hier bewusst aufgebaut. */
function steigereMacht(id, stufe){ runAbilities[id]=Math.max(runAbilities[id]||1, stufe); }
function treeRang(id){ return Number(runTree[id])||0; }
const ACTIVE_MOD_SHORT={
  wirbel:['ZUG','ZONE'], stoss:['KOLL.','SLOW'], bombe:['HAFT','SOFORT'],
  nova:['SCHILD','BÖGEN'], sog:['HALT','ORBIT']
};
function treeNodes(){
  const n=[
    {id:'orbit_root',stage:0,col:4,kind:'root',name:'Orbitkern',desc:'Deine Klinge und deine Mächte entspringen demselben Kern.',icon:'◉',free:true},
    {id:'blade_multi',stage:1,col:3,kind:'major',name:'Mehrfachorbit',short:'2 KLINGEN',desc:'Zwei gegenüberliegende Klingen.',icon:'Ⅱ',reqAll:['orbit_root'],exclusiveGroup:'orbit',apply:()=>{bonuses.blades=Math.max(2,bonuses.blades);earnBadge('doppel');}},
    {id:'blade_single',stage:1,col:5,kind:'major',name:'Singularorbit',short:'SWEET +38%',desc:'Eine schmale Klinge mit +38 % Sweet-Spot-Schaden.',icon:'┃',reqAll:['orbit_root'],exclusiveGroup:'orbit',apply:()=>{treeFlags.singularorbit=true;treeFlags.sweetBonus=(treeFlags.sweetBonus||0)+0.38;}},
    {id:'blade_core',stage:2,col:4,kind:'buff',name:'Klingenkern',short:'DMG +8%',desc:'+8 % Klingenschaden je Rang.',icon:'✦',maxRank:4,reqAny:['blade_multi','blade_single'],apply:()=>bonuses.dmg+=0.08},
    {id:'core_resonance',stage:4,col:4,kind:'buff',name:'Kernresonanz',short:'HP + FOKUS',desc:'+10 Max-Leben, +5 % Barriere und schnellerer Fokus je Rang.',icon:'◎',maxRank:3,reqAny:['char_route_a','char_route_b'],apply:()=>{player.maxHp+=10;player.hp+=10;treeFlags.barriereMult=(treeFlags.barriereMult||1)*1.05;treeFlags.fokusRabatt=(treeFlags.fokusRabatt||0)+1;}},
    {id:'orbit_crown',stage:5,col:4,kind:'capstone',name:'Orbitkrone',short:'KLINGEN-FINALE',desc:'Mehrfachorbit erhält eine dritte Klinge; Singularorbit lädt Fokus doppelt.',icon:'★',reqAll:['core_resonance'],reqAny:['blade_multi','blade_single'],apply:()=>{if(treeRang('blade_multi')) bonuses.blades=Math.max(3,bonuses.blades);else treeFlags.perfekterOrbit=true;}},
  ];
  if(figur().id==='held') n.push(
    {id:'char_route_a',stage:3,col:3,kind:'major',name:'Wächter',short:'SCHUTZ',desc:'Fokus-Barriere bremst Gegner in deiner Nähe.',icon:'◈',reqAll:['blade_core'],exclusiveGroup:'char_route',apply:()=>treeFlags.waechter=true},
    {id:'char_route_b',stage:3,col:5,kind:'major',name:'Strahlenreiter',short:'LICHTBAHN',desc:'Sweet Hits laden Lichtbahn schneller.',icon:'➤',reqAll:['blade_core'],exclusiveGroup:'char_route',apply:()=>treeFlags.strahlenreiter=true},
    {id:'char_cap_a',stage:5,col:3,kind:'capstone',name:'Leuchtfeuer',short:'STARKE BARRIERE',desc:'Voller Fokus erzeugt eine starke Barriere und bewahrt Reserven.',icon:'★',reqAll:['char_route_a','core_resonance'],apply:()=>{treeFlags.leuchtfeuer=true;treeFlags.lichtreserve=true;}},
    {id:'char_cap_b',stage:5,col:5,kind:'capstone',name:'Sonnenpfad',short:'2 LADUNGEN',desc:'Lichtbahn wird breiter, hinterlässt Energie und erhält zwei Ladungen.',icon:'☀',reqAll:['char_route_b','core_resonance'],apply:()=>{treeFlags.lichtspur=true;treeFlags.sonnenpfad=true;}}
  ); else n.push(
    {id:'char_route_a',stage:3,col:3,kind:'major',name:'Verschlinger',short:'HEILUNG',desc:'Günstigere Überladung und stärkere Heilung.',icon:'◆',reqAll:['blade_core'],exclusiveGroup:'char_route',apply:()=>{treeFlags.leerenOpfer=.10;treeFlags.leerenHeilung=.018;}},
    {id:'char_route_b',stage:3,col:5,kind:'major',name:'Abgrund',short:'RISIKO-DMG',desc:'Wenig Leben verstärkt deinen Sweet Spot stark.',icon:'▼',reqAll:['blade_core'],exclusiveGroup:'char_route',apply:()=>treeFlags.leerenRisikoBonus=.22},
    {id:'char_cap_a',stage:5,col:3,kind:'capstone',name:'Satter Abgrund',short:'KILLS VERLÄNGERN',desc:'Kills verlängern Überladung; Lebensraub wird sicherer.',icon:'★',reqAll:['char_route_a','core_resonance'],apply:()=>{treeFlags.leerenKillDauer=true;treeFlags.satterAbgrund=true;treeFlags.leerenHeilung=.026;}},
    {id:'char_cap_b',stage:5,col:5,kind:'capstone',name:'Ereignishorizont',short:'3 KLINGEN',desc:'Unter 35 % Leben kreisen drei Klingen: maximaler Schaden, kaum Heilung.',icon:'◉',reqAll:['char_route_b','core_resonance'],apply:()=>{treeFlags.leerenKlingen=3;treeFlags.ereignishorizont=true;treeFlags.leerenHeilung=.004;}}
  );
  const aktive=[...new Set([activeSlot1,activeSlot2].filter(Boolean))];
  const evoVon=id=>Object.entries(EVOLUTIONS).find(([,e])=>e.base===id);
  aktive.forEach((id,index)=>{
    const side=index===0?1:7, inner=index===0?2:6, pair=evoVon(id), evoId=pair&&pair[0], evo=pair&&pair[1];
    const prefix='power_'+id;
    n.push(
      {id:prefix+'_a',stage:1,col:side,kind:'major',power:id,name:ABILITIES[id].name+' A',short:ACTIVE_MOD_SHORT[id][0],desc:ACTIVE_MODS[id][0],icon:'A',reqAll:['orbit_root'],exclusiveGroup:'mod_'+id,apply:()=>{steigereMacht(id,2);treeFlags['mod_'+id]='a';}},
      {id:prefix+'_b',stage:1,col:inner,kind:'major',power:id,name:ABILITIES[id].name+' B',short:ACTIVE_MOD_SHORT[id][1],desc:ACTIVE_MODS[id][1],icon:'B',reqAll:['orbit_root'],exclusiveGroup:'mod_'+id,apply:()=>{steigereMacht(id,2);treeFlags['mod_'+id]='b';}},
      {id:prefix+'_passive',stage:2,col:side,kind:'buff',power:id,passive:evo.req,name:ABILITIES[evo.req].name,short:'PASSIV +1',desc:ABILITIES[evo.req].desc+'; jeder Rang verstärkt die Wirkung.',icon:'✦',maxRank:5,reqAny:[prefix+'_a',prefix+'_b'],apply:rank=>{runAbilities[evo.req]=rank;}},
      {id:prefix+'_master',stage:3,col:side,kind:'major',power:id,name:'Machtmeisterschaft',short:'MACHT +1',desc:'Steigert die aktive Macht; Rang 2 schaltet den mechanischen Sprung frei.',icon:'★',maxRank:3,reqAll:[prefix+'_passive'],apply:rank=>{steigereMacht(id,rank+2);if(rank>1)treeFlags['powerDmg_'+id]=(treeFlags['powerDmg_'+id]||1)*1.08;}},
      {id:'evo_'+evoId,stage:5,col:side,kind:'evo',power:id,name:evo.name,short:'ENTWICKLUNG',desc:evo.desc,icon:'✦',reqAll:[prefix+'_master'],reqRanks:{[prefix+'_passive']:3,[prefix+'_master']:3},evo:evoId,apply:()=>{steigereMacht(id,5);runEvolutions[id]=evoId;zielZaehl('stufe5');zielZaehl('entwicklung');announce('Entwicklung!',evo.name,'#ffd257');unlockFx=1;}}
    );
  });
  // Der zweite Aktiv-Slot kann fehlen. Dann füllt ein kurzer gemeinsamer Seitenast
  // die Punktökonomie, ohne eine unechte zweite Macht vorzutäuschen.
  if(aktive.length===1) n.push(
    {id:'orbit_reach',stage:2,col:7,kind:'buff',name:'Weiter Orbit',short:'REICHW. +8%',desc:'+8 % Reichweite je Rang.',icon:'↗',maxRank:4,reqAny:['blade_multi','blade_single'],apply:()=>bonuses.range+=.08},
    {id:'orbit_guard',stage:4,col:7,kind:'buff',name:'Orbitwache',short:'HP +10',desc:'+10 Max-Leben je Rang; letzter Rang durchschlägt Panzerung.',icon:'◈',maxRank:3,reqAll:['orbit_reach'],apply:rank=>{player.maxHp+=10;player.hp+=10;if(rank===3)treeFlags.panzerbrecher=true;}}
  );
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
  { wave:5,  badge:'boss1',   unlocks:[{kind:'ability',id:'kettenblitz'}] },
  { wave:7,  badge:null,      unlocks:[{kind:'ability',id:'schneide'}] },
  { wave:8,  badge:null,      unlocks:[{kind:'skin',   id:'bernstein'}] },
  { wave:13, badge:null,      unlocks:[{kind:'ability',id:'nachhall'}] },
  { wave:18, badge:null,      unlocks:[{kind:'ability',id:'sog'}] },
  { wave:11, badge:null,      unlocks:[{kind:'ability',id:'phaser'}] },
  { wave:14, badge:null,      unlocks:[{kind:'ability',id:'konterstoss'}] },
  { wave:17, badge:null,      unlocks:[{kind:'skin',   id:'smaragd'}] },
  { wave:20, badge:'welle20', unlocks:[{kind:'ability',id:'bombe'}] },
  { wave:23, badge:null,      unlocks:[{kind:'ability',id:'splitter'}] },
  { wave:26, badge:null,      unlocks:[{kind:'ability',id:'nova'}] },
  { wave:29, badge:null,      unlocks:[{kind:'skin',   id:'amethyst'}] },
  { wave:32, badge:null,      unlocks:[{kind:'ability',id:'dreifachklinge'}] },
  { wave:35, badge:null,      unlocks:[{kind:'ability',id:'lebensregen'}] },
  { wave:38, badge:null,      unlocks:[{kind:'skin',   id:'tuerkis'}] },
  // Diese Wellen trugen bisher nur ein Abzeichen. Die Kosmetik hängt jetzt hier,
  // damit die Zwischenstufen nicht leer bleiben und die Fähigkeits-Leiter oben
  // unverändert bleibt (die ist auf Spielbalance abgestimmt, Kosmetik nicht).
  { wave:10, badge:'welle10', unlocks:[{kind:'form',  id:'wucht'}] },
  { wave:15, badge:'welle15', unlocks:[{kind:'figur', id:'konstrukt'}] },
  { wave:25, badge:'welle25', unlocks:[{kind:'form',  id:'zwilling'}] },
  { wave:30, badge:'welle30', unlocks:[] },
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
const SAVE_KEY='orbitblade_konzept_save', SAVE_VERSION=7;
// opts: Bedien-Einstellungen (Seite und Anordnung der Fähigkeiten-Knöpfe)
// best ist jetzt je Hilfsstufe getrennt — sonst wäre die Bestmarke nicht vergleichbar
const DEFAULT_SAVE={ v:SAVE_VERSION, best:{}, badges:{}, unlocks:{}, skin:'rubin', muted:false, bossKills:0, stars:0, meta:{}, tutorialDone:false,
  hilfe:'standard', gewonnen:false, endlosFrei:false,
  opts:{ seite:'rechts', anordnung:'nebeneinander' },
  // Mit welchen aktiven Mächten jeder Lauf beginnt. Vorher war das fest verdrahtet,
  // sodass später freigeschaltete Mächte nie am Start standen.
  startMaechte:{ slot1:'wirbel', slot2:'stoss' },
  klingenform:'strahl', figur:'held' };
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
  data.v = SAVE_VERSION;
  return data;
}
function persist(){
  try{ if(typeof localStorage!=='undefined') localStorage.setItem(SAVE_KEY, JSON.stringify(save)); }catch(e){}
}

// Ist ein Inhalt aktuell nutzbar? (Start-Inhalt, oder freigeschaltet und nicht Vollversions-gesperrt)
/* Eine Stelle, die für jede Freischaltungsart weiß, wo ihre Beschreibung liegt.
   Vorher stand die Zuordnung dreimal als kind==='skin'?…:… im Code — mit einer
   dritten und vierten Art wäre das nicht mehr zu pflegen gewesen. */
const UNLOCK_ARTEN = {
  skin:    { tabelle:()=>SKINS,     label:'Klingenfarbe' },
  form:    { tabelle:()=>FORMEN,    label:'Klingenform'  },
  figur:   { tabelle:()=>FIGUREN,   label:'Figur'        },
  ability: { tabelle:()=>ABILITIES, label:'Fähigkeit'    },
};
function unlockMeta(kind, id){
  const a=UNLOCK_ARTEN[kind] || UNLOCK_ARTEN.ability;
  return a.tabelle()[id];
}
function isAvailable(kind, id){
  const meta = unlockMeta(kind, id);
  if(!meta) return false;
  if(meta.start) return true;
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
  showEl(document.getElementById('codex-btn'), codexRelevant());
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
  if(meta.voll && !FULL_VERSION){ pushToast('In der Vollversion: '+label); return; }
  // Große Feier statt kleinem Hinweis — eine Freischaltung soll ein Moment sein
  announce('Freigeschaltet!', label, u.kind==='skin' ? meta.blade : '#4de0a0');
  unlockFx=1;
  if(sfx) sfx('unlockBig');
}

/* ---- Sound: prozedural über Web Audio, keine Asset-Dateien ---- */
let audioCtx=null;
function initAudio(){
  if(audioCtx) return;
  try{ const AC=window.AudioContext||window.webkitAudioContext; if(AC) audioCtx=new AC(); }catch(e){ audioCtx=null; }
}
function tone(freq,dur,type,vol,when,slideTo){
  if(!audioCtx) return;
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
  const t0=audioCtx.currentTime+when, len=Math.max(1,Math.floor(audioCtx.sampleRate*dur));
  const buf=audioCtx.createBuffer(1,len,audioCtx.sampleRate), data=buf.getChannelData(0);
  for(let i=0;i<len;i++) data[i]=(Math.random()*2-1)*(1-i/len);
  const src=audioCtx.createBufferSource(), filter=audioCtx.createBiquadFilter(), gain=audioCtx.createGain();
  filter.type='bandpass'; filter.frequency.value=freq; filter.Q.value=0.8;
  gain.gain.setValueAtTime(vol,t0); gain.gain.exponentialRampToValueAtTime(0.0001,t0+dur);
  src.buffer=buf; src.connect(filter); filter.connect(gain); gain.connect(audioCtx.destination);
  src.start(t0); src.stop(t0+dur+0.02);
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
  fuse:    ()=>tone(400,0.10,'sawtooth',0.10,0,80),
  boom:    ()=>{tone(70,0.35,'sawtooth',0.18,0,40);tone(50,0.4,'sine',0.14,0.05,30);},
  bombe:   ()=>{tone(210,0.12,'sine',0.09,0,560);noiseBurst(0.08,0.025,0.02,900);},
  nova:    ()=>{orbitPulse(82);tone(980,0.38,'sine',0.08,0.02,440);tone(1470,0.30,'sine',0.05,0.04,740);},
};
function sfx(name){ if(save.muted||!audioCtx) return; const f=SFX[name]; if(f){ try{ f(); }catch(e){} } }
function updateMuteBtn(){ const b=document.getElementById('mute-btn'); if(b) b.textContent=save.muted?'🔇':'🔊'; }
function toggleMute(){ save.muted=!save.muted; persist(); updateMuteBtn(); if(!save.muted){ initAudio(); if(audioCtx&&audioCtx.state==='suspended') audioCtx.resume(); } }
// Audio erst nach erster Nutzer-Aktion starten (Browser-Autoplay-Sperre)
function unlockAudioOnce(){ initAudio(); if(audioCtx&&audioCtx.state==='suspended') audioCtx.resume(); window.removeEventListener('pointerdown',unlockAudioOnce); window.removeEventListener('keydown',unlockAudioOnce); window.removeEventListener('touchstart',unlockAudioOnce); }
window.addEventListener('pointerdown',unlockAudioOnce); window.addEventListener('keydown',unlockAudioOnce); window.addEventListener('touchstart',unlockAudioOnce);

const canvas=document.getElementById('game'), ctx=canvas.getContext('2d');
const healthBar=document.getElementById('health-bar'), healthText=document.getElementById('health-text');
const barrierBar=document.getElementById('barrier-bar');
const xpBar=document.getElementById('xp-bar'), xpText=document.getElementById('xp-text');
const coinText=document.getElementById('coin-text'), waveText=document.getElementById('wave-text');
const fokusWrap=document.getElementById('fokus-wrap'), fokusBar=document.getElementById('fokus-bar'), fokusText=document.getElementById('fokus-text');
const zielListe=document.getElementById('ziel-liste');
const overlayStart=document.getElementById('overlay-start'), overlayPause=document.getElementById('overlay-pause');
const overlayOver=document.getElementById('overlay-gameover');
const treeBtn=document.getElementById('tree-btn'), overlayTree=document.getElementById('overlay-tree');
const treePunkte=document.getElementById('tree-punkte'), treeBranches=document.getElementById('tree-branches');
const btnWirbel=document.getElementById('btn-wirbel'), btnStoss=document.getElementById('btn-stoss');
const btnSignatur=document.getElementById('btn-signatur');
let cdWirbel=document.getElementById('cd-wirbel'), cdStoss=document.getElementById('cd-stoss'), cdSignatur=document.getElementById('cd-signatur');
const joystickZone=document.getElementById('joystick-zone');   // unsichtbare Ziehfläche über dem Spielfeld

loadSave();
let state='menu', raf=0, lastTime=0;
let player, enemies=[], stars=[], particles=[], floats=[], shots=[], orbs=[];
let swordAngle=0, spinHitTimer=0;
let wave=1, waveEnemiesToSpawn=0, waveSpawned=0, spawnTimer=0, killCount=0, hpKillCount=0;
let shake=0, activeCd={wirbel:0,stoss:0,bombe:0,nova:0,sog:0}, phaserCd=0;
let dmgBoostUntil=0, shieldUntil=0, moveBoostUntil=0, signaturCd=0, leerenmodusUntil=0;
let wiederaufBenutzt=false;      // „Entdecker": das eine Wiederaufstehen pro Lauf
let nachhallZaehler=0;           // zählt Sweet-Spot-Treffer für die Nachhall-Druckwelle
/* Barriere: ein Puffer, der VOR den Trefferpunkten aufgebraucht wird. Er entsteht
   nur aus Lebenskugeln, die man bei vollem Leben einsammelt — vorher waren die
   schlicht verschenkt. Anders als das Schild (zeitbasiert, blockt alles) ist die
   Barriere eine Menge, die sich abnutzt. */
let barriere=0;
function barriereMax(){ return player.maxHp*CONFIG.barriere.max*(treeFlags.barriereMult||1); }
let bonuses={ dmg:0, speed:0, range:0, fireRate:0, maxHp:0, blades:1, chain:false, counter:false, splitter:0 };
let camX=0, camY=0, stossWaveT=0, wirbelT=0, wirbelShownR=0;
let renderDpr=1, sichtbareGegner=0, naechstesHudUpdate=0;
let sparmodus=false;                     // dauerhaft, wenn die Bildrate einbricht
const PERF_DEBUG=typeof location!=='undefined' && /(?:\?|&)perf=1(?:&|$)/.test(location.search||'');
const perf={ frame:16.7, update:0, draw:0, fps:60 };
let counterCd=0, counterFx=0, shards=[]; // Konterstoß-Cooldown/Effekt, kreisende Splitter
// Nur EINE Macht am Start — der zweite Slot wird im Shop freigeschaltet und ist
// dadurch ein echter Fortschritt statt einer Selbstverständlichkeit.
let activeSlot1='wirbel', activeSlot2=null;
let runEvolutions={};                            // baseId -> evoId (nur für diesen Lauf)
let runTree={}, skillPoints=0, treeFlags={};     // ausschließlich für den aktuellen Lauf
/* Der Begleiter: EIN dauerhaft gekaufter Helfer, der den Spieler umkreist. Er zieht
   Fragmente und Kugeln an UND schießt auf Gegner. Vorher waren das zwei getrennte
   Käufe, die beide nach dem Kauf nichts mehr wurden — jetzt ist es ein Ziel, das
   über fünf Stufen weiterwächst. */
let helfer=[];
function begleiterWerte(stufe){
  const H=CONFIG.helfer, s=Math.max(1,stufe);
  return { sammel:H.sammelBasis+H.sammelProStufe*(s-1),
           reichweite:H.schussBasis+H.schussProStufe*(s-1),
           dmg:H.dmgBasis+H.dmgProStufe*(s-1) };
}
function setzeHelfer(){
  helfer=[];
  const stufe=metaLevel('begleiter');
  if(stufe>0) helfer.push({stufe, ang:0, r:58, cd:0});
}
function hasSlot2(){ return (save.meta&&save.meta.slot2)>0; }
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
let bombs=[], pShots=[], novaFx=0;              // Bombe-Entitäten, Phaser-Schüsse, Nova-Ring
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
let tutStep=0, tutT=0;
const IS_TOUCH = (typeof window!=='undefined') && ('ontouchstart' in window);
function tutorialTick(dt){
  if(save.tutorialDone) return;   // läuft über den ganzen ersten Lauf, nicht nur Welle 1
  tutT+=dt;
  if(tutStep===0 && tutT>600){
    announce(IS_TOUCH?'Zieh mit dem Finger':'Lauf mit WASD', IS_TOUCH?'irgendwo auf dem Bildschirm':'oder den Pfeiltasten', '#7cc8ff');
    tutStep=1;
  } else if(tutStep===1 && tutT>5000){
    announce('Deine Klinge trifft von allein', 'du musst nur ausweichen', '#ffd257');
    tutStep=2;
  } else if(tutStep===2 && tutT>10000){
    announce('Weißes Aufblitzen', 'heißt: besonders harter Treffer', '#ffffff');
    tutStep=3;
  } else if(tutStep===3 && tutT>14000){
    save.tutorialDone=true; persist(); tutStep=4;
  }
}

// Klingenlänge: multiplikativ, damit "+15% Reichweite" auch wirklich +15% bedeutet
function bladeLength(){ return CONFIG.bladeBaseLen * (1 + bonuses.range) * figur().reichweite; }
function leerenmodusAktiv(){ return figur().id==='konstrukt' && leerenmodusUntil>Date.now(); }
function effektiveKlingen(){
  return leerenmodusAktiv() ? Math.max(bonuses.blades, treeFlags.leerenKlingen||2) : bonuses.blades;
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
  const singular=treeFlags.singularorbit?0.72:1;
  const sync=treeFlags.sweetWeite||0;
  return CONFIG.spinArcHalf * singular * Math.pow(0.75+sync, Math.max(0, effektiveKlingen()-1));
}

/* FOKUS — Sweet-Spot-Treffer laden eine Leiste. Ist sie voll, schlägt die nächste
   aktive Macht deutlich härter zu. Damit zahlt gutes Positionieren auch dann noch ein,
   wenn man rechnerisch längst genug Schaden macht — und jüngere Spieler sehen einen
   Balken, der sich füllt, statt einer Prozentrechnung. */
let fokus=0, fokusBereit=false, fokusAktiv=false;
// Der Bonus gilt genau für den einen Einsatz und wird dabei aufgebraucht
function fokusFaktor(){ return fokusAktiv? CONFIG.fokusBonus+(treeFlags.fokusMachtBonus||0) : 1; }
// Wie viele Sweet-Spot-Treffer die Leiste braucht — der Charakter verschiebt das
function fokusZiel(){ return Math.max(4, Math.round(CONFIG.fokusZiel*figur().fokusZiel)-(treeFlags.fokusRabatt||0)); }
function fokusTreffer(){
  if(fokusBereit) return;
  if(++fokus>=fokusZiel()){
    fokus=fokusZiel(); fokusBereit=true;
    if(figur().id==='held'){
      const anteil=(treeFlags.leuchtfeuer?0.14:0.05)+(treeFlags.fokusBarriereBonus||0);
      barriere=Math.min(barriereMax(),barriere+player.maxHp*anteil*figur().barriereMal);
      if(treeFlags.waechter) enemies.forEach(en=>{if(Math.hypot(en.x-player.x,en.y-player.y)<150) en.stunT=Math.max(en.stunT||0,260);});
    }
    pushFloat(player.x, player.y-38, 'FOKUS!', '#ffffff', 1.3);
    if(sfx) sfx('unlock');
  }
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

/* Die Klinge zeichnet sich selbst — auf das Spielfeld oder auf eine Vorschau-Leinwand.
   `blur` ist der Setzer für das Leuchten: im Spiel sb(), das die Sparmodi kennt,
   in der Vorschau ein einfaches Setzen. Ursprung ist der Griff, +x zeigt zur Spitze. */
function zeichneKlinge(g, x0, laenge, form, farbe, kern, blur){
  const bl = blur || (v=>{ g.shadowBlur=v; });
  const strahlen = form.zwei ? [-3.7, 3.7] : [0];
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
    bl(form.glut*0.5); g.fillStyle=kern;
    if(form.doppelkern){
      for(const k of [-form.kern*0.7, form.kern*0.7]){
        g.beginPath(); g.roundRect(x0+2, off+k-0.55, laenge-9, 1.1, 0.55); g.fill();
      }
    } else {
      g.beginPath(); g.roundRect(x0+1, off-form.kern/2, laenge-5, form.kern, form.kern/2); g.fill();
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
  return basis*(treeFlags.aktiveCdMult||1)*(treeFlags['powerCd_'+id]||1);
}
function signaturCdMax(){ return figur().signatur.cooldown*(treeFlags.signaturCdMult||1); }
function updateSignaturButton(){
  const s=figur().signatur;
  btnSignatur.setAttribute('aria-label',s.name);
  btnSignatur.innerHTML='<span class="cd-sweep" id="cd-signatur"></span><span class="s-icon sig-glyph" aria-hidden="true">'+s.glyph+'</span><span class="s-label">'+s.name+'</span><span class="s-key">3</span>';
  cdSignatur=document.getElementById('cd-signatur');
  updateCooldownUI(btnSignatur,cdSignatur,signaturCd,signaturCdMax(),'signatur');
}
const ACTIVE_COLORS={ wirbel:['#ffb340','255,179,64'], stoss:['#6ec8ff','110,200,255'], bombe:['#ff7a5a','255,122,90'], nova:['#c77dff','199,125,255'], sog:['#4de0a0','77,224,160'] };
// Aktiven-Buttons passend zu den gewählten Slots neu aufbauen (Icon, Name, Farbe)
function activeBtnHTML(key,keyLabel){
  const id = key==='a'? activeSlot1 : activeSlot2;
  const m=ABILITIES[id];
  return `<span class="cd-sweep" id="cd-${key}"></span>
    <svg class="s-icon" viewBox="0 0 24 24" aria-hidden="true">${abilIcon(id)}</svg>
    <span class="s-label">${m.name}</span>
    <span class="s-key">${keyLabel}</span>`;
}
function updateActiveButtons(){
  updateSignaturButton();
  const c1=ACTIVE_COLORS[activeSlot1]||['#6ec8ff','110,200,255'];
  btnWirbel.innerHTML=activeBtnHTML('a','1');
  cdWirbel=document.getElementById('cd-a');
  btnWirbel.style.setProperty('--c', c1[0]); btnWirbel.style.setProperty('--cRGB', c1[1]);
  updateCooldownUI(btnWirbel, cdWirbel, activeCd[activeSlot1]||0, activeCdMax(activeSlot1), 'a');
  // Zweiter Knopf erscheint erst, wenn der Slot freigeschaltet und belegt ist
  if(!activeSlot2){ btnStoss.style.display='none'; return; }
  btnStoss.style.display='';
  const c2=ACTIVE_COLORS[activeSlot2]||['#6ec8ff','110,200,255'];
  btnStoss.innerHTML=activeBtnHTML('b','2');
  cdStoss=document.getElementById('cd-b');
  btnStoss.style.setProperty('--c', c2[0]);  btnStoss.style.setProperty('--cRGB', c2[1]);
  updateCooldownUI(btnStoss, cdStoss, activeCd[activeSlot2]||0, activeCdMax(activeSlot2), 'b');
}

function passiveTreeAnzahl(){ return PASSIVE_IDS.filter(id=>!!runAbilities[id]).length; }
let treeSelected=null;
function treeStatus(node, nodes){
  const rang=treeRang(node.id), max=node.maxRank||1;
  if(node.free) return {art:'bought',text:'Ausgangspunkt',rang:1,max:1};
  if(rang>=max) return {art:'bought', text:max>1?'Rang '+rang+' / '+max:'Freigeschaltet',rang,max};
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
  if(node.passive && !rang && !runAbilities[node.passive] && passiveTreeAnzahl()>=MAX_PASSIVE_SLOTS)
    return {art:'locked', text:'Alle 3 Passivplätze sind belegt'};
  if(skillPoints<1) return {art:'locked', text:'Kein Punkt verfügbar'};
  return {art:'ready', text:'1 Punkt · Rang '+(rang+1)+' / '+max,rang,max};
}
function renderSkillTree(){
  if(!treeBranches) return;
  const nodes=treeNodes();
  treePunkte.textContent=skillPoints+' '+(skillPoints===1?'Punkt':'Punkte')+' verfügbar';
  treeBranches.innerHTML='';
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg'); svg.classList.add('orbit-lines'); treeBranches.appendChild(svg);
  for(const node of nodes){
    const status=treeStatus(node,nodes), b=document.createElement('button');
    b.className='orbit-node '+(node.kind||'buff')+' '+status.art+(treeSelected===node.id?' selected':'');
    b.dataset.node=node.id; b.style.gridColumn=node.col; b.style.gridRow=node.stage+1;
    b.setAttribute('aria-label',node.name+', '+status.text);
    b.innerHTML='<span class="orbit-icon">'+(status.art==='bought'&&node.kind!=='root'?'✓':node.icon||'✦')+'</span>'+
      (node.short?'<span class="orbit-short">'+node.short+'</span>':'')+
      '<span class="orbit-label">'+node.name+'</span>'+((node.maxRank||1)>1?'<span class="rank-badge">'+treeRang(node.id)+'/'+node.maxRank+'</span>':'');
    b.onclick=()=>{treeSelected=node.id;renderSkillTree();};
    treeBranches.appendChild(b);
  }
  renderTreeDetail(nodes.find(n=>n.id===treeSelected)||nodes[0],nodes);
  requestAnimationFrame(()=>drawOrbitLines(nodes));
}
function renderTreeDetail(node,nodes){
  const box=document.getElementById('tree-detail'); if(!box||!node) return;
  const status=treeStatus(node,nodes), max=node.maxRank||1, rang=treeRang(node.id);
  const rangText=max>1?'Rang '+rang+' / '+max:'Mechanik';
  box.innerHTML='<span class="detail-icon '+(node.kind||'buff')+'">'+(node.icon||'✦')+'</span><span><b>'+node.name+'</b><small>'+node.desc+'</small><em>'+status.text+'</em></span>'+
    (status.art==='ready'?'<button id="tree-buy">'+(rang?'Verbessern':'Freischalten')+'</button>':'<span class="detail-state">'+rangText+'</span>');
  const buy=document.getElementById('tree-buy'); if(buy) buy.onclick=()=>kaufenTreeKnoten(node.id);
}
function drawOrbitLines(nodes){
  const svg=treeBranches.querySelector('.orbit-lines'); if(!svg) return;
  const area=treeBranches.getBoundingClientRect(); svg.setAttribute('viewBox','0 0 '+area.width+' '+area.height); svg.innerHTML='';
  for(const node of nodes){
    for(const req of [...(node.reqAll||[]),...(node.reqAny||[])]){
      const from=treeBranches.querySelector('[data-node="'+req+'"]'), to=treeBranches.querySelector('[data-node="'+node.id+'"]'); if(!from||!to) continue;
      const a=from.getBoundingClientRect(),b=to.getBoundingClientRect(), line=document.createElementNS('http://www.w3.org/2000/svg','path');
      const x1=a.left+a.width/2-area.left,y1=a.top+a.height/2-area.top,x2=b.left+b.width/2-area.left,y2=b.top+b.height/2-area.top,mid=(y1+y2)/2;
      line.setAttribute('d','M '+x1+' '+y1+' C '+x1+' '+mid+', '+x2+' '+mid+', '+x2+' '+y2);
      line.classList.add(treeRang(node.id)?'lit':treeStatus(node,nodes).art==='ready'?'open':'dim'); svg.appendChild(line);
    }
  }
}
function treeMeldung(text){
  const el=document.getElementById('tree-message'); if(!el) return;
  el.textContent=text; el.classList.add('show'); clearTimeout(treeMeldung.timer);
  treeMeldung.timer=setTimeout(()=>el.classList.remove('show'),1800);
}
function kaufenTreeKnoten(id){
  const nodes=treeNodes(), node=nodes.find(n=>n.id===id);
  if(!node || treeStatus(node,nodes).art!=='ready') return;
  skillPoints--; const next=treeRang(id)+1; runTree[id]=next; node.apply(next);
  if(node.evo && sfx) sfx('unlockBig'); else if(sfx) sfx('pick');
  updateActiveButtons(); updateHUD(true); updateTreeButton(); renderSkillTree();
}
function updateTreeButton(){
  if(!treeBtn) return;
  treeBtn.classList.toggle('hidden', !(state==='playing' && skillPoints>0));
  const count=treeBtn.querySelector('span'); if(count) count.textContent=skillPoints;
}
function openSkillTree(){
  if(state!=='playing' || skillPoints<1) return;
  state='tree'; overlayTree.classList.remove('hidden'); updateTreeButton(); renderSkillTree();
}
function closeSkillTree(){
  if(state!=='tree') return;
  overlayTree.classList.add('hidden'); state='playing'; lastTime=performance.now(); updateTreeButton();
}
treeBtn.addEventListener('click',openSkillTree);
document.getElementById('tree-back').addEventListener('click',closeSkillTree);

function resize(){
  const rawDpr=window.devicePixelRatio||1;
  const dprLimit=IS_TOUCH ? CONFIG.render.touchDpr : CONFIG.render.desktopDpr;
  renderDpr=Math.min(rawDpr, dprLimit)*(sparmodus?CONFIG.render.sparDprFaktor:1);
  // Sichtbarer Viewport (Android-URL-Leiste ein/aus): visualViewport ist die
  // zuverlässige Größe, innerHeight enthält die Leiste und verzerrt das Spiel.
  const vv=window.visualViewport;
  const w=vv? vv.width : (document.documentElement.clientWidth||window.innerWidth);
  const h=vv? vv.height : (document.documentElement.clientHeight||window.innerHeight);
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
  // Mechanische Käufe verändern, WIE ein Lauf abläuft — nicht nur seine Werte.
  { id:'slot2',   name:'Zweite Macht',  desc:'Ein zweiter aktiver Slot · dauerhaft',        icon:'doppel', color:'card-evo', step:1, cap:1, base:260, grow:1, einmalig:true },
  { id:'startimpuls', name:'Startimpuls', desc:'Jeder Lauf beginnt mit 1 Skillpunkt',         icon:'tempo',  color:'card-evo', step:1, cap:1, base:220, grow:1, einmalig:true },
  // Langzeit-Senke, bewusst gedeckelt, damit der Begleiter das Spiel nicht abnimmt.
  { id:'begleiter', name:'Begleiter', desc:'Sammelt für dich ein und schießt auf Gegner · jede Stufe: mehr Schaden und Reichweite',
    icon:'splitter', color:'card-evo', step:1, cap:CONFIG.helfer.maxStufe, base:900, grow:1.55 },
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
window.addEventListener('load',()=>{ player = newPlayer(); window.playerRef = player; if(state==='menu') updateHUD(); });
function resetGame(){
  player=newPlayer(); window.playerRef = player; enemies=[]; stars=[]; particles=[]; floats=[]; shots=[]; orbs=[]; killCount=0; hpKillCount=0;
  wave=1; waveEnemiesToSpawn=0; waveSpawned=0; spawnTimer=0;
  activeCd={wirbel:0,stoss:0,bombe:0,nova:0,sog:0}; phaserCd=0; signaturCd=0; leerenmodusUntil=0; dmgBoostUntil=0; shieldUntil=0; moveBoostUntil=0; stossWaveT=0; wirbelT=0; spinHitTimer=0;
  bonuses={dmg:0, speed:0, range:0, fireRate:0, maxHp:0, blades:1, regen:0};
  counterCd=0; shards=[]; bossActive=false; bossHitClean=true; flashUntil=0;
  const vw=startMaechte();
  activeSlot1=vw.slot1; activeSlot2 = hasSlot2()? vw.slot2 : null;
  runAbilities={}; runEvolutions={}; runTree={}; skillPoints=0; treeFlags={}; bombs=[]; pShots=[]; novaFx=0; novaEcho=0; barriere=0;
  updateActiveButtons();   // ohne das behalten die Knöpfe die Beschriftung des letzten Laufs
  wiederaufBenutzt=false; nachhallZaehler=0; fokus=0; fokusBereit=false; endlosLauf=false; setzeLaufziele();
  toasts=[]; banner=null;
  tutStep=0; tutT=0; unlockFx=0; setzeHelfer();
  if(metaLevel('startimpuls')>0){ player.level=2; player.xpNeed=Math.round(CONFIG.xpBase+2*CONFIG.xpPerLevel); skillPoints=1; }
  shake=0; state='playing'; hideAll(); updateTreeButton(); updateHUD(true); startWave();
  // Beim allerersten Spiel übernimmt der Einstieg die Ansage
  if(save.tutorialDone) announce('Welle 1', 'Überlebe die Arena', '#7cc8ff');
}
function hideAll(){
  overlayStart.classList.add('hidden'); overlayPause.classList.add('hidden');
  overlayOver.classList.add('hidden'); overlayTree.classList.add('hidden');
  document.getElementById('overlay-hangar').classList.add('hidden');
}
function startWave(){
  const d=curDiff();
  const count=Math.max(3, Math.floor((CONFIG.wave.baseCount + wave*CONFIG.wave.perWave)*d.enemyCount*hilfe().gegner));
  waveEnemiesToSpawn = (wave%5===0)? 1 : count;
  waveSpawned=0; spawnTimer=0;
  waveText.textContent='Welle '+wave;
  zielStand('welle', wave);
  if(wave%5===0) spawnBoss();                                  // Boss-Welle (mit eigener Ansage)
  else if(wave>1){ const b=biomeForWave(); announce('Welle '+wave, (wave-1)%5===0? b.name : '', b.accent); }  // Biome-Name, wenn Zone wechselt
  recordBest();
  checkMilestones();   // Erreichen der Welle genügt — Freischaltungen sollen ankommen
}
// Ist dies der Kampf, der den Lauf gewinnt?
function istFinale(){ return wave>=CONFIG.siegWelle && !endlosLauf; }
function spawnBoss(){
  const finale=istFinale();
  const k=bossKindFor(wave);
  const e=makeEnemy('boss');
  e.kind=k.id; e.color=k.color; e.rgb=k.rgb; e.leit=k.leit;   // Variante prägt Aussehen und Verhalten
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
  return list;
}
function pickBossAbility(wave, leit){
  const erlaubt=bossAbilitiesEnabled(wave, leit);
  // Die Leitfähigkeit der Variante kommt doppelt so oft — dadurch fühlt sich jeder
  // Boss-Typ im Kampf anders an, nicht nur optisch.
  const gewichtet=[...erlaubt];
  if(leit && erlaubt.includes(leit)) gewichtet.push(leit, leit);
  const list=gewichtet.filter(a=>a!==lastBossAbility);
  const a=list[Math.floor(Math.random()*list.length)] || leit || 'shock';
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
    if(sfx) sfx('shoot');
  }
  return false;
}
// Boss besiegt -> Etappe geschafft: Abzeichen, Freischaltung, Statistik
function onBossDefeated(){
  bossActive=false;
  save.bossKills=(save.bossKills||0)+1;
  if(istFinale()){ persist(); sieg(); return; }
  if(bossHitClean){ earnBadge('makellos'); zielZaehl('makellos'); }
  if((save.bossKills||0)>=10) earnBadge('meister');
  // Volle Heilung als Etappenbelohnung — behebt "Boss geschafft, dann sofort gestorben"
  if(player.hp < player.maxHp){
    player.hp = player.maxHp; updateHUD();
    announce('Vollständig geheilt', 'Etappe geschafft', '#4de0a0');
    if(sfx) sfx('heal');
  }   // Ausdauer über alle Läufe hinweg
  persist();   // Freischaltungen hängen an der erreichten Welle (checkMilestones), nicht am Boss
}
function recordBest(){
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
  const spawnDist=Math.hypot(w,h)/2 + 60;
  const ang=Math.random()*Math.PI*2;
  const x=player.x+Math.cos(ang)*spawnDist, y=player.y+Math.sin(ang)*spawnDist;
  // Leben nach Schwierigkeit: Bosse bekommen einen eigenen, stärkeren Nachlass
  const hpMult = (type==='boss' ? (diff.bossHp!==undefined?diff.bossHp:1) : (diff.enemyHp!==undefined?diff.enemyHp:1));
  const hp = Math.max(1, Math.round(t.hp*scale*hpMult));
  // Bosse zusätzlich verlangsamt UND hart gedeckelt: der Spieler muss dem Gefahrenband
  // in JEDER Welle entkommen können. Die Bedrohung kommt aus den Fähigkeiten (Ramme,
  // Minions, Spiralen), nicht aus reinem Hinterherlaufen.
  let spd = t.speed*diff.enemySpeed*(type==='boss' ? (diff.bossSpeed!==undefined?diff.bossSpeed:1) : 1);
  if(type==='boss') spd = Math.min(spd, CONFIG.playerBaseSpeed*0.6);
  return { type, x,y, hp, maxHp:hp, dmg:Math.round(t.dmg*dScale*diff.enemyDmg), speed:spd, radius:t.radius, color:t.color, panzer:!!t.panzer, hitCd:0, bossTimer:0, shootRange:t.shootRange||0, chargeT:0, shootCd:0, bossPhase:'', ability:'', ramT:0, shockFx:0, warnT:0 };
}
function randomEnemyType(){
  const d=curDiff();
  // Distanz-/Exploder-Gegner: erst ab späteren Wellen, in frühen Wellen seltener,
  // in späten häufiger — die Schwierigkeitskurve steuert das über enemyCount.
  const exotic = d.enemyCount>=1.2 ? 0.28 : (d.enemyCount<=0.8 ? 0.10 : 0.18);
  // Panzer erscheinen ab der eingestellten Welle — auf „Meister" deutlich früher.
  // Sie sind der Grund, warum Positionieren spät im Lauf wieder zählt.
  const panzerAb = hilfe().panzerAb || CONFIG.panzerAbWelle;
  // Die Gewichte werden nacheinander vom selben Zufallsraum abgezogen. Vorher
  // blockierte „Panzer" alle kleineren Schwellen: Exploder erschienen ab Welle 12
  // gar nicht mehr und Jäger fast nie.
  let r=Math.random();
  if(wave>=panzerAb){ if(r<0.22) return 'panzer'; r-=0.22; }
  const exploderChance=wave>=8 ? exotic*0.45 : 0;
  if(r<exploderChance) return 'exploder'; r-=exploderChance;
  const jaegerChance=wave>=6 ? exotic : 0;
  if(r<jaegerChance) return 'jaeger';
  r=Math.random();
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
  if(state!=='playing'){ stickEnd(); return; }
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
  if(state!=='playing' || onControl(e.target)) return;
  mouseDown=true; stickStart(e.clientX,e.clientY);
});
window.addEventListener('mousemove',e=>{ if(mouseDown) stickMoveTo(e.clientX,e.clientY); });
window.addEventListener('mouseup',()=>{ if(mouseDown){ mouseDown=false; stickEnd(); } });
window.addEventListener('keydown',e=>{
  keys[e.key.toLowerCase()]=true;
  if(e.key==='1') doActive(1);
  if(e.key==='2') doActive(2);
  if(e.key==='3') doSignatur();
  if(e.key==='Escape' && state==='playing') pauseGame();
  if(e.key==='Escape' && state==='paused') resumeGame();
});
window.addEventListener('keyup',e=> keys[e.key.toLowerCase()]=false);
canvas.addEventListener('touchstart',e=>{
  // prevent scroll, but allow buttons: only prevent if not on button
  if(e.target.closest('button')) return;
  e.preventDefault();
},{passive:false});

// Pause
function pauseGame(){ if(state!=='playing') return; state='paused'; updateTreeButton(); refreshMenuVisibility(); overlayPause.classList.remove('hidden'); }
function resumeGame(){ if(state!=='paused') return; state='playing'; overlayPause.classList.add('hidden'); lastTime=performance.now(); updateTreeButton(); }
document.getElementById('pause-btn').addEventListener('click',pauseGame);
document.getElementById('resume-btn').addEventListener('click',resumeGame);
/* Lauf aufgeben — nach Genre-Konvention (Vampire Survivors, Hades, Brotato):
   Die Beschriftung nennt die Folge statt des Ziels, es wird einmal nachgefragt, und
   das Gesammelte bleibt erhalten. Bestraft man das Aufgeben, geben Spieler nicht auf,
   sondern lassen sich absichtlich töten — das ist für alle schlechter.
   Die Rückfrage kommt nur, wenn wirklich etwas auf dem Spiel steht. */
function laufBeenden(){
  bucheFragmente();
  state='menu';
  updateTreeButton();
  hideAll();
  document.getElementById('overlay-abbruch').classList.add('hidden');
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
  for(const n of [1,2]){
    const id=n===1?activeSlot1:activeSlot2;
    const kachel=document.createElement('button');
    if(n===2 && !hasSlot2()){
      kachel.className='slot-kachel gesperrt';
      kachel.innerHTML=`<span class="slot-nr">Slot 2</span>${svg(ICON.doppel)}
        <span class="slot-name">Gesperrt</span><span class="slot-sub">In der Werkstatt freischalten</span>`;
      slotBox.appendChild(kachel); continue;
    }
    const a=ABILITIES[id]; if(!a) continue;
    const lv=runAbilities[id]||1, evo=evolvedOf(id);
    kachel.className='slot-kachel'+(evo?' is-evo':'');
    kachel.innerHTML=`<span class="slot-nr">Slot ${n}</span>${svg(abilIcon(id))}
      <span class="slot-name">${evo? EVOLUTIONS[evo].name : a.name}</span>
      <span class="slot-sub">${evo? 'Entwickelt' : 'Stufe '+lv+' von '+MAX_ABIL_LEVEL}</span>
      ${pipsHTML(lv)}
      ${evo? '' : '<span class="slot-next">'+naechsteStufeText(id, lv)+'</span>'}`;
    // Im Lauf nicht mehr tauschbar — die Wahl fällt vor dem Start unter „Startmächte".
    // Die Kachel bleibt als Anzeige (Stufe, Entwicklung, nächster Schritt) erhalten.
    kachel.classList.add('nurAnzeige');
    slotBox.appendChild(kachel);
  }
  // Passive Slots — nur ansehen, Tausch ausschließlich beim Angebot einer vierten
  const pSlots=document.getElementById('codex-passivslots');
  const pHint=document.getElementById('passiv-hinweis');
  if(pSlots){
    pSlots.innerHTML='';
    const getragen=PASSIVE_IDS.filter(isCarried);
    for(let i=0;i<MAX_PASSIVE_SLOTS;i++){
      const id=getragen[i];
      const kachel=document.createElement('div');
      if(!id){
        kachel.className='slot-kachel leer';
        kachel.innerHTML=`<span class="slot-nr">Slot ${i+1}</span><span class="slot-name">Frei</span>
          <span class="slot-sub">Im Skill-Tree aktivieren</span>`;
      } else {
        const lv=runAbilities[id]||1;
        kachel.className='slot-kachel';
        kachel.innerHTML=`<span class="slot-nr">Slot ${i+1}</span>${svg(abilIcon(id))}
          <span class="slot-name">${ABILITIES[id].name}</span>
          <span class="slot-sub">Stufe ${lv} von ${MAX_ABIL_LEVEL}</span>${pipsHTML(lv)}
          <span class="slot-next">${naechsteStufeText(id, lv)}</span>`;
      }
      pSlots.appendChild(kachel);
    }
    if(pHint) pHint.textContent = getragen.length>=MAX_PASSIVE_SLOTS
      ? 'Alle Slots belegt — investiere jetzt in ihre Stufen oder eine Entwicklung.'
      : 'Neue passive Mächte aktivierst du im Skill-Tree.';
  }
  /* Gruppierung nach dem, was der Spieler wissen will — „trage ich das? kann ich es
     kriegen? oder ist es noch zu?" — statt nach der internen Einteilung aktiv/passiv.
     Genau daran ist das alte Menü gescheitert. */
  const verfuegbarBox=document.getElementById('codex-verfuegbar');
  const gesperrtBox=document.getElementById('codex-gesperrt');
  if(verfuegbarBox) verfuegbarBox.innerHTML='';
  if(gesperrtBox) gesperrtBox.innerHTML='';

  const zeile=(id, zusatz, badge, klasse)=>{
    const a=ABILITIES[id];
    const row=document.createElement('div');
    row.className='codex-row'+(klasse||'');
    row.innerHTML=`${svg(abilIcon(id))}
      <div class="info"><h3>${a.name}</h3><div class="desc">${a.desc}</div>
      <div class="lv">${zusatz}</div></div>
      <span class="slot-badge ${badge.cls||''}">${badge.text}</span>`;
    return row;
  };
  const artText = id => ABILITIES[id].slot==='active' ? 'Aktiv · eigener Knopf' : 'Passiv · wirkt von allein';

  for(const id of [...ACTIVE_IDS, ...PASSIVE_IDS]){
    const a=ABILITIES[id], frei=abilUnlocked(id), lv=runAbilities[id]||0;
    const imSlot = activeSlot1===id?1:(activeSlot2===id?2:0);
    const traegt = a.slot==='active' ? imSlot>0 : lv>0;

    if(traegt && getragenBox){
      const stufe=Math.max(1,lv);
      getragenBox.appendChild(zeile(id,
        `${artText(id)} · Stufe ${stufe} von ${MAX_ABIL_LEVEL}${pipsHTML(stufe)}`,
        {text: imSlot? 'Slot '+imSlot : 'Aktiv', cls:'in'}));
    } else if(frei && verfuegbarBox){
      const passivVoll = a.slot!=='active' && PASSIVE_IDS.filter(isCarried).length>=MAX_PASSIVE_SLOTS;
      verfuegbarBox.appendChild(zeile(id,
        artText(id)+' · '+(a.slot==='active'? 'oben in einen Slot legen'
          : passivVoll? 'Slots voll — vorhandene Passives weiter stärken' : 'im Tree aktivierbar'),
        {text:'Frei'}));
    } else if(gesperrtBox){
      gesperrtBox.appendChild(zeile(id,
        unlockText(id)+(a.voll?' · Vollversion':''),
        {text:'🔒'}, ' locked'));
    }
  }
  // Leere Abschnitte nicht als Lücke stehen lassen
  const leer=(box,text)=>{ if(box && !box.children.length){ const d=document.createElement('div'); d.className='codex-leer'; d.textContent=text; box.appendChild(d); } };
  leer(getragenBox,'Noch nichts — investiere einen Punkt im Skill-Tree.');
  leer(verfuegbarBox,'Alles Freigeschaltete trägst du bereits.');
  leer(gesperrtBox,'Alles freigeschaltet.');
  // Entwicklungen: bewusst offen dokumentiert, damit man gezielt darauf hinspielen kann
  const evoBox=document.getElementById('codex-evo');
  if(evoBox){
    evoBox.innerHTML='';
    for(const evoId in EVOLUTIONS){
      const e=EVOLUTIONS[evoId];
      const fertig=runEvolutions[e.base]===evoId;
      const basisOk=isCarried(e.base) && (runAbilities[e.base]||1)>=MAX_ABIL_LEVEL;
      const reqOk=isCarried(e.req);
      const row=document.createElement('div');
      row.className='codex-row'+(fertig?' is-evo':(basisOk&&reqOk?'':' locked'));
      row.innerHTML=`${svg(abilIcon(e.base))}
        <div class="info"><h3>${e.name}</h3><div class="desc">${e.desc}</div>
        <div class="lv">${ABILITIES[e.base].name} Stufe ${MAX_ABIL_LEVEL} ${basisOk?'✓':'✗'} &nbsp;+&nbsp; ${ABILITIES[e.req].name} ${reqOk?'✓':'✗'}</div></div>
        <span class="slot-badge ${fertig?'in':''}">${fertig?'Fertig':'—'}</span>`;
      evoBox.appendChild(row);
    }
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
        ${frei? (save.figur===id?'<span class="wahl-marke">gewählt</span>':'') : '<span class="wahl-marke aus">🔒 ab Welle '+(skinReqWave(id,'figur')||'?')+'</span>'}</div>
      <p class="wahl-fuer">${f.desc}</p>`;
    if(frei) b.onclick=()=>{ save.figur=id; persist(); if(sfx) sfx('pick'); renderCharakterWahl(); };
    box.appendChild(b);
  }
  const d=document.getElementById('charakter-detail'), f=figur();
  if(d) d.innerHTML=`<h3>${f.name}</h3><p class="wahl-staerke">${f.staerke}</p><p class="wahl-fuer">${f.fuer}</p><div class="wahl-werte"><span>Leben ${Math.round(f.hp*100)} %</span><span>Tempo ${Math.round(f.tempo*100)} %</span><span>Reichweite ${Math.round(f.reichweite*100)} %</span></div>`;
}
// Hilfsstufe: dieselben Schalter, drei Voreinstellungen
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
}
function renderStartMaechte(){
  renderCharakterWahl();
  renderHilfeWahl();
  const box=document.getElementById('startmaechte-slots');
  if(!box) return;
  const vw=startMaechte();
  box.innerHTML='';
  for(const n of [1,2]){
    const id = n===1? vw.slot1 : vw.slot2;
    const kachel=document.createElement('div');
    if(n===2 && !hasSlot2()){
      kachel.className='slot-kachel gesperrt';
      kachel.innerHTML=`<span class="slot-nr">Slot 2</span><span class="slot-name">Gesperrt</span>
        <span class="slot-sub">In der Werkstatt freischaltbar</span>`;
    } else if(!id){
      kachel.className='slot-kachel leer';
      kachel.innerHTML=`<span class="slot-nr">Slot ${n}</span><span class="slot-name">Frei</span>
        <span class="slot-sub">Noch keine zweite Macht verfügbar</span>`;
    } else {
      const a=ABILITIES[id];
      kachel.className='slot-kachel';
      kachel.innerHTML=`<span class="slot-nr">Slot ${n}</span>${svg(abilIcon(id))}
        <span class="slot-name">${a.name}</span>
        <span class="slot-sub">${a.desc}</span>`;
      kachel.onclick=()=>openPick('vorwahl', n);
    }
    box.appendChild(kachel);
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
  refreshMenuVisibility();
  document.getElementById('overlay-start').classList.remove('hidden');
  state='menu';
  updateTreeButton();
}
document.getElementById('restart-btn').addEventListener('click', zumHauptmenue);
document.getElementById('sieg-weiter').addEventListener('click', endlosWeiter);
document.getElementById('sieg-menue').addEventListener('click',()=>{
  document.getElementById('overlay-sieg').classList.add('hidden');
  zumHauptmenue();
});
document.getElementById('wieder-btn').addEventListener('click',()=>resetGame());
document.getElementById('start-btn').addEventListener('click',resetGame);
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
        if(id==='konstrukt') zeichneKonstrukt(g, 0, c1, c2);
        else zeichneHeld(g, false, 0, 0, c1);
      });
      cell.appendChild(bild);
      const txt=document.createElement('div');
      const w=skinReqWave(id,'figur');
      txt.innerHTML=`<span class="kosm-name">${f.name}</span>`+
        `<span class="kosm-desc">${avail? f.desc : '🔒 '+(w? 'ab Welle '+w : 'gesperrt')}</span>`;
      cell.appendChild(txt);
      if(avail) cell.onclick=()=>{ save.figur=id; persist(); if(sfx) sfx('pick'); renderProgress(); };
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
document.getElementById('mute-btn').addEventListener('click',toggleMute);
updateMuteBtn();
refreshMenuVisibility();   // beim allerersten Start bleiben Meta-Shop, Sammlung und Codex verborgen

// Specials — 2 frei belegbare Slots; doActive löst die im Slot gewählte Fähigkeit aus
function doActive(slot){
  const id = slot===1? activeSlot1 : activeSlot2;
  if(state==='playing' && id==='bombe' && treeFlags.mod_bombe==='b' && bombs.length){
    bombs.forEach(b=>b.t=0); return;
  }
  if(state!=='playing' || !id || activeCd[id]>0) return;
  activeCd[id]=activeCdMax(id);
  // Volle Fokus-Leiste wird beim nächsten Einsatz verbraucht und verstärkt ihn
  fokusAktiv = fokusBereit;
  if(fokusAktiv){
    fokusBereit=false; fokus=0;
    spawnParticles(player.x,player.y,'#ffffff',16);
    shake=Math.max(shake,7);
    zielZaehl('fokus');
  }
  if(treeFlags.nachsetzen) moveBoostUntil=Date.now()+1200;
  if(id==='wirbel') executeWirbel();
  else if(id==='stoss') executeStoss();
  else if(id==='bombe') executeBombe();
  else if(id==='nova') executeNova();
  else if(id==='sog') executeSog();
}
function doSignatur(){
  if(state!=='playing' || signaturCd>0) return;
  const f=figur(); signaturCd=signaturCdMax();
  if(f.id==='held'){
    let dx=moveVec.x, dy=moveVec.y;
    if(Math.hypot(dx,dy)<0.1){ dx=Math.cos(player.face||swordAngle); dy=Math.sin(player.face||swordAngle); }
    const len=Math.max(1,Math.hypot(dx,dy)); dx/=len; dy/=len;
    const sx=player.x, sy=player.y, dist=155;
    player.x+=dx*dist; player.y+=dy*dist; shieldUntil=Math.max(shieldUntil,Date.now()+420);
    const dmg=Math.round(82*(treeFlags.sonnenpfad?0.72:1)*(1+bonuses.dmg)*(treeFlags.signaturDmgMult||1));
    const breite=treeFlags.lichtspur?62:42;
    for(const en of enemies){
      const ex=en.x-sx, ey=en.y-sy, vor=ex*dx+ey*dy, seit=Math.abs(ex*dy-ey*dx);
      if(vor>-en.radius && vor<dist+en.radius && seit<breite+en.radius){ en.hp-=dmg; if(treeFlags.lichtspur) en.hp-=Math.round(dmg*.22); en.stunT=Math.max(en.stunT||0,260); pushFloat(en.x,en.y-16,'-'+dmg,'#ffffff',1.15); }
    }
    spawnParticles(player.x,player.y,currentSkin().blade,20); announce('Lichtbahn','Die Klinge weist den Weg','#ffd257'); if(sfx) sfx('wirbel');
  } else {
    // Die Leerenklinge bezahlt ihre Macht mit Leben. Der Effekt verändert nur die
    // Orbit-Klinge: mehr Bahnen, höheres Tempo und Lebensraub durch Klingen-Kills.
    const opfer=Math.min(player.hp-1,player.maxHp*(treeFlags.leerenOpfer||0.14));
    if(opfer>0){ player.hp-=opfer; pushFloat(player.x,player.y-26,'-'+Math.round(opfer)+' HP','#c77dff'); }
    leerenmodusUntil=Date.now()+6000+(treeFlags.leerenDauer||0);
    spawnParticles(player.x,player.y,'#c77dff',24); announce('Leerenüberladung','Die Orbit-Klinge hungert','#c77dff'); if(sfx) sfx('nova');
  }
  updateSignaturButton();
}
function executeWirbel(){
  const lv=abilityLevel('wirbel');
  const evo=evolvedOf('wirbel')==='sturmwirbel';
  let dmg=Math.round(CONFIG.baseDamage*(1+bonuses.dmg)*CONFIG.wirbelDamageMult*abilScale(lv)*machtFaktor('wirbel') * (dmgBoostUntil>Date.now()?2:1) * fokusFaktor());
  let r=CONFIG.wirbelRadius*(1+bonuses.range*0.5);
  if(evo){ r*=1.55; dmg=Math.round(dmg*1.5); }     // Sturmwirbel: größer und härter
  for(const en of enemies){
    const dist=Math.hypot(en.x-player.x,en.y-player.y);
    if(dist < r + en.radius){
      en.hp-=dmg; spawnParticles(en.x,en.y,en.color,8); pushFloat(en.x,en.y-20,'-'+dmg,'#ffcc33');
      if(treeFlags.mod_wirbel==='a' && dist>1){ en.x+=(player.x-en.x)/dist*42; en.y+=(player.y-en.y)/dist*42; }
      if(treeFlags.mod_wirbel==='b') en.hp-=Math.round(dmg*0.28);
    }
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
  // Sturmwirbel schleudert die Splitter als Geschosse nach außen
  if(evo){
    const n=8;
    for(let i=0;i<n;i++){
      const a=i/n*Math.PI*2 + Math.random()*0.2;
      pShots.push({ x:player.x, y:player.y, vx:Math.cos(a)*380, vy:Math.sin(a)*380,
        r:5, life:0.9, dmg:Math.round(dmg*0.35), storm:true });
    }
  }
  spawnParticles(player.x,player.y,'#ffcc33',evo?26:14);
  wirbelT=1; wirbelShownR=r;   // Optik nutzt exakt den Trefferradius
  shake=evo?11:8; if(sfx) sfx('wirbel');
}
function executeStoss(){
  const lv=abilityLevel('stoss');
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
      // Sprung ab Stufe 4: die Welle betäubt zusätzlich — aus Wegstoßen wird Kontrolle
      if(lv>=SPRUNG_STUFE) en.stunT=Math.max(en.stunT||0, 600);
      spawnParticles(en.x,en.y,'#6ec8ff',6);
      pushFloat(en.x,en.y-18,'-'+dmg,'#6ec8ff');
      getroffen.push(en);
    }
  }
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
  const bombe=(dx,dy,verzug)=>({ x:player.x+dx, y:player.y+dy,
    t:CONFIG.bombe.fuse*(1-0.03*(lv-1))+verzug, max:CONFIG.bombe.fuse,
    r:CONFIG.bombe.radius*(1+0.05*(lv-1)), dmg:Math.round(CONFIG.bombe.dmg*abilScale(lv)*machtFaktor('bombe')*(1+bonuses.dmg)*fokusFaktor()),
    streu: evolvedOf('bombe')==='streubombe' });
  let bx=0,by=0;
  if(treeFlags.mod_bombe==='a' && enemies.length){
    const ziel=enemies.reduce((a,b)=>Math.hypot(a.x-player.x,a.y-player.y)<Math.hypot(b.x-player.x,b.y-player.y)?a:b);
    bx=ziel.x-player.x;by=ziel.y-player.y;
  }
  bombs.push(bombe(bx,by,0));
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
  const R=CONFIG.sog.range*(1+0.10*(lv-1))*(1+bonuses.range*0.3);
  const kraft=CONFIG.sog.kraft*(1+0.10*(lv-1));
  const dmg=Math.round(CONFIG.sog.dmg*abilScale(lv)*machtFaktor('sog')*(1+bonuses.dmg)*fokusFaktor());
  for(const en of enemies){
    const dx=player.x-en.x, dy=player.y-en.y, d=Math.hypot(dx,dy);
    if(d>R || d<1) continue;
    // nicht ins Zentrum saugen, sondern in Klingenreichweite ziehen
    const ziel=Math.min(kraft, Math.max(0, d-(player.radius+30)));
    en.x += dx/d*ziel; en.y += dy/d*ziel;
    en.hp -= dmg;
    if(treeFlags.mod_sog==='a') en.stunT=Math.max(en.stunT||0,900);
    if(treeFlags.mod_sog==='b'){
      const a=Math.atan2(en.y-player.y,en.x-player.x)+0.8;
      const rr=player.radius+bladeLength()*0.72; en.x=player.x+Math.cos(a)*rr;en.y=player.y+Math.sin(a)*rr;
      en.stunT=Math.max(en.stunT||0,650);
    }
    if(lv>=SPRUNG_STUFE) en.stunT=Math.max(en.stunT||0, CONFIG.sog.stun);
    spawnParticles(en.x,en.y,'#4de0a0',4);
  }
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
  if(lv>=SPRUNG_STUFE){ novaEcho=420; novaEchoDmg=Math.round(dmg*0.6); novaEchoRange=range*1.3; }
  novaFx=1; shake=7; if(sfx) sfx('nova');
}
/* Entdrängung über ein Raster: Jeder Gegner landet in genau einer Zelle, verglichen
   wird nur mit den eigenen und den acht Nachbarzellen. Kostet damit ungefähr
   linear statt quadratisch — der Hauptgrund fürs Ruckeln in späten Wellen. */
const SEP_ZELLE=56;                       // etwas größer als der größte Gegnerdurchmesser
const sepRaster=new Map();
function separiereGegner(){
  if(enemies.length<2) return;
  sepRaster.clear();
  for(let i=0;i<enemies.length;i++){
    const e=enemies[i];
    const key=Math.floor(e.x/SEP_ZELLE)+','+Math.floor(e.y/SEP_ZELLE);
    let liste=sepRaster.get(key);
    if(!liste){ liste=[]; sepRaster.set(key,liste); }
    liste.push(i);
  }
  for(let i=0;i<enemies.length;i++){
    const a=enemies[i];
    const cx=Math.floor(a.x/SEP_ZELLE), cy=Math.floor(a.y/SEP_ZELLE);
    for(let ox=-1;ox<=1;ox++) for(let oy=-1;oy<=1;oy++){
      const liste=sepRaster.get((cx+ox)+','+(cy+oy));
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
  const R=CONFIG.abil.counterRadius, dmg=Math.round(CONFIG.abil.counterDamage*abilScale(lv));
  // Sprung ab Stufe 4: der Konter schleudert doppelt so weit — er schafft echten Freiraum
  const push=CONFIG.abil.counterPush*(lv>=SPRUNG_STUFE? 2 : 1);
  for(const en of enemies){
    const dx=en.x-player.x, dy=en.y-player.y, d=Math.hypot(dx,dy);
    if(d<R+en.radius){
      en.hp-=dmg;
      const a=d>0.001?Math.atan2(dy,dx):Math.random()*Math.PI*2;
      en.x+=Math.cos(a)*push; en.y+=Math.sin(a)*push;
    }
  }
  spawnParticles(player.x,player.y,'#ff9a6b',12); if(sfx) sfx('counter');
}
// Kettenblitz zwischen zwei Punkten (nur Optik)
function addBolt(x1,y1,x2,y2){ particles.push({bolt:true, x:x1,y:y1, x2, y2, life:0.16, max:0.16}); }
btnWirbel.addEventListener('touchstart',e=>{e.preventDefault();doActive(1)});
btnStoss.addEventListener('touchstart',e=>{e.preventDefault();doActive(2)});
btnSignatur.addEventListener('touchstart',e=>{e.preventDefault();doSignatur()});
btnWirbel.addEventListener('click',()=>doActive(1));
btnStoss.addEventListener('click',()=>doActive(2));
btnSignatur.addEventListener('click',doSignatur);

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
  dropStar(en.x,en.y, CONFIG.enemyTypes[en.type].star);
  player.xp+=laufXp(CONFIG.enemyTypes[en.type].xp);
  if(leerenmodusAktiv() && player.hp<player.maxHp){
    const heilung=player.maxHp*(treeFlags.leerenHeilung||0.01);
    player.hp=Math.min(player.maxHp,player.hp+heilung);
    pushFloat(player.x,player.y-24,'+'+Math.round(heilung)+' HP','#c77dff');
  }
  if(leerenmodusAktiv() && treeFlags.leerenKillDauer){
    const maxEnd=Date.now()+10000; leerenmodusUntil=Math.min(maxEnd,leerenmodusUntil+220);
  }
  // Lebensregen (passiv): heilt pro Kill, höhere Stufe = mehr
  if(runAbilities.lebensregen){
    const heal=CONFIG.healPerKill*(1+0.5*(runAbilities.lebensregen-1));
    if(player.hp<player.maxHp){ player.hp=Math.min(player.maxHp, player.hp+heal); pushFloat(player.x,player.y-26,'+'+Math.round(heal)+' HP','#4de0a0'); }
  }
  killCount++;
  zielZaehl('kills');
  if(en.panzer) zielZaehl('panzer');
  let dropped=false;
  if(en.type==='boss'){ dropOrb(en.x,en.y,true); dropped=true; }
  else if(en.type==='schwer'){ dropOrb(en.x,en.y,false); dropped=true; }
  else if(killCount>=CONFIG.xpOrb.pity || Math.random()<CONFIG.xpOrb.chance){ dropOrb(en.x,en.y,false); dropped=true; }
  if(dropped) killCount=0;
  // Lebenskugeln unabhängig davon, mit eigenem Pity-Zähler
  hpKillCount++;
  if(player.hp < player.maxHp && (hpKillCount>=CONFIG.hpOrb.pity || Math.random()<CONFIG.hpOrb.chance)){
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
  schaden:'<path d="M4 20 16 8" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><path d="M14.5 6.5 19 4l-2.5 4.5z" fill="currentColor"/><circle cx="5" cy="19" r="2" fill="currentColor"/>',
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
  phaser:'<path d="M13 2 5 13h6l-2 9 8-11h-6z" fill="currentColor"/>'
};
function svg(paths){ return `<svg class="card-icon" viewBox="0 0 24 24" aria-hidden="true">${paths}</svg>`; }

// Pip-Reihe für die kompakten Stufenanzeigen in Codex und Hangar.
function pipsHTML(level, max=MAX_ABIL_LEVEL){
  let s='<span class="pips">';
  for(let i=1;i<=max;i++) s+=`<i class="pip ${i<=level?'on':''}"></i>`;
  return s+'</span>';
}
/* Mehrere Stufen auf einmal werden als Punkte gesammelt. Der Kampf wird nicht mehr
   unterbrochen: Der Spieler öffnet den Tree selbst, wenn der Moment passt. */
function checkLevelUp(){
  let neuePunkte=0;
  while(player.xp >= player.xpNeed){
    player.xp-=player.xpNeed; player.level++; player.xpNeed=Math.round(CONFIG.xpBase + player.level*CONFIG.xpPerLevel);
    skillPoints++; neuePunkte++;
  }
  if(neuePunkte){
    const text='+'+neuePunkte+' Skill'+(neuePunkte===1?'punkt':'punkte');
    announce('Level '+player.level, text, '#ffd257');
    pushFloat(player.x,player.y-38,text,'#ffd257',1.15);
    if(sfx) sfx('levelup');
    updateTreeButton(); updateHUD(true);
  }
}
function metaLevel(id){ return (save.meta&&save.meta[id])||0; }
function metaValue(id){ const m=META_UPGRADES.find(u=>u.id===id); return m? metaLevel(id)*m.step : 0; }
function metaPrice(id){ const m=META_UPGRADES.find(u=>u.id===id); return Math.round(m.base*Math.pow(m.grow, metaLevel(id))); }
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
  for(const u of META_UPGRADES){
    const lv=metaLevel(u.id), total=Math.round(u.cap/u.step), full=lv>=total;
    const pct=Math.min(100, Math.round(lv/total*100));
    const price=full? null : metaPrice(u.id);
    const c=document.createElement('div'); c.className='shop-card';
    c.innerHTML=`<div class="shop-head">${svg(ICON[u.icon]||'')}<h3>${u.name}</h3></div>
      <p>${u.desc}</p>
      <div class="lv">Stufe ${lv} / ${total}</div>
      <div class="meta-bar"><span style="width:${pct}%"></span></div>
      <button ${(full||price>save.stars)?'disabled':''}>${full? 'Max.' : price+' ◆'}</button>`;
    c.querySelector('button').onclick=()=>{
      if(full || price>save.stars) return;
      save.meta[u.id]=lv+1; save.stars-=price; persist();
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
  const rest=Math.max(0, Math.min(1, cd/max));
  sweep.style.setProperty('--cd', (rest*100).toFixed(1));
  const ready = cd<=0;
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
  const pct=Math.max(0, player.hp/player.maxHp*100);
  healthBar.style.width=pct+'%';
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
  // Fokus-Leiste
  if(fokusWrap && fokusBar){
    fokusBar.style.width=Math.min(100, fokus/fokusZiel()*100)+'%';
    fokusWrap.classList.toggle('bereit', fokusBereit);
    fokusText.textContent=fokusBereit?'FOKUS BEREIT':'Fokus '+Math.floor(fokus)+' / '+fokusZiel();
  }
  // Laufziele — nur neu bauen, wenn sich etwas geändert hat, sonst flackert es
  if(zielListe){
    const stand=laufziele.map(z=>z.def.id+':'+z.wert+':'+(z.fertig?1:0)).join('|');
    if(zielListe.dataset.stand!==stand){
      zielListe.dataset.stand=stand;
      zielListe.innerHTML='';
      for(const z of laufziele){
        const d=document.createElement('div');
        d.className='ziel'+(z.fertig?' fertig':'');
        const fort = z.def.ziel>1 && !z.fertig ? '<span class="fort">'+z.wert+'/'+z.def.ziel+'</span>' : '';
        d.innerHTML=(z.fertig? '<span class="haken">✓</span>' : '')+'<span>'+zielText(z.def)+'</span>'+fort;
        zielListe.appendChild(d);
      }
    }
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
function sieg(){
  state='sieg';
  updateTreeButton();
  recordBest();
  const verdient=bucheFragmente();
  const ersterSieg=!save.gewonnen;
  save.gewonnen=true; save.endlosFrei=true; persist();
  const zieleFertig=laufziele.filter(z=>z.fertig).length;
  document.getElementById('sieg-text').innerHTML=
    (ersterSieg? '<b>Zum ersten Mal!</b><br>' : '')+
    `Du hast den Zerbrochenen Mond bezwungen — auf <b>${hilfe().name}</b>.<br>`+
    `Level ${player.level} · ${zieleFertig} von ${laufziele.length} Laufzielen`+
    (verdient>0? `<br><b style="color:var(--gold)">+${verdient} ◆</b> Fragmente` : '');
  hideAll();
  document.getElementById('overlay-sieg').classList.remove('hidden');
  if(sfx){ sfx('unlockBig'); setTimeout(()=>sfx('levelup'), 260); }
}
// Nach dem Sieg weiterspielen: ab hier ist es der Endlosmodus, kein Finale mehr
function endlosWeiter(){
  document.getElementById('overlay-sieg').classList.add('hidden');
  endlosLauf=true;
  state='playing';
  updateTreeButton();
  announce('Endlos', 'Wie weit kommst du?', '#c77dff');
  wave++; startWave();
}
function gameOver(){
  state='gameover'; if(sfx) sfx('gameover');
  updateTreeButton();
  recordBest();
  const earned=bucheFragmente();
  const best=bestFuer();
  document.getElementById('gameover-stats').innerHTML=
    `Erreicht: <b>Welle ${wave}</b> · Level ${player.level}<br>`+
    (earned>0? `<b style="color:var(--gold)">+${earned} ◆</b> Fragmente · ${save.stars} ◆ insgesamt<br>`:'')+
    `<span style="color:var(--muted)">Bestmarke: Welle ${best}</span>`;
  overlayOver.classList.remove('hidden');
}

// Loop
function update(dt){
  if(state!=='playing') return;
  // cooldowns (aktive Fähigkeiten) + Cooldown-Anzeige auf den Buttons
  for(const id of ACTIVE_IDS) if(activeCd[id]>0) activeCd[id]=Math.max(0, activeCd[id]-dt);
  if(signaturCd>0) signaturCd=Math.max(0,signaturCd-dt);
  updateCooldownUI(btnWirbel, cdWirbel, activeCd[activeSlot1]||0, activeCdMax(activeSlot1), 'a');
  updateCooldownUI(btnStoss,  cdStoss,  activeCd[activeSlot2]||0, activeCdMax(activeSlot2), 'b');
  updateCooldownUI(btnSignatur, cdSignatur, signaturCd, signaturCdMax(), 'signatur');

  // Bewegung – Spieler läuft frei durch die Welt, Kamera hält ihn zentriert
  const w=canvas.clientWidth || window.innerWidth, h=canvas.clientHeight || window.innerHeight;
  let ix=moveVec.x, iy=moveVec.y;
  if(keys['w']||keys['arrowup'])    iy-=1;
  if(keys['s']||keys['arrowdown'])  iy+=1;
  if(keys['a']||keys['arrowleft'])  ix-=1;
  if(keys['d']||keys['arrowright']) ix+=1;
  const mlen=Math.hypot(ix,iy);
  if(mlen>1){ ix/=mlen; iy/=mlen; }          // Diagonale nicht schneller; Joystick bleibt analog
  const pspeed=CONFIG.playerBaseSpeed*(1+bonuses.speed)*(moveBoostUntil>Date.now()?1.25:1)*figur().tempo;
  player.x += ix*pspeed*dt/1000;
  player.y += iy*pspeed*dt/1000;
  // Lebensregeneration (schwächer auf höheren Schwierigkeiten) + Meta-Upgrade
  // Sprung ab Stufe 4 beim Lebensregen: heilt nicht mehr nur pro Kill, sondern laufend
  const regenAbil = (hatSprung('lebensregen')? 1.6 : 0) + (bonuses.regen||0);
  if(player.hp<player.maxHp) player.hp = Math.min(player.maxHp, player.hp + (curDiff().regen + regenAbil)*dt/1000);
  // Lauf-Animation: Bobbing + dezenter Partikel-Trail
  const moving = mlen>0.01;
  player.bobPhase = moving ? (player.bobPhase||0)+dt*0.014 : 0;
  if(moving){
    player.trailT=(player.trailT||0)-dt;
    if(player.trailT<=0){ player.trailT=75; particles.push({x:player.x-ix*24, y:player.y-iy*24, vx:(Math.random()-0.5)*40, vy:(Math.random()-0.5)*40, life:0.3, max:0.4, color:'rgba(110,200,255,0.5)', size:2}); }
  }
  // Plasmaklinge rotiert permanent um den Spieler
  const fehlendesLeben=1-player.hp/player.maxHp;
  const leerenTempo=figur().id==='konstrukt' ? 1+fehlendesLeben*0.28 : 1;
  swordAngle += CONFIG.swordSpinSpeed * (1 + bonuses.fireRate*0.6) * leerenTempo * (leerenmodusAktiv()?1.38:1) * dt/1000;
  if(swordAngle>Math.PI*2) swordAngle-=Math.PI*2;
  player.face = swordAngle;
  // Effekt-Timer
  if(stossWaveT>0){ stossWaveT -= dt/380; if(stossWaveT<0) stossWaveT=0; }
  if(wirbelT>0){ wirbelT -= dt/420; if(wirbelT<0) wirbelT=0; }
  // Schwert-Treffer: Rundum-Grundschaden + Bonus dort, wo die Klinge wirklich ist
  spinHitTimer -= dt;
  if(spinHitTimer<=0){
    spinHitTimer = CONFIG.spinHitInterval;
    const bladeLen = bladeLength();
    const boost = dmgBoostUntil>Date.now()?2:1;
    const dmgBase = Math.round(CONFIG.spinDamage * (1+bonuses.dmg) * boost);
    const duellBonus=(figur().id==='held' && moving ? (0.22+(treeFlags.duellantBonus||0)) : 0);
    const leerenBonus=figur().id==='konstrukt' ? fehlendesLeben*(0.32+(treeFlags.leerenRisikoBonus||0))+(leerenmodusAktiv()?0.32:0) : 0;
    const dmgArc  = Math.round((CONFIG.spinDamage+CONFIG.spinArcBonus) * (1+bonuses.dmg) * boost * (1+(treeFlags.sweetBonus||0)+duellBonus+leerenBonus));
    for(const en of enemies){
      const dx=en.x-player.x, dy=en.y-player.y;
      const d = Math.hypot(dx,dy);
      // Die Klinge wird ab dem Spielerrand gezeichnet (player.radius..player.radius+bladeLen).
      // Der Spieler-Radius muss deshalb mitgerechnet werden — sonst blieben die äußeren
      // 18 px der sichtbaren Klinge wirkungslos.
      if(d >= player.radius + bladeLen + en.radius) continue;
      // Trifft eine der Klingen den Gegner gerade wirklich?
      const toEnemy = Math.atan2(dy,dx);
      const treffer = bladeAngles().some(a=>angleDiff(a,toEnemy) < sweetArcHalf());
      let dmg = treffer ? dmgArc : dmgBase;
      /* Panzergegner: außerhalb der Zone prallt die Klinge weitgehend ab. Sie holen die
         Kernmechanik spät im Lauf zurück, wo sie sonst verschwindet. Bewusst NICHT
         unverwundbar — auf „Entdecker" kommen 55 % durch, sonst wäre es für ein Kind
         eine Wand statt einer Aufgabe. Aktive Mächte gehen ohnehin durch die Panzerung:
         Die Antwort auf einen Panzer ist entweder Position oder ein Einsatz. */
      // Schneide: belohnt genau das Treffen der Zone, statt Schaden pauschal zu heben
      if(treffer && runAbilities.schneide){
        dmg = Math.round(dmg * (1 + CONFIG.schneide.proStufe*runAbilities.schneide));
      }
      // Panzerung greift nicht mehr, sobald Schneide ihren Sprung erreicht hat
      const durchschlag = treeFlags.panzerbrecher || runAbilities.schneide>=SPRUNG_STUFE;
      const abgeprallt = en.panzer && !treffer && !durchschlag;
      if(abgeprallt) dmg = Math.max(1, Math.round(dmg*hilfe().panzerDurchlass));
      en.hp -= dmg;
      if(treffer){
        fokusTreffer();
        if(treeFlags.strahlenreiter) signaturCd=Math.max(0,signaturCd-90);
        if(treeFlags.klingentakt){
          treeFlags.klingentaktHits=(treeFlags.klingentaktHits||0)+1;
          if(treeFlags.klingentaktHits%3===0){ en.hp-=Math.round(dmg*.55); pushFloat(en.x,en.y-28,'TAKT','#ffd257'); if(treeFlags.perfekterOrbit) fokusTreffer(); }
        }
        // Nachhall: jeder n-te Zonentreffer löst eine kleine Druckwelle aus
        if(runAbilities.nachhall){
          const nlv=runAbilities.nachhall;
          const alle = nlv>=SPRUNG_STUFE? 3 : CONFIG.nachhall.alle;
          if(++nachhallZaehler>=alle){
            nachhallZaehler=0;
            const nd=Math.round(CONFIG.nachhall.dmg*abilScale(nlv)*(1+bonuses.dmg));
            for(const o of enemies){
              if(Math.hypot(o.x-en.x,o.y-en.y) < CONFIG.nachhall.radius+o.radius){
                o.hp-=nd; pushFloat(o.x,o.y-14,'-'+nd,'#ffd257');
              }
            }
            particles.push({ring:true, x:en.x, y:en.y, color:'#ffd257', life:0.26, max:0.26});
            if(sfx) sfx('counter');
          }
        }
      }
      if(abgeprallt){
        spawnParticles(en.x,en.y,'#c8d4e6',3);
        pushFloat(en.x,en.y-16,'abgeprallt','#c8d4e6');
      } else if(treffer){
        // Klingentreffer laut inszenieren: das ist DER Kniff des Spiels und muss man sehen
        en.flashT=1;                                        // Gegner blitzt weiß auf
        spawnParticles(en.x,en.y,'#ffffff',10);
        spawnParticles(en.x,en.y,currentSkin().blade,8);
        sparkRing(en.x,en.y,currentSkin().blade);           // kurzer Funkenring am Treffpunkt
        shake=Math.max(shake,2.5);                           // minimaler Ruck, nur Gefühl
        pushFloat(en.x,en.y-18,dmg+'!', '#ffffff', 1.25);   // größere, weiße Trefferzahl
      } else {
        spawnParticles(en.x,en.y,'#ffec8b',3);
        pushFloat(en.x,en.y-16,'-'+dmg,'#ffec8b');
      }
      // Kettenblitz: der volle Klingentreffer springt auf den nächsten Gegner über
      if(treffer && runAbilities.kettenblitz){
        const clv=runAbilities.kettenblitz;
        const cDmg=Math.round(CONFIG.abil.chainDamage*abilScale(clv));
        const cR=CONFIG.abil.chainRange*(1+0.05*(clv-1));
        // Sprung ab Stufe 4: der Blitz sucht sich zwei Ziele statt eines
        const ziele=clv>=SPRUNG_STUFE? 2 : 1;
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
      en.x += Math.cos(ang)*(treffer?14:6);
      en.y += Math.sin(ang)*(treffer?14:6);
    }
  }
  // Splitter (kreisende Energie) aktualisieren
  if(runAbilities.splitter){
    const slv=runAbilities.splitter;
    // Sprung ab Stufe 4: ein dritter Splitter kreist mit — spürbar mehr Dauerschaden
    const anzahl=CONFIG.abil.splitterCount + (slv>=SPRUNG_STUFE? 1 : 0);
    if(shards.length!==anzahl){ shards=[]; for(let i=0;i<anzahl;i++) shards.push({ang:i/anzahl*Math.PI*2, cd:0, x:player.x, y:player.y}); }
    const SR=CONFIG.abil.splitterRadius*(1+bonuses.range*0.4);
    const sDmg=Math.round(CONFIG.abil.splitterDamage*abilScale(slv));
    for(const s of shards){
      s.ang += CONFIG.abil.splitterSpeed*dt/1000; s.cd-=dt;
      s.x=player.x+Math.cos(s.ang)*SR; s.y=player.y+Math.sin(s.ang)*SR;
      if(s.cd<=0){
        for(const en of enemies){ if(Math.hypot(en.x-s.x,en.y-s.y)<en.radius+7){ en.hp-=sDmg; spawnParticles(s.x,s.y,'#9ad0ff',2); s.cd=CONFIG.abil.splitterHitCd; break; } }
      }
    }
  } else if(shards.length){ shards.length=0; }

  // spawn
  if(wave%5!==0){
    spawnTimer+=dt;
    if(waveSpawned < waveEnemiesToSpawn && spawnTimer > CONFIG.wave.spawnInterval){
      spawnTimer=0; enemies.push(makeEnemy(randomEnemyType())); waveSpawned++;
    }
  }
  // Gegner drängen sich auseinander, statt exakt übereinander zu stapeln.
  // Über ein Raster statt jeder-gegen-jeden: bei 39 Gegnern waren das 741 Vergleiche
  // pro Bild, mit Raster sind es nur noch die aus den acht Nachbarzellen.
  separiereGegner();
  // enemies update
  const recycleDist=Math.hypot(w,h)*0.95;   // weit außer Sicht = wird neu positioniert
  for(const en of enemies){
    let dx=player.x-en.x, dy=player.y-en.y; let d=Math.hypot(dx,dy);
    // Dauerhaftes Weglaufen soll die Welle nicht einfrieren: Nachzügler rücken nach
    if(d>recycleDist){
      const a=Math.random()*Math.PI*2, sd=Math.hypot(w,h)/2+40;
      en.x=player.x+Math.cos(a)*sd; en.y=player.y+Math.sin(a)*sd;
      dx=player.x-en.x; dy=player.y-en.y; d=Math.hypot(dx,dy);
    }
    // Distanz-Gegner halten Reichweite, zündende Exploder bleiben stehen; Stun (Nova) friert ein
    const keepRange = en.type==='jaeger' && d<en.shootRange;
    if(d>1 && !keepRange && !en.exploding && !(en.stunT>0) && !(en.type==='boss' && en.ramT>0)){
      const langsam=en.slowT>0?.55:1; en.x+=dx/d*en.speed*langsam*dt/1000;en.y+=dy/d*en.speed*langsam*dt/1000;
    }
    // attack if close
    if(!en.exploding && !(en.stunT>0) && d < en.radius + player.radius + 4){
      if(en.hitCd<=0){
        if(hurtPlayer(en.dmg)) return;
        en.hitCd=700;
      }
    }
    if(en.hitCd>0) en.hitCd-=dt;
    if(en.flashT>0){ en.flashT-=dt/120; if(en.flashT<0) en.flashT=0; }   // Aufblitzen nach Klingentreffer
    if(en.stunT>0) en.stunT-=dt;
    if(en.slowT>0) en.slowT-=dt;
    // Jäger (Distanz-Angreifer): lädt sichtbar auf und feuert ein Projektil
    if(en.type==='jaeger'){
      en.shootCd=(en.shootCd||0)-dt;
      if(d<en.shootRange && en.shootCd<=0 && !(en.stunT>0)){
        en.chargeT=(en.chargeT||0)+dt;
        if(en.chargeT>=CONFIG.jaeger.chargeMs){
          en.chargeT=0; en.shootCd=CONFIG.jaeger.cooldown;
          const nx=dx/d, ny=dy/d;
          shots.push({x:en.x+nx*en.radius, y:en.y+ny*en.radius, vx:nx*CONFIG.shots.speed, vy:ny*CONFIG.shots.speed,
            dmg:en.dmg, color:en.color, r:CONFIG.shots.radius, life:CONFIG.shots.life});
          if(sfx) sfx('shoot');
        }
      } else { en.chargeT=0; }
    }
    // Boss: Fähigkeiten mit Vorwarnung – je später die Welle, desto mehr; „Schüler" sieht die heftigen später
    if(en.type==='boss'){
      if(en.stunT>0){ en.stunT-=dt; en.warnT=0; en.shockFx=0; }   // Nova-Stun unterbricht jede Boss-Aktion
      else {
      if(en.ramT>0){                                             // Ramme: geradliniger Sprint mit Trefferschaden
        en.ramT-=dt;
        en.x+=Math.cos(en.ramDir)*CONFIG.boss.ramSpeed*dt/1000;
        en.y+=Math.sin(en.ramDir)*CONFIG.boss.ramSpeed*dt/1000;
        const rd=Math.hypot(player.x-en.x,player.y-en.y);
        if(rd<en.radius+player.radius+6){ if(hurtPlayer(Math.round(en.dmg*0.8))) return; en.ramT=0; }
        if(en.ramT<=0){ en.bossPhase='cooldown'; en.bossTimer=0; }
      }
      en.bossTimer=(en.bossTimer||0)+dt;
      if(en.bossPhase==='ram'){
        // Bewegung übernimmt der ramT-Block oben
      } else if(en.bossPhase==='warn'){
        if(en.ability==='ram') en.ramDir=Math.atan2(player.y-en.y, player.x-en.x);   // Band zeigt stets auf dich
        const bw=CONFIG.boss.warn*curDiff().bossWarn;
        en.warnT=Math.min(1, en.bossTimer/bw);
        if(en.bossTimer>=bw){ en.bossPhase='fire'; en.bossTimer=0; en.warnT=0; }
      } else if(en.bossPhase==='fire'){
        if(fireBossAbility(en)) return;
        en.bossPhase = en.ability==='ram' ? 'ram' : 'cooldown';
        en.bossTimer=0;
        if(en.ability!=='ram') en.bossNext='';
      } else if(en.bossPhase==='cooldown'){
        en.warnT=0;
        const bcd=CONFIG.boss.cooldown*curDiff().bossCd;
        if(en.bossTimer>=bcd){ en.bossNext=''; en.bossPhase=''; en.bossTimer=0; }
      } else {                                                    // neuer Zyklus beginnt
        en.bossNext = en.bossNext || pickBossAbility(wave, en.leit);
        en.ability = en.bossNext;
        en.bossPhase='warn'; en.bossTimer=0;
      }
      if(en.shockFx>0) en.shockFx-=dt/350;
      }
    }
  }
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
  // Phaser (passiv): schießt automatisch auf den nächsten Gegner in Reichweite
  if(runAbilities.phaser){
    const lv=runAbilities.phaser;
    phaserCd-=dt;
    const pr=CONFIG.phaser.range*(1+0.04*(lv-1));
    if(phaserCd<=0){
      let best=null, bd=pr;
      for(const en of enemies){ const pd=Math.hypot(en.x-player.x,en.y-player.y); if(pd<bd){ bd=pd; best=en; } }
      if(best){
        const dir=Math.atan2(best.y-player.y, best.x-player.x);
        const pdmg=Math.round(CONFIG.phaser.dmg*abilScale(lv)*(1+bonuses.dmg));
        // Sprung ab Stufe 4: Doppelschuss mit leichtem Fächer statt eines Geschosses
        const winkel = lv>=SPRUNG_STUFE? [dir-0.09, dir+0.09] : [dir];
        for(const a of winkel){
          pShots.push({x:player.x+Math.cos(a)*20, y:player.y+Math.sin(a)*20,
            vx:Math.cos(a)*420, vy:Math.sin(a)*420, dmg:pdmg, life:1.2});
        }
        phaserCd=CONFIG.phaser.rate;
        if(sfx) sfx('shoot');
      }
    }
  }
  // Begleiter: umkreist den Spieler, zieht Beute an und schießt — beides zugleich
  for(const hf of helfer){
    const W=begleiterWerte(hf.stufe);
    hf.ang += 1.3 * dt/1000;
    hf.x = player.x + Math.cos(hf.ang)*hf.r;
    hf.y = player.y + Math.sin(hf.ang)*hf.r;
    // zieht Fragmente und Kugeln in seiner Nähe zum Spieler
    const zieh=(liste)=>{ for(const o of liste){
      const d=Math.hypot(o.x-hf.x,o.y-hf.y);
      if(d<W.sammel){ o.x+=(player.x-o.x)*3.2*dt/1000; o.y+=(player.y-o.y)*3.2*dt/1000; }
    }};
    zieh(stars); zieh(orbs);
    hf.cd-=dt;
    if(hf.cd<=0){
      let best=null, bd=W.reichweite;
      for(const en of enemies){ const pd=Math.hypot(en.x-hf.x,en.y-hf.y); if(pd<bd){ bd=pd; best=en; } }
      if(best){
        const dir=Math.atan2(best.y-hf.y, best.x-hf.x);
        pShots.push({x:hf.x, y:hf.y, vx:Math.cos(dir)*400, vy:Math.sin(dir)*400,
          dmg:W.dmg, life:1.1});
        hf.cd=CONFIG.helfer.rate;
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
      if(Math.hypot(en.x-s.x,en.y-s.y)<en.radius+5){
        en.hp-=s.dmg; spawnParticles(s.x,s.y,'#9ad0ff',5); pushFloat(s.x,s.y-12,'-'+s.dmg,'#9ad0ff');
        hit=true; break;
      }
    }
    if(hit) pShots.splice(i,1);
  }
  // Bomben: Ticken, dann verzögerte Explosion mit Schub
  for(let i=bombs.length-1;i>=0;i--){
    const b=bombs[i]; b.t-=dt;
    if(b.t<=0){
      for(const en of enemies){
        const bd=Math.hypot(en.x-b.x,en.y-b.y);
        if(bd<b.r+en.radius){
          en.hp-=b.dmg;
          const ba=bd>0.001? Math.atan2(en.y-b.y,en.x-b.x) : Math.random()*Math.PI*2;
          en.x+=Math.cos(ba)*40; en.y+=Math.sin(ba)*40;
          spawnParticles(en.x,en.y,en.color,4); pushFloat(en.x,en.y-16,'-'+b.dmg,'#ff9a5a');
        }
      }
      spawnParticles(b.x,b.y,'#ff7a5a',26); spawnParticles(b.x,b.y,'#ffd257',14);
      shake=Math.max(shake,8); if(sfx) sfx('boom');
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
  checkLevelUp();
  // Fragmente einsammeln — wandern direkt aufs Werkstatt-Konto
  for(let i=stars.length-1;i>=0;i--){
    const c=stars[i];
    const d=Math.hypot(c.x-player.x,c.y-player.y);
    if(d<28){ player.stars+=c.amount; zielStand('fragmente', player.stars); pushFloat(c.x,c.y-10,'+'+c.amount+'◆','#ffd257'); if(sfx) sfx('coin'); stars.splice(i,1); continue; }
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
          const vorher=barriere;
          barriere=Math.min(barriereMax(), barriere+player.maxHp*CONFIG.barriere.proKugel*figur().barriereMal);
          if(barriere>=barriereMax()-0.01) zielZaehl('barriere');
          const zuwachs=Math.round(barriere-vorher);
          if(zuwachs>0){ pushFloat(o.x,o.y-10,'+'+zuwachs+' Barriere','#7cc8ff'); if(sfx) sfx('unlock'); }
          else { pushFloat(o.x,o.y-10,'Barriere voll','#7cc8ff'); }
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
    if(!p.sword && !p.bolt && !p.ring){ p.x+=p.vx*dt/1000; p.y+=p.vy*dt/1000; p.vy+= 300*dt/1000; }
  }
  for(let i=floats.length-1;i>=0;i--){ const f=floats[i]; f.life-=dt/1000; f.y+=f.vy*dt/1000; if(f.life<=0) floats.splice(i,1); }
  // Ansage & Hinweise altern lassen
  tutorialTick(dt);
  if(unlockFx>0){ unlockFx-=dt/900; if(unlockFx<0) unlockFx=0; }
  if(banner){ banner.life-=dt/1000; if(banner.life<=0) banner=null; }
  for(let i=toasts.length-1;i>=0;i--){ toasts[i].life-=dt/1000; if(toasts[i].life<=0) toasts.splice(i,1); }

  // wave clear check — der Shop zwischen den Wellen ist entfallen (#11):
  // Heilung/Stärke gibt es nur noch im Lauf (Regen, Fähigkeiten) und dauerhaft im Meta-Shop.
  if(waveSpawned>=waveEnemiesToSpawn && enemies.length===0 && state==='playing'){
    einsammelnAmWellenende();
    wave++; startWave();
  }
  if(shake>0) shake-= dt*0.04;
  updateHUD();
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

/* Bildschirmgroße Gradienten einmal bauen statt 60× pro Sekunde.
   Sie hängen nur von Größe und Biome ab. */
let glowCache=null, glowKey='', vigCache=null, vigKey='';
function holeGlow(w,h,biome){
  const key=w+'x'+h+'|'+biome.glow;
  if(key!==glowKey){
    const g=ctx.createRadialGradient(w/2,h/2,0,w/2,h/2,Math.max(w,h)*0.7);
    g.addColorStop(0,'rgba('+biome.glow+',0.38)');
    g.addColorStop(0.5,'rgba('+biome.glow+',0.15)');
    g.addColorStop(1,'rgba(5,7,13,0)');
    glowCache=g; glowKey=key;
  }
  return glowCache;
}
function holeVignette(w,h){
  const key=w+'x'+h;
  if(key!==vigKey){
    const g=ctx.createRadialGradient(w/2,h/2,Math.min(w,h)*0.45,w/2,h/2,Math.max(w,h)*0.9);
    g.addColorStop(0,'rgba(0,0,0,0)'); g.addColorStop(1,'rgba(0,0,0,0.42)');
    vigCache=g; vigKey=key;
  }
  return vigCache;
}
// Wird einmal pro Bild gesetzt: viele Gegner ODER schwaches Gerät -> Leuchten aus
function bestimmeEffektstufe(){
  fxAn = enemies.length <= CONFIG.fxGegnerGrenze && !sparmodus;
}
let fpsProbe=[], fpsLetzte=0;
function messeBildrate(t){
  if(fpsLetzte){ fpsProbe.push(t-fpsLetzte); if(fpsProbe.length>90) fpsProbe.shift(); }
  fpsLetzte=t;
  if(fpsProbe.length===90){
    const schnitt=fpsProbe.reduce((a,b)=>a+b,0)/90;
    if(schnitt>26 && !sparmodus){ sparmodus=true; resize(); }      // unter ~38 fps: dauerhaft sparen
    else if(schnitt<19 && sparmodus){ sparmodus=false; resize(); } // wieder flüssig: Effekte zurück
    fpsProbe=[];
  }
}
// Sichtprüfung vor teuren Canvas-Operationen. Die Simulation bleibt bewusst global,
// nur das Zeichnen unsichtbarer Gegner, Beute und Partikel entfällt.
function sichtbar(x,y,rand=0){
  const w=canvas.clientWidth||window.innerWidth, h=canvas.clientHeight||window.innerHeight;
  return x>=camX-rand && x<=camX+w+rand && y>=camY-rand && y<=camY+h+rand;
}
function zeichnePerfOverlay(w,h){
  if(!PERF_DEBUG) return;
  ctx.save();
  ctx.fillStyle='rgba(2,6,13,.80)'; ctx.fillRect(8,h-76,246,68);
  ctx.fillStyle='#bfe3ff'; ctx.font='600 11px ui-monospace,monospace'; ctx.textAlign='left';
  ctx.fillText('FPS '+perf.fps.toFixed(0)+' · '+perf.frame.toFixed(1)+' ms',16,h-56);
  ctx.fillText('Update '+perf.update.toFixed(1)+' · Draw '+perf.draw.toFixed(1)+' ms',16,h-40);
  ctx.fillText('Gegner '+enemies.length+'/'+sichtbareGegner+' · Partikel '+particles.length+' · '+renderDpr.toFixed(2)+'×',16,h-24);
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
    const col=bio.neb[n.c%bio.neb.length];
    const g=ctx.createRadialGradient(bx,by,0,bx,by,n.r);
    g.addColorStop(0,'rgba('+col[0]+','+col[1]+','+col[2]+','+n.a.toFixed(3)+')');
    g.addColorStop(0.55,'rgba('+col[0]+','+col[1]+','+col[2]+','+(n.a*0.4).toFixed(3)+')');
    g.addColorStop(1,'rgba('+col[0]+','+col[1]+','+col[2]+',0)');
    ctx.fillStyle=g; ctx.beginPath(); ctx.arc(bx,by,n.r,0,Math.PI*2); ctx.fill();
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
let gridLayer=null, gridCtx=null;
function drawFadedGrid(ctx,w,h,camX,camY,bio){
  if(typeof document==='undefined' || !document.createElement) return;
  if(!gridLayer){ gridLayer=document.createElement('canvas'); gridCtx=gridLayer.getContext&&gridLayer.getContext('2d'); }
  if(!gridCtx) return;
  if(gridLayer.width!==w || gridLayer.height!==h){ gridLayer.width=w; gridLayer.height=h; }
  const g=gridCtx;
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
  const fade=g.createRadialGradient(w/2,h/2,Math.min(w,h)*0.28,w/2,h/2,Math.min(w,h)*0.72);
  fade.addColorStop(0,'rgba(0,0,0,0)'); fade.addColorStop(1,'rgba(0,0,0,1)');
  g.fillStyle=fade; g.fillRect(0,0,w,h);
  g.restore();
  ctx.drawImage(gridLayer,0,0);
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
  ctx.clearRect(0,0,w,h);
  /* WICHTIG: Der Canvas-Zustand überlebt den Bildwechsel. Ohne diesen Reset behielt
     shadowBlur den Wert vom Ende des letzten Bildes — dadurch wurde der komplette
     Hintergrund (mehrere hundert Sterne und Deko-Punkte) weichgezeichnet. Gemessen
     waren über 600 von 750 Füll-Operationen pro Bild unnötig verwaschen, und zwar
     unabhängig von der Gegnerzahl. Das war die eigentliche Ruckel-Ursache. */
  ctx.shadowBlur=0; ctx.shadowColor='transparent';
  ctx.globalAlpha=1; ctx.globalCompositeOperation='source-over';
  bestimmeEffektstufe();
  camX = player.x - w/2; camY = player.y - h/2;   // Kamera zentriert den Spieler
  let sx=0,sy=0;
  if(shake>0){ sx=(Math.random()-0.5)*shake*2; sy=(Math.random()-0.5)*shake*2; }
  ctx.save(); ctx.translate(sx,sy);
  // — Hintergrund: Biome mit eigener Palette + Parallax-Deko; Kampfebene bleibt lesbar —
  const biome=biomeForWave();
  ctx.fillStyle=biome.bg; ctx.fillRect(0,0,w,h);
  const now=Date.now();
  ctx.fillStyle=holeGlow(w,h,biome); ctx.fillRect(0,0,w,h);
  // Tiefenebenen von hinten nach vorne
  drawNebulae(ctx,w,h,camX,camY,biome);          // weiche Farbschwaden ganz hinten
  drawStarLayers(ctx,w,h,camX,camY,biome,now);   // drei Sternenlagen, funkelnd
  drawBiomeDeko(ctx,w,h,camX,camY,biome);        // Landmarken je Biome
  /* Tech-Raster: weltfest, aber zum Rand hin ausgeblendet. Vorher lag es als
     gleichmäßiges Gitter über allem und ließ den Hintergrund flach wirken —
     jetzt wirkt es wie eine Plattform unter dem Spieler. */
  drawFadedGrid(ctx,w,h,camX,camY,biome);
  drawDust(ctx,w,h,camX,camY,biome);             // Staub ganz vorne
  ctx.fillStyle=holeVignette(w,h); ctx.fillRect(0,0,w,h);

  // — Welt-Ebene (Kamera folgt Spieler) —
  ctx.save(); ctx.translate(-camX,-camY);
  sichtbareGegner=0;
  if(wave>=CONFIG.hindernisAbWelle) drawHindernisse(ctx,w,h,camX,camY,biome);
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
  // Boss-Vorwarnung je Fähigkeit: Gefahrenring (Schockwelle/Spirale) bzw. Ramm-Band
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
      } else {
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
    ctx.shadowColor=oc; sb(14); ctx.fillStyle=oc;
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
  // enemies – futuristische Neon-Silhouetten
  for(const en of enemies){
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
    // Bodenschatten (nicht rotiert)
    ctx.fillStyle='rgba(0,0,0,0.35)'; ctx.beginPath(); ctx.ellipse(en.x, en.y+r*0.75, r*0.85, r*0.35,0,0,Math.PI*2); ctx.fill();
    ctx.save(); ctx.translate(en.x,en.y); ctx.rotate(ang);
    ctx.lineJoin='round'; ctx.shadowColor=en.color; sb(15); ctx.strokeStyle=en.color; ctx.lineWidth=2.5;
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
  // Projektile (Distanz-Gegner) – leuchtender Schweif + weißer Kern
  ctx.save(); ctx.globalCompositeOperation='lighter';
  for(const s of shots){
    if(!sichtbar(s.x,s.y,26)) continue;
    ctx.strokeStyle=s.color; ctx.shadowColor=s.color; sb(14); ctx.lineWidth=3; ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(s.x - s.vx*0.035, s.y - s.vy*0.035); ctx.lineTo(s.x, s.y); ctx.stroke();
    ctx.fillStyle='#fff'; sb(18);
    ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fill();
  }
  // eigene Projektile (Phaser) – cyan, kleiner als die gegnerischen
  for(const s of pShots){
    if(!sichtbar(s.x,s.y,22)) continue;
    ctx.strokeStyle='#9ad0ff'; ctx.shadowColor='#9ad0ff'; sb(12); ctx.lineWidth=3; ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(s.x - s.vx*0.03, s.y - s.vy*0.03); ctx.lineTo(s.x, s.y); ctx.stroke();
    ctx.fillStyle='#eaf6ff'; sb(14);
    ctx.beginPath(); ctx.arc(s.x,s.y,4,0,Math.PI*2); ctx.fill();
  }
  // Bomben: ticken – Kern wächst, Ring läuft ab (Zünd-Anzeige)
  for(const b of bombs){
    if(!sichtbar(b.x,b.y,30)) continue;
    const frac=Math.max(0, b.t/b.max);
    ctx.strokeStyle='#ff7a5a'; ctx.fillStyle='rgba(255,122,90,0.10)'; ctx.shadowColor='#ff7a5a'; sb(18);
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
  // — Spieler —
  const skin=currentSkin(), KLINGE=skin.blade, KLINGE_KERN=skin.core;
  const angles=bladeAngles();
  // Nachleuchten jeder Klinge
  ctx.save(); ctx.translate(player.x,player.y);
  for(const a of angles){
    for(let i=1;i<=5;i++){
      ctx.save(); ctx.rotate(a - i*0.16);
      ctx.globalAlpha=0.12*(1-i/6); ctx.fillStyle=KLINGE;
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
  if(leerenmodusAktiv()){
    const puls=0.58+Math.sin(now/90)*0.10;
    ctx.strokeStyle='rgba(199,125,255,'+puls.toFixed(2)+')'; ctx.lineWidth=2.5;
    ctx.shadowColor='#c77dff'; sb(18);
    ctx.beginPath(); ctx.arc(0,0,player.radius+12,0,Math.PI*2); ctx.stroke(); sb(0);
  }
  const lean = moving ? moveVec.x*7 : 0;
  // Figur — welche gezeichnet wird, kommt aus der Sammlung
  if(schwebt) zeichneKonstrukt(ctx, lean, KLINGE, KLINGE_KERN, sb);
  else zeichneHeld(ctx, moving, lean, player.bobPhase||0, KLINGE, sb);
  // Plasmaklinge(n) – rotieren permanent, Form kommt aus der Sammlung
  for(const a of angles){
    ctx.save(); ctx.rotate(a);
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
    const puls=1+0.12*Math.sin(Date.now()/220 + hf.ang);
    // Sammelaura
    ctx.strokeStyle='rgba(77,224,160,0.30)'; ctx.lineWidth=1;
    ctx.beginPath(); ctx.arc(0,0,10,0,Math.PI*2); ctx.stroke();
    // Rumpf, dreht sich in Blickrichtung
    ctx.rotate(hf.ang*1.6);
    ctx.shadowColor='#9ad0ff'; sb(12); ctx.fillStyle='#0d1a2c';
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
      ctx.shadowColor='#9ad0ff'; sb(10); ctx.fillStyle='#bfe3ff';
      ctx.beginPath(); ctx.arc(s.x,s.y,4.5,0,Math.PI*2); ctx.fill();
    }
    ctx.restore();
  }
  // particles (additiv = leuchtend)
  ctx.globalCompositeOperation='lighter';
  for(const p of particles){
    if(p.sword) continue;   // Blade-Trail wird direkt am Spieler gezeichnet
    if(p.bolt){
      if(!sichtbar(p.x,p.y,40) && !sichtbar(p.x2,p.y2,40)) continue;
    } else if(!sichtbar(p.x,p.y,50)) continue;
    ctx.globalAlpha=Math.max(0,p.life/(p.max||0.6));
    if(p.bolt){   // Kettenblitz: zackige Linie zwischen zwei Gegnern
      ctx.strokeStyle='#bfe3ff'; ctx.lineWidth=2; ctx.shadowColor='#9ad0ff'; sb(8);
      ctx.beginPath(); ctx.moveTo(p.x,p.y);
      const seg=4; for(let k=1;k<seg;k++){ const f=k/seg; ctx.lineTo(p.x+(p.x2-p.x)*f+(Math.random()-0.5)*10, p.y+(p.y2-p.y)*f+(Math.random()-0.5)*10); }
      ctx.lineTo(p.x2,p.y2); ctx.stroke(); sb(0); continue;
    }
    if(p.ring){   // Sweet-Spot-Funkenring: dehnt sich kurz auf und verblasst
      const t=1-p.life/p.max, rr=6+t*22;
      ctx.strokeStyle=p.color; ctx.lineWidth=3*(1-t)+0.5;
      ctx.shadowColor=p.color; sb(12);
      ctx.beginPath(); ctx.arc(p.x,p.y,rr,0,Math.PI*2); ctx.stroke(); sb(0); continue;
    }
    ctx.fillStyle=p.color; ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,Math.PI*2); ctx.fill();
  }
  ctx.globalCompositeOperation='source-over';
  ctx.globalAlpha=1;
  // floats
  ctx.font='800 13px system-ui'; ctx.textAlign='center';
  for(const f of floats){
    if(!sichtbar(f.x,f.y,48)) continue;
    ctx.globalAlpha=Math.max(0,f.life/0.9);
    if(f.scale && f.scale!==1) ctx.font='800 '+Math.round(13*f.scale)+'px system-ui';
    ctx.fillStyle='rgba(0,0,0,0.6)'; ctx.fillText(f.text,f.x+1,f.y+1);
    ctx.fillStyle=f.color; ctx.fillText(f.text,f.x,f.y);
    if(f.scale && f.scale!==1) ctx.font='800 13px system-ui';
  }
  ctx.globalAlpha=1;
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
      const sx2=dx-0, sy2=dy-0;
      // sichtbar? (mit etwas Rand, damit Pfeile nicht direkt am Bildrand aufpoppen)
      if(Math.abs(sx2)<w/2-30 && Math.abs(sy2)<h/2-30) continue;
      const ang=Math.atan2(dy,dx);
      const dist=Math.hypot(dx,dy);
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
  zeichnePerfOverlay(w,h);
}

function loop(t){
  raf=requestAnimationFrame(loop);
  if(!lastTime) lastTime=t;
  const dt=Math.min(50, t-lastTime); lastTime=t;
  messeBildrate(t);            // erkennt schwache Geräte und spart dauerhaft Effekte
  const updateStart=performance.now();
  if(state==='playing') update(dt);
  perf.update=performance.now()-updateStart;
  const drawStart=performance.now();
  draw();
  perf.draw=performance.now()-drawStart;
  perf.frame=dt; perf.fps=dt>0?1000/dt:60;
}
loop(performance.now());

// prevent context menu / selection
document.addEventListener('contextmenu',e=>e.preventDefault());
document.addEventListener('selectstart',e=>e.preventDefault());
