import { useState } from "react";
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
import StickyMenu from "../../components/semantic/menu";
import SiteHeader from "../../components/siteHeader";
import Footer from "../../components/semantic/footer";
import PrivacyPolicyDe from "../../components/semantic/privacyPolicyDe";
import { useLocale, useT } from "../../lib/i18n";

function PrivacyPolicy() {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  const t = useT().privacy;
  const locale = useLocale();
  const websiteUrl = "https://www.global-warming.org/privacy-policy";

  // German version: a statement-for-statement translation of this page.
  if (locale === "de") return <PrivacyPolicyDe websiteUrl={websiteUrl} />;

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
            Privacy Policy
          </Typography>
          <Typography component="h2" mb={4} mt={4}>
            1. An overview of data protection
          </Typography>
          <Typography component="h3">General information</Typography>{" "}
          <Typography component="p">
            The following information will provide you with an easy to navigate
            overview of what will happen with your personal data when you visit
            this website. The term &ldquo;personal data&rdquo; comprises all
            data that can be used to personally identify you. For detailed
            information about the subject matter of data protection, please
            consult our Data Protection Declaration, which we have included
            beneath this copy.
          </Typography>
          <Typography component="h3">Data recording on this website</Typography>{" "}
          <Typography component="h4">
            Who is the responsible party for the recording of data on this
            website (i.e., the &ldquo;controller&rdquo;)?
          </Typography>{" "}
          <Typography component="p">
            The data on this website is processed by the operator of the
            website, whose contact information is available under section
            &ldquo;Information about the responsible party (referred to as the
            &ldquo;controller&rdquo; in the GDPR)&rdquo; in this Privacy Policy.
          </Typography>{" "}
          <Typography component="h4">How do we record your data?</Typography>{" "}
          <Typography component="p">
            We collect your data as a result of your sharing of your data with
            us. This may, for instance be information you enter into our contact
            form.
          </Typography>{" "}
          <Typography component="p">
            Other data shall be recorded by our IT systems automatically or
            after you consent to its recording during your website visit. This
            data comprises primarily technical information (e.g., web browser,
            operating system, or time the site was accessed). This information
            is recorded automatically when you access this website.
          </Typography>{" "}
          <Typography component="h4">
            What are the purposes we use your data for?
          </Typography>{" "}
          <Typography component="p">
            A portion of the information is generated to guarantee the error
            free provision of the website. Other data may be used to analyze
            your user patterns.
          </Typography>{" "}
          <Typography component="h4">
            What rights do you have as far as your information is concerned?
          </Typography>{" "}
          <Typography component="p">
            You have the right to receive information about the source,
            recipients, and purposes of your archived personal data at any time
            without having to pay a fee for such disclosures. You also have the
            right to demand that your data are rectified or eradicated. If you
            have consented to data processing, you have the option to revoke
            this consent at any time, which shall affect all future data
            processing. Moreover, you have the right to demand that the
            processing of your data be restricted under certain circumstances.
            Furthermore, you have the right to log a complaint with the
            competent supervising agency.
          </Typography>{" "}
          <Typography component="p">
            Please do not hesitate to contact us at any time if you have
            questions about this or any other data protection related issues.
          </Typography>
          <Typography component="h3">
            Analysis tools and tools provided by third parties
          </Typography>{" "}
          <Typography component="p">
            There is a possibility that your browsing patterns will be
            statistically analyzed when your visit this website. Such analyses
            are performed primarily with what we refer to as analysis programs.
          </Typography>{" "}
          <Typography component="p">
            For detailed information about these analysis programs please
            consult our Data Protection Declaration below.
          </Typography>
          <Typography component="h2" mb={4} mt={4}>
            2. Hosting and Content Delivery Networks (CDN)
          </Typography>
          <Typography component="p">
            We are hosting the content of our website at the following provider:
          </Typography>
          <Typography component="h3">External Hosting</Typography>{" "}
          <Typography component="p">
            This website is hosted externally. Personal data collected on this
            website are stored on the servers of the host. These may include,
            but are not limited to, IP addresses, contact requests, metadata and
            communications, contract information, contact information, names,
            web page access, and other data generated through a web site.
          </Typography>{" "}
          <Typography component="p">
            The external hosting serves the interest of secure, fast, and
            efficient provision of our online services by a professional
            provider (Art. 6(1)(f) GDPR). If
            appropriate consent has been obtained, the processing is carried out
            exclusively on the basis of Art. 6 (1)(a) GDPR and &sect; 25 (1)
            TDDDG, insofar the consent includes the storage of cookies or the
            access to information in the user's end device (e.g., device
            fingerprinting) within the meaning of the TDDDG. This consent can be
            revoked at any time.
          </Typography>{" "}
          <Typography component="p">
            Our host(s) will only process your data to the extent necessary to
            fulfil its performance obligations and to follow our instructions
            with respect to such data.
          </Typography>{" "}
          <Typography component="p">
            We are using the following host(s):
          </Typography>
          <Typography component="p" mt={2}>
            Vercel Inc.
            <br /> 440 N Barranca Ave #4133
            <br /> Covina, CA 91723
          </Typography>
          <Typography component="p" mt={2} mb={2}>
            {" "}
            You can review Vercel’s privacy policy{" "}
            <Link href="https://vercel.com/legal/privacy-policy">here</Link> for
            more information about how they handle your data.
          </Typography>
          <Typography component="h4">Data processing</Typography>{" "}
          <Typography component="p">
            We have concluded a data processing agreement (DPA) for the use of
            the above-mentioned service. This is a contract mandated by data
            privacy laws that guarantees that they process personal data of our
            website visitors only based on our instructions and in compliance
            with the GDPR.
          </Typography>
          <Typography component="h2" mb={4} mt={4}>
            3. General information and mandatory information
          </Typography>
          <Typography component="h3">Data protection</Typography>{" "}
          <Typography component="p">
            The operators of this website and its pages take the protection of
            your personal data very seriously. Hence, we handle your personal
            data as confidential information and in compliance with the
            statutory data protection regulations and this Data Protection
            Declaration.
          </Typography>{" "}
          <Typography component="p">
            Whenever you use this website, a variety of personal information
            will be collected. Personal data comprises data that can be used to
            personally identify you. This Data Protection Declaration explains
            which data we collect as well as the purposes we use this data for.
            It also explains how, and for which purpose the information is
            collected.
          </Typography>{" "}
          <Typography component="p">
            We herewith advise you that the transmission of data via the
            Internet (i.e., through e-mail communications) may be prone to
            security gaps. It is not possible to completely protect data against
            third-party access.
          </Typography>
          <Typography component="h3">
            Information about the responsible party (referred to as the
            &ldquo;controller&rdquo; in the GDPR)
          </Typography>{" "}
          <Typography component="p">
            The data processing controller on this website is:
          </Typography>{" "}
          <Typography component="p">
            Climate Accountability API gUG (haftungsbeschr&auml;nkt)
            <br /> Seestra&szlig;e 107, 13353 Berlin, Germany
          </Typography>
          <Typography component="div">
            Phone:{" "}
            <button aria-describedby={id} type="button" onClick={handleClick}>
              Show number
            </button>
            <Popper id={id} open={open} anchorEl={anchorEl}>
              <Box sx={{ border: 1, p: 1, bgcolor: "white" }}>
                0 &#49;&#53;&#50;&#48; &#50;&#52;&#49;&#56;&#51;&#48;&#49;
              </Box>
            </Popper>
          </Typography>
          <br /> E-mail: help@global-warming.org
          <Typography component="p">
            The controller is the natural person or legal entity that
            single-handedly or jointly with others makes decisions as to the
            purposes of and resources for the processing of personal data (e.g.,
            names, e-mail addresses, etc.).
          </Typography>
          <Typography component="h3">Storage duration</Typography>{" "}
          <Typography component="p">
            Unless a more specific storage period has been specified in this
            privacy policy, your personal data will remain with us until the
            purpose for which it was collected no longer applies. If you assert
            a justified request for deletion or revoke your consent to data
            processing, your data will be deleted, unless we have other legally
            permissible reasons for storing your personal data (e.g., tax or
            commercial law retention periods); in the latter case, the deletion
            will take place after these reasons cease to apply.
          </Typography>
          <Typography component="h3">
            General information on the legal basis for the data processing on
            this website
          </Typography>{" "}
          <Typography component="p">
            If you have consented to data processing, we process your personal
            data on the basis of Art. 6(1)(a) GDPR or Art. 9 (2)(a) GDPR, if
            special categories of data are processed according to Art. 9 (1)
            DSGVO. In the case of explicit consent to the transfer of personal
            data to third countries, the data processing is also based on Art.
            49 (1)(a) GDPR. If you have consented to the storage of cookies or
            to the access to information in your end device (e.g., via device
            fingerprinting), the data processing is additionally based on &sect;
            25 (1) TDDDG. The consent can be revoked at any time. If your data
            is required for the fulfillment of a contract or for the
            implementation of pre-contractual measures, we process your data on
            the basis of Art. 6(1)(b) GDPR. Furthermore, if your data is
            required for the fulfillment of a legal obligation, we process it on
            the basis of Art. 6(1)(c) GDPR. Furthermore, the data processing may
            be carried out on the basis of our legitimate interest according to
            Art. 6(1)(f) GDPR. Information on the relevant legal basis in each
            individual case is provided in the following paragraphs of this
            privacy policy.
          </Typography>
          <Typography component="h3">Recipients of personal data</Typography>{" "}
          <Typography component="p">
            In the scope of our business activities, we cooperate with various
            external parties. In some cases, this also requires the transfer of
            personal data to these external parties. We only disclose personal
            data to external parties if this is required as part of the
            fulfillment of a contract, if we are legally obligated to do so
            (e.g., disclosure of data to tax authorities), if we have a
            legitimate interest in the disclosure pursuant to Art. 6 (1)(f)
            GDPR, or if another legal basis permits the disclosure of this data.
            When using processors, we only disclose personal data on the basis
            of a valid contract on data processing. In
            the case of joint processing, a joint processing agreement is
            concluded.
          </Typography>
          <Typography component="h3">
            Revocation of your consent to the processing of data
          </Typography>{" "}
          <Typography component="p">
            A wide range of data processing transactions are possible only
            subject to your express consent. You can also revoke at any time any
            consent you have already given us. This shall be without prejudice
            to the lawfulness of any data collection that occurred prior to your
            revocation.
          </Typography>
          <Typography component="h3">
            Right to object to the collection of data in special cases; right to
            object to direct advertising (Art. 21 GDPR)
          </Typography>{" "}
          <Typography component="p">
            IN THE EVENT THAT DATA ARE PROCESSED ON THE BASIS OF ART. 6(1)(E) OR
            (F) GDPR, YOU HAVE THE RIGHT TO AT ANY TIME OBJECT TO THE PROCESSING
            OF YOUR PERSONAL DATA BASED ON GROUNDS ARISING FROM YOUR UNIQUE
            SITUATION. THIS ALSO APPLIES TO ANY PROFILING BASED ON THESE
            PROVISIONS. TO DETERMINE THE LEGAL BASIS, ON WHICH ANY PROCESSING OF
            DATA IS BASED, PLEASE CONSULT THIS DATA PROTECTION DECLARATION. IF
            YOU LOG AN OBJECTION, WE WILL NO LONGER PROCESS YOUR AFFECTED
            PERSONAL DATA, UNLESS WE ARE IN A POSITION TO PRESENT COMPELLING
            PROTECTION WORTHY GROUNDS FOR THE PROCESSING OF YOUR DATA, THAT
            OUTWEIGH YOUR INTERESTS, RIGHTS AND FREEDOMS OR IF THE PURPOSE OF
            THE PROCESSING IS THE CLAIMING, EXERCISING OR DEFENCE OF LEGAL
            ENTITLEMENTS (OBJECTION PURSUANT TO ART. 21(1) GDPR).
          </Typography>{" "}
          <Typography component="p">
            IF YOUR PERSONAL DATA IS BEING PROCESSED IN ORDER TO ENGAGE IN
            DIRECT ADVERTISING, YOU HAVE THE RIGHT TO OBJECT TO THE PROCESSING
            OF YOUR AFFECTED PERSONAL DATA FOR THE PURPOSES OF SUCH ADVERTISING
            AT ANY TIME. THIS ALSO APPLIES TO PROFILING TO THE EXTENT THAT IT IS
            AFFILIATED WITH SUCH DIRECT ADVERTISING. IF YOU OBJECT, YOUR
            PERSONAL DATA WILL SUBSEQUENTLY NO LONGER BE USED FOR DIRECT
            ADVERTISING PURPOSES (OBJECTION PURSUANT TO ART. 21(2) GDPR).
          </Typography>
          <Typography component="h3">
            Right to log a complaint with the competent supervisory agency
          </Typography>{" "}
          <Typography component="p">
            In the event of violations of the GDPR, data subjects are entitled
            to log a complaint with a supervisory agency, in particular in the
            member state where they usually maintain their domicile, place of
            work or at the place where the alleged violation occurred. The right
            to log a complaint is in effect regardless of any other
            administrative or court proceedings available as legal recourses.
          </Typography>
          <Typography component="p">
            The supervisory authority competent for us is: Berliner Beauftragte
            für Datenschutz und Informationsfreiheit (BlnBDI), Alt-Moabit 59–61,
            10555 Berlin, Germany,{" "}
            <a href="https://www.datenschutz-berlin.de">
              https://www.datenschutz-berlin.de
            </a>
            .
          </Typography>
          <Typography component="h3">Right to data portability</Typography>{" "}
          <Typography component="p">
            You have the right to have data that we process automatically on the
            basis of your consent or in fulfillment of a contract handed over to
            you or to a third party in a common, machine-readable format. If you
            should demand the direct transfer of the data to another controller,
            this will be done only if it is technically feasible.
          </Typography>
          <Typography component="h3">
            Information about, rectification and eradication of data
          </Typography>{" "}
          <Typography component="p">
            Within the scope of the applicable statutory provisions, you have
            the right to demand information about your archived personal data,
            their source and recipients as well as the purpose of the processing
            of your data at any time. You may also have a right to have your
            data rectified or eradicated. If you have questions about this
            subject matter or any other questions about personal data, please do
            not hesitate to contact us at any time.
          </Typography>
          <Typography component="h3">
            Right to demand processing restrictions
          </Typography>{" "}
          <Typography component="p">
            You have the right to demand the imposition of restrictions as far
            as the processing of your personal data is concerned. To do so, you
            may contact us at any time. The right to demand restriction of
            processing applies in the following cases:
          </Typography>{" "}
          <ul>
            {" "}
            <li>
              In the event that you should dispute the correctness of your data
              archived by us, we will usually need some time to verify this
              claim. During the time that this investigation is ongoing, you
              have the right to demand that we restrict the processing of your
              personal data.
            </li>{" "}
            <li>
              If the processing of your personal data was/is conducted in an
              unlawful manner, you have the option to demand the restriction of
              the processing of your data instead of demanding the eradication
              of this data.
            </li>{" "}
            <li>
              If we do not need your personal data any longer and you need it to
              exercise, defend or claim legal entitlements, you have the right
              to demand the restriction of the processing of your personal data
              instead of its eradication.
            </li>{" "}
            <li>
              If you have raised an objection pursuant to Art. 21(1) GDPR, your
              rights and our rights will have to be weighed against each other.
              As long as it has not been determined whose interests prevail, you
              have the right to demand a restriction of the processing of your
              personal data.
            </li>{" "}
          </ul>{" "}
          <Typography component="p">
            If you have restricted the processing of your personal data, these
            data &ndash; with the exception of their archiving &ndash; may be
            processed only subject to your consent or to claim, exercise or
            defend legal entitlements or to protect the rights of other natural
            persons or legal entities or for important public interest reasons
            cited by the European Union or a member state of the EU.
          </Typography>
          <Typography component="h3">SSL and/or TLS encryption</Typography>{" "}
          <Typography component="p">
            For security reasons and to protect the transmission of confidential
            content, such as donations or inquiries you submit to us as
            the website operator, this website uses either an SSL or a TLS
            encryption program. You can recognize an encrypted connection by
            checking whether the address line of the browser switches from
            &ldquo;http://&rdquo; to &ldquo;https://&rdquo; and also by the
            appearance of the lock icon in the browser line.
          </Typography>{" "}
          <Typography component="p">
            If the SSL or TLS encryption is activated, data you transmit to us
            cannot be read by third parties.
          </Typography>
          <Typography component="h3">
            Encrypted payment transactions on this website
          </Typography>{" "}
          <Typography component="p">
            If you are under an obligation to share your payment information
            (e.g. account number if you give us the authority to debit your bank
            account) with us when you make a donation, this information is
            required to process payments.
          </Typography>{" "}
          <Typography component="p">
            Payment transactions using common modes of paying (Visa/MasterCard,
            debit to your bank account) are processed exclusively via encrypted
            SSL or TLS connections. You can recognize an encrypted connection by
            checking whether the address line of the browser switches from
            &ldquo;http://&rdquo; to &ldquo;https://&rdquo; and also by the
            appearance of the lock icon in the browser line.
          </Typography>{" "}
          <Typography component="p">
            If the communication with us is encrypted, third parties will not be
            able to read the payment information you share with us.
          </Typography>
          <Typography component="h2" mb={4} mt={4}>
            4. Recording of data on this website
          </Typography>
          <Typography component="h3">Cookies</Typography>{" "}
          <Typography component="p">
            Our websites and pages use what the industry refers to as
            &ldquo;cookies.&rdquo; Cookies are small data packages that do not
            cause any damage to your device. They are either stored temporarily
            for the duration of a session (session cookies) or they are
            permanently archived on your device (permanent cookies). Session
            cookies are automatically deleted once you terminate your visit.
            Permanent cookies remain archived on your device until you actively
            delete them, or they are automatically eradicated by your web
            browser.
          </Typography>{" "}
          <Typography component="p">
            Cookies can be issued by us (first-party cookies) or by third-party
            companies (so-called third-party cookies). Third-party cookies
            enable the integration of certain services of third-party companies
            into websites (e.g., cookies for handling payment services).
          </Typography>{" "}
          <Typography component="p">
            Cookies have a variety of functions. Many cookies are technically
            essential since certain website functions would not work in the
            absence of these cookies (e.g., storing your consent choices).
            Other cookies may be used to analyze user
            behavior or for promotional purposes.
          </Typography>{" "}
          <Typography component="p">
            Cookies, which are required for the performance of electronic
            communication transactions, for the provision of certain functions
            you want to use (e.g., for your language selection) or those that
            are necessary for the optimization (required cookies) of the website
            (e.g., cookies that provide measurable insights into the web
            audience), shall be stored on the basis of Art. 6(1)(f) GDPR, unless
            a different legal basis is cited. The operator of the website has a
            legitimate interest in the storage of required cookies to ensure the
            technically error-free and optimized provision of the
            operator&rsquo;s services. If your consent to the storage of the
            cookies and similar recognition technologies has been requested, the
            processing occurs exclusively on the basis of the consent obtained
            (Art. 6(1)(a) GDPR and &sect; 25 (1) TDDDG); this consent may be
            revoked at any time.
          </Typography>{" "}
          <Typography component="p">
            You have the option to set up your browser in such a manner that you
            will be notified any time cookies are placed and to permit the
            acceptance of cookies only in specific cases. You may also exclude
            the acceptance of cookies in certain cases or in general or activate
            the delete-function for the automatic eradication of cookies when
            the browser closes. If cookies are deactivated, the functions of
            this website may be limited.
          </Typography>{" "}
          <Typography component="p">
            Which cookies and services are used on this website can be found in
            this privacy policy.
          </Typography>
          <Typography component="h3">Language preference cookie</Typography>{" "}
          <Typography component="p">
            This website is available in English and German. If you actively
            choose a language, either with the language switcher in the menu
            or with the language notice shown at the bottom of the page, we
            store a first-party cookie named NEXT_LOCALE in your browser. It
            contains only the language you chose (&quot;en&quot; or
            &quot;de&quot;), no identifier, and is not shared with anyone. It
            is used solely to show you the website in your chosen language on
            later visits and expires after one year. The cookie is set only
            when you choose a language; it is not set merely by visiting the
            website.
          </Typography>
          <Typography component="p">
            Storing this cookie is strictly necessary to provide the function
            you expressly requested (§ 25(2) no. 2 TDDDG), so your consent is
            not required. The legal basis for the processing is Art. 6(1)(f)
            GDPR; our legitimate interest is showing the website in the
            language you selected. You can delete the cookie in your browser
            at any time; the website will then be shown in the language of the
            address you open.
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            fontWeight="bold"
            mt={4}
          >
            Server log files, API access logs and public traffic statistics
          </Typography>
          <Typography variant="body1" paragraph>
            When you access this website or call one of our freely available
            climate data APIs (for example <code>/api/temperature-api</code>),
            our systems automatically record information that your browser or
            API client transmits with the request. This information comprises:
          </Typography>
          <List dense>
            {[
              "the abbreviated or pseudonymised IP address of the requesting device",
              "the country that our hosting provider derives from that IP address for our climate-data API endpoints — no city, precise coordinates, postal code or time zone are collected",
              "the date and time of the request",
              "the requested path and the HTTP method",
              "the HTTP status code returned",
              "the referrer URL, where transmitted",
              "browser type and version and operating system, as reported in the user agent",
              "the requested host name and the deployment identifier",
            ].map((item, index) => (
              <ListItem key={index} sx={{ py: 0.5 }}>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
          <Typography variant="body1" paragraph sx={{ mt: 2 }}>
            These data are not merged with other data sources, and they are not
            used to create user profiles or to recognise you across sessions.
          </Typography>
          <Divider sx={{ my: 3 }} />
          <Box mb={3}>
            <Typography
              variant="h6"
              component="h3"
              gutterBottom
              fontWeight="bold"
            >
              Purposes
            </Typography>
            <Typography variant="body1" paragraph>
              We process these data in order to (i) operate, secure and
              troubleshoot this website and our APIs, (ii) detect and defend
              against abuse, automated scraping and denial-of-service attempts,
              (iii) measure load and plan capacity for APIs we provide free of
              charge, and (iv) publish statistics on the use of those APIs, as
              described under "Public traffic statistics" below.
            </Typography>
          </Box>
          <Box mb={3}>
            <Typography
              variant="h6"
              component="h3"
              gutterBottom
              fontWeight="bold"
            >
              Legal basis
            </Typography>
            <Typography variant="body1" paragraph>
              The legal basis is Art. 6(1)(f) GDPR. We have a legitimate
              interest in the technically error-free provision, the security and
              the optimisation of this website and its APIs. As a project whose
              purpose is public accountability in relation to climate data, we
              also have a legitimate interest in documenting transparently how
              our openly accessible APIs are used. This recording does not
              involve storing information on, or gaining access to information
              already stored in, your terminal equipment; § 25 (1) TDDDG
              therefore does not apply and your consent is not required. This
              processing is separate from the consent-based web analysis
              described in section 5 of this policy. You may object to it at any
              time pursuant to Art. 21(1) GDPR — see "Right to object to the
              collection of data in special cases" above.
            </Typography>
          </Box>
          <Box mb={3}>
            <Typography
              variant="h6"
              component="h3"
              gutterBottom
              fontWeight="bold"
            >
              Data minimisation
            </Typography>
            <Typography variant="body1" paragraph>
              IP addresses are not stored in readable form. Before an entry is
              written to our log store, the IP address is replaced by a
              salted, non-reversible cryptographic hash (HMAC-SHA256,
              truncated), so that a stored entry can no longer be resolved
              back to a specific address. We deliberately do not record
              precise location data: although our hosting provider also makes
              city name, latitude, longitude, postal code and time zone
              available, we do not collect any of them. Only the requesting
              country (a two-letter code, e.g. "DE") is recorded, and only for
              requests to our public climate-data API endpoints.
            </Typography>
          </Box>
          <Box mb={3}>
            <Typography
              variant="h6"
              component="h3"
              gutterBottom
              fontWeight="bold"
            >
              Storage duration
            </Typography>
            <Typography variant="body1" paragraph>
              Log entries are deleted automatically 7 days after they are
              recorded, and in any event once our log store exceeds a
              configured maximum number of entries, whichever occurs first. At
              current traffic volumes the entry-count limit is often reached
              before 7 days, so the effective retention window can be shorter.
              Deletion is permanent; entries are not archived elsewhere.
            </Typography>
            <Typography variant="body1" paragraph>
              Once a day, we compute an aggregated summary of the previous day
              from these entries: the number of requests, the number of
              distinct visitors as a single figure, error counts, the data
              volume, and the five most requested paths. We add the total
              number of requests for that day as reported in aggregated form
              by our hosting provider. These daily summaries contain no IP
              addresses (neither readable nor pseudonymised), user agents,
              referrer URLs or other information relating to individual
              visitors, and do not allow any conclusions to be drawn about
              individual persons. They are kept for up to 400 days to show how
              the use of our APIs develops over time.
            </Typography>
          </Box>
          <Box mb={3}>
            <Typography
              variant="h6"
              component="h3"
              gutterBottom
              fontWeight="bold"
            >
              Recipients
            </Typography>
            <Typography variant="body1" paragraph>
              The following processors are involved in this processing on our
              behalf:
            </Typography>

            <Stack spacing={2} ml={2}>
              <Box>
                <Typography variant="body1" fontWeight="medium">
                  Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  provision of the website and transmission of the log entries
                  to our log store (see "External Hosting" in section 2). Vercel
                  Inc. is certified under the EU-US Data Privacy Framework
                  (DPF); the transfer of data to the United States is based on
                  that certification. Further information:{" "}
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
                  operation of the database, located in Frankfurt am Main,
                  Germany (AWS region eu-central-1), in which the log entries are stored. Upstash relies
                  on the EU-US Data Privacy Framework and, in the alternative,
                  on the Standard Contractual Clauses of the European
                  Commission. Further information:{" "}
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
              We have concluded a data processing agreement pursuant to Art. 28
              GDPR with each of these providers.
            </Typography>
          </Box>
          <Box mb={3}>
            <Typography
              variant="h6"
              component="h3"
              gutterBottom
              fontWeight="bold"
            >
              Public traffic statistics
            </Typography>
            <Typography variant="body1" paragraph>
              We publish aggregated statistics on the use of our APIs at{" "}
              <Link
                href="https://www.global-warming.org/traffic"
                target="_blank"
                rel="noopener"
              >
                https://www.global-warming.org/traffic
              </Link>{" "}
              (also available in German) and at{" "}
              <Link
                href="https://www.global-warming.org/logs"
                target="_blank"
                rel="noopener"
              >
                https://www.global-warming.org/logs
              </Link>
              . These pages are accessible without a login, and also show the
              daily summaries described under &quot;Storage duration&quot;
              above. The published view is
              produced on our servers and deliberately does not contain IP
              addresses — neither in readable nor in pseudonymised form — nor
              user agents, referrer URLs, request identifiers or any list of
              individual addresses per country. What is published is: the number
              of requests over time, the requested paths, status codes, browser
              and operating system families, the country a request came from,
              and the number of distinct visitors per country as a figure. No
              city names, coordinates, or Vercel edge-region/datacenter
              identifiers are collected or published — location data is
              limited to country level everywhere in this system.
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="h6"
              component="h3"
              gutterBottom
              fontWeight="bold"
            >
              Public source code
            </Typography>
            <Typography variant="body1" paragraph>
              The source code of this website, including the logging function
              described above, is published in a public repository at{" "}
              <Link
                href="https://github.com/rene-mdd/global-warming"
                target="_blank"
                rel="noopener"
              >
                https://github.com/rene-mdd/global-warming
              </Link>
              . That repository contains program code and configuration only.
              It contains no log entries, no access data and no personal data
              relating to our visitors.
            </Typography>
          </Box>
          <Typography component="h3">Contact form</Typography>{" "}
          <Typography component="p">
            If you send us a message using our contact form, the information
            you enter (name, e-mail address and message) is transmitted to us,
            together with the result of the reCAPTCHA check described below
            (if you have consented to it),
            so that we can handle your inquiry and answer any follow-up
            questions. We do not share this information without your consent.
          </Typography>{" "}
          <Typography component="p">
            The form is processed by the service Static Forms, operated by
            Qualascend (
            <Link
              href="https://www.staticforms.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.staticforms.dev
            </Link>
            ). Static Forms receives your message, checks it for spam and
            forwards it to us by e-mail. Static Forms stores form data on
            servers of Amazon Web Services in Frankfurt am Main, Germany, and
            deletes stored submissions after 30 days. Static Forms uses
            further sub-processors, which are listed in its data processing
            agreement; some of them are located outside the European Union.
          </Typography>{" "}
          <Typography component="p">
            Static Forms processes your data on our behalf on the basis of its
            data processing agreement. Any transfer to countries outside the
            European Union is based on the Standard Contractual Clauses of
            the European Commission, which are part of that agreement:{" "}
            <Link
              href="https://www.staticforms.dev/dpa"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.staticforms.dev/dpa
            </Link>
            . For more information, please see the privacy policy of Static
            Forms:{" "}
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
            The processing is based on Art. 6(1)(b) GDPR if your inquiry is
            related to the performance of a contract or to pre-contractual
            measures. In all other cases, it is based on our legitimate
            interest in handling the inquiries sent to us effectively (Art.
            6(1)(f) GDPR).
          </Typography>{" "}
          <Typography component="p">
            We keep the data you enter in the contact form until you ask us to
            delete it or the purpose for storing it no longer applies (e.g.,
            once your inquiry has been fully handled). Mandatory statutory
            provisions, in particular retention periods, remain unaffected.
            You can also write to us directly at help@global-warming.org
            without using the form.
          </Typography>
          <Typography component="h3">Consent with ConsentManager</Typography>{" "}
          <Typography component="p">
            Our website uses the ConsentManager consent technology to obtain
            your consent to the storage of certain cookies on your device or for
            the use of certain technologies and data protection legislation
            compliant documentation of the former. The party offering this
            technology is consentmanager AB, Torsgatan 26, 113 21 Stockholm,
            Sweden, website:{" "}
            <Link
              href="https://www.consentmanager.de"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.consentmanager.de
            </Link>{" "}
            (hereinafter referred to as &ldquo;ConsentManager&rdquo;).
          </Typography>{" "}
          <Typography component="p">
            Whenever you visit our website, a connection to
            ConsentManager&rsquo;s servers will be established to obtain your
            consent and other declarations regarding the use of cookies.
          </Typography>{" "}
          <Typography component="p">
            Moreover, ConsentManager shall store a cookie in your browser to be
            able to allocate your declaration(s) of consent or any revocations
            of the former. The data that are recorded in this manner shall be
            stored until you ask us to eradicate them, delete the ConsentManager
            cookie or until the purpose for archiving the data no longer exists.
            This shall be without prejudice to any mandatory legal retention
            periods.
          </Typography>{" "}
          <Typography component="p">
            ConsentManager uses cookies to obtain the declarations of consent
            mandated by law. The legal basis for the use of such cookies is Art.
            6(1)(c) GDPR.
          </Typography>
          <Typography component="h4">Google reCAPTCHA</Typography>
          <Typography component="p">
            To protect our website from spam and abuse, we use Google reCAPTCHA,
            a service provided by Google Ireland Limited (Gordon House, Barrow
            Street, Dublin 4, Ireland). reCAPTCHA helps us determine whether
            data entered on our website (e.g., in a contact form) is submitted
            by a human or an automated program.
          </Typography>{" "}
          <Typography component="h4"> Data Collection & Processing</Typography>
          <Typography mb={2} component="p">
            reCAPTCHA analyzes website visitors based on various criteria, such
            as:
          </Typography>{" "}
          <Typography component="ul">
            {" "}
            <Typography component="li">IP address</Typography>{" "}
            <Typography component="li">
              Mouse movements and interactions
            </Typography>
            <Typography component="li"> Time spent on the page</Typography>
            <Typography component="li">
              {" "}
              Browser & device information
            </Typography>
            <Typography component="li"> Cookies set by Google</Typography>
            <Typography component="li">
              Previous interactions with Google services
            </Typography>{" "}
          </Typography>{" "}
          <Typography component="p">
            This data is transmitted to Google servers and may be stored in the
            USA.
          </Typography>{" "}
          <Typography component="p">
            For more information on how Google processes personal data, please
            review Google's privacy policy:{" "}
            <a href="https://policies.google.com/privacy">
              https://policies.google.com/privacy
            </a>
          </Typography>{" "}
          <Typography component="h4">Legal Basis</Typography>{" "}
          <Typography component="p">
            reCAPTCHA is loaded only on our contact form page and only after
            you have consented, either in the ConsentManager banner or with
            the &ldquo;Allow Google reCAPTCHA&rdquo; button shown above the
            form. The processing is based on your consent pursuant to Art.
            6(1)(a) GDPR and &sect; 25(1) TDDDG. You can revoke your consent
            at any time with effect for the future in the ConsentManager
            settings. Without consent, you can still reach us by e-mail at
            help@global-warming.org.
          </Typography>
          <Typography component="p">
            Google is certified in accordance with the &ldquo;EU-US Data
            Privacy Framework&rdquo; (DPF). For more information, please
            contact the provider under the following link:{" "}
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
            5. Analysis tools and advertising
          </Typography>
          <Typography component="h3">Google Analytics</Typography>{" "}
          <Typography component="p">
            This website uses functions of the web analysis service Google
            Analytics. The provider of this service is Google Ireland Limited
            (&ldquo;Google&rdquo;), Gordon House, Barrow Street, Dublin 4,
            Ireland.
          </Typography>{" "}
          <Typography component="p">
            Google Analytics enables the website operator to analyze the
            behavior patterns of website visitors. To that end, the website
            operator receives a variety of user data, such as pages accessed,
            time spent on the page, the utilized operating system and the
            user&rsquo;s origin. This data is assigned to the respective end
            device of the user. An assignment to a user-ID does not take place.
          </Typography>{" "}
          <Typography component="p">
            Furthermore, Google Analytics records certain interactions, such as
            scrolling and clicks on links that lead to other websites. Google
            Analytics
            uses various modeling approaches to augment the collected data sets
            and uses machine learning technologies in data analysis.
          </Typography>
          <Typography component="p">
            Google Analytics uses technologies that make the recognition of the
            user for the purpose of analyzing the user behavior patterns (e.g.,
            cookies or device fingerprinting). The website use information
            recorded by Google is, as a rule transferred to a Google server in
            the United States, where it is stored.
          </Typography>{" "}
          <Typography component="p">
            The use of these services occurs on the basis of your consent
            pursuant to Art. 6(1)(a) GDPR and &sect; 25(1) TDDDG. You may revoke
            your consent at any time.
          </Typography>{" "}
          <Typography component="p">
            Google Analytics is loaded only after you have given your consent
            via ConsentManager. The Google Analytics script (gtag.js) is
            downloaded from www.googletagmanager.com; we do not use a Google
            Tag Manager container.
          </Typography>{" "}
          <Typography component="p">
            Data transmission to the US is based on the Standard Contractual
            Clauses (SCC) of the European Commission. Details can be found here:{" "}
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
            The company is certified in accordance with the &ldquo;EU-US Data
            Privacy Framework&rdquo; (DPF). The DPF is an agreement between the
            European Union and the US, which is intended to ensure compliance
            with European data protection standards for data processing in the
            US. Every company certified under the DPF is obliged to comply with
            these data protection standards. For more information, please
            contact the provider under the following link:{" "}
            <Link
              href="https://www.dataprivacyframework.gov/participant/5780"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.dataprivacyframework.gov/participant/5780
            </Link>
            .
          </Typography>
          <Typography component="h4">IP addresses</Typography>{" "}
          <Typography component="p">
            We use Google Analytics 4. Google Analytics 4 does not log or store
            IP addresses. For data collected from users in the European Union,
            Google uses the IP address only to determine an approximate
            location and discards it before the data is logged.
          </Typography>
          <Typography component="h4">Browser plug-in</Typography>{" "}
          <Typography component="p">
            You can prevent the recording and processing of your data by Google
            by downloading and installing the browser plugin available under the
            following link:{" "}
            <Link
              href="https://tools.google.com/dlpage/gaoptout?hl=en"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://tools.google.com/dlpage/gaoptout?hl=en
            </Link>
            .
          </Typography>{" "}
          <Typography component="p">
            For more information about the handling of user data by Google
            Analytics, please consult Google&rsquo;s Data Privacy Declaration
            at:{" "}
            <Link
              href="https://support.google.com/analytics/answer/6004245?hl=en"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://support.google.com/analytics/answer/6004245?hl=en
            </Link>
            .
          </Typography>
          <Typography component="h4">Contract data processing</Typography>{" "}
          <Typography component="p">
            We have executed a contract data processing agreement with Google
            and are implementing the stringent provisions of the German data
            protection agencies to the fullest when using Google Analytics.
          </Typography>
          <Typography component="h2" mb={4} mt={4}>
            6. Plug-ins and Tools
          </Typography>
          <Typography component="h3">Google Fonts (local embedding)</Typography>{" "}
          <Typography component="p">
            This website uses so-called Google Fonts provided by Google to
            ensure the uniform use of fonts on this site. These Google fonts are
            locally installed so that a connection to Google&rsquo;s servers
            will not be established in conjunction with this application.
          </Typography>{" "}
          <Typography component="p">
            For more information on Google Fonts, please follow this link:{" "}
            <Link
              href="https://developers.google.com/fonts/faq"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://developers.google.com/fonts/faq
            </Link>{" "}
            and consult Google&rsquo;s Data Privacy Declaration under:{" "}
            <Link
              href="https://policies.google.com/privacy?hl=en"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://policies.google.com/privacy?hl=en
            </Link>
            .
          </Typography>
          <Typography component="h2" mb={4} mt={4}>
            7. Donations and payment service providers
          </Typography>
          <Typography component="h3">Donation form (twingle)</Typography>{" "}
          <Typography component="p">
            Our donation page embeds the donation form of twingle GmbH, Berlin,
            Germany (
            <Link
              href="https://www.twingle.de"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.twingle.de
            </Link>
            ). When the page loads, your browser connects to twingle&rsquo;s
            servers, which receive your IP address. If you donate, the
            information you enter in the form (e.g., name, address, e-mail
            address, amount and the payment details required for the payment
            method you choose) is processed by twingle to handle your donation
            and passed on to us, so that we can manage your donation and issue
            a donation receipt.
          </Typography>{" "}
          <Typography component="p">
            The processing is based on Art. 6(1)(b) GDPR (handling your
            donation) and, where we are legally required to keep records, for
            example for tax purposes, on Art. 6(1)(c) GDPR. For more
            information, please see twingle&rsquo;s privacy policy:{" "}
            <Link
              href="https://www.twingle.de/datenschutz/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.twingle.de/datenschutz/
            </Link>
            .
          </Typography>
          <Typography component="h3">Payment services</Typography>{" "}
          <Typography component="p">
            The donation form offers SEPA direct debit, credit card, Google
            Pay, PayPal and bank transfer. When you make a donation, your
            payment data (e.g., name, payment amount, bank account details,
            credit card number) are processed by the payment service provider
            for the method you choose, for the purpose of payment processing.
            For these transactions, the respective contractual and data
            protection provisions of the respective providers apply. The use
            of the payment service providers is based on Art. 6(1)(b) GDPR
            (handling your donation) and in the interest of a smooth,
            convenient, and secure payment transaction (Art. 6(1)(f) GDPR).
            Insofar as your consent is requested for certain actions, Art.
            6(1)(a) GDPR is the legal basis for data processing; consent may
            be revoked at any time for the future.
          </Typography>
          <Typography component="p">
            Depending on the payment method you choose, the following
            providers are involved:
          </Typography>
          <Typography component="h4">
            Stripe (credit card and Google Pay)
          </Typography>{" "}
          <Typography component="p">
            Credit card and Google Pay payments are processed by Stripe
            Payments Europe, Limited, 1 Grand Canal Street Lower, Grand Canal
            Dock, Dublin, D02 H210, Ireland (hereinafter &ldquo;Stripe&rdquo;).
            Stripe may transfer data to its parent company in the United
            States. Details can be found in Stripe&rsquo;s privacy policy:{" "}
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
            If you pay with Google Pay, Google Ireland Limited, Gordon House,
            Barrow Street, Dublin 4, Ireland, also processes your payment data
            in accordance with its own privacy policy:{" "}
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
            The provider of this payment service is PayPal (Europe)
            S.&agrave;.r.l. et Cie, S.C.A., 22-24 Boulevard Royal, L-2449
            Luxembourg (hereinafter &ldquo;PayPal&rdquo;).
          </Typography>{" "}
          <Typography component="p">
            Data transmission to the US is based on the Standard Contractual
            Clauses (SCC) of the European Commission. Details can be found here:{" "}
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
            Details can be found in PayPal&rsquo;s privacy policy:{" "}
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
            SEPA direct debit and bank transfer
          </Typography>{" "}
          <Typography component="p">
            For SEPA direct debit and bank transfer, your name, bank account
            details (IBAN) and the donation amount are processed by twingle
            and by our bank to collect or receive the payment.
          </Typography>
        </Container>
      </Grid>
      <Footer classNameProp="footer" />
    </>
  );
}

export default PrivacyPolicy;
