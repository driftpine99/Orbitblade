# Orbitblade v5 – Umsetzungsplan Galaxie-Kampagne & permanente Progression

**Status:** Verbindlicher Umsetzungsplan für Claude Code  
**Datum:** 07.09.2026  
**Rolle von Claude Code:** Umsetzung / Integration / Prüfung – **keine eigenständige Produktneukonzeption**  
**Planerische Grundlage:** Nutzerentscheidung auf Basis des bestehenden Orbitblade-v5-Konzepts  
**Aktive Spielversion:** ausschließlich `konzept/`  
**Wichtig:** Vor jeder Arbeit zuerst `CLAUDE.md`, `AGENTS.md` und `git status --short` lesen.

---

# 0. Zweck dieses Dokuments

Orbitblade soll von einem primär runbasierten Arena-Roguelite zu einem **Arena-Roguelite mit klarer Galaxie-Kampagne und permanenter Meta-Progression** erweitert werden.

Der bestehende Kampf ist **nicht zu ersetzen**.

Der neue übergeordnete Loop lautet:

> **Planet wählen → Orbitblade-Run → Planet befreien / Fragmente bergen → Held oder Schiff verbessern → tiefer in die Galaxie vordringen**

Die neue Kampagne soll dem vorhandenen Run einen dauerhaften Sinn geben:

> **Der einzelne Run ist eine Schlacht. Die Galaxie ist der Krieg.**

Dieses Dokument beschreibt die gewünschte Produktarchitektur und die Reihenfolge der Umsetzung.  
Claude soll **nicht** versuchen, alles in einem riesigen Patch gleichzeitig zu bauen. Die Umsetzung erfolgt in klar getrennten Phasen, jeweils mit Prüfung.

---

# 1. Verhältnis zu `CLAUDE.md`

`CLAUDE.md` bleibt die zentrale fachliche Quelle des Projekts.

Dieser Plan ist eine **neue explizite Produktentscheidung des Nutzers** und erweitert beziehungsweise ersetzt ältere Aussagen dort, soweit diese mit der neuen Kampagnenrichtung kollidieren.

Insbesondere wird bewusst geändert:

- permanente Fragment-Upgrades sind künftig erwünscht;
- Fragmente dürfen dauerhaft Kampfkraft verbessern;
- langfristige Progression ist nicht mehr nur Kosmetik / Freischaltung;
- die Galaxie-Kampagne wird der primäre Rahmen für normale Runs.

Nicht geändert werden:

- Orbitklinge bleibt Hauptangriff;
- Positionierung / Volltreffer bleiben der Skill-Kern;
- Bewegung + genau ein aktiver Machtknopf;
- kein zweiter aktiver Macht-Slot;
- kein zusätzliches Ultimate;
- kein Inventar- oder Loot-Rarity-System;
- keine zusätzlichen farmbaren Währungen;
- keine tägliche Pflicht;
- keine Monetarisierung als Designvoraussetzung;
- keine automatische Gegner-Skalierung auf die aktuelle Spielerstärke.

Nach jeder fertiggestellten Phase ist `CLAUDE.md` im passenden bestehenden Abschnitt zu aktualisieren:
- Ist-Stand;
- neue verbindliche Zielrichtung;
- neue Daten / Saves;
- neue Prüfwege;
- offene Punkte.

Keine chronologische Patchliste an `CLAUDE.md` anhängen.

---

# 2. Produktversprechen

## 2.1 Neue High-Level-Idee

Der Spieler ist ein mächtiger Held / Orbitwächter.

Eine feindliche Macht kontrolliert große Teile der Galaxie.  
Der Spieler reist mit seinem Raumschiff von System zu System und befreit besetzte Planeten.

Ein normaler Planet entspricht grundsätzlich **einem vollständigen Orbitblade-Run**.

Der Spieler landet nicht, um jeden Gegner des ganzen Planeten persönlich zu vernichten, sondern greift den zentralen **Besatzungskern / Kontrollnexus** der jeweiligen Welt an.

Wird dieser am Ende des Runs zerstört:

- bricht die lokale feindliche Kontrolle zusammen;
- der Planet gilt als befreit;
- lokale Kräfte übernehmen;
- neue Routen / Freischaltungen können entstehen.

Damit bleibt die Arena-Struktur glaubwürdig.

---

## 2.2 Zentrale Fantasien

Das Spiel soll gleichzeitig drei Fortschrittsgefühle erzeugen:

### A. „Ich werde mächtiger“
Der Held ist nach mehreren Stunden objektiv stärker als zu Beginn.

### B. „Ich befreie die Galaxie“
Die Galaxiekarte verändert sich sichtbar durch den Spieler.

### C. „Mein Schiff entwickelt sich“
Das Raumschiff wird zur dauerhaften Basis und wächst funktional sowie visuell.

---

# 3. Unverhandelbare Designregeln

Diese Regeln haben Vorrang vor Detailideen.

## 3.1 Kampf bleibt Orbitblade

Keine neue Kampagnenmechanik darf den eigentlichen Kampf ersetzen.

Der Kern bleibt:

> Bewegung → Orbitklinge positionieren → Volltreffer → Gegner kontrollieren → Hauptmacht einsetzen → Build entwickelt sich

---

## 3.2 Einfache Bedienung bleibt erhalten

Im Kampf:

- Bewegung;
- genau ein aktiver Machtknopf.

Keine:
- zweite Macht;
- dritte Taste;
- Granaten-Slots;
- consumables;
- aktive Schiffsfähigkeiten im Run.

---

## 3.3 Nur eine frei ausgebbare Währung

Die einzige farmbare Meta-Währung bleibt:

# FRAGMENTE

Nicht einführen:

- Credits;
- Kristalle;
- Energie;
- Baupunkte;
- seltene Erze;
- Premiumtoken;
- Craftingmaterialien.

Einzigartige Story-/Boss-Freischaltungen dürfen als Zustandsflag existieren, aber **nicht als zweite farmbare Wirtschaft**.

---

## 3.4 Kein automatisches Player Scaling

