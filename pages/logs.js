import { ThemeProvider, createTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import TrafficDashboard from "../components/semantic/trafficDashboard/trafficDashboard";

const theme = createTheme();

export default function LogsPage() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <TrafficDashboard />
      </Container>
    </ThemeProvider>
  );
}
