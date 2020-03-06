const express = require("express");
const router = express.Router();

const mu = require("../db.js");

router.get("/", function(req, res) {
  mu.getDBs()
    .then(dbs => res.render("index.ejs", { dbs: dbs.databases }))
    .finally(() => {
      client.close();
    });
});

router.get("/getCollections/:db", function(req, res) {
  const db = req.params.db;
  mu.getCols(db)
    .then(cols => {
      res.json(cols);
    })
    .finally(() => client.close());
});

router.get("/getDocs/:db/:col", (req, res) => {
  mu.findDocs(req.params.db, req.params.col)
    .then(docs => {
      res.json(docs);
    })
    .finally(() => client.close());
});


router.post("/postDoc/:db/:col", (req, res) => {
  mu.postDocs(req.params.db, req.params.col, req.body)
    .then(() => res.redirect("/"))
    .finally(() => client.close());
});

module.exports = router;
