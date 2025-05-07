
const mongoose = require("mongoose");
const listen = require("../models/listing.js");
const initData = require("./data.js");

async function main(){
   await mongoose.connect("mongodb://127.0.0.1:27017/wanderTust");
}
 // call main function
 main().then((res)=>{
    console.log("DB Connection has been done successfully!!");
 }).catch((err)=>{
    console.log(err);
 });

 // create an asyncFuntion calledinitDB
 const initDB = async ()=>{
   // first delete all data first
   await listen.deleteMany({});
  // add all data 
  await listen.insertMany(initData.data);
  console.log("312 DATA (s) has been inserted into Databse.");
 }

 // call initBD()
   initDB();