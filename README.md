Simple cross-platform Notes App

## Auth

- Google OAuth login is required before opening notes screens.
- Client ID is loaded from `.env.local` using `EXPO_PUBLIC_GOOGLE_CLIENT_ID`.
- Do not store Google `client_secret` in the mobile app. Keep it on a backend only.
