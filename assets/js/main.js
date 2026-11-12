/* ============================================================
   EINSTELLUNGEN – hier anpassen
   ============================================================ */
const CONFIG = {
  // Meta Pixel ID (aus dem Meta Business Manager), z. B. "123456789012345"
  metaPixelId: "",
  // Web3Forms Access Key (app.web3forms.com) – Bewerbungen kommen per E-Mail an.
  // Der Schlüssel ist öffentlich gedacht und darf im Code stehen.
  web3formsKey: "85950f0c-e257-4610-a3b2-0d167ff2d366",
};

/* ---------- Navigation (Burger-Menü am Handy) ---------- */
(() => {
  const btn = document.querySelector(".nav-toggle");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const open = document.body.classList.toggle("nav-open");
    btn.setAttribute("aria-expanded", open);
  });
  document.querySelectorAll(".nav-links a").forEach((a) =>
    a.addEventListener("click", () => document.body.classList.remove("nav-open"))
  );
})();

/* ---------- Bilder: Platzhalter zeigen, solange das Foto fehlt ---------- */
// Ausgeblendete (optionale) Fotos sofort laden, damit sie erscheinen, sobald die Datei da ist
document.querySelectorAll(".media[data-optional] img, .gallery-section img").forEach((img) => { img.loading = "eager"; });
document.querySelectorAll(".media img").forEach((img) => {
  const box = img.closest(".media");
  const fail = () => box.classList.add("missing");
  const ok = () => box.classList.add("loaded");
  if (img.complete) (img.naturalWidth === 0 ? fail : ok)();
  img.addEventListener("error", fail);
  img.addEventListener("load", ok);
});

/* ---------- Eigener Videoplayer (statt iPhone-Player) ---------- */
const ICONS = {
  play: '<svg viewBox="0 0 24 24"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.4-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/></svg>',
  pause: '<svg viewBox="0 0 24 24"><rect x="6.5" y="5" width="4" height="14" rx="1.2"/><rect x="13.5" y="5" width="4" height="14" rx="1.2"/></svg>',
  sound: '<svg viewBox="0 0 24 24"><path d="M4 9.5h3.2L12 5.5v13l-4.8-4H4z"/><path class="ln" d="M15.5 9a4.2 4.2 0 0 1 0 6M18 6.5a7.8 7.8 0 0 1 0 11"/></svg>',
  mute: '<svg viewBox="0 0 24 24"><path d="M4 9.5h3.2L12 5.5v13l-4.8-4H4z"/><path class="ln" d="M16 9.5l5 5M21 9.5l-5 5"/></svg>',
  full: '<svg viewBox="0 0 24 24"><path class="ln" d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>',
};
const fmt = (t) => { t = Math.max(0, Math.floor(t || 0)); return Math.floor(t / 60) + ":" + String(t % 60).padStart(2, "0"); };

