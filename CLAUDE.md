# Orbitblade v5 – Gesamtkonzept und verbindlicher Arbeitsstand

**Stand: 07.09.2026.** Dieses Dokument trennt das vorhandene Spiel, beschlossene
Ziele und Messbefunde. Der Ist-Stand wurde bei der Konsolidierung am aktiven Code
und durch gezielte Strukturprüfungen abgeglichen. Ältere Messungen sind datiert;
sie sind keine heutigen Neumessungen und keine Garantie für jede Hardware.

**Neue Produktrichtung (07.09.2026):** Der Nutzer hat die Galaxie-Kampagne mit
permanenter Progression beschlossen; der verbindliche Fahrplan steht in
[Galaxie-Kampagne Umsetzungsplan](ORBITBLADE_Galaxie_Kampagne_Umsetzungsplan_Claude_Code.md).
Er erweitert bzw. überschreibt ältere Aussagen hier, wo sie kollidieren: permanente
Fragment-Upgrades sind künftig erwünscht und dürfen Kampfkraft verbessern; die
Galaxiekarte wird der primäre Rahmen für normale Läufe. Unverändert bleiben
Orbitklinge, Positionierung/Volltreffer, Bewegung + genau ein aktiver Machtknopf,
keine zweite farmbare Währung und keine automatische Gegner-Skalierung. Umgesetzt
sind **Phase 1** (Vertical Slice EOS, siehe 3.9), **Phase 2** (Heldenkern, siehe
3.10), **Phase 3** (Fragmentökonomie, siehe 3.11) und **Phase 4** (Sektor I
vollständig, siehe 3.12); Phasen 5–7 sind Ziel, nicht gebaut.

## 1. Verbindlichkeit, Ablage und Arbeitsregeln

`CLAUDE.md` im Projektstamm ist die **einzige maßgebliche fachliche Quelle**.
Explizite Nutzeraufträge bestimmen den Umfang einer Arbeit. Bei Abweichungen
zwischen dokumentiertem Ist-Stand und Implementierung den Code prüfen und den
Widerspruch benennen; beschlossene Ziele nicht als bereits gebaut ausgeben.

| Pfad | Aufgabe und Schutz |
|---|---|
| `konzept/index.html`, `konzept/style.css`, `konzept/game.js` | Einzige aktive Spielversion; Vanilla HTML/CSS/JS, kein Build und keine Laufzeitinstallation |
| `index.html` im Stamm | GitHub-Pages-Einstieg mit Weiterleitung zu `konzept/`; Query und Hash bleiben erhalten, kein überflüssiges Duplikat |
| `README.md` | Einstieg, Start- und Prüfwege; verweist fachlich auf dieses Dokument |
| `tools/` | Node-Harness und Messwerkzeuge, nicht Bestandteil des Browserspiels |
| `AGENTS.md`, `.opencode/` | Agentenrollen und Arbeitsabläufe; keine zweite Konzeptquelle |
| `.claude/launch.json` | Lokale, gitignorierte Vorschaukonfiguration; erhalten |
| `docs/README.md`, `docs/historie/` | Wegweiser, historische Konzepte, Präsentation und Belege; nicht verbindlich |
| `HISTORIE.md` | Ältere Begründungen und Messreihen; eingefrorener historischer Beleg |
| `artifacts/`, `trailer_*` | Lokale, nicht versionierte Produktionsdateien; keine Spielabhängigkeit, aber nicht automatisch entbehrlich |
| `archive/` | Geschützter Altbestand: ohne ausdrückliche Nutzeranweisung weder lesen noch verändern |
| `.git/` | Versionsgeschichte und Repository-Metadaten; niemals als Aufräummaterial behandeln |

Die vollständige Fassung vor dieser Konsolidierung bleibt unter
[Konzeptstand 30.08.2026](docs/historie/Konzeptstand-2026-08-30.md) erhalten.
Sie erklärt frühere Entscheidungen, enthält aber auch inzwischen überholte Ziele
und Anweisungen. Der [Dokumentenwegweiser](docs/README.md) ordnet weitere Belege ein.

Arbeitsregeln:

- Vor jeder Arbeit dieses Dokument lesen und `git status --short` prüfen.
  Vorhandene Änderungen erhalten; Dateien nicht auf einen vermuteten Ausgangsstand setzen.
- **Kein `git checkout`, `git restore`, `git stash` oder `git reset` zur Bereinigung.**
  Keine fremden Änderungen, Spielstände, Quellmedien oder Werkzeugkonfigurationen löschen.
- Vor Verschieben oder Entfernen Abhängigkeiten und konkrete Pfade prüfen.
  Nicht versionierte Medien sind ohne Nachweis ihrer Reproduzierbarkeit Originale.
  Sicherungen vor einer Löschung vollständig prüfen; Freigabegrenzen respektieren.
- Hilfsskripte und flüchtige Prüfausgaben ins Temp-Verzeichnis, anschließend entfernen.
  Dauerhaft benötigte Messwerkzeuge gehören nach `tools/`, Dokumente nach `docs/`.
- Keine Geheimnisse, Tokens oder personenbezogenen Daten einchecken. Keine Commits
  oder Veröffentlichung ohne Nutzerauftrag; nur beabsichtigte Dateien zum Commit vormerken.
- Änderungen klein halten. Keine neue Infrastruktur oder umfangreiches Testnetz
  für reversible, kleine Anpassungen. Prüfungen müssen die tatsächliche Fehlerklasse treffen.
- Bei Mechanikänderungen sichtbare Texte und den betroffenen Klickweg mitprüfen.
  Headless-Simulation liest kein CSS und beurteilt weder Darstellung noch Verständlichkeit.
- **Dokumentpflege im passenden bestehenden Abschnitt:** Ist-Stand, Ziele,
  Messungen und offene Punkte zusammen nachführen. Erledigte Ziele aus der offenen
  Liste nehmen; keine neue chronologische Paketfolge an dieses Dokument anhängen.
  Historische Belege bleiben klar als solche gekennzeichnet.

## 2. Spielidee und Leitplanken

Orbitblade ist ein mobiles Arena-Roguelite. Eine Orbitklinge kreist automatisch
um den Spieler. Ihre Rundumzone verzeiht ungenaues Spielen; die tatsächliche
Klingenposition verursacht als **Volltreffer** deutlich mehr Schaden.
Positionierung ist das Kernkönnen. Andere Mechaniken sollen diesen Kern verändern
oder unterstützen.

| Zielgruppe | Konsequenz für das Spiel |
|---|---|
| Kind, etwa 7 Jahre | Ohne Lesen anfangen können; verständliche Symbole, einfache Eingaben, keine Sackgasse im Fortschritt |
| Erwachsene mit wenig Zeit | Ein abgeschlossener Lauf in einer Sitzung; kein Nachholzwang und keine verfallenden Belohnungen |
| Spieler mit Optimierungsinteresse | Tiefe durch Kombinationen, Timing und Freischaltungen, nicht durch Menüverwaltung |

Verbindliche Leitplanken:

- **Bewegung und genau ein aktiver Knopf:** die wählbare Hauptmacht. Kein zweiter
  Werkzeugslot, keine dritte Taste und kein zusätzliches Charakter-Ultimate.
- Die Orbitklinge bleibt der Hauptangriff. Fortschritt erfolgt automatisch;
  die Auslese ist die einzige Entscheidungsoberfläche, die den Kampf unterbricht.
- Welle 30 ist der reguläre Siegpunkt, danach ist Endlos möglich.
- Die Körperwahl ist kosmetisch. Identität im Lauf entsteht durch Hauptmacht,
  Klingenführung, Mutation, Haltung und Karten.
- Gepanzerte Gegner bleiben. Hilfen sperren keine Inhalte. Prüfstufen dürfen
  ausschließlich kosmetische Belohnungen geben, niemals zusätzliche Kampfkraft.
- Bestmarken bleiben nach Hilfsstufe getrennt; leichtere Läufe überschreiben
  keine Bestwerte einer anderen Hilfsstufe.
- Touch-Bedienung und kindverständliche deutsche Texte erhalten. Neue Texte
  beschreiben eine Wirkung; `short` bleibt höchstens 14 Zeichen lang.
- Jede Karte und jeder Rang muss spürbar und sichtbar sein; die Aufnahmeprüfung
  steht unter „Prüfverfahren“. Eine zusätzliche Schadenszahl allein reicht nicht.
- Jede Freischaltung muss sich innerhalb von 30 Sekunden sichtbar oder spürbar
  bemerkbar machen. Diese Vorgabe gilt auch außerhalb der Auslese-Karten.
- Keine passiven Füllknoten, endlosen Prozentleitern, Inventarverwaltung,
  Ausrüstungsseltenheiten oder zusätzlichen Währungen.
- Kein Wiederspielwert durch neue Währungssenken, Login-Streaks oder tägliche
  Pflichtläufe. Keine Monetarisierung vor bestätigtem Wiederspielwert.

## 3. Ist-Stand des Spiels

### 3.1 Bedienung und Lauf

