---
description: Führt eine vollständige Verbesserungsrunde aus: Entwurf, Bau, Messung, Prüfung.
agent: spielarchitekt
---

Du leitest eine Verbesserungsrunde an Orbitblade v5. Fokus: $ARGUMENTS

Arbeite die Kette vollständig ab und halte sie schlank:

1. **Befund (Spielarchitekt)**: Lies `CLAUDE.md`, grenze das Problem auf höchstens drei Ursachen ein, wähle die mit dem besten Spaß-pro-Änderungs-Risiko.
2. **Messung (Balancer-Agent, via Task)**: Lass die Ursache am Code quantifizieren (`tools/sim.js` oder Greps), bevor etwas geändert wird.
3. **Entscheid**: Wähle genau einen Umsetzungsweg, dokumentiere ihn knapp mit Datum in `CLAUDE.md`.
4. **Bau (Bauer-Agent, via Task)**: Implementiere nach den Bau-Regeln (kleinste Änderung, Lauf-RNG, Defaults, Textregeln).
5. **Prüfung (Prüfer-Agent, via Task)**: Prüfkatalog laufen lassen; Blocker sofort zurück an den Bau.
6. **Nachmessung (Balancer)**: Dieselbe Zahl wie in Schritt 2, vorher/nachter berichten.

Berichte am Ende: Befund, Entscheidung, Messwert vorher/nachter, Prüfergebnis. Keine Commits ohne ausdrückliche Nutzeranweisung.
