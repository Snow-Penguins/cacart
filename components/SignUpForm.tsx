"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// Logo Import
import logo from "../public/logo/logo_150X60.png";
import googlelogo from "../public/google_logo.png";

export default function SignUpForm() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // State configuration order:
  // 1. Error message
  // 2. Validity flag
  // 3. User interaction flag

  // **Email field state**
  const [emailError, setEmailError] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  // **Password field state**
  const [passwordError, setPasswordError] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  // **Confirm Password field state**
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

  // Checks the email validation with regex.
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
      setEmailError("");
      setEmailValid(false);
      setEmailTouched(false);
      return;
    }

    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format.");
      setEmailValid(false);
      setPasswordTouched(true);
    } else {
      setEmailError("");
      setEmailValid(true);
      setPasswordTouched(true);
    }
  };

  // Checks the password validation.
  const validatePassword = (password: string) => {
    if (password === "") {
      setPasswordError("");
      setPasswordValid(false);
      setPasswordTouched(false);
      return;
    }

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      setPasswordValid(false);
      setPasswordTouched(true);
      return;
    }

    if (!/\d/.test(password) || !/[A-Za-z]/.test(password)) {
      setPasswordError("Password must include both letters and numbers");
      setPasswordValid(false);
      setPasswordTouched(true);
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must include at least one uppercase letter.");
      setPasswordValid(false);
      setPasswordTouched(true);
      return;
    }

    if (/(\w)\1\1/.test(password)) {
      setPasswordError(
        "Password cannot contain three consecutive identical characters.",
      );
      setPasswordValid(false);
      setPasswordTouched(true);
      return;
    }

    if (
      !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?~]/.test(password) ||
      /['";\/\\]/.test(password)
    ) {
      setPasswordError("Password must include at least one special character.");
      setPasswordValid(false);
      setPasswordTouched(true);
      return;
    }

    setPasswordError("");
    setPasswordValid(true);
    setPasswordTouched(true);
  };

  // Checks if the confirm password matches the original password.
  const validateConfirmPassword = (
    password: string,
    confirmPassword: string,
  ) => {
    if (confirmPassword === "") {
      setConfirmPasswordError("");
      setConfirmPasswordValid(false);
      setConfirmPasswordTouched(false);
      return;
    }

    if (!password) {
      setConfirmPasswordError("Password is required.");
      setConfirmPasswordValid(false);
      setConfirmPasswordTouched(true);
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Password do not match.");
      setConfirmPasswordValid(false);
      setConfirmPasswordTouched(true);
    } else {
      setConfirmPasswordError("");
      setConfirmPasswordValid(true);
      setConfirmPasswordTouched(true);
    }
  };

  // Value update handler
  const valueUpdateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "email") {
      setEmailTouched(true);
      validateEmail(value);
    }

    if (name === "password") {
      setPasswordTouched(true);
      validatePassword(value);
    }

    if (name === "confirmPassword") {
      setConfirmPasswordTouched(true);
      validateConfirmPassword(userData.password, value);
    }
  };

  useEffect(() => {
    if (emailTouched) {
      validateEmail(userData.email);
    }
    if (passwordTouched) {
      validatePassword(userData.password);
    }
    if (confirmPasswordTouched) {
      validateConfirmPassword(userData.password, userData.confirmPassword);
    }
  }, [userData]);

  // Form submit handler
  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isEmailEmpty = !userData.email;
    const isPasswordEmpty = !userData.password;
    const isConfirmPasswordEmpty = !userData.confirmPassword;

    setEmailTouched(true);
    setPasswordTouched(true);
    setConfirmPasswordTouched(true);

    if (isEmailEmpty) setEmailError("This field is required.");
    if (isPasswordEmpty) setPasswordError("This field is required.");
    if (isConfirmPasswordEmpty)
      setConfirmPasswordError("This field is required.");

    if (
      !isEmailEmpty &&
      !isPasswordEmpty &&
      !isConfirmPasswordEmpty &&
      emailValid &&
      passwordValid &&
      confirmPasswordValid
    ) {
      console.log(userData);
      resetForm();
    }
  };

  const resetForm = () => {
    setUserData({ email: "", password: "", confirmPassword: "" });
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setEmailValid(false);
    setPasswordValid(false);
    setConfirmPasswordValid(false);
    setEmailTouched(false);
    setPasswordTouched(false);
    setConfirmPasswordTouched(false);
  };

  return (
    <div className="relative flex items-center justify-center h-screen bg-gray-100">
      <div className="relative bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <Image src={logo} alt="Cacart Logo" width={160} height={40} />
        </div>

        <form className="space-y-7" onSubmit={formSubmitHandler}>
          <div className="relative">
            <span className="text-body-sm">
              Email address <span className="text-red-dark">*</span>
            </span>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={userData.email}
              onChange={valueUpdateHandler}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 mt-1 ${
                emailTouched
                  ? emailValid && !emailError
                    ? "focus:ring-green-dark border-green-dark"
                    : "focus:ring-red-dark border-red-dark"
                  : "focus:ring-blue-500 border-gray-300"
              }`}
            />
            <span
              className={`text-body-xsm block mt-0 h-2 ${emailError ? "text-red-dark" : "text-green-dark"}`}
            >
              {emailTouched
                ? emailError
                  ? emailError
                  : emailValid
                    ? "Valid Email format"
                    : ""
                : ""}
            </span>
          </div>

          <div className="relative">
            <p className="text-body-sm">
              Password <span className="text-red-dark">*</span>
            </p>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={userData.password}
              onChange={valueUpdateHandler}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 mt-1 ${
                passwordTouched
                  ? passwordValid && !passwordError
                    ? "focus:ring-green-dark border-green-dark"
                    : "focus:ring-red-dark border-red-dark"
                  : "focus:ring-blue-500 border-gray-300"
              }`}
            />
            <span
              className={`text-body-xsm block mt-0 h-2 ${passwordError ? "text-red-dark" : "text-green-dark"}`}
            >
              {passwordTouched
                ? passwordError
                  ? passwordError
                  : passwordValid
                    ? "Valid password"
                    : ""
                : ""}
            </span>
          </div>

          <div className="relative">
            <p className="text-body-sm">
              Confirm Password <span className="text-red-dark">*</span>
            </p>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Password"
              value={userData.confirmPassword}
              onChange={valueUpdateHandler}
              className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 mt-1 ${
                confirmPasswordTouched
                  ? confirmPasswordValid && !confirmPasswordError
                    ? "focus:ring-green-dark border-green-dark"
                    : "focus:ring-red-dark border-red-dark"
                  : "focus:ring-blue-500 border-gray-300"
              }`}
            />
            <span
              className={`text-body-xsm block mt-0 h-2 ${confirmPasswordError ? "text-red-dark" : "text-green-dark"}`}
            >
              {confirmPasswordTouched
                ? confirmPasswordError
                  ? confirmPasswordError
                  : confirmPasswordValid
                    ? "Passwords match"
                    : ""
                : ""}
            </span>
          </div>

          <p className="text-body-xsm">
            By Clicking Continue with Google, you agree to CaCart`s{" "}
            <span className="text-blue-500 underline">Terms of Use</span> and{" "}
            <span className="text-blue-500 underline">Privacy Policy</span>.
          </p>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-600"
          >
            Register
          </button>
        </form>

        <div className="flex items-center justify-between mt-2 mb-2">
          <span className="border-b border-stroke w-[43%] lg:w-[28%]" />
          <span className="text-body-sm text-center text-secondary_text">
            OR
          </span>
          <span className="border-b border-stroke w-[43%] lg:w-[28%]" />
        </div>

        <div>
          <button
            type="button"
            className="flex items-center justify-center w-full px-4 py-2 border-2 border-black bg-white text-black rounded-md hover:bg-gray-100"
          >
            <div className="mr-2 flex items-center justify-center">
              <Image src={googlelogo} alt="google_logo"></Image>
            </div>
            <p className="text-body-sm text-center text-black">
              Continue with Google
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
