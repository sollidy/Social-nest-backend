
window.onload = function() {
  // Build a system
  let url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  let options = {
  "swaggerDoc": {
    "openapi": "3.0.0",
    "paths": {
      "/api/user/profile/{id}": {
        "get": {
          "operationId": "UserController_getProfile",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ResponseGetOne"
                  }
                }
              }
            },
            "400": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/IdValidationErrorDto"
                  }
                }
              }
            }
          },
          "tags": [
            "User"
          ]
        }
      },
      "/api/user/profile": {
        "patch": {
          "operationId": "UserController_updateProfile",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdatePartialProfileDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ResponseGetOne"
                  }
                }
              }
            }
          },
          "tags": [
            "User"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/api/user/follow/{followedId}": {
        "post": {
          "operationId": "UserController_follow",
          "parameters": [
            {
              "name": "followedId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "201": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ResponseFollow"
                  }
                }
              }
            },
            "400": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/IdValidationErrorDto"
                  }
                }
              }
            }
          },
          "tags": [
            "User"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/api/user/follow/{checkId}": {
        "get": {
          "operationId": "UserController_isFollowed",
          "parameters": [
            {
              "name": "checkId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "boolean"
                  }
                }
              }
            },
            "400": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/IdValidationErrorDto"
                  }
                }
              }
            }
          },
          "tags": [
            "User"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/api/user/follow/{unfollowedId}": {
        "delete": {
          "operationId": "UserController_unfollow",
          "parameters": [
            {
              "name": "unfollowedId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ResponseFollow"
                  }
                }
              }
            },
            "400": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/IdValidationErrorDto"
                  }
                }
              }
            }
          },
          "tags": [
            "User"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/api/user/photo": {
        "post": {
          "operationId": "UserController_uploadImage",
          "parameters": [],
          "requestBody": {
            "required": true,
            "description": "User Image",
            "content": {
              "multipart/form-data": {
                "schema": {
                  "$ref": "#/components/schemas/FileUploadDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ResponseGetOne"
                  }
                }
              }
            }
          },
          "tags": [
            "User"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      },
      "/api/user/get-users": {
        "get": {
          "operationId": "UserController_getUsers",
          "parameters": [
            {
              "name": "limit",
              "required": false,
              "in": "query",
              "schema": {
                "default": 10,
                "type": "string"
              }
            },
            {
              "name": "page",
              "required": false,
              "in": "query",
              "schema": {
                "default": 1,
                "type": "string"
              }
            },
            {
              "name": "term",
              "required": false,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "friend",
              "required": false,
              "in": "query",
              "schema": {
                "default": "false",
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ResponsePaginateUserDto"
                  }
                }
              }
            }
          },
          "tags": [
            "User"
          ]
        }
      },
      "/api/user/get-all": {
        "get": {
          "operationId": "UserAdminController_getAllUsers",
          "parameters": [],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/ResponseGetAll"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "Admin"
          ],
          "security": [
            {
              "ADMIN": []
            }
          ]
        }
      },
      "/api/user/{id}": {
        "delete": {
          "operationId": "UserAdminController_delete",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Admin"
          ],
          "security": [
            {
              "ADMIN": []
            }
          ]
        }
      },
      "/api/auth/register": {
        "post": {
          "operationId": "AuthController_register",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AuthDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/RegisterResponseDto"
                  }
                }
              }
            },
            "400": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/AlreadyExistUserErrorDto"
                  }
                }
              }
            }
          },
          "tags": [
            "Auth"
          ]
        }
      },
      "/api/auth/login": {
        "post": {
          "operationId": "AuthController_login",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/LoginDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/LoginResponseDto"
                  }
                }
              }
            },
            "401": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "anyOf": [
                      {
                        "$ref": "#/components/schemas/UserNotFoundErrorDto"
                      },
                      {
                        "$ref": "#/components/schemas/WrongPasswordErrorDto"
                      }
                    ]
                  }
                }
              }
            }
          },
          "tags": [
            "Auth"
          ]
        }
      },
      "/api/auth/me": {
        "get": {
          "operationId": "AuthController_me",
          "parameters": [],
          "responses": {
            "200": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Users"
                  }
                }
              }
            }
          },
          "tags": [
            "Auth"
          ],
          "security": [
            {
              "bearer": []
            }
          ]
        }
      }
    },
    "info": {
      "title": "Social-net by m7mark",
      "description": "Social API description",
      "version": "1.0",
      "contact": {}
    },
    "tags": [
      {
        "name": "Social",
        "description": ""
      }
    ],
    "servers": [],
    "components": {
      "securitySchemes": {
        "ADMIN": {
          "scheme": "bearer",
          "bearerFormat": "JWT",
          "type": "http"
        },
        "bearer": {
          "scheme": "bearer",
          "bearerFormat": "JWT",
          "type": "http"
        }
      },
      "schemas": {
        "Profile": {
          "type": "object",
          "properties": {
            "status": {
              "type": "string",
              "default": null
            },
            "aboutMe": {
              "type": "string",
              "default": null
            },
            "homeUrl": {
              "type": "string",
              "default": null
            },
            "lookingForAJob": {
              "type": "boolean",
              "default": false
            },
            "lookingForAJobDescription": {
              "type": "string",
              "default": null
            },
            "photo": {
              "type": "string",
              "default": null
            }
          }
        },
        "ResponseGetOne": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string",
              "readOnly": true
            },
            "name": {
              "type": "string"
            },
            "profile": {
              "$ref": "#/components/schemas/Profile"
            }
          },
          "required": [
            "_id",
            "name",
            "profile"
          ]
        },
        "IdValidationErrorDto": {
          "type": "object",
          "properties": {
            "statusCode": {
              "type": "number",
              "default": 400
            },
            "message": {
              "type": "string",
              "default": "Invalid Id format"
            },
            "error": {
              "type": "string",
              "default": "Bad Request"
            }
          },
          "required": [
            "statusCode",
            "message",
            "error"
          ]
        },
        "UpdatePartialProfileDto": {
          "type": "object",
          "properties": {
            "status": {
              "type": "string",
              "maxLength": 300
            },
            "aboutMe": {
              "type": "string",
              "maxLength": 300
            },
            "homeUrl": {
              "type": "string"
            },
            "lookingForAJob": {
              "type": "boolean"
            },
            "lookingForAJobDescription": {
              "type": "string",
              "maxLength": 300
            }
          }
        },
        "ResponseFollow": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string",
              "readOnly": true
            },
            "followedIds": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          "required": [
            "_id",
            "followedIds"
          ]
        },
        "FileUploadDto": {
          "type": "object",
          "properties": {
            "image": {
              "type": "string",
              "format": "binary"
            }
          },
          "required": [
            "image"
          ]
        },
        "ResponsePaginateUserDto": {
          "type": "object",
          "properties": {
            "docs": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/ResponseGetOne"
              }
            },
            "totalDocs": {
              "type": "number"
            },
            "limit": {
              "type": "number"
            },
            "hasPrevPage": {
              "type": "boolean"
            },
            "hasNextPage": {
              "type": "boolean"
            },
            "page": {
              "type": "number"
            },
            "totalPages": {
              "type": "number"
            },
            "prevPage": {
              "type": "object"
            },
            "nextPage": {
              "type": "object"
            },
            "pagingCounter": {
              "type": "number"
            }
          },
          "required": [
            "docs",
            "totalDocs",
            "limit",
            "hasPrevPage",
            "hasNextPage",
            "totalPages",
            "pagingCounter"
          ]
        },
        "ResponseGetAll": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string",
              "readOnly": true
            },
            "email": {
              "type": "string",
              "uniqueItems": true
            },
            "name": {
              "type": "string"
            }
          },
          "required": [
            "_id",
            "email",
            "name"
          ]
        },
        "UserNotFoundErrorDto": {
          "type": "object",
          "properties": {
            "statusCode": {
              "type": "number",
              "default": 401
            },
            "message": {
              "type": "string",
              "default": "User with that email not found"
            },
            "error": {
              "type": "string",
              "default": "Unauthorized"
            }
          },
          "required": [
            "statusCode",
            "message",
            "error"
          ]
        },
        "WrongPasswordErrorDto": {
          "type": "object",
          "properties": {
            "statusCode": {
              "type": "number",
              "default": 401
            },
            "message": {
              "type": "string",
              "default": "Password is wrong"
            },
            "error": {
              "type": "string",
              "default": "Unauthorized"
            }
          },
          "required": [
            "statusCode",
            "message",
            "error"
          ]
        },
        "AuthDto": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "maxLength": 50
            },
            "email": {
              "type": "string"
            },
            "password": {
              "type": "string",
              "minLength": 4
            }
          },
          "required": [
            "name",
            "email",
            "password"
          ]
        },
        "RegisterResponseDto": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string"
            },
            "name": {
              "type": "string"
            },
            "access_token": {
              "type": "string"
            }
          },
          "required": [
            "_id",
            "name",
            "access_token"
          ]
        },
        "AlreadyExistUserErrorDto": {
          "type": "object",
          "properties": {
            "statusCode": {
              "type": "number",
              "default": 400
            },
            "message": {
              "type": "string",
              "default": "Email already existing"
            },
            "error": {
              "type": "string",
              "default": "Bad Request"
            }
          },
          "required": [
            "statusCode",
            "message",
            "error"
          ]
        },
        "LoginDto": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string"
            },
            "password": {
              "type": "string",
              "minLength": 4
            }
          },
          "required": [
            "email",
            "password"
          ]
        },
        "LoginResponseDto": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string"
            },
            "access_token": {
              "type": "string"
            }
          },
          "required": [
            "_id",
            "access_token"
          ]
        },
        "Users": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string",
              "readOnly": true
            },
            "email": {
              "type": "string",
              "uniqueItems": true
            },
            "passwordHash": {
              "type": "string"
            },
            "name": {
              "type": "string"
            },
            "followedIds": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "roles": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "profile": {
              "$ref": "#/components/schemas/Profile"
            }
          },
          "required": [
            "_id",
            "email",
            "passwordHash",
            "name",
            "followedIds",
            "roles",
            "profile"
          ]
        }
      }
    }
  },
  "customOptions": {
    "defaultModelsExpandDepth": -1
  }
};
  url = options.swaggerUrl || url
  let urls = options.swaggerUrls
  let customOptions = options.customOptions
  let spec1 = options.swaggerDoc
  let swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (let attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  let ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.initOAuth) {
    ui.initOAuth(customOptions.initOAuth)
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }
  
  window.ui = ui
}
