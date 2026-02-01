import express from "express";
import cors from "cors";

import tenderRoutes from "./routes/tenders.js";
import categoryRoutes from "./routes/categories.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 Tender API is running");
});

app.use("/api/tenders", tenderRoutes);
app.use("/api/categories", categoryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});