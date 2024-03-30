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

export default function SignUpForm() {
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
    <div className="relative flex items-center justify-center h-screen bg-gray-100">
      <div className="relative bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <Image src={logo} alt="Cacart Logo" width={160} height={40} />
        </div>

        <form className="space-y-3" onSubmit={formSubmitHandler}>
          <p className="text-body-xsm">
            Email address <span className="text-red-dark">*</span>
          </p>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={valueUpdateHandler}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-body-xsm">
            Password <span className="text-red-dark">*</span>
          </p>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={valueUpdateHandler}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <p className="text-body-xsm">
            Confirm Password <span className="text-red-dark">*</span>
          </p>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={valueUpdateHandler}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-body-xsm">
            By Clicking Continue with Google, you agree to CaCart's{" "}
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
            className="flex items-center justify-center w-full px-4 py-1 border-2 border-black bg-white text-black rounded-md hover:bg-gray-100"
          >
            <div className="mr-2 flex items-center justify-center">
              <Image src={googlelogo} alt="google_logo"></Image>
            </div>
            <p className="text-body-xsm text-center text-black">
              Continue with Google
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
