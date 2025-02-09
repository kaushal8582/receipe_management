# Receipe Management System 

The **Receipe Management System** is a web-based application for managing Receipe (creating,updateing , deleting and managing profile). This system provides an efficient way for admins to Ban User and UnBan User statuses in real time.

---

# Recipe Management System

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- Sequelize installed and running
- npm or yarn package manager

### Installation Steps

1. Clone the repository
```bash
git clone (url)
```

2. Switch User backend 
```bash
cd backend
```

3. Install dependencies
```bash
npm install
```

4. Start the server
```bash
npm start
```

5. Switch User frontend
```bash
cd frontend
```
6. Install dependencies
```bash
npm install
```
7. Start the server
```bash
npm run dev
```
8. Switch Admin backend
```bash
cd adminBackend
```
9. Install dependencies
```bash
npm install
```
10. Start the server
```bash
npm start
```
11. Switch Admin frontend
```bash
cd adminFrontend
```
12. Install dependencies
```bash
npm install
```
13. Start the server
```bash
npm run dev
```

## User .env file symple

``` json
PORT = 3000
DATABASE_NAME= name of your db
DATABASE_PASSWORD = database password
DATABASE_USER = database user name
JWT_SECREAT_KEY = jwt secrete key

CLOUDINARY_CLOUD_NAME = cloudinary cloud name
CLOUDINARY_API_KEY = cloudinary api key
CLOUDINARY_API_SECRET = cloudinary api secret
```
## Admin .env file symple
``` json
ADMIN_EMAIL = "admin@gmail.com"
JWT_SECREAT_KEY = jwt secrete key
```

## 🚀 Features

1. **Receipe  Creation**  
   User can create Receipe.

2. **Real-Time Updates**  
   Dynamic and real-time updates of receipe statuses across categories:
   - Vegan
   - Nonn-Vegan
   - Vegetarian
   - Non-Vegetarian

3. **Detailed Receipe Data**  
   User  view detailed information about each Receipe.and give rating to the receipe.
   also follow the receipe.

4. **Smooth Navigation**  
   Easily navigate through filtered lists with "Next" and "Previous" buttons.

---

## 📂 API Routes

### **Receipe Management**

### Register a new user

- **URL:** `http://localhost:3000/user/register`
- **Method:** `POST`
- **Description:** Registers a new user.
- **Request Body:**
  ```json
  {
    "name": "temp",
    "password": "temp123",
    "email":"temp@gmail.com"
  }
### Login a  user

- **URL:** `http://localhost:3000/user/login`
- **Method:** `POST`
- **Description:** Login  user.
- **Request Body:**
  ```json
  {
    "password": "temp123",
    "email":"temp@gmail.com"
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
### Create receipe

- **URL:** `http://localhost:3000/receipe/create`
- **Method:** `POST`
- **Description:** Create receipe.
- **Header:** also pass token in header.
- **Request Body:**
  ```json
  {
    "token":"toke"
  }
| **Key**                | **Value**                                                                 |
|------------------------|---------------------------------------------------------------------------|
| **Application Name**   | receipe Management System                                                   |
| **img**        | location of img                              |
| **title**  | receipe title                               |
| **description**         | receipe details              |
| **prepTime**  | prepration time       |
| **cookTime**         | cookTime                                                       |
| **difficulty**         | difficulty                                                       |
| **ingredients**         | ["Pasta", "Tomato Sauce", "Cheese"]                                                       |
| **instructions**         | ["Boil pasta", "Prepare sauce", "Mix together"]                                                       |
| **nutritionInfo**         | { calories: 500, fat: 10, protein: 15, }                                                       |
| **servings**     | serving
| **dietaryPreference**     | dietaryPreference

### Get all receipe

- **URL:** `http://localhost:3000/receipe/getall`
- **Method:** `GET`
- **Description:** get all receipe.

### Update  receipe

- **URL:** `http://localhost:3000/receipe/update`
- **Method:** `POST`
- **Description:** update receipe.
- **Header:** also pass token in header.
- **Request Body:**
  ```json
  {
    "id":"1",
    "title":"updated tilte"
  }
### Delete  receipe

- **URL:** `http://localhost:3000/receipe/delete`
- **Method:** `POST`
- **Description:** delete receipe.
- **Header:** also pass token in header.
- **Request Body:**
  ```json
  {
    "id":"1",
  }
### Filter  receipe

- **URL:** `http://localhost:3000/receipe/filter`
- **Method:** `POST`
- **Description:** Filter receipe.
<!-- - **Header:** also pass token in header. -->
- **Request Body:**
  ```json
  {
   "difficulty":"easy",
    "preparation_time":"8"
  }


## 🖼️ Screenshots

### Home Page
![Home Page](path/to/homepage-screenshot.png)

### User Profile
![Student Details](path/to/student-details-screenshot.png)

---

## 💡 Future Enhancements
1. Add user authentication for enhanced security.  
2. Generate detailed reports for admin analysis.  

---

Feel free to modify this template and add more details or screenshots as needed. 😊
