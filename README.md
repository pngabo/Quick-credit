# Quick-credit [![Build Status](https://travis-ci.org/ngabopatrick/Quick-credit.svg?branch=develop)](https://travis-ci.org/ngabopatrick/Quick-credit) [![Coverage Status](https://coveralls.io/repos/github/ngabopatrick/Quick-credit/badge.svg?branch=develop)](https://coveralls.io/github/ngabopatrick/Quick-credit?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/cd92c477487f93412024/maintainability)](https://codeclimate.com/github/ngabopatrick/Quick-credit/maintainability) 

# Getting started

- Quick credit is is an online lending platform that provides short term soft loans for individuals. This helps solve problems of financial inclusion as a way to alleviate poverty and empower low income earners.

- Install dependencies
```
npm install
```
- Starting the development server
```
 npm start
 ```
 - npm tests

 ```
  npm run tests
  ```
# Dependancies
```
Nodejs Runtime encviroment that helps to run javascript both on th server and berouese
```
```
Express NodeJS framework used for making the back-end.
```
Joi and Morgan API request body error validation and HTTP Request logger respectively.
# Heroku
 ```
 visit link: https://quick-creditv1.com
 ```
# API-Endpoints

JSON Object is returned for every API endpoint, structure of return JSON Object:
```
POST /api/v1/auth/signup Creating a new user.

POST /api/v1/auth/sigin Sign in user.

GET /api/v1/users Retreiving all users
GET /api/v1/users/<id> Getting a user for a specific id.

POST /api/v1/loans apply for loan.

PATCH /api/v1/loans/<id> approve loan application

GET /api/v1/loans/<id> Get a specific loan.

