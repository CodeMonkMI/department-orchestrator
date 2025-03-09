
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight, User, Lock } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setLoading(true);
      
      // For demonstration, we'll use a simple check
      // In production, this would connect to your auth provider
      if (email === 'admin@example.com' && password === 'password') {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Success message
        toast({
          title: "Login successful",
          description: "Welcome to the Department Management System",
        });
        
        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        // Failed login
        toast({
          title: "Authentication failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "An error occurred while logging in",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-50 to-indigo-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md glass rounded-2xl p-8 md:p-10"
      >
        <div className="text-center mb-8">
          <FadeIn delay={0.1}>
            <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-3">
              Department Management
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h1 className="text-3xl font-bold">Welcome back</h1>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="text-muted-foreground mt-2">
              Sign in to access your department dashboard
            </p>
          </FadeIn>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <FadeIn delay={0.4} className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                disabled={loading}
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.5} className="space-y-2">
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
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                disabled={loading}
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.6}>
            <Button
              type="submit"
              className="w-full gap-2"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Sign in"}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </Button>
          </FadeIn>
        </form>

        <FadeIn delay={0.7}>
          <p className="text-sm text-center mt-6 text-muted-foreground">
            Demo credentials: admin@example.com / password
          </p>
        </FadeIn>
      </motion.div>
    </div>
  );
};

export default Login;
