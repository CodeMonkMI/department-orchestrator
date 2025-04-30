"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LoginForm } from "./LoginForm";
const queryClient = new QueryClient();
const LoginFormContainer = () => {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <LoginForm />
      </QueryClientProvider>
    </div>
  );
};

export default LoginFormContainer;
