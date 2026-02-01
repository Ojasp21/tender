"use client";

import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL!;

export default function AddTenderPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [form, setForm] = useState<any>({
    scope_of_supply: { cable_requirements: [] },
    technical_specifications: {},
    testing_requirements: {},
    delivery_timeline: {},
    pricing_details: {},
    evaluation_criteria: {},
    submission_format: {},
  });

  useEffect(() => {
    fetch(`${API}/categories`)
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  const submit = async (e: any) => {
    e.preventDefault();

    const res = await fetch(`${API}/tenders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      alert("Failed to add tender");
      return;
    }

    alert("Tender added successfully");
  };

  return (
    <div className="rfp-container">
      <div className="rfp-document">
        <h1>Add New Tender (RFP)</h1>

        <form onSubmit={submit}>

          {/* BASIC INFO */}
          <h3>Basic Information</h3>

          <input placeholder="Project Name"
            onChange={(e) => setForm({ ...form, project_name: e.target.value })} />

          <input placeholder="Issued By"
            onChange={(e) => setForm({ ...form, issued_by: e.target.value })} />

          <input placeholder="RFP Reference No"
            onChange={(e) => setForm({ ...form, rfp_reference: e.target.value })} />

          <label>Date Issued</label>
          <input type="date"
            onChange={(e) => setForm({ ...form, date_issued: e.target.value })} />

          <label>Submission Deadline</label>
          <input type="date"
            onChange={(e) => setForm({ ...form, submission_deadline: e.target.value })} />

          <select
            onChange={(e) => setForm({ ...form, category_id: e.target.value })}
          >
            <option>Select Category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          {/* PROJECT OVERVIEW */}
          <h3>Project Overview</h3>
          <textarea
            placeholder="Project overview..."
            onChange={(e) =>
              setForm({ ...form, project_overview: e.target.value })
            }
          />

          {/* SCOPE OF SUPPLY (1 ITEM EXAMPLE) */}
          <h3>Scope of Supply (Example Item)</h3>
          <input placeholder="Item Name"
            onChange={(e) =>
              setForm({
                ...form,
                scope_of_supply: {
                  cable_requirements: [{
                    item: e.target.value,
                    quantity: "1000 meters",
                    conductor_size: "240 mm²",
                    material: "Copper",
                    insulation: "XLPE",
                    cores: "4",
                    armoring: "Steel tape",
                    voltage: "1.1 kV",
                    temperature: "90°C",
                  }]
                }
              })
            }
          />

          {/* TECHNICAL SPECIFICATIONS */}
          <h3>Technical Specifications</h3>
          <textarea
            placeholder="JSON format"
            onChange={(e) =>
              setForm({
                ...form,
                technical_specifications: JSON.parse(e.target.value),
              })
            }
          />

          {/* EVALUATION CRITERIA */}
          <h3>Evaluation Criteria</h3>
          <textarea
            placeholder="JSON format"
            onChange={(e) =>
              setForm({
                ...form,
                evaluation_criteria: JSON.parse(e.target.value),
              })
            }
          />

          {/* SUBMISSION FORMAT */}
          <h3>Submission Format</h3>
          <textarea
            placeholder="JSON format"
            onChange={(e) =>
              setForm({
                ...form,
                submission_format: JSON.parse(e.target.value),
              })
            }
          />

          <button type="submit">Submit Tender</button>
        </form>
      </div>
    </div>
  );
}