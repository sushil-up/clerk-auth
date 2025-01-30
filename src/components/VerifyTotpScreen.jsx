import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { useUser } from "@clerk/nextjs";
import { useToast } from "@/hooks/use-toast";
const VerifyTotpScreen = ({ setStep }) => {
  const form = useForm({
    defaultValues: {
      totp: "",
    },
  });
  const { user } = useUser();
  const { toast } = useToast();
  const verifyTotp = async (data) => {
    const code = data?.totp;
    try {
      await user?.verifyTOTP({ code });
      setStep("backupcodes");
    } catch (err) {
      toast({
        variant: "destructive",
        description: err.errors[0]?.longMessage,
      });
      console.log("error", err.errors);
    }
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(verifyTotp)}>
          <FormField
            control={form.control}
            name="totp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Enter the code from your authentication app
                </FormLabel>
                <FormControl>
                  <Input placeholder="Verify the Code" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-3 mb-1">
            <Button type="submit">Verify code</Button>
            <Button onClick={() => setStep("add")}>Reset</Button>
          </div>
        </form>
      </Form>
    </>
  );
};
export default VerifyTotpScreen;
