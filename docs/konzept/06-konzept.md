# Phase 6 – Rückruf: das ausgearbeitete Konzept

> [FAKT] Überholter Entwurf: Der Entwickler hat die gebaute Rückruf-Beta anschließend als schlechter als das bisherige Spiel verworfen. Die Empfehlung wurde zurückgezogen. Die aktuelle Richtung erhält das Orbitspiel und vertieft seine Mächte und Langzeitfaktoren. Der folgende Text dokumentiert den früheren Entwurf.

## Entscheidung und Geltungsbereich

[FAKT] Am Checkpoint wurde **Rückruf** gewählt. Der Entwickler fragte ausdrücklich nach dem Stellenwert der Mächte. Ihre grundlegende Neugestaltung gehört deshalb ebenso zum Konzept wie der neue Grundangriff.

[URTEIL] Rückruf ist nicht der einzige denkbare Weg und auch nicht die einzige relevante Änderung innerhalb dieses Wegs. Das Spiel bekommt drei zusammenhängende Veränderungen: eine bewusst geführte Waffe, Mächte mit unterschiedlichen Anwendungen und Gegner, die diese Anwendungen unter wechselnden Bedingungen prüfen. Der Rückruf allein wäre eine Mechanik, noch kein vollständiges Spiel.

[URTEIL] Die folgenden Regeln sind ein zusammenhängender Entwurf, keine Beschreibung bereits gebauter Funktionen. Die Zeitangaben beschreiben Dramaturgie und die verlangte Player Journey; sie sind keine gemessenen Laufzeiten oder Balancewerte. Aussagen über erwarteten Spaß und Langzeitwirkung bleiben als Annahmen gekennzeichnet.

## a) Der Pitch

[URTEIL] **Rückruf ist ein mobiles Action-Roguelite, in dem du deine schützende Lichtklinge fortwirfst und durch deine Bewegung ihren tödlichen Rückweg bestimmst. Mit gefundenen Mächten veränderst du Gegner, Wege und Angriffe, bis aus einer scheinbar verlorenen Stellung ein selbst vorbereiteter Befreiungsschlag wird.**

## b) Die drei Design-Pillars

| Pillar | Ein Satz | Entscheidungstest für neue Features |
|---|---|---|
| Eigene Ursache, sichtbare Folge | [URTEIL] Der entscheidende Erfolg entsteht aus einer Handlung, deren räumliche Folge der Spieler erkennen und absichtlich wiederholen kann. | [URTEIL] Kann man auf dem Bildschirm zeigen, was der Spieler vorbereitet hat und weshalb genau das wirkte? Wenn nicht, entfällt das Feature. |
| Andere Macht, anderer Plan | [URTEIL] Ein anderer Build verändert den erwünschten Gegnerzustand, Laufweg oder Einsatzmoment. | [URTEIL] Welche bisher vernünftige Handlung wird mit diesem Feature weniger passend, welche andere wird lohnend? Gibt es darauf keine konkrete Antwort, ist es Füllmaterial. |
| Wenige Eingaben, vollständige Sitzung | [URTEIL] Bewegung und ein kontextueller Knopf müssen vom ersten Erfolg bis zum Runfinale ausreichen. | [URTEIL] Bleiben Grundhandlung und Abschluss ohne zusätzliche Tastenkombination, Pflichtlektüre oder Fortsetzungszwang erreichbar? Wenn nicht, entfällt das Feature. |

## c) Kernschleife und verbindliche Spielregeln

### Die drei Zeitebenen

| Ebene | Ablauf | Entscheidung |
|---|---|---|
| Sekunde | [URTEIL] Gegnerabsicht lesen → Klinge auswerfen → während ihrer Abwesenheit eine Stellung herstellen → Rückruf auslösen → den gelungenen Fang für die nächste Position nutzen. | [URTEIL] Jetzt einen brauchbaren Angriff und den Schutz zurücknehmen oder länger ohne Klinge eine bessere Gelegenheit herstellen? |
| Run | [URTEIL] Mit einer Startmacht eine Anwendung finden → weitere Mächte und eine Route wählen → auf eine Gegenrolle reagieren → eine Fusion annehmen oder den flexibleren bisherigen Aufbau behalten → das Finale bewältigen. | [URTEIL] Welche Anwendung baue ich aus, welche Schwäche nehme ich dafür in Kauf und gegen welche sichtbare Herausforderung will ich antreten? |
| Meta | [URTEIL] Eine neue Wirkung oder Gegnerbeziehung entdecken → sie in der Sammlung gefahrlos verstehen → mit einer anderen Ausgangslage oder Regel zurückkehren. | [URTEIL] Will ich etwas Unbekanntes kennenlernen oder eine bekannte Stellung besser lösen? |

### Was die Daumen tun

[URTEIL] Der Bewegungsdaumen bedient eine analoge Bewegungsfläche, der andere einen großen Knopf. Die Bedienelemente liegen unterhalb des eigentlichen Kampffeldes und können für die bevorzugte Hand gespiegelt werden. Es gibt keinen zusätzlichen Angriffsknopf, kein manuelles Fangen und kein Halten zum Aufladen.

| Zustand | Bewegung | Knopf | Sichtbare Information |
|---|---|---|---|
| Klinge zu Hause | [URTEIL] Frei laufen; im Stillstand bleibt die letzte absichtliche Bewegungsrichtung erhalten. | [URTEIL] Wirft in die angezeigte Richtung. | [URTEIL] Ein kurzer Wurfpfeil zeigt genau diese Richtung; beim Erststart zeigt er nach oben. |
| Klinge im Hinflug | [URTEIL] Weiterlaufen verändert ihre Richtung nicht. | [URTEIL] Kann den Rückruf schon jetzt auslösen. | [URTEIL] Klinge und mögliche Rückfluglinie bleiben sichtbar. |
| Klinge geparkt | [URTEIL] Den künftigen Endpunkt des Angriffs erlaufen, Gegner führen oder eine Machtgelegenheit nutzen. | [URTEIL] Legt den Rückflug fest. | [URTEIL] Eine ruhige Linie verbindet die Klinge mit dem aktuellen Standort. Machtflächen haben eigene erkennbare Formen. |
| Rückflug läuft | [URTEIL] Frei ausweichen. Der Angriff wird dadurch nicht nachgelenkt. | [URTEIL] Ist sichtbar belegt; Eingaben werden nicht für später gespeichert. | [URTEIL] Der bei Auslösung festgelegte Endpunkt und die Angriffslinie bleiben stehen. |
| Angriff am Endpunkt angekommen | [URTEIL] Bewegung bleibt frei. | [URTEIL] Wird nach der Rückkehr wieder zum Wurfknopf. | [URTEIL] Die Klinge dockt als harmloser Lichttransfer unmittelbar am tatsächlichen Spieler an. |

[URTEIL] **Der Fangpunkt ist das Ende des Angriffs, keine Fangaufgabe.** Der Rückflug endet am Spielerstandort zum Zeitpunkt des Knopfdrucks. Wer währenddessen ausweicht, verliert weder die Waffe noch muss er ihr hinterherlaufen. Der anschließende Lichttransfer verursacht keinen Schaden, löst keine Macht aus und verlängert die Angriffslinie nicht. So bleiben die sichtbare Planung und das freie Ausweichen miteinander vereinbar.

[URTEIL] Der Hinflug durchquert Gegner bis zu seiner sichtbaren Endlage; dort bleibt die Klinge stehen. Hinflug und Rückflug können verletzen, aber bloßes Parken erzeugt keinen Grundschaden. Gegen schwache offene Gegner darf ein kurzer Wurf genügen. Der Rückflug ist wertvoll, weil er eine andere Seite, mehrere Ziele oder ein vorbereitetes Zeitfenster erreichen kann, nicht weil eine unsichtbare Uhr seinen Schaden steigert.

### Schutz, Verletzung und Verlust

[URTEIL] Zu Hause hält die Klinge eine sichtbare Schutzladung bereit. Sie fängt einen gewöhnlichen Körpertreffer oder ein gewöhnliches Geschoss ab und ist danach verbraucht. Bodenflächen und große angekündigte Raumangriffe durchdringen diesen Schutz. Außerhalb des Körpers schützt die Klinge den Spieler nicht; ihre Aufgabe ist dann Angriff oder Machtvorbereitung.

[URTEIL] Ein direkter, verletzender Rückflugtreffer der Hauptklinge stellt die Schutzladung für die Heimkehr wieder her. Blockierte Treffer, bloße Berührung, Hilfsangriffe und leere Würfe tun das nicht. Schutz stapelt sich nicht. Der erste Run beginnt mit bereitstehendem Schutz, damit sein Grundzustand verständlich ist.

