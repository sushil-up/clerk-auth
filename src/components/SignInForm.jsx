import React from "react";
import FormInputField from "./form/FormInputField";
import { Button } from "../ui/button";

const SignInForm = ({form}) => {
  return (
    <>
      <FormInputField
        name="email"
        form={form}
        type="email"
        placeholder="Enter your Email"
        label="Email"
      />
      <FormInputField
        name="password"
        form={form}
        type="password"
        placeholder="Enter your Password"
        label="Password"
      />
      <Button type="submit" size={"lg"}>
        Sign In
      </Button>
    </>
  );
};

export default SignInForm;
