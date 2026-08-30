# Orbitblade v5 – verbindliche Basis

**Stand: 30.08.2026.** Jede Zahl in Teil A bis C ist an diesem Tag gegen
`konzept/game.js` geprüft oder mit `tools/sim.js` gemessen. Wo Doku und Code
auseinanderliefen, gilt der Code – die Abweichungen sind in Teil C notiert.

Die frühere, chronologisch gewachsene Fassung liegt vollständig in `HISTORIE.md`.
Sie erklärt die Begründungen hinter vielen Entscheidungen und bleibt lesenswert,
ist aber **nicht mehr verbindlich** und wird nicht fortgeschrieben.

---

# Teil A – Was Orbitblade ist

## Zielgruppe

Drei Menschen müssen dasselbe Spiel mögen. Jede Designentscheidung wird an allen
dreien geprüft, nicht nur an einem:

| | Anspruch | Konsequenz |
|---|---|---|
| **Kind, 7** | Muss ohne Lesen spielen können | Ein Knopf startet. Es gibt keine falsche Wahl. Symbole tragen die Bedeutung, nicht Text. |
| **Erwachsene, 40** | Ein Moment am Tag, nicht ein Abend | Ein Lauf ist in einer Sitzung zu Ende. Kein Nachholzwang, keine verfallenden Belohnungen. |
| **Nerd** | Tiefe, Optimierung, Beherrschung | Die Tiefe sitzt im **Kombinationsraum** und im **Langzeit-Freischalten**, nie in der Menütiefe. |

Der Leitsatz dazu: *Tiefe entsteht aus einfachen Eingaben mit großem Ergebnisraum –
nicht aus vielen Bildschirmen.* Die Orbitklinge ist bereits genau das: Position
bestimmt Schaden. Alles, was diesen Kern nicht direkt bedient, steht unter
Rechtfertigungszwang.

## Produktkern

Orbitblade ist ein mobile-first Arena-Roguelite. Die automatisch kreisende
Orbit-Klinge ist der Hauptangriff. Positionierung entscheidet: Die sichtbare Klinge
ist der **Volltreffer** und verursacht deutlich mehr Schaden als die verzeihende
Rundumzone.

## Leitplanken

- Spielspaß zuerst, Monetarisierung zuletzt.
- Die Orbit-Klinge bleibt immer der Hauptangriff. Alles andere verändert nur, wie sie
  genutzt wird.
- **Genau ein aktiver Knopf: die Hauptmacht.** Bewegung und dieser eine Knopf sind die
  vollständige Bedienung. Jede Fähigkeit, die kein Hauptangriff ist, wirkt passiv.
- **Kein Fortschrittsbildschirm im Lauf.** Fortschritt kommt von selbst; die einzige
  Entscheidung im Kampf ist die Auslese.
- Gepanzerte Gegner bleiben.
- Welle 30 ist der Siegpunkt, danach ist Endlos möglich.
- Hilfsstufen sperren keine Inhalte. Bestmarken bleiben je Stufe getrennt.
  *(Einzige Ausnahme: Prüfstufen vergeben Kosmetik. Sie sind die Gegenrichtung der
  Hilfen und geben ausdrücklich niemals Kampfkraft.)*
- Touch-Bedienung und ein verständlicher Einstieg für Kinder bleiben erhalten.
- Keine passiven Füll- oder endlosen Prozentknoten. **Jede Karte und jeder Rang muss
  spürbar *und* sichtbar sein** – die Prüfregel steht in Teil D.
- Fortschritt liegt in `localStorage` unter `orbitblade_konzept_save`.

## Geltungsbereich und Arbeitsregeln

Entwickelt wird ausschließlich v5 unter `konzept/`: `index.html`, `style.css`,
`game.js`. Vanilla HTML/CSS/JavaScript, kein Build, keine Serverpflicht.

- Vor Änderungen `git status --short` prüfen und fremde Änderungen erhalten.
- `archive/` ist historische Ablage und wird ohne ausdrückliche Anweisung weder
  gelesen noch verändert.
- Entscheidungen knapp in **diesem** Dokument aktualisieren, nicht in `HISTORIE.md`.
- **Niemals `git checkout`, `git restore` oder `git stash` auf fremde Dateien anwenden.**
  Nicht committete Arbeit ist damit unwiederbringlich weg. Diese Regel steht hier, weil
  genau das am 30.08.2026 passiert ist und die gesamte Überarbeitung dieses Dokuments
  vernichtet hat.
- Keine Geheimnisse, Tokens oder personenbezogenen Daten einchecken.
- Kein umfangreiches Testnetz. Nach Änderungen genügen `node --check konzept/game.js`,
  eine passende Messung aus `tools/` und der betroffene Klickweg über GitHub Pages.

---

# Teil B – Geprüfter Stand

## Code-Inventar (30.08.2026)

Stand nach Paket 2c-2. Die Ausgangswerte vom Morgen des 30.08. stehen in Klammern.

| | |
|---|---|
| `konzept/game.js` | 6.211 Zeilen (vorher 6.226) |
| `konzept/index.html` | 284 Zeilen · **14 Overlays** (vorher 298 · 15) |
| `konzept/style.css` | 453 Zeilen (vorher 471) |
| Zustände | **7** (`menu`, `playing`, `paused`, `auslese`, `countdown`, `sieg`, `gameover`) |
| `SAVE_VERSION` | 9 |

Der Zustand `tree` und das gesamte Baum-Overlay sind entfallen. Dass `game.js` nur um
15 Zeilen geschrumpft ist, täuscht: Die drei Pakete haben etwa so viel Mechanik
hinzugefügt, wie der Abriss an Bedienoberfläche entfernt hat.

## Systeme

| System | Umfang | Ort im Code |
|---|---|---|
| Hauptmächte | 5 (Wirbel, Schock, Bombe, Nova, Sog), je 1 Evolution | `ACTIVE_IDS`, `EVOLUTIONS` |
| Figuren | 2 (Lichthüter `held`, Leerenklinge `konstrukt`) | `FIGUREN` |
| Orbitpfad | **20 Knoten**, 17 kaufbar bei 15 Punkten — **vollautomatisch**, nur 3 Weichen als Karten | `treeNodes()`, `autoFreischalten()` |
| Auslese | Topf aus 6 Passiven + 5 Modulen = **11 Dinge**, je 2 Karten | `ausleseTopf()` |
| Werkstatt | 16 Projekte | `META_UPGRADES` |
| Hilfsstufen | 3 + 4 freischaltbare Prüfstufen | `HILFEN`, `PRUEFSTUFEN` |
| Bosse | 4 Varianten, je eigene Exklusivmechanik, Phasenwechsel bei 50 % | `BOSS_KINDS` |
| Tageslauf | Datums-Seed, 6 Twists, 6 Regeln, 250 Fragmente einmal je Tag | `tagesSeed()` |

Die **interne ID `konstrukt`** bleibt wegen vorhandener Spielstände bestehen.

## Kernwerte

```
siegWelle 30 · fokusZiel 18 · xpBase 1000 · xpPerLevel 300
REGULAR_POINT_CAP 15 · SPRUNG_STUFE 4
wave: baseCount 5 · perWave 2,55 · hpScale 0,08 · dmgScale 0,08
      schubMin 5 · schubMax 12 · schubRest 0,35 · schubMaxWarten 2600
```

Gegner spawnen seit dem 19.08. in **Schüben**, nicht im Takt: Der nächste Schub kommt,
sobald 35 % des vorigen übrig sind – spätestens nach 2,6 s. Dadurch reagiert die
Wellendauer auf die Tötungsrate des Spielers statt auf einen Timer.

## Gemessenes Laufprofil (Ausgangslage vor Paket 1)

Gott-Bot, Standard, Lichthüter mit Wirbel, kauft in jeder Reihe den ersten kaufbaren
Knoten. Reproduzierbar über `tools/sim.js` mit `search:'?perf=1&god=1'`.

| | mit Baumkäufen | ohne Baumkäufe |
|---|---|---|
| Ergebnis | Sieg, Welle 30, Level 16 | Sieg, Welle 30, Level 16 |
| **Laufzeit** | **15,8 min** | 22,7 min |
| Gegner gleichzeitig, Spitze | 71 | 83 |

**Unterbrechungslast – der zentrale Befund:**

| | |
|---|---|
| Auslese-Stopps | 9 (Wellen 3, 6, … 27) |
| Orbitpunkte, also Baumbesuche | 15 |
| **Stopps gesamt** | **24 → alle 40 Sekunden hält das Spiel an** |
| Bannerzeit | 126,9 s = **13,4 %** der Laufzeit |
| Restejagd (alles gespawnt, höchstens 2 Gegner übrig) | 119,4 s = **12,6 %** |
| Feld mit höchstens 3 Gegnern | 183,7 s = **19,4 %** |

**Wellendauern in Sekunden** (Bosswellen in eckigen Klammern):

```
 1: 8,0   2: 8,3   3:11,1   4:15,5  [5:15,8]  6:16,3   7:16,1   8:21,6   9:22,8  [10:12,3]
11:28,7  12:36,5  13:34,7  14:38,2 [15:13,5] 16:43,7  17:44,9  18:48,6  19:45,5 [20:17,0]
21:36,1  22:46,8  23:55,6  24:42,5 [25:19,1] 26:64,5  27:41,8  28:48,1  29:45,0
```

Zwei Dinge fielen daran auf:

1. **Eine „Welle" war keine Einheit.** Welle 29 dauerte 5,6-mal so lange wie Welle 1.
2. **Bosswellen waren die kürzesten** (12–19 s). Der Bossanteil lag bei rund 8 %.

**Streuung:** Drei Gott-Bot-Läufe ergaben 13,2 / 15,6 / 15,8 min. Rund **18 %
Unterschied allein aus der Ziehung.** Jeder Zielwert für die Lauflänge ist deshalb ein
Korridor, keine Uhrzeit.

## Zeitverteilung im Standardlauf (vor Paket 1)

| Abschnitt | Dauer | Anteil |
|---|---|---|
| Welle 1–5 | 1,0 min | 6 % |
| Welle 6–10 | 1,5 min | 9 % |
| Welle 11–15 | 2,5 min | 16 % |
| Welle 16–20 | 3,3 min | 21 % |
| Welle 21–25 | 3,3 min | 21 % |
| Welle 26–30 | 4,1 min | 26 % |

Die erste Hälfte kostete 5 Minuten, die zweite 10,8 – der Lauf war hinten doppelt so
schwer gewichtet, weil die Gegnerzahl linear wächst (31 bei Welle 10, 144 bei Welle 30),
die Tötungsrate des Spielers aber nicht.

## Endlos – gemessen, nicht behauptet

