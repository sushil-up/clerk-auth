"use client";
import CreateNewPassword from "@/components/CreateNewPassword";
import FormInputField from "@/components/share/form/FormInputField";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { checkStatus } from "@/utils/status";
import { useSignIn } from "@clerk/nextjs";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const ForgotPassword = () => {
  const form = useForm({
    defaultValues: {
      email: "",
    },
  });
  const [successfulCreation, setSuccessfulCreation] = useState("false");
  const { isLoaded, signIn, setActive } = useSignIn();
  const { toast } = useToast();
  const onResetPassword = async (data) => {
    try {
      const verifyEmail = await signIn?.create({
        strategy: "reset_password_email_code",
        identifier: data?.email,
      });
      if (verifyEmail?.status === checkStatus?.factorStatus) {
        setSuccessfulCreation("true");
      }
    } catch (err) {
      toast({
        variant: "destructive",
        description: err.errors[0]?.longMessage,
      });
    }
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <Card className="mt-5 max-w-md w-full shadow-lg border rounded-lg bg-white">
          <CardHeader>
            <CardTitle>Reset Your Password </CardTitle>
            <CardDescription>
              {successfulCreation === "false"
                ? "Verify Your Email"
                : "Create new password"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {successfulCreation === "false" ? (
              <>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onResetPassword)}>
                    <>
                      <FormInputField
                        name="email"
                        form={form}
                        type="email"
                        placeholder="Enter your Email"
                        label="Email"
                      />
                      <Button type="submit">Send Reset Code</Button>
                    </>
                  </form>
                </Form>
              </>
            ) : (
              <>
                <CreateNewPassword
                  signIn={signIn}
                  setActive={setActive}
                  toast={toast}
                />
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ForgotPassword;
