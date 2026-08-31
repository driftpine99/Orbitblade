# Orbitblade — Konzept 2

**Fassung 4, 31.08.2026.** Nach drei kritischen Reviews. Teil H führt alle
korrigierten Irrtümer — sie erklären, warum das Konzept so aussieht.

Drei Vorgaben des Projektinhabers:
1. **Veröffentlichung** — Einstieg, Bindung, Wiederspielwert sind harte Anforderungen.
2. **Der Siebenjährige ist Leitbild, kein Testfall.**
3. **Der Mensch kann nicht programmieren und will wenig tun** — spielen und sagen,
   was sich falsch anfühlt.

**Arbeitsregel für dieses Dokument:** Jede Zahl aus `CLAUDE.md` wird vor Verwendung
am Code geprüft. Das Referenzdokument ist an mindestens zwei Stellen falsch
(`fokusZiel` steht dort mit 18, im Code mit 85; die sechs Karten-Evolutionen gelten
dort als ungebaut, stehen aber fertig in `game.js`).

---

# Teil A — Der Befund

Der Kern ist selten und gut: Eine Klinge kreist automatisch, und wo sie gerade
wirklich ist, tut sie mehr weh.

**Am Code nachgemessen ist dieser Kern jedoch nicht das, was er zu sein behauptet.**

| Behauptung | Messung |
|---|---|
| Schneller drehen trifft öfter | **Nein.** Schaden tickt fest alle 120 ms. Über ω = 1,5 bis 12 rad/s bleibt die Volltrefferquote bei 15,9 %. |
| Nah ist riskant und stark | **Nein.** Kein Innenrand, kein Abfall: 380 Schaden in 3 s — identisch bei 10, 30, 50 und 70 px. |
| Mehr Klingen heißt mehr Deckung | **Nur bis drei.** Der Trefferbogen schrumpft mit `0.75^(n−1)`; Abdeckung 15,9 / 23,9 / 26,9 / 26,9 / 25,2 % für 1–5. |
| **„Position ist Können"** | **Nur halb.** Über 24 Winkel streut der Schaden um 23,8 % — das ist Phasenrauschen zwischen Tick und Rotation, nichts Steuerbares. **Der Spieler kontrolliert den Klingenwinkel nicht.** |

Die letzte Zeile ist der wichtigste Befund des ganzen Dokuments und war in zwei
Fassungen unbelegt stehengeblieben.

**Was der Spieler wirklich steuert, ist Abstand und Gruppierung** — wen er in
Reichweite hält. Nicht, wo die Klinge steht. Jedes ehrliche Konzept muss auf dieser
Achse bauen statt auf einer erfundenen.

Dazu zwei Strukturbefunde: Der Lauf hat keine Form (dreißig Wellen, Welle 29 dauert
5,5-mal so lang wie Welle 1), und der Grund zum Wiederanfangen ist Buchhaltung.

---

# Teil B — Das Band: der Kern, ehrlich gebaut

**Die eine Entscheidung.** Aus „wo steht die Klinge" wird „in welchem Abstand
halte ich die Gegner". Das ist die Achse, die der Spieler tatsächlich bedient.

## B1 — Der Ring bekommt Innen- und Außenrand

Heute trifft die Klinge alles bis 57 px, auch was auf dem Spieler klebt.

Neu: ein **Band**. Innerhalb trifft die Klinge nicht. Der Spieler muss Gegner im
Band halten — zu nah ist wirkungslos, zu weit ist außer Reichweite.

**Korrektur aus der Charakterisierungsmessung (31.08.):** Fassung 4 rechnete hier
mit 17 px Band und war falsch. Sie nahm die *sichtbare* Klingenspitze (56,76 px).
Getroffen wird aber nach `d < player.radius + bladeLen + en.radius`, und Kontakt
gilt bei `en.radius + player.radius + 4`. Die Differenz ist `bladeLen − 4` —
**34,76 px, und für jeden Gegnertyp gleich**, weil beide Ränder den Gegnerradius
tragen.

