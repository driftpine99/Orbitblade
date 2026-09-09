# Abnahme der beiden Menüaufträge – 08.09.2026

Aktueller Abschlussstand (08.09.2026): Die unten dokumentierten Nachbesserungen wurden durch den Luna-Agenten umgesetzt und anschließend unabhängig geprüft. Die ursprünglichen Befunde und Aufträge bleiben als Beleg erhalten.

Abnahme: 13 Mächte- und 19 Kampagnenprüfungen grün; Syntax und Zustandsprüfungen grün. Ein zusätzlicher echter simulierter Entdecker-Sieg mit versuchtem Stufenwechsel und Endlosfortsetzung blieb auf Entdecker, Bestmarke ausschließlich Entdecker W31. Browserprüfung bei 320 × 568 und 390 × 844: Helden-Zurück erreichbar, Kauf mit konkretem Feedback, Stufen im Siegerlauf gesperrt und nach Verlassen wieder wählbar, Rückweg zur nächsten Mission, räumliche Karte mit lesbaren Motiven und sichtbaren Details nach Planetentipp. Vollständiger Sektor zeigt eine Wiederholungsmission und keinen spielbaren Sektor II. Für Sieg/Kauf/Sektorabschluss wurden getrennte lokale Testspielstände verwendet. Kein Nachweis für Geräteperformance; nicht committed oder veröffentlicht, daher Auslieferungsprüfung weiterhin erwartungsgemäß rot.

## 1. Zurück-Knopf im Heldenmenü unerreichbar – hohe Priorität

Browser-Reproduktion bei 320 × 568: Galaxie → Held → Verbessern. Der Zurück-Knopf liegt vollständig oberhalb des sichtbaren Bereichs. Gemessen: Oberkante −56 px, Unterkante −12 px, obwohl der Scrollcontainer bereits scrollTop=0 hat. Hochscrollen hilft nicht. Über den kompakteren Ausrüsten-Tab gibt es einen Umweg, aber keinen sichtbaren normalen Rückweg.

Ursache: Das Heldenpanel erbt die vertikale Zentrierung von `.overlay`; bei mehr Inhalt als Bildschirmhöhe entsteht unerreichbarer Überlauf nach oben. Betroffen: `konzept/style.css`, insbesondere `.overlay`, `.held-panel` und die neuen `.held-eintrag`-Zeilen.

Auftrag: Für das Heldenmenü eine überlaufsichere Anordnung verwenden. Bei wenig Inhalt darf es zentriert bleiben, bei viel Inhalt muss es oben beginnen und vollständig scrollbar sein. Header und Zurück dürfen niemals außerhalb des erreichbaren Bereichs liegen. Auch Wechsel der Tabs und die nach einem Kauf eingeblendete Rückmeldung prüfen. Keine pauschale Änderung aller Overlays ohne deren Sichtprüfung.

Abnahme: 320 × 568 und 390 × 844, beide Tabs, Kaufstatus und Rückkehr aus Untermenüs; Zurück und letzter Eintrag erreichbar, kein horizontaler Überlauf.

## 2. Schwierigkeit desselben Laufs nach Sieg veränderbar – hohe Priorität

Neuer Weg: Kampagnensieg → Held → Ausrüsten → Hauptmacht → Stufe ändern → zurück zum Sieg → Endlos. `renderHilfeWahl()` schreibt unmittelbar `save.hilfe`; `hilfe()` und `hilfeId()` lesen diesen Wert auch im laufenden Spiel. `startEndlosmodus()` setzt die ursprüngliche Stufe nicht zurück.

Reproduktion mit echtem simuliertem EOS-Sieg: Welle 30 auf Entdecker, anschließend derselbe Schreibvorgang wie im Stufen-Klickhandler auf Meister und reguläre Endlosfortsetzung. Ergebnis Welle 31 auf Meister; nach Spielende Bestmarken `entdecker:30, meister:31`. Die UI-Verknüpfung wurde im Browser geprüft, der vollständige Sieg/Endlos-Fall im Harness. Für den Harness wurde ausschließlich dessen fehlendes DOM-`prepend` temporär ergänzt, keine Spielmechanik ersetzt.

Auftrag: Die Stufenwahl für einen noch fortsetzbaren Siegerlauf sperren. In der aus dem Siegergebnis geöffneten Vorbereitung aktuelle Stufe anzeigen und kurz erklären, dass die Änderung nach Verlassen des Laufs möglich ist. Nicht nur die Darstellung sperren: auch den Auswahlhandler absichern. Nach Rückkehr in Startmenü/Galaxie darf die Vorbereitung wieder normal funktionieren. Kampflogik und Schwierigkeit nicht neu balancieren.

