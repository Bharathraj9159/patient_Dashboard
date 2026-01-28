import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());

// ✅ Coalition API Basic Auth key (encoded)
const AUTH_KEY = "Basic Y29hbGl0aW9uOnNraWxscy10ZXN0";

app.get("/api/patients", async (req, res) => {
  try {
    const response = await axios.get(
      "https://fedskillstest.coalitiontechnologies.workers.dev",
      {
        headers: { Authorization: AUTH_KEY },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching patient data:", error.message);
    res.status(500).json({ error: "Failed to fetch patient data" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
