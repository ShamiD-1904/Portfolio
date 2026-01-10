const navLinks = [
  {
    name: "Work",
    link: "#work",
  },
  
  {
    name: "Skills",
    link: "#skills",
  },
  {
    name: "Testimonials",
    link: "#testimonials",
  },
];

const words = [
    { text1: "From", text2: "Ideas", imgPath: "/images/ideas.svg" },
    { text1: "To", text2: "Code", imgPath: "/images/concepts.svg" },
    { text1: "To", text2: "Reality", imgPath: "/images/concepts.svg" },
    { text1: "From", text2: "Ideas", imgPath: "/images/ideas.svg" },
    { text1: "To", text2: "Code", imgPath: "/images/concepts.svg" },
    { text1: "To", text2: "Reality", imgPath: "/images/concepts.svg" },
]

const counterItems = [
  { value: 4, suffix: " ", label: "Years of Experience" },
  { value: 19, suffix: " ", label: "Completed Projects" },
  { value: 12, suffix: " ", label: "Satisfied Clients" },
  { value: 95, suffix: "%", label: "Client Retention Rate" },
];

const logoIconsList = [
  {
    imgPath: "/images/logos/company-logo-1.png",
  },
  {
    imgPath: "/images/logos/company-logo-2.png",
  },
  {
    imgPath: "/images/logos/company-logo-3.png",
  },
  {
    imgPath: "/images/logos/company-logo-4.png",
  },
  {
    imgPath: "/images/logos/company-logo-5.png",
  },
  {
    imgPath: "/images/logos/company-logo-6.png",
  },
  {
    imgPath: "/images/logos/company-logo-7.png",
  },
  {
    imgPath: "/images/logos/company-logo-8.png",
  },
  {
    imgPath: "/images/logos/company-logo-9.png",
  },
  {
    imgPath: "/images/logos/company-logo-10.png",
  },
  {
    imgPath: "/images/logos/company-logo-11.png",
  },
];

const abilities = [
  {
    imgPath: "/images/seo.png",
    title: "Quality Focus",
    desc: "Delivering high-quality results while maintaining attention to every detail.",
  },
  {
    imgPath: "/images/chat.png",
    title: "Reliable Communication",
    desc: "Keeping you updated at every step to ensure transparency and clarity.",
  },
  {
    imgPath: "/images/time.png",
    title: "On-Time Delivery",
    desc: "Making sure projects are completed on schedule, with quality & attention to detail.",
  },
];

const techStackImgs = [
  {
    name: "React Developer",
    imgPath: "/images/logos/react.png",
  },
  {
    name: "Python Developer",
    imgPath: "/images/logos/python.svg",
  },
  {
    name: "Backend Developer",
    imgPath: "/images/logos/node.png",
  },
  {
    name: "Interactive Developer",
    imgPath: "/images/logos/three.png",
  },
  {
    name: "Project Manager",
    imgPath: "/images/logos/git.svg",
  },
];

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/ShamiD-1904",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="social-icon">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/shamiska-darshana-384413349",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="social-icon">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    name: "Facebook",
    url: "https://facebook.com/shamishka.darshana.1904",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="social-icon">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
];

const techStackIcons = [
  {
    name: "React",
    modelPath: "/models/react_logo-transformed.glb",
    scale: 1,
    rotation: [0, 0, 0],
    position: [0, 0, 0],
  },
  {
    name: "Python",
    modelPath: "/models/python-transformed.glb",
    scale: 0.8,
    rotation: [0, 0, 0],
    position: [0, 0, 0],
  },
  
  {
    name: "ThreeJs",
    modelPath: "/models/three.js-transformed.glb",
    scale: 0.05,
    rotation: [0, 0, 0],
    position: [0, 0, 0],
  },
  {
    name: "Git",
    modelPath: "/models/git-svg-transformed.glb",
    scale: 0.05,
    rotation: [0, -Math.PI / 4, 0],
    position: [0, 0, 0],
  },
  {
    name: "AWS",
    modelPath: "/models/aws_logo.glb",
    scale: 0.38,
    rotation: [0, -Math.PI / 8, 0],
    position: [-0.6, -2, 0],
  },
  {
    name: "Docker",
    modelPath: "/models/docker-logo-transformed.glb",
    scale: 1.2,
    rotation: [0, Math.PI / 12, 0],
    position: [0, 0, 0],
  },
  
];

const expCards = [
  {
    review: "Shamishka brought creativity and technical expertise to the team, significantly improving our frontend performance. His work has been invaluable in delivering faster experiences.",
    imgPath: "/images/exp1.png",
    logoPath: "/images/logo1.png",
    title: "Frontend Developer",
    date: "January 2023 - Present",
    responsibilities: [
      "Developed and maintained user-facing features for the Hostinger website.",
      "Collaborated closely with UI/UX designers to ensure seamless user experiences.",
      "Optimized web applications for maximum speed and scalability.",
    ],
  },
  {
    review: "Shamishka's contributions to Docker's web applications have been outstanding. He approaches challenges with a problem-solving mindset.",
    imgPath: "/images/exp2.png",
    logoPath: "/images/logo2.png",
    title: "Full Stack Developer",
    date: "June 2020 - December 2023",
    responsibilities: [
      "Led the development of Docker's web applications, focusing on scalability.",
      "Worked with backend engineers to integrate APIs seamlessly with the frontend.",
      "Contributed to open-source projects that were used with the Docker ecosystem.",
    ],
  },
  {
    review: "Shami's work on Appwrite’s mobile app brought a high level of quality and efficiency. He delivered solutions that enhanced our mobile experience & meet our product goals.",
    imgPath: "/images/exp3.png",
    logoPath: "/images/logo3.png",
    title: "React Native Developer",
    date: "March 2019 - May 2020",
    responsibilities: [
      "Built cross-platform mobile apps using React Native, integrating with Appwrite's backend services.",
      "Improved app performance and user experience through code optimization and testing.",
      "Coordinated with the product team to implement features based on feedback.",
    ],
  },
];

