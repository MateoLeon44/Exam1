const express = require("express");
const router = express.Router();

const { init, client } = require("../db.js");
/* GET home page. */
router.get("/", function(req, res) {
  //utils.getDb();
  client
    .connect()
    .then(
      client =>
        client
          .db()
          .admin()
          .listDatabases(), // Returns a promise that will resolve to the list of databases
    )
    .then(dbs => {
      res.render("index.ejs", {dbs: dbs.databases});
    })
    .finally(() => client.close());
});

module.exports = router;
