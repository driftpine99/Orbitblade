# Orbitblade v5 – Grundkonzept, Analyse und Entscheidungsstand

Stand: 11. August 2026, nach dem ersten Nutzertest und der ersten vollständigen
Umbauetappe von v5.

## 1. Status und Zweck dieses Dokuments

Der Nutzer hat entschieden, die isolierte v5 als neues Grundkonzept
weiterzuentwickeln. v5 ist damit nicht mehr nur ein wegwerfbarer Konzeptversuch.
Sie ist aber weiterhin eine Testfassung und noch nicht an die Stelle der stabilen v4
im Projektstamm getreten.

Dieses Dokument trennt bewusst:

- **Implementiert:** Was heute tatsächlich in v5 existiert.
- **Beschlossen:** Welche Richtung der Nutzer ausdrücklich festgelegt hat.
- **Empfohlen:** Der momentan beste Entwurf, der noch bestätigt werden muss.
- **Offen:** Fragen, deren Antwort Architektur oder Spielgefühl wesentlich ändert.

## Aktueller Umsetzungsstand (11.08.2026)

Die beschlossene erste Umbauetappe ist in `konzept/` umgesetzt und ersetzt im
normalen Spielablauf die frühere Kartenwahl. Die v4 im Projektstamm und der Snapshot
bleiben unverändert.

| Bereich | Tatsächlicher Stand | Hintergrund der Entscheidung |
|---|---|---|
| Performance | DPR auf 1,5 (Touch) bzw. 2 (Desktop) begrenzt, Sparmodus skaliert weiter herunter, HUD auf 10 Updates/s begrenzt, Zeichenoperationen außerhalb des Viewports ausgelassen, Diagnose mit `?perf=1` eingebaut | Die Tests sprechen für anhaltende Render-/Fillrate-Last, nicht nur für einen einzelnen Gegnerpeak. Eine Geräte-Messung steht noch aus. |
| Gegner | Gewichtete Auswahl repariert: Panzer verdrängen Exploder und Jäger nicht mehr | Panzer bleiben als positives Element, die alte Verdrängung war ein Zufallslogikfehler. |
| Lauf-Fortschritt | Tree beginnt leer; jeder Level bringt einen Punkt. Neue XP-Kurve `140 + Level × 120`, XP ist auf die Hilfs-Gegnerzahl normiert | Simulation ergibt rund 29 Punkte bis Welle 30 auf allen drei Hilfsstufen. |
| Skill-Tree | Drei Zweige: Klinge, Kern, Mächte. Feste Voraussetzungen; aktive Startmächte bis Stufe 5, Passives bis Stufe 5, Entwicklungen über aktive Stufe 5 + passives Fundament | Entscheidungen sollen sichtbar und nicht mehr im Minutentakt erzwungen sein. |
| Charaktere | Lichthüter: Bewegungssweetspot, Fokus-Barriere und Lichtbahn. Leerenklinge: stärker/schneller bei fehlendem Leben, riskante Überladung mit zusätzlichen Orbit-Klingen und Lebensraub. Je zwei exklusive Kernknoten | Beide spielen vollständig über die Orbit-Klinge, aber mit Kontrolle/Schutz versus Risiko/Aggression. |
| Menü/Meta | Start: Spielen, Vorbereitung, Hangar. Hangar bündelt Werkstatt/Sammlung. Werkstatt: zweiter Slot, Startimpuls, Begleiter; Prozentwerte entfernt | Erst Spielspaß und faire Builds, anschließend langfristige Motivation. |
| Speicher | `SAVE_VERSION` 6. Beim Übergang werden alte Prozent- und Neu-Würfeln-Käufe in Fragmente erstattet; Slot 2, Vorsprung→Startimpuls und Begleiter bleiben | Kein ausgegebenes Fragment soll durch den Konzeptwechsel verschwinden. |

### Verifikation der Umbauetappe

- `node --check konzept/game.js`: bestanden.
- Statischer DOM-Abgleich: alle statischen `getElementById`-Ziele sind vorhanden;
  `cd-a` und `cd-b` werden bewusst erst beim Aufbau der Aktivknöpfe erzeugt.
