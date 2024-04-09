import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Backend_URL } from "@/lib/Constants";

interface UserData {
  email: string;
  password: string;
}

interface ValidationState {
  error?: string;
  valid?: boolean;
}

interface FieldType {
  password?: string;
}

export const useSignInForm = () => {
  const [userData, setUserData] = useState<UserData>({
    email: "",
    password: "",
  });

  const [emailState, setEmailState] = useState<ValidationState>({
    error: "",
    valid: false,
  });

  const [passwordState, setPasswordState] = useState<ValidationState>({
    error: "",
    valid: false,
  });

  const [fieldType, setFieldType] = useState<FieldType>({
    password: "password",
  });

  const router = useRouter();

  const togglePasswordVisibility = () => {
    setFieldType((prevTypes) => ({
      ...prevTypes,
      password: prevTypes.password === "password" ? "text" : "password",
    }));
  };

  const valueUpdateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = userData;

    if (!email || !password) {
      if (!email)
        setEmailState({ error: "This field is required.", valid: false });
      if (!password)
        setPasswordState({ error: "This field is required.", valid: false });
      return;
    }

    try {
      const res = await fetch(Backend_URL + "/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (res.ok) {
        router.push("/");
      } else {
        console.log("Signin failed");
      }
    } catch (error) {
      console.log("Error during SignIn.");
    }
    resetForm();
  };

  const resetForm = () => {
    setUserData({ email: "", password: "" });
    setEmailState({ error: "", valid: false });
    setPasswordState({ error: "", valid: false });
  };

  return {
    userData,
    emailState,
    passwordState,
    fieldType,

    togglePasswordVisibility,
    valueUpdateHandler,
    formSubmitHandler,
  };
};