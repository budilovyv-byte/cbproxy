import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 10000;

app.get("/ecb", async (req, res) => {
  const url =
    "https://www.youtube.com/feeds/videos.xml?channel_id=UC3fCcf6tR2P7qz-XgCmxpQg&gl=US&hl=en&persist_gl=1&persist_hl=1";

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Accept":
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache",
        "Upgrade-Insecure-Requests": "1",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Sec-Fetch-User": "?1",
        "Connection": "keep-alive",
        "Referer": "https://www.youtube.com/",
        "Priority": "u=0, i"
      }
    });

    const xml = await response.text();
    res.set("Content-Type", "application/xml");
    res.send(xml);
  } catch (err) {
    res.status(500).send("Proxy Error: " + err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Proxy running on port ${PORT}`);
});
