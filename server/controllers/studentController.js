const mongoose = require('mongoose');
const Student = require('../models/Student');

// @desc    Get all students with search, filter, sort & pagination
// @route   GET /api/students
// @access  Public
const getStudents = async (req, res, next) => {
  try {
    const {
      search,
      course,
      status,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    // Search filter across name, studentId, and email
    if (search && search.trim() !== '') {
      const escapedSearch = search.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const searchRegex = new RegExp(escapedSearch, 'i');
      query.$or = [
        { name: searchRegex },
        { studentId: searchRegex },
        { email: searchRegex },
        { course: searchRegex },
      ];
    }

    // Filter by Course
    if (course && course.trim() !== '' && course !== 'All') {
      query.course = course.trim();
    }

    // Filter by Status
    if (status && status.trim() !== '' && status !== 'All') {
      query.status = status.trim();
    }

    // Sorting
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Pagination
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const isFetchAll = limit === 'all';
    const limitNum = isFetchAll ? 0 : Math.max(1, parseInt(limit, 10) || 10);
    const skip = isFetchAll ? 0 : (pageNum - 1) * limitNum;

    // Execute query and total count
    const total = await Student.countDocuments(query);
    const studentsQuery = Student.find(query).sort(sort);

    if (!isFetchAll) {
      studentsQuery.skip(skip).limit(limitNum);
    }

    const students = await studentsQuery.exec();

    const totalPages = isFetchAll ? 1 : Math.ceil(total / limitNum) || 1;

    res.status(200).json({
      success: true,
      total,
      count: students.length,
      currentPage: pageNum,
      totalPages,
      hasNextPage: pageNum < totalPages,
      hasPrevPage: pageNum > 1,
      data: students,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single student by ID
// @route   GET /api/students/:id
// @access  Public
const getStudentById = async (req, res, next) => {
  try {
    const { id } = req.params;

    let student;
    if (mongoose.Types.ObjectId.isValid(id)) {
      student = await Student.findById(id);
    } else {
      // Allow finding by studentId string
      student = await Student.findOne({ studentId: id.toUpperCase() });
    }

    if (!student) {
      return res.status(404).json({
        success: false,
        message: `Student with ID "${id}" was not found`,
      });
    }

    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new student
// @route   POST /api/students
// @access  Public
const createStudent = async (req, res, next) => {
  try {
    const {
      name,
      studentId,
      email,
      phone,
      gender,
      dateOfBirth,
      course,
      semester,
      address,
      enrollmentDate,
      status,
    } = req.body;

    // Check for duplicate studentId
    const existingId = await Student.findOne({ studentId: studentId.toUpperCase() });
    if (existingId) {
      return res.status(409).json({
        success: false,
        message: `Student ID "${studentId.toUpperCase()}" already exists. Please assign a unique ID.`,
      });
    }

    // Check for duplicate email
    const existingEmail = await Student.findOne({ email: email.toLowerCase() });
    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: `Email "${email.toLowerCase()}" is already registered with another student.`,
      });
    }

    const student = await Student.create({
      name,
      studentId: studentId.toUpperCase(),
      email: email.toLowerCase(),
      phone,
      gender: gender || 'Male',
      dateOfBirth,
      course,
      semester,
      address: address || 'Not specified',
      enrollmentDate: enrollmentDate || Date.now(),
      status: status || 'Active',
    });

    res.status(201).json({
      success: true,
      message: 'Student record created successfully',
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update existing student
// @route   PUT /api/students/:id
// @access  Public
const updateStudent = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: `Invalid Student record ID format: "${id}"`,
      });
    }

    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: `Student with ID "${id}" was not found`,
      });
    }

    const {
      name,
      studentId,
      email,
      phone,
      gender,
      dateOfBirth,
      course,
      semester,
      address,
      enrollmentDate,
      status,
    } = req.body;

    // Check if new studentId conflicts with another student
    if (studentId && studentId.toUpperCase() !== student.studentId) {
      const conflict = await Student.findOne({
        studentId: studentId.toUpperCase(),
        _id: { $ne: id },
      });
      if (conflict) {
        return res.status(409).json({
          success: false,
          message: `Student ID "${studentId.toUpperCase()}" is already used by student "${conflict.name}".`,
        });
      }
      student.studentId = studentId.toUpperCase();
    }

    // Check if new email conflicts with another student
    if (email && email.toLowerCase() !== student.email) {
      const conflictEmail = await Student.findOne({
        email: email.toLowerCase(),
        _id: { $ne: id },
      });
      if (conflictEmail) {
        return res.status(409).json({
          success: false,
          message: `Email "${email.toLowerCase()}" is already assigned to another student.`,
        });
      }
      student.email = email.toLowerCase();
    }

    if (name) student.name = name;
    if (phone) student.phone = phone;
    if (gender) student.gender = gender;
    if (dateOfBirth) student.dateOfBirth = dateOfBirth;
    if (course) student.course = course;
    if (semester) student.semester = semester;
    if (address !== undefined) student.address = address;
    if (enrollmentDate) student.enrollmentDate = enrollmentDate;
    if (status) student.status = status;

    const updatedStudent = await student.save();

    res.status(200).json({
      success: true,
      message: 'Student record updated successfully',
      data: updatedStudent,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete student record
// @route   DELETE /api/students/:id
// @access  Public
const deleteStudent = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: `Invalid Student record ID format: "${id}"`,
      });
    }

    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: `Student record with ID "${id}" was not found`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Student "${student.name}" (${student.studentId}) deleted successfully`,
      data: {
        id: student._id,
        name: student.name,
        studentId: student.studentId,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
