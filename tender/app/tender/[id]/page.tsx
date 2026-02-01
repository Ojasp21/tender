import { getTenderById } from "../../lib/api";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function TenderDetails({ params }: PageProps) {
  const { id } = await params;
  const t = await getTenderById(id);

  return (
    <div className="detail-box">

  {/* HEADER */}
  <h1 className="doc-title">{t.project_name}</h1>

  <div className="meta">
    <p><b>Issued By:</b> {t.issued_by}</p>
    <p><b>RFP Reference No.:</b> {t.rfp_reference}</p>
    <p><b>Date Issued:</b> {new Date(t.date_issued).toLocaleDateString()}</p>
    <p><b>Submission Deadline:</b> {new Date(t.submission_deadline).toLocaleDateString()}</p>
    <p><b>Category:</b> {t.categories?.name}</p>
  </div>

  <hr />

  {/* 1. PROJECT OVERVIEW */}
  <section>
    <h2>1. Project Overview</h2>
    <p>{t.project_overview}</p>
  </section>

  {/* 2. SCOPE OF SUPPLY */}
  <section>
    <h2>2. Scope of Supply</h2>

    {t.scope_of_supply?.cable_requirements?.map((item: any, i: number) => (
      <div key={i} className="scope-card">
        <h3>{item.item}</h3>
        <ul>
          <li><b>Quantity:</b> {item.quantity}</li>
          <li><b>Conductor Size:</b> {item.conductor_size}</li>
          <li><b>Material:</b> {item.material}</li>
          <li><b>Insulation:</b> {item.insulation}</li>
          <li><b>No. of Cores:</b> {item.cores}</li>
          <li><b>Armoring:</b> {item.armoring}</li>
          <li><b>Rated Voltage:</b> {item.voltage}</li>
          <li><b>Temperature Rating:</b> {item.temperature}</li>
        </ul>
      </div>
    ))}
  </section>

  {/* 3. TECHNICAL SPECIFICATIONS */}
  <section>
    <h2>3. Technical Specifications</h2>
    <ul>
      <li><b>Indian Standards:</b> {t.technical_specifications?.standards?.indian?.join(", ")}</li>
      <li><b>International Standards:</b> {t.technical_specifications?.standards?.international?.join(", ")}</li>
      <li><b>Certification:</b> {t.technical_specifications?.certification}</li>
    </ul>
  </section>

  {/* 4. ACCEPTANCE & TEST REQUIREMENTS */}
  <section>
    <h2>4. Acceptance & Test Requirements</h2>

    <h4>Pre-Delivery Tests</h4>
    <ul>
      {t.testing_requirements?.pre_delivery?.map((x: string, i: number) => (
        <li key={i}>{x}</li>
      ))}
    </ul>

    <h4>On-Site Tests</h4>
    <table>
      <thead>
        <tr>
          <th>Test</th>
          <th>Cost (₹)</th>
        </tr>
      </thead>
      <tbody>
        {t.testing_requirements?.on_site?.map((x: any, i: number) => (
          <tr key={i}>
            <td>{x.test}</td>
            <td>{x.cost.toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <p><b>Total Estimated Cost:</b> ₹{t.testing_requirements?.total_estimated_cost.toLocaleString()}</p>
  </section>

  {/* 5. DELIVERY TIMELINE */}
  <section>
    <h2>5. Delivery Timeline</h2>
    <ul>
      <li><b>Order Placement:</b> {t.delivery_timeline?.order_placement}</li>
      <li><b>Manufacturing Lead Time:</b> {t.delivery_timeline?.manufacturing_lead_time_days} days</li>
      <li><b>Delivery Date:</b> {t.delivery_timeline?.delivery_date}</li>
      <li><b>Installation Completion:</b> {t.delivery_timeline?.installation_completion}</li>
    </ul>
  </section>

  {/* 6. PRICING DETAILS */}
  <section>
    <h2>6. Pricing Details</h2>
    <ul>
      {t.pricing_details?.pricing_structure?.map((x: any, i: number) => (
        <li key={i}>{x.item} – {x.unit_price}</li>
      ))}
    </ul>
   {t.pricing_details?.testing_cost !== undefined && (
  <p>
    <b>Testing Cost:</b>{" "}
    ₹{Number(t.pricing_details.testing_cost).toLocaleString()}
  </p>
)}
    <p><b>Warranty:</b> {t.pricing_details?.warranty}</p>
  </section>

  {/* 7. EVALUATION CRITERIA */}
  <section>
    <h2>7. Evaluation Criteria</h2>
    <ul>
      <li><b>Technical Compliance:</b> {t.evaluation_criteria?.technical_compliance}</li>
      <li><b>Delivery Capability:</b> {t.evaluation_criteria?.delivery_capability}</li>
      <li><b>Price Weightage:</b> {t.evaluation_criteria?.price_weightage_percent}%</li>
      <li><b>Certification:</b> {t.evaluation_criteria?.certification}</li>
      <li><b>After-Sales Support:</b> {t.evaluation_criteria?.after_sales_support_years} years</li>
    </ul>
  </section>

  {/* 8. SUBMISSION FORMAT */}
  <section>
    <h2>8. Submission Format</h2>
    <p><b>Submission Mode:</b> {t.submission_format?.submission_mode}</p>
    <ul>
      {t.submission_format?.documents_required?.map((x: string, i: number) => (
        <li key={i}>{x}</li>
      ))}
    </ul>
  </section>

</div>
  );
}