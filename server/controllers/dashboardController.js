const Student = require('../models/Student');

// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Public
const getDashboardStats = async (req, res, next) => {
  try {
    // 1. Total counts
    const totalStudents = await Student.countDocuments();
    const activeStudents = await Student.countDocuments({ status: 'Active' });
    const inactiveStudents = await Student.countDocuments({ status: 'Inactive' });

    // 2. Course breakdown using MongoDB aggregation
    const courseDistribution = await Student.aggregate([
      {
        $group: {
          _id: '$course',
          count: { $sum: 1 },
          active: {
            $sum: { $cond: [{ $eq: ['$status', 'Active'] }, 1, 0] },
          },
        },
      },
      { $sort: { count: -1 } },
    ]);

    // 3. Gender breakdown
    const genderDistribution = await Student.aggregate([
      {
        $group: {
          _id: '$gender',
          count: { $sum: 1 },
        },
      },
    ]);

    // 4. Recently enrolled students (limit 5)
    const recentStudents = await Student.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name studentId email course status enrollmentDate createdAt');

    // 5. Total distinct courses
    const distinctCourses = courseDistribution.length;

    res.status(200).json({
      success: true,
      data: {
        totalStudents,
        activeStudents,
        inactiveStudents,
        totalCourses: distinctCourses,
        courseDistribution: courseDistribution.map((item) => ({
          course: item._id,
          count: item.count,
          active: item.active,
        })),
        genderDistribution: genderDistribution.map((item) => ({
          gender: item._id,
          count: item.count,
        })),
        recentStudents,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getDashboardStats };
