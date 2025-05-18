
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 // create a listing schema 

 const listingSchema = new Schema({
    title : {
     type : String,
     require : true,
    },
    description : {
      type : String,
    },
    image : {
      type : String,
      default : "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
      set : (v)=>// for user/client
        v === "" ? "https://images.unsplash.com/photo-1502082553048-f009c37129b" : v,
    },
   price :{
    type : Number,
   },
  location : {
   type : String,
    
  },
  country : {
    type : String,
  }
 });
// now create a model for collection
const Listing = mongoose.model("Listing",listingSchema);
// then now export the listing model to the module.exports = modelName
module.exports = Listing;