[URTEIL] Eine noch unbenutzte Schutzladung bleibt beim Auswerfen gespeichert, ist außerhalb des Körpers aber inaktiv. Bei einem leeren Rückflug kann deshalb nur diese bereits vorhandene Ladung wieder bereitstehen; eine zuvor verbrauchte Ladung bleibt leer. Auswerfen selbst kostet kein Leben und verbraucht keinen noch ungenutzten Schutz.

[URTEIL] Schaden leert die sichtbare Lebensleiste. Bei Niederlage endet der Run; bereits entdeckte Inhalte bleiben bekannt. Es gibt kein Wiederkaufen des Lebens und keine Pflicht, zuvor gesammelte dauerhafte Währung in stärkere Startwerte zu investieren. Zwischen Begegnungen kann eine angebotene Erholung anstelle einer Buildveränderung gewählt werden; größere Etappenabschlüsse geben zusätzlich eine klar inszenierte Entlastung durch Heilung.

[BEOBACHTUNG · Steelman] Ein wiederholter kurzer Rückruf kann sich zunächst zu Recht gut anfühlen: Er verbindet Angriff und Verteidigung ohne zusätzliche Eingabe. Das darf kein verbotener Anfängerfehler werden.

[URTEIL] Seine Grenze entsteht durch Gegnerverhalten: Eine geschlossene Schutzseite blockiert die Linie; eine Bodenwarnung macht den bisherigen Standort unsicher; ein versetzter Schütze verlangt einen anderen Wurf. Keine künstliche Mindestparkzeit erzwingt das gewünschte Verhalten. Ebenso wenig produziert endloses Parken neue Ladungen, weitere Begleiterangriffe oder wachsenden Schaden.

### Arena und Gegner als Teil des Kerns

[URTEIL] Kämpfe finden in kompakten, vollständig einsehbaren Arenen statt. Spieler, Klinge und Rückflug bleiben gleichzeitig sichtbar. Es gibt keine versteckten Angriffe außerhalb des Bildschirms. Zwischen Kämpfen verbinden kurze Übergänge die Schauplätze; während eines Manövers scrollt keine neue Gefahr ins Bild.

[URTEIL] Deckungen blockieren Körper und gewöhnliche gegnerische Geschosse. Die eigene Lichtklinge durchdringt sie; ihre Vorschau zeigt das offen. Diese Regel gilt durchgehend. Bewegliche Deckungen kündigen ihre neue Stellung an und schließen keinen Körper ohne Ausweg ein. Vom Spieler geschaffene Kristallwände sind an ihrer Form und Durchlässigkeit davon unterscheidbar.

| Gegnerrolle | Sichtbare Absicht und Verhalten | Was sie vom Rückruf verlangt | Jede Startausrüstung besitzt eine Antwort |
|---|---|---|---|
| Verfolger | [URTEIL] Läuft auf den Spieler zu; fest begonnene Angriffe werden nicht beliebig korrigiert. | [URTEIL] Eine Gruppe in eine gemeinsame Rückfluglinie führen. | [URTEIL] Ausweichen, auswerfen, seitlich versetzen. |
| Schildträger | [URTEIL] Zeigt eine gepanzerte Vorderseite; nach seinem eigenen Angriff liegt eine offene Seite frei. | [URTEIL] Die Klinge hinter der Deckung platzieren und aus passendem Winkel zurückrufen. | [URTEIL] Das offene Fenster genügt auch ohne Durchschlagsmacht. |
| Jäger | [URTEIL] Lädt eine sichtbare Schussbahn, feuert und wechselt anschließend seine Stellung. | [URTEIL] Den Zeitpunkt treffen, bevor die geplante Linie veraltet, oder seine Bahn für eine Macht nutzen. | [URTEIL] Seitlich verlassen und die Erholung anlaufen. |
| Rammer | [URTEIL] Legt seine Anlaufbahn sichtbar fest, stößt dann vor und bleibt am Ende kurz gebunden. | [URTEIL] Klinge und eigenen Laufweg so trennen, dass der Gegner am Ende in die Rückbahn gerät. | [URTEIL] Seitlich aus der Warnbahn gehen. |
| Brütender Wächter | [URTEIL] Verbindet seinen Schutz sichtbar mit äußeren Brutknoten. Ein Angriff kann die Verbindung vorübergehend freilegen. | [URTEIL] Zwischen direktem Zugriff und dem Aufbrechen einer Verbindung entscheiden. | [URTEIL] Knoten oder offenes Angriffsfenster mit der Grundklinge erreichen. |
| Flächenhüter | [URTEIL] Sperrt vorübergehend markierte Standorte, ohne alle begehbaren Ausweichflächen gleichzeitig zu schließen. | [URTEIL] Einen ergiebigen Fangpunkt wählen, der nicht unmittelbar zur Falle wird. | [URTEIL] Die angekündigte Fläche rechtzeitig verlassen; der harmlose Lichttransfer erlaubt das auch nach dem Rückruf. |

[URTEIL] Ein gewöhnlicher Gegner kann von Mächten kontrolliert werden. Ein gerade verankerter großer Gegner zeigt seine Unbeweglichkeit vor dem Einsatz; Zug löst dann einen sichtbar angreifbaren äußeren Teil oder eine Verbindung statt den ganzen Körper zu versetzen. Diese Reaktion ist Teil seiner lesbaren Form. Kein Gegner ist nur mit einer bestimmten Karte besiegbar.

[URTEIL] Jede Begegnung hat ein endliches Aufgebot sichtbarer Bedrohungen. Sie endet mit deren Überwindung; die Belohnung gehört dem Begegnungsabschluss, nicht dem Farmen ständig neu erzeugter Gegner. Beschworene Verstärkung liefert keine zusätzliche Freischaltungsressource. Die Arena ist klein genug, dass ihr Schluss kein Suchen nach einem entfernten Nachzügler wird.

### Runaufbau, Auswahl und Ende

[URTEIL] Der Run führt durch **Ankunft, Bruch und Finale**. Ankunft lehrt seine Ausgangskonstellation, Bruch konfrontiert den bisher erfolgreichen Plan mit einer bereits angekündigten Gegenrolle, Finale kombiniert bekannte Anforderungen. Der Endgegner erhält eine eigene Form und einen eigenen Ablauf; er ist keine bloß stärkere Wiederholung eines Zwischengegners.

[URTEIL] Vor einer Weggabelung zeigen begehbare Vorschauen die nächsten Gegnerrollen und die Art der Belohnung: neue Macht, Veränderung einer getragenen Macht oder Erholung. Der Spieler wählt über die Richtung des Weitergehens. Eine dauerhafte Weltkarte mit weiteren Menüs ist nicht nötig. Jede angebotene Route bleibt mit der Grundklinge lösbar.

[URTEIL] Auslese findet zwischen Kämpfen statt. Normale Angebote zeigen drei verständliche Möglichkeiten aus dem für diesen Run angekündigten Fundus. Eine Vorschau spielt die entscheidende Anwendung als kurze, wiederholbare Szene ab. Ein voller Aufbau erlaubt Ersetzen oder eine angebotene qualitative Mutation; Ablehnen bleibt möglich und gibt die ausdrücklich gezeigte Erholung. Es gibt keine bezahlten Rerolls und keine Prozentkarte als Ersatz für fehlende Ideen.

[URTEIL] Ein vollständiger Build hat drei Machtplätze. Eine Fusion belegt die Plätze ihrer beiden Zutaten; daneben bleibt eine weitere Macht. Es ist höchstens eine Fusion aktiv. Das verhindert, dass Fusionen die Zahl gleichzeitig zu lesender Systeme immer weiter erhöhen. Der Grundrückruf und sein Schutz benötigen keinen Machtplatz und können nicht versehentlich abgewählt werden.

[URTEIL] Der reguläre Run endet mit dem Finale und einem vollständigen Ergebnis. Die Hauptauswahl bietet eine kurze und eine längere Reise innerhalb des gewünschten Sitzungsrahmens. Die Kurzreise verdichtet die Begegnungen und Entscheidungen, erhält aber ersten Build, Gegenprobe und Finale; sie endet nicht einfach mitten im Aufbau. Beide lassen sich jederzeit pausieren und später am selben Zustand fortsetzen.

