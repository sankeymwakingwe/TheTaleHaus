/*
 * ─────────────────────────────────────────────────────────────
 *  THE TALE HAUS — SITE CONTENT
 *  Edit this file to change text, projects, services and photos.
 * ─────────────────────────────────────────────────────────────
 *  • Put photos in haus/images/ and set the `image` paths below.
 *  • Any image left as "" (or missing on disk) shows a teal
 *    placeholder, so the site never looks broken.
 */
window.HAUS = {
  name: "The Tale Haus",
  logo: "", // e.g. "images/logo.png" — until set, a text logo is shown
  location: ["Based in", "Tanzania, East Africa"],

  contact: {
    email: "inquires@thetale.haus",
    instagram: "https://instagram.com/",
    youtube: "https://youtube.com/",
  },

  hero: {
    lines: ["Integrated", "Media Solutions"],
    image: "",
  },

  // The project shown under "Latest Project" on the home page (by slug).
  latestProject: "zanzibar-beach-house",
  latestImage: "",

  // Logos for the "Trusted Brands" strip. Leave image "" for a placeholder.
  brands: [
    { name: "Brand One", image: "" },
    { name: "Brand Two", image: "" },
    { name: "Brand Three", image: "" },
    { name: "Brand Four", image: "" },
    { name: "Brand Five", image: "" },
  ],

  /*
   * Projects. The first three appear on the home page; all of them
   * appear on the Project Index. Each opens project.html?p=<slug>.
   * `shots` sets the collage on the project page: each one is
   * { image, shape } where shape is "large", "wide" or "tall".
   */
  projects: [
    {
      slug: "zanzibar-beach-house",
      title: "Zanzibar Beach House",
      client: "Client name",
      year: "2024",
      cover: "",
      film: "", // a YouTube/Vimeo embed URL or an .mp4 path
      shots: defaultShots(),
    },
    { slug: "paul-clement", title: "Paul Clement", client: "Client name", year: "2024", cover: "", film: "", shots: defaultShots() },
    { slug: "dr-ipyana", title: "Dr. Ipyana", client: "Client name", year: "2024", cover: "", film: "", shots: defaultShots() },
    { slug: "project-four", title: "Project Four", client: "Client name", year: "2024", cover: "", film: "", shots: defaultShots() },
    { slug: "project-five", title: "Project Five", client: "Client name", year: "2023", cover: "", film: "", shots: defaultShots() },
    { slug: "project-six", title: "Project Six", client: "Client name", year: "2023", cover: "", film: "", shots: defaultShots() },
    { slug: "project-seven", title: "Project Seven", client: "Client name", year: "2023", cover: "", film: "", shots: defaultShots() },
    { slug: "project-eight", title: "Project Eight", client: "Client name", year: "2023", cover: "", film: "", shots: defaultShots() },
  ],

  /*
   * Services. `label` is the tile text on the home page (use \n for a
   * line break); `title`, `image` and `text` are used on services.html.
   * Wrap words in *asterisks* to italicise them.
   */
  services: [
    {
      slug: "live-broadcasting",
      label: "High Quality\nLive Streaming",
      title: "High Quality Live Broadcasting",
      image: "",
      text: "We specialise in providing high-quality live broadcasting services that captivate your audience. Our team ensures that your content is engaging and impactful, helping you achieve your marketing goals.",
    },
    {
      slug: "content-creation",
      label: "Content Creation",
      title: "Content Creation",
      image: "",
      text: "We freeze the timeless moments in pixels and allow these to linger with you. We also allow pictures to tell your unique brand’s story because at The Tale Haus we believe that, *“a picture is worth a thousand words.”*",
    },
    {
      slug: "film-production",
      label: "Film Production",
      title: "Film Production",
      image: "",
      text: "We are a community of tale tellers whose cinematic creativity breathes life into your story. *“You tell us your story, we show it to the world.”*",
    },
    {
      slug: "web-designing",
      label: "Web Designing",
      title: "Web Designing",
      image: "",
      text: "Description coming soon.",
    },
    {
      slug: "digital-marketing",
      label: "Digital Marketing",
      title: "Digital Marketing",
      image: "",
      text: "Description coming soon.",
    },
    {
      slug: "graphics-design",
      label: "Graphics Designing",
      title: "Graphics Design",
      image: "",
      text: "*Whether you’re a brand seeking a distinct identity or an individual looking to bring visions into life, we are here to craft stories through design that turn concepts into captivating visual tales.*",
    },
    {
      slug: "photography",
      label: "", // not shown as a home tile
      title: "Photography",
      image: "",
      text: "We freeze the timeless moments in pixels and allow these to linger with you. We also allow pictures to tell your unique brand’s story because at The Tale Haus we believe that, *“a picture is worth a thousand words.”*",
    },
  ],

  // Order of sections on services.html (by slug).
  servicesPageOrder: ["live-broadcasting", "film-production", "photography", "graphics-design", "content-creation", "web-designing", "digital-marketing"],

  about: "The Tale Haus™ is a bespoke creative-focused agency that lives, creates, and pushes boundaries at the intersection of content production and brand strategy. Our expertise lies in campaign and brand development, collaborating with clients in a variety of capacities relating to creative direction for commercial campaigns, photo & video, and overall brand or rebrand strategies. Whether up-and-coming or a household name, we work with our clients to get to the core of “what message they want to share”, “why it matters” and how to translate and elevate these narratives through premium photo and video. It’s about connection, and more importantly, connecting in a way that positively impacts and inspires. At The Tale Haus™, all our projects and goals boil down to one thing: live to tell stories.",

  newsletter: {
    // Where the "Get Notified" form posts (e.g. a Formspree URL).
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
