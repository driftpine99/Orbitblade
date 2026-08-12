# Orbitblade v5 – verbindlicher Arbeitsstand

## Geltungsbereich

Entwickelt wird ausschließlich v5 unter `konzept/`:

- `konzept/index.html`
- `konzept/style.css`
- `konzept/game.js`

`archive/` ist nur historische Ablage und darf ohne ausdrückliche Nutzeranweisung
weder gelesen noch verändert werden. Vanilla HTML/CSS/JavaScript, kein Build und
keine Serverpflicht.

## Produktkern

Orbitblade ist ein mobile-first Arena-Roguelite. Die automatisch kreisende
Orbit-Klinge bleibt bei jedem Charakter der Hauptangriff. Positionierung entscheidet:
Die sichtbare Klinge ist der Sweet Spot und verursacht deutlich mehr Schaden als die
verzeihende Rundumzone.

Leitplanken:

- Spielspaß zuerst, Monetarisierung zuletzt.
- Jeder Charakter behält die Orbit-Klinge; Signaturen verändern ihre Nutzung.
- Gepanzerte Gegner bleiben.
- Welle 30 ist der Siegpunkt, danach ist Endlos möglich.
- Hilfen sperren keine Inhalte; Bestmarken bleiben getrennt.
- Touch-Bedienung und ein verständlicher Einstieg für Kinder bleiben erhalten.
- Fortschritt liegt in `localStorage` unter `orbitblade_konzept_save`.

## Aktueller Stand

- Startmenü: Spielen, Vorbereitung, Hangar.
- Vorbereitung besitzt die Tabs Charakter, Hilfe und Mächte.
- Hangar öffnet direkt die Werkstatt; Werkstatt und Sammlung sind per Tabs verbunden.
- Werkstatt: zweiter Aktiv-Slot, Startimpuls und Begleiter.
- Sammlung: Rekorde, Klinge, Charaktere und Abzeichen.
- Ein Punkt je Level; rund 28–29 Punkte bis Welle 30.
- Aktive Mächte werden vor dem Lauf gewählt und bleiben im Lauf fest.
- Maximal drei passive Mächte.
- Performanceentlastung: DPR-Cap, Culling, HUD mit 10 Updates/s und `?perf=1`.
- `SAVE_VERSION` ist 6.

## Charaktere

- **Lichthüter** (`held`): Bewegung verstärkt Sweet-Spot-Treffer, voller Fokus
  erzeugt Barriere, Signatur `Lichtbahn`.
- **Leerenklinge** (interne Alt-ID `konstrukt`): Fehlendes Leben erhöht Orbittempo
  und Sweet-Spot-Schaden. `Leerenüberladung` opfert Leben und erzeugt zusätzliche
  Orbit-Klingen sowie Heilung durch Kills.

Die interne ID `konstrukt` bleibt wegen vorhandener Spielstände.

## Orbitbaum

Der frühere Drei-Tab-Tree ist verworfen. Es gibt einen einzigen verbundenen,
vertikal scrollenden Orbitbaum.

Gestaltungsregeln:

- Der erste Punkt verändert sofort eine Mechanik: A/B-Modifikation einer
  ausgerüsteten Macht oder Mehrfach-/Singularorbit.
- Mächte bilden die auffälligen Seitenäste. Klinge, Charakter, Fokus und Schutz
  bilden den verbundenen Mittelstamm.
- Kleine runde Knoten sind sinnvolle Buffs auf dem Weg und besitzen wenige gebündelte Ränge.
- Rauten verändern Mechaniken. Große leuchtende Knoten sind Endknoten oder
  Entwicklungen.
- Eine sichtbare Linienführung zeigt Abhängigkeiten. Gekaufte Wege leuchten grün,
  kaufbare Wege gold, gesperrte Wege bleiben dunkel sichtbar.
- Antippen wählt einen Symbolknoten aus; Name, Wirkung, Voraussetzung und Kaufen
  stehen in einer festen Detailleiste.
- Kein Zoomen und kein horizontales Verschieben.

### Machtpfad

Jede ausgerüstete aktive Macht besitzt:

1. sofortige exklusive A/B-Modifikation;
2. das passende Passivmodul mit bis zu fünf Rängen;
3. drei Meisterschaftsränge inklusive mechanischem Sprung;
4. die Entwicklung als klaren Endpunkt.

