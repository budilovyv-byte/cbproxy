import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 10000;

// === ПРАВИЛЬНЫЙ channel_id Европейского Центробанка ===
const ECB_CHANNEL_ID = "UCbA3DQ-d6W4YTcBqzR0jJWA";

app.get("/", (req, res) => {
  res.send("YouTube Proxy is running");
});

app.get("/:channel", async (req, res) => {
  const channelParam = req.params.channel;

  const channelId =
    channelParam === "ecb" ? ECB_CHANNEL_ID : channelParam;

  const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return res.status(response.status).send("Failed to fetch RSS feed");
    }

    const xml = await response.text();

    res.set("Content-Type", "application/xml; charset=utf-8");
    res.send(xml);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Proxy running on port ${PORT}`);
});
