# Orbitblade – Arbeitskontext für Claude Code

## Zuerst lesen

Die aktuelle Entwicklungsbasis ist die isolierte v5 unter `konzept/`.

- `konzept/index.html`, `konzept/style.css`, `konzept/game.js`: aktive v5-Arbeitsfassung.
- `index.html`, `style.css`, `game.js`: stabile v4 vom 10.08.2026; als spielbare
  Referenz und insbesondere für Performancevergleiche erhalten.
- `snapshots/v5-grundkonzept-vor-umbau-2026-08-11/`: unveränderter, per SHA-256
  geprüfter Stand der getesteten v5 vor dem nächsten großen Umbau. Diesen Ordner
  niemals bearbeiten.
- `docs/V5-GRUNDKONZEPT.md`: ausführlicher fachlicher Stand, Hintergründe,
  Messungen, geplante Richtung und offene Entscheidungen.
- `backlog.md`: enthält wertvolle Historie, aber auch veraltete und widersprüchliche
  Aussagen. Bei Widersprüchen gilt dieses Dokument zusammen mit
  `docs/V5-GRUNDKONZEPT.md`.

## Produktkern, der erhalten bleiben soll

Orbitblade ist ein mobile-first Arena-Roguelite in Vanilla HTML/CSS/JavaScript.
Der Spieler bewegt sich frei, während eine Klinge automatisch um ihn kreist.
Entscheidend ist der Sweet Spot: Die sichtbare Klingenposition verursacht deutlich
mehr Schaden als die verzeihende Rundum-Grundzone.

Festgehaltene Leitplanken:

- Gepanzerte Gegner sind ein sehr positives Element und sollen bleiben.
- Jeder Charakter behält die automatisch kreisende Orbit-Klinge als zentrales
  Spielelement. Signaturen, Passives oder Drohnen ergänzen sie, ersetzen sie nicht.
- Das Spiel ist bis Welle 30 gewinnbar; danach kann Endlos folgen.
- Hilfen dürfen keine Inhalte, Abzeichen oder Siege sperren. Bestmarken bleiben
  getrennt.
- Mobile Bedienung und ein niedriger Einstieg für Kinder bleiben wichtig, ohne die
  Spieltiefe für ältere Spieler zu entfernen.
- Keine Serverpflicht und keine personenbezogenen Daten; Fortschritt liegt derzeit
  in `localStorage`.

## Entscheidung vom 11.08.2026

Der Nutzer hat v5 getestet und als neues Grundkonzept bestätigt. Vor der Umsetzung
soll der Umbau intensiv analysiert und dokumentiert werden.

Beschlossene Richtung, in der ersten Umbauetappe implementiert:

1. Das Karten-Overlay bei jedem Level-Up wird durch einen laufgebundenen Skill-Tree
   mit festeren Pfadabhängigkeiten ersetzt. Jeder neue Lauf startet mit einem leeren
   Tree; die Verteilung des vorherigen Laufs wird nicht übernommen.
2. Jedes Level gibt einen Punkt. Im laufenden Spiel zeigt ein kleiner Button
   verfügbare Punkte; der Spieler öffnet den Tree selbst.
3. Die XP-Kurve wird auf ungefähr 24 bis 32 Punkte bis Welle 30 neu abgestimmt.
4. Aktive Mächte werden weiterhin vor dem Lauf gewählt. Passive Mächte sowie die
   Super-Mächte aus aktiver Macht plus passender passiver Macht liegen im Tree.
5. Zunächst werden Lichthüter und Leerenklinge zu zwei wirklich unterschiedlichen
   Charakteren ausgebaut: gemeinsamer Spielkern, aber eigener Kern, eigene aktive
   Fähigkeit und exklusive Tree-Knoten.
6. Die Werkstatt konzentriert sich künftig auf mechanische Freischaltungen und
   Komfort statt doppelter Prozent-Upgrades.
7. Das Hauptmenü wird auf sofortiges Spielen mit der letzten Konfiguration,
   Vorbereitung sowie einen gemeinsamen Hangar für Werkstatt/Sammlung reduziert.
8. Der isolierte v5-Testspielstand darf beim großen Umbau zurückgesetzt werden.
9. v5 ruckelt gegenüber v4 stark. Die erste Entlastung (DPR-Cap, Culling,
   gedrosseltes HUD, Diagnose-Overlay) ist eingebaut; Gerätevergleich bleibt Pflicht.

Details, Begründungen, Migrationslogik und Testergebnisse stehen in
`docs/V5-GRUNDKONZEPT.md`; dieses Dokument ist bei Widersprüchen maßgeblich.

## Aktuell im Code

- `SAVE_VERSION` ist 6. V5-Speicher bleibt getrennt (`orbitblade_konzept_save`);
  die v6-Migration erstattet entfernte Prozent-Upgrades als Fragmente.
