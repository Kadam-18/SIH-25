# Quick Fixes Implementation Guide

This guide helps you implement the most critical fixes quickly.

## 🔴 Priority 1: Security Fixes (Do First!)

### Fix 1: Remove Firebase Keys from Repository

1. **Add to .gitignore:**
```bash
# Create/update .gitignore in backend/backend01/
echo "*.json" >> backend/backend01/.gitignore
echo "firebase_key.json" >> backend/backend01/.gitignore
echo "ayushcare-*-firebase-adminsdk-*.json" >> backend/backend01/.gitignore
```

2. **Remove from Git history:**
```bash
git rm --cached backend/backend01/ayushcare-8ff01-firebase-adminsdk-fbsvc-509417f477.json
git rm --cached backend/backend01/firebase_key.json
git commit -m "Remove Firebase credentials from repository"
```

3. **Regenerate Firebase keys** and store only in environment variables

### Fix 2: Hardcoded Email

**File:** `backend/backend01/accounts/views.py`

**Change line 42:**
```python
# OLD:
from_email="yourgmail@gmail.com",  # change to your real Gmail

# NEW:
from_email=os.getenv("EMAIL_HOST_USER", "noreply@ayushcare.com"),
```

**Add import at top:**
```python
import os
```

### Fix 3: Secret Key Validation

**File:** `backend/backend01/backend/settings.py`

**Change lines 16-19:**
```python
# OLD:
SECRET_KEY = os.getenv("DJANGO_SECRET_KEY", "dev-secret")
DEBUG = os.getenv("DEBUG", "True") == "True"

# NEW:
SECRET_KEY = os.getenv("DJANGO_SECRET_KEY")
if not SECRET_KEY:
    if DEBUG:
        SECRET_KEY = "dev-secret-key-only-for-development"
    else:
        raise ValueError("DJANGO_SECRET_KEY environment variable is required in production")

DEBUG = os.getenv("DEBUG", "False") == "True"
```

### Fix 4: OTP Expiration

**File:** `backend/backend01/accounts/models.py`

**Add to EmailOTP model:**
```python
from django.utils import timezone
from datetime import timedelta

class EmailOTP(models.Model):
    # ... existing fields ...
    created_at = models.DateTimeField(auto_now_add=True)
    OTP_EXPIRY_MINUTES = 10
    
    def is_expired(self):
        return timezone.now() > self.created_at + timedelta(minutes=self.OTP_EXPIRY_MINUTES)
    
    def is_valid(self, otp):
        if self.is_expired():
            return False
        return self.otp == otp
```

**Update VerifyOTPView in views.py:**
```python
# In VerifyOTPView.post method, replace OTP check:
if otp_entry.is_expired():
    otp_entry.delete()
    return Response(
        {"success": False, "message": "OTP has expired. Please request a new one."},
        status=400
    )

if not otp_entry.is_valid(otp):
    return Response(
        {"success": False, "message": "Invalid OTP"},
        status=400
    )
```

### Fix 5: Add Rate Limiting

1. **Install package:**
```bash
pip install django-ratelimit
```

2. **Update settings.py:**
```python
# Add to INSTALLED_APPS (if using middleware approach)
# Or use DRF throttling:

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_THROTTLE_CLASSES": [
        "rest_framework.throttling.AnonRateThrottle",
        "rest_framework.throttling.UserRateThrottle",
    ],
    "DEFAULT_THROTTLE_RATES": {
        "anon": "5/minute",
        "user": "100/minute",
    }
}
```

3. **Apply to views:**
```python
from rest_framework.decorators import throttle_classes
from rest_framework.throttling import AnonRateThrottle

class SignupView(APIView):
    throttle_classes = [AnonRateThrottle]
    # ... rest of code
```

---

## 🟡 Priority 2: Error Handling

### Fix 6: Standardize API Responses

**Create:** `backend/backend01/backend/utils.py`
```python
from rest_framework.response import Response

def success_response(data=None, message="Success", status_code=200):
    """Standard success response"""
    response = {
        "success": True,
        "message": message
    }
    if data is not None:
        response["data"] = data
    return Response(response, status=status_code)

def error_response(message="Error", errors=None, status_code=400):
    """Standard error response"""
    response = {
        "success": False,
        "message": message
    }
    if errors:
        response["errors"] = errors
    return Response(response, status=status_code)
```

**Update views to use:**
```python
from backend.utils import success_response, error_response

# Example in SignupView:
return success_response(
    message="OTP sent to your email",
    status_code=200
)

# Example error:
return error_response(
    message="Invalid credentials",
    status_code=400
)
```