Daraus folgt die Definition: **Alle Ränder werden hüllenbezogen gemessen**, so wie
Trefferprüfung und Kontaktschaden es heute schon tun. Dann ist das Band für Drohne
und Panzer gleich breit, und die Frage „Mittelpunkt oder Hülle" ist beantwortet.

| | heute | Ziel |
|---|---|---|
| Außenrand (Zuschlag auf `player.radius + en.radius`) | 38,76 px | **65 px** |
| Innenrand (ebenso) | keiner | **20 px** |
| **Bandbreite** | 34,76 px | **45 px** |
| Kontaktschaden ab | `+4 px` | unverändert |
| daraus für einen Soldaten | Treffer bis 74,76 px | **bis 101 px**, Loch unter 56 px |

Der Innenrand liegt damit 16 px oberhalb der Kontaktzone: Wer zu nah kommt, macht
Schaden und bekommt keinen. Genau die Spannung, die das Spiel verspricht.

## B2 — Der Innenrand stößt ab, statt nur nicht zu treffen

Ein reiner Toter Winkel wäre eine Todesfalle: **Drohnen laufen 180 px/s, der
Spieler 175.** Man kann ihnen nicht davonlaufen, und es gibt keinen Sprint und
keinen Grundrückstoß.

Deshalb ist der Innenrand kein Loch, sondern ein **Abstoßer**: Wer ihn
unterschreitet, wird nach außen gedrückt — zurück ins Band, wo die Klinge ihn
trifft. Das gibt dem Innenrand eine sichtbare Wirkung statt einer unsichtbaren
Strafe, und der Sog wird nachträglich sinnvoll: Er hält Gegner im Band.

**Entschieden und gemessen am 31.08.** mit `tools/mess_band.js` (je Gegnertyp ein
eigener Lauf, 30 s, fünf Wiederholungen, Median).

Die Gegnertempi spreizen sich von 86 bis 180 px/s, der Spieler läuft 175:

| Panzer | schwer | Exploder | Soldat | Jäger | Drohne |
|---:|---:|---:|---:|---:|---:|
| 86 | 95 | 132 | 138 | 165 | 180 |

**Beide Richtungen aus Fassung 4 scheitern, und zwar aus einem gemeinsamen Grund.**
Ein Gegner steht dort still, wo Schub und Eigentempo sich aufheben. Diese
Gleichgewichtstiefe entscheidet alles: liegt sie tiefer als der Kontaktabstand
(16 px unter dem Innenrand), erreicht der Gegner den Spieler, sonst nie.

- **Konstanter Schub `s`:** kein Gleichgewicht, nur ein Umkippen bei `v = s`.
  Gemessen bei 200 px/s: Panzer, Schwer, Soldat und Jäger landen **nie wieder**
  einen Kontakttreffer, die Drohne noch immer.
- **Tiefenproportional `k·tiefe`:** Gleichgewicht bei `tiefe = v/k` — hängt direkt
  am Tempo. `k = 5,4` lässt den Panzer gerade an und die Drohne 33 px tief
  einsinken; `k = 11` sperrt die Drohne aus und den Panzer erst recht.
- **Rein geschwindigkeitsrelativ (`k ≥ 1`):** hebt jede Annäherung auf. Niemand
  kommt je durch, es gäbe keinen Nahkampf mehr.

**Die Lösung ist das Produkt statt der Alternative:**

> **Schub je Sekunde = Eigentempo des Gegners × (Eindringtiefe / D), mit D = 20 px.**

Gleichgewicht: `v = v · tiefe/D` → `tiefe = D`, **unabhängig vom Tempo**. Jeder
Gegnertyp sinkt gleich tief ein. `D` ist damit ein direkt lesbarer Regler: unter
16 px sperrt er alle aus, darüber lässt er alle an den Spieler. 20 px setzt das
Gleichgewicht 4 px hinter die Kontaktgrenze — ein entschlossener Gegner berührt
dich, kann sich aber nicht eingraben.

Zeitanteil im Kontaktabstand, geometrisch gemessen (nicht über `hurtPlayer` — das
zählt Jäger-Projektile mit und verwischt den Befund):

