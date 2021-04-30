const express=require('express');
const https=require('https');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function (req,res){
    res.sendFile(__dirname+"/index.html");
})
app.post("/",function(req,res){

    const apiKey="3017cd2d3eaa94b1e0b758c886aa6a48";
    let city=req.body.cityName;
    let url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units=metric"
    https.get(url,function(response){
        response.on("data",function (data){
            const weatherData=JSON.parse(data);
            let temp=weatherData.weather[0].description
            res.write("<h1> Temperature is "+temp+"</h1>");
            res.send();

        })
    })
})

app.listen(3000,function (){
    console.log("Server is Running on Port 3000");
})