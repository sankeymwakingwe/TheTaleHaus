/*
 * ─────────────────────────────────────────────────────────────
 *  THE TALE HAUS — SITE CONTENT
 *  Edit this file to change text, projects, services and photos.
 * ─────────────────────────────────────────────────────────────
 *  • Put photos/videos in haus/images/ and set the paths below.
 *  • Any image left as "" (or missing on disk) shows a placeholder,
 *    so the site never looks broken.
 *  • All copy here is placeholder text written for The Tale Haus —
 *    rewrite it in your own words before launch.
 */
window.HAUS = {
  name: "The Tale Haus",
  logo: "images/logo.png", // set to "" to show a text logo instead
  location: "Tanzania, East Africa",
  timeZone: "Africa/Dar_es_Salaam",

  // "Currently, the Haus is …" — one is picked at random on each visit.
  status: [
    "Setting up a live stream",
    "Colour grading a short film",
    "Scouting locations in Zanzibar",
    "Sipping chai between takes",
    "Backing up today’s footage",
  ],

  contact: {
    email: "inquiries@thetale.haus",
    instagram: "https://www.instagram.com/thetalehaus",
    youtube: "https://www.youtube.com/@thetalehaus1",
    whatsapp: "255659936142",   // country code + number, no "+" or spaces
  },

  hero: {
    lines: ["Integrated", "Media Solutions"],
    tagline: "Live Broadcasting + Film + Photography + Design",
    image: "images/hero-poster.jpg", // still shown while the video loads
    video: "images/hero.mp4", // plays muted on loop behind the headline (MP4, H.264, no sound)
  },

  // Founder, shown in the About section under the studio text.
  // Leave `name` or `bio` empty to hide that line.
  founder: {
    name: "Daniel Sankey",
    role: "Founder & Creative Director",
    image: "images/team/founder.jpg",
    bio: "Daniel Sankey is a photographer, filmmaker, and multimedia designer based in Zanzibar, Tanzania. He transforms ideas into cinematic stories through photography, film, and visual design, creating purposeful, emotionally resonant visuals guided by a bold visual identity and unwavering artistic vision.",
  },

  // "About The Tale Haus" section.
  about: {
    // Dictionary-style entry at the top of the About section.
    entry: {
      term: "The Tale Haus",
      pronunciation: "/ðə teɪl haʊs/",
      partOfSpeech: "noun",
      origins: [
        { word: "tale", lang: "English", meaning: "a story, especially one that is told with imagination and meaning." },
        { word: "haus", lang: "German", meaning: "a house; a home; a place where something lives and grows." },
      ],
      definitions: [
        "A house of storytellers.",
        "A creative production company that turns brand stories into lasting business value.",
      ],
    },
    // Big statement on the left; wrap words in [[double brackets]] to highlight them.
    statement: "The Tale Haus is a [[house of storytellers]] turning [[brand stories]] into lasting business value.",
    quote: "They didn’t just make our content. They told our story.",
    heading: "About Us",
    paragraphs: [
      "Every brand has a story worth telling, and when it’s told well, it becomes one of your most valuable assets. Through film, photography, design and digital marketing, our in-house team creates strategic content that builds trust, attracts the right customers and keeps paying off long after it’s delivered.",
    ],
    signoff: "The Tale Haus. Let us tell your tales.",
  },

  // The project shown under "Latest Project" (by slug).
  latestProject: "lyson-law-group",
  latestImage: "",

  // Logos for the moving brand strip. Leave image "" for a placeholder.
  brands: [
    { name: "Lyson Law Group", image: "images/brands/lyson-law-group.png" },
    { name: "Omukama East Africa Technology", image: "images/brands/omukama.png" },
    { name: "Athenian General Supplies", image: "images/brands/athenian.png" },
    { name: "BM Cargo", image: "images/brands/bm-cargo.png" },
    { name: "Archfams Building Construction", image: "images/brands/archfams.png" },
    { name: "Johari Developers", image: "images/brands/johari-developers.png" },
    { name: "K-Finance", image: "images/brands/k-finance.png" },
    { name: "Maku Zanzibar", image: "images/brands/maku-zanzibar.png", tall: true },
    { name: "Tanzania Commercial Bank", image: "images/brands/tcb.png" },
    { name: "CRDB Bank", image: "images/brands/crdb.png" },
    { name: "I&M Bank", image: "images/brands/i-and-m-bank.png" },
    { name: "AfriCorp Attorneys", image: "images/brands/africorp.png" },
    { name: "Worshippers Gathering", image: "images/brands/worshippers-gathering.png", tall: true },
    { name: "IFM Tafes Family", image: "images/brands/ifm-tafes-family.png", tall: true },
  ],

  /*
   * Projects. The first three appear on the home page; all of them
   * appear on the Project Index. Each opens project.html?p=<slug>.
   * `shots` sets the collage on the project page: each one is
   * { image, shape } where shape is "large", "wide" or "tall".
   */
  projects: [
    {
      slug: "lyson-law-group",
      title: "Lyson Law Group",
      tag: "Corporate portraits",
      client: "Lyson Law Group",
      year: "2026",
      cover: "images/projects/lyson/cover.jpg",
      film: "",
      shots: [1, 2, 3, 4, 5].map((n) => ({ image: `images/projects/lyson/0${n}.jpg`, shape: "portrait" })),
    },
    {
      slug: "johari-developers",
      title: "Johari Developers",
      tag: "Construction Update",
      client: "Johari Developers",
      year: "2026",
      cover: "images/projects/johari/cover.jpg",
      film: "",
      shots: [1, 2, 3, 4, 5].map((n) => ({ image: `images/projects/johari/0${n}.jpg`, shape: "landscape" })),
    },
    {
      slug: "alex-and-angela",
      title: "Alex & Angela",
      tag: "Wedding · Bukoba, Tanzania",
      client: "Alex & Angela",
      year: "2026",
      cover: "images/projects/alex-angela/cover.jpg",
      film: "",
      shots: [3, 1, 4, 2].map((n) => ({ image: `images/services/photography/0${n}.jpg`, shape: "portrait" })),
    },
    {
      slug: "k-finance",
      title: "K-Finance",
      tag: "Corporate Headshots",
      client: "K-Finance",
      year: "2026",
      cover: "images/projects/kfinance/cover.jpg",
      film: "",
      shots: [1, 2, 3, 4].map((n) => ({ image: `images/projects/kfinance/0${n}.jpg`, shape: "portrait" })),
    },
    {
      slug: "maternity-session",
      title: "Awaiting Joy",
      tag: "Maternity Session",
      client: "Private client",
      year: "",   // add the year to show it on the project page
      cover: "images/projects/maternity/cover.jpg",
      film: "",
      shots: [1, 2, 3, 4, 5].map((n) => ({ image: `images/projects/maternity/0${n}.jpg`, shape: "portrait" })),
    },
    {
      slug: "rev-majestic",
      title: "REV · Real Estate Visualisation",
      tag: "Architectural renders",
      client: "Real estate developer",
      year: "2026",
      cover: "images/rev/tower-and-pool.jpg",
      film: "",
      shots: [
        { image: "images/rev/restaurant.jpg", shape: "landscape" },
        { image: "images/rev/tower-from-bar.jpg", shape: "portrait" },
        { image: "images/rev/pool-deck.jpg", shape: "landscape" },
        { image: "images/rev/villa-pool.jpg", shape: "portrait" },
        { image: "images/rev/tower-and-pool.jpg", shape: "landscape" },
      ],
    },
    { slug: "zanzibar-beach-house", title: "Zanzibar Beach House", tag: "Hospitality film", client: "Client name", year: "2024", cover: "", film: "", shots: defaultShots() },
    { slug: "paul-clement", title: "Paul Clement", tag: "Live concert stream", client: "Client name", year: "2024", cover: "", film: "", shots: defaultShots() },
    { slug: "dr-ipyana", title: "Dr. Ipyana", tag: "Worship night film", client: "Client name", year: "2024", cover: "", film: "", shots: defaultShots() },
    { slug: "project-four", title: "Project Four", tag: "Brand campaign", client: "Client name", year: "2024", cover: "", film: "", shots: defaultShots() },
    { slug: "project-five", title: "Project Five", tag: "Portrait series", client: "Client name", year: "2023", cover: "", film: "", shots: defaultShots() },
    { slug: "project-six", title: "Project Six", tag: "Event coverage", client: "Client name", year: "2023", cover: "", film: "", shots: defaultShots() },
    { slug: "project-seven", title: "Project Seven", tag: "Music video", client: "Client name", year: "2023", cover: "", film: "", shots: defaultShots() },
    { slug: "project-eight", title: "Project Eight", tag: "Website + identity", client: "Client name", year: "2023", cover: "", film: "", shots: defaultShots() },
  ],

  /*
   * Services. `label` is the tile text on the home page (\n = line
   * break; set `tile: false` to leave it off the home grid). `blurb`
   * appears when someone hovers a tile. `title`, `image` and `text` are
   * used on services.html; `thumb` is an optional photo behind the home page
   * tile. Wrap words in *asterisks* to italicise them.
   */
  // Photo behind the home page Services list (shown under a dark wash).
  servicesImage: "images/services/film/01.jpg",
  services: [
    {
      slug: "live-broadcasting",
      label: "High Quality\nLive Streaming",
      blurb: "High-quality live broadcasts that captivate your audience.",
      title: "High Quality Live Broadcasting",
      image: "images/services/live/01.jpg",
      // extra photos shown in a row under the description (w/h = width ÷ height)
      gallery: [
        { image: "images/services/live/02.jpg", ratio: 1.5 },
        { image: "images/services/live/03.jpg", ratio: 0.667 },
      ],
      // Streams we've done, as YouTube links (watch, youtu.be, /live/ or /shorts/).
      // They slide past under the description and play in a pop-up when
      // clicked; once any are listed they replace the photo gallery.
      videos: [
        { url: "https://www.youtube.com/watch?v=0jXt3RMuGMY", title: "Zoravo · BFF Saga" },
        { url: "https://www.youtube.com/watch?v=RUQrIKNP3vQ", title: "Dr Ipyana" },
        { url: "https://www.youtube.com/watch?v=dkxWi26K4Eg", title: "Dr Ipyana" },
        { url: "https://www.youtube.com/watch?v=gk5A62wkQ-Q", title: "Dr Ipyana" },
        { url: "https://www.youtube.com/watch?v=hjICQ0kHfSM", title: "TAFES Ardhi" },
      ],
      text: "At The Tale Haus, we specialise in providing high-quality live broadcasting services that captivate your audience. Our team ensures that your content is engaging and impactful, helping you achieve your marketing goals.",
    },
    {
      slug: "film-photography",
      thumb: "images/services/film/thumb.jpg",   // photo on the services page card
      blurb: "Cinematic films and photos that breathe life into your story.",
      title: "Film & Photography",
      image: "images/services/film/01.jpg",
      // one array per row of photos (ratio = width ÷ height)
      gallery: [
        [
          { image: "images/services/film/02.jpg", ratio: 0.8 },
          { image: "images/services/film/03.jpg", ratio: 0.8 },
        ],
        [
          { image: "images/services/photography/03.jpg", ratio: 0.8 },
          { image: "images/services/photography/01.jpg", ratio: 0.8 },
          { image: "images/services/photography/04.jpg", ratio: 0.8 },
          { image: "images/services/photography/02.jpg", ratio: 0.8 },
        ],
      ],
      text: "We are a community of tale tellers whose cinematic creativity breathes life into your story. From brand films and music videos to portraits, weddings and events, we capture the moments worth keeping. *“You tell us your story, we show it to the world.”*",
    },
    {
      slug: "real-estate-visualisation",
      blurb: "Photoreal renders that sell developments before they’re built.",
      title: "REV · Real Estate Visualisation",
      image: "images/rev/tower-and-pool.jpg",
      gallery: [
        { image: "images/rev/restaurant.jpg", ratio: 1.779 },
        { image: "images/rev/tower-from-bar.jpg", ratio: 0.75 },
      ],
      text: "Photoreal 3D renders that let buyers walk through a development before the first stone is laid. From restaurants and pool decks to full tower exteriors, we help developers and architects sell off-plan with confidence.",
    },
    {
      slug: "brand-web-design",
      blurb: "Identities and websites that turn concepts into visual tales.",
      title: "Brand & Web Design",
      image: "images/services/graphics/01.jpg",
      // Socrate Consultancy brand identity
      gallery: [
        { image: "images/services/graphics/02.jpg", ratio: 1.5 },
      ],
      text: "Whether you’re a brand seeking a distinct identity or an individual looking to bring visions to life, we craft stories through design that turn concepts into captivating visual tales. From logos and stationery to fast, easy-to-update websites, your brand looks like itself wherever people meet it.",
    },
    {
      slug: "content-digital-marketing",
      blurb: "Content made for every platform, planned and tracked to perform.",
      title: "Content & Digital Marketing",
      image: "images/services/content/thumb.jpg",
      // Moving strip of Instagram posts on this service's page. `auto: true`
      // loads the latest posts live (needs the INSTAGRAM_TOKEN secret, see
      // README). `posts` are hand-picked extras: { image, url }.
      instagram: {
        handle: "thetalehaus",
        auto: true,
        posts: [
          // { image: "images/instagram/01.jpg", url: "https://www.instagram.com/p/XXXXXXXX/" },
        ],
      },
      text: "We freeze the timeless moments in pixels and let pictures tell your brand’s story, because at The Tale Haus we believe that *“a picture is worth a thousand words.”* Then we plan the campaign, cut the content for each platform and track what works, so your story reaches the people it is meant for.",
    },
  ],


  newsletter: {
    // Where the signup form posts. Defaults to the PHP handler on our own
    // server (api/subscribe.php); if that isn't reachable, Submit opens the
    // visitor's email app instead.
    action: "",
  },
};

function defaultShots() {
  return [
    { image: "", shape: "large" },
    { image: "", shape: "wide" },
    { image: "", shape: "large" },
    { image: "", shape: "wide" },
    { image: "", shape: "large" },
    { image: "", shape: "tall" },
    { image: "", shape: "wide" },
    { image: "", shape: "large" },
    { image: "", shape: "tall" },
  ];
}
