export const getTuition = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.trim() || "http://localhost:5000";
  try {
    const res = await fetch(`${baseUrl}/tuition`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
};

export const getTuitionDetails = async (id: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.trim() || "http://localhost:5000";

  // 1. Try GET /tuition/:id
  try {
    const res = await fetch(`${baseUrl}/tuition/${id}`, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      if (data && !data.message) return data;
    }
  } catch {}

  // 2. Try GET /tuitions/:id (in case backend route uses plural)
  try {
    const res = await fetch(`${baseUrl}/tuitions/${id}`, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      if (data && !data.message) return data;
    }
  } catch {}

  // 3. Fallback: find from all tuitions list (prevents 404 if direct endpoint fails or isn't running)
  try {
    const list = await getTuition();
    if (Array.isArray(list)) {
      const found = list.find(
        (t: { _id?: string; id?: string }) => t._id === id || t.id === id
      );
      if (found) return found;
    }
  } catch {}

  return null;
};

export const updateTuition = async (
  id: string,
  updateData: Record<string, unknown>
) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.trim() || "http://localhost:5000";
  try {
    const res = await fetch(`${baseUrl}/tuition/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });
    const data = await res.json().catch(() => ({}));
    return { ok: res.ok, ...data };
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    return { ok: false, message: err.message };
  }
};

export const deleteTuition = async (id: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.trim() || "http://localhost:5000";
  try {
    const res = await fetch(`${baseUrl}/tuition/${id}`, {
      method: "DELETE",
    });
    const data = await res.json().catch(() => ({}));
    return { ok: res.ok, ...data };
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    return { ok: false, message: err.message };
  }
};
