"use client"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";

const FormInputField = ({name,form,placeholder,label,type}) => {
  return (
    <>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input  {...field}  placeholder={placeholder} type={type} />
            </FormControl>
            <FormDescription></FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default FormInputField;