Ein Planet besitzt feste Kampfparameter.

Wenn der Held stärker wird, wird ein alter Planet wirklich leichter.

**Niemals**:
- Gegnerwerte anhand der permanenten Heldenstärke hochskalieren;
- gekaufte Upgrades durch dynamische Gegnerskalierung neutralisieren.

---

## 3.5 Run-Build bleibt stärkster Machtmultiplikator

Permanente Upgrades verbessern den Ausgangspunkt.

Die eigentliche Eskalation innerhalb eines Runs entsteht weiterhin durch:

- Auslese;
- passive Mächte;
- Fusionen;
- Klingenführung;
- Mutation;
- Haltung;
- Evolution;
- Krone.

Ein voll entwickelter Held auf Welle 1 darf **nicht** annähernd so zerstörerisch sein wie sein eigener fertiger Welle-30-Build.

---

## 3.6 Kein Pflichtgrind

Der Spieler darf nicht gezwungen werden:

> „Spiele Planet X jetzt achtmal, bevor du weitermachen darfst.“

Fortschritt muss primär entstehen durch:

- neue Planeten;
- normale Niederlagen auf dem aktuellen Ziel;
- Erstbefreiungen;
- Orbitaufträge;
- Tageslauf;
- optionale Welten.

---

## 3.7 Niederlage bringt Fortschritt

Bei Niederlage bleiben verdiente / geborgene Fragmente erhalten.

Aber:

**Sieg muss klar effizienter sein als absichtliches frühes Sterben.**

Der größte Bonus kommt aus:
- spätem Runfortschritt;
- Bossabschluss;
- Erstbefreiung.

---

# 4. Gesamtstruktur des Spiels

Orbitblade besitzt künftig vier Ebenen.

## 4.1 Kampfloop – Sekunden

Bewegen → Orbit positionieren → Volltreffer → Macht → Überleben.

## 4.2 Runloop – Minuten

Kämpfen → XP → Build → Karten → Fusion / Evolution → Boss → Ergebnis.

## 4.3 Meta-Loop – mehrere Runs

Fragmente → permanente Verbesserung → neue Versuche werden leichter / schneller.

## 4.4 Kampagnenloop – Stunden

Planet → System → Sektor → Sektorboss → neuer Warpkern → nächste Region → Finale.

---

# 5. Kampagnenumfang

Für die erste vollständige Fassung als Ziel:

## 5 Sektoren

Gesamt ungefähr:

- **21 notwendige Welten**
- **3 optionale Welten**
- also ungefähr **24 relevante Kampagnenmissionen**

Empfohlene Struktur:

| Sektor | Inhalt |
|---|---|
| 1 | 3 normale Planeten + Sektorboss |
| 2 | 3 normale + 1 optional + Boss |
| 3 | 3 normale + 1 optional + Boss |
| 4 | 3 normale + 1 optional + Boss |
| 5 | 3 normale + 1 Festungswelt + Finalboss |

**Wichtig:** Diese Zahl ist ein Content-Ziel, kein Auftrag, sofort 24 handgebaute Welten in einem Patch zu produzieren.

Zuerst nur ein Vertical Slice von Sektor 1.

---

# 6. Kampagnen-Sektoren – Zielidentität

Arbeitstitel:

| Sektor | Thema | Gameplay-Fokus |
|---|---|---|
| I – Randwelten | zerstörte Kolonien | Einführung / Grundgegner |
| II – Ionennebel | elektrische / instabile Systeme | Jäger / Projektile |
| III – Maschinenmark | Industrie / Maschinen | Panzer / Drohnen / Kontrolle |
| IV – Brennende Systeme | Plasma / Reaktoren | Exploder / Gebietsdruck |
| V – Leerenkern | Raumverzerrung / Zentrum des Feindes | Kombination aller Systeme / Elite / Finale |

Claude soll für den ersten Vertical Slice **nur Sektor I** vollständig spielbar machen.

Die restlichen Sektoren zunächst als Daten-/Strukturvorbereitung nur dann anlegen, wenn dies ohne unnötige Komplexität möglich ist.

---

# 7. Planetenmodell

Ein Planet braucht mindestens folgende logische Eigenschaften:

```text
id
name
sectorId
order / route information
type
status
threat / difficulty band
rewardBase
firstClearBonus
modifier / identity
boss / finalEncounter reference
unlock reward
visual theme
```

Nicht zwingend genau diese Property-Namen verwenden.

Claude soll vorhandene Datenstrukturen prüfen und sich daran anpassen.

Keine parallele unnötige Datenarchitektur bauen.

---

# 8. Planetentypen

Für die erste Kampagnenfassung nur vier Typen.

## 8.1 Befreiungswelt

Normaler Orbitblade-Run.

Ziel:
Welle 30 / bestehender Siegpunkt.

Erfolg:
Planet befreit.

---

## 8.2 Festungswelt

Schwerere Mission mit einer klaren Besonderheit.

Beispiele:
- mehr Elite;
- mehr Panzer;
- höhere Bossdichte;
- schwierige Gegnerkombination.

Keine Modifikatorflut.

---

## 8.3 Anomaliewelt

Optional.

Genau **eine dominante Regel**.

Beispiele:

- mehr Jäger;
- mehr Brutknoten;
- mehr Exploder;
- periodische Gravitationszone;
- Projektile etwas schneller.

Dafür bessere Belohnung / spezielle Freischaltung.

---

## 8.4 Kommandowelt

Sektorabschluss.

Am Ende steht ein klar identifizierbarer Kommandant.

Nach Sieg:

- Sektor befreit;
- neuer Warpkern;
- nächste Region geöffnet.

---

# 9. Planetare Identität

Jeder Planet soll **eine** sofort verständliche Besonderheit haben.

Gute Beispiele:

> PANZERWERFT  
> Viele gepanzerte Gegner.

> JÄGERSTÜTZPUNKT  
> Jäger treten häufiger auf.

> BRUTMOND  
> Mehr Brutknoten.

Schlechte Variante:

