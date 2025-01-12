"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MapPin, Mail, Phone } from "lucide-react";
import twitter from "@/asset/social/twitter.svg";
import insta from "@/asset/social/insta.svg";
import fb from "@/asset/social/fb.svg";
import linkedin from "@/asset/social/linkedin.svg";
import * as z from "zod";
import capcha from '@/asset/capcha.png'

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "../ui/textarea";
import Image from "next/image";
import { Checkbox } from "@radix-ui/react-checkbox";
import { useContactMutation } from "@/redux/Api/userApi";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.any().optional(),
  emailPhone: z.any().optional(),
  country: z.any().optional(),
  state: z.any().optional(),
  address: z.any().optional(),
  subject: z.any().optional(),
  message: z.any().optional(),
});


export default function ContactPage() {
  const [contact,{isLoading}]=useContactMutation()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      emailPhone: "",
      address: "",
      subject: "",
      message: "",
    },
  });

  

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Simulate API call
      await contact(values).unwrap();
      toast.success("Message sent successfully!"); // Show success message
      form.reset(); // Reset the form after successful submission
    } catch (error) {
      toast.error("Failed to send message. Please try again."); // Show error message
    }
  }

  return (
    <div className="container mx-auto px-0 py-[100px] ">
      <div className="grid lg:grid-cols-2 items-center gap-[50px] md:gap-[100px]">
        <div>
          <h1 className="text-[#1D2939] text-[36px] leadiing-[43.2px] font-bold mb-4">
            Get in Touch
          </h1>
          <p className="text-[16px] text-[#475467] leading-[25px] mb-8">
            We&apos;d love to hear from you! Whether you have a question about
            our services, pricing, or anything else, our team is ready to answer
            all your questions.
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[16px]">Enter Name*</FormLabel>
                      <FormControl>
                        <Input placeholder="Esther Howard" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="emailPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[16px]">
                        Email/Phone*
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="alma.lawson@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country*</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ma">Massachusetts</SelectItem>
                          <SelectItem value="ny">New York</SelectItem>
                          <SelectItem value="ca">California</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter Subject Name*</FormLabel>
                    <FormControl>
                      <Input placeholder="Medical SaaS Product" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write a message..."
                        className="min-h-[150px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Recaptcha */}
              <div>
                <div className="inline-flex items-center gap-2 rounded-md border bg-white px-3 py-2 shadow-sm mb-10">
                  <Checkbox
                    id="recaptcha"
                  
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

              <Button
                type="submit"
                className="w-full bg-gradient-to-l from-[#0061FF] to-[#003A99] px-4 py-2"
              >
               {isLoading?"Message Sending":"Contact"}
              </Button>
            </form>
          </Form>
        </div>

        <div className="lg:pl-8">
          <div className="">
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p className="text-muted-foreground mb-8">
              Say something to start a live chat!
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <span>+1012 3456 789</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <span>demo@gmail.com</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-1" />
                <span>
                  132 Dartmouth Street Boston,
                  <br />
                  Massachusetts 02156 United States
                </span>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Social Media:</h3>
              <div className="flex gap-4">
                <a href="#" aria-label="Twitter">
                  <Image src={twitter} alt="twitter logo" />
                </a>
                <a href="#" aria-label="Instagram">
                  <Image src={insta} alt="twitter logo" />
                </a>
                <a href="#" aria-label="LinkedIn">
                  <Image src={linkedin} alt="twitter logo" />
                </a>
                <a href="#" aria-label="Facebook">
                  <Image src={fb} alt="twitter logo" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
