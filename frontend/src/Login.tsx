import { useNavigate } from "react-router-dom";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { useUserStore } from "./user-store";

const Login = () => {
  const { authenticate } = useUserStore();
  const navigate = useNavigate();
  const onSubmit = () => {
    authenticate();
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md p-6 md:p-8">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400">
            Enter your email and password to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={onSubmit} className="w-full">
            Sign in
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