Der Einstieg bietet **Weiterspielen**, **Welten** und **Mein Held**. Im Held-Hub liegen
Aussehen, direkte Hauptmachtwahl und Verbessern; die Hilfsstufe bleibt bei der Mission
zugänglich. Die Körperdarstellung wird dort modular gewählt und sofort vorgezeigt.

Im Kampf bedient der Spieler Bewegung per Touch/Joystick oder WASD/Pfeiltasten und
die Hauptmacht per Knopf beziehungsweise Taste 1. Die Auslese bietet normalerweise
drei Karten. Weichen bieten zwei Alternativen. Tagesregel „Enge Auslese“ und
entsprechende Prüfstufe reduzieren normale Angebote ebenfalls auf zwei.

Es gibt sieben Zustände: `menu`, `playing`, `paused`, `auslese`, `countdown`, `sieg`
und `gameover`. Das Baum-Overlay und der Zustand `tree` sind entfernt.
`updateTreeButton()` bleibt bewusst als leerer Rumpf für bestehende Aufrufer erhalten.

Ein Standardlauf ohne Sonderpunkte hat **9 normale Kartenstopps und 3 Weichen**,
also **12 Entscheidungen im selben Overlay**. Die normalen Kartenstopps liegen auf
Welle 3, 6, …, 27. Weichen öffnen bei erfüllten Voraussetzungen und einem verfügbaren
Punkt, bei Bedarf am nächsten Wellenstart; sie ersetzen nicht die Karten auf 3/6/9.
Weichen dürfen nicht neu gewürfelt werden. Nach der Auswahl folgt der
Wiedereinstiegscountdown.

### 3.2 Kampf, Fokus und Hauptmächte

Volltreffer und getroffene Umläufe belohnen Positionierung, laden Fokus und lösen
Buildmechaniken aus. Der Basiswert `CONFIG.fokusZiel` ist 18. Die nächste Macht
bei vollem Fokus wird verstärkt. Die gewünschte seltenere, längere Inszenierung
fokussierter Einsätze ist noch nicht vollständig umgesetzt.

| Hauptmacht | Vorhandene Grundfunktion | Partnerpassiv (ID) | Evolution |
|---|---|---|---|
| Wirbel | Schaden im Bereich um den Spieler | Telekinet. Arsenal (`splitter`) | Sturmwirbel |
| Schock (`stoss`) | Rundumstoß, Rückstoß auf 20 begrenzt | Ketten-Machtblitz (`kettenblitz`) | Kettengewitter |
| Bombe | Gesetzte Ladung mit Zündverzug | Kinetische Welle (`konterstoss`) | Streubombe |
| Nova | Bereichsschaden und Betäubung | Phaser-Strahl (`phaser`) | Nova-Kaskade |
| Sog | Gegner auf Klingenabstand halten | Singularität (`nachhall`) | Gravitationsbruch |

Sog hält grundsätzlich 900 ms, das Machtmodul verlängert auf 1200 ms. Der
Halteradius ist `player.radius + bladeLength() * 0.92`. Der frühere Zug bis fast
an den Körper und der zu große Schockrückstoß sind behoben.

Der zweite Machtknopf ist entfernt: `hasSlot2()` liefert `false`, `activeSlot2`
bleibt leer. Resonanzmechaniken verwenden den vorhandenen Ersatzpfad mit einem
zeitweiligen Klingenschub. Einige zugehörige Texte sprechen noch von zwei Mächten;
das ist eine offene Textkorrektur, keine vorhandene zweite Hauptmacht.

### 3.3 Automatischer Orbitpfad und Punktökonomie

`treeNodes()` definiert **22 reguläre Knoten**, mit den zwei Endlosknoten insgesamt
24. Davon sind 14 reguläre Definitionen ohne Wahlgruppe; die übrigen bilden die
Gruppen Klingenführung (2), Machtmutation (2) und Haltung (4).

`autoFreischalten()` kauft bereite Knoten über die echte Voraussetzungskette.
`istWahlKnoten()` hält nur an, wenn mindestens zwei Alternativen derselben Gruppe
gleichzeitig kaufbar sind. Die Haltungsweiche zieht per Laufseed zwei der vier
Haltungen. Sie bleibt eine Entscheidung aus zwei Karten.

**15 ist der Cap regulärer XP-Punkte, nicht jedes denkbaren Gesamtbudgets.**
Ein frischer Standardlauf ohne Zusatzpunkte erreicht Krone und Evolution mit
15 investierten Punkten und ohne Rest. Werkstatt-Startimpuls und Tages-Twist
„Fliegender Start“ liegen zusätzlich zum XP-Cap:

| Zusatzpunkte | Investiert nach vollständiger Automatik | Kronenrang |
|---|---:|---:|
| keine | 15 | 1 |
| Startimpuls (+1) | 16 | 1 |
| Tages-Twist (+2) | 17 | 1 |
| beide (+3) | 18 | 2 |

Dies ist am Automaten strukturell geprüft. Startimpuls allein kauft in der heutigen
Reihenfolge zunächst Resonanz 2, nicht den zweiten Kronenrang.

Die verbliebenen `tree*`-Funktionen sind **Spielmechanik**: insbesondere
`treeNodes`, `treeStatus`, `kaufenTreeKnoten`, `treeRang`, `istWahlKnoten`,
`blocksCrownBudget`, `crownSpineMissingAfter` und `regularInvested` erhalten.
Eine Suche nach „tree“ ist keine Liste löschbarer Oberflächenreste.

### 3.4 Gemeinsamer Körper und vier Haltungen

`figur()` liefert die Lichthüterwerte. **Lichtbund ist die gemeinsame Basis**:
Bewegung und Fokus erzeugen seine Verstärkungen beziehungsweise Barriere.
`currentFigur()` und `save.figur` steuern nur die sichtbare Körperdarstellung.

| Haltung | Endform | Leerenhunger zusätzlich zur Basis |
|---|---|---|
| Wächter | Leuchtfeuer | nein |
| Sonnenjäger | Sonnenorbit | nein |
| Verschlinger | Satter Abgrund | ja |
| Abgrund | Ereignishorizont | ja |

`hatLeerenhunger()` hängt an Haltungsflags, nicht am gewählten Aussehen. Fehlendes
Leben kann damit stärkeres Risiko-Spiel belohnen, während Lichtbund weiter gilt.
Die Leerenklinge und das Werkstattprojekt Leerenprotokoll bleiben als Kosmetik
erhalten. Die alte Idee, beide Startpassive zu Auslese-Karten zu machen, wurde
durch diese Lösung ersetzt und ist kein offener Auftrag.

### 3.5 Auslese, passiver Mächte-Pool und Fusionen

Der ziehbare Topf umfasst **neun automatische Angriffsmächte und fünf
Unterstützungskarten** (14 Typen; nach Partnerausschluss **13**). `PASSIVE_IDS`
enthält neun Passive; genau der Partner der gewählten Hauptmacht wird durch
`ausleseAusschluss()` ausgeschlossen (Wirbel/Arsenal, Schock/Ketten-Machtblitz,
Bombe/Kinetische Welle, Nova/Phaser-Strahl, Sog/Singularität). Der größere Topf hat
**keine zusätzliche Kapazitätsgrenze**; er bleibt über die vorhandenen Gewichte spielbar.

Die neun Angriffsmächte laufen alle **zeitgesteuert** und automatisch, ohne neue
Taste. Sechs sind semantische Nachnutzungen stabiler IDs, drei sind neu. Die Zahlen
sind **Startwerte, noch nicht balancegemessen** (siehe Abschnitt 6 und 7):

| ID | Name | Wirkung |
|---|---|---|
| `kettenblitz` | Ketten-Machtblitz | Timer ~1,2 s: elektrische Kette auf nahe Ziele (Neu 2, Verstärkt 4), ein Auslöseereignis, keine Rekursion |
| `phaser` | Phaser-Strahl | Timer ~1,7 s: gerader, beim Auslösen gesperrter Swept-Strahl, Pierce 3/5 |
| `konterstoss` | Kinetische Welle | Timer ~3,3 s: 360°-Druckwelle mit kleinem Stoß (bleibt in der Klingenbahn) |
| `splitter` | Telekinetisches Arsenal | Timer ~2,8 s: 3/5 violette Homing-Geschosse auf verteilte Ziele, höchstens ~6 gleichzeitig |
| `nachhall` | Singularität | Timer ~6 s: festes Kraftzentrum zieht eine Gruppe zusammen, leichte Implosion; Bosse/Knoten werden nicht gezogen |
| `brandspur` | Plasmabombe (Modul) | Timer ~3,2 s: Bombe auf die dichteste Gruppe, starker Kern, schwächerer Rand |
| `machtgriff` | Machtgriff | Timer ~7 s: greift Elite→Schütze→höchste HP, hält per Stun und crusht; Boss nur fokussierter Crush ohne Lift/AoE |
| `energieklingenwurf` | Energieklingen-Wurf | Timer ~3,2 s: Klinge fliegt zum Ziel und kehrt zum Live-Spielerpunkt zurück, je Flugrichtung ein Treffer, Rückweg härter |
| `macht_echo` | Macht-Echo | Timer ~5 s: markiert den Bewegungs-Ringpuffer, Geistfigur läuft ihn ab und trifft jedes Ziel einmal, kein Endknall |

