# Sulap Js

<image src="https://storage.googleapis.com/sulapjs/sulapjs-logo.png"
  alt="sulap-js-logo">


Sulap JS is a Content Management System Generator written in JavaScript which provides users an instant client-server website model. It includes user management system and simple CRUD model. The package also provides users to put some options or configuration while initiating their website. Client template is built on `React Js`, while server template is built on `Express Js` and `Node Js` with MongoDB and Mongoose as ODM. Sulap is created for assisting users or developers to save their time developing new website. By using few commands, in the future, user is able to build a simple client-server website. Do less, gain more!


## Quick Start
Make sure you have Node.js and mongoDB installed in your computer and then run these commands:
```console
$ npm install -g sulap
```

Then initiate your project with these command (sulap also intall the dependencies for you):
```console
$ sulap jreng <project_name>
```

After sulap's done creating your project folder, to run the development server, you can use these commands:
```
$ cd <project_name>
$ sulap poof
```

Access the REST API via localhost = `http://localhost:3000`
Documentation can be found in `./<folder_name>/README.md`

MongoDB database name can be changed in `./<folder_name>/server/config/index.js`
