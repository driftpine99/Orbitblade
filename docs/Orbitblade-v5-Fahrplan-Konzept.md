# Orbitblade v5 - Fahrplan-Konzept

Quelle: extrahierter Folientext und Sprecher-Notizen aus
`docs/Orbitblade-v5-Konzept-Orbitpfad.pptx`, erstellt am 12.08.2026.

## Ziel der Präsentation

Die Präsentation sollte Zustimmung zu einem klareren v5-Grundsystem einholen,
bevor Code angepasst wird.

Kernidee:

- Die Orbit-Klinge bleibt die gemeinsame Identität aller Charaktere.
- Vielfalt entsteht durch Haltung, Hauptmacht und Evolution.
- Spielspass zuerst; Langzeitmotivation als zweites System.

## Ausgangslage

Der aktuelle Orbitbaum sieht bereits besser aus, verlangt aber weiterhin zu viel
Lesen, Anklicken und Planen.

Probleme:

- Viele Knoten, kleine Texte, mehrere Logikspuren.
- Buffs werden oft erst nach Klick wirklich verständlich.
- Die Signatur auf Taste 3 hängt nicht sauber am Baum.
- Die Werkstatt erzeugt nach den ersten Käufen zu wenig Vorfreude.

Empfehlung:

Nicht weiter einzelne Buttons polieren, sondern Orbitbaum und Werkstatt um einen
gemeinsamen, einfachen Loop neu ordnen.

## Komplexität des aktuellen Baums

Interne Messung:

- Mit zwei aktiven Slots existieren effektiv etwa 32 ausgebbare Punkte.
- Es gibt ungefähr 20 sichtbare Knoten plus Ränge.
- Drei parallele Logikspuren erzeugen Verwaltungsgefühl.

Bewertung:

Die Menge an Punkten und Abhängigkeiten ist größer, als ein normaler Lauf
sinnvoll vermitteln kann.

## Leitlinie aus Vergleichsspielen

Die besten Vorbilder reduzieren nicht die Macht der Builds, sondern die Menge
gleichzeitig sichtbarer Entscheidungen.

Übertrag auf Orbitblade:

- Pro Stufe höchstens zwei verständliche Alternativen.
- Jeder Kauf verändert Verhalten oder Spielgefühl.
- Entscheidungen sollen klein wirken, aber große Konsequenzen haben.

Genannte Vergleichsmuster:

- Hades: paarweise exklusive Talente und schrittweise Enthüllung.
- 20 Minutes Till Dawn: kurze Upgrade-Ketten mit starker Spitze.
- Diablo IV: weniger passive Füllknoten, mehr aktive Spielveränderung.
- Nordic Ashes: Charakteridentität ohne Ersatz des Run-Kerns.

## Neues Bedienmodell

Drei Ebenen, keine dritte Taste:

1. Orbitklinge
   - Automatisch aktiv.
   - Bleibt Kernelement jedes Charakters.

2. Aktiv 1
   - Gewählte Hauptmacht.
   - Erhält Mutation, Passiv und Evolution.

3. Aktiv 2
   - Optionaler Utility-Slot.
   - Hilfreich, aber kein zweiter kompletter Baum.

Konzeptentscheidung:

- Taste 3 und separate Signaturen wie Lichtbahn entfallen.
- Die Supermacht entsteht als Evolution von Aktiv 1.
- Macht wächst, ohne zusätzliche Bedienlast zu erzeugen.

## Der neue Orbitpfad

Der Baum bleibt ein zusammenhängender Pfad.

Zielgröße:

- 12 bis 14 gleichzeitig sichtbare Knoten.
- Insgesamt 14 bis 16 ausgebbare Punkte im vollständigen Lauf.
- Pro Reihe maximal zwei wählbare Optionen.
- Keine horizontalen Scrollflächen.
- Im Idealfall kein vertikales Scrollen.

Etappen:

1. Hauptmacht
   - Aktiv 1 wird Run-Schwerpunkt.

2. Mutation A/B
   - Verhalten statt Prozentwert.

