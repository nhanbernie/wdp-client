"use client";
import { useSearchParams } from "next/navigation";
import { useGoogleLoginSubmit } from "@/features/auth/login/hooks/useGoogleLoginSubmit";
import { useEffect } from "react";

const LoginSuccessPage = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const { googleLogin, isLoading } = useGoogleLoginSubmit();

  useEffect(() => {
    const handleGoogleLogin = async () => {
      await googleLogin({
        authCode: code as string,
      });
    };
    handleGoogleLogin();
  }, [code]);

  return isLoading && <div>Logging in...</div>;
};

export default LoginSuccessPage;
