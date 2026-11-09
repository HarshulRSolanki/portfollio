
export const personalInfo = {
  name: "Harshul Rajnikant Solanki ",
  displayName: "Harshul R Solanki",
  initials: "HRS",
  role: "Full Stack Developer",
  educationTag: "MCA Student",
  currentEducation: "MCA Semester 3",
  university: "Gujarat Technological University (GTU)",
  previousEducation: "Bachelor of Computer Applications (BCA)",
  location: "Nadiad, Gujarat, India",
  careerGoal: "Full Stack Developer Internship",
  availability: "Available for Internship Opportunities",
  heroIntro:
    "MCA student and aspiring Full Stack Developer passionate about building scalable web applications, developing backend systems, and creating modern user experiences.",

  // Official Social Profiles
  social: {
    github: "https://github.com/HarshulRSolanki",
    linkedin: "https://www.linkedin.com/in/harshulr2k6",
    // Configurable contact details (via .env; do not hardcode private info)
    email: import.meta.env.VITE_CONTACT_EMAIL || "harshulrsolanki@gmail.com",
    phone: import.meta.env.VITE_CONTACT_PHONE || "7984325605",
  },

  // Configurable Contact Form Endpoint (e.g. Formspree via .env)
  contactConfig: {
    formEndpoint: import.meta.env.VITE_FORMSPREE_ENDPOINT || "",
  },

  // Configurable Resume Download Link / File
  resume: {
    downloadUrl: import.meta.env.VITE_RESUME_URL || "",
    fileName: "Harshul_R_Solanki_Resume.pdf",
  },
};

export const aboutStats = [
  {
    label: "Current Degree",
    value: "MCA Sem 3",
    subtext: "Gujarat Technological University",
    accent: "ocean",
  },
  {
    label: "Undergraduate",
    value: "BCA",
    subtext: "Computer Applications",
    accent: "pink",
  },
  {
    label: "Featured Projects",
    value: "3 Built",
    subtext: "Full Stack & MVC Systems",
    accent: "ocean",
  },
  {
    label: "Target Role",
    value: "Internship",
    subtext: "Full Stack / Software Dev",
    accent: "pink",
  },
];

export const aboutHighlights = [
  {
    id: "education",
    title: "Education Highlight",
    subtitle: "MCA Semester 3 • GTU",
    description:
      "Pursuing Master of Computer Applications (Semester 3) at Gujarat Technological University following a Bachelor of Computer Applications (BCA) degree.",
    badge: "GTU",
    icon: "GraduationCap",
  },
  {
    id: "career-objective",
    title: "Career Objective",
    subtitle: "Full Stack Developer Intern",
    description:
      "Seeking an internship opportunity to build scalable web applications, engineer backend APIs, and learn from experienced engineering teams.",
    badge: "Objective",
    icon: "Target",
  },
];

export const skillCategories = [
  {
    name: "Programming Languages",
    description: "Core programming languages used for software development and problem-solving.",
    accent: "ocean",
    skills: [
      { name: "Java", icon: "java" },
      { name: "Python", icon: "python" },
      { name: "C", icon: "c" },
      { name: "C++", icon: "cpp" },
      { name: "JavaScript", icon: "javascript" },
    ],
  },
  {
    name: "Frontend",
    description: "Crafting clean, responsive interfaces and interactive client experiences.",
    accent: "pink",
    skills: [
      { name: "HTML", icon: "html" },
      { name: "CSS", icon: "css" },
      { name: "React.js", icon: "react" },
      { name: "Tailwind CSS", icon: "tailwind" },
    ],
  },
  {
    name: "Backend",
    description: "Developing scalable REST APIs, business logic, and server architectures.",
    accent: "ocean",
    skills: [
      { name: "Spring Boot", icon: "springboot" },
      { name: "FastAPI", icon: "fastapi" },
      { name: "Node.js", icon: "nodejs" },
      { name: "Express.js", icon: "express" },
    ],
  },
  {
    name: "Databases",
    description: "Designing relational schemas and managing structured & document data.",
    accent: "pink",
    skills: [
      { name: "MySQL", icon: "mysql" },
      { name: "MongoDB", icon: "mongodb" },
    ],
  },
  {
    name: "Tools",
    description: "Version control workflows and modern integrated development environments.",
    accent: "ocean",
    skills: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "VS Code", icon: "vscode" },
      { name: "Visual Studio", icon: "visualstudio" },
    ],
  },
];