Endlos läuft mechanisch unbegrenzt weiter, **hört aber bei Welle 40 auf, ein Spiel zu
sein.** Beim Eintritt in Welle 31 friert der reguläre Build ein. Danach kommen genau
drei Echo-Ränge: Welle 31, nach Boss 35, nach Boss 40. Die Auslese ist in Endlos
abgeschaltet (`pruefeAuslese()` steigt bei `wave>=siegWelle` aus).

**Ab Welle 41 trifft der Spieler bis zu seinem Tod keine einzige Entscheidung mehr.**

Gegnerseitig läuft es ungebremst weiter. Die Multiplikatoren in `diffAt()` frieren zwar
bei Welle ~31 ein (`maxT: 1.6`), aber die Grundskalierung `1+(wave−1)·0,08` und die
Gegnerzahl wachsen linear ohne Grenze:

| Welle | Gegner je Welle | Gegner-HP | Gegner-Schaden | Boss-HP |
|---|---|---|---|---|
| 30 | 144 | 4,5× | 5,1× | 5.496 |
| 40 | 194 | 5,7× | 6,5× | 7.012 |
| 60 | 287 | 8,0× | 9,0× | 9.735 |
| 100 | 473 | 12,4× | 14,1× | 15.182 |

Spielerstärke gedeckelt, Gegnerdruck unbegrenzt – **der Tod ist mathematisch
garantiert.** Für einen Score-Angriff ist das richtig; heute ist es aber kein
Score-Angriff, sondern ein Auslaufen.

Dauer (Gott-Bot, alle drei Echo-Ränge gekauft):

| Endlos-Abschnitt | Schnitt je Welle |
|---|---|
| Welle 31–40 | 45 s |
| Welle 41–50 | 53 s |
| Welle 51–60 | 66 s |

Welle 31 bis 60 kostet **27,4 Minuten obendrauf.** Wer bis Welle 60 spielt, sitzt
**41 Minuten am Stück** – ohne jede Möglichkeit, unterwegs sauber aufzuhören und das
Ergebnis zu sichern.

---

# Teil C – Gefundene Abweichungen

Diese Punkte sind der Grund, warum dieses Dokument neu geschrieben wurde. Alle sind
hier bereits korrigiert; die Liste steht, damit niemand die alten Werte aus
`HISTORIE.md` zurückholt.

## Doku beschrieb Code, den es nicht mehr gibt

1. **Orbitpfad.** Die Abschnitte „Form und Punktökonomie" und „Orbitpfad v2" standen
   unverändert als verbindlich im Dokument und beschrieben **14 Knoten mit
   Rangleitern** (Partnerpassiv 2 Ränge, Meisterschaft 3, Resonanz 3, Module je 2).
   Seit Orbitpfad v3 vom 18.08. gilt: **20 Knoten, jeder kostet genau einen Punkt und
   schaltet eine ganze Mechanik frei.** Nur die Orbitkrone hat zwei Ränge.
2. **Wirbel-Meisterschaft.** Der Konzepttext nannte „Fokus-Wirbel erlaubt kurz das
   Durchlaufen kleiner Gegner". Diese Mechanik existiert im Code nicht. Tatsächlich:
   Außenbahn, Kernschlag, Doppelring.
3. **`tools/vollerlauf.js` und `tools/pacing.js` existieren nicht.** Beide wurden in
   den Messanleitungen referenziert. Vorhanden sind `sim.js`, `anker.js`,
   `mess_tageslauf.js`, `mess_juice.js`, `mess_entdecker.js`.
4. **„Sweet Spot"** stand im Konzepttext durchgehend, obwohl der Begriff seit dem
   18.08. im Spiel **„Volltreffer"** heißt. Im Code sind nur noch 9 Kommentare
   betroffen, kein einziger sichtbarer Text – die Umbenennung selbst war korrekt.

## Drei widersprüchliche Zielwerte für dieselbe Größe

Die Lauflänge stand an drei Stellen mit drei Werten: **19–23 min** (Laufpacing),
**11:21** (nach der Verdichtung) und 33,6 → 27,9 min (Bot-Maßstab Tageslauf).
Gemessen am 30.08. vor Paket 1: **15,8 min.**

Die Zunahme gegenüber 11:21 ist erklärbar – die Wellenereignisse vom 25.08. erhöhen
unter anderem die Gegnerzahl (Schwarm mal 1,30). Sie war nur nie nachgemessen worden.

**Ab jetzt gilt genau ein Zielwert: 12–14 Minuten** (siehe Teil D).

## Tote Felder im Code

- `CONFIG.wave.spawnInterval` (580) wird seit der Verdichtung nur noch zugewiesen,
  nie gelesen.
- `CONFIG.jaeger.shootRange` und `en.shootRange` werden seit dem Jagdrhythmus vom
  18.08. nicht mehr gelesen.

Beide bewusst stehen gelassen, aber sie dürfen nicht mehr als Regler behandelt werden.

## Struktureller Widerspruch im Konzept selbst

**Zwei parallele Fortschrittssysteme im Lauf greifen auf dieselben Passiven zu.**
Orbitpfad und Auslese mussten per `ausleseAusschluss()` gegeneinander abgedichtet
werden, damit sie nicht auf derselben Fähigkeit kollidieren. Das ist kein Detail –
es ist die technische Signatur des Befunds „der Baum bremst aus": Zwei Systeme tun
dieselbe Arbeit und halten dafür zweimal das Spiel an.

---
# Teil D – Beschlossene Umbaurichtung

Entschieden am 30.08.2026. Die Richtung steht; Reihenfolge und konkrete Umsetzung
sind Empfehlung.

## Grundsatzentscheidung: ein Knopf, alles andere passiv

Der Spieler bedient künftig genau zwei Dinge: **Bewegung und eine Hauptmacht.**

| | vorher | jetzt |
|---|---|---|
| Bewegung | Joystick / WASD | unverändert |
| Hauptmacht (Aktiv 1) | Knopf 1 | **der einzige Knopf**, Macht wählbar |
| Werkzeug (Aktiv 2) | Knopf 2 | **entfällt** |
| Orbitpfad | Overlay, 15 Punkte verteilen | **entfällt** |
| Auslese | Kartenwahl alle 3 Wellen | **die einzige Entscheidung im Lauf** |
| Passive und Module | wirken von selbst | unverändert |

Damit hat das Spiel noch **einen** Bildschirm, der den Kampf anhält, statt zwei.
Gemessene Stopps je Lauf: **24 → 9.** Statt alle 40 Sekunden hält das Spiel nur noch
alle rund 80 Sekunden an, und zwar immer für dieselbe, wiedererkennbare Sache.

### Warum der Baum wirklich weg kann

Die Sorge wäre, dass mit dem Baum die Tiefe verschwindet. Die Messung sagt das
Gegenteil: Eine Enumeration aller gültigen Kaufreihenfolgen ergab **600 von 600
Läufen erreichen die Orbitkrone** – keine Sackgassen, keine Restpunkte, keine
Fehlentscheidung möglich. Der Baum sah aus wie Optimierung, war aber eine
Reihenfolge-Bestätigung mit 15 Bestätigungsklicks.

Die echte Tiefe sitzt in der Auslese: **2.740 verschiedene Endzustände**, der
häufigste in 0,10 % der Läufe. Sie bleibt, sie wächst (Punkt 5), und sie wird
dadurch die alleinige Bühne für Buildvielfalt.

### Was aus dem Baum wird

Die 20 Knoten und ihre `apply()`-Funktionen **bleiben vollständig erhalten**. Sie
setzen die Laufmechanik an 144 `treeFlags`-Lesestellen; sie zu löschen hieße, den
mechanischen Inhalt des Spiels zu löschen. Entfernt wird nur die Bedienung.

Von den 20 Knoten sind **6 Weichen** (3 Paare) und **14 eine Kette** mit erfüllbaren
Voraussetzungen. Daraus werden zwei getrennte Spuren:

**Spur A – automatisch, 15 Stufen.** Jeder Levelaufstieg schaltet den nächsten Knoten
der Kette frei und zeigt ihn 2 s als Einblendung. Kein Overlay, kein Countdown, kein
Anhalten. Die Kette endet mit der Orbitkrone.

**Spur B – die drei Weichen als Auslese-Karten.** Klingenführung, Mutation der
Hauptmacht und Haltung werden als Kartenpaar gezogen, nicht im Baum geklickt. Sie
sind die drei ersten Auslesen des Laufs (Welle 3, 6, 9), weil Spur A sie voraussetzt.

Zeitlich geht das auf: Welle 3 liegt bei 0,5 min, Welle 6 bei 1,3 min, Welle 9 bei
2,5 min. Die abhängigen Kettenknoten kommen bei Level 1 (0,7 min), Level 3 (2,3 min)
und Level 4 (3,3 min) – jede Weiche fällt **vor** dem Knoten, der sie braucht.

**Wegfallende Bedienung:** `overlay-tree`, `tree-btn`, `renderSkillTree()`,
`renderTreeDetail()`, `drawOrbitLines()`, `treeMeldung()`, `openSkillTree()`,
`closeSkillTree()`, `visibleTreePoints()`, `rueckgaengigTreeKnoten()`,
`blocksCrownBudget()`, `ensureFinalRegularBudget()` und der Zustand `tree`.
Rund 195 zusammenhängende Zeilen plus DOM und CSS.

**Bleibend:** `treeNodes()`, `kaufenTreeKnoten()`, `treeRang()`, `treeStatus()` als
Voraussetzungsprüfung des Automaten. Es wechselt nur der Aufrufer.

### Was der Wegfall von Aktiv 2 kostet

Nichts. Der zweite Slot ist bereits heute optional: `hasSlot2()` hängt am
Werkstattprojekt `Zweite Macht` (1.000 Fragmente), ein frischer Spielstand hat nur
einen Knopf, und `updateActiveButtons()` blendet den zweiten sauber aus.

Die drei Resonanzknoten koppeln heute beide Mächte. Sie besitzen bereits einen
Ersatzpfad ohne zweiten Slot (`treeFlags.resonanzUntil`: Klingenschub statt
Abklingzeitkopplung). Dieser Ersatzpfad wird der Normalfall.

Der Fokus wird dadurch sogar sauberer: Die Sonderregel, dass Aktiv 2 die Ladung nicht
stehlen darf (`doActive`, Zeile 3424), wird gegenstandslos.

**Das Werkstattprojekt `Zweite Macht` entfällt** und wird durch ein Kosmetikprojekt
ersetzt. Bestehende Spielstände mit gebautem Projekt bekommen den Gegenwert erstattet.

---

### Die Hauptmacht muss ein Highlight werden

Mit nur noch einem Knopf trägt die Hauptmacht das gesamte aktive Spielgefühl. Gemessen
trägt sie heute fast nichts.

**Beitrag am Gesamtschaden** (Differenzmessung, gleicher Lauf mit und ohne Knopfdruck,
Welle 20, 16 Gegner, 60 s):

