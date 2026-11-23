/**
 * Upload an image file directly to ImgBB and return its hosted URL.
 */
export const uploadToImgBB = async (file: File): Promise<string> => {
  const apiKey =
    process.env.NEXT_PUBLIC_IMGBB_API_KEY?.trim() ||
    "ff81d4b3d38d8b56b68371092e635d2b";

  if (!apiKey) {
    throw new Error("ImgBB API key is missing.");
  }

  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(
      errorData?.error?.message || `Image upload failed (status ${res.status}).`
    );
  }

  const json = await res.json();
  const imageUrl = json?.data?.display_url || json?.data?.url;

  if (!imageUrl) {
    throw new Error("ImgBB did not return a valid image URL.");
  }

  return imageUrl;
};
