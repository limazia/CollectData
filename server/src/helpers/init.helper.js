const fs = require("fs");
const path = require("path");
const connection = require("../database/connection");

const uploadFolders = () => {
  const uploadFolder = path.resolve(__dirname, "../../", "uploads");
  const contractFolder = path.resolve(__dirname, "../../", "uploads", "contracts");
  const galleryFolder = path.resolve(__dirname, "../../", "uploads", "gallery");
 
  if (!fs.existsSync(uploadFolder)){
    fs.mkdirSync(uploadFolder);

    if (!fs.existsSync(contractFolder)){
      fs.mkdirSync(contractFolder);
    }

    if (!fs.existsSync(galleryFolder)){
      fs.mkdirSync(galleryFolder);
    }

    console.log("Creating upload directories...");
  } else {
    console.log("Working upload directories");
  }
};

const testConnection = () => {
  connection
    .raw("SELECT 1")
    .then(() => {
      console.log("Database successfully connected");
    })
    .catch((err) => {
      console.log("Database connection error");
    });
}

module.exports = {
  uploadFolders,
  testConnection
};
