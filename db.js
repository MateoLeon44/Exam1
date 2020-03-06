const { MongoClient } = require("mongodb");

function utils() {
  const url = process.env.MONGODB_URI || "mongodb://localhost:27017";

  const mu = {};

  mu.connect = () => {
    const client = new MongoClient(url, { useUnifiedTopology: true });
    return client.connect();
  };

  mu.getDBs = () => {
    return mu.connect().then(
      client =>
        client
          .db()
          .admin()
          .listDatabases(),
      // Returns a promise that will resolve to the list of databases
    );
  };

  mu.getCols = dbName => {
    return mu.connect().then(client =>
      client
        .db(dbName)
        .listCollections()
        .toArray(),
    );
  };

  mu.findDocs = (dbName, collection) => {
    return mu.connect().then(client =>
      client
        .db(dbName)
        .collection(collection)
        .find({})
        .sort({ _id: -1 })
        .toArray(),
    );
  };

  mu.postDocs = (dbName, collection, document) => {
    return mu.connect().then(client =>
      client
        .db(dbName)
        .collection(collection)
        .insertOne(document),
    );
  };

  return mu;
}

module.exports = utils();
