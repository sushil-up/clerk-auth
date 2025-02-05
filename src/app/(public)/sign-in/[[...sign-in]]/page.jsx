"use client";

import { useSignIn } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
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
import SsoButton from "@/components/SsoButton";
import SignInForm from "@/components/SignInForm";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ForgotPassword from "@/components/forgot-password";

export default function SignIn() {

  const { isLoaded, signIn, setActive } = useSignIn();
  const [openForgotPassword, setOpenForgotPassword] = useState(false);

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

        router.replace(routsurl.factorTwo);
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

  if (!isLoaded) return <p>Loading...</p>;

  if (openForgotPassword) {
    return <ForgotPassword />;
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
                {"Don't have account"}
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
