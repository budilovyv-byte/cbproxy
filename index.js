import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 10000;

// === ОБНОВИ ТОЛЬКО ЭТУ СТРОКУ ДЛЯ НУЖНОГО КАНАЛА ===
const ECB_CHANNEL_ID = "UCfHZLan2yRU5fP5l1EzC1Vg";

// ———————————————————————————————————————————————
// Главная: проверка, что сервис работает
// ———————————————————————————————————————————————
app.get("/", (req, res) => {
  res.send("YouTube Proxy is running");
});

// ———————————————————————————————————————————————
// Основной прокси для YouTube RSS
// ———————————————————————————————————————————————
app.get("/:channel", async (req, res) => {
  const channelParam = req.params.channel;

  // Если заходят по /ecb → используем заранее записанный канал
  const channelId =
    channelParam === "ecb" ? ECB_CHANNEL_ID : channelParam;

  const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return res.status(response.status).send("Failed to fetch RSS feed");
    }

    const xml = await response.text();

    // Правильные заголовки, чтобы Make не ругался
    res.set("Content-Type", "application/xml; charset=utf-8");
    res.send(xml);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// ———————————————————————————————————————————————
// Запуск сервера
// ———————————————————————————————————————————————
app.listen(PORT, () => {
  console.log(`Proxy running on port ${PORT}`);
});
