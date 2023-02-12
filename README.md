<!--
Thanks for using the template!

Don't forget to give this project a star for additional support ;)
Maybe you can mention me or this repo in the acknowledgements too
-->
<div align="center">
  <img src="https://user-images.githubusercontent.com/92755273/190659291-ac953a00-e0a6-41ac-b2f6-bd6a559c0728.png" alt="logo">
  <h1>GYM System Manager Project</h1>
  <p>Gym management web application that allows you to support clients accounts, gym passes and gym classes live schedule. Track upcoming events, calculate your BMI, check your membership status and prolong your gym pass.</p>
</div>

This is the backend part of the project with REST API. To see the frontend part visit: https://github.com/RafalG1991/gym-system-manager-fe

### **To run this project make sure you have created .env file for db credentials: [.env structure](https://github.com/RafalG1991/gym-system-manager-be/blob/main/example_env.txt) and configured the mysql database with this [ structure](https://github.com/RafalG1991/gym-system-manager-be/blob/main/database_structure.md)**

## 💡 Live preview

[GYM System Manager live preview](https://rg.networkmanager.pl/)

## ⚙️ Tech stack

#### frontend
- React with TypeScript
- react-testing-library for components tests
- Cypress for e2e tests

#### backend
- Node.js
- Express.js with TypeScript
- MySQL database (MariaDB)
- passport with JWT authentication
- Jest for unit tests

## 📝 About development

In this project, for backend, I used Node.js with Express framework. For authentication and authorization support I used passport middleware with JSON Web Token and custom passport strategy.

The project uses TypeScript and frontend-backend shared types. For data storage it uses MySQL database (MariaDB).

User and class records are handled using Active Record pattern. Each class provides basic validation and set of methods to add or modify entities in the database.

Routing is divided into two routes - user and class related. Most of the user routes are available only after authorization using verifyUser middleware. 

## :dart: API endpoints documentation

### USER
#### `POST api/user/signup`

<p> 
  Sign up route that checks for unique e-mail, adds new user to the database and returns httpOnly Cookie with user jwt token payload
</p>
<p>
Accepting JSON:

```javascript
{
  "email": string,
  "password": string
}
```
</p>

#### `POST api/user/login`

<p> 
  Sign in route that verify user data and bcrypt hashed password and returns httpOnly Cookie with user jwt token payload
</p>
<p>
Accepting JSON:

```javascript
{
  "email": string,
  "password": string
}
```
</p>

#### `GET api/user/me`

<p> 
Endpoint for checking the authentication status. Returns user payload extracted from cookie, otherwise returns error message which is handled by frontend
</p>

#### `GET api/user/data`

<p> 
Returns user data for the frontend
</p>

#### `PATCH api/user/`

<p> 
  Changing user data route that handles name, bmi and password updating. Can handle three different data sets: firstname and lastname, password or height and weight as in the following example:
</p>
<p>
Accepting JSON:

```javascript
{
  "firstname": string,
  "lastname": string
}
```
OR
```javascript
{
  "password": string

}
```
OR
```javascript
{
  "height": string,
  "weight": string
}
```
</p>


#### `PATCH api/user/membership`

<p> 
  Endpoint for extending membership status by the number of months provided in the body
</p>
<p>
Accepting JSON:

```javascript
{
  "months": number
}
```
</p>

### CLASS
<p> 
Class routes are intentionally available without any kind of authorization. It can be used in the future for gym classes schedule on the home page
</p>

#### `GET api/class`

<p> 
Returns all classes in json format with structure that is handled by react fullcalendar component
</p>

#### `GET api/class/:id`

<p> 
Returns single class by id passed in param
</p>

## 🎛 Tests

The project was supplied with Jest tests for class record and user record validation

## 💾 Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in ts-node

### `npm start:dev`

Runs the app in development mode

### `npm test`

Launches the test runner

### `npm run build`

Builds the app for production to the `build` folder.
