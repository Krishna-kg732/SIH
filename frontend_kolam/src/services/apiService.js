// API service for backend communication
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Kolam-specific API methods
  async predictKolam(file) {
    const formData = new FormData();
    formData.append('file', file);
    
    return this.request('/kolam/predict', {
      method: 'POST',
      headers: {}, // Remove Content-Type to let browser set it for FormData
      body: formData,
    });
  }

  async generateKolamFromDescription(query, generateImage = true) {
    return this.request('/kolam/knowledge', {
      method: 'POST',
      body: JSON.stringify({
        query,
        generate_image: generateImage,
      }),
    });
  }

  // Learning/Quiz API methods
  async getTriviaQuestions(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/learning/questions?${queryString}`);
  }

  async startQuizSession(category, difficulty, numQuestions = 10) {
    return this.request('/learning/quiz/start', {
      method: 'POST',
      body: JSON.stringify({
        category,
        difficulty_level: difficulty,
        num_questions: numQuestions,
      }),
    });
  }

  async submitQuizAnswer(sessionId, answer) {
    return this.request(`/learning/quiz/${sessionId}/answer`, {
      method: 'POST',
      body: JSON.stringify(answer),
    });
  }

  // User authentication methods
  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;