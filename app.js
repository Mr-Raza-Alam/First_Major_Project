// 
 const express = require("express");
 const path = require("path");
 const app = express();
 const mongoose = require("mongoose");
 const methodOverride = require("method-override");
 app.use(methodOverride("_method"));

 const ejsMate = require("ejs-mate");
 // now established Web server at some port 
app.listen(3300,()=>{
    console.log("Web server has been started at port : 3300.");
});
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"view"));
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname,"public")));
app.engine("ejs",ejsMate);//define an engine for ejsMate Of EJS

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
    res.render("listings/listPlace.ejs",{allList});
  });
  
 // New Route-- for getting a form for creating new information insertion from client site 
  app.get("/listing/new",(req,res)=>{
     res.render("listings/new.ejs");
  });
  // Back Route -- to come back at home page
  app.get("/listing/back",(req,res)=>{
    res.redirect("/listing");
  });
  // edit Back Route -- for return back to 
  app.get("/listing/:id/editBack",(req,res)=>{
     let {id} = req.params;
    res.redirect(`/listing/${id}`);
  });
// new Back Route --- return back to 
app.get("/listing/newBack",(req,res)=>{
   res.redirect("/listing");
});
   // Create Route : to insert send data from client site to DB
   app.post("/listings",async(req,res)=>{
      // way1-- to extract data from req.body
      // let {title,description,image,price,location,country} = req.body;
      // way --- to extract data from req.body but for this in the .ejs file make all input field name of objectName[key] i.e. object type
      // const collectedList  = req.body.listing;
      // console.log(collectedList);
        const newList = new list(req.body.listing);// here newList is an instance of list module
       await newList.save();
      res.redirect("/listing");
 });

// show Route--- for all individual  list
app.get("/listing/:id",async(req,res)=>{
   let {id} = req.params;
   const showList = await list.findById(id);
    res.render("listings/showPlace.ejs",{showList});
 });

 // Edit Route--- to get edit form
 app.get("/listing/:id/edit",async(req,res)=>{
   let {id} = req.params;
  const editing = await list.findById(id);
   res.render("listings/editList.ejs",{editing});
 });
 // Update Route--- To update the value
 app.put("/listings/:id",async(req,res)=>{
   let {id} = req.params;
 const listItem = await list.findByIdAndUpdate(id,{...req.body.listing});
  res.redirect(`/listing/${id}`);
 });

 // Delete Route --- 
 app.delete("/listing/:id",async(req,res)=>{
   let {id} = req.params;
   // now delete
   await list.findByIdAndDelete(id);
   res.redirect("/listing");
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

