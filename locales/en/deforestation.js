// locales/en/deforestation.js — deforestation page strings (shape: see locales/en.js)
//
// Article titles, summaries and source names come from the GNews and
// NewsCatcher APIs and are rendered as delivered, so they are not here.

const deforestation = {
  meta: {
    title: "Deforestation news",
    description:
      "Live news about worldwide deforestation and map builder to check on global forest loss.",
    keywords: "Deforestation, global warming, climate change, environment",
  },
  h1: "Global Deforestation",
  logoAlt: "forest logo",
  intro:
    "This section is intended to collect data on the current status of global deforestation. This is accomplished through the utilization of APIs, databases, news sources, MapBuilders, and academic journals.",
  scrollAlt: "move to next section",
  mapTitle: "Global forest loss map",
  mapCredits:
    "Credits: University of Maryland, department of geographical sciences.",
  mapParagraphs: [
    "Results from time-series analysis of Landsat images characterizing forest extent and change.",
    "Trees are defined as vegetation taller than 5m in height and are expressed as a percentage per output grid cell as ‘2000 Percent Tree Cover’. ‘Forest Cover Loss’ is defined as a stand-replacement disturbance, or a change from a forest to non-forest state, during the period 2000–2019. ‘Forest Cover Gain’ is defined as the inverse of loss, or a non-forest to forest change entirely within the period 2000–2012. ‘Forest Loss Year’ is a disaggregation of total ‘Forest Loss’ to annual time scales.",
    "Reference 2000 and 2019 imagery are median observations from a set of quality assessment-passed growing season observations.",
  ],
  listTitle: "News List",
  imageAlt: "News image",
  imageAltCatcher: "news image",
  sourceFallback: "News",
  readMore: "Read more",
  readLess: "Read less",
  sources: "News API sources:",
};

export default deforestation;
