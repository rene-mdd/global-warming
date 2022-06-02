import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import CopyrightIcon from "@mui/icons-material/Copyright";
import { Typography } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

export default function CustomizedTimeline() {
  return (
    <Timeline
      position="alternate"
      sx={{ marginBottom: "50px", width: "100%", padding: "0" }}
    >
      <TimelineItem className="timeline-item">
        <TimelineOppositeContent
          align="right"
          variant="body2"
          color="white"
          className="timeline-q"
        >
          Q4 2022
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
            Registration and paperwork of the nonprofit organization
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
          Q1 2023
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
            Start of data collection and funding campaign
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
          Q2 2023
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
            Engagement
          </Typography>
          <Typography color="white">
            - Development of website additional features to save and publish the
            data
          </Typography>
          <Typography color="white">
            - Promotion of the platform through multiple media channels
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
          Q3 2023
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
            Development of additional web technologies to increase traffic and
            networking. E.g. chat room, public wall
          </Typography>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
