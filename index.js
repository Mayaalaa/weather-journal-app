// set up my packages
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const app = express();

// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

//send (post) request
app.post("/addData", function (req, res) {
  projectData = req.body;
  //projectData.date=req.body.date;
  //projectData.temp=req.body.temp;
  //projectData.feelings=req.body.feelings;
  res.send({ message: "success" });
});


// get request
app.get("/getData", (req, res) => {
  res.send(projectData);
});

//setup my server

const port = 3001;
app.listen(port || 3001, () => {
  console.log(`server is ready at port ${port}`);
});


