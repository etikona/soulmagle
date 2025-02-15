import express from "express";
import { Match } from "../models/Match.js";
import pool from "../config/db.js";

const router = express.Router();
const matchModel = new Match();

// *Get the closest match based on user's interest vector
router.get("/", async (req, res) => {
  const { vector } = req.query;

  if (!vector) {
    return res.status(400).json({ message: "Vector data is required" });
  }

  let parsedVector;
  try {
    parsedVector = JSON.parse(vector);
    if (!Array.isArray(parsedVector) || parsedVector.length === 0) {
      return res.status(400).json({ message: "Invalid vector format" });
    }
  } catch (err) {
    return res.status(400).json({ message: "Invalid JSON format for vector" });
  }

  try {
    const match = await matchModel.findClosestMatch(parsedVector);
    if (match) {
      res.status(200).json({ match });
    } else {
      res.status(404).json({ message: "No suitable match found" });
    }
  } catch (err) {
    console.error("Error finding match:", err);
    res.status(500).json({ message: "Error retrieving match" });
  }
});

export default router;
