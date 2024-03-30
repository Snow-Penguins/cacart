"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

// Logo Import
import logo from "../public/Cacart_logo.png";
import googlelogo from "../public/google_logo.png";

type FormInputs = {
  email: string;
  password: string;
};

export default function SignInForm() {
  // Set userData
  const userData = useRef<FormInputs>({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  //   Value update handler
  const valueUpdateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    userData.current = { ...userData.current, [name]: value };
  };

  //   Form submit handler
  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = userData.current;

    console.log(userData.current);
  };

  //   Error handle

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <Image src={logo} alt="Cacart Logo" width={160} height={40} />
        </div>

        <form className="space-y-7" onSubmit={formSubmitHandler}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={valueUpdateHandler}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={valueUpdateHandler}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

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
            className="flex items-center justify-center mt-8 w-full px-4 py-1 border-2 border-black bg-white text-black rounded-md hover:bg-gray-100"
          >
            <div className="mr-2 flex items-center justify-center">
              <Image src={googlelogo} alt="google_logo"></Image>
            </div>
            <p className="text-body-xsm text-center text-black">
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
              href="/sign-up"
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
