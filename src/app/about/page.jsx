"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
const About =  () => {
  return (
    <>
      <div className="flex justify-center py-8">
        <Card className="mt-5 max-w-3xl w-full shadow-lg border rounded-lg bg-white">
          <CardHeader className="bg-gray-800 text-white rounded-t-lg p-6">
            <CardTitle className="text-2xl font-bold">
              About The Clerk
            </CardTitle>
            <CardDescription className="text-lg">
              Clerk is a modern authentication solution that enables you to add
              authentication and user management to your Next.js application
              seamlessly. It provides customizable sign-in, sign-up, and profile
              management.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700 leading-relaxed">
              With Clerk, you can integrate features like OAuth providers
              (Google, GitHub, etc.), user sessions, and role-based access
              controls with minimal effort. Its simplicity and security make it
              ideal for modern web applications.
            </p>
          </CardContent>
          <CardFooter className="bg-gray-50 p-6 rounded-b-lg">
            <div>
              <p className="text-gray-600">
                For more details, visit the official Clerk documentation:
              </p>
              <a
                href="https://clerk.dev/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline hover:text-blue-700 transition-all"
              >
                Clerk Documentation
              </a>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default About;
