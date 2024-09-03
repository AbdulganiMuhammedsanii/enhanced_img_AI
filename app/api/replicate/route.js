import Replicate from "replicate";

export async function POST(req) {
  const replicate = new Replicate();

  try {
    const { imgCurr } = await req.json(); // Extract the imageUrl from the request body
    
    // Log the specific parts of the request
    console.log("Request method:", req.method);
    console.log("Request headers:", req.headers);
    console.log("Received POST request with imageUrl:", imgCurr);

    // Call the Replicate API with the image URL
    const input = {
      img: imgCurr,
  };
    const output = await replicate.run(
      "tencentarc/gfpgan:0fbacf7afc6c144e5be9767cff80f25aff23e52b0708f17e20f9879b2f21516c",
      { input } // Ensure this is a number
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