| | Panzer 86 | Schwer 95 | Drohne 180 | Drohne/Panzer |
|---|---:|---:|---:|---:|
| ohne Abstoßer | 0,65 % | 0,66 % | **10,92 %** | **16,5×** |
| konstant 200 px/s | 0,00 % | 0,00 % | 0,26 % | alle harmlos |
| **Tempo × tiefe/20** | 0,13 % | 0,38 % | **0,87 %** | **6,7×** |

Die Todesspirale der Drohne fällt von 10,92 auf 0,87 %, ihre tiefste erreichte
Stelle von 47,6 auf 26,0 px — und Panzer und Schwer bleiben gefährlich. Zusätzlich
kehrt sich die Rangfolge der Eindringtiefe um: Unter dem neuen Gesetz stecken die
**langsamen, schweren** Gegner am tiefsten im Band, weil ihr Schub mit ihrem Tempo
skaliert. Genau die Gewichtung, die das Spätspiel braucht.

**Offen bleibt:** Exploder, Soldat und Jäger landen auch ohne Abstoßer keinen
Kontakttreffer gegen den Bot — sie sind langsamer als der Spieler. Ihre Zahlen
sagen über den Innenrand nichts aus und dürfen nicht als Beleg gelesen werden.

### B2a — Was der gebaute Innenrand dann wirklich getan hat

**Der Abstoßer oben ist gebaut (`?band=1`) und im Spiel widerlegt worden.** Die
Messreihe in `mess_band.js` lief gegen eine *gedachte* Geometrie, während die
echte Klinge noch kurz war. Im gebauten Band zeigte sich der Denkfehler sofort:

> **Jeder stetige Schub hat ein Gleichgewicht — und jedes Gleichgewicht liegt
> entweder im Loch oder außerhalb der Kontaktgrenze.**

Bei `Tempo × Tiefe/20` setzten sich alle Gegner exakt 20 px unter dem Innenrand
fest, also auf dem Spieler: **89,7 % der nahen Gegner standen im Loch** statt im
Band, die Kills fielen von 14 auf 2 je 40 s.

Die Form ohne Gleichgewicht ist gebaut und wirkt: Der Widerstand wächst mit dem
**Weg**, den der Gegner im Loch zurückgelegt hat. Weil der Weg mit dem Tempo
wächst, ist die Eindringtiefe für jedes Tempo gleich (`wegK/2`), und weil er
immer weiter wächst, gibt es keinen Ruhepunkt. Damit fiel „im Loch" von 89,7 auf
43,3 %, und die Gegner standen erstmals mehrheitlich im Band.

**Trotzdem trägt der Innenrand nicht.** Der Prüfstand ohne Bot (Welle 20, 16
Soldaten auf dem Klingenring, 20 s) zeigt, warum:

| | Grundschaden | geg. ohne Band | Zeit innerhalb des Innenrands |
|---|---:|---:|---:|
| ohne Band | 38.498 | — | **39,0 %** (also am Spieler klebend) |
| Loch (Faktor 0) | 22.802 | **−40,8 %** | 40,9 % |
| Abschlag 0,35 | 26.110 | −32,2 % | 46,3 % |
| Abschlag 0,5 | 30.074 | −21,9 % | 42,9 % |
| Abschlag 0,7 | 33.089 | −14,1 % | 43,0 % |

Die letzte Spalte ist der Befund: **Schon ohne Band stehen die Gegner 39 % der
Zeit direkt am Spieler.** Der Innenrand liegt genau dort, wo sie ohnehin sind —
weil die Gegner-KI geradlinig auf den Spieler zuläuft und keinen Grund hat, auf
Bandabstand stehenzubleiben. Ein Loch um den Spieler ist damit kein
Positionierungsraum, sondern eine Steuer auf das Umzingeltwerden, dem der Spieler
nicht ausweichen kann.

**Konsequenz — die Änderung zerfällt in zwei unabhängige Hälften:**