[URTEIL] Nach dem Sieg ist eine zusätzliche, abgeschlossene Expedition freiwillig. Vor ihrem Beginn sind die neue Begegnungsregel und das nächste Ende sichtbar. Der fertige Build bleibt für diese Zusatzexpedition bestehen; es gibt dort keine fortlaufende neue Machtleiter. Das bereits abgeschlossene Ergebnis bleibt gesichert. Weitere Expeditionen sind optional, bis die vorhandenen sinnvollen Regelkombinationen erschöpft sind; darüber hinaus verspricht das Spiel keine künstlich verlängerte Langzeitprogression.

## d) Die Spannungskurve eines Runs

[ANNAHME] Die Tabelle beschreibt eine längere Reise innerhalb des gewünschten Rahmens. Ihre Abschnitte sind dramaturgische Ziele. Die Kurzreise führt dieselben Wendepunkte in weniger Begegnungen durch; tatsächliche Zeit hängt vom Spieler und der gewählten Hilfe ab.

| Runphase | Gegnerdruck | Spielerpower | Vorgesehener Emotionszustand | Neu in diesem Abschnitt; heutiges Monotonierisiko |
|---|---|---|---|---|
| Erste Minute | [URTEIL] Einzelne klar lesbare Annäherungen, Platz zum Ausweichen. | [URTEIL] Grundrückruf, Schutz und eine einfach demonstrierte Startmacht. | [ANNAHME] „Ich habe verstanden, weshalb das getroffen hat.“ | [URTEIL] Erst eine offensichtliche Rückfluggelegenheit, dann eine, bei der seitliche Bewegung hilft. Kein Mehrsystem-Tutorial auf einmal. |
| Minute 1–3 | [URTEIL] Bekannte Rolle plus ein anderer Winkel oder eine Deckung. | [URTEIL] Der Spieler ergänzt den ersten Machtplatz und erprobt eine Anwendung. | [ANNAHME] Neugier und erste Absicht. | [URTEIL] Ein Pick verlangt sofort eine sichtbar andere Handlung. Das heutige Risiko „neuer Effekt, unverändertes Kreisen“ wird hier angegriffen. |
| Minute 3–5 | [URTEIL] Ein Zwischengegner bindet Aufmerksamkeit an Angriff und sicheren Standort. | [URTEIL] Der Aufbau erhält seine fehlende Funktion oder spezialisiert sich. | [ANNAHME] „Mein Plan funktioniert, aber ich muss ihn ausführen.“ | [URTEIL] Erste Route mit sichtbar anderer Gegnerkombination. Ein eigener Entschluss prägt die nächste Prüfung. |
| Minute 5–8: Bruch | [URTEIL] Eine angekündigte Gegenrolle macht die zuletzt bequeme Position unbrauchbar. | [URTEIL] Bekannte Werkzeuge, eine angebotene qualitative Mutation. | [ANNAHME] Verunsicherung, dann bewusste Anpassung. | [URTEIL] Kein bloßer Dichteanstieg. Das heutige Risiko „die gleichen Rollen mit mehr Ausdauer“ wird durch eine andere räumliche Beziehung ersetzt. |
| Minute 8–11 | [URTEIL] Gemischte Bedrohungen mit klar getrennten Warnphasen. | [URTEIL] Eine mögliche Fusion erzeugt eine neue Anwendung; ein nicht fusionierter Build bleibt gültig. | [ANNAHME] Entdeckung und erneutes Können. | [URTEIL] Zunächst eine lesbare Gelegenheit für die neue Form, anschließend ihre Schwäche. Der Run verschenkt keine universelle Super-Macht. |
| Minute 11–15: Finale | [URTEIL] Der Endgegner kombiniert bekannte Schutzseiten, Laufwegfragen und Angriffsfenster. | [URTEIL] Vollständiger, begrenzter Build; keine letzte unerklärte Regel. | [ANNAHME] Konzentration, selbst verursachter Höhepunkt, Abschluss. | [URTEIL] Der Endgegner verschiebt im Phasenwechsel seine Anordnung. Der gelernte Rückruf muss unter neuen Winkeln gelingen, statt nur länger Schaden zu liefern. |
| Nach dem Finale | [URTEIL] Der Kampf ist beendet. | [URTEIL] Das Ergebnis ist vollständig. | [ANNAHME] Zufriedenheit oder ein konkreter Wunsch nach einem anderen Versuch. | [URTEIL] Freiwillige Zusatzexpedition oder Ende. Keine verborgene Pflicht, den fertigen Run noch länger auszuhalten. |

[URTEIL] Der Endgegner heißt im Entwurf **der Lichtbrecher**. Seine äußeren Schilde drehen sich während deutlich gezeigter Vorbereitung; sein Kern wird beim eigenen Angriff offen. Zuerst hilft eine Klinge hinter seiner Schutzseite, später verschiebt er diese Schilde und legt eine Bodenwarnung auf die bisher sichere Seite. Der Spieler kann seine bereits vorbereitete Rückbahn früh nutzen, sie durch Bewegung verbessern oder abbrechen und neu werfen. Kein bestimmtes Rezept ersetzt diese Aufgabe.

## e) Das Mächte-System

### Mächte sind eine zweite tragende Ebene

[BEOBACHTUNG · Steelman] Schon der heutige Katalog besitzt unterschiedliche Trigger und räumliche Formen. Ihn pauschal durch Wurf-Schadensboni zu ersetzen, wäre eine Verarmung. Automatische Reaktionen können außerdem eine absichtlich hergestellte Situation lesbar belohnen.

[URTEIL] Deshalb sind Mächte **weder unangetasteter Zusatz noch lauter Varianten von „beim Rückruf explodiert etwas“**. Sie verändern Gegnerabsicht, Gelände, Zeitfenster, fremde Geschosse, eigene Fortbewegung, Heilzugang und das Führen eines weiteren Akteurs. Der Rückruf ist die gemeinsame Eingabesprache; nicht jede Macht muss auf seiner geraden Linie Schaden machen. Manche arbeiten bereits bei der Vorbereitung, andere schaffen eine lohnende Aufgabe neben dem unmittelbaren Angriff.

| Differenzierungsachse | Heutige Nutzung | Entscheidung im neuen System |
|---|---|---|
| Delivery | [FAKT] Orbit, Bereichswelle, Sprengsatz, automatisch zielender Einschlag und kreisende Zusatzkörper. | [URTEIL] Jede Delivery bekommt einen anderen räumlichen Ursprung und Zweck: Hindernis am Parkpunkt, eigene Laufspur, mitgenommene fremde Munition oder örtliche Heilressource. |
| Timing | [FAKT] Cooldown, wiederholte Treffer, Umläufe und erlittene Angriffe. | [URTEIL] Vorbereiten, ein fremdes Angriffsfenster zulassen, den Zustand festhalten oder die Vorbereitung abbrechen. Bloß verstrichene Zeit erzeugt keinen endlosen Ertrag. |
| Reichweite | [FAKT] Unterschiedliche Radien und automatische Zielbereiche. | [URTEIL] Reichweite entscheidet über erreichbare Orte und Verbindungen, nicht nur über mehr Treffer. Ein Tor verkürzt einen Laufweg; eine Wand verändert ihn. |
| Zielwahl | [FAKT] Teilweise durch Klingenposition, teilweise automatisch durch Nähe oder Gruppendichte. | [URTEIL] Wurfrichtung, erster getroffener Gegner und Parkpunkt werden zu sichtbaren Auswahlhandlungen. Eine automatische Folge greift nur auf die so vorbereitete Auswahl zu. |
| Risiko | [FAKT] Kontaktgefahr, Lebensverzicht, verwundungsabhängige Stärke. | [URTEIL] Das Risiko kann im aufgegebenen Schutz, einer erlaubten Gegnerattacke, einem Rückweg oder einer gefährlich gelegenen Heilung liegen. Nicht jede Karte bezahlt mit Leben. |
| Ressource | [FAKT] Leben, Fokus, Cooldowns und Reroll-Fragmente. | [URTEIL] Verwendet werden konkrete Dinge im Kampf: gefangene Geschosse, ein reifer Keim, ein offenes Tor oder eine Herzfrucht. Sie erscheinen am Ort ihrer Wirkung und brauchen keine zusätzliche Währungsleiste. |
| Positionierung | [FAKT] Abstand zur eigenen Figur und Anordnung von Gegnern. | [URTEIL] Zusätzlich zählen Abwurfort, Parkpunkt, die eigene gelaufene Kurve und der spätere Fangpunkt. Jede Macht muss klar zeigen, welche dieser Positionen sie verwendet. |
| Geforderte Spielerhandlung | [FAKT] Meist bewegen, treffen und denselben Machtknopf auslösen; Fernzündung ist eine besondere Timinghandlung. | [URTEIL] Ködern, einen Durchgang bauen, Schüsse auffangen, einen Angriff provozieren, einen Umweg zeichnen oder eine Heilung bergen werden unterscheidbare Aufgaben. |

