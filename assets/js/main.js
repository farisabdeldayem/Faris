/* ============================================================
   EINSTELLUNGEN – hier anpassen
   ============================================================ */
const CONFIG = {
  // Meta Pixel ID (aus dem Meta Business Manager), z. B. "123456789012345"
  metaPixelId: "",
  // Wohin die Bewerbungen geschickt werden (FormSubmit leitet sie per E-Mail weiter).
  // Beim allerersten Absenden schickt FormSubmit eine Bestätigungs-Mail – einmal klicken, fertig.
  leadEmail: "farisabdeldayem@gmail.com",
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
document.querySelectorAll(".media img").forEach((img) => {
  const box = img.closest(".media");
  const fail = () => box.classList.add("missing");
  if (img.complete && img.naturalWidth === 0) fail();
  img.addEventListener("error", fail);
});

/* ---------- Videos: Klick zum Abspielen, Platzhalter wenn Datei fehlt ---------- */
document.querySelectorAll(".player").forEach((box) => {
  const video = box.querySelector("video");
  const src = video.dataset.src;
  // Prüfen, ob die Videodatei existiert (lädt nur die Kopfdaten)
  video.preload = "metadata";
  video.src = src + "#t=0.1";
  video.addEventListener("error", () => box.classList.add("missing"));
  const start = () => {
    if (box.classList.contains("missing")) return;
    document.querySelectorAll(".player.playing video").forEach((v) => v !== video && v.pause());
    box.classList.add("playing");
    video.controls = true;
    video.play();
    track("ViewContent", { content_name: box.dataset.title || src });
  };
  box.querySelector(".play").addEventListener("click", start);
  video.addEventListener("pause", () => { if (video.ended) box.classList.remove("playing"); });
});

/* ---------- Beim Scrollen einblenden ---------- */
(() => {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) return els.forEach((e) => e.classList.add("in"));
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { rootMargin: "0px 0px -8% 0px" });
  els.forEach((e) => io.observe(e));
})();

/* ---------- Sticky-Button am Handy ausblenden, wenn ein anderer CTA sichtbar ist ---------- */
(() => {
  const sticky = document.querySelector(".sticky-cta");
  if (!sticky || !("IntersectionObserver" in window)) return;
  const targets = document.querySelectorAll(".cta-band, .footer, .hero .btn-row");
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
    data._subject = `Neue Bewerbung: ${data.Vorname} ${data.Nachname}`;
    data._template = "table";
    data._captcha = "false";

    try {
      if (CONFIG.leadEmail) {
        await fetch(`https://formsubmit.co/ajax/${CONFIG.leadEmail}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data),
        });
      }
    } catch (_) { /* Danke-Seite trotzdem zeigen */ }
    track("Lead");
    show(total);
  });

  show(0);
})();
