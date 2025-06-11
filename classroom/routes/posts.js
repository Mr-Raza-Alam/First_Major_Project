// Post routes
const express = require("express");
const router = express.Router();

router.get("/",(req,res)=>{
  res.send("Get Route for posts index");
});
router.get("/:id",(req,res)=>{
  let{id} = req.params;
  res.send(`Get Route for posts and get-id : ${id}`);
});
router.post("/",(req,res)=>{
  res.send("Post Route for posts ");
});
router.delete("/:id",(req,res)=>{
  res.send("Delete Route for posts");
});

module.exports = router;