- Die XP-Simulation ergab: Entdecker W30 28,8; Standard 28,8; Meister 29,0 Levels
  beziehungsweise Skillpunkte (vollständig eingesammelte Erfahrung).
- Es gibt noch keinen automatisierten Browser- oder Gerätebenchmark. Der nächste
  reale Test muss `konzept/index.html?perf=1` auf Pixel 9 und X1 Carbon gegen v4
  vergleichen.

### Hotfix 12.08.2026: Startmenü ohne Funktion

`resize()` wurde beim Laden ausgeführt, bevor die mit `let` deklarierte Variable
`sparmodus` initialisiert war. Der daraus entstehende `ReferenceError` beendete das
Skript vor der Registrierung sämtlicher Menü-Handler. `sparmodus` wird nun zusammen
mit dem übrigen Laufzustand vor dem ersten `resize()` initialisiert.

Im Browser geprüft: Spielstart, Vorbereitung, Hangar, Werkstatt, Sammlung, Hilfe und
Einstellungen einschließlich ihrer Rückwege. Ein frischer Seitenaufruf erzeugt keine
Warnungen oder Fehler in der Konsole.

## 2. Versionslandkarte und Sicherung

| Pfad | Bedeutung |
|---|---|
| `/index.html`, `/style.css`, `/game.js` | stabile v4, Speicherstand v4 unter `orbitblade_save` |
| `/konzept/` | getestete v5-Arbeitsfassung, separater Speicherstand v5 unter `orbitblade_konzept_save` |
| `/snapshots/v5-grundkonzept-vor-umbau-2026-08-11/` | bytegenaue Sicherung der v5 vor dem neuen Umbau |

Der Snapshot ist die Rückfallebene, weil das Projekt kein Git-Repository besitzt.

## 3. Produktkern

Orbitblade ist ein mobile-first Arena-Roguelite mit automatischem Angriff. Der
Spieler steuert Bewegung und Positionierung. Die Klinge rotiert permanent:

- Eine Rundumzone verursacht verzeihenden Grundschaden.
- Die echte sichtbare Klingenposition ist der Sweet Spot und verursacht erheblich
  mehr Schaden.
- Aktive Mächte werden manuell ausgelöst.
- Gegner kommen in Wellen; jede fünfte Welle ist ein Boss.
- Fortschritt im Lauf und dauerhafter Werkstattfortschritt liegen derzeit nebeneinander.
- Welle 30 ist in v5 ein Siegpunkt, danach kann der Spieler endlos weiterspielen.

Zielgruppe: Kinder sollen den Einstieg schaffen; Jugendliche und Erwachsene sollen
genug Beherrschung, Builds und Langzeitziele finden. Hilfen geben Rückenwind, sperren
aber keine Inhalte.

## 4. Was v5 gegenüber v4 bereits implementiert

- Sieg in Welle 30 gegen den „Zerbrochenen Mond“ und anschließender Endlosmodus.
- Drei Hilfsstufen mit getrennten Bestmarken.
- Fokus-Leiste: Sweet-Spot-Treffer laden einen Bonus für die nächste aktive Macht.
- Gepanzerte Gegner, die außerhalb des Sweet Spots den Großteil des Klingenschadens
  abfangen.
- Mit steigender Klingenzahl schmaler werdende Sweet-Spot-Zonen.
- Drei zufällige Laufziele mit Fragmentbelohnungen.
- Zwei Figuren mit Wertemodifikatoren und kleinen Sonderregeln.
- Neue Mächte `Sog`, `Schneide` und `Nachhall`.
- Eigener v5-Speicherschlüssel und Migration auf Speicherstandsversion 5.

## 5. Ergebnis des ersten Nutzertests

Direktes Nutzerfeedback:

- v5 soll die neue Basis werden.
- Gepanzerte Gegner funktionieren sehr gut und sollen bleiben.
- Die Kartenwahl bei jedem Level-Up ist unglücklich und stört den Spielfluss.
- Gewünscht ist ein Skill-Tree mit festen Pfadabhängigkeiten, einem Punkt je Level
  und einem kleinen Button im laufenden Spiel.
- v5 ruckelt erheblich stärker als v4.
- Die Charakterunterschiede sind zu marginal; eigene Fähigkeiten pro Charakter
  werden erwogen.
- Das Menü ist unübersichtlich.

