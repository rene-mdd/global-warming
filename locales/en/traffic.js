// locales/en/traffic.js — Traffic dashboard strings (shape: see locales/en.js)
//
// Used by components/semantic/trafficDashboard, dailyHistoryPanel and
// locationsPanel. Strings that contain values are functions taking values
// the caller has ALREADY formatted (lib/chart-theme.js formatters with the
// page locale), plus the raw count where a plural form depends on it — so
// each locale controls its own word order and plurals. Paragraphs with
// inline code are segment arrays for components/semantic/richText.js.

const traffic = {
  // pages/traffic/index.js passes these to SiteHeader swapped — the page
  // title is the long sentence. Stored as rendered so the English page is
  // unchanged; locales/de/traffic.js has them the right way round.
  meta: {
    title:
      "Current usage of the Climate Accountability APIs, including the number of requests and the most popular endpoints.",
    description: "Climate Accountability API - Traffic",
    keywords: "Global warming, Climate APIs, carbon footprint, co2, usage",
  },

  requestFailed: (status) => `Request failed (${status})`,
  noData: "No data yet",
  other: "Other",
  unknownCountry: "Unknown",

  ranges: {
    "1h": "1 hour",
    "6h": "6 hours",
    "24h": "24 hours",
    "7d": "7 days",
  },

  status: {
    s2xx: "2xx success",
    s3xx: "3xx redirect",
    s4xx: "4xx client error",
    s5xx: "5xx server error",
  },

  bucket: {
    day: "1 day",
    hour: "1 hour",
    minutes: (n) => `${n} min`,
  },

  header: {
    title: "Traffic & API usage",
    source: "Ingested via Vercel Log Drains · backend requests only",
    eventsStored: (n) => `${n} events stored`,
    auto: "Auto",
    refresh: "Refresh",
  },

  backendOnly: {
    title: "This only covers backend requests",
    body: "Log Drains fire only on Function invocations, so CDN cache hits (most of the traffic) are invisible here. This is roughly 15% to 30% of real requests. Vercel Observability has the totals.",
  },

  geo: {
    title: "Country data only covers instrumented routes",
    body: (pct) => [
      `Only ${pct} of requests in this window carry a country. That's expected, not a data quality problem: country comes only from the `,
      { text: "x-vercel-ip-country", code: true },
      " header, and only the public climate-data API routes call ",
      { text: "logRequest()", code: true },
      " (see ",
      { text: "lib/log-request.js", code: true },
      ") to capture it. Traffic to other routes has no country at all — there is no edge-region fallback guess anymore.",
    ],
  },

  publicView: {
    title: "Public view",
    body: "This dashboard is published openly, so per-visitor detail is withheld: individual addresses, user agents, referrers and application fields are removed server-side. Aggregate figures are shown in full.",
  },

  // Shared by the dashboard tiles and the daily history tiles.
  tiles: {
    totalRequests: "Total requests",
    totalHint: (days, count) =>
      `all edge traffic (cache hits + backend), ${days} day${
        count === 1 ? "" : "s"
      } measured`,
    totalHintNone: "no Vercel metrics reported for this range yet",
    backendRequests: "Backend requests",
    backendHint: (entries, builds) =>
      `from ${entries} log entries${builds ? ` · ${builds} build` : ""}`,
    errorRate: "Error rate",
    errorHint: (errors, serverErrors) => `${errors} 4xx+ · ${serverErrors} 5xx`,
    routes: "Routes",
    routesHint: "Distinct paths hit",
    bots: "Bot traffic",
    botsHint: (n) => `${n} requests`,
    bytes: "Response bytes",
    bytesHint: "Sum of proxy.responseByteSize",
  },

  overTime: {
    title: "Requests over time",
    sub: (bucket) => `Stacked by status class · ${bucket} buckets`,
    showTable: "Show table",
    hideTable: "Hide table",
    bucketColumn: "Bucket",
    total: "Total",
  },

  statusClasses: {
    title: "Status classes",
    sub: "Every bar is labelled, so the colours are reinforcement only",
  },

  breakdowns: {
    country: { title: "Top countries", sub: "From x-vercel-ip-country headers" },
    route: { title: "Top routes", sub: "Query strings stripped" },
    browser: { title: "Browsers", sub: "Parsed from User-Agent" },
    os: { title: "Operating systems" },
    device: { title: "Device types" },
    method: { title: "HTTP methods" },
    statusCode: { title: "Status codes", sub: "Exact codes, not classes" },
    clientIp: { title: "Top client IPs", sub: "Most active callers" },
    host: { title: "Hostnames" },
    source: {
      title: "Log sources",
      sub: "lambda = functions · edge = middleware/edge runtime",
    },
    referer: { title: "Referrers" },
  },

  live: {
    title: "Live events",
    subtitlePrivate: "Newest first · every field the drain delivered",
    newestFirst: "Newest first",
    publicView: "public view: no addresses or user agents",
    roundedDown: (grain) => `times rounded down to the ${grain}`,
    searchPublic: "Search path, country, host…",
    searchPrivate: "Search path, IP, country, UA…",
    allStatuses: "All statuses",
    statusOnly: (cls) => `${cls} only`,
    shown: (n) => `${n} shown`,
    empty:
      "No events match. Try widening the time range or clearing the search.",
    columns: {
      time: "Time",
      status: "Status",
      method: "Method",
      path: "Path",
      clientIp: "Client IP",
      location: "Location",
      browserOs: "Browser / OS",
      host: "Host",
      source: "Source",
      deployment: "Deployment",
      yourFields: "Your fields",
    },
  },

  footer: {
    drainEndpoint: "Drain endpoint:",
    configuredIn: "· Configured in Vercel under",
    drainsLink: "Team Settings → Drains",
    esg: "For companies ESG data visit:",
  },

  daily: {
    title: "Daily history",
    sub: "One rollup per day · not limited by the ~7-day raw event window · chart below is backend requests only, not CDN cache hits",
    ranges: { 7: "7 days", 30: "30 days", 90: "90 days" },
    emptyTitle: "No daily rollups yet",
    emptyBody: [
      "Nothing in ",
      { text: "drain:daily", code: true },
      " for this range. It fills in once ",
      { text: "/api/drains/rollup", code: true },
      " has run at least once.",
    ],
    backendAcross: (days, count) => `across ${days} day${count === 1 ? "" : "s"}`,
    coverage: (pct, estimated) =>
      ` · ~${pct}% of real traffic (rest is cache hits)${
        estimated ? ", estimated" : ""
      }`,
    busiestDay: "Busiest day",
    busiestHint: "unique addresses, single day — not summed across days",
  },

  locations: {
    title: "Top IPs by location",
    sub: "Click a country to see the individual addresses",
    ipsAre: (word) => ` · IPs are ${word}`,
    ipMode: { hash: "hashed", truncate: "truncated to /24", other: "not stored" },
    addressHeading: {
      hash: "Visitor (hashed)",
      truncate: "Subnet",
      other: "IP address",
    },
    countUnit: { hash: "visitors", truncate: "subnets", other: "IPs" },
    filter: "Filter country, city or IP…",
    dropNotice: [
      { text: "DRAIN_ANONYMIZE_IPS=drop", code: true },
      " is set, so no addresses are stored — locations and counts only.",
    ],
    noMatch: "Nothing matches that filter.",
    noData: "No location data in this window yet.",
    req: "req",
    errTooltip: (n) => `${n} responses were 4xx or 5xx`,
    err: (pct) => `${pct} err`,
    withheld: "Individual addresses are withheld in the public view.",
    disabled: "IP storage is disabled.",
    columns: {
      requests: "Requests",
      errors: "Errors",
      topRoute: "Top route",
      client: "Client",
      firstSeen: "First seen",
      lastSeen: "Last seen",
    },
    bot: "bot",
    moreAddresses: (n) => [
      `+ ${n} more addresses not shown (raise with `,
      { text: "?ips=", code: true },
      " on /api/drains/locations)",
    ],
    moreCountries: (n) => `+${n} more countries not shown. `,
    noLocation: (n) =>
      `${n} requests had no location at all (static assets and build logs often don't).`,
    relative: {
      justNow: "just now",
      minutes: (n) => `${n}m ago`,
      hours: (n) => `${n}h ago`,
      days: (n) => `${n}d ago`,
    },
  },
};

export default traffic;
