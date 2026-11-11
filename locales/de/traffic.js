// locales/de/traffic.js — Traffic dashboard strings (shape: see locales/en.js)
//
// See locales/en/traffic.js for how the function-valued entries are called.
// Technical names (Log Drains, Function, CDN, Edge, User-Agent, header and
// field names) stay in English: they're the names used in Vercel's UI and
// docs, and in German developer usage.

// Server-side granularity values (lib/public-mode.js), in the dative case
// the sentence below needs.
const GRAINS = { second: "Sekunde", minute: "Minute", hour: "Stunde" };

const traffic = {
  meta: {
    title: "Traffic & API-Nutzung – Climate Accountability API",
    description:
      "Aktuelle Nutzung der Climate Accountability APIs: Zahl der Anfragen, die meistgenutzten Endpunkte und der Verlauf pro Tag.",
    keywords:
      "Erderwärmung, Klima-APIs, CO2-Fußabdruck, CO2, Nutzung, Traffic",
  },

  requestFailed: (status) => `Anfrage fehlgeschlagen (${status})`,
  noData: "Noch keine Daten",
  other: "Sonstige",
  unknownCountry: "Unbekannt",
  valueLabels: {
    Unknown: "Unbekannt",
    unknown: "unbekannt",
    Other: "Sonstige",
    "Bot / crawler": "Bot / Crawler",
    Bot: "Bot",
    Desktop: "Desktop",
    Mobile: "Mobilgerät",
    Tablet: "Tablet",
  },
  apiErrors: {
    unauthorized: "Nicht autorisiert",
    "method not allowed": "Methode nicht erlaubt",
    endpoint_not_configured: "Endpunkt nicht konfiguriert",
  },

  ranges: {
    "1h": "1 Stunde",
    "6h": "6 Stunden",
    "24h": "24 Stunden",
    "7d": "7 Tage",
  },

  status: {
    s2xx: "2xx Erfolg",
    s3xx: "3xx Weiterleitung",
    s4xx: "4xx Client-Fehler",
    s5xx: "5xx Server-Fehler",
  },

  bucket: {
    day: "1 Tag",
    hour: "1 Stunde",
    minutes: (n) => `${n} Min.`,
  },

  header: {
    title: "Traffic & API-Nutzung",
    source: "Erfasst über Vercel Log Drains · nur Backend-Anfragen",
    eventsStored: (n) => `${n} Ereignisse gespeichert`,
    auto: "Auto",
    refresh: "Aktualisieren",
  },

  backendOnly: {
    title: "Hier werden nur Backend-Anfragen erfasst",
    body: "Log Drains werden nur bei Function-Aufrufen ausgelöst, deshalb sind CDN-Cache-Treffer (der Großteil des Traffics) hier unsichtbar. Das entspricht grob 15 % bis 30 % der tatsächlichen Anfragen. Die Gesamtzahlen finden Sie in Vercel Observability.",
  },

  geo: {
    title: "Länderdaten gibt es nur für instrumentierte Routen",
    body: (pct) => [
      `Nur ${pct} der Anfragen in diesem Zeitraum haben ein Land. Das ist so gewollt und kein Datenqualitätsproblem: Das Land stammt ausschließlich aus dem `,
      { text: "x-vercel-ip-country", code: true },
      "-Header, und nur die öffentlichen Klimadaten-API-Routen rufen ",
      { text: "logRequest()", code: true },
      " auf (siehe ",
      { text: "lib/log-request.js", code: true },
      "), um ihn zu erfassen. Traffic auf anderen Routen hat gar kein Land – eine Schätzung anhand der Edge-Region gibt es nicht mehr.",
    ],
  },

  publicView: {
    title: "Öffentliche Ansicht",
    body: "Dieses Dashboard ist öffentlich, deshalb werden Details zu einzelnen Besuchern zurückgehalten: Einzelne Adressen, User-Agents, Referrer und Anwendungsfelder werden schon auf dem Server entfernt. Aggregierte Zahlen werden vollständig angezeigt.",
  },

  tiles: {
    totalRequests: "Anfragen gesamt",
    totalHint: (days, count) =>
      `gesamter Edge-Traffic (Cache-Treffer + Backend), ${days} ${
        count === 1 ? "Tag" : "Tage"
      } gemessen`,
    totalHintNone: "für diesen Zeitraum noch keine Vercel-Metriken gemeldet",
    backendRequests: "Backend-Anfragen",
    backendHint: (entries, builds) =>
      `aus ${entries} Log-Einträgen${builds ? ` · ${builds} Build` : ""}`,
    errorRate: "Fehlerquote",
    errorHint: (errors, serverErrors) => `${errors} 4xx+ · ${serverErrors} 5xx`,
    routes: "Routen",
    routesHint: "Verschiedene aufgerufene Pfade",
    bots: "Bot-Traffic",
    botsHint: (n) => `${n} Anfragen`,
    bytes: "Antwortgröße",
    bytesHint: "Summe von proxy.responseByteSize",
  },

  overTime: {
    title: "Anfragen im Zeitverlauf",
    sub: (bucket) => `Gestapelt nach Statusklasse · Intervalle von ${bucket}`,
    showTable: "Tabelle anzeigen",
    hideTable: "Tabelle ausblenden",
    bucketColumn: "Intervall",
    total: "Gesamt",
  },

  statusClasses: {
    title: "Statusklassen",
    sub: "Jeder Balken ist beschriftet, die Farben dienen nur der Unterstützung",
  },

  breakdowns: {
    country: { title: "Top-Länder", sub: "Aus x-vercel-ip-country-Headern" },
    route: { title: "Top-Routen", sub: "Ohne Query-Strings" },
    browser: { title: "Browser", sub: "Aus dem User-Agent ermittelt" },
    os: { title: "Betriebssysteme" },
    device: { title: "Gerätetypen" },
    method: { title: "HTTP-Methoden" },
    statusCode: { title: "Statuscodes", sub: "Genaue Codes, keine Klassen" },
    clientIp: { title: "Top-Client-IPs", sub: "Aktivste Aufrufer" },
    host: { title: "Hostnamen" },
    source: {
      title: "Log-Quellen",
      sub: "lambda = Functions · edge = Middleware/Edge-Runtime",
    },
    referer: { title: "Referrer" },
  },

  live: {
    title: "Live-Ereignisse",
    subtitlePrivate: "Neueste zuerst · alle Felder, die der Drain geliefert hat",
    newestFirst: "Neueste zuerst",
    publicView: "öffentliche Ansicht: keine Adressen oder User-Agents",
    roundedDown: (grain) =>
      `Zeiten auf die ${GRAINS[grain] ?? grain} abgerundet`,
    searchPublic: "Pfad, Land, Host suchen …",
    searchPrivate: "Pfad, IP, Land, UA suchen …",
    allStatuses: "Alle Status",
    statusOnly: (cls) => `nur ${cls}`,
    shown: (n) => `${n} angezeigt`,
    empty:
      "Keine passenden Ereignisse. Vergrößere den Zeitraum oder leere die Suche.",
    columns: {
      time: "Zeit",
      status: "Status",
      method: "Methode",
      path: "Pfad",
      clientIp: "Client-IP",
      location: "Standort",
      browserOs: "Browser / OS",
      host: "Host",
      source: "Quelle",
      deployment: "Deployment",
      yourFields: "Eigene Felder",
    },
  },

  footer: {
    drainEndpoint: "Drain-Endpunkt:",
    configuredIn: "· Konfiguriert in Vercel unter",
    drainsLink: "Team Settings → Drains",
    esg: "ESG-Daten zu Unternehmen finden Sie hier:",
  },

  daily: {
    title: "Tagesverlauf",
    sub: "Eine Zusammenfassung pro Tag · nicht auf das ~7-tägige Rohdatenfenster begrenzt · das Diagramm zeigt nur Backend-Anfragen, keine CDN-Cache-Treffer",
    ranges: { 7: "7 Tage", 30: "30 Tage", 90: "90 Tage" },
    emptyTitle: "Noch keine Tageszusammenfassungen",
    emptyBody: [
      "Für diesen Zeitraum ist in ",
      { text: "drain:daily", code: true },
      " noch nichts vorhanden. Das füllt sich, sobald ",
      { text: "/api/drains/rollup", code: true },
      " mindestens einmal gelaufen ist.",
    ],
    backendAcross: (days, count) =>
      `über ${days} ${count === 1 ? "Tag" : "Tage"}`,
    coverage: (pct, estimated) =>
      ` · ~${pct} % des tatsächlichen Traffics (der Rest sind Cache-Treffer)${
        estimated ? ", geschätzt" : ""
      }`,
    busiestDay: "Stärkster Tag",
    busiestHint:
      "eindeutige Adressen an einem einzelnen Tag – nicht über Tage summiert",
  },

  locations: {
    title: "Top-IPs nach Standort",
    sub: "Klicken Sie auf ein Land, um die einzelnen Adressen zu sehen",
    ipsAre: (word) => ` · IPs werden ${word}`,
    ipMode: {
      hash: "gehasht",
      truncate: "auf /24 gekürzt",
      other: "nicht gespeichert",
    },
    addressHeading: {
      hash: "Besucher (gehasht)",
      truncate: "Subnetz",
      other: "IP-Adresse",
    },
    countUnit: { hash: "Besucher", truncate: "Subnetze", other: "IPs" },
    filter: "Land, Stadt oder IP filtern …",
    dropNotice: [
      { text: "DRAIN_ANONYMIZE_IPS=drop", code: true },
      " ist gesetzt, deshalb werden keine Adressen gespeichert – nur Standorte und Zahlen.",
    ],
    noMatch: "Nichts passt zu diesem Filter.",
    noData: "In diesem Zeitraum gibt es noch keine Standortdaten.",
    req: "Anfr.",
    errTooltip: (n) => `${n} Antworten waren 4xx oder 5xx`,
    err: (pct) => `${pct} Fehler`,
    withheld: "Einzelne Adressen werden in der öffentlichen Ansicht zurückgehalten.",
    disabled: "Die Speicherung von IPs ist deaktiviert.",
    columns: {
      requests: "Anfragen",
      errors: "Fehler",
      topRoute: "Top-Route",
      client: "Client",
      firstSeen: "Zuerst gesehen",
      lastSeen: "Zuletzt gesehen",
    },
    bot: "Bot",
    moreAddresses: (n) => [
      `+ ${n} weitere Adressen nicht angezeigt (mehr über `,
      { text: "?ips=", code: true },
      " auf /api/drains/locations)",
    ],
    moreCountries: (n) => `+${n} weitere Länder nicht angezeigt. `,
    noLocation: (n) =>
      `${n} Anfragen hatten gar keinen Standort (bei statischen Dateien und Build-Logs ist das oft so).`,
    relative: {
      justNow: "gerade eben",
      minutes: (n) => `vor ${n} Min.`,
      hours: (n) => `vor ${n} Std.`,
      days: (n) => `vor ${n} ${n === 1 ? "Tag" : "Tagen"}`,
    },
  },
};

export default traffic;
