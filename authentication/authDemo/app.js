var User                = require("./models/user"), //the User Schema
    express             = require("express"),
    passport            = require("passport"),
    mongoose            = require("mongoose"),
    bodyParser          = require("body-parser"),
    localStrategy       = require("passport-local"),
    passportLocalMongo  = require("passport-local-mongoose")
 

//Sets the app object
var app = express();
//Connect to MongoDB and create the auth_demo_app database
mongoose.connect("mongodb://localhost/auth_demo_app");
//Setting up ejs
app.set('view engine', 'ejs');
//requires and sets-up express sessions in-line 
app.use(require("express-session")({
    secret: "Kaelynn is a sweetie",
    resave: false,
    saveUninitialized: false
}));
//Tell Express to use Passport
app.use(passport.initialize());
app.use(passport.session());
//Reads the sessions, takes data from the session, then encodes it and puts it 
//back into the session. Made possible by the data passed into the UserSchema
//in user.js - UserSchema.plugin(passportLocalMongoose);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserialize());

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