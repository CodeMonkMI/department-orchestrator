"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Lock, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const LoginSchema = z.object({
  email: z.string().min(1, { message: "Email is required!" }),
  password: z.string().min(1, { message: "Password is required!" }),
});

type ProfileFormValues = z.infer<typeof LoginSchema>;

export function LoginForm() {
  const {
    register,
    formState: { errors, isLoading },
    reset,
    handleSubmit,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(LoginSchema),
  });
  const { toast } = useToast();
  const router = useRouter(); // Changed from useNavigate

  function submitHandler(data: ProfileFormValues) {
    console.log(data);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
  }

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
