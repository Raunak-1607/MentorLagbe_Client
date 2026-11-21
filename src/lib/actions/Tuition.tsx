export const getTuition = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tuition`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
};
