const express = require('express');
const cors = require('cors');
const env = require('dotenv');
const db = require('./src/config/db')
const app = express();
const categoryRoutes = require('./src/routes/category.routes')
const subCategoryRoutes = require('./src/routes/subcategory.routes')
const courseRoutes = require('./src/routes/course.routes')
const errorMiddleware = require('./src/middlewares/error.middleware')
const PORT = process.env.PORT || 5000
env.config();

app.use(cors());
app.use(express.json());

db();

app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/subcategory', subCategoryRoutes);
app.use('/api/v1/course', courseRoutes);

// app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log("Server is running on port: ", PORT);
})



