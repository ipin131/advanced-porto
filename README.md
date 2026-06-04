# Modern React Portfolio

A modern, interactive portfolio website built with React, Three.js, and Framer Motion. Features 3D interactive elements, smooth animations, and serverless deployment on Netlify.

## Features

- **3D Interactive Hero Section**: Animated 3D sphere using Three.js and React Three Fiber
- **Work Portfolio Management**: Add, display, and manage your work projects with:
  - Title, description, and project links
  - Image thumbnails
  - Tags for categorization
  - Modal-based form for adding projects
  
- **CV Upload**: Upload and store your CV/Resume (PDF, DOC, DOCX)
  - Local storage persistence
  - Download capability
  - Easy management

- **Contact Links**: Add links to your social profiles and contact information
  - LinkedIn, GitHub, Email, etc.
  - Custom platforms
  - Interactive cards with hover effects

- **Modern Animations**: Smooth page transitions and element animations using Framer Motion
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Local Storage**: All data persists in browser storage (no backend required)
- **Serverless Architecture**: Optimized for Netlify deployment

## Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Three.js** - 3D graphics
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers for R3F
- **Framer Motion** - Animation library
- **CSS3** - Modern styling with CSS variables

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd porto
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Deployment to Netlify

### Method 1: Netlify CLI

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Login to Netlify:
```bash
netlify login
```

3. Deploy:
```bash
netlify deploy --prod
```

### Method 2: Git Integration

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [Netlify](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect your repository
5. Netlify will auto-detect the build settings from `netlify.toml`
6. Click "Deploy site"

### Method 3: Drag and Drop

1. Build your project: `npm run build`
2. Go to [Netlify Drop](https://app.netlify.com/drop)
3. Drag and drop the `dist` folder
4. Your site is live!

## Customization

### Changing Colors

Edit `src/index.css` and modify the CSS variables:

```css
:root {
  --primary-color: #2563eb;
  --secondary-color: #1e40af;
  --accent-color: #3b82f6;
  --text-color: #1f2937;
  --light-bg: #f9fafb;
  --dark-bg: #0f172a;
}
```

### Editing Content

- **Hero Section**: Edit `src/components/Hero.jsx`
- **About Section**: Edit `src/components/About.jsx`
- **Skills**: Update the skills array in `About.jsx`

### 3D Sphere Customization

Edit the `AnimatedSphere` component in `src/components/Hero.jsx`:

```jsx
<MeshDistortMaterial
  color="#2563eb"        // Change color
  distort={0.5}          // Distortion amount
  speed={1.5}            // Animation speed
  roughness={0}          // Material roughness
  metalness={0.8}        // Metallic appearance
/>
```

## Project Structure

```
porto/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx/css
│   │   ├── Hero.jsx/css         # 3D interactive hero
│   │   ├── About.jsx/css
│   │   ├── Work.jsx/css         # Work portfolio with modal
│   │   ├── CV.jsx/css           # CV upload
│   │   ├── Contact.jsx/css      # Contact links
│   │   └── Footer.jsx/css
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── App.css
├── index.html
├── vite.config.js
├── netlify.toml                  # Netlify configuration
├── package.json
└── README.md
```

## Features in Detail

### Work Portfolio
- Click "Add New Work" to open modal form
- Add project title, description, link, image URL, and tags
- Projects are displayed in a responsive grid
- Hover effects and animations
- Delete functionality for each project

### CV Management
- Click to upload PDF, DOC, or DOCX files
- Files are stored in browser localStorage as base64
- Download anytime
- Easy deletion

### Contact Links
- Add any social media or contact links
- Platform name and URL
- Hover effects with arrow animation
- Delete functionality

## Data Persistence

All data is stored in browser localStorage:
- **portfolio_work**: Work projects array
- **portfolio_cv**: CV file data
- **portfolio_links**: Contact links array

**Note**: Data is browser and device-specific. Clearing browser data will remove your content.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Optimized bundle size with Vite
- Code splitting
- Lazy loading for 3D components
- Efficient re-renders with React best practices

## Contributing

Feel free to fork this project and customize it for your needs!

## License

MIT License - feel free to use this for your personal portfolio.

## Support

For issues or questions, please open an issue on GitHub.

---

Built with ❤️ using React, Three.js, and modern web technologies.