### Aufnahmeprüfung und Alleinstellung

[URTEIL] Eine Macht wird nur aufgenommen, wenn sich dieser Satz ohne Vergleich von Zahlen vervollständigen lässt: **„Mit dieser Macht will ich jetzt ___ tun; ohne sie wäre genau dieses Vorgehen weniger passend, weil ___.“** Eine andere Farbe, Zielzahl oder Auslösehäufigkeit genügt nicht.

[URTEIL] Jede Macht beansprucht eine ausschließliche Kernfunktion im Katalog. Zwei Kräfte dürfen elektrisch aussehen, aber nicht dieselbe Ressource auf dieselbe Weise gegen dieselben Ziele verwenden. Kann eine neue Idee nur „dieselbe Funktion, aber häufiger“ sagen, wird sie als Entwicklung der vorhandenen Macht behandelt oder gestrichen.

[URTEIL] Eine aufgenommene Macht muss auch ohne Fusionspartner eine verständliche Verwendung haben. Defensive Wirkung wird an der ermöglichten Handlung beurteilt, nicht an ihrer Schadensanzeige. Jede Auswahl zeigt neben der erfolgreichen Anwendung ausdrücklich die Bedingung, unter der sie nicht hilft.

### Begrenzung, Mutationen und Synergien

[URTEIL] Jeder Wurf stellt die vorgesehenen Machtgelegenheiten bereit. Ein Parkeffekt kann eine Stellung verändern oder zeitweilig erhalten, erneuert seine verbrauchte Gelegenheit aber nicht durch Warten. Eine gespeicherte Geschossgruppe, ein Köder, ein Tor, ein Keim und eine Laufspur haben jeweils einen sichtbaren endlichen Zustand. Ein neuer Wurf ersetzt die entsprechende alte Vorbereitung. Bereits entstandene Herzfrüchte sind Beute, keine Vorbereitung: Sie bleiben bis zur Aufnahme oder bis zum Ende der Begegnung liegen; nur ein noch unerfülltes Fruchtträgerzeichen wird ersetzt.

[URTEIL] Ein gefüllter Geschossspeicher zeigt seine ausgeschöpfte Aufnahmefähigkeit und lässt weitere Geschosse passieren. Ein endendes Zeitfenster gibt angehaltene Gegner beziehungsweise Geschosse frei; die Projektile setzen dann ihre bisherige Bahn fort, sofern die gewählte Fusion keine ausdrücklich andere Freigabe beschreibt. Ein unerledigter Helferauftrag und ein nicht verbrauchtes Tor enden mit dem Rückruf. Damit wird aus keinem Vorbereitungszustand unbegrenzte Deckung.

[URTEIL] Zusatztreffer erzeugen keine neuen Hauptklingentreffer. Eine Druckexplosion lädt deshalb weder den Grundschutz noch eine weitere Kopie ihrer selbst. Mehrere zusammenarbeitende Effekte dürfen eine verständliche Folge bilden, aber keinen sich selbst erneuernden Kreislauf ohne erneute Spielerhandlung.

[URTEIL] Synergie entsteht durch **Zustandsübergabe**: Eine Macht erzeugt etwas, das eine andere konkret gebrauchen kann. Ein Köder führt Feinde vor eine Wand; eine Wand hält Verfolger von einem Tor fern; ein festgehaltener Gegner gibt Zeit zum Zeichnen einer Laufspur. Die zusätzliche Wirkung liegt in einer neu möglichen Handlung, nicht nur im gleichzeitigen Schaden.

[URTEIL] Pro Run darf eine getragene Macht qualitativ mutiert werden. Vorher und Nachher sind in derselben Vorschau vergleichbar; die bisherige Form bleibt als Wahl erhalten. Eine Mutation verändert ihre Aufgabe und ersetzt dabei eine Eigenschaft. Sie ist kein Rang mit größerem Wirkungswert. Die folgenden Beispiele geben dafür konkrete Möglichkeiten an.

### Zehn Beispielmächte

#### Sog — Gegner versetzen

[URTEIL] **Mechanik:** Beim Parken zieht ein einzelner sichtbarer Sogimpuls gewöhnliche Gegner in der Umgebung zur Klinge, ohne sie zu verletzen. Der Impuls endet; später nachrückende Gegner werden nicht von selbst erneut eingefangen.

[URTEIL] **Alleinstellung:** Nur Sog versetzt eine vorhandene Gruppe unmittelbar zu einem selbst gewählten gemeinsamen Ort.

[URTEIL] **Entscheidung:** Die Klinge hinter eine Gruppe werfen, um sie neu anzuordnen, oder vor mich, um eine bedrängte Seite zu entlasten? **Fusionspartner:** Donnerkeim. **Mutation:** Der Impuls stößt vom Parkpunkt weg statt heranzuziehen; damit wird die sichere Seite des Einsatzes umgekehrt.

[ANNAHME] **Wow-Moment:** Eine verteilte Front rutscht sichtbar an der Klinge zusammen; ein seitlicher Schritt macht daraus die nächste Rückflugschneise.

#### Donnerkeim — einen Angriff zulassen

[URTEIL] **Mechanik:** Der erste geeignete Gegner des Hinflugs bekommt einen Keim, der nach dessen nächstem vollständig ausgeführten Angriff sichtbar reif wird. Ein direkter Rückflugtreffer sprengt den reifen Keim als örtliche Druckexplosion; ein früher Rückruf verletzt normal, ein getöteter Träger oder ein verfehlter Rückflug lässt die Gelegenheit verfallen.

[URTEIL] **Alleinstellung:** Nur Donnerkeim macht einen bewusst zugelassenen Gegnerangriff zur Voraussetzung einer selbst gezündeten Explosion.

[URTEIL] **Entscheidung:** Den gefährlichen Gegner jetzt ausschalten oder seine Attacke für die stärkere Gelegenheit zulassen? **Fusionspartner:** Sog. **Mutation:** Der reife Keim hinterlässt bei Zündung eine sperrende Kristallhülle statt der Druckexplosion; man gewinnt Gelände statt Flächenschaden.

[ANNAHME] **Wow-Moment:** Ein Rammer schießt vorbei, sein Keim öffnet sich, und der Rückruf erwischt ihn mitten in seinen nachlaufenden Verbündeten.

#### Lockbild — Gegnerabsicht umlenken

[URTEIL] **Mechanik:** Am Parkpunkt erscheint ein Trugbild, das nahe gewöhnliche Verfolger zu ihrem neuen Ziel machen. Ihr erster vollendeter Angriff zerstört es; Rückruf löst es ebenfalls auf, ohne bereits angekündigte Angriffe abzubrechen.

[URTEIL] **Alleinstellung:** Nur Lockbild verändert vorübergehend das gewählte Angriffsziel einer Verfolgergruppe.

[URTEIL] **Entscheidung:** Gegner vom Körper weglocken oder das Bild so setzen, dass ihr Anlaufen eine spätere Schneise bildet? **Fusionspartner:** Splitterwall. **Mutation:** Das Bild erscheint am Abwurfort statt an der Klinge; es schützt den Aufbruch, sammelt die Gruppe aber auf der verlassenen Seite.

[ANNAHME] **Wow-Moment:** Die Verfolger biegen zur falschen Figur ab, während der Spieler hinter ihnen die Rückrufposition erreicht.

#### Splitterwall — einen Durchgang schaffen

[URTEIL] **Mechanik:** Am Parkpunkt wächst quer zur Wurfrichtung eine Kristallwand, die gewöhnliche Gegner und Geschosse aufhält, Spieler und Lichtklinge aber passieren lässt. Angriffe können sie zerbrechen; Rückruf zerlegt sie ohne zusätzlichen Grundschaden.

[URTEIL] **Alleinstellung:** Nur Splitterwall errichtet einen vom Spieler passierbaren, für Gegner zunächst gesperrten Durchgang.

[URTEIL] **Entscheidung:** Einen Schützen abschirmen oder Verfolger auf einen bestimmten Umweg schicken? **Fusionspartner:** Lockbild. **Mutation:** Die Wand wird zum schmalen Durchlasstor für Körper und blockiert nur Geschosse; man erhält eine Schussdeckung ohne die frühere Wegsperre.

[ANNAHME] **Wow-Moment:** Der Spieler läuft durch die eigene Wand; die außen vorbeiströmenden Feinde bilden die Linie für den Rückruf.

