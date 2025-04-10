import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/auth-provider";

export const LoginForm = () => {
  const { loginWithRedirect } = useAuth0();
  const { loginDirect } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRedirectLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/app",
      },
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    const logged_in = await loginDirect(email, password);

    if (logged_in) {
      // Redirect to the app
      window.location.href = `/app`;
    }
  };

  return (
    <div className="p-6 md:p-8 items-center w-3/4">
      <form onSubmit={handleLogin}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col">
            <img src="morpheo-logo.svg" className="w-1/4 pb-3" />
            <h1 className="text-2xl font-bold">Sign in</h1>
            <p className="text-balance text-muted-foreground">
              Sign in to your Morpheo AI experience
            </p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <a
                href="#"
                className="ml-auto text-sm underline-offset-2 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" onSubmit={handleLogin}>
            Login
          </Button>
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Or
            </span>
          </div>
        </div>
      </form>
      <div className="grid grid-cols-1 gap-4 py-6">
        <Button
          variant="outline"
          className="w-full"
          onClick={handleRedirectLogin}
        >
          Login with your Organization
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="#" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </div>
  );
};

export default LoginForm;
