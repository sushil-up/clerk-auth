"use client";

import { useUser } from "@clerk/nextjs";
import { QRCodeSVG } from "qrcode.react";
import Link from "next/link";
import * as React from "react";
import { GenerateBackupCodes } from "../page";
import { Button } from "@/components/ui/button";
import AddTotpScreen from "@/components/AddTotpScreen";
import { Card } from "@/components/ui/card";
import VerifyTotpScreen from "@/components/VerifyTotpScreen";

function BackupCodeScreen({ setStep }) {
  return (
    <>
      <h1>Verification was a success!</h1>
      <div>
        <p>
          Save this list of backup codes somewhere safe in case you need to
          access your account in an emergency
        </p>
        <GenerateBackupCodes />
        <Button onClick={() => setStep("success")}>Finish</Button>
      </div>
    </>
  );
}

function SuccessScreen() {
  return (
    <>
      <h1>Success!</h1>
      <p>
        You have successfully added TOTP MFA via an authentication application.
      </p>
    </>
  );
}

export default function AddMFaScreen() {
  const [step, setStep] = React.useState("add");
  const { isLoaded, user } = useUser();

  if (!isLoaded) return null;

  if (!user) {
    return <p>You must be logged in to access this page</p>;
  }

  return (
    <>
      <div className="flex justify-center items-center min-h-screen ">
        <Card className="max-w-xl w-full shadow-lg border rounded-lg bg-white p-6">
          {step === "add" && <AddTotpScreen setStep={setStep} />}
          {step === "verify" && <VerifyTotpScreen setStep={setStep} />}
          {step === "backupcodes" && <BackupCodeScreen setStep={setStep} />}
          {step === "success" && <SuccessScreen />}
          <Link href="/account/manage-mfa">Manage MFA</Link>
        </Card>
      </div>
    </>
  );
}
