import { useSignIn } from "@clerk/nextjs";
import React from "react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { routsurl } from "@/utils/routs";

const SsoButton = () => {
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
        }}
        onClick={handleGoogleSignIn}
      >
        <img src="/google.png" width="15%" /> Sign in with Google
      </Button>

      <Button onClick={handleGitHubSignIn}>
        <img src="/github.png" width="15%" /> Sign in with GitHub
      </Button>
    </>
  );
};

export default SsoButton;
