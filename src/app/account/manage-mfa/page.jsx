'use client';

import * as React from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// If TOTP is enabled, provide the option to disable it
const TotpEnabled = () => {
  const { user } = useUser();

  const disableTOTP = async () => {
    await user?.disableTOTP();
  };

  return (
    <div>
      <p>
        TOTP via authentication app enabled - <button onClick={() => disableTOTP()}>Remove</button>
      </p>
    </div>
  );
};

// If TOTP is disabled, provide the option to enable it
const TotpDisabled = () => {
  return (
    <div>
      <p>
        Add TOTP via authentication app -{' '}
        <Link href="/account/manage-mfa/add">
          <Button>Add</Button>
        </Link>
      </p>
    </div>
  );
};

// Generate and display backup codes
export function GenerateBackupCodes() {
  const { user } = useUser();
  const [backupCodes, setBackupCodes] = React.useState(undefined);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (backupCodes) {
      return;
    }

    setLoading(true);
    void user
      ?.createBackupCode()
      .then((backupCode) => {
        setBackupCodes(backupCode);
        setLoading(false);
      })
      .catch((err) => {
        console.error(JSON.stringify(err, null, 2));
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!backupCodes) {
    return <p>There was a problem generating backup codes</p>;
  }

  return (
    <ol>
      {backupCodes.codes.map((code, index) => (
        <li key={index}>{code}</li>
      ))}
    </ol>
  );
}

export default function ManageMFA() {
  const { isLoaded, user } = useUser();
  const [showNewCodes, setShowNewCodes] = React.useState(false);

  if (!isLoaded) return null;

  if (!user) {
    return <p>You must be logged in to access this page</p>;
  }

  return (
    <>
     <Card className="max-w-lg mx-auto mt-8 shadow-lg">
  <CardHeader>
    <CardTitle className="text-xl font-semibold">User MFA Settings</CardTitle>
  </CardHeader>
  <CardContent className="space-y-4">
    {/* Manage TOTP MFA */}
    {user.totpEnabled ? <TotpEnabled /> : <TotpDisabled />}

    {/* Manage backup codes */}
    {user.backupCodeEnabled && user.twoFactorEnabled && (
      <Card className="p-4">
        <CardContent className="flex justify-between items-center">
          <p className="text-gray-700">Generate new backup codes?</p>
          <Button onClick={() => setShowNewCodes(true)}>Generate</Button>
        </CardContent>
      </Card>
    )}
    
    {showNewCodes && (
      <>
        <GenerateBackupCodes />
        <Button className="w-full mt-2" onClick={() => setShowNewCodes(false)}>Done</Button>
      </>
    )}
  </CardContent>
</Card>

    </>
  );
}

