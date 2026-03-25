import { useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Box, Typography } from "@mui/material";
import confetti from "canvas-confetti";
import fincoreLogo from "@/assets/fincore-logo.png";

const CelebrationOverlay = ({ version, onComplete }) => {
  const fireConfetti = useCallback(() => {
    const purpleColors = ["#9b5de5", "#7c3aed", "#a78bfa", "#c4b5fd", "#FFFFFF"];

    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.5, x: 0.5 },
      colors: purpleColors,
      startVelocity: 45,
      gravity: 0.8,
      ticks: 200,
    });

    setTimeout(() => {
      confetti({ particleCount: 60, angle: 60, spread: 55, origin: { x: 0, y: 0.6 }, colors: purpleColors });
      confetti({ particleCount: 60, angle: 120, spread: 55, origin: { x: 1, y: 0.6 }, colors: purpleColors });
    }, 300);

    setTimeout(() => {
      confetti({ particleCount: 80, spread: 160, origin: { y: 0, x: 0.5 }, colors: purpleColors, startVelocity: 30, gravity: 1.2 });
    }, 800);
  }, []);

  useEffect(() => {
    fireConfetti();
    const timer = setTimeout(onComplete, 5000);
    return () => clearTimeout(timer);
  }, [fireConfetti, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-background"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Radial glow */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <Box
          sx={{
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "hsl(var(--primary) / 0.1)",
            filter: "blur(100px)",
          }}
        />
      </Box>

      <motion.div
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        <motion.img
          src={fincoreLogo}
          alt="Fin-core Logo"
          width={100}
          height={100}
          style={{ filter: "drop-shadow(0 0 30px hsl(271 91% 65% / 0.4))" }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{ textAlign: "center" }}
        >
          <Typography
            variant="h2"
            className="text-gradient-primary font-display"
            sx={{ fontWeight: 700, fontSize: { xs: "2.25rem", sm: "3.75rem" }, mb: 1.5 }}
          >
            We're Live!
          </Typography>
          <Typography variant="h6" sx={{ color: "text.secondary", fontWeight: 400 }}>
            Fin-core{" "}
            <Box component="span" sx={{ color: "hsl(var(--primary))", fontWeight: 600 }}>
              Version {version}
            </Box>{" "}
            is now in production
          </Typography>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          style={{
            width: 192,
            height: 1,
            background: "linear-gradient(to right, transparent, hsl(var(--primary)), transparent)",
            marginTop: 8,
          }}
        />

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
          <Typography variant="body2" sx={{ color: "text.secondary", mt: 2 }}>
            Redirecting to login...
          </Typography>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default CelebrationOverlay;
