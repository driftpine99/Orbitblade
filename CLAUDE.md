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
- `SAVE_VERSION` ist 8.

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
- Jedes Level gibt einen Orbitpunkt; der Spieler öffnet den Pfad freiwillig über den HUD-Knopf.

### Form und Punktökonomie

Der Pfad zeigt zwölf reguläre Knoten in acht kompakten Reihen mit höchstens zwei Knoten pro Reihe.
Er benötigt kein horizontales Scrollen, kein Zoomen und auf üblichen Mobilgeräten auch
kein vertikales Scrollen. Drei Knoten sind exklusive A/B-Wahlen, drei Knoten besitzen
jeweils drei große Rangsegmente.

Ein vollständiger Standardlauf vergibt 15 reguläre Punkte:

1. Klingenführung A/B – 1 Punkt;
2. Hauptmacht A/B – 1 Punkt;
3. Partnerpassiv – 3 mechanische Ränge;
4. Charakterhaltung A/B – 1 Punkt;
5. Machtmeisterschaft – 3 mechanische Ränge;
6. Klingensynergie – 1 Punkt;
7. Evolution – 1 Punkt;
8. Orbitresonanz – 3 mechanische Ränge;
9. Orbitkrone – 1 Punkt.

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

- Orbitresonanz Rang 1: Jeder fünfte Sweet Hit verkürzt beide Mächte moderat.
- Rang 2: fokussierte Hauptmacht hinterlässt ein kleines machtbezogenes Klingenecho.
- Rang 3: Aktiv 2 markiert drei Sekunden eine Kopplung; die folgende Hauptmacht
  verstärkt ihre Evolution. Ohne Aktiv 2 entsteht die Kopplung nach drei Sweet Hits
  in Folge, damit Ein-Slot-Spieler keinen nutzlosen Rang erhalten.

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

- Nach einem Blick ist klar, welche höchstens zwei Knoten aktuell wählbar sind.
- Jeder gekaufte Rang ist innerhalb von 30 Sekunden sichtbar oder spielerisch spürbar.
- Ein Tester kann seinen fertigen Build in einem Satz beschreiben.
- Lichthüter und Leerenklinge fühlen sich trotz derselben Klinge deutlich anders an.
- Nach Niederlage oder Sieg existiert ein konkreter Grund für einen weiteren Lauf.
- Pro Testlauf werden Zeit bis zum ersten Punkt, Welle/Minute von Evolution und Krone,
  übrige Punkte, A/B-Kombination, Todesursache und stärkster Moment notiert.

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

## Nächste Arbeitsreihenfolge

1. Den neuen Gesamtstand committen, auf GitHub Pages veröffentlichen und auf Pixel 9
   sowie X1 Carbon testen.
2. Pro Lauf Zeitpunkt von erstem Punkt, Super-Macht und Krone sowie Endlevel notieren.
3. Danach XP-Kurve, Wirkungszahlen und Projektpreise mit echten Laufdaten feinbalancieren.
4. Erst nach dem Gerätetest gezielte Performancearbeit beginnen.
5. Monetarisierung erst behandeln, wenn Kernschleife und Wiederspielwert tragen.

Kein umfangreiches Testnetz aufbauen; das Spiel ist noch nicht produktiv. Nach
Änderungen genügen derzeit proportionale Checks: mindestens
`node --check konzept/game.js` und betroffene Klickwege über GitHub Pages.

## Bekannte Baustellen

- Wirkungszahlen der neuen Mechaniken sind Startwerte für die spätere Balancingrunde.
- Lautstärke, Klangfarbe und Ereignisdichte des neuen Space-Audios müssen auf Pixel 9
  und X1 Carbon mit Lautsprechern sowie Kopfhörern subjektiv getestet werden.
- Rammbockschaden, 550-ms-Erholung und 1,8-Prozent-Drohnenrückschlag sind bewusst
  vorsichtige Startwerte und brauchen mindestens einen echten Boss-Test.
- Die XP-Kurve wurde rechnerisch von 28–29 auf ungefähr 15 reguläre Punkte umgestellt
  (`xpBase 1000`, `xpPerLevel 300`), ist aber noch nicht in einem vollständigen Lauf
  bestätigt. Der erste Browser-Smoke-Test der Zwischenkurve war zu schnell und führte
  gezielt zu dieser Korrektur.
- Die zwölf Knoten, Kauf, Ausschluss und Rückgängig sowie Vorbereitung, Codex,
  Spielstart und alle 16 Werkstattkarten wurden lokal im Browser geprüft. Vollständige
  Pfade für alle fünf Hauptmächte brauchen noch echte Testläufe.
- Echte Mobil- und Layouttests erfolgen nach Veröffentlichung über GitHub Pages.
- Gerätemessung der Performance ist auf den neuen Gesamtstand verschoben.

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
