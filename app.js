const express = require("express");
const https = require("https");
const bodyParser=require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req, res) {

  res.sendFile(__dirname+"/index.html");

});

app.post("/",function(req,res){

  //console.log(req.body.cityName);

  const query=req.body.cityName;
  const apiKey="3a2a082c72575033b26e5a6e4fcbac6e";
  const unit="metric";


  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;




  https.get(url, function(response) {
    //console.log(response);
    console.log(response.statusCode);


    response.on("data", function(data) {
      const weatherData = JSON.parse(data)
      //console.log(weatherData);

      const temp = weatherData.main.temp;
      console.log(temp);

      const weatherDescription = weatherData.weather[0].description;
      console.log(weatherDescription);

      const icon =weatherData.weather[0].icon;
      const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";





      res.write("<p> The weather is currently " + weatherDescription + "</p>");
      res.write("<h1>the temperature in "+query+" is " + temp + " degree celsius.</h1>");
      res.write("<img src="+imageURL+">");
      res.send();

      /*
      const object={
        name:"soumya",
        favouritefood:"italian"
      }

      console.log(JSON.stringify(object));

      */



    });


  });

  //  res.send("Server is up and running");



});









app.listen(3000, function() {
  console.log("server is running on port 3000");
});
