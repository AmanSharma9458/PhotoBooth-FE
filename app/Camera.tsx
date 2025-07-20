"use client";

import React, { useRef } from "react";
import Webcam from "react-webcam";

export default function Camera() {
  const webcamRef = useRef<Webcam>(null);

  return (
    <Webcam
      ref={webcamRef}
      audio={false}
      screenshotFormat="image/jpeg"
      style={{
        width: "100%",            // take full width of container
        maxWidth: "900px",        // but cap it at 600px
        height: "auto",           // auto height to preserve aspect
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
      }}
    />
  );
}
