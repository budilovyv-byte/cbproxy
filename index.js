import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("YouTube Proxy is running");
});

app.get("/ecb", async (req, res) => {
  const url = "https://www.youtube.com/feeds/videos.xml?channel_id=UC3fCcf6tR2P7qz-XgCmxpQg";

  try {
    const response = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    const text = await response.text();
    res.set("Content-Type", "application/xml");
    res.send(text);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
