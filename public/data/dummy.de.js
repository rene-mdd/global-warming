// public/data/dummy.de.js — German ESG company data for /de/esg
//
// Built from dummy.js rather than copied, so scores, logos, sources and
// every other non-prose field can never drift from the English data. Only
// `additional_details.value` differs: it's the one prose field the ESG
// page renders (`services.value` is an unrendered placeholder, source titles
// are URLs, `products_services` is a list of product names). Keyed by
// company title; tests/i18n.test.js fails if a company has no translation
// or if a translation's HTML tags differ from the English ones.

import businessData from "./dummy";

export const GERMAN_DETAILS = {
  "Volkswagen AG":
    "Volkswagen bietet ein CO2-neutrales Fahrzeugmodell an, den ID.3.<br><br> Das Unternehmen hat den Solarpark Tramm-Göthen mitgebaut.<br><br> Europäische Autohersteller wie VW, BMW, Daimler, PSA und Renault werden mit der Abholzung des Amazonas-Regenwaldes in Verbindung gebracht. <br><br><br>Positive Maßnahmen: <br><br>Strategie „Way to Zero“ für ein klimaneutrales Geschäft bis 2050<br><br>In Europa führend beim Umstieg auf E-Autos und bei Investitionen in Batterien<br><br>Projekte für erneuerbare Energien und CO2-neutrale Werke<br><br>Pilotprojekte für Batterierecycling und Kreislaufwirtschaft<br><br>Initiativen für verantwortungsvolle Beschaffung<br><br><br>Negative Maßnahmen:<br><br>Dieselskandal und anhaltender Imageschaden<br><br>Weiterhin weltweiter Verkauf von Verbrennern<br><br>Teilweise starke Abhängigkeit von CO2-Kompensationen<br><br>Hohe Emissionen in der Lieferkette und langsame Dekarbonisierung weltweit<br>Menschenrechtsbedenken in den Lieferketten für Mineralien<br><br>",
  JBS: "Dieses Unternehmen ist ein gutes Beispiel für Greenwashing. Es gibt Dutzende Versprechen und Projekte zu Umweltschutz und Kompensation, aber keines davon wird tatsächlich umgesetzt. Im Gegenteil: Emissionen und Entwaldung nehmen jedes Jahr zu.<br><br>Zwischen 2016 und 2021 hat JBS seine THG-Emissionen um 51 % gesteigert.<br><br>In der Lieferkette von JBS findet massive Entwaldung statt, wie die Plattform Trase zeigt, doch forest500 vergibt beim Thema Entwaldung insgesamt 42 %. Diese Bewertung ist für das Unternehmen womöglich zu milde. Die Methodik und die Informationsquellen des forest500-Rankings müssen wir noch genauer untersuchen.<br><br>Zusage zu Netto-Null-Emissionen bis 2040 (zweifelhaft).",
  "Apple Inc.":
    "Apple Inc. hat zusammen mit Conservation International einen Fonds über 200 Millionen US-Dollar für bewirtschaftete Wälder zur Holzproduktion aufgelegt. Solche Projekte binden CO2 aus der Atmosphäre. Deshalb haben wir das im Bereich Klimabeitrag als teilweise erfüllt bewertet.<br><br>Seit 2018 versorgt Apple alle Unternehmensstandorte weltweit, darunter Büros, Stores und Rechenzentren, zu 100 % mit erneuerbarer Energie.<br><br>Seit 2020 ist Apple im eigenen Geschäftsbetrieb (Scope 1 und 2) CO2-neutral.<br><br>Über 99 % der gesamten Emissionen von Apple fallen in Scope 3 (vor allem Lieferkette und Produktnutzung).<br><br>Es gibt Berichte über Arbeitsrechtsverletzungen, schlechte Arbeitsbedingungen und Menschenrechtsprobleme in Zulieferfabriken (z. B. Foxconn, Pegatron).<br><br><br>Positive Maßnahmen: <br><br>Seit 2018 100 % erneuerbare Energie im eigenen Betrieb<br><br>Seit 2020 CO2-neutraler Geschäftsbetrieb<br><br>Ziel der vollständigen CO2-Neutralität bis 2030<br><br>Branchenführende Recycling-Roboter und Materialnutzung<br><br>Große Programme zur Dekarbonisierung der Zulieferer<br><br><br>Negative Maßnahmen:<br><br>Scope-3-Emissionen bleiben hoch (Lieferkette und Produktnutzung)<br><br>Kritik an geplanter Obsoleszenz und kurzen Produktzyklen<br><br>Teilweise Abhängigkeit von forstbasierten Kompensationen (Restore Fund)<br><br>Gemeldete Arbeits- und Umweltverstöße bei Zulieferern<br><br>Rohstoffbeschaffung mit Menschenrechts- und Umweltrisiken verbunden<br><br>",
  "Amazon Inc.":
    "Amazon hat eine Spende von 10 Millionen US-Dollar für den Schutz von Wäldern in verschiedenen Regionen der USA zugesagt. Für ein Unternehmen dieser Größe ist dieser Betrag lächerlich gering.<br><br>Außerdem hat Amazon gemeinsam mit The Nature Conservancy den Agroforestry and Restoration Accelerator gestartet. Dieses Projekt hat aber noch nicht begonnen, und es wird lange dauern, bis sich seine tatsächliche Wirkung messen lässt.<br><br>Die Emissionen von Amazon steigen jedes Jahr um etwa 15 %. <br><br><br>Positive Maßnahmen: <br><br>The Climate Pledge und Vorreiterrolle bei erneuerbaren Energien<br><br>Größter Unternehmenskäufer von erneuerbarer Energie<br><br>Climate Pledge Fund mit 2 Mrd. US-Dollar für grüne Start-ups<br><br>Elektrische Lieferfahrzeuge (Rivian)<br><br>Wiederaufforstung und weniger Verpackung<br><br><br>Negative Maßnahmen:<br><br>Steigende absolute Emissionen (trotz grüner Energie)<br><br>Wenig Transparenz bei Scope 3<br><br>Wachsende Emissionen durch Luftfracht und Expressversand<br><br>Greenwashing-Vorwürfe im Marketing<br><br>Geschäftsmodell, das Überkonsum fördert, und Probleme bei den Arbeitsbedingungen<br>",
  "Siemens AG":
    "Siemens hat weltweit rund 65.000 Zulieferer. Das macht es komplizierter, CO2-Emissionen zu messen und zu senken.",
  "Adidas AG":
    "Adidas hat sich verpflichtet, bis 2025 im eigenen Geschäftsbetrieb klimaneutral zu werden (THG – Treibhausgase) und die absoluten THG-Emissionen entlang der gesamten Wertschöpfungskette bis 2030 um 30 % gegenüber dem Basisjahr 2017 zu senken. Eine offizielle Zusage zu Netto-Null-Emissionen gibt es aber noch nicht.<br><br>Adidas gibt an, die kombinierten Nettoemissionen „kumuliert“ um 55 % gesenkt zu haben. Eine unabhängige Quelle, die das bestätigt, gibt es jedoch nicht.<br><br>Das Unternehmen bietet einen CO2-armen Laufschuh namens Futurecraft an.<br><br>Außerdem gibt es Schuhe aus recyceltem, aus dem Meer geborgenem Plastikmüll, die Parley-Schuhe.<br><br>Der Futurecraft Loop besteht zu 100 % aus recycelbarem TPU.",
};

const businessDataDe = businessData.map((company) => {
  const { attributes } = company.row;
  return {
    ...company,
    row: {
      ...company.row,
      attributes: {
        ...attributes,
        additional_details: {
          ...attributes.additional_details,
          value:
            GERMAN_DETAILS[attributes.title] ??
            attributes.additional_details.value,
        },
      },
    },
  };
});

export default businessDataDe;
