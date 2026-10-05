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

  // An image (or video), or a placeholder until the file exists.
  function media(src, label, cls = "") {
    const ph = `<span class="ph-label">${esc(label)}</span>`;
    if (!src) return `<div class="media is-ph ${cls}" role="img" aria-label="${esc(label)} (placeholder)">${ph}</div>`;
    if (/\.(mp4|webm|mov)$/i.test(src)) return `<div class="media ${cls}"><video src="${esc(src)}" autoplay muted loop playsinline></video></div>`;
    return `<div class="media ${cls}"><img src="${esc(src)}" alt="${esc(label)}" loading="lazy" onerror="this.parentNode.classList.add('is-ph');this.remove()">${ph}</div>`;
  }

  const projectUrl = (p) => `project.html?p=${encodeURIComponent(p.slug)}`;
  const service = (slug) => H.services.find((s) => s.slug === slug);

  /* ── Shared chrome ─────────────────────────────────────── */
  const logo = H.logo
    ? `<img src="${esc(H.logo)}" alt="${esc(H.name)}">`
    : `<span class="logo-word">The Tale Haus<sup>®</sup></span><span class="logo-mono" aria-hidden="true">TH</span>`;

  const status = H.status[Math.floor(Math.random() * H.status.length)];
  const infobar = `
    <header class="infobar">
      <div class="cell cell-logo"><small>Creative Studio</small><a class="logo" href="index.html" aria-label="${esc(H.name)} home">${logo}</a></div>
      <div class="cell"><small>Based in</small><span>${esc(H.location)}</span></div>
      <div class="cell"><small>Local time</small><span class="clock">--:--</span></div>
      <div class="cell cell-status"><small>Currently, the Haus is</small><span>${esc(status)}</span></div>
      <div class="cell cell-cta"><a class="btn-dark" href="mailto:${esc(H.contact.email)}">Let’s Connect</a></div>
    </header>`;

  const nav = `
    <nav class="pill-nav" aria-label="Main">
      <a href="index.html">HAUS</a>
      <a href="projects.html" ${page === "projects" || page === "project" ? 'aria-current="page"' : ""}>WORK</a>
      <a href="index.html#team">US</a>
      <a href="services.html" ${page === "services" ? 'aria-current="page"' : ""}>SERVICES</a>
    </nav>`;

  const year = new Date().getFullYear();
  const footerCard = `
    <div class="footer-card">
      <p class="footer-logo">The Tale<br>.Haus<sup>®</sup></p>
      <div class="footer-cols">
        <form class="notify" ${H.newsletter.action ? `action="${esc(H.newsletter.action)}" method="POST"` : ""}>
          <h3>STAY IN THE LOOP</h3>
          <p>Hear about new projects, behind-the-scenes and open shoot days.</p>
          <label class="sr-only" for="notify-email">Email address</label>
          <input id="notify-email" name="email" type="email" required placeholder="Email">
          <button type="submit">Submit</button>
          <p class="fine">We’ll only use your email to send Tale Haus updates. Unsubscribe any time.</p>
        </form>
        <div>
          <h3>FOLLOW THE HAUS</h3>
          <p><a href="${esc(H.contact.instagram)}" target="_blank" rel="noopener">Instagram ${arrow.up}</a></p>
          <p><a href="${esc(H.contact.youtube)}" target="_blank" rel="noopener">YouTube ${arrow.up}</a></p>
        </div>
        <div>
          <h3>SAY HELLO</h3>
          <p><a href="mailto:${esc(H.contact.email)}">${esc(H.contact.email)} ${arrow.up}</a></p>
        </div>
      </div>
      <p class="copyright">© 2024–${year} The Tale Haus | Let’s tell your tales | All rights reserved</p>
    </div>`;
  const footer = `<footer class="site-footer">${footerCard}</footer>`;

  /* ── Home: a sideways film strip of numbered chapters ───── */
  const spine = (n, label) => `<div class="spine" aria-hidden="true"><span>${String(n).padStart(2, "0")} — ${esc(label)}</span></div>`;
  const shapes = ["square", "circle", "diamond", "square"];
  const serviceList = (group) =>
    H.services.filter((s) => s.group === group).map((s, i) => `
      <article class="svc">
        <h3><span class="shape ${shapes[i % shapes.length]}" aria-hidden="true"></span>${esc(s.title)}</h3>
        <p>${rich(s.text)}</p>
      </article>`).join("");

  function home() {
    const latest = H.projects.find((p) => p.slug === H.latestProject) || H.projects[0];
    const chapters = [
      {
        id: "hello", label: "Hello",
        html: `
          <div class="panel hero-panel">
            <div class="hero">
              ${media(H.hero.video || H.hero.image, "Showreel video", "hero-media")}
              <div class="hero-copy">
                <h1>${H.hero.lines.map(esc).join("<br>")}</h1>
                <p class="tagline">${esc(H.hero.tagline)}</p>
                <p class="ready"><small>Ready?</small><a class="btn-ghost" href="mailto:${esc(H.contact.email)}">Let’s Connect</a></p>
              </div>
            </div>
          </div>`,
      },
      {
        id: "mission", label: "Our Mission",
        html: `
          ${media(H.mission.image, "Behind the scenes photo", "panel photo-panel")}
          <div class="panel text-panel">
            <h2>01 OUR MISSION</h2>
            <h3 class="lede">${esc(H.mission.title)}</h3>
            ${H.mission.paragraphs.map((p) => `<p class="body">${rich(p)}</p>`).join("")}
          </div>`,
      },
      {
        id: "broadcast", label: "Broadcast + Film",
        html: `
          ${media("", "Live production photo", "panel photo-panel wide")}
          <div class="panel text-panel wide">
            <h2>02 BROADCAST + FILM</h2>
            <div class="svc-grid">${serviceList("broadcast")}
              <p class="svc-cta"><a class="btn-outline" href="services.html#film-production">Start a Production</a></p>
            </div>
          </div>`,
      },
      {
        id: "creative", label: "Photo + Design",
        html: `
          ${media("", "Portrait photo", "panel photo-panel")}
          <div class="panel text-panel wide">
            <h2>03 PHOTO + DESIGN</h2>
            <div class="svc-grid">${serviceList("creative")}
              <p class="svc-cta"><a class="btn-outline" href="services.html#photography">Start a Project</a></p>
            </div>
          </div>`,
      },
      {
        id: "work", label: "Work",
        html: `
          ${media("", "On-set photo", "panel photo-panel narrow")}
          <div class="panel work-panel">
            <h2>04 WORK</h2>
            <div class="marquee" aria-label="Brands we’ve worked with">
              <div class="marquee-track">
                ${[...H.brands, ...H.brands].map((b, i) => (b.image ? `<img src="${esc(b.image)}" alt="${i < H.brands.length ? esc(b.name) : ""}">` : `<span class="brand-ph" ${i >= H.brands.length ? 'aria-hidden="true"' : ""}>${esc(b.name)}</span>`)).join("")}
              </div>
            </div>
            <div class="work-grid">
              <div class="latest">
                <h3>Latest Project</h3>
                <p class="sub">Fresh from the edit suite at The Tale Haus.</p>
                <a class="card" href="${projectUrl(latest)}">
                  ${media(H.latestImage || latest.cover, latest.title)}
                  <span class="card-copy"><strong>${esc(latest.title)}</strong><small>${esc(latest.tag)}</small><span class="btn-ghost">View ${arrow.up}</span></span>
                </a>
              </div>
              <div class="index">
                <h3>Project Index</h3>
                <p class="sub">A few tales we’re proud of.</p>
                <ol class="index-list">
                  ${H.projects.slice(0, 4).map((p, i) => `
                    <li><a href="${projectUrl(p)}"><span class="num">${String(i + 1).padStart(2, "0")}</span><span class="t">${esc(p.title)}</span><span class="tag">${esc(p.tag)}</span>${arrow.up}</a></li>`).join("")}
                </ol>
                <a class="btn-outline" href="projects.html">View All Projects</a>
              </div>
            </div>
          </div>`,
      },
      {
        id: "team", label: "Team",
        html: `
          <div class="panel text-panel">
            <h2>05 THE TEAM</h2>
            <h3 class="lede">${esc(H.team.title)}</h3>
            ${H.team.paragraphs.map((p) => `<p class="body">${rich(p)}</p>`).join("")}
          </div>
          <div class="panel people-panel">
            ${H.team.people.map((m) => `
              <figure class="person">
                ${media(m.image, m.name)}
                <figcaption><strong>${esc(m.name)}</strong><small>${esc(m.role)}</small></figcaption>
              </figure>`).join("")}
          </div>`,
      },
      {
        id: "ready", label: "Ready?",
        html: `
          <div class="panel ready-panel">
            ${media(H.ready.image, "Campaign photo", "ready-media")}
            <div class="ready-copy">
              <h2>${esc(H.ready.title)}</h2>
              <p>${esc(H.ready.text)}</p>
              <a class="btn-light" href="mailto:${esc(H.contact.email)}">Let’s Connect</a>
            </div>
          </div>`,
      },
      { id: "footer", label: "Footer", html: `<div class="panel footer-panel">${footerCard}</div>` },
    ];

    return `
      ${infobar}
      <div class="hscroll">
        <div class="viewport">
          <div class="track">
            ${chapters.map((c, i) => `<section class="chapter" id="${c.id}" aria-label="${esc(c.label)}">${spine(i, c.label)}${c.html}</section>`).join("")}
            <div class="spine end" aria-hidden="true"><span>LET’S TELL YOUR TALES</span></div>
          </div>
        </div>
      </div>
      <nav class="dock" aria-label="Sections">
        ${chapters.filter((c) => c.id !== "ready").map((c) => `<a href="#${c.id}" data-target="${c.id}">${esc(c.label)}</a>`).join("")}
      </nav>`;
  }

  /* ── Sub-pages ─────────────────────────────────────────── */
  function projects() {
    return `
      ${infobar}
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
      ${infobar}
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
      ${infobar}
      <section class="page-head">${nav}</section>
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
  const clockEls = document.querySelectorAll(".clock");
  const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: H.timeZone });
  const tick = () => clockEls.forEach((el) => (el.textContent = fmt.format(new Date()) + " EAT"));
  tick();
  setInterval(tick, 15000);

  /* ── Home: map vertical scroll to sideways movement ─────── */
  if (page === "home") {
    const stage = document.querySelector(".hscroll");
    const track = document.querySelector(".track");
    const dockLinks = [...document.querySelectorAll(".dock a")];
    const chapters = dockLinks.map((a) => document.getElementById(a.dataset.target));
    const sideways = window.matchMedia("(min-width: 900px)");
    let dist = 0;

    const layout = () => {
      if (sideways.matches) {
        dist = Math.max(0, track.scrollWidth - track.clientWidth);
        stage.style.height = `${dist + stage.querySelector(".viewport").clientHeight}px`;
      } else {
        dist = 0;
        stage.style.height = "";
        track.style.transform = "";
      }
      update();
    };

    // How far along the strip we are, in px.
    const progress = () => Math.min(dist, Math.max(0, window.scrollY - stage.offsetTop));

    const update = () => {
      let x = 0;
      if (sideways.matches) {
        x = progress();
        track.style.transform = `translate3d(${-x}px,0,0)`;
      }
      document.body.classList.toggle("scrolled", window.scrollY > 40);
      // Highlight the chapter that fills most of the screen.
      let active = 0;
      chapters.forEach((c, i) => {
        const start = sideways.matches ? c.offsetLeft - x : c.getBoundingClientRect().top;
        const edge = sideways.matches ? window.innerWidth * 0.45 : window.innerHeight * 0.45;
        if (start <= edge) active = i;
      });
      dockLinks.forEach((a, i) => a.classList.toggle("on", i === active));
    };

    dockLinks.forEach((a) =>
      a.addEventListener("click", (e) => {
        const target = document.getElementById(a.dataset.target);
        if (!sideways.matches) return; // normal anchor jump on phones
        e.preventDefault();
        window.scrollTo({ top: stage.offsetTop + target.offsetLeft, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
      })
    );

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", layout);
    sideways.addEventListener("change", layout);
    document.fonts?.ready.then(layout);
    layout();

    // Deep links like index.html#team.
    if (location.hash) {
      const t = document.getElementById(location.hash.slice(1));
      if (t) sideways.matches ? window.scrollTo(0, stage.offsetTop + t.offsetLeft) : t.scrollIntoView();
    }
  } else if (location.hash) {
    document.getElementById(location.hash.slice(1))?.scrollIntoView();
  }

  // Newsletter: without a form endpoint, fall back to the visitor's email app.
  document.querySelectorAll(".notify").forEach((form) => {
    if (H.newsletter.action) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = form.querySelector("input").value;
      location.href = `mailto:${H.contact.email}?subject=${encodeURIComponent("Stay in the loop")}&body=${encodeURIComponent("Please add " + email + " to The Tale Haus updates.")}`;
    });
  });
})();