Trefferregressionen sind über `node tools/pruefe_maechte.js` abgesichert:
Die Wurfklinge prüft Flugsegmente einschließlich Umkehr- und Andockframe; Hin- und
Rückweg haben getrennte Trefferlisten. Der Phaser trifft entlang der Strahlrichtung
von nah nach fern; die Drucksalve entsteht erst am letzten tatsächlichen Treffer.
Arsenal-Salven verteilen sich auf unterschiedliche lebende Startziele, tote Körper
verbrauchen keine Geschosse. Echo-Bewegung und Homing-Lenkung verwenden Spielzeit
statt Bildanzahl. Das sind Funktionskorrekturen, keine Balance-Abnahme.

- Unterstützung bleibt: `lebensregen` (Passive) sowie `klingenteilung`,
  `taktschlag`, `nachfassen`, `glasklinge` (Module). Keine zehnte Angriffs-Power.
- Je Ding gibt es **Neu** und **Verstärkt**. Passive springen intern von 1 auf
  `SPRUNG_STUFE = 4`, Module von 1 auf 2. Maximierte Dinge verlassen den Topf.
- `machtgriff` und `macht_echo` haben **kein Rezept**; das ist gültig und löst
  keinen Fehler aus (`kartenVerschmolzen` liefert für sie `false`).
- Funkenkranz ist als Core-Pick **entfallen** — samt Orbit, `CONFIG`, `ICON` und
  Zeichnung; nur die Save-Migration räumt einen etwaigen Rest weg. Schneide und
  Kurzschluss sind weiterhin keine Karten; Schneide bleibt Kompatibilitätsrest in
  `ABILITIES`/`STUFEN`. Solche Reste nicht mit defekten Inhalten verwechseln.

Die sechs gebauten Fusionen bleiben eine vollständige Matrix; jede Zutat gehört
genau einem Rezept: **Klingenchor** (Klingenteilung+Taktschlag), **Drucksalve**
(Phaser-Strahl+Singularität; Druckwelle am zuletzt getroffenen Ziel), **Gewitterherz**
(Ketten-Machtblitz+Kinetische Welle, Auslöser bleibt der erlittene Treffer),
**Blutkristall** (Glasklinge+Lebensregen), **Splitterfächer** (Nachfassen+Arsenal),
**Plasmasturm** (`flammenorbit` = Plasmabombe+Energieklingen-Wurf). Eine Fusion behält
die verstärkten Grundwirkungen beider Zutaten; der alte Dauer-Funkenorbit ist
ersatzlos entfallen. Die passive Strahl-/Blitz-Optik bleibt bewusst kompakt
(violett-blau, kleiner Einschlag, geringer Shake), damit Orbitklinge und
Gegnerwarnungen Vorrang behalten.

### 3.6 Wellen, Gegner und Bosse

Gegner erscheinen in Schüben. Ein neuer Schub kommt bei ausreichend wenigen
Restgegnern, spätestens nach 2,6 Sekunden. Eine normale Welle geht weiter, sobald
ihr Spawn-Budget verbraucht ist und die Restgrenze erreicht wird. Nachzügler laufen
mit; ein leeres Feld ist nicht mehr Voraussetzung. **Bosswellen müssen dagegen
vollständig abgeschlossen sein.** Banner bleiben für Boss, Biomwechsel und Ereignis.

Kernregler: `siegWelle=30`, `wave.baseCount=5`, `perWave=2.55`, `hpScale=0.08`,
`dmgScale=0.08`, `schubMin=5`, `schubMax=12`, `schubRest=0.35`,
`schubMaxWarten=2600`, `xpBase=1000`, `xpPerLevel=300`.

Panzer, Jäger und Exploder ergänzen Nahgegner; vier Bossvarianten haben eigene
Raummechaniken und einen Phasenwechsel bei halbem Leben. Bosswellen liegen alle
fünf Wellen. Vier Ereignistypen sorgen auf regulären Wellen 6/11/16/21/26 für
Abwechslung. Schwierigkeit entsteht auch durch Warnformen und Positionierung,
nicht nur durch mehr Gegner oder höhere HP.

Die aktive Canvas-Darstellung nutzt klar getrennte, familienfreundliche Silhouetten
mit großen Materialflächen: Der Lichthüter trägt Helm, Schulterplatten, Brustvolumen,
Mantel und Stiefel; die Leerenklinge ist ein asymmetrischer schwebender Void-Ritter
mit Finnen, Schichtpanzer und instabilem Kern. Drohne (zweiflügeliger Interceptor),
Soldat (Fronthelm und Kompaktbeine), Schwer (Belagerungsmech mit Schulterpods),
Panzer (mobile Schildkrabbe), Jäger (Scharfschützen-Gleiter mit Lauf und Heckfinnen),
Exploder (viergeteilte Reaktormine) und Brutknoten (dreibeinige Brutkapsel) besitzen
eigene Körpergeometrien. Auch die vier Bossformen sind als Brutkelch, Frontkeil,
offener Spiralwerfer und Schildstern eigenständig gezeichnet. Die Klingenformen
unterscheiden sich zusätzlich an Griff und Emitter. Alles ist rein visuell und
erhält Radien, Warnformen und aimX/aimY-Ausrichtung des Jägers. Es entstehen keine
zusätzlichen Partikel- oder Schattenpassagen; die Performance auf Zielgeräten ist
noch zu prüfen.

Der **Jäger** sperrt ab Beginn der Zielphase seine Schussrichtung sichtbar (fester
Zielstrahl statt Nachführen) und feuert entlang dieser gesperrten Linie. Körper und
Waffenlauf behalten dieselbe Richtung während der Warnung und Erholung; nach dem
Schuss hält er eine kurze, verwundbare **Erholung** (`CONFIG.jaeger.recoverMs`), bevor
er zurückweicht (Phase `erholung`). Seitliches Ausweichen bringt den Spieler damit
sichtbar aus der Linie und ermöglicht einen erreichbaren Konter. Kein zusätzlicher
Schuss. Höchstens zwei Jäger laden gleichzeitig; der Platz wird vor Beginn der
Warnung vergeben und verzögert keinen bereits angekündigten Schuss. Richtung,
Warnlimit und Erholung sind headless geprüft; die menschliche Konterbarkeit bleibt
im Spieltest zu beurteilen.

### 3.7 Langzeitfortschritt, Tageslauf und Endlos

- **Werkstatt:** 15 Projekte; darunter Startimpuls, Hauptmacht-Blaupausen,
  Begleiter-Ausbau und Kosmetik. Fragmente sind die vorhandene Meta-Währung.
- **Orbitauftrag:** genau ein dauerhafter, nicht verfallender Auftrag aus fünf
  Typen. Fortschritt bleibt über Läufe erhalten; Erfüllung gibt 160–200 Fragmente.
  Der Folgeauftrag entsteht zwischen Läufen. Ein kostenloser Tausch pro lokalem
  Kalendertag ist möglich, bei begonnenem Fortschritt mit Rückfrage vor dessen Verlust.
- **Hilfen:** Entdecker, Standard und Meister. Zusätzlich vier gestapelte,
  freischaltbare Prüfstufen. Konkrete Prüfstufen-Kosmetikbelohnungen sind noch
  nicht implementiert, auch wenn die Oberfläche das Ziel bereits so beschreibt.
- **Tageslauf:** Datumsseed, sechs Twists und sechs Regeln, Standard als Basis.
  Er geht weiterhin bis Welle 30. Der erste Abschluss des Tages gibt 250 Fragmente,
  auch bei Tod oder freiwilligem Beenden; kein Sieg nötig. Bestwellen der letzten
  sieben Tage werden gespeichert, spielbar angeboten wird der heutige Lauf.
- **Endlos:** beginnt nach dem Sieg mit Welle 31. Der reguläre Build friert ein;
  normale Auslesen enden. Echo-Rang 1 ist eine exklusive Wahl zwischen Klingen-
  und Machtecho. Rang 2 nach Boss 35 und Rang 3 nach Boss 40 folgen automatisch.
  Weitere Level können danach fünfsekündige, nicht stapelbare Echoimpulse auslösen.
  Es gibt keine neuen Kartenentscheidungen nach dieser Echo-Wahl.
- Freiwilliges Beenden mit Beutegutschrift ist über Pause möglich. Eine ausdrücklich
  angebotene Ausstiegsentscheidung nach jedem Endlos-Boss existiert noch nicht.

