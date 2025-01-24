"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSignUp } from "@clerk/nextjs";
import VerifyEmail from "@/components/VerifyEmail";
import { SignUpValidation } from "@/components/FormValidation/SignUpValidation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { routsurl } from "@/utils/routs";
import FormInputField from "@/components/share/form/FormInputField";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [verifying, setVerifying] = useState();
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      fullName: "",
    },
  });

  const onSignUp = async (data) => {
    if (!isLoaded) return;
    try {
      await signUp.create({
        emailAddress: data?.email,
        password: data?.password,
        publicMetadata: {
          username: data?.username,
          fullName: data?.fullName,
        },
      });

      // Send the user an email with the verification code
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      // Set 'verifying' true to display second form
      // and capture the OTP code
      setVerifying(true);
    } catch (err) {
      toast({
        variant: "destructive",
        description: err.errors?.[0]?.message,
      });
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        {!verifying ? (
          <>
            <Card className="mt-5 max-w-md w-full shadow-lg border rounded-lg bg-white">
              <CardHeader>
                Sign Up
                <CardDescription>Register your account</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSignUp)}>
                    <FormInputField
                      name="fullName"
                      form={form}
                      type="text"
                      placeholder="Enter Your fullname"
                      label="Full Name"
                    />
                    <FormInputField
                      name="email"
                      type="email"
                      form={form}
                      placeholder="Enter your Email"
                      label="Email"
                    />
                    <FormInputField
                      name="username"
                      type="text"
                      form={form}
                      placeholder="Enter your UserName"
                      label="Username"
                    />
                    <FormInputField
                      name="password"
                      form={form}
                      placeholder="Enter your Password"
                      label="Password"
                      type="password"
                    />
                    <div id="clerk-captcha"></div>
                    <Button type="submit">Sign Up</Button>
                  </form>
                </Form>
                <p className="mt-2 ml-2">
                  Already have an account
                  <span className="ml-2">
                    <Link href={routsurl.signIn} className="text-blue-600">
                      Sign In
                    </Link>
                  </span>
                </p>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            <VerifyEmail
              isLoaded={isLoaded}
              signUp={signUp}
              setActive={setActive}
            />
          </>
        )}
      </div>
    </>
  );
};

export default SignUp;