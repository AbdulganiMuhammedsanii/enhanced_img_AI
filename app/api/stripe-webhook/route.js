import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server'; // To update Clerk metadata

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Only allow POST requests for this route
export async function POST(req) {
  try {
    const sig = req.headers.get('stripe-signature'); // Get the signature header

    // Read the raw request body for Stripe's signature verification
    const rawBody = await req.text();

    // Validate the event with Stripe
    const event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);

    // Handle the event type
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      // Get the Clerk user ID from metadata
      const userId = session.metadata.userId;

      // Update Clerk user's metadata to reflect premium access
      await clerkClient.users.updateUser(userId, {
        publicMetadata: {
          hasPremiumAccess: true,
        },
      });

      console.log(`User ${userId} has been granted premium access.`);
    }

    return new NextResponse(JSON.stringify({ received: true }), { status: 200 });
  } catch (error) {
    console.error('Error handling Stripe webhook:', error);
    return new NextResponse('Webhook Error', { status: 400 });
  }
}

// Return 405 (Method Not Allowed) for GET requests
export function GET() {
  return new NextResponse('Method Not Allowed', { status: 405 });
}
