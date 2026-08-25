'use strict';
/* Sterblicher Bot auf Entdecker: Referenz aus CLAUDE.md ist ein Sieg (früher ~9 min). */
const { start, run } = require('./sim.js');
const api = start({});
api.G('save.hilfe="entdecker"');
const stat = run(api, { minutes: 25 });
console.log('[entdecker]', JSON.stringify(stat));
