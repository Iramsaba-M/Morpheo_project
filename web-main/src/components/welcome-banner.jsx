import { useAuth } from "@/contexts/auth-provider";

export const WelcomeBanner = () => {
  const { user } = useAuth();

  return (
    <>
      <span className="font-semibold text-2xl">Hello, {user?.name}!</span>
      <span className="font-bold text-3xl bg-gradient-to-r from-morpheo-900 to-morpheo-500 text-transparent bg-clip-text">
        How can I help you today?
      </span>
    </>
  );
};
