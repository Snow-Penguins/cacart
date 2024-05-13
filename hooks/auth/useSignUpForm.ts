import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface UserData {
  email: string;
  password: string;
  confirmPassword: string;
}

interface ValidationState {
  error?: string;
  valid?: boolean;
}

interface FieldType {
  password?: string;
  confirmPassword?: string;
}

interface TouchType {
  emailTouched?: boolean;
  passwordTouched?: boolean;
  confirmPasswordTouched?: boolean;
}

export const useSignUpForm = () => {
  const Backend_URL = process.env.NEXT_PUBLIC_API_URL;

  const [userData, setUserData] = useState<UserData>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [emailState, setEmailState] = useState<ValidationState>({
    error: "",
    valid: false,
  });

  const [passwordState, setPasswordState] = useState<ValidationState>({
    error: "",
    valid: false,
  });

  const [confirmPasswordState, setConfirmPasswordState] =
    useState<ValidationState>({
      error: "",
      valid: false,
    });

  const [fieldType, setFieldType] = useState<FieldType>({
    password: "password",
    confirmPassword: "password",
  });

  const [touchType, setTouchType] = useState<TouchType>({
    emailTouched: false,
    passwordTouched: false,
    confirmPasswordTouched: false,
  });

  const router = useRouter();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
      setEmailState({ error: "", valid: false });
      setTouchType((prevState) => ({
        ...prevState,
        emailTouched: false,
      }));
      return;
    }

    if (!emailRegex.test(email)) {
      setEmailState({ error: "Invalid email format.", valid: false });
      setTouchType((prevState) => ({
        ...prevState,
        emailTouched: true,
      }));
      return;
    } else {
      setEmailState({ error: "", valid: true });
      setTouchType((prevState) => ({
        ...prevState,
        emailTouched: true,
      }));
      return;
    }
  };

  const validatePassword = (password: string) => {
    if (password === "") {
      setPasswordState({ error: "", valid: false });
      setTouchType((prevState) => ({
        ...prevState,
        passwordTouched: false,
      }));
      return;
    } else if (password.length < 8) {
      setPasswordState({
        error: "Password must be at least 8 characters long.",
        valid: false,
      });
      setTouchType((prevState) => ({
        ...prevState,
        passwordTouched: true,
      }));
      return;
    } else if (!/\d/.test(password) || !/[A-Za-z]/.test(password)) {
      setPasswordState({
        error: "Password must include both letters and numbers.",
        valid: false,
      });
      setTouchType((prevState) => ({
        ...prevState,
        passwordTouched: true,
      }));
      return;
    } else if (!/[A-Z]/.test(password)) {
      setPasswordState({
        error: "Password must include at least one uppercase letter.",
        valid: false,
      });
      setTouchType((prevState) => ({
        ...prevState,
        passwordTouched: true,
      }));
      return;
    } else if (/(\w)\1\1/.test(password)) {
      setPasswordState({
        error:
          "Password cannot contain three consecutive identical characters.",
        valid: false,
      });
      setTouchType((prevState) => ({
        ...prevState,
        passwordTouched: true,
      }));
      return;
    } else if (
      !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?~]/.test(password) ||
      /['";\/\\]/.test(password)
    ) {
      setPasswordState({
        error: "Password must include at least one special character.",
        valid: false,
      });
      setTouchType((prevState) => ({
        ...prevState,
        passwordTouched: true,
      }));
      return;
    } else {
      setPasswordState({ error: "", valid: true });
      setTouchType((prevState) => ({
        ...prevState,
        passwordTouched: true,
      }));
      return;
    }
  };

  const validateConfirmPassword = (
    password: string,
    confirmPassword: string,
  ) => {
    if (confirmPassword === "") {
      setConfirmPasswordState({ error: "", valid: false });
      setTouchType((prevState) => ({
        ...prevState,
        confirmPasswordTouched: false,
      }));
      return;
    }

    if (!password) {
      setConfirmPasswordState({ error: "Password is required.", valid: false });
      setTouchType((prevState) => ({
        ...prevState,
        confirmPasswordTouched: true,
      }));
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordState({
        error: "Password do not match.",
        valid: false,
      });
      setTouchType((prevState) => ({
        ...prevState,
        confirmPasswordTouched: true,
      }));
      return;
    } else {
      setConfirmPasswordState({ error: "", valid: true });
      setTouchType((prevState) => ({
        ...prevState,
        confirmPasswordTouched: true,
      }));
      return;
    }
  };

  const valueUpdateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "email") {
      setTouchType((prevState) => ({
        ...prevState,
        emailTouched: true,
      }));
      validateEmail(value);
    }

    if (name === "password") {
      setTouchType((prevState) => ({
        ...prevState,
        passwordTouched: true,
      }));
      validatePassword(value);
    }

    if (name === "confirmPassword") {
      setTouchType((prevState) => ({
        ...prevState,
        confirmPasswordTouched: true,
      }));
      validateConfirmPassword(userData.password, value);
    }
  };

  useEffect(() => {
    if (touchType.emailTouched) {
      validateEmail(userData.email);
    }
    if (touchType.passwordTouched) {
      validatePassword(userData.password);
    }
    if (touchType.confirmPasswordTouched) {
      validateConfirmPassword(userData.password, userData.confirmPassword);
    }
  }, [userData]);

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isEmailEmpty = !userData.email;
    const isPasswordEmpty = !userData.password;
    const isConfirmPasswordEmpty = !userData.confirmPassword;

    setTouchType({
      emailTouched: true,
      passwordTouched: true,
      confirmPasswordTouched: true,
    });

    if (isEmailEmpty)
      setEmailState({ error: "This field is required.", valid: false });
    if (isPasswordEmpty)
      setPasswordState({ error: "This field is required.", valid: false });
    if (isConfirmPasswordEmpty)
      setConfirmPasswordState({
        error: "This field is required.",
        valid: false,
      });

    if (
      !isEmailEmpty &&
      !isPasswordEmpty &&
      !isConfirmPasswordEmpty &&
      emailState.valid &&
      passwordState.valid &&
      confirmPasswordState.valid
    ) {
      try {
        const res = await fetch(`${Backend_URL}/users/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        if (res.ok) {
          router.push("/auth/signin");
          resetForm();
        } else {
          const errorData = await res.json();
          setEmailState({ error: errorData.message, valid: false });
        }
      } catch (error) {
        console.log("Error during registration.", error);
      }
    } else {
      console.log("Validation failed.");
    }
  };

  const resetForm = () => {
    setUserData({ email: "", password: "", confirmPassword: "" });
    setEmailState({ error: "", valid: false });
    setPasswordState({ error: "", valid: false });
    setConfirmPasswordState({ error: "", valid: false });
    setTouchType({
      emailTouched: false,
      passwordTouched: false,
      confirmPasswordTouched: false,
    });
  };

  return {
    userData,
    emailState,
    passwordState,
    confirmPasswordState,
    fieldType,
    touchType,

    valueUpdateHandler,
    formSubmitHandler,
  };
};
