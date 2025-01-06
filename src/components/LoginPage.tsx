'use client'

import * as React from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useForm, SubmitHandler } from 'react-hook-form'
import capcha from '@/asset/capcha.png'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import Link from 'next/link'

/** Define form validation schema */
/** Define form validation schema and TypeScript types */
type FormData = {
  email: string;
  password: string;
  recaptcha?: boolean;
  rememberMe?: boolean;
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()
  const onSubmit : SubmitHandler<FormData> = (data) => console.log(data)

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="md:text-[34px] font-[600] text-2xl text-[#1D2939]">Sign in to WSF</CardTitle>
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
                {...register('email')}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register('password')}
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
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
                    {showPassword ? 'Hide password' : 'Show password'}
                  </span>
                </Button>
              </div>
            </div>

            {/* Recaptcha */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-md border bg-white px-3 py-2 shadow-sm">
                <Checkbox
                  id="recaptcha"
                  {...register('recaptcha')}
                  className="h-6 w-6 rounded-sm border-2 border-gray-200 data-[state=checked]:border-transparent"
                />
                <label htmlFor="recaptcha" className="text-sm text-gray-600">
                  I&apos;m not a robot
                </label>
                <div className="ml-4 border-l border-gray-200 pl-4">
                  <div className="h-10 w-10">
                    <Image
                      src={capcha}
                      alt="reCAPTCHA"
                      className="h-full w-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" {...register('rememberMe')} />
                <Label htmlFor="remember" className="text-sm">Remember Me</Label>
              </div>
              <Link href="/forgot-password" className="px-0 text-[#0061FF]">
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button className="w-full z-50 bg-gradient-to-r from-[#0061FF] to-[#003A99]">
              Log in
            </Button>

            {/* Register Link */}
            <div className="text-center flex flex-col md:flex-row">
              <span className="text-[17px] text-[#98A2B3]">
                If you don&apos;t have any account please{' '}
              </span>
              <Link href={'/register'}>
              <span className="px-1 text-[#0061FF] text-[17px] font-[500] lg:text-nowrap">
                Register Here!
              </span>
              </Link>
           
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

