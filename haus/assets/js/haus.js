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

  // An image, or a teal placeholder until the photo exists.
  function media(src, label, cls = "") {
    const ph = `<span class="ph-label">${esc(label)}</span>`;
    if (!src) return `<div class="media is-ph ${cls}" role="img" aria-label="${esc(label)} (placeholder)">${ph}</div>`;
    return `<div class="media ${cls}"><img src="${esc(src)}" alt="${esc(label)}" loading="lazy" onerror="this.parentNode.classList.add('is-ph');this.remove()">${ph}</div>`;
  }

  const projectUrl = (p) => `project.html?p=${encodeURIComponent(p.slug)}`;
  const service = (slug) => H.services.find((s) => s.slug === slug);

  /* ── Shared chrome ─────────────────────────────────────── */
  const logo = H.logo
    ? `<img src="${esc(H.logo)}" alt="${esc(H.name)}">`
    : `<span class="logo-mark">TH</span><span class="logo-text">THE<br>TALE<br>HAUS</span>`;

  const nav = `
    <nav class="pill-nav" aria-label="Main">
      <a href="index.html" ${page === "home" ? 'aria-current="page"' : ""}>HAUS</a>
      <a href="projects.html" ${page === "projects" || page === "project" ? 'aria-current="page"' : ""}>WORK</a>
      <a href="index.html#about">US</a>
      <a href="services.html" ${page === "services" ? 'aria-current="page"' : ""}>SERVICES</a>
    </nav>`;

  const topbar = `
    <header class="topbar">
      <div class="topbar-inner">
        <a class="logo" href="index.html" aria-label="${esc(H.name)} home">${logo}</a>
        <span class="divider" aria-hidden="true"></span>
        <p class="based">${H.location.map(esc).join("<br>")}</p>
        <span class="divider" aria-hidden="true"></span>
        <a class="btn-connect" href="mailto:${esc(H.contact.email)}">Let’s Connect</a>
      </div>
    </header>`;

  const slimbar = (backHref, backText) => `
    <header class="slimbar">
      <a class="back" href="${backHref}">${arrow.back}<span>${esc(backText)}</span></a>
    </header>`;

  const year = new Date().getFullYear();
  const footer = `
    <footer class="site-footer">
      <div class="footer-card">
        <div class="footer-cols">
          <form class="notify" ${H.newsletter.action ? `action="${esc(H.newsletter.action)}" method="POST"` : ""}>
            <h3>GET NOTIFIED</h3>
            <p>Be the first to know about workshops, events, projects +more</p>
            <label class="sr-only" for="notify-email">Email address</label>
            <input id="notify-email" name="email" type="email" required placeholder="Your email">
            <button type="submit">Submit</button>
            <p class="fine">Your information will only be used for notifications related to The Tale Haus and its affiliates.</p>
          </form>
          <div>
            <h3>FOLLOW THE TALE HAUS</h3>
            <p><a href="${esc(H.contact.instagram)}" target="_blank" rel="noopener">Instagram</a></p>
            <p><a href="${esc(H.contact.youtube)}" target="_blank" rel="noopener">YouTube</a></p>
          </div>
          <div>
            <h3>GET IN TOUCH</h3>
            <p><a href="mailto:${esc(H.contact.email)}">${esc(H.contact.email)}</a></p>
          </div>
        </div>
        <p class="copyright">Copyright © ${year} The Tale Haus | Let’s tell your tales | All rights reserved</p>
      </div>
    </footer>`;

  /* ── Pages ─────────────────────────────────────────────── */
  function home() {
    const latest = H.projects.find((p) => p.slug === H.latestProject) || H.projects[0];
    const tiles = H.services.filter((s) => s.label);
    return `
      ${topbar}
      <section class="hero-wrap">
        ${nav}
        <div class="hero">
          ${media(H.hero.image, "Hero image", "hero-media")}
          <h1>${H.hero.lines.map(esc).join("<br>")}</h1>
        </div>
      </section>

      <section class="block">
        <div class="head"><h2>LATEST PROJECT</h2><p>Dive into the latest project from The Tale Haus team.</p></div>
        <a class="card latest" href="${projectUrl(latest)}">
          ${media(H.latestImage || latest.cover, latest.title)}
          <span class="dash-btn">VIEW ${arrow.up}</span>
        </a>
      </section>

      <section class="block brands-block">
        <div class="head"><h2>TRUSTED BRANDS</h2></div>
        <div class="brands">
          ${H.brands.map((b) => (b.image ? `<img src="${esc(b.image)}" alt="${esc(b.name)}">` : `<span class="brand-ph">${esc(b.name)}</span>`)).join("")}
        </div>
      </section>

      <section class="block">
        <div class="head"><h2>PROJECT INDEX</h2><p>Some of our favorite projects that we’ve curated at The Tale Haus</p></div>
        <div class="index-head" aria-hidden="true"><span>ID</span><span>PROJECT</span></div>
        <ol class="project-list">
          ${H.projects.slice(0, 3).map((p, i) => `
            <li><a class="project-tile" href="${projectUrl(p)}">
              ${media(p.cover, p.title)}
              <span class="tile-id">${String(i + 1).padStart(2, "0")}</span>
              <span class="tile-title">${esc(p.title.toUpperCase())}</span>
            </a></li>`).join("")}
        </ol>
        <p class="center"><a class="btn-outline" href="projects.html">VIEW ALL PROJECTS</a></p>
      </section>

      <section class="block">
        <div class="head"><h2>SERVICES</h2><p>Dive into the services offered by The Tale Haus Team</p></div>
        <div class="service-grid">
          ${tiles.map((s) => `
            <a class="service-tile" href="services.html#${esc(s.slug)}">
              <span class="dash-btn">${esc(s.label).replace(/\n/g, "<br>").toUpperCase()}</span>
            </a>`).join("")}
        </div>
      </section>

      <section class="block about" id="about">
        <h2>ABOUT THE TALE HAUS</h2>
        <p>${rich(H.about)}</p>
      </section>
      ${footer}`;
  }

  function projects() {
    return `
      ${slimbar("index.html", "Home")}
      <section class="page-head">
        <h1 class="serif">PROJECT INDEX</h1>
        ${nav}
      </section>
      <ol class="project-list full">
        ${H.projects.map((p) => `
          <li><a class="project-tile tall" href="${projectUrl(p)}">
            ${media(p.cover, p.title)}
            <span class="tile-title">${esc(p.title.toUpperCase())}</span>
            <span class="dash-btn serif">VIEW ${arrow.up}</span>
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
      ${slimbar("projects.html", "Project Index")}
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
          <a class="dash-btn dark serif" href="#moments">More Moments ${arrow.down}</a>
        </div>
        ${nav}
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
      ${slimbar("index.html", "Home")}
      <section class="page-head">${nav}</section>
      ${H.servicesPageOrder.map(service).filter(Boolean).map((s) => `
        <section class="service" id="${esc(s.slug)}">
          <h2>${esc(s.title)}</h2>
          ${media(s.image, s.title)}
          <p>${rich(s.text)}</p>
        </section>`).join("")}
      ${footer}`;
  }

  main.innerHTML = { home, projects, project, services }[page]();

  // Jump to #hash after render (content didn't exist on initial load).
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