document.querySelectorAll(".player").forEach((box) => {
  const video = box.querySelector("video");
  const src = video.dataset.src;
  video.preload = "metadata";
  video.playsInline = true;
  video.setAttribute("webkit-playsinline", "");
  video.controls = false;
  video.poster = src.replace(/\.mp4$/, ".jpg"); // Vorschaubild mit gleichem Namen
  video.src = src;
  video.addEventListener("error", () => box.classList.add("missing"));

  // Steuerleiste
  const bar = document.createElement("div");
  bar.className = "vbar";
  bar.innerHTML =
    `<button type="button" class="vbtn vpp" aria-label="Abspielen">${ICONS.play}</button>` +
    `<span class="vtime"><span class="vcur">0:00</span> / <span class="vdur">0:00</span></span>` +
    `<div class="vprog" role="slider" aria-label="Video-Position" tabindex="0" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><div class="vbuf"></div><div class="vfill"></div><div class="vknob"></div></div>` +
    `<button type="button" class="vbtn vmute" aria-label="Ton aus">${ICONS.sound}</button>` +
    `<button type="button" class="vbtn vfull" aria-label="Vollbild">${ICONS.full}</button>`;
  box.appendChild(bar);
  const $ = (c) => bar.querySelector(c);
  const pp = $(".vpp"), mute = $(".vmute"), full = $(".vfull"), prog = $(".vprog");

  let hideTimer;
  const wake = () => {
    box.classList.add("ui");
    clearTimeout(hideTimer);
    if (!video.paused) hideTimer = setTimeout(() => box.classList.remove("ui"), 2600);
  };
  const toggle = () => {
    if (box.classList.contains("missing")) return;
    if (video.paused || video.ended) {
      document.querySelectorAll(".player video").forEach((v) => v !== video && v.pause());
      video.play();
      if (!box.classList.contains("started")) {
        box.classList.add("started");
        track("ViewContent", { content_name: box.dataset.title || src });
      }
    } else video.pause();
  };

  box.querySelector(".play").addEventListener("click", toggle);
  let uiBeforeTouch = true;
  video.addEventListener("click", () => {
    // Am Handy: erster Tipp zeigt nur die Steuerung, zweiter Tipp pausiert
    const touch = matchMedia("(hover:none)").matches;
    if (!touch || uiBeforeTouch || video.paused) toggle();
    wake();
  });
  pp.addEventListener("click", (e) => { e.stopPropagation(); toggle(); wake(); });
  mute.addEventListener("click", (e) => { e.stopPropagation(); video.muted = !video.muted; wake(); });
  full.addEventListener("click", (e) => {
    e.stopPropagation();
    const req = box.requestFullscreen || box.webkitRequestFullscreen;
    if (document.fullscreenElement || document.webkitFullscreenElement) (document.exitFullscreen || document.webkitExitFullscreen).call(document);
    else if (req) req.call(box).catch?.(() => video.webkitEnterFullscreen?.());
    else if (video.webkitEnterFullscreen) video.webkitEnterFullscreen(); // iPhone
  });
  box.addEventListener("mousemove", wake);
  box.addEventListener("touchstart", () => { uiBeforeTouch = box.classList.contains("ui"); wake(); }, { passive: true });

  video.addEventListener("play", () => { box.classList.add("playing"); pp.innerHTML = ICONS.pause; pp.setAttribute("aria-label", "Pause"); wake(); });
  video.addEventListener("pause", () => { box.classList.remove("playing"); pp.innerHTML = ICONS.play; pp.setAttribute("aria-label", "Abspielen"); wake(); });
  video.addEventListener("ended", () => { box.classList.remove("playing"); box.classList.add("ui"); });
  video.addEventListener("volumechange", () => { mute.innerHTML = video.muted ? ICONS.mute : ICONS.sound; mute.setAttribute("aria-label", video.muted ? "Ton an" : "Ton aus"); });
  video.addEventListener("loadedmetadata", () => { box.classList.add("loaded"); $(".vdur").textContent = fmt(video.duration); });
  video.addEventListener("waiting", () => box.classList.add("loading"));
  video.addEventListener("playing", () => box.classList.remove("loading"));
  video.addEventListener("timeupdate", () => {
    const p = video.duration ? (video.currentTime / video.duration) * 100 : 0;
    $(".vfill").style.width = p + "%";
    $(".vknob").style.left = p + "%";
    $(".vcur").textContent = fmt(video.currentTime);
    prog.setAttribute("aria-valuenow", Math.round(p));
  });
  video.addEventListener("progress", () => {
    if (video.buffered.length && video.duration) $(".vbuf").style.width = (video.buffered.end(video.buffered.length - 1) / video.duration) * 100 + "%";
  });

  // Spulen per Tippen/Ziehen
  const seek = (x) => {
    const r = prog.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (x - r.left) / r.width));
    if (video.duration) video.currentTime = p * video.duration;
  };
  prog.addEventListener("pointerdown", (e) => {
    e.stopPropagation(); prog.setPointerCapture(e.pointerId); box.classList.add("seeking"); seek(e.clientX);
    const move = (ev) => seek(ev.clientX);
    const up = () => { box.classList.remove("seeking"); prog.removeEventListener("pointermove", move); prog.removeEventListener("pointerup", up); wake(); };
    prog.addEventListener("pointermove", move); prog.addEventListener("pointerup", up);
  });
  prog.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") video.currentTime += 5;
    if (e.key === "ArrowLeft") video.currentTime -= 5;
  });
  bar.addEventListener("click", (e) => e.stopPropagation());
});

/* ---------- Button "Video ansehen": zum Video scrollen und direkt abspielen ---------- */
document.querySelectorAll("[data-play-video]").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const box = document.querySelector(".hero-video");
    if (!box || box.classList.contains("missing")) return;
    e.preventDefault();
    box.scrollIntoView({ behavior: "smooth", block: "center" });
    const video = box.querySelector("video");
    if (video.paused) box.querySelector(".play").click();
  });
});

/* ---------- Sticky-Button am Handy ausblenden, wenn ein anderer CTA sichtbar ist ---------- */
(() => {
  const sticky = document.querySelector(".sticky-cta");
  if (!sticky || !("IntersectionObserver" in window)) return;
  const targets = document.querySelectorAll(".cta-band, .footer, .hero .btn-row, #bewerben");
  const visible = new Set();
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
    sticky.classList.toggle("hide", visible.size > 0);
  });
  targets.forEach((t) => io.observe(t));
})();

