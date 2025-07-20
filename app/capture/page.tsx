"use client";

import { useState, useRef } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Container,
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
    <Container sx={{ mt: 4, textAlign: "center" }}>
      <Typography variant="h4" color="primary" mb={2}>
        📸 Capture Photos
      </Typography>

      <Box display="flex" justifyContent="center" mb={2}>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          style={{
            width: "90%",
            maxWidth: "400px",
            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          }}
        />
      </Box>

      <Stack direction="row" spacing={2} justifyContent="center">
        <Button variant="contained" onClick={capturePhotos}>
          📷 Capture & Upload
        </Button>
        <Button variant="outlined" onClick={() => router.push("/")}>
          🏠 Back to PDFs
        </Button>
      </Stack>

      {countdown !== null && (
        <Typography
          variant="h1"
          color="error"
          sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        >
          {countdown}
        </Typography>
      )}
    </Container>
  );
}
