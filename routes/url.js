import express from "express";
import { analyticsData, handleGenerateNewShortURL, redirectUrl } from "../controllers/url.js";
const router = express.Router();

router.post("/", handleGenerateNewShortURL)
router.get("/:shortId",redirectUrl)
router.get("/analytics/:id",analyticsData)

export default router;
