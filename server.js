import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/api", async (req,res)=>{

const url=req.query.url;

if(!url){
return res.json({status:"error"});
}

try{

const r=await fetch(url,{
headers:{
"User-Agent":"Mozilla/5.0"
}
});

const html=await r.text();

const match=html.match(/"contentUrl":"(.*?)"/);

if(match){

const video=match[1].replace(/\\\//g,"/");

return res.json({video:video});

}

res.json({status:"error"});

}catch(e){

res.json({status:"error"});

}

});

app.listen(PORT,()=>{
console.log("Server running");
});