1. **Die größere Reichweite (38,76 → 65) trägt und ist unabhängig.** Sie gibt dem
   Spieler Raum, macht das Feld lesbar und passt zum Herauszoomen. Volle Läufe
   damit: Sieg W30, Krone 1, 15 investiert, 9 Karten, 3 Weichen, 9,8–10,4 min.
2. **Der Innenrand braucht Gegner, die auf Bandabstand stehen wollen.** Das ist
   eine Änderung an der Gegner-KI (anhalten, ausholen, zustoßen), nicht an der
   Geometrie. Vorher ist er nur eine Schadenssteuer zwischen −14 und −41 %.

Der Schalter bleibt bestehen, damit beides auf dem Gerät gegeneinander spielbar
ist. Ohne `?band=1` ist jeder Zahlenwert unverändert — belegt durch 0 Abweichungen
über 4 Geometriezustände und 54 Verhaltensfälle in `tools/charakterisierung.js`.

### B2b — Was stattdessen gebaut wurde: die Abstandskurve

Beide Hälften des Bandes sind zurückgestellt. Der Innenrand scheitert an der
Gegner-KI (B2a). Die größere Reichweite war nur das **Mittel**, um Platz für ein
45-px-Band zu schaffen — ohne den Innenrand ist sie ein Machtzuwachs ohne
Begründung, der zudem alle 19 abgeleiteten Flächen mitzieht (Nova +16 %,
Sog-Halteradius +47 %). Beides bleibt hinter `?band=1` erhalten und dokumentiert,
damit die Messungen nicht neu erarbeitet werden müssen.

**Gebaut und ab sofort Standard ist die einfachste Form desselben Ziels:**

> Der Schaden folgt dem Abstand. An der Hülle **0,82**, an der Klingenspitze
> **1,32**, dazwischen linear. Kein Loch, kein sicherer Hafen — wer klebt, nimmt
> weiter Schaden, nur weniger.

Damit ist der Grundbefund aus Teil A behoben: Abstand war die einzige Achse, die
der Spieler wirklich bedient, und sie hatte **null** Wirkung.

| Ringabstand | flach (heute) | mit Kurve | Verhältnis |
|---:|---:|---:|---:|
| 40 px (klebend) | 38.628 | 32.648 | **0,845** |
| 50 px | 38.576 | 38.576 | 1,000 |
| 60 px | 38.576 | 44.504 | 1,154 |
| 70 px (Rand) | 38.576 | 48.408 | **1,255** |

**1,49× zwischen kleben und Rand**, bei **−1,0 % Gesamtleistung** im Prüfstand mit
anrückenden Gegnern. Das Paar 0,82/1,32 ist genau darauf eingestellt: die Achse
entsteht, die Macht bleibt gleich.

Belegt über `tools/charakterisierung.js`: Von 4 Geometriezuständen und 54
Verhaltensfällen bewegen sich **ausschließlich `gesamtschaden` und
`schadenProSekunde`** — keine Auslösezahlen, keine Fokusrate, keine Panzerlogik.
Die Kartenverhältnisse bleiben erhalten (Phaser Rang 2 +38,6 %, Plasmabombe
+45,7 % — wie vor der Änderung), die Aufnahmeprüfung hält.

**Sichtbar gemacht:** Ein warmer Ring markiert den Abstand, ab dem der Faktor 1
erreicht ist. Weiter außen wird es stärker. Ohne diese Marke wäre die Kurve eine
unsichtbare Zahl — und genau das verbietet die Leitplanke.

`?flach=1` stellt das alte, abstandsblinde Verhalten für den direkten Vergleich
wieder her.

## B3 — Vom Abtasten zum Fegen

Der 120-ms-Tick macht Tempo wirkungslos. Neu ist die Trefferfläche der Bogen, den
die Klinge **seit dem letzten Bild überstrichen** hat.

**Ehrlich dazu:** Das bringt *kein* Winkelkönnen — das gibt es hier nicht und wird
es nicht geben. Es bringt genau eine Sache: **Tempo wird zur echten Achse.**

