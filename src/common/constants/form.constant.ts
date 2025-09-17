export interface IInputFieldProps {
  name: string;
  label?: string;
  type?: "text" | "password" | "email" | "number";
  placeholder?: string;
  className?: string;
}

// export const INPUT_FIELDS = (
//   type: 'register' | 'login' | 'forgotPassword' | 'verifyOTP' | 'resetPassword'
// ): IInputFieldProps[] => {
//   const commonFields = getCommonFields();

//   const fields: Record<
//     'register' | 'login' | 'forgotPassword' | 'verifyOTP' | 'resetPassword',
//     IInputFieldProps[]
//   > = {
//     register: [
//       {
//         label: i18n.t('auth.fields.username.label'),
//         name: 'username',
//         type: 'text',
//         placeholder: i18n.t('auth.fields.username.placeholder'),
//       },
//       ...commonFields,
//       {
//         label: i18n.t('auth.fields.confirmPassword.label'),
//         name: 'confirmPassword',
//         type: 'password',
//         placeholder: i18n.t('auth.fields.confirmPassword.placeholder'),
//       },
//     ],
//     login: [...commonFields],
//     forgotPassword: [
//       {
//         label: i18n.t('auth.fields.email.label'),
//         name: 'email',
//         type: 'email',
//         placeholder: i18n.t('auth.fields.email.placeholder'),
//       },
//     ],
//     verifyOTP: [
//       {
//         label: i18n.t('auth.fields.verificationCode.label'),
//         name: 'code',
//         type: 'number',
//         placeholder: i18n.t('auth.fields.verificationCode.placeholder'),
//       },
//     ],
//     resetPassword: [
//       {
//         label: i18n.t('auth.fields.newPassword.label'),
//         name: 'password',
//         type: 'password',
//         placeholder: i18n.t('auth.fields.newPassword.placeholder'),
//       },
//       {
//         label: i18n.t('auth.fields.confirmPassword.label'),
//         name: 'confirmPassword',
//         type: 'password',
//         placeholder: i18n.t('auth.fields.confirmPassword.placeholder'),
//       },
//     ],
//   };

//   return fields[type];
// };

export const INPUT_FIELDS = {
  login: [
    {
      name: "email",
      type: "email" as const,
      placeholder: "Nhập email của bạn",
      label: "Email",
    },
    {
      name: "password",
      type: "password" as const,
      placeholder: "Nhập mật khẩu",
      label: "Mật khẩu",
    },
  ],
  register: [
    {
      name: "fullName",
      type: "text" as const,
      placeholder: "Họ và tên",
      label: "Họ và tên",
    },
    {
      name: "email",
      type: "email" as const,
      placeholder: "Email",
      label: "Email",
    },
    {
      name: "password",
      type: "password" as const,
      placeholder: "Mật khẩu",
      label: "Mật khẩu",
    },
    {
      name: "confirmPassword",
      type: "password" as const,
      placeholder: "Xác nhận mật khẩu",
      label: "Xác nhận mật khẩu",
    },
  ],
  forgotPassword: [
    {
      name: "email",
      type: "email" as const,
      placeholder: "Email",
      label: "Email",
    },
  ],
  verifyOTP: [
    {
      name: "code",
      type: "text" as const,
      placeholder: "Nhập mã xác thực",
      label: "Mã xác thực",
    },
  ],
  resetPassword: [
    {
      name: "password",
      type: "password" as const,
      placeholder: "Mật khẩu mới",
      label: "Mật khẩu mới",
    },
    {
      name: "confirmPassword",
      type: "password" as const,
      placeholder: "Xác nhận mật khẩu",
      label: "Xác nhận mật khẩu",
    },
  ],
};

export const BUTTON_TITLES = {
  login: "Tiếp tục",
  register: "Đăng ký",
  forgotPassword: "Gửi liên kết đặt lại",
  verifyOTP: "Xác thực",
  resetPassword: "Đặt lại mật khẩu",
};
// const getButtonTitle = (type: string): string => {
//   const buttonKeys: Record<string, string> = {
//     login: "auth.login.button",
//     register: "auth.register.button",
//     forgotPassword: "auth.forgotPassword.button",
//     verifyOTP: "auth.verifyOtp.button",
//     resetPassword: "auth.resetPassword.button",
//   };

//   return i18n.t(buttonKeys[type]) || i18n.t("common.submit");
// };

// export const BUTTON_TITLE = (type: string): string => {
//   return getButtonTitle(type);
// };

// export const getProcessingText = (type: string): string => {
//   const processingKeys: Record<string, string> = {
//     login: "auth.login.processing",
//     register: "auth.register.processing",
//     forgotPassword: "auth.forgotPassword.processing",
//     verifyOTP: "auth.verifyOtp.processing",
//     resetPassword: "auth.resetPassword.processing",
//   };

//   return i18n.t(processingKeys[type]) || i18n.t("common.loading");
// };
