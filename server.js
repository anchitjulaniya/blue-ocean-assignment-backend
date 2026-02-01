const express = require('express');
const cors = require('cors');
const env = require('dotenv');
const db = require('./src/config/db')
const app = express();
const categoryRoutes = require('./src/routes/category.routes')
const subCategoryRoutes = require('./src/routes/subcategory.routes')
const courseRoutes = require('./src/routes/course.routes')
const errorMiddleware = require('./src/middlewares/error.middleware');
const { StatusCodes } = require('http-status-codes');
const PORT = process.env.PORT || 5000
env.config();

app.use(cors());
app.use(express.json());

app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/subcategory', subCategoryRoutes);
app.use('/api/v1/course', courseRoutes);

app.get('/health', (req, res) => {
  res.status(StatusCodes.OK).json({ status: 'OK' });
});

app.use(errorMiddleware);

db();

app.listen(PORT, '0.0.0.0', () => {
    console.log("Server is running on port: ", PORT);
})



