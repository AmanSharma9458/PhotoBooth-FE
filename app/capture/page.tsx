"use client";

import { useState, useRef } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";

export default function CapturePage() {
  const [countdown, setCountdown] = useState<number | null>(null);
  const webcamRef = useRef<Webcam>(null);
  const router = useRouter();

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const capturePhotos = async () => {
    await startCountdown();

    let imgs: string[] = [];
    for (let i = 0; i < 3; i++) {
      const imageSrc = webcamRef.current?.getScreenshot();
      if (imageSrc) imgs.push(imageSrc);
      await delay(500);
    }
    uploadPhotos(imgs);
  };

  const startCountdown = async () => {
    for (let i = 3; i >= 1; i--) {
      setCountdown(i);
      await delay(1000);
    }
    setCountdown(null);
  };

  const uploadPhotos = async (imgs: string[]) => {
    const formData = new FormData();
    for (let i = 0; i < imgs.length; i++) {
      const res = await fetch(imgs[i]);
      const blob = await res.blob();
      formData.append("photos", blob, `photo${i}.jpg`);
    }
    await axios.post("http://localhost:8080/upload", formData);
    alert("Uploaded!");
    router.push("/");
  };

  return (
    <Box
      sx={{
        bgcolor: "linear-gradient(to right, #e0f7fa, #e1bee7)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        py: 4,
      }}
    >
      <Typography variant="h4" color="primary" mb={3} fontWeight={600}>
        📸 Capture Photos
      </Typography>

      <Box
        sx={{
          bgcolor: "#fff",
          p: 2,
          borderRadius: 4,
          boxShadow: 3,
          mb: 3,
        }}
      >
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          style={{
            width: "100%",
            maxWidth: "800px",
            height: "auto",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
        />
      </Box>

      <Stack direction="row" spacing={2} justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={capturePhotos}
        >
          📷 Capture & Upload
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          size="large"
          onClick={() => router.push("/")}
        >
          🏠 Back to PDFs
        </Button>
      </Stack>

      {countdown !== null && (
        <Typography
          variant="h1"
          color="error"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
            fontSize: { xs: "4rem", md: "8rem" },
          }}
        >
          {countdown}
        </Typography>
      )}
    </Box>
  );
}
