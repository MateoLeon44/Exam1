# Mongo Explorer

This project is aimed to explore the different databases, collections and documents that a connection has. The predetermined configuration is to run in localhost, however it works with other databases like the ones in Mongo Atlas.

This project was created with plain Javascript, Node.js, MongoDb, express, HTML5, bootstrap, ajax (fetch api) and css.

![Functional app with all features](https://i.imgur.com/JkrL5eg.png "Full app")

## How to run the project locally
### As a prerequisite you need to have installed mongodb and npm with their respectives enviornment variables

1. Create a new folder
``` 
mkdir MongoExplorer
```
2. Go into the folder
```
cd MongoExplorer
```
3. Clone the repo
```
git clone https://github.com/MateoLeon44/MongoExplorer.git
```
4. Enter the folder created (root of the project)
```
cd pathOfTheFolderCreated
```
5. Install npm dependencies (You need to have node.js installed globally with its respective enviornment variable included in path)
```
npm i
```
6. Run your mongod service (You need to have mongodb as a service installed with its respective enviornment variable included in path)
```
mongod --dbpath C:\data  (or your path where data is located, if you don't have one create one with mkdir C:\path and then run mongod --dbpath C:\path
```
7. In the root folder start the project with
```
nodemon (you can also run it with npm start)
```

# How the project works

* The project runs in mongodb://localhost:27017, so it will search for current dbs, collections and documents in localhost
* Then you can select if wheter you want to connect to a external db (for example a Mongo Atlas one) or stay locally
![Choose wheter to connect or not](https://i.imgur.com/YEBRX3o.png "Connection")
* If the petitions are to an external db, a loader is going to pop up, until the data has been retrieved
* After this, you can choose which database and which collection you want to see
![Select database and collection](https://i.imgur.com/Al5TDWL.png "Select db/col")
* You can then create a new element within the schema (model) of the LAST document retrieved
![Create new document with schema name, score and review](https://i.imgur.com/UBeLdna.png  "New fruit document")
* Finally, you can see what documents are in the database and collection selected for that connection
![Table of documents from fruits collection in fruitsDB](https://i.imgur.com/uObajnK.png "Fruit documents")

##License
MongoExplorer is licensed under the MIT license. (http://opensource.org/licenses/MIT)
