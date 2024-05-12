export const useGoogleLogin = () => {
  const Backend_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleLogin = () => {
    window.location.href = `${Backend_URL}/auth/google`;
  };

  return handleLogin;
};
