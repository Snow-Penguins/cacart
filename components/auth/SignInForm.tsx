"use client";
import { useSignInForm } from "@/hooks/auth/useSignInForm";

import Image from "next/image";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

// Logo Import
import logo from "../../public/logo/logo_150X60.png";

export default function SignInForm() {
  const {
    userData,
    emailState,
    passwordState,
    fieldType,
    togglePasswordVisibility,
    valueUpdateHandler,
    formSubmitHandler,
  } = useSignInForm();

  return (
    <div className="relative flex items-center justify-center h-screen bg-transparent">
      <div className="bg-transparent p-8 rounded-lg shadow-md border-2 border-gray-200 w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <Image src={logo} alt="Cacart Logo" width={160} height={40} />
        </div>

        <form className="space-y-7" onSubmit={formSubmitHandler}>
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={userData.email}
              onChange={valueUpdateHandler}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 mt-1
              ${emailState.error ? "border-red-dark focus:ring-red-dark" : "border-gray-300 focus:ring-blue-500"}`}
            />
            {emailState.error && (
              <span className="text-red-dark text-body-xsm absolute -bottom-5 left-0">
                {emailState.error}
              </span>
            )}
          </div>

          <div className="relative">
            <div className="relative">
              <input
                type={fieldType.password}
                name="password"
                placeholder="Password"
                value={userData.password}
                onChange={valueUpdateHandler}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 mt-1
                ${passwordState.error ? "border-red-dark focus:ring-red-dark" : "border-gray-300 focus:ring-blue-500"}`}
              />
              <button
                onClick={togglePasswordVisibility}
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                <span className="text-gray-500 sm:text-sm">
                  {fieldType.password === "password" ? (
                    <FaEye />
                  ) : (
                    <FaEyeSlash />
                  )}
                </span>
              </button>
            </div>

            {passwordState.error && (
              <span className="text-red-dark text-body-xsm absolute -bottom-5 left-0">
                {passwordState.error}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-600"
          >
            Sign In
          </button>
        </form>

        <div className="flex flex-col items-center justify-center mt-8">
          <Link
            href={"./forgot-password"}
            className="text-body-sm text-black dark:text-white hover:underline"
          >
            Forgot Password?
          </Link>
          <p className="text-sm text-secondary_text mt-2">
            Not a member yet?{" "}
            <Link
              href={"./register"}
              className="text-sm text-blue-500 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
