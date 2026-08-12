# Orbitblade v5 – verbindlicher Arbeitsstand

## Geltungsbereich

Entwickelt wird ausschließlich v5 unter `konzept/`:

- `konzept/index.html`
- `konzept/style.css`
- `konzept/game.js`

`archive/` ist nur Ablage. Inhalte dort nicht lesen, bearbeiten, vergleichen oder
als aktuelle Anforderung behandeln, außer der Nutzer verlangt es ausdrücklich.
Die v4 und alte Konzeptdokumente sind nicht mehr maßgeblich.

## Produktkern

Orbitblade ist ein mobile-first Arena-Roguelite. Die automatisch kreisende
Orbit-Klinge ist bei jedem Charakter der Hauptangriff. Positionierung entscheidet:
Die sichtbare Klinge ist der Sweet Spot und verursacht deutlich mehr Schaden als die
verzeihende Rundumzone.

Unverhandelbare Leitplanken:

- Spielspaß zuerst, Monetarisierung später.
- Jeder Charakter behält die Orbit-Klinge; Signaturen verändern ihre Nutzung.
- Gepanzerte Gegner bleiben.
- Welle 30 ist der Siegpunkt, danach ist Endlos möglich.
- Hilfen sperren keine Inhalte; Bestmarken bleiben getrennt.
- Touch-Bedienung und verständlicher Einstieg für Kinder bleiben erhalten.
- Vanilla HTML/CSS/JavaScript, kein Build und keine Serverpflicht.
- Fortschritt liegt im `localStorage` unter `orbitblade_konzept_save`.

## Aktueller Stand

- Laufgebundener Skill-Tree statt Level-Up-Karten: ein Punkt je Level, rund 28–29
  Punkte bis Welle 30, drei Zweige (`Klinge`, `Kern`, `Mächte`).
- Aktive Mächte werden vor dem Lauf gewählt. Passives, Stufen und Entwicklungen
  liegen im Tree.
- Startmenü: Spielen, Vorbereitung, Hangar. Hangar enthält Werkstatt und Sammlung.
- Werkstatt enthält nur mechanische Freischaltungen: zweiter Aktiv-Slot,
  Startimpuls und Begleiter.
- Performanceentlastung: DPR-Cap, Offscreen-Culling, HUD mit 10 Updates/s und
  Diagnose über `?perf=1`.
- `SAVE_VERSION` ist 6; entfernte permanente Prozentkäufe werden erstattet.

## Charaktere

- **Lichthüter** (`held`): Bewegung verstärkt Sweet-Spot-Treffer, voller Fokus erzeugt
  Barriere, Signatur `Lichtbahn` führt durch Gegner.
- **Leerenklinge** (interne Alt-ID `konstrukt`): fehlendes Leben erhöht Orbittempo
  und Sweet-Spot-Schaden. `Leerenüberladung` opfert Leben und erzeugt zeitweise
  zusätzliche Orbit-Klingen sowie Heilung durch Kills.

Die interne ID `konstrukt` bleibt vorerst wegen bestehender v5-Spielstände.

## Nächste Arbeitsreihenfolge

1. Skill-Tree neu strukturieren: weniger lineare Stufenketten, ausgewogenere Zweige,
   mehr mechanische Entscheidungen und eine Entwicklung für `Sog`.
2. Tree, Werkstatt, Vorbereitung und Sammlung deutlich kompakter gestalten: mehr
   Inhalt pro Bildschirm bei sicheren Touch-Zielen.
3. Laufdauer und Balance der neuen Tree-Fassung abstimmen.
4. Sounddesign auf Orbit, Weltraum und Energieklinge umstellen.
5. Altlasten entfernen: stillgelegter Karten-Code, doppeltes Speicherfeld
   `charakter`/`figur`, widersprüchliche Texte und veraltete Kommentare.
6. Gesamte neue Version plausibilisieren.
7. Erst danach Performancevergleich auf Pixel 9 und X1 Carbon durchführen.
8. Monetarisierung erst behandeln, wenn Kernschleife und Wiederspielwert tragen.

Kein umfangreiches Testnetz aufbauen; das Spiel ist noch nicht produktiv. Nach
Änderungen genügen derzeit proportionale Plausibilitätsprüfungen: mindestens
`node --check konzept/game.js`, Browserstart und betroffene Spielflüsse kurz testen.

## Bekannte Baustellen

- Der Mächte-Zweig dominiert den Tree mit langen fünfstufigen Ketten.
- `Sog` hat noch keine Entwicklung.
- Der alte Karten-Code ist ungenutzt, aber noch vorhanden.
- Ein Hilfetext behauptet noch, aktive Mächte könnten im Lauf gewechselt werden.
- Läufe sind momentan vermutlich zu lang; Zielkorridore: Entdecker 15–18,
  Standard 19–23, Meister 23–27 Minuten.
- Gerätemessung der Performance ist bewusst auf den neuen Gesamtstand verschoben.

## Arbeitsregeln

- Vor Änderungen `git status --short` prüfen und fremde Änderungen erhalten.
- Nur unter `konzept/` entwickeln, sofern Infrastruktur nicht ausdrücklich betroffen ist.
- Keine Dateien aus `archive/` zurückkopieren, ohne den Nutzer zu fragen.
- Änderungen und Entscheidungen knapp in diesem Dokument aktualisieren.
- Keine Geheimnisse, Tokens oder personenbezogenen Daten einchecken.
