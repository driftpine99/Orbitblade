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

