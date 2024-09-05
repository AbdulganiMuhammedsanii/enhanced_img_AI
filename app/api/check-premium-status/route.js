import { auth, currentUser } from '@clerk/nextjs/server';

export async function GET(req) {
  // Get the userId from the current session
  const { userId } = auth();

  if (!userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
    });
  }

  // Get full user details from Clerk
  const user = await currentUser();
  console.log("abdulgani", user.publicMetadata);
  const hasPremiumAccess = user.publicMetadata?.hasPremiumAccess;
  console.log(hasPremiumAccess)
  return new Response(JSON.stringify({ hasPremiumAccess }), {
    status: 200,
  });
}
