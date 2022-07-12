# GYM System Manager Project

Gym management web application that allows you to support clients accounts, gym passes and gym classes life schedule. Track upcoming events, calculate your BMI, check your membership status and prolong your gym pass.

This is the backend part of the project with REST API. To see the frontkend part visit: https://github.com/RafalG1991/gym-system-manager-fe

## Tech stack

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

## About development

In this project, for backend, I used Node.js with Express framework. For authentication and authorization support I used passport middleware with JSON Web Token and custom passport strategy.

The project uses TypeScript and frontend-backend shared types. For data storage it uses MySQL database (MariaDB).

User and class records are handled using Active Record pattern. Each class provides basic validation and set of methods to add or modify entities in the database.

Routing is divided into two routes - user and class related. Most of the user routes are available only after authorization using verifyUser middleware. 

### `POST api/user/signup`

sign up route that checks for unique e-mail, adds new user to the database and returns httpOnly Cookie with user jwt token payload

### `POST api/user/login`

sign in route that verify user data and bcrypt hashed password and returns httpOnly Cookie with user jwt token payload

### `GET api/user/me`

endpoint for checking the authentication status. Returns user payload extracted from cookie, otherwise returns error message which is handled by frontend

### `GET api/user/data`

returns user data for the frontend

### `PATCH api/user/`

changing user data route that handles name, bmi and password updating

### `PATCH api/user/membership`

endpoint for extending membership status


Class routes are intentionally available without any kind of authorization. It can be used in the future for gym classes schedule on the home page

### `GET api/class`

returns all classes in json format with structure that is handled by react fullcalendar component

### `GET api/class/:id`

returns single class by id passed in param

## Tests

The project was supplied with Jest tests for class record and user record validation

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in ts-node

### `npm start:dev`

Runs the app in development mode

### `npm test`

Launches the test runner

### `npm run build`

Builds the app for production to the `build` folder.