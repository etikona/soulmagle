import express from "express";
import axios from "axios";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { processAudioToText } from "../utils/speechToText.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/process", upload.single("audio"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Audio file is required" });
  }

  try {
    const audioPath = req.file.path;
    const transcription = await processAudioToText(audioPath);
    const keywords = transcription.split(" ").filter((word) => word.length > 3);
    res.status(200).json({ transcription, keywords });
  } catch (error) {
    console.error("Audio processing failed:", error);
    res.status(500).json({ message: "Audio processing failed" });
  }
});

export default router;
