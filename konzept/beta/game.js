(() => {
  'use strict';

  const canvas = document.getElementById('arena');
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const FIELD = { l: 54, r: 906, t: 82, b: 515 };
  const TAU = Math.PI * 2;
  const $ = id => document.getElementById(id);
  const screens = { start: $('start'), choice: $('choice'), pause: $('pause-screen'), end: $('end-screen') };
  const input = { keys: new Set(), dir: { x: 0, y: 0 }, pointerId: null, touchOrigin: null };
  const world = {
    scene: 'start', encounter: 0, time: 0, now: 0, paused: false,
    player: { x: 480, y: 330, r: 16, hp: 100, maxHp: 100, hitCooldown: 0, lastDir: { x: 0, y: -1 } },
    blade: { state: 'home', x: 480, y: 330, start: null, end: null, target: null, t: 0, hitAny: false },
    shield: true, powers: ['sog'], selectedStart: 'sog',
    enemies: [], bullets: [], warnings: [], sparks: [], embers: [], salvo: [],
    park: null, completed: 0, kills: 0, replacement: false, toast: '', toastTime: 0,
    encounterStarts: [
      { title: 'Ankunft', hint: 'Führe die Klinge durch die nahen Verfolger.', desc: 'Drei Verfolger zeigen dir die gerade Rückfluglinie.' },
      { title: 'Gegenprobe', hint: 'Die Warnung des Schützen kommt vor dem Schuss.', desc: 'Schildträger öffnen ihre Rückseite nach dem Angriff.' },
      { title: 'Lichtbrecher', hint: 'Bodenwarnung! Warte das offene Kernfenster ab.', desc: 'Der Endgegner verschiebt seine Schilde in der zweiten Phase.' }
    ]
  };

  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function dist(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }
  function norm(x, y) { const n = Math.hypot(x, y) || 1; return { x: x / n, y: y / n }; }
  function lerp(a, b, t) { return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t }; }
  function randomAround(p, radius) { const a = Math.random() * TAU; return { x: p.x + Math.cos(a) * radius, y: p.y + Math.sin(a) * radius }; }
  function hasPower(id) { return state.powers.includes(id); }
  const state = world;
  const qaMode = new URLSearchParams(location.search).get('qa') === '1';

  function installQaPanel() {
    if (!qaMode) return;
    const panel = document.createElement('aside');
    panel.id = 'qa-panel'; panel.innerHTML = '<b>QA-Prüffassung</b><button id="qa-win">Begegnung abschließen</button><span id="qa-readout">bereit</span>';
    panel.style.cssText = 'position:absolute;z-index:20;top:10px;left:10px;display:grid;gap:4px;padding:8px;border:1px solid #f7b6ff;border-radius:8px;background:#120f28e8;color:#f7ddff;font:11px system-ui';
    panel.querySelector('button').style.cssText = 'padding:5px;border:1px solid #f7b6ff;border-radius:5px;background:#352052;color:#fff';
    document.getElementById('app').append(panel);
    panel.querySelector('#qa-win').addEventListener('click', () => { if (state.scene === 'fight') { state.enemies.forEach(e => { e.dead = true; }); panel.querySelector('#qa-readout').textContent = `Begegnung ${state.encounter + 1} markiert`; } });
  }

  function showScreen(name) {
    Object.entries(screens).forEach(([key, el]) => el.classList.toggle('hidden', key !== name));
    const combat = name === null;
    $('hud').classList.toggle('hidden', !combat);
    $('status-row').classList.toggle('hidden', !combat);
    $('touch-pad').classList.toggle('hidden', !combat);
    $('power-btn').classList.toggle('hidden', !combat);
    $('touch-help').classList.toggle('hidden', !combat);
  }

  function resetRun() {
    input.keys.clear(); input.dir = { x: 0, y: 0 }; input.pointerId = null; input.touchOrigin = null;
    state.scene = 'fight'; state.paused = false; state.encounter = 0; state.time = 0; state.completed = 0; state.kills = 0;
    state.player = { x: 480, y: 330, r: 16, hp: 100, maxHp: 100, hitCooldown: 0, lastDir: { x: 0, y: -1 } };
    state.shield = true; state.powers = [state.selectedStart]; state.enemies = []; state.bullets = []; state.warnings = [];
    state.sparks = []; state.embers = []; state.salvo = []; state.park = null; state.replacement = false;
    state.blade = { state: 'home', x: 480, y: 330, start: null, end: null, target: null, t: 0, hitAny: false };
    startEncounter(0); showScreen(null); updateHud();
  }

  function startEncounter(index) {
    state.encounter = index; state.time = 0; state.enemies = []; state.bullets = []; state.warnings = []; state.embers = []; state.salvo = [];
    state.park = null; state.blade = { state: 'home', x: state.player.x, y: state.player.y, start: null, end: null, target: null, t: 0, hitAny: false };
    // Die erste Begegnung lässt Raum zum Lesen; das ist Lernzeit, keine versteckte Hilfe.
    state.introGrace = index === 0 ? 12 : 0;
    if (index === 0) {
      [[220, 165], [740, 175], [700, 420]].forEach(([x, y]) => addEnemy('chaser', x, y, 48));
    } else if (index === 1) {
      [[190, 160], [740, 430], [710, 180]].forEach(([x, y]) => addEnemy('chaser', x, y, 58));
      addEnemy('shooter', 200, 430, 78); addEnemy('shield', 755, 315, 115);
    } else {
      addEnemy('boss', 735, 295, 360); addEnemy('shooter', 210, 170, 100); addEnemy('shield', 215, 420, 130);
    }
    state.toast = state.encounterStarts[index].desc; state.toastTime = 4;
    $('encounter-label').textContent = state.encounterStarts[index].title;
    $('hint-label').textContent = state.encounterStarts[index].hint;
  }

  function addEnemy(type, x, y, hp) {
    state.enemies.push({ type, x, y, hp, maxHp: hp, r: type === 'boss' ? 48 : type === 'shield' ? 24 : 18,
      hitCooldown: 0, contactCooldown: 0, fireTimer: 1 + Math.random() * .8, openTimer: type === 'shield' ? 1.2 : 0,
      phase: 1, flash: 0, dead: false });
  }

  function action() {
    if (state.scene !== 'fight' || state.paused) return;
    if (state.blade.state === 'home') throwBlade(); else recallBlade();
  }

  function throwBlade() {
    const p = state.player, d = p.lastDir;
    const reach = state.encounter === 2 ? 290 : 255;
    const end = { x: clamp(p.x + d.x * reach, FIELD.l + 20, FIELD.r - 20), y: clamp(p.y + d.y * reach, FIELD.t + 20, FIELD.b - 20) };
    state.blade = { state: 'outbound', x: p.x, y: p.y, start: { x: p.x, y: p.y }, end, target: null, t: 0, hitAny: false };
    burst(p.x, p.y, '#9cecff', 9);
    toast('Klinge fliegt — tippe erneut für Rückruf', 2.1);
  }

  function recallBlade() {
    const b = state.blade;
    if (b.state === 'return') return;
    b.state = 'return'; b.start = { x: b.x, y: b.y }; b.target = { x: state.player.x, y: state.player.y }; b.t = 0; b.hitAny = false;
    if (state.park && state.park.still) state.park.still = false;
    if (hasPower('spiegelstern')) launchMirrorSalvo();
    toast('Gerade Linie fixiert — weich der Linie aus', 1.8);
  }

  function update(dt) {
    state.now += dt; state.time += dt;
    state.player.hitCooldown = Math.max(0, state.player.hitCooldown - dt);
    const d = getMoveDirection();
    if (d.x || d.y) { state.player.lastDir = d; state.player.x += d.x * 190 * dt; state.player.y += d.y * 190 * dt; }
    state.player.x = clamp(state.player.x, FIELD.l + 18, FIELD.r - 18); state.player.y = clamp(state.player.y, FIELD.t + 18, FIELD.b - 18);
    if (hasPower('glutspur') && (d.x || d.y) && state.time % .13 < dt) {
      state.embers.push({ x: state.player.x - d.x * 12, y: state.player.y - d.y * 12, ttl: 2.2, max: 2.2 });
    }
    updateBlade(dt); updatePowers(dt); updateEnemies(dt); updateBullets(dt); updateWarnings(dt); updateSalvo(dt); updateFx(dt);
    if (state.encounter === 2 && state.time > 3 && Math.floor(state.time) % 5 === 0 && state.time % 5 < dt) makeWarning();
    if (state.enemies.length && state.enemies.every(e => e.dead)) completeEncounter();
    updateHud();
  }

  function getMoveDirection() {
    let x = input.dir.x, y = input.dir.y;
    if (!x && !y) {
      if (input.keys.has('a') || input.keys.has('arrowleft')) x -= 1;
      if (input.keys.has('d') || input.keys.has('arrowright')) x += 1;
      if (input.keys.has('w') || input.keys.has('arrowup')) y -= 1;
      if (input.keys.has('s') || input.keys.has('arrowdown')) y += 1;
    }
    return (x || y) ? norm(x, y) : { x: 0, y: 0 };
  }

  function updateBlade(dt) {
    const b = state.blade;
    if (b.state === 'outbound') {
      const prev = { x: b.x, y: b.y }; b.t = Math.min(1, b.t + dt / .42); const next = lerp(b.start, b.end, b.t); b.x = next.x; b.y = next.y;
      damageBladeSegment(prev, next, false);
      if (b.t >= 1) { b.state = 'parked'; state.park = { x: b.x, y: b.y, ttl: 4.8, still: false, captured: [] }; parkPowers(); }
    } else if (b.state === 'return') {
      const prev = { x: b.x, y: b.y }; b.t = Math.min(1, b.t + dt / .56); const next = lerp(b.start, b.target, b.t); b.x = next.x; b.y = next.y;
      damageBladeSegment(prev, next, true);
      if (b.t >= 1) { b.state = 'home'; b.x = state.player.x; b.y = state.player.y; state.park = null; burst(b.x, b.y, '#fff0a4', 13); }
    } else if (b.state === 'parked') {
      if (state.park) state.park.ttl -= dt;
      if (state.park && state.park.ttl <= 0) recallBlade();
    } else { b.x = state.player.x; b.y = state.player.y; }
  }

  function damageBladeSegment(a, b, returning) {
    for (const enemy of state.enemies) {
      if (enemy.dead || enemy.hitCooldown > 0 || !segmentCircle(a, b, enemy, enemy.r + 7)) continue;
      if ((enemy.type === 'shield' || enemy.type === 'boss') && !enemyIsOpen(enemy)) { burst(enemy.x, enemy.y, '#778bb8', 3); continue; }
      enemy.hitCooldown = .28; enemy.flash = .12; enemy.hp -= returning ? 34 : 27; burst(enemy.x, enemy.y, returning ? '#fff0a4' : '#82dcff', returning ? 8 : 5);
      if (returning) { state.blade.hitAny = true; state.shield = true; toast('Rückflugtreffer: Schutz erneuert', 1.4); }
      if (enemy.hp <= 0) { enemy.dead = true; state.kills++; burst(enemy.x, enemy.y, '#ffd166', 17); }
    }
  }

  function segmentCircle(a, b, c, radius) {
    const vx = b.x - a.x, vy = b.y - a.y, wx = c.x - a.x, wy = c.y - a.y;
    const len = vx * vx + vy * vy; const t = len ? clamp((wx * vx + wy * vy) / len, 0, 1) : 0;
    const dx = a.x + vx * t - c.x, dy = a.y + vy * t - c.y; return dx * dx + dy * dy <= radius * radius;
  }

  function enemyIsOpen(e) { return e.type === 'boss' ? e.openTimer > 0 || e.phase === 2 : e.openTimer > 0; }

  function parkPowers() {
    const p = state.park;
    p.field = hasPower('fangschirm') || hasPower('spiegelstern'); p.fieldR = hasPower('spiegelstern') ? 82 : 68;
    p.still = hasPower('standbild') || hasPower('spiegelstern');
    if (p.still) p.stillTime = 1.65;
    if (hasPower('sog')) for (const e of state.enemies) if (!e.dead && dist(e, p) < 190 && e.type !== 'boss') { const d = norm(p.x - e.x, p.y - e.y); e.x += d.x * 28; e.y += d.y * 28; }
    burst(p.x, p.y, hasPower('spiegelstern') ? '#f7b6ff' : '#a984ff', 14);
  }

  function updatePowers(dt) {
    if (state.park && state.park.still) state.park.stillTime -= dt;
    for (const ember of state.embers) {
      ember.ttl -= dt;
      for (const e of state.enemies) if (!e.dead && dist(ember, e) < e.r + 17 && e.hitCooldown <= 0) { e.hp -= hasPower('glutspur') ? 9 : 0; e.hitCooldown = .32; if (e.hp <= 0) { e.dead = true; state.kills++; } }
    }
    state.embers = state.embers.filter(e => e.ttl > 0);
  }

  function updateEnemies(dt) {
    for (const e of state.enemies) {
      if (e.dead) continue;
      e.hitCooldown = Math.max(0, e.hitCooldown - dt); e.contactCooldown = Math.max(0, e.contactCooldown - dt); e.flash = Math.max(0, e.flash - dt);
      if (e.type === 'shield' || e.type === 'boss') e.openTimer = Math.max(0, e.openTimer - dt);
      const frozen = state.park && state.park.still && state.park.stillTime > 0 && dist(e, state.park) < (hasPower('spiegelstern') ? 105 : 84);
      if (frozen) continue;
      if (e.type === 'chaser') moveEnemy(e, state.player, (state.encounter === 0 ? 28 : 47) * dt);
      if (e.type === 'shooter') { if (dist(e, state.player) < 210) moveEnemy(e, { x: 790, y: e.y }, 25 * dt); else moveEnemy(e, state.player, 13 * dt); e.fireTimer -= dt; if (e.fireTimer <= 0) { shoot(e); e.fireTimer = 2.05; } }
      if (e.type === 'shield') { moveEnemy(e, state.player, 20 * dt); e.fireTimer -= dt; if (e.fireTimer <= 0) { e.openTimer = 1.35; e.fireTimer = 4.2; burst(e.x, e.y, '#ffd166', 7); } }
      if (e.type === 'boss') updateBoss(e, dt);
      if (dist(e, state.player) < e.r + state.player.r && e.contactCooldown <= 0) { e.contactCooldown = .7; hurtPlayer(13, 'Körpertreffer', true); }
    }
  }

  function updateBoss(e, dt) {
    e.phase = e.hp < e.maxHp * .52 ? 2 : 1;
    const orbit = { x: 700 + Math.cos(state.time * .45) * 115, y: 300 + Math.sin(state.time * .45) * 130 };
    moveEnemy(e, orbit, 28 * dt); e.fireTimer -= dt;
    if (e.fireTimer <= 0) { e.openTimer = e.phase === 2 ? 1.05 : .82; shoot(e); e.fireTimer = e.phase === 2 ? 1.45 : 2.25; }
  }

  function moveEnemy(e, target, amount) { const d = norm(target.x - e.x, target.y - e.y); e.x += d.x * amount; e.y += d.y * amount; e.x = clamp(e.x, FIELD.l + e.r, FIELD.r - e.r); e.y = clamp(e.y, FIELD.t + e.r, FIELD.b - e.r); }

  function shoot(e) {
    const d = norm(state.player.x - e.x, state.player.y - e.y); state.bullets.push({ x: e.x, y: e.y, vx: d.x * 142, vy: d.y * 142, r: 7, ttl: 4, from: e.type }); burst(e.x, e.y, '#ff8da7', 5);
  }

  function updateBullets(dt) {
    for (const bullet of state.bullets) {
      const prev = { x: bullet.x, y: bullet.y }; bullet.x += bullet.vx * dt; bullet.y += bullet.vy * dt; bullet.ttl -= dt;
      if (state.park && state.park.field && dist(bullet, state.park) < state.park.fieldR) {
        const capacity = hasPower('spiegelstern') ? 5 : 4;
        if (state.park.captured.length < capacity) { state.park.captured.push({ x: bullet.x, y: bullet.y }); burst(bullet.x, bullet.y, hasPower('spiegelstern') ? '#f7b6ff' : '#7de4ff', 7); bullet.ttl = -1; }
      }
      if (bullet.ttl <= 0 || bullet.x < -30 || bullet.x > W + 30 || bullet.y < -30 || bullet.y > H + 30) continue;
      if (dist(bullet, state.player) < bullet.r + state.player.r) { if (state.blade.state === 'home' && state.shield) { state.shield = false; bullet.ttl = -1; toast('Schutzladung fängt den Schuss', 1.5); burst(bullet.x, bullet.y, '#a4f0ff', 9); } else { hurtPlayer(11, 'Geschoss'); bullet.ttl = -1; } }
    }
    state.bullets = state.bullets.filter(b => b.ttl > 0);
  }

  function makeWarning() {
    const target = randomAround(state.player, 100); target.x = clamp(target.x, FIELD.l + 45, FIELD.r - 45); target.y = clamp(target.y, FIELD.t + 45, FIELD.b - 45);
    state.warnings.push({ x: target.x, y: target.y, r: 48, ttl: 1.15, max: 1.15 });
  }

  function updateWarnings(dt) {
    for (const w of state.warnings) { w.ttl -= dt; if (w.ttl <= 0 && dist(w, state.player) < w.r - 7) hurtPlayer(22, 'Bodenwarnung'); }
    state.warnings = state.warnings.filter(w => w.ttl > -.05);
  }

  function launchMirrorSalvo() {
    if (!state.park || !state.park.captured.length) return;
    const target = { x: state.park.x, y: state.park.y }; state.salvo = state.park.captured.map((from, i) => ({ from, target, t: i * .12, live: true })); state.park.captured = [];
    toast('Spiegelstern: gefangene Schüsse zum Fangpunkt', 2.5);
  }

  function updateSalvo(dt) {
    for (const shot of state.salvo) {
      if (!shot.live) continue; if (shot.t < 0) { shot.t += dt; continue; } shot.t += dt / .7;
      const end = lerp(shot.from, shot.target, Math.min(1, shot.t));
      for (const e of state.enemies) if (!e.dead && segmentCircle(shot.from, end, e, e.r + 4) && e.hitCooldown <= 0) { e.hp -= 25; e.hitCooldown = .3; if (e.hp <= 0) { e.dead = true; state.kills++; } }
      if (shot.t >= 1) { shot.live = false; burst(end.x, end.y, '#f7b6ff', 8); }
    }
    state.salvo = state.salvo.filter(s => s.live);
  }

  function hurtPlayer(amount, reason, ordinary = false) {
    if (state.player.hitCooldown > 0) return;
    if (state.encounter === 0 && state.time < 12) return;
    if (ordinary && state.blade.state === 'home' && state.shield) { state.shield = false; state.player.hitCooldown = .35; burst(state.player.x, state.player.y, '#a4f0ff', 9); toast('Schutzladung fängt den Körpertreffer', 1.5); return; }
    state.player.hitCooldown = .58; state.player.hp = Math.max(0, state.player.hp - amount); burst(state.player.x, state.player.y, '#ff708e', 10); toast(reason, 1.1);
    if (state.player.hp <= 0) finish(false);
  }

  function completeEncounter() {
    if (state.scene !== 'fight') return; state.completed = state.encounter + 1;
    if (state.encounter >= 2) { finish(true); return; }
    state.scene = 'choice'; state.paused = true; showChoice();
  }

  function card(id, icon, title, text, actionId = id, extra = '') {
    return `<button class="card" data-card="${actionId}"><span class="card-icon">${icon}</span><b>${title}</b><span>${text}</span>${extra ? `<small class="replace">${extra}</small>` : ''}</button>`;
  }

  function showChoice() {
    $('choice-kicker').textContent = `${state.encounterStarts[state.encounter].title} geschafft`;
    $('choice-title').textContent = state.encounter === 0 ? 'Dein erster Aufbau' : 'Wähle deinen nächsten Schritt';
    $('choice-copy').textContent = state.encounter === 0 ? 'Fangschirm zeigt dir, wie ein Ort zum Werkzeug wird.' : 'Mächte verändern, was die nächste Arena von dir verlangt.';
    let html = '';
    if (state.encounter === 0) {
      html += card('fangschirm', '◈', 'Fangschirm', 'Ein Feld fängt gewöhnliche Geschosse am Parkpunkt.', 'fangschirm');
      html += card('glutspur', '♨', 'Glutspur', 'Deine Laufspur bleibt kurz heiß und hält Verfolger fern.', 'glutspur');
      html += card('heal', '✚', 'Licht teilen', 'Heile 28 Leben und behalte deinen klaren Aufbau.', 'heal');
    } else {
      if (hasPower('fangschirm') && !hasPower('spiegelstern')) html += card('spiegelstern', '✦', 'Spiegelstern', 'Fangschirm + Standbild: Geschosse kehren von ihrem Eintrittsort zum Fangpunkt zurück.', 'spiegelstern', 'Belegt zwei Zutatenplätze · Gegnerfreeze geht verloren');
      html += card('standbild', '▣', 'Standbild', 'Gegner am Parkpunkt stehen kurz still. Rückruf beendet das Bild.', 'standbild');
      if (!hasPower('glutspur')) html += card('glutspur', '♨', 'Glutspur', 'Dein Laufweg brennt kurz und verursacht sicheren Nachdruck.', 'glutspur');
      html += card('heal', '✚', 'Heilen', 'Heile 32 Leben. Deine unbenutzte Schutzladung bleibt erhalten.', 'heal');
      if (state.powers.length >= 3) html += card('replace', '↻', 'Ersetzen', 'Ersetze eine Macht durch Glutspur und richte deinen Plan neu aus.', 'replace');
    }
    $('cards').innerHTML = html; $('cards').querySelectorAll('[data-card]').forEach(btn => btn.addEventListener('click', () => chooseCard(btn.dataset.card)));
    showScreen('choice');
  }

  function chooseCard(id) {
    if (id === 'heal') { state.player.hp = Math.min(state.player.maxHp, state.player.hp + (state.encounter === 0 ? 28 : 32)); toast('Licht geteilt: Leben geheilt', 1.7); continueAfterChoice(); return; }
    if (id === 'replace') { state.replacement = true; $('choice-title').textContent = 'Welche Macht darf weichen?'; $('choice-copy').textContent = 'Wähle einen Slot. Danach erhältst du Glutspur.'; $('cards').innerHTML = state.powers.map((p, i) => card(`slot-${i}`, '◇', powerName(p), powerText(p), `slot-${i}`)).join(''); $('cards').querySelectorAll('[data-card]').forEach(btn => btn.addEventListener('click', () => chooseCard(btn.dataset.card))); return; }
    if (id.startsWith('slot-')) { const i = Number(id.slice(5)); state.powers[i] = 'glutspur'; state.replacement = false; toast('Glutspur ersetzt einen Slot', 1.6); continueAfterChoice(); return; }
    if (id === 'spiegelstern') { if (!hasPower('standbild')) state.powers.push('standbild'); state.powers = state.powers.filter(p => p !== 'fangschirm' && p !== 'standbild'); state.powers.push('spiegelstern'); toast('Fusion: Spiegelstern ist bereit', 2.2); continueAfterChoice(); return; }
    if (!hasPower(id)) { if (state.powers.length < 3) state.powers.push(id); else state.powers[0] = id; toast(`${powerName(id)} aufgenommen`, 1.4); }
    continueAfterChoice();
  }

  function continueAfterChoice() { state.scene = 'fight'; state.paused = false; state.player.x = 480; state.player.y = 330; startEncounter(state.encounter + 1); showScreen(null); updateHud(); }
  function powerName(id) { return ({ sog: 'Sog', fangschirm: 'Fangschirm', standbild: 'Standbild', glutspur: 'Glutspur', spiegelstern: 'Spiegelstern' })[id] || id; }
  function powerText(id) { return ({ sog: 'zieht nahe Gegner beim Parken heran', fangschirm: 'fängt Geschosse im Feld', standbild: 'friert Gegner am Parkpunkt', glutspur: 'brennt kurze Laufspuren', spiegelstern: 'sendet gefangene Schüsse zum Fixpunkt' })[id] || ''; }

  function finish(win) {
    state.scene = win ? 'end' : 'end'; state.paused = true; input.keys.clear(); input.dir = { x: 0, y: 0 }; input.pointerId = null; showScreen('end');
    $('end-kicker').textContent = win ? 'Run abgeschlossen' : 'Run abgebrochen'; $('end-title').textContent = win ? 'Licht erreicht.' : 'Die Arena war stärker.';
    $('end-copy').textContent = win ? 'Du hast Ankunft, Gegenprobe und den Lichtbrecher gelesen. Dein Rückruf bleibt deine eigene Linie.' : 'Jede entdeckte Macht bleibt für deinen nächsten Versuch im Kopf.';
    $('end-build').innerHTML = state.powers.map(p => `<span>${powerName(p)}</span>`).join('') + `<span>${state.kills} Trefferziele</span>`;
  }

  function toast(text, seconds) { state.toast = text; state.toastTime = seconds; }
  function burst(x, y, color, count) { for (let i = 0; i < count; i++) state.sparks.push({ x, y, vx: (Math.random() - .5) * 110, vy: (Math.random() - .5) * 110, ttl: .35 + Math.random() * .35, max: .7, color }); }
  function updateFx(dt) { state.toastTime = Math.max(0, state.toastTime - dt); for (const s of state.sparks) { s.x += s.vx * dt; s.y += s.vy * dt; s.ttl -= dt; } state.sparks = state.sparks.filter(s => s.ttl > 0); }

  function updateHud() {
    $('health-fill').style.width = `${state.player.hp / state.player.maxHp * 100}%`; $('health-label').textContent = Math.ceil(state.player.hp);
    const b = state.blade.state; $('blade-state').textContent = b === 'home' ? 'Klinge zu Hause' : b === 'parked' ? 'Klinge geparkt' : b === 'return' ? 'Rückflug fixiert' : 'Klinge im Hinflug';
    $('shield-state').textContent = state.shield ? (b === 'home' ? 'Schutz bereit' : 'Schutz gespeichert') : 'Schutz leer';
    $('power-state').textContent = state.powers.map(powerName).join(' · ');
    $('power-btn').querySelector('b').textContent = b === 'home' ? 'Werfen' : 'Rückruf'; $('power-btn').querySelector('span').textContent = b === 'home' ? '↗' : '↩';
    if (state.toastTime > 0 && state.scene === 'fight') $('hint-label').textContent = state.toast; else $('hint-label').textContent = state.encounterStarts[state.encounter].hint;
  }

  function draw() {
    ctx.clearRect(0, 0, W, H); drawBackground();
    if (state.scene === 'fight' || state.scene === 'pause') { drawWarnings(); drawEmbers(); drawBullets(); drawEnemies(); drawPowers(); drawBlade(); drawPlayer(); drawSparks(); }
  }

  function drawBackground() {
    const g = ctx.createLinearGradient(0, 0, W, H); g.addColorStop(0, '#0c1c3b'); g.addColorStop(1, '#071027'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = 'rgba(115,166,241,.075)'; ctx.lineWidth = 1; for (let x = 0; x < W; x += 48) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); } for (let y = 0; y < H; y += 48) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
    ctx.strokeStyle = 'rgba(128,190,255,.25)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(FIELD.l, FIELD.t, FIELD.r - FIELD.l, FIELD.b - FIELD.t, 28); ctx.stroke();
  }

  function drawPlayer() {
    const p = state.player; ctx.save(); ctx.translate(p.x, p.y); ctx.shadowBlur = 22; ctx.shadowColor = '#69deff'; ctx.fillStyle = '#d8f7ff'; ctx.beginPath(); ctx.arc(0, 0, p.r, 0, TAU); ctx.fill(); ctx.shadowBlur = 0; ctx.fillStyle = '#4c79d8'; ctx.beginPath(); ctx.arc(0, 0, 8, 0, TAU); ctx.fill(); if (state.blade.state === 'home' && state.shield) { ctx.strokeStyle = 'rgba(127,235,255,.85)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(0, 0, 29 + Math.sin(state.now * 4) * 2, 0, TAU); ctx.stroke(); } ctx.restore();
  }

  function drawBlade() {
    const b = state.blade, p = state.player; ctx.save();
    if (b.state === 'home') { const q = { x: p.x + p.lastDir.x * 87, y: p.y + p.lastDir.y * 87 }; ctx.setLineDash([7, 8]); ctx.strokeStyle = 'rgba(135,220,255,.32)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); ctx.setLineDash([]); }
    if (b.state === 'parked') { ctx.setLineDash([6, 9]); ctx.strokeStyle = 'rgba(255,224,140,.45)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(b.x, b.y); ctx.lineTo(p.x, p.y); ctx.stroke(); ctx.setLineDash([]); }
    if (b.state === 'return') { ctx.strokeStyle = 'rgba(255,230,139,.78)'; ctx.lineWidth = 4; ctx.shadowBlur = 18; ctx.shadowColor = '#ffe28c'; ctx.beginPath(); ctx.moveTo(b.start.x, b.start.y); ctx.lineTo(b.target.x, b.target.y); ctx.stroke(); }
    if (b.state !== 'home') { ctx.translate(b.x, b.y); ctx.rotate(Math.atan2(p.y - b.y, p.x - b.x) + Math.PI / 4); ctx.shadowBlur = 22; ctx.shadowColor = '#ffe59b'; ctx.fillStyle = '#fff4b5'; ctx.beginPath(); ctx.moveTo(0, -21); ctx.lineTo(7, 0); ctx.lineTo(0, 21); ctx.lineTo(-7, 0); ctx.closePath(); ctx.fill(); ctx.restore(); return; }
    ctx.restore();
  }

  function drawEnemies() {
    for (const e of state.enemies) { if (e.dead) continue; ctx.save(); ctx.translate(e.x, e.y); ctx.globalAlpha = e.flash > 0 ? .55 : 1; ctx.shadowBlur = 13; ctx.shadowColor = e.type === 'boss' ? '#cb7bff' : e.type === 'shooter' ? '#ff769a' : '#ffb95c'; ctx.fillStyle = e.type === 'boss' ? '#9d5bd4' : e.type === 'shooter' ? '#d65b81' : e.type === 'shield' ? '#c27d4e' : '#de8c48'; if (e.type === 'boss') { ctx.rotate(state.now * .15); ctx.beginPath(); for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4, r = i % 2 ? 35 : 51; ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r); } ctx.closePath(); ctx.fill(); } else { ctx.beginPath(); ctx.arc(0, 0, e.r, 0, TAU); ctx.fill(); } ctx.shadowBlur = 0; if (e.type === 'shield' || e.type === 'boss') { ctx.strokeStyle = enemyIsOpen(e) ? '#9bffd2' : '#e8bd65'; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(0, 0, e.r + 8, enemyIsOpen(e) ? -.8 : -.8 + Math.PI, enemyIsOpen(e) ? .8 : 0.8 + Math.PI); ctx.stroke(); } if (e.type === 'shooter') { ctx.fillStyle = '#ffe0ee'; ctx.beginPath(); ctx.arc(0, 0, 5, 0, TAU); ctx.fill(); } ctx.restore(); if (e.type === 'boss' || e.hp < e.maxHp) { ctx.fillStyle = 'rgba(0,0,0,.55)'; ctx.fillRect(e.x - 35, e.y - e.r - 16, 70, 5); ctx.fillStyle = e.type === 'boss' ? '#d49dff' : '#ffae78'; ctx.fillRect(e.x - 35, e.y - e.r - 16, 70 * clamp(e.hp / e.maxHp, 0, 1), 5); } }
  }

  function drawBullets() { for (const b of state.bullets) { ctx.fillStyle = '#ff9db2'; ctx.shadowBlur = 14; ctx.shadowColor = '#ff6489'; ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, TAU); ctx.fill(); ctx.shadowBlur = 0; } }
  function drawWarnings() { for (const w of state.warnings) { const t = 1 - clamp(w.ttl / w.max, 0, 1); ctx.strokeStyle = `rgba(255, ${90 + Math.floor(t * 100)}, 120, ${.35 + t * .5})`; ctx.lineWidth = 3; ctx.setLineDash([8, 7]); ctx.beginPath(); ctx.arc(w.x, w.y, w.r * (.72 + t * .28), 0, TAU); ctx.stroke(); ctx.setLineDash([]); } }
  function drawEmbers() { for (const e of state.embers) { ctx.globalAlpha = clamp(e.ttl / e.max, 0, 1); ctx.fillStyle = '#ff9d55'; ctx.shadowBlur = 13; ctx.shadowColor = '#ff5e3b'; ctx.beginPath(); ctx.arc(e.x, e.y, 9, 0, TAU); ctx.fill(); ctx.shadowBlur = 0; } ctx.globalAlpha = 1; }
  function drawPowers() { const p = state.park; if (p) { if (p.field) { ctx.strokeStyle = hasPower('spiegelstern') ? 'rgba(246,169,255,.85)' : 'rgba(105,221,255,.85)'; ctx.fillStyle = hasPower('spiegelstern') ? 'rgba(201,97,234,.12)' : 'rgba(91,210,255,.1)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(p.x, p.y, p.fieldR, 0, TAU); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#dce7ff'; ctx.font = '12px system-ui'; ctx.textAlign = 'center'; ctx.fillText(`${p.captured.length}/${hasPower('spiegelstern') ? 5 : 4}`, p.x, p.y + 4); } if (p.still && p.stillTime > 0) { ctx.strokeStyle = 'rgba(166, 139, 255, .75)'; ctx.setLineDash([4, 6]); ctx.beginPath(); ctx.arc(p.x, p.y, 84, 0, TAU); ctx.stroke(); ctx.setLineDash([]); } } for (const s of state.salvo) { if (s.t < 0) continue; const end = lerp(s.from, s.target, clamp(s.t, 0, 1)); ctx.strokeStyle = 'rgba(255,182,255,.8)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(s.from.x, s.from.y); ctx.lineTo(end.x, end.y); ctx.stroke(); } }
  function drawSparks() { for (const s of state.sparks) { ctx.globalAlpha = clamp(s.ttl / s.max, 0, 1); ctx.fillStyle = s.color; ctx.beginPath(); ctx.arc(s.x, s.y, 2.5, 0, TAU); ctx.fill(); } ctx.globalAlpha = 1; }

  function canvasPoint(ev) { const r = canvas.getBoundingClientRect(); return { x: (ev.clientX - r.left) * W / r.width, y: (ev.clientY - r.top) * H / r.height }; }
  function padPointerDown(ev) { if (state.scene !== 'fight') return; input.pointerId = ev.pointerId; input.touchOrigin = canvasPoint(ev); $('touch-pad').setPointerCapture?.(ev.pointerId); updateTouchDirection(canvasPoint(ev)); ev.preventDefault(); }
  function padPointerMove(ev) { if (ev.pointerId !== input.pointerId) return; updateTouchDirection(canvasPoint(ev)); ev.preventDefault(); }
  function updateTouchDirection(p) { const o = input.touchOrigin; const dx = p.x - o.x, dy = p.y - o.y; const n = Math.hypot(dx, dy); input.dir = n > 8 ? { x: dx / Math.min(70, n), y: dy / Math.min(70, n) } : { x: 0, y: 0 }; const knob = $('touch-pad').querySelector('span'); const m = Math.min(42, n * .55); knob.style.transform = `translate(${n ? dx / n * m : 0}px, ${n ? dy / n * m : 0}px)`; }
  function padPointerUp(ev) { if (ev.pointerId !== input.pointerId) return; input.pointerId = null; input.touchOrigin = null; input.dir = { x: 0, y: 0 }; $('touch-pad').querySelector('span').style.transform = 'translate(0,0)'; }

  $('start-btn').addEventListener('click', resetRun);
  document.querySelectorAll('[data-start-power]').forEach(btn => btn.addEventListener('click', () => { document.querySelectorAll('.starter').forEach(b => b.classList.remove('selected')); btn.classList.add('selected'); state.selectedStart = btn.dataset.startPower; }));
  $('power-btn').addEventListener('pointerdown', ev => { action(); ev.preventDefault(); }); $('pause').addEventListener('click', () => togglePause(true)); $('resume-btn').addEventListener('click', () => togglePause(false)); $('restart-btn').addEventListener('click', resetRun); $('restart-pause').addEventListener('click', resetRun);
  $('touch-pad').addEventListener('pointerdown', padPointerDown); $('touch-pad').addEventListener('pointermove', padPointerMove); $('touch-pad').addEventListener('pointerup', padPointerUp); $('touch-pad').addEventListener('pointercancel', padPointerUp); $('touch-pad').addEventListener('lostpointercapture', padPointerUp);
  window.addEventListener('keydown', ev => { const k = ev.key.toLowerCase(); if (['arrowup','arrowdown','arrowleft','arrowright','w','a','s','d'].includes(k)) { input.keys.add(k); ev.preventDefault(); } if (k === ' ' || k === 'spacebar') { if (!ev.repeat) action(); ev.preventDefault(); } if (k === 'escape') togglePause(!state.paused); });
  window.addEventListener('keyup', ev => input.keys.delete(ev.key.toLowerCase())); window.addEventListener('blur', () => { input.keys.clear(); input.dir = { x: 0, y: 0 }; if (state.scene === 'fight') togglePause(true); }); document.addEventListener('visibilitychange', () => { if (document.hidden) { input.keys.clear(); input.dir = { x: 0, y: 0 }; if (state.scene === 'fight') togglePause(true); } });
  function togglePause(value) { if (state.scene !== 'fight' && state.scene !== 'pause') return; state.paused = value; state.scene = value ? 'pause' : 'fight'; showScreen(value ? 'pause' : null); if (!value) { state.now += 0; } }

  let last = performance.now();
  function frame(now) { const dt = Math.min(.05, (now - last) / 1000); last = now; if (state.scene === 'fight' && !state.paused) update(dt); draw(); requestAnimationFrame(frame); }
  installQaPanel(); showScreen('start'); requestAnimationFrame(frame);
})();
