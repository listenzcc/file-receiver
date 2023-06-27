const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
// import { mkdir } from "node:fs/promises";

const app = express();

// Define storage for the uploaded files
const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    // Set the destination folder where files will be saved
    const folder =
      "uploads/" + (req.body.UserName ? req.body.UserName : "Anonymous") + "/";

    fs.mkdir(folder, { recursive: true }, () => {
      console.error("Couldn't create destination folder", folder);
    });

    cb(null, folder);
  },
  filename: function (req, file, cb) {
    // Use the original filename for the saved file

    // Convert the filename to utf-8 encoding
    file.originalname = Buffer.from(file.originalname, "latin1").toString(
      "utf8"
    );

    cb(null, file.originalname);
  },
});

// Create the Multer middleware
const upload = multer({ storage: storage });

// Set the character encoding for requests
app.use(express.urlencoded({ extended: true }));

// Serve the HTML file that contains the file upload form
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Handle the file upload
app.post("/upload", upload.single("file"), (req, res) => {
  console.log("Received file upload");
  console.log(req.file, req.body);
  Object.assign(req.file, { UserName: req.body.UserName, Date: Date() });
  console.dir(req.file);

  if (!req.file) {
    res.status(400).send("No file uploaded.");
  } else {
    // res.send("File uploaded successfully!");
    res.type("json");
    res.send(req.file);
  }
});

// Start the server
app.listen(8215, () => {
  console.log("Server is running on http://localhost:8215");
});