const expLogos = [
  {
    name: "logo1",
    imgPath: "/images/logo1.png",
  },
  {
    name: "logo2",
    imgPath: "/images/logo2.png",
  },
  {
    name: "logo3",
    imgPath: "/images/logo3.png",
  },
];


const socialImgs = [
  {
    name: "insta",
    imgPath: "/images/insta.png",
  },
  {
    name: "fb",
    imgPath: "/images/fb.png",
  },
  {
    name: "x",
    imgPath: "/images/x.png",
  },
  {
    name: "linkedin",
    imgPath: "/images/linkedin.png",
  },
];

// Projects data for ShowcaseSection
const projectsData = [
  {
    id: 1,
    title: "NexCare",
    type: "web",
    category: "Healthcare",
    year: "2024",
    image: "/images/project1.png",
    tags: ["Reactjs", "Nodejs", "MongoDB","TailwindCSS"],
    shortDescription: "A streamlined digital solution for modern healthcare management.",
    fullDescription: "NexCare is a comprehensive healthcare management platform that revolutionizes patient scheduling and medical record management. Built with React Native and Expo for cross-platform compatibility, it offers a seamless user experience with real-time appointment booking, prescription tracking, and secure communication between patients and healthcare providers.",
    features: ["Patient Scheduling", "Medical Records", "Real-time Chat", "Prescription Management"],
    liveUrl: "#",
    githubUrl: "#",
    isFeatured: true,
  },
  {
    id: 2,
    title: "Library Management",
    type: "web",
    category: "Education",
    year: "2023",
    image: "/images/project2.png",
    tags: ["Reactjs", "Supabase", "TailwindCSS"],
    shortDescription: "Comprehensive platform for managing library resources.",
    fullDescription: "A full-featured library management system that streamlines book cataloging, member management, and borrowing processes. Features include advanced search, automated late fee calculation, and detailed analytics for library administrators.",
    features: ["Book Cataloging", "Member Management", "Borrowing System", "Analytics Dashboard"],
    liveUrl: "#",
    githubUrl: "#",
    isFeatured: false,
  },
  {
    id: 3,
    title: "YC Directory",
    type: "web",
    category: "Web App",
    year: "2024",
    image: "/images/project3.png",
    tags: ["Reactjs", "PostgreSQL", "Shadcn + TailwindCSS"],
    shortDescription: "Startup showcase app for discovering innovative companies.",
    fullDescription: "YC Directory is a curated platform showcasing Y Combinator startups and innovative companies. Users can discover, filter, and connect with startups based on industry, funding stage, and technology stack. Features include startup profiles, founder information, and investment details.",
    features: ["Startup Profiles", "Advanced Filtering", "Founder Connect", "Investment Tracking"],
    liveUrl: "#",
    githubUrl: "#",
    isFeatured: false,
  },
  {
    id: 4,
    title: "Apple Clone",
    type: "ai",
    category: "Learning",
    year: "2024",
    image: "/images/project1.png",
    tags: ["Tech1", "Tech2", "Tech3"],
    shortDescription: "One of the first personal projects I have created",
    fullDescription: "Full description for your fourth project. Add details about the project, its purpose, and the technologies used.",
    features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
    liveUrl: "#",
    githubUrl: "#",
    isFeatured: false,
  },
  {
    id: 5,
    title: "Project 5 Placeholder",
    type: "ai",
    category: "Category",
    year: "2024",
    image: "/images/project2.png",
    tags: ["Tech1", "Tech2", "Tech3"],
    shortDescription: "Short description for your fifth project.",
    fullDescription: "Full description for your fifth project. Add details about the project, its purpose, and the technologies used.",
    features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
    liveUrl: "#",
    githubUrl: "#",
    isFeatured: false,
  },
  {
    id: 6,
    title: "Project 6 Placeholder",
    type: "web",
    category: "Category",
    year: "2024",
    image: "/images/project3.png",
    tags: ["Tech1", "Tech2", "Tech3"],
    shortDescription: "Short description for your sixth project.",
    fullDescription: "Full description for your sixth project. Add details about the project, its purpose, and the technologies used.",
    features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
    liveUrl: "#",
    githubUrl: "#",
    isFeatured: false,
  },
];

export {
  words,
  abilities,
  logoIconsList,
  counterItems,
  expCards,
  expLogos,
  
  socialImgs,
  techStackIcons,
  techStackImgs,
  navLinks,
  projectsData,
  socialLinks,
};
