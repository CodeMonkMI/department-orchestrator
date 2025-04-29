import { LoginForm } from "./components/LoginForm";

const LoginContainer = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-50 to-indigo-50 px-4">
      <div className="w-full max-w-md glass rounded-2xl p-8 md:p-10">
        <div className="text-center mb-8">
          <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-3">
            Department Management
          </div>

          <h1 className="text-3xl font-bold">Welcome back</h1>

          <p className="text-muted-foreground mt-2">
            Sign in to access your department dashboard
          </p>
        </div>

        <LoginForm />

        <p className="text-sm text-center mt-6 text-muted-foreground">
          Demo credentials: admin@example.com / password
        </p>
      </div>
    </div>
  );
};

export default LoginContainer;
