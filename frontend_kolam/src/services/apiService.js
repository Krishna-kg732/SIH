// API service for backend communication
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    // Allow custom API endpoint for analyze functionality
    this.customAnalyzeEndpoint = null;
    // Allow custom API endpoint for pattern creation functionality
    this.customCreateEndpoint = null;
  }

  // Method to set custom analyze endpoint
  setCustomAnalyzeEndpoint(endpoint) {
    this.customAnalyzeEndpoint = endpoint;
  }

  // Method to set custom create endpoint
  setCustomCreateEndpoint(endpoint) {
    this.customCreateEndpoint = endpoint;
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
    
    // Use custom endpoint if provided, otherwise use default
    const endpoint = this.customAnalyzeEndpoint || '/api/v1/kolam/predict';
    const useCustomUrl = this.customAnalyzeEndpoint && this.customAnalyzeEndpoint.startsWith('http');
    
    if (useCustomUrl) {
      // For custom external URLs, make direct fetch request
      try {
        const response = await fetch(this.customAnalyzeEndpoint, {
          method: 'POST',
          body: formData,
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
      } catch (error) {
        console.error('Custom API request failed:', error);
        throw error;
      }
    } else {
      // Use default request method for relative endpoints
      return this.request(endpoint, {
        method: 'POST',
        headers: {}, // Remove Content-Type to let browser set it for FormData
        body: formData,
      });
    }
  }

  async generateKolamFromDescription(query, generateImage = true) {
    const endpoint = this.customCreateEndpoint || '/api/v1/kolam/knowledge';
    const useCustomUrl = this.customCreateEndpoint && this.customCreateEndpoint.startsWith('http');
    
    const requestBody = {
      query,
      generate_image: generateImage,
    };
    
    if (useCustomUrl) {
      // For custom external URLs, make direct fetch request
      try {
        const response = await fetch(this.customCreateEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
      } catch (error) {
        console.error('Custom create API request failed:', error);
        throw error;
      }
    } else {
      // Use default request method for relative endpoints
      return this.request(endpoint, {
        method: 'POST',
        body: JSON.stringify(requestBody),
      });
    }
  }

  // Alternative method to send base64 image data
  async predictKolamBase64(base64Data, fileName = 'image') {
    const endpoint = this.customAnalyzeEndpoint || '/api/v1/kolam/predict';
    const useCustomUrl = this.customAnalyzeEndpoint && this.customAnalyzeEndpoint.startsWith('http');
    
    const requestBody = {
      image: base64Data,
      filename: fileName
    };
    
    if (useCustomUrl) {
      // For custom external URLs, make direct fetch request
      try {
        const response = await fetch(this.customAnalyzeEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
      } catch (error) {
        console.error('Custom base64 API request failed:', error);
        throw error;
      }
    } else {
      // Use default request method for relative endpoints
      return this.request(endpoint, {
        method: 'POST',
        body: JSON.stringify(requestBody),
      });
    }
  }

  // Learning/Quiz API methods
  async getTriviaQuestions(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/api/v1/learning/questions?${queryString}`);
  }

  async startQuizSession(category, difficulty, numQuestions = 10) {
    return this.request('/api/v1/learning/quiz/start', {
      method: 'POST',
      body: JSON.stringify({
        category,
        difficulty_level: difficulty,
        num_questions: numQuestions,
      }),
    });
  }

  async submitQuizAnswer(sessionId, answer) {
    return this.request(`/api/v1/learning/quiz/${sessionId}/answer`, {
      method: 'POST',
      body: JSON.stringify(answer),
    });
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;