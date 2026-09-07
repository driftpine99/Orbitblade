# Übergabeplan für ClaudeCode: neun passive Mächte im bestehenden Orbitlauf

**Auftrag.** Implementiere den neuen passiven Core-Pool in `konzept/` auf Basis
des verbindlichen Stands in `CLAUDE.md`. Dieser Plan ist die ausführbare Übergabe:
Er beschreibt Ziel, Grenzen, Mapping, technische Reihenfolge und Abnahme. Er ist
kein neues Gutachten und behauptet keine noch nicht gemessene Balance. Routine-
entscheidungen, die hier nicht einzeln festgelegt sind, werden im Endreport kurz
begründet. Es gibt keine Rückruf-Beta als neue Kernbewegung, keinen manuellen
Rückruf, keinen zweiten aktiven Knopf, keinen Meta-Shop und kein Re-Design des
Laufs.

## 1. Befolgungsrang und geschützte Identität

Lies zuerst `CLAUDE.md` und prüfe `git status --short`. Aktuelle Nutzerentscheidungen
in diesem Plan ersetzen widersprechende ältere Designziele. Arbeits- und Schutzregeln
bleiben verbindlich; bestehende Änderungen erhalten, kein Reset/Restore/Stash zur
Bereinigung. Die technischen Zuordnungen unten konkretisieren den Auftrag.
Der Code belegt den Ist-Stand, nicht automatisch das Ziel. Nur `konzept/` ist die aktive Spielversion. `archive/` bleibt
ungelesen und unverändert. Keine Commits oder Veröffentlichung ohne Auftrag.

Der Spieler bewegt sich weiterhin frei und benutzt genau einen Knopf für die
gewählte Hauptmacht. Die Orbitklinge bleibt der Grundangriff und der sichtbare
Kern des Könnens: Winkel, Distanz, Volltreffer und Raumlesen müssen weiterhin
relevant sein. Die neun Mächte laufen automatisch; sie erzeugen keine neue Taste,
keinen manuellen Zielmodus und keine zusätzliche Slotverwaltung. Auslese bleibt
die einzige Kampfunterbrechung. Die fünf bestehenden Hauptmächte, ihre
Hauptmacht-Evolutionen, automatischen Kartenpartner, Haltungen, Lebensregen,
Glasklinge, Klingenteilung, Taktschlag und Nachfassen bleiben als tragende
Identität erhalten.

Die neuen Karten sind ein Ersatz- und Neuordnungsprojekt für den passiven
Core-Pool. Sie werden nicht zusätzlich zu allen alten Effekten angehängt. Ein
aktiver Hauptmachtpartner wird weiterhin automatisch gewährt und im Auslese-Topf
ausgeschlossen. Die vorhandenen Fusionen bleiben erreichbar und müssen mit den
neuen Namen und Wirkungen verständlich bleiben. Cooldown-Reduktion durch Leveln
bleibt moderat und insgesamt höchstens 15–20 Prozent; die im Vorschlag genannten
Intervalle sind Startwerte, keine Messbeweise. Keine globale Schadenssenkung als
Ersatz für ein Weglaufproblem.

Vor den Kartenarbeiten ist der Jäger zu korrigieren: In der letzten Zielphase
Richtung sichtbar sperren und nach dem Schuss eine Erholungsphase vor dem Rückzug
einfügen. Kein zusätzlicher Schuss. Gleichzeitige Aufladefenster vor Beginn der
Warnung begrenzen; angekündigte Schüsse nicht nachträglich unvorhersehbar verzögern.
Seitliches Ausweichen soll einen erreichbaren Gegenangriff ermöglichen. Die Regel
gilt gezielt für Jäger und wird mit echten Läufen geprüft; pauschale Damage-Nerfs
für alle Gegner sind nicht erlaubt.

## 2. Neun Rollen und konkrete Umsetzung

Jede Karte braucht eine lesbare Zielwahl, Reichweite oder Bewegungsbeziehung, eine
kleine Upgrade-Achse und ein eigenes VFX-Profil. Die Kernmechanik darf beim Leveln
nicht vollständig wechseln. Pro Auslösung begrenzen Objektzahl, Trefferfenster
und Lebensdauer die Bildschirmdichte. Die folgende Tabelle ist die funktionale
Abnahmebasis; Zahlen werden danach am echten Code und an Messungen kalibriert.