Abnahme: Entdecker-Sieg → Vorbereitung → Endlos bleibt Entdecker und zählt ausschließlich zu dessen Bestmarken. Dasselbe für Standard/Meister. Nach tatsächlichem Verlassen des Laufs kann eine andere Stufe für den nächsten Run gewählt werden. Einen gezielten Regressionstest ergänzen; reine Funktionsprüfungen ohne diese neue Navigation genügen nicht.

## 3. Galaxie weiterhin eine Liste – gestalterische Abnahme offen

Die vier Motive sind unterscheidbarer und KOMMANDO ist eine Station. Die Darstellung bleibt aber eine senkrechte Liste gleich breiter Zeilen. Kurze Verbindungsstriche stehen zwischen den Zeilen in deren Mitte, während die Planeten links liegen. Das ergibt keine zusammenhängende Reise durch eine Galaxie. Gesperrte Welten werden zusätzlich stark entsättigt und abgedunkelt; gerade ihre neue Identität geht verloren. Die im Auftrag gewünschte versetzte Route wurde nicht gebaut.

Auftrag: Auf Basis der vorhandenen SVG-Motive eine räumliche Hochformatkarte gestalten: größere, leicht versetzt angeordnete Weltkörper; Beschriftungen an den Welten; eine durchgehende Verbindung zwischen den tatsächlichen Positionen der Weltkörper. Gleichartige Zeilenhintergründe entfernen. Sperren durch klare Symbole/Status darstellen, dabei Material und Farbe der Welten lesbar halten. Details weiterhin auf derselben Karte; auf kleinen Displays Auswahl und ihre Konsequenz durch sinnvolle Scrollführung oder einen zugänglichen Detailbereich zusammenhalten. Keine neuen Kampfmechaniken oder Sektoren.

Vor der nächsten Abnahme Screenshots der gesamten Karte für frischen und fortgeschrittenen Spielstand bei 320 und 390 Pixel Breite vorlegen. Nicht allein mit einem DOM-Snapshot abnehmen: Dieser erkennt die Listenwirkung nicht.

## 4. Kleine Verständlichkeitskorrekturen im selben Durchgang

- Ausrüsten behauptet „hier wird nichts gekauft“, führt aber direkt in die Werkstatt mit Käufen. Werkstatt als Verbesserung/Baupläne unter Verbessern zugänglich machen; Ausrüsten enthält Auswahl vorhandener Inhalte. Bestehende Funktionen und gespeicherte Käufe erhalten. Nicht noch einen Hub davor setzen.
- Die weiterhin „Hangar“ betitelten Unterseiten nach ihrem Inhalt benennen; auch die zugängliche Beschriftung „Heldenkern“ am Kartenknopf auf „Held“ vereinheitlichen.
- Fokusleiter nennt als nächste Verbesserung nur erneut „Fokus lädt schneller“. Den tatsächlichen nächsten Effekt aus der bestehenden Formel darstellen. Kaufbestätigung benennt die gekaufte Verbesserung statt pauschal „Dein Held ist stärker“.
- „Verständliche Grundgegner“ auf der Startseite ist Entwicklersprache. Eine kurze spielerbezogene Beschreibung verwenden, die den tatsächlichen Gegnern entspricht.

## Bereits geprüft und zu erhalten

- Syntaxprüfung erfolgreich; 13 Mächte- und 18 Kampagnenprüfungen grün.
- Allgemeine Prüfung: Ereignisbudget, Text- und Zustandsinvarianten grün, inklusive Save-Rettung. Auslieferung rot, weil aktive Änderungen noch nicht committed sind; kein Spielfehler.
- Im Browser: direkter EOS-Start, gesperrte KRYOS-Details ohne Startmöglichkeit, Held-Tabs, Hauptmacht-Unterseite, Werkstatt → Sammlung → zurück zum Ausrüsten-Tab → zurück zur Karte. Keine Konsolenfehler bei diesen Wegen.
- Die bestehende Suite prüft echte Kampagnensiege, Fragmentvergabe und Migration. Ergebnisbildschirme wurden nicht vollständig in einem menschlich gespielten Browserlauf geprüft. Kein Nachweis für Mobilgeräte-Performance oder Spaßbalance.

## Übergabe an Claude

Lies CLAUDE.md und diesen Bericht. Korrigiere zuerst Punkte 1 und 2, anschließend Punkte 3 und 4. Erhalte alle fremden Änderungen. Arbeite nur an der aktiven Version und gezielten Prüfungen; archive/ und beta/ nicht anfassen. Führe die bestehenden Funktionsprüfungen sowie die oben genannten mobilen Klickwege aus und zeige die Screenshots. Pflege den tatsächlichen Stand in den bestehenden Abschnitten von CLAUDE.md. Keine Veröffentlichung ohne Nutzerauftrag.