Speichern: `localStorage` unter `orbitblade_konzept_save`, **SAVE_VERSION 14**.
Die Migration von v9 erstattet das entfernte Zweitmacht-Projekt mit 1.000 Fragmenten
und entfernt `meta.slot2` sowie die zweite Startauswahl. Die Migration **v11 → v12**
begleitet den neuen Mächte-Pool: Funkenkranz und die drei neuen Mächte sind reine
Lauf-Inhalte, daher ist keine Erstattung nötig (Funkenkranz war nie ein dauerhafter
Kauf); ein etwaiger Funkenkranz-Rest in `unlocks` wird entfernt, damit keine
entfernte Wirkung wiederkehrt. Andere Projekte, Freischaltungen und Bestmarken
bleiben bestehen (Migration verlustfrei und idempotent geprüft). `konstrukt` bleibt
als Speicher-ID der kosmetischen Leerenklinge erhalten. Kein Ersatzprojekt für Slot 2.
Die Migration **v12 → v13** ist rein additiv: sie legt das neue Feld `kampagne`
(`{planeten:{}, introGesehen:false, held:{klinge,leben,macht,fokus}, starterBonusGewaehrt:false, warpkerne:{}}`)
an, falls es fehlt, und lässt einen vorhandenen Kampagnenstand — befreite Planeten,
Heldenkern-Stufen und Warpkerne — unangetastet. Es gibt keinen bestehenden Bestand zu erstatten
oder zu entwerten; die Migration ist verlustfrei, idempotent und defensiv gegen
Teilobjekte (headless geprüft in `tools/pruefe_kampagne.js` und `tools/pruefe_maechte.js`).
Die Migration **v13 → v14** ergänzt additiv `avatar` mit Defaults aus der bisherigen
Figur-, Farb- und Formwahl; vorhandene Freischaltungen und Käufe bleiben unangetastet.

### 3.8 Rückruf-Beta (gebaut am 06.09.2026)

**Status nach Nutzerfeedback:** Der Entwickler hat die Rückruf-Beta als schlechter
als das Hauptspiel verworfen. Sie bleibt als bestehender Versuch erhalten, ist aber
keine Entwicklungsrichtung mehr. Weiterentwickelt wird das vorhandene Orbitspiel.

Unter `konzept/beta/` liegt eine separat startbare, lokale Vertical-Slice-Beta des
Rückruf-Entwurfs. Sie ist vom Hauptspiel isoliert und speichert keinen Spielstand.
Der kurze Run führt durch Ankunft, Gegenprobe und den Endgegner Lichtbrecher. Die
Klinge wirft in die sichtbare letzte Bewegungsrichtung, kann früh zurückgerufen
werden und fliegt danach auf einer beim Rückruf fixierten geraden Linie zum damaligen
Spielerpunkt; das Andocken selbst ist harmlos. Treffer werden über ein swept
Segment geprüft. Die Klinge schützt zu Hause mit einer einmaligen sichtbaren Ladung;
ein direkter Rückflugtreffer lädt sie wieder, ein leerer Rückflug nicht.

Die Beta enthält Sog, Fangschirm, Standbild und Glutspur sowie die zuverlässig
erreichbare Fusion Spiegelstern aus Fangschirm und Standbild. Der Spiegelstern
behält gefangene Geschosse an ihren Eintrittspunkten bis zur begrenzten Kapazität
und sendet sie zum festen Fangpunkt; volle Speicher lassen neue Geschosse passieren.
Zwischen Begegnungen gibt es verständliche Macht-, Ersatz- und Heilentscheidungen.
Verfolger, Schütze mit Warnung, Schildträger mit offenem Angriffsfenster sowie
Bodenwarnungen im Finale sind spielbar. Touch-Pad, ein Kontextknopf, WASD/Pfeile,
Leertaste, Pause, Tabwechsel-Stop, `pointercancel` und Key-up-Reset sind enthalten.
Die Hauptfassung verlinkt die Beta im Startmenü; dieser Umfang ist ausdrücklich ein
prüfbarer Beta-Ausschnitt und keine Umsetzung der vollständigen Meta.

### 3.9 Galaxie-Kampagne — Vertical Slice EOS (Phase 1, gebaut am 07.09.2026)

Erste umgesetzte Stufe des Galaxie-Umsetzungsplans. Ein Planet-Run ist ein normaler
Orbitblade-Lauf; der globale Siegpunkt bleibt Welle 30, EOS trägt als verkürzter
Anfängerbogen Welle 15. Neu ist nur ein leichtgewichtiger Kampagnen-Rahmen (nur
DOM/CSS, keine Dauer-Partikel).

Ablauf (überarbeitet durch [Menü-/Galaxie-Auftrag](docs/konzept/11-claude-menue-galaxie.md),
Auftrag 1, 07.09.2026): Das Startmenü bietet eine **dominante Direktaktion**, die die
empfohlene erreichbare Mission sofort startet (`renderStartMission()` beschriftet sie
z. B. „EOS befreien", „KRYOS befreien" oder „… erneut befreien"; `empfohlenePlanet()`
liefert die erste erreichbare, noch nicht befreite Welt bzw. eine ehrliche Wiederholung).
Der Knopf ruft **dieselbe** `starteKampagnenLauf(id)`-Logik wie die Karte (keine zweite
Run-Initialisierung). Darunter stehen **Welten** und **Mein Held** als Hauptzugänge, Tageslauf
und Einstellungen darunter. **Hauptmacht und Sammlung sind unter „Held" zusammengeführt**
(Auftrag 2 §42); das Startmenü führt sie nicht mehr separat.

Die **Galaxiekarte** (`overlay-galaxie`) ist eine zusammenhängende **vertikale Route**
(`renderGalaxie()`): jede Welt eine eigene Inline-SVG-Silhouette (`weltSVG()` — EOS
bewohnt, KRYOS Werft, VEGA Sturm+Zielanlage, KOMMANDO Kommandostation), räumlich leicht
versetzt angeordnet und durch Linien zwischen den Körpermittelpunkten verbunden
(befreite Verbindung leuchtet). Status per Marke/Schloss plus Label
(befreit/besetzt/gesperrt). Ein Tap füllt den **Detailbereich unten auf derselben Seite**
(`waehlePlanetDetail()`, Name/Bedrohung/Besonderheit/Belohnung + „Befreien"; bei Sperre
stattdessen die konkrete Voraussetzung). Die frühere separate Pre-Run-Vollbildseite
(`overlay-planet`) ist **entfallen**. Sektor II erscheint nur als zurückhaltender
Ausblick. `aktiverPlanet` hält den Planetkontext; die lokale EOS-Abkürzung verändert
keine Werte anderer Welten, des Tageslaufs oder des Endlosmodus.

In der Phase-1-Fassung war nur **EOS** spielbar; der übrige Sektor I ist seit Phase 4
vollständig spielbar (siehe 3.12). Die Planeten sind datengetrieben in
`KAMPAGNE.sektoren` definiert; `planetById`, `planetStatus`, `planetErreichbar` und
`markiereBefreit` sind die zugehörigen Helfer.

Sieg auf EOS nach Welle 15 setzt den Planeten dauerhaft auf **befreit** (`save.kampagne.planeten`),
zeigt „EOS befreit" und kehrt über „Zur Galaxie" zur Karte zurück; ein befreiter
Planet bleibt wiederholbar. Niederlage lässt den Planeten **besetzt** (Rückzug statt
hartes Aus), der Fragmentfortschritt bleibt erhalten. Die Endlos-Wahl nach dem Sieg
bleibt unverändert erhalten. Fragmente laufen weiter über die **bestehende**
Ökonomie (Drops + `bucheFragmente()`); eine eigene Kampagnen-Wirtschaft und der
Heldenkern kommen erst in Phase 2/3. Kein Modifier-Leak: EOS hat nur seine lokale
Anfängerfolge; normale EOS-Gegner werden bis Welle 9 einzeln als Drohne, Soldat
und Schwer eingeführt. Im EOS-Endloslauf gilt wieder die globale Siegschwelle und
Gegnerkurve; die reguläre EOS-XP-Kurve ist bis zum Sieg lokal 4,5-fach, damit der
verkürzte Lauf seinen vollständigen Build erreicht; Boss 35/40 geben weiterhin
Echo-Rang 2/3. `hideAll()` schließt
Galaxie/Planet bei jedem Laufstart mit.

Regression: `node tools/pruefe_kampagne.js` prüft Kartenlogik, eine **echte**
God-Siegrunde (EOS wird befreit), den verkürzten EOS-Bogen samt Endlos-Fortsetzung,
die Niederlage-Semantik (bleibt besetzt) und die Migrationsfestigkeit. Der Klickweg und die Darstellung sind headless nicht prüfbar
und auf GitHub Pages zu sichten.

### 3.10 Heldenkern — permanente Progression (Phase 2, gebaut am 07.09.2026)

Erster echter permanenter Kampfkraft-Loop. **Vier Tracks à fünf Stufen** (Plan §16/§17),
bezahlt mit der **bestehenden** Fragmentwährung (keine zweite Wirtschaft):

| Track | Wirkung | Zentraler Hook | Startwert (Deckel Stufe 5) |
|---|---|---|---|
| Klingenreaktor (`klinge`) | Orbit-Grundschaden | `heldKlinge()` an beiden Orbit-Schadenszeilen | +4 %/Stufe → +20 % |
| Vitalmatrix (`leben`) | maximales Leben | `heldLeben()` in `newPlayer()` | +6 %/Stufe → +30 % |
| Machtkern (`macht`) | Hauptmacht-Schaden | `heldMacht()` in `machtFaktor()` (alle fünf Mächte) | +5 %/Stufe → +25 % |
| Fokusleiter (`fokus`) | Fokus lädt schneller | `heldFokus()` in `fokusZiel()` | −2 %/Stufe → −10 % Ziel |

