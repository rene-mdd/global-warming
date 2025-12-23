import { Link, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Container } from "@mui/system";
import StickyMenu from "../../components/semantic/menu";
import SiteHeader from "../../components/siteHeader";
import Footer from "../../components/semantic/footer";

function privacyPolicy() {
  const privacyTitle = "Climate Accountability API - Privacy Policy";
  const privacyMetaDescription =
    "Privacy policy: Climate Accountability API gUG. Berlin, Germany.";
  const privacyKeywords =
    "Global warming, about, carbon footprint, climate change, environment";
  const websiteUrl = "https://www.global-warming.org/privacy-policy";

  return (
    <>
      <SiteHeader
        description={privacyTitle}
        title={privacyMetaDescription}
        keywords={privacyKeywords}
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
            The external hosting serves the purpose of fulfilling the contract
            with our potential and existing customers (Art. 6(1)(b) GDPR) and in
            the interest of secure, fast, and efficient provision of our online
            services by a professional provider (Art. 6(1)(f) GDPR). If
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
          <Typography component="h3">Amazon CloudFront CDN</Typography>{" "}
          <Typography component="p">
            We use the Content Delivery Network Amazon CloudFront CDN. The
            provider is Amazon Web Services EMEA SARL, 38 avenue John F.
            Kennedy, L-1855, Luxembourg (hereinafter referred to as
            &ldquo;Amazon&rdquo;).
          </Typography>{" "}
          <Typography component="p">
            Amazon CloudFront CDN is a globally distributed Content Delivery
            Network. During these transactions, the information transfer between
            your browser and our website is technically routed via the Content
            Delivery Network. This enables us to boost the global availability
            and performance capabilities of our website.
          </Typography>{" "}
          <Typography component="p">
            The use of Amazon CloudFront CDN is based on our legitimate interest
            in keeping the presentation of our web services as error free and
            secure as possible (Art. 6(1)(f) GDPR).
          </Typography>{" "}
          <Typography component="p">
            The data transfer to the United States is based on the Standard
            Contract Clauses of the EU Commission. You can find the details
            here:{" "}
            <Link
              href="https://aws.amazon.com/de/blogs/security/aws-gdpr-data-processing-addendum/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://aws.amazon.com/de/blogs/security/aws-gdpr-data-processing-addendum/
            </Link>
            .
          </Typography>{" "}
          <Typography component="p">
            For more information on Amazon CloudFront CDN please follow this
            link:{" "}
            <Link
              href="https://d1.awsstatic.com/legal/privacypolicy/AWS_Privacy_Notice__German_Translation.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://d1.awsstatic.com/legal/privacypolicy/AWS_Privacy_Notice__German_Translation.pdf
            </Link>
            .
          </Typography>
          <Typography component="p">
            The company is certified in accordance with the &ldquo;EU-US Data
            Privacy Framework&rdquo; (DPF). The DPF is an agreement between the
            European Union and the US, which is intended to ensure compliance
            with European data protection standards for data processing in the
            US. Every company certified under the DPF is obliged to comply with
            these data protection standards. For more information, please
            contact the provider under the following link:{" "}
            <Link
              href="https://www.dataprivacyframework.gov/participant/5776"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.dataprivacyframework.gov/participant/5776
            </Link>
            .
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
            Ren&eacute; Rodr&iacute;guez / Climate Accountability API.
            <br /> Seestra&szlig;e 107. 13353, Berlin, Germany.
          </Typography>
          <Typography component="p">
            Phone: &#91;Telefonnummer der verantwortlichen Stelle&#93;
            <br /> E-mail: help@global-warming.org
          </Typography>
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
            When using processors, we only disclose personal data of our
            customers on the basis of a valid contract on data processing. In
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
            content, such as purchase orders or inquiries you submit to us as
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
            account) with us after you have entered into a fee-based contract
            with us, this information is required to process payments.
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
            absence of these cookies (e.g., the shopping cart function or the
            display of videos). Other cookies may be used to analyze user
            behavior or for promotional purposes.
          </Typography>{" "}
          <Typography component="p">
            Cookies, which are required for the performance of electronic
            communication transactions, for the provision of certain functions
            you want to use (e.g., for the shopping cart function) or those that
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
          <Typography component="h3">GLS Bank</Typography>{" "}
          <Typography component="p">
            We use the GLS Bank donation tool embedded via an iframe on our
            website. GLS Bank may use third-party services such as Twigle to
            process data for donation purposes. For more details, please refer
            to GLS Bank’s privacy policy:{" "}
            <Link href="https://zukunftsstiftung-entwicklung.de/datenschutz/">
              https://zukunftsstiftung-entwicklung.de/datenschutz/
            </Link>
            .
          </Typography>
          <Typography component="h3">Consent with ConsentManager</Typography>{" "}
          <Typography component="p">
            Our website uses the ConsentManager consent technology to obtain
            your consent to the storage of certain cookies on your device or for
            the use of certain technologies and data protection legislation
            compliant documentation of the former. The party offering this
            technology is Jaohawi AB, H&aring;ltegelv&auml;gen 1b, 72348
            V&auml;ster&aring;s, Sweden, website:{" "}
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
          <Typography mb={2} component="p">
            The use of reCAPTCHA is based on Art. 6(1)(f) GDPR (legitimate
            interest). We have a legitimate interest in protecting our website
            from spam, bots, and fraudulent activities. Objection & Opt-Out
            Users who do not wish to be analyzed by reCAPTCHA can:
          </Typography>{" "}
          <Typography component="ul">
            {" "}
            <Typography component="li">
              <strong>Disable JavaScript</strong> in their browser (note: this
              may affect website functionality).
            </Typography>{" "}
            <Typography component="li">
              <strong>Use browser extensions</strong> that block Google
              services.
            </Typography>{" "}
            <Typography component="li">
              <strong>Exercise their rights under GDPR</strong>, such as
              requesting access to, correction of, or deletion of their data.
            </Typography>
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
            5. Analysis tools and advertising
          </Typography>
          <Typography component="h3">Google Tag Manager</Typography>{" "}
          <Typography component="p">
            We use the Google Tag Manager. The provider is Google Ireland
            Limited, Gordon House, Barrow Street, Dublin 4, Ireland
          </Typography>{" "}
          <Typography component="p">
            The Google Tag Manager is a tool that allows us to integrate
            tracking or statistical tools and other technologies on our website.
            The Google Tag Manager itself does not create any user profiles,
            does not store cookies, and does not carry out any independent
            analyses. It only manages and runs the tools integrated via it.
            However, the Google Tag Manager does collect your IP address, which
            may also be transferred to Google&rsquo;s parent company in the
            United States.
          </Typography>{" "}
          <Typography component="p">
            The Google Tag Manager is used on the basis of Art. 6(1)(f) GDPR.
            The website operator has a legitimate interest in the quick and
            uncomplicated integration and administration of various tools on his
            website. If appropriate consent has been obtained, the processing is
            carried out exclusively on the basis of Art. 6(1)(a) GDPR and &sect;
            25 (1) TDDDG, insofar the consent includes the storage of cookies or
            the access to information in the user&rsquo;s end device (e.g.,
            device fingerprinting) within the meaning of the TDDDG. This consent
            can be revoked at any time.
          </Typography>
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
            Furthermore, Google Analytics allows us to record your mouse and
            scroll movements and clicks, among other things. Google Analytics
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
          <Typography component="h4">IP anonymization</Typography>{" "}
          <Typography component="p">
            Google Analytics IP anonymization is active. As a result, your IP
            address will be abbreviated by Google within the member states of
            the European Union or in other states that have ratified the
            Convention on the European Economic Area prior to its transmission
            to the United States. The full IP address will be transmitted to one
            of Google&rsquo;s servers in the United States and abbreviated there
            only in exceptional cases. On behalf of the operator of this
            website, Google shall use this information to analyze your use of
            this website to generate reports on website activities and to render
            other services to the operator of this website that are related to
            the use of the website and the Internet. The IP address transmitted
            in conjunction with Google Analytics from your browser shall not be
            merged with other data in Google&rsquo;s possession.
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
            7. eCommerce and payment service providers
          </Typography>
          <Typography component="h3">Payment services</Typography>{" "}
          <Typography component="p">
            We integrate payment services of third-party companies on our
            website. When you make a purchase from us, your payment data (e.g.
            name, payment amount, bank account details, credit card number) are
            processed by the payment service provider for the purpose of payment
            processing. For these transactions, the respective contractual and
            data protection provisions of the respective providers apply. The
            use of the payment service providers is based on Art. 6(1)(b) GDPR
            (contract processing) and in the interest of a smooth, convenient,
            and secure payment transaction (Art. 6(1)(f) GDPR). Insofar as your
            consent is requested for certain actions, Art. 6(1)(a) GDPR is the
            legal basis for data processing; consent may be revoked at any time
            for the future.
          </Typography>
          <Typography component="p">
            We use the following payment services / payment service providers
            within the scope of this website:
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
          <Typography component="h4">instant transfer Sofort</Typography>{" "}
          <Typography component="p">
            The provider of this payment service is Sofort GmbH,
            Theresienh&ouml;he 12, 80339 Munich, Germany (hereinafter
            &ldquo;Sofort GmbH&rdquo;). With the help of the
            &ldquo;Sofort&uuml;berweisung&rdquo; procedure, we receive a payment
            confirmation from Sofort GmbH in real time and can immediately begin
            to fulfill our obligations. If you have chosen the payment method
            &ldquo;Sofort&uuml;berweisung&rdquo;, please send the PIN and a
            valid TAN to Sofort GmbH, with which it can log into your online
            banking account. Sofort GmbH automatically checks your account
            balance after logging in and carries out the transfer to us with the
            help of the TAN you have transmitted. Afterwards, it immediately
            sends us a transaction confirmation. After you log in, your
            turnover, the credit limit of the overdraft facility and the
            existence of other accounts and their balances are also checked
            automatically. In addition to the PIN and the TAN, the payment data
            entered by you as well as personal data will be transmitted to
            Sofort GmbH. The data about your person are first and last name,
            address, telephone number(s), email address, IP address and possibly
            other data required for payment processing. The transmission of this
            data is necessary to determine your identity beyond doubt and to
            prevent fraud attempts. For details on payment with immediate bank
            transfer, please refer to the following link:{" "}
            <Link
              href="https://www.klarna.com/sofort/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.klarna.com/sofort/
            </Link>
            .
          </Typography>
          <Typography component="h4">giropay</Typography>{" "}
          <Typography component="p">
            The provider of this payment service is the paydirekt GmbH,
            Stephanstra&szlig;e 14 &ndash; 16, 60313 Frankfurt am Main
            (hereinafter referred to as &ldquo;giropay&rdquo;).
          </Typography>{" "}
          <Typography component="p">
            For details, please consult giropay&rsquo;s Data Privacy Policy at:{" "}
            <Link
              href="https://www.paydirekt.de/agb/index.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.paydirekt.de/agb/index.html
            </Link>
            .
          </Typography>
          <Typography component="h4">Mastercard</Typography>{" "}
          <Typography component="p">
            The provider of this payment service is the Mastercard Europe SA,
            Chauss&eacute;e de Tervuren 198A, B-1410 Waterloo, Belgium
            (hereinafter &ldquo;Mastercard&rdquo;).
          </Typography>{" "}
          <Typography component="p">
            Mastercard may transfer data to its parent company in the US. The
            data transfer to the US is based on Mastercard's Binding Corporate
            Rules. Details can be found here:{" "}
            <Link
              href="https://www.mastercard.de/de-de/datenschutz.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.mastercard.de/de-de/datenschutz.html
            </Link>{" "}
            and{" "}
            <Link
              href="https://www.mastercard.us/content/dam/mccom/global/documents/mastercard-bcrs.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.mastercard.us/content/dam/mccom/global/documents/mastercard-bcrs.pdf
            </Link>
            .
          </Typography>
          <Typography component="h4">VISA</Typography>{" "}
          <Typography component="p">
            The provider of this payment service is the Visa Europe Services
            Inc, London Branch, 1 Sheldon Square, London W2 6TT, United Kingdom
            (hereinafter &ldquo;VISA&rdquo;).
          </Typography>{" "}
          <Typography component="p">
            Great Britain is considered a secure non-EU country as far as data
            protection legislation is concerned. This means that the data
            protection level in Great Britain is equivalent to the data
            protection level of the European Union.
          </Typography>{" "}
          <Typography component="p">
            VISA may transfer data to its parent company in the US. The data
            transfer to the US is based on the standard contractual clauses of
            the EU Commission. Details can be found here:{" "}
            <Link
              href="https://www.visa.de/nutzungsbedingungen/visa-globale-datenschutzmitteilung/mitteilung-zu-zustandigkeitsfragen-fur-den-ewr.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.visa.de/nutzungsbedingungen/visa-globale-datenschutzmitteilung/mitteilung-zu-zustandigkeitsfragen-fur-den-ewr.html
            </Link>
            .
          </Typography>{" "}
          <Typography component="p">
            For more information, please refer to VISA&rsquo;s privacy policy:{" "}
            <Link
              href="https://www.visa.de/nutzungsbedingungen/visa-privacy-center.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.visa.de/nutzungsbedingungen/visa-privacy-center.html
            </Link>
            .
          </Typography>
        </Container>
      </Grid>
      <Footer classNameProp="footer" />
    </>
  );
}

export default privacyPolicy;
