import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { image } = await req.json();

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "recovery");

    const cloudinaryResponse = await fetch(
      `https://api.cloudinary.com/v1_1/diayr55mk/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!cloudinaryResponse.ok) {
      const error = await cloudinaryResponse.json();
      return NextResponse.json({ error: "Failed to upload image to Cloudinary", details: error }, { status: 500 });
    }

    const cloudinaryData = await cloudinaryResponse.json();
    const publicImageUrl = cloudinaryData.secure_url;
    return NextResponse.json({ url: publicImageUrl }, { status: 200 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
