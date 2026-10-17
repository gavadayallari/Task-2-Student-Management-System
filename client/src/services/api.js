// API Service layer for StudentHub

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * Helper to handle fetch responses and error extraction
 */
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const res = await fetch(url, config);
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const errorMessage = data.message || `Request failed with status ${res.status}`;
      const error = new Error(errorMessage);
      error.status = res.status;
      error.errors = data.errors || null;
      throw error;
    }

    return data;
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Unable to connect to the backend server. Please verify the server is running on port 5000.');
    }
    throw error;
  }
}

export const api = {
  // Dashboard statistics
  getStats: () => request('/dashboard/stats'),

  // Get all students with optional filters
  getStudents: ({
    search = '',
    course = '',
    status = '',
    sortBy = 'createdAt',
    sortOrder = 'desc',
    page = 1,
    limit = 10,
  } = {}) => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (course && course !== 'All') params.append('course', course);
    if (status && status !== 'All') params.append('status', status);
    if (sortBy) params.append('sortBy', sortBy);
    if (sortOrder) params.append('sortOrder', sortOrder);
    if (page) params.append('page', page);
    if (limit) params.append('limit', limit);

    return request(`/students?${params.toString()}`);
  },

  // Get single student by ID
  getStudentById: (id) => request(`/students/${id}`),

  // Create new student
  createStudent: (studentData) =>
    request('/students', {
      method: 'POST',
      body: JSON.stringify(studentData),
    }),

  // Update existing student
  updateStudent: (id, studentData) =>
    request(`/students/${id}`, {
      method: 'PUT',
      body: JSON.stringify(studentData),
    }),

  // Delete student
  deleteStudent: (id) =>
    request(`/students/${id}`, {
      method: 'DELETE',
    }),

  // Health check
  getHealth: () => request('/health'),
};

export default api;
