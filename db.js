const { MongoClient } = require("mongodb");

function utils() {
  const mu = {};

  mu.url = process.env.MONGODB_URI || "mongodb+srv://mateo:leon@cluster0-oop6m.mongodb.net/test?retryWrites=true&w=majority";

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
          .listDatabases()
          .finally(() => {
            client.close();
          }),
      // Returns a promise that will resolve to the list of databases
    );
  };

  mu.getCols = (dbName, URI) => {
    return mu.connect(URI).then(client =>
      client
        .db(dbName)
        .listCollections()
        .toArray()
        .finally(() => client.close()),
    );
  };

  mu.findDocs = (dbName, collection, URI) => {
    return mu.connect(URI).then(client =>
      client
        .db(dbName)
        .collection(collection)
        .find({})
        .limit(20)
        .sort({ _id: -1 })
        .toArray()
        .finally(() => client.close()),
    );
  };

  mu.postDocs = (dbName, collection, document, URI) => {
    return mu.connect(URI).then(client =>
      client
        .db(dbName)
        .collection(collection)
        .insertOne(document)
        .finally(() => client.close()),
    );
  };

  return mu;
}

module.exports = utils();
