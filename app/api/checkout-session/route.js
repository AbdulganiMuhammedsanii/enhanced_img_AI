import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { priceId, referrer, userId } = await req.json();  // Add referrer and userId to the body

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/generatepremium`,
      cancel_url: referrer || `${process.env.NEXT_PUBLIC_BASE_URL}/services`, // Use the referrer if provided
      metadata: {
        userId,  // Include the Clerk user ID in the metadata
      },
    });

    console.log("Metadata being sent to Stripe:", { userId, referrer });

    return new Response(JSON.stringify({ id: session.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
