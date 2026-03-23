# Project Initialisation
## Initialise a new Node.js project

### Initialize a new Node.js project

We create a project folder and change directory to it by writing:

`mkdir courses-api`
`cd courses`

Initialise a new node by writing:

`npm init -y`

It should create a package.json file in the directory.

To use ES6 modules, we need to add the following line in our package.json file:

`"type":"module"`

Our package.json should look like the following:
`
{
  "name": "courses-api",
  "version": "1.0.0",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "start": "node app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "HC",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "body-parser": "^2.2.2",
    "cors": "^2.8.6",
    "express": "^5.2.1",
    "express-validator": "^7.3.1",
    "mongodb": "^7.1.0"
  }
}
`

### Set up an Express server.

We need to make sure that the express packages is installed.

`npm install express`
`npm install body-parser express-validator`

Next, we need to create a server.
`const express = require('express');`
`const app = express();`
`const port = 3000;`

`app.use(express.json());`




