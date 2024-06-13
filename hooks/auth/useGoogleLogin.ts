export const useGoogleLogin = () => {
  const Backend_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleLogin = async () => {
    const response = await fetch(`${Backend_URL}/auth/google`);
    const data = await response.json();
    window.location.href = data.url;
  };

  return handleLogin;
};
