//define routes
//client sends request for an endpoint using HTTP request
//how the server will respond to the requests
module.exports = (app) => {
   const journals = require("../controller/journal.controller.js");
   var router = require("express").Router();
   // Create a new Journal
   router.post("/", journals.create);
   // Retrieve all Journal
   router.get("/", journals.findAll);
   // Retrieve a single Journal with id
   router.get("/:id", journals.findOne);
   // Update a Journal with id
   router.put("/:id", journals.update);
   // Delete a Journal with id
   router.delete("/:id", journals.delete);
   // Delete all Journal
   router.delete("/", journals.deleteAll);
   app.use("/api/journals", router);
};
