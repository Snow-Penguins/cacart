"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../public/Cacart_logo.png";
import dottedShapeImage from "../public/Dotted Shape.png";

interface ResetPasswordProps {
  token: string;
}

export default function ResetPassword({ token }: ResetPasswordProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/auth/validate-token/${token}`,
        );
        if (!response.ok) {
          throw new Error("Invalid or expired token");
        }
      } catch (error) {
        setErrorMessage(
          "Invalid or expired token. Please request a new password reset.",
        );
      }
    };
    validateToken();
  }, [token]);

  const valueUpdateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!password) {
      setPasswordError("Please enter your new password.");
      return;
    }
    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your new password.");
      return;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to reset password");
      }

      setSuccessMessage("Password reset successful!");
      setErrorMessage("");
      resetForm();

      setTimeout(() => {
        router.push("/auth/signin");
      }, 2000);
    } catch (error) {
      setErrorMessage("Error resetting password. Please try again.");
      setSuccessMessage("");
    }
  };

  const resetForm = () => {
    setPasswordError("");
    setConfirmPasswordError("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleCancelClick = () => {
    router.push("/");
  };

  return (
    <div className="relative flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white pt-0 pb-0 rounded-lg w-full max-w-md">
        <div className="flex justify-end p-2">
          <Image src={dottedShapeImage} alt="Dotted Shape Image" />
        </div>
        <div className="p-10 pt-2 pb-2">
          <div className="flex justify-center mb-4">
            <Image src={logo} alt="Cacart Logo" width={160} height={40} />
          </div>
          {errorMessage && (
            <div className="text-red-500 text-center">{errorMessage}</div>
          )}
          {!errorMessage && (
            <form className="space-y-6" onSubmit={formSubmitHandler}>
              <h2 className="font-semibold text-center text-black text-lg">
                Reset your password
              </h2>
              <h6 className="text-center text-sm">
                What would you like your new password to be.
              </h6>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={valueUpdateHandler}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 mt-2
        ${passwordError ? "border-red-dark focus:ring-red-dark" : "border-gray-300 focus:ring-blue-500"}`}
                />
                <button
                  onClick={togglePasswordVisibility}
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  style={{ top: "10%" }}
                >
                  <span className="text-gray-500 sm:text-sm">
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </button>
                {passwordError && (
                  <span className="text-red-dark text-body-xsm absolute -bottom-5 left-0">
                    {passwordError}
                  </span>
                )}
              </div>
              <div className="relative">
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={valueUpdateHandler}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 mt-2
        ${confirmPasswordError ? "border-red-dark focus:ring-red-dark" : "border-gray-300 focus:ring-blue-500"}`}
                />
                <button
                  onClick={toggleConfirmPasswordVisibility}
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  style={{ top: "10%" }}
                >
                  <span className="text-gray-500 sm:text-sm">
                    {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </button>
                {confirmPasswordError && (
                  <span className="text-red-dark text-body-xsm absolute -bottom-5 left-0">
                    {confirmPasswordError}
                  </span>
                )}
              </div>
              {successMessage && (
                <div className="text-green-500 text-center">
                  {successMessage}
                </div>
              )}
              <div className="flex justify-between pt-4">
                <button
                  type="submit"
                  className="w-1/2 px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-600"
                >
                  Save
                </button>
                <div className="w-6"></div>
                <button
                  type="button"
                  onClick={handleCancelClick}
                  className="w-1/2 px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
        <div className="flex p-2">
          <Image src={dottedShapeImage} alt="Dotted Shape Image" />
        </div>
      </div>
    </div>
  );
}