/* ---------- Cookie-Einwilligung + Meta Pixel ---------- */
function getConsent() { try { return localStorage.getItem("consent"); } catch (_) { return null; } }
function setConsent(v) { try { localStorage.setItem("consent", v); } catch (_) {} }

function loadPixel() {
  if (!CONFIG.metaPixelId || window.fbq) return;
  /* eslint-disable */
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
  document,'script','https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable */
  window.fbq("init", CONFIG.metaPixelId);
  window.fbq("track", "PageView");
}
function track(event, data) { if (window.fbq) window.fbq("track", event, data || {}); }

(() => {
  const bar = document.querySelector(".consent-bar");
  const c = getConsent();
  if (c === "all") loadPixel();
  if (!bar) return;
  if (!c && CONFIG.metaPixelId) bar.classList.add("show");
  bar.querySelector(".ok").addEventListener("click", () => { setConsent("all"); bar.classList.remove("show"); loadPixel(); });
  bar.querySelector(".no").addEventListener("click", () => { setConsent("necessary"); bar.classList.remove("show"); });
  document.querySelectorAll("[data-cookie-settings]").forEach((b) =>
    b.addEventListener("click", () => bar.classList.add("show"))
  );
})();

/* ---------- Bewerbungs-Funnel ---------- */
(() => {
  const form = document.getElementById("funnel");
  if (!form) return;
  const steps = [...form.querySelectorAll(".q")];
  const total = steps.length - 1; // letzter Schritt = Danke
  const bar = form.querySelector(".bar");
  const count = form.querySelector(".count");
  const back = form.querySelector(".back");
  const params = new URLSearchParams(location.search);
  let i = 0;

  function show(n) {
    steps.forEach((s, k) => s.classList.toggle("active", k === n));
    i = n;
    const done = n >= total;
    bar.style.width = (done ? 100 : (n / total) * 100 + 4) + "%";
    count.textContent = done ? "Fertig" : `Schritt ${n + 1} von ${total}`;
    back.style.visibility = n > 0 && !done ? "visible" : "hidden";
    if (n > 0) form.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  form.addEventListener("change", (e) => {
    if (e.target.type === "radio") setTimeout(() => show(i + 1), 220);
  });
  back.addEventListener("click", () => show(Math.max(0, i - 1)));

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const step = steps[i];
    step.querySelector(".err")?.remove();
    const bad = [...step.querySelectorAll("input[required]")].find((f) => !f.checkValidity());
    if (bad) {
      const p = document.createElement("p");
      p.className = "err";
      p.textContent = bad.type === "checkbox"
        ? "Bitte bestätige noch den Datenschutz."
        : "Bitte fülle alle Felder korrekt aus.";
      step.querySelector(".submit-area").before(p);
      bad.focus();
      return;
    }
    const btn = form.querySelector("button[type=submit]");
    btn.disabled = true;
    btn.textContent = "Wird gesendet …";

    const data = Object.fromEntries(new FormData(form));
    delete data.datenschutz;
    data.Quelle = params.get("utm_source") || "direkt";
    data.Kampagne = params.get("utm_campaign") || "";
    data.Anzeige = params.get("utm_content") || "";
    data.subject = `Neue Bewerbung: ${data.Name}`;
    data.from_name = "Website farisabdeldayem.de";
    data.Seite = location.pathname;
    data.access_key = CONFIG.web3formsKey;
    if (data["E-Mail"]) data.replyto = data["E-Mail"]; // "Antworten" geht direkt an den Bewerber

    // Übergangslösung: ohne Web3Forms-Schlüssel weiter über FormSubmit senden
    const useWeb3 = /^[0-9a-f-]{30,}$/i.test(CONFIG.web3formsKey);
    let ok = false;
    if (!useWeb3) {
      try {
        await fetch("https://formsubmit.co/ajax/farisabdeldayem@gmail.com", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ ...data, _subject: data.subject, _template: "table", _captcha: "false" }),
        });
      } catch (_) {}
      ok = true;
    } else try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      ok = res.ok && (await res.json()).success;
    } catch (_) { ok = false; }

    if (!ok) {
      // Fehler sichtbar machen, statt die Bewerbung still zu verlieren
      btn.disabled = false;
      btn.textContent = "Bewerbung absenden";
      const p = document.createElement("p");
      p.className = "err";
      p.textContent = "Das Senden hat nicht geklappt. Bitte versuch es gleich nochmal.";
      step.querySelector(".submit-area").before(p);
      return;
    }
    track("Lead");
    show(total);
  });

  show(0);
})();
