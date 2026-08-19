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
- Jeder Charakter behält die Orbit-Klinge; Haltungen verändern ihre Nutzung.
- Gepanzerte Gegner bleiben.
- Welle 30 ist der Siegpunkt, danach ist Endlos möglich.
- Hilfen sperren keine Inhalte; Bestmarken bleiben getrennt.
- Touch-Bedienung und ein verständlicher Einstieg für Kinder bleiben erhalten.
- Fortschritt liegt in `localStorage` unter `orbitblade_konzept_save`.

## Aktueller Stand

- Startmenü: Spielen, Vorbereitung, Hangar.
- Vorbereitung besitzt die Tabs Charakter, Hilfe und Mächte.
- Hangar öffnet direkt die Werkstatt; Werkstatt und Sammlung sind per Tabs verbunden.
- Werkstatt: 16 Projekte in Kernsysteme, Blaupausen, Begleiter und Kosmetik.
- Sammlung: Rekorde, Klinge, Charaktere und Abzeichen.
- Ein Punkt je Level; Ziel sind 15 reguläre Punkte bis Welle 30.
- Aktive Mächte werden vor dem Lauf gewählt und bleiben im Lauf fest.
- Jede Hauptmacht besitzt genau eine dreistufige Partnerfähigkeit.
- Performanceentlastung: DPR-Cap, Culling, HUD mit 10 Updates/s und `?perf=1`.
- `SAVE_VERSION` ist 9.

## Charaktere

- **Lichthüter** (`held`): Bewegung verstärkt Sweet-Spot-Treffer, voller Fokus
  erzeugt Barriere. Im Lauf wählt er zwischen Wächter und Sonnenjäger.
- **Leerenklinge** (interne Alt-ID `konstrukt`): Fehlendes Leben erhöht Orbittempo
  und Sweet-Spot-Schaden. Im Lauf wählt sie zwischen Verschlinger und Abgrund.

Die interne ID `konstrukt` bleibt wegen vorhandener Spielstände.

## Aktuelles Grundkonzept: schlanker Orbitpfad

Dieser Abschnitt ist die verbindliche fachliche und implementierte Grundlage für alle
weiteren Arbeiten an v5.

### Produktversprechen und Bedienung

Der Spieler soll eine einfache Orbitklinge innerhalb eines kurzen Laufs in seine eigene,
spektakuläre Kampfmaschine verwandeln. Bewegung und Sweet-Spot-Führung bleiben wichtiger
als Verwaltung.

- Die Orbitklinge greift automatisch an und bleibt bei allen Charakteren der Hauptschaden.
- Aktiv 1 ist die Hauptmacht und erhält Mutation, Partnerpassiv, Meisterschaft und Evolution.
- Aktiv 2 ist eine optionale Unterstützungsmacht ohne zweiten vollständigen Baum.
- Taste 3, `Lichtbahn` und `Leerenüberladung` als separate Signaturen entfallen vollständig.
- Die Supermacht ist die Evolution von Aktiv 1 und benötigt keinen zusätzlichen Knopf.
- Die ersten 15 Levelaufstiege geben je einen Orbitpunkt; der Spieler öffnet den Pfad
  freiwillig über den HUD-Knopf. Spätere Level erzeugen keine regulären Punkte mehr.

### Form und Punktökonomie

Der Pfad zeigt vierzehn reguläre Knoten in acht kompakten Reihen mit höchstens zwei Knoten pro Reihe.
Er benötigt kein horizontales Scrollen, kein Zoomen und auf üblichen Mobilgeräten auch
kein vertikales Scrollen. Drei Knoten sind exklusive A/B-Wahlen, drei Knoten besitzen
jeweils drei große Rangsegmente; Klingen- und Machtmodul besitzen je zwei Ränge.

Der Pfad bietet 18 Investitionen bei höchstens 15 regulären Punkten:

1. Klingenführung A/B – 1 Punkt;
2. Hauptmacht A/B – 1 Punkt;
3. Partnerpassiv – 2 mechanische Ränge;
4. Klingenmodul – 2 mechanische Ränge;
5. Charakterhaltung A/B – 1 Punkt;
6. Machtmeisterschaft – 3 mechanische Ränge;
7. Machtmodul – 2 mechanische Ränge;
8. Klingensynergie – 1 Punkt;
9. Evolution – 1 Punkt;
10. Orbitresonanz – 3 mechanische Ränge;
11. Orbitkrone – 1 Punkt.

Das Werkstattprojekt `Startimpuls` erzeugt einen 16. Punkt. Nur dann erscheint unter
der Krone der optionale Knoten `Kernreserve`: +10 % maximales Leben und voller Fokus zu
Beginn jedes Bosskampfs. Er ist Komfort und keine Voraussetzung.

### Klingenführung

- **Doppelorbit:** zwei gegenüberliegende Klingen, geringerer Sweet-Spot-Schaden je
  Klinge, sichere Gruppenkontrolle und leichter Einstieg.
- **Präzisionsorbit:** eine längere, schmalere Klinge, deutlich stärkerer Sweet Spot;
  Sweet-Spot-Treffer durchschlagen Panzerung. Höheres Risiko und Könnenpotenzial.

Beide Wege müssen ungefähr gleich stark sein. Doppelorbit optimiert Verlässlichkeit,
Präzisionsorbit die Spitzenleistung.

### Machtpfad Wirbel

- Mutation `Magnetwirbel`: zieht Gegner kontrolliert in die aktuelle Klingenbahn.
- Mutation `Nachlauf`: hinterlässt kurz eine rotierende Schadensspur am Aktivierungsort.
- Partnerpassiv `Splitter`: Rang 1 zwei kreisende Splitter; Rang 2 Sweet Hits schleudern
  den nächsten Splitter; Rang 3 verwendete Splitter kehren als breiter Rückflug zurück.
- Meisterschaft: Rang 1 Klinge auf äußerer Bahn; Rang 2 letzter Schlag zieht alle
  Splitter durch die Mitte; Rang 3 Fokus-Wirbel erlaubt kurz das Durchlaufen kleiner Gegner.
- Evolution `Sturmwirbel`: Klinge und Splitter bilden gegenläufige Ringe und schießen
  am Ende strahlenförmig nach außen.

### Machtpfad Schock

- Mutation `Rammschock`: weggestoßene Gegner verursachen Kollisionen.
- Mutation `Stasefeld`: schwächerer Stoß, dafür verlangsamendes Feld.
- Partnerpassiv `Kettenblitz`: Rang 1 ein Blitzsprung; Rang 2 Sweet Hits auf markierte
  Gegner starten einen Zusatzsprung; Rang 3 getötete Markierte entladen sich zweifach.
- Meisterschaft: Rang 1 Schock markiert alle Ziele; Rang 2 Klingentreffer verbraucht
  Markierung für Stun; Rang 3 Fokus-Schock startet kleine Rückwellen von Markierten.
- Evolution `Kettengewitter`: elektrischer Ring bleibt bestehen; Klingentreffer auf dem
  Ring lösen Blitze zwischen Markierten aus.

### Machtpfad Bombe

- Mutation `Haftladung`: haftet am nächsten Gegner; Sweet Hits schieben ihn durch Gruppen.
- Mutation `Fernzünder`: erneuter Druck zündet früher; kleinerer Radius, stärkeres Zentrum.
- Partnerpassiv `Konterstoß`: Rang 1 kleine Druckwelle nach Treffer; Rang 2 stößt Bomben
  und Bombenträger stark; Rang 3 gut getimter Konter zündet ohne Frühzündungsnachteil.
- Meisterschaft: Rang 1 gefährliche Kernzone; Rang 2 Explosions-Sweet-Spot entfernt kurz
  Panzerung; Rang 3 Fokus-Bombe teilt sich in zwei kleine Ladungen.
- Evolution `Streubombe`: drei kreisende Ladungen detonieren nacheinander an der jeweils
  aktuellen Klingenposition und werden durch Bewegung dirigiert.

### Machtpfad Nova

- Mutation `Schildnova`: Treffer laden eine gedeckelte Barriere.
- Mutation `Bogen-Nova`: gerichtete Bögen statt Vollring; mehr Schaden, weniger Sicherheit.
- Partnerpassiv `Phaser`: Rang 1 automatischer Schuss; Rang 2 Sweet Hits laden Zusatzschuss;
  Rang 3 durchschlägt gestunte oder markierte Ziele und kehrt schwach zurück.
- Meisterschaft: Rang 1 sofortige Phaser-Salve; Rang 2 verzögerte zweite Nova; Rang 3
  Fokus-Nova sammelt kurz Geschosse und feuert sie gemeinsam ab.
- Evolution `Nova-Kaskade`: drei rhythmische Novawellen wechseln mit radialen Phaser-Salven.

### Machtpfad Sog

- Mutation `Klingenfessel`: Gegner bleiben kurz auf Klingenreichweite.
- Mutation `Satellitenbahn`: Gegner kreisen kurz in Klingenrichtung statt direkt heranzufliegen.
- Partnerpassiv `Nachhall`: Rang 1 jeder vierte Sweet Hit erzeugt Druckwelle; Rang 2
  schiebt exakt auf Klingenreichweite; Rang 3 drei getroffene Gegner erzeugen zweiten Nachhall.
- Meisterschaft: Rang 1 erster Gegner wird Gravitationskern; Rang 2 Sweet Hit am Kern
  zieht nahe Gegner zusammen; Rang 3 Fokus-Sog hält länger, solange der Spieler läuft.
- Evolution `Gravitationsbruch`: Gegner kreisen gemeinsam, die Klinge beschleunigt für
  eine Runde und der Orbit endet in einer großen Nachhallwelle.

### Unterstützungsmacht und Resonanz

Aktiv 2 bleibt über den Lauf stabil und erhält keinen eigenen Seitenbaum.

Umgesetzt seit 17.08.2026 — alle drei Ränge sind mechanisch, keiner ist ein Prozentwert:

- Rang 1: Kopplung. Ein Machteinsatz verkürzt die andere Macht spürbar. Ohne zweiten
  Slot verstärkt er stattdessen 1300 ms lang den Klingenschaden.
- Rang 2: Ein **fokussierter** Einsatz macht die andere Macht sofort bereit; ohne
  zweiten Slot hält der Klingenbonus 3000 statt 1300 ms.
- Rang 3: Ein fokussierter Einsatz lässt vier Sekunden lang eine Zusatzklinge
  mitkreisen. Sie läuft über `effektiveKlingen()`, damit die Sweet-Zone korrekt
  mitschrumpft — die Klinge ist ein Zugewinn mit Preis, kein reiner Bonus.

Vorher gab Rang 1 lediglich −6 % Abklingzeit und war zugleich Pflichtkauf für die
Krone; die einzige echte Mechanik saß auf Rang 3.

Aktiv 2 darf höchstens etwa ein Viertel der Buildstärke ausmachen.

### Charaktere und Haltungen

Charaktere besitzen Startpassiv, exklusive A/B-Haltung, Klingensynergie und eigenes
visuelles Feedback, aber keinen zusätzlichen Kampfknopf.

**Lichthüter – Startpassiv `Lichtbund`:** Bewegung lädt Präzision; der nächste Sweet Hit
verbraucht sie für Bonus. Voller Fokus erzeugt Barriere.

- Haltung `Wächter`: Fokusbarriere verlangsamt nahe Gegner; Lebenskugeln bei vollem
  Leben verstärken die nächste Barriere. Klingensynergie `Leuchtfeuer`: Während einer
  Barriere zieht die Klinge eine kurze verlangsamende Lichtspur.
- Haltung `Sonnenjäger`: drei Sweet Hits in Folge erhöhen kurz das Orbittempo; ein
  Fehlschlag beendet nur die Serie. Klingensynergie `Sonnenorbit`: maximale Serie macht
  den Sweet Spot schmaler und stärker; fokussierte Hauptmacht hinterlässt Sonnenbahn.

**Leerenklinge – Startpassiv `Leerenhunger`:** Fehlendes Leben erhöht moderat Orbittempo
und Sweet-Spot-Schaden; der Risikobereich ist im Lebensbalken violett sichtbar.

- Haltung `Verschlinger`: Sweet-Spot-Kills sammeln Heilreserve, die erst nach einigen
  Sekunden ohne Treffer ausgezahlt wird. Klingensynergie `Satter Abgrund`: Mit Reserve
  wird jeder vierte Sweet Hit zu einem breiteren Biss.
- Haltung `Abgrund`: unter 45 % Leben längere und schnellere Klinge; unter 25 % eine
  schwächere Schattenklinge und reduzierte Heilung. Klingensynergie `Ereignishorizont`:
  Sweet Hits verlängern die Schattenklinge; ein Treffer beendet sie und erzeugt Rückwelle.

### Orbitkrone

Die Krone kombiniert statt eines pauschalen Prozentbonus die bisherigen Entscheidungen:

- Doppelorbit lässt Haupt- und Unterstützungseffekt abwechselnd an beiden Klingen auslösen.
- Präzisionsorbit verkürzt Aktiv 1 nach jedem dritten Sweet Hit; eine verfehlte Runde
  setzt die Serie zurück.
- Beim Lichthüter übertragen sich Barriere oder Präzisionsserie auf die Evolution.
- Bei der Leerenklinge beeinflussen Heilreserve oder Risikozone die Evolution.

Die Fertigstellung erhält eine eigene Orbitspur, einen kurzen Klang und einen klaren
gold-grünen Abschlussmoment.

### Informationsdesign

Jeder Knoten zeigt ohne Öffnen ein SVG-Symbol, einen Namen mit höchstens 16 Zeichen,
eine Wirkungszeile mit höchstens 32 Zeichen und bei Rängen drei große Segmente.

- gekauft: grün und volle Verbindung;
- kaufbar: gold mit ruhigem Puls;
- nächste Reihe: dunkelblau, Text vollständig lesbar;
- spätere Reihen: gedämpfte Silhouette und Symbol;
- ausgeschlossene Gegenwahl: ausgegraut mit sichtbarer gewählter Alternative.

Ein Tap auf einen kaufbaren Knoten kauft sofort. Bis zum Schließen kann nur der letzte
Kauf über `Rückgängig` zurückgenommen werden. Gesperrte Knoten zeigen ihre Voraussetzung.

### Laufpacing

Standard bleibt bei 19–23 Minuten bis Welle 30.

- Wellen 1–5 / Punkte 1–3: Klingenform und Hauptmacht.
- Wellen 6–12 / Punkte 4–6: Partnerpassiv wird sichtbar aktiv.
- Wellen 13–18 / Punkte 7–9: Haltung und erste Meisterschaft.
- Wellen 19–24 / Punkte 10–12: Evolution um Welle 21–24 erreichbar.
- Wellen 25–30 / Punkte 13–15: Resonanz und frühestens um Welle 28 die Orbitkrone.

Der erste Punkt kommt nach 60–75 Sekunden. Vor dem ersten Boss ist mindestens eine
Klingen- oder Machtwahl möglich. Keine Laufphase soll länger als zwei Minuten ohne neue
mechanische Entwicklung bleiben. Hilfsstufen ändern Gegnerdruck, nicht Pfadinhalt.

### Werkstatt v2 – 16 Hangarprojekte

