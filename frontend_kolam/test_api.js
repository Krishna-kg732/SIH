// Quick test script to check the API response format
async function testKolamAPI() {
  try {
    console.log('Testing Kolam Prediction API...');
    console.log('API Endpoint: https://kartikeya.me/api/v1/kolam/predict');
    
    console.log('Expected Request Format:');
    console.log('- Method: POST');
    console.log('- Content-Type: application/json');
    console.log('- Body: JSON with "base_64" field (base64 string)');
    
    console.log('\nTesting with a sample base64 request...');
    
    // Test with the correct field name: base_64
    const testPayload = {
      base_64: "test_base64_string_here"
    };
    
    const response = await fetch('https://kartikeya.me/api/v1/kolam/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testPayload)
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    if (response.ok) {
      const result = await response.json();
      console.log('Response body:', result);
    } else {
      const errorText = await response.text();
      console.log('Error response:', errorText);
    }
    
  } catch (error) {
    console.error('Network error:', error.message);
  }
}

// Run the test
testKolamAPI();