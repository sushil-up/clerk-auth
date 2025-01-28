"use client";
import React from "react";
import { Form } from "./ui/form";
import { useForm } from "react-hook-form";
import FormInputField from "./share/form/FormInputField";
import { Button } from "./ui/button";
import { checkStatus } from "@/utils/status";
import OtpField from "./share/form/OtpField";

const CreateNewPassword = ({ signIn, setActive,toast }) => {
  const form = useForm({
    defaultValues: {
      code: "000000",
      password: "",
    },
  });
  const onCreatePassword = async (data) => {
    try {
      const newPassword = await signIn?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code: data?.code,
        password: data?.password,
      });
      console.log("newPassword", newPassword);
      if (newPassword?.status === checkStatus?.status) {
        setActive({ session: newPassword?.createdSessionId });
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onCreatePassword)}>
          <FormInputField
            name="password"
            form={form}
            type="password"
            placeholder="Enter your new password"
            label="Create New Password"
          />
          <OtpField name="code" form={form} label="One-Time Password"/>
          <Button type="submit">Reset Password</Button>
        </form>
      </Form>
    </>
  );
};

export default CreateNewPassword;
