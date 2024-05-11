import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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
  const Backend_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

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
      const res = await fetch(`${Backend_URL}/users/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const successData = await res.json();
        console.log("Signin: ", successData.message);
        router.push("/");
      } else {
        const errorData = await res.json();
        console.log("Signin failed: ", errorData.message);
      }
    } catch (error) {
      console.log("Error during SignIn:", error);
    }
  };

  return {
    userData,
    emailState,
    passwordState,
    fieldType,

    valueUpdateHandler,
    formSubmitHandler,
  };
};
