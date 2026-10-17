// Request validation middleware for student data

const validateStudentInput = (req, res, next) => {
  const { name, studentId, email, phone, course, semester, dateOfBirth, gender, status } = req.body;
  const errors = [];

  // Required fields checks
  if (!name || !name.trim()) errors.push('Full Name is required');
  if (!studentId || !studentId.trim()) errors.push('Student ID is required');
  if (!email || !email.trim()) errors.push('Email address is required');
  if (!phone || !phone.trim()) errors.push('Phone number is required');
  if (!course || !course.trim()) errors.push('Course or Department is required');
  if (!semester || !semester.trim()) errors.push('Semester or Year is required');
  if (!dateOfBirth) errors.push('Date of Birth is required');

  // Format validations
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
  if (email && !emailRegex.test(email.trim())) {
    errors.push('Invalid email address format');
  }

  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{7,15}$/;
  if (phone && !phoneRegex.test(phone.trim())) {
    errors.push('Invalid phone number format');
  }

  const idRegex = /^[A-Za-z0-9_-]{3,20}$/;
  if (studentId && !idRegex.test(studentId.trim())) {
    errors.push('Student ID must be between 3 and 20 alphanumeric characters');
  }

  if (status && !['Active', 'Inactive'].includes(status)) {
    errors.push('Status must be either Active or Inactive');
  }

  if (gender && !['Male', 'Female', 'Other', 'Prefer not to say'].includes(gender)) {
    errors.push('Invalid gender selected');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: errors.join('; '),
      errors,
    });
  }

  // Sanitize fields
  req.body.name = name.trim();
  req.body.studentId = studentId.trim().toUpperCase();
  req.body.email = email.trim().toLowerCase();
  req.body.phone = phone.trim();
  req.body.course = course.trim();
  req.body.semester = semester.trim();
  if (req.body.address) req.body.address = req.body.address.trim();

  next();
};

module.exports = { validateStudentInput };