Und es kostet etwas. Heute bekommt ein Gegner rund 1,39 Volltreffer je Umlauf,
weil das 1,0-rad-Fenster breiter ist als der 0,72-rad-Schritt je Tick. Ein sauberer
Sweep ergibt genau 1,0 — **rund 28 % weniger Volltrefferschaden.** Der Umbau muss
das ausgleichen, sonst ist er eine stille Abschwächung.

**Die Decke, an der zwei Achsen kollidieren:** Eine Abklingzeit je Gegner (nötig,
damit dichte Bilder nicht mehrfach zählen) deckelt die Trefferrate. Bei 200 ms sind
das 5 Treffer je Sekunde, bindend ab `Klingenzahl × ω > 31,4`. Sobald Tempo eine
Achse ist, zahlt ab dort die dritte Klinge nichts mehr. **Das ist zu benennen und
zu wählen: Entweder die Abklingzeit skaliert mit dem Tempo, oder Anzahl ist die
Achse, die verliert.**

## B4 — Die Achsen

| Achse | Wirkung | Zustand |
|---|---|---|
| **Abstand** | Lage im Band — die Kernachse | nach B1 real |
| **Bandbreite** | Fehlertoleranz gegen Schadensdichte | nach B1 real |
| **Tempo** | überstrichene Fläche je Sekunde | nach B3 real |
| **Anzahl** | Deckung, sättigt bei 3 | heute real, gedeckelt |
| **Trägheit** | Klinge hängt nach, Richtungswechsel peitschen | **neu zu bauen** |
| **Form** | Ellipse, Pendel, Achter | **neu zu bauen** |

Trägheit ist die einzige Achse, die dem Spieler etwas Winkelähnliches gibt — sie
koppelt die Klingenlage an die eigene Bewegung. Sie ist deshalb **Pflicht, nicht
Kür**, wenn das Spiel mehr als eine Abstandsübung sein soll.

## B5 — Was der Umbau an vorhandenen Karten bricht

**Nachfassen bricht.** `nachfassenBereit` wird pro Tick gelöscht und verdoppelt den
Trefferbogen für genau einen 120-ms-Tick; Rang 2 hängt seinen Panzerdurchschlag an
dasselbe Flag. Ohne Tick gibt es kein „einen Tick lang".
*Neudefinition:* Nach einem erlittenen Treffer ist der Bogen für **0,4 Sekunden**
doppelt breit. Zeitbasiert, tickunabhängig, gleiche Absicht.

**Taktschlag überlebt** — er zählt Umläufe, nicht Ticks.

**Der Fokus überlebt.** Er lädt +2 je Umlauf mit Volltreffer; da praktisch jeder
Umlauf einen enthält, ergibt der Sweep dasselbe. 85 / 2 = 42,5 Umläufe ≈ 45 s ≈ 11
Einsätze je Lauf — exakt der gemessene Wert. Der Fokuskorridor bleibt.

**Vor dem Umbau: eine Charakterisierungsmessung.** Der Trefferblock ist **178
Zeilen** lang und berührt 23 Systeme — Fokus, Nachhall, Kettenblitz, Schneide,
Panzerung und Durchschlag, Nachfassen, Lichtbund, Splitter, Kronenformen,
Splitterfächer. Er ist die dichteste Kopplungsstelle im Projekt. Vorher wird das
heutige Verhalten festgehalten (Treffer je Sekunde, Volltrefferquote,
Panzerinteraktion, Fokusladerate, Auslösungen je Karte), damit der Umbau als
verhaltenserhaltend nachweisbar ist. Ohne diese Messung ist der Schritt
unverantwortbar.

**Die Reichweite hat 21 Leser, nicht einen.** `bladeLength()` wird an 21 Stellen
gelesen, und viele davon leiten Flächen daraus ab: `bladeLength()+120` für den
Nova-Radius, `+72` für Taktschlag, `*.78` und `*.82` für die Wirbel-Zugziele,
`*.92` für den Sog-Halteradius, dazu Funkenkranz, Brandspur und die Klingenschüsse.
Eine Verdopplung von 38 auf ~82 vergrößert **still jede dieser Flächen**. Mit
`bonuses.range` (Deckel 1,8) und Präzisionsorbit (×1,2) reichte die Klinge dann bis
rund 195 px.