### Fix 7: Frontend Error Handling

**File:** `frontend/src/pages/Login.jsx`

**Replace alert with toast:**
```javascript
import { toast } from 'react-toastify';

// Replace:
// alert("Invalid Login Details");

// With:
toast.error(res.message || "Invalid Login Details");
```

**Add loading state:**
```javascript
const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  
  try {
    const res = await apiPost("/api/auth/login/", { email, password });
    if (!res || !res.access) {
      toast.error(res.message || "Invalid Login Details");
      return;
    }
    // ... rest of code
  } catch (error) {
    toast.error("An error occurred. Please try again.");
  } finally {
    setLoading(false);
  }
};

// In button:
<button type="submit" disabled={loading}>
  {loading ? "Logging in..." : "Login"}
</button>
```

---

## 🟢 Priority 3: Configuration

### Fix 8: Environment Variables

**Create:** `frontend/.env`
```
VITE_API_URL=http://localhost:8000
```

**Update:** `frontend/src/api.js`
```javascript
export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
```

**Create:** `backend/backend01/.env.example`
```
DJANGO_SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
MYSQL_DATABASE=ayushcare
MYSQL_USER=root
MYSQL_PASSWORD=your-password
MYSQL_HOST=localhost
MYSQL_PORT=3306
REDIS_URL=redis://127.0.0.1:6379/0
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
GOOGLE_MAPS_API_KEY=your-google-maps-key
FIREBASE_KEY_B64=your-base64-encoded-firebase-key
```

---

## 📝 Priority 4: Documentation

### Fix 9: Create README

**Create:** `README.md` (root level)

See the comprehensive README template in PROJECT_REVIEW_AND_SUGGESTIONS.md

### Fix 10: Add API Documentation

1. **Install:**
```bash
pip install drf-spectacular
```

2. **Update settings.py:**
```python
INSTALLED_APPS += ['drf_spectacular']

REST_FRAMEWORK = {
    # ... existing config ...
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}

SPECTACULAR_SETTINGS = {
    'TITLE': 'AyushCare API',
    'DESCRIPTION': 'API documentation for AyushCare healthcare management system',
    'VERSION': '1.0.0',
}
```

3. **Update urls.py:**
```python
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    # ... existing patterns ...
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
]
```

4. **Access at:** `http://localhost:8000/api/docs/`

---

## ✅ Testing Quick Start

### Fix 11: Write Basic Tests

**File:** `backend/backend01/accounts/tests.py`

```python
from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from .models import EmailOTP

class AuthenticationTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
    
    def test_signup_creates_otp(self):
        """Test that signup creates an OTP entry"""
        response = self.client.post('/api/auth/signup/', {
            'email': 'test@example.com',
            'username': 'testuser',
            'password': 'testpass123',
            'role': 'patient'
        })
        self.assertEqual(response.status_code, 200)
        self.assertTrue(EmailOTP.objects.filter(email='test@example.com').exists())
    
    def test_login_with_valid_credentials(self):
        """Test login with valid credentials"""
        User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )
        response = self.client.post('/api/auth/login/', {
            'email': 'test@example.com',
            'password': 'testpass123'
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn('access', response.data)
        self.assertTrue(response.data['success'])
    
    def test_login_with_invalid_credentials(self):
        """Test login with invalid credentials"""
        response = self.client.post('/api/auth/login/', {
            'email': 'wrong@example.com',
            'password': 'wrongpass'
        })
        self.assertNotEqual(response.status_code, 200)
```

**Run tests:**
```bash
python manage.py test accounts
```

---

## 🚀 Deployment Checklist

### Before Deploying:

- [ ] All security fixes applied
- [ ] Environment variables set
- [ ] DEBUG = False in production
- [ ] ALLOWED_HOSTS configured
- [ ] Database migrations run
- [ ] Static files collected
- [ ] CORS configured for production domain
- [ ] SSL/HTTPS enabled
- [ ] Backup strategy in place

---

## 📞 Need Help?

If you need help implementing any of these fixes, refer to:
1. Django Documentation: https://docs.djangoproject.com/
2. DRF Documentation: https://www.django-rest-framework.org/
3. React Documentation: https://react.dev/

---

**Estimated Time:**
- Priority 1 (Security): 2-3 hours
- Priority 2 (Error Handling): 2-3 hours
- Priority 3 (Configuration): 1 hour
- Priority 4 (Documentation): 3-4 hours
- Priority 5 (Testing): 4-5 hours

**Total: ~12-16 hours of focused work**

Good luck! 🎉

