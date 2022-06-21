import React from "react";
import { Divider } from "@mui/material";
import StickyMenu from "../components/semantic/menu";
import SideMenu from "../components/semantic/sideMenu";
import LandingPage from "../components/semantic/LandingPage";
import SemanticTemperature from "../components/semantic/parent-temperature";
import SemanticCo2 from "../components/semantic/parent-co2";
import SemanticMethane from "../components/semantic/parent-methane";
import SemanticNitrous from "../components/semantic/parent-nitrous";
import SemanticArctic from "../components/semantic/parent-arctic";
import SiteHeader from "../components/siteHeader";
import Footer from "../components/semantic/footer";

function Home() {
  const homeTitle = "Global Warming API";
  const homeMetaDescription =
    "Global warming & climate change up to date APIs, data, graphs, and news. Earth's temperature, carbon dioxide (CO2), methane, nitrous oxide, and melted polar ice cap.";
  const homeKeywords = "Global warming, climate change, API, graphs";
  return (
    <>
      <SiteHeader
        description={homeMetaDescription}
        title={homeTitle}
        keywords={homeKeywords}
      />
      <StickyMenu />
      <SideMenu />
      <LandingPage />
      <Divider name="jump-to-temperature" />
      <SemanticTemperature />
      <Divider name="jump-to-co2" />
      <SemanticCo2 />
      <Divider name="jump-to-methane" />
      <SemanticMethane />
      <Divider name="jump-to-nitrous" />
      <SemanticNitrous />
      <Divider name="jump-to-arctic" />
      <SemanticArctic />
      <Footer />
    </>
  );
}

export default Home;
