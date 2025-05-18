// 
 const express = require("express");
 const path = require("path");
 const app = express();
 const mongoose = require("mongoose");
 const methodOverride = require("method-override");
 const wrapAsync = require("./utils/wrapAsync.js");// added common error return fun. rather multiple try-catch pair
 const expressError = require("./utils/expressError.js"); // added custom error class
 const {listingSchema} = require("./schema.js");
 const ejsMate = require("ejs-mate");
 // now established Web server at some port 
app.listen(3300,()=>{
    console.log("Web server has been started at port : 3300.");
});
app.engine("ejs",ejsMate);//define an engine for ejsMate Of EJS
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"view"));
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname,"public")));
 app.use(methodOverride("_method"));

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
const { valid } = require("joi");

// defined a listingValidation fun. for listingSchema validation of server site validation
const validListing = (req,res,next)=>{
  let {error} = listingSchema.validate(req.body);
  console.log(error);
  if(error){// if there exist any error
    let errMsg = error.details.map((el)=> el.message).join(",");
     throw new expressError(403,errMsg);   
  }else{// otherwise procced to next operation
   next();
  }
}
 app.get("/",(req,res)=>{
    res.render("listings/home_page.ejs");
 });
 // Index Route--- use to display all data from Database
  app.get("/listings",async(req,res)=>{
    const allList = await list.find({});
    res.render("listings/listPlace.ejs",{allList});
  });
     // Create Route : to insert send data from client site to DB
      // if(!req.body.listing){
      //    throw new expressError(400,"Please send a valid listing.");
      // }
      // way1-- to extract data from req.body
      // let {title,description,image,price,location,country} = req.body;
      // way --- to extract data from req.body but for this in the .ejs file make all input field name of objectName[key] i.e. object type
      // const collectedList  = req.body.listing;
      // console.log(collectedList);
   app.post("/listings",validListing,wrapAsync(async(req,res,next)=>{
      const newList = new list(req.body.listing);// here newList is an instance of list module
       await newList.save();
       res.redirect("/listings");
    //try{
       // some code
   //  }catch(err){
   //    next(err);
   //  }
 })
);

  // edit Back Route -- for return back to 
  app.get("/listings/:id/editBack",(req,res)=>{
     let {id} = req.params;
    res.redirect(`/listings/${id}`);
  });
// new Back Route --- return back to 
app.get("/listings/newBack",(req,res)=>{
   res.redirect("/listings");
});

 // New Route-- for getting a form for creating new information insertion from client site 
  app.get("/listings/new",(req,res)=>{
     res.render("listings/new.ejs");
  });
  // Back Route -- to come back at home page
  app.get("/listings/back",(req,res)=>{
    res.redirect("/listings");
  });

// show Route--- for all individual  list
app.get("/listings/:id",wrapAsync(async(req,res)=>{
   let {id} = req.params;
   const showList = await list.findById(id);
    res.render("listings/showPlace.ejs",{showList});
 })
);

 // Edit Route--- to get edit form
 app.get("/listings/:id/edit",wrapAsync(async(req,res)=>{
   let {id} = req.params;
  const editing = await list.findById(id);
   res.render("listings/editList.ejs",{editing});
 })
);
 // Update Route--- To update the value
 app.put("/listings/:id",validListing,wrapAsync(async(req,res)=>{
   let {id} = req.params;
 const listItem = await list.findByIdAndUpdate(id,{...req.body.listing});
  res.redirect(`/listings/${id}`);
 })
);

 // Delete Route --- 
 app.delete("/listings/:id",wrapAsync(async(req,res)=>{
   let {id} = req.params;
   // now delete
   await list.findByIdAndDelete(id);
   res.redirect("/listings");
 })
 );

// now use custom expressError class for all type of request and routes(like /something Not for like /somtheing/abcld)
app.all("*",(req,res,next)=>{
   next(new expressError(400,"Page Not Found"));
});
 // Erro middleware

 app.use((err,req,res,next)=>{
 let {statusCode = 500,message="Something type wrong!!"} = err;
   res.status(statusCode).render("listings/error.ejs",{message});
   //  res.status(statusCode).send(message);
   // res.send(`Something went wrong.!! ${err}`);// use it i) when try-catch is used ii) when warpAsync is used iii)  when custom error class is used
 });
//   app.use((err,req,res,next)=>{
//  let {statusCode = 500,message="Something type wrong!!"} = err;
//    res.status(statusCode).render("listings/error.ejs",{message});
//    //  res.status(statusCode).send(message);
//    // res.send(`Something went wrong.!! ${err}`);// use it i) when try-catch is used ii) when warpAsync is used iii)  when custom error class is used
//  });

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

