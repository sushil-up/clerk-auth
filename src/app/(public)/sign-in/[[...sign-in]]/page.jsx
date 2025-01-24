"use client";

import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
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
import ConnectionBotton from "@/components/ConnectionBotton";
import { checkStatus } from "@/utils/status";
import FormInputField from "@/components/share/form/FormInputField";

export default function SignInForm() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // Handle primary sign-in
  const onSignIn = async (data) => {
    const email = data?.email;
    const password = data?.password;

    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });
      if (signInAttempt.status === checkStatus.status) {
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

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <Card className="mt-5 max-w-md w-full shadow-lg border rounded-lg bg-white">
          <CardHeader>
            Sign In
            <CardDescription>Sign In To Your Account</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSignIn)}>
                <FormInputField
                  name="email"
                  form={form}
                  type="email"
                  placeholder="Enter your Email"
                  label="Email"
                />
                <FormInputField
                  name="password"
                  form={form}
                  type="password"
                  placeholder="Enter your Password"
                  label="Password"
                />
                <Button type="submit" size={"lg"}>
                  Sign In
                </Button>
              </form>
              <p className="mt-2 ml-2">
                {`Don't have an account?`}
                <span className="ml-2">
                  <Link href={routsurl.signUp} className="text-blue-600">
                    Create account
                  </Link>
                </span>
              </p>
            </Form>
          </CardContent>
          <CardFooter className="gap-4 ">
            <ConnectionBotton />
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