Ebenso hängen feste Abstände daran, die die alte Reichweite voraussetzen — allen
voran `CONFIG.jaeger.haltNah = 115`, laut Codekommentar „knapp hinter der
Klingenreichweite (~88 px)". Bei 100 px Reichweite plus 16 px Jägerradius stünde
der ladende Jäger künftig **im Band**, und seine ganze Rolle — Position gegen Kill
abwägen — kippt.

**Die Charakterisierungsmessung umfasst deshalb beides:** den Trefferblock *und*
alle 21 Reichweiten-Leser samt der Konstanten, die auf 57 px kalibriert sind.

---

# Teil C — Der Lauf

## Drei Akte, vierzehn Minuten

| Akt | Dauer | Inhalt | Ende |
|---|---|---|---|
| I — Finden | ~4 min | Bahn wählen, erste Modifikatoren | Erster Wächter |
| II — Formen | ~5 min | Build wird sichtbar, Gegner mit eigenen Regeln | Zweiter Wächter, verändert die Arena |
| III — Beherrschen | ~5 min | Volle Dichte, Evolutionen, Höhepunkte | Finale |

**Drei Akte ergeben drei Wegwahlen** (Arena, Druck). Das Entscheidungsbudget bleibt
bei zwölf: heute 9 Karten + 3 Weichen, künftig **9 Karten + 3 Aktwahlen**; die drei
Bahnweichen wandern in die Aktwahl statt zusätzlich zu stehen.

## Zur Laufzeit

Vampire Survivors 30 Minuten, Brotato 20–30, Hades 40–60. Vierzehn Minuten sind
bewusst kürzer: **ein Lauf auf dem Telefon, ohne Verpflichtung.** Das ist eine
Positionierung, die die Vermarktung tragen muss — nicht verstecken.

## Endlos

An jedem Wächter: weiter oder sichern. Heute trifft der Spieler ab Welle 41 keine
Entscheidung mehr.

---

# Teil D — Wie die KI weiterbaut

## Der Befund

Vier bekannte Fehler. **Nicht die Werkzeugklasse hat versagt, sondern die
Abnahmekriterien.** `tools/sim.js` stubbt `innerHTML` als normale Zeichenkette —
der veraltete Hilfetext war headless lesbar. Der Dauerstrom wurde sogar gemessen
und *bestanden*, weil das Kriterium nur „+15 bis +50 % Schaden" fragte, nicht nach
Ereignissen je Sekunde.

## Ebene 1 — Zahlen (Maschine, Sekunden)

Ein Befehl, grün oder rot. Vorhanden: Sieg, Punktbudget, Endlos, Monotonie.

**Vier neue Regeln, jede gegen einen bekannten Fehler:**

| Regel | Fängt |
|---|---|
| **Budgetzusicherung** je Effekt: Höchstwert an Auslösungen je Sekunde und gleichzeitigen Objekten | Dauerstrom (20 Schüsse/s) |
| **Textinvarianten**: kein sichtbarer Text nennt Mechanik, die es nicht mehr gibt | Veralteter Hilfetext |
| **Auslieferungsprobe**: enthält der veröffentlichte Stand die letzte Änderung, und lädt die Seite sie? | Versionskennung stand 14 Tage still |
| **Zustandsinvarianten**: „in Zustand X ist Bedienelement Y nicht bedienbar" | Sichtbarer Würfelknopf bei exklusiver Wahl |

Die vierte fehlte in Fassung 2 — und sie hätte den teuersten der vier Fehler
gefangen, den, der einen Fortschrittspunkt vernichtet hätte. `classList` und
`disabled` sind im Harness lesbar; die Prüfung ist headless möglich.

## Ebene 2 — Augen (Maschine, Minuten)

Bilder an festgelegten Momenten auf dem **veröffentlichten** Stand.
**Stichprobe, kein Tor.** Eine KI erkennt aus einem Bild, ob etwas fehlt,
überlappt oder falsch beschriftet ist. Sie erkennt daraus **nicht**, ob ein Spiel
Spaß macht. Diese Grenze steht hier, damit sie nicht später überschritten wird.

