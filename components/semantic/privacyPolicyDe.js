// components/semantic/privacyPolicyDe.js — German privacy policy
//
// A statement-for-statement translation of the English policy in
// pages/privacy-policy/index.js. It adds and drops nothing, so any factual
// error in the English text is mirrored here, and every change to the
// English text needs the same change here.

import { useState } from "react";
import PropTypes from "prop-types";
import {
  Link,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  Stack,
  Popper,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Container } from "@mui/system";
import StickyMenu from "./menu";
import SiteHeader from "../siteHeader";
import Footer from "./footer";
import { useT } from "../../lib/i18n";

const LOGGED_FIELDS = [
  "die gekürzte oder pseudonymisierte IP-Adresse des anfragenden Geräts",
  "das Land, das unser Hosting-Anbieter für unsere Klimadaten-API-Endpunkte aus dieser IP-Adresse ableitet – Stadt, genaue Koordinaten, Postleitzahl oder Zeitzone werden nicht erfasst",
  "Datum und Uhrzeit der Anfrage",
  "der angefragte Pfad und die HTTP-Methode",
  "der zurückgegebene HTTP-Statuscode",
  "die Referrer-URL, sofern übermittelt",
  "Browsertyp und -version sowie Betriebssystem, wie im User-Agent angegeben",
  "der angefragte Hostname und die Deployment-Kennung",
];