> +20 % HP, +15 % Projektiltempo, +10 % Elite, -20 % Heilung, Giftboden, doppelte Exploder.

Nicht bauen.

---

# 10. Schwierigkeitsmodell

Kein pseudoexakter Gesamt-Kampfkraftwert.

Keine Anzeige wie:

> Spieler 438 vs Planet 462

Stattdessen einfache Bedrohungsanzeige:

- I
- II
- III
- IV
- V

oder eine gleichwertige visuelle Skala.

Diese Anzeige ist **Orientierung**, kein Zugangsschutz.

Ein guter Spieler darf schwierige Welten früh schaffen.

Die eigentliche Schwierigkeit wächst durch:

1. moderate Werte;
2. bessere Gegnerkombinationen;
3. mechanische Komplexität;
4. Bosse;
5. besondere Planetenidentität.

Nicht hauptsächlich durch HP-Bloat.

---

# 11. Galaxiekarte

## 11.1 Funktion

Die Galaxiekarte wird der primäre Kampagnenbildschirm.

Sie soll zeigen:

- aktuelle Position / Schiff;
- befreite Planeten;
- erreichbare Planeten;
- gesperrte / feindliche Regionen;
- Bosswelt;
- neue Route nach Sieg.

---

## 11.2 Statusdarstellung

Die konkrete Farbe kann an das vorhandene Design angepasst werden.

Semantik:

- besetzt;
- erreichbar;
- befreit;
- Boss;
- verborgen.

Wichtig:
Der nächste sinnvolle Spielschritt muss ohne Textwand erkennbar sein.

---

## 11.3 Bedienung

Tap / Klick auf erreichbaren Planeten:

öffnet kompakten Pre-Run-Screen.

Nicht mehrere verschachtelte Menüs.

---

# 12. Pre-Run-Screen

Zeigen:

- Planetname;
- visuelles Motiv;
- Bedrohungsstufe;
- eine Besonderheit;
- Fragmentbelohnung;
- Erstbefreiungsbelohnung / Freischaltung;
- Hauptmacht;
- großer Startbutton.

Nicht zeigen:

- zehn Statistiken;
- Iteminventar;
- Schiffsladung;
- Consumables;
- komplexe Loadouts.

---

# 13. Erster Spieler-Run – MUSS sitzen

Dieser Abschnitt ist besonders verbindlich.

Der erste Kampagnenkontakt darf den Spieler nicht mit der Meta erschlagen.

---

## 13.1 Spielstart

Kurze, visuelle Einführung.

Galaxie überwiegend feindlich.

Genau ein klar erreichbarer Planet pulsiert:

# EOS BRAUCHT HILFE

Großer Button:

# BEFREIEN

Keine Werkstatt zuerst.

Keine Schiffsupgrades zuerst.

Kein riesiger Galaxiebaum.

---

## 13.2 Erste Vorbereitung

Nur sinnvolle minimale Wahl.

Empfehlung:

- Wirbel
- oder Schock

Dann:

# START

Keine zusätzliche Konfiguration.

---

## 13.3 Erster Run

Der erste Kampagnenrun ist echtes Orbitblade.

Kein künstliches Minispiel.

Aber:

- geringe Bedrohung;
- gut lesbare Gegnerkombination;
- kein unfairer Spätdruck;
- verständlicher Endboss / Besatzungskern.

Für den **allerersten Kampagnenrun** sollen Auslese / Seed bei Bedarf kontrollierter sein, damit kein chaotisches Erstspielerlebnis entsteht.

Claude soll hier minimal-invasiv arbeiten:
- bestehenden Seed-/Auslesemechanismus prüfen;
- nur falls sauber möglich, einen definierten Tutorial-/Erstlaufpfad ergänzen;
- danach normale Randomisierung.

---

## 13.4 Sieg des ersten Runs

Nicht einfach in das normale Siegmenü springen.

Ablauf:

1. Endgegner / Besatzungskern fällt.
2. kurzer Siegsmoment.
3. Rückkehr / Zoom zur Galaxiekarte.
4. EOS wechselt sichtbar von besetzt zu befreit.
5. neue Route leuchtet auf.
6. Fragmente werden gutgeschrieben.
7. Meldung:

# EOS BEFREIT

Danach:

# HELDENKERN VERFÜGBAR

---

## 13.5 Erster Upgrade-Moment

Nicht sofort alle späteren Systeme zeigen.

Zunächst drei verständliche Optionen:

### KLINGE
mehr Grundschaden.

### LEBEN
mehr maximales Leben.

### MACHT
stärkere Hauptmacht.

Der Spieler muss sich nach dem ersten Sieg **mindestens eine** Verbesserung sicher leisten können.

Danach klare Rückmeldung:

# DEIN HELD IST STÄRKER

Anschließend zurück zur Galaxiekarte.

---

## 13.6 Niederlage im ersten Run

Kein hartes:

# GAME OVER

Kampagnentext:

# RÜCKZUG

Zeigen:

- erreichte Welle;
- geborgene Fragmente;
- Planet bleibt besetzt.

Optionen:

- Held verstärken;
- erneut versuchen.

Der erste Kampagnenversuch muss auch bei einer Niederlage genug Fortschritt liefern, damit der Spieler den Meta-Loop erlebt.

Falls dafür ein einmaliger Starterbonus nötig ist, ist dies erlaubt.

Aber:
Kein wiederholbarer Exploit.

---

# 14. Progressive Einführung der Meta

Nicht alles gleichzeitig freischalten.

Empfohlener Ablauf:

| Zeitpunkt | Neues System |
|---|---|
| Start | Galaxie + normaler Run |
| nach Run 1 | Heldenkern |
| nach Planet 2 | Scanner / Schiff erstmals sichtbar |
| nach Sektor-1-Boss | vollständige Schiffswerkstatt + Warpkern-Konzept |
| ab Sektor 2 | normale Kampagnenfreiheit |

Sektor 1 dient damit als **unsichtbares Tutorial**, ohne wie ein Tutorialmenü zu wirken.

---

# 15. Permanente Heldenprogression

Der aktuelle sichtbare Körper bleibt kosmetisch.

