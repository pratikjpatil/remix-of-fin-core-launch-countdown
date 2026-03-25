import { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { Box, CircularProgress, Typography } from "@mui/material";
import { fetchLaunchData } from "@/services/launchApi";
import CountdownPage from "@/components/CountdownPage";
import CelebrationOverlay from "@/components/CelebrationOverlay";
import LoginScreen from "@/components/LoginScreen";

const Index = () => {
  const [phase, setPhase] = useState("loading");
  const [launchData, setLaunchData] = useState(null);
  const [targetDate, setTargetDate] = useState(null);

  useEffect(() => {
    fetchLaunchData()
      .then((data) => {
        setLaunchData(data);
        const target = new Date(`${data.prodDate}T${data.launchTime}Z`);
        setTargetDate(target);
        if (target.getTime() <= Date.now()) {
          setPhase("login");
        } else {
          setPhase("countdown");
        }
      })
      .catch((err) => {
        console.error("Failed to fetch launch data:", err);
        setPhase("login");
      });
  }, []);

  const handleCountdownComplete = useCallback(() => setPhase("celebration"), []);
  const handleCelebrationComplete = useCallback(() => setPhase("login"), []);

  if (phase === "loading") {
    return (
      <Box
        className="bg-background"
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <CircularProgress size={32} sx={{ color: "hsl(var(--primary))" }} />
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Initializing...
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {phase === "countdown" && targetDate && launchData && (
        <CountdownPage
          key="countdown"
          targetDate={targetDate}
          appName={launchData.appName}
          version={launchData.version}
          onCountdownComplete={handleCountdownComplete}
        />
      )}
      {phase === "celebration" && launchData && (
        <CelebrationOverlay
          key="celebration"
          version={launchData.version}
          onComplete={handleCelebrationComplete}
        />
      )}
      {phase === "login" && <LoginScreen key="login" />}
    </AnimatePresence>
  );
};

export default Index;