| Macht | Abklingzeit | Einsätze je 12-min-Lauf | Beitrag | Effekt sichtbar |
|---|---|---|---|---|
| Bombe | 5,0 s | 144 | **12 %** | 7,6 % der Zeit |
| Wirbel | 8,0 s | 96 | 5 % | 5,6 % |
| Nova | 9,0 s | 84 | 3 % | 4,1 % |
| Sog | 6,5 s | 120 | 1 % | 5,0 % |
| Schock | 12,0 s | 60 | **−2 %** | 3,2 % |

Drei Befunde daraus:

**1. Schock war aktiv schädlich.** `CONFIG.stossPush` stand auf **120**, die Klinge
reicht rund **72 px**. Der Stoß schob Gegner also aus der eigenen Trefferzone. Das ist
exakt der Fehler, der am 19.08. bei Konterstoß gemessen und von 90 auf **20** korrigiert
wurde — bei Schock hatte ihn nie jemand angefasst. *(In Paket 1 behoben, siehe Teil H.)*

**2. Vier von fünf Mächten haben dieselbe Form.** Wirbel, Schock, Nova und Sog sind
allesamt „sofortiger Kreis um den Spieler", unterschieden nur durch Radius, Farbe und
einen Anhang (stoßen / betäuben / ziehen). Sie tun damit genau das, was die Klinge
ohnehin tut — sie sind zum Kern redundant. Nur die Bombe hat eine eigene Form
(gesetzter Ort mit Zündverzug) und misst prompt als einzige zweistellig.

**3. Ein Knopf, der 144-mal je Lauf gedrückt wird, kann kein Höhepunkt sein.** Der
Effekt ist 350–420 ms sichtbar, insgesamt 3–8 % der Laufzeit. Das ist keine
Inszenierung, das ist ein Tick.

### Die Fokus-Stufe ist bereits die Antwort — und wird verschenkt

Der Fokus existiert genau dafür: Volltreffer laden ihn, ein geladener Einsatz schlägt
deutlich stärker zu und hat eigenen Klang und eigene Optik. Gemessen sind aber
**38–80 % aller Einsätze bereits fokussiert.** Damit ist „fokussiert" der Normalfall
und keine Auszeichnung.

**Beschluss: zwei klar getrennte Stufen.**

- **Der normale Einsatz ist ein Werkzeug**, kein Schadensmittel. Er darf klein und
  häufig sein, denn seine Aufgabe ist das **Anordnen** von Gegnern: Sog hält fest,
  Schock schiebt zurecht, Bombe markiert. Die Klinge macht den Schaden.
- **Der fokussierte Einsatz ist das Highlight.** Deutlich seltener, dafür ein
  Ereignis: **1,5–2 s Effekt statt 0,4 s**, bildschirmfüllend, eigener Klang, kurze
  Zeitlupe. Das `hitstop`-System existiert bereits und ist bei 140 ms gedeckelt.
- **Zielwert: 8–12 fokussierte Einsätze je Lauf** statt heute 25–48.

### Fünf Formen, nicht fünf Farben

| Macht | heute | Zielform |
|---|---|---|
| **Wirbel** | Kreis um den Spieler | bleibt — er ist der Archetyp und darf es sein |
| **Bombe** | gesetzter Ort, Zündverzug | bleibt — die einzige eigene Form, misst am besten |
| **Schock** | Rundumstoß | **gerichtete Welle**; Rückstoß bleibt auf Klingenreichweite begrenzt |
| **Nova** | Ring mit Betäubung | **Säule von oben**, ortsfest statt spielerzentriert |
| **Sog** | zog Gegner an den Spieler | **hält sie auf Klingenabstand fest** |

### Warum Sog der schlechteste Handel im Spiel war

Der Sog versprach, Gegner in die Klinge zu bringen. Nachgerechnet am Code brachte er
sie stattdessen an den Spieler:

| | Entfernung vom Spielermittelpunkt |
|---|---|
| Kontaktschaden greift ab | `en.radius + player.radius + 4` = **40 px** |
| Klinge trifft bis | `bladeLength() + en.radius` = **56 px** |
| **Sog zog auf** | `player.radius + 30` = **48 px** |

Das „sichere Band", in dem die Klinge trifft und der Gegner noch nicht, ist damit
**16 px breit.** Ein Soldat läuft 138 px/s — er durchquert dieses Band in **116 ms**
und überbrückt die 8 px von der Sog-Zielentfernung bis zum Kontaktschaden in **58 ms**.

**Das Band ist gegen bewegte Gegner keine Position, sondern eine Zehntelsekunde.** Der
Sog lieferte eine ganze Gruppe aus 300 px Umkreis an den eigenen Körper und verschaffte
dafür 58 ms Vorsprung — bezahlt mit **1 % Schadensbeitrag**, dem niedrigsten aller fünf
Mächte.

Die Abhilfe steckte bereits im Spiel: Die Mutation `Klingenfessel` hält Gegner kurz auf
Klingenreichweite fest. Genau das ist seit Paket 1 das **Grundverhalten** — der Sog
schafft Gegner nicht heran, er hält sie im Trefferband fest. Erst ein Halten macht aus
116 ms eine echte Position.

**Wichtig für künftige Bewertungen:** Eine frühere Fassung dieses Abschnitts nannte den
Sog „die Blaupause, er misst mit 1 % richtig". Das war falsch. Der niedrige Schaden ist
in Ordnung; der Zug an den eigenen Körper war es nicht.

---

## Das Zeitkonzept

**Bestätigt: 15 Freischaltungen, Standardlauf 12–14 Minuten.**

Lauflänge und Baumtiefe sind hart gekoppelt. Die Orbitkrone landet heute bei Minute
14,3 von 15,8, also bei 90 % des Laufs – sie hängt nicht an der Punktzahl, sondern an
ihrer Voraussetzungskette. Ein 8-Minuten-Lauf ohne Kürzung der Kette würde die Krone
**nie** erreichen und den gesamten Aufbau ins Leere laufen lassen.

### Der Bogen: vier Viertel zu je drei Minuten

| Minute | Wellen | Was passiert |
|---|---|---|
| 0–3 | 1–8 | Form finden: Klingenführung, Mutation, erste Karten |
| 3–6 | 9–16 | Build wird sichtbar: Partner, Module, Haltung |
| 6–9 | 17–24 | Meisterschaft und Evolution – der Build fühlt sich fertig an |
| 9–12 | 25–30 | Krone und Finalboss |

Der entscheidende Unterschied zu heute ist nicht die Gesamtzeit, sondern die
**Gleichverteilung.** Heute kostet das letzte Fünftel viermal so viel Zeit wie das
erste (siehe Teil B). Ziel ist, dass jedes Fünftel des Laufs ungefähr gleich lange
dauert.

Der Hebel dafür ist `CONFIG.wave.perWave` (2,55): Die späte Schwierigkeit soll
stärker aus Gegner*qualität* kommen – Panzer, Jäger, Exploder, Bossverhalten – und
weniger aus Gegner*menge*. Das entlastet zugleich die offene Performancefrage; 71
gleichzeitige Gegner sind auf echter Hardware ungemessen.

### Endlos wird ein Score-Angriff mit Ausstiegen

Heute ist Endlos eine Verlängerung derselben Sitzung ohne Ausstieg und ohne
Entscheidung. Künftig:

- **An jedem Boss, also alle fünf Wellen, bietet das Spiel an: weiter oder aussteigen.**
  Wer aussteigt, sichert Welle, Fragmente und Bestmarke sauber.
- Das erzeugt die Entscheidung, die Endlos heute fehlt: Push your luck. Sie ersetzt
  die Auslese, die dort ohnehin abgeschaltet ist.
- Zielwert: eine Etappe von fünf Wellen kostet 3–5 Minuten. Wer eine Etappe schafft,
  hat einen abgeschlossenen Moment – auch wenn er danach aufhört.
- **Zunächst kein neuer Inhalt nach Welle 40.** Erst muss der Ausstieg existieren,
  sonst verlängert neuer Inhalt nur die Sitzung.

### Der Tageslauf ist kürzer

Heute ist er derselbe 30-Wellen-Lauf mit Seed, Twist und Regel, also 12–15 Minuten.
Künftig **Welle 1–20, rund 7 Minuten**, mit eigener Bestmarke. Das ist der Lauf, den
man vor dem Abendessen macht.

---

## Umsetzungsreihenfolge

**1 → 2 → 3 → 4 → 5.** Begründung: Punkt 1 und 2 sind zusammen wenig Code und
verändern das Spielgefühl sofort. Punkt 3 ist überwiegend Löscharbeit und ergibt sich
zum Teil aus Punkt 2. Punkt 4 braucht eine Speichermigration. Punkt 5 ist
Inhaltsarbeit und setzt auf dem fertigen Fluss auf.

## 1. Wellen sollen ineinander übergehen

**Befund.** Die nächste Welle startet erst, wenn das Feld leer ist
(`konzept/game.js:4935`: `waveSpawned>=waveEnemiesToSpawn && enemies.length===0`).
Jede Welle endet deshalb mit einer Restejagd. Gemessen: **12,6 % Restejagd,
19,4 % fast leeres Feld, 13,4 % Bannerzeit.** Zusammen ist rund ein Viertel des Laufs
Leerlauf oder Ansage.

**Umsetzung.** `wave` bleibt der innere Schwierigkeitstakt, und alle daran hängenden
Systeme bleiben unberührt (Meilensteine, Auslese, Bestmarken, Prüfstufen, Ereignisse).
Nur zwei Dinge ändern sich:

- Die nächste Welle startet, sobald das **Spawn-Budget verbraucht** ist. Reste laufen
  in die neue Welle über.
- Banner nur noch für **Boss, Biomwechsel und Ereignis** – nicht mehr für jede Welle.
  Das senkt die Einblendungen von 29 auf rund 11.

**Später, größerer Schritt:** Bosse laufen ins volle Feld ein statt in ein geleertes.

## 2. Fähigkeitenbaum entfernen, alles passiv

Vollständig oben unter *Grundsatzentscheidung* beschrieben. Kurzfassung: Bedienung
weg, Daten bleiben, 15 automatische Freischaltungen plus drei Weichen als Karten.

## 3. Eine Figur, ein Knopf

**Befund.** Die Figurwahl fällt **vor dem ersten Bild**, also mit null Information –
die schlechteste Art von Entscheidung. Sie verdoppelt zugleich die Balancearbeit:
`figur().id==='held'` steuert allein vier Baumknoten mit je zwei Ausprägungen.

**Umsetzung.** Eine Figur. Der Lichthüter wird der Standardkörper, die Leerenklinge
wird **Skin**. Es geht keine Mechanik verloren:

- Die beiden Startpassive (`Lichtbund`, `Leerenhunger`) wandern in den Auslese-Topf.
- Die vier Haltungen bleiben als Haltungsweiche (Spur B).
- Erstmals können sich beide Identitäten **kombinieren** – der Buildraum wächst,
  statt zu schrumpfen.