Dauerhafte Kampfkraft hängt **nicht** am gewählten Körper.

Dafür wird ein gemeinsamer:

# HELDENKERN

eingeführt.

---

# 16. Heldenkern – Zielstruktur

Zunächst vier Tracks.

## 16.1 Klingenreaktor

Verbessert:
- Basisschaden der Orbitklinge.

Ziel:
spürbar, aber nicht Run-Build ersetzend.

---

## 16.2 Vitalmatrix

Verbessert:
- maximales Leben.

Keine komplizierten Nebenwerte.

---

## 16.3 Fokusleiter

Verbessert:
- Fokusökonomie.

Mögliche Wirkung:
- Fokus etwas schneller laden.

Nicht so stark, dass fokussierte Einsätze alltäglich werden.

---

## 16.4 Machtkern

Verbessert:
- Grundstärke der gewählten Hauptmacht.

Möglichst globales System, nicht fünf permanente Einzelbäume.

---

# 17. Anzahl Helden-Upgrades

Ziel:

**ungefähr 5 Stufen pro Track**

also ungefähr 20 permanente Heldenkäufe.

Keine endlose:

> Stufe 37 / 100  
> +1 %

Jede Stufe soll relevant wirken.

Spätere Meilensteine dürfen zusätzlich visuell sichtbar werden.

---

# 18. Zahlen für Helden-Upgrades

Noch **keine finalen Balancewerte** hart einbauen, nur eine vorsichtige Startfassung.

Wenn Prozentwerte verwendet werden:

- kleine bis moderate Schritte;
- Gesamtwirkung klar gedeckelt;
- tatsächliche Auswirkungen mit bestehenden Messwerkzeugen prüfen.

Wichtig:
Die neue Meta darf nicht ohne Messung große Multiplikatoren in `CONFIG` verteilen.

Claude soll Startwerte getrennt markieren und später messen.

---

# 19. Raumschiff – klare andere Rolle

Der Held beantwortet:

> Wie stark kämpfe ich?

Das Schiff beantwortet:

> Welche Möglichkeiten habe ich auf meiner Reise?

Das Schiff darf nicht zum zweiten Kampfskilltree werden.

---

# 20. Schiffssysteme

Für die erste Zielarchitektur nur:

## 20.1 Warpkern

- öffnet neue Sektoren;
- wird durch Sektor-Bosse verdient;
- **kostet keine Fragmente**;
- niemals Grindgate.

---

## 20.2 Scanner

Verbessert Informationsqualität.

Später möglich:

- dominante Gegnerart anzeigen;
- besondere Belohnung anzeigen;
- optionale / verborgene Welt sichtbar machen.

---

## 20.3 Bergungsanlage

Erhöht Fragmentausbeute moderat.

Nicht so stark machen, dass mathematisch immer zuerst Bergung gekauft werden muss.

Keine exponentielle Wirtschaft.

---

## 20.4 Drohnenhangar

Bestehenden Begleiter / Drohnenfortschritt hier integrieren.

Nicht zwei parallele Drohnensysteme bauen.

Vorhandene Mechanik suchen und sinnvoll migrieren.

---

# 21. Keine Feldwerkstatt als Pflicht-Gate

Nicht bauen:

> Schiffswerkstatt III erforderlich, um Held III kaufen zu dürfen.

Das erzeugt unnötige Pflichtkäufe.

Heldenstufen können stattdessen über:

- Kampagnenfortschritt;
- befreite Sektoren;
- oder direkt Fragmentkosten

gestaffelt werden.

Möglichst simpel.

---

# 22. Sichtbare Schiffsentwicklung

Schiffs-Upgrades sollen später auch optisch sichtbar werden.

Beispiele:

- größerer Antrieb;
- Scanner;
- angedockte Drohne;
- Bergungsmodule;
- Energieelemente.

**Aber:** Visuelle Detailarbeit erst nach funktionierendem Vertical Slice.

Funktion zuerst, Inszenierung danach.

---

# 23. Fragmentökonomie

## 23.1 Quellen

Fragmente können kommen aus:

- Runfortschritt;
- Bossen;
- Erstbefreiung;
- Orbitaufträgen;
- Tageslauf;
- Endlos;
- optionalen Welten.

---

## 23.2 Belohnungsprinzip

Der Großteil darf **nicht** einfach pro Kill frei farmbar sein.

Empfohlen:

- kleine visuelle Drops im Kampf möglich;
- finale Berechnung / sichere Bergung stark an Runfortschritt koppeln;
- klare Meilensteine / Bossboni;
- Siegbonus;
- Erstbefreiungsbonus.

Ziel:

> Welle 25 und Sieg sind effizienter als Welle 5 wiederholt zu farmen.

---

## 23.3 Niederlage

Geborgene Fragmente bleiben.

Aber Sieg gibt:

- zusätzlichen großen Abschlussbonus;
- Erstbefreiungsbonus;
- Planetstatus;
- eventuell Freischaltung.

Damit ist absichtliches Sterben nie optimal.

---

# 24. Fragmentkosten – Startlogik

Noch nicht final balancen.

Eine mögliche grobe Progression für fünf Stufen:

| Stufe | Startwert |
|---|---:|
| I | 300 |
| II | 700 |
| III | 1.400 |
| IV | 2.500 |
| V | 4.000 |

Nur als Initialwert nutzen, wenn passend.

Vor endgültiger Festlegung:
- aktuelle Fragmentquellen prüfen;
- vorhandene Projektkosten prüfen;
- bestehende Spielstände berücksichtigen;
- mindestens mehrere Kampagnenpfade simulieren.

---

# 25. Upgrade-Pacing

Zielgefühl:

### Früh
alle 1–2 Runs relevante Verbesserung.

### Mitte
ungefähr alle 2–3 Runs.

### Spät
größere Investitionen über mehrere Runs möglich.

Nicht akzeptabel:
5–6 volle Runs ohne sinnvollen Kauf.

---

# 26. Frühere Planeten

Frühere befreite Planeten dürfen erneut gespielt werden.

