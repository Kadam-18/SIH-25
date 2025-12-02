# Complete Deployment Guide: React (Vercel) + Django (Railway) + MySQL (Railway)

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Frontend Deployment (React → Vercel)](#frontend-deployment)
3. [Backend Deployment (Django → Railway)](#backend-deployment)
4. [MySQL Database Setup (Railway)](#mysql-database-setup)
5. [Connecting Everything](#connecting-everything)
6. [Environment Variables](#environment-variables)
7. [Testing After Deployment](#testing-after-deployment)

---

## Prerequisites

- GitHub account
- Vercel account (free tier available)
- Railway account (free tier available)
- Razorpay account (for payments) - [Sign up here](https://razorpay.com)
- Git installed locally

---

## 1. Frontend Deployment (React → Vercel)

### Step 1: Prepare Frontend for Production

#### 1.1 Create `.env.production` file in `frontend/` directory:

```env
VITE_API_URL=https://your-railway-backend-url.railway.app
```

**Note:** Replace `your-railway-backend-url` with your actual Railway backend URL (you'll get this after deploying backend).

#### 1.2 Update `frontend/src/api.js` to use environment variable:

The file should already have:
```javascript
export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
```

#### 1.3 Create `vercel.json` in `frontend/` directory:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

#### 1.4 Update `package.json` build script (if needed):

```json
{
  "scripts": {
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### Step 2: Push to GitHub

```bash
cd frontend
git init  # if not already initialized
git add .
git commit -m "Prepare for deployment"
git remote add origin https://github.com/yourusername/ayushcare-frontend.git
git push -u origin main
```

### Step 3: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend` (if repo contains both frontend and backend)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

5. **Environment Variables:**
   - Click **"Environment Variables"**
   - Add: `VITE_API_URL` = `https://your-railway-backend-url.railway.app`
   - Click **"Save"**

6. Click **"Deploy"**

7. **After deployment:**
   - Copy your Vercel URL (e.g., `https://ayushcare.vercel.app`)
   - You'll need this for backend CORS configuration

---

## 2. Backend Deployment (Django → Railway)

### Step 2.1: Prepare Django for Production

#### Create `Procfile` in `backend/backend01/` (if not exists):

```
web: gunicorn backend.wsgi:application --bind 0.0.0.0:$PORT
```

#### Update `backend/backend01/requirements.txt`:

Make sure these are included:
```
Django==5.2.8
djangorestframework==3.16.1
djangorestframework-simplejwt==5.5.1
django-cors-headers==4.9.0
gunicorn==21.2.0
whitenoise==6.6.0
mysqlclient==2.2.7
razorpay==1.4.2
python-dotenv==1.2.1
```

#### Update `backend/backend01/backend/settings.py`:

Add these production settings:

```python
import os
from pathlib import Path

# Build paths inside the project
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('SECRET_KEY', 'your-secret-key-here')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.environ.get('DEBUG', 'False') == 'True'

ALLOWED_HOSTS = [
    'localhost',
    '127.0.0.1',
    '.railway.app',  # Railway domain
    os.environ.get('ALLOWED_HOST', ''),
]

# CORS Configuration
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:3000",
    os.environ.get('FRONTEND_URL', 'https://your-vercel-app.vercel.app'),
]

CORS_ALLOW_CREDENTIALS = True

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': os.environ.get('MYSQLDATABASE', 'ayushcare'),
        'USER': os.environ.get('MYSQLUSER', 'root'),
        'PASSWORD': os.environ.get('MYSQLPASSWORD', ''),
        'HOST': os.environ.get('MYSQLHOST', 'localhost'),
        'PORT': os.environ.get('MYSQLPORT', '3306'),
        'OPTIONS': {
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",
            'charset': 'utf8mb4',
        },
    }
}

# Static files (WhiteNoise)
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Media files
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# Razorpay Configuration
RAZORPAY_KEY_ID = os.environ.get('RAZORPAY_KEY_ID', '')
RAZORPAY_KEY_SECRET = os.environ.get('RAZORPAY_KEY_SECRET', '')

# Add WhiteNoise middleware (should be near top of MIDDLEWARE)
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # Add this
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',  # CORS middleware
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
```

#### Create `runtime.txt` in `backend/backend01/`:

```
python-3.12.0
```

### Step 2.2: Push Backend to GitHub

```bash
cd backend/backend01
git init  # if not already initialized
git add .
git commit -m "Prepare backend for deployment"
git remote add origin https://github.com/yourusername/ayushcare-backend.git
git push -u origin main
```

### Step 2.3: Deploy to Railway

1. Go to [railway.app](https://railway.app) and sign in
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your backend repository
5. Railway will auto-detect Django

#### Configure Environment Variables:

Click on your project → **"Variables"** tab → Add these:

```
SECRET_KEY=your-super-secret-key-here-generate-random-string
DEBUG=False
ALLOWED_HOST=your-app-name.railway.app
FRONTEND_URL=https://your-vercel-app.vercel.app
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

**Note:** Database variables will be added automatically when you connect MySQL.

#### Configure Build Settings:

1. Click **"Settings"** → **"Build Command"**
2. Set: `pip install -r requirements.txt && python manage.py collectstatic --noinput`
3. Set **"Start Command"**: `gunicorn backend.wsgi:application --bind 0.0.0.0:$PORT`

#### Run Migrations:

1. Click **"Deployments"** tab
2. Click on latest deployment
3. Click **"View Logs"**
4. Open **"Railway CLI"** or use **"Deploy Logs"** terminal
5. Run:
```bash
python manage.py migrate
python manage.py createsuperuser  # Create admin user
```

---

## 3. MySQL Database Setup (Railway)

### Step 3.1: Create MySQL Service

1. In Railway project, click **"+ New"**
2. Select **"Database"** → **"Add MySQL"**
3. Railway will create MySQL instance automatically

### Step 3.2: Connect Database to Django

1. Railway automatically adds these environment variables:
   - `MYSQLHOST`
   - `MYSQLPORT`
   - `MYSQLDATABASE`
   - `MYSQLUSER`
   - `MYSQLPASSWORD`

2. These are automatically used by Django (configured in settings.py)

### Step 3.3: Test Database Connection

In Railway terminal:
```bash
python manage.py dbshell
# Should connect successfully
```

### Step 3.4: Run Migrations

```bash
python manage.py migrate
python manage.py createsuperuser
```

---

## 4. Connecting Everything

### Step 4.1: Update Frontend Environment Variable

1. Go to Vercel dashboard
2. Your project → **Settings** → **Environment Variables**
3. Update `VITE_API_URL` with your Railway backend URL:
   ```
   VITE_API_URL=https://your-backend.railway.app
   ```
4. **Redeploy** the frontend

### Step 4.2: Update Backend CORS

1. Go to Railway dashboard
2. Your Django project → **Variables**
3. Update `FRONTEND_URL`:
   ```
   FRONTEND_URL=https://your-frontend.vercel.app
   ```
4. Railway will auto-redeploy

### Step 4.3: Verify Connections

1. **Frontend → Backend:**
   - Open browser console on Vercel site
   - Check network requests to Railway URL

2. **Backend → Database:**
   - Check Railway logs for database connection errors

---

## 5. Environment Variables Summary

### Frontend (Vercel):
```
VITE_API_URL=https://your-backend.railway.app
```

### Backend (Railway):
```
SECRET_KEY=your-secret-key
DEBUG=False
ALLOWED_HOST=your-app.railway.app
FRONTEND_URL=https://your-frontend.vercel.app
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=your_secret_key
MYSQLHOST=containers-us-west-xxx.railway.app
MYSQLPORT=3306
MYSQLDATABASE=railway
MYSQLUSER=root
MYSQLPASSWORD=your_password
```

---

## 6. Testing After Deployment

### Test Frontend:
1. Visit your Vercel URL
2. Try logging in
3. Check browser console for API calls

### Test Backend:
1. Visit: `https://your-backend.railway.app/api/`
2. Should see: `{"message": "Backend working successfully!"}`

### Test Database:
```bash
# In Railway terminal
python manage.py shell
>>> from django.contrib.auth.models import User
>>> User.objects.count()
# Should return number of users
```

---

## 7. Getting Razorpay Keys

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Sign up/Login
3. Go to **Settings** → **API Keys**
4. Generate **Test Keys** (for development)
5. Copy:
   - **Key ID** → `RAZORPAY_KEY_ID`
   - **Key Secret** → `RAZORPAY_KEY_SECRET`
6. Add to Railway environment variables

**For Production:**
- Switch to **Live Mode** in Razorpay dashboard
- Generate **Live Keys**
- Update Railway variables

---

## 8. Common Issues & Solutions

### Issue: CORS Error
**Solution:** 
- Check `FRONTEND_URL` in Railway matches your Vercel URL exactly
- Ensure `CORS_ALLOWED_ORIGINS` includes your Vercel URL

### Issue: Database Connection Failed
**Solution:**
- Verify MySQL service is running in Railway
- Check `MYSQLHOST`, `MYSQLPORT` variables
- Ensure database credentials are correct

### Issue: Static Files Not Loading
**Solution:**
- Run `python manage.py collectstatic` in Railway
- Check `STATIC_ROOT` path in settings.py
- Verify WhiteNoise is in MIDDLEWARE

### Issue: 500 Internal Server Error
**Solution:**
- Check Railway logs
- Verify all environment variables are set
- Check `DEBUG=False` in production

---

## 9. Final Checklist

- [ ] Frontend deployed on Vercel
- [ ] Backend deployed on Railway
- [ ] MySQL database connected
- [ ] Environment variables configured
- [ ] CORS configured correctly
- [ ] Migrations run
- [ ] Admin user created
- [ ] Razorpay keys added
- [ ] Frontend can communicate with backend
- [ ] Database queries working
- [ ] Static files loading
- [ ] Authentication working

---

## 10. URLs to Save

After deployment, save these URLs:

- **Frontend:** `https://your-app.vercel.app`
- **Backend API:** `https://your-backend.railway.app`
- **Admin Panel:** `https://your-backend.railway.app/admin/`
- **Razorpay Dashboard:** `https://dashboard.razorpay.com`

---

## Support

If you encounter issues:
1. Check Railway logs
2. Check Vercel deployment logs
3. Check browser console for errors
4. Verify all environment variables are set correctly

Good luck with your deployment! 🚀

