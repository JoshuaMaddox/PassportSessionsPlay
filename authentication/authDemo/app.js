var User                = require("./models/user"), //the User Schema
    express             = require("express"),
    passport            = require("passport"),
    mongoose            = require("mongoose"),
    bodyParser          = require("body-parser"),
    localStrategy       = require("passport-local"),
    passportLocalMongo  = require("passport-local-mongoose")
 

//Sets the app object
var app = express();
//Setting up body-parser
app.use(bodyParser.urlencoded({ extended: true }));
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
passport.deserializeUser(User.deserializeUser());

/*=========================================
    |    |    ROUTES
=========================================*/


app.get("/", function(req, res){
   res.render("home"); 
});

app.get("/secret", function(req, res){
    res.render("secret");
})

///////////////
//Auth Routes//
///////////////

//===== SIGN UP =====//

//Shows the sign-up form
app.get("/register", function(req, res){
    res.render("register")
})

//Handle User Sign-up
app.post("/register", function(req, res){
    //Gets the username via req.body.username which was passed into our form and stores that in the database
    //the password is then hashed outside the User object and then the has is stored in the DB as we 
    //don't want to store the password in our DB.
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
          console.log(err); 
          res.render('register');
        } else {
            //logs the user in and handles the session by running the serializeUser method
            //By saying "local" we are saying we want to use the local strategy as opposed to logging in
            //via facebook, google etc...
           passport.authenticate("local")(req, res, function(){
               res.redirect("secret");
           });//passport.auth
        }//First Else Statment
    });//User.register
})//app.post

//===== Login =====//

//Shows the login form
app.get("/login", function(req, res){
    res.render("login");
});

//Start Server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Auth Demo Server Has SpunUp");
});