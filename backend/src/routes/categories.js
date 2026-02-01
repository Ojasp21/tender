import express from "express";
import { supabase } from "../supabase.js";

const router = express.Router();

/**
 * Add a category
 */
router.post("/", async (req, res) => {
  const { name } = req.body;

  const { data, error } = await supabase
    .from("categories")
    .insert([{ name }]);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json(data);
});

/**
 * Get all categories
 */
router.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("categories")
    .select("*");

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json(data);
});

export default router;