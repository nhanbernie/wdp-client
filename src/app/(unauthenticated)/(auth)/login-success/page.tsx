"use client";
import { Suspense } from "react";
import LoginSuccessPage from "@/features/auth/login/LoginSuccessPage";

export const dynamic = "force-dynamic";

const LoginSuccess = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginSuccessPage />
    </Suspense>
  );
};

export default LoginSuccess;
