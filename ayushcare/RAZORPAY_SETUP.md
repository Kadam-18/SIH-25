# How to Get Razorpay Keys

## Step-by-Step Guide

### 1. Create Razorpay Account

1. Go to [https://razorpay.com](https://razorpay.com)
2. Click **"Sign Up"** or **"Login"**
3. Complete the registration process

### 2. Access Dashboard

1. After login, you'll be redirected to the **Dashboard**
2. If not, click on **"Dashboard"** in the top menu

### 3. Get API Keys

#### For Testing (Development):

1. In the Dashboard, look for **"Settings"** in the left sidebar
2. Click on **"API Keys"**
3. You'll see two sections:
   - **Test Mode** (for development)
   - **Live Mode** (for production)

4. **For Development:**
   - Make sure you're in **"Test Mode"** (toggle at top)
   - Click **"Generate Key"** if you don't have keys yet
   - You'll see:
     - **Key ID**: `rzp_test_xxxxxxxxxxxxx`
     - **Key Secret**: `xxxxxxxxxxxxxxxxxxxxxxxxxxxx`

5. **Copy these keys:**
   - `RAZORPAY_KEY_ID` = Your Key ID
   - `RAZORPAY_KEY_SECRET` = Your Key Secret

#### For Production:

1. Switch to **"Live Mode"** (toggle at top)
2. Complete business verification (if required)
3. Generate Live Keys
4. Use Live Keys in production environment

### 4. Add Keys to Railway

1. Go to your Railway project
2. Click on **"Variables"** tab
3. Add these environment variables:

```
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_secret_key_here
```

4. Click **"Save"**
5. Railway will automatically redeploy

### 5. Test Payment

1. Use Razorpay's test cards:
   - **Card Number**: `4111 1111 1111 1111`
   - **CVV**: Any 3 digits
   - **Expiry**: Any future date
   - **Name**: Any name

2. Test successful payment flow
3. Check Railway logs for payment verification

## Important Notes

- **Never commit keys to GitHub**
- **Use Test Keys for development**
- **Switch to Live Keys only in production**
- **Keep keys secure and private**

## Where to Find Keys in Dashboard

```
Dashboard → Settings → API Keys → Test Mode / Live Mode
```

## Support

If you need help:
- Razorpay Documentation: [https://razorpay.com/docs](https://razorpay.com/docs)
- Razorpay Support: support@razorpay.com