## Ebene 3 — Gefühl (Mensch, zweimal)

Ein Satz vor der Änderung, ein Satz danach. **Der Nachtest ist verpflichtend** —
ohne ihn belegt die Messung nur, dass sich ein Regler bewegt hat, nicht dass das
Gefühl weg ist.

## Von Gefühl zu Arbeit

Kein Regler je Gefühl, sondern ein **Verdachtsraum**: Die KI misst alle
plausiblen Ursachen und berichtet, welche zutrifft.

| Gefühl | Verdächtige (alle prüfen) |
|---|---|
| „zu viel / zu krass" | Ereignisse je Sekunde · gleichzeitige Objekte · Bildschirmanteil |
| „macht nichts" | Wirkung je Auslösung · getötete Gegner je Einschlag · Sichtbarkeit |
| „langweilig" | Bahnvielfalt · Gegner-Einerlei · Tempo über den Lauf · Ton |
| „unübersichtlich" | Vorwarnzeit · Gegnerdichte · gleichzeitige Effekte · Kontrast |
| „zu lang / zu kurz" | Aktdauer · Zeit bis zur ersten Entscheidung · Leerlaufanteil |

## Telemetrie

Ebene 3 skaliert auf **einen Menschen**. Fremde geben kein Feedback, sie hören auf.
Sobald Fremde spielen, braucht es anonyme Telemetrie: Abbruchwelle, Laufdauer,
gewählte Bahnen, erreichte Evolutionen, Todesursache. Datensparsam, ohne Konten,
mit sichtbarem Hinweis. Ohne sie ist die KI nach der Veröffentlichung blind.

## Grenzen

Die KI darf Regler in dokumentierten Korridoren verstellen, gefundene Fehler
beheben und Inhalt nach vorhandenem Muster ergänzen. Sie darf keine Leitplanke
aufweichen, kein System entfernen, bevor der Ersatz von allen drei Ebenen
bestätigt ist, und sich nicht auf eine Messung berufen, die die Frage nicht
beantwortet.

---

# Teil E — Leitplanken

- Die kreisende Klinge ist immer der Hauptangriff.
- **Genau ein aktiver Knopf.**
- Kein Fortschrittsbildschirm im Kampf.
- Jede Karte und jeder Rang ist spürbar **und** sichtbar.
- **Kein Dauerstrom** — als harte Zahl in Ebene 1 hinterlegt.
- Ein Lauf endet in einer Sitzung.
- Der Einstieg ist ein Knopf.
- **Touch ist die Zielplattform.** Jede Oberfläche wird auf einem Telefon geprüft.

---

# Teil F — Umbauen statt streichen

Am Code geprüft: `META_UPGRADES` ist der **einzige Freischaltweg für drei der fünf
Hauptmächte** und für die Begleiterlinie mit echten Kampfwirkungen. Am Orbitauftrag
hängen 74, am Tageslauf 72 Codestellen. Streichen wäre fahrlässig.

**Dieselben Objekte, anderer Auslöser:**

| Heute | Künftig |
|---|---|
| Hauptmacht für Fragmente kaufen | Freischalten, indem man mit der Vorgänger-Macht einen Akt beendet |
| Begleiterstufen kaufen | Taten im Lauf |
| Orbitauftrag als zweite Spur | Geht in den Taten-Freischaltungen auf |
| Prüfstufen versprechen Kosmetik | Liefern oder Text berichtigen |
| Tageslauf als 30-Wellen-Kopie | Kurzer Akt-I-Lauf mit eigener Bestmarke |

Die Fragmentwährung entfällt als Zahlungsmittel, die Objekte bleiben.
**Hilfsstufen und getrennte Bestmarken bleiben** — ein veröffentlichtes Spiel mit
„sofort verständlich" als Anspruch braucht einen leichteren Weg.

---

# Teil G — Reihenfolge

