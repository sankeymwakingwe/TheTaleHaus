(() => {
  // Header turns solid blue once you scroll past the top of the hero.
  const header = document.querySelector("[data-header]");
  const onScroll = () => header.classList.toggle("solid", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Phone menu.
  const menuBtn = document.querySelector("[data-menu]");
  const nav = document.getElementById("nav");
  const setMenu = (open) => {
    menuBtn.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("open", open);
    if (open) header.classList.add("solid"); else onScroll();
  };
  menuBtn.addEventListener("click", () => setMenu(menuBtn.getAttribute("aria-expanded") !== "true"));
  nav.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && nav.classList.contains("open")) { setMenu(false); menuBtn.focus(); } });

  // Process steps: one open at a time.
  const steps = [...document.querySelectorAll("[data-steps] button")];
  steps.forEach((btn) => btn.addEventListener("click", () => {
    steps.forEach((b) => {
      const open = b === btn;
      b.setAttribute("aria-expanded", String(open));
      document.getElementById(b.getAttribute("aria-controls")).hidden = !open;
    });
  }));

  document.querySelectorAll("[data-year]").forEach((el) => { el.textContent = new Date().getFullYear(); });

  // Enquiry form: sends to api/contact.php; if that can't be reached (for
  // example when the page is opened as a plain file), opens WhatsApp instead.
  const form = document.querySelector("[data-form]");
  const status = form.querySelector(".form-status");
  const whatsappFallback = (d) => {
    const text = `Hello ArchFams, I'm ${d.get("name")}.\nProject: ${d.get("service")}\n${d.get("message")}\nPhone: ${d.get("phone")}`;
    window.open(`https://wa.me/255745468634?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  };
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const btn = form.querySelector("button[type=submit]");
    btn.disabled = true;
    status.textContent = "Sending…";
    try {
      const res = await fetch(form.action, { method: "POST", body: data, headers: { Accept: "application/json" } });
      const json = await res.json();
      status.textContent = json.message;
      if (json.ok) form.reset();
    } catch {
      status.textContent = "Opening WhatsApp so you can send it there.";
      whatsappFallback(data);
    } finally {
      btn.disabled = false;
    }
  });
})();
