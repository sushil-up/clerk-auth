"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { user } = useUser();
  console.log("userhsfgbdsibfiusdf",user)
  return (
    <div className="flex justify-center py-8 ">
      <Card className="mt-5 max-w-3xl w-full shadow-lg border rounded-lg bg-white">
        <CardHeader className="bg-gray-800 text-white rounded-t-lg p-6">
          <CardTitle className="text-2xl font-bold">
            Welcome
            {!user ? <> to Clerk Authentication </> : <> {user?.fullName}</>}
          </CardTitle>
          <CardDescription className="mt-2 text-lg text-white">
            {!user ? (
              <>
                Please sign in to access your account and explore the features
                available for clerks.
              </>
            ) : (
              <>
                Welcome back! Explore the dashboard to access your tasks, view
                reports, and manage your workflows effectively.
              </>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center">
            <p className="text-gray-700 leading-relaxed">
              This portal allows clerks to manage user data, access reports, and
              streamline workflows efficiently.
            </p>
            <Image
              src="/auth.jpg"
              alt="Authentication illustration"
              width={350}
              height={250}
              className="mx-auto rounded-lg shadow-md"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-center py-4 bg-gray-100">
          {!user ? (
            <>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-2 px-6">
                <Link href="/sign-in">Sign In</Link>
              </Button>
            </>
          ) : (
            <></>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