Die Entwicklung benötigt mindestens Passivrang 3 und volle Meisterschaft. Jeder
Knoten trägt direkt ein Kurzlabel wie `PASSIV +1`, `MACHT +1` oder
`ENTWICKLUNG`; die Detailleiste erklärt weiterhin die vollständige Wirkung.

Entwicklungspaare:

- Wirbel + Splitter → Sturmwirbel
- Schock + Kettenblitz → Kettengewitter
- Bombe + Konterstoß → Streubombe
- Nova + Phaser → Nova-Kaskade
- Sog + Nachhall → Gravitationsbruch

### Mittelstamm

- Mehrfachorbit oder Singularorbit
- ein vierstufiger Klingenkern statt zweier ähnlicher Prozentleiter
- pro Charakter zwei exklusive Routen und je ein echter Endknoten
- eine dreistufige Kernresonanz für Leben, Barriere und Fokus
- die `Orbitkrone` als Klingenabschluss

Mit einem Aktiv-Slot existieren 29, mit zwei Slots 32 sinnvoll ausgebbare Punkte
(gegenseitig ausgeschlossene Alternativen bereits abgezogen).
Dadurch bleibt der Baum bis Welle 30 planbar, aber nicht automatisch vollständig.

## Umgesetzter Stand vom 12.08.2026

- Orbitbaum auf wenige verständliche Pfade reduziert; Kurzwerte sind ohne Öffnen der
  Detailansicht direkt am Knoten sichtbar.
- Level und XP stehen im XP-Balken. Fokus zeigt jederzeit Wert/Ziel und bei voller
  Ladung `FOKUS BEREIT`.
- Laufkurve vorsichtig gestrafft: Gegnerzahl ungefähr 10 % reduziert, Spawnintervall
  700 → 580 ms, Boss-Basisleben 1250 → 1150. XP wurde um 10 % angehoben, damit die
  Zahl der Orbitpunkte stabil bleibt. Die Zielkorridore müssen per Spieltest bestätigt
  werden: Entdecker 15–18, Standard 19–23, Meister 23–27 Minuten.
- Soundprofil neu aufgebaut: helle gefilterte Klingen-Sweeps, tiefe Orbitimpulse und
  kurze räumliche Rauschfahnen statt überwiegend rechteckiger Arcade-Töne.
- Das ungenutzte Karten-Level-up einschließlich Overlay, Tauschkaskaden und CSS wurde
  entfernt. Level-ups vergeben nur noch Orbitpunkte.
- Speicherversion 7 entfernt das doppelte Feld `charakter`; alte Werte werden
  verlustfrei nach `figur` übernommen.
- Offensichtliche Canvas-Last reduziert: Im Effekt-Sparmodus werden die teuren
  Gegner-Aura-Gradienten tatsächlich nicht mehr erzeugt; Zeitwerte werden pro Frame
  wiederverwendet.
- Monetarisierung wurde ausdrücklich nicht bearbeitet.

## Nächste Arbeitsreihenfolge

1. Änderungen über GitHub Pages auf Pixel 9 und X1 Carbon praktisch testen.
2. Laufzeiten je Hilfe, erreichte Level/Orbitpunkte und subjektive Klarheit notieren.
3. Erst danach Zahlen feinbalancieren oder weitere Performancearbeit beginnen.
4. Monetarisierung erst behandeln, wenn Kernschleife und Wiederspielwert tragen.

Kein umfangreiches Testnetz aufbauen; das Spiel ist noch nicht produktiv. Nach
Änderungen genügen derzeit proportionale Checks: mindestens
`node --check konzept/game.js` und betroffene Klickwege über GitHub Pages.

## Bekannte Baustellen

- Orbitbaum-Zahlen, A/B-Modifikationen und Entwicklungen sind noch nicht feinbalanciert.
- Echte Klick- und Layouttests erfolgen über GitHub Pages durch den Nutzer.
- Gerätemessung der Performance ist auf den neuen Gesamtstand verschoben.

## Arbeitsregeln

- Vor Änderungen `git status --short` prüfen und fremde Änderungen erhalten.
- Nur unter `konzept/` entwickeln, sofern Infrastruktur nicht ausdrücklich betroffen ist.
- Keine Dateien aus `archive/` zurückkopieren, ohne den Nutzer zu fragen.
- Entscheidungen knapp in diesem Dokument aktualisieren.
- Keine Geheimnisse, Tokens oder personenbezogenen Daten einchecken.
