import { BrowserRouter } from "react-router-dom";
import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { useStore } from "./app/store";
import { setAuthHeader } from "./helpers/api";
import Routes from "./Routes";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const { token } = useStore((state) => state);
  setAuthHeader(token?.accessToken ?? "");
  return (
    <BrowserRouter>
      <CssBaseline />
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header />
        <Box sx={{ flexGrow: 1, display: "flex" }}>
          <Routes />
        </Box>
        <Footer />
      </Box>
    </BrowserRouter>
  );
}

export default App;
