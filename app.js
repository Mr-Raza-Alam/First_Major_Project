// 
 const express = require("express");
 const path = require("path");
 const app = express();
 const mongoose = require("mongoose");
 const methodOverride = require("method-override");
 app.use(methodOverride("_method"));
 // now established Web server at some port 
app.listen(3300,()=>{
    console.log("Web server has been started at port : 3300.");
});
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"view"));
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname,"public")));

// now established DataBase connection
async function main(){
   await mongoose.connect("mongodb://127.0.0.1:27017/wanderTust");
}
 // call main function
 main().then((res)=>{
    console.log("DB Connection has been done successfully!!");
 }).catch((err)=>{
    console.log(err);
 });
// require Listing model from models directory
const list = require("./models/listing.js");
const { title } = require("process");

 app.get("/",(req,res)=>{
    res.send("Hi, welcome to web-server services..");
 });
 // Index Route--- use to display all data from Database
  app.get("/listing",async(req,res)=>{
    const allList = await list.find({});
    res.render("./listings/listPlace.ejs",{allList});
  });

// show Route--- for all individual  list
 app.get("/listing/:id",async(req,res)=>{
   let {id} = req.params;
   const showList = await list.findById(id);
    res.render("./listings/showPlace.ejs",{showList});
 });
  

//  //Route--- /Test/listing
//  app.get("/test/listing",async(req,res)=>{
//    let sample1 = new list({// a sample1 is inserted to test it
//      title : "My new Villa",
//      description : "By the beeche , a very beautiful naturic location.please visit once ",
//      price : 1200,
//      location : "Calangute, Goa",
//      country : "India",
//    });
//    // save 
//   await sample1.save().
//    then((res)=>{
//      console.log("Successfully the sample data has been saved");
//    }).catch((err)=>{
//     console.log(err);
//    });
//  // now response something to client site on request
//    res.send("Hurray!!You have successfully done everything properly.");
//  });

