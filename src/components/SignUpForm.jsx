import React from "react";
import FormInputField from "./share/form/FormInputField";
import { Button } from "./ui/button";

const SignUpForm = ({ form }) => {
  return (
    <>
      <FormInputField
        name="firstName"
        form={form}
        type="text"
        placeholder="Enter Your First Name"
        label="First Name"
      />
      <FormInputField
        name="lastName"
        form={form}
        type="text"
        placeholder="Enter Your Last Name"
        label="Last Name"
      />
      <FormInputField
        name="email"
        type="email"
        form={form}
        placeholder="Enter your Email"
        label="Email"
      />
       {/* <FormInputField
        name="phoneNumber"
        // type="tel"
        form={form}
        placeholder="Enter your Phone Number"
        label="Phone Number"
      /> */}
      <FormInputField
        name="username"
        type="text"
        form={form}
        placeholder="Enter your UserName"
        label="Username"
      />
      <FormInputField
        name="password"
        form={form}
        placeholder="Enter your Password"
        label="Password"
        type="password"
      />
      <div id="clerk-captcha"></div>
      <Button type="submit">Sign Up</Button>
    </>
  );
};

export default SignUpForm;
