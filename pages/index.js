import React from "react";
import { Divider } from "@mui/material";
import StickyMenu from "../components/semantic/menu";
import SideMenu from "../components/semantic/sideMenu";
import LandingPage from "../components/semantic/LandingPage";
import ParentTemperature from "../components/semantic/parent-temperature";
import ParentCo2 from "../components/semantic/parent-co2";
import ParentMethane from "../components/semantic/parent-methane";
import ParentNitrous from "../components/semantic/parent-nitrous";
import ParentArctic from "../components/semantic/parent-arctic";
import SiteHeader from "../components/siteHeader";
import Footer from "../components/semantic/footer";
import ParentOcean from "../components/semantic/parent-ocean";
import { useT } from "../lib/i18n";

function Home() {
  const t = useT();
  const websiteUrl = "https://global-warming.org";
  return (
    <>
      <SiteHeader
        description={t.meta.home.description}
        title={t.meta.home.title}
        keywords={t.meta.home.keywords}
        websiteUrl={websiteUrl}
      />
      <StickyMenu />
      <SideMenu />
      <LandingPage />
      <Divider name="jump-to-temperature" />
      <ParentTemperature />
      <Divider name="jump-to-co2" />
      <ParentCo2 />
      <Divider name="jump-to-methane" />
      <ParentMethane />
      <Divider name="jump-to-nitrous" />
      <ParentNitrous />
      <Divider name="jump-to-arctic" />
      <ParentArctic />
      <Divider name="jump-to-arctic" />
      <ParentOcean />
      <Divider name="jump-to-ocean" />
      <Footer classNameProp="footer" />
    </>
  );
}

export default Home;
