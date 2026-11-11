// locales/de.js — German UI strings
//
// Mirrors locales/en.js key for key; see that file for the segment format.
// Link targets stay the same English-language sources: they're the cited
// references, not pages of this site.

import about from "./de/about";
import esg from "./de/esg";
import news from "./de/news";
import deforestation from "./de/deforestation";
import donate from "./de/donate";
import contact from "./de/contact";
import imprint from "./de/imprint";
import privacy from "./de/privacy";
import traffic from "./de/traffic";

const de = {
  meta: {
    home: {
      title: "Erderwärmung & Klimawandel API – aktuelle Klimadaten",
      description:
        "Aktuelle Daten, Grafiken und kostenlose APIs zu Erderwärmung und Klimawandel: globale Temperatur, Kohlendioxid (CO2), Methan, Lachgas, Meereis und Erwärmung der Ozeane.",
      keywords:
        "Erderwärmung, Klimawandel, globale Erwärmung, CO2-Konzentration, Klimadaten, API, Grafiken",
    },
  },

  menu: {
    linkedinAria: "Climate Accountability API auf LinkedIn",
    home: "Start",
    about: "Über uns",
    esg: "ESG",
    news: "News",
    deforestation: "Entwaldung",
    traffic: "Traffic",
    donate: "Spenden",
    contact: "Kontakt",
    otherLanguage: "English",
    otherLanguageShort: "EN",
    otherLanguageAria: "This page in English",
  },

  footer: {
    imprint: "Impressum",
    privacy: "Datenschutz",
    rights: "Climate Accountability API. Alle Rechte vorbehalten",
  },

  // Shown to visitors whose browser prefers German while they're on an
  // English page, so it's written in German.
  notFound: {
    title: "Seite nicht gefunden – Climate Accountability API",
    heading: "Seite nicht gefunden",
    text: "Die gesuchte Seite existiert nicht oder wurde verschoben.",
    home: "Zur Startseite",
  },
  banner: {
    message: "Diese Seite gibt es auch auf Deutsch.",
    switch: "Auf Deutsch lesen",
    dismiss: "Auf dieser Seite bleiben",
  },

  common: {
    todayValue: "Aktueller Wert:",
    hideGraph: "Grafik ausblenden",
    loadGraph: "Grafik laden",
    unavailable:
      "Daten derzeit nicht verfügbar. Bitte später erneut versuchen. Falls das Problem bestehen bleibt, schreiben Sie uns an help@global-warming.org",
    and: "und",
  },

  sideMenu: {
    toggleAria: "Abschnittsmenü ein- oder ausblenden",
    temperature: "Temperatur",
    co2: "Kohlendioxid",
    methane: "Methan",
    nitrous: "Lachgas",
    arctic: "Polareis",
    ocean: "Ozeanerwärmung",
  },

  landing: {
    h1: "API zu Erderwärmung und Klimawandel",
    logoAlt: "grüne Energie",
    intro:
      "Diese Seite bietet aktuelle APIs, Grafiken und Informationen zur Temperatur der Erde und zur Konzentration von Treibhausgasen in der Atmosphäre.",
    scrollAlt: "zum nächsten Abschnitt",
  },

  summary: {
    ariaLabel: "Aktuelle Klimaindikatoren",
    numberLocale: "de-DE",
    labels: {
      temperature: "Globale Temperatur",
      co2: "Kohlendioxid",
      methane: "Methan",
      nitrous: "Lachgas",
      seaIce: "Globales Meereis",
      ocean: "Ozeanerwärmung",
    },
    units: { "M km²": "Mio. km²" },
    months: {
      Jan: "Jan.",
      Feb: "Feb.",
      Mar: "März",
      Apr: "Apr.",
      May: "Mai",
      Jun: "Juni",
      Jul: "Juli",
      Aug: "Aug.",
      Sep: "Sept.",
      Oct: "Okt.",
      Nov: "Nov.",
      Dec: "Dez.",
    },
  },

  temperature: {
    title: "Globale Temperaturanomalien vom Jahr 1 bis heute",
    paragraphs: [
      [
        "Die heutige Geschwindigkeit der Erderwärmung ist nicht natürlich. Von 1880 bis 1981 lag sie bei 0,07 °C pro Jahrzehnt. Seit 1981 ist sie auf 0,18 °C pro Jahrzehnt gestiegen",
        {
          href: "https://www.climate.gov/news-features/understanding-climate/climate-change-global-temperature",
          text: " Climate Change: Global Temperature",
          em: true,
        },
        ".",
      ],
      [
        "Einige der früheren plötzlichen Temperaturanstiege in dieser Grafik entsprechen der Römischen und der Mittelalterlichen Warmzeit. Diese Ereignisse waren regional und nicht global.",
        {
          href: "https://www.ipcc.ch/report/ar4/wg1/",
          text: " AR4 Climate Change 2007: The Physical Science Basis ",
          em: true,
        },
        ". Mehr über prähistorische Temperaturdaten:",
        {
          href: "https://www.ipcc.ch/site/assets/uploads/2018/02/WG1AR5_Chapter05_FINAL.pdf",
          text: " Information from Paleoclimate Archives ",
          em: true,
        },
        "und",
        {
          href: "https://earthobservatory.nasa.gov/features/GlobalWarming/page3.php",
          text: " How is Today’s Warming Different from the Past?",
          em: true,
        },
      ],
      [
        "Seit der industriellen Revolution ist die globale Durchschnittstemperatur um etwa 1,0 °C gestiegen. Die Nordhalbkugel erwärmt sich schneller, die Arktis um 2 °C bis 4 °C. Weitere Details in diesen wissenschaftlichen Veröffentlichungen:",
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
        "Die Temperatur der Erde und der Anteil von Gasen wie CO2, Methan und Lachgas in der Atmosphäre hängen eng zusammen. Mehr zu diesem Thema und zu prähistorischen Daten:",
        {
          href: "https://www.nature.com/articles/srep21691",
          text: " On the causal structure between CO2 and global temperature",
          em: true,
        },
        { text: " und", em: true },
        {
          href: "https://environmentcounts.org/ec-perspective-accounting-for-800000-years-of-climate-change/",
          text: " EC Perspective: Accounting for 800,000 years of climate change.",
          em: true,
        },
      ],
    ],
  },

  co2: {
    title: "Kohlendioxid-Konzentration von vor 800.000 Jahren bis heute",
    prehistoricRange: "-800.000 – 2009",
    fullRange: "-800.000 – heute",
    paragraphs: [
      [
        "Tausende Jahre lang lag die natürliche CO2-Konzentration in der Erdatmosphäre bei etwa 280 ppm. Seit Beginn der industriellen Revolution haben menschliche Aktivitäten wie die Verbrennung fossiler Brennstoffe, Entwaldung und Viehhaltung diesen Wert um mehr als 30 % erhöht.",
      ],
      [
        "Mehr über prähistorische CO2-Konzentrationen sowie heutige und künftige Folgen: ",
        {
          href: "https://www.climate.gov/news-features/understanding-climate/climate-change-atmospheric-carbon-dioxide",
          text: " Climate Change: Atmospheric Carbon Dioxide ",
          em: true,
        },
        " und ",
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
    title: "Methan-Konzentration von vor 800.000 Jahren bis heute",
    paragraphs: [
      [
        "Methan ist ein brennbares Gas, das durch geologische und biologische Prozesse entsteht. Natürliche Quellen sind unter anderem Austritte aus Erdgasvorkommen und Feuchtgebiete.",
        { br: true },
        "50–65 % der weltweiten Methanemissionen stammen aus menschlichen Aktivitäten, etwa Viehhaltung, Landwirtschaft, Öl- und Gasförderung, Abfälle aus Haushalten und Unternehmen sowie Mülldeponien.",
      ],
      [
        "Methan hat ein um ein Vielfaches höheres Treibhauspotenzial als CO2. Über mehr als 650.000 Jahre lag die Methankonzentration in der Atmosphäre zwischen 350 und 800 ppb. Seit Beginn der industriellen Revolution haben menschliche Aktivitäten diesen Wert um etwa 150 % erhöht.",
      ],
      [
        "Mehr zur aktuellen Methan-Situation: ",
        {
          href: "https://www.epa.gov/ghgemissions/overview-greenhouse-gases#methane",
          text: " EPA: Methane Emissions",
        },
        " und ",
        {
          href: "https://earthobservatory.nasa.gov/images/146978/methane-emissions-continue-to-rise",
          text: " NASA: Methane Emissions Continue to Rise",
          em: true,
        },
        ".",
      ],
      [
        "Mehr zur prähistorischen Methankonzentration: ",
        {
          href: "https://www.nature.com/articles/nature06950",
          text: " Orbital and millennial-scale features of atmospheric CH4 over the past 800,000 years.",
        },
      ],
    ],
  },

  nitrous: {
    title: "Lachgas-Konzentration von vor 800.000 Jahren bis heute",
    paragraphs: [
      [
        "Lachgas (Distickstoffmonoxid) entsteht bei der Verbrennung fossiler Brennstoffe und fester Abfälle, durch stickstoffhaltige Düngemittel, in Kläranlagen, durch natürliche Prozesse sowie bei weiteren landwirtschaftlichen und industriellen Tätigkeiten.",
      ],
      [
        "Es ist das drittwichtigste wärmespeichernde Gas in der Atmosphäre und die größte vom Menschen ausgestoßene ozonabbauende Verbindung.",
      ],
      [
        "Ausführlichere Informationen: ",
        {
          href: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3306630/",
          text: "Stratospheric ozone depletion due to nitrous oxide: influences of other gases",
        },
        " und ",
        {
          href: "https://www.epa.gov/ghgemissions/overview-greenhouse-gases#nitrous-oxide",
          text: "EPA: Nitrous Oxide Emissions",
        },
        ".",
      ],
    ],
  },

  arctic: {
    title: "Ausdehnung des Meereises",
    paragraphs: [
      [
        "Die Arktis erwärmt sich etwa doppelt so schnell wie der globale Durchschnitt. Gründe dafür sind unter anderem die arktische Verstärkung, der Albedo-Effekt und Ruß. Von 1979 bis 1996 gingen 2,2–3 % der arktischen Eisbedeckung verloren. Seit 2010 verlieren wir 12,85 % pro Jahrzehnt!",
      ],
      [
        "Eine weitere Folge ist das Auftauen des Permafrosts. Dabei werden große Mengen Methan in die Atmosphäre freigesetzt, was die Erderwärmung weiter antreibt.",
      ],
      [
        "Weitere Details: ",
        {
          href: "https://www.npolar.no/en/themes/climate-change-in-the-arctic/#toggle-id-8",
          text: "Climate change in the Arctic",
        },
        " und ",
        {
          href: "https://www.igsoc.org/annals/46/a46a005.pdf",
          text: "Recent air-temperature changes in the Arctic",
        },
        ".",
      ],
    ],
  },

  ocean: {
    title: "Globale Temperaturanomalien der Ozeane, Januar–Dezember",
    apiTitleFallback:
      "Globale Temperaturanomalien der Ozeane, Durchschnitt Februar – Januar",
    paragraphs: [
      [
        "Das CO2, das wir ausstoßen, wird vom Ozean aufgenommen und gelöst, wodurch er saurer wird. Zudem verliert der Ozean durch Verschmutzung und Erderwärmung Sauerstoff und wird für Meeresorganismen weniger bewohnbar.",
      ],
      [
        "Der Ozean reguliert die Temperatur der Erde. Er nimmt den größten Teil der vom Menschen verursachten überschüssigen Wärme auf, erwärmt sich dadurch und kann in der Folge weniger Wärme aufnehmen. Ohne diese regulierende Wirkung läge die globale Durchschnittstemperatur bei etwa 50 statt 15 Grad Celsius.",
      ],
    ],
  },

  api: {
    getApi: "API abrufen",
    share: "Teilen",
    fetchEnd: "und Sie erhalten die Daten im JSON-Format.",
    temperature: {
      title:
        "Monatliche Veränderung der globalen mittleren Oberflächentemperatur",
      body: [
        "Diese API liefert monatlich die Anomalie der globalen mittleren Oberflächentemperatur von 1880.04 bis heute (in Grad Celsius). Rufen Sie diesen Endpunkt ab",
      ],
    },
    co2: {
      title: "Täglicher globaler saisonaler Zyklus und Trendwert",
      body: [
        "Diese API liefert nahezu täglich die Menge an Kohlendioxid (CO2) in der Atmosphäre für die letzten 10 Jahre bis heute, angegeben als Stoffmengenanteil in trockener Luft in Teilen pro Million (ppm). Rufen Sie diesen Endpunkt ab",
      ],
    },
    methane: {
      title:
        "Global gemittelte monatliche Methankonzentration in der Atmosphäre, gemessen an marinen Oberflächenstationen",
      body: [
        "Diese API liefert monatlich die Methanmenge in der Atmosphäre von 1983 bis heute, angegeben als Stoffmengenanteil in trockener Luft in Teilen pro Milliarde (ppb). Rufen Sie diesen Endpunkt ab",
      ],
    },
    nitrous: {
      title:
        "Global gemittelte monatliche Lachgaskonzentration in der Atmosphäre, gemessen an marinen Oberflächenstationen",
      body: [
        "Diese API liefert monatlich die Lachgasmenge in der Atmosphäre von 2001 bis heute, angegeben als Stoffmengenanteil in trockener Luft in Teilen pro Milliarde (ppb). Rufen Sie diesen Endpunkt ab",
      ],
    },
    arctic: {
      title: "Ausdehnung des Meereises",
      body: [
        "Monatliche Meereisausdehnung seit 1979 für die gesamte Erde, die Nordhalbkugel und die Südhalbkugel. Rufen Sie diesen Endpunkt ab",
      ],
    },
    ocean: {
      body: [
        "Der Datensatz Extended Reconstructed Sea Surface Temperature (ERSST) ist eine globale monatliche Analyse der Meeresoberflächentemperatur auf Grundlage des International Comprehensive Ocean–Atmosphere Dataset (",
        {
          href: "https://journals.ametsoc.org/view/journals/bams/93/11/bams-d-11-00241.1.xml",
          text: "ICOADS",
        },
        "). Er eignet sich für langfristige globale und regionale Studien und glättet lokale und kurzfristige Schwankungen. Rufen Sie diesen Endpunkt ab",
      ],
    },
  },

  charts: {
    year: "Jahr",
    celsius: "Grad Celsius",
    ppm: "Teile pro Million (ppm)",
    ppb: "Teile pro Milliarde (ppb)",
    nitrousAxis: "Lachgas-Stoffmengenanteil (ppb)",
    millionKm2: "Millionen km²",
    temperature: "Temperatur",
    co2: "Kohlendioxid",
    methane: "Methan",
    nitrous: "Lachgas",
    extent: "Ausdehnung",
    ocean: "Ozeanerwärmung",
    // Hinweise und Meldungen unter den Diagrammen (components/charts/*).
    dataError:
      "Beim Abrufen der Diagrammdaten ist ein Fehler aufgetreten. Bitte versuchen Sie es in einigen Minuten erneut. Falls der Fehler bestehen bleibt, melden Sie ihn uns bitte über unser Kontaktformular. Vielen Dank.",
    loadError:
      "Beim Laden des Diagramms ist ein Fehler aufgetreten. Bitte melden Sie ihn uns über unser Kontaktformular. Vielen Dank.",
    loadErrorArctic:
      "Beim Laden des Diagramms ist ein Fehler aufgetreten. Falls das Problem bestehen bleibt, melden Sie es uns bitte über unser Kontaktformular. Vielen Dank.",
    months: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
    source: "Quelle:",
    title: "Titel:",
    basePeriod: "Referenzzeitraum:",
    dataSource: "Datenquelle:",
    temperatureSourceModern: "Quelle der Daten von 1880 bis heute:",
    temperatureSourceAncient: "Quelle der Daten vom Jahr 1 bis 1979:",
    co2LiveSource:
      "Für die letzten 10 Jahre bis heute wird die Kohlendioxidkonzentration nahezu täglich am Mauna-Loa-Observatorium gemessen. Quelle: Ed Dlugokencky und Pieter Tans, NOAA/GML (",
    co2RecentLiveSource:
      "Für die letzten 10 Jahre bis heute wird die Kohlendioxidkonzentration nahezu täglich am Mauna-Loa-Observatorium gemessen. Quelle: Ed Dlugokencky und Pieter Tans, NOAA/GML (",
    co2PrehistoricSource: "Datenquelle: vor 800.000 Jahren bis 2021",
    methaneModernSource: "Datenquelle von 1983 bis heute:",
    methaneAncientSource: "Datenquelle von vor 800.000 Jahren bis 1983:",
    methaneMonthly: "Ab 1983.07 werden diese Daten monatlich erhoben",
    nitrousAncientSource: "Datenquelle von vor 800.000 Jahren bis 2001:",
    nitrousModernSource: "2001 bis heute:",
    nitrousMonthly: "Ab 2001.01 werden die Daten monatlich erhoben",
    arcticTitle: "Globale Meereisausdehnung 1979–2024 (monatlich)",
    oceanNote:
      "Hinweis: Globale und hemisphärische Anomalien beziehen sich auf den Durchschnitt der Jahre 1901–2000.",
    oceanCitation:
      "NOAA National Centers for Environmental Information, Climate at a Glance: Global Time Series, veröffentlicht im Januar 2023, abgerufen am 19. Januar 2023 von",
  },

  // One namespace per page, each in its own file under locales/de/.
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

export default de;
