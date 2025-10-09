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

export default function CustomizedTimeline() {
  return (
    <>
      <Grid className="vision-mission-wrapper">
        <Grid className="mission">
          <Typography
            mb={5}
            component="h2"
            align="center"
            size={{ xs: 12, md: 6 }}
          >
            Mission
          </Typography>
          <Typography component="p" align="center">
            To make companies' ESG data free, open, and practical for everyday
            use. Empowering people everywhere to make informed and sustainable
            decisions. Accelerating the transition to a greener future.
          </Typography>
        </Grid>
        <Grid className="vision" size={{ xs: 12, md: 6 }}>
          <Typography mb={5} component="h2" align="center">
            Vision
          </Typography>
          <Typography component="p" align="center">
            A world where environmental accountability is the norm, not the
            exception. With transparency at the heart of everything we do.
          </Typography>
        </Grid>
      </Grid>
      <Timeline position="alternate" sx={{ width: "100%", padding: "0" }}>
        <TimelineItem className="timeline-item">
          <TimelineOppositeContent
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
              Legal
            </Typography>
            <Typography color="white">
              Registration and paperwork of the nonprofit.
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: "auto 0" }}
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
              Kick off
            </Typography>
            <Typography color="white">
              Development of web app additional features.
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent
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
              Development
            </Typography>
            <Typography color="white">
              Start of fundraising campaign. Development of prototype.
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: "auto 0" }}
            variant="body2"
            color="white"
            className="timeline-q"
          >
            2026
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot sx={{ backgroundColor: "#1fa774" }}>
              <RocketLaunchIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography variant="h6" component="span" color="white">
              Expansion
            </Typography>
            <Typography color="white">
              Launch of the fully-fledged platform to a global audience.
            </Typography>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </>
  );
}