**Alle Prozentwerte und die Kosten (`HELD_KOSTEN=[300,700,1400,2500,4000]`, Plan §24)
sind Implementierungs-Startwerte, noch nicht balancegemessen.** Die Boni gelten in
allen Läufen (wie Startimpuls/Begleiter) und docken zentral an bestehenden Werten an;
bei Stufe 0 sind alle Faktoren exakt 1,0, der bestehende Balance-Stand bleibt also
unverändert (God-Baseline weiter Sieg W30). Gemessen (6 Bot-Läufe je Seite,
Erkundung, kein Balance-Beweis): Basis-Held Ø-Welle 6,3 → Voll-Held Ø-Welle 8,8 —
spürbar, aber nicht trivialisierend (der Bot stirbt weiter um W9, weit vor dem Sieg;
Plan §3.5/§43).

Persistenz: `save.kampagne.held = {klinge,leben,macht,fokus}` (0..5), defensiv
normalisiert und migrationsfest. Der **Held-Screen** (`overlay-held`) ist seit Auftrag 2
  ein Hub mit drei Tabs (§42–44): **Aussehen** = modulare Kopf-, Brust-, Bein- und Griffteile
  mit gemeinsamer Live-Vorschau, Klingenform und Klingenfarbe; **Mächte** = direkte Auswahl
  der vorhandenen Hauptmacht. **Verbessern** = Heldenkern als kompakte Einträge (Wirkung,
Rang-Pips, konkrete nächste Veränderung `HELD_TRACKS[].schritt`, Preis; Käufe ausdrücklich
  ausgelöst) und Zugang zur **Werkstatt**. Auswahl und Käufe bleiben damit getrennt.
  Erreichbar aus Startmenü (`◆ Mein Held`), Galaxie, Sieg und Niederlage (`◆ Held verbessern`). Ein **einmaliger Starterbonus** (`gewaehreStarterBonus()`, Flag
`starterBonusGewaehrt`) füllt beim ersten beendeten Kampagnen-Lauf — Sieg oder
Niederlage — auf mindestens Tier-I-Kosten auf, damit der Meta-Loop auch nach frühem
Tod erlebbar ist (Plan §13.6); streng einmalig, kein Exploit, kein Geschenk an bereits
reiche Spieler. Regression in `tools/pruefe_kampagne.js` (reale Wertänderung, maxHp im
echten Lauf, Cap, Kostenprüfung, Migration bis v14, Starterbonus einmalig).

**Ergebnis-Screens (Auftrag 2 §45/§46, 08.09.2026):** Nach Kampagnensieg **eine**
dominante Aktion `sieg-mission` „Weiter: <nächste Welt>" (bzw. „Zur Galaxie") — sie
öffnet die Galaxie mit bereits fokussierter nächster Mission, damit vorher verbessert
werden kann; „◆ Held verbessern" ist sichtbarer Nebenzugang, Endlos untergeordnet, kein
zweiter gleichrangiger Primärknopf. Nach Niederlage ist „Erneut versuchen" hervorgehoben,
daneben „◆ Held verbessern"; Fortschritt/Fragmente knapp gezeigt. Belohnungen werden in
`sieg()`/`gameOver()` genau einmal gebucht — ein Menü-Öffnen vergibt nichts erneut. Der
  Sektorabschluss-Text ist korrigiert: „Warpkern gesichert · Sektor II folgt später" statt
einer Behauptung, Sektor II sei bereits spielbar (§47). `hideAll()` schließt alle
Zwischen-Overlays (Held/Vorbereitung/Werkstatt/Sammlung) mit, damit keines Eingaben abfängt.

### 3.11 Fragmentökonomie der Kampagne (Phase 3, gebaut am 07.09.2026)

Die bestehende Kill-Drop-Ökonomie bleibt unverändert (die „kleinen Drops" aus Plan
§23.2) und ist bereits stark an den Fortschritt gekoppelt (gemessen: ~4900 Fragmente
bei vollem God-Sieg, ~64–260 bei frühem Tod). **Additiv obendrauf** kommt eine
**campagne-only** Abschlussbelohnung (`kampagneAbschluss(gewonnen, erstBefreiung)`),
die nur bei gesetztem `aktiverPlanet` und `!messlauf` zahlt:

| Bestandteil | Startwert (unbalanciert) |
|---|---|
| Sichere Bergung (Runfortschritt) | `wave × 10` |
| Bossbonus | `50` je im Lauf besiegtem Boss |
| Siegbonus | `500` bei Sieg |
| Erstbefreiung | `700`, nur beim ersten Befreien eines Planeten |

Genau **einmal pro Lauf** über `kampagneBonusVergeben` (in `resetGame()` zurückgesetzt):
Ein Sieg auf W30 vergibt den Bonus, ein anschließender Endlos-Tod zahlt **nicht** ein
zweites Mal. Damit ist ein Sieg (≈1800 bei Erstbefreiung) klar lohnender als eine
Wiederholung (≈1100) und deutlich lohnender als absichtliches Frühsterben (W5 ≈50),
und es gibt keinen wiederholbaren Farm-Exploit. Der Starterbonus füllt zusätzlich den
allerersten Lauf auf ≥ Tier I. Tageslauf/Endlos/normale Läufe sind ausgenommen
(kein Leak). **Alle Zahlen sind Startwerte (Plan §24/§44), noch nicht balancegemessen.**
Regression in `tools/pruefe_kampagne.js` (Sieg > Wiederholung > Niederlage, Einmal-pro-Lauf,
kein Leak, Sieg schlägt fünf Frühtode).

### 3.12 Sektor I vollständig — vier Missionen (Phase 4, gebaut am 07.09.2026)

Sektor I ist als vollständiger Kampagnenbogen spielbar: **EOS → KRYOS → VEGA →
Kommandowelt**. Die Route bildet sich von selbst aus `planetErreichbar` (jeder Planet
öffnet den nächsten seines Sektors); die Vorschauwelten haben kein `gesperrt` mehr.

Jeder Planet hat **eine** klare Identität über einen campagne-lokalen `mod`, den nur
`planetMod()` aus `aktiverPlanet` liest (leer außerhalb der Kampagne → **kein Leak**
in Tageslauf/Endlos/Normal, Plan §41). Der Kampf bleibt ein normaler W30-Lauf, `mod`
verschiebt allein die Gegnermischung in `randomEnemyType()`:

| Welt | Typ | Identität | `mod` | Gemessen W15 |
|---|---|---|---|---|
| EOS | Befreiung | Grundgegner | — | Basis |
| KRYOS | Befreiung | Panzerwerft | `panzerAb:3, panzerChance:0.42` | Panzer 22 %→42 % |
| VEGA | Befreiung | Jägerstützpunkt | `jaegerAb:4, jaegerMult:1.6` | Jäger 28 %→~45 % |
| KOMMANDO | Boss | Sektor-Kommandant | `panzerAb:6, panzerChance:0.30, jaegerAb:6, jaegerMult:1.3` | harte Elite-Mischung |

Die Kommandowelt ist der **Sektorabschluss** (`sektorAbschluss:true`): ihr Sieg verdient
den **Warpkern** des Sektors (`save.kampagne.warpkerne.s1`, kostet keine Fragmente,
Plan §20.1), zeigt „Sektor I befreit · Warpkern erhalten" und öffnet **Sektor II** als
Teaser in der Karte. Sektor II (`braucht:'s1'`) erscheint erst nach dem Warpkern; seine
Welten (IONOS, AURA) bleiben bis Phase 7 `gesperrt`. Alle Zahlen sind Startwerte
(Plan §18/§44). Gemessen: God-Bot gewinnt alle vier Welten (W30), Neutralität außerhalb
der Kampagne bleibt (God-Baseline W30). Regression in `tools/pruefe_kampagne.js` (Route,
Identität/kein Leak, Gegnermischung, Warpkern-Vergabe, Migration).

## 4. Beschlossene Ziele und noch nicht gebaute Entwürfe

Dieser Abschnitt ist ein Arbeitsvorrat, **keine Beschreibung vorhandener Funktionen**.
Eine Konsolidierung ändert keine Balance und führt keine dieser Funktionen nebenbei ein.