Die Werkstatt bleibt ein einzelner Bildschirm mit vier Gruppen und ist kein zweiter
frei verzweigter Skilltree. Ein vollständiger Standardlauf finanziert ungefähr ein
großes oder zwei kleine Projekte; auch eine Niederlage erzeugt sichtbaren Fortschritt.
Die 16 Projekte kosten ohne Rabatte 45.600, mit allen verdienten Blaupausenrabatten
rund 38.800 Fragmente. Ziel sind ungefähr zehn bis dreizehn erfolgreiche Standardläufe.

**Kernsysteme**

- `Startimpuls` (700): Start mit einem Orbitpunkt.
- `Zweite Macht` (1.000): Aktiv 2 dauerhaft frei.
- `Orbitarchiv` (1.800): zwei Startkonfigurationen als Presets.

**Blaupausen**

- `Bombenkern` (1.800), `Novakern` (2.400), `Gravitationskern` (3.000),
  `Leerenprotokoll` (3.000): neue Startoptionen beziehungsweise Charakter.
- Eine im Lauf erreichte Blaupause reduziert das Projekt auf höchstens ein Drittel;
  Finden und Kaufen dürfen keine doppelte Bestrafung sein.

**Begleiter-Meilensteine**

1. 1.400: sammelt Fragmente und XP-Orbs;
2. 2.300: feuert langsam auf Gegner;
3. 3.600: priorisiert gepanzerte oder markierte Ziele;
4. 5.200: erzeugt bei vollem Fokus einen kleinen Schildpuls;
5. 7.500: überlädt sich bei Bossbeginn zehn Sekunden.

**Kosmetik**

- `Farblabor` (1.200), `Spurenlabor` (2.200), `Formarchiv` (3.500) und
  `Hangarprojektion` (5.000) verändern ausschließlich Darstellung und Sammlung.

### Freischaltreihenfolge

- Start: Lichthüter, Wirbel, Schock und beide mechanischen Orbitformen.
- Welle 5: Bombenblaupause.
- Welle 10: erste neue Klingenoptik.
- Welle 15: Leerenprotokoll.
- Welle 20: Novablaupause.
- Sieg Welle 30: Gravitationskern und Endlosmodus.

Partnerpassive werden nicht separat permanent gesperrt. Wer eine Hauptmacht besitzt,
kann ihren vollständigen Laufpfad spielen.

### Bewusste Ausschlüsse

- keine dritte aktive Taste und keine separaten Charakter-Ultimates;
- keine zufällige Kartenwahl bei Level-up;
- kein zweiter vollständiger Machtbaum für Aktiv 2;
- keine passiven Füll- oder endlosen Prozentknoten;
- kein Inventar, keine Ausrüstungsseltenheiten und keine weiteren Währungen;
- keine Monetarisierung vor bestätigtem Wiederspielwert;
- kein umfangreiches automatisiertes Testnetz in dieser Projektphase.

### Abnahmekriterien für den Spieltest

- Nach einem Blick sind die höchstens zwei neu geöffneten Hauptpfadknoten erkennbar;
  freiwillige Vertiefungen dürfen zusätzlich offen sein, leuchten aber ruhiger.
- Jeder gekaufte Rang ist innerhalb von 30 Sekunden sichtbar oder spielerisch spürbar.
- Ein Tester kann seinen fertigen Build in einem Satz beschreiben.
- Lichthüter und Leerenklinge fühlen sich trotz derselben Klinge deutlich anders an.
- Nach Niederlage oder Sieg existiert ein konkreter Grund für einen weiteren Lauf.
- Pro Testlauf werden Zeit bis zum ersten Punkt, Welle/Minute von Evolution und Krone,
  übrige Punkte, A/B-Kombination, Todesursache und stärkster Moment notiert.

## Umgesetzte Fortschreibung: Orbitpfad v2 (13.08.2026)

Diese Fortschreibung ersetzt die bisherige Punktökonomie,
nicht aber die schlanke Form des Orbitpfads. Die aktuelle Fassung war bewusst eine
Gegenbewegung zum alten überladenen Dreiast-Baum: wenige gleichzeitig sichtbare
Entscheidungen, keine Sackgassen, kein Scrollen und ein sicher erreichbarer Abschluss.
Diese Architektur bleibt. Korrigiert wird nur, dass derzeit 15 erwartete Punkte exakt
15 Investitionen bezahlen und dadurch nach den A/B-Wahlen kein Verzicht entsteht.

### Neue reguläre Punktökonomie

- Ein Lauf bis zum Sieg vergibt höchstens 15 reguläre Levelpunkte.
- `Startimpuls` ergänzt weiterhin einen 16. Startpunkt und den zweiten Kronenrang
  `Kernreserve`; der Abstand zwischen Angebot und Budget bleibt dadurch gleich.
- Der reguläre Pfad bietet 18 Investitionen, mit `Kernreserve` 19.
- Ein fertiger Welle-30-Build lässt damit stets drei Vertiefungen aus.
- Der Baum erhält nur zwei zusätzliche kompakte Knoten: `Klingenmodul` und
  `Machtmodul`, jeweils mit zwei mechanischen Rängen. Ihre konkrete Wirkung passt
  sich an gewählte Klingenform beziehungsweise Hauptmacht an.
- Machtmeisterschaft und Orbitresonanz öffnen den Folgepfad bereits mit Rang 1;
  ihre weiteren Ränge sind freiwillige, deutlich sichtbare Vertiefungen. Der Partner
  hat seit dem 17.08. nur noch zwei Ränge: Rang 1 aktiviert die Passive, Rang 2 löst
  ihren mechanischen Sprung auf Stufe 4 aus (etwa den dritten Splitter). Vorher endete
  er auf Rang 3 bei Stufe 3 — der Sprung war dadurch nie erreichbar.
- Keine der neuen Investitionen ist ein bloßer Prozentfüller. Jeder Rang verändert
  innerhalb von 30 Sekunden sichtbar Verhalten, Rhythmus oder Trefferbild.

Kosten eines vollständig angebotenen Pfads:

1. Klingenführung A/B – 1;
2. Hauptmacht-Mutation A/B – 1;
3. Partnerpassiv – 2;
4. Klingenmodul – 2;
5. Charakterhaltung A/B – 1;
6. Machtmeisterschaft – 3;
7. Machtmodul – 2;
8. Klingensynergie – 1;
9. Evolution – 1;
10. Orbitresonanz – 3;
11. Orbitkrone – 1.

Summe: 18 mögliche Investitionen bei 15 regulären Punkten.

### Garantierte Orbitkrone

- Die Krone benötigt die Evolution und 14 bereits investierte Punkte; Punkt 15
  kauft den Abschluss.
- Späte Reihen werden so an die Evolution gebunden, dass sie nicht bis zum letzten
  Punkt aufgeschoben und die Krone versehentlich verpasst werden kann.
- Die Krone ist bewusst der verlässliche Höhepunkt eines vollständig ausgespielten
  Laufs, kein Test auf optimale Vorplanung. Die Entscheidungen bestimmen Form,
  Synergien und ausgelassene Vertiefungen, nicht den Zugang zum Abschlussmoment.

### Endlosresonanz nach Welle 30

- Beim Eintritt in Endlos wird der reguläre Build eingefroren. Ausgelassene reguläre
  Module dürfen nicht nachgekauft werden, damit Builds nicht wieder konvergieren.
- Vor dem Einfrieren erhält der Spieler einen klaren letzten Hinweis, noch vorhandene
  reguläre Punkte auszugeben; nichts darf kommentarlos verloren gehen.
- Unter der Krone erscheint eine kleine endlos-exklusive `Endlosresonanz` mit einer
  exklusiven Wahl zwischen `Klingenecho` und `Machtecho`.
- Der gewählte Endloskern besitzt drei endliche mechanische Ränge. Klingenecho vertieft
  Sweet Spot, Klingenform und Klingensynergie; Machtecho vertieft Mutation, Hauptmacht
  und Evolution.
- Zielpacing: Rang 1 beim Eintritt in Welle 31, Rang 2 nach Boss 35 und Rang 3 nach
  Boss 40. Diese Zeitpunkte werden im Endlostest geprüft und bei Bedarf Rang 3 auf
  Boss 45 verschoben.
- Nach Rang 3 erzeugen weitere XP keine permanent stapelbaren Prozentwerte und keine
  Skillpunkte. Klingenecho gibt fünf Sekunden eine zusätzliche sichtbare Schattenklinge;
  Machtecho lädt für fünf Sekunden genau einen fokussierten Hauptmachteinsatz. Timer und
  Ladung werden nur erneuert, nie gestapelt.

### Pacing, Hangar und Langzeitrahmen

- Die XP-Formel wird nicht isoliert vor dem neuen Baum geändert. Zuerst werden in
  einem vollständigen Standardlauf Punkt 1/5/10/14, Evolution, Krone und Sieg gemessen;
  danach wird die späte Steigung bei möglichst gleicher Gesamtdauer feinjustiert.
- Der aktuelle Hangar öffnet bereits direkt Werkstatt und Sammlung als Reiter. Es ist
  kein neuer Hangar-Umbau geplant; nur das unerreichbare alte Zwischen-Overlay wird
  bei Gelegenheit entfernt.
- Nach Abschluss aller 16 Projekte folgt eine wiederholbare, rein kosmetische
  Hangarprestige-Senke. Sie darf keine Kampfstärke und keinen Leistungsrang kaufen.
- Rekorde zeigen könftig Entdecker, Standard und Meister gleichzeitig. Die höchste
  Standard-Welle ist die primäre teilbare Leistungszahl; ein echter Rangmodus bleibt
  eine spätere, getrennte Aufgabe.

## Performance-Messfassung und erste Optimierung (umgesetzt 16.08.2026)

### Messwerkzeug und Reproduktion

`?perf=1` ist keine Momentanwertanzeige mehr, sondern die geforderte Messfassung:

- gleitendes Fenster über ~90 s (5.400 Bilder) mit Schnitt, P95 und Maximum getrennt
  für Frame, Update und Draw;
- 18 Phasen innerhalb von Update und Draw als ms pro Bild (`separieren`, `klinge`,
  `gegnerKI`, `zGegner`, `zPartikel`, `zHintergrund` …), im Overlay nach Kosten sortiert;
- Mengen je Bild: Gegner sichtbar/gesamt, Projektile beider Seiten, Felder, Echos,
  Splitter, Partikel, Zahlen, Beute;
- Zustand: DPR, Sparmodus, Effektstufe, Messlauf-Flagge;
- `perfDump()` in der Konsole liefert denselben Bericht als JSON, `perfReset()` bzw.
  `Shift+P` setzt das Fenster zurück. Nur Kampfbilder werden gezählt.

Reproduzierbarer Einstieg: `?perf=1&wave=26&pts=15&god=1` springt direkt in Welle 26,
gibt 15 Orbitpunkte und verhindert den Tod. Ein solcher Lauf ist als `messlauf`
markiert und schreibt weder Bestmarke noch Spielstand — `persist()` ist dabei gesperrt.
Ohne `?perf=1` kostet die gesamte Messfassung nichts: `PERF_DEBUG` ist eine Konstante
und `perfMark` kehrt sofort zurück.

### Befund

Gemessen auf X1 Carbon, Chrome, DPR 1, Welle-26-Build (Doppelorbit, Wirbel A,
Splitter 3, Klingenmodul 2, Wächter, Meisterschaft 3, Sturmwirbel, Resonanz, Krone):

- **Der Einbruch liegt im Zeichnen, nicht in der Simulation.** Bei 115 Gegnern kostet
  `update` 0,55 ms (P95 0,9), `draw` rund 5 ms — etwa 90 % der Bildarbeit.
- Innerhalb von Draw dominieren `zGegner` (~2,4 ms bei 115 Gegnern, wächst linear mit
  der Gegnerzahl) und `zPartikel` (~1,3 ms, nahezu konstant, da Partikel bei 340 gedeckelt).
  `zHintergrund` ist mit ~0,8 ms konstant und gegnerunabhängig.
- Innerhalb von Update ist `separieren` mit Abstand die teuerste Phase (0,33 von 0,55 ms
  bei 115 Gegnern) und wächst überproportional.
- Die Werte gelten für Desktop. Ein Pixel 9 liegt erfahrungsgemäß Faktor 3–5 darüber;
  damit erklärt allein die Zeichenzeit den beobachteten Einbruch ab Welle 26.

Widerlegte Vermutung: `Math.hypot` ist in V8 für zwei Argumente exakt so schnell wie
`Math.sqrt(dx*dx+dy*dy)` (8,6 vs. 8,7 ms je 100.000 Aufrufe). Die 60 Fundstellen bleiben
unverändert — die Umschreibung wäre reine Unruhe ohne Gewinn gewesen.

### Umgesetzte Optimierungen

Alle Änderungen sind balance- und darstellungsneutral und einzeln nachgemessen:

- `sichtbar()` las je Aufruf zweimal `canvas.clientWidth/Height` aus dem DOM. Gemessen
  1,573 µs gegenüber 0,016 µs für eine Variable — Faktor 100. Bei 444 Sichtprüfungen
  pro Bild kostete das **0,497 ms; jetzt 0,010 ms** (Median aus 9 Läufen). Der
  Sichtbereich wird einmal je Bild in `draw()` gesetzt.
- `separiereGegner()` baute pro Bild rund 1.150 Strings als Rasterschlüssel. Mit einem
  eindeutigen Zahlenschlüssel (`cx*2^22+cy`, gültig bis ±117 Mio. Pixel) sinkt die Phase
  von **0,220 ms auf 0,081 ms**; die erzeugten Positionen sind bitgenau identisch.
- `shadowColor` wurde je Gegner, Projektil und Partikel gesetzt, obwohl bei
  abgeschaltetem Leuchten (ab 22 Gegnern) `shadowBlur` 0 ist und die Farbe wirkungslos
  bleibt. Der neue Helfer `sbc(farbe, staerke)` setzt beides nur gemeinsam.
- Nebelverläufe und der Ausblendverlauf des Rasters wurden pro Bild neu erzeugt. Beide
  hängen nur an Farbe/Radius bzw. Fenstergröße und werden jetzt zwischengespeichert;
  die Schwaden werden über `translate` positioniert statt neu aufgebaut.
- Die Schriftumschaltung der Schadenszahlen parste bis zu 72 Schriftstrings pro Bild.
  Jetzt wird nur bei echtem Wechsel gesetzt, aus einem Cache.
- Nebenbefund behoben: `drawFadedGrid` warf bei 0 × 0 Pixel großem Fenster jedes Bild
  eine `InvalidStateError` aus `drawImage`.

### Erste Gerätemessung X1 Carbon (16.08.2026)

Erster echter Lauf über GitHub Pages, Welle 27, DPR 1.5, Sparmodus aus, Effekte an:

- Bildzeit Ø 19,5 ms (p95 33,4), also rund 51 fps — auf diesem Gerät zu wenig.
- **Update 0,4 ms + Draw 1,3 ms = 1,7 ms.** Die restlichen ~18 ms sind für das Skript
  unsichtbar: `draw()` misst nur das Absetzen der Canvas-Befehle, nicht das Rastern
  und Kompositieren. p95 und Maximum sind exakt 2× und 3× 16,7 ms, also ausgelassene
  Vsync-Intervalle.
- Damit ist auf dem Laptop **nicht die JS-Arbeit der Engpass, sondern die Füllrate.**
  Sprite-Vorrendern der Gegner würde Pfadoperationen sparen, aber keine Pixel — es ist
  nach diesem Befund der falsche Hebel und bleibt zurückgestellt.
