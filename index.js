const express = require("express");
const app = express();
app.use(express.json());

app.post("/", async (req, res) => {
  if (req.headers["x-proxy-secret"] !== process.env.PROXY_SECRET) {
    return res.status(403).json({ error: "Forbidden" });
  }
  try {
    const response = await fetch("https://api.digiflazz.com/v1/transaction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT || 8080, () => console.log("Proxy running!"));