Das ist erwünscht.

Sie sollen durch Meta-Fortschritt sichtbar leichter werden.

Zielwert zur späteren Prüfung:

> Nach deutlichem Fortschritt können frühe Welten grob 25–35 % schneller werden.

Nicht hart als Codewert implementieren.

Nur als Balancing-Ziel.

Keine Runzeit künstlich verlängern, nur damit ältere Welten immer gleich lang dauern.

---

# 27. Wiederholen alter Welten – Ökonomie

Alte Welten dürfen Fragmentbelohnung geben.

Aber aktuelle / schwierigere Welten sollen pro Minute normalerweise attraktiver sein.

Neue Welten zusätzlich durch Erstbefreiungsbonus fördern.

Keine harte Anti-Farm-Strafe nötig.

---

# 28. Erstbefreiungsbelohnungen

Wichtige Planeten sollen nicht nur Prozentboni geben.

Bevorzugte Rewards:

- neue Hauptmacht;
- neue Klingenoptik;
- Scannerstufe;
- Drohnenmodul;
- neue Karte / Macht im Pool;
- kosmetische Belohnung;
- Warpkern durch Boss.

Nur selten:
kleiner dauerhafter globaler Bonus.

Keine Ansammlung von 30 globalen `+5 %`-Planeteneffekten.

---

# 29. Beispiel für Sektor I – Vertical Slice

Arbeitstitel und genaue Werte dürfen angepasst werden.

## Welt 1 – EOS

Typ:
Befreiungswelt.

Zweck:
erster Kampagnenrun.

Identität:
Basisgegner, sehr verständlich.

Erstbefreiung:
Heldenkern wird geöffnet.

---

## Welt 2 – KRYOS

Typ:
Befreiungswelt.

Identität:
mehr gepanzerte Gegner.

Erstbefreiung:
Scanner wird erstmals erklärt / freigeschaltet.

---

## Welt 3 – VEGA

Typ:
Befreiungswelt.

Identität:
Jäger treten merklicher auf.

Erstbefreiung:
kleine besondere Freischaltung / Drohnenhinweis.

---

## Welt 4 – KOMMANDOWELT

Typ:
Boss.

Identität:
Sektor-Kommandant.

Sieg:
- Sektor I befreit;
- Warpkern erhalten;
- Sektor II sichtbar / zugänglich;
- Schiffssysteme vollständig erklärt.

---

# 30. Story-Rahmen

Keine textlastige Kampagne.

Das Spiel soll auch ohne Lesen verständlich sein.

Story hauptsächlich durch:

- Galaxiekarte;
- Planetenzustand;
- Bossinszenierung;
- visuelle Korruption / Befreiung;
- Schiffsentwicklung;
- kurze Überschriften.

Optionaler Lore-Text darf existieren, ist aber nicht notwendig für Gameplayverständnis.

---

# 31. Antagonist

Früh einen zentralen Feind andeuten.

Nicht mit langen Dialogen.

Genug:

- Silhouette;
- Symbol;
- kurze Übertragung;
- Blick auf Zentrum der Galaxie.

Der Spieler versteht:

> Dort muss ich irgendwann hin.

Die konkreten Namen / Lore noch nicht überentwickeln, bevor der Kampagnenloop bewiesen ist.

---

# 32. Planetensieg – Inszenierung

Der Planetensieg ist einer der wichtigsten neuen Belohnungsmomente.

Zielablauf:

1. finale Begegnung endet;
2. sichtbarer Befreiungsmoment;
3. kurzer Übergang zur Galaxie;
4. feindlicher Planetstatus verschwindet;
5. Planet wird befreit dargestellt;
6. neue Verbindung erscheint;
7. Fragmente werden gutgeschrieben;
8. Erstbefreiungsreward erscheint.

Keine lange Cutscene nötig.

Aber deutlich stärker als nur:

> Sieg +700.

---

# 33. Sektorsieg – Inszenierung

Boss besiegt.

Dann:

# SEKTOR BEFREIT

Sichtbar:
- mehrere Verbindungen werden aktiv;
- feindliche Markierung des Sektors verschwindet;
- neuer Warpkern;
- nächster Bereich erscheint.

Dies ist ein großer Kapitelmoment.

---

# 34. Hauptmächte in der Kampagne

Planeten dürfen unterschiedliche Builds begünstigen.

Aber:

**kein Planet darf eine bestimmte Hauptmacht erzwingen.**

Mehrere Lösungen müssen möglich bleiben.

Kampagne kann vorhandene Hauptmächte nach und nach freischalten.

Bestehende Saves dürfen dabei nichts verlieren.

---

# 35. Bestehende Systeme integrieren

Nicht parallel neu bauen.

## Werkstatt

Bestehende Inhalte prüfen und einordnen:

- Startimpuls → Heldenkern / Kernsystem;
- Blaupausen → Kampagnenfreischaltung / Forschung;
- Begleiter → Drohnenhangar;
- Kosmetik → Sammlung.

---

## Orbitauftrag

Bleibt als dauerhafter Nebenauftrag.

Kann später narrativ als Schiffsauftrag präsentiert werden.

Keine zweite Auftragswährung.

---

## Tageslauf

Bleibt optional.

Narrativ z. B. Notruf / Anomalie.

Darf Fragmente liefern.

Keine Kampagnenpflicht.

---

## Endlos

Bleibt optionaler Leistungsmodus.

Keine Voraussetzung für Kampagnenfortschritt.

---

## Prüfstufen

Langfristig freiwillige Hochbedrohungsvariante.

Nicht notwendig für normalen Kampagnenabschluss.

---

# 36. Navigation – Zielbild

Langfristig einfache Hauptstruktur:

## GALAXIE
Missionen / Planeten.

## WERKSTATT
Tabs:
- Held
- Schiff

## SAMMLUNG
Mächte, Klingen, Kosmetik, Rekorde.

Keine zusätzliche Navigationsebene nur für Kampagne.

Bestehende UI möglichst weiterverwenden und vereinfachen.

---

# 37. Speichermodell