- Arbeitsverdacht: Der Hintergrund füllt den Bildschirm pro Bild acht- bis zehnmal
  vollständig (Grundfarbe, Glow-Verlauf, bis zu zehn große Nebelkreise mit `lighter`,
  drei Sternenlagen, Raster über eine zweite Vollbild-Leinwand, Staub, Vignette). Bei
  DPR 1.5 ist das je Durchgang die 2,25-fache Pixelmenge. Diese Last ist konstant und
  gegnerunabhängig — das erklärt, warum der Einbruch spät auffällt, obwohl die
  Gegner-Skalierung harmlos misst: die Grundlast liegt bereits nahe am Budget.

Der Lauf deckte drei Fehler im Messwerkzeug auf, die alle behoben sind:

- Die Bildrate teilte Kampfbilder durch Wanduhrzeit; Orbitpfad- und Pausenzeit zählte
  zur Uhr, aber nicht zu den Bildern. Sie kommt jetzt aus der reinen Kampfzeit, und
  `kampfAnteil` zeigt, wie viel des Fensters überhaupt Kampf war.
- `Frame max` meldete den 50-ms-Deckel der Simulationsschleife statt des wahren
  Rucklers. Gemessen wird jetzt der ungedeckelte Abstand; Lücken über 500 ms gelten
  als Zustandswechsel und fließen gar nicht erst ein.
- Die Mengen waren eine Momentaufnahme und zeigten im Leerlauf 0 Gegner. Sie laufen
  jetzt als Maximum und Schnitt über das Fenster.

Neu ist außerdem `ausserhalbJs` — die Differenz zwischen Bildzeit und der Summe aus
Update und Draw. Das ist die eigentliche Kennzahl für Rasterlast.

### Zweiter X1-Carbon-Lauf: kein Einbruch bei 37 Gegnern

Welle 26, 9,2 s Fenster, 37 gleichzeitige Gegner, Effekte aus: Frame Ø 16,7 ms,
p95 16,8, max 17,1 — makellose 60 fps ohne ein einziges ausgelassenes Bild. Die
15,4 ms `ausserhalb JS` sind reines Vsync-Warten, kein Befund.

Daraus folgt: **Der Einbruch ist noch nicht reproduziert.** Zwei Gründe, warum der
Lauf ihn nicht traf:

- Die 115 Gegner der Welle 26 sind die Gesamtzahl der Welle, nicht die gleichzeitig
  lebenden. Tatsächlich waren es 37 — dafür reicht die Leistung mühelos.
- Das Fenster war mit 9,2 s zu kurz. Der erste Lauf über 122 s zeigte p95 33,4 ms,
  also seltene, aber reale Aussetzer. Solche Ereignisse erwischt ein kurzes Fenster
  nicht, und ein Durchschnitt verdeckt sie ohnehin.

Zusätzlich unterschieden sich beide Läufe im Zeichenpfad: der erste lief mit `FX an`
(≤ 22 Gegner, Auren-Gradient je Gegner), der zweite mit `FX AUS`.

Deshalb ergänzt: eine **Verteilung der Bildzeiten** in sechs Klassen (≤17, ≤20, ≤25,
≤34, ≤50, >50 ms) und ein **Mitschnitt der sechs schlechtesten Bilder** mit Bildzeit,
Update, Draw, teuerster Phase, Welle, Gegner- und Partikelzahl, Bossflagge und
Effektstufe. Ein Schnitt sagt nur, DASS es hakt; erst der Mitschnitt sagt, WOBEI.
Beides steht im Overlay und vollständig in `perfDump()`.

### Ursache gefunden: Füllrate (X1 Carbon, am Netzteil, 16.08.2026)

Zwei unabhängige Messungen zeigen dasselbe. Der Laptop hing dabei am Strom, ein
heruntergetakteter Energiesparplan scheidet als Erklärung aus.

**Verteilungslauf bei DPR 1,5** über 121,9 s, Welle 27, im Schnitt 13 Gegner:

| Klasse | ≤17 ms | ≤20 | ≤25 | ≤34 ms | ≤50 | >50 |
|---|---|---|---|---|---|---|
| Bilder | 3520 | 5 | 0 | 1378 | 18 | 7 |

Die Verteilung ist zweigipflig: 71 % pünktlich, 28 % exakt einen Vsync-Takt zu spät,
dazwischen praktisch nichts. Kein allmähliches Zuviel, sondern ein hartes Verfehlen
der Bildfrist. Das schlechteste Bild mit 66,6 ms enthielt nur 3,8 ms JavaScript.

**Test A — DPR erzwungen auf 1,0** (`&dpr=100`), 82,8 s, im Schnitt 11 Gegner:

| | DPR 1,5 | DPR 1,0 |
|---|---|---|
| pünktlich (≤17 ms) | 3520 (71 %) | 3561 (97 %) |
| zu spät (≤34 ms) | 1378 (28 %) | 122 (3,3 %) |
| Frame Ø | 21,5 ms | 17,2 ms |
| fps | 46,5 | 58,1 |

45 % weniger Pixel bei identischem Code senken die verfehlten Bilder um Faktor 8,5.
Der Vergleich ist sogar konservativ: Der DPR-1,0-Lauf lief mit `FX an`, also dem
teureren Zeichenpfad mit Auren-Gradient je Gegner, bei gleicher mittlerer Gegnerzahl.

**Test B — erzwungener GPU-Leerlauf** (`&gpu=1`): `gpuSync` dominiert mit Abstand,
`zHintergrund` folgt weit dahinter, alle übrigen Phasen liegen unter 0,25 ms. Das
Spiel wartet fast ausschließlich auf die Grafikkarte. Die Absolutwerte sind in diesem
Modus wertlos, weil die erzwungene Synchronisation das Pipelining zerstört und das
Spiel unspielbar macht — aussagekräftig ist allein die Zuordnung.

**Damit ist die Ursache die Füllrate, nicht die Rechenlast und nicht die Gegnerzahl.**
Der Hintergrund füllt den Bildschirm pro Bild acht- bis zehnmal vollständig:
Grundfarbe, Glow-Verlauf, bis zu zehn große Nebelkreise mit additivem Blending, drei
Sternenlagen, Raster über eine zweite Vollbild-Leinwand, Staub, Vignette. Diese Last
ist konstant und gegnerunabhängig; sie liegt knapp unter der Bildfrist und kippt schon
bei geringem Zittern darüber. Das erklärt, warum der Einbruch spät auffiel, obwohl die
Gegner-Skalierung harmlos misst.

Nebenbefund: Der vorhandene Sparmodus greift erst unter 38 fps (`schnitt>26`). Ein
Gerät, das dauerhaft bei 46 fps liegt, erhält deshalb nie Hilfe. Diese Lücke ist offen.

Korrigiert: Die Phasenschnitte summierten in jedem Bild mit, auch im Orbitpfad und in
Menüs, wurden aber nur durch die Kampfbilder geteilt. Bei 60 % Kampfanteil ergab das
Phasenwerte oberhalb der gesamten Bildzeit.

### Umgesetzt: Hintergrund in halber Auflösung (Standard)

Der gesamte Hintergrund entsteht auf einer eigenen Zwischenleinwand mit halber
Kantenlänge — also einem Viertel der Fläche — und wird hochskaliert eingeblendet.
Das Spielgeschehen bleibt unangetastet in voller Auflösung.

- `BG_SKALA` ist 0,5; gemessen 640 × 360 statt 1280 × 720, Pixelanteil exakt 0,25.
- Das Tech-Raster hat eine eigene Ebene und folgt derselben Auflösung. Ohne das wäre
  es die einzige Ebene in voller Größe geblieben und hätte einen Teil der Ersparnis
  wieder aufgefressen.
- Die Verlaufs-Caches unterscheiden jetzt den erzeugenden Kontext. Seit es zwei
  mögliche Zeichenflächen gibt, hätte ein Verlauf sonst nach dem Umschalten zur
  falschen gehört.
- **Standard ist die halbe Auflösung.** `Shift+H` schaltet im laufenden Spiel um,
  `?perf=1&bg=voll` startet in der vollen Fassung; das Overlay zeigt den Modus.

Ergebnis des Vergleichs:

- Optisch bei 1:1 kaum unterscheidbar. Mittlere Abweichung 1,44 von 255 je Kanal,
  Maximum 52 an den schärfsten Sternspitzen. Erst bei sechsfacher Vergrößerung werden
  Sternenkreuze und Rasterlinie sichtbar weicher — so wird das Spiel nicht betrachtet.
- **Die Kosten verschieben sich bewusst von der GPU zur CPU.** JS-seitig ist die halbe
  Fassung teurer, gemessen 0,417 statt 0,297 ms für `zHintergrund` — das ist der
  zusätzliche Blit der Zwischenleinwand. Dafür entfallen rund drei Viertel der
  Hintergrund-Füllarbeit. Da die Messung JS mit 1,5 ms von 19,5 ms Bildzeit ausweist
  und die Füllrate als Engpass belegt ist, ist der Tausch klar richtig.
- Grob gerechnet ersetzt das acht bis zehn Vollbild-Durchgänge durch ebenso viele in
  Viertelauflösung plus einen Vollbild-Blit — also etwa drei statt neun
  vollauflösende Durchgänge.
- Kein Fehler in allen vier Kombinationen aus halber/voller Auflösung und
  Sparmodus an/aus.

### Gerätebestätigung X1 Carbon (16.08.2026)

Zwei Läufe über je rund 90 s, Welle 27 bzw. 28, im Schnitt 11–12 Gegner, beide mit
aktivem Sparmodus bei DPR 1,2:

| | Hintergrund voll | Hintergrund halb |
|---|---|---|
| Frame Ø | 17,0 ms | 16,7 ms |
| Frame max | 50,2 ms | 17,9 ms |
| Bilder über 20 ms | 100 von 4947 (2,0 %) | 0 von 4667 |
| fps | 58,8 | 60,0 |

**Mit halber Hintergrundauflösung verfehlt kein einziges Bild die Vsync-Frist.** Der
schlechteste Wert liegt bei 17,9 ms; es gibt keinen Ausreißer.

Die Wirkung verteilt sich auf beide Änderungen:

- Ausgangslage bei DPR 1,5, alter Sparmodus griff nie: 28 % verfehlte Bilder.
- Neue Sparmodus-Schwelle senkt auf DPR 1,2: 2,0 %.
- Halber Hintergrund zusätzlich: 0 %.

Die Sparmodus-Schwelle trägt damit den größeren Teil, der halbe Hintergrund räumt den
Rest ab. Dass der Sparmodus über 91 s stabil eingeschaltet blieb, bestätigt die
Pendelsperre.

**Nachtest bei DPR 1,5 mit halbem Hintergrund** (`&dpr=150`), 97,9 s, 5818 Bilder:
Frame Ø 16,7 ms, p95 16,8, max 17,2 — im eingeschwungenen Zustand makellos. Die
Verteilung wies 57 verspätete Bilder aus, die zwangsläufig alle in den ersten
418 Bildern lagen (siehe Werkzeuggrenze unten): reines Aufwärmen.

Damit ist die DPR-Senkung des Sparmodus auf diesem Gerät überflüssig. Sie ist die
teuerste der beiden Maßnahmen, weil sie das **ganze** Bild weichzeichnet — Spielfigur,
Gegner, Klinge und Schadenszahlen —, während der halbe Hintergrund nur den Hintergrund
betrifft.

Ursache der unnötigen Einschaltung war ein Entwurfsfehler: Der Sparmodus holte sich
seine zwei Einschaltungen aus den Aufwärmrucklern am Laufbeginn und rastete dauerhaft
ein. Behoben — die ersten 180 Kampfbilder (~3 s) eines Laufs sind jetzt von der
Bewertung ausgenommen und werden bei jedem neuen Lauf zurückgesetzt. Geprüft: 200
Aufwärmbilder à 45 ms lösen nichts mehr aus, 400 echte Bilder à 25 ms danach schon.

Nebeneffekt, falls der Sparmodus ausbleibt: Er schaltet auch das Leuchten ab. Ohne ihn
kehrt bei wenigen Gegnern der Auren-Glow zurück — schöner, aber wieder etwas teurer.

Ebenfalls offen: Beide Läufe hatten nur 11–12 Gegner im Schnitt. Ein Lauf mit hoher
gleichzeitiger Gegnerzahl fehlt weiterhin — er ist nach dieser Diagnose aber
zweitrangig, weil die Füllrate gegnerunabhängig ist.

Grenzen der Messfassung:

- Im Mitschnitt der schlechtesten Bilder ist die Angabe der teuersten Phase wenig
  aussagekräftig, solange alle Phasen unter einer Millisekunde liegen — im Voll-Lauf
  wies sie `spieler` aus, obwohl die Zeit nachweislich außerhalb des Skripts lag.
- Der Ringpuffer fasste nur 5400 Bilder, die Verteilung zählte dagegen alle. Ein
  5818-Bilder-Lauf meldete deshalb gleichzeitig `max 17,2 ms` und 57 Bilder über
  25 ms — beides richtig, aber über verschiedene Zeiträume. Der Puffer fasst jetzt
  20.000 Bilder (~5,5 min, 234 KB); läuft er doch über, weist das Overlay es als
  `!Stat nur N` aus, statt den Widerspruch stillschweigend zu erzeugen.

### Sparmodus greift jetzt früh genug

Die alte Schwelle lag bei 26 ms und damit unter 38 fps. Ein Gerät bei dauerhaft
46 fps (gemessen 21,5 ms) bekam nie Hilfe, obwohl es sichtbar ruckelte.

- Einschalten bei über 18,5 ms (~54 fps) nach zwei aufeinanderfolgenden Fenstern.
- Ausschalten erst bei unter 16,9 ms nach fünf Fenstern.
- Fenster sind 90 Bilder; Nicht-Kampfbilder und Lücken über 100 ms fließen nicht ein,
  sonst hätte eine einzelne Pause den Schnitt über jede Schwelle gehoben.
- Nach der zweiten Einschaltung rastet der Sparmodus dauerhaft ein. Der Sparmodus
  verändert selbst die Bildrate, die ihn steuert — ohne diese Sperre würde er pendeln,
  und ein springendes Bild ist schlimmer als ein dauerhaft weicheres.

Die Aktualisierungsrate der Nebelschwaden wurde bewusst nicht angetastet.

### Ebenen einzeln abschaltbar

Mit `?perf=1` schalten `Shift+1..8` die Zeichenebenen einzeln ab: Nebel, Sterne, Deko,
Raster, Staub, Verläufe (Glow und Vignette), Gegner, Partikel. Jeder Umschalter setzt
das Messfenster zurück, die aktive Auswahl steht in der letzten Overlay-Zeile. Damit
lässt sich im laufenden Kampf halbierend eingrenzen, welche Ebene die Füllrate frisst,
statt sie zu erraten.

### Offen

- Die Abhilfe ist auf dem X1 Carbon über GitHub Pages bestätigt. Offen bleibt nur die
  spätere Gegenprobe auf dem Pixel 9; die verborgene Browser-Pane eignet sich wegen
  fehlender Komposition weiterhin nicht für belastbare Füllratenmessungen.
- Sprite-Vorrendern der Gegner ist **endgültig zurückgestellt**: Es spart
  Pfadoperationen, aber keine Pixel, und der Engpass ist die Füllrate. Es wäre zudem
  nicht darstellungsneutral, weil pulsierende Kerne, Augen und Flossen zeitabhängig
  animiert sind und einfrieren würden.