#### Fangschirm — fremde Munition sammeln

[URTEIL] **Mechanik:** Die geparkte Klinge fängt gewöhnliche Projektile auf ihrer zur Wurfrichtung zeigenden Schirmseite in einem sichtbaren, begrenzten Speicher auf; aus anderen Richtungen bleibt sie offen. Rückruf entlässt die gespeicherten Geschosse zu ihren jeweiligen ursprünglichen Abschussorten, ohne inzwischen fortgelaufene Schützen nachzuverfolgen.

[URTEIL] **Alleinstellung:** Nur Fangschirm verwendet tatsächlich abgefeuerte gegnerische Geschosse als zurückgesandte Munition.

[URTEIL] **Entscheidung:** Die Klinge für einen direkten Treffer auswerfen oder in eine erst kommende Salve stellen? **Fusionspartner:** Standbild. **Mutation:** Gespeicherte Geschosse werden zu einer vorübergehenden Schussdeckung am Parkpunkt; der Rückschaden entfällt.

[ANNAHME] **Wow-Moment:** Eine bedrohliche Salve steht sichtbar im Schirm und fährt in die gerade noch belegten Schützenpositionen zurück.

#### Standbild — eine Konstellation festhalten

[URTEIL] **Mechanik:** Nach dem Parken schließt sich ein angekündigter Kreis, der darin stehende gewöhnliche Gegner für ein sichtbar begrenztes Fenster erstarren lässt. Rückruf oder das Ende des Fensters lösen die Erstarrung; Geschosse und Gegner außerhalb bleiben in Bewegung.

[URTEIL] **Alleinstellung:** Nur Standbild hält die aktuelle Stellung mehrerer Gegner fest, während der Spieler weiterlaufen kann.

[URTEIL] **Entscheidung:** Die brauchbare Linie sofort nehmen oder das Fenster nutzen, um auf eine bessere Seite zu gelangen? **Fusionspartner:** Fangschirm. **Mutation:** Der Kreis hält nur bereits fliegende Projektile fest, keine Gegner; man gewinnt einen Durchgang durch eine Salve, verliert die feste Gegnerstellung.

[ANNAHME] **Wow-Moment:** Der Spieler geht zwischen erstarrten Gegnern hindurch auf deren offene Seite, während die noch beweglichen Verfolger den Weg hinter ihm schließen.

#### Sprungtor — den eigenen Weg überspringen

[URTEIL] **Mechanik:** Der Wurf hinterlässt am Abwurfort ein Tor, das nach Verlassen dieses Ortes und nach dem Parken betreten werden kann und zum sichtbar gezeigten begehbaren Austritt bei der Klinge führt. Es erlischt nach Benutzung oder Rückruf; fehlt ein begehbarer Austritt, bleibt es erkennbar geschlossen.

[URTEIL] **Alleinstellung:** Nur Sprungtor überbrückt für den Körper die Strecke zwischen verlassenem Abwurfort und Klinge.

[URTEIL] **Entscheidung:** Die Klinge an den ergiebigsten Angriffsort werfen oder an einen später nützlichen Fluchtort? **Fusionspartner:** Glutspur. **Mutation:** Einbahnrichtung umkehren: Der Eintritt liegt bei der Klinge und führt zum Abwurfort zurück.

[ANNAHME] **Wow-Moment:** Eine Verfolgerzange schließt sich am alten Wurfort, der Spieler tritt ins Tor und erscheint auf der anderen Seite der Gruppe.

#### Glutspur — eine zweite Angriffsform zeichnen

[URTEIL] **Mechanik:** Während die Klinge geparkt ist, zeichnet der letzte zusammenhängende Laufabschnitt eine zunächst harmlose Spur; neue Abschnitte lassen ältere erlöschen, Schleifen stapeln sich nicht. Rückruf lässt Feuer einmal entlang dieser tatsächlich gelaufenen Kurve wandern und anschließend erlöschen.

[URTEIL] **Alleinstellung:** Nur Glutspur benutzt den eigenen gelaufenen Weg als frei gezeichnete Angriffsform außerhalb der geraden Rückfluglinie.

[URTEIL] **Entscheidung:** Den direkten Weg zum guten Fangpunkt nehmen oder einen Umweg zeichnen, den Verfolger anschließend betreten? **Fusionspartner:** Sprungtor. **Mutation:** Die Spur wird beim Rückruf zu einem bremsenden Nebelpfad ohne Feuerschaden.

[ANNAHME] **Wow-Moment:** Die Klinge schneidet die vordere Reihe, während der vorher gelaufene Haken hinter dem Spieler als Feuerspur aufleuchtet.

#### Herzfrucht — Heilung an einen Ort binden

[URTEIL] **Mechanik:** Der erste geeignete, vom Hinflug markierte und anschließend besiegte Gegner hinterlässt eine Herzfrucht; beschworene Verstärkung erzeugt keine Früchte. Die Frucht heilt nur beim körperlichen Einsammeln und wird weder automatisch angezogen noch von der Hauptklinge zurückgebracht.

[URTEIL] **Alleinstellung:** Nur Herzfrucht macht ein selbst ausgewähltes gegnerisches Ziel zu einer örtlichen Heilgelegenheit.

[URTEIL] **Entscheidung:** Eine günstige Schneise behalten oder den Weg zu einer bereits verdienten Heilung freimachen? **Fusionspartner:** Hüterling. **Mutation:** Die Frucht wird zum einmaligen Schutzort, den der Spieler aufladen kann, indem er darin stehenbleibt; unmittelbare Heilung entfällt.

[ANNAHME] **Wow-Moment:** Ein Rückruf öffnet gerade genug Raum, um die rettende Frucht zwischen den Nachzüglern zu erreichen.

#### Hüterling — einen weiteren Akteur führen

[URTEIL] **Mechanik:** Beim Parken läuft ein Hüterling vom Abwurfort auf einem begehbaren Weg zur Klinge und stößt auf dieser einmaligen Passage gewöhnliche Gegner seitlich weg, ohne selbst Schaden zu verursachen. Danach wartet er; Angriffe können ihn erschöpfen, und Rückruf lässt ihn zum Spieler zurückkehren und für den nächsten Wurf erholen.

[URTEIL] **Alleinstellung:** Nur Hüterling schafft einen getrennten, angreifbaren Helfer mit einem durch Abwurf und Parkpunkt befohlenen Laufweg.

[URTEIL] **Entscheidung:** Die Passage zur Auflösung einer Front nutzen oder den bedrängten Helfer vorzeitig zurückholen? **Fusionspartner:** Herzfrucht. **Mutation:** Der Helfer trägt auf seinem Weg eine Schussdeckung statt Gegner zu verdrängen; sein Weg schützt nun eine Passage.

[ANNAHME] **Wow-Moment:** Der kleine Helfer schiebt eine Front auseinander; der Spieler läuft in die entstehende Lücke und ruft die Klinge durch ihre offene Seite.

### Fünf Fusionen, die zu etwas Drittem werden

[URTEIL] Wer beide Zutaten trägt, erhält ihre Fusion bei der nächsten Auslese als feste zusätzliche Möglichkeit. Sie benötigt keinen seltenen weiteren Zufallsfund. Ihr Rezept ist von der ersten gefundenen Zutat an sichtbar. Die Fusion belegt die Zutatenplätze, ersetzt deren Einzelregeln und entfernt vorhandene Mutationen dieser Zutaten; dieser Verlust wird vor der Wahl als Verhalten gezeigt. Eine Fusion ist daher keine zwingende Verbesserung.