Vor Umsetzung aktuelle `SAVE_VERSION` und Migrationslogik prüfen.

Neue persistente Daten benötigen mindestens:

- befreite Planeten;
- aktueller / höchster Sektor;
- Warpkernfortschritt;
- Heldenkern-Stufen;
- Schiffsstufen;
- Erstbefreiungs-Claims / Unlockflags;
- ggf. Kampagnenintro gesehen;
- ggf. erster Upgrade-Tutorialschritt gesehen.

Bestehende Daten erhalten:

- Fragmente;
- Mächte;
- Projekte;
- Kosmetik;
- Rekorde;
- Hilfsstufe;
- Tageslaufdaten;
- Endlosdaten.

Migration muss:

- verlustfrei;
- idempotent;
- defensiv bei alten Saves

sein.

Kein Save-Wipe.

---

# 38. Umgang mit bestehenden Fragmentbeständen

Nicht blind neue Preise festlegen.

Vor Balanceentscheidung:

1. prüfen, welche Fragmentmengen bestehende Spieler besitzen können;
2. bestehende Projektkosten prüfen;
3. aktuelle Fragmentquellen prüfen;
4. entscheiden, ob alte Projekte integriert / ersetzt / bestehen bleiben.

Keine willkürliche Entwertung von Beständen.

Keine Rücksetzung.

Wenn bestehende Werkstattprojekte durch neue Systeme ersetzt werden:
- konkrete Migration;
- ggf. Erstattung;
- dokumentieren.

---

# 39. Technische Architektur – Leitlinie

Claude soll vor Änderungen im aktiven Code zuerst finden:

- Startmenü / Vorbereitung;
- Spielstart;
- Sieg;
- Niederlage;
- Save;
- Fragmentgutschrift;
- Werkstatt;
- Hauptmachtwahl;
- Level-/Wellenstart;
- Tageslauf / Endlos-Einstiege.

Erst danach Änderungen planen.

**Keine neuen parallelen State Machines**, wenn vorhandene Zustände erweitert werden können.

**Keine neue Framework-/Build-Infrastruktur.**

Vanilla HTML/CSS/JS bleibt.

---

# 40. Datengetrieben statt Copy-Paste

Planeten möglichst datengetrieben definieren.

Nicht pro Planet riesige duplizierte Funktionen.

Planetendaten sollen zentrale Eigenschaften beschreiben.

Kampf benutzt bestehende Systeme mit konfigurierten Overrides.

Wichtig:
Keine generische „God Object“-Abstraktion bauen, wenn einfache Datenobjekte genügen.

---

# 41. Planetmodifikatoren technisch

Planetmodifikatoren sollen gezielt vorhandene Spawn-/Encounter-Parameter beeinflussen.

Keine dauerhaften globalen Mutationen ohne sauberen Reset.

Jeder Run muss nach Ende / Reset wieder Basiszustand herstellen.

Besonders prüfen:

- Neustart;
- anderer Planet;
- Tageslauf;
- Endlos;
- Hilfsstufe;
- Browser Reload.

Keine Kampagnenparameter dürfen in andere Modi „leaken“.

---

# 42. Kampagne und vorhandene Hilfsstufen

Bestehende Hilfen bleiben funktional.

Wenn ein Spieler wiederholt am selben Planeten stirbt, kann später ein dezenter Hinweis erscheinen.

Nicht in Phase 1 zwingend bauen, wenn bestehende Hilfswahl genügt.

Keine Inhalte / Befreiungen durch Hilfsstufe sperren.

---

# 43. Balancingprinzip für permanente Stärke

Ziel:

Meta macht einen Run merklich angenehmer.

Aber:

- Volltreffer bleiben wertvoll;
- Klingenpositionierung bleibt relevant;
- Gegnerwarnungen bleiben relevant;
- Hauptmacht bleibt taktisch;
- Build-Auswahl bleibt wichtig.

Wenn ein Meta-Upgrade dazu führt, dass der Spieler Mechaniken ignorieren kann, ist es zu stark.

---

# 44. Startwerte nicht als endgültige Balance ausgeben

Claude soll bei neuen Zahlen klar unterscheiden:

- Implementierungsstartwert;
- gemessener Wert;
- bestätigter Zielwert.

Neue permanente Boni erst nach Messung als „balanciert“ dokumentieren.

---

# 45. Messung der neuen Meta

Bestehende Tools wiederverwenden.

Benötigte Vergleichspunkte:

## A. Basis-Held
ohne neue Meta-Upgrades.

## B. mittlerer Kampagnenheld
ca. halber Ausbau.

## C. starker Kampagnenheld
später Ausbau.

Messen:

- Zeit bis W30;
- Kills/s;
- erlittenen Schaden;
- Siegquote / Überleben;
- Evolution/Krone-Timing;
- Auswirkung auf einzelne Planetenmodifikatoren.

Nicht nur God-Bot-Zeit als Balancebeweis verwenden.

---

# 46. Wichtige Human-Tests

Nach funktionaler Umsetzung unbedingt manuell prüfen:

## Erster Run
Versteht ein neuer Spieler:
- welcher Planet spielbar ist?
- wie gestartet wird?
- was Fragmente sind?
- dass der Planet befreit wurde?
- dass er jetzt stärker werden kann?

## Nach Niederlage
Ist klar:
- dass Fortschritt erhalten blieb?
- was jetzt zu tun ist?

## Nach Sektor I
Ist klar:
- dass der nächste Sektor offen ist?
- warum das Schiff relevant ist?

---

# 47. Zielgruppe Kind

Alle zentralen Abläufe müssen ohne viel Text verständlich sein.

Tests:

- großer klarer Planet;
- großer Startknopf;
- Symbole;
- klare Farben;
- kein Economy-Slang;
- keine komplizierten Tooltipketten.

Eine 7-jährige Person soll erkennen:

> Rot = böse / besetzt  
> Grün = geschafft  
> großer Gegner = Boss  
> Fragmente = damit werde ich stärker

---

# 48. Nicht bauen – Scope Guard

Explizit **nicht** Teil dieser Kampagnenerweiterung:

