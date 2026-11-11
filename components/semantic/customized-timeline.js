import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import CopyrightIcon from "@mui/icons-material/Copyright";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import GroupsIcon from "@mui/icons-material/Groups";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CodeIcon from "@mui/icons-material/Code";
import { useT } from "../../lib/i18n";

export default function CustomizedTimeline() {
  const t = useT().about.timeline;
  const [start, legal, kickOff, fundraising, development, launch] = t.items;
  return (
    <>
      <Typography variant="h2" className="timeline-title">
        {t.title}
      </Typography>
      <Grid className="vision-mission-wrapper">
        <Grid className="mission">
          <Typography
            mb={5}
            component="h2"
            align="center"
            size={{ xs: 12, md: 6 }}
          >
            {t.mission.title}
          </Typography>
          <Typography component="p" align="center">
            {t.mission.text}
          </Typography>
        </Grid>
        <Grid className="vision" size={{ xs: 12, md: 6 }}>
          <Typography mb={5} component="h2" align="center">
            {t.vision.title}
          </Typography>
          <Typography component="p" align="center">
            {t.vision.text}
          </Typography>
        </Grid>
      </Grid>
      <Timeline position="alternate" sx={{ width: "100%", padding: "0" }}>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: "auto 0", fontSize: "20px" }}
            variant="body2"
            color="white"
            className="timeline-q"
          >
            2020
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot sx={{ backgroundColor: "#C83CB9" }}>
              <PlayArrowIcon sx={{ color: "white" }} />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography variant="h6" component="span" color="white">
              {start.title}
            </Typography>
            <Typography color="white">
              {start.text}
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem className="timeline-item">
          <TimelineOppositeContent
            sx={{ m: "auto 0", fontSize: "20px" }}
            align="right"
            variant="body2"
            color="white"
            className="timeline-q"
          >
            2023
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot sx={{ backgroundColor: "#373737" }}>
              <CopyrightIcon color="inherit" />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent
            sx={{ py: "12px", px: 2 }}
            className="timeline-content"
          >
            <Typography variant="h6" component="span" color="white">
              {legal.title}
            </Typography>
            <Typography color="white">
              {legal.text}
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: "auto 0", fontSize: "20px" }}
            variant="body2"
            color="white"
            className="timeline-q"
          >
            2024
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot sx={{ backgroundColor: "#FC824A" }}>
              <WorkOutlineIcon sx={{ color: "white" }} />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography variant="h6" component="span" color="white">
              {kickOff.title}
            </Typography>
            <Typography color="white">
              {kickOff.text}
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: "auto 0", fontSize: "20px" }}
            align="right"
            variant="body2"
            color="white"
            className="timeline-q"
          >
            2025
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot sx={{ backgroundColor: "white" }}>
              <GroupsIcon color="primary" />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography variant="h6" component="span" color="white">
              {fundraising.title}
            </Typography>
            <Typography color="white">
              {fundraising.text}
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: "auto 0", fontSize: "20px" }}
            variant="body2"
            color="white"
            className="timeline-q"
          >
            2026
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot sx={{ backgroundColor: "#D5174E" }}>
              <CodeIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography variant="h6" component="span" color="white">
              {development.title}
            </Typography>
            <Typography color="white">{development.text}</Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: "auto 0", fontSize: "20px" }}
            align="right"
            variant="body2"
            color="white"
            className="timeline-q"
          >
            2027
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot sx={{ backgroundColor: "#1fa774" }}>
              <RocketLaunchIcon color="white" />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography variant="h6" component="span" color="white">
              {launch.title}
            </Typography>
            <Typography color="white">
              {launch.text}
            </Typography>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </>
  );
}