- Die Abhilfe ist umgesetzt und auf dem X1 Carbon bestätigt: null verfehlte Bilder bei
  60 fps. Der Performancebefund gilt damit als abgeschlossen.
- Offen bleibt die Messung auf dem Pixel 9 sowie ein Lauf mit hoher gleichzeitiger
  Gegnerzahl. Beides ist nach der Diagnose zweitrangig, weil die Füllrate
  gegnerunabhängig ist.
- `separieren` bleibt mit 0,33 ms die teuerste Update-Phase. Eine Halbierung der
  Nachbarzellen wäre möglich, ändert aber die Reihenfolge der Positionskorrekturen und
  damit das Ergebnis — deshalb zurückgestellt.

## Umgesetzter Stand vom 13.08.2026

- (Überholt durch Orbitpfad v3, siehe unten.) Orbitpfad v2 besitzt 14 sichtbare reguläre Knoten, 18 mögliche Investitionen und
  maximal 15 reguläre Levelpunkte. `Startimpuls` bleibt ein separater Punkt 16.
- Partner, Haltung, Meisterschaft, Synergie, Evolution und Resonanz öffnen den
  Hauptpfad jeweils ab Rang 1. Ein dynamischer Budgetschutz reserviert nur dann die
  noch nötigen Hauptkäufe, wenn eine Vertiefung die Krone gefährden würde. Eine
  vollständige Enumeration ergab 2.298 gültige 15-Kauf-Builds, null Sackgassen und
  die Orbitkrone immer exakt als Kauf 15.
- Klingenmodul und Machtmodul passen Namen, Kurzzeile und Wirkung an die fünf
  Hauptmächte an. Wirbel nutzt Zugkerben/Nachlauffelder, Schock Leitmarken/Rückleiter,
  Bombe Zündkerben/Folgeladungen, Nova Klingensalven/Geschossfänger und Sog
  Kernlenkung/Gravumlauf. Kein Modulrang ist ein bloßer Prozentkauf.
- Kaufbare Knoten werden direkt per Tap gekauft. Der letzte Kauf kann einschließlich
  Punkten, Laufzielen, Abzeichen, Leben und Barriere bis zum Schließen rückgängig
  gemacht werden. Optionale Vertiefungen leuchten ruhiger als neue Hauptpfadknoten.
- Welle 30 füllt nur im Kalibrierungsfall fehlende reguläre Punkte bis 15 sichtbar als
  `Finale-Punkte` auf. Vor Endlos öffnet der Siegknopf den Pfad für die letzte
  Verteilung; nach gebauter Krone kann ein Restpunkt auch ausdrücklich verworfen werden.
- Beim Eintritt in Welle 31 friert der reguläre Build ein. Reguläre Knoten sind danach
  sowohl in der Anzeige als auch im Kaufpfad gesperrt. Endlospunkte sind eine getrennte,
  nicht gespeicherte Laufwährung.
- Endlosresonanz ist die exklusive Wahl `Klingenecho` oder `Machtecho`. Die drei Ränge
  kommen bei Welle 31, nach Boss 35 und nach Boss 40. Klingenecho erzeugt begrenzte
  formabhängige Schattenprojektile und einen Kronensturm; Machtecho wiederholt die
  Hauptmacht, übernimmt ab Rang 2 die gewählte Mutation und verdoppelt fokussierte
  Einsätze auf Rang 3.
- Nach Endlosrang 3 erzeugt ein Levelaufstieg statt eines toten Punkts einen kurzen,
  nicht stapelbaren Echoimpuls. Klingenecho erhält fünf Sekunden eine Schattenklinge,
  Machtecho fünf Sekunden eine gedeckelte Fokusladung.
- `Kernreserve` entspricht der Konzeptquelle: +10 Prozent maximales Leben und voller
  Fokus zu Beginn jedes Bosskampfs; die alte einmalige Todesrettung wurde entfernt.
- Browser-Smoke: Start, direkter Knotenkauf, A/B-Ausschluss, Undo und reguläres
  Pixel-9-Layout wurden lokal geprüft. Bei 393 × 873 gab es keinen horizontalen und
  keinen regulären vertikalen Baumüberlauf. Syntax, DOM-Referenzen, fünf Machtpfade,
  Punktcap, Startimpuls und Endlosmeilensteine wurden zusätzlich plausibilisiert.

## Umgesetzter Stand vom 12.08.2026

- Der alte Dreiast-Baum wurde durch einen einzigen acht Stufen tiefen Orbitpfad ersetzt.
  Er zeigt genau zwölf Knoten: je zwei Alternativen für Klinge, Hauptmacht und Haltung
  sowie Partner, Meisterschaft, Synergie, Super-Macht, Resonanz und Krone. Kurzwerte und
  Namen sind direkt sichtbar. Der letzte Kauf kann bis zum Schließen rückgängig gemacht
  werden.
- Taste 3, `Lichtbahn`, `Leerenüberladung`, ihr HUD-Knopf und ihre Cooldowns sind entfernt.
  Nur Hauptmacht auf Taste 1 entwickelt sich; Taste 2 bleibt Werkzeug.
- Die fünf Hauptmächte erzeugen denselben schlanken Baumaufbau mit eigener A/B-Mutation,
  festem Partner und eigener Super-Macht. Lichthüter und Leerenklinge besitzen je zwei
  Haltungen und passende Klingensynergien. Resonanz verbindet beide Aktivslots oder gibt
  Solospielern einen kurzen Klingenimpuls. Die Krone schließt Mehrfach- oder
  Präzisionsorbit unterschiedlich ab.
- Level und XP stehen im XP-Balken. Fokus zeigt jederzeit Wert/Ziel und bei voller
  Ladung `FOKUS BEREIT`.
- Laufkurve vorsichtig gestrafft: Gegnerzahl ungefähr 10 % reduziert, Spawnintervall
  700 → 580 ms, Boss-Basisleben 1250 → 1150. XP wurde um 10 % angehoben, damit die
  Zahl der Orbitpunkte stabil bleibt. Die Zielkorridore müssen per Spieltest bestätigt
  werden: Entdecker 15–18, Standard 19–23, Meister 23–27 Minuten.
- Soundprofil neu aufgebaut: helle gefilterte Klingen-Sweeps, tiefe Orbitimpulse und
  kurze räumliche Rauschfahnen statt überwiegend rechteckiger Arcade-Töne. Dazu
  laufen ein sehr leises prozedurales Space-Bett und eine sparsame Tonfolge. Schüsse,
  Klingentreffer, Sweet Spot, Panzerung, Bossdrohnen und Baumkäufe haben unterscheidbare,
  gedrosselte Effekte; ein wiederverwendeter Rauschpuffer vermeidet Audio-Allokationen
  bei jedem Treffer.
- Das versionierte Erstspiel-Tutorial erklärt nach der Bewegung nun sichtbar den
  automatischen 360-Grad-Orbitschaden und den Sweet Spot als Extraschaden. Der
  Sweet-Spot-Hinweis reagiert bevorzugt auf einen echten Treffer, hat aber einen
  zeitgesteuerten Ersatz, damit kein Einsteiger festhängt. Bestehende Speicherstände
  sehen diese neue Erklärung genau einmal.
- Frühe Orbitkäufe werden beim Kauf am Spieler inszeniert und beim Schließen benannt.
  Partnerfähigkeiten erhalten bereits auf Rang 2/3 klare Mechaniksprünge; die
  Machtmeisterschaft fügt je nach Hauptmacht unter anderem Haftladung, Stasefeld,
  Wirbel-Nachlauf, Entladungsmarke, Gravitationskern oder Nova-Salven hinzu.
- Der Boss-Rammbock ist langsamer und kürzer, verursacht 65 statt 80 Prozent seines
  Kontaktschadens und besitzt danach eine kurze Erholungsphase. Während der Ramme kann
  nicht zusätzlich normaler Kontaktschaden ausgelöst werden.
- Vom Boss beschworene Drohnen geben keine XP, Fragmente, Heilung oder Kill-Fortschritt
  mehr. Ihr Abschuss verursacht stattdessen 1,8 Prozent Boss-Maximalleben als sichtbaren
  Rückschlag; Aufräumen bleibt damit nützlich, Endlos-Farming nicht.
- Das ungenutzte Karten-Level-up einschließlich Overlay, Tauschkaskaden und CSS wurde
  entfernt. Level-ups vergeben nur noch Orbitpunkte.
- Speicherversion 8 migriert den alten fünfstufigen Begleiter in fünf sichtbare Projekte
  und erhält bereits freigespielte Startinhalte als gebaute Blaupausenprojekte.
- Die Werkstatt enthält 16 sichtbare Projekte in vier Gruppen. Blaupausenfunde reduzieren
  ihren Kaufpreis auf ungefähr ein Drittel. Begleiterstufen besitzen getrennte Mechaniken;
  Orbitarchiv speichert zwei Startkonfigurationen; Kosmetikprojekte haben sichtbare Effekte.
- Offensichtliche Canvas-Last reduziert: Im Effekt-Sparmodus werden die teuren
  Gegner-Aura-Gradienten tatsächlich nicht mehr erzeugt; Zeitwerte werden pro Frame
  wiederverwendet.
- Monetarisierung wurde ausdrücklich nicht bearbeitet.

## Kampflesbarkeit, HUD und Rückkehrmotivation (umgesetzt 14.08.2026)

Der gemeinsame UI-Block ist im Spielcode umgesetzt. Zahlenbalance des Fokus bleibt bis
zur Performance- und Laufmessung bewusst unverändert.

### Fokus und Machtbereitschaft

- Fokus wird durch Sweet-Spot-Treffer aufgebaut und verstärkt derzeit den nächsten
  aktiven Einsatz ungefähr um Faktor 1,9. Dieser Zusammenhang wird im Spiel nicht
  ausreichend erklärt oder sichtbar inszeniert.
- Fokus soll künftig ausschließlich von der Hauptmacht auf Taste 1 verbraucht werden.
  Die Unterstützungsmacht auf Taste 2 darf die Ladung nicht versehentlich stehlen.
- Die bisherige weiße Fokusleiste wird nicht als vierter gleichwertiger Balken oben
  links weitergeführt. Der Ladestand wandert als violett-weißer, klar segmentierter
  Ring an den Hauptmachtknopf. Ein kleiner Wert bleibt erhalten; voll geladen steht
  dort dauerhaft `BEREIT`.
- Volle Ladung markiert den Hauptmachtknopf dauerhaft, nicht nur durch einen kurzen
  Puls. Beim Verbrauch verbinden ein heller Ring am Spieler, eine stärkere Fassung des
  vorhandenen Machteffekts und ein eigener Klang sichtbar Sweet Spot und Machteinsatz.
- Der erste Fokusaufbau erhält einen knappen Lernhinweis: `Sweet Hits laden Fokus –
  volle Ladung verstärkt deine Hauptmacht.` Keine zusätzliche Fokus-Taste und kein
  weiteres Untermenü.
- Vor einer Zahlenänderung wird gemessen, wie schnell Fokus gegen Einzelziele und
  Gegnergruppen lädt. Falls Gruppen Fokus in einem Angriffstick vollständig füllen,
  wird die Ladung pro Tick gedeckelt statt das Ziel pauschal zu erhöhen.
- Beim Bau werden zugleich die bekannten Zustandsfehler behoben: Kernreserve muss
  dieselben Voll-Fokus-Auslöser verwenden, eine durch einen kleineren Zielwert bereits
  volle Leiste muss sofort bereit werden und volle Barriere muss unabhängig von ihrer
  Quelle erkannt werden.

**Umgesetzt:** Fokus wird nur von Aktiv 1 verbraucht, sitzt als violetter Innenring mit
Wert am Hauptmachtknopf und besitzt einen dauerhaften Bereitzustand. Der helle Effekt
am Spieler, eigener Klang und `FOKUS ×…` verbinden Ladung und verstärkten Einsatz. Der
erste volle Fokus erklärt die Mechanik einmalig. Kernreserve und Zielwertänderungen
laufen über denselben Voll-Fokus-Auslöser; volle Fokusbarriere zählt als Barriereziel.

### Cooldown-Anzeige

- Der vorhandene Kreis bleibt; eine standardmäßig eingeblendete Sekundenzahl ist nicht
  nötig. Das aktuelle dunkle `conic-gradient` ist jedoch während des Kampfs zu schwach.
- Zielbild ist ein breiter, kontrastreicher Außenring mit ruhiger Hintergrundspur und
  eindeutig fortschreitendem Farbbogen. Während des Cooldowns ist das Symbol gedämpft,
  bei Bereitschaft sind Ring und Symbol dauerhaft hell; ein kurzer Puls markiert nur
  den Übergang.
- Die Anzeige muss auch dann eindeutig sein, wenn der Bereitschaftspuls außerhalb des
  Blickfelds passiert. Farbe ist Zusatzsignal, nicht das einzige Signal.
- Beim Bau werden außerdem dynamische `aria-label`-Texte, ein fehlender-Slot-Guard und
  die Darstellung nach einer Cooldown-Änderung im Orbitpfad gehärtet.

**Umgesetzt:** Der Cooldown läuft als breiter, kontrastreicher Außenring von leer zu
voll; Symbol und Ring bleiben nach Ablauf hell. Fehlender Slot und dynamische Namen
sind abgesichert.

### Wiedereinstieg nach dem Orbitpfad

- Wird der Orbitpfad nach mindestens einer tatsächlich behaltenen Investition zurück
  in den laufenden Kampf geschlossen, bleibt die Arena noch zwei Sekunden eingefroren.
  Eine große, ruhige Anzeige zählt `2`, `1`, `LOS` und gibt Zeit, Gegnerposition,
  Klingenbahn und neue Wirkung wieder zu erfassen.
- Jede bewusste Bewegung überspringt den Rest sofort: WASD/Pfeiltaste am Desktop oder
  ein Joystickzug über die Totzone auf Touch. Ein bloßes Antippen löst den Kampf nicht
  versehentlich aus.
- Der Countdown erscheint nicht, wenn der Baum nur angesehen oder der letzte Kauf
  vollständig rückgängig gemacht wurde. Er erscheint ebenfalls nicht beim Rückweg in
  das Siegfenster oder bei anderen nicht laufenden Zuständen.
- Während der zwei Sekunden bleiben Gegner, Projektile, Cooldowns und Wellentimer
  vollständig pausiert. Beim Start des Kampfs wird die Framezeit neu gesetzt, damit
  kein Zeitsprung entsteht.
- Dafür wird eine kleine allgemeine Wiedereinstiegsfunktion gebaut; entfernter
  Kartenwahl-Code wird nicht wiederhergestellt.

**Umgesetzt:** Nur ein nach dem letzten Rückgängig verbleibender Kauf startet die
zweisekündige Pause. Tastatur- oder Joystickbewegung über der Totzone setzt den Kampf
sofort fort; Simulation, Cooldowns und Framezeit bleiben bis dahin eingefroren.

### Schlankeres Kampf-HUD

- Oben links bleiben dauerhaft nur Leben/Barriere und XP samt Level. Fokus gehört
  funktional zur Hauptmacht und wandert deshalb an deren Knopf.
- Die drei dauerhaften Aufgabenzeilen entfallen. Ein späterer einzelner Orbitauftrag
  erscheint im Kampf nur als kompakte Zeile oder Symbol mit Kurzfortschritt und
  verschwindet nach Abschluss.
