/* Shared chrome (header, floating nav) + per-page rendering. */
(function () {
  const S = window.SITE;
  const page = document.body.dataset.page;

  const icon = {
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/></svg>',
    pinterest: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><path d="M10.5 20.5 12 13m0 0c.3 1.3 1.4 2 2.6 2 2.2 0 3.6-2 3.6-4.6C18.2 7.6 15.8 6 13 6 9.6 6 7.6 8.4 7.6 11c0 1.1.4 2.2 1.2 2.7"/></svg>',
    share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 5l7 6-7 6v-3.5c-5 0-8.5 1.5-11 5 1-5 4-9.5 11-10.5V5z"/></svg>',
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
  document.title = document.title.replace("Your Name", fullName);

  /* ── Header ─────────────────────────────────────────────── */
  const links = [
    ["index.html", "Home", "home"],
    ["work.html", "Work", "work"],
    ["about.html", "About", "about"],
    ["contact.html", "Contact", "contact"],
  ];
  const navLinks = links
    .map(([href, label, key]) => {
      const current = page === key || (key === "work" && page === "gallery");
      return `<a href="${href}"${current ? ' class="is-current" aria-current="page"' : ""}>${label}</a>`;
    })
    .join("");

  document.body.insertAdjacentHTML(
    "afterbegin",
    `<header class="site-header">
      <a class="logo" href="index.html" aria-label="${esc(fullName)} — home">
        <span class="logo-line">${spaced(S.firstName)}</span>
        <span class="logo-line">${spaced(S.lastName)}</span>
      </a>
      <div class="header-icons">
        ${S.social.instagram ? `<a href="${S.social.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${icon.instagram}</a>` : ""}
        ${S.social.pinterest ? `<a href="${S.social.pinterest}" target="_blank" rel="noopener" aria-label="Pinterest">${icon.pinterest}</a>` : ""}
        <button type="button" class="share-btn" aria-label="Share">${icon.share}</button>
      </div>
    </header>
    <nav class="float-nav" aria-label="Main">${navLinks}</nav>`
  );

  document.querySelector(".share-btn").addEventListener("click", async () => {
    const data = { title: document.title, url: location.href };
    try {
      if (navigator.share) await navigator.share(data);
      else {
        await navigator.clipboard.writeText(location.href);
        toast("Link copied");
      }
    } catch (_) {}
  });

  function toast(msg) {
    const t = document.createElement("div");
    t.className = "toast";
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2000);
  }

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
              <span class="slide-index">${String(i + 1).padStart(2, "0")}</span>
              <h2>${esc(cat.title)}</h2>
              <a class="view-link" href="gallery.html?c=${cat.slug}">View Work ${icon.arrow}</a>
            </div>
          </section>`
        )
        .join("") +
      `<nav class="dots" aria-label="Sections">${S.categories
        .map((cat) => `<a href="#${cat.slug}" aria-label="${esc(cat.title)}"></a>`)
        .join("")}</nav>`;

    const slides = [...main.querySelectorAll(".slide")];
    const dots = [...main.querySelectorAll(".dots a")];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          slides.forEach((s) => s.classList.toggle("is-active", s === e.target));
          dots.forEach((d, i) => d.classList.toggle("is-active", slides[i] === e.target));
        });
      },
      { threshold: 0.6 }
    );
    slides.forEach((s) => io.observe(s));

    document.addEventListener("keydown", (e) => {
      if (!["ArrowDown", "ArrowUp", "PageDown", "PageUp"].includes(e.key)) return;
      e.preventDefault();
      const cur = slides.findIndex((s) => s.classList.contains("is-active"));
      const next = Math.max(0, Math.min(slides.length - 1, cur + (e.key === "ArrowDown" || e.key === "PageDown" ? 1 : -1)));
      slides[next].scrollIntoView({ behavior: "smooth" });
    });
  }

  if (page === "work") {
    main.innerHTML = `<section class="work-grid">${S.categories
      .map(
        (cat, i) => `<a class="work-tile" href="gallery.html?c=${cat.slug}">
          <div class="work-tile-media" style="${bg(cat.cover, cat.fallback)}"></div>
          <div class="work-tile-text">
            <span class="slide-index">${String(i + 1).padStart(2, "0")}</span>
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
        .map((src, i) => `<button type="button" class="gallery-item" data-i="${i}" style="${bg(src, cat.fallback)}" aria-label="Open image ${i + 1}"></button>`)
        .join("")}</section>
      <a class="next-cat slide" href="gallery.html?c=${next.slug}">
        <div class="slide-media" style="${bg(next.cover, next.fallback)}"></div>
        <div class="slide-text">
          <span class="slide-index">Next</span>
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
})();
