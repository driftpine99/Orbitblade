# Claude-Auftrag: Menü reduzieren, Galaxie erlebbar machen

Stand: 07.09.2026. Vorschlag nach Prüfung des aktiven Codes und der Oberfläche im mobilen Hochformat. Dieses Dokument ist ein Umbauauftrag zur Übergabe; die Änderungen sind noch nicht umgesetzt. Vor Beginn CLAUDE.md lesen. Beschlossene Änderungen dort in den passenden bestehenden Abschnitten nachführen.

## Befund und Entscheidung

Die reduzierte Startseite bleibt die Grundlage. Der aktuelle Weg führt von „Spielen“ über die Galaxie zu einer weiteren Textseite und erst dann in den Kampf. Diese zusätzliche Seite enthält kaum eine Entscheidung. Auf der Karte wirken die Welten wie gleichartige Auswahlknöpfe. Im schmalen Hochformat bricht KOMMANDO in eine separate Zeile um; die Route verliert ihren Zusammenhang.

Zusätzlich verteilen Held, Heldenkern, Hangar, Werkstatt und Sammlung zusammengehörige Entscheidungen auf mehrere Einstiege. Nach einem Sieg konkurrieren Heldenverbesserung und Endlosspiel als hervorgehobene Aktionen, obwohl die Kampagne zur nächsten Welt führen soll.

Entscheidung: Ein direkter Einstieg in die nächste Mission, eine echte Galaxieroute zur bewussten Auswahl und ein gemeinsamer Zugang zu dauerhaften Verbesserungen. Die Kampagne bleibt der Rahmen normaler Läufe. Keine zusätzliche Dashboard-Startseite und keine neue Sammlung von Kacheln.

## Auftrag 1 – Startseite und Galaxiekarte

### Startseite

- Bestehende reduzierte Typografie, freie Flächen und visuelle Hierarchie erhalten. Keine weiteren großen Menükarten ergänzen.
- Eine dominante Aktion startet die empfohlene erreichbare Kampagnenmission direkt. Beschriftung beispielsweise „EOS befreien“ oder „Weiter nach KRYOS“. Weltname, ihre prägende Eigenschaft und gewählte Hauptmacht stehen kompakt beim Einstieg.
- Empfehlung ist die erste noch nicht befreite, erreichbare Welt der bestehenden Reihenfolge. Nach vollständigem Sektorabschluss eine tatsächlich spielbare Wiederholungsmission anbieten und ausdrücklich als Wiederholung kennzeichnen. Niemals eine gesperrte Welt starten oder neue Freischaltungen erfinden.
- „Galaxie“ bleibt ein gut sichtbarer, untergeordneter Zugang für Auswahl und Wiederholung. „Held“ bildet den weiteren Hauptzugang. Tageslauf, Sammlung und Einstellungen ordnen sich darunter ein; bestehende Freischaltbedingungen erhalten.
- Direkter Start muss dieselbe vorhandene Startlogik wie die bewusste Planetenauswahl nutzen: korrekter Kampagnenkontext, Hauptmacht, Boni, Belohnungen und Erreichbarkeitsprüfung. Keine zweite Run-Initialisierung bauen.

### Galaxie

- Die umbrechende Reihe durch eine zusammenhängende Route im Hochformat ersetzen: vertikal, leicht versetzt angeordnete Welten und durchgehende Verbindungen. Keine Verzweigungen zeichnen, die das Spiel nicht anbietet.
- Jede Welt erhält eine eigene erkennbare Formensprache: EOS als bewohnte blaugrüne Welt; KRYOS mit industriellen Platten und Werftstruktur; VEGA mit violetten Sturmstreifen und orbitalen Zielanlagen; KOMMANDO als künstliche Kommandostation statt als weitere gefärbte Kugel. Diese Motive sind grafische Identität, keine Ankündigung neuer Kampfmechaniken.
- An bestehende Grafik und Farbpalette anschließen. Mit SVG, CSS oder Canvas innerhalb des vorhandenen Projekts arbeiten; keine neuen Laufzeitbibliotheken oder externen Asset-Abhängigkeiten. Silhouette und Materialkontrast haben Vorrang vor Glow und Partikelmenge.
- Besetzt, erreichbar, gesperrt und befreit durch Form/Symbol plus kurze Beschriftung unterscheiden. Gesperrte Welten sollen ihre Identität behalten. Nur die ausgewählte oder nächste erreichbare Welt dezent animieren; reduzierte Bewegung berücksichtigen.
- Antippen zeigt die Missionsdetails direkt auf der Karte in einem unteren Bereich. Die separate Vollbild-Textseite entfällt aus diesem Ablauf. Inhalt: Weltname, tatsächliche taktische Besonderheit, Fortschritts-/Belohnungsstatus und ein Startknopf. Bei Sperre stattdessen die konkrete Voraussetzung zeigen.
- Nach einer Befreiung die Karte sichtbar ändern: Besatzungsmarkierung verschwindet, Verbindung wird frei, nächste erreichbare Welt erhält Fokus. Darstellung ausschließlich aus gespeichertem Fortschritt ableiten. Animation darf Navigation nicht blockieren.
- Sektor II vor seiner tatsächlichen Spielbarkeit nur als zurückhaltenden Ausblick zeigen. Kein dominanter gesperrter Kasten und keine Behauptung, er sei bereits spielbar.
- Route, Labels und Detailbereich müssen auf schmalen und größeren Bildschirmen zusammenpassen. Kein abgeschnittener Startknopf, keine horizontale Scrollpflicht und keine vom Planeten getrennte Verbindung.

