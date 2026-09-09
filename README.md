# Orbitblade v5

Mobiles Arena-Roguelite mit automatisch kreisender Orbitklinge, Bewegung und
einem aktiven Machtknopf. Vanilla HTML/CSS/JavaScript, ohne Build oder Framework.

## Spielen

- [GitHub-Pages-Version](https://driftpine99.github.io/Orbitblade/)
- [Direkter Einstieg](https://driftpine99.github.io/Orbitblade/konzept/)
- [Version mit Performanceanzeige](https://driftpine99.github.io/Orbitblade/konzept/?perf=1)

Lokal aus dem Projektstamm starten:

```powershell
node tools/server.js
```

Dann [localhost:8123](http://localhost:8123/) öffnen. Die vorhandene lokale
Vorschaukonfiguration unter `.claude/launch.json` verwendet denselben Startweg.

## Konzept und Ablage

- **[CLAUDE.md](CLAUDE.md)** ist das aktuelle Gesamtkonzept und die einzige
  maßgebliche fachliche Quelle. Vor jeder Arbeit lesen.
- Nur `konzept/index.html`, `konzept/style.css` und `konzept/game.js` bilden das
  aktive Spiel. Die `index.html` im Stamm leitet für GitHub Pages dorthin weiter.
- [Dokumentenwegweiser](docs/README.md): historische Entwürfe, Präsentation und Belege.
- [Ablage und Sicherung](docs/ablage.md): benötigte Dateien und Stand der Bereinigung.
- `tools/` enthält die Messwerkzeuge; `AGENTS.md` und `.opencode/` regeln die Zusammenarbeit.

`archive/` ohne ausdrücklichen Nutzerauftrag weder lesen noch verändern.
`.git/`, lokale Konfigurationen und unversionierte Produktionsmedien erhalten.

## Prüfen und veröffentlichen

```powershell
node --check konzept/game.js
node tools/sim.js --god --minutes=20
```

Die Simulation prüft den Spielfortschritt; ein God-Lauf belegt keine
Überlebensbalance und ersetzt keine Sicht- oder Touchprüfung. Messverfahren,
Erwartungswerte und Grenzen stehen in `CLAUDE.md`.

GitHub Pages veröffentlicht den gepushten Stand. Vor einem ausdrücklich
beauftragten Commit oder Push `git status --short` und `git diff` prüfen und
nur die beabsichtigten Pfade vormerken. Keine pauschale Aufnahme lokaler
Arbeitsdateien; bestehende Nutzeränderungen erhalten.