3. Partnerpassiv
   - Maximal zwei mechanische Ränge.

4. Klingenform
   - Dualorbit oder Präzisionsbahn.

5. Charakterhaltung
   - Licht- oder Leerenstil.

6. Meisterschaft
   - Maximal zwei spürbare Schritte.

7. Evolution
   - Aktiv 1 wird zur Supermacht.

8. Orbitkrone
   - Große Abschluss-Synergie.

Die zwei wichtigsten A/B-Entscheidungen sind Mutation und Charakterhaltung.

## Knotenlesbarkeit und Interaktion

Jeder Knoten soll verständlich sein, bevor man ihn anklickt.

Regeln:

- Symbol, Kurzname und konkrete Wirkungszeile direkt am Knoten.
- 20-24 px Symbolgröße.
- Keine winzigen Mini-Badges.
- Verfügbar = Gold.
- Gekauft = Grün.
- Gesperrt = dunkel, aber mit sichtbarem Grund.
- Detailtexte helfen, sind aber keine Voraussetzung.

Interaktion:

- Ein Tap kauft.
- Kein Bestätigungsdialog.
- Der letzte Kauf bleibt bis zum Schließen widerrufbar.
- Das reduziert Fehlklick-Frust ohne kompliziertes Respec-System im Lauf.

## Neue Punktökonomie

Zielkorridor:

- 14 bis 16 ausgebbare Punkte bis Welle 30.
- 12 bis 14 Knoten im kompletten Pfad.
- Höchstens zwei Alternativen pro Wahlstufe.

Balancing-Idee:

- Etwa ein Upgrade alle 60 bis 90 Sekunden in einem Standardlauf von 19 bis 23 Minuten.
- Die genaue XP-Kurve wird erst nach Implementierung gegen reale Testläufe abgestimmt.

Ziel:

Ein Standardlauf endet mit einem klaren Build, nicht mit einem abgearbeiteten Brett.
Jeder Punkt soll eine Entscheidung oder spürbare Mechanik auslösen.

## Charaktere

Zwei Charaktere sollen zwei Spielgefühle liefern, ohne die Klinge als Kern zu
verwässern.

Lichthüter:

- Start: Fokus, Barriere, Kontrolle.
- Pfad: Wächter oder Strahlenorbit.

Leerenklinge:

- Start: Risiko, Tempo, Schaden.
- Pfad: Verschlinger oder Abgrund.

Charaktere unterscheiden sich auf drei Ebenen:

- Startpassiv.
- A/B-Haltung im Orbitpfad.
- Optisch-mechanische Evolution.

Keine zusätzliche Signaturtaste: Die Haltung verändert Klinge und Hauptmacht.

## Werkstatt-Analyse

Ist-Zustand:

- Etwa sieben Käufe insgesamt.
- Zwei frühe, eigenständige Upgrades.
- Etwa 13.500 Fragmente bis zum Vollausbau.

Bewertung:

Der frühe zweite Slot und der Startimpuls erzeugen echte Vorfreude. Danach bleibt
hauptsächlich die Begleiterleiter: teuer, aber inhaltlich schmal.

Ein vollständiger Standardlauf liefert grob genug Fragmente für einen größeren
oder mehrere kleine Käufe. Der Engpass ist deshalb weniger Tempo als Vielfalt.

## Werkstatt v2

Die Werkstatt soll ein Hangar voller Projekte sein, kein zweiter Skilltree.

Projektarten:

- Blaupausen
  - Neue Mächte, Klingenformen und spätere Charaktere werden als Möglichkeiten
    freigeschaltet.

- Kernsysteme
  - Zweiter Aktivslot, Startimpuls, Loadout-Komfort.
  - Einmalig und klar.

- Kosmetik
  - Klingenfarben, Trails, Orbitformen und Hangar-Optik.
  - Langfristiger, fairer Fragment-Sink.

- Begleiter-Meilensteine
  - Aufheben.
  - Schießen.
  - Zielpriorität.
  - Schildpuls.
  - Überladung.
  - Jeder Rang ist eine Mechanik.

