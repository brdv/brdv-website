/**
 * schema.org Person describing the site author, shared by the
 * home page (ProfilePage) and blog posts (BlogPosting author).
 */
export const person = {
  "@type": "Person",
  "@id": "https://www.brdv.nl/#person",
  name: "Bram de Vries",
  alternateName: "brdv",
  url: "https://www.brdv.nl/",
  image: "https://www.brdv.nl/assets/me-360.webp",
  jobTitle: "Software Developer",
  worksFor: {
    "@type": "Organization",
    name: "All You Can Learn",
    url: "https://allyoucanlearn.nl/",
  },
  sameAs: [
    "https://github.com/brdv",
    "https://www.linkedin.com/in/bramdv/",
    "https://x.com/_brdv",
  ],
};
