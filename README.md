# Mongo Explorer
# JOHN: I CHOOSE THE FIRST OPTION, AND MY CREATIVE COMPONENTS ARE: LOADERS WHILE RETRIEVING DATA VIA FETCH AND GETTING DATA FROM THE FIRST DB/COLLECTION IT FINDS (this means getting the info from the first database, and first collection in the connected database)

https://mongoexplorer.herokuapp.com/

This project is aimed to explore the different databases, collections and documents that a connection (db,cluster) has. Its other feature is to create documents that belong to a db and collection depending on a connection. The predetermined configuration is to run a Mongo Atlas db (a db whichs only purpose is to have sample data for this project), however it works with other databases like the ones in localhost (be sure that the process is running though, Note: this doesn't work on the heroku app, only locally).

This project was created with plain Javascript, Node.js, MongoDb, express, HTML5, ejs, bootstrap, ajax (fetch api) and css.

![Functional app with all features](https://i.imgur.com/MHAdz0z.png "Full app")

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
cd pathOfTheFolderCreated (result of the git clone)
```
5. Install npm dependencies (You need to have node.js installed globally with its respective enviornment variable included in path)
```
npm i
```
6. Run your mongod service (You need to have mongodb as a service installed with its respective enviornment variable included in path)
```
mongod --dbpath C:\data  (or your path where data is located, if you don't have one create one with mkdir C:\path and then run mongod --dbpath C:\path, I'm only aware this works for windows, please refer to a guide on how to run mongod process for linux/mac)
```
7. In the root folder start the project with
```
nodemon (you can also run it with npm start)
```
8. Change the path of 'Conexión' to mongodb://localhost:27017 and click in 'Conectarse' (If you are running it locally, if you are in the heroku app just enter the url of an external db)
# How the project works

* The project runs in a MongoDB atlas database, so it will search for current dbs, collections and documents in the sample data created
* Then you can select if wheter you want to connect to a external db (for example another Mongo Atlas db) or run it  locally
![Choose wheter to connect or not](https://i.imgur.com/YEBRX3o.png "Connection")
* If the petitions are to an external db, a loader is going to pop up, until the data has been retrieved. THE LOADER WILL GO INFINITE MODE IF THE DB OR COLLECTION HAS NO DOCUMENTS (happens with local and admin dbs)
* After this, you can choose which database and which collection you want to see
![Select database and collection](https://i.imgur.com/Al5TDWL.png "Select db/col")
* You can then create a new element within the schema (model) of the LAST document retrieved
* The documents are limited to 20 documents since the sample data is too large and would make the table to load infinitely. Also, it shows the created order in desc order (the last item is the first in the table)
![Create new document with schema name, score and review](https://i.imgur.com/UBeLdna.png  "New fruit document")
* Finally, you can see what documents are in the database and collection selected for that connection
![Table of documents from fruits collection in fruitsDB](https://i.imgur.com/uObajnK.png "Fruit documents")

### To improve (TODO list)

1. Don't redirect after creating a document, instead create a new connection and retrieve the data again)
2. Error validators for loading component, this means handle error in dbs that have 0 collections, such as admin and local


##License
MongoExplorer is licensed under the MIT license. (http://opensource.org/licenses/MIT)
