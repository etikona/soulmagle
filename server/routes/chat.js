import express from "express";
const router = express.Router();
router.post("/send", (req, res) => {
  //* Store chat messages in DB
  res.json({ message: "Message sent" });
});
export default router;
