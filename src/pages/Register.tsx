
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, Eye, EyeOff, Check, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Navbar from '@/components/Navbar';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Password strength check
  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, text: 'No password' };
    
    const checks = [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /[0-9]/.test(password),
      /[^A-Za-z0-9]/.test(password),
    ];
    
    const strength = checks.filter(Boolean).length;
    
    const text = strength <= 1 
      ? 'Very Weak' 
      : strength === 2 
      ? 'Weak' 
      : strength === 3 
      ? 'Medium' 
      : strength === 4 
      ? 'Strong' 
      : 'Very Strong';
      
    return { strength, text };
  };

  const passwordStrength = getPasswordStrength(formData.password);
  
  const getStrengthColor = (strength: number) => {
    return strength <= 1 
      ? 'bg-red-500' 
      : strength === 2 
      ? 'bg-orange-500' 
      : strength === 3 
      ? 'bg-yellow-500' 
      : strength === 4 
      ? 'bg-green-500' 
      : 'bg-green-600';
  };

  const passwordMatch = formData.password === formData.confirmPassword && formData.confirmPassword !== '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }
    
    if (passwordStrength.strength < 3) {
      toast({
        title: "Weak Password",
        description: "Please choose a stronger password for better security.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, you would integrate with an auth API here
      // For this demo, we'll simulate a successful registration
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      toast({
        title: "Success",
        description: "Your account has been created successfully.",
      });
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen">
        <div className="w-full bg-white rounded-lg shadow-xl sm:max-w-md p-8 animate-fade-up">
          <div className="flex justify-center mb-6">
            <div className="p-2 bg-earth-100 rounded-full">
              <Leaf className="h-8 w-8 text-earth-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Create your account
          </h1>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="fullName" className="text-sm font-medium text-gray-700 mb-1">Full Name</Label>
              <Input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                className="input-field w-full"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                className="input-field w-full"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="location" className="text-sm font-medium text-gray-700 mb-1">Farm Location</Label>
              <Input
                type="text"
                id="location"
                name="location"
                placeholder="City, State"
                value={formData.location}
                onChange={handleChange}
                className="input-field w-full"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1">Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field w-full pr-10"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              
              {formData.password && (
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium text-gray-600">Password strength:</span>
                    <span className={`text-xs font-medium ${
                      passwordStrength.strength <= 2 ? 'text-red-600' : 
                      passwordStrength.strength === 3 ? 'text-yellow-600' : 
                      'text-green-600'
                    }`}>{passwordStrength.text}</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getStrengthColor(passwordStrength.strength)} transition-all duration-300`}
                      style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
            
            <div>
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 mb-1">Confirm Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`input-field w-full pr-10 ${
                    formData.confirmPassword 
                      ? (passwordMatch ? 'border-green-500 focus:ring-green-500' : 'border-red-500 focus:ring-red-500') 
                      : ''
                  }`}
                  required
                />
                {formData.confirmPassword && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {passwordMatch 
                      ? <Check className="h-5 w-5 text-green-500" /> 
                      : <X className="h-5 w-5 text-red-500" />
                    }
                  </div>
                )}
              </div>
              {formData.confirmPassword && !passwordMatch && (
                <p className="text-xs text-red-600 mt-1">Passwords do not match.</p>
              )}
            </div>
            
            <Button 
              type="submit" 
              className="w-full btn-primary"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
            
            <div className="text-sm text-center text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-sky-600 hover:text-sky-800 font-medium">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