**Aktuelle Richtung nach Nutzerkorrektur:** Orbitklinge, bestehende Steuerung und
automatischer Machtzuwachs bleiben erhalten. Vorrang haben verständliche Wirkungen,
gezielte Rollenverbesserungen vorhandener Mächte und freiwillige Langzeitziele auf
Basis vorhandener Fusionen, Sammlung, Aufträge und Begegnungen. Neue Eingabepflichten,
ein Kernwechsel und pauschaler Funktionsverlust bei Fusionen sind nicht vorgesehen.
Die frühere Rückruf-Empfehlung gilt nicht mehr. Ein größerer Kartenkatalog aus
Abschnitt 4.3 ist damit kein vorrangiges Ziel; neue Inhalte brauchen einen konkreten
Mehrwert gegenüber vorhandenen Wirkungen. Am 07.09.2026 hat der Nutzer den Beginn
der Umsetzung beauftragt, mit vorgeschalteter grafischer Prüfung insbesondere des
Machtblitzes. Die erste Stufe umfasst visuelle Gewichtung, Wirkungs- und
Bereitschaftsfeedback sowie verständliche vorhandene Karten- und Fusionsanzeigen;
spätere Begegnungs- und Metaerweiterungen bleiben zunächst Entwurf. Die konkreten
Vorschläge und ihre Priorität stehen in
[Orbit-Weiterentwicklung](docs/konzept/08-orbit-weiterentwicklung.md); sie sind als
Vorschläge vom vorhandenen Spielstand getrennt.

**Folgeplan für Claude Code (inzwischen gebaut):** Der Nutzer hat den neuen passiven
Mächte-Pool mit neun klaren Rollen und die Beibehaltung von Orbitklinge und aktivem
Hauptmachtknopf bestätigt. Die Übergabe stand in
[Claude-Umsetzungsplan](docs/konzept/10-claude-umsetzungsplan.md). Die dort
beschriebenen **Spieländerungen sind umgesetzt**: Jäger-Korrektur (Aim-Lock +
Erholung), sechs remechanisierte Passive (Ketten-Machtblitz, Phaser-Strahl,
Kinetische Welle, Telekinetisches Arsenal, Singularität, Plasmabombe), drei neue
Mächte (`machtgriff`, `energieklingenwurf`, `macht_echo`), die sechs Fusionen mit
Plasmasturm auf Plasmabombe+Energieklingen-Wurf, Funkenkranz aus dem Pool und die
Save-Migration v12. **Noch offen ist die Balance-Abnahme** — alle Zahlen sind
Startwerte, per Schadensprüfstand und Überlebensläufen zu messen. Dauerhafte
Fragment-Upgrades sind nicht Teil dieses Folgeplans.

### 4.1 Laufbogen und Machtinszenierung

- Der bestätigte Zielkorridor für den Standardlauf bleibt **12–14 Minuten bei
  15 regulären Freischaltungen**. Jüngere God-Botläufe liegen darunter. Botzeit ist
  kein Beweis menschlicher Spielzeit; nicht allein durch mehr Gegner strecken.
- Gewünschter Bogen: in Minute 0–3 Form finden, 3–6 den Build sichtbar machen,
  6–9 Meisterschaft/Evolution erreichen, anschließend Krone und Finale. Die
  zeitliche Verteilung soll gleichmäßiger werden; das ist kein starrer Wellentimer.
- Normale Machtaktivierung stärker als Werkzeug zur Anordnung von Gegnern lesen,
  fokussierte Aktivierung als seltenen Höhepunkt. Ziele: etwa **8–12 fokussierte
  Einsätze pro Lauf**, **1,5–2 s** erkennbare Wirkung, eigener Klang und kurze
  Zeitlupe. Heutiges Fokusverhalten erst erneut messen, bevor Regler geändert werden.
- Formenentwurf: Wirbel bleibt spielerzentriert, Bombe bleibt gesetzt und verzögert;
  Schock soll eine gerichtete Welle, Nova eine ortsfeste Säule werden. Sog als
  Halten auf Klingenabstand ist bereits umgesetzt und nicht erneut zu entwerfen.

### 4.2 Einstieg und kürzere Sitzungen

- Startseite mit einem großen **Spielen**-Knopf und kleinen Zugängen zu Tageslauf
  und Sammlung. Hauptmacht bleibt die sinnvolle Vorentscheidung; die übrige
  Verwaltung soll in die Sammlung. Schwierigkeit erst bei Bedarf, etwa nach dem
  zweiten Tod, anbieten. Die heute noch vorhandene Hilfsstufenwahl nicht als
  bereits abgeschafft dokumentieren.
- Tageslauf künftig **Welle 1–20, etwa sieben Minuten**, mit eigener Bestmarke.
- Endlos künftig nach jedem Boss anbieten: weiter oder Ergebnis sichern und
  aussteigen. Eine Fünf-Wellen-Etappe soll 3–5 Minuten dauern. Zunächst keine
  zusätzlichen Inhaltsstufen nach Welle 40, bevor diese Ausstiege existieren.

### 4.3 Kartenkatalog und Wiederspielwert

- Gesamtkatalog auf etwa **30 Dinge** ausbauen, durch Taten im Lauf freischalten.
  **Ziehbarer Topf je Lauf bleibt etwa 11**; ein größerer Katalog soll nicht jede
  einzelne Auslese verwässern. Die Auswahl einer Teilmenge ist noch zu bauen.
- Prüfstufen 5–8 und die Matrix aus Hauptmacht und Weichenkombinationen sollen
  langfristige Ziele liefern, ausschließlich kosmetisch belohnt. Keine neue Währungssenke.
- Noch offene Kartenarbeit: Lebensregen Rang 1 wirksamer und erkennbar machen;
  Nachfassen braucht einen sichtbaren Bereitschaftszustand und einen erneut
  spürbaren Rang 2; Taktschlag braucht eine erneute Wirkungsprüfung und Abstimmung.
  Zutatenstatus hebt die Aufnahmeprüfung einer Karte nicht auf.
- In der ersten Grafikstufe (07.09.2026) zeigt Lebensregen einen kurzen grünen
  Impuls nur bei tatsächlich gutgeschriebenem Leben. Nachfassen und Taktschlag
  spiegeln ihre vorhandene Bereitschaft beziehungsweise ihren Umlaufzähler lokal
  am Spieler. Der passive Machtblitz bleibt mechanisch unverändert, ist aber mit
  kompakter violett-blauer Zielmarke, kleinerem Einschlag und geringerem Kamera-
  Shake in der visuellen Hierarchie zurückgenommen; Zielanzahl, Trefferzeit und
  Schaden bleiben gleich.

### 4.4 Karten-Evolutionen: Entwurf mit offenen Kollisionen

Vorhanden sind nur die fünf **Hauptmacht-Evolutionen**. Die geplante Kombination
zweier Auslese-Karten ist ein zusätzliches, noch nicht implementiertes System:
eine Zutat auf Rang 2, die andere mindestens Rang 1; anschließend eine goldene
Evolutionskarte, die beide Zutaten ersetzt und deren Plätze freigibt.

Die bisherigen Rezeptentwürfe bleiben als Entwürfe erhalten:

| Zutaten | Gewünschte Wirkung |
|---|---|
| Klingenteilung + Taktschlag | Jede Klinge stößt eine eigene Welle aus |
| Phaser + Nachhall | Schüsse erzeugen beim Aufschlag Druckwellen |
| Kettenblitz + Konterstoß | Erlittener Treffer entlädt eine Kette über nahe Gegner |
| Glasklinge + Lebensregen | Verlorenes Leben verstärkt Schaden, Kills heilen |
| Nachfassen + Splitter | Verbreiterter Volltreffer schleudert Splitter |

**Vor Umsetzung die Zutatenkonflikte lösen.** Mehrere Zutaten sind zugleich Partner
einer Hauptmacht und daher nicht in jedem Auslese-Topf vorhanden. Nova/Phaser darf
nicht still verändert werden. Die neuen Module Funkenkranz und Brandspur sind in
dieser älteren Rezeptliste noch nicht berücksichtigt. Ein endgültiger Rezeptkatalog
ist deshalb offen.

Die beschlossenen Konstruktionsregeln bleiben dabei erhalten: Jede Karte hat genau
einen Rezeptpartner; Hauptmacht- und Karten-Evolutionen verwenden getrennte Zutaten.
Die obige Liste erfüllt diese Trennung noch nicht und ist daher keine Baufreigabe.

Verbindlich bleibt die Richtung: Rezepte sichtbar machen, sobald eine Zutat bereit
ist; die Ziehung nicht zugunsten fehlender Zutaten manipulieren. Die historischen
Rezeptsimulationen belegen einen Entwurf, keinen heutigen Gameplay-Befund.

## 5. Messungen und ihre Grenzen

### 5.1 Letzte Abnahme der Karten vom 30.08.2026

Abnahme aus der Implementierungsrunde, hier zusammengeführt, nicht neu balanciert:
20 s auf Welle 20, 16 Soldaten mit je 1e9 HP, zunächst im Ring an Klingenreichweite;
Spieler stationär, Gegner bewegen sich normal. Karten über die echte Auswahl,
Spieler getroffen, Leben und Zustand nach jedem Bild wiederhergestellt. Fester Seed
und gekoppelte Simulationszeit. Basis: **38.550 Schaden** in 20 s.

| Karte | Neu gegen Basis | Rang 2 gegen Basis | Rang 2 gegen Neu |
|---|---:|---:|---:|
| Funkenkranz | +17,54 % | +38,47 % | +17,81 % |
| Brandspur | +20,53 % | +39,20 % | +15,49 % |
| Phaser | +18,12 % | +45,34 % | +23,05 % |

