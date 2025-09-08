# BrandSafe API Examples

## Getting Started

1. Start the Django server:
```bash
cd backend
python manage.py runserver 8000
```

2. Visit API documentation:
- Swagger UI: http://localhost:8000/swagger/
- ReDoc: http://localhost:8000/redoc/
- Admin Panel: http://localhost:8000/admin/ (admin/admin)

## API Endpoints

### 1. Health Check
```bash
curl http://localhost:8000/api/health/
```

Response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00Z",
  "version": "1.0.0"
}
```

### 2. User Registration
```bash
curl -X POST http://localhost:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "securepass123!",
    "password_confirm": "securepass123!",
    "email": "user@brandsafe.com",
    "first_name": "John",
    "last_name": "Doe",
    "role": "influencer",
    "organization": "My Brand"
  }'
```

Response:
```json
{
  "user": {
    "id": 1,
    "username": "testuser",
    "email": "user@brandsafe.com",
    "full_name": "John Doe",
    "role": "influencer",
    "organization": "My Brand"
  },
  "tokens": {
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
  },
  "message": "User registered successfully"
}
```

### 3. User Login
```bash
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "securepass123!"
  }'
```

Response:
```json
{
  "user": {
    "id": 1,
    "username": "testuser",
    "email": "user@brandsafe.com",
    "role": "influencer"
  },
  "tokens": {
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
  },
  "message": "Login successful"
}
```

### 4. Content Moderation
```bash
# Text moderation
curl -X POST http://localhost:8000/api/moderate/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "input_type": "text",
    "input_value": "This is my brand content to check for safety."
  }'
```

```bash
# URL moderation
curl -X POST http://localhost:8000/api/moderate/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "input_type": "url",
    "input_value": "https://example.com/suspicious-content"
  }'
```

Response:
```json
{
  "id": 1,
  "user": {
    "id": 1,
    "username": "testuser"
  },
  "input_type": "text",
  "input_type_display": "Text Content",
  "input_value": "This is my brand content to check for safety.",
  "result": "safe",
  "result_display": "Safe Content",
  "risk_level": "low",
  "risk_level_display": "Low Risk",
  "confidence_score": 0.95,
  "flags_detected": [],
  "processing_time_ms": 245,
  "created_at": "2024-01-15T10:30:00Z"
}
```

### 5. Dashboard Analytics
```bash
curl http://localhost:8000/api/dashboard/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

Response:
```json
{
  "total_checks": 25,
  "safe_count": 22,
  "unsafe_count": 3,
  "pending_count": 0,
  "safety_rate": 88.0,
  "checks_today": 5,
  "checks_this_week": 15,
  "checks_this_month": 25,
  "recent_logs": [
    {
      "id": 1,
      "input_type": "text",
      "result": "safe",
      "risk_level": "low",
      "confidence_score": 0.95,
      "created_at": "2024-01-15T10:30:00Z"
    }
  ],
  "risk_breakdown": {
    "low": 20,
    "medium": 3,
    "high": 2
  },
  "type_breakdown": {
    "text": 18,
    "url": 5,
    "image": 2
  }
}
```

### 6. User Profile
```bash
# Get profile
curl http://localhost:8000/api/profile/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

# Update profile
curl -X PATCH http://localhost:8000/api/profile/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "bio": "Brand protection specialist",
    "website": "https://mybrand.com"
  }'
```

### 7. Moderation History
```bash
curl http://localhost:8000/api/history/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### 8. Token Refresh
```bash
curl -X POST http://localhost:8000/api/auth/refresh/ \
  -H "Content-Type: application/json" \
  -d '{
    "refresh": "YOUR_REFRESH_TOKEN"
  }'
```

## Frontend Integration (React/Axios)

```javascript
// Set up axios with base URL and interceptors
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Example usage
const registerUser = async (userData) => {
  const response = await api.post('/auth/register/', userData);
  localStorage.setItem('access_token', response.data.tokens.access);
  localStorage.setItem('refresh_token', response.data.tokens.refresh);
  return response.data;
};

const moderateContent = async (contentData) => {
  const response = await api.post('/moderate/', contentData);
  return response.data;
};

const getDashboard = async () => {
  const response = await api.get('/dashboard/');
  return response.data;
};
```

## Testing the API

Run the test script:
```bash
cd backend
python test_api.py
```

## Features Implemented

✅ JWT Authentication (Registration, Login, Token Refresh)
✅ User Profile Management (Two roles: Influencer/Admin)
✅ Content Moderation API (Text, URL, Image support)
✅ Dashboard Analytics (User stats + Admin aggregation)
✅ CORS Configuration for Frontend Integration
✅ Swagger/OpenAPI Documentation
✅ Database Models with Proper Relationships
✅ Admin Interface for Content Management
✅ API Usage Logging and Analytics

## Production Considerations

1. **Environment Variables**: Use python-decouple for sensitive settings
2. **Database**: Switch to PostgreSQL for production
3. **Security**: Add rate limiting, input validation, and HTTPS
4. **Monitoring**: Integrate with logging and monitoring services
5. **Caching**: Add Redis for session and data caching
6. **File Storage**: Use cloud storage for uploaded files