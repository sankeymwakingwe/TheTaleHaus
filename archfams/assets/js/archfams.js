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

  // Process steps: the chosen step's picture and notes show beside the list.
  const steps = [...document.querySelectorAll("[data-steps] button")];
  steps.forEach((btn) => btn.addEventListener("click", () => {
    steps.forEach((b) => {
      const open = b === btn;
      b.setAttribute("aria-expanded", String(open));
      document.getElementById(b.getAttribute("aria-controls")).hidden = !open;
    });
  }));

  const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Hero: as you scroll away it darkens, zooms slightly and the headline lifts out.
  const hero = document.querySelector(".hero");
  const heroPhoto = hero.querySelector(".hero-photo");
  if (!calm) {
    let ticking = false;
    const paint = () => {
      const p = Math.min(1, Math.max(0, window.scrollY / hero.offsetHeight));
      hero.style.setProperty("--p", p.toFixed(3));
      heroPhoto.style.transform = `scale(${1 + p * 0.08})`;
      ticking = false;
    };
    window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(paint); } }, { passive: true });
    heroPhoto.addEventListener("animationend", () => { heroPhoto.style.animation = "none"; paint(); }, { once: true });
  }

  // Sections fade up the first time they come into view.
  if (!calm && "IntersectionObserver" in window) {
    document.documentElement.classList.add("reveal-on");
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
  }

  // Cursor follower on desktop: a ring that trails the mouse, grows over links
  // and becomes a "View" disc over project cards.
  const cursor = document.querySelector(".cursor");
  if (cursor && !calm && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    const label = cursor.querySelector(".cursor-label");
    let x = -100, y = -100, cx = x, cy = y;
    window.addEventListener("pointermove", (e) => {
      x = e.clientX; y = e.clientY;
      cursor.classList.add("on");
      const t = e.target instanceof Element ? e.target : null;
      const named = t && t.closest("[data-cursor]");
      const link = t && t.closest("a, button, select, input, textarea, label");
      cursor.classList.toggle("label", !!named);
      cursor.classList.toggle("link", !named && !!link);
      cursor.classList.toggle("light", !!(t && t.closest(".hero, .projects, .contact, .site-header.solid")));
      label.textContent = named ? named.dataset.cursor : "";
    }, { passive: true });
    document.addEventListener("pointerleave", () => cursor.classList.remove("on"));
    const loop = () => {
      cx += (x - cx) * 0.18; cy += (y - cy) * 0.18;
      cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      requestAnimationFrame(loop);
    };
    loop();
  }

  // Client logos scroll in a loop: the list is doubled so the loop is seamless.
  const marquee = document.querySelector("[data-marquee]");
  if (marquee && !calm) {
    const track = marquee.querySelector(".marquee-track");
    [...track.children].forEach((li) => {
      const copy = li.cloneNode(true);
      copy.setAttribute("aria-hidden", "true");
      track.appendChild(copy);
    });
    track.style.setProperty("--marquee-time", `${Math.max(20, track.children.length * 3.5)}s`);
    marquee.style.setProperty("--marquee-time", `${Math.max(20, track.children.length * 3.5)}s`);
    marquee.classList.add("running");
  }

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
