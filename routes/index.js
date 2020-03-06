const express = require("express");
const router = express.Router();

const mu = require("../db.js");

router.get("/", function(req, res) {
  mu.getDBs("mongodb://localhost:27017")
    .then(dbs => res.render("index.ejs", { dbs: dbs.databases }))
    .finally(() => {
      client.close();
    });
});

router.post("/getDBs/", (req, res) => {
  mu.getDBs(req.body.connection)
    .then(dbs => {
      console.log(dbs);
      return res.json(dbs);
    })
    .finally(() => {
      client.close();
    });
});

router.post("/getCollections/:db", function(req, res) {
  const db = req.params.db;
  mu.getCols(db, req.body.connection)
    .then(cols => {
      res.json(cols);
    })
    .finally(() => client.close());
});

router.post("/getDocs/:db/:col", (req, res) => {
  mu.findDocs(req.params.db, req.params.col, req.body.connection)
    .then(docs => {
      res.json(docs);
    })
    .finally(() => client.close());
});

router.post("/postDoc/:db/:col", (req, res) => {
  const connection = req.body.connection;
  req.body.connection = undefined;
  delete req.body.connection;
  mu.postDocs(req.params.db, req.params.col, req.body, connection)
    .then(() => res.redirect("/"))
    .finally(() => client.close());
});

module.exports = router;
