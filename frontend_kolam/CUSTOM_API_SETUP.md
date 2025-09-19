# 🔧 Custom API Setup for AI Recognition & Pattern Creation

## Quick Setup

### 1. AI Recognition (Analyze Button)
To use your own API endpoint for the **Analyze** functionality:

Edit `src/pages/AIRecognition.jsx` and update line 17:
```javascript
// Change from:
const CUSTOM_ANALYZE_API = null;

// To your API:
const CUSTOM_ANALYZE_API = 'https://your-api-domain.com/analyze';
```

### 2. Pattern Creation (Create Button)
To use your own API endpoint for the **Create** functionality:

Edit `src/pages/RecreatePatterns.jsx` and update line 17:
```javascript
// Change from:
const CUSTOM_CREATE_API = null;

// To your API:
const CUSTOM_CREATE_API = 'https://your-api-domain.com/generate';
```

## API Requirements

### 🔍 Analyze API (Image → Pattern Recognition)

**Option 1: FormData (Current Default)**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: FormData with `file` field containing the image

**Option 2: Base64 JSON (Alternative)**
- Method: `POST`
- Content-Type: `application/json`
- Body: 
```json
{
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...",
  "filename": "kolam-image.jpg"
}
```

**Return JSON response:**
```json
{
  "label": "Pattern Name",
  "confidence": 85.5,
  "design_principle": "Description of the pattern and its cultural significance..."
}
```

**Note:** The frontend automatically converts uploaded images to base64 format and logs the conversion details in the console. You can use either FormData or base64 depending on your API preference.

### 🎨 Create API (Text → Pattern Generation)
**Accept:**
- Method: `POST`
- Content-Type: `application/json`
- Body: 
```json
{
  "query": "Create a traditional lotus kolam with geometric patterns",
  "generate_image": true
}
```

**Return JSON response:**
```json
{
  "explanation": "Based on your description, I've created a beautiful lotus-inspired kolam...",
  "image_base64": "iVBORw0KGgoAAAANSUhEUgAA..." // Base64 encoded image or null
}
```

### 3. Example API Endpoints

```javascript
// AI Recognition (Analyze)
const CUSTOM_ANALYZE_API = 'http://localhost:3001/api/analyze';
const CUSTOM_ANALYZE_API = 'https://api.yoursite.com/kolam/analyze';
const CUSTOM_ANALYZE_API = 'https://ml-service.herokuapp.com/predict';

// Pattern Creation (Create) 
const CUSTOM_CREATE_API = 'http://localhost:3001/api/generate';
const CUSTOM_CREATE_API = 'https://api.yoursite.com/kolam/generate';
const CUSTOM_CREATE_API = 'https://ai-service.herokuapp.com/create';
```

### 4. Testing

#### AI Recognition Testing:
1. Set your custom endpoint in `AIRecognition.jsx`
2. Upload an image on the AI Recognition page
3. Click the "Analyze" button
4. Check browser console for logs:
   - `🔍 Starting image analysis...` - Request details
   - `✅ Analysis result:` - Successful response
   - `❌ Analysis failed:` - Error details

#### Pattern Creation Testing:
1. Set your custom endpoint in `RecreatePatterns.jsx`
2. Enter a description on the Recreate Patterns page
3. Click the "Create" button
4. Check browser console for logs:
   - `🎨 Starting pattern generation...` - Request details
   - `✅ Generation result:` - Successful response
   - `❌ Error generating design:` - Error details

### 5. Fallback to Default

Set both endpoints to `null` to use the default backend:
- Analyze: `/api/v1/kolam/predict`
- Create: `/api/v1/kolam/knowledge`

---

**Note:** The frontend will automatically handle both external URLs (starting with `http`) and relative endpoints.