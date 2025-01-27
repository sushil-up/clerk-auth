"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
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
import SignUpForm from "@/components/SignUpForm";

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
      firstName: "",
      lastName: "",
    },
  });

  const onSignUp = async (data) => {
    if (!isLoaded) return;
    try {
      await signUp.create({
        emailAddress: data?.email,
        password: data?.password,
        username: data?.username,
        first_name: data?.firstName,
        last_name: data?.lastName,
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
        {verifying ? (
          <>
            <VerifyEmail
              isLoaded={isLoaded}
              signUp={signUp}
              setActive={setActive}
            />
          </>
        ) : (
          <>
            <Card className="mt-5 max-w-md w-full shadow-lg border rounded-lg bg-white">
              <CardHeader>
                Sign Up
                <CardDescription>Register your account</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSignUp)}>
                   <SignUpForm form={form}/>
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
        )}
      </div>
    </>
  );
};

export default SignUp;
