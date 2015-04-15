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


TODO: 
- No test detain mongoldb after npminstall
- Does adding data using the client work?