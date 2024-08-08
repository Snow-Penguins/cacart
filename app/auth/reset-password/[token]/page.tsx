import ResetPassword from "@/components/ResetPassword";

interface PageProps {
  params: {
    token: string;
  };
}

export default function Page({ params }: PageProps) {
  const { token } = params;

  return <ResetPassword token={token} />;
}
