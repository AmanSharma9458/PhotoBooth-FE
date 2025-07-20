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
      className="webcam"
    />
  );
}