### Nachbesprechung und bestätigte Entscheidungen

- Die XP-Kurve darf auf ungefähr 24 bis 32 Skillpunkte bis Welle 30 verlangsamt
  werden.
- Aktive Mächte werden weiter vor dem Lauf gewählt und im Tree verbessert.
- Passive Mächte kommen über den Tree.
- Auch die heutigen Super-Mächte/Entwicklungen – aktive Macht plus passende passive
  Macht – werden als abhängige Ziele in den Tree aufgenommen.
- Zunächst werden nur Klingenläufer und Konstrukt ausgearbeitet, dafür aber wirklich
  unterschiedlich: gemeinsamer Grundkern, eigene Mechanik, eigene aktive Fähigkeit
  und exklusive Tree-Knoten.
- Permanente Prozent-Upgrades der Werkstatt werden zugunsten mechanischer
  Freischaltungen und Komfort reduziert beziehungsweise entfernt.
- „Spielen“ startet sofort mit der zuletzt gewählten Konfiguration. Vorbereitung
  bleibt separat; Werkstatt und Sammlung werden im Hangar zusammengeführt.
- Der isolierte v5-Testspielstand darf beim kommenden Grundumbau zurückgesetzt werden.
- Der Tree ist ausdrücklich laufgebunden: Jeder neue Lauf beginnt mit einem leeren
  Tree. Dauerhafte Freischaltungen und Werkstattfortschritt bleiben erhalten.

## 6. Analyse der heutigen Levelökonomie

Die aktuelle XP-Kurve wurde für häufige Kartenentscheidungen gebaut, nicht für einen
kleinen Skill-Tree:

- Start auf Level 1, erster Aufstieg nach 50 XP.
- Danach kostet der nächste Aufstieg `50 + Level × 20` XP.
- Jeder Kill gibt direkt XP; zusätzliche XP-Orbs fallen häufig oder garantiert.
- Mehr Gegner durch eine Hilfsstufe bedeuten heute zugleich mehr XP und mehr Level.

Eine Monte-Carlo-Näherung über die aktuellen Spawn-, Gegnertyp-, XP- und Orb-Regeln
ergibt bei vollständigem Einsammeln ungefähr folgende Levelstände. Der Werkstattkauf
„Vorsprung“ ist nicht eingerechnet:

| Hilfsstufe | W5 | W10 | W15 | W20 | W25 | W30 | Gegner bis W30 |
|---|---:|---:|---:|---:|---:|---:|---:|
| Entdecker | 7 | 16 | 25 | 35 | 46 | 58 | ca. 1.103 |
| Standard | 9 | 19 | 30 | 42 | 55 | 69 | ca. 1.580 |
| Meister | 10 | 22 | 34 | 48 | 62 | 78 | ca. 1.973 |

Bei „ein Punkt pro Level-Up“ wären das bis Welle 30 ungefähr 57, 68 bzw. 77 Punkte.
Das hat drei Folgen:

1. Ein kleiner Tree mit beispielsweise 15 bis 25 Knoten wäre lange vor Welle 30
   vollständig ausgebaut.
2. Viele Mehrfachränge würden den Tree wieder zu einer flachen Prozentleiter machen.
3. Entdecker bekäme weniger Build-Macht und Meister mehr Build-Macht. Das ist ein
   versteckter Einfluss der Hilfsstufe auf den Build und muss bewusst gewollt oder
   normalisiert werden.

### Beschlossene Richtung

Das Versprechen „ein Level = ein Punkt“ bleibt erhalten, weil es sofort verständlich
ist. Die XP-Kurve wird dafür auf den Tree neu abgestimmt. Der bestätigte erste
Zielkorridor sind etwa 24 bis 32 verteilbare Punkte bis Welle 30. Der genaue Wert
hängt von Größe und Rangzahl des Papierprototyps ab.

XP beziehungsweise Punktfortschritt sollte zwischen den Hilfsstufen weitgehend
normalisiert werden. Hilfen dürfen sich im Kampf anders anfühlen, sollten aber keinen
Charakter mit weniger Entwicklungsstufen erzeugen.

## 7. Skill-Tree: empfohlener Entwurf

### Beschlossen beziehungsweise ausdrücklich gewünscht

