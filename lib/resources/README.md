### EXAMPLE_ROUTES

- **GET LIST OF EXAMPLE_CAPS**
  - URL:
    - **`GET`** *`/EXAMPLE_ROUTEs`*
  - URL (filtered):
    - **`GET`** *`/EXAMPLE_ROUTEs?search=<KEYWORD>`*
  - Expected response (status: `200`):
    ```json
      {
        "message": "data found",
        "EXAMPLEs": [
          {
            //sulap-add-model
            "_id": "<id>",
            "name": "<name>",
            "description": "<description>",
            "price": "<price>",
            "stock": "<stock>",
            "imageURL": "<imageURL>",
            "created": "<createdAt>",
            "updated": "<updatedAt>"
          }, 
          {
            "..."
          }, 
          "..."
        ]
      }
    ```
  - Error responses:
    - status: `404`:
      ```json
        {
          "message": "..."
        }
      ```

- **CREATE NEW EXAMLE_CAPS**
  - Notes:
    - Authorization: only admin can access
  - URL:
    - **`POST`** *`/EXAMPLE_ROUTEs`*
  - Header(s):
    - `token`: `String`
  - Body:
    //sulap-add-moodel
  - Expected response (status: `201`):
    ```json
      {
        "message": "data created",
        "newEXAMPLE":
        {
          //sulap-add-model
          "_id": "<id>",
          "name": "<name>",
          "description": "<description>",
          "price": "<price>",
          "stock": "<stock>",
          "imageURL": "<imageURL>",
          "created": "<createdAt>",
          "updated": "<updatedAt>"
        }
      }
    ```
  - Error responses:
    - status: `400`:
      ```json
      {
        "message": "<authentication message>"
      }
      ```
      Notes:
      - Messages:
        - no token assigned
        - not allowed to access
        - not recognized input data
      - ERROR `400` is also Validation Error caused by entering *empty name* or *empty price* or *empty stock* or *negative value price* or or *negative value stock*
    - status: `401`:
      ```json
      {
        "message": "unauthorized to access"
      }
      ```
    
- **GET PRODUCT BY ID**
  - URL:
    - **`GET`** *`/EXAMPLE_ROUTEs/:id`*
  - Expected response (status: `200`):
    ```json
      {
        "message": "data found",
        "EXAMPLE": 
        {
          //sulap-add-model
          "_id": "<id>",
          "name": "<name>",
          "description": "<description>",
          "price": "<price>",
          "stock": "<stock>",
          "imageURL": "<imageURL>",
          "created": "<createdAt>",
          "updated": "<updatedAt>"
        }
      }
    ```
  - Error responses:
    - status: `404`:
      ```json
        {
          "message": "data not found"
        }
      ```

- **UPDATE PRODUCT BY ID**
  - Notes:
    - Authorization: only admin can access
  - URL(s):
    - **`PUT`** *`/EXAMPLE_ROUTEs/:id`*
    - **`PATCH`** *`/EXAMPLE_ROUTEs/:id`*
    <br>Notes:
        - `PUT` method is used for updating all details of data
        - `PATCH` method is used for updating some details of data
  - Header(s):
    - `token`: `String`
  - Body:
    //sulap-add-body
  - Expected response (status: `201`):
    ```json
      {
        "message": "data updated",
        "updatedProduct":
        {
          //sulap-add-model
          "_id": "<id>",
          "name": "<name>",
          "description": "<description>",
          "price": "<price>",
          "stock": "<stock>",
          "imageURL": "<imageURL>",
          "created": "<createdAt>",
          "updated": "<updatedAt>"
        },
        "info": "<info-optional>"
      }
    ```
  - Error responses:
    - status: `400`:
      ```json
      {
        "message": "<authentication message>"
      }
      ```
      Notes:
      - Messages:
        - no token assigned
        - not allowed to access
        - not recognized input data
      - ERROR `400` is also Validation Error caused by entering *empty name* or *empty price* or *empty stock* or *negative value price* or or *negative value stock*
    - status: `401`:
      ```json
      {
        "message": "unauthorized to access"
      }
      ```
    - status: `404`:
      ```json
        {
          "message": "data not found"
        }
      ```

- **DELETE PRODUCT BY ID**
  - Notes:
    - Authorization: only admin can access
  - URL(s):
    - **`DELETE`** *`/EXAMPLE_ROUTEs/:id`*
  - Header(s):
    - `token`: `String`
  - Expected response (status: `200`):
    ```json
      {
        "message": "data deleted",
        "deletedProduct":
        {
          //sulap-add-model
          "_id": "<id>",
          "name": "<name>",
          "description": "<description>",
          "price": "<price>",
          "stock": "<stock>",
          "imageURL": "<imageURL>",
          "created": "<createdAt>",
          "updated": "<updatedAt>"
        }
      }
    ```
  - Error responses:
    - status: `400`:
      ```json
      {
        "message": "<authentication message>"
      }
      ```
      Notes:
      - Messages:
        - no token assigned
        - not allowed to access
        - not recognized input data
    - status: `401`:
      ```json
      {
        "message": "unauthorized to access"
      }
      ```
    - status: `404`:
      ```json
        {
          "message": "data not found"
        }
      ```

      [//]: # (comment)