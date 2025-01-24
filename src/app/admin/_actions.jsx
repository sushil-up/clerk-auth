'use server';


import { checkRole } from '@/utils/roles';
import { clerkClient } from '@clerk/nextjs/server';

export async function setRole(formData) {
  const client = await clerkClient();
  // Check that the user trying to set the role is an admin
  if (!checkRole('admin')) {
    return { message: 'Not Authorized' };
  }

  try {
    const userId = formData.get('id');
    const role = formData.get('role');

    // Update the user's role metadata
    const res = await client.users.updateUserMetadata(userId, {
      publicMetadata: { role },
    });
    return { message: res.publicMetadata };
  } catch (err) {
    return { message: err.message || 'An error occurred' };
  }
}

export async function removeRole(formData) {
  const client = await clerkClient();

  try {
    const userId = formData.get('id');

    // Remove the role metadata by setting it to null
    const res = await client.users.updateUserMetadata(userId, {
      publicMetadata: { role: null },
    });

    return { message: res.publicMetadata };
  } catch (err) {
    return { message: err.message || 'An error occurred' };
  }
}
