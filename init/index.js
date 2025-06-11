
const mongoose = require("mongoose");
const listen = require("../models/listing.js");// listen is collection 
const initData = require("./data.js");// new data

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
   // here before add all new data
   initData.data = initData.data.map((obj)=>({...obj,owner : "6847d1c779cac3f5377b06a3"}));
  // add all new data 
  await listen.insertMany(initData.data);
  console.log("DATA (s) has been inserted into Databse.");
 }

 // call initBD()
   initDB();