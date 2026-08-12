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
- Der Skill-Tree ist kompakt in die Tabs `Klinge`, `Kern` und `Mächte` geteilt.
  Klinge und Kern besitzen exklusive Spezialisierungen; aktive Mächte besitzen je
  eine A/B-Modifikation, Meisterschaft, Vollendung und Entwicklung.
- Passive Mächte sind dreistufige Module (Aktivieren, Verstärken, Meistern) mit
  maximal drei belegten Slots. `Sog` entwickelt sich mit `Nachhall` zu
  `Gravitationsbruch`.
- Vorbereitung ist in Charakter, Hilfe und Mächte geteilt. Hangar öffnet direkt die
  kompakte Werkstatt; Werkstatt und Sammlung wechseln über Tabs. Die Sammlung ist
  nach Rekorden, Klinge, Charakteren und Abzeichen gegliedert.

## Charaktere

- **Lichthüter** (`held`): Bewegung verstärkt Sweet-Spot-Treffer, voller Fokus erzeugt
  Barriere, Signatur `Lichtbahn` führt durch Gegner.
- **Leerenklinge** (interne Alt-ID `konstrukt`): fehlendes Leben erhöht Orbittempo
  und Sweet-Spot-Schaden. `Leerenüberladung` opfert Leben und erzeugt zeitweise
  zusätzliche Orbit-Klingen sowie Heilung durch Kills.

Die interne ID `konstrukt` bleibt vorerst wegen bestehender v5-Spielstände.

## Verbindlicher Bauplan: Skill-Tree und kompakte UI

Dieser Abschnitt ist die umgesetzte Spezifikation der beiden Arbeitspakete und
bleibt als Referenz für Balancing und Nachbesserungen erhalten.

### Ziele und Grenzen

- Weiterhin ein Punkt je Level und rund 28–29 Punkte bis Welle 30.
- Ein normaler Lauf soll nur etwa 70–85 % seines gewählten Pfads kaufen können.
- Zahlenknoten sind Einstieg oder Verbindung; spätestens jeder zweite Folgeknoten
  verändert eine Mechanik.
- Maximal drei Passivmodule. Aktive Startmächte bleiben vor dem Lauf festgelegt.
- Entwicklungen bleiben planbar und benötigen aktive Vollendung plus das passende
  aktivierte Passivmodul.
- Kein freies Zoomen, kein großer SVG-Baum und keine langen Kartenlisten auf Mobil.

### Neue Tree-Navigation

Das Tree-Overlay erhält drei Tabs: `Klinge`, `Kern`, `Mächte`. Es wird immer nur ein
Bereich gerendert. Die Tabzeile zeigt den Fortschritt, etwa `Klinge 4/9`.

Ein kompakter, fester Kopf enthält Zurück, `Skill-Tree` und die verfügbaren Punkte.
Der bisherige große Hinweistext sowie der große untere `Weiterkämpfen`-Button
entfallen. Zurück liegt als 44-px-Ziel oben links.

Klinge und Kern erscheinen als vier Ebenen mit höchstens zwei Knoten nebeneinander.
Linien beziehungsweise kurze Pfeile zeigen Abhängigkeiten. Ein Knoten zeigt nur:
Icon, Namen, eine Effektzeile und Zustand. Voraussetzungen erscheinen bei einem
gesperrten Antippen als kurze Meldung, nicht dauerhaft als zusätzliche Textzeile.

### Klinge: zwölf sichtbare Knoten, maximal neun kaufbar

Ebene 1 – gemeinsame Grundlage:

- `Scharfe Kante`: +10 % Klingenschaden.
- `Langer Arm`: +10 % Reichweite.
- `Schneller Orbit`: +10 % Rotationstempo.

Ebene 2:

- `Präzisionsdrall`, benötigt Kante + Orbit: Fokus braucht zwei Treffer weniger.
- Exklusive Wahl `Mehrfachorbit`, benötigt Langer Arm: zwei Orbit-Klingen.
- Exklusive Wahl `Singularorbit`, benötigt Scharfe Kante: nur eine Klinge, schmalerer
  Sweet Spot, dafür deutlich mehr Sweet-Spot-Schaden.

Ebene 3:

- `Panzerbrecher`, benötigt eine der beiden Orbit-Spezialisierungen: Sweet Spot
  ignoriert Panzerung.
- `Synchronlauf`, nur Mehrfachorbit: geringere Verengung der Sweet Spots und etwas
  mehr Rotation.
- `Klingentakt`, nur Singularorbit: jeder dritte Sweet-Spot-Treffer ist verstärkt.
- `Nachsetzen`, benötigt Präzisionsdrall: aktive Macht gibt kurz Bewegungstempo.

