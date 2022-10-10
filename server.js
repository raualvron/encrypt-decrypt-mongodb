require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dbConfig = require("./db");
const Articles = require("./articles.model.js")(mongoose);
const CryptoInit = require("./cryptoInitializer");
mongoose.Promise = global.Promise;

const app = express();
const crypto = new CryptoInit();

const corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.articles = Articles;

console.log(db.url);

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/decrypted", (req, res) => {
  db.articles.find({})
    .then(data => {
      data.forEach((record) => {
        const message = crypto.decryptedData(record);
        record.message = message;
      });
      res.json(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
});

app.get("/raw-data", (req, res) => {
  db.articles.find({})
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
});


app.get("/encrypt/:message", async(req, res) => {
    const message = req.params.message;
    
    // Validate request
    if (!message) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    const encryptedData = crypto.encryptionData(message);
    // Create a articles 
    const articles = new Articles(encryptedData);

  // Save Tutorial in the database
    articles
    .save(articles)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Tutorial."
        });
    });
});

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});