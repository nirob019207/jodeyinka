// components/SquareScript.tsx

"use client";

import React, { useEffect } from "react";

const SquareScript: React.FC = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.squareup.com/v2/paymentform";
    script.onload = () => {
      console.log("Square Payments SDK loaded successfully");
    };

    script.onerror = (e) => {
      console.error("Error loading Square Payments SDK", e);
    };

    document.head.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default SquareScript;
