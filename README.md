# Shamiska Darshana - Portfolio

Welcome to my personal portfolio! This is a modern, interactive showcase of my work as a developer, built with cutting-edge technologies. Explore my projects, skills, and experiences through an immersive interface featuring stunning 3D animations and smooth interactions.

## About Me

I'm a passionate Computer Engineering undergraduate with expertise in modern web technologies, 3D web development, and creating engaging user experiences. This portfolio demonstrates my technical skills and creative approach to solving problems. Each section is carefully crafted to showcase different aspects of my work and capabilities.

## What's Inside

- **3D Hero Section**: An interactive 3D scene that welcomes visitors with animated models and engaging visual effects
- **Project Showcase**: A curated selection of my best projects with descriptions and links
- **Skills & Tech Stack**: Animated display of technologies I'm proficient in
- **Testimonials**: Client feedback and recommendations
- **Contact Section**: Get in touch with me directly through an integrated contact form
- **Responsive Design**: Works seamlessly on all devices - desktop, tablet, and mobile
- **High Performance**: Optimized for speed with lazy loading and code splitting

## Tech Stack

- **Frontend Framework**: [React 19](https://react.dev)
- **Build Tool**: [Vite 7](https://vite.dev)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com)
- **3D Graphics**: [Three.js](https://threejs.org) with [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
- **Animations**: [GSAP 3](https://greensock.com/gsap/)
- **Email Service**: [EmailJS](https://www.emailjs.com)
- **Backend/Database**: [Supabase](https://supabase.com)
- **Security**: [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/)
- **UI Utilities**: React Responsive, React CountUp
- **Post-Processing**: React Three Postprocessing
- **Linting**: ESLint

## Getting Started

Want to run this portfolio locally or fork it for your own use? Follow these steps:

### Prerequisites
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ShamiD-1904/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_TURNSTILE_SITE_KEY=your_turnstile_key
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

### Running Locally

Start the development server:
```bash
npm run dev
```

Open your browser and visit `http://localhost:1904`

### Building for Production

```bash
npm run build
```

The optimized production build will be in the `dist` folder.

## Project Structure

```
portfolio/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── HeroModels/      # 3D hero section components
│   │   └── Models/          # 3D model components
│   ├── sections/            # Main page sections
│   ├── styles/              # CSS stylesheets
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility libraries (email, supabase)
│   ├── animations/          # Animation utilities
│   ├── constants/           # Application constants
│   ├── App.jsx              # Main App component
│   └── main.jsx             # Entry point
├── public/                  # Static assets
│   ├── images/
│   ├── models/              # 3D model files
│   ├── robots.txt
│   └── sitemap.xml
├── vite.config.js           # Vite configuration
├── eslint.config.js         # ESLint rules
├── package.json             # Dependencies & scripts
└── README.md                # This file
```

## Key Sections

**Hero Section**
An immersive 3D introduction with animated graphics and smooth transitions that sets the tone for the portfolio.

**Project Showcase**
Browse through my selected projects with descriptions, technologies used, and links to live demos or repositories.

**Skills**
An animated and 3d display showcasing my technical proficiencies and the tech stack I work with daily.

**Testimonials**
Client and colleague feedback providing insights into my work style and impact.

**Contact**
Reach out directly through the contact form. Messages are secure and spam-protected with Turnstile CAPTCHA.

##Configuration

### Vite Configuration
The project includes optimized Vite settings with:
- Code splitting for vendor libraries (React, Three.js, GSAP)
- ES2020 target for modern browsers
- esbuild minification
- Source maps for debugging

### Tailwind CSS
Configured with Tailwind CSS 4 using the Vite plugin for better performance.

## Live Demo

Visit my portfolio: [shamiska darshana](https://shamid.me)

## Why This Tech Stack?

I chose these technologies because they represent the modern web development landscape:
- **React & Vite**: Fast development experience and optimal performance
- **Three.js & GSAP**: Create stunning visual experiences that engage users
- **Tailwind CSS**: Build responsive, beautiful interfaces efficiently
- **EmailJS & Supabase**: Backend services that don't require a dedicated server


## Fun Facts

- Built with **Vite** for lightning-fast development
- Uses **React Suspense** for intelligent code splitting
- Implements **GSAP** animations for smooth, performant interactions
- Features **Three.js** for immersive 3D experiences
- Optimized for all devices with responsive design
- Includes comprehensive SEO with sitemap and meta tags
- Source maps enabled for easy debugging


##  License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact & Connect

I'd love to hear from you! Whether you have questions about my work, want to collaborate, or just want to say hi:

📧 **Email**: shamidwebdev@gmail.com  
💼 **LinkedIn**: [Shamiska Darshana](https://www.linkedin.com/in/shamiska-darshana-384413349/)  
🐙 **GitHub**: [@ShamiD-1904](https://github.com/ShamiD-1904)  
🌐 **Portfolio**: [Visit Live](https://shamid.me)

## Credits

### Built With
- [React](https://react.dev) - For building amazing user interfaces
- [Vite](https://vite.dev) - For blazing fast development
- [Three.js](https://threejs.org) - For 3D graphics magic
- [GSAP](https://greensock.com) - For smooth animations
- [Tailwind CSS](https://tailwindcss.com) - For beautiful, responsive design
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/) - For React-friendly 3D
- [EmailJS](https://www.emailjs.com) - For secure email delivery
- [Supabase](https://supabase.com) - For backend services

### 3D Models
- **Robot Model** by [styloo](https://sketchfab.com/stylo0) - Licensed under [CC-BY 4.0](http://creativecommons.org/licenses/by/4.0/)
  - Source: [Sketchfab](https://sketchfab.com/3d-models/robot-character-0eff23412e48470bae690d87bd1726f8)

---

**Made with ❤️ by Shamishka Darshana**
