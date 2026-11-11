// locales/en.js — English UI strings
//
// The English site's text, moved here verbatim from the components so that
// locales/de.js can mirror it key for key. Rich paragraphs are arrays of
// segments rendered by components/semantic/richText.js: a string is text,
// { href, text, em } is a link, { br: true } is a line break.
// tests/i18n.test.js fails if de.js is missing a key that en.js has.

import about from "./en/about";
import esg from "./en/esg";
import news from "./en/news";
import deforestation from "./en/deforestation";
import donate from "./en/donate";
import contact from "./en/contact";
import imprint from "./en/imprint";
import privacy from "./en/privacy";
import traffic from "./en/traffic";

const en = {
  meta: {
    home: {
      title: "Global Warming API",
      description:
        "Global warming & climate change up to date APIs, data, graphs, and news. Earth's temperature, carbon dioxide (CO2), methane, nitrous oxide, and melted polar ice cap.",
      keywords: "Global warming, climate change, API, graphs",
    },
  },

  menu: {
    linkedinAria: "Climate Accountability API on LinkedIn",
    home: "Home",
    about: "About",
    esg: "ESG",
    news: "News",
    deforestation: "Deforestation",
    traffic: "Traffic",
    donate: "Donate",
    contact: "Contact",
    // The switcher shows the OTHER language's name, written in that language.
    otherLanguage: "Deutsch",
    otherLanguageShort: "DE",
    otherLanguageAria: "Diese Seite auf Deutsch",
  },

  footer: {
    imprint: "Imprint",
    privacy: "Privacy Policy",
    rights: "Climate Accountability API. All Rights Reserved",
  },

  // Shown to visitors whose browser prefers English while they're on a
  // German page, so it's written in English.
  notFound: {
    title: "Page not found - Climate Accountability API",
    heading: "Page not found",
    text: "The page you are looking for does not exist or has been moved.",
    home: "Go to the home page",
  },
  banner: {
    message: "This page is also available in English.",
    switch: "Switch to English",
    dismiss: "Stay on this page",
  },

  common: {
    todayValue: "Today's value:",
    hideGraph: "Hide graph",
    loadGraph: "Load graph",
    unavailable:
      "Data currently unavailable. Try again later. If the problem persists, please inform us at help@global-warming.org",
    and: "and",
  },

  sideMenu: {
    toggleAria: "Show or hide the section menu",
    temperature: "Temperature",
    co2: "Carbon Dioxide",
    methane: "Methane",
    nitrous: "Nitrous Oxide",
    arctic: "Polar Ice",
    ocean: "Ocean warming",
  },

  landing: {
    h1: "Global Warming and Climate Change API",
    logoAlt: "green energy",
    intro:
      "This page delivers up to date APIs, graph, and information about the earth's current temperature and the concentration of greenhouse gases (GHG) in the atmosphere.",
    scrollAlt: "move to next section",
  },

  summary: {
    ariaLabel: "Current climate indicators",
    numberLocale: "en-US",
  },

  temperature: {
    title: "Global temperature anomalies from year 1 to present",
    paragraphs: [
      [
        "The current global warming rate is not natural. From 1880 to 1981 was (0.07°C / 0.13°F) per decade. Since 1981 this rate has increased to (0.18°C / 0.32°F)",
        {
          href: "https://www.climate.gov/news-features/understanding-climate/climate-change-global-temperature",
          text: " Climate Change: Global Temperature",
          em: true,
        },
        ".",
      ],
      [
        "Some of the past sudden increase on global temperature present in this graph, correspond to the Roman Warm Period and the Medieval Warm Period. These events were at regional and not global scale.",
        {
          href: "https://www.ipcc.ch/report/ar4/wg1/",
          text: " AR4 Climate Change 2007: The Physical Science Basis ",
          em: true,
        },
        ". For more information about prehistoric temperature records please visit:",
        {
          href: "https://www.ipcc.ch/site/assets/uploads/2018/02/WG1AR5_Chapter05_FINAL.pdf",
          text: " Information from Paleoclimate Archives ",
          em: true,
        },
        "and",
        {
          href: "https://earthobservatory.nasa.gov/features/GlobalWarming/page3.php",
          text: " How is Today’s Warming Different from the Past?",
          em: true,
        },
      ],
      [
        "The total average global temperature rise since the industrial revolution is around (1.0 °C / 1.8 °F). Earth northern hemisphere is warming faster. The arctic has warmed between (2 °C / 3.6 °F) and (4 °C / 7.2 °F). Please visit these scientific publications for more details:",
        {
          href: "https://www.igsoc.org/annals/46/a46a005.pdf",
          text: " Recent air-temperature changes in the Arctic",
          em: true,
        },
        ",",
        {
          href: "https://web.archive.org/web/20130628144322/http:/www.acia.uaf.edu/pages/scientific.html",
          text: " ACIA Scientific Report",
          em: true,
        },
        ",",
        {
          href: "https://www.climatecentral.org/news/in-global-warming-northern-hemisphere-is-outpacing-the-south-15850#:~:text=Berkeley%20and%20the%20University%20of,and%20oceans%20warm%20relatively%20slowly.",
          text: " In Warming, Northern Hemisphere is Outpacing the South",
          em: true,
        },
        ",",
        {
          href: "https://iopscience.iop.org/article/10.1088/1748-9326/aafc1b/pdf",
          text: " Key indicators of Arctic climate change: 1971–2017",
          em: true,
        },
        ",",
        {
          href: "https://nsidc.org/cryosphere/arctic-meteorology/climate_change.html",
          text: " Climate Change in the Arctic",
          em: true,
        },
        ",",
        {
          href: "https://www.nature.com/articles/s41467-019-09622-y",
          text: " Recent summer warming in northwestern Canada exceeds the Holocene thermal maximum",
          em: true,
        },
        ".",
      ],
      [
        "Earth temperature and the proportion of gases such as Co2, methane, and nitrous oxide in the atmosphere is strictly correlated. For more information about this topic and prehistoric data, please visit:",
        {
          href: "https://www.nature.com/articles/srep21691",
          text: " On the causal structure between CO2 and global temperature",
          em: true,
        },
        { text: " and", em: true },
        {
          href: "https://environmentcounts.org/ec-perspective-accounting-for-800000-years-of-climate-change/",
          text: " EC Perspective: Accounting for 800,000 years of climate change.",
          em: true,
        },
      ],
    ],
  },

  co2: {
    title: "Carbon Dioxide levels from 800,000 years ago to present",
    prehistoricRange: "-800,000 - 2009",
    fullRange: "-800,000 - present",
    paragraphs: [
      [
        "For thousands of years, the natural concentration of CO2 in earth atmosphere was around 280 ppm. From the beginning of the industrial revolution, human activities like the burning of fossil fuels, deforestation, and livestock have increased this amount by more than 30%.",
      ],
      [
        "For more information about prehistoric CO2 concentration, current and future consequences please visit: ",
        {
          href: "https://www.climate.gov/news-features/understanding-climate/climate-change-atmospheric-carbon-dioxide",
          text: " Climate Change: Atmospheric Carbon Dioxide ",
          em: true,
        },
        " and ",
        {
          href: "https://climate.nasa.gov/climate_resources/24/graphic-the-relentless-rise-of-carbon-dioxide/",
          text: "The relentless rise of carbon dioxide",
          em: true,
        },
        ".",
      ],
    ],
  },

  methane: {
    title: "Methane levels from 800,000 years ago to present",
    paragraphs: [
      [
        "Methane is a flammable gas formed by geological and biological processes. Some of the natural ones are leaks from natural gas systems and wetlands.",
        { br: true },
        "50-65% of total global methane emissions come from human activities. These include livestock, agriculture, oil and gas systems, waste from homes and businesses, landfills, and so on.",
      ],
      [
        "Methane is a gas with a global warming potential several times stronger than of CO2. For more than 650,000 years, methane concentration in the atmosphere was between 350 – 800 ppb. From the beginning of the industrial revolution, human activities have increased this amount by around 150%.",
      ],
      [
        "For more information about the methane situation please visit: ",
        {
          href: "https://www.epa.gov/ghgemissions/overview-greenhouse-gases#methane",
          text: " EPA: Methane Emissions and ",
        },
        {
          href: "https://earthobservatory.nasa.gov/images/146978/methane-emissions-continue-to-rise",
          text: " NASA: Methane Emissions Continue to Rise",
          em: true,
        },
        ".",
      ],
      [
        "For more information about the prehistoric methane concentration, please visit: ",
        {
          href: "https://www.nature.com/articles/nature06950",
          text: " Orbital and millennial-scale features of atmospheric CH4 over the past 800,000 years.",
        },
      ],
    ],
  },

  nitrous: {
    title: "Nitrous Oxide levels from 800,000 years ago to present",
    paragraphs: [
      [
        "Nitrous oxide is a gas that is produced by the combustion of fossil fuel and solid waste, nitrogen-base fertilizers, sewage treatment plants, natural processes, and other agricultural and industrial activities.",
      ],
      [
        "It is the third largest heat-trapping gas in the atmosphere and the biggest ozone-destroying compound emitted by human activities.",
      ],
      [
        "For more detailed information please visit: ",
        {
          href: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3306630/",
          text: "Stratospheric ozone depletion due to nitrous oxide: influences of other gases",
        },
        " and ",
        {
          href: "https://www.epa.gov/ghgemissions/overview-greenhouse-gases#nitrous-oxide",
          text: "EPA: Nitrous Oxide Emissions",
        },
        ".",
      ],
    ],
  },

  arctic: {
    title: "Sea ice extent",
    paragraphs: [
      [
        "The arctic is warming around twice as fast as global average. Some of the reasons for this are: The arctic amplification, the albedo effect, and black carbon. From 1979 to 1996, we lost 2.2 – 3% of the arctic ice cover. From 2010 to present we are losing 12.85% per decade!",
      ],
      [
        "Another consequence is permafrost thawing. This is a process in which large amounts of methane is released to the atmosphere, fueling more the process of global warming.",
      ],
      [
        "For more details please visit: ",
        {
          href: "https://www.npolar.no/en/themes/climate-change-in-the-arctic/#toggle-id-8",
          text: "Climate change in the Arctic",
        },
        " and ",
        {
          href: "https://www.igsoc.org/annals/46/a46a005.pdf",
          text: "Recent air-temperature changes in the Arctic",
        },
        ".",
      ],
    ],
  },

  ocean: {
    title: "Global Ocean Temperature Anomalies, January-December",
    apiTitleFallback:
      "Global Ocean February - January Average Temperature Anomalies",
    paragraphs: [
      [
        "The Co2 we produce is absorbed and dissolved into the ocean, making it more acidic. The ocean is also suffering from deoxygenation, due to contamination and global warming, making it less habitable for marine organism.",
      ],
      [
        "The ocean modulates earth temperature. It takes up most of the excess heat that we humans produce, making it warmer, and as result, less able to absorb heat. Without the ocean temperature regulatory effect, the global average temperature would be around 50 degrees Celsius instead of 15.",
      ],
    ],
  },

  // "Get API" panels. Each body is followed by the endpoint URL and `fetchEnd`.
  api: {
    getApi: "Get API",
    share: "Share",
    fetchEnd: "and you will get the info in JSON format.",
    temperature: {
      title: "Global Monthly Mean Surface Temperature Change",
      body: [
        "This API provides on a monthly basis, the global mean surface temperature anomaly from 1880.04 to the present (in celsius). Fetch this endpoint",
      ],
    },
    co2: {
      title: "Daily global seasonal cycle and trend value",
      body: [
        "This API provides on a quasi-daily basis, the amount of carbon dioxide (CO2) in the atmosphere from 10 years go to the present. It is expressed as a mole fraction in dry air, parts per million (ppm). Fetch this endpoint",
      ],
    },
    methane: {
      title:
        "Globally averaged, monthly mean atmospheric methane abundance determined from marine surface sites",
      body: [
        "This API provides on a monthly basis, the amount of methane in the atmosphere from 1983 to the present. Expressed as a mole fraction in dry air, parts per billion (ppb). Fetch this endpoint",
      ],
    },
    nitrous: {
      title:
        "Globally-averaged, monthly mean atmospheric nitrous oxide abundance determined from marine surface sites",
      body: [
        "This API provides on a monthly basis, the amount of nitrous oxide in the atmosphere from 2001 to the present. Expressed as a mole fraction in dry air, parts per billion (ppb). Fetch this endpoint",
      ],
    },
    arctic: {
      title: "Sea ice extent",
      body: [
        "Sea ice extent from 1979–2024 for the Globe, on a monthly basis, Northern Hemisphere, and Southern Hemisphere. Fetch this endpoint",
      ],
    },
    ocean: {
      body: [
        "The Extended Reconstructed Sea Surface Temperature (ERSST) dataset is a global monthly analysis of SST data derived from the International Comprehensive Ocean–Atmosphere Dataset (",
        {
          href: "https://journals.ametsoc.org/view/journals/bams/93/11/bams-d-11-00241.1.xml",
          text: "ICOADS",
        },
        "). The dataset can be used for long-term global and basin-wide studies and incorporates smoothed local and short-term variations. Fetch this endpoint",
      ],
    },
  },

  charts: {
    year: "Year",
    celsius: "Celsius",
    ppm: "Part Per million (ppm)",
    ppb: "Part Per billion (ppb)",
    nitrousAxis: "Nitrous Oxide mole fraction (ppb)",
    millionKm2: "Million square km",
    temperature: "Temperature",
    co2: "Carbon Dioxide",
    methane: "Methane",
    nitrous: "Nitrous Oxide",
    extent: "Extent",
    ocean: "Ocean warming",
    // Footer notes and messages under the charts (components/charts/*).
    dataError:
      "There was an error while trying to retrieve the graph data. Please try again in a few minutes. If the error persists, please use our contact form to report it. Thank you.",
    loadError:
      "There was an error trying to load the graph. Please refer to our contact form and report it. Thank you.",
    loadErrorArctic:
      "There was an error trying to load the graph. If the problem persists, please refer to our contact form and report it. Thank you.",
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
    source: "Source:",
    title: "Title:",
    basePeriod: "Base period:",
    dataSource: "Data source:",
    temperatureSourceModern: "Source data 1880 - present:",
    temperatureSourceAncient: "Source data year 1 – 1979:",
    co2LiveSource:
      "From 10 years ago to present, the measurements of carbon dioxide concentrations are measured on a quasi daily basis by Mauna Loa Observatory. Source: Ed Dlugokencky and Pieter Tans, NOAA/GML (",
    co2RecentLiveSource:
      "From 10 years ago to present, the measurements of carbon dioxide concentrations are done on a quasi daily basis by Mauna Loa Observatory. Source: Ed Dlugokencky and Pieter Tans, NOAA/GML (",
    co2PrehistoricSource: "Data source: 800,000 years ago to 2021",
    methaneModernSource: "Year 1983 to present data source:",
    methaneAncientSource: "Data 800,000 years ago to 1983 source:",
    methaneMonthly: "From 1983.07 this data is measured on a monthly basis",
    nitrousAncientSource: "Data 800,000 ago to 2001 source:",
    nitrousModernSource: "2001 - present:",
    nitrousMonthly: "From 2001.01 the data is measured on a monthly basis",
    arcticTitle: "Global Sea Ice Extent 1979-2024 (on a monthly basis)",
    oceanNote:
      "Please note, global and hemispheric anomalies are with respect to the 1901-2000 average.",
    oceanCitation:
      "NOAA National Centers for Environmental information, Climate at a Glance: Global Time Series, published January 2023, retrieved on January 19, 2023 from",
  },

  // One namespace per page, each in its own file under locales/en/.
  about,
  esg,
  news,
  deforestation,
  donate,
  contact,
  imprint,
  privacy,
  traffic,
};

export default en;