Ziel:

- Ein Bildschirm.
- 12 bis 16 bedeutungsvolle Projekte.
- Progression über etwa 8 bis 12 Läufe.
- Neue Optionen dominieren; kleine Boni bleiben selten und gedeckelt.

Belohnungsregel:

- Ein gescheiterter Lauf erzeugt Fortschritt oder einen kleinen Kauf.
- Ein vollständiger Lauf erzeugt ein großes Projekt oder zwei bis drei kleine.

Blaupausen-Regel:

- Das Finden soll nicht doppelt bestrafen.
- Eine Blaupause schaltet sofort frei oder reduziert die Herstellung deutlich.

Monetarisierung:

- Kosmetik ist der natürliche spätere Monetarisierungsraum.
- Konkrete Monetarisierung wird erst nach Spielspaß und Retention behandelt.

## Umsetzungsreihenfolge

Phase 1: Orbitpfad bauen

- Taste 3 und Lichtbahn entfernen.
- Neue Knotendaten anlegen.
- 12 bis 14 Knoten.
- Klare Symbole.
- Undo für letzten Kauf.

Abnahmekriterien:

- Baum ohne Scrollen nutzbar.
- Knoten ohne Klick verständlich.
- Kein dritter Kampfbutton.
- Keine Sackgassen.

Phase 2: Pacing abstimmen

- XP auf 14 bis 16 Punkte kalibrieren.
- Zwei Charaktere und Evolutionspfade in vollständigen Runs prüfen.

Abnahmekriterien:

- Build bis Welle 30 vollständig, aber nicht ausgeschöpft.
- Entscheidungen bleiben bis zum Ende interessant.

Phase 3: Werkstatt erweitern

- Projektstruktur ergänzen.
- Blaupausen ergänzen.
- Mechanische Begleiterstufen ergänzen.
- Kosmetik-Sinks ergänzen.

Parallel:

- Performance nur auf offensichtliche Hotspots prüfen.
- Echter Gerätevergleich folgt nach dieser neuen Version.

## Entscheidungsvorschlag

Dieses Zielbild als neue v5-Basis freigeben und anschließend Phase 1 in Code
umsetzen.

Nicht enthalten:

- Konkrete Monetarisierung.
- Finale Zahlenbalance.
- Tiefer Performancevergleich.

## Planungsfortschreibung vom 13.08.2026

Der erste schlanke Orbitpfad hat die beabsichtigte Lesbarkeit erreicht, seine
Punktökonomie ist jedoch zu sicher: 15 erwartete Punkte bezahlen exakt 15 Investitionen.
Der Spieler trifft drei A/B-Wahlen, muss danach aber auf nichts verzichten. Die neue
Fassung behält deshalb die mobile, zusammenhängende Form und verändert nur Budget und
Abhängigkeiten.

### Zielbild Orbitpfad v2

```text
                      ORBITSTART
                          |
              Klingenführung A oder B
                          |
               Machtmutation A oder B
                          |
            Partner 1–3 ---- Klingenmodul 1–2
                          |
                 Charakterhaltung A/B
                          |
       Machtmeisterschaft 1–3 ---- Machtmodul 1–2
                          |
                 Synergie + Evolution
                          |
                 Orbitresonanz 1–3
                          |
              Evolution + 14 investiert
                          |
                    Orbitkrone
```

- 19 mögliche reguläre Investitionen, 15 reguläre Punkte.
- `Startimpuls` ergänzt Punkt 16 und den zweiten Kronenrang, sodass weiterhin vier
  Vertiefungen ausgelassen werden.
- Partner, Meisterschaft und Resonanz öffnen ab Rang 1 den weiteren Weg; ihre höheren
  Ränge konkurrieren mit Klingen- und Machtmodul.
- Klingenmodul und Machtmodul besitzen je zwei kontextabhängige, mechanische Ränge.
- Die Evolution ist eine verpflichtende späte Wegmarke. Die Krone ist mit Punkt 15
  garantiert erreichbar und reagiert auf die vorherigen Entscheidungen.
