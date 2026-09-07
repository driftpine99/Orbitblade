# Grafik-Abstimmung: erste Lesbarkeitsstufe

**Datum:** 07.09.2026
**Scope:** vorhandene Orbit-Version, ausschließlich visuelles Feedback

## Befund

Der passive Machtblitz (Phaser) war im Code deutlich auffälliger als die
vergleichbaren Effekte: drei Ziele gleichzeitig, eine 150 px hohe Warnsäule,
fast weiße Kern- und Innenlinien, 22 px Glow und Kamera-Shake 7 pro Einschlag.
Die aktive Machtblitz-Nova ist dagegen ein einzelner expandierender Ring; der
Kettenblitz zeichnet eine kurze, dünne Verbindung. Der Befund beschreibt
visuelle Wucht, keine Schadens- oder Balanceüberlegenheit. Ein Browser-Screenshot
konnte im Subagent nicht erstellt werden, weil der lokale IAB localhost mit
`ERR_BLOCKED_BY_CLIENT` sperrte; der Codepfad wurde direkt geprüft.

## Entscheidungen

- Phaser bleibt mechanisch unverändert: gleiche Ziele, Warnzeit, Trefferzeit,
  Reichweite und Schadenswerte.
- Warnung und Einschlag werden kleiner und violett-blau. Der weiße Anteil und
  der Glow sinken; der Einschlag erhält einen kurzen lokalen Ring.
- Kamera-Shake des passiven Effekts wird auf einen kleinen Wert begrenzt. Es
  gibt keine zeitliche Staffelung und keine zusätzliche Zufallsziehung.
- Lebensregen zeigt einen grünen Ring nur nach tatsächlicher Heilung. Killheilung
  ist kräftiger; laufende verstärkte Heilung nutzt einen gedämpften, höchstens
  alle 650 ms gesetzten Impuls. Bei vollem Leben entsteht kein Heilungsfeedback.
- Nachfassen zeigt seine vorhandene Bereitschaft als kurzen goldenen Bogen;
  Taktschlag zeigt den bestehenden Umlaufzähler als kleinen Fortschrittsbogen.
  Beide Anzeigen ändern keinen Auslöser und werden beim Laufstart zurückgesetzt.
- Die Fusionsanzeige nennt Zutaten und Ränge und begründet den Ausschluss des
  Hauptmacht-Partners direkt im Auslese-Overlay.

## Umgesetzt und geprüft

Geändert wurden `konzept/game.js`, `konzept/style.css` und diese Notiz. `node --check konzept/game.js`,
`git diff --check` und ein Standard-God-Lauf über Welle 30 liefen erfolgreich.
Gezielte Harness-Prüfungen bestätigten den unveränderten Phaser-Konstantensatz,
einen laufenden Heilimpuls bei Teil-Leben sowie keinen Impuls bei vollem Leben;
Bereitschaft und Fusionstext werden beim Laufstart beziehungsweise Partnerausschluss
korrekt zurückgesetzt beziehungsweise gesperrt.
Der Lauf endete bei Welle 30 mit Sieg; die gemeldeten Combatwerte und der
Trefferpfad wurden nicht angepasst. Eine Vorher-Kopie der Produktdateien liegt
für den Vergleich unter `C:\Users\benle\AppData\Local\Temp\orbit-vorher-20260907`.

## Grenzen

Eine echte Nachher-Aufnahme wurde über Chrome Headless mit der lokalen Spielversion
erstellt und von der Projektleitung angesehen. Der isolierte Prüfzustand zeigt
Machtblitz-Einschläge; es wurde kein Spielstand geschrieben. Der Blitz bleibt klar
erkennbar, seine Leuchtfläche konzentriert sich auf den Einschlag. Die Aufnahme
enthält Prüf- und Einstiegseinblendungen und ist keine Abnahme der gesamten Oberfläche.

Die ebenfalls erstellte Baseline-Aufnahme traf wegen Countdown- und Frame-Timing
keinen sichtbaren Blitz. Ein synchroner Vorher-/Nachher-Bildvergleich ist deshalb
nicht belegt. Die Bilder liegen unter `C:\Users\benle\AppData\Local\Temp\machtblitz-nachher.png`
und im oben genannten Baseline-Verzeichnis als `machtblitz-vorher.png`.
Die Handy- und Hochformatabnahme sowie die Wahrnehmung im dichten späten Run bleiben
offen. Weitere Macht-Effekte wurden nicht pauschal verstärkt.