- Welle und Fragmente werden rechts kompakter gruppiert. Ton wird in Pause/Einstellungen
  verlagert; der Pausenknopf und ausreichend große Touchflächen bleiben bestehen.
- Das HUD erhält eine echte schmale Mobilanordnung. Der rechte Block darf Leben, XP und
  Fokusinformation auf 360–393 Pixel breiten Geräten nicht mehr auf wenige Zeichen
  zusammendrücken.
- Die versprochene violette Risikozone der Leerenklinge wird als Markierung im
  Lebensbalken sichtbar, nicht als zusätzliche Textzeile. Die Boss-Überladung des
  Begleiters erhält einen lokalen Glow und einen kurzen Hinweis am Begleiter statt
  eines weiteren HUD-Balkens.

**Umgesetzt:** Links stehen nur Leben/Barriere und XP/Level. Ein einzelner persistenter
Orbitauftrag ersetzt die alten Laufziele: volle Karte zwischen Läufen, Kurzfortschritt
im Kampf und sofortiger Fragmentlohn beim Abschluss. Welle und Fragmente sind kompakt
gruppiert, Ton liegt nur noch in den Einstellungen, die Leerenzone ist im Lebensbalken
markiert und Boss-Überladung leuchtet am Begleiter.

### Nutzen und Ersatz der aktuellen Laufziele

Die aktuelle Fassung wählt drei von neun Laufzielen und zahlt im Mittel ungefähr
190 Fragmente. Ihr Mehrwert ist zu klein für die dauerhaft belegte Fläche:

- Welle, Kills und Fragmente quittieren überwiegend normales Weiterspielen;
- `Macht auf Stufe 5` und `Entwickle eine Macht` werden durch denselben, für die Krone
  ohnehin notwendigen Evolutionskauf erfüllt;
- das Barriereziel berücksichtigt nicht alle Barrierequellen und passt schlecht zur
  Leerenklinge;
- erledigte Ziele bleiben durchgestrichen im HUD; der Laufstand überlebt kein Neuladen.

Die drei Zufallsziele sind deshalb durch genau einen **Orbitauftrag** ersetzt:

- ein aktiver, nicht verfallender Auftrag, dessen Fortschritt über Läufe erhalten bleibt;
- passend zu gewähltem Charakter und verfügbaren Mechaniken, nie zu gesperrtem Inhalt;
- 150–200 vorhandene Fragmente als Belohnung, keine neue Währung und kein Abholknopf;
- vollständige Karte vor dem Lauf und in Pause/Ergebnis, im Kampf nur Kurzfortschritt;
- nach Abschluss aus dem Kampf-HUD entfernen; ein neuer Auftrag folgt ohne Loginserie;
- höchstens ein kostenloser Tausch pro Kalendertag, damit ein unpassender Auftrag nicht
  blockiert, aber kein Aufgaben-Reroll-Spiel entsteht.

Orbitauftrag v1 nutzt bewusst nur robuste vorhandene Kampfhooks: fokussierte
Hauptmächte einsetzen, einen Boss ohne Lebensschaden besiegen, Panzer im Sweet Spot
treffen sowie charaktergerechte Lichtbarrieren oder Risiko-Fokus erzeugen. Serien-
und Rammbockaufträge bleiben spätere Erweiterungen. Reine Wellen-, Kill-, Fragment-
und Evolutions-Checklisten entfallen.

### Spätere tägliche Motivation

Orbitblade soll täglich einen interessanten Lauf anbieten, aber keinen Login erzwingen.
Die Reihenfolge ist bewusst klein:

1. Der nicht verfallende Orbitauftrag liefert zunächst jederzeit einen konkreten Grund
   für den nächsten normalen Lauf.
2. Erst nach stabiler Laufbalance und deterministischem Zufall folgt das optionale
   **Tagessignal**: gleicher Datums-Seed für alle, festgelegter Charakter und Hauptmacht,
   genau ein positiver Twist und eine Einschränkung, normaler Welle-30-Kernlauf.
3. Gewertet werden persönliche Bestmarke und ein kurzer teilbarer Ergebniscode. Ohne
   Server wird keine manipulationssichere globale Rangliste behauptet. Die letzten
   sieben Signale bleiben zum Nachspielen verfügbar.
4. Die erste Beendigung gibt eine kleine Fragmentbelohnung; exklusive Tageskosmetik,
   Login-Streaks, verfallende Belohnungen und tägliche Pflichtläufe sind ausgeschlossen.
5. Später können wenige dauerhafte Charakter- und Machtmeisterschaften rein kosmetische
   Spuren, Rahmen oder Hangarprojektionen vergeben. Sie ersetzen keine Werkstattkraft.

### Spieltest bis Welle 26 und neue Performance-Priorität

Der veröffentlichte Stand wurde am 13.08.2026 bis Welle 26 gespielt. Die Kernschleife
lief grundsätzlich gut und der Orbitpfad wurde als deutliche Verbesserung bewertet.
Der Lauf lieferte jedoch einen glaubhaften Hinweis auf nachlassende Performance in den
späten Wellen. Gerät, konkrete Bildrate und gewählter Build wurden bei diesem Lauf noch
nicht mitprotokolliert; der Befund ist deshalb ein klarer Diagnoseauftrag, noch keine
fertige Ursachenmessung.

- Welle 20 plant rechnerisch 78 Gegner, Welle 26 bereits 115 und Welle 29 136. Welle 26
  ist direkt nach dem Boss bei Welle 25 der erste große Massensprung und damit ein
  plausibler Punkt für sichtbare Einbrüche. Die Zahl beschreibt die ganze Welle, nicht
  zwingend gleichzeitig lebende Gegner.
- Draw-Culling, Partikelobergrenze, Abschalten von `shadowBlur`, DPR-Limit und
  `sparmodus` sind bereits vorhanden. Die globale Simulation bearbeitet trotzdem alle
  Gegner, Projektile, Beuteobjekte und Machtfelder.
- Besonders zu prüfen sind mehrfach verschachtelte Gegnerabfragen bei Sweet Hits,
  Nachhall/Gravitationskern/Ketteneffekten, die Kollision jedes Spielerprojektils gegen
  alle Gegner sowie Felder, die ihre eigene Gegnerprüfung ausführen.
- Auch die Grafik bleibt verdächtig: Nebel- und Rasterverläufe werden weiterhin pro
  Bild erzeugt; der Sparmodus reduziert hauptsächlich DPR und Leuchten, nicht die
  Hintergrundebenen oder deren Aktualisierungsrate.
- Das vorhandene `?perf=1` zeigt nur momentane FPS-, Update- und Draw-Zeiten sowie
  Gegner und Partikel. Für eine belastbare Diagnose braucht die nächste Messfassung
  über 60–90 Sekunden Durchschnitt und P95/Maximum, getrennte Update-/Draw-Zeit,
  Gegner sichtbar/gesamt, Projektile, Felder, Beute, Partikel sowie den Zustand von
  DPR, Sparmodus und Effekten.
- Zuerst werden datenbasiert offensichtliche Rechen- und Zeichenlasten entfernt. Die
  Gegnerdichte oder Wirkungsbalance wird nur verändert, wenn Messung und Spielgefühl
  zeigen, dass nicht allein die Implementierung das Problem ist.

## Nächste Arbeitsreihenfolge

1. Performancepunkt 1 ist abgeschlossen; der Orbitauftrag ist umgesetzt.
2. Einen echten Standardlauf bis Welle 30 direkt mit einem Echo bis Boss 40 fortsetzen;
   Punkt-, Evolutions-, Kronen- und Siegzeit sowie Effektlast notieren. Das zweite Echo
   darf zeitsparend über den vorhandenen Messlauf-Einstieg bis Boss 40 geprüft werden.
3. Danach ausschließlich grobe Balanceausreißer bei XP-Kurve und Wirkungszahlen
   korrigieren.

Vom Nutzer bewusst auf später verschoben bleiben das tote Hangar-Zwischen-Overlay,
alle drei Bestmarken, kosmetisches Hangarprestige, die Pixel-9-Gegenprobe,
deterministischer Seed und Tagessignal sowie Rangmodus und Monetarisierung.

Kein umfangreiches Testnetz aufbauen; das Spiel ist noch nicht produktiv. Nach
Änderungen genügen derzeit proportionale Checks: mindestens
`node --check konzept/game.js` und betroffene Klickwege über GitHub Pages.

## Auslese: Kartenwahl alle drei Wellen (umgesetzt 18.08.2026)

Erste Etappe gegen den Befund „gleichartige Buffs, kaum Wiederspielwert". Der
Orbitpfad bleibt unverändert; die Auslese ist eine **zweite, unabhängige Quelle**
für dieselben passiven Fähigkeiten und die erste Stelle im Spiel, an der zwischen
Läufen etwas anderes passiert.

- Auslösung bei Welle 3, 6, 9, 12, 15, 18, 21, 24 und 27 — also `wave%3===0 &&
  wave<CONFIG.siegWelle`, angehängt an das Ende von `startWave()`. Eine gemerkte
  Wellennummer (`letzteAusleseWelle`) sichert genau eine Auslese je Welle; sie wird
  auch dann gesetzt, wenn der Topf leer ist, damit ein leerer Topf die Welle nicht
  immer wieder neu anfragt. In Endlos gibt es keine Auslese.
- Der Topf sind die sechs Passiven aus `PASSIVE_IDS` **ohne** die Partnerpassive der
  aktuellen Hauptmacht (`EVOLUTIONS[…].req`) — sonst kollidierten Baum und Auslese
  auf derselben Fähigkeit.
- Je Passive existieren genau zwei Karten: `Neu` setzt Stufe 1, `Verstärkt` springt
  direkt auf `SPRUNG_STUFE` und ist gold hervorgehoben. Die Zwischenstufen 2 und 3
  sind über `abilScale()` nur +10 % und +20 % und kommen bewusst nicht als Karte vor.
- Gezogen werden drei verschiedene Karten ohne Gewichtung. Die zustandsabhängige
  Gewichtung nach Hades-Vorbild ist eine spätere Etappe.
- Neuwürfeln: einmal je Lauf gratis, danach 50, 100, 200 und ab dem vierten Mal
  400 Fragmente aus dem Laufkonto. Reicht das Guthaben nicht, ist der Knopf gesperrt,
  nennt aber weiterhin den Preis.
- Pausiert wird nach dem Muster von `openSkillTree()`; `update()` steht still, weil es
  mit `state!=='playing'` aussteigt. Beim Schließen läuft derselbe zweisekündige
  Wiedereinstieg wie nach einem Baumkauf — die Auslese hält mitten im Kampf an und
  schaltet eine neue Mechanik frei.
- Bei Welle 15 fallen Boss und Auslese zusammen. `spawnBoss()` startet die
  zehnsekündige Begleiter-Überladung über `Date.now()`; die Restzeit wird beim
  Schließen um die Lesedauer verschoben, sonst verstriche sie im Overlay.

Jede Karte trägt links das SVG-Symbol ihrer Fähigkeit aus derselben `ICON`-Tabelle,
die auch Vorbereitung, Sammlung und Werkstatt nutzen — eine Fähigkeit sieht überall
gleich aus. Drei Symbole waren dabei falsch oder fehlten und sind mitkorrigiert:

- `phaser` trug denselben Blitz wie `tempo`, obwohl er automatisch schießt; jetzt
  Emitter mit zwei Geschossen. Das Begleiterprojekt `Impulsauge` nutzt denselben
  Schlüssel und profitiert mit.
- `nachhall` lieh sich `boost`, eine Flamme; jetzt eine Druckwelle. Das Kosmetikprojekt
  `Spurenlabor` zeigte dadurch bisher gar kein Symbol und hat nun eins.
- `schaden` (von `schneide` genutzt) war bei 26 px nur ein dünner Strich; jetzt Klinge
  mit hellem Aufschlag.
- `Farblabor` verwies auf den nie existierenden Schlüssel `schneide` und blieb leer;
  es hat jetzt ein Palettensymbol. Damit hat jedes der 16 Werkstattprojekte ein Symbol.

Gemessen an 2.000 simulierten Kartenfolgen:

- Der Topf trägt über alle neun Auslesen. Bis zur achten liegen immer drei Karten zur
  Wahl, bei der neunten im Schnitt 2,9 — jede `Neu`-Wahl legt sofort die zugehörige
  `Verstärkt`-Karte nach.
- 50 verschiedene Endzustände, der häufigste in nur 2,8 % der Läufe. Das ist deutlich
  mehr Streuung als die acht Buildformen des Orbitpfads.
- **Die eigentliche Grenze ist die Breite, nicht die Menge:** im Schnitt trägt ein Lauf
  am Ende 5,41 von 6 Passiven. *Welche* Fähigkeiten man bekommt, ist damit kaum eine
  Entscheidung — nur noch, welche man vertieft. Kein einziger Lauf brachte alle sechs
  auf die Sprungstufe, die Tiefe bleibt also knapp.

Das ist für diese Etappe so vorgesehen. Erst die nächste Etappe mit neuen Karteneffekten
macht den Topf so groß, dass die Auswahl auch in der Breite wehtut.

Nebenbefund aus dem Test, nicht durch die Auslese verursacht: Fast alle Zeitfenster
im Spiel hängen an `Date.now()` und laufen weiter, während ein Overlay offen ist. Der
Orbitpfad hat dieselbe Eigenschaft. Eine gemeinsame pausierbare Zeitbasis wäre die
saubere Lösung und steht im Backlog.

## Bosse: Raumhebel, zweite Phase und eigene Telegrafie (umgesetzt 18.08.2026)

Antwort auf den Befund „Boss-Mechaniken sehr ähnlich". Die Ursache war **nicht** der
geteilte Bewegungsvorrat, sondern eine Reichweitenrechnung:

- Kontaktschaden beginnt bei 56 px (Bossradius 34 + Spielerradius 18 + 4).
- Die Orbitklinge trifft den Boss bis 72 px (Klingenlänge 38 + Bossradius 34).
- In diesem **16-px-Band** trifft der Spieler, ohne getroffen zu werden.
- Mit 175 gegen 105 px/s kann kein Boss das Band je schließen.
- `CONFIG.boss.shockInner` liegt bei 95 und bedroht das Band nicht einmal.

Ohne einen Hebel, der den Spieler dort vertreibt, wären neue Mechaniken nur neue Dinge
zum Aussitzen gewesen. Die Fachliteratur sagt dasselbe: Ein Boss braucht zwingend eine
Fähigkeit, sich Raum zu verschaffen, sonst ist der Kampf keine Prüfung (Mike Stout,
Insomniac). Und eine Vorwarnung ist erst fair, wenn sie zeigt, **welche Handlung** nötig
ist — nicht nur, dass etwas kommt.

### Gemeinsame Grundlagen

- `bossHazards` ist das gemeinsame Feld für Gefahrenzonen, `kind:'brand'` (ortsfester
  Kreis) und `kind:'arm'` (rotierender Balken, folgt dem Bossmittelpunkt). Jeder Eintrag
  hat einen eigenen Tick-Zähler von 400 ms; ohne den würde `hurtPlayer()` jedes Bild
  feuern und die Zone wäre sofort tödlich statt raumverknappend. Deckel 40 Einträge.