| Zutaten → Fusion | Neue gemeinsame Regel | Sichtbares Drittes und bewusster Verzicht |
|---|---|---|
| Sog + Donnerkeim → **Gewitterkern** | [URTEIL] Am Parkpunkt entsteht ein Kern, der die nahe Gruppe einmal anzieht. Der erste vollständig ausgeführte gewöhnliche Angriff in seinem markierten Umfeld lädt ihn; beim Rückruf wird der geladene Kern mit der Klinge entlang ihrer festen Linie gezogen und zerplatzt am ersten getroffenen verankerten Gegner oder am Fangpunkt. | [URTEIL] Ein wandernder, aufgeladener Gruppenkern wird zur beweglichen Bombe. Die gezielt auf einem einzelnen Gegner platzierbare Keimladung entfällt; der Kern muss am gewählten Ort einen Angriff erleben. Ein ungeladener Kern löst sich beim Rückruf auf. |
| Lockbild + Splitterwall → **Jagdkäfig** | [URTEIL] Am Parkpunkt erscheint ein Köder in einem offenen Kristallkäfig mit einer zur Wurfrichtung festgelegten Eingangslücke. Beim Rückruf schließen sich seine Rippen, schieben eingetretene gewöhnliche Gegner zur Mitte und zerfallen; erst danach durchläuft die Klinge ihre festgelegte Rückbahn. | [URTEIL] Aus Köder und Wand wird eine durch Anlaufen gefüllte Falle. Geschosse können durch die offene Struktur gelangen, der Köder ist kein verlässlicher Nahschutz und Feinde außerhalb werden nicht nachträglich eingesaugt. |
| Fangschirm + Standbild → **Spiegelstern** | [URTEIL] Gewöhnliche Geschosse werden im markierten Feld an ihren Eintrittsorten eingefroren, bis der sichtbare Speicher gefüllt ist. Beim Rückruf fliegen alle gespeicherten Geschosse von dort zum festgelegten Fangpunkt, während die Klinge ihre eigene Linie nimmt. | [URTEIL] Mehrere selbst vorbereitete Schusslinien laufen sternförmig zusammen. Gegner werden nicht mehr erstarrt; die Geschosse verfolgen weder Schützen noch beliebige Ziele. Der Spieler muss Gegner in diese Strahlenstellung führen. |
| Sprungtor + Glutspur → **Phönixpfad** | [URTEIL] Der Rückruf versetzt den Spieler unmittelbar an seinen begehbaren Abwurfort zurück; eine Feuergestalt läuft vom verlassenen Fangpunkt den aufgezeichneten Laufabschnitt rückwärts ab. Die Klinge fliegt weiterhin zum beim Auslösen festgelegten Fangpunkt und dockt danach harmlos am versetzten Spieler an. | [URTEIL] Der eigene Rückzug wird zur bewegten Feuerfigur. Das frei betretbare Tor und die am Boden abbrennende Spur entfallen; die Wahl des Rückrufs verpflichtet zugleich zur Rückkehr an den alten Ort. Ist dieser unzugänglich, zeigt die Vorschau den nächstgelegenen begehbaren Austritt; bei vollständig fehlendem Austritt wird die Versetzung sichtbar ausgesetzt, der Rückruf bleibt möglich. |
| Herzfrucht + Hüterling → **Lebenshüter** | [URTEIL] Der Hinflug markiert weiterhin einen Fruchtträger. Beim Parken läuft der Helfer zu einer vorhandenen Frucht im gezeigten Bereich um die Klinge, nimmt sie auf und wartet dort; ein Rückruf bringt ihn zurück und verwandelt seine Nahrung in eine mitlaufende, zerbrechliche Schussdeckung für den nächsten Ausflug. | [URTEIL] Aus Heilbeute und Helfer wird eine riskante Versorgungsfahrt. Die Früchte heilen nicht mehr direkt und der Helfer verdrängt keine Gegner. Erschöpfung vor der Heimkehr lässt die getragene Frucht am Ort fallen; die nächste Fahrt kann sie erneut bergen. |

[URTEIL] Bei gleichzeitig fälligen Wirkungen gilt eine erkennbare Reihenfolge: Der Rückruf markiert zuerst seine Linie und den Fangpunkt; dann enden Köder und Erstarrung beziehungsweise beginnen die ausdrücklich beschriebenen Fusionsverwandlungen; anschließend bewegt sich der Angriff. Zusätzliche Geschosse, Feuerfiguren und Kerne erneuern keine Parkgelegenheiten. Am Fangpunkt endet ausschließlich der Angriff der Hauptklinge; danach folgen ihr Andocken und die mögliche Schutzbereitschaft. Bereits ausgelöste Zusatzwirkungen vollenden ihre beschriebenen Wege und erneuern dabei weder den Klingenschutz noch Parkgelegenheiten.

[URTEIL] Der Lebenshüter nimmt die im Bereich nächstgelegene Frucht zum Parkpunkt; diese wird vor dem Wurf beziehungsweise während des Hinflugs hervorgehoben. Fehlt dort eine Frucht, wartet er an der Klinge und erzeugt keinen kostenlosen Schutz. Erschöpfte Helfer kommen mit dem Rückruf zurück; ihr Rückweg wird nicht zur zusätzlichen Fangaufgabe. Eine Schussdeckung ersetzt die vorige derselben Macht, statt sich zu stapeln.

[URTEIL] Beim Phönixpfad zählt nur der tatsächlich aufgezeichnete Abschnitt: Ein früher benutztes Sprungtor zeichnet keine unsichtbare Verbindung quer durch die Arena. Die Vorschau zeigt den eigenen geplanten Austritt und die getrennte Klingenlinie. Damit bleibt sein höherer Anspruch eine sichtbare Regel des gewählten Builds.

### Beispiel für eine tatsächliche Buildentscheidung

[ANNAHME] Der Spieler trägt Fangschirm, Standbild und Sprungtor. Vor ihm liegt eine Route mit vielen Schützen, alternativ eine mit Verfolgern und engem Durchgang. Spiegelstern verspricht einen großen Mehrfachangriff gegen Schützen; dafür verliert der Spieler die Fähigkeit, Gegner für seinen Torlauf erstarren zu lassen. Die sichere Wahl für den engen Durchgang kann deshalb der unveränderte Aufbau sein. Das Rezept ist bekannt, seine Annahme trotzdem keine auswendig gelernte Pflicht.

### Was aus dem heutigen Katalog verschwindet

[BEOBACHTUNG · Steelman] Der heutige Katalog liefert sichtbares Wachstum und vertraute Wirkungen. Namen und Effekte dürfen dort weiterleben, wo sie eine neue konkrete Spielerhandlung tragen. Sie erhalten aber keinen Bestandsschutz, nur weil sie vorhanden sind.

| Heutiger Inhalt | Entscheidung und Grund |
|---|---|
| Wirbel, Schock und Machtblitz-Nova als selbstständige Rundumknöpfe | [URTEIL] Ersatzlos als aktive Hauptmächte streichen. Ein zweiter Flächenangriff würde die gemeinsame Entscheidung umgehen; ihre Funktionen werden nicht als unveränderte Gratis-Auslösung angehängt. |
| Sog | [URTEIL] Grundlegend umbauen: selbst gewählter äußerer Parkpunkt und einmalige Gruppenversetzung statt wiederkehrender eigener Nahkampfraum. Nur das verständliche Verb bleibt erhalten. |
| Bombe und automatische Plasmabombe | [URTEIL] Beide bisherigen Formen streichen. Donnerkeim und Gewitterkern sind andere Konzepte: Ein zugelassener Angriff oder ein vorbereiteter Ort macht die Explosion erst möglich. |
| Kettenblitz und Machtblitz | [URTEIL] Beide heutigen Mechaniken streichen, ohne sie rückwirkend zu Duplikaten zu erklären. Der neue elektrische Bereich arbeitet mit fremden Geschossen oder gegnerischem Angriff, nicht mit automatischem Zusatzschaden auf nahe Ziele. |
| Splitter, Funkenkranz, Klingenteilung, Dreifachklinge | [URTEIL] Als dauerhafte zusätzliche Angriffsabdeckung streichen. Sie würden die Abwesenheit der Hauptklinge und die Bedeutung ihrer eindeutigen Position verwischen. Splitterwall ist ein neues Hindernis, kein kosmetischer Erhalt dieser Wirkung. |
| Taktschlag und Nachhall | [URTEIL] Die wiederholten Trefferzähler streichen. Neue Mächte belohnen unterschiedliche hergestellte Zustände; ein weiteres Zählwerk wäre kein eigener Spielplan. |
| Konterstoß und Nachfassen | [URTEIL] Die automatischen Vergeltungen nach Treffern streichen. Der Grundschutz gibt verzeihenden Einstieg, ohne erlittene Fehler zum wiederholten unsichtbaren Angriffsauslöser zu machen. |
| Lebensregen und Glasklinge | [URTEIL] Passives Killheilen und pauschalen Lebensverzicht für Klingenschaden streichen. Herzfrucht behält den Wert von Heilung, macht aber Ort und Bergung zur Entscheidung. Risiko entsteht außerdem bereits durch die abwesende Klinge. |
| Automatischer Partnerpfad, Haltungen, Fokusleiste, Orbitkrone und bisherige Super-Mächte | [URTEIL] Als parallele Entwicklungssysteme streichen. Ihre zusätzliche Zustandslast konkurriert mit dem neuen Build; Machtwahl, eine Mutation und eine mögliche Fusion übernehmen dessen Identität. |
| Bisherige Kartenfusionen | [URTEIL] Durch die fünf neuen Rezepte ersetzen. Keine frühere Fusion wird bloß umbenannt oder als zusätzliche dritte Entwicklungsebene erhalten. |

