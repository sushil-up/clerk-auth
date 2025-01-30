"use client";
import React, { useState } from "react";
import { checkStatus } from "@/utils/status";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useSignIn } from "@clerk/nextjs";
const FactorTwo = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [useBackupCode, setUseBackupCode] = useState(false);
  const [code, setCode] = useState("");
  const { toast } = useToast();
  const handleSecondFactor = async (e) => {
    e.preventDefault();
    console.log("wyefuyduybudsvgfvduyfafasd",e.target?.value)
    try {
      const signInAttempt = await signIn.attemptSecondFactor({
        strategy: useBackupCode ? "backup_code" : "totp",
        code,
      });
      console.log("signInAttemptsignInAttemptsignInAttempt",signInAttempt)

      if (signInAttempt.status === checkStatus.status) {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace(routsurl.home);
      }
    } catch (err) {
       console.log("fdyhrtyefdsdsgsgers",err.error)
      // toast({
      //   variant: "destructive",
      //   description: "Invalid verification code. Please try again.",
      // });
    }
  };
  return (
    <>
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
    </>
  );
};

export default FactorTwo;