- **Phasenwechsel bei 50 % Leben:** 900 ms Unverwundbarkeit mit Ansage und Pulsring,
  danach dauerhaft 25 % kürzere Abklingzeiten und die stärkere Fassung der
  Exklusivmechanik. Weil es keine zentrale Schadensfunktion gibt — 32 Stellen ziehen
  direkt von `en.hp` ab — wird der Schaden während der Unverwundbarkeit zentral in der
  Boss-Aktualisierung zurückgesetzt.
- Jede Variante trägt ihre Exklusivmechanik in `BOSS_KINDS.exklusiv`. `pickBossAbility`
  gewichtet sie am höchsten. **Gemessen und korrigiert:** Ohne eigene Gewichtung kam der
  Spiegelschild bei Welle 25 in nur 17 % der Angriffe vor, der generische Schockring in
  33 % — die Signatur des Bosses war seltener als die Allerweltsattacke. Jetzt liegt die
  Exklusivmechanik bei 31 bis 50 %.

### Die vier Raumhebel

- **Wächter · `Spiegelschild`** — Bogen zur Spielerseite, dreht mit höchstens 1,1 rad/s
  mit und verdrängt jeden, der davor steht (110 px, ±70°, Phase 2 ±90°). Er blockiert
  bewusst keinen Schaden; Verdrängung ist der Hebel. Gemessen: Ein Spieler, der auf 70 px
  kreist, schafft 2,50 rad/s und ist damit 60 % der Zeit hinter dem Schild. Umrunden ist
  die Antwort, Stehenbleiben nicht.
- **Brutmutter · `Brutknoten`** — zwei (Phase 2: drei) ortsfeste Knoten, die den Boss
  heilen. Sie sind echte `enemies`-Einträge vom Typ `knoten`, damit die Klinge sie ohne
  Sonderweg trifft; `brutknoten` unterdrückt den 1,8-%-Rückschlag, den `bossMinion`
  sonst auslöst. Antwort: Boss stehen lassen, Ziele priorisieren.
- **Rammbock · `Brandspur`** — die Ramme legt alle 90 ms ein Brandfeld ab, sechs bei
  voller Ramme, Lebensdauer 4 s. Antwort: früh die Seite wechseln.
- **Spiralwerfer · `Drehsperre`** — zwei (Phase 2: drei) rotierende Balken mit 0,9 bzw.
  1,3 rad/s, Länge 130 px. Sie überstreichen genau das sichere Band und sind mit 2,5 rad/s
  überholbar. Antwort: mit der Drehrichtung mitlaufen.

Dazu hat jede Fähigkeit jetzt eine eigene Vorwarnform statt des früheren Einheitsrings.

### Nachgemessene Grenze der Knotenheilung

Der ursprüngliche Entwurf (0,6 % je Knoten, drei Knoten in Phase 2 = 1,8 %/s) war
**nicht sicher**: Ein Spieler, der die Knoten ignoriert und nur am Boss klebt, brachte
Welle 30 von Nettoschaden auf Nettoheilung — der Boss wurde nie besiegt.

Gedeckelt wird deshalb die **Gesamtheilung** bei 1,2 %/s, nicht die Zahl der zählenden
Knoten. Ein Deckel auf die Knotenzahl hätte denselben Effekt, aber der dritte Knoten
wäre wirkungslose Deko — und die pulsierende Leitung zu ihm würde den Spieler belügen.

Gemessen mit ignorierten Knoten: Ein Spieler, der den Finalboss ohne Heilung in bis zu
90 s schaffen würde, gewinnt weiterhin. Erst darunter friert der Kampf ein, und dann ist
das Zerstören der Knoten die vorgesehene Antwort. Ein normaler Welle-30-Kampf dauert
gemessen 20 bis 26 s, der Abstand ist also groß. Die Heilung ist an der Lebensleiste
über dem Boss ablesbar.

### Prüfkriterium für den Spieltest

Der Kampf muss mit starkem Build durch schlechtes Laufen verlierbar und mit schwachem
Build durch gutes Laufen gewinnbar sein. Vor dieser Änderung war beides nicht der Fall.

## Auslese v2: fünf eigene Karteneffekte (umgesetzt 18.08.2026)

Der Topf bestand nur aus den sechs Passiven. Gemessen trug ein Lauf am Ende 5,43 davon
— 91 %. *Welche* Fähigkeiten man bekommt, war damit keine Entscheidung, nur noch, welche
man vertieft. Fünf neue Effekte in einer eigenen Tabelle `AUSLESE_MODULE` beheben das;
der getragene Stand liegt in `runModule` (id → Rang 1 oder 2), getrennt von `runAbilities`.
Sie stehen bewusst **nicht** in `ABILITIES`, weil die Tabelle auch Vorbereitung, Sammlung
und Orbitpfad speist.

- `Klingenteilung` — eine zusätzliche gleichlaufende Klinge, Rang 2 noch eine.
  **Ersetzt seit dem Spieltest den früheren `Gegenlauf`**, siehe unten.
- `Taktschlag` — jeder dritte volle Umlauf mit Sweet Hit stößt eine Welle aus, Rang 2
  jeder zweite und mit Verlangsamung. Hängt an `orbitSweetPulse()`.
- `Nachfassen` — ein verfehlter Umlauf verbreitert den nächsten Sweet-Bogen einmalig,
  Rang 2 durchschlägt damit Panzerung. Hängt an `resetMissedOrbit()`.
- `Glasklinge` — Klingenschaden ×1,45, dafür nur noch 60 % maximales Leben. Rang 2 ×1,80
  und keine Barriere mehr.
- `Kurzschluss` — Mächte laden 35 % schneller, jeder Einsatz kostet 4 % Leben. Rang 2
  60 % schneller, bei vollem Fokus kostenlos.

### Warum genau fünf und nicht zehn

Simuliert über je 4.000 Kartenfolgen:

| Dinge | getragen | Anteil | davon auf Sprungstufe | Endzustände |
|---|---|---|---|---|
| 6 (vorher) | 5,43 | 91 % | 3,57 | 50 |
| 8 | 6,08 | 76 % | 2,92 | 982 |
| **11 (jetzt)** | **6,66** | **61 %** | **2,35** | **2.740** |
| 16 | 7,22 | 45 % | 1,78 | 3.981 |

Die Vielfalt sättigt bei rund zehn Dingen: Von 6 auf 8 springen die Endzustände um
Faktor 20, von 11 auf 16 kaum noch. Und größer wird sogar schlechter — die vorletzte
Spalte ist die entscheidende, denn nur auf der Sprungstufe passiert die eigentliche
Mechanik. Bei 16 Dingen trüge ein Lauf 7,2 Fähigkeiten, davon nur 1,78 mit echtem
Effekt: ein breiter, flacher Matschbuild statt eines Charakters.

Am echten Code über 3.000 Läufe gegengemessen: 6,66 getragen, 2,35 auf Sprungstufe,
2.740 verschiedene Endzustände, häufigster in 0,10 % der Läufe.

### Verworfen: Glasklinge als Präzisionskarte

Der erste Entwurf entfernte die verzeihende Rundumzone und sollte Präzision belohnen.
Gemessen war sie **bei jeder Zielzahl schlechter als gar keine Karte**: 60–65 % des
Grundschadens auf Rang 1, 78–85 % auf Rang 2, gegen einen Boss ebenso wie gegen sechzehn
Gegner. Auch die Gegnerlage änderte nichts (60 % im Rundumkessel gegen 62 % bei dichter
Gruppe).

Grund: **Die Klinge rotiert permanent und überstreicht ohnehin jeden Winkel.** Präzision
ist in diesem Spiel keine Achse, auf der man handeln kann — anders als Distanz. Ein
bloßes Anheben der Zahlen hätte sie in einen reinen Prozentkauf verwandelt. Der Preis
sitzt deshalb jetzt beim Leben, wo er sichtbar ist und tatsächlich eine Entscheidung
darstellt. Das maximale Leben sinkt genau einmal, beim ersten Kauf.

### Ersetzt: Gegenlauf durch Klingenteilung (18.08.2026)

Der Nutzer fand die gegenläufige Klinge optisch unruhig und wünschte sich stattdessen
eine dritte gleichlaufende. Nachgemessen war seine Einschätzung auch mechanisch richtig:
Gegenlauf lag gegen ein Einzelziel bei 95 %, eine zusätzliche gleichlaufende Klinge bei
113 %.

Beim Umbau fiel eine zweite Falle auf. Eine schlichte Zusatzklinge nützt **je nach Zweig
völlig unterschiedlich**, weil `sweetArcHalf()` die Zone je Klinge auf drei Viertel
schrumpft und den Gewinn auffrisst:

| ausgehend von | schlicht +1 Klinge |
|---|---|
| Präzisionsorbit (1 Klinge) | +17 % |
| Doppelorbit (2 Klingen) | **+3 %** |

Für die Hälfte aller Builds wäre sie damit eine tote Karte gewesen — derselbe Fehler wie
bei der ersten Glasklinge. `sweetKlingenFaktor()` gleicht das jetzt aus (×1,22 auf Rang 1,
×1,42 auf Rang 2). Die Zone schrumpft weiterhin, damit Positionieren zählt; nur der
Treffer wiegt schwerer. Gemessen danach:

| | 1 Ziel | 16 Ziele |
|---|---|---|
| Präzisionsorbit, Rang 1 / 2 | 130 % / 144 % | 127 % / 147 % |
| Doppelorbit, Rang 1 / 2 | 110 % / 128 % | 113 % / 123 % |

Der Sweet-Halbwinkel sinkt bei vier Klingen von 28,6° auf 12,1° — die Karte bleibt ein
Zugewinn mit Preis, nur ist der Preis jetzt Präzision statt Wirkungslosigkeit.

Noch offen: die zustandsabhängige Gewichtung nach Hades-Vorbild. Sie ergibt erst Sinn,
seit der Topf groß genug ist, und ist die nächste Etappe.

## Prüfstufen als Endspiel (Stufen 1–4 umgesetzt 18.08.2026)

Antwort auf den letzten offenen Befund: „kaum Langfristnutzen vom wiederholten Spielen".
Nach neun bis fünfzehn Siegen sind alle 16 Werkstattprojekte gebaut, danach sind
Fragmente wertlos und es gibt keinen Grund mehr für den nächsten Lauf.

### Warum keine Währungssenke

Die naheliegende Lösung wäre eine neue Senke gewesen, in die man Fragmente kippt. Die
Recherche bei den erfolgreichsten Roguelites zeigt, dass diese Gattung das Problem
**anders** löst:

- **Hades — Pakt der Strafe:** Der Spieler schaltet selbst Erschwernisse zu, jede erhöht
  einen Wert namens „Hitze". Jede Hitzestufe macht die bereits verdienten Belohnungen
  erneut verdienbar. Gezählt wird pro Waffe: sechs Waffen mal 20 Stufen ergeben hunderte
  sinnvolle Läufe aus vorhandenem Material. Bei Hitze 20 ist Schluss — bewusst endlich.
- **Slay the Spire — Aufstieg:** 20 gestapelte Erschwernisse, jede erst freigeschaltet,
  wenn die vorherige geschafft ist. Keine Währung im Spiel. Selbst Experten gewinnen auf
  Aufstieg 20 nur noch rund 30 % ihrer Läufe.
- **Dead Cells — Bosszellen:** dasselbe Muster in fünf Stufen.

Das Muster: **Der Endspielinhalt ist selbstgewählte Schwierigkeit, freigeschaltet durch
Können statt gekauft.** Damit erübrigt sich die Senke — Fragmente dürfen wertlos werden,
wenn der Antrieb nicht mehr an ihnen hängt.

### Form

- `Prüfstufe 1` erscheint nach dem ersten Welle-30-Sieg auf Standard oder Meister.
- Stufe N wird erst sichtbar, wenn N−1 gewonnen wurde. Kein Rosinenpicken.
- Jede Stufe **stapelt** auf alle vorherigen.
- Acht Stufen. Begründung siehe Messung unten.
- Bestmarke je Prüfstufe, getrennt wie heute schon je Hilfsstufe.
- Die Sammlung zeigt, welche der zehn Kombinationen aus zwei Charakteren und fünf
  Hauptmächten auf welcher Stufe geschafft wurden — das ist Hades' Waffen-Multiplikator
  als Anzeige, ohne Zwang, alle durchzuspielen.

### Die acht Bedingungen

Alle nutzen vorhandene Regler; es braucht keine neuen. Neun sitzen in `diffAt(wave)`,
fünf in `HILFEN`.

1. `Dichte` — Gegnerzahl +12 %
2. `Härte` — Panzerdurchlass halbiert
3. `Knappe Wahl` — die Auslese bietet nur noch zwei Karten statt drei
4. `Zäher Kern` — Bosse +25 % Leben
5. `Wachsamkeit` — Boss-Vorwarnung −20 %
6. `Ausgeblutet` — Lebensregeneration halbiert, Lebenskugeln seltener
7. `Früher Druck` — Panzergegner ab Welle 3, Bosse alle vier statt fünf Wellen
8. `Zwei Phasen` — Bosse wechseln schon bei 70 % statt 50 % Leben in Phase 2

### Belohnung

Ausschließlich Kosmetik und Abzeichen, **niemals Kampfkraft** — sonst würde aus dem
freiwilligen Regler eine Pflicht. Freigeschaltet wird direkt durch das Bestehen, nicht
gekauft; das ist das Modell von Slay the Spire und macht die Senkenfrage gegenstandslos.

Achtung, das berührt eine bestehende Leitplanke: In diesem Dokument steht „Hilfen sperren
keine Inhalte". Prüfstufen schalten sehr wohl etwas frei. Vereinbar ist das nur, weil sie
die **Gegenrichtung** der Hilfen sind und ausschließlich Kosmetik vergeben.

### Gemessene Größenordnung

Druck bei Welle 25, definiert als Gegnerzahl × Schaden × Tempo:

| | Gegner | Druck | Panzerdurchlass |
|---|---|---|---|
| Entdecker | 76 | 70 | 55 % |
| Standard | 109 | 200 | 25 % |
| Meister | 136 | 350 | 10 % |
| **Prüfstufe 8** | 152 | **494 (141 % von Meister)** | 5 % |

Der Sprung von Standard zu Meister ist mit +75 % größer als die gesamte Achterleiter mit
+41 %. Die Leiter ist damit bewusst konservativ; falls der Spieltest zeigt, dass oben Luft
bleibt, lassen sich Stufen ergänzen, ohne die unteren anzufassen.

**Grenze dieser Messung:** Vier der acht Bedingungen bewegen den Druckwert gar nicht
(`Knappe Wahl`, `Zäher Kern`, `Zwei Phasen`, teils `Härte`). Sie ändern, *was* der Spieler
tut, nicht *wie viel* auf ihn zukommt — genau das Hades-Prinzip. Ihre Wirkung lässt sich
nur im Spieltest beurteilen. Die Stufenzahl acht ist deshalb ein begründeter Startwert,
kein bewiesenes Optimum.

### Umgesetzt: Stufen 1 bis 4

Die Stufen 5 bis 8 folgen erst nach einem echten Prüflauf — acht Stufen blind zu
balancieren wäre geraten.

- `PRUEFSTUFEN` hält die vier Stufen, `save.pruefFrei` den Freischaltstand. Er wird
  überall als `save.pruefFrei||0` gelesen, deshalb bleibt `SAVE_VERSION` bei 9 und alte
  Spielstände funktionieren unverändert.
