import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { QRCodeSVG } from "qrcode.react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

const AddTotpScreen = ({ setStep }) => {
  const { user } = useUser();
  const [totp, setTOTP] = useState(undefined);
  const [displayFormat, setDisplayFormat] = useState("qr");

  useEffect(() => {
    void user
      ?.createTOTP()
      .then((totp) => {
        setTOTP(totp);
      })
      .catch((err) => console.error(JSON.stringify(err, null, 2)));
  }, []);

  return (
    <>
 
 
    <CardHeader className="text-center">
      <CardTitle className="text-lg font-semibold">Add TOTP MFA</CardTitle>
    </CardHeader>

    <CardContent className="flex flex-col items-center space-y-4">
      {totp && displayFormat === "qr" && (
        <div className="flex flex-col items-center space-y-4">
          <QRCodeSVG value={totp?.uri || ""} size={180} />
          <Button variant="outline" onClick={() => setDisplayFormat("uri")}>
            Use URI instead
          </Button>
        </div>
      )}
      {totp && displayFormat === "uri" && (
        <div className="flex flex-col items-center space-y-4">
          <p className="bg-gray-200 p-2 rounded-md text-sm break-all text-center">
            {totp.uri}
          </p>
          <Button variant="outline" onClick={() => setDisplayFormat("qr")}>
            Use QR Code instead
          </Button>
        </div>
      )}
    </CardContent>

    <CardFooter className="flex flex-col items-center space-y-4">
      <Button variant="destructive" onClick={() => setStep("add")}>
        Reset
      </Button>
      <p className="text-sm text-gray-500 text-center">
        Once you have set up your authentication app, verify your code.
      </p>
      <Button onClick={() => setStep("verify")}>Verify</Button>
    </CardFooter>


    </>
  );
};

export default AddTotpScreen;



