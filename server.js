const express = require("express");
const QRCode = require("qrcode");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate", async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text is required" });

  try {
    // QR кодыг data URL хэлбэрээр үүсгэнэ
    const qrDataUrl = await QRCode.toDataURL(text);
    res.json({ qr: qrDataUrl });
  } catch (err) {
    res.status(500).json({ error: "QR код үүсгэхэд алдаа гарлаа" });
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
