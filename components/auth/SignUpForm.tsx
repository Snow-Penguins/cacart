"use client";

import { useSignUpForm } from "@/hooks/auth/useSignUpForm";
import { useGoogleLogin } from "@/hooks/auth/useGoogleLogin";

import Image from "next/image";
import Link from "next/link";

// Logo Import
import logo from "../../public/logo/logo_150X60.png";
import googlelogo from "../../public/google_logo.png";

export default function SignUpForm() {
  const {
    userData,
    emailState,
    passwordState,
    confirmPasswordState,
    fieldType,
    touchType,

    valueUpdateHandler,
    formSubmitHandler,
  } = useSignUpForm();

  const handleLogin = useGoogleLogin();

  return (
    <div className="relative flex items-center justify-center h-screen bg-transparent">
      <div className="relative bg-transparent p-8 rounded-lg shadow-md border-2 border-gray-200 w-full max-w-sm">
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
                touchType.emailTouched
                  ? emailState.valid && !emailState.error
                    ? "focus:ring-green-dark border-green-dark"
                    : "focus:ring-red-dark border-red-dark"
                  : "focus:ring-blue-500 border-gray-300"
              }`}
            />
            <span
              className={`text-body-xsm block mt-0 h-2 ${emailState.error ? "text-red-dark" : "text-green-dark"}`}
            >
              {touchType.emailTouched
                ? emailState.error
                  ? emailState.error
                  : emailState.valid
                    ? "Valid Email format"
                    : ""
                : ""}
            </span>
          </div>

          <div className="relative">
            <p className="text-body-sm">
              Password <span className="text-red-dark">*</span>
            </p>
            <div className="relative">
              <input
                type={fieldType.password}
                name="password"
                placeholder="Password"
                value={userData.password}
                onChange={valueUpdateHandler}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 mt-1 ${
                  touchType.passwordTouched
                    ? passwordState.valid && !passwordState.error
                      ? "focus:ring-green-dark border-green-dark"
                      : "focus:ring-red-dark border-red-dark"
                    : "focus:ring-blue-500 border-gray-300"
                }`}
              />
            </div>

            <span
              className={`text-body-xsm block mt-0 h-2 ${passwordState.error ? "text-red-dark" : "text-green-dark"}`}
            >
              {touchType.passwordTouched
                ? passwordState.error
                  ? passwordState.error
                  : passwordState.valid
                    ? "Valid password"
                    : ""
                : ""}
            </span>
          </div>

          <div className="relative">
            <p className="text-body-sm">
              Confirm Password <span className="text-red-dark">*</span>
            </p>
            <div className="relative">
              <input
                type={fieldType.confirmPassword}
                name="confirmPassword"
                placeholder="Password"
                value={userData.confirmPassword}
                onChange={valueUpdateHandler}
                className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 mt-1 ${
                  touchType.confirmPasswordTouched
                    ? confirmPasswordState.valid && !confirmPasswordState.error
                      ? "focus:ring-green-dark border-green-dark"
                      : "focus:ring-red-dark border-red-dark"
                    : "focus:ring-blue-500 border-gray-300"
                }`}
              />
              <span
                className={`text-body-xsm block mt-0 h-2 ${confirmPasswordState.error ? "text-red-dark" : "text-green-dark"}`}
              >
                {touchType.confirmPasswordTouched
                  ? confirmPasswordState.error
                    ? confirmPasswordState.error
                    : confirmPasswordState.valid
                      ? "Passwords match"
                      : ""
                  : ""}
              </span>
            </div>
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
            onClick={handleLogin}
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