1. **Ebene 1 erweitern** — vier Regeln. Klein, deterministisch, verhindert die
   Wiederholung aller vier bekannten Fehler.
2. **Charakterisierungsmessung** des Trefferblocks (178 Zeilen, 23 Systeme).
3. ~~Abstoßrate entscheiden und messen~~ — **erledigt am 31.08.**, siehe B2:
   Schub = Eigentempo × Eindringtiefe / 20. `tools/mess_band.js`.
4. **Band gebaut, gemessen, zurückgestellt** (B2a) — es lebt hinter `?band=1`
   weiter. **Stattdessen ausgeliefert: die Abstandskurve** (B2b), die dasselbe
   Ziel ohne Loch, ohne Reichweitenänderung und ohne KI-Abhängigkeit erreicht.
   Der Innenrand wird erst wieder zum Thema, wenn Gegner einen Grund haben, auf
   Bandabstand stehenzubleiben.
5. **Sweep** (B3) mit Ausgleich der −28 % und einer Entscheidung zur Trefferdecke.
6. **Trägheit**, dann Form.
7. **Akte** als Struktur über die vorhandenen Wellen.
8. **Freischaltungen umhängen**, erst wenn Taten-Auslöser stehen.
9. **Telemetrie**, sobald Fremde spielen.

**Offen und in diesem Entwurf nicht gelöst:** Ton (vom Nutzer als schlecht
bewertet), der Todesmoment, Lokalisierung, Speicherkompatibilität nach
Veröffentlichung, Vertrieb und Recht. Sie gehören vor die Veröffentlichung, nicht
vor den nächsten Bauschritt.

---

# Teil H — Korrigierte Irrtümer

**Aus Fassung 1:** Sechs Bahn-Achsen behauptet, drei ohne Wirkung · „maschinell
nicht findbar" — die Texte waren lesbar, das Kriterium fehlte · Gefühl-zu-Regler
zu eng · Streichliste hätte drei Hauptmächte unerreichbar gemacht · Zeitbudget war
ein Fehlschluss · Nachfassen/Taktschlag umdeuten hätte zwei Evolutionen zerlegt ·
zwei statt drei Aktwahlen · Telemetrie fehlte.

**Aus Fassung 2:** „Position ist Können" blieb ungeprüft — der Spieler steuert den
Winkel gar nicht · der Innenrand hätte in heutiger Geometrie ein 17-px-Band und
eine Todesspirale gegen Drohnen (180 gegen 175 px/s) erzeugt · Nachfassen bricht
sehr wohl · die Trefferdecke aus Abklingzeit mal Klingenzahl war nicht benannt ·
Ebene 1 fing nur drei von vier Fehlern · „Plasmabombe" und „Machtblitz" wurden als
vorhanden geführt, obwohl sie in Arbeit sind · Doppelorbit und Präzisionsorbit sind
eine exklusive Weiche, keine zwei Karten.

**Aus Fassung 4 (Messungen vom 31.08.):** Das heutige Band ist 34,76 px breit,
nicht 17 — die Rechnung nahm die sichtbare Spitze statt der Trefferschwelle ·
die Ränder sind hüllenbezogen zu definieren, dann ist das Band für jeden
Gegnertyp gleich breit · beide vorgeschlagenen Abstoßgesetze scheitern, das
richtige ist ihr Produkt · `hurtPlayer` taugt nicht als Kontaktmaß, weil es
Projektile mitzählt.

**Aus Fassung 3:** Die Abstoßrate war als gelöst dargestellt, obwohl eine einzige
Rate die Tempospreizung 86 bis 180 px/s nicht bedienen kann — jetzt ausdrücklich
offen · die Charakterisierungsmessung listete nur den Trefferblock, nicht die 21
Reichweiten-Leser und `jaeger.haltNah`.

**Einmal hat das Review überzeichnet:** Es hieß, der Volltreffer sei über alle
Winkel identisch. Gemessen streut er um 23,8 % (328 bis 406 über 24 Winkel). Die
Streuung ist aber Phasenrauschen und nichts Steuerbares — der Schluss stimmt, die
Zahl nicht.
