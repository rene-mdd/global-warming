/* eslint-disable */
import * as React from "react";
import PropTypes from "prop-types";
import { CardMedia, Container } from "@mui/material";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function createData(
  name,
  disclosure,
  commitment,
  emissions,
  offset,
  deforestation,
  impact,
  profile
) {
  return {
    name,
    disclosure,
    commitment,
    emissions,
    offset,
    deforestation,
    impact,
    profile,
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const colorImpact =
    row.impact <= 5 ? "red" : row.impact > 9 ? "green" : "orange";

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.disclosure}</TableCell>
        <TableCell align="right">{row.commitment}</TableCell>
        <TableCell align="right">{row.emissions}</TableCell>
        <TableCell align="right">{row.offset}</TableCell>
        <TableCell align="right">{row.deforestation}</TableCell>
        <TableCell align="right" sx={{ color: colorImpact }}>
          {row.impact}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit size="100%">
            <Box sx={{ margin: 1 }}>
              <Typography
                variant="h6"
                gutterBottom
                component="h6"
                fontWeight="bold"
              >
                Profile
              </Typography>
              <Table>
                <TableRow>
                  <TableCell align="center">logo</TableCell>
                  <TableCell>Additional details</TableCell>
                  <TableCell>Products & services</TableCell>
                  <TableCell>Sources</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <CardMedia
                      className="brands-logo"
                      component="img"
                      alt={row.name}
                      image={row?.profile?.logo}
                    />
                  </TableCell>
                  <TableCell align="center" width="100%">
                    <Container
                      disableGutters
                      component="div"
                      className="text-container"
                    >
                      {row?.profile?.details?.map((data) => {
                        return (
                          <Typography paragraph textAlign="left">
                            {data}
                          </Typography>
                        );
                      })}
                    </Container>
                  </TableCell>
                  <TableCell align="left">
                    <Container
                      disableGutters
                      component="div"
                      className="text-container"
                    >
                      {row?.profile?.products?.map((data) => {
                        return (
                          <Typography fontSize="16px" component="p">
                            {data}
                          </Typography>
                        );
                      })}
                    </Container>
                  </TableCell>
                  <TableCell align="left">
                    <Container
                      disableGutters
                      component="div"
                      className="text-container"
                    >
                      {row?.profile?.sources?.map((data) => {
                        return (
                          <Typography
                            textAlign="left"
                            component="a"
                            href={data.link}
                          >
                            <Typography paragraph>{data.name}</Typography>
                          </Typography>
                        );
                      })}
                    </Container>
                  </TableCell>
                </TableRow>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    disclosure: PropTypes.string.isRequired,
    emissions: PropTypes.string.isRequired,
    commitment: PropTypes.string.isRequired,
    deforestation: PropTypes.string.isRequired,
    impact: PropTypes.string.isRequired,
    profile: PropTypes.shape({
      logo: PropTypes.string.isRequired,
      details: PropTypes.string.isRequired,
      sources: PropTypes.string.isRequired,
    }).isRequired,
    name: PropTypes.string.isRequired,
    offset: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData("Volkswagen AG", "4 / -1", 1, 0, 0, 0, 4, {
    logo: "images/volkswagen_logo_2019.svg.png",
    details: [
      "They offer one cabon neutral vehicle model, the ID.3",
      "They co-builded Tramm-Göthen solar plant",
    ],
    sources: [
      {
        name: "Volkswagen site",
        link: "https://www.volkswagenag.com/en/news/2021/04/way-to-zero--volkswagen-presents-roadmap-for-climate-neutral-mob.html",
      },
      {
        name: "Power technology",
        link: "https://www.power-technology.com/projects/tramm-gothen-solar-park-mecklenburg-western-pomerania-germany/",
      },
    ],
    products: [
      "Volkswagen Arteon",
      "Volkswagen Arteon 4motion",
      "Volkswagen Atlas",
      "Volkswagen Atlas 4motion",
      "Volkswagen Atlas Cross Sport",
      "Volkswagen Atlas Cross Sport 4motion",
      "Volkswagen Beetle",
      "Volkswagen Beetle Convertible",
      "Volkswagen Beetle Dune",
      "Volkswagen Beetle Dune Convertible",
      "Volkswagen CC",
      "Volkswagen CC 4motion",
      "Volkswagen e-Golf",
      "Volkswagen Eos",
      "Volkswagen Golf",
      "Volkswagen Golf Alltrack",
      "Volkswagen Golf R",
      "Volkswagen Golf SportWagen",
      "Volkswagen Golf SportWagen 4motion",
      "Volkswagen GTI",
      "Volkswagen Jetta",
      "Volkswagen Jetta GLI",
      "Volkswagen Jetta Hybrid",
      "Volkswagen Passat",
      "Volkswagen Tiguan",
      "Volkswagen Tiguan 4motion",
      "Volkswagen Tiguan Limited",
      "Volkswagen Tiguan Limited 4motion",
      "Volkswagen Touareg",
      "Volkswagen Cabrio",
      "Volkswagen Cabriolet",
      "Volkswagen Corrado",
      "Volkswagen Corrado SLC",
      "Volkswagen Eurovan",
      "Volkswagen Eurovan Camper",
      "Volkswagen Fox",
      "Volkswagen Fox GL Wagon",
      "Volkswagen Fox Wagon",
      "Volkswagen Golf III",
      "Volkswagen Golf III / GTI",
      "Volkswagen Golf/GTI",
      "Volkswagen GTI 16v",
      "Volkswagen GTI VR6",
      "Volkswagen GTI/Golf GT",
      "Volkswagen Jetta GLI 16v",
      "Volkswagen Jetta GLI/Wolfsburg Edition",
      "Volkswagen Jetta GLX",
      "Volkswagen Jetta III",
      "Volkswagen Jetta III GLX",
      "Volkswagen Jetta SportWagen",
      "Volkswagen Jetta Wagon",
      "Volkswagen New Beetle",
      "Volkswagen New Beetle Convertible",
      "Volkswagen New Golf",
      "Volkswagen New GTI",
      "Volkswagen New Jetta",
      "Volkswagen Passat 4motion",
      "Volkswagen Passat Syncro",
      "Volkswagen Passat Wagon",
      "Volkswagen Passat Wagon 4motion",
      "Volkswagen Passat Wagon Syncro",
      "Volkswagen Phaeton",
      "Volkswagen Quantum",
      "Volkswagen Quantum Syncro Wagon",
      "Volkswagen Quantum Wagon",
      "Volkswagen R32",
      "Volkswagen Rabbit",
      "Volkswagen Rabbit Convertible",
      "Volkswagen Routan",
      "Volkswagen Routan FWD",
      "Volkswagen Scirocco",
      "Volkswagen Scirocco 16v",
      "Volkswagen Touareg Hybrid",
      "Volkswagen Vanagon 2WD",
      "Volkswagen Vanagon Syncro 4WD",
      "Volkswagen Vanagon/Camper 2WD",
    ],
  }),
  createData("JBS SA", "3 / 3", 1, "-1", 0, "-3", 3, {
    logo: "images/JBS_S.A.png",
    details: [
      "This corporation is a good example of greenwashing. They have dozens of promises and projects related to environmental conservation and offsetting, but none of them are up and running. On the contrary, their emissions, and deforestation have been growing every year.",
      "Between 2016 and 2021 JBS increased their GHG emission by 51%.",
      "JBS have rampant deforestation in their supply chain as we can see in Trase platform, but forest500  gives them a 42% overall deforestation score. This ranking might be too lenient on the corporation. We need to investigate more about forest500 ranking methodology and their information sources.",
      "Commited to net zero emissions by 2040 (without a transpartent framework).",
    ],
    sources: [
      {
        name: "Customers",
        link: "https://jbsfoodsgroup.com/our-brands",
      },
      {
        name: "Anual sustainability report (2017)",
        link: "https://jbs.com.br/wp-content/uploads/2019/11/JBS_RAS2017_book_EN.pdf",
      },
      {
        name: "Forest 500",
        link: "https://forest500.org/forest-500-data",
      },
      {
        name: "JBS own projects",
        link: "https://fundojbsamazonia.org/en/projects/supported-projects/#prettyPhoto",
      },
      {
        name: "Trase deforestation profile",
        link: "https://trase.finance/entities/36d340a7-c657-3eb8-8f6d-1cc3c596be08",
      },
      {
        name: "Data from the institute of agriculture and trade policy",
        link: "https://www.iatp.org/media-brief-jbs-increases-emissions-51-percent#:~:text=The%20company%2C%20which%20is%20the,IATP)'s%20latest%20calculations.",
      },
    ],
    products: [
      "McDonald's",
      "Burger King",
      "Subway",
      "Outback",
      "KFC",
      "Pizza Hut",
      "Wendy's",
      "Swift",
      "Aspen Ridge",
      "Pilgrim's",
      "Great Southern",
      "Primo",
      "Moy Park",
      "1855",
      "5 Star Beef",
      "5 Star Beef Reserve",
      "Aberdeen Black",
      "Acres Organic Grassfed Beef",
      "Adaptable Meals",
      "Alamesa",
      "Albert van Zoonen",
      "AMH",
      "Aussie Beef",
      "Beef City Black",
      "Beef City Platinum",
      "Beehive",
      "Blue Ribbon Angus Beef",
      "Blue Ribbon Beef",
      "Byron Bay Berkshire Pork",
      "Canadian Diamond Beef",
      "Canadian Diamond Black Angus",
      "Cedar River Farms",
      "Certified Angus Beef",
      "Chef's Exclusive",
      "Clear River Farms",
      "Clear River Farms Premium Beef",
      "Country Pride",
      "County Post",
      "Creative Food Solutions",
      "DAK",
      "Dalehead Foods",
      "Danepak",
      "Danola",
      "Del Día",
      "Elite Prime",
      "Four Star Beef",
      "Four Star Natural Beef",
      "Friboi",
      "Geo. Adams",
      "Gold Kist",
      "Gold'n Plump",
      "Good Nature Pork",
      "Gourmet Burger",
      "Grainge",
      "Grass Run Farms",
      "Great Southern Pinnacle",
      "Hans",
      "Hereford",
      "Hereford Boss",
      "Huon Aquaculture",
      "Imperial American Wagyu Beef",
      "Just Bare",
      "King Island Beef",
      "Kitchen Range",
      "La Herencia",
      "Little Italy",
      "Little Joe Beef",
      "Mountain Creek Farms",
      "Moy Park Beef Orleans",
      "Moy Park Foodservice",
      "Moyer",
      "Moyer Angus Beef",
      "Northern Gold",
      "Northern Meat Shoppe",
      "O'Kane",
      "Oak Crown",
      "OZO",
      "Pierce Chicken",
      "Pilgrim’s Mexico",
      "Plumrose",
      "Pure Prime",
      "Queenslander",
      "Red Gum Creek",
      "Red Gum Creek Lamb",
      "Right to Roam",
      "Rivalea",
      "Riverina Australian Black Angus",
      "Royal",
      "Savora Sous Vide",
      "Savoro",
      "Seven Point Pork",
      "Shiro Kin Wagyu",
      "Showcase Premium Ground Beef",
      "Showcase Premium USA Beef",
      "Showcase Premium USA Beef Natural",
      "Spring Creek",
      "Spring Crossing",
      "Swift Australia",
      "Swift Black Angus",
      "Tajima Wagyu",
      "Tatiara",
      "Tender Valley",
      "The Bachelor",
      "The Green Butcher",
      "The Honest Butcher",
      "Think Pure Natural",
      "Think Pure Organic",
      "Thousand Guineas",
      "Three Islands",
      "To-Ricos",
      "Tulip",
      "W. Black",
      "Weddel",
      "Wicked Pig",
      "Yardstick",
      "Zap!",
    ],
  }),
  createData("Apple Inc.", "4 / No data", 3, 2, 1, "No data", 10, {
    logo: "images/Apple_logo_black.svg.png",
    details: [
      "Apple Inc. together with Conservation International created a $200 million fund for timber producing managed forest. This kind of projects suck carbon from the atmosphere. That’s why we scored this as partial, in the climate contribution field.",
    ],
    sources: [
      {
        name: "News about packaging from E + E leader",
        link: "https://www.environmentalleader.com/2017/07/apples-forests-now-sustainable-enough-cover-paper-used-packaging/",
      },
      {
        name: "News from reuter about the $200 million fund",
        link: "https://www.reuters.com/business/sustainable-business/apple-creates-fund-working-forests-part-carbon-removal-efforts-2021-04-15/",
      },
    ],
    products: [
      "AirTag",
      "Apple TV HD",
      "Apple TV 4K",
      "Apple Watch",
      "Apple Watch SE",
      "HomePod mini",
      "iMac",
      "iPad",
      "iPad Air",
      "iPad mini",
      "iPad Pro",
      "iPhone",
      "iPhone SE",
      "Mac mini",
      "Mac Pro",
      "Mac Studio",
      "MacBook Air",
      "MacBook Pro",
    ],
  }),
  createData("Amazon.com Inc.", "-1 / -1", 2, "-1", 0, "-1", "-2", {
    logo: "images/amazon-logo.png",
    details: [
      "Amazon is another example of greenwashing. The only climate contribution Amazon have promised to do is a $10 million donation for the conservation of forests in different US regions. This amount seems ridiculously small for a company of this size.",
      "They also launched the Agroforestry and Restoration Accelerator in partnership with The Nature Conservancy. But this project has not begun, and it will be a long time until we can measure its true impact.",
      "Amazon emission had been increasing  by around 15% each year.",
    ],
    sources: [
      {
        name: "Mongabay news about amazon green project",
        link: "https://news.mongabay.com/2021/09/amazon-meet-amazon-tech-giant-rolls-out-rainforest-carbon-offset-project/",
      },
      {
        name: "Amazon press release about their commitment status",
        link: "https://press.aboutamazon.com/news-releases/news-release-details/part-its-plan-be-net-zero-carbon-2040-amazon-commits-10-million",
      },
    ],
    products: ["everything in amazon.com"],
  }),
  createData("Siemens AG", "4 / No data", 3, 1, 1, "No data", 9, {
    logo: "images/siemens-logo.png",
    details: [
      "Siemens has around 65,000 suppliers around the world. This make the process of measuring and lowering their carbon emissions more complex.",
    ],
    sources: [
      {
        name: "Carbon neutrality pledge",
        link: "https://new.siemens.com/global/en/company/sustainability/carbonneutral.html#:~:text=It%20is%20our%20firm%20belief,zero%2Dcarbon%20footprint%20by%202030.",
      },
      {
        name: "Carbon neutrality plant",
        link: "https://www.upstreamonline.com/energy-transition/siemens-energy-to-work-on-carbon-neutral-lng-plant-and-pipeline-amid-criticism/2-1-1033344",
      },
    ],
    products: ["Products catalog"],
  }),
  createData("Adidas AG", "3 / -1", 1, 0, 0, 0, 3, {
    logo: "images/Adidas_Logo.svg.png",
    details: [
      "Adidas has committed to achieving climate neutrality (GHG - greenhouse gases) across its operations by 2025, reducing absolute GHG emissions across its entire value chain by 30% by 2030, measured against a baseline of 2017. But there is still not an official commitment to net-zero emissions.",
      'Adidas claims a "cumulative" reduction of combined net emissions by 55%. But there is not a third-party source to confirm this.',
    ],
    sources: [
      {
        name: "Carbon neutrality pledge",
        link: "https://new.siemens.com/global/en/company/sustainability/carbonneutral.html#:~:text=It%20is%20our%20firm%20belief,zero%2Dcarbon%20footprint%20by%202030.",
      },
      {
        name: "Carbon neutrality plant",
        link: "https://www.upstreamonline.com/energy-transition/siemens-energy-to-work-on-carbon-neutral-lng-plant-and-pipeline-amid-criticism/2-1-1033344",
      },
    ],
    products: ["Products catalog"],
  }),
];

export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>
              <Typography variant="span" fontWeight="bold">
                Company
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="span" fontWeight="bold">
                Disclosure: GHG Emission / Deforestation
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="span" fontWeight="bold">
                Commitment status
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="span" fontWeight="bold">
                Net emission reduction
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="span" fontWeight="bold">
                Climate contribution / Offsetting
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="span" fontWeight="bold">
                Deforestation
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="span" fontWeight="bold">
                Environmental impact
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
