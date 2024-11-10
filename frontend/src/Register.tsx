import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
  username: z.string().min(3, "Username must be atleast 3 characters long"),
  email: z.string().email(),
  password: z.string().min(6, "Password must be atleast 6 characters long"),
});

const Register = () => {
  const { authenticate } = useUserStore();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: Endpoints.auth.signup.request,
    onSuccess: () => {
      console.log("Signup successful!");
      authenticate();
      navigate("/");
      toast({
        description: "🚀🚀🚀",
        title: "Signup successful!",
      });
    },
    onError: (error) => {
      console.error(error);
      toast({
        description: error.message,
        title: "Error",
      });
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
          <CardTitle className="text-2xl font-bold">
            Sign up to smatter
          </CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400">
            Enter account details to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...form}>
            <form className="space-y-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="funkmasta" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
            Register
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
