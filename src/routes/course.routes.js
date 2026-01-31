const express = require('express');
const router = express.Router();
const { createCourse, getCourse, deleteCourse } = require('../controllers/course.controller.js');

router.post('/', createCourse);
router.get('/', getCourse);
router.delete('/:id', deleteCourse);

module.exports = router;