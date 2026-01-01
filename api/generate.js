const QRCode = require("qrcode");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST method allowed" });
  }

  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  try {
    const qrDataUrl = await QRCode.toDataURL(text);
    res.status(200).json({ qr: qrDataUrl });
  } catch (err) {
    res.status(500).json({ error: "QR код үүсгэхэд алдаа гарлаа" });
  }
};
