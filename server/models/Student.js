const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    studentId: {
      type: String,
      required: [true, 'Student ID is required'],
      unique: true,
      uppercase: true,
      trim: true,
      match: [
        /^[A-Za-z0-9_-]{3,20}$/,
        'Student ID must be 3-20 alphanumeric characters (hyphens and underscores allowed)',
      ],
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
        'Please provide a valid email address',
      ],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [
        /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{7,15}$/,
        'Please provide a valid phone number (e.g. +91 9876543210 or 9876543210)',
      ],
    },
    gender: {
      type: String,
      required: [true, 'Gender is required'],
      enum: {
        values: ['Male', 'Female', 'Other', 'Prefer not to say'],
        message: '{VALUE} is not a supported gender option',
      },
      default: 'Male',
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Date of birth is required'],
    },
    course: {
      type: String,
      required: [true, 'Course or Department is required'],
      trim: true,
    },
    semester: {
      type: String,
      required: [true, 'Semester or Year is required'],
      trim: true,
    },
    address: {
      type: String,
      trim: true,
      default: 'Not specified',
    },
    enrollmentDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: {
        values: ['Active', 'Inactive'],
        message: 'Status must be either Active or Inactive',
      },
      default: 'Active',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for fast searching and uniqueness
studentSchema.index({ name: 'text', studentId: 'text', email: 'text' });
studentSchema.index({ course: 1, status: 1 });
studentSchema.index({ enrollmentDate: -1 });

module.exports = mongoose.model('Student', studentSchema);
