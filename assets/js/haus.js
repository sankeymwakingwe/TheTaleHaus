/* The Tale Haus — renders every page from content.js. */
(function () {
  const H = window.HAUS;
  const page = document.body.dataset.page;
  const main = document.querySelector("main");

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  // *text* → <em>text</em>
  // *word* → italic, [[words]] → highlighted.
  const rich = (s) => esc(s).replace(/\*(.+?)\*/g, "<em>$1</em>").replace(/\[\[(.+?)\]\]/g, "<mark>$1</mark>");

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
        <a href="about.html" ${page === "about" ? 'aria-current="page"' : ""}>Us</a>
        <a href="services.html" data-spy="services" ${page === "services" ? 'aria-current="page"' : ""}>Services</a>
      </div>
    </nav>`;

  const year = new Date().getFullYear();
  const ICONS = {
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>',
    youtube: '<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="M10 9.2v5.6l4.8-2.8z" fill="currentColor" stroke="none"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5"/>',
    whatsapp: '<path d="M3.5 20.5 4.8 16A8.5 8.5 0 1 1 8 19.2z"/><path d="M9.2 8.2c.2 3.3 3.3 6.4 6.6 6.6l1-1.6-2-1-1 .9c-1.2-.5-2.3-1.6-2.8-2.8l.9-1-1-2z" fill="currentColor" stroke="none"/>',
    phone: '<path d="M5 3.5h3.5l1.8 4.6-2.3 1.4a11 11 0 0 0 6.5 6.5l1.4-2.3 4.6 1.8V19a1.8 1.8 0 0 1-1.8 1.8A16.3 16.3 0 0 1 3.2 5.3 1.8 1.8 0 0 1 5 3.5z"/>',
  };
  const iconLink = (href, label, icon) => {
    const external = /^https?:/.test(href) ? ' target="_blank" rel="noopener"' : "";
    return `<a class="icon-link" href="${esc(href)}"${external} aria-label="${esc(label)}" title="${esc(label)}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true">${ICONS[icon]}</svg></a>`;
  };
  const footer = `
    <footer class="site-footer" data-label="Footer">
      <div class="footer-card">
        <section class="contact" id="contact">
          <div class="footer-info">
            <h2 class="contact-title">Get in touch and<br>Let’s tell your Tales</h2>
            <form class="notify" action="api/subscribe.php" method="POST">
              <h3>GET NOTIFIED</h3>
              <p>New projects, behind-the-scenes and open shoot days. No spam, unsubscribe any time.</p>
              <div class="notify-row">
                <label class="sr-only" for="notify-email">Email address</label>
                <input id="notify-email" name="email" type="email" required placeholder="Your email">
                <input class="hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
                <button type="submit">Submit</button>
              </div>
            </form>
            <div class="footer-links">
              <div>
                <h3>FOLLOW THE TALE HAUS</h3>
                <p class="icons">
                  ${iconLink(H.contact.instagram, "Instagram", "instagram")}
                  ${iconLink(H.contact.youtube, "YouTube", "youtube")}
                </p>
              </div>
              <div>
                <h3>GET IN TOUCH</h3>
                <p class="icons">
                  ${iconLink(`mailto:${H.contact.email}`, `Email ${H.contact.email}`, "mail")}
                  ${H.contact.whatsapp ? iconLink(`https://wa.me/${H.contact.whatsapp}`, `WhatsApp +${H.contact.whatsapp}`, "whatsapp") : ""}
                  ${H.contact.whatsapp ? iconLink(`tel:+${H.contact.whatsapp}`, `Call +${H.contact.whatsapp}`, "phone") : ""}
                </p>
              </div>
            </div>
          </div>
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
            <div class="field wide"><label for="c-message">Your message</label><textarea id="c-message" name="message" rows="3" required></textarea></div>
            <input class="hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
            <div class="wide"><button type="submit">Send message</button></div>
          </form>
        </section>
        <p class="copyright">Copyright © ${year} The Tale Haus | Let’s tell your tales | All rights reserved</p>
      </div>
    </footer>`;

  // "The Tale Haus /ðə teɪl haʊs/ noun …" dictionary entry for the About section.
  const aboutEntry = (e) => !e ? "" : `
    <div class="dict" lang="en">
      <p class="dict-head"><span class="dict-term">${esc(e.term)}</span> <span class="dict-ipa">${esc(e.pronunciation)}</span></p>
      <p class="dict-pos">${esc(e.partOfSpeech)}</p>
      <dl class="dict-origins">
        ${e.origins.map((o) => `<div><dt><b>${esc(o.word)}</b> (${esc(o.lang)}):</dt><dd>${esc(o.meaning)}</dd></div>`).join("")}
      </dl>
      <ol class="dict-defs">${e.definitions.map((d) => `<li>${esc(d)}</li>`).join("")}</ol>
    </div>`;

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

      <section class="block services-list" id="services" data-label="Services">
        ${H.servicesImage ? `<img class="services-bg" src="${esc(H.servicesImage)}" alt="" loading="lazy">` : ""}
        <div class="services-inner">
          <p class="eyebrow">WHAT WE DO</p>
          <h2>Services</h2>
          <ol class="svc-rows">
            ${tiles.map((s, i) => `
              <li><a class="svc-row" href="${serviceUrl(s)}">
                <span class="svc-num">${String(i + 1).padStart(2, "0")}</span>
                <span class="svc-name">${esc(s.title)}</span>
                <span class="svc-desc">${esc(s.blurb || "")}</span>
                <span class="svc-go" aria-hidden="true">${arrow.up}</span>
              </a></li>`).join("")}
          </ol>
          <p class="svc-foot">The Tale Haus is a team of creatives in Tanzania, ready to travel any distance to tell your story.</p>
        </div>
      </section>


      <section class="block about" id="about" data-label="About">
        ${aboutIntro()}
        <p class="about-more"><a class="dash-btn dark" href="about.html">More about us ${arrow.up}</a></p>
      </section>
      ${footer}`;
  }

  // About: "About Us" label, big statement and the About text (home page and about.html).
  const aboutIntro = () => `
        <h2 class="about-label">${esc(H.about.heading || "About Us")}</h2>
        <div class="about-intro">
          <p class="about-statement">${rich(H.about.statement)}</p>
          <div class="about-copy">
            ${H.about.paragraphs.map((p) => `<p>${rich(p)}</p>`).join("")}
            ${H.about.signoff ? `<p class="about-signoff">${esc(H.about.signoff)}</p>` : ""}
          </div>
        </div>`;

  function about() {
    return `
      ${topbar}
      ${nav}
      <section class="block about about-page" id="about" data-label="About">
        ${aboutIntro()}
        ${aboutEntry(H.about.entry)}
        ${H.about.quote ? `<blockquote class="about-quote">“${esc(H.about.quote.replace(/^[“"]|[”"]$/g, ""))}”</blockquote>` : ""}
        ${H.founder && H.founder.image ? `
        <div class="founder">
          <img class="founder-photo" src="${esc(H.founder.image)}" alt="${esc(H.founder.name || H.founder.role)}" loading="lazy">
          <div class="founder-text">
            <p class="eyebrow">MEET THE FOUNDER</p>
            ${H.founder.name ? `<h3>${esc(H.founder.name)}</h3>` : ""}
            <p class="founder-role">${esc(H.founder.role)}</p>
            ${H.founder.bio ? `<p class="founder-bio">${rich(H.founder.bio)}</p>` : ""}
          </div>
        </div>` : ""}
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

  // Services page: an overview of cards (one thumbnail each). Clicking a card
  // opens services.html?s=<slug> with that service's full photos.
  const serviceUrl = (sv) => `services.html?s=${encodeURIComponent(sv.slug)}`;
  // A gallery is one row of photos, or a list of rows.
  const galleryRows = (sv) => !sv.gallery || !sv.gallery.length ? [] : Array.isArray(sv.gallery[0]) ? sv.gallery : [sv.gallery];
  const serviceCover = (sv) => sv.thumb || sv.image || (galleryRows(sv)[0] || [])[0]?.image || "";

  function services() {
    const slug = new URLSearchParams(location.search).get("s");
    const i = H.services.findIndex((sv) => sv.slug === slug);
    return `
      ${topbar}
      ${nav}
      ${i < 0 ? servicesIndex() : serviceDetail(H.services[i], i)}
      ${footer}`;
  }

  function servicesIndex() {
    return `
      <section class="page-head"><h1>SERVICES</h1></section>
      <div class="svc-cards">
        ${H.services.map((sv, n) => {
          const cover = serviceCover(sv);
          return `
          <a class="svc-card${cover ? "" : " no-photo"}" href="${serviceUrl(sv)}">
            ${cover ? `<div class="svc-card-img">${media(cover, sv.title)}</div>` : ""}
            <div class="svc-card-body">
              <span class="svc-num">${String(n + 1).padStart(2, "0")}</span>
              <h2>${esc(sv.title)}</h2>
              ${sv.blurb ? `<p>${esc(sv.blurb)}</p>` : ""}
              <span class="svc-card-go">View ${arrow.up}</span>
            </div>
          </a>`;
        }).join("")}
      </div>`;
  }

  // Instagram posts sliding past like the Trusted Brands strip (pauses on hover).
  // With `auto: true` the latest posts are loaded from api/instagram.php;
  // the strip stays hidden until there is something to show.
  const igTiles = (ig, posts) => {
    const tile = (p, hidden) => `<a class="ig-post" href="${esc(p.url || `https://www.instagram.com/${ig.handle}/`)}" target="_blank" rel="noopener"${hidden ? ' tabindex="-1" aria-hidden="true"' : ""}><img src="${esc(p.image)}" alt="${hidden ? "" : esc(p.caption || `Instagram post by @${ig.handle}`)}" loading="lazy" referrerpolicy="no-referrer"><svg class="ig-badge" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg></a>`;
    return posts.map((p) => tile(p, false)).join("") + posts.map((p) => tile(p, true)).join("");
  };
  const instaStrip = (ig) => {
    if (!ig) return "";
    const posts = ig.posts || [];
    if (!posts.length && !ig.auto) return "";
    return `
      <div class="ig"${posts.length ? "" : " hidden"} data-ig-handle="${esc(ig.handle)}"${ig.auto ? " data-ig-auto" : ""}>
        <div class="ig-strip"><div class="ig-track">${igTiles(ig, posts)}</div></div>
      </div>`;
  };

  // YouTube videos sliding past like the Instagram strip; click to play in a pop-up.
  const ytId = (url) => (String(url).match(/(?:youtu\.be\/|[?&]v=|\/(?:live|shorts|embed)\/)([\w-]{11})/) || [])[1];
  const videoStrip = (videos) => {
    const list = (videos || []).map((v) => ({ ...v, id: ytId(v.url) })).filter((v) => v.id);
    if (!list.length) return "";
    const card = (v, hidden) => `
      <button class="yt-card" type="button" data-yt="${v.id}"${hidden ? ' tabindex="-1" aria-hidden="true"' : ""} aria-label="Play ${esc(v.title || "video")}">
        <img src="https://i.ytimg.com/vi/${v.id}/hqdefault.jpg" alt="" loading="lazy" onerror="this.remove()">
        <span class="yt-play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor"/></svg></span>
        ${v.title ? `<span class="yt-title">${esc(v.title)}</span>` : ""}
      </button>`;
    return `<div class="yt"><div class="ig-strip"><div class="ig-track yt-track">${list.map((v) => card(v, false)).join("")}${list.map((v) => card(v, true)).join("")}</div></div></div>`;
  };

  function serviceDetail(sv, i) {
    const next = H.services[(i + 1) % H.services.length];
    return `
      <section class="service" id="${esc(sv.slug)}">
        <a class="back" href="services.html">← All services</a>
        <h2>${esc(sv.title)}</h2>
        ${sv.image ? media(sv.image, sv.title) : ""}
        <p>${rich(sv.text)}</p>
        ${(sv.videos && sv.videos.length ? [] : galleryRows(sv)).map((row) => `<div class="service-gallery">${row.map((g) => `<div class="sg-item" style="flex:${g.ratio};aspect-ratio:${g.ratio}">${media(g.image, `${sv.title} — photo`)}</div>`).join("")}</div>`).join("")}
        ${instaStrip(sv.instagram)}
        ${videoStrip(sv.videos)}
        <p class="svc-next"><a class="dash-btn dark" href="${serviceUrl(next)}">Next: ${esc(next.title)} ${arrow.up}</a></p>
      </section>`;
  }

  main.innerHTML = { home, projects, project, services, about }[page]();


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

  document.querySelectorAll(".ig[data-ig-auto]").forEach(async (box) => {
    try {
      const data = await (await fetch("api/instagram.php")).json();
      if (!data.posts || !data.posts.length) return;
      box.querySelector(".ig-track").innerHTML = igTiles({ handle: box.dataset.igHandle }, data.posts);
      box.hidden = false;
    } catch { /* no live feed (e.g. static preview): keep the hand-picked posts, if any */ }
  });

  // Video pop-up for the YouTube strip.
  document.addEventListener("click", (e) => {
    const card = e.target.closest("[data-yt]");
    if (!card) return;
    const box = document.createElement("div");
    box.className = "yt-modal";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.innerHTML = `<div class="yt-frame"><iframe src="https://www.youtube-nocookie.com/embed/${card.dataset.yt}?autoplay=1&rel=0" title="Video" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div><button class="yt-close" type="button" aria-label="Close video">✕</button>`;
    const close = () => { box.remove(); document.removeEventListener("keydown", onKey); card.focus(); };
    const onKey = (k) => { if (k.key === "Escape") close(); };
    box.addEventListener("click", (k) => { if (k.target === box || k.target.closest(".yt-close")) close(); });
    document.addEventListener("keydown", onKey);
    document.body.append(box);
    box.querySelector(".yt-close").focus();
  });

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
      if (id === "hello") a.addEventListener("click", (e) => {
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
    note.className = "form-note wide";
    note.setAttribute("role", "status");
    form.append(note);
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
