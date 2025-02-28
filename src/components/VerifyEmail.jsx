import React from "react";
import { Form } from "./ui/form";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VerifactionValidation } from "./FormValidation/VerifactionValidation";
import { useToast } from "@/hooks/use-toast";
import OtpField from "./share/form/OtpField";
import { useSignUp } from "@clerk/nextjs";
import { Values } from "@/utils/status";

const VerifyEmail = ({ setVerificationStep }) => {
  const { toast } = useToast();
  const { isLoaded, signUp, setActive } = useSignUp();
  const form = useForm({
    resolver: zodResolver(VerifactionValidation),
    defaultValues: Values,
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
      if (completeSignUp.unverifiedFields.includes("phone_number")) {
        await signUp.preparePhoneNumberVerification({
          strategy: "phone_code",
        });

        setVerificationStep("phone");
        await setActive({ session: completeSignUp.createdSessionId });
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onVeryfyEmail)}>
          <OtpField name="code" form={form} label="Verify Email" />
          <Button type="submit">Verify</Button>
        </form>
      </Form>
    </>
  );
};

export default VerifyEmail;
