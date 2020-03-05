const { MongoClient } = require("mongodb");

const url =  process.env.MONGODB_URI || "mongodb://localhost:27017" ;

const client = new  MongoClient(url, { useUnifiedTopology: true });

const init = () =>
  MongoClient.connect(url, { useUnifiedTopology: true }).then(client =>
    client.db()
  );

module.exports = { init, client };
