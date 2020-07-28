import chromium from "chrome-aws-lambda";

/*
Generates images from chartjs charts.

The file name [elementID].js tells vercel that this file is a dynamic route
just like the express syntax `/chart-img/:elementID` 
We can access the route parameter via req.query.elementID
elementID should be split as we can request images as png or jpeg

Requirements:

- Chart js has by default an fade-in animation, to not take screenshots 
during the animation we need to use the animation `onComplete` handler to add 
our ANIMATION_COMPLETE_CLASS

- To take screenshots just of our chart and not of fixed elements you can
use the SCREENSHOT_REMOVE_ELEMENT_CLASS


IDs from our charts
- co2: "myCo2Chart",
- arctic: "arcticChart",
- methane: "myMethChart",
- nitrous: "myNitrousChart",
- temperature: "tempChart",
*/
const URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.VERCEL_URL;

const ANIMATION_COMPLETE_CLASS = `animation-complete`;
const SCREENSHOT_REMOVE_ELEMENT_CLASS = `chart-img--remove`;

const imageTypes = ["png", "jpeg"];

module.exports = async (req, res) => {
  let image, browser, page;
  const [selectorName, imageType] = req.query.elementID.split(".");
  const regionSelector = `#${selectorName}`;

  try {
    // Check if user requested the right image type
    const type = validImageType(imageType);

    // Visit URL TODO: env production url
    [browser, page] = await createVirtualBrowserPage(URL);

    // Remove all elements that have the class chart-img--remove
    await page.$$eval(`.${SCREENSHOT_REMOVE_ELEMENT_CLASS}`, (divs) =>
      divs.forEach((div) => div.remove())
    );

    // Wait until element to screen shot is on page
    // with the animation complete class `.animation-complete`
    const element = await page.waitForSelector(
      `${regionSelector}.${ANIMATION_COMPLETE_CLASS}`
    );
    // take screenshot of element
    image = await element.screenshot({ type: type });
  } catch (e) {
    return res.status(500).send("Internal Server Error");
  } finally {
    browser.close();
  }

  res.writeHead(200, {
    "Content-Type": `image/${imageType}`,
    "Cache-Control": "s-maxage=604800, stale-while-revalidate", // cache for a week and update in background
  });

  // send back image as binary
  res.end(image, "binary");
};

const validImageType = (type) => {
  if (!imageTypes.includes(type)) throw new Error("Image type not supported");
};

const createVirtualBrowserPage = async (url) => {
  // Create headless browser (virtual)
  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: true,
  });

  // create a new browser page
  const page = await browser.newPage();
  await page.goto(url);
  return [browser, page];
};
