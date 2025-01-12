"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";
import { useRouter } from "next/navigation";
import { useForgotUserMutation } from "@/redux/Api/userApi";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { setEmail } from "@/redux/allSlice/forgotSlice";

// Define schema using Zod
const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .nonempty("Email is required"),
});

type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const [forgotPas, { isLoading, isError, error }] = useForgotUserMutation(); // Hook usage
  const router = useRouter()
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordData) => {
    try {
      dispatch(setEmail({ email: data }));
      const response = await forgotPas(data).unwrap();
      console.log(response);
      reset();
      router.push("/otp");
      toast.success("Enter your received OTP");
    } catch (err: any) {
      console.log("Error object:", err); // Log error for debugging
  
      // Main error message
      if (err?.data?.message) {
        toast.error(err.data.message);
      }
  
      // Detailed error messages
      if (err?.data?.errorDetails) {
        const { errorDetails } = err.data;
        if (Array.isArray(errorDetails)) {
          errorDetails.forEach((detail: string) => {
            toast.error(detail);
          });
        } else if (typeof errorDetails === "object" && errorDetails.cause) {
          toast.error(errorDetails.cause);
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };
  
  
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-[454px] space-y-6">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-sans font-semibold text-[#1D2939]">
            Forget Password!
          </h1>
          <p className="text-xs sm:text-sm md:text-base mt-4 font-outfit text-gray-500">
            Enter Your Registered Email Below.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="mt-7">
            <Label
              htmlFor="email"
              className="text-base sm:text-lg md:text-[18px] font-normal font-outfit text-[#475467]"
            >
              Email address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="georgia.young@example.com"
              className="w-full text-[18px] text-[#475467] border-[#98A2B3] pr-10 placeholder:text-[#98A2B3] placeholder:text-sm placeholder:font-normal"
              {...register("email")}
          
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="flex items-center justify-start text-xs sm:text-sm">
            <span className="text-gray-600">Remember the password?</span>
            <Link
              href="/login"
              className="ml-1 underline text-[#00008B] font-medium font-inter hover:underline"
            >
              Sign in
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 flex justify-center rounded-lg items-center font-outfit text-white text-[18px] font-medium py-[10px]  z-50 bg-gradient-to-t from-[#0061FF] to-[#003A99] hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
>
         Send
           
          </button>
        </form>
      </div>
    </div>
  );
}