- Raumschiffkämpfe;
- Flottenmanagement;
- Crewmanagement;
- Crafting;
- Items;
- Waffenraritäten;
- Lootboxen;
- Offlineproduktion;
- Basebuilding;
- Planetenressourcen;
- Energie zum Starten;
- Wartezeiten;
- tägliche Login-Streaks;
- PvP;
- Gilden;
- Multiplayer;
- mehrere Währungen;
- große Storydialoge;
- 100-stufige Skilltrees;
- automatische Gegner-Skalierung;
- dynamische prozedurale Galaxie als erste Version.

---

# 49. Umsetzung in Phasen

## PHASE 0 – Bestandsaufnahme

Noch keine Gameplayänderung.

Aufgaben:

1. `CLAUDE.md` lesen.
2. `git status --short`.
3. aktive Dateien prüfen.
4. Save-Struktur dokumentieren.
5. Fragmentquellen / Werkstatt / Sieg / Niederlage finden.
6. vorhandene Navigation verstehen.
7. minimalen technischen Integrationsplan formulieren.

Ergebnis:
kurze technische Notiz, wo angeschlossen wird.

Keine neue Infrastruktur.

---

## PHASE 1 – Kampagnen-Vertical-Slice ohne neue Meta-Balance

Ziel:
Ein Planet kann auf Galaxiekarte gewählt, gespielt und dauerhaft befreit werden.

Umfang:

- einfache Galaxiekarte;
- EOS;
- Start vom Planeten;
- normaler Run;
- Sieg setzt Planet auf befreit;
- Niederlage lässt Planet besetzt;
- Rückkehr zur Karte;
- persistenter Status;
- vorhandene Fragmentbelohnung zunächst weiterverwenden;
- kein Schiffsausbau;
- noch keine finale Wirtschaft.

Abnahme:
kompletter Loop funktioniert über Reload.

---

## PHASE 2 – Heldenkern

Ziel:
Erster echte permanente Kampfkraft-Loop.

Umfang:

- Klinge;
- Leben;
- Macht;
- Fokus später oder direkt, falls UX sauber bleibt;
- Stufenpersistenz;
- Boni sauber zentral in bestehende Werte integrieren;
- erster Upgrade-Moment nach EOS;
- Niederlage kann ebenfalls zum ersten Upgrade führen.

Noch keine großen visuellen Effekte.

Abnahme:
Upgrades verändern reale Werte und sind nach Reload erhalten.

---

## PHASE 3 – Fragmentökonomie

Ziel:
Sieg / Niederlage / Erstbefreiung sinnvoll belohnen.

Umfang:

- sichere Bergung;
- Runfortschritt;
- Bossbonus;
- Erstbefreiungsbonus;
- Kostenkurve;
- Altbestand berücksichtigen;
- Farming-Exploit prüfen.

Abnahme:
neue Welt ist normalerweise lohnender als absichtliches Frühsterben.

---

## PHASE 4 – Sektor I vollständig

Ziel:
Ersten vollständigen Kampagnenbogen beweisen.

Welten:

- EOS;
- KRYOS;
- VEGA;
- Kommandowelt.

Zusätzlich:

- unterschiedliche Gegneridentität;
- Route;
- Sektorboss;
- Sektorabschluss;
- Warpkern;
- nächster Sektor sichtbar.

Abnahme:
neuer Spieler kann Sektor I komplett spielen.

---

## PHASE 5 – Schiff

Ziel:
Schiff bekommt eigene Funktion.

Umfang:

- Scanner;
- Bergung;
- Drohnenhangar;
- Warpkern als Bossfortschritt;
- Integration bestehender Begleitermechanik.

Keine Feldwerkstatt-Gates.

Abnahme:
Schiff beantwortet klar eine andere Frage als Heldenkern.

---

## PHASE 6 – UX / Inszenierung

Erst nach funktionalem Meta-Loop.

Umfang:

- bessere Galaxievisualisierung;
- Befreiungsanimation;
- Sektorsieg;
- Fragmentflug;
- sichtbare Schiffselemente;
- klare Icons / kurze Texte.

Performance prüfen.

---

## PHASE 7 – Weitere Sektoren

Erst wenn Sektor I Spaß macht.

Dann:

- Sektor II–V;
- optionale Welten;
- zusätzliche Identitäten;
- neue Bosskombinationen;
- Content-Unlocks.

Nicht vorher massenhaft Content produzieren.

---

# 50. Reihenfolge innerhalb jeder Phase

Claude soll pro Phase:

1. vorhandenen Codepfad finden;
2. minimalen Eingriff definieren;
3. implementieren;
4. Syntaxprüfung;
5. relevante vorhandene Regressionstests;
6. gezielte neue Prüfung;
7. manuelle Sicht-/Klickprüfung;
8. `CLAUDE.md` aktualisieren;
9. Diff kontrollieren.

Keine Commits / Pushes ohne Nutzerauftrag.

---

# 51. Tests pro Phase

Mindestens weiterhin:

```powershell
node --check konzept/game.js
node tools/pruefe_maechte.js
node tools/sim.js --god --minutes=20
```

Nur soweit das vorhandene Tool tatsächlich zur Änderung passt.

Zusätzlich gezielte Kampagnentests aufbauen, aber kein riesiges Testframework.

Mindestens testen:

- frischer Save;
- bestehender Save;
- Sieg;
- Niederlage;
- Reload;
- Planetenwechsel;
- Start eines normalen Runs;
- Tageslauf;
- Endlos;
- Hilfsstufe;
- Fragmentgutschrift;
- Upgrade persistiert;
- Planetstatus persistiert;
- kein Modifier-Leak.

---

# 52. Save-Migration – Abnahmekriterien

Migration muss mindestens folgende Fälle bestehen:

### Fall A
frischer Spieler.

### Fall B
aktueller SAVE_VERSION-12-Spielstand.

### Fall C
Save mit bestehenden Fragmenten.

### Fall D
Save mit freigeschalteten Hauptmächten / Kosmetik / Projekten.