export const projects = [
  {
    id: "umcao",
    title: "Universal Multi-Language Code Analyzer and Optimizer (UMCAO)",
    shortTitle: "UMCAO",
    category: "Code Analysis & Optimization",
    description:
      "A code analysis and optimization platform designed to identify inefficient programming patterns, analyze code, provide optimization suggestions, and evaluate performance.",
    technologies: ["React.js", "Tailwind CSS", "Python", "FastAPI", "AST", "Chart.js"],
    features: [
      "Static code analysis across programming constructs.",
      "Inefficient pattern detection inside source code.",
      "Optimization suggestions for cleaner logic.",
      "Complexity estimation for performance clarity.",
      "Performance benchmarking & metric visualization.",
    ],
    architecture: {
      frontend: "React.js & Tailwind CSS interactive dashboard powered by Chart.js metrics.",
      backend: "Python & FastAPI service performing AST parsing and static pattern checks.",
    },
    screenshotUrl: "", // Configurable path in /public
    demoUrl: import.meta.env.VITE_UMCAO_DEMO_URL || "",
    githubUrl: import.meta.env.VITE_UMCAO_REPO_URL || "",
    profileGithubFallback: "https://github.com/HarshulRSolanki/",
    visualType: "umcao",
  },
  {
    id: "online-bookstore",
    title: "Online Bookstore",
    shortTitle: "Online Bookstore",
    category: "Full Stack E-Commerce",
    description:
      "An interactive online bookstore that allows users to explore books, manage shopping activities, and make secure payments.",
    technologies: ["Java", "Spring Boot", "Thymeleaf", "MySQL", "Stripe"],
    features: [
      "Book catalog exploration and browsing experience.",
      "Shopping cart and purchasing workflow management.",
      "Server-rendered pages powered by Thymeleaf.",
      "Persistent data storage in MySQL.",
      "Secure payment processing with Stripe.",
    ],
    architecture: {
      backend: "Java & Spring Boot MVC services coordinating catalog, cart, and checkout flows.",
      database: "Relational MySQL storage integrated with Stripe payment gateway.",
    },
    screenshotUrl: "",
    demoUrl: import.meta.env.VITE_BOOKSTORE_DEMO_URL || "",
    githubUrl: import.meta.env.VITE_BOOKSTORE_REPO_URL || "",
    profileGithubFallback: "https://github.com/HarshulRSolanki",
    visualType: "bookstore",
  }
];

export const educationHistory = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "Gujarat Technological University (GTU)",
    duration: "Semester 3",
    status: "Currently Pursuing",
    location: "Gujarat, India",
    focus: "Full Stack Web Development, Enterprise Java, Python APIs, DBMS & Software Engineering",
    highlights: [
      "Currently pursuing MCA Semester 3 at Gujarat Technological University (GTU).",
      "Building practical software projects spanning React, Spring Boot, FastAPI, and ASP.NET Core.",
      "Strengthening problem-solving skills through Data Structures, Algorithms, and OOP.",
    ],
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: import.meta.env.VITE_BCA_COLLEGE || "Undergraduate Institution (Configurable via VITE_BCA_COLLEGE)",
    duration: import.meta.env.VITE_BCA_DATES || "Completed Prior to MCA",
    status: "Completed",
    location: "Gujarat, India",
    focus: "Programming Fundamentals (C, C++, Java), Databases & Web Basics",
    highlights: [
      "Completed Bachelor of Computer Applications (BCA) undergraduate degree.",
      "Developed foundational proficiency in object-oriented programming and database concepts.",
      "Built academic software utilities that paved the way for full-stack specialization.",
    ],
  },
];

export const careerOpportunities = {
  headline: "Aspiring Full Stack Developer",
  subheadline: "Focused on impactful Internship & Software Development roles",
  description:
    "As an MCA Semester 3 student with hands-on experience in academic and personal projects, I am eager to bring clean engineering practices, quick adaptability, and strong backend/frontend skills to a real-world engineering team.",
  tracks: [
    {
      title: "Aspiring Full Stack Developer",
      badge: "End-to-End Web",
      description:
        "Passionate about bridging responsive React.js & Tailwind CSS user interfaces with reliable RESTful backend architectures and relational/NoSQL databases.",
      icon: "Layers",
      accent: "ocean",
    },
    {
      title: "Full Stack Developer Internship",
      badge: "Primary Goal",
      description:
        "Interested in Full Stack Developer Internship roles where I can contribute to production codebases, collaborate via Git/GitHub, and learn from senior engineers.",
      icon: "Briefcase",
      accent: "pink",
    },
    {
      title: "Java, Python & Software Development",
      badge: "Core Tech",
      description:
        "Interested in Java (Spring Boot), Python (FastAPI), C#, and general Software Development opportunities focused on scalable APIs and clean problem solving.",
      icon: "Terminal",
      accent: "ocean",
    },
  ],
};

export const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];
