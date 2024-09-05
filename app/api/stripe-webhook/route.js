import { buffer } from "micro";
import Stripe from "stripe";
import { clerkClient } from "@clerk/nextjs/server";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: {
    bodyParser: false, // Stripe requires the raw body to validate the webhook signature
  },
};

export async function POST(req) {
  const buf = await buffer(req);
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err) {
    console.error(`⚠️  Webhook signature verification failed.`, err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle the checkout session completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    // Fetch the user ID from session metadata (set during checkout session creation)
    const userId = session.metadata.userId;

    if (userId) {
      // Update the Clerk user's metadata to indicate that they have premium access
      await clerkClient.users.updateUser(userId, {
        publicMetadata: {
          hasPremiumAccess: true,
        },
      });

      console.log(`✅ Premium access granted to user: ${userId}`);
    }
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}
