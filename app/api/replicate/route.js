import Replicate from "replicate";

export async function POST(req) {
  const replicate = new Replicate();

  try {
    const { imageUrl } = await req.json(); // Extract the imageUrl from the request body
    
    // Log the specific parts of the request
    console.log("Request method:", req.method);
    console.log("Request headers:", req.headers);
    console.log("Received POST request with imageUrl:", imageUrl);

    // Call the Replicate API with the image URL
    const output = await replicate.run(
      "sczhou/codeformer:7de2ea26c616d5bf2245ad0d5e24f0ff9a6204578a5c876db53142edd9d2cd56",
      { input: { image: imageUrl, codeformer_fidelity: 0.1 } } // Ensure this is a number
    );

    console.log("Replicate API output:", output);

    // Return a new Response object with the output
    return new Response(JSON.stringify({ output }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching from Replicate API:', error);

    // Return a Response object with error information
    return new Response(JSON.stringify({ error: 'Failed to fetch image from Replicate API' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