Ebene 4 – exklusive Endknoten:

- `Dreifachklinge`, benötigt Mehrfachorbit + Synchronlauf + Panzerbrecher.
- `Perfekter Orbit`, benötigt Singularorbit + Klingentakt + Panzerbrecher: verstärkte
  Treffer laden Fokus doppelt.

`Mehrfachorbit` und `Singularorbit` sowie ihre Endknoten schließen einander aus. Der
Tree benötigt dafür `exclusiveGroup` und zusätzlich zu `reqAll` ein `reqAny`.

### Kern: zwölf Knoten je Charakter, maximal neun kaufbar

Sechs gemeinsame Grundlagen bleiben: Max-Leben, Bewegung, Barrierenkapazität,
Regeneration, schnellerer Fokus und kürzere Signatur-Abklingzeit. Danach folgen zwei
exklusive Charakterrouten mit je zwei Folgeknoten und einem Endknoten. So verändert
der Kern tatsächlich die Spielfigur.

Lichthüter:

- Route `Wächter`: stärkere Fokus-Barriere verlangsamt nahe Gegner → ein Teil
  überschüssiger Barriere bleibt nach Bossheilung → Endknoten `Leuchtfeuer`
  (voller Fokus schützt stark, aber offensiver Bonus bleibt normal).
- Route `Strahlenreiter`: Lichtbahn-CD durch Sweet-Spot-Treffer senken → längere und
  breitere Lichtbahn hinterlässt kurz eine schädigende Energiespur →
  Endknoten `Sonnenpfad` (zweite Ladung, geringere Einzelschadensspitze).

Leerenklinge:

- Route `Verschlinger`: günstigere Überladung und stärkere Heilung → Überladung
  verlängert sich begrenzt durch Kills → Endknoten `Satter Abgrund`
  (sicherer, weniger maximaler Risikobonus).
- Route `Abgrund`: mehr Schaden bei niedrigem Leben → Überladung erzeugt drei Klingen
  und unter 35 % Leben einen schmaleren, stärkeren Sweet Spot → Endknoten
  `Ereignishorizont` (höchster Schaden, Heilung aus Überladung stark reduziert).

Die beiden Charakterrouten schließen einander aus. Namen und Zahlen dürfen beim
Balancing angepasst werden; Rollen, Abhängigkeiten und Risiko bleiben verbindlich.

### Mächte: Aktivpfade plus Passivmodule

Keine flache Liste aller Stufen mehr.

Für jede ausgerüstete aktive Macht erscheint eine kompakte Leiste:

1. `Verstärkung` setzt die Macht auf Stufe 2.
2. Eine exklusive Modifikation A oder B setzt Stufe 3 und verändert das Verhalten.
3. `Meisterschaft` setzt Stufe 4 und aktiviert den heutigen mechanischen Sprung.
4. `Vollendung` setzt Stufe 5.
5. `Entwicklung` benötigt Vollendung und das passende Passivmodul.

Pro aktiver Macht sind damit sechs Felder sichtbar, aber maximal fünf kaufbar. Die
exklusiven Modifikationen sind:

- `Wirbel`: Gegner während des Wirbels heranziehen **oder** eine kurz bleibende
  rotierende Schadenszone hinterlassen.
- `Schock`: weggestoßene Gegner verursachen Kollisionsschaden **oder** die Welle
  hinterlässt ein kurzes verlangsamendes Feld.
- `Bombe`: haftet am nächsten Gegner **oder** kann durch erneuten Tastendruck vorzeitig
  gezündet werden.
- `Nova`: Treffer laden etwas Barriere **oder** nach der Nova treffen gezielte Bögen
  die nächsten Gegner.
- `Sog`: Gegner kurz auf Klingenreichweite festhalten **oder** sie kurz um den Spieler
  kreisen lassen, bevor sie freikommen.

Die heutige Stufe-4-Mechanik bleibt jeweils die Meisterschaft und darf sich nicht mit
der A/B-Modifikation doppeln.

Vor den Aktivleisten liegen zwei gemeinsame Mächte-Knoten: `Machtfluss` reduziert
aktive Abklingzeiten leicht, `Fokusentladung` verstärkt den Fokusbonus aktiver Mächte.
Sie schaffen eine echte Wurzel und zwei weitere sinnvolle Investitionen.

Passives erscheinen als sieben kompakte Module, nicht als 35 Einzelknoten. Jedes
Modul hat drei Käufe innerhalb derselben Karte:

