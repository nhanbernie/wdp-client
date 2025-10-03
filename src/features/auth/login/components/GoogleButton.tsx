"use client";
import React from "react";
import { Button } from "@/components/ui/button";

export const GoogleLoginButton: React.FC = () => {
  const handleGoogleLogin = () => {
    // Redirect trực tiếp tới backend endpoint OAuth của bạn
    window.location.href = `${
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
    }/api/auth/google`;
  };

  return (
    <Button variant="default" color="primary" onClick={handleGoogleLogin}>
      Login with Google
    </Button>
  );
};
