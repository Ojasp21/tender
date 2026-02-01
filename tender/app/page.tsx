"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CategoryFilter from "./components/CategoryFilter";

const API = process.env.NEXT_PUBLIC_API_URL!;

export default function HomePage() {
  const [tenders, setTenders] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetch(`${API}/tenders`)
      .then((res) => res.json())
      .then(setTenders);

    fetch(`${API}/categories`)
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  const filteredTenders = selectedCategory
    ? tenders.filter((t) => t.category_id === selectedCategory)
    : tenders;

  return (
  <>
    <h1>Available Government Tenders</h1>

    <CategoryFilter
      categories={categories}
      selected={selectedCategory}
      onChange={setSelectedCategory}
    />

    <div className="tender-grid">
      {filteredTenders.map((t) => (
        <div key={t.id} className="card">
          <h3>{t.project_name}</h3>

          <p>
            <b>Date Issued:</b>{" "}
            {new Date(t.date_issued).toLocaleDateString()}
          </p>

          <p>
            <b>Issued By:</b> {t.issued_by}
          </p>

          <p>
            <b>RFP Reference No.:</b> {t.rfp_reference}
          </p>

          <p>
            <b>Submission Deadline:</b>{" "}
            {new Date(t.submission_deadline).toLocaleDateString()}
          </p>

          <p>
            <b>Category:</b> {t.categories?.name}
          </p>

          <Link href={`/tender/${t.id}`}>View RFP Details</Link>
        </div>
      ))}
    </div>

    {filteredTenders.length === 0 && (
      <p>No tenders found for this category.</p>
    )}
  </>
);
}