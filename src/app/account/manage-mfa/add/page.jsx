"use client";

import { useUser } from "@clerk/nextjs";
import { QRCodeSVG } from "qrcode.react";
import Link from "next/link";
import * as React from "react";
import { GenerateBackupCodes } from "../page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function AddTotpScreen({ setStep }) {
  const { user } = useUser();
  const [totp, setTOTP] = React.useState(undefined);
  const [displayFormat, setDisplayFormat] = React.useState("qr");

  React.useEffect(() => {
    void user
      ?.createTOTP()
      .then((totp) => {
        setTOTP(totp);
      })
      .catch((err) => console.error(JSON.stringify(err, null, 2)));
  }, []);

  return (
    <>
      <h1>Add TOTP MFA</h1>

      {totp && displayFormat === "qr" && (
        <>
          <div className="ml-5">
            <QRCodeSVG value={totp?.uri || ""} size={200} />
          </div>
          <Button onClick={() => setDisplayFormat("uri")}>
            Use URI instead
          </Button>
        </>
      )}
      {totp && displayFormat === "uri" && (
        <>
          <div className="ml-5">
            <p>{totp.uri}</p>
          </div>
          <Button className="mt-5" onClick={() => setDisplayFormat("qr")}>
            Use QR Code instead
          </Button>
        </>
      )}
      <Button className="mt-5" onClick={() => setStep("add")}>
        Reset
      </Button>

      <p>Once you have set up your authentication app, verify your code</p>
      <Button onClick={() => setStep("verify")}>Verify</Button>
    </>
  );
}

function VerifyTotpScreen({ setStep }) {
  const { user } = useUser();
  const [code, setCode] = React.useState("");

  const verifyTotp = async (e) => {
    e.preventDefault();
    try {
      await user?.verifyTOTP({ code });
      setStep("backupcodes");
    } catch (err) {
      console.log("error",err.error)

    }
  };

  return (
    <>
      <h1>Verify TOTP</h1>
      <form onSubmit={(e) => verifyTotp(e)}>
        <Label htmlFor="totp-code">
          Enter the code from your authentication app
        </Label>
        <Input
          type="text"
          id="totp-code"
          onChange={(e) => setCode(e.currentTarget.value)}
        />
        <Button type="submit">Verify code</Button>
        <Button onClick={() => setStep("add")}>Reset</Button>
      </form>
    </>
  );
}

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
      {step === "add" && <AddTotpScreen setStep={setStep} />}
      {step === "verify" && <VerifyTotpScreen setStep={setStep} />}
      {step === "backupcodes" && <BackupCodeScreen setStep={setStep} />}
      {step === "success" && <SuccessScreen />}
      <Link href="/account/manage-mfa">Manage MFA</Link>
    </>
  );
}
