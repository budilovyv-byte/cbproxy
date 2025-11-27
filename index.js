import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Proxy working!");
});

// ECB feed
app.get("/ecb", async (req, res) => {
  const url =
    "https://www.youtube.com/feeds/videos.xml?channel_id=UC3fCcf6tR2P7qz-XgCmxpQg"; // <-- ECB

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const xml = await response.text();
    res.setHeader("Content-Type", "application/xml");
    res.send(xml);

  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(PORT, () => console.log("Proxy running on " + PORT));
