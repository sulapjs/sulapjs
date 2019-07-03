### EXAMPLE_CAPS ROUTE

- **GET LIST OF EXAMPLE_CAPS**
  - URL:
    - **`GET`** *`/EXAMPLE_ROUTEs`*
  - URL (filtered):
    - **`GET`** *`/EXAMPLE_ROUTEs?search=<KEYWORD>`*
  - Expected response (status: `200`):
    ```javascript
      {
        "message": "data found",
        "EXAMPLEs": [
        {
          "_id": "<id>",//sulap-add-model
          "created": "<date>",
          "updated": "<date>"
        }
      ]}
    ```
  - Error responses:
    - status: `404`:
      ```javascript
        {
          "message": "..."
        }
      ```

- **CREATE NEW EXAMPLE_CAPS**
  - Notes:
    - Authorization: only admin can access
  - URL:
    - **`POST`** *`/EXAMPLE_ROUTEs`*
  - Header(s):
    - `token`: `String`
  - Body://sulap-add-body
  - Expected response (status: `201`):
    ```javascript
      {
        "message": "data created",
        "newEXAMPLE":
        {
          "_id": "<id>",//sulap-add-model
          "created": "<date>",
          "updated": "<date>"
        }
      }
    ```
  - Error responses:
    - status: `400`:
      ```javascript
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
      ```javascript
      {
        "message": "unauthorized to access"
      }
      ```
    
- **GET PRODUCT BY ID**
  - URL:
    - **`GET`** *`/EXAMPLE_ROUTEs/:id`*
  - Expected response (status: `200`):
    ```javascript
      {
        "message": "data found",
        "EXAMPLE": 
        {
          "_id": "<id>",//sulap-add-model
          "created": "<date>",
          "updated": "<date>"
        }
      }
    ```
  - Error responses:
    - status: `404`:
      ```javascript
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
  - Body://sulap-add-body
  - Expected response (status: `201`):
    ```javascript
      {
        "message": "data updated",
        "updatedProduct":
        {
          "_id": "<objectID>",//sulap-add-model
          "created": "<date>",
          "updated": "<date>"
        },
        "info": "<info-optional>"
      }
    ```
  - Error responses:
    - status: `400`:
      ```javascript
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
      ```javascript
      {
        "message": "unauthorized to access"
      }
      ```
    - status: `404`:
      ```javascript
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
    ```javascript
      {
        "message": "data deleted",
        "deletedProduct":
        {
          "_id": "<id>",//sulap-add-model
          "created": "<createdAt>",
          "updated": "<updatedAt>"
        }
      }
    ```
  - Error responses:
    - status: `400`:
      ```javascript
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
      ```javascript
      {
        "message": "unauthorized to access"
      }
      ```
    - status: `404`:
      ```javascript
        {
          "message": "data not found"
        }
      ```

[comment]: # (reserved for adding new model)