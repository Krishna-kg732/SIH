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
    try {
      // Convert file to base64
      const base64Image = await this.fileToBase64(file);
      
      console.log('🔧 Converting file to base64:', {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        base64Length: base64Image.length
      });
      
      // Create a new File object from the base64 data
      const base64File = this.base64ToFile(base64Image, file.name, file.type);
      
      // Create FormData with the base64-converted file
      const formData = new FormData();
      formData.append('file', base64File);
      
      console.log('🔧 Sending base64-converted file to API:', {
        fileName: base64File.name,
        fileSize: base64File.size,
        fileType: base64File.type
      });
      
      // Use the official Kolam prediction API
      const apiUrl = 'https://kartikeya.me/api/v1/kolam/predict';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
      });
      
      console.log('🔧 API Response status:', response.status);
      console.log('🔧 API Response headers:', Object.fromEntries(response.headers.entries()));
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('🔧 API Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      
      const result = await response.json();
      
      // Debug: Log the actual API response to understand the format
      console.log('🔍 Raw API Response:', result);
      console.log('🔍 Response keys:', Object.keys(result));
      if (result.confidence !== undefined) {
        console.log('🔍 Confidence value:', result.confidence, 'Type:', typeof result.confidence);
      }
      if (result.highest_scored_class !== undefined) {
        console.log('🔍 Highest scored class:', result.highest_scored_class);
      }
      if (result.related_design_principle !== undefined) {
        console.log('🔍 Design principle:', result.related_design_principle);
      }
      
      // Extract pattern name with multiple fallback options
      const patternName = result.highest_scored_class || 
                         result.class || 
                         result.predicted_class || 
                         result.label ||
                         result.pattern || 
                         result.pattern_type || 
                         result.kolam_type ||
                         result.prediction ||
                         result.name ||
                         'Unknown Pattern';
      
      console.log('🔍 Final extracted pattern name:', patternName);
      
      // Transform the API response to match our frontend expectations
      return {
        label: patternName,
        highest_scored_class: result.highest_scored_class,
        confidence: result.confidence || result.score || 0,
        design_principle: result.related_design_principle || result.design_principle || 'No design principle available',
        // Pass through all original fields for debugging
        raw_response: result
      };
    } catch (error) {
      console.error('Kolam prediction API request failed:', error);
      throw error;
    }
  }

  // Helper method to convert file to base64
  fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // Remove the data:image/jpeg;base64, prefix to get just the base64 string
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      };
      reader.onerror = error => reject(error);
    });
  }

  // Helper method to convert base64 back to File object
  base64ToFile(base64String, fileName, mimeType) {
    // Convert base64 to binary data
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    
    const byteArray = new Uint8Array(byteNumbers);
    
    // Create a new File object
    return new File([byteArray], fileName, { type: mimeType });
  }

  async generateKolamFromDescription(query, generateImage = true) {
    // Use the official Kolam knowledge/generation API
    const apiUrl = 'https://kartikeya.me/api/v1/kolam/knowledge';
    
    const requestBody = {
      query,
      generate_image: generateImage,
    };
    
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      // Debug: Log the generation API response
      console.log('🎨 Generation API Response:', result);
      console.log('🎨 Response keys:', Object.keys(result));
      console.log('🎨 Image data available:', !!result.image_base64 || !!result.image);
      
      // Return the result as-is since the API should provide the expected format
      // Focus on image_base64 field for display
      return result;
    } catch (error) {
      console.error('Kolam knowledge API request failed:', error);
      throw error;
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