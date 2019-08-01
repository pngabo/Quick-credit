# Quick-credit [![Build Status](https://travis-ci.org/ngabopatrick/Quick-credit.svg?branch=develop)](https://travis-ci.org/ngabopatrick/Quick-credit) [![Coverage Status](https://coveralls.io/repos/github/ngabopatrick/Quick-credit/badge.svg?branch=develop)](https://coveralls.io/github/ngabopatrick/Quick-credit?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/4e47b9685247bd1a7f38/maintainability)](https://codeclimate.com/github/patrickngabo/Quick-credit/maintainability)

# Getting started

- Quick credit is is an online lending platform that provides short term soft loans for individuals. This helps solve problems of financial inclusion as a way to alleviate poverty and empower low income earners.

## REQUIREMENTS
  - User (client) can sign up
  - User (client) can login
  - User (client) can request for only one loan at a time
  - User (client) can view loan repayment history, to keep track of his/her liability or responsibilities
  - User (client) can update profile to meetup requirement after profile rejection
  - Admin can mark a client as verified , after confirming his/her home and work address
  - Admin can view a specific loan application
  - Admin can approve or reject a client’s loan application
  - Admin can post loan repayment transaction in favour of a client
  - Admin can view all loan applications
  - Admin can view all current loans (not fully repaid)
  - Admin can view all repaid loans
 
 
#### Install dependencies
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
#### Dependancies
```
Nodejs Runtime environment that helps to run javascript both on the server and browser
```
```
Express NodeJS framework used for making the back-end.
```
Joi request body error validation and HTTP Request
#### Heroku
 ```
 visit link: https://quick-creditv1.herokuapp.com/
 ```
#### API-Endpoints

JSON Object is returned for every API endpoint, structure of return JSON Object:
```
  - POST /api/v1/auth/signup Create user account

  - POST /api/v1/auth/signin Login a user

  - GET /api/v1/user Get all user

  - GET /api/v1/user/<:id> Get a user

  - PATCH /api/v1/user/<:id> Update a user

  - DELETE /api/v1/user/<:id> Delete a user

  - POST /api/v1/loans Create a loan application

  - GET /api/v1/loans/<:loan-id>/repayment View loan repayment history

  - GET /api/v1/loans Get all loan applications

  - GET /api/v1/loans?status=approved&repaid=false Get all current loans that are not fully repaid

  - GET /api/v1/loans?status=approved&repaid=true Get all repaid loans.

  - PATCH /api/v1/users/<:user-email>/verify Mark a user as verified

  - GET /api/v1/loans/<:loan-id> Get a specific loan application

  - PATCH /api/v1/loans/<:loan-id>/approve or reject a loan application

  - PATCH /api/v1/loans/<:loan-id>/reject or reject a loan application

  - POST /api/v1/loans/<:loan-id>/repayment Create a loan repayment record


