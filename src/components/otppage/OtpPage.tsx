"use client";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useOtpUserMutation } from "@/redux/Api/userApi";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toast } from "sonner";
import { setOtp } from "@/redux/allSlice/forgotSlice";

// Validation schema for OTP
const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^[0-9]+$/, "OTP must contain only numbers"),
});

type OTPFormData = z.infer<typeof otpSchema>;

export default function OTPVerification() {
  const [otpUser, { isLoading }] = useOtpUserMutation(); // Hook usage
  const router = useRouter();
  const getEmail = useSelector((state: RootState) => state?.forgotPass?.email);
  const dispatch=useDispatch()

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
  });

  const onSubmit = async (data: OTPFormData) => {
    try {
      
      const otp = data.otp; // Keep OTP as a string
      dispatch(setOtp({ otp: data.otp }));

 
      await otpUser({ email: getEmail, otp }).unwrap();
      reset();
      router.push("/change-password");
      toast.success("OTP verified successfully");
    } catch  {
      toast.error("The provided OTP is incorrect");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 font-inter">
      <div className="w-full max-w-[500px] space-y-8 bg-white p-6 rounded-lg">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Verification Code
          </h1>
          <div className="flex justify-center gap-2">
            <span className="text-gray-600">
              We have sent a verification code to{" "}
            </span>
            {/* <span className="text-blue-500">{getEmail?.email || "your email"}</span> */}
            </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex justify-center">
            <Controller
              name="otp"
              control={control}
              render={({ field }) => (
                <InputOTP {...field} maxLength={6}>
                  <InputOTPGroup className="flex gap-2 justify-center">
                    {[...Array(6)].map((_, index) => (
                      <InputOTPSlot
                        key={index}
                        index={index}
                        className="h-12 w-12 rounded-md border border-gray-300 text-center text-lg"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              )}
            />
          </div>

          {errors.otp && (
            <p className="text-center text-sm text-red-500">
              {errors.otp.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-gradient-to-r from-[#0061FF] to-[#003A99] py-2 text-lg font-medium text-white hover:opacity-90"
          >
            Verify
          </button>

          <div className="text-center text-gray-600 mt-5">
            <span className="block">Didn’t receive the code?</span>
            <span className="text-[#0061FF] text-[16px] cursor-pointer">
              Resend
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
