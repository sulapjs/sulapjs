# sulap


server is built on `Express` and `Mongoose` and `Node Js`
client is build on `React Js`

## Usage
Make sure you have Node.js and mongoDB installed in your computer and then run these commands:
```console
$ npm install -g sulap
```

Then initiate your project with these command (sulap also intall the dependencies for you):
```console
$ sulap jreng <project_name>
```

To run the development server, you can use these commands:
```console
$ cd <project_name>
$ sulap komang
```

Access the REST API via localhost = `http://localhost:3000`

MongoDB database name can be changed in `./<folder_name>/server/config/index.js`

## REST API Routes:

### AUTHENTICATION

- **Register**
  - URL:
    - **`POST`** *`/register`*
  - Body:
    - `name`: `String`, required
    - `email`: `String`, required
    - `password`: `String`, required
    - `role`: `String`, required
  - Expected response (status: `201`):
    ```json
      {
        "message": "account registered",
        "newUser":
        {
          "_id": "<generatedId>",
          "name": "<registeredName>",
          "email": "<registeredEmail>",
          "password": "<hashedPassword>",
          "role": "<registeredRole>"
        }
      }
    ```
  - Error responses:
    - status: `400`:
      ```json
      {
        "message": "<detailedErrors>"
      }
      ```
      Notes:
      - ERROR `400` is caused by entering *empty name* or *empty email* or *duplicated email* or *email not valid format* or *empty password* or *empty role*

- **Login**
  - URL:
    - **`POST`** *`/login`*
  - Body:
    - `email`: `String`, required
    - `password`: `String`, required
  - Expected response (status: `200`):
    ```json
      {
        "message": "login success",
        "token": "<accessToken>"
      }
    ```
  - Error responses:
    - status: `400`:
      ```json
      {
        "message": "invalid username / password"
      }
      ```

[comment]: # (reserved for adding new model)