# 🎌 Anime Search App

A modern, feature-rich anime search application built with React, TypeScript, Redux Toolkit, and Tailwind CSS. Features a stunning sliding image gallery homepage and comprehensive anime search functionality with detailed information.

![React](https://img.shields.io/badge/React-18.2.0-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.0-blue) ![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.0.1-purple)

## 🌟 Live Demo

**[View Live Demo →](https://your-app-name.vercel.app)**

## ✨ Features

### Core Features
- 🏠 **Stunning Homepage** - Auto-sliding gallery showcasing top anime with smooth transitions
- 🔍 **Instant Search** - Real-time anime search with 500ms debouncing
- 📄 **Server-Side Pagination** - Efficient browsing through large result sets
- 🎯 **Detailed View** - Comprehensive anime information including ratings, genres, synopsis, and trailers
- 📱 **Responsive Design** - Seamless experience across desktop, tablet, and mobile devices
- 🔄 **Redux State Management** - Centralized state management for predictable data flow
- 🎨 **Modern UI** - Beautiful gradient themes with glassmorphism effects
- ⚡ **TypeScript** - Full type safety throughout the application

### Bonus Features Implemented
- ✅ **Auto-Sliding Gallery** - Homepage with automatic image transitions every 5 seconds
- ✅ **Manual Navigation** - Left/right arrows and dot indicators for gallery control
- ✅ **Loading Skeletons** - Smooth skeleton screens for better perceived performance
- ✅ **Error Handling** - Comprehensive error handling with retry functionality and rate limit protection
- ✅ **Empty States** - Helpful messages when no results are found
- ✅ **Request Cancellation** - Automatic cancellation of in-flight requests when new searches are initiated
- ✅ **Top Anime Display** - Shows top-rated anime when no search query is entered
- ✅ **Rich Detail Pages** - Includes trailers, studios, producers, themes, and comprehensive statistics
- ✅ **Clear Search** - Easy reset button to clear search and return to top anime
- ✅ **Rate Limiting Protection** - Built-in protection against API rate limits (1-second delays)
- ✅ **Smooth Animations** - Framer Motion animations for delightful user experience
- ✅ **Custom Scrollbar** - Themed scrollbar matching the app's design
- ✅ **Glassmorphism UI** - Modern frosted glass effects throughout the interface
- ✅ **Full-Screen Images** - Gallery images cover entire viewport for immersive experience

## 🛠️ Tech Stack

- **React 18** - Latest React with hooks
- **TypeScript** - Type-safe development
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Axios** - HTTP client with request cancellation
- **Vite** - Fast build tool and dev server
- **React Icons** - Icon library

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm (comes with Node.js)

## 🚀 Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/Waliyu23/anime-search-app.git
cd anime-search-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

The app will be available at `http://localhost:4000`

## 📦 Build for Production
```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

## 🎮 Usage

### Homepage
- **Auto-Sliding Gallery** - View top anime images that automatically transition every 5 seconds
- **Manual Navigation** - Use left/right arrow buttons or dot indicators to navigate
- **Search Button** - Click the prominent "Search Anime" button to start exploring

### Search Page
1. **Browse Top Anime** - By default, displays the top-rated anime
2. **Search** - Type in the search bar to find specific anime titles
3. **View Details** - Click on any anime card to see comprehensive information
4. **Paginate** - Use pagination controls to browse through results
5. **Clear Search** - Click the X button to reset and view top anime again

### Detail Page
- View comprehensive anime information
- Watch trailers (if available)
- See ratings, genres, themes, studios, and more
- Navigate back to search or home

## 📁 Project Structure
```
anime-search-app/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── AnimeCard.tsx
│   │   ├── AnimeGrid.tsx
│   │   ├── SearchBar.tsx
│   │   ├── Pagination.tsx
│   │   ├── LoadingSkeleton.tsx
│   │   └── ErrorMessage.tsx
│   ├── pages/              # Page components
│   │   ├── HomePage.tsx    # Landing page with gallery
│   │   ├── SearchPage.tsx
│   │   └── DetailPage.tsx
│   ├── store/              # Redux store and slices
│   │   ├── index.ts
│   │   ├── animeSlice.ts
│   │   └── hooks.ts
│   ├── services/           # API service layer
│   │   └── jikanApi.ts
│   ├── types/              # TypeScript type definitions
│   │   └── anime.types.ts
│   ├── hooks/              # Custom React hooks
│   │   └── useDebounce.ts
│   ├── utils/              # Utility functions
│   │   └── constants.ts
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
├── PROMPTS.md             # AI prompts documentation
└── README.md
```

## 🎨 Design Features

### Homepage
- **Full-Screen Gallery** - Immersive anime image slideshow
- **Smooth Crossfade** - Seamless transitions between images
- **Interactive Controls** - Arrow navigation and dot indicators
- **Prominent CTA** - Eye-catching search button with gradient and animations

### Search & Browse
- **Clean Interface** - Modern card-based layout
- **Hover Effects** - Cards lift and scale on interaction
- **Loading States** - Skeleton loaders during data fetch
- **Error Handling** - User-friendly error messages with retry options

### Detail View
- **Comprehensive Info** - All anime details in organized sections
- **Visual Hierarchy** - Clear typography and spacing
- **Embedded Trailers** - Watch trailers directly on the page
- **Stats Display** - Score, rank, popularity, and more

## 🎨 Color Scheme

The app uses a modern dark theme with purple and pink gradients:

- **Primary Purple**: `#a855f7` to `#9333ea`
- **Secondary Pink**: `#ec4899` to `#f472b6`
- **Dark Background**: `#020617` to `#1e1b4b`
- **Accent Blue**: `#3b82f6`

## 🔌 API

This app uses the [Jikan API](https://docs.api.jikan.moe/) - a free, unofficial MyAnimeList API.

**Rate Limits:**
- 3 requests per second
- 60 requests per minute

The app includes built-in rate limiting protection with a 1-second minimum delay between requests to prevent errors.

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [Vercel](https://vercel.com)
3. Import your repository
4. Vercel will auto-detect Vite and configure everything
5. Click Deploy

### Deploy to Netlify

1. Build the project: `npm run build`
2. Visit [Netlify](https://netlify.com)
3. Drag and drop the `dist` folder
4. Your site is live!

## 🤖 AI Usage

This project was built with assistance from AI tools (Claude by Anthropic). All prompts and AI interactions are documented in `PROMPTS.md` as requested by the project specifications.

## 📝 Scripts

- `npm run dev` - Start development server on port 4000
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🎯 Performance Optimizations

- **Debounced Search** - Reduces API calls (500ms delay)
- **Request Cancellation** - Cancels in-flight requests when new ones are made
- **Lazy Loading** - Images load on-demand
- **Optimized Re-renders** - Redux selectors prevent unnecessary renders
- **Rate Limiting Protection** - 1-second delays between API requests
- **Skeleton Loaders** - Improves perceived performance
- **Smooth Transitions** - Framer Motion for 60fps animations

## 🐛 Known Issues & Solutions

**Rate Limiting Error:**
If you see "You are being rate-limited", wait a few seconds before making another search. The app includes automatic 1-second delays between requests to prevent this.

**Slow Initial Load:**
The Jikan API can be slow at times. The app includes loading skeletons to improve perceived performance.

**Gallery Images Not Loading:**
If gallery images fail to load on the homepage, the app will show a loading spinner. This is typically due to API rate limits - refresh the page after a moment.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Albiruni (Waliyu23)**
- GitHub: [@Waliyu23](https://github.com/Waliyu23)
- Project Link: [https://github.com/Waliyu23/anime-search-app](https://github.com/Waliyu23/anime-search-app)

## 🙏 Acknowledgments

- [Jikan API](https://jikan.moe/) for providing the anime data
- [MyAnimeList](https://myanimelist.net/) for the original data source
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [Framer Motion](https://www.framer.com/motion/) for animations
- [React Icons](https://react-icons.github.io/react-icons/) for the icon library

## 📸 Screenshots

### Homepage - Sliding Gallery
Beautiful auto-sliding gallery featuring top anime images

### Search Page
![Search Page](./screenshots/search.png)

### Search Results
Browse through thousands of anime with pagination

### Detail Page
![Detail Page](./screenshots/detail.png)

Comprehensive anime information with trailers and statistics

---

**Built with ❤️ using React, TypeScript, Redux Toolkit & Tailwind CSS**

---

**Note:** This project was created as part of a React coding assessment and demonstrates proficiency in React 18, TypeScript, Redux Toolkit, Tailwind CSS, and modern web development practices.