| Rolle/ID | Zielwahl, Bewegung und Reichweite | Levelachse und sichtbare Grenze |
|---|---|---|
| **Ketten-Machtblitz** (`kettenblitz`) | Automatisch ein dichtes, gültiges Ziel wählen; Treffer springt auf nahe weitere Ziele. Ketten zählen als ein Auslöseereignis, nicht als unkontrollierte Rekursion. | Schaden, Sprungziele und etwas Reichweite; kein zusätzlicher Overcharge im ersten Stand. Timer statt On-Hit ist eine bewusste Regeländerung. Startkorridor etwa 1,0–1,3 s, Zielzahl klar begrenzen. Elektrische Kette, keine Strahloptik. |
| **Phaser-Strahl** (`phaser`) | Gerader Strahl vom Spieler zum nächsten gültigen Gegner in Reichweite; Richtung beim Auslösen fixieren. Weitere Ziele müssen in dieser Linie liegen. Tote oder ungültige Ziele überspringen; keine Endexplosion im Basisset. | Schaden, Pierce, leicht Breite. Start etwa 1,5–1,8 s. Swept-Projektil/Segment prüfen, damit schnelle Ziele nicht durchlaufen. Violett-blauer, kompakter Strahl; der heutige passive Machtblitz wird damit semantisch umbenannt. |
| **Plasmabombe** (`brandspur`) | Bombe automatisch in eine größere, gültige Gruppe werfen; verzögert und lesbar detonieren. Brandfläche nur optional, kurz und mengenbegrenzt. | Schaden, Radius, Zielgruppe; hoher Rang höchstens kleine Sekundärwirkung. Start etwa 3,5–4,5 s. Die bestehende `brandspur`-ID behalten, aber Name, Beschreibung und Wirkung auf Plasmabombe vereinheitlichen. |
| **Kinetische Welle** (`konterstoss`) | Kurze 360°-Druckwelle um den Spieler, kurzer Knockback und eventuell Umwerfen leichter Gegner. Keine dauerhafte Orbitverdrängung: Gegner dürfen nicht weiter als vorgesehen aus der Klingenreichweite geschoben werden. | Radius, Knockback und Schaden; hoher Rang höchstens eine schwache Nachdruckwelle. Start etwa 2,8–3,5 s. Die frühere Trefferreaktion wird zur zeitgesteuerten Welle; diese Änderung ist beabsichtigt. |
| **Singularität** (`nachhall`) | Zentrum bei einer größeren gültigen Gruppe wählen, Gegner kurz zusammenziehen und kurz halten, danach kleine Implosion. Wenig Endschaden; Rolle ist Gruppierung. | Pull-Radius, Zugkraft, kurze Haltezeit und nur leicht Implosionsschaden. Start etwa 5,5–6,5 s. Pull und Halt mit klarer Ringmarke; keine versteckte Partnerlogik. |
| **Telekinetisches Arsenal** (`splitter`) | 3–5 Homing-Projektile auf verschiedene lebende, verteilte Ziele schleudern. Keine dauerhaft kreisenden Objekte und keine Mehrfachsalve auf ein totes Ziel. | 3→4→5 Geschosse, Schaden, Homing und kleiner Knockback. Höchstens ungefähr 5–6 gleichzeitig. Umgebungsmaterial/Steine sichtbar von Klingen-Splittern unterscheiden. |
| **Machtgriff** (`machtgriff`) | Elite zuerst, dann gefährlicher Schütze, dann hoher HP-Wert. Einzelziel kurz heben und halten; danach sicherer Crush. Bosse erhalten eine bossverträgliche Single-Target-Wirkung ohne Lift-Zwang und ohne AoE. | Schaden, Haltedauer und Elite/Boss-Multiplikator. Start etwa 6–7 s. Boss-Immunität graceful behandeln, keine leere Animation. Ein fokussierter Lichtgriff statt Gruppenfeld. |
| **Energieklingen-Wurf** (`energieklingenwurf`) | Automatische Energieklinge fliegt weit hin, trifft mehrere Gegner und kehrt zum aktuellen Spielerpunkt zurück. Spielerbewegung verändert die Rückfluglinie und damit die Wirkung. Sie ergänzt die Orbitklinge. | Schaden, Reichweite, Hitbox und höherer Rückwegschaden. Start etwa 3–3,5 s. Hin- und Rückweg separat sichtbar und swept prüfen; kein zweiter Steuerknopf. |
| **Macht-Echo** (`macht_echo`) | Einen begrenzten Ringpuffer der letzten sichtbaren Spielerbewegung führen. Vor dem Angriff den gespeicherten Weg sichtbar markieren; eine Geisterfigur läuft genau diesen Weg und trifft Gegner entlang der Strecke. Kein Endknall; entlang einer Gegnerfront oder vor Verfolgern bewegen, statt durch Kontaktschaden laufen zu müssen. | Schaden, Weglänge und Breite; keine Endpunkt-Druckwelle. Start etwa 4,5–5,5 s. Ringpuffer begrenzen, bei Pause und Reset sauber einfrieren beziehungsweise leeren. |

