"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// Logo Import
import logo from "../public/Cacart_logo.png";
import googlelogo from "../public/google_logo.png";

export default function SignInForm() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState("");
  const [emailValid, setEmailValid] = useState(false);

  const [passwordError, setPasswordError] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);

  const validateEmail = (email: string) => {
    // Checks if the input email exists in the user table, returns true if it does, false otherwise.
  };

  const validatePassword = (password: string) => {
    // Checks if the input password matches the encrypted password in the user table, returns true if it matches, false otherwise.
  };

  //   Value update handler
  const valueUpdateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  //   Form submit handler
  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isEmailEmpty = !userData.email;
    const isPasswordEmpty = !userData.password;

    if (isEmailEmpty) setEmailError("This field is required.");
    if (isPasswordEmpty) setPasswordError("This field is required.");

    if (!isEmailEmpty && !isPasswordEmpty && emailValid && passwordValid) {
      console.log(userData);
      resetForm();
    }
  };

  const resetForm = () => {
    setUserData({ email: "", password: "" });
    setEmailError("");
    setPasswordError("");
  };

  return (
    <div className="relative flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
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
        ${emailError ? "border-red-dark focus:ring-red-dark" : "border-gray-300 focus:ring-blue-500"}`}
            />
            {emailError && (
              <span className="text-red-dark text-body-xsm absolute -bottom-5 left-0">
                {emailError}
              </span>
            )}
          </div>

          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={userData.password}
              onChange={valueUpdateHandler}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 mt-1
        ${passwordError ? "border-red-dark focus:ring-red-dark" : "border-gray-300 focus:ring-blue-500"}`}
            />
            {passwordError && (
              <span className="text-red-dark text-body-xsm absolute -bottom-5 left-0">
                {passwordError}
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

        <div className="flex items-center justify-between mt-8">
          <span className="border-b border-stroke w-[33%] lg:w-[28%]" />
          <span className="text-body-sm text-center text-secondary_text">
            Connect With
          </span>
          <span className="border-b border-stroke w-[33%] lg:w-[28%]" />
        </div>

        <div>
          <button
            type="button"
            className="flex items-center justify-center mt-8 w-full px-4 py-2 border-2 border-black bg-white text-black rounded-md hover:bg-gray-100"
          >
            <div className="mr-2 flex items-center justify-center">
              <Image src={googlelogo} alt="google_logo"></Image>
            </div>
            <p className="text-body-sm text-center text-black">
              Continue with Google
            </p>
          </button>
        </div>

        <div className="flex flex-col items-center justify-center mt-8">
          <Link
            href="/forgot-password"
            className="text-body-sm text-black hover:underline"
          >
            Forget Password?
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
