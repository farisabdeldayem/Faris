// Mehrstufiges Bewerbungsformular (Funnel für Meta Ads)
(function () {
  // Hier später den Webhook eintragen (z. B. Make/Zapier, Formspree oder eigenes Backend).
  const SUBMIT_URL = "";

  const form = document.getElementById("funnel");
  if (!form) return;
  const steps = [...form.querySelectorAll(".q")];
  const bar = form.querySelector(".bar");
  const back = form.querySelector(".back");
  let i = 0;

  function show(n) {
    steps.forEach((s, k) => s.classList.toggle("active", k === n));
    i = n;
    bar.style.width = Math.min(100, ((n + 1) / (steps.length - 1)) * 100) + "%";
    back.style.visibility = n > 0 && n < steps.length - 1 ? "visible" : "hidden";
  }

  // Auswahl antippen => automatisch weiter
  form.addEventListener("change", (e) => {
    if (e.target.type === "radio") setTimeout(() => show(i + 1), 180);
  });
  back.addEventListener("click", () => show(Math.max(0, i - 1)));

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const last = steps[i];
    const fields = [...last.querySelectorAll("input[required]")];
    const bad = fields.find((f) => !f.checkValidity());
    last.querySelector(".err")?.remove();
    if (bad) {
      const p = document.createElement("p");
      p.className = "err";
      p.textContent = "Bitte fülle alle Felder aus und bestätige den Datenschutz.";
      last.appendChild(p);
      bad.focus();
      return;
    }
    const data = Object.fromEntries(new FormData(form));
    data.quelle = new URLSearchParams(location.search).get("utm_source") || "direkt";
    data.kampagne = new URLSearchParams(location.search).get("utm_campaign") || "";
    try {
      if (SUBMIT_URL) {
        await fetch(SUBMIT_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      }
    } catch (_) { /* trotzdem Danke-Seite zeigen */ }
    if (window.fbq) window.fbq("track", "Lead");
    show(steps.length - 1);
  });

  show(0);
})();