Zusätzliche verbindliche Details: Arsenal startet versuchsweise im Intervall
2,3–3 Sekunden; die angegebenen Intervalle sind keine garantierte Balance.
Der aktuelle sichtbare Rang I/II bleibt, die Geschossfolge 3→4→5 verlangt keinen
neuen dritten Kartenrang. Homing-Projektile wechseln bei Zielverlust auf ein gültiges
Ziel oder laufen aus. Wurfklinge trifft pro Gegner höchstens einmal je Flugrichtung;
beim Rückweg wird der bewegte Spieler verfolgt. Begrenzte Lebenszeit und zuverlässige
automatische Rückkehr verhindern endlose Verfolgung; keine manuelle Fangaufgabe.
Das Echo kopiert bei Auslösung seine zuvor gezeigte Spur unveränderlich, läuft sie
vom älteren zum neueren Punkt ab und trifft jedes Ziel höchstens einmal. Höchstens
ein Echo gleichzeitig; Stillstand erzeugt keine gestapelten Ortstreffer. Bomben-
und Singularitätszentrum stehen bei ihrer Auslösung fest. Boss-Lift wird durch
sichtbaren Crush ersetzt, Bosskörper werden weder versetzt noch dauerhaft festgesetzt.

Die Identität muss auch in Kartenname, `short`-Text (höchstens 14 Zeichen),
Codex, Bereitschaftsanzeige und Treffer-VFX zusammenpassen. Der passive
Machtblitz wurde erst grafisch kleiner und ruhiger gemacht; diese Hierarchie ist
zu bewahren: kompakte Zielmarke, kleiner Einschlag, gedämpfter Shake. Neun
Pool-Einträge bedeuten nicht neun neue Startfähigkeiten. Die Kombination erworbener
Mächte darf den Bildschirm nicht überladen. Gegnerwarnungen und Orbitklinge müssen
vor passiven Effekten lesbar bleiben; unnötige Partikel werden
begrenzt oder zusammengefasst.

## 3. Altbestand, Mapping, Save und Fusionen

Die alte Kartenmenge wird vollständig zugeordnet. `kettenblitz` bleibt
Ketten-Machtblitz und erhält Timer-Auslösung. `phaser` wird vom heutigen passiven
Machtblitz zum Phaser-Strahl; alle Namen, Icons, Texte, Zielmarken, Evolutionen
und Partnerbeschreibungen müssen dazu passen. `brandspur` bleibt die stabile
technische ID für die heutige Plasmabomben-Funktion und wird nicht als zusätzliche
Brandspur neben Plasmabombe weitergeführt. `konterstoss` wird Kinetische Welle,
`nachhall` Singularität und `splitter` Telekinetisches Arsenal. Das sind
semantische Nachnutzungen stabiler IDs, keine stillen Doppelmächte.

Die drei neuen IDs `machtgriff`, `energieklingenwurf` und `macht_echo` werden
neu eingeführt. Für jede alte Karte, die ersetzt, umbenannt oder entfernt wird,
notiere im Code eine klare Kompatibilitätsbehandlung. Die Unterstützungskarten
`lebensregen`, `glasklinge`, `klingenteilung`, `taktschlag` und `nachfassen`
bleiben erhalten. Ihre Identität und bekannten Risiko-/Bereitschaftseffekte
werden nicht zu einer zehnten Angriffs-Power erweitert. `Funkenkranz` entfällt
als normaler Core-Pick. Sein alter normaler Pool-Eintrag darf nicht heimlich
weiterlaufen; nur eine ausdrücklich definierte Fusionsersatzrolle darf ihn
referenzieren. Ergebnis: neun automatische Angriffsfähigkeiten plus fünf bestehende
Unterstützungskarten, insgesamt vierzehn Typen und dreizehn mögliche Typen nach
Hauptmacht-Partnerausschluss. Alle Zieh-, Anzeige- und Prüfstellen auf feste Annahmen
über den bisherigen Elfer-Topf prüfen. Keine zusätzliche Kapazitätsgrenze einführen;
der größere Topf muss durch sinnvolle vorhandene Gewichte spielbar bleiben, nicht
durch garantierte Zutaten. Machtgriff und Macht-Echo brauchen ohne Rezept gültige
Kartentexte und Angebote; eine fehlende Rezeptzuordnung darf keinen Fehler auslösen.

