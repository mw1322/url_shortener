import { nanoid } from "nanoid";
import URL from "../models/url.js";

async function handleGenerateNewShortURL(req, res) {
  const url = req.body.url;
  if (!url) res.status(400).json({ error: "url is required" });
  const shortId = nanoid(6);

  await URL.create({
    shortId: shortId,
    redirectURL: url,
    visitHistory: [],
    createdBy: req.user._id
  });
  return res.render("home", { id: shortId });
  // res.json({ shortId: shortId });
}

async function redirectUrl(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId: shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  // console.log(entry);
  res.redirect(entry.redirectURL);
}
async function analyticsData(req, res) {
  const entry = await URL.findOne({ shortId: req.params.id });
  // console.log(entry);
  return res.json({
    totalClicks: entry.visitHistory.length,
    analytics: entry.visitHistory,
  });
}
export { handleGenerateNewShortURL, redirectUrl, analyticsData };
