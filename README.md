# blue311-server

Server for supporting the blue311 clients

This is the back-end Node.js application for supporting the blue311 iOS client. This project is based on the following repo

https://github.com/ryanj/restify-mongodb-parks

## To install and run

* git clone repo

```
git clone https://github.com/tomdiz/blue311-server.git
```

* cd into cloned directory

```
cd blue311-server
```

* start mongodb. You need mongo db installed and a data directory created. See this link
http://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/?_ga=1.137858808.934069140.1429034460

```
% mongod &
```

* Node.js install to set up the application

```
npm install
```

* Importing partial data into mongo db

```
npm run initdb
```

* Run server. to test open a browser tab and open ‘localhost:8080’

```
npm start
```

## Mongo DB npm commands

*npm start* : "node server.js"
*npm build* : "npm run initdb"
*npm flushdb* : node bin/flushdb.js". Cleans out the database
*npm initdb* : "node bin/bootstrap.js"


## Good Node.js coding sites

* https://blog.openshift.com/set-up-nodejs-mongodb-and-express-on-free-spatial-web-hosting/



## MongoDB basic commands
URL to basic command shell

* http://docs.mongodb.org/manual/reference/mongo-shell/
* http://docs.mongodb.org/manual/tutorial/getting-started-with-the-mongo-shell/

% mongo
Then goes to “>” command lines

List all databases in MongoDB
```
> show dbs
```

Show commands:
```
> help 
> use blue311App; 
> db.dropDatabase();
{ "ok" : 1 }
```

Last line is reply when drop DB successful

To leave mango db command line

```
> exit
```

To show data 

```
> db["blue311App"].find()
```


# Clean blue311App Mongo DB from Unix command line:

```
mongo blue311App --eval "db.dropDatabase()"
```


# Heroku Info

You need to install heroku
* https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up

View Heroku log files on server run this command from the server directory in a terminal window
```
% heroku logs --tail
```

To run application locally
```
% foreman start web
```

To test open browser to http://localhost:5000

To push changes to heroku (Do a git push to push to my github account first)
```
% git push heroku master
```

To open from heroku server use
```
% heroku open
```

Need to use the MongoDB add-on
```
% heroku addons:add mongolab
```

Heroku MongoDB admin UI
Usage URL

* https://devcenter.heroku.com/articles/mongolab#using-mongolab-s-admin-tools-for-mongodb

```
% heroku addons:open mongolab
```

To figure out MongoDB on heroku use
```
% heroku config | grep MONGOLAB_URI
```

It will return a config variable:
MONGOLAB_URI: mongodb://heroku_app36269540:9gic06nkh35ah5ubute53rsr93@ds061671.mongolab.com:61671/heroku_app36269540

To view all config (environment variables) use
```
% heroku config
```


