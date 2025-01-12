"use client";
import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SerializedError } from "@reduxjs/toolkit";
import { toast } from "sonner"; // Assuming you're using sonner
import cookies from "js-cookie"; // Package to handle cookies

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useLoginUserMutation } from "@/redux/Api/userApi";
import { setUser } from "@/redux/ReduxFunction";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

// Zod validation schema for login
const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Enter a valid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type FormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [login, { data: response, isLoading, isError, error }] =
    useLoginUserMutation();
  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    try {
      console.log("Form data:", formData); // Debugging log
      const result = await login(formData).unwrap(); // Await the result first
      console.log("Login response:", result); // Check the result
  
      if (result?.data) {
        // Handle the login success as usual
        const { accessToken, role, email } = result.data;
        
        // Dispatch the user data to Redux
        dispatch(setUser({ role, token: accessToken, email }));
  
        // Store the token in cookies
        cookies.set("token", accessToken, { expires: 7 });
  
        // Redirect to the home page
        router.push("/");
  
        // Show success toast
        toast.success("Login successful!");
      }
    } catch (err) {
      console.error("Login error:", err); // Log the error for debugging
      toast.error("Login failed. Please check your credentials.");
    }
  };
  
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="md:text-[34px] font-[600] text-2xl text-[#1D2939]">
            Sign in to WSF
          </CardTitle>
          <CardDescription className="md:text-[16px] text-[15px] pt-3 font-[400] text-[#475467]">
            Please Enter Your Email And Password Below!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                placeholder="johndoe@example.com"
                type="email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm">
                  Remember Me
                </Label>
              </div>
              <Link href="/forgot-password" className="px-0 text-[#0061FF]">
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              className="w-full z-50 bg-gradient-to-r from-[#0061FF] to-[#003A99]"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
            {isError && (
              <p className="text-red-500 text-sm mt-2">
                {("data" in error
                  ? (error.data as { message: string })?.message
                  : (error as SerializedError)?.message) ||
                  "An error occurred. Please try again."}
              </p>
            )}

            {/* Register Link */}
            <div className="text-center flex flex-col md:flex-row">
              <span className="text-[17px] text-[#98A2B3]">
                If you don&apos;t have any account please{" "}
              </span>
              <Link href={"/register"}>
                <span className="px-1 text-[#0061FF] text-[17px] font-[500] lg:text-nowrap">
                  Register Here!
                </span>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
