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
  logo: "", // e.g. "images/logo.png" — until set, a text logo is shown
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
    instagram: "https://instagram.com/",
    youtube: "https://youtube.com/",
  },

  hero: {
    lines: ["Let’s Tell", "Your Tale."],
    tagline: "Live Broadcasting + Film + Photography + Design",
    image: "",
    video: "", // e.g. "images/showreel.mp4" — plays muted on loop behind the headline
  },

  mission: {
    title: "Stories From East Africa, Made for the World",
    image: "",
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
   * Services. `group` puts each one in a home-page chapter
   * ("broadcast" or "creative"); `title`, `image` and `text` are also
   * used on services.html. Wrap words in *asterisks* to italicise them.
   */
  services: [
    {
      slug: "live-broadcasting",
      group: "broadcast",
      title: "High Quality Live Streaming",
      image: "",
      text: "Multi-camera live streams for concerts, conferences, church services and launches. We handle the cameras, sound, graphics and the stream itself, so your audience sees the moment as it happens.",
    },
    {
      slug: "film-production",
      group: "broadcast",
      title: "Film Production",
      image: "",
      text: "Brand films, documentaries and music videos, from first idea to final grade. *You tell us your story, we show it to the world.*",
    },
    {
      slug: "content-creation",
      group: "broadcast",
      title: "Content Creation",
      image: "",
      text: "A steady flow of short videos, reels and photos made for each platform, shot in batches so your channels never go quiet.",
    },
    {
      slug: "photography",
      group: "creative",
      title: "Photography",
      image: "",
      text: "Portraits, products, events and campaigns. We capture the moments that are worth keeping, *because a picture is worth a thousand words.*",
    },
    {
      slug: "graphics-design",
      group: "creative",
      title: "Graphics Design",
      image: "",
      text: "Logos, identities, posters and social graphics that give your brand one clear look wherever people meet it.",
    },
    {
      slug: "web-designing",
      group: "creative",
      title: "Web Design",
      image: "",
      text: "Websites that show off your work, load fast and are easy for you to update, on any screen.",
    },
    {
      slug: "digital-marketing",
      group: "creative",
      title: "Digital Marketing",
      image: "",
      text: "We plan the campaign, cut the content for each platform and track what works, so your story reaches the people it is meant for.",
    },
  ],

  team: {
    title: "The People Behind the Lens",
    paragraphs: [
      "Placeholder bio. Add a few lines about how The Tale Haus started, who founded it and what each person brings: years behind the camera, favourite kinds of shoots, the stories that made you.",
      "A second paragraph can cover the wider crew of camera operators, editors and designers you call on for bigger productions.",
    ],
    people: [
      { name: "Founder Name", role: "Creative Director", image: "", link: "" },
      { name: "Co-founder Name", role: "Head of Production", image: "", link: "" },
    ],
  },

  ready: {
    title: "Got a tale worth telling?",
    text: "Tell us what you’re planning and when. We reply within two working days.",
    image: "",
  },

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