Mit allen drei auf Rang 2: durchschnittlich **4 Funken, 15,89 Felder und
23,58 Geschosse**, keine leeren Frames in diesen drei Listen; 85.974 Gesamtschaden.
Dies ist ein dichter Schadensprüfstand, kein Beleg für jede Gegnerart oder
Überlebenssituation. Ein unabhängiger Bericht im historischen Konzeptstand liefert
leicht andere Werte ohne identisch dokumentierten Aufbau; getrennt behandeln.

Drei Standard-God-Botläufe dieser Abnahme: **605,27 / 626,98 / 596,72 Sekunden**,
jeweils Sieg Welle 30, Krone 1, 15 investiert, 0 Restpunkte, 9 Karten und 3 Weichen.
God-Läufe prüfen Spielfortschritt und Laufzeit, nicht Überlebensbalance.

### 5.2 Weitere datierte Belege

- Am 31.08. strukturell geprüft: alle fünf Hauptmächte erreichen mit 15 regulären
  Punkten und drei Weichen Krone und Evolution; Varianten mit Zusatzpunkten siehe
  Punktökonomie. Migration v9→v10 erhält andere Projekte, Freischaltungen und Bestwerte.
- Nach der Werkzeugpflege am 31.08.: Standard-God-Lauf über `run()` bis Sieg W30
  in 10,68 simulierten Minuten, Krone 1, 15 investiert, 0 Restpunkte, 9 Karten und
  3 Weichen. Endlos bis W43 in 18,08 Minuten, Klingen-Echo Rang 3. Dies prüft die
  reparierten Auswahl- und Fortsetzungswege, keine neue Balance oder Zielhardware.
- 09.09.: EOS-Messlauf ohne Dauerboni auf Standard erreichte Welle 5 (33 Kills,
  0,77 simulierte Minuten). Der technische God-Strukturcheck gewann EOS
  auf Welle 15 mit 3 Bossen, 4 Kartenstopps und 15 regulären Budgetpunkten in 3,72
  simulierten Minuten; diese neuen Startwerte sind kein menschlicher Balancebeleg.
- Die ursprüngliche Wellenfluss-Messung vom 30.08. senkte Restejagd von 12,6 % auf
  6,3 % und fast leeres Feld von 19,4 % auf 10,6 %. Das sind damalige Vergleichswerte,
  keine neu gemessenen Kennzahlen des heutigen Gesamtbuilds.
- Im damaligen Schwierigkeitsanker war Schaden je Kill für Entdecker/Standard/Meister
  monoton. Zwei Durchläufe streuten im Median rund 11 %, im Einzelfall bis 26 %.
  Mit der damaligen Stichprobe waren Unterschiede unter etwa 25 % nicht belastbar.
- Historischer Performancebefund: Füllrate war der Engpass. Halbe Hintergrundauflösung
  und früherer Sparmodus halfen auf dem getesteten X1 Carbon. Ein späterer Vergleich
  mit 65 Gegnern maß für die neuen Akteure +0,07 ms mittlere Draw-Zeit. Das ersetzt
  keine volle Hardwareprobe und rechtfertigt nicht die Behauptung „kostenlos“.

Alte Vorher-Messungen, vollständige Zahlenreihen und ihre Begründungen stehen in
den historischen Belegen. Sie dürfen nicht ungekennzeichnet zu aktuellen Sollwerten
oder garantierten Laufzeiten werden.

## 6. Prüfverfahren und Werkzeuge

### 6.1 Grundprüfung und vollständiger Lauf

`node tools/pruefe_maechte.js` ergänzt die Grundprüfung um gezielte Regressionen
für Treffer, Echo-Bildtakt, Boss-Griff, Jäger, beide Kartenränge, alle sechs
Fusionsauswahlen, Pause/Reset und die idempotente Spielstandmigration bis v14
(v11→v14 additiv, v12→v14 erhält befreite Planeten). `node tools/pruefe_kampagne.js`
prüft den Galaxie-Loop (Kartenlogik, echte EOS-Siegbefreiung, verkürzten EOS-Bogen,
Endlos-Gegnerkurve und Echo-Meilensteine, Niederlage-Semantik,
Migrationsfestigkeit), den **Heldenkern** (reale Wertänderung, maxHp im echten Lauf,
Cap/Kosten, Starterbonus einmalig), die **Fragmentökonomie** (Sieg > Wiederholung
> Niederlage, Abschlussbonus einmal pro Lauf, kein Leak) und **Sektor I** (Route
EOS→KRYOS→VEGA→Kommando, Planet-Identität ohne Leak, verschobene Gegnermischung,
Warpkern-Vergabe) — jeweils mit Nicht-Perf-Start, damit `messlauf=false` und
Belohnungen/Weltzustände tatsächlich greifen.

```powershell
node --check konzept/game.js
node tools/pruefe_maechte.js
node tools/pruefe_kampagne.js
node tools/pruefe.js
node tools/sim.js --god --minutes=20
```

`tools/pruefe.js` prüft vier maschinelle Regeln; seine Save-Vertrag-Erwartung (Regel 4)
ist an `SAVE_VERSION` gebunden statt an eine feste Zahl (Auftrag 2 §48), Migration und
Schutz vor Zukunftsversionen bleiben geprüft. Die **Auslieferungsprobe (Regel 3)** ist
rot, solange die Änderung nicht committet ist — das ist der bewusst offene „veröffentlichter
Stand"-Prüfpunkt und getrennt von echten Spielfehlern zu berichten.

`tools/sim.js` stellt `start`, `run` und `makeOrbitBot` bereit. `run()` beantwortet
normale Auslesen, Weichen und Endlos-Echos über die echte Auswahl und beendet
`countdown` mit `finishCombatResume()`. Seine zufällige Kartenwahl ist von einer
Referenz mit festgelegter erster Karte zu unterscheiden. `--wave=N` startet in
einer gewünschten Welle, `--wellestop=N` begrenzt den Lauf.

Für reproduzierbare Strukturregressionen: mindestens drei frische Standardläufe
mit `start({search:'?perf=1&god=1'})`, `resetGame()` und
`makeOrbitBot(api,{tempoFaktor:1})`. Bei `auslese` die vereinbarte Karte mit
`waehleAuslese(ausleseKarten[0])` wählen; bei `countdown` regulär fortsetzen.
Ohne Startimpuls/Tagesextrabudget gelten: Sieg W30, Krone mindestens 1,
`regularInvested()===15`, `skillPoints===0`, 9 Karten und 3 Weichen.
Endlos zusätzlich über beide Echozweige mindestens bis W43 prüfen.

### 6.2 Aufnahmeprüfung für jeden Kartenrang

1. **Spürbar:** mindestens 15 % Änderung auf Schaden **oder** Überleben gegenüber
   dem vorherigen Stand. Schaden und Überleben beurteilen; schwacher Schadenswert
   allein widerlegt keine Heilungs- oder Schutzkarte.
2. **Sichtbar:** eigene Form, Farbe, Bewegung oder dauerhafter Akteur. Eine Zahl
   allein reicht nicht. Die Wirkung muss auch im Moment des Erwerbs verständlich sein.
3. Rang 2 muss diese Prüfungen **erneut gegenüber Rang 1** bestehen. Zusätzlich
   beide Ränge gegen die kartenlose Basis berichten.
4. Für Funkenkranz, Brandspur und Phaser galt bei der Aufnahme zusätzlich der
   Zielkorridor **+15 bis +50 % Schaden gegen Basis** je Einzelstand. Das ist keine
   nachträglich bestandene Pauschalprüfung aller älteren Karten.

Schadensprüfstand: Welle 20, 16 Gegner im Ring an Klingenreichweite, HP je 1e9,
stationärer Spieler, 20 s. Gegnerbewegung und Treffbarkeit aktiv lassen. Karten
über `state='auslese'` und `waehleAuslese({id,kind})` vergeben, **nie direkt** über
`runModule` oder `runAbilities` (sonst fehlen etwa Glasklinges Lebensabzüge).
Nach jedem `api.step(1)` Zustand und HP wiederherstellen und Abbrüche mitzählen.
Dichte als Mittel, Minimum/Maximum und leere Frames der tatsächlichen Objektlisten
messen; neue Effekte zusätzlich gemeinsam und mit bestehenden Effekten prüfen.

Überleben: echter sterblicher Lauf, etwa ab Welle 12, keine künstliche Hinrichtung
in Körperkontakt. Für belastbare Vergleiche **mindestens 40 Läufe je Zustand**,
Median, Streuung und Standardfehler berichten. Acht Läufe eignen sich höchstens
zur Erkundung; die frühere pauschale Acht-Läufe-Empfehlung ist ersetzt.

### 6.3 Messfallen, die weiterhin gelten

- Knoten über `kaufenTreeKnoten()` erwerben. `bonuses.blades=2` allein setzt nicht
  die zugehörigen Flags und bildet keinen echten Build nach.
- Die Körperwahl verändert keine Kampfwerte. Leerenhunger über eine echte Haltung
  prüfen; ein kosmetischer Wechsel ist kein Charakter-Balancevergleich.
