import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Endpoints } from "./api";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./components/ui/form";
import { Input } from "./components/ui/input";
import { toast } from "./components/ui/use-toast";
import { useUserStore } from "./user-store";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const Login = () => {
  const { authenticate } = useUserStore();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: Endpoints.auth.login.request,
    onSuccess: (res) => {
      console.log("Login successful!");
      authenticate(res);
      navigate("/");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Invalid email or password",
      });
      console.error(error);
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    console.log(data);
    mutation.mutate(data);
  });

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md p-6 md:p-8">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-bold">Login to smatter</CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400">
            Enter account details to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...form}>
            <form className="space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="hello@world.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter className="block space-y-4">
          <Button onClick={onSubmit} className="w-full">
            Sign in
          </Button>

          <p>
            Not signed up yet?{" "}
            <Link to="/register" className="text-blue-500">
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
