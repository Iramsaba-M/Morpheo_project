import { useAuth } from "./contexts/auth-provider.jsx";
import { Authenticated } from "@/layouts/authenticated.jsx";
import { NotAuthenticated } from "@/layouts/not-authenticated.jsx";
import { ThreeDots } from "react-loader-spinner";

export const App = () => {
  const { isAuthenticated, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ThreeDots color="#627DF7" />
      </div>
    );
  }

  return isAuthenticated ? <Authenticated /> : <NotAuthenticated />;
};

export default App;
