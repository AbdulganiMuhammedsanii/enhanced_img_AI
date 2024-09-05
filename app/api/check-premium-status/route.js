import { clerkClient } from "@clerk/nextjs/server"; // Correct import

export async function POST(req) {
  try {
    const { userId } = await req.json(); // Parse JSON from the request

    if (!userId) {
      return new Response(JSON.stringify({ error: 'User ID is required' }), {
        status: 400,
      });
    }

    // Fetch the user from Clerk using the userId
    const user = await clerkClient.users.getUser(userId); // Use the clerkClient function directly

    // Check the user's metadata to see if they have premium access
    const hasPremiumAccess = user.publicMetadata?.hasPremiumAccess || false;

    // Return the premium access status
    return new Response(JSON.stringify({ hasPremiumAccess }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error checking premium status:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}
