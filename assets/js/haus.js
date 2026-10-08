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
  function media(src, label, cls = "", poster = "") {
    const ph = `<span class="ph-label">${esc(label)}</span>`;
    if (!src) return `<div class="media is-ph ${cls}" role="img" aria-label="${esc(label)} (placeholder)">${ph}</div>`;
    if (/\.(mp4|webm|mov)$/i.test(src)) return `<div class="media ${cls}"><video src="${esc(src)}" ${poster ? `poster="${esc(poster)}"` : ""} autoplay muted loop playsinline preload="auto" aria-hidden="true"></video></div>`;
    return `<div class="media ${cls}"><img src="${esc(src)}" alt="${esc(label)}" loading="lazy" onerror="this.parentNode.classList.add('is-ph');this.remove()">${ph}</div>`;
  }

  const projectUrl = (p) => `project.html?p=${encodeURIComponent(p.slug)}`;
  // Projects without a cover photo stay hidden until their photos are added
  // in content.js (or set show: true to force one on).
  const PROJECTS = H.projects.filter((p) => p.show ?? Boolean(p.cover));

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
  // Frosted nav. On phones it folds into the brand name plus a menu button.
  const nav = `
    <nav class="pill-nav" aria-label="Main">
      <a class="nav-brand" href="index.html">The Tale Haus<sup>®</sup></a>
      <button class="nav-burger" type="button" aria-expanded="false" aria-controls="nav-links" aria-label="Open menu"><span></span><span></span><span></span></button>
      <div class="nav-links" id="nav-links">
        <a href="index.html" data-spy="hello" ${page === "home" ? 'aria-current="page"' : ""}>Haus</a>
        <a href="projects.html" data-spy="work" ${page === "projects" || page === "project" ? 'aria-current="page"' : ""}>Work</a>
        <a href="index.html#about" data-spy="about">Us</a>
        <a href="services.html" data-spy="services" ${page === "services" ? 'aria-current="page"' : ""}>Services</a>
      </div>
    </nav>`;

  const year = new Date().getFullYear();
  const footer = `
    <footer class="site-footer" data-label="Footer">
      <div class="footer-card">
        <section class="contact" id="contact">
          <h2 class="contact-title">Get in touch and let’s tell your tale.</h2>
          <form class="contact-form" action="api/contact.php" method="POST">
            <div class="field"><label for="c-first">First name</label><input id="c-first" name="first_name" required autocomplete="given-name"></div>
            <div class="field"><label for="c-last">Last name</label><input id="c-last" name="last_name" autocomplete="family-name"></div>
            <div class="field"><label for="c-phone">Phone</label><input id="c-phone" name="phone" type="tel" autocomplete="tel"></div>
            <div class="field"><label for="c-email">Email</label><input id="c-email" name="email" type="email" required autocomplete="email"></div>
            <div class="field wide"><label for="c-service">What can we help with?</label>
              <select id="c-service" name="service">
                ${H.services.map((s) => `<option>${esc(s.title)}</option>`).join("")}
                <option>Something else</option>
              </select>
            </div>
            <div class="field wide"><label for="c-message">Your message</label><textarea id="c-message" name="message" rows="5" required></textarea></div>
            <input class="hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
            <div class="wide"><button type="submit">Send message</button></div>
          </form>
        </section>
        <div class="footer-cols">
          <form class="notify" action="api/subscribe.php" method="POST">
            <h3>GET NOTIFIED</h3>
            <p>Hear about new projects, behind-the-scenes and open shoot days.</p>
            <label class="sr-only" for="notify-email">Email address</label>
            <input id="notify-email" name="email" type="email" required placeholder="Your email">
            <input class="hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
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
            ${H.contact.whatsapp ? `<p><a href="https://wa.me/${esc(H.contact.whatsapp)}" target="_blank" rel="noopener">WhatsApp +${esc(H.contact.whatsapp.replace(/^(\d{3})(\d{3})(\d{3})(\d+)$/, "$1 $2 $3 $4"))} ${arrow.up}</a></p>` : ""}
          </div>
        </div>
        <p class="copyright">Copyright © ${year} The Tale Haus | Let’s tell your tales | All rights reserved</p>
      </div>
    </footer>`;

  /* ── Pages ─────────────────────────────────────────────── */
  function home() {
    const latest = PROJECTS.find((p) => p.slug === H.latestProject) || PROJECTS[0];
    const tiles = H.services.filter((s) => s.tile !== false);
    const brand = (b, hidden) =>
      b.image
        ? `<img src="${esc(b.image)}" alt="${hidden ? "" : esc(b.name)}"${b.tall ? ' class="tall"' : ""}>`
        : `<span class="brand-ph" ${hidden ? 'aria-hidden="true"' : ""}>${esc(b.name)}</span>`;
    return `
      ${topbar}
      ${nav}
      <section class="hero" id="hello" data-label="Hello">
        ${media(H.hero.video || H.hero.image, "Hero image or showreel", "hero-media", H.hero.video ? H.hero.image : "")}
        <div class="hero-copy">
          <h1>${H.hero.lines.map(esc).join("<br>")}</h1>
          <p class="ready"><a class="btn-solid" href="mailto:${esc(H.contact.email)}">Let’s Connect</a></p>
        </div>
      </section>

      <section class="block" id="latest" data-label="Latest Project">
        <div class="head"><h2>LATEST PROJECT</h2><p>Fresh from the edit suite at The Tale Haus.</p></div>
        <a class="card latest" href="${projectUrl(latest)}">
          ${media(H.latestImage || latest.cover, latest.title)}
          <span class="card-copy">
            <strong>${esc(latest.title)}</strong>
            <small>${esc(latest.tag)}</small>
            <span class="dash-btn">View ${arrow.up}</span>
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
          ${PROJECTS.slice(0, 3).map((p, i) => `
            <li><a class="project-tile" href="${projectUrl(p)}">
              ${media(p.cover, p.title)}
              <span class="tile-id">${String(i + 1).padStart(2, "0")}</span>
              <span class="tile-title">${esc(p.title.toUpperCase())}<small>${esc(p.tag)}</small></span>
              <span class="tile-view">View ${arrow.up}</span>
            </a></li>`).join("")}
        </ol>
        <p class="center"><a class="btn-outline" href="projects.html">View all projects</a></p>
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
        ${PROJECTS.map((p) => `
          <li><a class="project-tile tall" href="${projectUrl(p)}">
            ${media(p.cover, p.title)}
            <span class="tile-title">${esc(p.title.toUpperCase())}<small>${esc(p.tag)}</small></span>
            <span class="dash-btn">View ${arrow.up}</span>
          </a></li>`).join("")}
      </ol>
      ${footer}`;
  }

  function project() {
    const slug = new URLSearchParams(location.search).get("p");
    const p = PROJECTS.find((x) => x.slug === slug) || PROJECTS[0];
    document.title = `${p.title} — The Tale Haus`;

    let film;
    if (!p.film) film = ""; // no film for this project: leave the Film block out
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
        ${film ? `<h3 class="serif">Film</h3>${film}` : ""}
        <h3 class="serif">Shots</h3>
        <div class="collage">
          ${p.shots.filter((s) => s.image).map((s, i) => media(s.image, `${p.title} — shot ${i + 1}`, `shot ${s.shape}`)).join("")}
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
          ${s.image ? media(s.image, s.title) : ""}
          <p>${rich(s.text)}</p>
          ${s.gallery ? `<div class="service-gallery">${s.gallery.map((g, i) => `<div class="sg-item" style="flex:${g.ratio};aspect-ratio:${g.ratio}">${media(g.image, `${s.title} — photo ${i + 2}`)}</div>`).join("")}</div>` : ""}
        </section>`).join("")}
      ${footer}`;
  }

  main.innerHTML = { home, projects, project, services }[page]();

  // Floating WhatsApp chat button, on every page.
  if (H.contact.whatsapp) {
    document.body.insertAdjacentHTML("beforeend", `
      <a class="whatsapp" href="https://wa.me/${esc(H.contact.whatsapp)}?text=${encodeURIComponent("Hi The Tale Haus, I'd like to talk about a project.")}" target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp">
        <svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16.04 3C9.0 3 3.3 8.7 3.3 15.7c0 2.24.59 4.43 1.7 6.36L3.2 28.8l6.92-1.81a12.7 12.7 0 0 0 5.92 1.47h.01c7.02 0 12.74-5.7 12.74-12.72 0-3.4-1.32-6.6-3.73-9A12.64 12.64 0 0 0 16.04 3Zm0 23.3h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-4.1 1.08 1.1-4-.26-.41a10.53 10.53 0 0 1-1.62-5.6c0-5.84 4.75-10.58 10.6-10.58 2.83 0 5.49 1.1 7.49 3.1a10.5 10.5 0 0 1 3.1 7.49c0 5.84-4.76 10.6-10.51 10.6Zm5.8-7.93c-.32-.16-1.88-.93-2.17-1.03-.29-.11-.5-.16-.71.16-.21.32-.82 1.03-1 1.24-.19.21-.37.24-.69.08-.32-.16-1.34-.5-2.55-1.58-.94-.84-1.58-1.88-1.77-2.2-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.18.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.71-1.71-.97-2.34-.26-.62-.52-.53-.71-.54h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.65s1.14 3.07 1.3 3.28c.16.21 2.24 3.42 5.43 4.8.76.33 1.35.52 1.81.67.76.24 1.45.2 2 .12.61-.09 1.88-.77 2.14-1.51.27-.74.27-1.38.19-1.51-.08-.13-.29-.21-.61-.37Z"/></svg>
        <span>Chat with us</span>
      </a>`);
  }

  // Make sure background videos start muted (some browsers ignore the attribute in injected HTML).
  document.querySelectorAll("video[autoplay]").forEach((v) => { v.muted = true; v.play().catch(() => {}); });


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

  /* ── Phone menu button ─────────────────────────────────── */
  const burger = document.querySelector(".nav-burger");
  const setMenu = (open) => {
    document.querySelector(".pill-nav").classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  burger.addEventListener("click", () => setMenu(burger.getAttribute("aria-expanded") !== "true"));
  document.querySelectorAll(".nav-links a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

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

  // Forms post to the PHP handlers on our server and show the reply under the
  // button. If the server can't be reached, fall back to the visitor's email app.
  const ajaxForm = (form, url, fallback) => {
    if (!form) return;
    const btn = form.querySelector("button");
    const note = document.createElement("p");
    note.className = "form-note";
    note.setAttribute("role", "status");
    btn.after(note);
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      btn.disabled = true;
      note.textContent = "Sending…";
      try {
        const res = await fetch(url, { method: "POST", body: new FormData(form) });
        const data = await res.json();
        note.textContent = data.message;
        if (data.ok) form.reset();
      } catch {
        note.textContent = "";
        location.href = fallback(new FormData(form));
      } finally {
        btn.disabled = false;
      }
    });
  };
  const mailto = (subject, body) => `mailto:${H.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  ajaxForm(document.querySelector(".notify"), H.newsletter.action || "api/subscribe.php", (d) =>
    mailto("Get notified", `Please add ${d.get("email")} to The Tale Haus updates.`));
  ajaxForm(document.querySelector(".contact-form"), "api/contact.php", (d) =>
    mailto(`Enquiry: ${d.get("service")}`, `${d.get("message")}\n\n${d.get("first_name")} ${d.get("last_name")}\n${d.get("phone")}`));
})();
