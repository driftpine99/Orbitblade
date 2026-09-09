# Ablage und Sicherung

**Stand: 31.08.2026.** Diese Übersicht dokumentiert die Projektbereinigung,
keine neue Spielkonzeption. Fachlich gilt [CLAUDE.md](../CLAUDE.md).

## Erledigte Konsolidierung

- `CLAUDE.md` nach Ist-Stand, Zielen, Messungen, Prüfverfahren und offenen Punkten
  geordnet; Wiederholungen und überholte Anweisungen aus der aktiven Fassung entfernt.
- Die vollständige vorherige Fassung als [historischen Beleg](historie/Konzeptstand-2026-08-30.md)
  erhalten. Präsentation, 14 Folienbilder und früheren Fahrplan nach `docs/historie/`
  verschoben; kein Quellmedium verworfen.
- Einstieg und Agentenanweisungen mit dem vorhandenen Ein-Knopf-Spiel abgeglichen.
- Messwerkzeuge an die aktuelle Auslese- und Countdown-Logik angepasst. Die alten
  Abläufe konnten an Weichen hängenbleiben; die Spielimplementierung blieb unverändert.

Abschlussprüfung: Alle drei Spieldateien, Stamm-Einstieg, `AGENTS.md`, `HISTORIE.md`
und lokale Vorschaukonfiguration haben unveränderte SHA-256-Werte. Der frühere
Konzepttext ist bytegleich erhalten; die 16 verschobenen Quelldateien behalten
ihren Originalinhalt. Lokale Dokumentlinks, Syntax aller sechs JavaScript-Dateien
(Spiel und Werkzeuge) und `git diff --check` sind geprüft. Simulationsläufe decken
Karten, Weichen, Fortsetzung und Endlos ab; es erfolgte keine neue Hardwareabnahme.

## Was weiterhin benötigt wird

| Bestand | Warum er erhalten bleibt |
|---|---|
| `konzept/` mit HTML, CSS und JS | Vollständiges aktives Spiel |
| Stamm-`index.html` | Einstieg und Weiterleitung für GitHub Pages |
| `CLAUDE.md`, `README.md`, `AGENTS.md`, `.opencode/` | Konzept, Einstieg und Arbeitsabläufe |
| `tools/` | Ausführbare Mess- und Prüfwerkzeuge |
| `.claude/launch.json` | Lokale Vorschaukonfiguration; weiterhin gitignoriert |
| `docs/historie/`, `HISTORIE.md` | Nachvollziehbare Entwürfe, Präsentationsquellen und Messbelege |
| `artifacts/` | Trailer, Vorschaubilder, Keyart und Schnittliste; `concat.txt` verweist auf lokale Filmteile |
| Vier `trailer_*`-Ordner | Einzelbilder und portable FFmpeg-Distribution samt Bibliotheken und Lizenzdateien |
| `archive/`, `.git/` | Geschützte Altbestände bzw. Versionsgeschichte; nicht als Bereinigungskandidaten untersucht |

Unter den untersuchten Medien und Dokumenten wurden keine identischen
Dateidubletten gefunden. Die aktive Spielseite benötigt keine Trailerdateien;
daraus folgt aber nicht, dass deren Produktionsquellen entbehrlich sind.

## Geprüfte lokale Sicherung – Originale noch vorhanden

Die folgenden vier Ordner sind vollständig in einer gemeinsamen ZIP-Datei gesichert:

- `C:\Saber-Game-Projekt\trailer_cine`
- `C:\Saber-Game-Projekt\trailer_clean`
- `C:\Saber-Game-Projekt\trailer_frames`
- `C:\Saber-Game-Projekt\trailer_ffmpeg`

Sicherung: `artifacts/arbeitsmaterial-2026-08-31.zip`.
Prüfprotokoll mit Originalpfaden, Größen und SHA-256-Werten:
`artifacts/arbeitsmaterial-2026-08-31.inventar.json`.
Beides ist lokal und durch die vorhandene `artifacts/`-Regel von Git ausgeschlossen;
die Dateien stehen nach einem neuen Klonen des Repositorys nicht zur Verfügung.

| Prüfung / Umfang | Ergebnis |
|---|---|
| Dateien / Verzeichniseinträge | 458 / 17 |
| Originale zusammen | 269,71 MiB |
| ZIP-Datei | 114,83 MiB |
| Prüfung | Jede Datei aus der ZIP gelesen und nach Größe und SHA-256 mit dem Original verglichen; Verzeichnisliste vollständig |
| Originale nach Sicherung | Erneut auf unveränderten Inhalt geprüft; alle vier Ordner weiterhin vorhanden |
| Bereits freigegebener Speicher | **Keiner**; die zusätzliche Sicherung belegt derzeit 114,83 MiB |
| Mögliche Nettoersparnis nach Entfernen der Originalordner | Rund 154,88 MiB gegenüber dem Zustand vor der Sicherung |

Die automatische Sicherheitsprüfung hat die Entfernung der Originalordner
blockiert, weil umfangreiches, teilweise nicht reproduzierbares Arbeitsmaterial
betroffen ist und diese konkreten Löschziele nicht einzeln freigegeben waren.
**Keine Originale wurden entfernt.** Vor einer Entfernung ist eine ausdrückliche
Nutzerfreigabe für diese vier Pfade erforderlich. Die Sicherung liegt auf demselben
Laufwerk und schützt daher nicht vor dessen Ausfall.

Zur Wiederherstellung aus dem Projektstamm, **nur wenn die vier Originalordner
fehlen**, ohne Überschreiben bestehender Dateien:

```powershell
Expand-Archive -LiteralPath artifacts/arbeitsmaterial-2026-08-31.zip -DestinationPath .
```

Bei vorhandenen Originalen stattdessen einen neuen, leeren Zielordner verwenden.
Die ZIP enthält die ursprünglichen `trailer_.../`-Pfade und stellt damit die
Ordnerstruktur wieder her. Die Inventardatei ermöglicht einen erneuten Hashvergleich.

## Umfangsgrenze

Die Bereinigung beschränkt sich auf `C:\Saber-Game-Projekt`. Für die Bitte,
„das ganze Laufwerk“ aufzuräumen, ist noch zu klären, ob der Projektordner oder
ein darüber hinausgehendes Laufwerk gemeint ist. Außerhalb des Projekts wurden
keine Nutzerdateien bereinigt; eigene Prüfhilfen lagen nur im Temp-Verzeichnis.
`archive/` wurde weder gelesen noch verändert.
