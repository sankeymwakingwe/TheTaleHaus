/* Shared chrome (header, floating nav) + per-page rendering. */
(function () {
  const S = window.SITE;
  const page = document.body.dataset.page;

  const icon = {
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/></svg>',
    pinterest: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><path d="M10.5 20.5 12 13m0 0c.3 1.3 1.4 2 2.6 2 2.2 0 3.6-2 3.6-4.6C18.2 7.6 15.8 6 13 6 9.6 6 7.6 8.4 7.6 11c0 1.1.4 2.2 1.2 2.7"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 12h15m-5-5 5 5-5 5"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  };

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const spaced = (word) => [...word].map((c) => `<span>${esc(c)}</span>`).join("");
  // Photo layered over a gradient: if the photo is missing, the gradient shows.
  const bg = (img, fallback) => `background-image: url('${img}'), ${fallback || "linear-gradient(#1a1a1a,#0a0a0a)"}`;
  const fullName = `${S.firstName} ${S.lastName}`;

  /* ── Header: centred floating nav ───────────────────────── */
  const links = [
    ["index.html", "Home", "home"],
    ["work.html", "Work", "work"],
    ["about.html", "About", "about"],
    ["contact.html", "Contact", "contact"],
  ];
  const navLink = ([href, label, key]) => {
    const current = page === key || (key === "work" && page === "gallery");
    return `<a href="${href}"${current ? ' class="is-current" aria-current="page"' : ""}>${label}</a>`;
  };

  // Centred: two links, the logo, two links.
  document.body.insertAdjacentHTML(
    "afterbegin",
    `<header class="site-header">
      <nav class="float-nav" aria-label="Main">
        ${links.slice(0, 2).map(navLink).join("")}
        <a class="logo" href="index.html" aria-label="${esc(fullName)} — home">
          <span class="logo-line">${spaced(S.firstName)}</span>
          <span class="logo-line">${spaced(S.lastName)}</span>
        </a>
        ${links.slice(2).map(navLink).join("")}
      </nav>
    </header>`
  );

  const c = S.contact;

  /* ── Pages ──────────────────────────────────────────────── */
  const main = document.querySelector("main");

  if (page === "home") {
    main.innerHTML =
      S.categories
        .map(
          (cat, i) => `<section class="slide" id="${cat.slug}">
            <div class="slide-media" style="${bg(cat.cover, cat.fallback)}"></div>
            <div class="slide-text">
              <span class="slide-index">Chapter ${String(i + 1).padStart(2, "0")}</span>
              <h2>${esc(cat.title)}</h2>
              <a class="view-link" href="gallery.html?c=${cat.slug}">View Work ${icon.arrow}</a>
            </div>
          </section>`
        )
        .join("") +
      `<nav class="dots" aria-label="Sections">${S.categories
        .map((cat) => `<a href="#${cat.slug}" aria-label="${esc(cat.title)}"></a>`)
        .join("")}</nav>`;

    main.insertAdjacentHTML(
      "beforeend",
      `<div class="hud" aria-hidden="true">
        <span class="hud-scene">Scene <b>01</b> / ${String(S.categories.length).padStart(2, "0")}</span>
        <span class="hud-tc"><i></i><b>00:00:00:00</b></span>
      </div>`
    );
    const slides = [...main.querySelectorAll(".slide")];
    const dots = [...main.querySelectorAll(".dots a")];
    const sceneNum = main.querySelector(".hud-scene b");
    main.addEventListener("scene", (e) => {
      const i = slides.indexOf(e.detail);
      dots.forEach((d, j) => d.classList.toggle("is-active", j === i));
      sceneNum.textContent = String(i + 1).padStart(2, "0");
    });

    // Running 24fps timecode, like a camera viewfinder.
    const tc = main.querySelector(".hud-tc b");
    const t0 = performance.now();
    const pad = (n) => String(n).padStart(2, "0");
    setInterval(() => {
      const f = Math.floor(((performance.now() - t0) / 1000) * 24);
      tc.textContent = `${pad(Math.floor(f / 86400))}:${pad(Math.floor(f / 1440) % 60)}:${pad(Math.floor(f / 24) % 60)}:${pad(f % 24)}`;
    }, 1000 / 24);

    document.addEventListener("keydown", (e) => {
      if (!["ArrowDown", "ArrowUp", "PageDown", "PageUp"].includes(e.key)) return;
      e.preventDefault();
      const cur = Math.max(0, slides.findIndex((s) => s.classList.contains("is-active")));
      const next = Math.max(0, Math.min(slides.length - 1, cur + (e.key === "ArrowDown" || e.key === "PageDown" ? 1 : -1)));
      slides[next].scrollIntoView({ behavior: "smooth" });
    });
  }

  if (page === "work") {
    main.innerHTML = `<section class="work-grid">${S.categories
      .map(
        (cat, i) => `<a class="work-tile reveal" href="gallery.html?c=${cat.slug}">
          <div class="work-tile-media reveal-media" style="${bg(cat.cover, cat.fallback)}"></div>
          <div class="work-tile-text">
            <span class="slide-index">Chapter ${String(i + 1).padStart(2, "0")}</span>
            <h2>${esc(cat.title)}</h2>
            <span class="view-link">View Work ${icon.arrow}</span>
          </div>
        </a>`
      )
      .join("")}</section>`;
  }

  if (page === "gallery") {
    const slug = new URLSearchParams(location.search).get("c");
    const cat = S.categories.find((x) => x.slug === slug) || S.categories[0];
    document.title = `${cat.title} — ${fullName}`;
    const idx = S.categories.indexOf(cat);
    const next = S.categories[(idx + 1) % S.categories.length];

    main.innerHTML = `
      <section class="slide is-active hero">
        <div class="slide-media" style="${bg(cat.cover, cat.fallback)}"></div>
        <div class="slide-text">
          <a class="back-link" href="work.html">← All Work</a>
          <h2>${esc(cat.title)}</h2>
          <span class="scroll-hint">Scroll</span>
        </div>
      </section>
      <section class="gallery">${cat.images
        .map((src, i) => `<button type="button" class="gallery-item reveal" data-i="${i}" aria-label="Open image ${i + 1}"><span class="reveal-media" style="${bg(src, cat.fallback)}"></span></button>`)
        .join("")}</section>
      <a class="next-cat slide" href="gallery.html?c=${next.slug}">
        <div class="slide-media" style="${bg(next.cover, next.fallback)}"></div>
        <div class="slide-text">
          <span class="slide-index">Next chapter</span>
          <h2>${esc(next.title)}</h2>
          <span class="view-link">View Work ${icon.arrow}</span>
        </div>
      </a>`;

    // Lightbox
    const lb = document.createElement("div");
    lb.className = "lightbox";
    lb.hidden = true;
    lb.innerHTML = `<button type="button" class="lb-close" aria-label="Close">${icon.close}</button>
      <button type="button" class="lb-prev" aria-label="Previous">‹</button>
      <div class="lb-img"></div>
      <button type="button" class="lb-next" aria-label="Next">›</button>
      <div class="lb-count"></div>`;
    document.body.appendChild(lb);
    let cur = 0;
    const show = (i) => {
      cur = (i + cat.images.length) % cat.images.length;
      lb.querySelector(".lb-img").style.cssText = bg(cat.images[cur], cat.fallback);
      lb.querySelector(".lb-count").textContent = `${cur + 1} / ${cat.images.length}`;
      lb.hidden = false;
      document.body.classList.add("no-scroll");
    };
    const hide = () => {
      lb.hidden = true;
      document.body.classList.remove("no-scroll");
    };
    main.querySelectorAll(".gallery-item").forEach((b) => b.addEventListener("click", () => show(+b.dataset.i)));
    lb.querySelector(".lb-close").addEventListener("click", hide);
    lb.querySelector(".lb-prev").addEventListener("click", () => show(cur - 1));
    lb.querySelector(".lb-next").addEventListener("click", () => show(cur + 1));
    lb.addEventListener("click", (e) => e.target === lb && hide());
    document.addEventListener("keydown", (e) => {
      if (lb.hidden) return;
      if (e.key === "Escape") hide();
      if (e.key === "ArrowLeft") show(cur - 1);
      if (e.key === "ArrowRight") show(cur + 1);
    });
  }

  if (page === "about") {
    const a = S.about;
    main.innerHTML = `<section class="slide is-active panel">
      <div class="slide-media" style="${bg(a.image, S.categories[0].fallback)}"></div>
      <div class="panel-text">
        <span class="slide-index">About</span>
        <h1>${esc(a.heading)}</h1>
        ${a.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("")}
        <a class="view-link" href="contact.html">Work with me ${icon.arrow}</a>
      </div>
    </section>`;
  }

  if (page === "contact") {
    const cover = S.categories[1] || S.categories[0];
    main.innerHTML = `<section class="slide is-active panel">
      <div class="slide-media" style="${bg(cover.cover, cover.fallback)}"></div>
      <div class="panel-text">
        <span class="slide-index">Contact</span>
        <h1>Let's tell your story.</h1>
        <ul class="contact-list">
          <li><a href="mailto:${c.email}">${icon.mail}${esc(c.email)}</a></li>
          <li><a href="tel:${c.phone.replace(/[^\d+]/g, "")}">${icon.phone}${esc(c.phone)}</a></li>
          <li><a href="${c.mapUrl}" target="_blank" rel="noopener">${icon.pin}${esc(c.location)}</a></li>
          ${S.social.instagram ? `<li><a href="${S.social.instagram}" target="_blank" rel="noopener">${icon.instagram}Instagram</a></li>` : ""}
          ${S.social.pinterest ? `<li><a href="${S.social.pinterest}" target="_blank" rel="noopener">${icon.pinterest}Pinterest</a></li>` : ""}
        </ul>
        <form class="contact-form">
          <input name="name" placeholder="Name" required>
          <input name="email" type="email" placeholder="Email" required>
          <textarea name="message" rows="4" placeholder="Tell me about your project" required></textarea>
          <button type="submit" class="view-link">Send ${icon.arrow}</button>
        </form>
      </div>
    </section>`;
    // No backend: open the visitor's email app with the message pre-filled.
    main.querySelector(".contact-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const f = new FormData(e.target);
      const body = `${f.get("message")}\n\n— ${f.get("name")} (${f.get("email")})`;
      location.href = `mailto:${c.email}?subject=${encodeURIComponent("Enquiry from " + f.get("name"))}&body=${encodeURIComponent(body)}`;
    });
  }

  /* ── Cinematic layer ────────────────────────────────────── */
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.body.insertAdjacentHTML(
    "beforeend",
    `<div class="grain" aria-hidden="true"></div>
    <div class="vignette" aria-hidden="true"></div>
    <div class="letterbox" aria-hidden="true"><span></span><span></span></div>`
  );

  // Split headings into letters so they can resolve one by one, like a title card.
  document.querySelectorAll(".slide h2, .work-tile h2, .panel h1").forEach((el) => {
    const text = el.textContent;
    let n = 0;
    el.setAttribute("aria-label", text);
    el.innerHTML = text
      .split(" ")
      .map((word) => `<span class="w" aria-hidden="true">${[...word].map((ch) => `<span class="ch" style="--i:${n++}">${esc(ch)}</span>`).join("")}</span>`)
      .join(" ");
  });

  // Every full-screen scene comes alive when it fills most of the screen.
  const sceneIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        e.target.classList.toggle("is-active", e.isIntersecting);
        if (e.isIntersecting) main.dispatchEvent(new CustomEvent("scene", { detail: e.target }));
      });
    },
    { threshold: 0.6 }
  );
  // About/Contact panels can be taller than the screen, so they stay lit.
  document.querySelectorAll(".slide:not(.panel)").forEach((el) => sceneIO.observe(el));

  // Tiles and gallery frames wipe in as they enter the screen.
  const revealIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("in-view");
        revealIO.unobserve(e.target);
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal").forEach((el) => revealIO.observe(el));

  // Opening: letterbox bars part to reveal the page.
  const root = document.documentElement;
  const open = () => requestAnimationFrame(() => root.classList.add("is-open"));

  // Title card, shown once per visit on the home page.
  let seenIntro = true;
  try {
    seenIntro = sessionStorage.getItem("intro") === "1";
    sessionStorage.setItem("intro", "1");
  } catch (_) {}

  if (page === "home" && !seenIntro && !reduceMotion) {
    document.body.insertAdjacentHTML(
      "beforeend",
      `<div class="intro" role="presentation">
        <span class="intro-pre">A tale by</span>
        <span class="intro-name">${spaced(fullName)}</span>
        <span class="intro-tag">${esc(S.tagline)}</span>
      </div>`
    );
    const intro = document.querySelector(".intro");
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      intro.classList.add("is-done");
      open();
      setTimeout(() => intro.remove(), 1200);
    };
    intro.addEventListener("click", finish);
    setTimeout(finish, 3600);
  } else {
    open();
  }

  // Closing: bars shut before moving to another page, then part again on arrival.
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href]");
    if (!a || reduceMotion || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (a.target === "_blank" || a.origin !== location.origin || a.getAttribute("href").startsWith("#")) return;
    if (a.pathname === location.pathname && a.search === location.search) return;
    e.preventDefault();
    root.classList.add("is-leaving");
    setTimeout(() => (location.href = a.href), 650);
  });
  // Coming back via the browser's back button restores the page mid-transition.
  addEventListener("pageshow", (e) => e.persisted && root.classList.remove("is-leaving"));
})();
