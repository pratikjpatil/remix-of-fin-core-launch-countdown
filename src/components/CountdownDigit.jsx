import { motion, AnimatePresence } from "framer-motion";
import { Box, Typography } from "@mui/material";

const CountdownDigit = ({ value, label }) => {
  const display = String(value).padStart(2, "0");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
      <Box sx={{ display: "flex", gap: 0.75 }}>
        {display.split("").map((digit, i) => (
          <Box
            key={`${label}-${i}`}
            className="countdown-digit"
            sx={{
              borderRadius: 2,
              width: { xs: 56, sm: 80 },
              height: { xs: 80, sm: 112 },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <AnimatePresence mode="popLayout">
              <motion.span
                key={`${digit}-${label}-${i}`}
                initial={{ rotateX: 90, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                exit={{ rotateX: -90, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="text-gradient-primary font-display"
                style={{
                  fontSize: "clamp(1.875rem, 5vw, 3rem)",
                  fontWeight: 700,
                  perspective: "200px",
                }}
              >
                {digit}
              </motion.span>
            </AnimatePresence>
            {/* Center line divider */}
            <Box
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                top: "50%",
                height: "1px",
                bgcolor: "divider",
                opacity: 0.3,
              }}
            />
          </Box>
        ))}
      </Box>
      <Typography
        variant="caption"
        sx={{
          fontWeight: 500,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "text.secondary",
          fontSize: { xs: "0.65rem", sm: "0.75rem" },
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

export default CountdownDigit;
