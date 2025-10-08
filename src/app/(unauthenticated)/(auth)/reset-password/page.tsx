"use client";

import { Suspense } from "react";
import { ResetPasswordPage } from "@/features/auth/reset-password";

function ResetPasswordContent() {
  return <ResetPasswordPage />;
}

export default function ResetPassword() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}
