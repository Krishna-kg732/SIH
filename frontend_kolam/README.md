# Kolam Vision - Landing Page

A minimal, aesthetic, mobile-first React + Vite landing page for Kolam Vision, featuring split-screen design with interactive elements and AI-powered Kolam pattern recognition.

## 🎨 Design Features

- **Split-screen layout**: Interactive video area (left) + content area (right)
- **Mobile-first responsive design** with TailwindCSS
- **Smooth animations** powered by Framer Motion
- **Custom design tokens** including traditional Kolam-inspired colors
- **Accessibility-focused** with keyboard navigation and screen reader support

## 🚀 Tech Stack

- **React 18** - UI Framework
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Google Fonts** - Inter (body) + Playfair Display (headings)

## 📁 Project Structure

```
frontend_kolam/
├── public/
│   ├── vite.svg              # TODO: Replace with custom favicon
│   └── index.html
├── src/
│   ├── assets/
│   │   ├── images/
│   │   │   ├── logo.svg                    # TODO: Replace with actual logo
│   │   │   └── hero-video-placeholder.svg  # TODO: Replace with video thumbnail
│   │   ├── polygons/
│   │   │   ├── polygon-1.svg              # Decorative Kolam shapes
│   │   │   ├── polygon-2.svg
│   │   │   └── polygon-3.svg
│   │   └── patterns/
│   │       └── dot-grid.svg               # Background pattern
│   ├── components/
│   │   ├── AnimatedPolygonGrid.jsx        # Scroll-animated decorative elements
│   │   ├── FeatureCard.jsx               # Individual feature card component
│   │   ├── FeatureStack.jsx              # Stack of 3 feature cards
│   │   ├── LeftInteractive.jsx           # Video area with play button
│   │   └── Navbar.jsx                    # Fixed translucent navigation
│   ├── pages/
│   │   └── Landing.jsx                   # Main landing page
│   ├── App.jsx                          # Root component
│   ├── main.jsx                         # App entry point
│   └── index.css                        # TailwindCSS + custom styles
├── tailwind.config.js                   # TailwindCSS configuration
├── postcss.config.js                    # PostCSS configuration
├── vite.config.js                       # Vite configuration
└── package.json                         # Dependencies and scripts
```

## 🎯 Key Components

### AnimatedPolygonGrid
Decorative Kolam-inspired polygonal shapes that rotate and translate on scroll using Framer Motion's useScroll and useTransform hooks.

```jsx
// Example usage
const { scrollY } = useScroll();
const rotate = useTransform(scrollY, [0, 1000], [0, 360]);

return (
  <motion.div style={{ rotate }}>
    <img src={polygon} alt="Decorative polygon" />
  </motion.div>
);
```

### FeatureCard
Interactive cards with hover animations, accessibility support, and visual feedback.

```jsx
// Example usage
<FeatureCard
  icon={<BookOpen className="w-6 h-6" />}
  title="Test Your Knowledge and Learn"
  subtitle="Interactive quizzes and educational content"
  onClick={handleClick}
  index={0}
/>
```

## 🛠️ Development

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation & Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Commands
```bash
npm run dev        # Start dev server at http://localhost:5173
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint (if configured)
```

## 🎨 Design Tokens

### Colors
```css
--background: #FAF9F7    /* Main background */
--primary: #8B4513       /* Primary brown (Kolam-inspired) */
--accent: #A0522D        /* Accent brown */
--text: #2C2C2C          /* Main text color */
--muted-blue: #6B96B0    /* Accent blue */
```

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

### Spacing & Layout
- **Border Radius**: 12px (xl) / 16px (2xl)
- **Shadows**: Soft layered shadows
- **Grid**: 50/50 desktop split, stacked mobile

## 📋 Pre-Deployment Checklist

Before deploying to Vercel or any other platform, complete these tasks:

### 🔴 Required Changes

1. **Replace Logo**
   - [ ] Replace `src/assets/images/logo.svg` with actual Kolam Vision logo
   - [ ] Update logo dimensions in `Navbar.jsx` if needed

2. **Replace Video Placeholder**
   - [ ] Replace `src/assets/images/hero-video-placeholder.svg` with actual video thumbnail
   - [ ] Update `LeftInteractive.jsx` to use real video URL or file

3. **Update Favicon**
   - [ ] Replace `public/vite.svg` with custom favicon
   - [ ] Add multiple favicon sizes (16x16, 32x32, 192x192, 512x512)

4. **Add Real Content**
   - [ ] Update footer copyright text and links
   - [ ] Replace placeholder content in feature cards if needed
   - [ ] Add actual navigation URLs in `Navbar.jsx`

5. **Implement Navigation**
   - [ ] Add React Router if multiple pages needed
   - [ ] Implement click handlers in `Landing.jsx` (handleGetStarted, handleLearnMore)
   - [ ] Connect feature card actions to real pages/sections

6. **Environment Configuration**
   - [ ] Create `.env` file for API endpoints
   - [ ] Add environment variables for:
     - `VITE_API_BASE_URL=your-api-endpoint`
     - `VITE_VIDEO_URL=your-video-url`

7. **Performance Optimization**
   - [ ] Optimize image sizes and formats (WebP)
   - [ ] Add lazy loading for images
   - [ ] Consider preloading critical fonts

8. **SEO & Meta Tags**
   - [ ] Update `index.html` title and meta description
   - [ ] Add Open Graph and Twitter meta tags
   - [ ] Add structured data for Kolam/cultural content

9. **Analytics & Monitoring**
   - [ ] Add Google Analytics or similar
   - [ ] Implement error boundary components
   - [ ] Add performance monitoring

### 🟡 Optional Enhancements

- [ ] Add mobile menu functionality in `Navbar.jsx`
- [ ] Implement video player modal in `LeftInteractive.jsx`
- [ ] Add loading states and skeleton screens
- [ ] Add form validation for contact/signup forms
- [ ] Implement dark mode toggle
- [ ] Add more comprehensive accessibility features (ARIA labels, etc.)

### 🟢 Current Status
✅ Project structure and components created  
✅ TailwindCSS configured with design tokens  
✅ Framer Motion animations implemented  
✅ Responsive design completed  
✅ Accessibility basics implemented  

## 🚀 Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variables in Vercel dashboard
5. Deploy!

### Build Configuration
The project is configured for static deployment. The build command generates optimized static files in the `dist` directory.

## 🔧 Troubleshooting

### Common Issues

1. **TailwindCSS styles not working**
   - Ensure `tailwind.config.js` content paths include your file extensions
   - Check that `@import` statements are at the top of `index.css`

2. **Framer Motion animations not working**
   - Verify `framer-motion` is installed
   - Check for console errors related to motion components

3. **Images not loading**
   - Ensure image paths are correct relative to `src` directory
   - Check that image files exist in `src/assets` folder

4. **Build errors**
   - Check for unused imports
   - Verify all file paths are correct
   - Ensure all dependencies are installed

### Performance Tips
- Use `React.memo` for static components
- Implement code splitting for larger applications
- Optimize images with appropriate formats and sizes
- Use Vite's built-in bundle analysis: `npm run build -- --report`

## 📄 License

This project is part of the Kolam Vision application for cultural preservation through AI technology.

---

**Note**: This is a landing page only. Additional pages and backend integration are beyond the scope of this implementation. All placeholder content is clearly marked with TODO comments for easy identification and replacement.