Erwartung:
keine vorhandene Freischaltung verschwindet.

---

# 53. Erster-Run-Abnahmekriterien

Die Kampagne ist **nicht** abgenommen, wenn der technische Loop zwar funktioniert, aber der erste Spielerfluss unklar ist.

Akzeptanz:

- ein neuer Spieler sieht sofort den ersten Planet;
- maximal ein klarer primärer Call-to-Action;
- erster Run startet ohne Meta-Menüarbeit;
- Sieg zeigt sichtbar die Befreiung;
- Niederlage zeigt sichtbar erhaltenen Fortschritt;
- spätestens danach erlebt der Spieler sein erstes permanentes Upgrade;
- nächste Mission ist offensichtlich;
- keine neue Währung muss erklärt werden;
- kein Textblock ist für den Fortgang nötig.

---

# 54. Kampagnen-Abnahmekriterien Sektor I

Sektor I gilt als gelungen, wenn:

1. vier Missionen spielbar sind;
2. jede eine erkennbare Identität besitzt;
3. Planetstatus korrekt persistiert;
4. Helden-Upgrades funktionieren;
5. Fragmentökonomie grob trägt;
6. kein Pflichtgrind notwendig ist;
7. Sektorboss den nächsten Bereich öffnet;
8. alte Missionen erneut spielbar bleiben;
9. neue Meta den Orbit-Skillkern nicht trivialisiert;
10. Tageslauf / Endlos nicht kaputtgehen.

---

# 55. UX-Abnahmekriterien

Auf Mobilgerät:

- Galaxiekarte gut tappbar;
- kein horizontales Mikroscrolling für zentrale Aktionen;
- Planetstatus sofort erkennbar;
- große Buttons;
- keine kleine Texttabelle;
- Werkstatt einfach;
- keine überlagernden Modals;
- Touch-Abbruch / Pause / Tabwechsel weiterhin korrekt.

---

# 56. Performance

Die Kampagnenkarte darf nicht dazu führen, dass große Mengen animierter Partikel / Canvasobjekte dauerhaft laufen.

Meta-Screens möglichst leichtgewichtig.

Im Kampf keine neuen permanenten Partikelkosten nur aufgrund von Meta-Upgrades.

Visuelle Meilensteine später gezielt hinzufügen und auf Zielgerät prüfen.

---

# 57. Umgang mit offenen Designfragen

Claude Code ist in diesem Projekt das Arbeitstier, nicht der primäre Produktplaner.

Daher:

Wenn eine Detailfrage während der Umsetzung auftaucht:

## Claude darf selbst entscheiden:
- Property-Namen;
- kleine UI-Anordnung;
- interne Helfer;
- Datenstrukturdetails;
- defensive Migration;
- technische Vereinfachungen ohne Produktwirkung.

## Claude soll NICHT eigenständig ändern:
- Anzahl Währungen;
- Kampagnenloop;
- permanentes Scaling-Prinzip;
- Rolle des Schiffs;
- Anzahl aktiver Knöpfe;
- neue Pflichtsysteme;
- neue große Skilltrees;
- Gegner automatisch mitskalieren;
- Grindgates;
- Storyumfang;
- neue Kernmechanik.

Wenn eine solche Produktfrage technisch unvermeidbar wird:
bestehendes Verhalten erhalten und als offenen Punkt dokumentieren, statt das Spiel neu zu designen.

---

# 58. Prioritäten

Reihenfolge der Produktpriorität:

## P0
Der erste Planet-Run → Befreiung → Fragment → Upgrade → nächster Planet muss Spaß machen.

## P1
Sektor I muss als vollständiger Bogen funktionieren.

## P2
Permanente Progression muss spürbar, aber nicht dominierend sein.

## P3
Schiff muss sinnvoll sein.

## P4
Inszenierung / Polish.

## P5
Weitere Sektoren und Langzeitcontent.

Keine Arbeit an P4/P5, wenn P0/P1 nicht überzeugend sind.

---

# 59. Erfolgskriterium des gesamten Projekts

Nach mehreren Stunden soll der Spieler:

- auf eine sichtbar befreite Galaxie zurückblicken;
- ein ausgebautes Schiff besitzen;
- einen deutlich stärkeren Helden besitzen;
- frühe Welten wesentlich leichter schlagen können;
- trotzdem auf späten Welten Positionierung und Buildplanung brauchen.

Das Gefühl soll sein:

> **Ich habe mich von einem einzelnen Kämpfer zu dem Helden entwickelt, der diese Galaxie wirklich befreien kann.**

---

# 60. Produktpitch

> **Orbitblade ist ein mobiles Arena-Roguelite, in dem der Spieler Planet für Planet eine besetzte Galaxie befreit. In jedem Run entwickelt er aus Orbitklinge, Hauptmacht und automatischen Mächten einen spektakulären Build. Siege und selbst Niederlagen bringen Fragmente, mit denen der Held dauerhaft stärker und das Raumschiff leistungsfähiger wird. Frühere Welten werden dadurch sichtbar leichter, während neue Sektoren immer gefährlichere Gegnerkombinationen und Bosse bringen. Der Run bleibt der Kampf – die Galaxie gibt ihm einen Zweck.**

---

# 61. Konkreter Auftrag an Claude Code

Beginne **nicht** mit allen fünf Sektoren.

Beginne mit:

## Phase 0
Bestandsaufnahme.

Danach:

## Phase 1
Minimaler Kampagnen-Vertical-Slice mit **EOS**.

Erst wenn dieser Loop vollständig funktioniert:

> Galaxie → EOS → Run → Sieg/Niederlage → Rückkehr → persistenter Status

Phase 2 beginnen.

Nach jeder Phase:

- prüfen;
- sichtbaren Flow testen;
- `CLAUDE.md` aktualisieren;
- offene Balancewerte als Startwerte kennzeichnen;
- keine unbeauftragten Nebenumbauten durchführen.

**Der wichtigste Maßstab ist nicht Code-Menge, sondern ob der erste Kampagnen-Loop sofort verständlich und befriedigend ist.**
