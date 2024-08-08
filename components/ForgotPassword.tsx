"use client";

import Image from "next/image";
import { useState } from "react";
import { emailRegexPattern } from "../utils/regexPatterns";

// Logo Import
import logo from "../public/Cacart_logo.png";

// Image Import
import forgotPasswordImage from "../public/forgotPassword.png";
import dottedShapeImage from "../public/Dotted Shape.png";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Value update handler
  const valueUpdateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
  };

  const isEmailValid = (email: any) => {
    return emailRegexPattern.test(email);
  };

  // formSubmitHandler
  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      setEmailError("Please enter your email address.");
      return;
    }
    if (!isEmailValid(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/request-reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        },
      );

      if (response.ok) {
        setSuccessMessage("Password reset link has been sent to your email.");
        resetForm(false);
      } else {
        const data = await response.json();
        setErrorMessage(data.message || "Failed to send reset link.");
      }
    } catch (error) {
      console.error("Error sending reset link:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  const resetForm = (clearSuccessMessage = true) => {
    setEmailError("");
    setEmail("");
    if (clearSuccessMessage) {
      setSuccessMessage("");
    }
    setErrorMessage("");
  };

  const handleCancelClick = () => {
    window.location.href = "/";
  };

  return (
    <div className="relative flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white pt-0 pb-0 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-end p-1">
          <Image src={dottedShapeImage} alt="Dotted Shape Image" />
        </div>
        <div className="p-8 pt-2 pb-2">
          <div className="flex justify-center mb-2">
            <Image src={logo} alt="Cacart Logo" width={160} height={40} />
          </div>
          <div className="flex justify-center mb-2">
            <Image src={forgotPasswordImage} alt="Forgot Password Image" />
          </div>
          <form className="space-y-3" onSubmit={formSubmitHandler}>
            <h2 className="font-semibold text-center text-black text-lg">
              Forgot your password?
            </h2>
            <h6 className="text-center text-sm">
              Enter your email address, and we&apos;ll send you a link to reset
              your password.
            </h6>
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={email}
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
            {successMessage && (
              <p className="text-green-600 text-center">{successMessage}</p>
            )}
            {errorMessage && (
              <p className="text-red-600 text-center">{errorMessage}</p>
            )}
            <div className="flex justify-between pt-2">
              <button
                type="submit"
                className="w-1/2 px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-600"
              >
                Reset
              </button>
              <div className="w-6"></div>
              <button
                onClick={handleCancelClick}
                className="w-1/2 px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
        <div className="flex p-1">
          <Image src={dottedShapeImage} alt="Dotted Shape Image" />
        </div>
      </div>
    </div>
  );
}
