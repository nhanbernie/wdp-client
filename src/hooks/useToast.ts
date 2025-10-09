"use client";

import { toast } from "sonner";

export const useToast = () => {
  const showSuccess = (message: string, description?: string) => {
    toast.success(message, {
      description,
    });
  };

  const showError = (message: string, description?: string) => {
    toast.error(message, {
      description,
    });
  };

  const showWarning = (message: string, description?: string) => {
    toast.warning(message, {
      description,
    });
  };

  const showInfo = (message: string, description?: string) => {
    toast.info(message, {
      description,
    });
  };

  const showLoading = (message: string) => {
    return toast.loading(message);
  };

  const dismiss = (toastId?: string | number) => {
    toast.dismiss(toastId);
  };

  const dismissAll = () => {
    toast.dismiss();
  };

  return {
    success: showSuccess,
    error: showError,
    warning: showWarning,
    info: showInfo,
    loading: showLoading,
    dismiss,
    dismissAll,
  };
};