1. Aktivieren: Stufe 1 und belegt einen der drei Slots.
2. Verstärken: direkt auf Stufe 3, deutlicher Zahlen- und Reichweitenschritt.
3. Meistern: direkt auf Stufe 5 und aktiviert den heutigen Stufe-4-Sprung.

Nur aktivierte Module zeigen die zwei Folgekäufe. Dadurch sind beim Öffnen höchstens
sieben Passivkarten plus die Leisten der ausgerüsteten Mächte sichtbar. Modulwurzeln
bleiben über einfache Brücken an Klinge oder Kern gebunden, damit die drei Bereiche
zusammenhängen. Entwicklungen benötigen nur das aktivierte passende Modul, nicht
dessen Meisterung.

Die Brücken sind fest vorgegeben und werden als kleine Herkunftsmarke am Modul
angezeigt:

- `Kettenblitz` benötigt `Schneller Orbit`.
- `Konterstoß` benötigt `Barrierenkapazität`.
- `Splitter` benötigt `Langer Arm`.
- `Phaser` benötigt `Bewegung`.
- `Lebensregen` benötigt `Regeneration`.
- `Schneide` benötigt `Scharfe Kante`.
- `Nachhall` benötigt `Präzisionsdrall`.

Die fünf Entwicklungspaare sind ebenfalls verbindlich: `Wirbel + Splitter`,
`Schock + Kettenblitz`, `Bombe + Konterstoß`, `Nova + Phaser` und
`Sog + Nachhall`. Die Entwicklung erscheint schon vor Erfüllung kompakt am Ende
des Aktivpfads, damit der Spieler sein Ziel früh planen kann.

Neue fünfte Entwicklung:

- `Gravitationsbruch`: `Sog` Stufe 5 + `Nachhall`. Herangezogene Gegner kreisen kurz
  eng um den Spieler, werden von der Orbit-Klinge erreichbar gehalten und lösen am
  Ende eine gemeinsame Nachhall-Druckwelle aus.

Punktökonomie: Klinge maximal 9, Kern maximal 9, gemeinsame Mächte 2, ein Aktivpfad
5 und drei gemeisterte Passivmodule 9 Punkte. Mit einem Aktiv-Slot existieren damit
rund 34 sinnvolle Käufe, mit zwei Slots rund 39. Bei 28–29 Punkten bleibt jeder Lauf
unvollständig und unterscheidbar.

### Benötigtes Tree-Datenmodell

Knotendefinitionen erhalten mindestens `tier`, `lane`, `reqAll`, `reqAny`,
`exclusiveGroup`, `hiddenUntil` und `apply`. Passivmodule werden als eigene
strukturierte Komponente gerendert. Weit entfernte oder noch nicht dauerhaft
freigeschaltete Inhalte dürfen kompakt als Schloss sichtbar bleiben, sollen aber
nicht fünf leere Folgestufen erzeugen.

### Kompaktes UI-System

Touch-Sicherheit und visuelle Größe werden getrennt: interaktive Ziele bleiben
mindestens 44 × 44 CSS-Pixel, die sichtbare Fläche darf 36–40 px groß sein.

Gemeinsam für alle großen Overlays:

- fester Kopf von ungefähr 48 px mit Zurück, Titel und Kontextwert;
- optional eine 40-px-Tabzeile;
- nur der Inhaltsbereich scrollt;
- keine große Zurück-Schaltfläche am unteren Rand;
- wiederholte Untertitel und Erklärblöcke entfernen; Details nur im Codex oder nach
  Auswahl zeigen;
- Abstände meist 6–8 px statt 10–16 px, Schrift nicht kleiner als 11 px.

Skill-Tree:

- Tabs statt drei gleichzeitig gestapelter Spalten.
- Knoten ungefähr 52–60 px hoch, zwei Spalten bereits ab etwa 360 px Breite.
- Kaufbereit, gekauft, gesperrt und exklusiv blockiert primär über Farbe und Icon.
- Mindestens sechs Knoten müssen auf einem Pixel-9-Hochformat ohne Scrollen sichtbar
  sein; Ziel sind acht.

Hangar und Werkstatt:

- Der Zwischenbildschirm mit zwei riesigen Hangar-Schaltflächen entfällt. Hangar
  öffnet eine Seite mit Tabs `Werkstatt` und `Sammlung`.
- Die drei Werkstattkäufe erscheinen als kompakte Zeilen: Icon links, Name und eine
  kurze Effektzeile mittig, Preis beziehungsweise Haken rechts.
- Alle drei Werkstattkäufe und das Fragmentkonto müssen auf einem normalen Handy ohne
  Scrollen sichtbar sein. Fortschrittsbalken nur für den mehrstufigen Begleiter.

