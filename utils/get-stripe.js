import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

const getStripe = () => {
  console.log("yoo")
  if (!stripePromise) {
    console.log("yoeeo")
    const apiKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (!apiKey) {
      throw new Error("Stripe public key is not set in the environment variables.");
    }
    stripePromise = loadStripe(apiKey);
  }
  return stripePromise;
};

export default getStripe;