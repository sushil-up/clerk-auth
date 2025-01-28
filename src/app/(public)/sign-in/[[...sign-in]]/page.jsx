"use client";

import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { SignInValidation } from "@/components/FormValidation/SignInValidation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { routsurl } from "@/utils/routs";
import { checkStatus } from "@/utils/status";
import SsoButton from "@/components/SsoButton";
import SignInForm from "@/components/SignInForm";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ForgotPassword from "@/components/forgot-password";

export default function SignIn() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [openForgotPassword, setOpenForgotPassword] = useState(false);
  const [displayTOTP, setDisplayTOTP] = useState(false);
  const [useBackupCode, setUseBackupCode] = useState(false);
  const [code, setCode] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSignIn = async (data) => {
    try {
      const signInAttempt = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      if (signInAttempt?.status === "needs_second_factor") {
        setDisplayTOTP(true);
      } else if (signInAttempt?.createdSessionId) {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace(routsurl.home);
      }
    } catch (err) {
      toast({
        variant: "destructive",
        description:
          err.errors?.[0]?.message || "An error occurred during sign-in.",
      });
    }
  };

  const handleSecondFactor = async (e) => {
    e.preventDefault();
    try {
      const signInAttempt = await signIn.attemptSecondFactor({
        strategy: useBackupCode ? "backup_code" : "totp",
        code,
      });

      if (signInAttempt.status === checkStatus.status) {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace(routsurl.home);
      }
    } catch (err) {
      toast({
        variant: "destructive",
        description: "Invalid verification code. Please try again.",
      });
    }
  };

  if (!isLoaded) return <p>Loading...</p>;

  if (openForgotPassword) {
    return <ForgotPassword />;
  }

  if (displayTOTP) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Card className="max-w-md w-full">
          <CardHeader>
            <h1>Verify Your Account</h1>
            <CardDescription>
              Enter your {useBackupCode ? "backup code" : "verification code"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSecondFactor}>
              <div className="mb-4">
                <label htmlFor="code" className="block text-sm font-medium">
                  Code
                </label>
                <input
                  id="code"
                  name="code"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full mt-1 border rounded px-3 py-2"
                />
              </div>
              <div className="flex items-center mb-4">
                <input
                  id="backupcode"
                  name="backupcode"
                  type="checkbox"
                  checked={useBackupCode}
                  onChange={() => setUseBackupCode((prev) => !prev)}
                  className="mr-2"
                />
                <label htmlFor="backupcode" className="text-sm">
                  This code is a backup code
                </label>
              </div>
              <Button type="submit" className="w-full">
                Verify
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="max-w-md w-full shadow-lg border rounded-lg bg-white">
        <CardHeader>
          <h1>Sign In</h1>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSignIn)}>
              <SignInForm form={form} />
              <div className="mt-4 flex justify-between items-center">
                <Button
                  variant="ghost"
                  onClick={() => setOpenForgotPassword(true)}
                >
                  Forgot Password?
                </Button>
                <Link href={routsurl.signUp} className="text-blue-600">
                  Create account
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="gap-4">
          <SsoButton />
        </CardFooter>
      </Card>
    </div>
  );
}
