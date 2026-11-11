// locales/en/about.js — about page strings (shape: see locales/en.js)

const about = {
  meta: {
    title: "Climate Accountability API - About Us",
    description:
      "Our mission is to provide the public with open information on climate data and companies’ social and environmental impacts (ESG)",
    keywords:
      "Global warming, about, carbon footprint, climate change, environment",
  },

  hero: {
    title: "About Us",
    logoAlt: "planet dying logo",
    // Rendered as `${before}<strong>${name}</strong>${after}`.
    intro: {
      before: "At ",
      name: "Climate Accountability API",
      after:
        ", we develop open digital infrastructure for trustworthy sustainability and environmental data, with expertise in APIs, interoperability, data governance, metadata, FAIR data principles, and digital platforms. Our mission is to build the world's most comprehensive, transparent, and accessible platform for ESG and climate-related data.",
    },
    co2CounterTitle: "Tons of CO2 emitted into the atmosphere",
    temperatureCounterTitle: "World average temperature (°C)",
    scrollAlt: "move to next section",
  },

  timeline: {
    title: "Project Timeline",
    mission: {
      title: "Mission",
      text: "To make climate and companies' ESG data free, open, and practical for everyday use. Empowering people everywhere to make informed and sustainable decisions. Accelerating the transition to a greener future.",
    },
    vision: {
      title: "Vision",
      text: "A world where environmental accountability is the norm, not the exception. With transparency at the heart of everything we do.",
    },
    // In display order; the years and icons stay in the component.
    items: [
      {
        title: "Start",
        text: "Development of the first public API exposing atmospheric greenhouse gas concentration.",
      },
      {
        title: "Legal",
        text: "Registration and paperwork of the nonprofit.",
      },
      {
        title: "Kick off",
        text: "Development of web app additional features.",
      },
      {
        title: "Fundraising",
        text: "Start of fundraising campaign.",
      },
      {
        title: "Development",
        text: "Development of prototype.",
      },
      {
        title: "Launch",
        text: "Launch of the fully-fledged platform to a global audience.",
      },
    ],
  },

  achievements: {
    title: "Global Usage",
    numberLocale: "en-US",
    devices: "Connected Devices",
    apiRequests: "Monthly API requests",
    companies: "Companies",
    learnMore: "Learn More",
  },

  team: {
    heading: "Join our organization",
    description:
      "We must disclose the social and environmental impact of every company.",
    pictureAlt: "teammate picture",
    // Keyed by the member number in components/semantic/team.js. Names stay
    // in the component; only job titles are translated.
    jobs: {
      "01": "Founder & Software Developer",
      "02": "Data & LLMs Engineer",
      "03": "Senior Software Developer",
      "04": "Data Analyst",
      "05": "Legal Advisor",
      "06": "Data Engineer - Data Scientist",
      "07": "Lead ESG Researcher",
      "08": "Data Scientist",
      "09": "Fundraiser / Grant writer",
      "10": "Fundraiser",
      "11": "Join us",
    },
    openPosition: "Team Member",
  },

  partners: {
    title: "Partners & Supporters",
    learnMore: "Learn More",
    eonImageTitle: "eon winners",
    eon: "Winners of E.ON European Climate Fund competition",
    bci: "Consortium partners for Horizon Europe project",
    ontec: "Supporting Climate Accountability API work",
    roots: "Advisors and supporters of Climate Accountability API",
    upf: "Consortium partners for LIFE Programme project",
  },

  transparency: {
    title: "Transparency",
    text: "This project began as a side project on June 18th, 2020. After gaining significant global traction and extensive usage, it was officially registered as a legal entity in Berlin, Germany, on June 28th, 2023. On this page, you can view and request various documents related to our legal structure, financial information, governance policies, and other relevant details. If you require additional information or have specific inquiries, please feel free to reach out to us.",
    financialStatements: "Anual financial statements:",
    articlesOfAssociation: "Articles of association:",
    download: "Download",
    contact: "Contact",
  },

  git: {
    title: "Git software development updates",
    frontend: "Design / Frontend",
    tableLabel: "simple table",
    message: "Commit message",
    author: "Author",
    dateTime: "Date / Time",
    // Joins date and time in the Date / Time column: "2026-3-4 at 9:5".
    at: "at",
    noCommits: "No commits.",
    loadMore: "Load more commits",
    source: "Source:",
  },
};

export default about;
