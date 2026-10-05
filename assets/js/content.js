/*
 * ─────────────────────────────────────────────────────────────
 *  SITE CONTENT — edit this file to make the site yours.
 * ─────────────────────────────────────────────────────────────
 *  • Put your photos in /images and reference them below.
 *  • Every section/category falls back to a gradient until its
 *    photo exists, so the site never looks broken.
 */
window.SITE = {
  // Shown as the spaced-out two-line logo (top left).
  firstName: "Danie",
  lastName: "Sankey",
  tagline: "Photographer & Storyteller",

  contact: {
    phone: "+1 000 000 0000",
    email: "hello@example.com",
    location: "Your City, Country",
    // Opens when someone taps the location on the Contact page.
    mapUrl: "https://maps.google.com/?q=Your+City",
  },

  social: {
    instagram: "https://instagram.com/",
    pinterest: "https://pinterest.com/",
  },

  about: {
    image: "images/about.jpg",
    heading: "Every frame tells a tale.",
    paragraphs: [
      "Write a short introduction here: who you are, what you shoot, and what you care about when you pick up a camera.",
      "Add a second paragraph about your approach, the people and brands you've worked with, or where your work has been featured.",
    ],
  },

  /*
   * Each category is one full-screen section on the home page and
   * gets its own gallery page. `fallback` is the gradient shown
   * until the cover photo is added.
   */
  categories: [
    {
      slug: "lifestyle",
      title: "Lifestyle",
      cover: "images/lifestyle/cover.jpg",
      fallback: "radial-gradient(ellipse at 60% 35%, #8a5a3c 0%, #3b2418 45%, #120b08 100%)",
      images: ["images/lifestyle/01.jpg", "images/lifestyle/02.jpg", "images/lifestyle/03.jpg", "images/lifestyle/04.jpg", "images/lifestyle/05.jpg", "images/lifestyle/06.jpg"],
    },
    {
      slug: "portraits",
      title: "Portraits",
      cover: "images/portraits/cover.jpg",
      fallback: "radial-gradient(ellipse at 40% 30%, #6d6a64 0%, #2b2a28 50%, #0b0b0b 100%)",
      images: ["images/portraits/01.jpg", "images/portraits/02.jpg", "images/portraits/03.jpg", "images/portraits/04.jpg", "images/portraits/05.jpg", "images/portraits/06.jpg"],
    },
    {
      slug: "editorial",
      title: "Editorial",
      cover: "images/editorial/cover.jpg",
      fallback: "radial-gradient(ellipse at 65% 40%, #7a2e2a 0%, #3a1514 50%, #0e0606 100%)",
      images: ["images/editorial/01.jpg", "images/editorial/02.jpg", "images/editorial/03.jpg", "images/editorial/04.jpg", "images/editorial/05.jpg", "images/editorial/06.jpg"],
    },
    {
      slug: "fashion",
      title: "Fashion",
      cover: "images/fashion/cover.jpg",
      fallback: "radial-gradient(ellipse at 50% 30%, #3f5a5c 0%, #1a2627 50%, #070a0a 100%)",
      images: ["images/fashion/01.jpg", "images/fashion/02.jpg", "images/fashion/03.jpg", "images/fashion/04.jpg", "images/fashion/05.jpg", "images/fashion/06.jpg"],
    },
    {
      slug: "events",
      title: "Events",
      cover: "images/events/cover.jpg",
      fallback: "radial-gradient(ellipse at 35% 45%, #8c6d3a 0%, #3a2c15 50%, #0f0b05 100%)",
      images: ["images/events/01.jpg", "images/events/02.jpg", "images/events/03.jpg", "images/events/04.jpg", "images/events/05.jpg", "images/events/06.jpg"],
    },
  ],
};