- Der Wert guter Entscheidungen liegt in Buildidentität und Kampfwirkung, nicht darin,
  ob der Spieler nach rund 20 Minuten den Abschlussknoten sehen darf.

### Zielbild Endlos

```text
                    ORBITKRONE
                         |
                  ENDLOSRESONANZ
                    /         \
            KLINGENECHO     MACHTECHO
               1–3             1–3
```

- Der reguläre Build friert beim Eintritt in Endlos ein; ausgelassene Module bleiben
  Teil seiner Identität und werden nicht nachgekauft.
- Der Spieler wählt genau einen Endloskern. Klingenecho vertieft Klinge und Sweet Spot,
  Machtecho Hauptmacht und Evolution.
- Zielpacing sind Welle 31, Boss 35 und Boss 40; der dritte Rang darf nach Test auf
  Boss 45 verschoben werden.
- Nach Rang 3 entstehen weder tote Skillpunkte noch endlos stapelbare Prozentboni.
  Weitere XP sollen einen kurzen, nicht stapelbaren Echoimpuls aufladen.

### Korrigierte Reihenfolge

1. Kontextmechaniken der beiden neuen Module für alle fünf Hauptmächte festlegen.
2. Regulären Pfad, Budget, Kronenregel und Endlos-Freeze gemeinsam implementieren.
3. Endlosresonanz implementieren.
4. Vollständigen Standardlauf messen; erst danach XP und Zahlen justieren.
5. Toten Hangar-Vorraum entfernen und Bestmarken klarer darstellen.
6. Rein kosmetisches Hangarprestige später als Fragment-Senke ergänzen.
7. Rangsystem, Performance-Feinarbeit und Monetarisierung getrennt und in dieser
   Reihenfolge behandeln.

## Umsetzungsnotiz vom 13.08.2026

Orbitpfad v2 und Endlosresonanz sind umgesetzt. Das Zielbild blieb bewusst kompakt:
14 reguläre Knoten passen weiterhin in acht Reihen; nur im Endlosmodus erscheint eine
neunte Reihe mit der exklusiven Echowahl.

- Der reguläre Pfad besitzt 19 mögliche Investitionen bei maximal 15 Levelpunkten.
  `Startimpuls` bleibt ein separater Punkt 16 und kann den zweiten Kronenrang
  `Kernreserve` kaufen.
- Ein dynamischer Budgetschutz reserviert die noch fehlenden Hauptpfadschritte nur
  dann, wenn eine optionale Vertiefung sonst die Krone verdrängen würde. Eine
  vollständige Enumeration fand 2.298 gültige 15-Kauf-Builds, keine Sackgasse und
  die Krone in jedem Fall exakt als Kauf 15.
- Klingen- und Machtmodul haben für Wirbel, Schock, Bombe, Nova und Sog je zwei
  eigenständige mechanische Wirkungen. Vorhandene Treffer-, Feld-, Bomben- und
  Projektilsysteme werden wiederverwendet und mit harten Effektobergrenzen versehen.
- Am Sieg können verbleibende Punkte zuerst im Pfad verteilt werden. Nach gebauter
  Krone lässt sich ein Restpunkt ausdrücklich verwerfen; erst dann wird der reguläre
  Build eingefroren.
- Welle 31, Boss 35 und Boss 40 vergeben getrennte Echopunkte. Klingenecho oder
  Machtecho besitzt genau drei mechanische Ränge; die Gegenwahl bleibt ausgeschlossen.
- Nach Rang 3 ersetzt ein fünfsekündiger, nicht stapelbarer Echoimpuls weitere tote
  Punkte. Es entstehen weder endlose Prozentstapel noch reguläre Nachkäufe.

Die nächsten Schritte beginnen deshalb bei Messung statt weiterem Systembau: ein
vollständiger Standardlauf, anschließend beide Endloswege bis mindestens Boss 40 und
danach erst XP- sowie Wirkungsbalance. Hangarprestige, Rangsystem, Monetarisierung und
Performance-Balance blieben in diesem Arbeitsblock unverändert.

