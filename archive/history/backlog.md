# Orbitblade — Backlog

> **Aktualisierung 11.08.2026:** Die isolierte v5 unter `konzept/` wurde getestet und
> als neues Grundkonzept bestätigt. Vor dem nächsten Umbau wurde sie unter
> `snapshots/v5-grundkonzept-vor-umbau-2026-08-11/` gesichert. Der aktuelle
> Entscheidungs- und Analysestand steht in `docs/V5-GRUNDKONZEPT.md`; Claude-Code-
> Arbeitskontext steht in `CLAUDE.md`. Die folgenden älteren Punkte bleiben als
> Historie erhalten, können aber veraltet sein. Bei Widersprüchen gelten die beiden
> neuen Dokumente.

Stand: 9. August 2026, nach dem Mächte-Umbau. Diese Datei listet nur noch **Offenes**.
Die Historie steht im Git-losen Projekt nicht zur Verfügung, deshalb unten eine
Kurzfassung des Erreichten als Kontext.

**Positionierung:** 7-Jährige sollen spielen können, gekauft wird von Teenagern
aufwärts. Modell: niedrige Einstiegshürde, hohe Decke. Einmalkauf, **kein**
Free-to-Play. Vollversions-Schalter: `FULL_VERSION` in `game.js`.

---

## 0. Konzept und Strategie (11.8.2026)

Vollständiges Konzept als eigenes Dokument:
https://claude.ai/code/artifact/27b8f7c3-861b-44a6-9a6b-e21619d08819

Kern: Zielgruppe wird nicht geteilt, sondern über **abschaltbare Hilfen** bedient
(Bushnell's Law / Mario-Kart-Muster; Hilfen sperren nichts, nur Bestmarken werden je
Stufe getrennt geführt). Der **Sweet Spot** wird tragend gemacht statt wegoptimierbar
(schmalere Zonen bei mehr Klingen, gepanzerte Gegner nur dort verwundbar, Fokus-Leiste).
**Welle 30 wird gewinnbar** — ohne Sieg fehlt der Beinahe-Effekt, der das Genre trägt.
Monetarisierung: überall kostenloser Einstieg, Vollpreis 4,99 €, Nachschub über billige
Erweiterungen zu 2,49 € — **keine Kosmetik-Verkäufe** (die brauchen soziale Sichtbarkeit,
die ein Einzelspieler-Spiel nicht hat). Lokaler **Koop** ist zugleich Alleinstellungsmerkmal,
Zielgruppen-Lösung und Verkaufsgeschichte.

## 0a. Rang-System — Langzeitziel nach Welle 30 (besprochen 10.8., beschlossen)

**Problem:** Nach Welle 30 gibt es kein Ziel mehr. Der ursprüngliche Wunsch war „später
starten und mit mehr Macht" — davon wurde abgeraten, weil beim Start ab Welle 20 die
~15 Level-Ups der frühen Wellen fehlen (unspielbar), man den Aufbau also verschenken
müsste, und weil die Bestmarke uneindeutig würde.

**Beschlossen: Ränge nach dem Vorbild von Brotato und Hades** — derselbe vollständige
Lauf, aber härter, mit passender Belohnung.

| | Rang I | Rang II | Rang III |
|---|---|---|---|
| Gegner | normal | +25 % Leben und Tempo | +50 % |
| Fragmente | ×1 | ×1,6 | ×2,4 |
| Startbonus | — | Start auf Level 3 | Level 5 + ? (siehe unten) |
| Exklusiv | — | neue Klingenfarbe | neue Fähigkeit |

Rang II wird durch Welle 30 auf Rang I freigeschaltet, danach analog weiter.

**Zusätzlich:** Bei höheren Rängen die ersten Wellen schneller ablaufen lassen (mehr
Gegner gleichzeitig, mehr XP), damit Veteranen nicht jedes Mal durch einen zähen
Anfang müssen — ohne dass Wellen übersprungen werden.

**ACHTUNG — Rang-III-Belohnung muss ersetzt werden (10.8.).** Ursprünglich war dort
„eine Macht vorgewählt" vorgesehen. Seit dem Startmächte-Bildschirm kann das *jeder*
jederzeit, die Belohnung wäre also wirkungslos. Ersatzvorschläge, wenn wir das Rang-System
angehen: ein **dritter Aktiv-Slot** nur auf Rang III (mechanisch stark, klar spürbar),
oder eine **vorgewählte Passive** — Passive kommen sonst ausschließlich über Level-Ups,
das wäre also ein echtes Privileg, ohne die Vorwahl-Mechanik zu entwerten.