Die fünf aktiven Hauptmächte bleiben `wirbel`, `stoss`, `bombe`, `nova` und `sog`.
Ihre Partner bleiben automatischer Ausschluss: Wirbel/Splitter, Schock/Ketten-
blitz, Bombe/Konterstoß, Nova/Phaser und Sog/Nachhall. Der Nova-Partner heißt
nach der Umstellung Phaser-Strahl, damit es keine zweite Kettenblitzkarte gibt.
Aktive Nova bleibt separat; ihre Hauptmacht-Evolutionen bleiben erhalten und
werden textlich auf den neuen Partner abgestimmt.

Die sechs gebauten Kartenfusionen werden als vollständige Matrix erhalten:

* **Klingenchor** = `klingenteilung` + `taktschlag`.
* **Drucksalve** = `phaser` + `nachhall`: Der Phaser erzeugt am letzten tatsächlich
  getroffenen Gegner eine begrenzte Druckwelle; die Singularität bleibt erhalten.
  Das ist eine ausdrückliche Fusionseigenschaft, keine Explosion der normalen Phaser-Ränge.
* **Gewitterherz** = `kettenblitz` + `konterstoss`, jetzt Kettenblitz plus
  Kinetische Welle; erlittener Treffer bleibt der bewusste Auslöser.
* **Blutkristall** = `glasklinge` + `lebensregen`, mit bestehendem Risiko und
  stärkerer Heilungsantwort.
* **Splitterfächer** = `nachfassen` + `splitter`: Der vorbereitete breite Volltreffer
  erzeugt wie bisher einen begrenzten durchschlagenden Fächer; das Arsenal läuft weiter.
* **Plasmasturm** = `brandspur` + `energieklingenwurf`; Fusions-ID `flammenorbit`
  erhalten. Bombeneinschläge senden wie bisher begrenzte Plasmasplitter nach außen,
  der automatische Klingenwurf bleibt erhalten. Der alte dauerhafte Funkenorbit
  entfällt vollständig, einschließlich der entsprechenden Textversprechen.

Fusionen dürfen explizit transformieren und behalten die verstärkten Grundwirkungen
beider Zutaten. Vorhandene Eintrittsregel erhalten: beide Zutaten vorhanden,
mindestens eine auf Rang II. Gewitterherz behält seinen zusätzlichen Auslöser
durch Lebensschaden; die normalen Timer beider Zutaten bleiben erhalten. Zusatz-
treffer aus Fusionen gelten nicht als neue Hauptklingen-Volltreffer und erzeugen
keine rekursiven Ketten. Normale Ränge wechseln ihre Kernmechanik nicht.
Für jede Zutat muss das Rezept weiterhin sichtbar, nicht garantiert, und bei einem
Partnerausschluss ehrlich als nicht verfügbar markiert werden. Eine neue Fusion
für jede der drei neuen Mächte ist nicht erforderlich. Leere Rezeptlisten,
unerreichbare Anzeigen und doppelte Zutatenplätze sind Abnahmefehler.

Die Save-Migration erhöht bei geänderter Speicherstruktur die Version. Alte IDs
werden ausdrücklich zugeordnet; Entdeckungen, Freischaltungen und Belohnungen
gehen nicht verloren. Kompatibilitätsdaten dürfen keine entfernte Wirkung wieder
aktivieren. Dauerhafte Käufe werden erhalten; falls ein echter
dauerhafter Kauf entfällt, wird fair refundiert und im Endreport benannt. Lauf-
gebundene Karten werden nicht künstlich in einen neuen Lauf übertragen. Alte
Spielstände müssen starten, Hauptmacht-Partner korrekt ausschließen, vorhandene
Fusionen weiter anzeigen und keine zweite Macht aktivieren. `meta.slot2` bleibt
entfernt; keine Ersatzwährung oder Beta-Speicherung einführen.

## 4. Umsetzung in fünf überprüfbaren Schritten

