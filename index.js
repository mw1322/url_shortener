import express from "express";
import connectDb from "./db/index.js";
import URL from "./models/url.js";
const app = express();
app.use(express.json());
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
const PORT =process.env.port || 8001 ;

connectDb(); //Database connected 


app.listen(PORT,() => {
    console.log(`Server is running at port : ${PORT}`);
});

app.get("/",(req,res) => {
    res.json({
        success : true
    })
})

//Routes;

import urlRoute from "./routes/url.js";

app.use("/url",urlRoute);
app.get('/:shortId',async (req,res) => {
    const shortId = req.params.shortId;
   const entry =  await URL.findOneAndUpdate({shortId:shortId}, {
      $push: {
        visitHistory : {
            timestamp : Date.now()
        },
      },
    });
    console.log(entry);
    res.redirect(entry.redirectURL);
});
app.get('/url/analytics/:id',async (req,res) => {
    const entry = await URL.findOne({shortId : req.params.id});
    console.log(entry);
    return res.json({
      totalClicks: entry.visitHistory.length,
      analytics: entry.visitHistory,
    });
})