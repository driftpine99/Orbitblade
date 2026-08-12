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
- Kleine runde Knoten sind sinnvolle Buffs auf dem Weg und besitzen teils 2–3 Ränge.
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
2. zweistufigen Abklingzeit-Buff;
3. passendes dreistufiges Passivmodul;
4. Meisterschaft mit mechanischem Stufe-4-Sprung;
5. zweistufige Resonanz für Machtschaden;
6. Vollendung auf Stufe 5;
7. Entwicklung.

Entwicklungspaare:

- Wirbel + Splitter → Sturmwirbel
- Schock + Kettenblitz → Kettengewitter
- Bombe + Konterstoß → Streubombe
- Nova + Phaser → Nova-Kaskade
- Sog + Nachhall → Gravitationsbruch

### Mittelstamm

- Mehrfachorbit oder Singularorbit
- Klingenschliff und Orbitfluss als mehrstufige Wegverstärker
- pro Charakter zwei exklusive Routen mit Folgeknoten
- Fokuskern und Resonanzpanzer
- charakterabhängige Endknoten und die `Orbitkrone` als Klingenabschluss

Mit einem Aktiv-Slot existieren etwa 32, mit zwei Slots etwa 38 sinnvoll ausgebbare
Punkte. Ein Weg benötigt jeweils nur Rang 1 eines Buffs; weitere Ränge sind freiwillige
Spezialisierung. Dadurch bleibt der Baum bis Welle 30 unvollständig, ohne Sackgasse.

## Nächste Arbeitsreihenfolge

1. Orbitbaum auf Handy und Desktop spielerisch testen und nach Feedback korrigieren.
2. Laufdauer und Balance abstimmen; Zielkorridore: Entdecker 15–18, Standard 19–23,
   Meister 23–27 Minuten.
3. Sounddesign auf Orbit, Weltraum und Energieklinge umstellen.
4. Altlasten entfernen: ungenutzter Karten-Code und `charakter`/`figur`.
5. Gesamte neue Version plausibilisieren.
6. Danach Performancevergleich auf Pixel 9 und X1 Carbon.
7. Monetarisierung erst behandeln, wenn Kernschleife und Wiederspielwert tragen.

Kein umfangreiches Testnetz aufbauen; das Spiel ist noch nicht produktiv. Nach
Änderungen genügen derzeit proportionale Checks: mindestens
`node --check konzept/game.js`, lokaler Serverstart und betroffene Klickwege.

## Bekannte Baustellen

- Orbitbaum-Zahlen, A/B-Modifikationen und Entwicklungen sind noch nicht feinbalanciert.
- Die Browserumgebung des Coding-Agenten kann den lokalen Windows-Server nicht direkt
  erreichen; echte Klick- und Layouttests erfolgen deshalb durch den Nutzer.
- Der alte Karten-Code ist ungenutzt, aber noch vorhanden.
- Gerätemessung der Performance ist auf den neuen Gesamtstand verschoben.

## Arbeitsregeln

- Vor Änderungen `git status --short` prüfen und fremde Änderungen erhalten.
- Nur unter `konzept/` entwickeln, sofern Infrastruktur nicht ausdrücklich betroffen ist.
- Keine Dateien aus `archive/` zurückkopieren, ohne den Nutzer zu fragen.
- Entscheidungen knapp in diesem Dokument aktualisieren.
- Keine Geheimnisse, Tokens oder personenbezogenen Daten einchecken.
