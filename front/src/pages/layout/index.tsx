import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";

import { Outlet } from "react-router-dom";

import Sidebar from "../../components/Sidebar";

export default function Layout() {
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        <Sidebar />
        <Outlet />
      </Box>
    </CssVarsProvider>
  );
}
