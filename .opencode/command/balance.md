---
description: Misst den aktuellen Stand headless über tools/sim.js und berichtet Kernzahlen.
agent: balancer
---

Miss den aktuellen Stand von Orbitblade v5 headless. Fragestellung: $ARGUMENTS

Vorgehen:
1. Prüfe, ob `tools/sim.js` existiert und lädt; erweitere es nur falls die Fragestellung einen neuen Messpunkt braucht.
2. Führe die passenden Läufe aus (Standardlauf bis Sieg/Tod, Determinismusdoppel-Lauf, Ausleseverteilung — je nach Fragestellung).
3. Berichte als Tabelle mit Stichprobe und Grenze der Messung. Vergleiche mit den in `CLAUDE.md` dokumentierten Referenzwerten (zuletzt Standard ~11 min, Meister ~15 min, sterblicher Bot gewinnt Entdecker und stirbt Standard ~Welle 12).

Keine Codeänderungen außerhalb von `tools/`.
