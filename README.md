# Blue Ocean Backend API

A production-ready backend application built using **ExpressJS** and **MongoDB (Mongoose)** for managing **Categories, SubCategories, and Courses** with proper relationships, validations, pagination, search, sorting, soft delete, and aggregation.

This project demonstrates **real-world backend architecture**, clean code structure, and strong data integrity handling.

---

## 🚀 Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- MongoDB Atlas
- Render (Deployment)
- Postman (API Testing)

---

## 📁 Project Structure

src/
├── controllers/
│ ├── category.controller.js
│ ├── subcategory.controller.js
│ └── course.controller.js
├── models/
│ ├── category.model.js
│ ├── subcategory.model.js
│ └── course.model.js
├── routes/
│ ├── category.routes.js
│ ├── subcategory.routes.js
│ └── course.routes.js
├── middlewares/
│ ├── error.middleware.js
│ └── validateId.middleware.js
├── utils/
│ ├── apiFeatures.js
│ └── AppError.js
├── app.js
└── server.js

---

## ✨ Key Features

### CRUD Operations
- Category
- SubCategory
- Course

### Relationship Rules
- Each SubCategory belongs to one Category
- A Course can belong to multiple Categories and SubCategories
- Validation ensures all SubCategories belong to selected Categories

### Listing Features
- Pagination (page, limit)
- Sorting (asc, desc)
- Search (case-insensitive)
- Soft Delete using `isDeleted`

### Aggregation
- Category-wise SubCategory count

### Code Quality
- Modular ExpressJS architecture
- Centralized error handling
- MongoDB transactions
- Reusable API utilities

---

## ⚙️ Environment Setup

\### Clone Repository

\`\`\`bash

git clone https://github.com/<your-username>/blue-ocean-backend.git

cd blue-ocean-backend

npm install

PORT\=5000

MONGO\_URI\=your\_mongodb\_atlas\_connection\_string

npm run dev

🧑‍💻 How to Use the APIs

1. Create Categories

  

Categories are the top-level entities.

Create categories before creating subcategories or courses.

POST /api/v1/categories

{

  "name": "Development"

}

2. Create SubCategories (Under Category)

  

Each SubCategory must belong to a valid Category.

POST /api/v1/subcategories/category/:categoryId

{

  "name": "Backend Development"

}

3. Create Courses

  

Courses can be linked to multiple Categories and SubCategories.

POST /api/v1/courses

{

  "title": "Full Stack MERN Development",

  "description": "Complete MERN stack course",

  "categories": \["categoryId1", "categoryId2"\],

  "subCategories": \["subCategoryId1", "subCategoryId2"\]

}

4. Get All Records (Pagination, Search, Sorting)

GET /api/v1/categories?page=1&limit\=10&search\=dev&sort\=asc

5. Get Single Record by ID

GET /api/v1/subcategories/:id

6. Soft Delete Records

  

Soft delete is used instead of permanent deletion.

DELETE /api/v1/categories/:id

  

7. Aggregation API

GET /api/v1/category/sub-category-count

Error Handling

  

All APIs return a consistent error response:

{

  "success": false,

  "message": "Error description"

}