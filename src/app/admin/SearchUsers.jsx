"use client";

import FormInputField from "@/components/share/form/FormInputField";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export const SearchUsers = () => {
  const form = useForm();
  const router = useRouter();
  const pathname = usePathname();
  const onSearchUser = (data) => {
    const queryTerm = data?.search;
    if (queryTerm) {
      router.push(`${pathname}?search=${queryTerm}`);
    }
  };
  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSearchUser)}>
          <CardContent>
            <CardTitle className=" flex justify-center">
              Search for users
            </CardTitle>
            <FormInputField
              name="search"
              form={form}
              type="text"
              placeholder="Search User"
              label="Search User"
            />
          </CardContent>
          <CardFooter>
            <Button type="submit">Submit</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