- laufgebundener Aufbau anstelle eines Karten-Overlays bei jedem Level-Up;
- ein Punkt je Level;
- stärkere, sichtbare Pfadabhängigkeiten;
- kleiner HUD-Button im laufenden Spiel;
- Punkte dürfen voraussichtlich gesammelt und später verteilt werden.
- aktive Mächte werden vor dem Lauf gewählt und im Tree verbessert;
- passive Mächte und die Kombinationen zu Super-Mächten liegen im Tree.

### Beschlossener Laufcharakter und ergänzende Empfehlungen

- Der Tree setzt sich pro Lauf zurück; die Werkstatt bleibt permanente Progression.
- Das Spiel pausiert nur, wenn der Spieler den Tree freiwillig öffnet.
- Der Button erscheint kompakt und trägt lediglich die Zahl unverteilter Punkte.
- Auf dem Handy muss der komplette Hauptbaum ohne freies Zoomen verständlich sein.
- Drei Zweige sind die Obergrenze für die erste Fassung.
- Verbindungen dürfen kleine Werte tragen, aber jeder dritte oder vierte Knoten muss
  eine Mechanik verändern.
- Bosswellen können weiterhin besondere Höhepunkte liefern, beispielsweise einen
  seltenen Mutator oder eine Entwicklung. Damit bleibt etwas Laufvariation erhalten,
  ohne alle paar Sekunden eine Kartenauswahl zu erzwingen.

### Mögliche Struktur

1. **Klinge:** Schaden/Reichweite als Verbindungen, Doppelklinge, veränderte
   Sweet-Spot-Geometrie, Panzerungsdurchschlag als Schlüsselknoten.
2. **Charakterkern:** Bewegung/Überleben plus die exklusive Mechanik des Charakters.
3. **Mächte:** Modifikationen der vor dem Lauf gewählten aktiven Macht oder Mächte.

### Systeme, die der Tree ablösen oder aufnehmen muss

- generische Karten für Schaden, Reichweite und Rotation;
- Erwerb und Steigerung passiver Mächte;
- Steigerung aktiver Mächte von Stufe 1 bis 5;
- Doppel- und Dreifachklinge;
- vier heutige Entwicklungen;
- Rückfallkarten für ausgereizte Kartenpools;
- Neu-Würfeln aus der Werkstatt.

Das ist kein rein visueller Austausch des Level-Up-Overlays. Der Tree verändert die
Datenstruktur von `runAbilities`, `runEvolutions`, `takenUpgrades`, `bonuses` und den
Werkstattkauf `reroll`. Vor der Implementierung muss feststehen, welche dieser
Konzepte weiterbestehen.

## 8. Charakteridentität

### Heutiger Zustand

`Klingenläufer` und `Konstrukt` verwenden denselben Kampf- und Fähigkeitenkern. Ihre
Unterschiede sind Multiplikatoren:

- Klingenläufer: 115 % Leben, normale Geschwindigkeit/Reichweite, Fokus nach 12
  Treffern, doppelter Barriereaufbau.
- Konstrukt: 80 % Leben, 118 % Geschwindigkeit, 92 % Reichweite, Fokus ungefähr nach
  8 Treffern, normaler Barriereaufbau.

Das ist rechnerisch relevant, verändert aber die Tätigkeiten des Spielers kaum.

### Empfohlene Identitätsregel

Jeder Charakter benötigt mindestens:

1. eine dauerhaft spürbare Grundmechanik;
2. eine exklusive aktive Fähigkeit oder eine klar andere Ausführung einer Fähigkeit;
3. einen exklusiven Tree-Zweig beziehungsweise mehrere exklusive Schlüsselknoten;
4. einen sichtbaren Nachteil, der die Stärke begrenzt.

Mögliche Rollen:

- **Klingenläufer:** Präzision und Sweet-Spot-Ketten; Fokus ist sein Kern.
- **Konstrukt:** Drohnen, Distanzfeuer und Überladung; Fokus könnte durch eine eigene
  Energieressource ersetzt werden.
- **Späterer Wächter:** langsam, große Klinge und Barriere/Blocken; kann Bedrohungen
  abfangen oder zurückwerfen.

