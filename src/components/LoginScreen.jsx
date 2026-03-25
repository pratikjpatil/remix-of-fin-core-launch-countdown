import { useState } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Link,
} from "@mui/material";
import { Person, Lock, ArrowForward } from "@mui/icons-material";
import fincoreLogo from "@/assets/fincore-logo.png";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Integrate actual login API
    console.log("Login attempt:", { username });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-background"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient background */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "hsl(var(--primary) / 0.05)",
          filter: "blur(120px)",
          transform: "translate(33%, -50%)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "hsl(var(--primary) / 0.03)",
          filter: "blur(100px)",
          transform: "translate(-33%, 50%)",
        }}
      />

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: 448, margin: "0 16px" }}
      >
        <Box
          className="glass-card glow-primary"
          sx={{ borderRadius: 4, p: { xs: 4, sm: 5 } }}
        >
          {/* Header */}
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 4 }}>
            <Box component="img" src={fincoreLogo} alt="Fin-core" sx={{ width: 64, height: 64, mb: 2 }} />
            <Typography
              variant="h5"
              className="text-gradient-primary font-display"
              sx={{ fontWeight: 700 }}
            >
              Fin-core
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
              Secure Banking Platform
            </Typography>
          </Box>

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <TextField
              fullWidth
              size="small"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person sx={{ fontSize: 18, color: "text.secondary" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "hsl(var(--secondary) / 0.5)",
                  borderRadius: 2,
                  "& fieldset": { borderColor: "hsl(var(--border) / 0.5)" },
                  "&:hover fieldset": { borderColor: "hsl(var(--primary))" },
                  "&.Mui-focused fieldset": { borderColor: "hsl(var(--primary))" },
                },
                "& .MuiInputLabel-root": { color: "text.secondary" },
                "& .MuiInputBase-input": { color: "hsl(var(--foreground))" },
              }}
            />

            <TextField
              fullWidth
              size="small"
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ fontSize: 18, color: "text.secondary" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "hsl(var(--secondary) / 0.5)",
                  borderRadius: 2,
                  "& fieldset": { borderColor: "hsl(var(--border) / 0.5)" },
                  "&:hover fieldset": { borderColor: "hsl(var(--primary))" },
                  "&.Mui-focused fieldset": { borderColor: "hsl(var(--primary))" },
                },
                "& .MuiInputLabel-root": { color: "text.secondary" },
                "& .MuiInputBase-input": { color: "hsl(var(--foreground))" },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              endIcon={<ArrowForward />}
              sx={{
                bgcolor: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
                fontWeight: 600,
                height: 44,
                borderRadius: 2,
                textTransform: "none",
                fontSize: "0.95rem",
                "&:hover": { bgcolor: "hsl(var(--primary) / 0.9)" },
              }}
            >
              Sign In
            </Button>
          </Box>

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Link
              href="#"
              underline="hover"
              sx={{ fontSize: "0.75rem", color: "text.secondary", "&:hover": { color: "hsl(var(--primary))" } }}
            >
              Forgot password?
            </Link>
          </Box>
        </Box>

        <Typography variant="caption" sx={{ display: "block", textAlign: "center", color: "text.disabled", mt: 3 }}>
          © 2026 Fin-core Banking Platform. All rights reserved.
        </Typography>
      </motion.div>
    </motion.div>
  );
};

export default LoginScreen;