[URTEIL] Die Kürzung ist kein Verzicht auf unterschiedliche Mächte. Sie ist die Entscheidung, zehn nachvollziehbare Aufgaben und ihre Kombinationen vor eine größere Menge automatischer Zusatzwirkungen zu stellen.

## f) Progression und Langzeitspaß

[ANNAHME] **In Run 50 löst der Spieler mit bekannten Mächten eine andere Gegnerstellung und bereitet beim Rückruf schon seinen nächsten Wurf vor; in Run 5 sucht er vor allem eine sichere einzelne Trefferlinie.** Seine Startwerte wachsen dabei nicht mit der gespielten Zeit.

### Varianz ab dem ersten Wurf

[URTEIL] Eine neue Reise kombiniert eine lesbare Arenaform, eine erste Gegnerkonstellation und die gewählte bekannte Startmacht. Offene Plätze belohnen breite Positionswechsel, Säulengänge trennen Laufweg und Klingenlinie, versetzte Plattformen machen den späteren Standort zum knappen Gut. Die Klinge bleibt in all diesen Formen vollständig sichtbar. Die Vorschau vor dem Start zeigt den Ort und die ersten Rollen; die Startmacht ist deshalb bereits eine begründbare Wahl.

[URTEIL] Der erste Run verwendet Sog und eine feste, einfache Auftaktsituation. Neue Inhalte erscheinen zunächst in verständlichen Vorführsituationen. Jede entdeckte Macht kann später als Startmacht gewählt werden und gehört zum normalen Fundus. Der Run zieht aus diesem Fundus ohne Doppelangebot derselben Macht; fehlende Rezeptzutaten werden nicht garantiert zugespielt. Erst eine tatsächlich vorhandene Paarung macht ihre Fusion sicher wählbar.

[URTEIL] „Nochmal“ wiederholt die Ausgangslage; „Neue Reise“ erzeugt eine andere. Kein Datumswechsel vernichtet eine interessante Herausforderung. Eine jederzeit zugängliche Vorführung kann unbekannte Mächte und Orte freigeben, damit Neugier weder Siegserien noch wiederholtes Scheitern voraussetzt.

### Freischaltungen als Einführung neuer Spielweisen

[ANNAHME] Die genannten Runnummern sind erwartete Stationen der Journey, keine Zählerbedingungen. Entdeckungen im Kampf oder ihre gleichwertige geschützte Vorführung öffnen die Inhalte. Wer alles sofort erkunden möchte, kann diese Vorführungen direkt aus der Sammlung erreichen.

| Journey-Moment | Neue Möglichkeit | Konkreter Wechsel im Spielen |
|---|---|---|
| Nach Run 1 | [URTEIL] Startwahl zwischen bereits gezeigten Formen, zuerst Sog und Lockbild. | [URTEIL] Gegner körperlich versetzen oder ihre Absicht umlenken; der nächste Run beginnt mit einer anderen Vorbereitung. |
| Um Run 3 | [URTEIL] Fangschirm und die dazugehörige Schützenkonstellation werden vorgestellt. | [URTEIL] Ein Schuss ist jetzt auch verwertbare Munition. Die Klinge wird in eine kommende Gefahr gestellt, statt immer auf einen Gegner geworfen. |
| Um Run 10 | [URTEIL] Tor, Laufspur, Heilbergung und Helfer sind vorgestellt; die Rezeptübersicht macht alle fünf Fusionen gezielt erkundbar. | [URTEIL] Eigene Laufwege, Rückzugsorte und Bergungsaufgaben können den unmittelbaren Angriff überstimmen. Der Katalog wird nicht künstlich bis zu sehr späten Runs zurückgehalten. |
| Um Run 25 | [URTEIL] Eine freiwillige Wandelreise wird nach erster Build-Erfahrung angeboten: Vor dem Bruch ersetzt der Spieler eine selbst gewählte getragene Macht durch eine vorab gezeigte Alternative. | [URTEIL] Ein eingeübter Plan muss mitten im Run verändert werden. Fusionen werden dabei nur als Ganzes aufgegeben, ohne verborgene Rückumwandlung ihrer Zutaten. |
| Um Run 50 | [URTEIL] Die Sammlung schlägt eine Vergleichsreise vor: dieselbe Ausgangslage mit unterschiedlichen Startmächten bewältigen; bekannte Arenen, Rollen und Regeln lassen sich dafür selbst zusammenstellen. | [URTEIL] Das Ziel wird die bewusste Wahl und Ausführung verschiedener Lösungen für dasselbe Problem. Dieses Angebot steht über die Sammlung auch früher offen. |

[URTEIL] Alle dauerhaften Kampfwertkäufe, Startpunkte, passiven Helferausbauten und steigenden Kapazitäten entfallen. Der Hüterling ist eine Runmacht mit einer eigenen Aufgabe, kein dauerhafter Autopilot. Kosmetik zeigt Entdeckungen und persönliche Erfolge; sie verbessert keine Trefferchancen. Ein Familienprofil speichert seinen eigenen Fortschritt, seine Hilfen und seine bevorzugte Hand unabhängig von den anderen.

### Ascension durch Regeln

[URTEIL] Die Herausforderung steigt in der folgenden Reihenfolge kumulativ. Jede Regel wird zunächst allein sichtbar vorgeführt. Ihre normale Einführung verbessert keine Gegnerwerte; sie verändert Verhalten oder das Fortbestehen von Gefahren. Eine absolvierte Stufe schlägt die nächste vor, während einzelne bekannte Regeln jederzeit separat ausprobiert werden können.

| Stufe | Hinzukommende Regel | Welche Gewohnheit nicht mehr genügt |
|---|---|---|
| Flankierung | [URTEIL] Schildträger wenden nach dem Parken der Klinge ihre Deckung sichtbar zu ihr; während der Wendung und des folgenden Angriffs bleibt eine andere Seite offen. | [URTEIL] Ein einmal gut platzierter Wurf garantiert keine unverändert gute Rückbahn. |
| Fangjagd | [URTEIL] Ein besonders markierter Jäger zielt nach ausgelöstem Rückruf auf den festgelegten Fangpunkt statt den weiterlaufenden Spieler. | [URTEIL] Nach dem Knopfdruck stehenbleiben ist nun bewusst riskant; einen geräumten Endpunkt automatisch als sicher ansehen genügt nicht. |
| Nachwirkung | [URTEIL] Bereits abgefeuerte gewöhnliche Geschosse verschwinden beim Tod ihres Schützen nicht mehr, sondern vollenden ihre angekündigte Bahn. | [URTEIL] Ein erfolgreicher Gegentreffer ersetzt nicht die Prüfung der verbleibenden Salve. |
| Deckungswechsel | [URTEIL] Bewegliche Deckungen ändern nach Ankündigung ihre Stellung, während die Klinge außerhalb liegt. | [URTEIL] Der Weg zum geplanten Angriffspunkt muss unterwegs neu bewertet werden. |
| Überlagerung | [URTEIL] Große Gegner erhalten eine bekannte Raumgefahr, während sie ihre nächste bekannte Aktion vorbereiten. | [URTEIL] Ein guter Treffer muss auch eine brauchbare Ausgangslage gegen die Folgeaktion hinterlassen. |

[URTEIL] Die Grundfassung entfernt gewöhnliche Geschosse beim Fall ihres Schützen sichtbar gemeinsam mit dessen Energie; die Stufe Nachwirkung kündigt vorab ausdrücklich an, dass diese Verbindung nun fehlt. Unabhängige Bodenflächen bleiben schon im Grundspiel bestehen. Keine Stufe ändert solche Regeln unbemerkt.

[URTEIL] Begegnungen mit mehreren Regeln müssen weiterhin eine erkennbare Antwort mit der Grundklinge lassen. Eine Konstellation, deren einzige Lösung eine zufällig angebotene Macht wäre, ist kein gültiges schwierigeres Spiel. Die höchsten Stufen liefern Erfolge und Kosmetik, keine exklusiven Kampfwerkzeuge.

[URTEIL] **Mastery heißt: Während die Klinge außerhalb liegt, die kommende Gegnerstellung lesen und einen Rückflug herstellen, dessen Ergebnis bereits den nächsten sicheren Angriff vorbereitet.** Mächte verändern, welche Stellung dafür wünschenswert ist. Die Langzeitannahme scheitert, wenn verschiedene Builds praktisch dieselbe Wurfrichtung, denselben Laufweg und denselben Rückrufzeitpunkt belohnen.

