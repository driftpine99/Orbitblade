---
description: Misst den aktuellen Stand headless über tools/sim.js und berichtet Kernzahlen.
agent: balancer
---

Miss den aktuellen Stand von Orbitblade v5 headless. Fragestellung: $ARGUMENTS

Vorgehen:

Lies zuerst `CLAUDE.md`, insbesondere „Messungen“ und „Prüfverfahren“; es ist die einzige maßgebliche fachliche Quelle.

1. Prüfe, ob `tools/sim.js` existiert und lädt; erweitere es nur falls die Fragestellung einen neuen Messpunkt braucht.
2. Führe die passenden Läufe aus (Standardlauf bis Sieg/Tod, Wiederholungen für Determinismus oder Streuung, Ausleseverteilung — je nach Fragestellung). Gesamtläufe müssen normale Karten und Weichen wählen sowie `countdown` beenden. Knoten und Karten über ihre echten Kauf- und Auswahlfunktionen erwerben.
3. Für Karten beide Balanceachsen Schaden und Überleben prüfen; ein schwacher Schadenswert allein ist kein Urteil über Heilung oder Schutz. Überlebensvergleiche benötigen mindestens 40 Läufe je Zustand sowie Streuung und Standardfehler.
4. Berichte als Tabelle mit Stichprobe und Grenze der Messung. Vergleiche nur mit passend gekennzeichneten Referenzwerten aus „Messungen“ in `CLAUDE.md`; alte Laufzeiten sind keine aktuellen Zielwerte.

Keine Codeänderungen außerhalb von `tools/`.
