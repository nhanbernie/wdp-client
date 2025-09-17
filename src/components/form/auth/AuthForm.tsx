"use client";

import React, { useState } from "react";
import FormProvider from "../FormProvider";
import { TextField } from "../../ui/TextField";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";
import validatorSchema from "@/lib/authValidator";
import { INPUT_FIELDS, BUTTON_TITLES } from "@/constants/form.constant";

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
        <div className="space-y-5">
          {INPUT_FIELDS[type].map((field) => {
            return <TextField key={field.name} {...field} />;
          })}
        </div>

        {/* Display email when in verifyOTP mode */}
        {type === "verifyOTP" && email && (
          <div className="mt-2">
            <p className="text-gray-500 text-center text-sm">
              Mã đã được gửi đến {email}
            </p>
          </div>
        )}

        <div className="flex">
          {/* add checkbox for remember me */}
          {type === "login" && (
            <div className="flex items-center justify-between w-full">
              <button
                type="button"
                onClick={() => setRememberMe(!rememberMe)}
                className="flex items-center"
              >
                <div
                  className={cn(
                    "w-5 h-5 border border-gray-300 rounded mr-2 flex items-center justify-center",
                    rememberMe && "bg-primary border-primary"
                  )}
                >
                  {rememberMe && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
                <span className="text-gray-700 text-sm">Ghi nhớ đăng nhập</span>
              </button>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => router.push("/forgot-password")}
                  className="text-primary hover:text-primary/80 text-sm"
                >
                  Quên mật khẩu?
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className={cn(
              "w-full py-4 px-6 rounded-xl font-semibold text-base transition-all duration-200",
              isValid && !isSubmitting
                ? "bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            )}
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? "Đang xử lý..." : BUTTON_TITLES[type]}
          </button>
        </div>

        {/* Footer text for login */}
        {type === "login" && (
          <div className="mt-4 text-center">
            <span className="text-gray-600 text-sm">
              Chưa có tài khoản?
              <button
                type="button"
                onClick={() => router.push("/register")}
                className="text-primary hover:text-primary/80 font-medium ml-1"
              >
                Đăng ký
              </button>
            </span>
          </div>
        )}

        {/* Footer text for register */}
        {type === "register" && (
          <div className="mt-4 text-center">
            <span className="text-gray-600 text-sm">
              Đã có tài khoản?
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="text-primary hover:text-primary/80 font-medium ml-1"
              >
                Đăng nhập
              </button>
            </span>
          </div>
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
