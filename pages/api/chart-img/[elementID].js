import chromium from "chrome-aws-lambda";

// IDs from our charts
// co2: "myCo2Chart",
// arctic: "arcticChart",
// methane: "myMethChart",
// nitrous: "myNitrousChart",
// temperature: "tempChart",
const imageTypes = ["png", "jpeg"];
const validImageType = (type) => {
  if (!imageTypes.includes(type)) throw new Error("Image type not supported");
};

module.exports = async (req, res) => {
  let image, element, browser;
  const [selectorName, imageType] = req.query.elementID.split(".");
  const regionSelector = `#${selectorName}`;

  try {
    const type = validImageType(imageType);
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: true,
    });

    let page = await browser.newPage();
    await page.goto("http://localhost:3000");
    await page.waitForSelector(regionSelector);
    element = await page.$(regionSelector);
    await page.waitFor(500); // TODO: Fade in animation,
    image = await element.screenshot({ type: type });
  } catch (e) {
    res.status(500).send("Internal Server Error");
  } finally {
    browser.close();
  }

  res.writeHead(200, {
    "Content-Type": `image/${imageType}`,
    "Cache-Control": "s-maxage=604800", // cache for a week
  });
  res.end(image, "binary");
};
