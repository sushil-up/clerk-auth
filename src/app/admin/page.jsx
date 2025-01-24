import { redirect } from "next/navigation";
import { SearchUsers } from "./SearchUsers";
import { clerkClient } from "@clerk/nextjs/server";
import { removeRole, setRole } from "./_actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { checkRole } from "@/utils/roles";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { routsurl } from "@/utils/routs";

export default async function AdminDashboard({ searchParams }) {
  if (!checkRole("admin")) {
    redirect(routsurl.home);
  }
  const query = (await searchParams).search;

  const client = await clerkClient();

  const users = query ? (await client.users.getUserList({ query })).data : [];
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <Card>
          <CardHeader>
            <CardTitle className="p-4 flex justify-center">
              This is the protected admin dashboard restricted to users with the
              `admin` role.
            </CardTitle>
            <CardDescription> </CardDescription>
          </CardHeader>
          <CardContent className="m-3">
            {!query ? (
              <>
                <SearchUsers />
              </>
            ) : (
              <>
                {users.map((user) => {
                  const emailAddress = user.emailAddresses.find(
                    (email) => email.id === user.primaryEmailAddressId
                  )?.emailAddress;

                  return (
                    <Card key={user.id}>
                      <CardHeader>
                        <CardTitle>
                          {user.firstName} {user.lastName}
                        </CardTitle>
                        <CardDescription>
                          User Email: {emailAddress}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        User Role: {user.publicMetadata.role || "Null"}
                      </CardContent>
                      <CardFooter className="flex gap-4  ">
                        <form action={setRole}>
                          <Input type="hidden" value={user.id} name="id" />
                          <Input type="hidden" value="admin" name="role" />
                          <Button type="submit" variant={"ghost"}>
                            Make Admin
                          </Button>
                        </form>

                        <form action={setRole}>
                          <Input type="hidden" value={user.id} name="id" />
                          <Input type="hidden" value="moderator" name="role" />
                          <Button type="submit" variant={""}>
                            Make Moderator
                          </Button>
                        </form>

                        <form action={removeRole}>
                          <Input type="hidden" value={user.id} name="id" />
                          <Button type="submit" variant={"destructive"}>
                            Remove Role
                          </Button>
                        </form>
                      </CardFooter>
                    </Card>
                  );
                })}
              </>
            )}
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </div>
    </>
  );
}
