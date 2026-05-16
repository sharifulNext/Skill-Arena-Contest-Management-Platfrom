// lib/cloudinary.ts

export const uploadToCloudinary = async (base64Image: string): Promise<string> => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = "kliswolj"; // ✅ আপনার unsigned preset

  const formData = new FormData();
  formData.append("file", base64Image);
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", "contest-banners");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error?.message || "Cloudinary upload failed");
  }

  const data = await res.json();
  return data.secure_url; // ✅ Cloudinary HTTPS URL
};