import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/api", async (req, res) => {

  const url = req.query.url;

  if (!url) {
    return res.json({status:"error"});
  }

  try {

    const response = await fetch(url,{
      headers:{
        "User-Agent":"Mozilla/5.0"
      }
    });

    const html = await response.text();

    const match = html.match(/"contentUrl":"(.*?)"/);

    if(match){

      const video = match[1].replace(/\\\//g,"/");

      return res.json({
        video:video
      });

    }

    res.json({status:"error"});

  } catch(err){

    res.json({status:"error"});

  }

});

app.listen(3000,()=>{
console.log("Server running");
});
