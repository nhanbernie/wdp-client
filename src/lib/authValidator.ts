import * as Yup from "yup";

const AUTH_PASSWORD = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/;
const AUTH_CODE_VERIFICATION = /^[0-9]+$/;

// Error messages
const ERROR_MESSAGES = {
  requiredField: "Trường này là bắt buộc",
  invalidEmail: "Email không hợp lệ",
  passwordComplexity: "Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ hoa, số và ký tự đặc biệt",
  passwordTooShort: "Mật khẩu phải có ít nhất 6 ký tự",
  passwordsDoNotMatch: "Mật khẩu xác nhận không khớp",
  invalidCode: "Mã xác thực không hợp lệ",
};

const validatorSchema = {
  login: Yup.object().shape({
    email: Yup.string().email(ERROR_MESSAGES.invalidEmail).required(ERROR_MESSAGES.requiredField),
    password: Yup.string()
      .matches(AUTH_PASSWORD, ERROR_MESSAGES.passwordComplexity)
      .min(6, ERROR_MESSAGES.passwordTooShort)
      .required(ERROR_MESSAGES.requiredField),
  }),
  register: Yup.object().shape({
    fullName: Yup.string()
      .min(3, "Họ và tên phải có ít nhất 3 ký tự")
      .required(ERROR_MESSAGES.requiredField),
    email: Yup.string().email(ERROR_MESSAGES.invalidEmail).required(ERROR_MESSAGES.requiredField),
    password: Yup.string()
      .matches(AUTH_PASSWORD, ERROR_MESSAGES.passwordComplexity)
      .min(6, ERROR_MESSAGES.passwordTooShort)
      .required(ERROR_MESSAGES.requiredField),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], ERROR_MESSAGES.passwordsDoNotMatch)
      .required(ERROR_MESSAGES.requiredField),
  }),
  forgotPassword: Yup.object().shape({
    email: Yup.string().email(ERROR_MESSAGES.invalidEmail).required(ERROR_MESSAGES.requiredField),
  }),
  verifyOTP: Yup.object().shape({
    code: Yup.string()
      .length(6, ERROR_MESSAGES.invalidCode)
      .matches(AUTH_CODE_VERIFICATION, ERROR_MESSAGES.invalidCode)
      .required(ERROR_MESSAGES.requiredField),
  }),
  resetPassword: Yup.object().shape({
    password: Yup.string()
      .matches(AUTH_PASSWORD, ERROR_MESSAGES.passwordComplexity)
      .min(6, ERROR_MESSAGES.passwordTooShort)
      .required(ERROR_MESSAGES.requiredField),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], ERROR_MESSAGES.passwordsDoNotMatch)
      .required(ERROR_MESSAGES.requiredField),
  }),
  changePassword: Yup.object().shape({
    oldPassword: Yup.string()
      .required(ERROR_MESSAGES.requiredField)
      .min(6, ERROR_MESSAGES.passwordTooShort),
    newPassword: Yup.string()
      .required(ERROR_MESSAGES.requiredField)
      .min(6, ERROR_MESSAGES.passwordTooShort)
      .notOneOf([Yup.ref("oldPassword")], "Mật khẩu mới phải khác mật khẩu cũ"),
    confirmPassword: Yup.string()
      .required(ERROR_MESSAGES.requiredField)
      .oneOf([Yup.ref("newPassword")], ERROR_MESSAGES.passwordsDoNotMatch),
  }),
};

export default validatorSchema;
