# Lucso

A cross-platform beauty app to discover, rate and find your favorite makeup products — built with Expo + React Native.

## Features

- **Home** — Browse brands and products with category filters and star ratings
- **Feed** — Social posts with likes and comments (requires login)
- **Map** — Interactive map of beauty stores in Porto with directions
- **Profile** — Favorites list and mock authentication

## Tech Stack

- [Expo](https://expo.dev) + React Native (SDK 55)
- [expo-router](https://expo.github.io/router) for file-based routing
- TypeScript
- [NativeWind v4](https://www.nativewind.dev) (Tailwind CSS for React Native)
- [Zustand](https://zustand-demo.pmnd.rs) for state management
- [Leaflet](https://leafletjs.com) for web maps / `react-native-maps` for mobile
- Google Fonts: Playfair Display + Poppins

## Getting Started

```bash
npm install
npx expo start
```

- Press `w` to open in browser
- Scan QR code with Expo Go for mobile

## Deploy

The web version is deployed via [Vercel](https://vercel.com). The `vercel.json` handles the build automatically.

```bash
npx expo export --platform web
```

Output goes to `dist/`.

## Project Structure

```
app/              # Screens (expo-router)
  (tabs)/         # Home, Feed, Map, Profile
  product/[id]    # Product detail
  brand/[id]      # Brand detail
  auth/           # Login & Register
components/       # UI and feature components
constants/        # Colors, Fonts
data/             # Mock data (products, brands, stores, posts)
store/            # Zustand stores (auth, favorites, feed)
types/            # TypeScript interfaces
```