Empfohlen wird zunächst ein Hybrid statt vollständig getrennter Inhaltswelten:
gemeinsame Grundregeln und einige gemeinsame Mächte, aber ein exklusiver Kern, eine
exklusive aktive Macht und charaktereigene Tree-Knoten. Vollständig getrennte Kits
würden Inhalts- und Balanceaufwand sofort vervielfachen.

## 9. Menü und Informationsarchitektur

Der heutige Startbildschirm zeigt bis zu sechs ähnlich gewichtete Aktionen:
Spielen, Info, Vorbereitung/Startmächte, Werkstatt, Sammlung und Einstellungen.
Zusätzlich ist „Vor dem Lauf“ ein langer Scrollbereich für Charakter, Hilfe und
Startmächte. Die progressive Sichtbarkeit reduziert anfangs Elemente, löst aber die
grundsätzliche Hierarchie nicht.

Empfohlene erste Struktur:

1. **Spielen** – startet sofort mit der zuletzt gespeicherten Konfiguration.
2. **Vorbereitung** – Charakter, aktive Mächte und Hilfsstufe.
3. **Hangar** – Werkstatt und Sammlung als zwei Reiter.
4. Hilfe und Einstellungen – kleine, klar erkennbare Symbolaktionen.

Die ausführliche Anleitung sollte zugunsten kontextueller Erklärungen im ersten Lauf
zurücktreten. Das Menü darf nicht bei jedem Start dieselbe Konfiguration erneut
erzwingen.

## 10. Performanceanalyse v4 gegen v5

Die starke Regression ist durch den Quellvergleich noch nicht eindeutig erklärt.
Deshalb ist Messen zwingend. Plausible zusätzliche v5-Kosten sind:

- Fokusbreite und Fokusklasse werden im HUD-Update pro Frame gesetzt.
- Der Laufzielstand wird pro Frame zusammengesetzt und geprüft; bei Änderungen wird
  DOM neu aufgebaut.
- `Nachhall` iteriert bei jedem ausgelösten Trefferereignis erneut über alle Gegner.
- Panzer haben viel Leben und reduzieren außerhalb des Sweet Spots den Schaden. Sie
  können dadurch die Zahl gleichzeitig lebender Gegner erhöhen.
- Meister erzeugt zusätzlich 25 % mehr Gegner und Panzer bereits ab Welle 5.

Teure Altlasten, die auch v4 besitzt und durch mehr gleichzeitig lebende Gegner
stärker sichtbar werden:

- keine Zeichen-Culling-Prüfung für Gegner außerhalb des Viewports;
- neue radiale Aura-Verläufe pro Gegner und Frame;
- Canvasauflösung folgt ungekappt `devicePixelRatio`;
- zahlreiche vollständige Gegnerlistensuchen für Phaser, Begleiter, Splitter,
  Kettenblitz, Explosionen und aktive Mächte;
- DOM-HUD-Aktualisierung im normalen Framepfad.

### Messplan vor Optimierungen

Ein temporäres Diagnose-HUD soll mindestens erfassen:

- FPS und mittlere/95%-Framezeit;
- getrennte Millisekunden für `update()` und `draw()`;
- Canvasgröße, CSS-Größe und DPR;
- Gegner, sichtbare Gegner, Partikel, Schadenszahlen und Projektile;
- Hilfsstufe, Welle, Charakter und getragene Mächte;
- Zustand von `sparmodus` und `fxAn`.

Für A/B-Tests braucht es möglichst dieselbe Zufallsfolge beziehungsweise ein kleines
reproduzierbares Belastungsszenario. Erst danach werden Maßnahmen priorisiert.

### Gemeldete Zielgeräte und Verlauf

- **Google Pixel 9:** Im ersten Testlauf begann das Ruckeln später, im zweiten Lauf
  bereits in den ersten Wellen.
- **Lenovo X1 Carbon, Intel 10. Generation:** Bis ungefähr Welle 21 flüssig, der Lüfter
  wurde jedoch deutlich laut.

