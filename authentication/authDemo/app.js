var express = require("express");
var app = express();

//Setting up ejs
app.set('view engine', 'ejs');

/*=========================================
    |    |    ROUTES
=========================================*/


app.get("/", function(req, res){
   res.render("home"); 
});

app.get("/secret", function(req, res){
    res.render("secret");
})

//Start Server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Auth Demo Server Has SpunUp");
});