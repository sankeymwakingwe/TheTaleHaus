/* The Tale Haus — renders every page from content.js. */
(function () {
  const H = window.HAUS;
  const page = document.body.dataset.page;
  const main = document.querySelector("main");

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  // *text* → <em>text</em>
  const rich = (s) => esc(s).replace(/\*(.+?)\*/g, "<em>$1</em>");

  const arrow = {
    up: '<svg class="ico" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 13 13 3M6 3h7v7" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>',
    down: '<svg class="ico" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1v13M3 9l5 5 5-5" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>',
    back: '<svg class="ico" viewBox="0 0 18 16" aria-hidden="true"><path d="M17 8H2M7 3 2 8l5 5" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>',
  };

  // An image (or video), or a teal placeholder until the file exists.
  function media(src, label, cls = "") {
    const ph = `<span class="ph-label">${esc(label)}</span>`;
    if (!src) return `<div class="media is-ph ${cls}" role="img" aria-label="${esc(label)} (placeholder)">${ph}</div>`;
    if (/\.(mp4|webm|mov)$/i.test(src)) return `<div class="media ${cls}"><video src="${esc(src)}" autoplay muted loop playsinline></video></div>`;
    return `<div class="media ${cls}"><img src="${esc(src)}" alt="${esc(label)}" loading="lazy" onerror="this.parentNode.classList.add('is-ph');this.remove()">${ph}</div>`;
  }

  const projectUrl = (p) => `project.html?p=${encodeURIComponent(p.slug)}`;

  /* ── Shared chrome ─────────────────────────────────────── */
  const logo = H.logo
    ? `<img src="${esc(H.logo)}" alt="${esc(H.name)}">`
    : `<span class="logo-mark">TH</span><span class="logo-text">THE<br>TALE<br>HAUS</span>`;

  const status = H.status[Math.floor(Math.random() * H.status.length)];
  const topbar = `
    <header class="topbar">
      <div class="topbar-inner">
        <a class="logo" href="index.html" aria-label="${esc(H.name)} home">${logo}</a>
        <span class="divider" aria-hidden="true"></span>
        <p class="info"><small>Based in</small>${esc(H.location)}</p>
        <span class="divider" aria-hidden="true"></span>
        <p class="info"><small>Local time</small><span class="clock">--:--</span></p>
        <span class="divider hide-md" aria-hidden="true"></span>
        <p class="info hide-md"><small>Currently, the Haus is</small>${esc(status)}</p>
        <a class="btn-connect" href="mailto:${esc(H.contact.email)}">Let’s Connect</a>
      </div>
    </header>`;

  // The teal pill nav from the design. It sticks to the top as you scroll.
  const nav = `
    <nav class="pill-nav" aria-label="Main">
      <a href="index.html" data-spy="hello" ${page === "home" ? 'aria-current="page"' : ""}>HAUS</a>
      <a href="projects.html" data-spy="work" ${page === "projects" || page === "project" ? 'aria-current="page"' : ""}>WORK</a>
      <a href="index.html#about" data-spy="about">US</a>
      <a href="services.html" data-spy="services" ${page === "services" ? 'aria-current="page"' : ""}>SERVICES</a>
    </nav>`;

  const year = new Date().getFullYear();
  const footer = `
    <footer class="site-footer" data-label="Footer">
      <div class="footer-card">
        <div class="footer-cols">
          <form class="notify" ${H.newsletter.action ? `action="${esc(H.newsletter.action)}" method="POST"` : ""}>
            <h3>GET NOTIFIED</h3>
            <p>Hear about new projects, behind-the-scenes and open shoot days.</p>
            <label class="sr-only" for="notify-email">Email address</label>
            <input id="notify-email" name="email" type="email" required placeholder="Your email">
            <button type="submit">Submit</button>
            <p class="fine">We’ll only use your email to send Tale Haus updates. Unsubscribe any time.</p>
          </form>
          <div>
            <h3>FOLLOW THE TALE HAUS</h3>
            <p><a href="${esc(H.contact.instagram)}" target="_blank" rel="noopener">Instagram ${arrow.up}</a></p>
            <p><a href="${esc(H.contact.youtube)}" target="_blank" rel="noopener">YouTube ${arrow.up}</a></p>
          </div>
          <div>
            <h3>GET IN TOUCH</h3>
            <p><a href="mailto:${esc(H.contact.email)}">${esc(H.contact.email)} ${arrow.up}</a></p>
          </div>
        </div>
        <p class="copyright">Copyright © ${year} The Tale Haus | Let’s tell your tales | All rights reserved</p>
      </div>
    </footer>`;

  /* ── Pages ─────────────────────────────────────────────── */
  function home() {
    const latest = H.projects.find((p) => p.slug === H.latestProject) || H.projects[0];
    const tiles = H.services.filter((s) => s.tile !== false);
    const brand = (b, hidden) =>
      b.image
        ? `<img src="${esc(b.image)}" alt="${hidden ? "" : esc(b.name)}">`
        : `<span class="brand-ph" ${hidden ? 'aria-hidden="true"' : ""}>${esc(b.name)}</span>`;
    return `
      ${topbar}
      ${nav}
      <section class="hero" id="hello" data-label="Hello">
        ${media(H.hero.video || H.hero.image, "Hero image or showreel", "hero-media")}
        <div class="hero-copy">
          <h1>${H.hero.lines.map(esc).join("<br>")}</h1>
          <p class="ready"><a class="dash-btn" href="mailto:${esc(H.contact.email)}">Let’s Connect</a></p>
        </div>
      </section>

      <section class="block" id="latest" data-label="Latest Project">
        <div class="head"><h2>LATEST PROJECT</h2><p>Fresh from the edit suite at The Tale Haus.</p></div>
        <a class="card latest" href="${projectUrl(latest)}">
          ${media(H.latestImage || latest.cover, latest.title)}
          <span class="card-copy">
            <strong>${esc(latest.title)}</strong>
            <small>${esc(latest.tag)}</small>
            <span class="dash-btn">VIEW ${arrow.up}</span>
          </span>
        </a>
      </section>

      <section class="block brands-block" id="brands" data-label="Trusted Brands">
        <div class="head"><h2>TRUSTED BRANDS</h2></div>
        <div class="brands">
          <div class="brands-track">${H.brands.map((b) => brand(b, false)).join("")}${H.brands.map((b) => brand(b, true)).join("")}</div>
        </div>
      </section>

      <section class="block" id="work" data-label="Project Index">
        <div class="head"><h2>PROJECT INDEX</h2><p>A few tales we’re proud of.</p></div>
        <div class="index-head" aria-hidden="true"><span>ID</span><span>PROJECT</span></div>
        <ol class="project-list">
          ${H.projects.slice(0, 3).map((p, i) => `
            <li><a class="project-tile" href="${projectUrl(p)}">
              ${media(p.cover, p.title)}
              <span class="tile-id">${String(i + 1).padStart(2, "0")}</span>
              <span class="tile-title">${esc(p.title.toUpperCase())}<small>${esc(p.tag)}</small></span>
              <span class="tile-view">VIEW ${arrow.up}</span>
            </a></li>`).join("")}
        </ol>
        <p class="center"><a class="btn-outline" href="projects.html">VIEW ALL PROJECTS</a></p>
      </section>

      <section class="block" id="services" data-label="Services">
        <div class="head"><h2>SERVICES</h2><p>Everything The Tale Haus team can make for you.</p></div>
        <div class="service-grid">
          ${tiles.map((s) => `
            <a class="service-tile" href="services.html#${esc(s.slug)}">
              <span class="dash-btn">${esc(s.label || s.title).replace(/\n/g, "<br>").toUpperCase()}</span>
              ${s.blurb ? `<span class="blurb">${esc(s.blurb)} ${arrow.up}</span>` : ""}
            </a>`).join("")}
        </div>
      </section>

      <section class="block about" id="about" data-label="About">
        <h2>ABOUT THE TALE HAUS</h2>
        ${H.about.paragraphs.map((p) => `<p>${rich(p)}</p>`).join("")}
      </section>
      ${footer}`;
  }

  function projects() {
    return `
      ${topbar}
      ${nav}
      <section class="page-head"><h1 class="serif">PROJECT INDEX</h1></section>
      <ol class="project-list full">
        ${H.projects.map((p) => `
          <li><a class="project-tile tall" href="${projectUrl(p)}">
            ${media(p.cover, p.title)}
            <span class="tile-title">${esc(p.title.toUpperCase())}<small>${esc(p.tag)}</small></span>
            <span class="dash-btn">VIEW ${arrow.up}</span>
          </a></li>`).join("")}
      </ol>
      ${footer}`;
  }

  function project() {
    const slug = new URLSearchParams(location.search).get("p");
    const p = H.projects.find((x) => x.slug === slug) || H.projects[0];
    document.title = `${p.title} — The Tale Haus`;

    let film;
    if (!p.film) film = media("", "Film", "film");
    else if (/\.(mp4|webm|mov)$/i.test(p.film)) film = `<div class="media film"><video src="${esc(p.film)}" controls playsinline preload="metadata"></video></div>`;
    else film = `<div class="media film"><iframe src="${esc(p.film)}" title="${esc(p.title)} film" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`;

    return `
      ${topbar}
      ${nav}
      <p class="backrow"><a class="back" href="projects.html">${arrow.back}<span>Project Index</span></a></p>
      <section class="project-hero">
        ${media(p.cover, p.title, "hero-media")}
        <h1 class="sr-only">${esc(p.title)}</h1>
      </section>
      <section class="details">
        <div class="meta">
          <small>Project Details</small>
          <div class="meta-row">
            <div><span class="serif">Client</span><strong>${esc(p.client)}</strong></div>
            <div class="right"><span class="serif">Year</span><strong>${esc(p.year)}</strong></div>
          </div>
        </div>
        <div class="collections">
          <h2 class="serif">Collections</h2>
          <small>Click a collection to jump to its content</small>
          <a class="dash-btn dark" href="#moments">More Moments ${arrow.down}</a>
        </div>
      </section>
      <section class="moments" id="moments">
        <h2 class="serif big">More Moments</h2>
        <h3 class="serif">Film</h3>
        ${film}
        <h3 class="serif">Shots</h3>
        <div class="collage">
          ${p.shots.map((s, i) => media(s.image, `${p.title} — shot ${i + 1}`, `shot ${s.shape}`)).join("")}
        </div>
      </section>
      ${footer}`;
  }

  function services() {
    return `
      ${topbar}
      ${nav}
      ${H.services.map((s) => `
        <section class="service" id="${esc(s.slug)}">
          <h2>${esc(s.title)}</h2>
          ${media(s.image, s.title)}
          <p>${rich(s.text)}</p>
        </section>`).join("")}
      ${footer}`;
  }

  main.innerHTML = { home, projects, project, services }[page]();


  /* ── Live clock in the studio's time zone ───────────────── */
  const clocks = document.querySelectorAll(".clock");
  const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: H.timeZone });
  const tick = () => clocks.forEach((el) => (el.textContent = fmt.format(new Date()) + " EAT"));
  tick();
  setInterval(tick, 15000);

  /* ── Side rails: current section on the left, next one on the right ── */
  const chapters = [...document.querySelectorAll("[data-label]")];
  if (chapters.length > 1) {
    document.body.classList.add("has-rails");
    const name = (i) => `${String(i).padStart(2, "0")} — ${chapters[i].dataset.label}`;
    document.body.insertAdjacentHTML("beforeend",
      '<aside class="rail rail-left" aria-hidden="true"><span></span></aside>' +
      '<aside class="rail rail-right" aria-hidden="true"><span></span></aside>');
    const [left, right] = document.querySelectorAll(".rail span");
    let shown = -1;
    const spyRails = () => {
      let i = 0;
      chapters.forEach((c, n) => { if (c.getBoundingClientRect().top < window.innerHeight * 0.5) i = n; });
      if (i === shown) return;
      shown = i;
      left.textContent = name(i);
      right.textContent = i + 1 < chapters.length ? name(i + 1) : "LET’S TELL YOUR TALES";
    };
    window.addEventListener("scroll", spyRails, { passive: true });
    spyRails();
  }

  /* ── Sticky nav: compact once scrolled, highlight the section in view ── */
  const navEl = document.querySelector(".pill-nav");
  const spyLinks = [...navEl.querySelectorAll("[data-spy]")];
  const spyTargets = spyLinks.map((a) => document.getElementById(a.dataset.spy)).filter(Boolean);
  const onScroll = () => {
    navEl.classList.toggle("stuck", navEl.getBoundingClientRect().top <= 13);
    if (page !== "home") return;
    let current = "hello";
    spyTargets.forEach((t) => { if (t.getBoundingClientRect().top < window.innerHeight * 0.4) current = t.id; });
    spyLinks.forEach((a) => (a.dataset.spy === current ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current")));
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // On the home page, nav links to sections on this page scroll instead of reloading.
  if (page === "home") {
    spyLinks.forEach((a) => {
      const id = a.dataset.spy;
      if (id === "hello" || id === "about") a.addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById(id).scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
      });
    });
  }

  /* ── Gentle fade-up as sections scroll into view ────────── */
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const els = document.querySelectorAll(".block > *, .service, .project-list li");
    els.forEach((el) => el.classList.add("rise"));
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { rootMargin: "0px 0px -8% 0px" });
    els.forEach((el) => io.observe(el));
  }

  if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView();

  // Newsletter: without a form endpoint, fall back to the visitor's email app.
  const form = document.querySelector(".notify");
  if (form && !H.newsletter.action) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = form.querySelector("input").value;
      location.href = `mailto:${H.contact.email}?subject=${encodeURIComponent("Get notified")}&body=${encodeURIComponent("Please add " + email + " to The Tale Haus updates.")}`;
    });
  }
})();
