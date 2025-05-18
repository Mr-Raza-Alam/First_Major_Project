// Schema for server site validation

const Joi = require('joi');

// write a Schema which you want to validate
// now export it

module.exports.listingSchema = Joi.object({
   // define an object as like your collection'S name as in MongoDB
   listing : Joi.object({
    title : Joi.string().required(),
   description : Joi.string().required(),
   image : Joi.string().allow("",null).required(),
   price : Joi.number().min(0).required(),
   country : Joi.string().required(),
   location : Joi.string().required(),
   }).required(),
});
