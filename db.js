const { MongoClient } = require("mongodb");

function utils() {
  const mu = {};

  mu.url = process.env.MONGODB_URI || "mongodb://localhost:27017";

  mu.connect = URI => {
    const client = new MongoClient(URI, { useUnifiedTopology: true });
    return client.connect();
  };

  mu.getDBs = URI => {
    return mu.connect(URI).then(
      client =>
        client
          .db()
          .admin()
          .listDatabases(),
      // Returns a promise that will resolve to the list of databases
    );
  };

  mu.getCols = (dbName, URI) => {
    return mu.connect(URI).then(client =>
      client
        .db(dbName)
        .listCollections()
        .toArray(),
    );
  };

  mu.findDocs = (dbName, collection, URI) => {
    return mu.connect(URI).then(client =>
      client
        .db(dbName)
        .collection(collection)
        .find({})
        .sort({ _id: -1 })
        .toArray(),
    );
  };

  mu.postDocs = (dbName, collection, document, URI) => {
    return mu.connect(URI).then(client =>
      client
        .db(dbName)
        .collection(collection)
        .insertOne(document),
    );
  };

  return mu;
}

module.exports = utils();
