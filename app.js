const express=require('express');
const app=express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'js')));
app.use(express.static(path.join(__dirname, 'css')));
app.get("/",(req,res)=>{res.render("index.ejs")})

app.listen(process.env.PORT)