## Ergänzung vom 13.08.2026: Fokus, HUD, Aufgaben und Rückkehrgrund

**Umsetzungsstand 14.08.2026:** Die Punkte 1–5 des Zielbilds sind gebaut: Fokus ist an
Aktiv 1 gebunden und als violetter Ring sichtbar, der Cooldown besitzt einen stärkeren
Außenring, der Wiedereinstieg zählt pausiert `2`, `1`, `LOS`, und das Kampf-HUD ist
reduziert sowie mobil neu angeordnet. Die bisherigen drei Laufziele bleiben vorerst im
Pausenfenster, für Belohnung und Ergebnis aktiv; Punkt 6, der persistente Orbitauftrag, bleibt
der nächste eigene Systemblock. Fokuszahlen wurden noch nicht verändert.

### Befund am veröffentlichten Stand

- Fokus ist mechanisch wertvoll, aber kommunikativ schwach: Sweet Hits laden ungefähr
  einen 1,9-fach verstärkten Machteinsatz, doch der Zusammenhang ist weder im Einstieg
  erklärt noch im Kampf dauerhaft am Hauptmachtknopf sichtbar. Aktiv 2 kann die Ladung
  derzeit ebenfalls verbrauchen und damit die eigentlich geplante Hauptmacht-Kombo
  stehlen.
- Der Cooldown-Kreis funktioniert, ist mit seiner dunklen Restfläche aber zu unauffällig.
  Ein kurzer Bereitschaftspuls allein reicht nicht, weil der Blick des Spielers meist auf
  der Arena liegt.
- Leben, XP, Fokus und drei Aufgaben bilden links einen hohen Textblock. Gleichzeitig
  kann der feste rechte HUD-Block ihn auf schmalen Geräten stark zusammendrücken.
- Die drei Laufziele zahlen zwar Fragmente, ändern das Spielverhalten aber selten. Zwei
  Ziele sind derselbe Evolutionskauf, mehrere andere werden durch normales Weiterspielen
  automatisch erfüllt. Die permanente Anzeige ist daher größer als ihr Nutzen.

### Zielbild für den nächsten UI-Block

1. Oben links bleiben Leben/Barriere und XP/Level.
2. Fokus wandert als violett-weißer segmentierter Ring samt kleinem Wert an Aktiv 1.
   Voll geladen bleibt der Knopf sichtbar `BEREIT`; nur Aktiv 1 verbraucht die Ladung.
3. Der Cooldown nutzt einen deutlich breiteren Außenring, eine ruhige Spur und einen
   dauerhaft hellen Bereitschaftszustand. Eine Sekundenzahl ist standardmäßig nicht
   nötig.
4. Nach einer behaltenen Investition zählt der Rückweg in den Kampf zwei Sekunden
   `2`, `1`, `LOS`. Die Arena bleibt dabei eingefroren; eine bewusste Bewegung über
   Tastatur oder Joystick-Totzone überspringt den Rest sofort. Reines Anschauen,
   vollständiges Rückgängigmachen und der Rückweg zum Sieg lösen keinen Countdown aus.
5. Welle und Fragmente werden kompakter; Ton wandert in Pause/Einstellungen. Lokale
   Charakter- und Begleitereffekte ersetzen zusätzliche Statuszeilen.
6. Die drei Aufgaben werden durch einen einzigen, nicht verfallenden Orbitauftrag
   ersetzt. Er bleibt über Läufe erhalten, nutzt nur vorhandene Mechaniken, zahlt
   vorhandene Fragmente und verschwindet nach Abschluss aus dem Kampf-HUD.

### Recherchebasis für tägliche Motivation

Erfolgreiche Vorbilder nutzen tägliche Inhalte dann gut, wenn sie einen interessanten
Anlass statt Anwesenheit belohnen:

