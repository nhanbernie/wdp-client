"use client";

import React, { useState } from "react";
import FormProvider from "../FormProvider";
import { TextField } from "../../common/TextField";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";
import validatorSchema from "@/lib/authValidator";
import { INPUT_FIELDS, BUTTON_TITLES } from "@/constants/form.constant";
import { useTheme } from "@/contexts/ThemeContext";
import { GoogleLoginButton } from "@/features/auth/login/components";

export interface IAuthFormProps {
  type: "login" | "register" | "forgotPassword" | "verifyOTP" | "resetPassword";
  onSubmit?: (data: any, formMethods?: any) => void | Promise<void>;
  email?: string;
  token?: string;
}

const AuthForm = ({
  type,
  onSubmit: customOnSubmit,
  email,
  token,
}: IAuthFormProps) => {
  const router = useRouter();
  const { colors } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const defaultOnSubmit = (data: any) => {
    console.log("Form submitted:", data);
  };

  // Enhanced handleSubmit with validation
  const handleSubmit = async (data: any, formMethods?: any) => {
    setIsSubmitting(true);
    try {
      // Validate data using appropriate schema
      const schema = validatorSchema[type];
      await schema.validate(data, { abortEarly: false });

      // For verifyOTP, combine the email from props with the code from form
      if (type === "verifyOTP" && email) {
        await (customOnSubmit?.({ email, otp: data.code }) ||
          defaultOnSubmit(data));
      } else {
        // For other form types, pass data as is
        await (customOnSubmit?.(data) || defaultOnSubmit(data));
      }
    } catch (error: any) {
      if (error.name === "ValidationError" && formMethods?.setError) {
        // Set validation errors to respective fields
        error.inner?.forEach((err: any) => {
          if (err.path) {
            formMethods.setError(err.path, {
              type: "manual",
              message: err.message,
            });
          }
        });
      } else {
        console.error("Form submission error:", error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const AuthFormContent = () => {
    const { formState } = useFormContext();
    const { isValid } = formState;

    return (
      <div className="w-full">
        <div className="space-y-4 sm:space-y-5">
          {INPUT_FIELDS[type].map((field) => {
            return <TextField key={field.name} {...field} />;
          })}
        </div>

        {/* Display email when in verifyOTP mode */}
        {type === "verifyOTP" && email && (
          <div className="mt-3 sm:mt-4">
            <p className="text-gray-500 text-center text-xs sm:text-sm px-2 break-words">
              Mã đã được gửi đến {email}
            </p>
          </div>
        )}

        <div className="flex">
          {/* add checkbox for remember me */}
          {type === "login" && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-3 sm:gap-0">
              <button
                type="button"
                onClick={() => setRememberMe(!rememberMe)}
                className="flex items-center w-fit"
              >
                <div
                  className={cn(
                    "w-4 h-4 sm:w-5 sm:h-5 border rounded mr-2 flex items-center justify-center transition-colors shrink-0",
                    rememberMe ? "border-transparent" : "border-gray-300"
                  )}
                  style={{
                    backgroundColor: rememberMe ? colors.accent : "transparent",
                    borderColor: rememberMe ? colors.accent : colors.border,
                  }}
                >
                  {rememberMe && (
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full" />
                  )}
                </div>
                <span
                  className="text-xs sm:text-sm"
                  style={{ color: colors.textSecondary }}
                >
                  Ghi nhớ đăng nhập
                </span>
              </button>

              <div className="flex justify-start sm:justify-end">
                <button
                  type="button"
                  onClick={() => router.push("/forgot-password")}
                  className="text-xs sm:text-sm hover:opacity-80 transition-opacity"
                  style={{ color: colors.accent }}
                >
                  Quên mật khẩu?
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="mt-5 sm:mt-6">
          <button
            type="submit"
            className={cn(
              "w-full py-3 px-4 sm:py-4 sm:px-6 rounded-xl font-semibold text-sm sm:text-base transition-all duration-200 text-white shadow-lg hover:shadow-xl",
              isValid && !isSubmitting
                ? "hover:opacity-90 transform hover:scale-[1.02] active:scale-[0.98]"
                : "opacity-50 cursor-not-allowed"
            )}
            style={{
              background:
                isValid && !isSubmitting
                  ? `linear-gradient(135deg, ${colors.accent}, ${colors.accentSecondary})`
                  : colors.border,
            }}
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? "Đang xử lý..." : BUTTON_TITLES[type]}
          </button>
        </div>

        {/* Footer text for login */}
        {type === "login" && (
          <div className="mt-4 sm:mt-5 text-center px-2">
            <span className="text-xs sm:text-sm" style={{ color: colors.textSecondary }}>
              Chưa có tài khoản?{" "}
              <button
                type="button"
                onClick={() => router.push("/register")}
                className="font-medium hover:opacity-80 transition-opacity"
                style={{ color: colors.accent }}
              >
                Đăng ký
              </button>
            </span>
          </div>
        )}

        {/* Footer text for register */}
        {type === "register" && (
          <div className="mt-4 sm:mt-5 text-center px-2">
            <span className="text-xs sm:text-sm" style={{ color: colors.textSecondary }}>
              Đã có tài khoản?{" "}
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="font-medium hover:opacity-80 transition-opacity"
                style={{ color: colors.accent }}
              >
                Đăng nhập
              </button>
            </span>
          </div>
        )}

        {/* Footer text for forgot password */}
        {type === "forgotPassword" && (
          <div className="mt-4 sm:mt-5 text-center px-2">
            <span className="text-xs sm:text-sm" style={{ color: colors.textSecondary }}>
              Nhớ mật khẩu?{" "}
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="font-medium hover:opacity-80 transition-opacity"
                style={{ color: colors.accent }}
              >
                Đăng nhập
              </button>
            </span>
          </div>
        )}

        {(type === "login" || type === "register") && (
          <>
            <div className="text-xs sm:text-sm mt-5 sm:mt-6" style={{ color: colors.textSecondary }}>
              <div className="flex items-center gap-2 sm:gap-3 my-4 sm:my-5 px-2">
                <div
                  className="h-[1px] w-full"
                  style={{
                    backgroundColor: colors.textSecondary,
                    opacity: 0.3,
                  }}
                ></div>
                <p className="text-xs sm:text-sm whitespace-nowrap shrink-0">Hoặc</p>
                <div
                  className="h-[1px] w-full"
                  style={{
                    backgroundColor: colors.textSecondary,
                    opacity: 0.3,
                  }}
                ></div>
              </div>

              <div className="flex justify-center px-2">
                <GoogleLoginButton />
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <FormProvider
      onSubmit={handleSubmit}
      validationSchema={validatorSchema[type]}
      formType={type}
    >
      <AuthFormContent />
    </FormProvider>
  );
};

export default AuthForm;
