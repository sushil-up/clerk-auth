"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useSignUp, useUser } from "@clerk/nextjs";
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
import VerifyPhone from "@/components/VerifyPhone";
import { Values } from "@/utils/status";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const { user } = useUser();
  const [verificationStep, setVerificationStep] = useState("signup");
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
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
        phone_number: data?.phoneNumber,
      });

      // Send the user an email with the verification code
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      // Set 'verifying' true to display second form
      // and capture the OTP code
      setVerificationStep("email");
    } catch (err) {
      toast({
        variant: "destructive",
        description: err.errors?.[0]?.longMessage,
      });
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <Card className="mt-5 max-w-md w-full shadow-lg border rounded-lg bg-white">
          <CardHeader>
            Sign Up
            <CardDescription>
              {verificationStep === "signup" ? (
                <>Register your account</>
              ) : (
                <>Verify your Account</>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {verificationStep === "signup" && (
              <>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSignUp)}>
                    <SignUpForm form={form} />
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
              </>
            )}
            {verificationStep === "email" && (
              <>
                <VerifyEmail
                  isLoaded={isLoaded}
                  signUp={signUp}
                  setActive={setActive}
                  setVerificationStep={setVerificationStep}
                />
              </>
            )}
            {verificationStep === "phone" && (
              <>
                <VerifyPhone
                  isLoaded={isLoaded}
                  signUp={signUp}
                  setActive={setActive}
                />
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default SignUp;
