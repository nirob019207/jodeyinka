"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Facebook, Instagram, Linkedin, MapPin, Mail, Phone, Twitter } from 'lucide-react'
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "../ui/textarea"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  emailPhone: z.string().min(1, {
    message: "Email or phone is required.",
  }),
  country: z.string({
    required_error: "Please select a country.",
  }),
  state: z.string({
    required_error: "Please select a state.",
  }),
  address: z.string().min(1, {
    message: "Address is required.",
  }),
  subject: z.string().min(1, {
    message: "Subject is required.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

export default function ContactPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      emailPhone: "",
      address: "",
      subject: "",
      message: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h1 className="text-[#1D2939] text-[36px] leadiing-[43.2px] font-bold mb-4">Get in Touch</h1>
          <p className="text-[16px] text-[#475467] leading-[25px] mb-8">
            We&apos;d love to hear from you! Whether you have a question about our services, pricing, or
            anything else, our team is ready to answer all your questions.
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
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
                      <FormLabel className="text-[16px]">Email/Phone*</FormLabel>
                      <FormControl>
                        <Input placeholder="alma.lawson@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country*</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
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

              <Button type="submit" className="w-full">Submit Now</Button>
            </form>
          </Form>
        </div>

        <div className="lg:pl-8">
          <div className="rounded-lg p-6 bg-muted/50">
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p className="text-muted-foreground mb-8">Say something to start a live chat!</p>

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
                <span>132 Dartmouth Street Boston,<br />Massachusetts 02156 United States</span>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Social Media:</h3>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

