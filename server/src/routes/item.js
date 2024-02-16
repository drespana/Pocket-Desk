const express = require("express");
const itemsRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../connection/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
itemsRoutes.route("/items").get(function (req, res) {
 let db_connect = dbo.getDb("grocerydb");
 db_connect
   .collection("grocerycollection")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you get a single items by id
itemsRoutes.route("/items/:id").get(function (req, res) {
 let db_connect = dbo.getDb("grocerydb");
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect
   .collection("grocerycollection")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you create a new items.
itemsRoutes.route("/items/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
   name: req.body.name,
   position: req.body.position,
   level: req.body.level,
 };
 db_connect.collection("items").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
// This section will help you update a items by id.
itemsRoutes.route("/update/:id").post(function (req, response) {
 let db_connect = dbo.getDb("grocerydb");
 let myquery = { _id: ObjectId(req.params.id) };
 let newvalues = {
   $set: {
     name: req.body.name,
     position: req.body.position,
     level: req.body.level,
   },
 };
 db_connect
   .collection("grocerycollection")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 document updated");
     response.json(res);
   });
});
 
// This section will help you delete a items
itemsRoutes.route("/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("grocerycollection").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});
 
module.exports = itemsRoutes;