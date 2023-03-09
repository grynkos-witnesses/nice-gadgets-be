# Nice-gadgets-be

This is a backend project built using Node.js and other related technologies.

## Technologies

The following technologies were used to build this project:

* Node.js: A JavaScript runtime built on Chrome's V8 JavaScript engine.
* Express.js: A minimalist web framework for Node.js used to build web applications and APIs.
* PostgreSQL: A database used to store and manage data.
* Sequlize: A PostgreSQL object modeling tool designed to work in an asynchronous environment.
* Heroku: A platform as a service (PaaS) that enables developers to build, run, and operate applications entirely in the cloud.
* CORS policy: An HTTP-header based mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources.

## Getting Started
To get started with this project, you will need to have Node.js and NeonDB on your machine. You will also need to set up a config.json file with the necessary data from your NeonDB(user, password, etc) for migration mockup_data into your DB. After you do this add the following:

## Make migration
>Copy this code in your terminal
```
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```
This will execute that seed files and a demos will be inserted into the your table on NeonDB.

>After update your client in src/services/product.ts file
```
const { Client } = require('pg');
const client = new Client({
        user: "your-user-at-neondb",
        password: "your-password-at-neondb",
        database: "your-db-at-neondb-default-is-neondb",
        host: "your-host-at-neondb",
        ssl: true
    });
client.connect();
```


Once you have set up this, you can run the project using the following command:

## Run code
```
npm start:local src/server.ts
```
This will start the Node.js server on port 3000 by default. You can then access the API using a tool like Postman or a web browser.

## API Documentation
The API documentation can be found in the src/services folder of this project. It contains information on the available endpoints, request and response formats, and authentication requirements.

## Conclusion
That's it! With these technologies, you should be able to build a robust and secure backend for your Node.js project. If you have any questions or run into issues, feel free to open an issue or submit a pull request on this project's repository.

## Heroku
This server hosting on heroku.app so you can check it too: 

[Heroku](https://secret-meadow-92340.herokuapp.com/)

>If server show "Application error" run next command:
```
$ heroku ps:scale  web=0
$ heroku ps:scale  web=1
```
## Enjoy using this app!