Vorbereitung:

- Tabs `Charakter`, `Hilfe`, `Mächte` statt drei langer Abschnitte untereinander.
- Charakter: zwei kompakte Karten nebeneinander; nur der ausgewählte Charakter zeigt
  darunter ausführliche Stärke, Nachteil und Werte.
- Hilfe: drei kompakte Wahlfelder mit Name, Schadensfaktor, Gegnerfaktor und
  Bestmarke; die lange Erklärung steht einmal oberhalb oder hinter Info.
- Mächte: beide Slots nebeneinander, Tippen öffnet die kompakte Auswahl.
- Der aktuelle Tab soll auf einem normalen Handy ohne Scrollen bedienbar sein.

Sammlung:

- Tabs `Rekorde`, `Klinge`, `Charaktere`, `Abzeichen`.
- `Klinge` bündelt Farbe und Form; kompakte Vorschau-Kacheln in mindestens drei
  Spalten auf Pixel 9.
- Abzeichen als kleine Medaillenraster; Beschreibung erst nach Auswahl.
- Pro Tab mindestens sechs Sammlungsobjekte ohne Scrollen sichtbar.

Allgemeine Menüknöpfe dürfen auf 44 px Mindesthöhe sinken. Die drei Kampffähigkeiten
bleiben vorerst unverändert, weil sie blind während der Bewegung getroffen werden
müssen; ihre Größe wird erst nach einem separaten Touchtest reduziert.

### Abnahmekriterien für Arbeitspakete 1 und 2

- Kein Tree-Bereich zeigt eine lange fünfstufige Kartenserie.
- Ein Pfadwechsel ist durch sichtbare Abhängigkeiten und exklusive Entscheidungen
  verständlich; keine Sackgasse ohne erklärten Grund.
- Jede der fünf aktiven Mächte besitzt eine erreichbare Entwicklung.
- Maximal drei Passivmodule und maximal eine Spezialisierung je Exklusivgruppe.
- Rund 28–29 Punkte können immer sinnvoll ausgegeben werden.
- Tree: mindestens sechs sichtbare Knoten im Pixel-9-Hochformat.
- Werkstatt: drei Käufe ohne Scrollen sichtbar.
- Vorbereitung: je Tab ohne Scrollzwang bedienbar.
- Sammlung: mindestens sechs Objekte je Tab sichtbar.
- Keine horizontale Seitenscrollleiste, kein Text unter 11 px, Touchziele mindestens
  44 × 44 px.
- Desktop und Handyquerformat nutzen zusätzliche Breite, ohne Karten künstlich hoch
  zu halten.
- Nach Umsetzung: Syntaxcheck, Browserstart und kurze Klickwege; kein Testnetz bauen.

## Weitere Arbeitsreihenfolge

1. Laufdauer und Balance der neuen Tree-Fassung abstimmen.
2. Sounddesign auf Orbit, Weltraum und Energieklinge umstellen.
3. Altlasten entfernen: Karten-Code, `charakter`/`figur`, falsche Texte und Kommentare.
4. Gesamte neue Version plausibilisieren.
5. Erst danach Performancevergleich auf Pixel 9 und X1 Carbon durchführen.
6. Monetarisierung erst behandeln, wenn Kernschleife und Wiederspielwert tragen.

Kein umfangreiches Testnetz aufbauen; das Spiel ist noch nicht produktiv. Nach
Änderungen genügen derzeit proportionale Plausibilitätsprüfungen: mindestens
`node --check konzept/game.js`, Browserstart und betroffene Spielflüsse kurz testen.

## Bekannte Baustellen

- Der alte Karten-Code ist ungenutzt, aber noch vorhanden.
- Läufe sind momentan vermutlich zu lang; Zielkorridore: Entdecker 15–18,
  Standard 19–23, Meister 23–27 Minuten.
- Gerätemessung der Performance ist bewusst auf den neuen Gesamtstand verschoben.
- Die finalen Tree-Zahlen und Charakterrouten brauchen Spieltests; insbesondere
  A/B-Modifikationen und `Gravitationsbruch` sind bewusst noch nicht feinbalanciert.

## Arbeitsregeln

- Vor Änderungen `git status --short` prüfen und fremde Änderungen erhalten.
- Nur unter `konzept/` entwickeln, sofern Infrastruktur nicht ausdrücklich betroffen ist.
- Keine Dateien aus `archive/` zurückkopieren, ohne den Nutzer zu fragen.
- Änderungen und Entscheidungen knapp in diesem Dokument aktualisieren.
- Keine Geheimnisse, Tokens oder personenbezogenen Daten einchecken.
