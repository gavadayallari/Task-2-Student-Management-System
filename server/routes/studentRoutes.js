const express = require('express');
const router = express.Router();
const {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} = require('../controllers/studentController');
const { validateStudentInput } = require('../middleware/validateStudent');

// Route: /api/students
router.route('/')
  .get(getStudents)
  .post(validateStudentInput, createStudent);

// Route: /api/students/:id
router.route('/:id')
  .get(getStudentById)
  .put(validateStudentInput, updateStudent)
  .delete(deleteStudent);

module.exports = router;
