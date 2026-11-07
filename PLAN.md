# Faris Abdel Dayem – Website & Meta Ads

Domain: **faris-abdeldayem.de** (Datei `CNAME` ist schon gesetzt)

## 1. Seitenaufbau
| Seite | Inhalt |
|---|---|
| `index.html` | Hero mit 3-Min-Video, Zahlen, Story-Teaser, Vorteile, Partner-Videos, Incentive-Reisen, „Passt du ins Team?“, Ablauf, FAQ |
| `ueber-mich.html` | Story + Zeitstrahl (Fachabi → 2021 Telko-Vertrieb → 2023 Energievertrieb → Bezirksdirektor) |
| `moeglichkeit.html` | Produkt, Vorteile, **Karriereplan mit allen 11 Stufen** (du = Stufe 8), Arbeitsalltag |
| `erfolgsgeschichten.html` | 8 Partner-Videos (Hochformat, am Handy wischbar) |
| `bewerben.html` | Bewerbung in 6 Schritten (Alter, Situation, Vollzeit, Door-to-Door, Ziel, Kontakt) |
| `impressum.html`, `datenschutz.html` | Entwürfe – Daten ergänzen und prüfen lassen |

Unterschiede zu Max' Seite: Weiß/Grün statt Hellblau/Serifen, Video direkt oben, eigener Bewerbungs-Funnel statt externem Tool, Karriereleiter, „Passt du / passt du nicht“-Filter, Reisen-Galerie.

## 2. Fotos & Videos einfügen
Einfach Dateien mit **genau diesem Namen** in den Ordner legen – sie erscheinen automatisch, bis dahin steht ein Platzhalter da.

**Fotos** (`assets/img/`, JPG, max. ~400 KB, z. B. mit squoosh.app verkleinern)
- `faris-portrait.jpg` – Hochformat 4:5, Startseite
- `faris-about.jpg` – Querformat, Über mich oben
- `faris-team.jpg` – Querformat, mit Team
- `door-to-door.jpg` – Querformat, Beratung/Team unterwegs
- `og.jpg` – 1200×630, Vorschaubild beim Teilen (WhatsApp etc.)
- `reisen/dubai.jpg`, `reisen/tuerkei.jpg`, `reisen/sylt.jpg`, `reisen/event-1.jpg`, `reisen/ehrung.jpg`

**Videos** (`assets/videos/`, MP4, H.264, möglichst < 40 MB)
- `faris-intro.mp4` – dein 3-Minuten-Video (Hochformat 4:5 oder 9:16)
- `partner-1.mp4` … `partner-8.mp4` – Erfolgsgeschichten (Hochformat 9:16, 30–90 Sek.)
- Optional ein Vorschaubild: gleicher Name als `.jpg`

Namen/Texte der Partner stehen in `_src/pages/*.html` (Platzhalter „Name Partner 1“). Nach Änderungen dort: `python3 _src/build.py .`

## 3. Skript für dein 3-Minuten-Video
1. **Hook (0–15 s):** „Ich habe mein Fachabi abgebrochen – heute bin ich Bezirksdirektor im Energievertrieb und führe ein Team mit über 50 Leuten. In den nächsten 3 Minuten erzähl ich dir, wie.“
2. **Wer ich bin (15–60 s):** Schule, 2021 Telko-Vertrieb, was du dort gelernt hast, 2023 Wechsel in den Energievertrieb.
3. **Was wir machen (60–120 s):** Strom & Gas, jeder braucht es, Kunden sparen. Door-to-Door, Team, Karriereplan (11 Stufen), Reisen.
4. **Für wen (120–160 s):** 18–30, Vollzeit, hungrig, Quereinsteiger willkommen. Ehrlich sagen: Es ist Arbeit.
5. **Call-to-Action (160–180 s):** „Wenn du dich wiedererkennst: Klick unten auf ‚Jetzt bewerben‘. 60 Sekunden, wir melden uns in 24 Stunden.“

