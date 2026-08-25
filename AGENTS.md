# Hinweise für Coding-Agenten

Vor jeder Arbeit `CLAUDE.md` lesen; es ist die einzige maßgebliche fachliche Quelle.

Nur `konzept/` ist die aktive Spielversion. `archive/` ist historische Ablage und
darf ohne ausdrückliche Nutzeranweisung weder gelesen noch verändert werden.

## Agententeam

Unter `.opencode/agent/` stehen vier Rollen bereit (in opencode per @ oder als
Modus wählbar); Kommandos liegen unter `.opencode/command/`:

- `spielarchitekt` — Entwurf und Designentscheidungen; dokumentiert in CLAUDE.md.
- `balancer` — Misst am echten Code über `tools/sim.js`; keine Zahl ohne Messung.
- `bauer` — Setzt beschlossene Entscheidungen in `konzept/` um.
- `pruefer` — Prüfkatalog ohne Schreibrecht; findet Fehler, repariert nichts.

Kommandos: `/runde Fokus` führt die ganze Kette aus, `/pruefung` prüft den Stand,
`/balance Fragestellung` misst headless.