- **`hilfe()` liefert ein zusammengesetztes Objekt.** Es beginnt bei `HILFEN.meister` und
  wendet die Bedingungen 1..N gestapelt an. Weil `hilfe()` nur an acht Stellen gelesen
  wird und nur die Felder `gegner`, `name`, `panzerAb`, `panzerDurchlass`, `schaden` und
  `wiederauf`, musste **keine einzige Aufrufstelle** angefasst werden. Zwei neue Felder
  kamen dazu: `ausleseKarten` und `bossHp`.
- `hilfeId()` weist Stufen ab, die nicht freigeschaltet sind — ein manipulierter
  Spielstand kann Stufe 4 nicht erzwingen.
- Freigeschaltet wird in `sieg()`: Sieg auf Standard oder Meister öffnet Stufe 1, Sieg
  auf Stufe N öffnet N+1, gedeckelt bei vier. Ein Messlauf schaltet nichts frei.
- `Zäher Kern` multipliziert das Bossleben **vor** dem Finalbonus ×2,2, damit sich beide
  Faktoren multiplizieren statt zu ersetzen. Nachgemessen: Finalboss Welle 30 steigt von
  12.091 auf 15.114, Verhältnis exakt 1,25.
- Gegnerzahl bei Welle 25: Meister 136 → Prüfstufe 4 152.

Anzeige: Die Stufen setzen die Liste in der Vorbereitung fort, die vorher nur die drei
Hilfsstufen zeigte. Der Reiter heißt jetzt `Stufe` statt `Hilfe`. Jede Prüfstufenkarte
belegt eine volle Zeile und nennt **alle gestapelten** Bedingungen, nicht nur die neue —
bei drei Spalten wären es auf 393 px nur 120 px je Karte und der Text unlesbar.

**Wer noch nie gewonnen hat, sieht exakt die drei Karten wie bisher.** Erst nach dem
ersten Sieg erscheinen die freigeschalteten Stufen und ein gedämpfter Ausblick auf die
nächste. Ohne diese Regel hätte ein Neuling eine gesperrte achte Schwierigkeitskarte
gesehen, die ihn nichts angeht.

## Kiten behoben: Jäger bekommen einen Rhythmus (umgesetzt 18.08.2026)

Spieltestbefund: „beim Gameplay ist man irgendwie nur noch am Kiten" und „mit dem
Schwert bekomme ich sie eigentlich nur, wenn ich Schaden nehme".

### Ursache, gemessen

- **28 % aller Gegner ab Welle 15 sind `jaeger`.** Bei 109 Gegnern auf Welle 25 sind das
  rund 30 Schützen.
- Ihre Reichweite ist 300 px. Die Orbitklinge reicht 72 px, Kettenblitz 140, Bombe wird
  am eigenen Ort gelegt, Nova 190, Phaser 260. **Nur der Sog erreicht 300 px** — und der
  ist eine aktive Macht mit Abklingzeit.
- `keepRange` stoppte den Jäger, sobald er innerhalb von 300 px war. Danach bewegte er
  sich **nie wieder**, auch nicht während seiner Abklingzeit. Er war ein stehender
  Geschützturm außerhalb jeder Reichweite.

Mit einem Build aus Bombe und Nova gab es gegen jeden vierten Gegner keine Antwort außer
hinterherlaufen. Das ist kein Balancegefühl, sondern eine Lücke.

### Behebung

`en.jagdPhase` mit drei Phasen ersetzt den Standplatz:

- `an` — läuft heran bis `CONFIG.jaeger.haltNah` (115 px)
- `laden` — steht still, lädt die vorhandenen 850 ms sichtbar auf, feuert
- `zurueck` — weicht bis `haltFern` (270 px) zurück, dann von vorn

`chargeMs` (850) und `cooldown` (700) blieben unverändert — das Ausweichfenster
funktionierte. 115 px liegt knapp hinter der Klingenreichweite gegen einen Jäger
(72 + Radius 16 ≈ 88 px): Wer während des Ladens hineingeht, tötet ihn, riskiert dafür
aber seine Position.

Gemessen an einem einzelnen Jäger über 30 s gegen einen stillstehenden Spieler:

| | vorher | jetzt |
|---|---|---|
| Schüsse | ~19 | 13 |
| Zeit innerhalb 120 px | 0 s | 12,3 s |
| nächste Annäherung | 300 px | 113 px |

Die Bedrohung sinkt um rund ein Drittel, dafür ist der Jäger 41 % der Zeit mit einem
kurzen Schritt erreichbar. Falls der Spieltest zeigt, dass es zu leicht wurde, ist
`haltFern` der einzige Regler: kleiner heißt kürzere Wege und mehr Schüsse.

### Mitkorrigiert

- **Drehsperre des Spiralwerfers entschärft**: Schaden 14 → 9, Dauer 3500 → 2600 ms.
  Armzahl, Länge 130 und Drehtempo bleiben — sie sind der Charakter des Bosses, nur die
  Härte war zu hoch. Der Spieler berichtete, dass Welle 20 im Nahkampf zu stark ist; das
  war eine Folge des Raumhebels aus derselben Sitzung.
- **Glasklinge sagte „Klinge ×1,45"**, gemeint war Schaden. Der Spieler las es als Größe
  und wunderte sich, dass die Klinge nicht wächst. Text jetzt „Klingenschaden ×1,45";
  zusätzlich bekommt die Klinge einen sichtbaren Glascharakter — schmalerer, kalter Kern
  und ein wandernder Schimmer —, sonst bleibt der Handel gefühlt einseitig.

### Offen

`CONFIG.jaeger.shootRange` und `en.shootRange` werden seit der Umstellung nirgends mehr
gelesen, nur noch zugewiesen. Totes Feld, bewusst stehen gelassen.

## Orbitpfad v3: jeder Punkt eine ganze Mechanik (umgesetzt 18.08.2026)

Spieltestbefund: „jeder Punkt sollte einen stärker machen, keine Mehrfachpunkte pro Baum.
Inkl. Abzweigungen, damit es etwas weh tut, wenn man sich für eins entscheidet."

Gemessen war das genau richtig: Der Pfad hatte 14 Knoten, aber **fünf davon fraßen zwölf
der fünfzehn Punkte über Rangleitern** — Partnerpassiv (2), Klingenmodul (2),
Machtmeisterschaft (3), Machtmodul (2), Orbitresonanz (3). Ein einzelner Punkt kaufte
dort nur einen Bruchteil einer Mechanik.

### Neue Form

Alle Rangleitern sind aufgelöst. **Jeder Knoten kostet einen Punkt und schaltet eine
vollständige, benannte Mechanik frei**; nur die Krone behält ihre zwei Ränge wegen
`Startimpuls`/Kernreserve.

| Reihe | Knoten |
|---|---|
| 0 | Doppelorbit / Präzisionsorbit *(Weiche)* |
| 1 | Hauptmacht A / B *(Weiche)* |
| 2 | Partnerpassiv · Klingenmodul I · Klingenmodul II |
| 3 | Charakterhaltung A / B *(Weiche)* |
| 4 | Meisterschaft I · II · III |
| 5 | Machtmodul I · II · Klingensynergie |
| 6 | Evolution · Kopplung · Sofortschaltung |
| 7 | Resonanzklinge · Orbitkrone |

20 Knoten, 17 kaufbare Punkte bei 15 Budget, acht Reihen wie zuvor — das Raster hat
sieben Spalten, drei Knoten je Reihe passen ohne Scrollen.

### Warum keine zusätzlichen A/B-Weichen

Ursprünglich sollten Klingen- und Machtmodul zu Weichen werden. Beim Lesen des Codes
zeigte sich, dass `treeFlags.bladeModule`, `powerModule` und `powerMaster` überall
**kumulativ** gelesen werden (`>=1`, `>=2`). Eine Weiche hätte rund zehn Lesestellen
umbauen müssen, mit echtem Risiko für die Wirkungen. Die Module bleiben deshalb
aufeinanderfolgend — der Verzicht sitzt weiterhin in den drei vorhandenen Weichen plus
den zwei Punkten, die bei 17 Angeboten und 15 Budget liegen bleiben.

### Nebenbefund: die Doku war an einer Stelle falsch

