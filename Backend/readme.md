# User Authentication API

This project provides a simple user authentication API using Express.js. It includes routes for user registration, login, and logout.

## API Routes

### Register a new user

- **URL:** `user/register`
- **Method:** `POST`
- **Description:** Registers a new user.
- **Request Body:**
  ```json
  {
    "name": "kaushal",
    "password": "123456",
    "email":"kaushal@gmail.com"
  }
### Login a  user

- **URL:** `user/login`
- **Method:** `POST`
- **Description:** Login  user.
- **Request Body:**
  ```json
  {
    "password": "123456",
    "email":"kaushal@gmail.com"
  }
### Logout a  user

- **URL:** `user/logout`
- **Method:** `POST`
- **Description:** Logout  user.
- **Header:** also pass token in header.
- **Request Body:**
  ```json
  {
    "token":"toke"
  }