Dass ein Folgelauf auf dem Pixel früher einbricht und der Laptop stark aufdreht,
spricht als Arbeitshypothese für dauerhaft hohe GPU-/Fillrate-Last mit Erwärmung und
eventueller thermischer Drosselung. Ein reines Problem der Gegnerzahl ist damit nicht
ausgeschlossen, erklärt den frühen zweiten Pixel-Lauf aber allein nicht. Besonders
zu messen sind Canvas-Pixelzahl/DPR, Zeit in `draw()`, Gegner-Auragradienten und der
Verlauf über mehrere direkt aufeinanderfolgende Läufe.

Naheliegende Maßnahmen nach der Messung:

1. HUD über Dirty Flags oder höchstens 10-mal pro Sekunde aktualisieren.
2. Offscreen-Culling für Zeichenoperationen.
3. Render-DPR auf einem mobilen Zielwert begrenzen oder dynamisch absenken.
4. Gegner-Auren cachen oder im Sparmodus ganz weglassen.
5. `Nachhall` und Zielsuche über das bestehende Raumraster abwickeln.

## 11. Weitere gefundene technische Auffälligkeiten

### Gegnerverteilung nach Auftreten der Panzer

`randomEnemyType()` verwendet eine einzige Zufallszahl und prüft zuerst:

```text
wenn r < 0,22 -> Panzer
danach wenn r < Exploder-Schwelle -> Exploder
danach wenn r < Jäger-Schwelle -> Jäger
```

Die Exploder-Schwelle liegt maximal bei 0,126 und wird damit nach Aktivierung der
Panzer nie erreicht. Jäger erscheinen spät nur noch im kleinen Bereich ungefähr
0,22 bis 0,28. Gepanzerte Gegner selbst sollen ausdrücklich erhalten bleiben; die
Verdrängung anderer Gegnertypen ist jedoch wahrscheinlich ein unbeabsichtigter
Seiteneffekt und muss separat korrigiert werden.

### Speicherstand und Texte

- `DEFAULT_SAVE` besitzt ein unbenutztes Feld `charakter`; tatsächlich verwendet wird
  `figur`.
- Der Kommentar bei `runAbilities` nennt noch Stufen 1 bis 10, die Implementierung
  deckelt heute auf 5.
- Im Infotext steht noch sowohl „mitten im Lauf umrüsten“ als auch direkt danach die
  gegenteilige, aktuelle Regel „vor dem Lauf festgelegt“.
- Der Backlog nennt veraltete Dateigrößen und frühere Produktentscheidungen.

## 12. Empfohlene Umsetzungsreihenfolge

1. Offene Grundsatzfragen dieses Dokuments beantworten.
2. Messinstrumentierung einbauen und v4/v5 reproduzierbar vergleichen.
3. Performance-Regressionsursache beheben und Zielwerte festhalten.
4. Skill-Tree als Datenmodell/Papierprototyp mit Punktbudget entwerfen.
5. XP-Kurve und Hilfsstufen-Normalisierung an den Tree anpassen.
6. Tree-HUD und Tree-Overlay implementieren; altes Kartenmodell danach entfernen.
7. Charakteridentität zunächst für Klingenläufer und Konstrukt ausarbeiten.
8. Menü auf Spielen, Vorbereitung und Hangar reduzieren.
9. Speicherstandsversion, Migration und manuelle Testmatrix abschließen.

## 13. Abschließend bestätigte Tree-Lebensdauer

Der Skill-Tree beginnt in jedem Lauf neu und leer:

- Ein neuer Lauf startet mit null verteilten Tree-Punkten.
- Jeder Level-Aufstieg dieses Laufs gibt einen neuen Punkt.
- Tod, Sieg oder freiwilliges Beenden löschen nur die Tree-Verteilung dieses Laufs.
- Dauerhafte Freischaltungen, Charaktere, Mächte, Kosmetik und Werkstattfortschritt
  bleiben erhalten.

Damit bleibt der Tree die Build-Entscheidung des aktuellen Laufs. Er wird nicht zu
einer zweiten Werkstatt und erzeugt bei jedem Neustart neue Entwicklungspfade.

Die konkrete Browserangabe für den Pixel-9-Test und ein verbindliches FPS-Ziel sind
für den Beginn der Instrumentierung hilfreich, aber keine Architekturblocker. Zuerst
wird die reale Framezeit auf beiden genannten Geräten sichtbar gemacht.

## 14. Ergänzungen aus dem Nutzertest vom 12.08.2026

