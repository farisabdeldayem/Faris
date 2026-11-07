import sys, pathlib, re
OUT = pathlib.Path(sys.argv[1])
SRC = pathlib.Path(__file__).parent
NAV = [("ueber-mich.html","Über mich"),("moeglichkeit.html","Die Möglichkeit"),("erfolgsgeschichten.html","Erfolgsgeschichten")]
ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">{}</svg>'
ICONS = {
 "euro":'<path d="M17 6.5A7 7 0 1 0 17 17.5"/><path d="M4 10h10M4 14h10"/>',
 "users":'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.6-3.4 3.2-5.5 6.5-5.5s5.9 2.1 6.5 5.5"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.8c2 .7 3.2 2.5 3.5 5.2"/>',
 "chart":'<path d="M3 20h18"/><path d="M6 16l4-5 3.5 3L19 7"/><path d="M15 7h4v4"/>',
 "clock":'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
 "map":'<path d="M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
 "gift":'<rect x="3" y="8" width="18" height="13" rx="2"/><path d="M12 8v13M3 12h18"/><path d="M12 8S10.5 3 7.5 3.5 7 8 12 8zM12 8s1.5-5 4.5-4.5S17 8 12 8z"/>',
 "bolt":'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
 "school":'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"/>',
 "home":'<path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/>',
 "plane":'<path d="M10.5 13.5 3 11l1.5-1.5 8 1L17 6a2 2 0 0 1 3 3l-4.5 4.5 1 8L15 23l-2.5-7.5"/>',
}
def icons(html):
    return re.sub(r"\{\{icon:(\w+)\}\}", lambda m: '<div class="icon">'+ICON.format(ICONS[m.group(1)])+'</div>', html)
def media(html):
    # {{img:pfad|Beschriftung|klasse}}
    def img(m):
        path, label, cls = (m.group(1).split("|")+["",""])[:3]
        return f'<div class="media {cls}"><img src="{path}" alt="{label}" loading="lazy"><div class="ph">{label}<small>{path}</small></div></div>'
    html = re.sub(r"\{\{img:([^}]+)\}\}", img, html)
    # {{video:pfad|Titel|Untertitel|klasse}}
    def vid(m):
        path, title, sub, cls = (m.group(1).split("|")+["","",""])[:4]
        return (f'<div class="media player {cls}" data-title="{title}"><video data-src="{path}" playsinline preload="none"></video>'
                f'<button class="play" type="button" aria-label="Video abspielen: {title}"><i></i></button>'
                f'<div class="meta">{title}<small>{sub}</small></div>'
                f'<div class="ph">🎬 Video: {title}<small>{path}</small></div></div>')
    return re.sub(r"\{\{video:([^}]+)\}\}", vid, html)

HEAD = """<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta name="theme-color" content="#00a35c">
<meta property="og:type" content="website">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:image" content="https://faris-abdeldayem.de/assets/img/og.jpg">
<meta property="og:locale" content="de_DE">
<link rel="canonical" href="https://faris-abdeldayem.de/{canon}">
<link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">
<link rel="preload" href="assets/fonts/manrope-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
<header class="nav">
  <div class="nav-inner">
    <a class="logo" href="./"><span class="logo-mark">FA</span>Faris Abdeldayem</a>
    <button class="nav-toggle" type="button" aria-label="Menü öffnen" aria-expanded="false"><span></span></button>
    <ul class="nav-links">
{links}
      <li><a class="btn" href="bewerben.html">Jetzt bewerben</a></li>
    </ul>
  </div>
</header>
<main id="inhalt">
"""
FOOT = """</main>
<footer class="footer">
  <div class="wrap">
    <div class="footer-grid">
      <div>
        <a class="logo" href="./"><span class="logo-mark">FA</span>Faris Abdeldayem</a>
        <p>Selbstständiger Vertriebspartner der Teleson Vertriebs GmbH · Bezirksdirektor · NRW &amp; deutschlandweit</p>
      </div>
      <ul>
        <li><a href="ueber-mich.html">Über mich</a></li>
        <li><a href="moeglichkeit.html">Die Möglichkeit</a></li>
        <li><a href="erfolgsgeschichten.html">Erfolgsgeschichten</a></li>
        <li><a href="bewerben.html">Jetzt bewerben</a></li>
      </ul>
      <ul>
        <li><a href="https://www.instagram.com/farisabdeldayem_/" target="_blank" rel="noopener">Instagram</a></li>
        <li><a href="impressum.html">Impressum</a></li>
        <li><a href="datenschutz.html">Datenschutz</a></li>
      </ul>
    </div>
    <div class="footer-bottom">
      <span>© <span id="y">2026</span> Faris Abdeldayem</span>
      <button type="button" data-cookie-settings>Cookie-Einstellungen</button>
    </div>
  </div>
</footer>
{sticky}
<div class="consent-bar" role="dialog" aria-label="Cookie-Einstellungen">
  <strong>Cookies &amp; Datenschutz</strong>
  Wir nutzen Cookies (Meta Pixel), um unsere Werbung zu messen und zu verbessern. Du kannst zustimmen oder nur notwendige Cookies erlauben. <a href="datenschutz.html">Mehr erfahren</a>
  <div class="row"><button class="no" type="button">Nur notwendige</button><button class="ok" type="button">Akzeptieren</button></div>
</div>
<script>document.getElementById("y").textContent=new Date().getFullYear()</script>
<script src="assets/js/main.js" defer></script>
</body>
</html>
"""
STICKY = '<a class="sticky-cta" href="bewerben.html">Jetzt in 60 Sek. bewerben →</a>'
for page in sorted(SRC.glob("pages/*.html")):
    raw = page.read_text()
    meta, body = raw.split("\n---\n", 1)
    m = dict(l.split(": ",1) for l in meta.strip().splitlines())
    name = page.name
    links = "\n".join(f'      <li><a href="{h}"{" aria-current=\"page\"" if h==name else ""}>{t}</a></li>' for h,t in NAV)
    canon = "" if name=="index.html" else name
    sticky = "" if m.get("sticky")=="no" else STICKY
    html = HEAD.format(title=m["title"], desc=m["desc"], canon=canon, links=links) + media(icons(body)) + FOOT.format(sticky=sticky)
    (OUT/name).write_text(html)
    print("built", name)