- `save.hilfe` **vor** `resetGame()` setzen. Ein Überschreiben von `hilfeId()`
  verändert die Schwierigkeit nicht zuverlässig.
- Laufzeitmessungen brauchen Unsterblichkeit vor der Schadensverarbeitung.
  Beim Schadensprüfstand dagegen Treffbarkeit erhalten und erst danach restaurieren.
- `Date.now()` und Zufallsverbrauch machen Harness-Läufe ohne zusätzliche
  Zeitkopplung nicht streng deterministisch. Seeds, Uhr, Startbuild, Gegnerart,
  Auswahlstrategie und Bildtakt festhalten; Streuung berichten.
- Es gibt **kein `renderSkillTree()` mehr**. Keine Phantomfunktion oder alten
  RAF-Stub einsetzen; damit würde man hängende Aufrufe verdecken.
- `Zeit bis zum Tod` kann am ersten Boss sättigen und Schwierigkeiten scheinbar
  gleich machen. Der Bot ersetzt kein menschliches Abstandsgefühl oder Audio-Urteil.
- `CONFIG.wave.spawnInterval`, `CONFIG.jaeger.shootRange` und `en.shootRange` sind
  historische Restfelder, keine verlässlichen Balance-Regler. Tatsächliche Leser prüfen.

### 6.4 Schwierigkeitsanker, Browser und Performance

`node tools/anker.js` misst Wellen 8/14/19/26 (bewusst keine Bosswellen) auf den
drei Hilfsstufen mit festen Startwerten und 30-s-Fenstern. Maß für den Druck ist
**erlittener Schaden je Kill**, zusätzlich Schaden/s, Kills/s und Gegnerdichte.
Panzer können sowohl Kills als auch erlittenen Schaden senken; Schaden/s allein
kann deshalb eine falsche Schwierigkeitsreihenfolge suggerieren. Abbrüche und
Standardfehler ausweisen. Verdächtige Monotoniefehler vor weiterem Balancing klären.

`mess_tageslauf.js`, `mess_juice.js` und `mess_entdecker.js` bleiben Spezialwerkzeuge.
Vor Wiederverwendung ihren Startbuild und ihre Auswahlstrategie zur Fragestellung
prüfen; ihre Ergebnisse sind nicht automatisch mit dem Standard-God-Bot vergleichbar.
Bei der Werkzeugprüfung am 31.08. endete Juice regulär mit Tod in W5; der langsame
Tageslauf erreichte W30, der schnelle W29 innerhalb seiner 16-Minuten-Grenze.
Beide Tagesläufe lieferten dieselben fünf Wellenereignisse. Das beweist weder
vollständige Deterministik noch einen garantierten Sieg. Diese Skripte berichten
Prüfergebnisse, erzwingen aber nicht für jeden negativen Befund einen Fehler-Exitcode.
Der vollständige Schwierigkeitsanker wurde bei dieser Dokumentpflege nicht neu gemessen.

Lokale Sichtprüfung: Server über `.claude/launch.json` oder aus dem Projektstamm
`python -m http.server 8123 --directory konzept`, dann `http://localhost:8123/`.
Overlay öffnen, auswählen, zurückkehren; sichtbare Texte und tatsächliches CSS
prüfen. `classList.contains('hidden')` allein belegt keine unsichtbare Oberfläche.

`?perf=1` aktiviert Messanzeige und `perfDump()`; `Shift+P` setzt zurück.
`?perf=1&wave=26&pts=15&god=1` erlaubt den späten Einstieg. `god=1` setzt in der
Browser-Messfassung `perf=1` voraus. Diese Fassung persistiert keine Spielstände.
Weitere Schalter: `dpr=100/150`, `bg=voll`, `gpu=1`; `Shift+1..8` schaltet
Zeichenebenen, `Shift+H` die Hintergrundauflösung.

Halbe Hintergrundauflösung ist Standard; Sparmodus bewertet erst nach 180
Kampfbildern und reagiert ab rund 18,5 ms. Mengen begrenzen (Partikel 340, Floats 36).
Gegner-Sprite-Vorrendern ist als damalige Lösung verworfen: weniger Pfadoperationen
beseitigen keine Füllrate und können Animationen verändern. FPS einer eingebetteten
Browser-Vorschaukachel sind kein Gerätetest; Update/Draw getrennt auswerten und
die tatsächliche Darstellung auf Zielhardware prüfen.

## 7. Offene Punkte und bewusste Zurückstellungen

| Offen | Nächste belastbare Prüfung oder Entscheidung |
|---|---|
| Kürzerer Tageslauf, weitere Endlos-Etappen | Nach den Zielen in Abschnitt 4 entwerfen; noch nicht vorhanden |
| Machtinszenierung und Fokusfrequenz | Aktuelles Verhalten neu messen und im Spiel bewerten |
| **Balance des neuen Mächte-Pools** | Schadensprüfstand + Überlebensläufe je Rang für alle neun Angriffsmächte; die Timer/Zahlen sind Startwerte und noch nicht gemessen |
| **Jäger-Korrektur im Spiel** | Aim-Lock, Erholungsfenster und Konterbarkeit mit echten Läufen prüfen; `recoverMs=420` ist ein Startwert |
| Lebensregen Rang 1, Nachfassen Rang 2, Taktschlag | Beide Balanceachsen und sichtbare Wirkung prüfen |
| Karten-Evolutionen | Sechs Fusionen sind gebaut und kollisionsfrei; offen ist nur ihre Balance-Abnahme. Neue Mächte brauchen keine eigene Fusion |
| Resonanztexte | Verweise auf „beide/andere Macht“ an den vorhandenen Ein-Knopf-Ersatzpfad anpassen |
| Bereitschaftsanzeige neue Mächte | Optionales sichtbares Cooldown-/Ziel-Feedback für die getakteten Mächte; heute laufen sie ohne eigene Bereitschaftsanzeige |
| Prüfstufen-Belohnung | Tatsächliche Kosmetikvergabe implementieren oder vorausgreifende Texte berichtigen |
| Ton | Vom Nutzer als schlecht bewertet; Phaser-Drossel allein löst das Gesamtproblem nicht |
| Glasklinge als bewusster Handel | Versteht der Spieler den sofortigen Verlust von 40 % Maximalleben? Keine automatische Zusatzbestätigung ohne Befund einbauen |
| Bosswarnungen und Endlosrhythmus | Echte Spieltests; globale Bosswarnzeit ist weiterhin 1100 ms |
| Zielhardware | Pixel 9: Touch und Performance; dichter später Kampf auf X1 Carbon und Mobilgerät statt nur Vorschaukachel |
| Pausierbare Spielzeit | Viele Effektfenster hängen weiter an `Date.now()` und laufen bei Overlays weiter |
| **Heldenkern-Balance (Phase 2 gebaut)** | Bonus-Prozentwerte und `HELD_KOSTEN` sind Startwerte; A/B/C-Messung (Basis/mittel/voll) je Track gegen Zeit-bis-W30, Überleben und Krone-Timing (Plan §45); Kostenkurve gegen echte Fragmentquellen prüfen |
| **Fragmentökonomie-Balance (Phase 3 gebaut)** | Abschlussbonus-Startwerte gegen echte Fragmentquellen und Heldenkern-Kosten prüfen; mehrere Kampagnenpfade simulieren (Plan §38); Pacing „alle 1–2 Läufe ein Kauf" (§25) messen |
| **Sektor-I-Balance/Feel (Phase 4 gebaut)** | `mod`-Werte je Welt sind Startwerte; menschlicher Spieltest, ob KRYOS/VEGA-Identität lesbar und fair ist (VEGA-Jägeranteil, Kommando-Elite-Mischung); ggf. `mod` feinjustieren |
| **Kampagne Phase 5 — Schiff** | Scanner, Bergung, Drohnenhangar, Warpkern als Bossfortschritt; vorhandene Begleitermechanik migrieren; keine Feldwerkstatt-Gates; nicht gebaut |
| Kampagne-Inszenierung (Phase 6) | Planeten-/Sektorsieg, Befreiungsanimation, Fragmentflug; erst nach funktionalem Meta-Loop, Performance auf Zielgerät prüfen |
| Erst-Run-Fluss EOS (Human-Test) | Versteht ein neuer Spieler ohne Text: welcher Planet spielbar ist, Sieg = befreit, Niederlage = Fortschritt bleibt? Auf Zielgerät sichten |
| **Eigener Kommandantenkampf (Auftrag §58)** | KOMMANDO nutzt bisher die normale Bossfolge; nächste Inhaltspriorität ist ein klar angekündigter Kommandantenkampf (unterscheidbares Angriffsmuster + Positionierungs-Antwort, keine neue Taste, kein bloßer HP-Aufschlag). Braucht einen eigenen Nutzerauftrag |

Zurückgestellt bleiben Rangmodus, kosmetisches Hangarprestige, Monetarisierung,
die Zusammenführung mehrerer Bestmarkenanzeigen, die Entfernung des alten
Hangar-Zwischenoverlays und ein Umbau der Gegnerseparation. Keine dieser Aufgaben
ist Teil einer bloßen Dokument- oder Dateibereinigung.
