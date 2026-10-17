const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Student = require('./models/Student');
const connectDB = require('./config/db');

dotenv.config();

const sampleStudents = [
  {
    name: 'Aarav Sharma',
    studentId: 'STU-2024-001',
    email: 'aarav.sharma@example.edu',
    phone: '+91 9823012345',
    gender: 'Male',
    dateOfBirth: new Date('2003-04-15'),
    course: 'Computer Science & Engineering',
    semester: 'Semester 6',
    address: '42 Orchid Residency, Baner, Pune, Maharashtra 411045',
    enrollmentDate: new Date('2022-08-10'),
    status: 'Active',
  },
  {
    name: 'Ananya Deshmukh',
    studentId: 'STU-2024-002',
    email: 'ananya.deshmukh@example.edu',
    phone: '+91 9890123456',
    gender: 'Female',
    dateOfBirth: new Date('2004-01-22'),
    course: 'Artificial Intelligence & Data Science',
    semester: 'Semester 4',
    address: '15 Silver Crest, Kothrud, Pune, Maharashtra 411038',
    enrollmentDate: new Date('2023-08-12'),
    status: 'Active',
  },
  {
    name: 'Rohan Kulkarni',
    studentId: 'STU-2024-003',
    email: 'rohan.kulkarni@example.edu',
    phone: '+91 9765432109',
    gender: 'Male',
    dateOfBirth: new Date('2002-11-05'),
    course: 'Information Technology',
    semester: 'Semester 8',
    address: '88 Sunrise Park, Hinjewadi Phase 1, Pune, Maharashtra 411057',
    enrollmentDate: new Date('2021-08-16'),
    status: 'Active',
  },
  {
    name: 'Pooja Iyer',
    studentId: 'STU-2024-004',
    email: 'pooja.iyer@example.edu',
    phone: '+91 9123456780',
    gender: 'Female',
    dateOfBirth: new Date('2003-07-19'),
    course: 'Electronics & Telecommunication',
    semester: 'Semester 5',
    address: '12 Green Meadows, Aundh, Pune, Maharashtra 411007',
    enrollmentDate: new Date('2022-08-20'),
    status: 'Active',
  },
  {
    name: 'Vikramaditya Patil',
    studentId: 'STU-2024-005',
    email: 'vikram.patil@example.edu',
    phone: '+91 9422001122',
    gender: 'Male',
    dateOfBirth: new Date('2001-09-30'),
    course: 'Mechanical Engineering',
    semester: 'Semester 8',
    address: '77 Heritage Heights, Shivajinagar, Pune, Maharashtra 411005',
    enrollmentDate: new Date('2021-08-14'),
    status: 'Inactive',
  },
  {
    name: 'Sneha Verma',
    studentId: 'STU-2024-006',
    email: 'sneha.verma@example.edu',
    phone: '+91 9370123987',
    gender: 'Female',
    dateOfBirth: new Date('2004-06-11'),
    course: 'Computer Science & Engineering',
    semester: 'Semester 3',
    address: '204 Skyline View, Viman Nagar, Pune, Maharashtra 411014',
    enrollmentDate: new Date('2023-08-18'),
    status: 'Active',
  },
  {
    name: 'Kabir Mehta',
    studentId: 'STU-2024-007',
    email: 'kabir.mehta@example.edu',
    phone: '+91 9881234500',
    gender: 'Male',
    dateOfBirth: new Date('2003-02-14'),
    course: 'Business Administration (MBA)',
    semester: 'Semester 2',
    address: '503 Emerald Towers, Koregaon Park, Pune, Maharashtra 411001',
    enrollmentDate: new Date('2024-01-10'),
    status: 'Active',
  },
  {
    name: 'Tanvi Nair',
    studentId: 'STU-2024-008',
    email: 'tanvi.nair@example.edu',
    phone: '+91 9552109876',
    gender: 'Female',
    dateOfBirth: new Date('2003-12-08'),
    course: 'Artificial Intelligence & Data Science',
    semester: 'Semester 4',
    address: '34 Harmony Woods, Wakad, Pune, Maharashtra 411057',
    enrollmentDate: new Date('2023-08-12'),
    status: 'Active',
  },
  {
    name: 'Aditya Joshi',
    studentId: 'STU-2024-009',
    email: 'aditya.joshi@example.edu',
    phone: '+91 9604123890',
    gender: 'Male',
    dateOfBirth: new Date('2002-05-25'),
    course: 'Information Technology',
    semester: 'Semester 7',
    address: '109 Riverside Boulevard, Kalyani Nagar, Pune, Maharashtra 411006',
    enrollmentDate: new Date('2021-08-22'),
    status: 'Inactive',
  },
  {
    name: 'Meera Sen',
    studentId: 'STU-2024-010',
    email: 'meera.sen@example.edu',
    phone: '+91 9403887766',
    gender: 'Female',
    dateOfBirth: new Date('2004-03-03'),
    course: 'Computer Science & Engineering',
    semester: 'Semester 2',
    address: '61 Rosewood Villa, Bavdhan, Pune, Maharashtra 411021',
    enrollmentDate: new Date('2024-08-05'),
    status: 'Active',
  },
];

const seedData = async () => {
  try {
    await connectDB();

    console.log('[Seeding] Clearing existing student records...');
    await Student.deleteMany();

    console.log('[Seeding] Inserting sample student records...');
    const created = await Student.insertMany(sampleStudents);

    console.log(`[Seeding] Successfully inserted ${created.length} students!`);
    process.exit(0);
  } catch (error) {
    console.error(`[Seeding Error]: ${error.message}`);
    process.exit(1);
  }
};

seedData();