Der Auftrag beschrieb die Wirbel-Meisterschaft nach dem Konzeptabschnitt weiter oben in
dieser Datei („Fokus-Wirbel erlaubt kurz das Durchlaufen kleiner Gegner"). Diese Mechanik
existiert im Code nicht. Die tatsächlichen drei Stufen sind Radius +14 %, ein Extra-Treffer
im Zentrum und ein zweiter äußerer Ring. Die neuen Knotentexte stammen aus dem Code, nicht
aus der älteren Prosa — bei allen fünf Hauptmächten.

### Geprüft

- 60 Strukturprüfungen über alle fünf Hauptmächte mal beide Charaktere: 20 Knoten, kein
  Knoten über Reihe 7, höchstens drei je Reihe, überall Name und Kurztext, keine
  hängenden Voraussetzungen.
- Krone in **600 von 600** Läufen mit zufälliger Kaufreihenfolge erreicht, sowohl wenn
  alle 15 Punkte auf einmal vorliegen als auch wenn sie einzeln eintreffen. Keine
  Sackgassen, keine Restpunkte.
- Im Browser bei 393 × 873 px: acht Reihen, keine Überlappung, nichts abgeschnitten,
  kein horizontaler Überlauf.

## Leerenklinge geschärft: der Handel geht jetzt auf (umgesetzt 18.08.2026)

Frage aus dem Spieltest: „Müssen wir das Profil vom zweiten Avatar noch weiter schärfen?"
Gemessen: ja, und zwar deutlich.

### Der Befund

Schaden je Sekunde gegen acht Gegner, relativ zum Lichthüter bei vollem Leben:

| Leben | Lichthüter | Leerenklinge **vorher** | + Haltung Abgrund |
|---|---|---|---|
| 100 % | 102 % | 102 % | 100 % |
| 50 % | 101 % | **106 %** | 111 % |
| 20 % | 101 % | **111 %** | 120 % |

Dabei hat die Leerenklinge dauerhaft **19 % weniger Leben** (167 gegen 205). Sie bezahlte
also ein Fünftel ihrer Lebensleiste für sechs Prozent Schaden bei halbem Leben. Selbst
einen Treffer vor dem Tod waren es nur elf Prozent. Das ist kein Risiko-Charakter,
sondern ein schlechter Handel — die versprochene Identität feuerte praktisch nie.

### Die Korrektur

Beide Hälften des Startpassivs `Leerenhunger` waren vorhanden, nur zu schwach:

- Orbittempo `1 + fehlendesLeben × 0,28` → `× 0,45`
- Sweet-Schaden `fehlendesLeben × 0,32` → `× 0,78` (Haltung `Abgrund` legt weiterhin
  0,28 obendrauf)

Gemessen danach:

| Leben | Leerenklinge | + Haltung Abgrund |
|---|---|---|
| 100 % | 101 % | 101 % |
| 75 % | 106 % | 110 % |
| 50 % | **116 %** | 121 % |
| 20 % | **121 %** | 128 % |

Bei vollem Leben bleibt sie ohne Vorteil — es gibt kein Freibier. Ab halbem Leben trägt
der Handel, und einen Treffer vor dem Tod zahlt er sich deutlich aus.

Geprüft: vollständige Läufe mit der Leerenklinge bis Welle 30 mit Sieg auf Standard und
Meister, dazu die üblichen Auslese- und Boss-Prüfungen.

**Beim Messen fiel eine Falle auf:** `figur()` liefert die Leerenklinge nur, wenn sie
freigeschaltet ist, und fällt sonst still auf den Lichthüter zurück. Ein erster Messlauf
verglich dadurch den Lichthüter mit sich selbst und zeigte identische Werte. Wer künftig
Charakterwerte misst, muss `save.unlocks.figur.konstrukt` setzen.

## Volltreffer, klare Texte, mächtige Krone (umgesetzt 18.08.2026)

Drei Spieltestbefunde in einem Zug.

### „Sweet Spot" heißt jetzt „Volltreffer"

Der englische Begriff passte nicht in ein deutsches Spiel, das auch Kinder verstehen
sollen. 32 sichtbare Strings umbenannt (31 in `game.js`, einer in `index.html`).

**Codebezeichner blieben unangetastet** — `sweetArcHalf`, `sweetKlingenFaktor`,
`orbitRoundSweet`, `orbitSweetPulse`, `splitterSweetZaehler` und die interne Auftrags-Id
`panzer_sweet` heißen weiter so. Eine Umbenennung dort wäre reine Unruhe ohne Nutzen für
den Spieler.

### Beschreibungen: von Patchnotes zu Spielertexten

Die Texte waren wie Änderungsprotokolle geschrieben. Beispiele vorher/nachher:

| vorher | jetzt |
|---|---|
| `2 Klingen π-versetzt: Sweet je ×0,72, Zone ×0,75, Schub 16 px.` | Zwei Klingen kreisen dir gegenüber: verlässlich, aber jede trifft schwächer. |
| `3 Sweet-Pulse starten 3 s Sonnentempo ×1,22.` | Drei Volltreffer in Folge beschleunigen kurz deinen Orbit. |
| `Fokus: 8% Barriere, 150 px Slow 1200 ms.` | Voller Fokus gibt dir Barriere und verlangsamt Gegner in der Nähe. |
| `Fokussierter Wirbel setzt 3 Sonnenpulse.` | Solange dein Orbit beschleunigt ist, wird die Volltreffer-Zone schmaler und trifft härter. |

Regeln, nach denen umgeschrieben wurde: sagen was passiert statt welcher Faktor sich
ändert; Sekunden statt Millisekunden; höchstens eine Zahl je Satz und nur wenn sie eine
Entscheidung steuert; kein „Aktiv 1", sondern „deine Hauptmacht"; `short` bis 14 Zeichen
und die Wirkung benennen, nicht den Mechanismus.

Zwei Genauigkeitsfehler fielen dabei auf und sind mitkorrigiert: `Satter Abgrund` sagte
„Klingen-Kills heilen stärker", obwohl `killEnemy()` **jeden** Tod behandelt, nicht nur
Klingentreffer. Und sechs `short`-Kürzel lagen schon vorher über 14 Zeichen.

### Orbitkrone: `Durchschlag` statt Abklingzeit

Die Krone hat zwei Formen. Bei **Doppelorbit** markiert sie nach jedem Machteinsatz eine
Klinge gold, deren nächster Treffer ein Machtecho zündet — unverändert, das ist eine
echte Mechanik.

Bei **Präzisionsorbit** verkürzte sie nur eine Abklingzeit um 1600 ms. Als Abschluss
eines ganzen Laufs war das zu wenig. Neu: Drei Volltreffer in Folge laden die Klinge;
der **nächste** Volltreffer entlädt einen Strahl über 900 px, der alles auf seiner Linie
trifft und Panzerung ignoriert, mit dem Vierfachen eines normalen Volltreffers.

Gemessen mit Präzisionsorbit und Krone über 60 s gegen acht Gegner: **18 Auslösungen,
also alle 3,3 Sekunden**, 665 Schaden je Strahl über alle getroffenen Gegner.

**Beim Bau fiel eine Zeitfalle auf:** Aufladen und Entladen liegen im selben 120-ms-
Trefferintervall. Ohne Gegenmaßnahme hätte derselbe Treffer, der die Serie vollmacht,
den Strahl sofort selbst gezündet — „der nächste Treffer" wäre derselbe gewesen. Der
Ladezustand wird deshalb vor `orbitSweetPulse()` gesichert und die Entladung daran
gemessen. Nachgemessen liegen zwischen Laden und Feuern nie null Frames.

Der Zähler `praezSerie` zählt jetzt immer, nicht mehr nur während einer laufenden
Abklingzeit — diese Bedingung ergab nur für die alte Wirkung Sinn. Der `praezBoost` beim
Sturmwirbel liest denselben Zähler und bleibt bewusst unangetastet: Er erzeugt jetzt eine
echte Spannung zwischen „kleine Serie sofort verbrauchen" und „auf den Strahl warten".

## Vier kaputte Wertigkeiten behoben (umgesetzt 19.08.2026)

Aus einem externen Designgutachten. Drei davon waren keine Balancefragen, sondern Fehler.

### Doppelorbit war ein negativer Kauf

Über den echten Knotenkauf gemessen, gegen „gar nichts kaufen":

| Ziele | Doppelorbit vorher | Präzisionsorbit |
|---|---|---|
| 1 | **−3,6 %** | +4,2 % |
| 8 | **−3,5 %** | +3,2 % |
| 16 | **−3,1 %** | +4,5 % |

Die **erste Entscheidung des Spiels** machte den Spieler schwächer, als den Punkt liegen
zu lassen. Ursache: Die Volltreffer-Zone schrumpft auf ×0,75 **und** der Schaden je
Klinge auf ×0,72 — das Produkt liegt unter 1. Die Zone bleibt unangetastet, sie ist die
Kernmechanik; der Schadensabschlag steigt von ×0,72 auf ×0,84. Danach: Doppelorbit +4,1
bis +5,0 %, Präzisionsorbit +3,6 bis +4,2 % — beide Zweige gleich stark, wie es die
Doku immer versprochen hatte.

**Achtung für künftige Messungen:** Eine frühere Messung hatte Doppelorbit bei 113 %
ausgewiesen. Sie setzte `bonuses.blades=2` von Hand und übersprang damit den
Schadensabschlag, der an `treeFlags.doppelorbit` hängt. Klingenwerte müssen über
`kaufenTreeKnoten('blade_multi')` gemessen werden, nie über `bonuses`.

### Konterstoß trieb Gegner aus der Klingenbahn

`counterPush` war 90 und schob getroffene Gegner von 109 auf 181 px — die Klinge reicht
72 px. In einem Spiel, dessen ganzer Zweck es ist, Gegner *in* der Orbitbahn zu halten,
ist starker Rückstoß strukturell falsch. Gemessen kostete die Passive rund ein Drittel
des Schadens.

Rückstoß jetzt 20. Gemessen mit Gegnern, die den Spieler tatsächlich erreichen:
**+24,3 % auf Stufe 1, +54,9 % auf der Sprungstufe**, mittlere Distanz 98 → 106 px.

### Nachfassen war nie implementiert

Die Karte versprach „doppelt so breit", aber `nachfassenBereit` wurde nur für den
Panzerdurchschlag auf Rang 2 gelesen — **die Verbreiterung selbst gab es im Code nicht.**
Deshalb maß sie 0,0 %.

Zwei Änderungen: `sweetArcHalf()` verdoppelt jetzt tatsächlich, und der Auslöser hängt
nicht mehr an einem Umlauf ohne Treffer (im Gedränge verfehlt man nie, die Karte feuerte
genau dort nicht, wo man sie braucht), sondern an einem **kassierten Treffer**. Das passt
zum Namen und feuert verlässlich. Gemessen: +19,3 % gegen Soldaten; gegen Panzer +8,8 %
auf Rang 1 und **+83,1 %** auf Rang 2, wo der Panzerdurchschlag greift.

### Fokus bewusst noch nicht angefasst

Die Fokusleiste ist nach 5,3 s voll, die Abklingzeiten liegen bei 5 bis 12 s — die
beworbene Entscheidung „sparen oder ausgeben" kann rechnerisch nicht existieren, und der
Resonanz-Ast im Baum hängt daran. Die Ladegeschwindigkeit hängt aber an der Trefferrate,
und die ändert die geplante Verdichtung grundlegend. Jede Zahl, die jetzt gesetzt wird,
wäre danach wieder falsch. Wird zusammen mit der Verdichtung neu justiert.

## Ideen aus dem Spieltest (17.08.2026)

Vom Nutzer eingebracht, noch nicht entschieden und nicht eingeplant.

### Beide Klingenführungen im Lauf erreichbar machen

Doppelorbit und Präzisionsorbit sind die beiden Fähigkeiten, die Spaß und Können am
stärksten prägen. Heute schließen sie sich als `exclusiveGroup:'orbit'` dauerhaft aus.
Idee: darauf hinarbeiten können, im Lauf beide zu bekommen.

Belegt beim Nachmessen: Die Wahl liegt auf **Stufe 0** und fällt damit beim allerersten
Punkt nach rund **50 Sekunden** — also bevor der Spieler die Auswirkung beurteilen kann,
und sie sperrt die andere Hälfte für den gesamten Lauf.

Zu bedenken: Die A/B-Weichen sind eine der drei Quellen für Build-Unterschiede zwischen
Läufen. Wer beide bekommen kann, verliert diese Unterscheidung — es sei denn, die zweite
Form kostet spürbar (späte Stufe, mehrere Punkte, oder nur als Kronen-Alternative).

### Ton ist schlecht

Nicht nur ungetestet, sondern vom Nutzer als schlecht bewertet. Damit ist es kein
Prüfpunkt mehr, sondern ein Qualitätsproblem. Lösung offen; Lizenzmusik und ein Ersatz
der prozeduralen Web-Audio-Töne sind die naheliegenden Wege.

### Baumknoten sollen ihre Wirkung selbst zeigen

Der Baum als Ganzes gefällt, die Knöpfe nicht. Nachgemessen: 13 der 14 Symbole sind
eindeutig, ein Kollisionsproblem gibt es also nicht. Das Problem ist, dass abstrakte
Geometrie (`⬡ ◉ ◎ ◒ ✹`) keine Bedeutung trägt — man kann nicht ableiten, was ein Knoten
tut. Die Aussage steckt allein im Kürzel, und mehrere davon sind kryptisch:

| Knoten | Symbol | Kürzel | Problem |
|---|---|---|---|
| Wirbel · A/B | A / B | ZUG / ZONE | sagt nichts über die Wirkung |
| Orbitresonanz | ◎ | KOMBO +1 | unklar, was kombiniert wird |
| Wirbelkerbe | ◒ | 4. SWEET: ZUG | Fachbegriff ohne Kontext |
| Wanderkern | ◉ | MUTATION WANDERT | 16 Zeichen auf einem 54-px-Knopf |

Gut funktionieren dagegen `2 KLINGEN`, `SWEET ×1,45` und `BARRIERE` — sie benennen die
Wirkung statt des Mechanismus.

Idee: Symbole, die die Wirkung zeigen (Klingenzahl, Zone, Kette), und ein längerer Text
beim Antippen. Der zweite Teil ist seit dem 17.08. gebaut — der erste Tipp kauft nicht
mehr, sondern zeigt die vollständige Beschreibung im Detailfenster.

## Bekannte Baustellen

### Offene Spieltest-Prüfungen (18.08.2026)

Nicht am Code prüfbar, brauchen einen echten Lauf:

- **`Glasklinge`: Handel oder Falle?** Die Karte schneidet beim Kauf sofort 40 % der
  Lebensleiste weg. Der Text sagt es, aber es passiert mitten im Kampf. Wenn es
  überrascht statt bewusst gewählt zu wirken, braucht die Karte einen deutlicheren
  Hinweis oder eine Rückfrage.
- **`Gegenlauf`: sieht das gut aus?** Nur die Funktion ist geprüft; in dieser Sitzung
  waren keine Bildschirmfotos möglich, weil der Browser-Bereich nicht kompositierte.
  Zwei gegenläufige Klingen könnten auch schlicht unruhig wirken — besonders zusammen
  mit Doppelorbit, wo dann drei Klingen kreisen.
- **Reicht die Vorwarnzeit der Bosse noch?** Seit jede Fähigkeit eine eigene Form hat,
  muss der Spieler mehr unterscheiden. `CONFIG.boss.warn` steht unverändert bei 1100 ms.
- **`Spiegelschild` ist härter als gemessen.** Die Messung „Spieler kreist mit 2,50 rad/s
  gegen 1,10 rad/s Schilddrehung, also 60 % der Zeit dahinter" ließ den Boss stillstehen.
  Im echten Kampf fährt er mit 105 px/s nach und dreht mit; dazu drückt der Schild auf
  über 110 px, während die Klinge nur 72 px weit reicht. Der Nutzer berichtet, dass man
  kaum um ihn herumkommt, hält es aber für in Ordnung. Nicht angefasst, nur notiert.

### Ältere Punkte

- Wirkungszahlen der neuen Mechaniken sind Startwerte für die spätere Balancingrunde.
- Klingen-/Machtmodule und beide Endlosechos sind technisch plausibilisiert, aber ihre
  Stärke und ihr subjektiver Spaß brauchen echte Läufe mit allen fünf Hauptmächten.
- Lautstärke, Klangfarbe und Ereignisdichte des neuen Space-Audios müssen auf Pixel 9
  und X1 Carbon mit Lautsprechern sowie Kopfhörern subjektiv getestet werden.
- Rammbockschaden, 550-ms-Erholung und 1,8-Prozent-Drohnenrückschlag sind bewusst
  vorsichtige Startwerte und brauchen mindestens einen echten Boss-Test.
- Die XP-Kurve wurde rechnerisch von 28–29 auf ungefähr 15 reguläre Punkte umgestellt
  (`xpBase 1000`, `xpPerLevel 300`), ist aber noch nicht in einem vollständigen Lauf
  bestätigt. Der erste Browser-Smoke-Test der Zwischenkurve war zu schnell und führte
  gezielt zu dieser Korrektur.
- Die 14 regulären Knoten, direkter Kauf, Ausschluss, Rückgängig und reguläres
  Pixel-9-Layout wurden lokal im Browser geprüft. Der vollständige Siegdialog und die
  neunte Endlosreihe brauchen zusätzlich einen echten Durchlauf über GitHub Pages.
- Echte Geräte- und Touchtests erfolgen nach Veröffentlichung über GitHub Pages.
- Gerätemessung der Performance ist auf den neuen Gesamtstand verschoben. Die
  Desktop-Messung vom 16.08.2026 weist den Einbruch dem Zeichnen zu; die Bestätigung
  auf echter Hardware steht aus.
- Fokus lädt dichteunabhängig: Nur der erste Sweet-Hit-Tick eines vollständigen
  Klingenumlaufs erzeugt einen Orbitimpuls und gibt exakt zwei Fokus. Gruppen geben
  dadurch nicht mehr Fokus als ein einzelnes sauber getroffenes Ziel.
- Orbitauftrag v1 ist umgesetzt; sein Fortschritt und Lohn werden in einem echten
  Standard-/Endloslauf noch praktisch geprüft.
- Ein realer Lauf bis Welle 26 lief spielerisch gut und bestätigte den besseren
  Orbitpfad, zeigte aber einen Performanceeinbruch in den späten Wellen. Die Diagnose
  ist erfolgt (Zeichnen, nicht Simulation), die balance-neutralen Hotspots sind
  entfernt; die Gerätebestätigung fehlt noch.

## Charakterdarstellung vom 12.08.2026

- Lichthüter und Leerenklinge verwenden neue prozedurale Canvas-Silhouetten auf Basis
  des v5-Zielkonzepts: weiß-goldener Schutzhalo gegen schwarzen, violetten Leerenpanzer.
- Dieselben Zeichenfunktionen laufen im Spiel, in der Charakterwahl und in der Sammlung;
  es werden keine zusätzlichen Bilddateien oder Animationen geladen.
- Die Änderung ist rein visuell und verändert keine Charakterwerte oder Fähigkeiten.

## Arbeitsregeln

- Vor Änderungen `git status --short` prüfen und fremde Änderungen erhalten.
- Nur unter `konzept/` entwickeln, sofern Infrastruktur nicht ausdrücklich betroffen ist.
- Keine Dateien aus `archive/` zurückkopieren, ohne den Nutzer zu fragen.
- Entscheidungen knapp in diesem Dokument aktualisieren.
- Keine Geheimnisse, Tokens oder personenbezogenen Daten einchecken.

## Orbitblade-Vertikalschnitt: Lichthüter, Wirbel und Orbitkrone (16.08.2026)

Der aktive Stand in `konzept/game.js` nutzt einen gemeinsamen Orbitimpuls: pro
vollständigem `swordAngle`-Umlauf löst nur der erste Sweet-Hit-Tick `orbitSweetPulse`
aus. Er gibt zwei Fokus, steuert Lichtbund, Sonnenserie und Präzisionsserie; ein
verfehlter Umlauf setzt nur die beiden Serien zurück. Lichtbund lädt ausschließlich
über tatsächlich zurückgelegte Strecke (maximal 110 px) und verstärkt den nächsten
Sweet-Hit-Tick mit Faktor 1,35.

Doppelorbit besitzt zwei π-versetzte Klingen (Sweet je ×0,72, Mehrklingen-Zone ×0,75,
Schub 16 px). Präzisionsorbit besitzt eine 1,20-fache Klingenlänge, einen 0,68-fachen
Sweet-Halbbogen, Sweet ×1,45 und durchschlägt Panzerung nur mit echten Sweet Hits.
Wächter erzeugt beim Fokusübergang 8 % maximale Barriere, verlangsamt 150 px/1200 ms
und kann eine Lebenskugel als `WÄCHTERLADUNG` für die nächste Barriere speichern.
Sonnenjäger nutzt drei Orbitimpulse für drei Sekunden Rotation ×1,22; Sonnenorbit
verstärkt den Sweet-Bogen zusätzlich ×0,78 und Sweet ×1,30.

Wirbel A zieht initiale Ziele maximal 70 px bis zur Klingendistanz ohne Zusatzschaden;
Wirbel B setzt am Cast-Ort ein 1550-ms-Feld mit 300-ms-Ticks zu 12 % Snapshot-Schaden.
Sturmwirbel behält seine Radius-/Schadensfaktoren, zeigt 700 ms zwei gegenläufige Ringe
und feuert danach einmalig acht radial begrenzte Projektile. Neue Lichtspuren sind auf
sechs begrenzt und werden bei 14 bereits aktiven Feldern gar nicht erst ergänzt; bestehende
Machtfelder werden dafür nie verworfen. Unter `?perf=1` liefert `window.orbitSliceDump()` einen read-only
Snapshot für Fokus, Lichtbund, Serien, Form und Feldzahl.

Die Doppelorbit-Krone merkt nach jedem Machteinsatz vier Sekunden lang abwechselnd eine
der beiden Klingen gold sichtbar vor; ihr nächster Sweet Hit löst genau ein reduziertes
Machtecho aus. Wirbel-B-Echos bleiben dabei ohne Zug und setzen stattdessen einen kleinen
ortsfesten Nachlauf. Die Präzisionskrone verkürzt Aktiv 1 nach drei lückenlos erfolgreichen
Orbitimpulsen während des Cooldowns um 1600 ms; ein verfehlter Umlauf setzt ihre Serie
zurück. Beim Sturmwirbel überträgt vorhandene Barriere mit Krone 600 ms Verlangsamung auf
die acht Projektile, während ein oder zwei Präzisionsstriche deren Schaden um 10/20 %
erhöhen und beim Einsatz verbraucht werden.
