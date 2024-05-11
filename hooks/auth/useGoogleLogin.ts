export const useGoogleLogin = () => {
  const backend_url = process.env.Backend_URL;

  const handleLogin = () => {
    window.location.href = `${backend_url}/auth/google`;
  };

  return handleLogin;
};
