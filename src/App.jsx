import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.jsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

// MUI theme that works alongside Tailwind CSS variables
const muiTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#9b5de5" },
    secondary: { main: "#8b4fd4" },
    background: { default: "transparent", paper: "transparent" },
    text: {
      primary: "#f0e6ff",
      secondary: "#a68dc4",
      disabled: "rgba(240,230,255,0.3)",
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: { body: { background: "transparent" } },
    },
  },
});

const App = () => (
  <ThemeProvider theme={muiTheme}>
    <CssBaseline />
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
