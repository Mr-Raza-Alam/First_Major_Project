// User routes
const express = require("express");
const router = express.Router();

router.get("/",(req,res)=>{
  res.send("Get Route for user index");
});
router.get("/:id",(req,res)=>{
  res.send("Get Route for user id");
});
router.post("/",(req,res)=>{
  res.send("Post Route for user");
});
router.delete("/:id",(req,res)=>{
  res.send("Delete Route for user");
});

module.exports = router;