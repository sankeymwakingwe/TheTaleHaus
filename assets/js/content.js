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
  },

  hero: {
    lines: ["Integrated", "Media Solutions"],
    tagline: "Live Broadcasting + Film + Photography + Design",
    image: "images/hero-poster.jpg", // still shown while the video loads
    video: "images/hero.mp4", // plays muted on loop behind the headline (MP4, H.264, no sound)
  },

  // "About The Tale Haus" section.
  about: {
    paragraphs: [
      "The Tale Haus is a team of creatives located in Tanzania, ready to traverse any distance to get the job done.",
      "We firmly believe in the uniqueness of every aspiration, and our mission is to transform aspirations and stories into captivating visuals that can endure in the hearts of the communities we serve.",
    ],
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
   * used on services.html. Wrap words in *asterisks* to italicise them.
   */
  services: [
    {
      slug: "live-broadcasting",
      label: "High Quality\nLive Streaming",
      blurb: "Multi-camera streams for concerts, conferences and launches.",
      title: "High Quality Live Broadcasting",
      image: "images/services/live/01.jpg",
      // extra photos shown in a row under the description (w/h = width ÷ height)
      gallery: [
        { image: "images/services/live/02.jpg", ratio: 1.5 },
        { image: "images/services/live/03.jpg", ratio: 0.667 },
      ],
      text: "At The Tale Haus, we specialise in providing high-quality live broadcasting services that captivate your audience. Our team ensures that your content is engaging and impactful, helping you achieve your marketing goals.",
    },
    {
      slug: "film-production",
      blurb: "Brand films, documentaries and music videos.",
      title: "Film Production",
      image: "",
      text: "We are a community of tale tellers whose cinematic creativity breathes life into your story. *“You tell us your story, we show it to the world.”*",
    },
    {
      slug: "content-creation",
      blurb: "Reels, short videos and photos for every platform.",
      title: "Content Creation",
      image: "",
      text: "We freeze the timeless moments in pixels and allow these to linger with you. We also allow pictures to tell your unique brand’s story because at The Tale Haus we believe that *“a picture is worth a thousand words.”*",
    },
    {
      slug: "photography",
      tile: false,
      title: "Photography",
      image: "",
      text: "Portraits, products, events and campaigns, captured so the moments worth keeping stay with you.",
    },
    {
      slug: "graphics-design",
      label: "Graphics Designing",
      blurb: "Logos, identities, posters and social graphics.",
      title: "Graphics Design",
      image: "",
      text: "Whether you’re a brand seeking a distinct identity or an individual looking to bring visions to life, we are here to craft stories through design that turn concepts into captivating visual tales.",
    },
    {
      slug: "web-designing",
      label: "Web Designing",
      blurb: "Fast, easy-to-update websites that show off your work.",
      title: "Web Design",
      image: "",
      text: "Websites that show off your work, load fast and are easy for you to update, on any screen.",
    },
    {
      slug: "digital-marketing",
      blurb: "Campaigns planned, cut and tracked for each platform.",
      title: "Digital Marketing",
      image: "",
      text: "We plan the campaign, cut the content for each platform and track what works, so your story reaches the people it is meant for.",
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
