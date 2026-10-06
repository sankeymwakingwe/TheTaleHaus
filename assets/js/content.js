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
    phone: "+255 000 000 000",
    location: "Dar es Salaam, Tanzania",
    // Opens when someone taps the location on the Contact page.
    mapUrl: "https://maps.google.com/?q=Dar+es+Salaam",
    instagram: "https://instagram.com/",
    youtube: "https://youtube.com/",
  },

  hero: {
    lines: ["Integrated", "Media Solutions"],
    tagline: "Live Broadcasting + Film + Photography + Design",
    image: "",
    video: "", // e.g. "images/showreel.mp4" — plays muted on loop behind the headline
  },

  // "About The Tale Haus" section.
  about: {
    heading: "Every frame tells a tale.",
    image: "images/about.jpg",
    paragraphs: [
      "The Tale Haus is a creative studio in Tanzania. We plan, shoot, stream and design the stories that brands, artists and communities want to share.",
      "From a single portrait to a multi-camera live broadcast, we bring the crew, the gear and the eye to make it feel like yours. Every project starts with one question: what’s the tale? Everything else is built around the answer.",
    ],
  },

  // The project shown under "Latest Project" (by slug).
  latestProject: "zanzibar-beach-house",
  latestImage: "",

  // Logos for the moving brand strip. Leave image "" for a placeholder.
  brands: [
    { name: "Brand One", image: "" },
    { name: "Brand Two", image: "" },
    { name: "Brand Three", image: "" },
    { name: "Brand Four", image: "" },
    { name: "Brand Five", image: "" },
    { name: "Brand Six", image: "" },
    { name: "Brand Seven", image: "" },
  ],

  /*
   * Projects. The first three appear on the home page; all of them
   * appear on the Project Index. Each opens project.html?p=<slug>.
   * `shots` sets the collage on the project page: each one is
   * { image, shape } where shape is "large", "wide" or "tall".
   */
  projects: [
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
      image: "",
      text: "Multi-camera live streams for concerts, conferences, church services and launches. We handle the cameras, sound, graphics and the stream itself, so your audience sees the moment as it happens.",
    },
    {
      slug: "film-production",
      blurb: "Brand films, documentaries and music videos.",
      title: "Film Production",
      image: "",
      text: "Brand films, documentaries and music videos, from first idea to final grade. *You tell us your story, we show it to the world.*",
    },
    {
      slug: "content-creation",
      blurb: "Reels, short videos and photos for every platform.",
      title: "Content Creation",
      image: "",
      text: "A steady flow of short videos, reels and photos made for each platform, shot in batches so your channels never go quiet.",
    },
    {
      slug: "photography",
      tile: false,
      title: "Photography",
      image: "",
      text: "Portraits, products, events and campaigns. We capture the moments that are worth keeping, *because a picture is worth a thousand words.*",
    },
    {
      slug: "graphics-design",
      label: "Graphics Designing",
      blurb: "Logos, identities, posters and social graphics.",
      title: "Graphics Design",
      image: "",
      text: "Logos, identities, posters and social graphics that give your brand one clear look wherever people meet it.",
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


  // Investment page (investment.html). Prices are placeholders.
  investment: {
    intro: "Every project is shaped around you. These packages are a starting point; get in touch for a custom quote.",
    packages: [
      { name: "Live Stream", price: "From $000", details: "Multi-camera live broadcast with sound, on-screen graphics and the stream itself, for one event." },
      { name: "Brand Film", price: "From $000", details: "Concept, one shoot day, edit and colour grade: a 60–90 second film plus social cut-downs." },
      { name: "Photography Session", price: "From $000", details: "Half day, up to three looks or locations, 50 edited images." },
      { name: "Content Retainer", price: "From $000 / month", details: "A monthly batch of photos, reels and short videos made for your channels." },
    ],
  },

  // "What clients say" on the home page. Replace with real quotes.
  testimonials: [
    { quote: "Add a short testimonial from a happy client here.", by: "Client name", role: "Company" },
    { quote: "And another one, so visitors can hear it from someone else.", by: "Client name", role: "Company" },
  ],

  /*
   * Photo collections: each opens gallery.html?c=<slug> with a grid
   * and a full-screen viewer. List the photos in `images`.
   */
  galleries: [
    { slug: "lifestyle", title: "Lifestyle", cover: "", images: ["", "", "", "", "", ""] },
    { slug: "portraits", title: "Portraits", cover: "images/about.jpg", images: ["images/about.jpg", "", "", "", "", ""] },
    { slug: "editorial", title: "Editorial", cover: "", images: ["", "", "", "", "", ""] },
    { slug: "fashion", title: "Fashion", cover: "", images: ["", "", "", "", "", ""] },
    { slug: "events", title: "Events", cover: "", images: ["", "", "", "", "", ""] },
  ],

  newsletter: {
    // Where the signup form posts (e.g. a Formspree URL).
    // Until set, Submit opens the visitor's email app instead.
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