1. **Inventar und Datenmodell.** Im aktiven Code alle Pool-, Partner-,
   Ausschluss-, Rezept-, Evolutions-, Save- und UI-Stellen kartieren. Semantische
   IDs wie oben beibehalten, neue IDs zentral definieren. Done, wenn jede alte
   Karte in einer Tabelle Kommentar/Mapping/Kompatibilität besitzt und kein alter
   Funkenkranz-Pick ungewollt übrig bleibt.

2. **Vorbereitung und Zielwahl.** Jägerfix zuerst umsetzen. Danach je passive
   Macht eine begrenzte Auslöse- und Zielroutine mit Validierung lebender Ziele,
   Reichweitenprüfung, Cooldown und Objektlimit anlegen. Done, wenn jede Macht
   automatisch im normalen Ein-Knopf-Lauf auslöst und keine zusätzliche Eingabe
   verlangt.

3. **Bewegung, Kontrolle und Fusion.** Swept-Strahl, Homing, Rückweg der
   Energieklinge, Knockback innerhalb des Orbitzugangs, Boss-Crush und Echo-
   Ringpuffer integrieren. Dann die sechs Fusionsrezepturen und Partnerausschlüsse
   aktualisieren. Done, wenn Fusionen mit echten Kartenrängen auftauchen, Zutaten
   ersetzen und keine rekursiven Triggerketten erzeugen.

4. **Texte und Darstellung.** Karten, Codex, Bereitschaft, Zielmarken, Farben,
   Warnformen und Hauptmacht-Partner auf die neuen Namen/Wirkungen bringen.
   Bestehende passive Machtblitz-Grafik klein halten und Blade-VFX priorisieren.
   Done, wenn ein Spieler Ursache, Ziel und nächste Bereitschaft im Desktop- und
   Portrait-Browser ohne Zusatzwissen erkennt.

5. **Migration und Abnahmebericht.** Save-Version migrieren, echte Runs und
   Spezialmessungen ausführen, Befunde mit Seed/Build dokumentieren. ClaudeCode
   aktualisiert die fachlich betroffene Dokumentation passend im bestehenden
   Abschnitt und liefert einen kurzen Endreport mit geänderten IDs, Migration,
   Messwerten und offenen Punkten. Keine Zeit- oder Token-Schätzungen.

## 5. QA-Abnahme und Grenzen

Pflichtpfade sind: frischer Lauf mit jeder der fünf Hauptmächte, alle neun
Passiven auf Rang 1 und Rang 2, Karten-Ausschluss des jeweiligen Partners,
alle sechs Fusionen einschließlich Plasmasturm-Ersatz, Migration eines alten
Spielstands, Bosswellen, Jäger, Elite, Schütze und beide Echo-Pause/Reset-Pfade.
Prüfen: keine rekursiven Trigger, keine Treffer auf tote Homing-Ziele, graceful
Boss-Lift-Immunität, kein Knockback über den vorgesehenen Orbitzugang, begrenzte
Echo-Ringbuffer, Pause/Reset aller neuen Timer und Akteure, keine versteckten
RNG-Änderungen außerhalb der Zielmechaniken.

Ausführen: `node --check konzept/game.js`, danach `node tools/pruefe.js` und
`node tools/sim.js` gemäß den bestehenden CLAUDE-Standards. Für Struktur und
Fortschritt echte `start`/`run`-Pfade verwenden, Karten über die echte Auslese
wählen, keine Flags als Build-Ersatz setzen. Balancezahlen nur als Messbefund
berichten: Schadensprüfstand mit tatsächlichen Objektlisten, Überleben mit den
vorgegebenen belastbaren Läufen, Jäger und Wellenfluss gezielt. Unbelegte Zahlen
oder eine Botzeit nicht als menschliche Spielzeit ausgeben.

Zusätzlich jeweils eine Desktop- und eine Portrait-Browseraufnahme prüfen:
Kartenwahl, Bereitschaft, Zielmarke, Pause, Rückkehr, Fusionstext und Bosswarnung.
Keine automatisierten Spaß- oder Qualitätsbehauptungen aus Aufnahmen ableiten.
Grafikbudget besonders bei gleichzeitiger Kombination aus Klingenchor,
Plasmabombe, Arsenal, Strahl und Echo beobachten. Wenn Lesbarkeit sinkt, zuerst
Partikel, Wiederholungen und Shake reduzieren, die Orbitklinge und Warnungen aber
schützen. Der Abschluss gilt erst, wenn Alt-Save-Erhalt, aktive Spielversion,
Dokumentpflege und der kurze Endreport nachgewiesen sind.