- `Slay the Spire` gibt allen Spielern im Daily Climb denselben Seed. Nach Feedback
  reduzierte das Team die Zahl der Modifikatoren von vier auf drei und richtete sie auf
  interessante Situationen statt bloßer Erschwernis aus. Das spricht für ein sehr
  kleines, verständliches Tagesthema.
  Quelle: https://store.steampowered.com/news/posts/?appids=646570&enddate=1521157929
- `Deep Rock Galactic` lässt die meisten Herausforderungen beim normalen Spielen
  entstehen und begrenzt die gleichzeitig aktiven Ziele. Nicht abgeholte Saisonkosmetik
  verschwindet später nicht, sondern kehrt in reguläre Belohnungspools zurück. Das
  bestätigt Aufgaben ohne erzwungenen Sonderlauf und ohne Verlustdruck.
  Quellen: https://www.deeprockgalactic.com/season-01 und
  https://www.deeprockgalactic.com/season01-faq
- `Vampire Survivors Adventures` remixiert bekannte Inhalte mit begrenztem Arsenal und
  eigenen Siegbedingungen, ohne Hauptspielfortschritt zu löschen. Das bestätigt einen
  freiwilligen, isolierten Herausforderungsrahmen statt täglicher Machtbelohnungen.
  Quelle: https://poncle.games/adventures-faq

Für Orbitblade folgt daraus ein zweistufiges Modell:

- **Zunächst im Kernspiel:** genau ein persistenter Orbitauftrag als Grund für den
  nächsten Lauf; kein Ablaufdatum, keine Serie, keine neue Währung.
- **Nach stabiler Balance und Seed-Technik:** ein optionales `Tagessignal` mit gemeinsamem
  Datums-Seed, festem Charakter und Hauptmacht sowie genau einem positiven Twist und
  einer Einschränkung. Persönliche Bestmarke und teilbarer Ergebniscode reichen zunächst;
  ohne Server gibt es keine behauptete globale Bestenliste. Die letzten sieben Signale
  bleiben spielbar, und verpassbare exklusive Belohnungen sind ausgeschlossen.

Login-Streaks, tägliche Truhen, mehrere Aufgaben-Tabs, Pflichtläufe und permanente
Kampfstärke aus Tagesaufgaben bleiben bewusste Ausschlüsse.

## Testnotiz vom 13.08.2026: Welle 26 und Performance

Ein Spieltest erreichte Welle 26. Das Spiel funktionierte grundsätzlich gut; besonders
der neue Orbitpfad wurde als wesentliche Verbesserung bestätigt. Gleichzeitig entstand
der klare Eindruck eines Performanceproblems in den späten Wellen.

Der Zeitpunkt ist technisch plausibel: Die konfigurierte Gesamtgegnerzahl steigt von
78 in Welle 20 auf 115 in Welle 26 und 136 in Welle 29. Zwar begrenzen DPR, Culling,
Partikelcap und deaktiviertes Leuchten bereits die Darstellung, doch die Simulation
aktualisiert alle Gegner weiter. Mehrere neue mechanische Trefferfolgen durchsuchen die
Gegnerliste zusätzlich, und Spielerprojektile prüfen ihre Kollisionen jeweils gegen alle
Gegner. Auf der Grafikseite werden einige große Hintergrundverläufe weiterhin pro Bild
erzeugt.

Vor weiteren Inhalts- oder Balanceänderungen folgt deshalb eine kurze Performancephase:

1. Welle 26 auf dem betroffenen Gerät mit `?perf=1` 60–90 Sekunden messen;
2. Durchschnitt, P95/Maximum, Update und Draw sowie alle relevanten Objektzahlen erfassen;
3. Update-bound und Draw-bound unterscheiden;
4. zuerst balance-neutrale Hotspots und unnötige Allokationen entfernen;
5. anschließend Welle 30 und beide Endloswege testen und auf Pixel 9 sowie X1 Carbon
   kalt und nach längerer Laufzeit gegenmessen.

Die Gegnerzahl wird nicht vorschnell reduziert. Sie wird erst angepasst, wenn Messung
und Spielgefühl zeigen, dass die gewünschte Massendichte selbst – nicht nur ihre
Implementierung – das Problem verursacht.
