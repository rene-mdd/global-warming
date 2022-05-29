// import {
//   Timeline,
//   TimelineItem,
//   TimelineSeparator,
//   TimelineConnector,
//   TimelineContent,
//   TimelineOppositeContent,
//   TimelineDot,
// } from "@mui/lab";
// import {
//   FastfoodIcon,
//   LaptopMacIcon,
//   HotelIcon,
//   RepeatIcon,
// } from "@mui/icons-material";
// import { Typography } from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import HotelIcon from "@mui/icons-material/Hotel";
import RepeatIcon from "@mui/icons-material/Repeat";
import { Typography } from "@mui/material";

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
          <TimelineDot>
            <FastfoodIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent
          sx={{ py: "12px", px: 2 }}
          className="timeline-content"
        >
          <Typography variant="h6" component="span" color="white">
            Team
          </Typography>
          <Typography color="white">
            Recruitment of the organization members
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
          <TimelineDot color="primary">
            <LaptopMacIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span" color="white">
            Legal
          </Typography>
          <Typography color="white">
            Registration and paperwork of the nonprofit organization in Germany
          </Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="primary" variant="outlined">
            <HotelIcon />
          </TimelineDot>
          <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span" color="white">
            Sleep
          </Typography>
          <Typography color="white">Because you need rest</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
          <TimelineDot color="secondary">
            <RepeatIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span" color="white">
            Repeat
          </Typography>
          <Typography color="white">
            Because this is the life you love!
          </Typography>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