Diese Punkte sind vor der nächsten Umsetzungsrunde ergänzt worden und gelten zusammen
mit den bisherigen Entscheidungen als Anforderungen.

### Kompaktere Bedienoberfläche

Die Schaltflächen und Inhaltskarten sind derzeit zu groß. Insbesondere Skill-Tree,
Werkstatt, Vorbereitung und Sammlung zeigen pro Bildschirm zu wenig Inhalt und
erzwingen unnötiges Scrollen.

Beschlossene Richtung:

- deutlich geringere Kartenhöhe und Innenabstände;
- Icons, Titel, Kurzbeschreibung und Zustand dichter anordnen;
- auf breiteren Displays mehrere Spalten konsequenter ausnutzen;
- auf dem Handy mehr als einen einzelnen Tree-Knoten beziehungsweise eine einzelne
  Werkstattkarte gleichzeitig erfassbar machen;
- wichtige Trefferflächen bleiben trotz kompakter Optik touch-tauglich. Kleine
  Darstellung darf nicht zu schwer antippbaren Bedienelementen führen;
- ausführliche Erklärungen bei Bedarf hinter Details oder im Codex zeigen, statt sie
  auf jeder Karte dauerhaft zu wiederholen.

Das betrifft nicht nur den HUD-Tree-Button, sondern die gesamte Informationsdichte
der Menüs und Overlays.

### Neue Klangrichtung

Die bestehenden synthetischen Signale erfüllen ihre Funktion, vermitteln aber noch
nicht ausreichend Weltraum, Energieklinge oder Orbitbewegung.

Die nächste Soundrunde soll mindestens unterscheiden:

- permanentes, zurückhaltendes Klingenbrummen beziehungsweise Orbit-Summen;
- deutliches Energie-Zischen oder -Schneiden beim Sweet-Spot-Treffer;
- räumlichere, elektrischere aktive Mächte;
- schwere, tiefe Panzer- und Bossreaktionen;
- kurze, klare Menüsignale, die nicht wie generische Arcade-Pieptöne wirken.

Sounds dürfen auf Mobilgeräten nicht zu einer weiteren Performancequelle werden.
Wiederverwendete Web-Audio-Knoten, kurze Hüllkurven und eine begrenzte Zahl
gleichzeitiger Stimmen sind gegenüber vielen Audiodateien oder dauernd neu erzeugten
Effektketten zu bevorzugen.

### Charaktere behalten immer die Orbit-Klinge

Die Charakteridentität wurde am 12.08.2026 entsprechend überarbeitet. Die automatische
Orbit-Klinge bleibt bei jedem spielbaren Charakter das zentrale Angriffs-,
Positionierungs- und Wiedererkennungselement.

Charaktere unterscheiden sich künftig durch ihre Beziehung zur gleichen Klinge, zum
Beispiel:

- helle beziehungsweise beschützende Kräfte: Barriere, Rettung, Kontrolle und
  präzise Führung der Klinge;
- dunkle beziehungsweise aggressive Kräfte: Opfer, Überladung, Lebensentzug und
  riskanter Klingenschaden;
- neutrale oder technische Kräfte: Drohnen, Magnetismus, Orbitmanipulation und
  zusätzliche Flugbahnen.

Die erste Umsetzung bildet zwei Pole: Der **Lichthüter** belohnt Bewegung und präzise
Sweet-Spot-Treffer, erzeugt mit vollem Fokus Barriere und zieht mit seiner Lichtbahn
durch Gegner. Die **Leerenklinge** erhält bei fehlendem Leben mehr Orbittempo und
Sweet-Spot-Schaden. Ihre Leerenüberladung opfert Leben, erzeugt zeitweise mindestens
zwei Orbit-Klingen und heilt über Kills; exklusive Knoten steigern das bis auf drei
Klingen. Die frühere automatische Plasmasalve und der Drohnenimpuls wurden entfernt.

„Gut“ und „böse“ bleiben Designrichtungen für Fähigkeiten, Bildsprache, Risiko und
Spielstil. Fraktionen, Geschichte oder moralische Entscheidungen sind weiterhin
nicht beschlossen. Die interne ID `konstrukt` bleibt nur zur Kompatibilität mit dem
v5-Spielstand bestehen.