Tipps: Handy-Hochformat, gutes Licht von vorne, Ansteck-Mikro, Untertitel einbrennen (z. B. CapCut).

**Fragen für die Partner-Videos:** Was hast du vorher gemacht? Warum hast du angefangen? Was war am Anfang schwer? Wo stehst du heute? Was würdest du jemandem sagen, der überlegt zu starten?

## 4. Bewerbungen
Gehen per E-Mail an farisabdeldayem@gmail.com über FormSubmit (in `assets/js/main.js` → `leadEmail` änderbar).
**Wichtig:** Beim allerersten echten Absenden kommt eine Bestätigungs-Mail von FormSubmit – einmal auf „Activate“ klicken, sonst kommen keine Bewerbungen an.
Jede Bewerbung enthält auch Quelle/Kampagne aus dem Link (UTM).

## 5. Online stellen
1. Domain **faris-abdeldayem.de** kaufen (IONOS, Strato, Namecheap … ~1–10 €/Jahr)
2. Kostenlos hosten mit **Netlify** (Repo verbinden) oder **GitHub Pages**
3. Beim Domain-Anbieter die DNS-Einträge setzen, die Netlify/GitHub anzeigt
4. Impressum & Datenschutz ausfüllen und prüfen lassen

## 6. Meta Ads – Schritt für Schritt
**Einrichten (du hast noch keinen Business Account):**
1. business.facebook.com → Business-Portfolio anlegen (mit deinem Facebook-Profil)
2. Instagram-Account @farisabdeldayem_ verbinden
3. Werbekonto anlegen, Zahlungsmethode hinterlegen
4. Events Manager → Datenquelle „Web“ → **Pixel** erstellen → ID in `assets/js/main.js` bei `metaPixelId` eintragen
5. Domain faris-abdeldayem.de im Business Manager verifizieren
6. Ab dann fragt die Seite nach Cookie-Zustimmung und meldet jede Bewerbung als „Lead“ an Meta

**Kampagne:**
- Ziel: **Leads**, Conversion-Ort: Website, Event: Lead
- Budget-Start: 20–30 € pro Tag, 3–5 Anzeigen gleichzeitig testen, nach 5–7 Tagen die Gewinner hochfahren
- Region: NRW (Schwerpunkt) + später deutschlandweit
- Links mit UTM, z. B. `https://faris-abdeldayem.de/bewerben.html?utm_source=meta&utm_campaign=recruiting&utm_content=video1`

**Creatives (Hochformat-Videos funktionieren am besten):**
- Ausschnitte aus deinem 3-Min-Video (die stärksten 20–30 Sek.)
- „Fachabi abgebrochen → Bezirksdirektor“-Story
- Partner-Testimonials (vorher → heute)
- Reise-Clips (Dubai, Türkei, Sylt) + „Das ist unser Team“
- „Ein Tag Door-to-Door mit uns“

**Achtung Richtlinien:**
- Keine Einkommensversprechen in Anzeigen („10.000 € garantiert“, „schnell reich“) – Konto kann gesperrt werden
- Meta kann Recruiting-Anzeigen als Kategorie **„Beschäftigung“** einstufen → dann ist Alters-Targeting eingeschränkt. 18–30 erreichst du dann über die Inhalte (junge Leute im Video, Sprache, Musik)
- Max' Werbeanzeigen kannst du in der Meta Werbebibliothek ansehen (facebook.com/ads/library → „Maximilian Heiland“) – als Inspiration, nicht zum Kopieren

## 7. Noch offen
- [ ] Fotos & Videos (siehe oben)
- [ ] Namen, Sätze und Videos der Partner
- [ ] Impressum: Adresse, Telefon, E-Mail, ggf. USt-ID
- [ ] Domain kaufen + Hosting
- [ ] Meta Business Account + Pixel-ID