### Abnahme

Frischer Spielstand: Eine Aktion von der Startseite führt in EOS. Fortgeschrittener Stand: korrekte nächste Welt und funktionierende Wiederholung über die Karte. Vollständig befreiter Sektor: ehrlicher Wiederholungseinstieg. Die vier Welten sind auch ohne ihre Namen unterscheidbar. Screenshots bei schmalem Hochformat und breiterem Fenster prüfen und vorlegen. Nach Auftrag 1 zur visuellen Prüfung stoppen.

## Auftrag 2 – Held, Ergebnisse und Verständlichkeit

Erst nach Abnahme von Auftrag 1 umsetzen.

- „Held“ als gemeinsamen Einstieg für dauerhafte Verbesserung und Ausrüstung verwenden. Bestehende Systeme dahinter zugänglich halten, beispielsweise unter „Verbessern“ und „Ausrüsten“. Keinen zusätzlichen Hub vor die bisherigen Menüs setzen. Navigation und Begriffe zusammenführen; vorhandene Kauf-, Auswahl- und Speicherfunktionen wiederverwenden.
- Die vier Heldenverbesserungen als kompakte, unterscheidbare Einträge darstellen. Je Eintrag: verständliche Wirkung, vorhandener Rang, konkrete nächste Veränderung und Preis. Keine vier großen gleichartigen Erklärungskarten. Käufe bleiben ausdrücklich ausgelöst; kein automatisches Ausgeben.
- Auswahl von Hauptmacht und vorhandener Ausrüstung klar von Käufen trennen. Bestehende Werkstatt- und Sammlungsinhalte erreichbar lassen. Keine neue Währung, keine zusätzlichen Upgrade-Reihen und keine Änderung von Preisen oder Wirkungswerten.
- Nach Kampagnensieg eine klare Hauptaktion zur nächsten erreichbaren Mission anbieten; zunächst ihre Auswahl/Details öffnen, damit der Spieler vor dem nächsten Kampf noch verbessern kann. Wenn keine neue Welt spielbar ist, „Zur Galaxie“ verwenden. „Held verbessern“ bleibt ein sichtbarer Nebenzugang, Endlos ein untergeordneter Zugang. Keine gleichrangigen großen Hauptaktionen.
- Nach Niederlage „Erneut versuchen“ hervorheben, daneben den Zugang zu bezahlbaren Verbesserungen. Keine Pflichtkäufe oder erzwungenen Umwege. Fortschritt und erhaltene Fragmente knapp und nachvollziehbar zeigen; Belohnung niemals erneut beim Öffnen eines Menüs vergeben.
- Den irreführenden Sektorabschluss-Text korrigieren: Ein gesicherter Warp-Kern bedeutet noch keinen spielbaren Sektor II.
- Die veralteten Spielstandsprüfungen in tools/pruefe.js an den aktuellen Speichervertrag anpassen. Eine alte Version darf nicht als Erwartung für neu gespeicherte Daten festgeschrieben bleiben. Migration alter Spielstände und Schutz vor unbekannten zukünftigen Versionen weiter prüfen; Tests nicht einfach abschalten.

## Grenzen und gemeinsame Prüfung

Nur die aktive Version in konzept/ bearbeiten. archive/ und konzept/beta/ bleiben unberührt. Fremde Änderungen erhalten. Keine neuen Frameworks und kein pauschales Refactoring von game.js. Kampfsteuerung, Mächte, Gegnerwerte, Fragmentökonomie, Freischaltregeln und vorhandene Käufe nicht ändern. Keine Commits oder Pushes ohne ausdrücklichen Auftrag.

Betroffene Oberflächenzustände im Browser durchspielen: Start, Karte, gesperrte Welt, Missionsstart, Niederlage, Sieg, Held, Kauf, Zurück, Neuladen. Es darf kein unsichtbares Overlay Eingaben abfangen. Fokus, Touch-Ziele, Beschriftungen und bestehende Overlay-Sperren erhalten. Vorhandene Spielstände müssen Fragmente, Käufe und Kampagnenfortschritt behalten.

Syntaxprüfung sowie tools/pruefe_maechte.js, tools/pruefe_kampagne.js und tools/pruefe.js ausführen. Ein Prüfpunkt, der ausdrücklich einen veröffentlichten Stand verlangt, kann vor Commit/Push offen bleiben; das getrennt von echten Spielfehlern berichten. Keine umfangreichen Balance-Simulationen für reine Oberflächenänderungen. Ergebnis knapp berichten: Änderungen, echte Prüfergebnisse, offene Punkte und Screenshots.

## Separater späterer Auftrag – Welten spielerisch unterscheiden

Noch nicht Bestandteil der beiden UI-Aufträge: Die aktuellen Welten variieren vor allem Gegnerzusammensetzung; KOMMANDO nutzt weiterhin die normale Bossfolge. Die Karte darf keine eigenständigen Begegnungen vortäuschen.

Nächste inhaltliche Priorität ist ein eigener, klar angekündigter Kommandantenkampf für den Sektorabschluss. Zuerst ein unterscheidbares Angriffsmuster und seine Antwort durch Positionierung definieren, dann umsetzen und messen. Keine neue Spielertaste und keine bloße Erhöhung von Lebenspunkten. Weitere Planeten und Upgrade-Systeme erst danach erweitern. Dieser Inhalt braucht einen eigenen Nutzerauftrag.