**Bestmarke** muss je Rang getrennt geführt werden, sonst ist sie nicht vergleichbar.

**Verworfene Alternative:** Startwelle wählbar plus Vorbereitungs-Bildschirm, auf dem
man Startmächte mit Fragmenten kauft. Wäre eine gute Fragment-Senke, aber ein
kompletter neuer Bildschirm und macht die Bestmarke uneindeutig.

**Status 10.8.:** Als Einziges der besprochenen Punkte noch nicht gebaut. Alle anderen
Punkte aus der Runde vom 10.8. sind umgesetzt (Stufen-Beschriftung mit Sprüngen,
Begleiter zusammengeführt, Barriere, Einsammeln am Wellenende, Einstellungen).

## 0. Offen aus dem Feedback vom 9.8.

- [ ] **Achievements erweitern** — bewusst vertagt („machen wir wann anders"). Kern:
      Ein Abzeichen soll nur EINMAL angezeigt werden, danach nur noch in der Sammlung.
- [ ] **Balance der Stufen-Sprünge beobachten.** Seit 10.8. gibt jede Macht auf Stufe 4
      einen mechanischen Zusatz (zweiter Wirbelring, Betäubung, zweite Bombe,
      Nova-Nachzünder, doppelte Blitzsprünge, doppelter Konterschub, dritter Splitter,
      Phaser-Doppelschuss, laufende Regeneration). Zum Ausgleich wurde `abilLevelScale`
      von 0,12 auf 0,10 gesenkt. Wenn Stufe 4 zu dominant wirkt: erst den Sprung
      abschwächen, nicht die Prozente — der Sprung ist der Grund, auf Stufe 4 hinzuspielen.

- [ ] **Idee: passive Fähigkeit „Vampirklinge"** — ein kleiner Anteil des
      Klingenschadens heilt. NICHT als Grundmechanik: 0,5 % je Treffer wären ~40 %/s,
      weil die Klinge alle 120 ms trifft. Als Passive mit kleinem Wert und ggf. einem
      Deckel pro Sekunde dagegen ein guter Build-Baustein.
- [ ] **Echtgeld-Shop — ENTSCHIEDEN am 9.8.: ausschließlich Skins und Designs,
      niemals Spielstärke (kein Pay-to-Win).** Avatare als erster Inhalt. Bei
      Kinderpublikum EU-Regeln beachten, rechtliche Prüfung vor Release.
- [ ] Echte Hindernisse mit Kollision. Aktuell bewusst nur Deko: Die Gegner laufen
      stur geradeaus und würden hinter Hindernissen verklumpen — bräuchte Ausweichlogik
      plus Kollision für Spieler und Projektile.

## 1. Design-Schwächen

- [ ] **Werkstatt und Level-Up-Karten bieten dieselben drei Werte** (Schaden,
      Reichweite, Rotationstempo). Die mechanischen Käufe (zweiter Slot, Vorsprung,
      Neu würfeln) sind der bessere Weg — die reinen Wert-Upgrades könnten
      ausgedünnt oder ersetzt werden.

## 2. Inhalte für den Freischalt-Motor

- [ ] **Zweiter Charakter „Wächter"** (mehr Leben, langsamer) — Datenmodell für
      mehrere Charaktere existiert überhaupt nicht.
- [ ] **Härtere Modi als Freischaltung** für Veteranen. Durch die vereinheitlichte
      Schwierigkeitskurve neu zu denken (z. B. Startwelle 10, oder ein Modifikator).
- [ ] Mehr Abzeichen und Klingenfarben als langfristige Ziele.
- [ ] Weitere Entwicklungen, sobald sich die vier bestehenden bewährt haben.

## 3. Optik und Gefühl

- [ ] **Produktionswert bleibt der größte Hebel für die Vermarktung.** Im Store
      entscheidet das erste Standbild; Canvas ohne Assets ist der begrenzende Faktor.
- [ ] Boss-Auftritt spektakulärer inszenieren.
- [ ] Kamera weich nachziehen — bewusst zurückgestellt (Spieler soll zentriert bleiben),
      ggf. sehr mild.

## 4. Veröffentlichung (nichts davon begonnen)

- [ ] **Markenrecherche „Orbitblade"** — Steam, App Stores, DPMA, Domain.
- [ ] Vertriebsweg: itch.io zuerst (HTML5 direkt), später Google Play / App Store
      über Capacitor. Plattform übernimmt Zahlung und Jugendschutz.
- [ ] Rechtliche Prüfung vor Release — Kinderprodukt, EU/DE. Kein F2P, keine Werbung
      an Kinder, keine Lootboxen.

## 5. Technik

- [ ] **`game.js` hat 2303 Zeilen.** Aufteilung in Module wird fällig.
- [ ] Bau und Test: `scratchpad/build.js` fügt die drei Dateien zu einer HTML zusammen,
      `scratchpad/harness.js` lädt das Spiel headless für die Node-Tests. Der
      Artifact-Link bleibt beim Neu-Veröffentlichen gleich.
- [ ] **Browser-Vorschau zwischenspeichert aggressiv** — bei Optik-Prüfungen entweder
      hart neu laden oder Werte zur Laufzeit einspielen und messen.

---

## Erreicht (Kurzfassung)

**Spielkern:** kreisende Klinge mit Sweet Spot (Klingentreffer trifft 3,2× so hart,
optisch laut inszeniert), freie Bewegung mit mitlaufender Kamera, unsichtbarer
Joystick, eine Schwierigkeitskurve statt Auswahl (`diffAt(wave)`), Boss-Tempo
gedeckelt, damit die Flucht aus dem Gefahrenband immer möglich bleibt.

**Mächte:** 4 Aktive, 5 Passive (3 Slots), 2 Waffen-Upgrades, Buff-Stufen bis 5,
**4 Entwicklungen** als Langzeit-Haken (Sturmwirbel, Kettengewitter, Streubombe,
Nova-Kaskade), Codex zum Umrüsten und Nachlesen.

**Fortschritt:** Fragmente fallen direkt, Werkstatt mit Wert- und mechanischen Käufen,
**Begleiter über 5 Stufen** als Langzeit-Senke (sammelt ein und schießt — die früher
getrennten Käufe „Begleiter" und „Kampfdroide" sind seit v4 zusammengeführt),
12 Freischaltungen über Wellen, 9 Abzeichen, 6 Klingenfarben, Speicherstand v4
mit Migration.

**Verständlichkeit:** Info-Bildschirm, Codex mit Slot-Kacheln und Ausblick auf die
nächste Stufe, Level-Up-Karten nennen den konkreten Zuwachs, Einstellungen für Seite
und Anordnung der Fähigkeiten-Knöpfe, **Startmächte-Vorwahl** (gespeichert, gilt für
jeden folgenden Lauf — vorher begann jeder Lauf zwangsweise mit Wirbel).

**Aktive Mächte sind eine Festlegung VOR dem Lauf (11.8.).** Ausrüst-Karten im Lauf
sind entfallen: Gemessen bestanden bei Welle 26 zwei von sechs Karten daraus, sodass
80 % aller Aufstiege eine ungewollte Karte enthielten und dabei die Entwicklungen
verdrängten. Auch der Aktiv-Tausch im Codex ist gesperrt; Passive bleiben tauschbar.
**Offen für später:** Falls sich das späte Spiel dadurch leer anfühlt, als Nächstes die
Werte-Obergrenzen (dmg/range/fireRate) anheben — bewusst NICHT zusammen mit dieser
Änderung gemacht, sonst ist hinterher nicht auslesbar, welche Schraube gewirkt hat.

**Kosmetik:** zwei unabhängige Achsen — 6 Klingenfarben mal **3 Klingenformen**
(Strahl, Wucht, Zwilling) — plus **2 Figuren** mit eigenem Umriss (Klingenläufer,
Konstrukt). Alles rein optisch, keine Werteunterschiede. Freischaltung über die
Wellen 10/15/25, die vorher nur ein Abzeichen trugen.

**Kein Verlust mehr:** Rückfallkarte (ein Aufstieg ist nie wertlos), Ausrüst-Karten für
freigeschaltete, aber nicht getragene Mächte, Barriere aus Lebenskugeln bei vollem
Leben, Einsammeln aller liegengebliebenen Beute am Wellenende.

**Zugänglichkeit:** stufenweise Enthüllung der Menüs, Einstieg im ersten Lauf,
mobile-first Layout mit fließenden Größen, Randpfeile für Gegner außerhalb des Bilds.

**Optik:** 4 Biome, Sternenfeld mit Parallaxe, Nebel, Held und Gegner mit
Animationen, **vier Boss-Varianten** (Wächter, Brutmutter, Rammbock, Spiralwerfer)
mit eigener Farbe, Silhouette und Leitfähigkeit, prozeduraler Sound.
