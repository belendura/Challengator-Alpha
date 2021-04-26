const functions = require("firebase-functions");
const cors = require("cors");

const express = require("express");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.json({ name: "Silo", girlfriend: "Angie" });
});

app.get("/profile/:profileId", (req, res) => {
  res.json({ userName: "Silo", girlfriend: "Angie" });
});

app.post("/user", (req, res) => {
  const {
    user: { name, wife }
  } = req.body;
  console.log(name);
  res.status(200).send("User succesfully created");
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.backendServer = functions.region("europe-west3").https.onRequest(app);
