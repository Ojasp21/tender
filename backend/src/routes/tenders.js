import express from "express";
import { supabase } from "../supabase.js";

const router = express.Router();

/**
 * Add a tender
 */
router.post("/", async (req, res) => {
  const {
    date_issued,
    issued_by,
    project_name,
    rfp_reference,
    submission_deadline,
    category_id,

    project_overview,
    scope_of_supply,
    technical_specifications,
    testing_requirements,
    delivery_timeline,
    pricing_details,
    evaluation_criteria,
    submission_format,
  } = req.body;

  const { data, error } = await supabase
    .from("tenders")
    .insert([
      {
        date_issued,
        issued_by,
        project_name,
        rfp_reference,
        submission_deadline,
        category_id,

        project_overview,
        scope_of_supply,
        technical_specifications,
        testing_requirements,
        delivery_timeline,
        pricing_details,
        evaluation_criteria,
        submission_format,
      },
    ])
    .select()
    .single();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(201).json(data);
});

/**
 * Get all tenders (with category name)
 */
router.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("tenders")
    .select(`
      id,
      date_issued,
      issued_by,
      project_name,
      rfp_reference,
      submission_deadline,
      category_id,
      created_at,
      categories ( id, name )
    `)
    .order("date_issued", { ascending: false });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json(data);
});

/**
 * Get single tender by ID
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("tenders")
    .select(`
      id,
      date_issued,
      issued_by,
      project_name,
      rfp_reference,
      submission_deadline,
      category_id,

      project_overview,
      scope_of_supply,
      technical_specifications,
      testing_requirements,
      delivery_timeline,
      pricing_details,
      evaluation_criteria,
      submission_format,

      created_at,
      categories ( id, name )
    `)
    .eq("id", id)
    .single();

  if (error) {
    return res.status(404).json({ error: error.message });
  }

  res.json(data);
});

/**
 * Get tenders by category
 */
router.get("/category/:categoryId", async (req, res) => {
  const { categoryId } = req.params;

  const { data, error } = await supabase
    .from("tenders")
    .select("*")
    .eq("category_id", categoryId);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json(data);
});

export default router;