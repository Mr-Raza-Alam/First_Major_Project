// it is similar as app.js
const express = require("express");
 const path = require("path");
const app = express();
const  users = require("./routes/users.js");
const  posts = require("./routes/posts.js");
const session = require("express-session");
const flash = require("connect-flash");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
const sessionOption = {
   secret :" mysuperSceretString",
   resave : false,
   saveUninitialized : true,
}
app.use(session(sessionOption)); // this is a middleware
app.use(flash()); // this is again a middleware
app.use((req,res,next)=>{// using this middleware i can reduce code size complexity
    res.locals.msg = req.flash("success");
    res.locals.err = req.flash("error");
    next();
});

app.get("/register",(req,res)=>{
  let {name = "anonymous"} = req.query;
  req.session.name = name;
  if(name === "anonymous"){
    req.flash("error","User donot register.Try again!");
  }else{
    req.flash("success","An user has registered successfully!!");
  }
  res.redirect("/hello");
});

app.get("/hello",(req,res)=>{

   res.render("page.ejs",{Name : req.session.name});
   //res.render("./page.ejs",{name : req.session.name,msg : req.flash("sucess")});
});

// app.get("/reqcount",(req,res)=>{
//   if(req.session.count){ 
//        req.session.count++;
//   }else{
//   req.session.count = 1;
//   }
//   res.send(`you send a request ${req.session.count} times`);
// });

// app.get("/test",(req,res)=>{
//   res.send("Test is successful!!");
// });

app.listen(4500,()=>{
  console.log("Server has been started at port : 4500");
});



// const cookieParser = require("cookie-parser");

// app.use(cookieParser("secretcode"));

// app.get("/signedCookie",(req,res)=>{
//    res.cookie("made-in","India",{signed : true});
//    res.send("Singed cookied has been send");
// });

// app.get("/verify",(req,res)=>{
//   console.log(req.signedCookies);
// //  console.log(req.cookies);

//   res.send("verified");
// });

// app.get("/greet",(req,res)=>{
//   let {name = "anonymous"} = req.cookies;
//   res.send(`Hello ,Mr./Miss ${name}`);
// });

// app.get("/getCookies",(req,res)=>{
//    res.cookie("Greet","Namsakar");
//    res.cookie("Quote","Welcome to our page");
//    res.send("Sending cookie get routes");
// });
// app.get("/",(req,res)=>{
//    console.dir(req.cookies);
//    res.send("Hi , I am a root");
// });
// // for users
// app.use("/users",users);

// // for posts
// app.use("/posts",posts);


// for users
// app.get("/users",(req,res)=>{
//   res.send("Get Route for user index");
// });
// app.get("/users/:id",(req,res)=>{
//   res.send("Get Route for user id");
// });
// app.post("/users",(req,res)=>{
//   res.send("Post Route for user");
// });
// app.delete("/users/:id",(req,res)=>{
//   res.send("Delete Route for user");
// });

// for posts

// app.get("/users",(req,res)=>{
//   res.send("Get Route for posts index");
// });
// app.get("/users/:id",(req,res)=>{
//   let{id} = req.params;
//   res.send(`Get Route for posts and get-id : ${id}`);
// });
// app.post("/posts",(req,res)=>{
//   res.send("Post Route for posts ");
// });
// app.delete("/posts/:id",(req,res)=>{
//   res.send("Delete Route for posts");
// });
