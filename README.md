# jwt_auth_api

Prerequisites:

Node.js installed on your machine.
A text editor or an integrated development environment (IDE) like Visual Studio Code.
Basic knowledge of JavaScript and Node.js.

# Step 1: Set Up Your Project
Start by creating a new directory for your project and initializing it with npm:

mkdir jwt-auth-api
cd jwt-auth-api
npm init -y
#
Step 2: Install Required Dependencies
Install them using npm:

npm install express jsonwebtoken bcrypt body-parser

express: A popular Node.js web framework.
jsonwebtoken: For creating and verifying JWT tokens.
bcrypt: To hash and verify user passwords securely.
body-parser: To parse incoming JSON data.

# Step 3: Create the API
Create a file named app.js 

# Step 4: Run the API
node app.js

# Step 5: Test the API

Use tools like Postman or curl to test your API endpoints. Here are some sample requests:

# Register a user:
![image](https://github.com/wimarar/jwt_auth_api/assets/128466320/2e75d2f2-8048-4e49-9c60-d8ccfa31a6df)

POST http://localhost:3000/register
Content-Type: application/json

{
  "username": "yourusername",
  "password": "yourpassword"
}


# Login and obtain a JWT token:
![image](https://github.com/wimarar/jwt_auth_api/assets/128466320/40d5d090-5731-48f6-9cad-d63f3e84f1a3)

POST http://localhost:3000/login
Content-Type: application/json

{
  "username": "yourusername",
  "password": "yourpassword"
}

# Access a protected route by including the obtained JWT token in the Authorization header:
GET http://localhost:3000/protected
Authorization: Bearer YOUR_JWT_TOKEN
