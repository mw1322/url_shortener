import { nanoid } from "nanoid";
import URL from "../models/url.js";

async function handleGenerateNewShortURL (req,res){
    const url = req.body.url;
    if(!url)  res.status(400).json({error : "url is required"});
    const shortId = nanoid(6);

    await URL.create ({
        shortId : shortId,
        redirectURL : url,
        visitHistory : [],
    });
    res.json({shortId : shortId});
}
export { handleGenerateNewShortURL};