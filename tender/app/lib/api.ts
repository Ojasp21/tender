const API = process.env.NEXT_PUBLIC_API_URL!;

export async function getCategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
    cache: "no-store",
  });
  return res.json();
}

export async function getTenders() {
  const res = await fetch(`${API}/tenders`, { cache: "no-store" });
  return res.json();
}

export async function getTenderById(id: string) {
  const res = await fetch(`${API}/tenders/${id}`, { cache: "no-store" });
  return res.json();
}

export async function addTender(data: any) {
  const res = await fetch(`${API}/tenders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

