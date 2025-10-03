"use client";
import { useSearchParams } from "next/navigation";
import { useExchangeCodeMutation } from "@/redux";
import { useGoogleLoginSubmit } from "@/features/auth/login/hooks/useGoogleLoginSubmit";
import { useEffect } from "react";

const LoginSuccessPage = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  console.log("code: ", code);

  const { googleLogin, isLoading } = useGoogleLoginSubmit();

  useEffect(() => {
    const handleGoogleLogin = async () => {
      await googleLogin({
        authCode: code as string,
      });
    };
    handleGoogleLogin();
  }, [code]);

  return <div>Logging in...</div>;
};

export default LoginSuccessPage;