`save.figur` wird zu einem Skin-Feld, `SAVE_VERSION` steigt auf 10 mit Migration.

## 4. Deutlich schlankerer Einstieg

**Befund.** 15 Overlays. Der Startbildschirm trägt 8 Bedienelemente. Bis zu neun
Entscheidungen liegen vor dem ersten Bild.

**Umsetzung – ein großer Knopf und zwei kleine.**

```
        ┌──────────────────────┐
        │      S P I E L E N   │   startet sofort mit dem letzten Stand
        └──────────────────────┘
          [ Tageslauf ]  [ Sammlung ]
```

- **Sammlung** trägt alles übrige: Werkstatt, Skins, Abzeichen, Prüfstufen,
  Einstellungen, Hilfe.
- Charakterwahl entfällt (Punkt 3). Aktiv 2 entfällt (Punkt 2). Die Wahl der
  **Hauptmacht bleibt** – sie ist die einzige sinnvolle Vorentscheidung, weil sie den
  ganzen Lauf prägt und der Spieler sie aus Erfahrung trifft.
- **Die Schwierigkeit wird nicht vorher gefragt**, sondern nach dem zweiten Tod
  angeboten („Zu schwer? Probier Entdecker"). Ein Siebenjähriger weiß vorher nicht,
  dass er Hilfe braucht – und ein Erwachsener will nicht gefragt werden.

## 5. Langfristfaktor bauen

**Befund.** Nach 10–13 Siegen sind alle 16 Werkstattprojekte gebaut und Fragmente
sind wertlos. Der Auslese-Topf umfasst 11 Dinge; ein Lauf trägt am Ende 6,66 davon,
also 61 %. Die Sammlung ist nach wenigen Läufen gesehen.

Seit Punkt 2 ist die Auslese die **einzige** Quelle für Buildunterschiede. Damit wird
dieser Punkt tragend, nicht optional.

**Umsetzung – der Langfristfaktor ist der Kartenpool, nicht die Währung.** Genau drei
Ebenen:

| Ebene | Inhalt |
|---|---|
| **Täglich** | Der Tageslauf wird die Vordertür, nicht eine Karte im Menü. Welle 1–20, rund 7 min. |
| **Mittelfristig** | **Kartenkatalog auf rund 30 Dinge**, freigeschaltet durch Taten im Lauf, nicht durch Kauf. |
| **Langfristig** | Prüfstufen 5–8 und die Matrix aus Hauptmacht mal Weichenkombination. Ausschließlich Kosmetik. |

**Kritische Nebenbedingung, aus der Messung vom 18.08.:** Der Katalog darf wachsen,
der **Topf je Lauf nicht.** Gemessen an je 4.000 Kartenfolgen:

| Dinge im Topf | getragen | davon auf Sprungstufe |
|---|---|---|
| 11 (heute) | 6,66 | **2,35** |
| 16 | 7,22 | 1,78 |

Bei 16 gleichzeitig ziehbaren Dingen trägt ein Lauf mehr Fähigkeiten, aber weniger
davon auf der Stufe, auf der die eigentliche Mechanik passiert – ein breiter, flacher
Matschbuild statt eines Charakters. Der Katalog muss deshalb **je Lauf eine Teilmenge
von rund 11 ziehen**, nicht alles anbieten. Das ist das Modell der Götterwahl in Hades.

Fragmente kaufen danach nur noch Kosmetik. Das ist ausdrücklich in Ordnung: Der
Antrieb hängt dann nicht mehr an ihnen.

### Aufnahmeregel: jede Karte muss spürbar und sichtbar sein

Seit die Auslese die einzige Quelle für Buildunterschiede ist, ist eine schwache Karte
kein Schönheitsfehler mehr, sondern eine verlorene Runde. Deshalb gilt für **jeden
einzelnen Rang** – nicht nur je Karte – diese Aufnahmeprüfung:

1. **Spürbar:** Der Rang bewegt am Prüfstand mindestens **15 %** auf einer der beiden
   Achsen, Schaden **oder** Überleben. Eine Karte darf auf einer Achse schwach sein,
   aber nicht auf beiden.
2. **Sichtbar:** Beim Auslösen passiert etwas Eigenes auf dem Bildschirm, das nicht mit
   einem gewöhnlichen Treffer verwechselbar ist – eigene Farbe, eigene Form oder eigene
   Bewegung. **Eine Schadenszahl allein zählt nicht.**
3. **Sichtbar im richtigen Moment:** Der Effekt muss in genau der Lage sichtbar sein,
   in der man die Karte wählt. Eine Heilung, die nur bei Verletzung erscheint, ist beim
   Kauf unsichtbar.
4. **Der Sprung auf Rang 2 besteht beide Prüfungen erneut.** Sonst ist Rang 2 ein
   Prozentkauf und gehört nicht in den Topf.

### Prüfergebnis der elf heutigen Karten (30.08.2026)

Schaden: 16 Gegner auf Klingenreichweite, Welle 20, 20 s, Schnitt aus 3 Läufen.
Überleben: echter Lauf ab Welle 12, sterblich, Median aus 8 Läufen. Die
Schadensachse reproduziert die unabhängige Messung vom 19.08. fast exakt
(Glasklinge +44/+83 gegen damals +43/+82) und gilt damit als validiert.

| Karte | Schaden Neu/++ | Überleben | eigene Optik | Urteil |
|---|---|---|---|---|
| Nachhall | +33 / +92 % | ~0 | Ring + Zahlen | **besteht** |
| Glasklinge | +44 / +83 % | −4 % | Klingenoptik | **besteht** |
| Kettenblitz | +13 / +51 % | ~0 | Blitz + Zahlen | **besteht** |
| Klingenteilung | +24 / +45 % | ~0 | zusätzliche Klinge | **besteht** |
| Konterstoß | +22 / +40 % | +9 % | Partikel + Ring | **besteht** |
| Lebensregen | −0 / −1 % | +5 / **+135 %** | nur Zahl, nur bei Verletzung | Rang 1 tot |
| Nachfassen | +15 / +15 % | ~0 | **keine** | Rang 2 wirkungsgleich |
| Taktschlag | +5 / +8 % | ~0 | Ring + Zahlen | zu schwach |
| Schneide | +3 / +11 % | ~0 | **keine** | zu schwach, unsichtbar |
| Phaser | +0 / +4 % | +5 % | Geschosse | zu schwach |
| Kurzschluss | −1 / −1 % | −8 % | nur der Preis | **auf beiden Achsen negativ** |

**Fünf von elf bestehen. Sechs nicht.**

Der wichtigste Einzelbefund: **Lebensregen ++ verdoppelt die Überlebenszeit (+135 %)**,
wurde auf der reinen Schadensachse aber mit −1 % als tot ausgewiesen. Die Historie
hatte diese Lücke als offen notiert; sie ist damit geschlossen. Wer künftig Karten
bewertet, misst **beide** Achsen — sonst tötet man gute Karten.

### Was mit den sechs geschieht

- **Kurzschluss und Schneide verlassen den Topf.** Schneide ist ein reiner
  Prozentaufschlag ohne eigene Optik — genau das, was Teil G ausschließt. Kurzschluss
  ist strukturell kaputt: Er kauft mehr von den Mächten, die laut Leitplanke
  zweitrangig sind, und bezahlt mit Leben, das erstrangig ist.
- **Phaser bleibt und wird an die Klinge gekoppelt.** Ein Selbstschuss-Turm ist in einem
  Spiel über Positionierung die schwächste denkbare Bauform: Er ignoriert genau das, was
  der Spieler tut. Neu verlassen die Schüsse **die Klingenspitze in Bewegungsrichtung
  der Klinge** — wo man steht und wo die Klinge gerade ist, bestimmt, wohin geschossen
  wird. Rang 2: Jeder Volltreffer feuert einen Zusatzschuss. Optik in Klingenfarbe mit
  kurzer Bogenspur, damit erkennbar ist, dass die *Klinge* schießt.
- **Nachfassen** braucht einen sichtbaren Bereitschaftszustand (leuchtende Klinge) und
  einen Rang 2, der nicht nur Panzerung durchschlägt — gegen ungepanzerte Gegner misst
  er null.
- **Taktschlag** hat die Optik, nur nicht die Wucht. Der Faktor 0,6 auf den Wellenschaden
  ist der Regler.
- **Lebensregen Rang 1** muss etwas tun. Ein Teil der Rang-2-Wirkung wandert nach unten.

Der Topf schrumpft dadurch von 11 auf 9. Das ist unter dem gemessenen Optimum von
rund 11 und macht den Katalogausbau oben nicht optional, sondern zur Voraussetzung.

---

### Karten-Evolution: zwei Karten werden eine dritte

**Der Mechanismus existiert bereits, nur an der falschen Stelle.** `EVOLUTIONS` ist
seit jeher genau das: Hauptmacht + Partnerpassiv ergibt etwas Drittes — Wirbel +
Splitter wird Sturmwirbel, Nova + Phaser wird Nova-Kaskade. Er gilt bisher nur für die
fünf Hauptmächte und steckt im Orbitpfad. Er wird auf den Kartentopf verallgemeinert.

**Form:** Fünf Rezepte, **jede Karte hat genau einen Partner.** Bedingung ist ein
Partner auf **Rang 2** und der andere auf **mindestens Rang 1**. Die Evolution
erscheint dann als goldene Karte in der nächsten Auslese, ersetzt beide Zutaten und
gibt die Plätze im Topf wieder frei.

| Rezept | Ergebnis |
|---|---|
| Klingenteilung + Taktschlag | jede Klinge stößt ihre eigene Welle aus |
| Phaser + Nachhall | Schüsse zerplatzen beim Aufschlag als Druckwelle |
| Kettenblitz + Konterstoß | ein kassierter Treffer entlädt eine Kette über alle Nahen |
| Glasklinge + Lebensregen | verlorenes Leben kehrt als Schaden zurück, Kills füllen auf |
| Nachfassen + Splitter | der verbreiterte Volltreffer schleudert Splitter heraus |

**Damit lösen sich die schwachen Karten von selbst.** Taktschlag, Nachfassen und Phaser
müssen nicht mehr für sich allein tragen — sie sind Zutat. Das ist die Bauform, mit der
Vampire Survivors seine unscheinbaren Gegenstände wertvoll macht: Eine Karte darf
bescheiden sein, wenn sie der Schlüssel zu etwas Großem ist. Die Aufnahmeregel oben
bleibt trotzdem gültig; eine Zutat darf schwach sein, aber nicht wirkungslos.

### Gemessene Auslösung (3.000 Läufe je Fall)

| Spielweise | keine Evo | eine | zwei oder mehr | Schnitt |
|---|---|---|---|---|
| blind, Rezepte unbekannt | 30 % | 56 % | 14 % | 0,84 |
| **gelenkt, Spieler kennt sie** | **0 %** | **22 %** | **78 %** | **1,81** |
| gelenkt + Ziehung hilft nach | 0 % | 0 % | 100 % | 2,00 |

Drei Schlüsse daraus, alle für die Umsetzung verbindlich:

1. **Das System braucht keine neue Zufallstechnik, nur Sichtbarkeit.** Sobald der
   Spieler die Rezepte kennt, feuert in **jedem** Lauf mindestens eine Evolution — mit
   der unveränderten Ziehung von heute. Das Rezept muss also im Spiel stehen: sobald
   eine Karte auf Rang 2 ist, zeigt die nächste Auslese ihren Partner an.
2. **Die Ziehung darf *nicht* nachhelfen.** Die dritte Zeile ist die Falle: Wenn die
   Auslese die fehlende Zutat bevorzugt anbietet, bekommt jeder Lauf garantiert zwei
   Evolutionen — und die Entscheidung verschwindet. Bewusst nicht bauen.
3. **Der blinde Boden ist genau richtig.** Wer nichts weiß und einfach klickt, sieht in
   **70 %** der Läufe trotzdem eine Evolution. Das Kind wird belohnt, ohne etwas
   verstehen zu müssen; der Abstand von 0,84 auf 1,81 ist der Raum, in dem sich Können
   auszahlt. Alle drei Zielgruppen aus Teil A werden damit bedient.

### Kollisionswarnung

Die fünf Hauptmacht-Evolutionen und die fünf Karten-Evolutionen **müssen getrennte
Zutaten verwenden.** Sonst entsteht genau die Kollision, für die `ausleseAusschluss()`
seinerzeit als Pflaster erfunden wurde: Zwei Systeme greifen auf dieselbe Fähigkeit zu
und müssen gegeneinander abgedichtet werden. Konkret betroffen ist Phaser — er ist
heute Novas Partner. Entweder bekommt er ein anderes Kartenrezept, oder Nova bekommt
einen anderen Partner.


---

# Teil E – Werkzeug und Messfallen

## Messfassung im Browser

`?perf=1` schaltet die Messfassung frei: gleitendes Fenster über etwa 90 s mit
Schnitt, P95 und Maximum für Frame, Update und Draw, 18 Phasen, Mengen je Bild,
Verteilung in sechs Klassen und ein Mitschnitt der sechs schlechtesten Bilder.
`perfDump()` liefert dasselbe als JSON, `Shift+P` setzt zurück.

| Schalter | Wirkung |
|---|---|
| `?perf=1&wave=26&pts=15&god=1` | direkt in Welle 26, 15 Punkte, kein Tod |
| `&dpr=100` / `&dpr=150` | DPR erzwingen |
| `&bg=voll` | Hintergrund in voller Auflösung (Standard ist halb) |
| `&gpu=1` | GPU-Leerlauf erzwingen – nur die Zuordnung ist aussagekräftig |
| `Shift+1..8` | Zeichenebenen einzeln abschalten |
| `Shift+H` | Hintergrundauflösung im Lauf umschalten |

**`god=1` wirkt nur zusammen mit `perf=1`** (`PERF_GOD = PERF_DEBUG && …`). Ohne
`perf=1` stirbt der Bot. Ein Messlauf schreibt weder Bestmarke noch Spielstand.

## Headless-Harness

`tools/sim.js` lädt `game.js` mit DOM-, Canvas- und Audio-Stubs in eine VM.
`start({search})`, `run(api, opts)`, `makeOrbitBot(api, {tempoFaktor})`.
Daneben liegen `anker.js`, `mess_tageslauf.js`, `mess_juice.js`, `mess_entdecker.js`.

**Kartenprüfstand – zwei Achsen, nie nur eine.** Karten werden über
`state="auslese"` plus `waehleAuslese({id,kind})` gesetzt, nie über `runModule`
oder `runAbilities` direkt (Glasklinge senkt dort das maximale Leben).

- *Schaden:* 16 Gegner im Ring auf Klingenreichweite, Gegner-HP auf 1e9, Spieler
  stationär, 20 s. Jedes Bild **Zustand und Leben wiederherstellen** – der Spieler muss
  getroffen werden dürfen, sonst zünden Nachfassen und Konterstoß nie, aber der Lauf
  darf nicht enden.
- *Überleben:* echter Lauf ab Welle 12, sterblich, Bot, Median aus mindestens acht
  Läufen. Die Spanne ist groß (9–24 s), erst ab etwa 20 % Abweichung ist es Signal.

## Fallen – jede davon hat schon einmal eine Messung ruiniert

1. **`renderSkillTree()` tötet den Simloop.** Es ruft selbst
   `requestAnimationFrame()` auf und überschreibt damit den einen `rafCb`-Platz des
   Harness. Der Lauf sieht danach aus, als hinge er – tatsächlich simuliert er nicht
   mehr. *Vor jeder Messung mit Baumkäufen `renderSkillTree=function(){};` stubben.*
2. **`figur()` fällt still auf den Lichthüter zurück**, wenn die Leerenklinge nicht
   freigeschaltet ist. Wer Charakterwerte misst, muss `save.unlocks.figur.konstrukt`
   setzen – sonst vergleicht man den Lichthüter mit sich selbst.
3. **Klingenwerte nur über `kaufenTreeKnoten('blade_multi')` messen**, nie über
   `bonuses.blades=2`. Der Schadensabschlag hängt an `treeFlags.doppelorbit`.
4. **Wellendauer nur bei unsterblichem Spieler messen.** Ein Skript, das Leben erst
   nach dem Bild zurücksetzt, misst einen Toten und meldet „Welle endet nie".
5. **Fast alle Zeitfenster hängen an `Date.now()`** und laufen weiter, während ein
   Overlay offen ist. Eine gemeinsame pausierbare Zeitbasis steht im Backlog.
6. **Der Bot kauft keine Baumknoten**, wenn man es ihm nicht sagt. Bot-Zeiten sind
   relativ vergleichbar, nie mit Menschen.
7. **Eine Schadensmessung allein tötet gute Karten.** Lebensregen maß auf der
   Schadensachse −1 % und auf der Überlebensachse **+135 %**.
8. **Ein Überlebensprüfstand darf keine Hinrichtung sein.** Die erste Fassung stellte
   16 Gegner in Körperkontakt und maß 0,7 s Basis; jede Karte sah dann gleich schlecht
   aus. Gemessen wird ein echter Lauf ab einer spielbaren Welle.
9. **Überlebenszeit braucht mindestens 40 Läufe je Zustand.** Neun Läufe ergaben für
   dieselbe Frage einmal −35 % und einmal +18 %; erst bei 40 Läufen kam heraus, dass
   der Unterschied **nicht signifikant** ist (+0,49 s ± 0,64). Standardfehler immer
   mitrechnen und ausweisen.
10. **Der Bot kann Abstandsgefühl nicht bewerten.** Er kreist mit konstantem Radius und
    weicht aus. Fragen der Art „fühlt sich das gefährlich an" gehören auf den Rechenweg
    (Reichweiten, Tempi, Zeitfenster) oder in einen echten Spieltest.
11. **Die Hilfsstufe wird über `save.hilfe` gesetzt, nicht über `hilfeId()`.** `hilfe()`
    liest `save.hilfe` direkt; wer `hilfeId` überschreibt, misst dreimal Standard. Die
    Zuweisung muss **vor** `resetGame()` stehen, weil `startWave()` die Stufe liest.
12. **„Zeit bis zum Tod" sättigt nach unten.** Sobald der Bot am ersten Boss scheitert,
    liefern Standard und Meister denselben Wert. Für Schwierigkeitsvergleiche nur
    `tools/anker.js` verwenden.

## Regressionsanker: `tools/anker.js`

Der verbindliche Anker für Schwierigkeitsänderungen. Misst je Stufe
(Entdecker/Standard/Meister) und je Welle über fünf feste Startwerte und ein
30-Sekunden-Fenster: Schaden je Sekunde, Kills je Sekunde, **Schaden je Kill**,
Gegner gleichzeitig – jeweils Mittelwert mit Standardfehler.

Der Spieler wird jedes Bild wiederhergestellt (Zustand **und** Leben), damit kein
Todeszeitpunkt das Fenster abschneidet. Wie oft das nötig war, steht als `Tode` in der
Ausgabe und zeigt, ob eine Kombination überhaupt überlebbar ist.

Aufruf ohne Argumente: `node tools/anker.js`. Laufzeit rund sieben Minuten.

**Das geprüfte Maß ist `Schaden je Kill`, nicht `Schaden/s`.** Grund: Meister bekommt
Panzergegner ab Welle 5 (`HILFEN.meister.panzerAb`), Standard erst ab Welle 12
(`CONFIG.panzerAbWelle`). Panzer sind zäh (145 statt 60 Leben) **und langsam** (86 statt
138 px/s) — sie senken die Kills *und* den erlittenen Schaden. Auf `Schaden/s` allein
sieht Meister bei Welle 8 deshalb leichter aus als Standard. Erst das Verhältnis beider
Größen — die Strafe je Einheit Fortschritt — zeigt die Härte.

Die Wellen sind **8, 14, 19, 26 — alle bewusst keine Bosswellen.** Eine Bosswelle
(`wave%5===0`) misst einen einzelnen Boss statt Wellendruck; das Skript bricht deshalb
ab, wenn eine solche Welle konfiguriert wird.

### Basiswerte nach Paket 1 (30.08.2026)

`Schaden je Kill`, Mittel aus zwei unabhängigen vollständigen Läufen:

| Welle | Entdecker | Standard | Meister |
|---|---|---|---|
| 8 | 7,6 | 15,3 | 24,0 |
| 14 | 18,6 | 32,2 | 39,3 |
| 19 | 34,8 | 88,1 | 104,4 |
| 26 | 52,0 | 132,9 | 198,3 |

Alle vier Wellen monoton. Die Stufenabstände liegen bei Welle 26 bei **2,5-fach**
(Standard gegen Entdecker) und **1,6-fach** (Meister gegen Standard).

### Auflösungsgrenze — wichtig

Zwei vollständige Läufe desselben Codes weichen im Median um **11 %** voneinander ab,
im Einzelfall bis **26 %**. Ursache ist die bekannte Nicht-Determinismus-Eigenschaft
des Laufs: Der Seed legt die Zufallsfolge fest, aber das Kill-Timing verschiebt, welche
Werte wann verbraucht werden.

**Der Anker erkennt zuverlässig nur Änderungen über etwa 25 %.** Für Struktureingriffe
wie Paket 1 (Laufzeit −28 %) reicht das deutlich. Eine 10-Prozent-Balancekorrektur ist
damit **nicht** nachweisbar – dafür müssten Startwerte und Fenster verdoppelt werden,
was die Laufzeit auf über 20 Minuten treibt. Bewusst nicht getan.

**Eine Monotonieverletzung ist ein Regressionsverdacht und muss geklärt werden, bevor
weitergebaut wird** – aber erst prüfen, ob nicht das Maß oder die Wellenwahl schuld ist.

## Performance – abgeschlossener Befund

Die Ursache des Einbruchs ab Welle 26 war die **Füllrate, nicht die Rechenlast und
nicht die Gegnerzahl.** `update` kostete 0,55 ms, `draw` rund 5 ms; der Hintergrund
füllte den Bildschirm pro Bild acht- bis zehnmal vollständig.

Zwei Maßnahmen, beide umgesetzt und auf dem X1 Carbon bestätigt:

- **Sparmodus-Schwelle** von 26 ms auf 18,5 ms, also rund 54 fps. Die ersten 180
  Kampfbilder eines Laufs sind von der Bewertung ausgenommen, sonst rastet er an
  Aufwärmrucklern ein.
- **Hintergrund in halber Auflösung** (`BG_SKALA` 0,5, also ein Viertel der Fläche),
  Standard. Optisch bei 1:1 kaum unterscheidbar, mittlere Abweichung 1,44 von 255.

Ergebnis: verfehlte Bilder von 28 % über 2,0 % auf **0 %**, Frame max 17,9 ms.

**Ausdrücklich verworfen:** Sprite-Vorrendern der Gegner. Es spart Pfadoperationen,
aber keine Pixel – und es wäre nicht darstellungsneutral, weil Kerne, Augen und
Flossen zeitabhängig animiert sind.

---

# Teil F – Offene Prüfungen

Nicht am Code prüfbar. Alle brauchen echte Hardware oder einen echten Spieler.

| Punkt | Warum offen |
|---|---|
| **Bildrate bei 81 gleichzeitigen Gegnern** | Die Performancearbeit wurde bei 11–13 Gegnern bestätigt. 81 ist nach Paket 1 die gemessene Spitze. Der Befund „Füllrate ist gegnerunabhängig" spricht dafür, dass es trägt – das ist eine Ableitung, keine Messung. **Erster Punkt auf echter Hardware.** |
| **Ton** | Vom Nutzer als schlecht bewertet, nicht nur ungetestet. Die Tonhöhenstreuung vom 25.08. mildert nur die Wiederholung. Lösung offen. |
| **`Glasklinge`: Handel oder Falle?** | Schneidet beim Kauf 40 % der Lebensleiste weg, mitten im Kampf. Wenn es überrascht statt gewählt wirkt, braucht die Karte eine Rückfrage. |
| **Boss-Vorwarnzeit** | `CONFIG.boss.warn` steht unverändert bei 1100 ms, obwohl jede Fähigkeit seit dem 18.08. eine eigene Warnform hat. |
| **Endlos-Ereignisrhythmus** | Ab Welle 31 läuft `(wave−1)%5` weiter. Ob das dort angenehm bleibt, zeigt nur ein echter Endloslauf. |
| **Pixel 9** | Gegenprobe der Performance und Touchprobe der Startmenü-Erweiterungen. |

## Bewusst zurückgestellt

Hangar-Zwischen-Overlay (tot), drei gleichzeitige Bestmarken, kosmetisches
Hangarprestige, Rangmodus, Monetarisierung. `separieren` bleibt mit 0,33 ms die
teuerste Update-Phase; eine Halbierung der Nachbarzellen würde die Reihenfolge der
Positionskorrekturen ändern und ist deshalb zurückgestellt.

---

# Teil G – Bewusste Ausschlüsse

Diese Liste verhindert Rückfälle. Jeder Punkt wurde einmal erwogen und verworfen.

- **Keine zweite aktive Taste.** Es gibt genau einen Knopf: die Hauptmacht. Weder ein
  Werkzeugslot noch ein Charakter-Ultimate kommt zurück.
- **Kein Fähigkeitenbaum als Bedienoberfläche.** Fortschritt wird freigeschaltet, nicht
  verwaltet. Kein Punktekonto, kein Verteilen, kein Rückgängig.
- **Keine Vorentscheidung im Menü außer der Hauptmacht.** Charakter, Schwierigkeit,
  Klingenform und Zweitmacht werden nicht vor dem Lauf abgefragt.
- Keine passiven Füll- oder endlosen Prozentknoten. Jede Freischaltung muss innerhalb
  von 30 Sekunden sichtbar oder spürbar sein.
- Kein Inventar, keine Ausrüstungsseltenheiten, keine weiteren Währungen.
- **Keine neue Währungssenke als Langzeitinhalt.** Die erfolgreichen Roguelites
  (Hades, Slay the Spire, Dead Cells) lösen das über selbstgewählte Schwierigkeit,
  freigeschaltet durch Können statt gekauft. Deshalb Prüfstufen.
- Keine Login-Streaks, keine verfallenden Belohnungen, keine täglichen Pflichtläufe.
- Keine Monetarisierung vor bestätigtem Wiederspielwert.
- Kein umfangreiches automatisiertes Testnetz in dieser Projektphase.

---

# Teil H – Umgesetzt

## Paket 1: Wellenfluss und zwei Reichweitenfehler (30.08.2026)

Drei Änderungen in `konzept/game.js`, 30 Zeilen eingefügt, 12 entfernt.

**1. `CONFIG.stossPush` 120 → 20.** Der Schockstoß schob Gegner aus der eigenen
Klingenreichweite (72 px) heraus — derselbe Fehler, der am 19.08. bei `counterPush`
von 90 auf 20 korrigiert wurde, nur nie an dieser Stelle.

**2. Sog hält statt zu ziehen.** Zielentfernung von `player.radius+30` (48 px, also
58 ms vor dem Kontaktschaden) auf `player.radius + bladeLength()*0.92`. Das Festhalten
über `moduleOrbitUntil` ist jetzt Grundverhalten (900 ms), das Machtmodul verlängert
nur noch auf 1200 ms. Der Halteradius der Umlaufbahn stieg von `.78` auf `.92`.

**3. Wellen gehen ineinander über.** Der Wechsel hängt nicht mehr am leeren Feld,
sondern am verbrauchten Spawn-Budget plus einer Restgrenze (`schubRest`). Bosswellen
behalten die alte Bedingung — ein Boss darf nicht überlaufen werden. Das Wellenbanner
erscheint nur noch beim Zonenwechsel statt 29-mal je Lauf.

### Gemessene Wirkung (Gott-Bot mit Baumkäufen, Standard)

| | vorher | nachher |
|---|---|---|
| **Laufzeit** | 15,8 min | **11,3 min** |
| Restejagd (≤ 2 Gegner) | 12,6 % | **6,3 %** |
| Feld mit ≤ 3 Gegnern | 19,4 % | **10,6 %** |
| Bossanteil an der Laufzeit | 8,2 % | **17,0 %** |
| Wellendauer erste → letzte | 8,0 → 45,0 s | 3,5 → 31,8 s |
| Gegner gleichzeitig, Spitze | 71 | 81 |

Der Leerlauf ist halbiert, und der Bossanteil hat sich verdoppelt — **ohne dass ein
Boss angefasst wurde.** Die normalen Wellen sind geschrumpft, die Bosskämpfe nicht.

### Zwei Befunde, die daraus folgen

**Die Lauflänge liegt jetzt bei 11,3 min und damit unter dem Zielkorridor von 12–14.**
Das ist kein Fehler, sondern die Folge davon, dass nur Leerlauf entfernt wurde.

**Die Stoppdichte wurde vorübergehend schlechter:** 24 Stopps in 11,3 min sind einer
alle **28 s** statt alle 40 s. Der Lauf wurde kürzer, die Unterbrechungen blieben. Das
machte Paket 2 dringender, nicht optionaler.

**Die Bannerzeit sank absolut von 126,9 s auf 98,7 s**, als Anteil stieg sie aber auf
14,5 %. Nach dem Wegfall von 24 Wellenbannern besteht der Rest überwiegend aus
Levelaufstiegs-Ansagen.

### Regressionsprobe — und ein Fehler in der Probe selbst

Geprüft wurde, ob die Schwierigkeitsleiter Schaden genommen hat. Ergebnis: **nein,
die Leiter ist intakt.**

Der erste Anlauf behauptete das Gegenteil, weil die Probe kaputt war: Sie setzte
`hilfeId=function(){return "entdecker";}`. **`hilfe()` liest aber `save.hilfe`, nicht
`hilfeId()`.** Alle drei angeblichen Stufen liefen dadurch als Standard. Richtig
gesetzt (`save.hilfe="entdecker"` **vor** `resetGame()`):

| sterblicher Bot mit Baumkäufen | Welle bei Ende |
|---|---|
| Entdecker | **24** |
| Standard | 5 |
| Meister | 5 |

Entdecker trennt sich sehr deutlich. **Standard und Meister trennen sich nicht** —
beide sterben am ersten Boss bei Welle 5. Das ist kein Balancefehler, sondern eine
Eigenschaft des Maßes: *Zeit bis zum Tod* ist ein Schwellenereignis und **sättigt nach
unten.** Deshalb ist `tools/anker.js` der Anker, nicht ein Laufergebnis.

## Paket 2a: Automatische Freischaltung (30.08.2026)

Der Levelaufstieg kauft den nächsten Kettenknoten des Orbitpfads selbst. Nur die drei
Weichen — Klingenführung, Mutation, Haltung — bleiben eine Entscheidung des Spielers.

**Umsetzung:** neue Funktion `autoFreischalten()` direkt nach `kaufenTreeKnoten()`. Sie
kauft in einer Schleife den ersten Knoten, der weder `exclusiveGroup` noch `endless`
trägt und dessen `treeStatus()` `ready` meldet. `checkLevelUp()` ruft sie auf und meldet
in der Ansage die freigeschalteten Namen statt „+1 Orbitpunkt"; steht ein Punkt für eine
Weiche still, meldet sie „Wähle deinen Weg". `resetGame()` schiebt Startimpuls- und
Tages-Twist-Punkte sofort in die Kette.

Bewusst **nicht** angefasst: `kaufenTreeKnoten()` selbst, der Kronenschutz
`blocksCrownBudget()` und die Endlosknoten. Die Automatik fragt ausschließlich
`treeStatus(...).art==='ready'` ab und kann den Schutz deshalb nicht umgehen. Der
HUD-Knopf steuert sich über `visibleTreePoints()` von selbst: Er erscheint nur noch,
wenn eine Weiche offen ist.

### Gemessene Wirkung (Gott-Bot, Standard, drei Läufe)

| | vor Paket 1 | nach Paket 1 | nach Paket 2a |
|---|---|---|---|
| **Stopps je Lauf** | 24 | 24 | **12** (9 Auslese + 3 Weichen) |
| Abstand zwischen Stopps | 40 s | 28 s | **50–60 s** |
| Laufzeit | 15,8 min | 11,3 min | 10,1 / 11,3 / 12,0 min |
| Orbitkrone erreicht | ja | ja | **ja, alle drei Läufe** |
| Punkte investiert / offen | 15 / 0 | 15 / 0 | **15 / 0** |

Die manuell gewählten Knoten waren in allen Läufen exakt die drei vorgesehenen Weichen
(`orbit`, `power_mod`, `char_route`).

### Strukturprüfung über alle Buildformen

Der Baum sieht je Hauptmacht (Meisterschaft, Module) und je Figur (Haltung,
Klingensynergie) anders aus — eine Sackgasse würde nur in einer bestimmten Kombination
auffallen. Geprüft mit 30 zufälligen Weichenfolgen je Kombination, also **300 Läufen**:

| | Ergebnis |
|---|---|
| Krone erreicht | 300 / 300 |
| Evolution erreicht | 300 / 300 |
| Punkte investiert | immer 15,0 |
| Sackgassen | **0** |

Alle fünf Hauptmächte mal beide Figuren. Die Automatik kommt nirgends ins Stocken.

### Offen für Schritt 2b

Die drei Weichen öffnen weiterhin das Baum-Overlay. Schritt 2b verlegt sie in die
Auslese und entfernt danach `overlay-tree`, `tree-btn`, `renderSkillTree()`,
`renderTreeDetail()`, `drawOrbitLines()`, `openSkillTree()`, `closeSkillTree()`,
`rueckgaengigTreeKnoten()` und den Zustand `tree` — rund 195 Zeilen plus DOM und CSS.

## Zwischenfall: verlorene Dokumentarbeit (30.08.2026)

Ein Bau-Subagent führte unaufgefordert `git checkout` auf `CLAUDE.md` aus und setzte
die Datei damit auf den committeten Stand zurück. Die gesamte Überarbeitung dieses
Dokuments — rund 1.000 Zeilen — war von der Platte gelöscht und musste aus dem
Gesprächskontext rekonstruiert werden.

`konzept/game.js`, `HISTORIE.md` und `tools/anker.js` waren nicht betroffen. Daraus
folgt die Arbeitsregel in Teil A: **niemals `git checkout`, `git restore` oder
`git stash` auf fremde Dateien.** Wer einen Agenten beauftragt, nennt ihm die Dateien,
die er ändern darf, und verbietet ihm ausdrücklich, andere zurückzusetzen.

## Paket 2b: Weichen in die Auslese (30.08.2026)

Gebaut extern durch Codex (günstiges Modell für die Umsetzung, stärkeres Modell für
die Abnahme), gegengeprüft hier.

Die drei Weichen — Klingenführung, Mutation, Haltung — erscheinen nicht mehr im
Baum-Overlay, sondern als **zwei Karten im vorhandenen Auslese-Overlay**. Bleibt nach
`autoFreischalten()` ein Punkt stehen, öffnet `oeffneWeichenAuslese()` die Wahl sofort.

**Umsetzung:** `offeneWeiche()` liefert das Paar der kaufbaren Alternativen;
`ausleseKartenInfo()`, `renderAuslese()` und `waehleAuslese()` bekommen je einen
Weichen-Zweig. Der Neuwürfeln-Knopf wird für Weichen ausgeblendet — eine exklusive
Wahl darf nicht gewürfelt werden. Aufrufe in `checkLevelUp()` (sofort) und in
`startWave()` (Absicherung, falls eine Weiche mit einer Wellen-Auslese zusammenfällt).

**Fallstrick, der in die Spezifikation gehörte:** `svg()` erwartet SVG-Pfadstrings,
Weichenknoten tragen aber ein Textzeichen als Symbol (`Ⅱ`, `┃`, `A`, `B`, `◈`, `☀`).
Ohne Fallunterscheidung (`info.glyph`) bricht die Kartenanzeige.

### Gemessen (Gott-Bot, Standard, drei Läufe)

| | Ergebnis |
|---|---|
| **Baum-Overlay betreten** | **0-mal in allen drei Läufen** |
| Stopps | 9 Karten + 3 Weichen = **12** |
| Laufzeit | 12,8 / 11,2 / 12,0 min |
| Krone / investiert / offen | 1 / 15 / 0 in allen Läufen |

Strukturprüfung über alle fünf Hauptmächte mal beide Figuren, je 20 zufällige
Weichenfolgen (**200 Läufe**): Krone 20/20, Evolution 20/20, genau 3,0 Weichen,
15,0 Punkte investiert, 0 offen — in jeder Kombination.

### Wichtige Korrektur einer früheren Erwartung

Paket 2b senkt die **Stoppzahl nicht** — sie bleibt bei 12. Eine frühere Notiz
sprach von „9 statt 12"; das war falsch. Die Weichen halten das Spiel weiterhin an,
nur eben im selben Bildschirm wie die Karten statt in einem zweiten.

Der Gewinn ist ein anderer und trotzdem der eigentliche: **Es gibt nur noch eine
Oberfläche, die den Kampf unterbricht.** Und das Baum-Overlay ist damit nachweislich
toter Code — Voraussetzung dafür, es zu entfernen.

### Nächster Schritt

Entfernen von `overlay-tree`, `tree-btn`, `renderSkillTree()`, `renderTreeDetail()`,
`drawOrbitLines()`, `treeMeldung()`, `openSkillTree()`, `closeSkillTree()`,
`visibleTreePoints()`, `rueckgaengigTreeKnoten()` und dem Zustand `tree` — rund
195 Zeilen plus DOM und CSS. `treeNodes()`, `kaufenTreeKnoten()`, `treeRang()` und
`treeStatus()` bleiben: Sie sind der Motor der Automatik, nicht Bedienoberfläche.

**Achtung bei Endlos:** Die Endlosknoten `echo_blade`/`echo_power` sind heute die
einzige verbleibende manuelle Baumnutzung (`grantEchoMilestone` ruft `openSkillTree`).
Sie brauchen vor dem Abriss denselben Weg über die Auslese.

## Paket 2c-1: Endlos-Echos über die Auslese (30.08.2026)

Gebaut extern durch Codex, gegengeprüft hier. Damit ruft **keine Spiellogik mehr
`openSkillTree()`** — nur noch die Knopfbindung selbst.

**Der tragende Gedanke:** `istWahlKnoten(node, nodes)` entscheidet, ob ein Knoten
überhaupt eine Entscheidung ist — nämlich nur dann, wenn mindestens zwei Alternativen
seiner `exclusiveGroup` gleichzeitig kaufbar sind. Damit löst sich das Endlos-Problem
von selbst: Echo-Rang 1 ist eine Wahl (Klingenecho gegen Machtecho), die Ränge 2 und 3
sind es nicht mehr, weil die Gegenwahl längst gesperrt ist — die nimmt die Automatik.
Ohne diese Regel bliebe der Spieler ab Rang 2 auf seinen Echo-Punkten sitzen.

`offeneWeiche()` und `autoFreischalten()` unterscheiden jetzt zusätzlich, ob ein Knoten
aus `skillPoints` oder aus `echoPoints` bezahlt wird. `startEndlosmodus()` schiebt
Restpunkte in die Kette, **bevor** `regularTreeFrozen=true` gesetzt wird — danach wären
reguläre Knoten gesperrt.

### Gemessen (Gott-Bot, Sieg plus Endlos bis Welle 43, je drei Läufe)

Geprüft wurden **beide** Weichenzweige, weil ein Bot, der immer die erste Karte nimmt,
den zweiten Pfad nie berührt:

| Wahlverhalten | Baum-Overlay | Krone | Echo-Ränge | offene Punkte | Weichen |
|---|---|---|---|---|---|
| immer erste Karte | **0-mal** | 1 | Klingenecho 3 / Machtecho 0 | 0 | 4 |
| immer letzte Karte | **0-mal** | 1 | Klingenecho 0 / Machtecho 3 | 0 | 4 |

Die Exklusivität hält in beiden Richtungen — nie stehen beide Echos gleichzeitig über 0.
Alle drei Echo-Meilensteine (Welle 31, Boss 35, Boss 40) werden vergeben und verbraucht.
Vier Weichen je Lauf: drei reguläre plus die Echo-Wahl.

### Damit ist der Abriss vorbereitet

`overlay-tree`, `tree-btn`, `renderSkillTree()`, `renderTreeDetail()`,
`drawOrbitLines()`, `treeMeldung()`, `openSkillTree()`, `closeSkillTree()`,
`visibleTreePoints()`, `rueckgaengigTreeKnoten()` und der Zustand `tree` sind jetzt
nachweislich unerreichbar — rund 195 Zeilen plus DOM und CSS.

**Bleiben muss:** `treeNodes()`, `kaufenTreeKnoten()`, `treeRang()`, `treeStatus()`,
`istWahlKnoten()`, `blocksCrownBudget()`, `crownSpineMissingAfter()` und
`regularInvested()`. Das ist der Motor der Automatik, keine Bedienoberfläche.

**`updateTreeButton()` ebenfalls prüfen, nicht blind löschen:** Es wird an acht Stellen
gerufen, unter anderem aus `schliesseAuslese()` und `oeffneWeichenAuslese()`. Entweder
alle Aufrufe mitentfernen oder die Funktion zu einem leeren Rumpf machen.

## Paket 2c-2: Baum-Oberfläche entfernt (30.08.2026)

Gebaut extern durch Codex, gegengeprüft hier. Damit ist der Fähigkeitenbaum als
Bedienoberfläche vollständig verschwunden.

**Entfernt:** `renderSkillTree()`, `renderTreeDetail()`, `drawOrbitLines()`,
`treeMeldung()`, `rueckgaengigTreeKnoten()`, `openSkillTree()`, `closeSkillTree()`,
`visibleTreePoints()`, der Undo-Schnappschuss in `kaufenTreeKnoten()`, die
DOM-Referenzen und Ereignisbindungen, der Zustand `tree`, das Overlay `overlay-tree`
samt HUD-Knopf sowie 18 Zeilen CSS.

**Bewusst stehen geblieben:** `updateTreeButton()` als leerer Rumpf mit Begründung.
Die Funktion wird an **19 Stellen** gerufen, die meisten in Code, der bleibt
(`schliesseAuslese`, `oeffneWeichenAuslese`, `startCombatResume`, `pauseGame` …).
Alle Aufrufe zu entfernen wäre mehr Risiko als Nutzen gewesen.

**Der Motor bleibt vollständig:** `treeNodes()`, `kaufenTreeKnoten()`, `treeRang()`,
`treeStatus()`, `istWahlKnoten()`, `blocksCrownBudget()`, `crownSpineMissingAfter()`,
`regularInvested()`. Diese Funktionen heißen nach „tree", sind aber die Mechanik des
Spiels. **Wer nach `tree` greppt und löscht, zerstört das Spiel — und `node --check`
merkt es nicht.**

### Prüfung ohne Stützräder

Alle bisherigen Messungen mussten `renderSkillTree=function(){};` stubben, weil die
Funktion den Simloop killte (Messfalle 1). Der Abriss wurde deshalb **ohne diesen
Stub** geprüft: Bleibt irgendwo ein Aufruf hängen, wirft der Lauf einen
ReferenceError. `node --check` findet so etwas nicht.

| Prüfung | Ergebnis |
|---|---|
| Standardlauf, 3× | Sieg Welle 30 · 9,9 / 11,1 / 11,8 min · Krone 1 · 15 investiert · 0 offen |
| Karten / Weichen je Lauf | 9 / 3 — unverändert |
| Endlos bis Welle 43, 2× | genau ein Echo auf Rang 3, 0 offene Echo-Punkte |
| Hängende Referenzen | **keine** |

**Messfalle 1 ist damit erledigt** und kann aus Teil E gestrichen werden, sobald
niemand mehr auf einem älteren Stand misst.

### Was der Umbau insgesamt gebracht hat

| | 30.08. früh | jetzt |
|---|---|---|
| Stopps je Lauf | 24 | **12** |
| Abstand zwischen Stopps | 40 s | **50–60 s** |
| Bildschirme, die den Kampf anhalten | 2 (Baum + Auslese) | **1** |
| Laufzeit | 15,8 min | 9,9–11,8 min |
| Restejagd / fast leeres Feld | 12,6 % / 19,4 % | 6,3 % / 10,6 % |
| Bossanteil an der Laufzeit | 8,2 % | 17,0 % |
| Overlays | 15 | 14 |
| Zustände | 8 | 7 |

Damit sind die Punkte 1 und 2 aus Teil D abgeschlossen. Offen bleiben Punkt 3
(eine Figur), Punkt 4 (schlanker Einstieg) und Punkt 5 (Langfristfaktor) — sowie
die Lauflänge, die mit 9,9–11,8 min unter dem Zielkorridor 12–14 liegt.

## Nachtrag: was der erste Blick im Browser fand (30.08.2026)

Alle Messungen des Tages liefen headless. Der erste tatsächliche Klickweg im Browser
förderte prompt zwei Fehler zutage, die kein Bot finden konnte — beide in der
Weichen-Auslese, also in der einzigen Entscheidungsoberfläche des Spiels.

**1. Der Neuwürfeln-Knopf blieb bei Weichen sichtbar.** `renderAuslese()` setzt zwar
`reroll.classList.toggle('hidden', istWeiche)`, aber **es gibt in `style.css` keine
generische `.hidden`-Regel** — jedes Element bringt seine eigene mit
(`#combat-resume.hidden`, `#hud-orbitauftrag.hidden`, `.overlay.hidden`). Die passende
Regel `.tree-btn.hidden` wurde beim Abriss korrekt entfernt, und für den Reroll-Knopf
existierte nie eine. Ein Klick hätte `wuerfleAusleseNeu()` ausgelöst und die
Weichenkarten durch normale ersetzt — **der Orbitpunkt wäre verloren gewesen.**
Behoben mit `#auslese-reroll.hidden{display:none}`.

**2. Die leere Stufen-Plakette blieb als Rahmen stehen.** Weichenkarten tragen kein
„Neu"/„Verstärkt", das `<span class="ak-stufe">` wurde aber weiter gerendert und zeigte
einen leeren Pillen-Hintergrund. Behoben mit `.ak-stufe:empty{display:none}`.

**Die Lehre, die in die Arbeitsregeln gehört:** Ein Zustand, den das JS über eine
CSS-Klasse setzt, ist erst dann geprüft, wenn jemand `getComputedStyle()` gelesen oder
das Bild gesehen hat. `classList.contains('hidden')` war `true`, während `display`
`block` blieb. Headless-Messungen sehen davon nichts, weil `tools/sim.js` gar kein CSS
lädt.

**Empfehlung für künftige UI-Änderungen:** Nach jeder Änderung an einem Overlay einmal
über den lokalen Server (`.claude/launch.json`, Port 8123) den betroffenen Klickweg
ansehen. Das kostet zwei Minuten und hat hier einen Fehler gefunden, der einen
kompletten Orbitpunkt vernichtet hätte.

## Paket 3a: Ein Knopf (30.08.2026)

Der zweite aktive Machtslot ist entfallen. Das Spiel hat jetzt genau einen Knopf:
die Hauptmacht.

**Umsetzung:** `hasSlot2()` gibt fest `false` zurück — das ist der Flaschenhals, denn
`activeSlot2` wird nur an einer Stelle daraus gesetzt. Dazu entfernt: das
Werkstattprojekt `Zweite Macht`, die zweite Hälfte von `updateActiveButtons()`, die
DOM-Referenzen `btnStoss`/`cdStoss`, drei Ereignisbindungen samt Tastaturtaste `2`,
der zweite Knopf in `index.html`, die Regel `.sp-stoss` und die jeweils zweite
Slot-Kachel in Codex und Vorbereitung.

**Speichermigration v9 → v10 mit Erstattung.** Wer das Projekt für 1.000 Fragmente
gebaut hatte, bekommt sie zurück; `meta.slot2` und `startMaechte.slot2` werden
geräumt. Geprüft an einem synthetischen v9-Spielstand: 250 → 1.250 Fragmente, alle
übrigen Projekte, Bestmarken und Abzeichen unangetastet.

**Die drei Resonanzknoten** koppelten früher beide Mächte. Ihr Ersatzpfad ohne
zweiten Slot (`treeFlags.resonanzUntil`: Klingenschub statt Abklingzeitkopplung) war
bereits vorhanden und ist jetzt der Normalfall.

### Gemessen

Standardlauf dreimal: Sieg Welle 30, 10,9–11,2 min, Krone 1, 15 investiert, 0 offen,
9 Karten und 3 Weichen — unverändert. Endlos bis Welle 43 zweimal bestanden. Keine
hängende Referenz.

---

# Teil I – Was das Spielen fand, was Messungen nicht fanden

Am 30.08. wurde der erste echte Spieltest gemacht, nachdem den ganzen Tag headless
gemessen worden war. Er fand in Minuten drei Dinge, die alle Messungen übersehen
hatten. Alle drei gehören zur selben Klasse: **Die Mechanik war umgebaut, die
Oberfläche sprach noch die alte Sprache.**

1. **Die Hilfeseite forderte „Tippe oben rechts auf ✦"** — auf einen Knopf, der beim
   Abriss entfernt worden war. Dazu beschrieb sie pulsierende Knoten und grüne
   Verbindungslinien einer gelöschten Oberfläche.
2. **Neun weitere Textstellen** nannten „Orbitbaum" als Ort oder „Orbitpunkt" als
   Währung — Tages-Twist, Werkstattprojekt, Levelansage, Codex-Kacheln.
3. **Der zweite Machtknopf war noch da.** Konzeptionell seit Punkt 3 beschlossen,
   aber nie gebaut. Ein Spieler sieht so etwas sofort, ein Bot nie.

**Die Regel, die daraus folgt:** Eine Mechanikänderung ist erst fertig, wenn die
Texte mitgezogen sind. `tools/sim.js` liest keine Texte und lädt kein CSS — es kann
diese Fehlerklasse grundsätzlich nicht finden. Nach jeder Änderung an einem System
deshalb `grep` auf die alten Begriffe in `index.html` **und** auf sichtbare Strings
in `game.js`, danach einmal den Klickweg im Browser ansehen.

Der Server dafür steht in `.claude/launch.json` (Port 8123, gitignoriert).

## Paket 3b: Eine Figur (30.08.2026)

Umgesetzt in zwei Schritten.

### 3b-1: Die vier Haltungen von der Figur gelöst

Bisher hingen sie an der gewählten Figur — der Lichthüter bekam Wächter und
Sonnenjäger, die Leerenklinge Verschlinger und Abgrund. Zwei Knoten, deren Inhalt
sich je nach Figur änderte; jeder Spieler sah nur zwei der vier.

Jetzt vier eigenständige Knoten in derselben `exclusiveGroup`. Die Weiche zieht
**zwei davon über den Laufseed**, damit die Karte ihre Form behält: zwei große
Karten statt vier kleiner. Über 40 Seeds erschienen alle sechs möglichen
Kombinationen. `blade_synergy` koppelt an die gewählte Haltung statt an die Figur;
die vier Endformen (Leuchtfeuer, Sonnenorbit, Satter Abgrund, Ereignishorizont)
bleiben vollständig erhalten.

**Der Buildraum wuchs von zwei auf sechs Haltungspaare, ohne einen einzigen neuen
Inhalt.**

### 3b-2: Ein Körper, Identität über die Haltung

Zur Wahl standen zwei Wege. Entschieden wurde **B**:

- **A (Konzeptfassung):** Lichtbund und Leerenhunger werden Auslese-Karten.
  Maximale Vielfalt, aber der Laufbeginn hätte gar keine Identitätsmechanik mehr —
  und genau die ersten Minuten sieht ein Kind am häufigsten.
- **B (umgesetzt):** Der **Lichtbund ist die Grundmechanik des einen Körpers** und
  gilt immer. Der **Leerenhunger hängt an den Haltungen Verschlinger und Abgrund**.
  Wer eine davon wählt, spielt die Leeren-Identität — zusätzlich zum Lichtbund.

Daraus entsteht eine Spannung, die vorher nicht möglich war: Die Basis gibt
Barriere bei vollem Fokus, die Leeren-Haltung belohnt fehlendes Leben.

**Umsetzung, überraschend klein:** `figur()` liefert konstant den Lichthüter. Damit
werden alle `figur().id==='held'`-Abfragen von selbst wahr — der Lichtbund wird zur
Basis, ohne dass eine Zeile daran geändert werden musste. Nur die fünf
`'konstrukt'`-Abfragen wurden auf `hatLeerenhunger()` umgestellt:

```js
function hatLeerenhunger(){ return !!(treeFlags.leerenHeilung || treeFlags.leerenRisikoBonus); }
```

**Die Leerenklinge bleibt sichtbar erhalten.** Die Silhouette hängt an
`currentFigur()`, das weiterhin `save.figur` liest — sie war technisch längst ein
Skin. Die Sammlung hat dafür bereits einen Tab; er heißt jetzt „Körper" statt
„Charaktere" und trägt den Hinweis, dass alle sich gleich spielen. Das
Werkstattprojekt `Leerenprotokoll` schaltet sie weiter frei, nur als Aussehen statt
als Charakter. Deshalb **keine Erstattung nötig** — das Projekt liefert weiterhin
etwas.

**Entfernt:** der Charakter-Tab aus der Vorbereitung. Sie hat jetzt zwei Tabs statt
drei: Hauptmacht und Stufe.

### Gemessen

Standardlauf dreimal Sieg bei Welle 30 (10,7 / 12,1 / 13,0 min), Krone erreicht,
15 Punkte investiert, 9 Karten und 3 Weichen. Endlos bis Welle 43 bestanden.
`hatLeerenhunger()` schaltet korrekt: false ohne Haltung und mit Wächter, true mit
Verschlinger und mit Abgrund. Keine Konsolenfehler im Browser.