### Hilfe und Geschäftsmodell

[URTEIL] Hilfen sind vom ersten Start an erreichbar. Sie entzerren gleichzeitige Warnungen, machen Rückflug und Wurfrichtung deutlicher und verzeihen ungenaue Bewegungsrichtungen. Sie automatisieren weder den Rückrufzeitpunkt noch die Machtwahl und sperren keine Orte, Mächte oder Rezepte. Bestmarken bleiben nach verwendeter Hilfe getrennt.

[URTEIL] Das angestrebte Produkt ist ein vollständiges Kaufspiel mit einer frei anspielbaren Einführung. Kaufbare Kampfkraft, bezahlte Wiederbelebung, Energiewartezeiten und verfallende Tagesbelohnungen sind ausgeschlossen. Die Bereitschaft zu zahlen bleibt eine offene Annahme; sie wird nicht aus der Zahl der Freischaltungen abgeleitet.

## g) Player Journey

| Etappe | Erlebnis | Gelerntes | Was einen weiteren Versuch begründet |
|---|---|---|---|
| Erste Minute | [ANNAHME] Eine sichtbare Klinge liegt hinter einem Verfolger; ein seitlicher Schritt und Rückruf treffen ihn von einer anderen Seite. | [ANNAHME] Der Spieler bewegt den zukünftigen Endpunkt seines Angriffs. | [ANNAHME] Der Wunsch, denselben Zusammenhang absichtlich noch einmal herzustellen. |
| Erster Run | [ANNAHME] Sog oder ein neuer Pick verändert, wo eine Gruppe steht; der Zwischengegner macht eine zunächst bequeme Linie unbrauchbar. | [ANNAHME] Eine Macht ist eine andere Anwendung, nicht bloß ein weiterer Effekt. | [ANNAHME] Eine konkrete ungeprüfte Wahl oder eine erkennbar selbst verursachte Niederlage. |
| Erste Stunde | [ANNAHME] Bekannte Szenen werden mit Köder, Schirm oder Laufspur anders gelöst; eine Fusion zeigt erstmals ihren Preis. | [ANNAHME] Vorbereitung und Verzicht gehören zusammen. | [ANNAHME] Ein anderer Build für denselben Gegner oder ein bekannter Build auf einer anderen Route. |
| Zehnte Stunde | [ANNAHME] Der Spieler erkennt vor einem Wurf, wie die Gegner auf seinen fehlenden Schutz und die Klinge reagieren werden. | [ANNAHME] Gegnerabsichten verketten, statt jeden Feind einzeln zu bearbeiten. | [ANNAHME] Eine Regelkombination meistern, die bisher nur mit einem bevorzugten Build gelang. |
| Fünfzigste Stunde | [ANNAHME] Der Spieler wählt bekannte Werkzeuge gegen eine selbst gewählte anspruchsvolle Stellung und kann erklären, weshalb seine Lösung funktioniert. | [ANNAHME] Den Run als Folge zusammenhängender Positionen lesen. | [ANNAHME] Freiwillige Mastery und Vergleich verschiedener Lösungen; keine noch offene Kraftleiter. |

[URTEIL] **Der wahrscheinlichste frühe Abbruchpunkt ist der erste Fehlwurf unter Druck:** Der Spieler drückt, die Klinge fliegt anders als erwartet, und ohne sie fühlt er sich ausgeliefert. Der sichtbare Richtungspfeil, eine einfache erste Arena, ein sofort möglicher früher Rückruf und automatisches Andocken adressieren genau diesen Punkt. Es folgt keine lange Erklärung über den Fehler.

[URTEIL] Der spätere kritische Punkt liegt nach der ersten verstandenen Fusion. Die Antwort darauf ist keine weitere Schicht von Seltenheiten, sondern eine Begegnung, in der deren aufgegebene Eigenschaft fehlt und der Spieler seine Anwendung ändern muss. Wenn diese Gegenprobe nur ärgert statt neues Handeln auszulösen, trägt das Mächte-System noch nicht.

## h) Der Wow-Moment

[ANNAHME] Die folgende Szene ist eine sekundengenaue Erlebnisabsicht, keine Vorgabe für Animationsdauer oder Gegnerwerte. Der Spieler trägt Spiegelstern; die Regeln seiner Zutaten wurden vorher gezeigt.

| Moment | Sichtbares Geschehen und Spielerhandlung |
|---|---|
| Sekunde 0 | [ANNAHME] Die Klinge parkt oberhalb einer Gegnergruppe. Der Spieler steht links darunter; der direkte Rückweg würde nur den Rand der Gruppe treffen. |
| Sekunde 1 | [ANNAHME] Eine feindliche Salve erreicht das Spiegelsternfeld. Die Geschosse bleiben an verschiedenen Eintrittsorten stehen und sind als gespeicherte Geschosse erkennbar. |
| Sekunde 2 | [ANNAHME] Der Spieler läuft nach rechts. Die vorgeschlagenen Linien von Klinge und Geschossen wandern mit seinem Standort und beginnen, die Gruppe zu durchkreuzen. |
| Sekunde 3 | [ANNAHME] Eine Bodenwarnung erscheint unter dem neuen Standort. Eine weitere Verbesserung der Linie würde jetzt bedeuten, den eigenen Ausweg zu verlieren. |
| Sekunde 4 | [ANNAHME] Der Spieler drückt Rückruf und läuft sofort aus der Warnfläche. Der gewählte Fangpunkt bleibt sichtbar stehen; die Linien werden verbindlich. |
| Sekunde 5 | [ANNAHME] Klinge und gespeicherte Geschosse durchkreuzen die offene Seite der Gruppe aus unterschiedlichen Richtungen. Die zuvor gefährliche Salve wird zum eigenen Sternangriff. |
| Sekunde 6 | [ANNAHME] Die Bodenattacke trifft den verlassenen Standort. Der Spieler ist bereits daneben, die Klinge dockt als Lichttransfer an und zeigt wieder Schutzbereitschaft. |

[ANNAHME] Der erzählbare Satz lautet: **„Ich habe ihre Schüsse festgehalten, bin auf die andere Seite gelaufen und habe sie mitten durch ihre eigene Gruppe zurückgerufen.“** Die Szene braucht keinen hohen Schadenswert als Erklärung und bleibt trotzdem spektakulär. Sie ist noch keine beobachtete Spielerreaktion.

## i) Was dieses Spiel bewusst nicht ist

1. [URTEIL] **Kein immer dichterer automatischer Schadenskreis.** Ein Effekt muss eine erkennbare Vorbereitung oder Folge einer Entscheidung bleiben; Dauerbeschuss darf diese Aufgabe nicht übernehmen.
2. [URTEIL] **Kein Reflextest mit zusätzlichem Fangknopf.** Die schwierige Leistung liegt im Herstellen des Rückwegs. Das automatische Andocken schützt sie vor einem fremden Präzisionszwang.
3. [URTEIL] **Kein Rezeptalbum mit garantierter bester Endform.** Eine Fusion gibt Funktionen auf. Der nicht fusionierte Aufbau muss unter passenden Bedingungen die vernünftigere Wahl sein.
4. [URTEIL] **Kein Fortschritt durch dauerhafte Kampfkraft oder Sammelpflicht.** Wiederkehr soll neue Anwendungen und wachsendes Können bringen; Freischaltungen führen ein, sie ziehen keine künstliche Wartewand hoch.
5. [URTEIL] **Kein Endlosmodus als Ersatz für einen fertigen Run.** Die kurze Reise liefert ihren eigenen Aufbau, ihre Gegenprobe und ihren Abschluss. Eine Zusatzexpedition darf den bereits verdienten Abschluss nicht entwerten.

## Was diese Phase zusätzlich sichtbar macht

[BEOBACHTUNG] Eine präzise Rückflugregel löst das Eingabeproblem nicht vollständig: **Der Zustand nach einem guten Treffer gehört zur Entscheidung davor.** Wer einen großartigen Schnitt plant, aber am falschen Ort für die nächste Bedrohung bleibt, hat erst die halbe Stellung gelöst.

[URTEIL] Deshalb endet die Mastery nicht beim Treffer. Gegnerfolge, Fangpunkt, erhaltene Raumkontrolle und die Möglichkeiten des nächsten Wurfs sind die Quelle der angestrebten Tiefe. Die neuen Mächte sind notwendig, weil sie genau diese zukünftige Stellung verändern können.
