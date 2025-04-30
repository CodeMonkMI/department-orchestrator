"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/lib/api/authApi";
import { authToken } from "@/lib/token/AuthToken";
import { useAuthContext } from "@/store/auth/AuthProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { ArrowRight, Lock, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { LoginFormValues, LoginSchema, ZodError } from "../type";

export function LoginForm() {
  const { setUser } = useAuthContext();

  const {
    register,
    formState: { errors, isLoading },
    handleSubmit,
    setError,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
  });

  const router = useRouter(); // Changed from useNavigate

  const { mutateAsync: login, isError, error, isSuccess } = useLogin();

  async function submitHandler(data: LoginFormValues) {
    await login(data);
  }

  useEffect(() => {
    if (isSuccess) {
      const userData = authToken.decode();
      setUser(userData);

      router.push("/dashboard");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      if (error instanceof AxiosError) {
        const errs: ZodError[] = error.response?.data;
        errs.forEach((item) => {
          item.path.forEach((field: any) => {
            setError(field, { message: item.message });
          });
        });
      }
    }
  }, [error, isError]);
  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            disabled={isLoading}
            placeholder="admin@example.com"
            className="pl-10"
            {...register("email")}
          />

          <p className="text-sm font-medium mt-2 leading-none text-red-500">
            {errors.email && errors.email.message}{" "}
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <Label htmlFor="password">Password</Label>
        <a href="#" className="text-sm text-primary hover:underline">
          Forgot password?
        </a>
      </div>
      <div className="relative">
        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          id="password"
          placeholder="••••••••"
          className="pl-10"
          disabled={isLoading}
          {...register("password")}
          type="password"
        />{" "}
        <p className="text-sm font-medium mt-2 leading-none text-red-500">
          {errors.password && errors.password.message}{" "}
        </p>
      </div>

      <Button type="submit" className="w-full gap-2" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Sign in"}
        {!isLoading && <ArrowRight className="h-4 w-4" />}
      </Button>
    </form>
  );
}
