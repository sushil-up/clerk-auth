import { useSignIn } from "@clerk/nextjs";
import React from "react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { routsurl } from "@/utils/routs";

const ConnectionBotton = () => {
  const { signIn } = useSignIn();
  const { toast } = useToast();
  const handleGoogleSignIn = async () => {
    try {
      // Initiates Google Sign-In via Clerk
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: routsurl.ssoCallBack,
        redirectUrlComplete: routsurl.about,
      });
    } catch (err) {
      toast({
        variant: "destructive",
        description: err.errors?.[0]?.message,
      });
    }
  };
  const handleGitHubSignIn = async () => {
    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_github",
        redirectUrl: routsurl.ssoCallBack,
        redirectUrlComplete: routsurl.about,
      });
    } catch (err) {
      toast({
        variant: "destructive",
        description: err.errors?.[0]?.message,
      });
    }
  };
  return (
    <>
      <Button
        style={{
          backgroundColor: "#4285F4",
          color: "white",
          marginTop: "10px",
        }}
        onClick={handleGoogleSignIn}
      >
        Sign in with Google
      </Button>
      <Button
        style={{
          backgroundColor: "#4285F4",
          color: "white",
          marginTop: "10px",
        }}
        onClick={handleGitHubSignIn}
      >
        Sign in with GitHub
      </Button>
    </>
  );
};

export default ConnectionBotton;