- Der Skill-Tree sitzt in `treeNodes()`. `runTree`, `skillPoints` und `treeFlags`
  werden nur in `resetGame()` zurückgesetzt. Ein aktiver Lauf pausiert beim Öffnen
  des Trees (`state === 'tree'`).
- Der Lichthüter stärkt den Sweet Spot durch Bewegung, erzeugt bei vollem Fokus
  Barriere und nutzt die Lichtbahn. Die Leerenklinge wird mit fehlendem Leben
  schneller/stärker und opfert für ihre Überladung Leben, um zusätzliche
  Orbit-Klingen und Lebensraub zu erhalten. Die interne ID `konstrukt` bleibt aus
  Kompatibilitätsgründen bestehen.
- `?perf=1` blendet FPS, Update-/Draw-Zeit, sichtbare Gegner und Canvas-Pixel ein.
  Die Messung auf echten Geräten ist noch offen.
- Das frühere Level-Karten-System ist als ungenutzter Legacy-Code noch vorhanden.
  `checkLevelUp()` vergibt ausschließlich Punkte und öffnet keine Karten mehr.

## Ergänzte Anforderungen vom 12.08.2026

- Skill-Tree-, Werkstatt-, Vorbereitungs- und Sammlungsansichten müssen deutlich
  kompakter werden. Mehr Inhalt soll ohne Scrollen sichtbar sein, bei weiterhin
  sicheren Touch-Zielen.
- Das Sounddesign soll nach Weltraum, Energieklinge und Orbit klingen statt nach
  generischen Arcade-Signalen. Audio-Änderungen müssen mobil leichtgewichtig bleiben.
- Die zwei aktuellen Charaktere werden konzeptionell erneut geprüft. Mögliche Rollen
  sind helle/beschützende, dunkle/riskante und technische Orbit-Klingen-Nutzer.
  Fraktionen oder Moralentscheidungen sind noch nicht beschlossen.

## Arbeitsregeln für den nächsten Umbau

1. Zunächst nur unter `konzept/` arbeiten. Die v4 im Stamm nicht überschreiben.
2. Den Snapshot niemals verändern oder automatisch formatieren.
3. Performance nicht nach Gefühl optimieren: v4 und v5 auf demselben Gerät, derselben
   Auflösung, Hilfsstufe und Welle vergleichen. Zuerst Messwerte einbauen.
4. Den alten, jetzt ungenutzten Karten-Code erst nach einem Browser-Regressionstest
   entfernen; normaler Level-Up ruft ihn nicht mehr auf.
5. Änderungen und Begründungen fortlaufend in der Detaildokumentation nachtragen.
6. Nach JavaScript-Änderungen mindestens `node --check konzept/game.js` ausführen.
7. Bei Speicherstandsänderungen eine explizite Versionsstrategie festlegen. v5 nutzt
   absichtlich `orbitblade_konzept_save` und berührt den v4-Spielstand nicht.

## Bekannte technische Risiken

- `konzept/game.js` ist ein globaler Monolith mit rund 3.867 Zeilen.
- Es gibt kein Git-Repository, keinen eingecheckten Test-Harness und keinen Build.
- Der Tree liefert nach der neuen XP-Kurve etwa 29 Punkte bis Welle 30. Bei Änderungen
  an Spawnzahlen, Gegner-XP oder Orb-Chancen diese Simulation erneut prüfen.
- Die Hilfsstufen verändern die Gegnerzahl; `laufXp()` normiert deshalb direkte XP und
  XP-Orbs auf ihre Gegnerzahl. Diese Regel nicht unbemerkt umgehen.
- Die Performancebeobachtung passt zu anhaltend hoher Renderlast beziehungsweise
  thermischer Drosselung: Auf einem Pixel 9 ruckelte der zweite Lauf bereits in den
  ersten Wellen, der erste erst später. Auf einem X1 Carbon mit Intel-Prozessor der
  10. Generation lief es bis etwa Welle 21 gut, der Lüfter wurde aber deutlich laut.
  Das ist eine Arbeitshypothese, noch keine gemessene Ursache.
- `Nachhall` kann in Trefferbursts über die gesamte Gegnerliste iterieren.
- Das HUD ist auf 10 Updates/s gedrosselt und `draw()` cullt außerhalb des Viewports.
  Weiterhin teuer bleiben gegnernahe Effekte und globale Zielsuche in Trefferbursts.
- Die Gegnerauswahl wurde auf echte gewichtete Folgeprüfungen korrigiert. Bei neuen
  Gegnern diese Verteilung bewusst testen.
- `DEFAULT_SAVE` enthält sowohl das benutzte Feld `figur` als auch das unbenutzte Feld
  `charakter`.
- Ein Hilfetext behauptet noch, aktive Mächte ließen sich im Lauf umrüsten, obwohl sie
  seit dem letzten Umbau vor dem Lauf festgelegt sind.
