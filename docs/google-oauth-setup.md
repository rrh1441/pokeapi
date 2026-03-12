# Google OAuth Setup

## Prerequisites
- Any Google account (free @gmail.com works)
- No paid GCP or Google Workspace required

## Steps

### 1. Create GCP Project
1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Click project dropdown (top left) → **New Project**
3. Name it (e.g., "Pokemon Card API")
4. Click **Create**

### 2. Configure OAuth Consent Screen
1. Go to **APIs & Services** → **OAuth consent screen**
2. Select **External** → **Create**
3. Fill in:
   - App name: `Pokemon Card API`
   - User support email: your email
   - Developer contact: your email
4. Click **Save and Continue**
5. Scopes: just click **Save and Continue** (defaults are fine)
6. Test users: **Add Users** → add your email
7. Click **Save and Continue**

### 3. Create OAuth Credentials
1. Go to **APIs & Services** → **Credentials**
2. Click **+ Create Credentials** → **OAuth client ID**
3. Application type: **Web application**
4. Name: `Pokemon Card API Web`
5. Authorized redirect URIs:
   - Development: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://yourdomain.com/api/auth/callback/google`
6. Click **Create**
7. Copy **Client ID** and **Client Secret**

### 4. Add to .env
```env
GOOGLE_CLIENT_ID=your-client-id-here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret-here
```

### 5. Generate NextAuth Secret
```bash
openssl rand -base64 32
```
Add to `.env`:
```env
NEXTAUTH_SECRET=your-generated-secret
NEXTAUTH_URL=http://localhost:3000
```

## Production Checklist

When going live:

- [ ] Add production redirect URI in GCP Console
- [ ] Update `NEXTAUTH_URL` to production domain
- [ ] Update `NEXT_PUBLIC_APP_URL` to production domain
- [ ] (Optional) Submit for Google verification to remove "unverified app" warning

## Verification (Optional)

Only needed if you want to remove the "unverified app" warning for public users:

1. OAuth consent screen → **Publish App**
2. Fill verification form
3. May require privacy policy URL and domain verification
4. Takes 2-4 weeks for review

For personal use or small user base, verification isn't necessary.

## Troubleshooting

**"Access blocked: This app's request is invalid"**
- Check redirect URI matches exactly (including trailing slash)

**"Error 401: deleted_client"**
- Credentials were deleted, create new ones

**"This app isn't verified"**
- Normal for test mode, click "Advanced" → "Go to app (unsafe)"
- Or add user to test users list in OAuth consent screen
