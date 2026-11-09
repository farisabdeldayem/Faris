# Prompt: Recruiting-Website für Vertriebspartner im Energievertrieb

So nutzt du ihn: In Claude Code (claude.ai/code) ein neues, leeres GitHub-Repository verbinden, den Text unten kopieren, die Felder in [eckigen Klammern] ausfüllen und abschicken. Fotos und Videos legst du in Google Drive ab (Google-Drive-Connector in Claude verbinden) oder schickst sie direkt im Chat.

---

Bau mir eine persönliche Recruiting-Website als Vertriebspartner im Energievertrieb (Strom & Gas, Door-to-Door). Ziel: neue Vertriebspartner für mein Team gewinnen, auch über Instagram und Meta-Werbung. Sprich mich auf Deutsch an, halte deine Antworten kurz (ich lese am Handy) und frag mich, wenn dir Infos fehlen.

## Über mich
- Name (genau so schreiben): [Vor- und Nachname]
- Wunsch-Domain: [z. B. vornamenachname.de]
- Instagram: [@handle]
- E-Mail für Bewerbungen: [E-Mail]
- Impressum: [Straße Nr., PLZ Ort], Telefon [Nummer], USt-ID: [ja/nein]
- Meine Geschichte: [Schule/Ausbildung, Einstieg in den Vertrieb mit Jahr, Wechsel in den Energievertrieb mit Jahr, heute]
- Meine Zahlen: [Kunden im Team, Anzahl Vertriebspartner, ausgezahlte Provisionen, seit wann im Vertrieb]
- Meine Werte / wen ich suche: [z. B. zuverlässig, diszipliniert, Hunger nach mehr, 18–30, Vollzeit]
- Region: [z. B. NRW & deutschlandweit]
- Was NICHT auf die Seite soll: [z. B. Firmenname des Vertriebs, Positions-/Karrierestufen, Rankings]
- Provision pro Vertrag: [z. B. ca. 80–200 € und mehr]
- Kostenlose Vertriebsakademie / Einarbeitung: [kurz beschreiben]
- Ablauf nach der Bewerbung: [z. B. Erstgespräch 10–15 Min. innerhalb 24–48 h → Online-Bewerbungsgespräch → Probetag → Start]

## Aufbau
- Seiten: Startseite, Über mich (mit Zeitstrahl und „Meine Werte“), Die Möglichkeit, Erfolgsgeschichten (Videos), Bewerben, Impressum, Datenschutz.
- Zusätzlich eine Funnel-Seite `/start` für Instagram-Bio und Meta-Werbung: ohne Menü, Video oben, Bewerbungsformular direkt auf der Seite, Ablauf, kurze FAQ, Sticky-Button am Handy.
- Startseite: Hero mit Name + Vorstellungsvideo, Zahlen-Kacheln, Kurz-Story mit Foto, Vorteile (6 Karten), Erfolgsvideos, Incentive-Reisen-Galerie, „Wen ich suche“ (passt / passt nicht), Ablauf, FAQ, Abschluss-Button.
- Bewerbungsformular in Schritten (Antwort antippen = nächste Frage):
  1. Hast du Erfahrung im Vertrieb? (Ja, habe ich. / Nein, noch nicht.)
  2. Bist du bereit, dich selbstständig zu machen? (Ja, ich bin bereit. / Nein, auf keinen Fall.)
  3. Wie viel Zeit pro Woche bringst du mit? (unter 20 / über 20 / über 40 Stunden)
  4. Kontakt: Vor- und Nachname, PLZ, E-Mail, Telefon, Datenschutz-Haken.
  Versand per FormSubmit (formsubmit.co) an meine E-Mail, inkl. UTM-Quelle aus dem Link. Danke-Seite mit Hinweis auf die Rückmeldezeit.

## Design & Technik
- Statische Seite (HTML/CSS/JS, kein Baukasten), mobil zuerst, auch am iPhone SE testen.
- Farben: Weiß + Grün, modern und seriös. Schriften lokal einbinden (kein Google Fonts, DSGVO).
- Logo: Zeig mir zuerst 3–5 Entwürfe als Bild, setz erst nach meiner Freigabe ein. Danach als SVG in Kopf-/Fußzeile, als Favicon und auf dem Video-Schlussbild.
- Eigener Videoplayer statt iPhone-Standardplayer (Play/Pause, Fortschrittsbalken, Ton, Vollbild); Vorschaubild aus dem Video.
- Bereiche ohne Fotos/Videos automatisch ausblenden, keine sichtbaren Platzhalter.
- Kein Einblende-Effekt beim Scrollen (alles sofort sichtbar).
- Cookie-Banner; Meta Pixel lädt erst nach Zustimmung und meldet jede Bewerbung als „Lead“. Pixel-ID trage ich später nach.
- Impressum nach § 5 DDG und vollständige Datenschutzerklärung (Hosting GitHub Pages, FormSubmit, Meta Pixel, Rechte, Aufsichtsbehörde meines Bundeslandes).
- Fotos verkleinern und Standortdaten (EXIF) entfernen.

## Vorstellungsvideo
- Rohvideo liegt in Google Drive: [Dateiname]. Schneiden: Start bei „[erster Satz]“, Ende nach „[letzter Satz]“. Versprecher, Fehlstarts und Hinweise auf Mitgliederbereiche/Kurse rausnehmen.
- Am Ende 5 Sekunden Schlussbild „Trag dich jetzt ein“ mit Logo, Button und Domain.
- Für Web komprimieren (720p, H.264, unter ~15 MB). Schick mir das fertige Video zur Freigabe, bevor du es einbaust.

## Online stellen (führ mich Schritt für Schritt durch, ich klicke selbst)
- Hosting kostenlos über GitHub Pages (Repository öffentlich, Datei `CNAME` mit meiner Domain).
- Domain bei IONOS kaufen (nur Domain, keine Zusatzpakete).
- DNS bei IONOS: vorhandenen A-Eintrag auf 185.199.108.153 ändern, AAAA-Eintrag löschen, drei weitere A-Einträge (185.199.109.153 / .110.153 / .111.153), CNAME „www“ → [github-name].github.io. Mail-Einträge (MX, TXT, DKIM) nicht anfassen. Im Feld „Hostname“ steht nur @ oder www.
- Danach in GitHub → Settings → Pages: Branch wählen, Custom Domain eintragen, ggf. „Check again“, dann „Enforce HTTPS“.
- Am Ende: Testbewerbung abschicken und die FormSubmit-Mail mit „Activate“ bestätigen.

## Wichtig
- Keine erfundenen Zahlen, Zitate oder Erfolge. Platzhalter bleiben unsichtbar, bis ich echte Inhalte liefere.
- Keine Einkommensversprechen in Überschriften; Provision nur sachlich in FAQ/Möglichkeit.
- Bevor du Logo, Video oder große Änderungen live stellst: zeig sie mir zuerst.
