import React from "react";
import { Form } from "./ui/form";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VerifactionValidation } from "./FormValidation/VerifactionValidation";
import { useToast } from "@/hooks/use-toast";
import { routsurl } from "@/utils/routs";
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";
import { checkStatus } from "@/utils/status";
import OtpField from "./share/form/OtpField";

const VerifyEmail = ({ isLoaded, signUp, setActive }) => {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(VerifactionValidation),
    defaultValues: {
      code: "000000",
    },
  });
  const onVeryfyEmail = async (data) => {
    if (!isLoaded) return;
    try {
      // Use the code the user provided to attempt verification
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: data?.code,
      });

      // If verification was completed, set the session to active
      // and redirect the user

      if (completeSignUp.status === checkStatus?.status) {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace(routsurl.home);
      } else {
        toast({ description: completeSignUp.status });
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      toast({ description: err?.errors[0]?.longMessage });
    }
  };
  return (
    <>
      <Card className="mt-5 max-w-md w-full shadow-lg border rounded-lg bg-white">
        <CardHeader>
          Sign Up
          <CardDescription>Verification Code</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onVeryfyEmail)}>
              <OtpField name="code" form={form} label="One-Time Password" />
              <Button type="submit">Verify</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default VerifyEmail;
