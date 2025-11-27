import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 10000;

// ECB — официальный канал
const ECB_CHANNEL_ID = "UCvQECJukTDE2i6aCoMnS-Vg";

app.get("/ecb", async (req, res) => {
  const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${ECB_CHANNEL_ID}`;

  try {
    const response = await fetch(rssUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Accept": "application/xml"
      }
    });

    // получаем XML
    const xml = await response.text();

    // отправляем как XML
    res.set("Content-Type", "application/xml; charset=utf-8");
    res.send(xml);

  } catch (err) {
    res.status(500).send("Proxy Error: " + err.message);
  }
});

// корневая страница
app.get("/", (req, res) => {
  res.send("YouTube Proxy is running. Try /ecb");
});

app.listen(PORT, () => {
  console.log(`Proxy running on port ${PORT}`);
});
