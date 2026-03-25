import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Box, Typography, CircularProgress } from "@mui/material";
import fincoreLogo from "@/assets/fincore-logo.png";
import CountdownDigit from "./CountdownDigit";

const CountdownPage = ({ targetDate, appName, version, onCountdownComplete }) => {
  const calcTimeLeft = useCallback(() => {
    const diff = targetDate.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calcTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => {
      const t = calcTimeLeft();
      setTimeLeft(t);
      if (t.days === 0 && t.hours === 0 && t.minutes === 0 && t.seconds === 0) {
        clearInterval(interval);
        onCountdownComplete();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [calcTimeLeft, onCountdownComplete]);

  const totalSecondsLeft =
    timeLeft.days * 86400 + timeLeft.hours * 3600 + timeLeft.minutes * 60 + timeLeft.seconds;
  const progressWidth = Math.max(0, Math.min(100, 100 - (totalSecondsLeft / 86400) * 100));

  return (
    <Box
      className="bg-background"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient background effects */}
      <Box sx={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <Box
          sx={{
            position: "absolute",
            top: "25%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 800,
            height: 400,
            borderRadius: "50%",
            background: "hsl(var(--primary) / 0.05)",
            filter: "blur(140px)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: "25%",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "hsl(var(--primary) / 0.03)",
            filter: "blur(80px)",
          }}
        />
      </Box>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: "hsl(var(--primary) / 0.3)",
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
          padding: "0 16px",
        }}
      >
        {/* Logo + Title */}
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <motion.img
            src={fincoreLogo}
            alt={`${appName} Logo`}
            width={80}
            height={80}
            className="animate-float"
            style={{ filter: "drop-shadow(0 0 20px hsl(271 91% 65% / 0.3))" }}
          />
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h3"
              className="text-gradient-primary font-display"
              sx={{ fontWeight: 700, fontSize: { xs: "1.875rem", sm: "2.25rem" } }}
            >
              {appName}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5, letterSpacing: 1 }}>
              Version {version} • Production Launch
            </Typography>
          </Box>
        </Box>

        {/* Going Live label */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Box
            className="glass-card"
            sx={{
              borderRadius: 50,
              px: 3,
              py: 1,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Box
              className="animate-pulse-primary"
              sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "hsl(var(--primary))" }}
            />
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, color: "text.secondary", letterSpacing: 1 }}
            >
              Going Live In
            </Typography>
          </Box>
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{ display: "flex", alignItems: "center", gap: "clamp(12px, 3vw, 24px)" }}
        >
          <CountdownDigit value={timeLeft.days} label="Days" />
          <Typography
            className="text-gradient-primary font-display"
            sx={{ fontSize: { xs: "1.5rem", sm: "2.25rem" }, fontWeight: 700, mb: 3 }}
          >
            :
          </Typography>
          <CountdownDigit value={timeLeft.hours} label="Hours" />
          <Typography
            className="text-gradient-primary font-display"
            sx={{ fontSize: { xs: "1.5rem", sm: "2.25rem" }, fontWeight: 700, mb: 3 }}
          >
            :
          </Typography>
          <CountdownDigit value={timeLeft.minutes} label="Minutes" />
          <Typography
            className="text-gradient-primary font-display"
            sx={{ fontSize: { xs: "1.5rem", sm: "2.25rem" }, fontWeight: 700, mb: 3 }}
          >
            :
          </Typography>
          <CountdownDigit value={timeLeft.seconds} label="Seconds" />
        </motion.div>

        {/* Progress bar */}
        <Box sx={{ width: "100%", maxWidth: 400 }}>
          <Box
            sx={{
              height: 4,
              borderRadius: 2,
              bgcolor: "hsl(var(--secondary))",
              overflow: "hidden",
            }}
          >
            <motion.div
              style={{
                height: "100%",
                borderRadius: 8,
                background: "linear-gradient(to right, hsl(var(--secondary)), hsl(var(--primary)), hsl(var(--purple-glow)))",
              }}
              initial={{ width: 0 }}
              animate={{ width: `${progressWidth}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </Box>
          <Typography
            variant="caption"
            sx={{ display: "block", textAlign: "center", mt: 1, color: "text.secondary" }}
          >
            Preparing systems for launch...
          </Typography>
        </Box>

        {/* Loading indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{ display: "flex", alignItems: "center", gap: 8 }}
        >
          <CircularProgress size={14} sx={{ color: "text.secondary" }} />
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            All systems operational
          </Typography>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <Box sx={{ position: "absolute", bottom: 24, textAlign: "center" }}>
        <Typography variant="caption" sx={{ color: "text.disabled" }}>
          © 2026 Fin-core Banking Platform
        </Typography>
      </Box>
    </Box>
  );
};

export default CountdownPage;