export default function PrivacyPolicyDe({ websiteUrl }) {
  const t = useT().privacy;
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <>
      <SiteHeader
        description={t.meta.description}
        title={t.meta.title}
        keywords={t.meta.keywords}
        websiteUrl={websiteUrl}
      />
      <StickyMenu />
      <Grid container>
        <Container className="privacy-policy">
          <Typography
            component="h2"
            align="left"
            className="about-title"
            mb={5}
          >
            Datenschutzerklärung
          </Typography>
          <Typography component="h2" mb={4} mt={4}>
            1. Datenschutz auf einen Blick
          </Typography>
          <Typography component="h3">Allgemeine Hinweise</Typography>{" "}
          <Typography component="p">
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was
            mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website
            besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie
            persönlich identifiziert werden können. Ausführliche Informationen
            zum Thema Datenschutz finden Sie in unserer unter diesem Text
            aufgeführten Datenschutzerklärung.
          </Typography>
          <Typography component="h3">Datenerfassung auf dieser Website</Typography>{" "}
          <Typography component="h4">
            Wer ist verantwortlich für die Datenerfassung auf dieser Website
            (d. h. der „Verantwortliche“)?
          </Typography>{" "}
          <Typography component="p">
            Die Datenverarbeitung auf dieser Website erfolgt durch den
            Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt
            „Hinweis zur verantwortlichen Stelle (in der DSGVO
            „Verantwortlicher“ genannt)“ in dieser Datenschutzerklärung
            entnehmen.
          </Typography>{" "}
          <Typography component="h4">Wie erfassen wir Ihre Daten?</Typography>{" "}
          <Typography component="p">
            Ihre Daten werden zum einen dadurch erhoben, dass Sie sie uns
            mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in
            unser Kontaktformular eingeben.
          </Typography>{" "}
          <Typography component="p">
            Andere Daten werden automatisch oder nach Ihrer Einwilligung beim
            Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor
            allem technische Daten (z. B. Internetbrowser, Betriebssystem oder
            Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt
            automatisch, sobald Sie diese Website aufrufen.
          </Typography>{" "}
          <Typography component="h4">Wofür nutzen wir Ihre Daten?</Typography>{" "}
          <Typography component="p">
            Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung
            der Website zu gewährleisten. Andere Daten können zur Analyse
            Ihres Nutzerverhaltens verwendet werden.
          </Typography>{" "}
          <Typography component="h4">
            Welche Rechte haben Sie bezüglich Ihrer Daten?
          </Typography>{" "}
          <Typography component="p">
            Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft,
            Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu
            erhalten. Sie haben außerdem das Recht, die Berichtigung oder
            Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur
            Datenverarbeitung erteilt haben, können Sie diese Einwilligung
            jederzeit mit Wirkung für die Zukunft widerrufen. Außerdem haben Sie
            das Recht, unter bestimmten Umständen die Einschränkung der
            Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Des
            Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen
            Aufsichtsbehörde zu.
          </Typography>{" "}
          <Typography component="p">
            Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie
            sich jederzeit an uns wenden.
          </Typography>
          <Typography component="h3">
            Analyse-Tools und Tools von Drittanbietern
          </Typography>{" "}
          <Typography component="p">
            Beim Besuch dieser Website kann Ihr Surfverhalten statistisch
            ausgewertet werden. Das geschieht vor allem mit sogenannten
            Analyseprogrammen.
          </Typography>{" "}
          <Typography component="p">
            Detaillierte Informationen zu diesen Analyseprogrammen finden Sie in
            der folgenden Datenschutzerklärung.
          </Typography>
          <Typography component="h2" mb={4} mt={4}>
            2. Hosting
          </Typography>
          <Typography component="p">
            Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
          </Typography>
          <Typography component="h3">Externes Hosting</Typography>{" "}
          <Typography component="p">
            Diese Website wird extern gehostet. Die personenbezogenen Daten, die
            auf dieser Website erfasst werden, werden auf den Servern des
            Hosters gespeichert. Hierbei kann es sich u. a. um IP-Adressen,
            Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten,
            Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über
            eine Website generiert werden, handeln.
          </Typography>{" "}
          <Typography component="p">
            Das externe Hosting erfolgt im Interesse einer sicheren, schnellen
            und effizienten Bereitstellung unseres Online-Angebots durch einen
            professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO). Sofern eine
            entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung
            ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und §
            25 Abs. 1 TDDDG, soweit die Einwilligung die Speicherung von Cookies
            oder den Zugriff auf Informationen im Endgerät des Nutzers (z. B.
            Device-Fingerprinting) im Sinne des TDDDG umfasst. Die Einwilligung
            ist jederzeit widerrufbar.
          </Typography>{" "}
          <Typography component="p">
            Unser(e) Hoster wird bzw. werden Ihre Daten nur insoweit
            verarbeiten, wie dies zur Erfüllung seiner Leistungspflichten
            erforderlich ist, und unsere Weisungen in Bezug auf diese Daten
            befolgen.
          </Typography>{" "}
          <Typography component="p">
            Wir setzen folgende(n) Hoster ein:
          </Typography>
          <Typography component="p" mt={2}>
            Vercel Inc.
            <br /> 440 N Barranca Ave #4133
            <br /> Covina, CA 91723
          </Typography>
          <Typography component="p" mt={2} mb={2}>
            {" "}
            Weitere Informationen zum Umgang von Vercel mit Ihren Daten finden
            Sie in der Datenschutzerklärung von Vercel, die Sie{" "}
            <Link href="https://vercel.com/legal/privacy-policy">hier</Link>{" "}
            abrufen können.
          </Typography>
          <Typography component="h4">Auftragsverarbeitung</Typography>{" "}
          <Typography component="p">
            Wir haben einen Vertrag über Auftragsverarbeitung (AVV) zur Nutzung
            des oben genannten Dienstes geschlossen. Hierbei handelt es sich um
            einen datenschutzrechtlich vorgeschriebenen Vertrag, der
            gewährleistet, dass dieser die personenbezogenen Daten unserer
            Websitebesucher nur nach unseren Weisungen und unter Einhaltung der
            DSGVO verarbeitet.
          </Typography>
          <Typography component="h2" mb={4} mt={4}>
            3. Allgemeine Hinweise und Pflichtinformationen
          </Typography>
          <Typography component="h3">Datenschutz</Typography>{" "}
          <Typography component="p">
            Die Betreiber dieser Website und ihrer Seiten nehmen den Schutz
            Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre
            personenbezogenen Daten vertraulich und entsprechend den
            gesetzlichen Datenschutzvorschriften sowie dieser
            Datenschutzerklärung.
          </Typography>{" "}
          <Typography component="p">
            Wenn Sie diese Website benutzt, werden verschiedene personenbezogene
            Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie
            persönlich identifiziert werden können. Die vorliegende
            Datenschutzerklärung erläutert, welche Daten wir erheben und wofür
            wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das
            geschieht.
          </Typography>{" "}
          <Typography component="p">
            Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B.
            bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann.
            Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist
            nicht möglich.
          </Typography>
          <Typography component="h3">
            Hinweis zur verantwortlichen Stelle (in der DSGVO
            „Verantwortlicher“ genannt)
          </Typography>{" "}
          <Typography component="p">
            Verantwortliche Stelle für die Datenverarbeitung auf dieser Website
            ist:
          </Typography>{" "}
          <Typography component="p">
            Climate Accountability API gUG (haftungsbeschränkt)
            <br /> Seestraße 107, 13353 Berlin, Deutschland
          </Typography>
          <Typography component="div">
            Telefon:{" "}
            <button aria-describedby={id} type="button" onClick={handleClick}>
              Nummer anzeigen
            </button>
            <Popper id={id} open={open} anchorEl={anchorEl}>
              <Box sx={{ border: 1, p: 1, bgcolor: "white" }}>
                0 &#49;&#53;&#50;&#48; &#50;&#52;&#49;&#56;&#51;&#48;&#49;
              </Box>
            </Popper>
          </Typography>
          <br /> E-Mail: help@global-warming.org
          <Typography component="p">
            Verantwortliche Stelle ist die natürliche oder juristische Person,
            die allein oder gemeinsam mit anderen über die Zwecke und Mittel der
            Verarbeitung von personenbezogenen Daten (z. B. Namen,
            E-Mail-Adressen o. Ä.) entscheidet.
          </Typography>
          <Typography component="h3">Speicherdauer</Typography>{" "}
          <Typography component="p">
            Soweit innerhalb dieser Datenschutzerklärung keine speziellere
            Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen
            Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt.
            Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine
            Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten
            gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für
            die Speicherung Ihrer personenbezogenen Daten haben (z. B. steuer-
            oder handelsrechtliche Aufbewahrungsfristen); im letztgenannten Fall
            erfolgt die Löschung nach Fortfall dieser Gründe.
          </Typography>
          <Typography component="h3">
            Allgemeine Hinweise zu den Rechtsgrundlagen der Datenverarbeitung
            auf dieser Website
          </Typography>{" "}
          <Typography component="p">
            Sofern Sie in die Datenverarbeitung eingewilligt haben, verarbeiten
            wir Ihre personenbezogenen Daten auf Grundlage von Art. 6 Abs. 1
            lit. a DSGVO bzw. Art. 9 Abs. 2 lit. a DSGVO, sofern besondere
            Datenkategorien nach Art. 9 Abs. 1 DSGVO verarbeitet werden. Im
            Falle einer ausdrücklichen Einwilligung in die Übertragung
            personenbezogener Daten in Drittstaaten erfolgt die
            Datenverarbeitung außerdem auf Grundlage von Art. 49 Abs. 1 lit. a
            DSGVO. Sofern Sie in die Speicherung von Cookies oder in den Zugriff
            auf Informationen in Ihrem Endgerät (z. B. via
            Device-Fingerprinting) eingewilligt haben, erfolgt die
            Datenverarbeitung zusätzlich auf Grundlage von § 25 Abs. 1 TDDDG.
            Die Einwilligung ist jederzeit widerrufbar. Sind Ihre Daten zur
            Vertragserfüllung oder zur Durchführung vorvertraglicher Maßnahmen
            erforderlich, verarbeiten wir Ihre Daten auf Grundlage von Art. 6
            Abs. 1 lit. b DSGVO. Des Weiteren verarbeiten wir Ihre Daten,
            sofern diese zur Erfüllung einer rechtlichen Verpflichtung
            erforderlich sind, auf Grundlage von Art. 6 Abs. 1 lit. c DSGVO.
            Die Datenverarbeitung kann ferner auf Grundlage unseres berechtigten
            Interesses nach Art. 6 Abs. 1 lit. f DSGVO erfolgen. Über die
            jeweils im Einzelfall einschlägigen Rechtsgrundlagen wird in den
            folgenden Absätzen dieser Datenschutzerklärung informiert.
          </Typography>
          <Typography component="h3">
            Empfänger von personenbezogenen Daten
          </Typography>{" "}
          <Typography component="p">
            Im Rahmen unserer Geschäftstätigkeit arbeiten wir mit verschiedenen
            externen Stellen zusammen. Dabei ist teilweise auch eine
            Übermittlung von personenbezogenen Daten an diese externen Stellen
            erforderlich. Wir geben personenbezogene Daten nur dann an externe
            Stellen weiter, wenn dies im Rahmen einer Vertragserfüllung
            erforderlich ist, wenn wir gesetzlich hierzu verpflichtet sind (z. B.
            Weitergabe von Daten an Steuerbehörden), wenn wir ein berechtigtes
            Interesse nach Art. 6 Abs. 1 lit. f DSGVO an der Weitergabe haben
            oder wenn eine sonstige Rechtsgrundlage die Datenweitergabe erlaubt.
            Beim Einsatz von Auftragsverarbeitern geben wir personenbezogene
            Daten nur auf Grundlage eines gültigen Vertrags über
            Auftragsverarbeitung weiter. Im Falle einer gemeinsamen Verarbeitung
            wird ein Vertrag über gemeinsame Verarbeitung geschlossen.
          </Typography>
          <Typography component="h3">
            Widerruf Ihrer Einwilligung zur Datenverarbeitung
          </Typography>{" "}
          <Typography component="p">
            Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen
            Einwilligung möglich. Sie können eine bereits erteilte Einwilligung
            jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf
            erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
          </Typography>
          <Typography component="h3">
            Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen
            sowie gegen Direktwerbung (Art. 21 DSGVO)
          </Typography>{" "}
          <Typography component="p">
            WENN DIE DATENVERARBEITUNG AUF GRUNDLAGE VON ART. 6 ABS. 1 LIT. E
            ODER F DSGVO ERFOLGT, HABEN SIE JEDERZEIT DAS RECHT, AUS GRÜNDEN, DIE
            SICH AUS IHRER BESONDEREN SITUATION ERGEBEN, GEGEN DIE VERARBEITUNG
            IHRER PERSONENBEZOGENEN DATEN WIDERSPRUCH EINZULEGEN; DIES GILT
            AUCH FÜR EIN AUF DIESE BESTIMMUNGEN GESTÜTZTES PROFILING. DIE
            JEWEILIGE RECHTSGRUNDLAGE, AUF DER EINE VERARBEITUNG BERUHT,
            ENTNEHMEN SIE DIESER DATENSCHUTZERKLÄRUNG. WENN SIE WIDERSPRUCH
            EINLEGEN, WERDEN WIR IHRE BETROFFENEN PERSONENBEZOGENEN DATEN NICHT
            MEHR VERARBEITEN, ES SEI DENN, WIR KÖNNEN ZWINGENDE SCHUTZWÜRDIGE
            GRÜNDE FÜR DIE VERARBEITUNG NACHWEISEN, DIE IHRE INTERESSEN, RECHTE
            UND FREIHEITEN ÜBERWIEGEN, ODER DIE VERARBEITUNG DIENT DER
            GELTENDMACHUNG, AUSÜBUNG ODER VERTEIDIGUNG VON RECHTSANSPRÜCHEN
            (WIDERSPRUCH NACH ART. 21 ABS. 1 DSGVO).
          </Typography>{" "}
          <Typography component="p">
            WERDEN IHRE PERSONENBEZOGENEN DATEN VERARBEITET, UM DIREKTWERBUNG
            ZU BETREIBEN, SO HABEN SIE DAS RECHT, JEDERZEIT WIDERSPRUCH GEGEN DIE
            VERARBEITUNG SIE BETREFFENDER PERSONENBEZOGENER DATEN ZUM ZWECKE
            DERARTIGER WERBUNG EINZULEGEN; DIES GILT AUCH FÜR DAS PROFILING,
            SOWEIT ES MIT SOLCHER DIREKTWERBUNG IN VERBINDUNG STEHT. WENN SIE
            WIDERSPRECHEN, WERDEN IHRE PERSONENBEZOGENEN DATEN ANSCHLIESSEND
            NICHT MEHR ZUM ZWECKE DER DIREKTWERBUNG VERWENDET (WIDERSPRUCH NACH
            ART. 21 ABS. 2 DSGVO).
          </Typography>
          <Typography component="h3">
            Beschwerderecht bei der zuständigen Aufsichtsbehörde
          </Typography>{" "}
          <Typography component="p">
            Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein
            Beschwerderecht bei einer Aufsichtsbehörde zu, insbesondere in dem
            Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes
            oder des Orts des mutmaßlichen Verstoßes. Das Beschwerderecht
            besteht unbeschadet anderweitiger verwaltungsrechtlicher oder
            gerichtlicher Rechtsbehelfe.
          </Typography>
          <Typography component="p">
            Die für uns zuständige Aufsichtsbehörde ist: Berliner Beauftragte
            für Datenschutz und Informationsfreiheit (BlnBDI), Alt-Moabit 59–61,
            10555 Berlin, Deutschland,{" "}
            <a href="https://www.datenschutz-berlin.de">
              https://www.datenschutz-berlin.de
            </a>
            .
          </Typography>
          <Typography component="h3">Recht auf Datenübertragbarkeit</Typography>{" "}
          <Typography component="p">
            Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung
            oder in Erfüllung eines Vertrags automatisiert verarbeiten, an Sie
            oder an einen Dritten in einem gängigen, maschinenlesbaren Format
            aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten
            an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit
            es technisch machbar ist.
          </Typography>
          <Typography component="h3">
            Auskunft, Berichtigung und Löschung
          </Typography>{" "}
          <Typography component="p">
            Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit
            das Recht auf Auskunft über Ihre gespeicherten personenbezogenen
            Daten, deren Herkunft und Empfänger sowie den Zweck der
            Datenverarbeitung. Sie haben gegebenenfalls auch ein Recht auf
            Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren
            Fragen zum Thema personenbezogene Daten können Sie sich jederzeit an
            uns wenden.
          </Typography>
          <Typography component="h3">
            Recht auf Einschränkung der Verarbeitung
          </Typography>{" "}
          <Typography component="p">
            Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer
            personenbezogenen Daten zu verlangen. Hierzu können Sie sich
            jederzeit an uns wenden. Das Recht auf Einschränkung der
            Verarbeitung besteht in folgenden Fällen:
          </Typography>{" "}
          <ul>
            {" "}
            <li>
              Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten
              personenbezogenen Daten bestreiten, benötigen wir in der Regel
              Zeit, um dies zu überprüfen. Für die Dauer der Prüfung haben Sie
              das Recht, die Einschränkung der Verarbeitung Ihrer
              personenbezogenen Daten zu verlangen.
            </li>{" "}
            <li>
              Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig
              geschah bzw. geschieht, können Sie statt der Löschung die
              Einschränkung der Datenverarbeitung verlangen.
            </li>{" "}
            <li>
              Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie
              sie jedoch zur Ausübung, Verteidigung oder Geltendmachung von
              Rechtsansprüchen benötigen, haben Sie das Recht, statt der Löschung
              die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten
              zu verlangen.
            </li>{" "}
            <li>
              Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt
              haben, muss eine Abwägung zwischen Ihren und unseren Interessen
              vorgenommen werden. Solange noch nicht feststeht, wessen
              Interessen überwiegen, haben Sie das Recht, die Einschränkung der
              Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
            </li>{" "}
          </ul>{" "}
          <Typography component="p">
            Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten
            eingeschränkt haben, dürfen diese Daten – von ihrer Speicherung
            abgesehen – nur mit Ihrer Einwilligung oder zur Geltendmachung,
            Ausübung oder Verteidigung von Rechtsansprüchen oder zum Schutz der
            Rechte einer anderen natürlichen oder juristischen Person oder aus
            Gründen eines wichtigen öffentlichen Interesses der Europäischen
            Union oder eines Mitgliedstaats verarbeitet werden.
          </Typography>
          <Typography component="h3">SSL- bzw. TLS-Verschlüsselung</Typography>{" "}
          <Typography component="p">
            Diese Website nutzt aus Sicherheitsgründen und zum Schutz der
            Übertragung vertraulicher Inhalte, wie zum Beispiel Spenden oder
            Anfragen, die Sie an uns als Websitebetreiber senden, eine SSL-
            bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie
            daran, dass die Adresszeile des Browsers von „http://“ auf
            „https://“ wechselt, und an dem Schloss-Symbol in Ihrer
            Browserzeile.
          </Typography>{" "}
          <Typography component="p">
            Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die
            Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen
            werden.
          </Typography>
          <Typography component="h3">
            Verschlüsselter Zahlungsverkehr auf dieser Website
          </Typography>{" "}
          <Typography component="p">
            Besteht bei einer Spende eine Verpflichtung, uns Ihre
            Zahlungsdaten (z. B. Kontonummer bei Einzugsermächtigung) zu
            übermitteln, werden diese Daten zur
            Zahlungsabwicklung benötigt.
          </Typography>{" "}
          <Typography component="p">
            Der Zahlungsverkehr über die gängigen Zahlungsmittel
            (Visa/MasterCard, Lastschriftverfahren) erfolgt ausschließlich über
            eine verschlüsselte SSL- bzw. TLS-Verbindung. Eine verschlüsselte
            Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von
            „http://“ auf „https://“ wechselt, und an dem Schloss-Symbol in
            Ihrer Browserzeile.
          </Typography>{" "}
          <Typography component="p">
            Bei verschlüsselter Kommunikation mit uns können Ihre
            Zahlungsdaten, die Sie an uns übermitteln, nicht von Dritten
            mitgelesen werden.
          </Typography>
          <Typography component="h2" mb={4} mt={4}>
            4. Datenerfassung auf dieser Website
          </Typography>
          <Typography component="h3">Cookies</Typography>{" "}
          <Typography component="p">
            Unsere Internetseiten verwenden so genannte „Cookies“. Cookies sind
            kleine Datenpakete und richten auf Ihrem Endgerät keinen Schaden
            an. Sie werden entweder vorübergehend für die Dauer einer Sitzung
            (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem
            Endgerät gespeichert. Session-Cookies werden nach Ende Ihres
            Besuchs automatisch gelöscht. Permanente Cookies bleiben auf Ihrem
            Endgerät gespeichert, bis Sie diese selbst löschen oder eine
            automatische Löschung durch Ihren Webbrowser erfolgt.
          </Typography>{" "}
          <Typography component="p">
            Cookies können von uns (First-Party-Cookies) oder von
            Drittunternehmen stammen (sog. Third-Party-Cookies).
            Third-Party-Cookies ermöglichen die Einbindung bestimmter
            Dienstleistungen von Drittunternehmen innerhalb von Webseiten (z. B.
            Cookies zur Abwicklung von Zahlungsdienstleistungen).
          </Typography>{" "}
          <Typography component="p">
            Cookies haben verschiedene Funktionen. Zahlreiche Cookies sind
            technisch notwendig, da bestimmte Websitefunktionen ohne diese nicht
            funktionieren würden (z. B. die Speicherung Ihrer
            Einwilligungsentscheidungen). Andere Cookies können zur Auswertung des
            Nutzerverhaltens oder zu Werbezwecken verwendet werden.
          </Typography>{" "}
          <Typography component="p">
            Cookies, die zur Durchführung des elektronischen
            Kommunikationsvorgangs, zur Bereitstellung bestimmter, von Ihnen
            erwünschter Funktionen (z. B. für Ihre Sprachauswahl) oder zur
            Optimierung der Website (z. B. Cookies zur Messung des
            Webpublikums) erforderlich sind (notwendige Cookies), werden auf
            Grundlage von Art. 6 Abs. 1 lit. f DSGVO gespeichert, sofern keine
            andere Rechtsgrundlage angegeben wird. Der Websitebetreiber hat ein
            berechtigtes Interesse an der Speicherung von notwendigen Cookies
            zur technisch fehlerfreien und optimierten Bereitstellung seiner
            Dienste. Sofern eine Einwilligung zur Speicherung von Cookies und
            vergleichbaren Wiedererkennungstechnologien abgefragt wurde, erfolgt
            die Verarbeitung ausschließlich auf Grundlage dieser Einwilligung
            (Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG); die
            Einwilligung ist jederzeit widerrufbar.
          </Typography>{" "}
          <Typography component="p">
            Sie können Ihren Browser so einstellen, dass Sie über das Setzen von
            Cookies informiert werden und Cookies nur im Einzelfall erlauben, die
            Annahme von Cookies für bestimmte Fälle oder generell ausschließen
            sowie das automatische Löschen der Cookies beim Schließen des
            Browsers aktivieren. Bei der Deaktivierung von Cookies kann die
            Funktionalität dieser Website eingeschränkt sein.
          </Typography>{" "}
          <Typography component="p">
            Welche Cookies und Dienste auf dieser Website eingesetzt werden,
            können Sie dieser Datenschutzerklärung entnehmen.
          </Typography>
          <Typography component="h3">Cookie für die Spracheinstellung</Typography>{" "}
          <Typography component="p">
            Diese Website ist auf Englisch und Deutsch verfügbar. Wenn Sie aktiv
            eine Sprache auswählen – entweder über die Sprachumschaltung im Menü
            oder über den Sprachhinweis am unteren Seitenrand –, speichern wir
            in Ihrem Browser ein First-Party-Cookie mit dem Namen NEXT_LOCALE.
            Es enthält nur die von Ihnen gewählte Sprache („en“ oder „de“), keine
            Kennung, und wird an niemanden weitergegeben. Es dient
            ausschließlich dazu, Ihnen die Website bei späteren Besuchen in der
            gewählten Sprache anzuzeigen, und läuft nach einem Jahr ab. Das
            Cookie wird nur gesetzt, wenn Sie eine Sprache auswählen; der bloße
            Besuch der Website setzt es nicht.
          </Typography>
          <Typography component="p">
            Die Speicherung dieses Cookies ist unbedingt erforderlich, um die
            von Ihnen ausdrücklich gewünschte Funktion bereitzustellen (§ 25 Abs.
            2 Nr. 2 TDDDG); Ihre Einwilligung ist daher nicht erforderlich.
            Rechtsgrundlage der Verarbeitung ist Art. 6 Abs. 1 lit. f DSGVO;
            unser berechtigtes Interesse besteht darin, Ihnen die Website in der
            von Ihnen gewählten Sprache anzuzeigen. Sie können das Cookie jederzeit
            in Ihrem Browser löschen; die Website wird dann in der Sprache der
            Adresse angezeigt, die Sie aufrufen.
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            fontWeight="bold"
            mt={4}
          >
            Server-Logfiles, API-Zugriffsprotokolle und öffentliche
            Traffic-Statistiken
          </Typography>
          <Typography variant="body1" paragraph>
            Wenn Sie diese Website aufrufen oder eine unserer frei verfügbaren
            Klimadaten-APIs abfragen (zum Beispiel{" "}
            <code>/api/temperature-api</code>), erfassen unsere Systeme
            automatisch Informationen, die Ihr Browser oder API-Client mit der
            Anfrage übermittelt. Dazu gehören:
          </Typography>
          <List dense>
            {LOGGED_FIELDS.map((item) => (
              <ListItem key={item} sx={{ py: 0.5 }}>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
          <Typography variant="body1" paragraph sx={{ mt: 2 }}>
            Diese Daten werden nicht mit anderen Datenquellen zusammengeführt
            und nicht dazu verwendet, Nutzerprofile zu erstellen oder Sie über
            mehrere Sitzungen hinweg wiederzuerkennen.
          </Typography>
          <Divider sx={{ my: 3 }} />
          <Box mb={3}>
            <Typography
              variant="h6"
              component="h3"
              gutterBottom
              fontWeight="bold"
            >
              Zwecke
            </Typography>
            <Typography variant="body1" paragraph>
              Wir verarbeiten diese Daten, um (i) diese Website und unsere APIs
              zu betreiben, abzusichern und Fehler zu beheben, (ii) Missbrauch,
              automatisiertes Scraping und Denial-of-Service-Versuche zu
              erkennen und abzuwehren, (iii) die Last unserer kostenlos
              bereitgestellten APIs zu messen und deren Kapazität zu planen und
              (iv) Statistiken über die Nutzung dieser APIs zu veröffentlichen,
              wie unten unter „Öffentliche Traffic-Statistiken“ beschrieben.
            </Typography>
          </Box>
          <Box mb={3}>
            <Typography
              variant="h6"
              component="h3"
              gutterBottom
              fontWeight="bold"
            >
              Rechtsgrundlage
            </Typography>
            <Typography variant="body1" paragraph>
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein
              berechtigtes Interesse an der technisch fehlerfreien
              Bereitstellung, der Sicherheit und der Optimierung dieser Website
              und ihrer APIs. Als Projekt, dessen Zweck die öffentliche
              Rechenschaft in Bezug auf Klimadaten ist, haben wir zudem ein
              berechtigtes Interesse daran, transparent zu dokumentieren, wie
              unsere frei zugänglichen APIs genutzt werden. Diese Erfassung
              umfasst weder die Speicherung von Informationen in Ihrer
              Endeinrichtung noch den Zugriff auf Informationen, die bereits in
              Ihrer Endeinrichtung gespeichert sind; § 25 Abs. 1 TDDDG ist
              daher nicht anwendbar und Ihre Einwilligung ist nicht
              erforderlich. Diese Verarbeitung ist von der einwilligungsbasierten
              Webanalyse in Abschnitt 5 dieser Datenschutzerklärung getrennt. Sie
              können ihr jederzeit nach Art. 21 Abs. 1 DSGVO widersprechen –
              siehe oben „Widerspruchsrecht gegen die Datenerhebung in besonderen
              Fällen“.
            </Typography>
          </Box>
          <Box mb={3}>
            <Typography
              variant="h6"
              component="h3"
              gutterBottom
              fontWeight="bold"
            >
              Datenminimierung
            </Typography>
            <Typography variant="body1" paragraph>
              IP-Adressen werden nicht in lesbarer Form gespeichert. Bevor ein
              Eintrag in unseren Protokollspeicher geschrieben wird, wird die
              IP-Adresse durch einen gesalzenen, nicht umkehrbaren
              kryptografischen Hashwert (HMAC-SHA256, gekürzt) ersetzt, sodass
              ein gespeicherter Eintrag nicht mehr auf eine bestimmte Adresse
              zurückgeführt werden kann. Genaue Standortdaten erfassen wir
              bewusst nicht: Unser Hosting-Anbieter stellt zwar auch Stadtname,
              Breiten- und Längengrad, Postleitzahl und Zeitzone bereit, wir
              erfassen jedoch keine dieser Angaben. Erfasst wird nur das Land,
              aus dem die Anfrage stammt (ein zweistelliger Code, z. B. „DE“),
              und nur bei Anfragen an unsere öffentlichen
              Klimadaten-API-Endpunkte.
            </Typography>
          </Box>
          <Box mb={3}>
            <Typography
              variant="h6"
              component="h3"
              gutterBottom
              fontWeight="bold"
            >
              Speicherdauer
            </Typography>
            <Typography variant="body1" paragraph>
              Protokolleinträge werden 7 Tage nach ihrer Erfassung automatisch
              gelöscht, in jedem Fall aber, sobald unser Protokollspeicher eine
              konfigurierte Höchstzahl an Einträgen überschreitet – je nachdem,
              was zuerst eintritt. Beim derzeitigen Datenaufkommen wird die
              Höchstzahl an Einträgen oft vor Ablauf von 7 Tagen erreicht,
              sodass der tatsächliche Speicherzeitraum kürzer sein kann. Die
              Löschung ist endgültig; Einträge werden nicht anderweitig
              archiviert.
            </Typography>
            <Typography variant="body1" paragraph>
              Einmal täglich erstellen wir aus diesen Einträgen eine
              aggregierte Zusammenfassung des Vortags: die Zahl der Anfragen,
              die Zahl der verschiedenen Besucher als einzelne Zahl, die Zahl
              der Fehler, das Datenvolumen und die fünf am häufigsten
              angefragten Pfade. Ergänzt wird die Gesamtzahl der Anfragen dieses
              Tages, wie sie unser Hosting-Anbieter in aggregierter Form meldet.
              Diese Tageszusammenfassungen enthalten keine IP-Adressen (weder
              lesbar noch pseudonymisiert), keine User-Agents, keine
              Referrer-URLs und keine sonstigen Angaben zu einzelnen Besuchern
              und lassen keine Rückschlüsse auf einzelne Personen zu. Sie werden
              bis zu 400 Tage gespeichert, um zu zeigen, wie sich die Nutzung
              unserer APIs im Zeitverlauf entwickelt.
            </Typography>
          </Box>
          <Box mb={3}>
            <Typography
              variant="h6"
              component="h3"
              gutterBottom
              fontWeight="bold"
            >
              Empfänger
            </Typography>
            <Typography variant="body1" paragraph>
              An dieser Verarbeitung sind in unserem Auftrag folgende
              Auftragsverarbeiter beteiligt:
            </Typography>

            <Stack spacing={2} ml={2}>
              <Box>
                <Typography variant="body1" fontWeight="medium">
                  Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Bereitstellung der Website und Übermittlung der
                  Protokolleinträge an unseren Protokollspeicher (siehe
                  „Externes Hosting“ in Abschnitt 2). Vercel Inc. ist nach dem
                  EU-US Data Privacy Framework (DPF) zertifiziert; die
                  Übermittlung von Daten in die USA stützt sich auf diese
                  Zertifizierung. Weitere Informationen:{" "}
                  <Link
                    href="https://www.dataprivacyframework.gov/list"
                    target="_blank"
                    rel="noopener"
                  >
                    https://www.dataprivacyframework.gov/list
                  </Link>
                </Typography>
              </Box>

              <Box>
                <Typography variant="body1" fontWeight="medium">
                  Upstash, Inc., Delaware, USA
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Betrieb der Datenbank mit Standort Frankfurt am Main,
                  Deutschland (AWS-Region eu-central-1), in der die Protokolleinträge gespeichert werden. Upstash
                  stützt sich auf das EU-US Data Privacy Framework und
                  hilfsweise auf die Standardvertragsklauseln der Europäischen
                  Kommission. Weitere Informationen:{" "}
                  <Link
                    href="https://upstash.com/trust/dpa.pdf"
                    target="_blank"
                    rel="noopener"
                  >
                    https://upstash.com/trust/dpa.pdf
                  </Link>
                </Typography>
              </Box>
            </Stack>

            <Typography variant="body1" paragraph sx={{ mt: 2 }}>
              Mit jedem dieser Anbieter haben wir einen Vertrag über
              Auftragsverarbeitung (AVV) nach Art. 28 DSGVO geschlossen.
            </Typography>
          </Box>
          <Box mb={3}>
            <Typography
              variant="h6"
              component="h3"
              gutterBottom
              fontWeight="bold"
            >
              Öffentliche Traffic-Statistiken
            </Typography>
            <Typography variant="body1" paragraph>
              Aggregierte Statistiken zur Nutzung unserer APIs veröffentlichen
              wir unter{" "}
              <Link
                href="https://global-warming.org/de/traffic"
                target="_blank"
                rel="noopener"
              >
                https://global-warming.org/de/traffic
              </Link>{" "}
              (auch auf Englisch verfügbar) und unter{" "}
              <Link
                href="https://global-warming.org/logs"
                target="_blank"
                rel="noopener"
              >
                https://global-warming.org/logs
              </Link>
              . Diese Seiten sind ohne Anmeldung zugänglich und zeigen auch die
              oben unter „Speicherdauer“ beschriebenen Tageszusammenfassungen.
              Die veröffentlichte Ansicht wird auf unseren Servern erzeugt und
              enthält bewusst keine IP-Adressen – weder in lesbarer noch in
              pseudonymisierter Form –, keine User-Agents, keine Referrer-URLs,
              keine Anfrage-Kennungen und keine Liste einzelner Adressen pro
              Land. Veröffentlicht werden: die Zahl der Anfragen im
              Zeitverlauf, die angefragten Pfade, Statuscodes, Browser- und
              Betriebssystemfamilien, das Land, aus dem eine Anfrage stammt, und
              die Zahl der verschiedenen Besucher pro Land als Zahl.
              Städtenamen, Koordinaten oder Kennungen von Vercel-Edge-Regionen
              bzw. -Rechenzentren werden weder erfasst noch veröffentlicht –
              Standortdaten sind in diesem gesamten System auf die Länderebene
              beschränkt.
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="h6"
              component="h3"
              gutterBottom
              fontWeight="bold"
            >
              Öffentlicher Quellcode
            </Typography>
            <Typography variant="body1" paragraph>
              Der Quellcode dieser Website, einschließlich der oben
              beschriebenen Protokollierungsfunktion, ist in einem öffentlichen
              Repository unter{" "}
              <Link
                href="https://github.com/rene-mdd/global-warming"
                target="_blank"
                rel="noopener"
              >
                https://github.com/rene-mdd/global-warming
              </Link>{" "}
              veröffentlicht. Dieses Repository enthält ausschließlich
              Programmcode und Konfiguration. Es enthält keine
              Protokolleinträge, keine Zugriffsdaten und keine
              personenbezogenen Daten unserer Besucher.
            </Typography>
          </Box>
          <Typography component="h3">Kontaktformular</Typography>{" "}
          <Typography component="p">
            Wenn Sie uns über unser Kontaktformular eine Nachricht senden,
            werden Ihre Angaben (Name, E-Mail-Adresse und Nachricht) zusammen
            mit dem Ergebnis der unten beschriebenen reCAPTCHA-Prüfung (sofern
            Sie darin eingewilligt haben) an uns
            übermittelt, damit wir Ihre Anfrage bearbeiten und Anschlussfragen
            beantworten können. Diese Daten geben wir nicht ohne Ihre
            Einwilligung weiter.
          </Typography>{" "}
          <Typography component="p">
            Das Formular wird über den Dienst Static Forms verarbeitet, der von
            Qualascend betrieben wird (
            <Link
              href="https://www.staticforms.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.staticforms.dev
            </Link>
            ). Static Forms nimmt Ihre Nachricht entgegen, prüft sie auf Spam
            und leitet sie per E-Mail an uns weiter. Static Forms speichert
            Formulardaten auf Servern von Amazon Web Services in Frankfurt am
            Main, Deutschland, und löscht gespeicherte Einsendungen nach 30 Tagen. Static
            Forms setzt weitere Unterauftragsverarbeiter ein, die in seinem
            Vertrag zur Auftragsverarbeitung aufgeführt sind; einige davon
            haben ihren Sitz außerhalb der Europäischen Union.
          </Typography>{" "}
          <Typography component="p">
            Static Forms verarbeitet Ihre Daten in unserem Auftrag auf
            Grundlage seines Vertrags zur Auftragsverarbeitung. Eine
            Übermittlung in Länder außerhalb der Europäischen Union wird auf
            die Standardvertragsklauseln der EU-Kommission gestützt, die
            Bestandteil dieses Vertrags sind:{" "}
            <Link
              href="https://www.staticforms.dev/dpa"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.staticforms.dev/dpa
            </Link>
            . Weitere Informationen finden Sie in der Datenschutzerklärung von
            Static Forms:{" "}
            <Link
              href="https://www.staticforms.dev/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.staticforms.dev/privacy-policy
            </Link>
            .
          </Typography>{" "}
          <Typography component="p">
            Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b
            DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags
            zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen
            erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung
            auf unserem berechtigten Interesse an der effektiven Bearbeitung
            der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO).
          </Typography>{" "}
          <Typography component="p">
            Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei
            uns, bis Sie uns zur Löschung auffordern oder der Zweck für die
            Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung
            Ihrer Anfrage). Zwingende gesetzliche Bestimmungen, insbesondere
            Aufbewahrungsfristen, bleiben unberührt. Sie können uns auch ohne
            das Formular direkt unter help@global-warming.org schreiben.
          </Typography>
          <Typography component="h3">Einwilligung mit ConsentManager</Typography>{" "}
          <Typography component="p">
            Unsere Website nutzt die Consent-Technologie von ConsentManager, um
            Ihre Einwilligung zur Speicherung bestimmter Cookies auf Ihrem
            Endgerät oder zum Einsatz bestimmter Technologien einzuholen und
            diese datenschutzkonform zu dokumentieren. Anbieter dieser
            Technologie ist die consentmanager AB, Torsgatan 26, 113 21
            Stockholm, Schweden, Website:{" "}
            <Link
              href="https://www.consentmanager.de"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.consentmanager.de
            </Link>{" "}
            (im Folgenden „ConsentManager“).
          </Typography>{" "}
          <Typography component="p">
            Wenn Sie unsere Website aufrufen, wird eine Verbindung zu den Servern
            von ConsentManager hergestellt, um Ihre Einwilligungen und
            sonstigen Erklärungen zur Cookie-Nutzung einzuholen.
          </Typography>{" "}
          <Typography component="p">
            Zudem speichert ConsentManager ein Cookie in Ihrem Browser, um Ihnen
            die erteilten Einwilligungen bzw. deren Widerruf zuordnen zu können.
            Die so erfassten Daten werden gespeichert, bis Sie uns zur Löschung
            auffordern, das ConsentManager-Cookie selbst löschen oder der Zweck
            für die Datenspeicherung entfällt. Zwingende gesetzliche
            Aufbewahrungsfristen bleiben unberührt.
          </Typography>{" "}
          <Typography component="p">
            ConsentManager setzt Cookies ein, um die gesetzlich
            vorgeschriebenen Einwilligungserklärungen einzuholen.
            Rechtsgrundlage für den Einsatz dieser Cookies ist Art. 6 Abs. 1
            lit. c DSGVO.
          </Typography>
          <Typography component="h4">Google reCAPTCHA</Typography>
          <Typography component="p">
            Zum Schutz unserer Website vor Spam und Missbrauch nutzen wir Google
            reCAPTCHA, einen Dienst der Google Ireland Limited (Gordon House,
            Barrow Street, Dublin 4, Irland). reCAPTCHA hilft uns festzustellen,
            ob Daten, die auf unserer Website eingegeben werden (z. B. in einem
            Kontaktformular), von einem Menschen oder von einem automatisierten
            Programm übermittelt werden.
          </Typography>{" "}
          <Typography component="h4">Datenerhebung und -verarbeitung</Typography>
          <Typography mb={2} component="p">
            reCAPTCHA analysiert Websitebesucher anhand verschiedener Merkmale,
            zum Beispiel:
          </Typography>{" "}
          <Typography component="ul">
            {" "}
            <Typography component="li">IP-Adresse</Typography>{" "}
            <Typography component="li">
              Mausbewegungen und Interaktionen
            </Typography>
            <Typography component="li">Verweildauer auf der Seite</Typography>
            <Typography component="li">
              Browser- und Geräteinformationen
            </Typography>
            <Typography component="li">von Google gesetzte Cookies</Typography>
            <Typography component="li">
              frühere Interaktionen mit Google-Diensten
            </Typography>{" "}
          </Typography>{" "}
          <Typography component="p">
            Diese Daten werden an Server von Google übermittelt und können in
            den USA gespeichert werden.
          </Typography>{" "}
          <Typography component="p">
            Weitere Informationen dazu, wie Google personenbezogene Daten
            verarbeitet, finden Sie in der Datenschutzerklärung von Google:{" "}
            <a href="https://policies.google.com/privacy">
              https://policies.google.com/privacy
            </a>
          </Typography>{" "}
          <Typography component="h4">Rechtsgrundlage</Typography>{" "}
          <Typography component="p">
            reCAPTCHA wird nur auf der Seite mit unserem Kontaktformular und
            erst nach Ihrer Einwilligung geladen, entweder über das
            ConsentManager-Banner oder über die Schaltfläche „Google reCAPTCHA
            erlauben“ oberhalb des Formulars. Die Verarbeitung erfolgt auf
            Grundlage Ihrer Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO und
            § 25 Abs. 1 TDDDG. Sie können Ihre Einwilligung jederzeit mit
            Wirkung für die Zukunft in den Einstellungen von ConsentManager
            widerrufen. Ohne Einwilligung erreichen Sie uns weiterhin per
            E-Mail unter help@global-warming.org.
          </Typography>
          <Typography component="p">
            Google ist nach dem „EU-US Data Privacy Framework“ (DPF)
            zertifiziert. Weitere Informationen hierzu erhalten Sie vom Anbieter
            unter folgendem Link:{" "}
            <Link
              href="https://www.dataprivacyframework.gov/participant/5780"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.dataprivacyframework.gov/participant/5780
            </Link>
            .
          </Typography>
          <Typography component="h2" mb={4} mt={4}>
            5. Analyse-Tools und Werbung
          </Typography>
          <Typography component="h3">Google Analytics</Typography>{" "}
          <Typography component="p">
            Diese Website nutzt Funktionen des Webanalysedienstes Google
            Analytics. Anbieter ist die Google Ireland Limited („Google“),
            Gordon House, Barrow Street, Dublin 4, Irland.
          </Typography>{" "}
          <Typography component="p">
            Google Analytics ermöglicht es dem Websitebetreiber, das Verhalten
            der Websitebesucher zu analysieren. Hierbei erhält der
            Websitebetreiber verschiedene Nutzungsdaten, wie z. B.
            Seitenaufrufe, Verweildauer, verwendete Betriebssysteme und Herkunft
            des Nutzers. Diese Daten werden dem jeweiligen Endgerät des Nutzers
            zugeordnet. Eine Zuordnung zu einer User-ID erfolgt nicht.
          </Typography>{" "}
          <Typography component="p">
            Des Weiteren erfasst Google Analytics bestimmte Interaktionen, etwa
            das Scrollen und Klicks auf Links, die zu anderen Websites führen.
            Google Analytics verwendet
            verschiedene Modellierungsansätze, um die erfassten Datensätze zu
            ergänzen, und setzt Machine-Learning-Technologien bei der
            Datenanalyse ein.
          </Typography>
          <Typography component="p">
            Google Analytics verwendet Technologien, die die Wiedererkennung des
            Nutzers zum Zwecke der Analyse des Nutzerverhaltens ermöglichen (z.
            B. Cookies oder Device-Fingerprinting). Die von Google erfassten
            Informationen über die Benutzung dieser Website werden in der Regel
            an einen Server von Google in den USA übertragen und dort
            gespeichert.
          </Typography>{" "}
          <Typography component="p">
            Die Nutzung dieser Dienste erfolgt auf Grundlage Ihrer Einwilligung
            nach Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG. Die
            Einwilligung ist jederzeit widerrufbar.
          </Typography>{" "}
          <Typography component="p">
            Google Analytics wird erst geladen, nachdem Sie über ConsentManager
            eingewilligt haben. Das Google-Analytics-Skript (gtag.js) wird von
            www.googletagmanager.com geladen; einen Google-Tag-Manager-Container
            setzen wir nicht ein.
          </Typography>{" "}
          <Typography component="p">
            Die Datenübertragung in die USA wird auf die
            Standardvertragsklauseln (SCC) der EU-Kommission gestützt. Details
            finden Sie hier:{" "}
            <Link
              href="https://privacy.google.com/businesses/controllerterms/mccs/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://privacy.google.com/businesses/controllerterms/mccs/
            </Link>
            .
          </Typography>{" "}
          <Typography component="p">
            Das Unternehmen ist nach dem „EU-US Data Privacy Framework“ (DPF)
            zertifiziert. Das DPF ist ein Übereinkommen zwischen der
            Europäischen Union und den USA, das die Einhaltung europäischer
            Datenschutzstandards bei Datenverarbeitungen in den USA
            gewährleisten soll. Jedes nach dem DPF zertifizierte Unternehmen
            verpflichtet sich, diese Datenschutzstandards einzuhalten. Weitere
            Informationen hierzu erhalten Sie vom Anbieter unter folgendem Link:{" "}
            <Link
              href="https://www.dataprivacyframework.gov/participant/5780"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.dataprivacyframework.gov/participant/5780
            </Link>
            .
          </Typography>
          <Typography component="h4">IP-Adressen</Typography>{" "}
          <Typography component="p">
            Wir nutzen Google Analytics 4. Google Analytics 4 protokolliert und
            speichert keine IP-Adressen. Bei Daten von Nutzern in der
            Europäischen Union verwendet Google die IP-Adresse nur, um einen
            ungefähren Standort zu ermitteln, und verwirft sie, bevor die Daten
            protokolliert werden.
          </Typography>
          <Typography component="h4">Browser-Plugin</Typography>{" "}
          <Typography component="p">
            Sie können die Erfassung und Verarbeitung Ihrer Daten durch Google
            verhindern, indem Sie das unter dem folgenden Link verfügbare
            Browser-Plugin herunterladen und installieren:{" "}
            <Link
              href="https://tools.google.com/dlpage/gaoptout?hl=de"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://tools.google.com/dlpage/gaoptout?hl=de
            </Link>
            .
          </Typography>{" "}
          <Typography component="p">
            Mehr Informationen zum Umgang mit Nutzerdaten bei Google Analytics
            finden Sie in der Datenschutzerklärung von Google:{" "}
            <Link
              href="https://support.google.com/analytics/answer/6004245?hl=de"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://support.google.com/analytics/answer/6004245?hl=de
            </Link>
            .
          </Typography>
          <Typography component="h4">Auftragsverarbeitung</Typography>{" "}
          <Typography component="p">
            Wir haben mit Google einen Vertrag zur Auftragsverarbeitung
            abgeschlossen und setzen die strengen Vorgaben der deutschen
            Datenschutzbehörden bei der Nutzung von Google Analytics vollständig
            um.
          </Typography>
          <Typography component="h2" mb={4} mt={4}>
            6. Plugins und Tools
          </Typography>
          <Typography component="h3">Google Fonts (lokales Hosting)</Typography>{" "}
          <Typography component="p">
            Diese Website nutzt zur einheitlichen Darstellung von Schriftarten
            die Schriftart „Play“ aus den Google Fonts, die von Google
            bereitgestellt werden. Die Schriftart ist lokal installiert, sodass dabei keine Verbindung
            zu Servern von Google hergestellt wird.
          </Typography>{" "}
          <Typography component="p">
            Weitere Informationen zu Google Fonts finden Sie unter{" "}
            <Link
              href="https://developers.google.com/fonts/faq"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://developers.google.com/fonts/faq
            </Link>{" "}
            und in der Datenschutzerklärung von Google:{" "}
            <Link
              href="https://policies.google.com/privacy?hl=de"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://policies.google.com/privacy?hl=de
            </Link>
            .
          </Typography>
          <Typography component="h2" mb={4} mt={4}>
            7. Spenden und Zahlungsanbieter
          </Typography>
          <Typography component="h3">Spendenformular (twingle)</Typography>{" "}
          <Typography component="p">
            Auf unserer Spendenseite ist das Spendenformular der twingle GmbH,
            Berlin, Deutschland, eingebunden (
            <Link
              href="https://www.twingle.de"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.twingle.de
            </Link>
            ). Beim Laden der Seite verbindet sich Ihr Browser mit den Servern
            von twingle, die dabei Ihre IP-Adresse erhalten. Wenn Sie spenden,
            werden die Angaben, die Sie in das Formular eingeben (z. B. Name,
            Anschrift, E-Mail-Adresse, Betrag und die für die gewählte
            Zahlungsart erforderlichen Zahlungsdaten), von twingle zur
            Abwicklung Ihrer Spende verarbeitet und an uns weitergegeben, damit
            wir Ihre Spende verwalten und eine Zuwendungsbestätigung ausstellen
            können.
          </Typography>{" "}
          <Typography component="p">
            Die beim Laden der Spendenseite hergestellte Verbindung beruht auf
            unserem berechtigten Interesse, eine einfache Möglichkeit zum
            Online-Spenden anzubieten (Art. 6 Abs. 1 lit. f DSGVO). Die
            Abwicklung Ihrer Spende erfolgt auf Grundlage von Art. 6 Abs. 1
            lit. b DSGVO (Abwicklung Ihrer Spende) und, soweit wir gesetzlich zur
            Aufbewahrung verpflichtet sind, etwa aus steuerlichen Gründen, auf
            Grundlage von Art. 6 Abs. 1 lit. c DSGVO. Weitere Informationen
            finden Sie in der Datenschutzerklärung von twingle:{" "}
            <Link
              href="https://www.twingle.de/datenschutz/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.twingle.de/datenschutz/
            </Link>
            .
          </Typography>
          <Typography component="h3">Zahlungsdienste</Typography>{" "}
          <Typography component="p">
            Das Spendenformular bietet SEPA-Lastschrift, Kreditkarte, Google
            Pay, PayPal und Überweisung an. Wenn Sie spenden, werden Ihre
            Zahlungsdaten (z. B. Name, Zahlungssumme, Kontoverbindung,
            Kreditkartennummer) vom Zahlungsdienstleister der gewählten
            Zahlungsart zum Zwecke der Zahlungsabwicklung verarbeitet. Für diese
            Transaktionen gelten die jeweiligen Vertrags- und
            Datenschutzbestimmungen der jeweiligen Anbieter. Der Einsatz der
            Zahlungsdienstleister erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b
            DSGVO (Abwicklung Ihrer Spende) sowie im Interesse eines möglichst
            reibungslosen, komfortablen und sicheren Zahlungsvorgangs (Art. 6
            Abs. 1 lit. f DSGVO). Soweit für bestimmte Handlungen Ihre
            Einwilligung abgefragt wird, ist Art. 6 Abs. 1 lit. a DSGVO
            Rechtsgrundlage der Datenverarbeitung; Einwilligungen sind jederzeit
            für die Zukunft widerrufbar.
          </Typography>
          <Typography component="p">
            Je nach gewählter Zahlungsart sind folgende Anbieter beteiligt:
          </Typography>
          <Typography component="h4">
            Stripe (Kreditkarte und Google Pay)
          </Typography>{" "}
          <Typography component="p">
            Zahlungen per Kreditkarte und Google Pay werden von der Stripe
            Payments Europe, Limited, 1 Grand Canal Street Lower, Grand Canal
            Dock, Dublin, D02 H210, Irland (im Folgenden „Stripe“) abgewickelt.
            Stripe kann Daten an seine Muttergesellschaft in den USA
            übermitteln. Details finden Sie in der Datenschutzerklärung von
            Stripe:{" "}
            <Link
              href="https://stripe.com/de/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://stripe.com/de/privacy
            </Link>
            .
          </Typography>
          <Typography component="h4">Google Pay</Typography>{" "}
          <Typography component="p">
            Wenn Sie mit Google Pay bezahlen, verarbeitet zusätzlich die Google
            Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland,
            Ihre Zahlungsdaten nach ihrer eigenen Datenschutzerklärung:{" "}
            <Link
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://policies.google.com/privacy
            </Link>
            .
          </Typography>
          <Typography component="h4">PayPal</Typography>{" "}
          <Typography component="p">
            Anbieter dieses Zahlungsdienstes ist die PayPal (Europe) S.à.r.l. et
            Cie, S.C.A., 22-24 Boulevard Royal, L-2449 Luxemburg (im Folgenden
            „PayPal“).
          </Typography>{" "}
          <Typography component="p">
            Die Datenübertragung in die USA wird auf die
            Standardvertragsklauseln (SCC) der EU-Kommission gestützt. Details
            finden Sie hier:{" "}
            <Link
              href="https://www.paypal.com/de/webapps/mpp/ua/pocpsa-full"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.paypal.com/de/webapps/mpp/ua/pocpsa-full
            </Link>
            .
          </Typography>{" "}
          <Typography component="p">
            Details entnehmen Sie der Datenschutzerklärung von PayPal:{" "}
            <Link
              href="https://www.paypal.com/de/webapps/mpp/ua/privacy-full"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.paypal.com/de/webapps/mpp/ua/privacy-full
            </Link>
            .
          </Typography>
          <Typography component="h4">
            SEPA-Lastschrift und Überweisung
          </Typography>{" "}
          <Typography component="p">
            Bei SEPA-Lastschrift und Überweisung werden Ihr Name, Ihre
            Bankverbindung (IBAN) und der Spendenbetrag von twingle und von
            unserer Bank verarbeitet, um die Zahlung einzuziehen bzw. zu
            empfangen.
          </Typography>
        </Container>
      </Grid>
      <Footer classNameProp="footer" />
    </>
  );
}

PrivacyPolicyDe.propTypes = {
  websiteUrl: PropTypes.string.isRequired,
};
