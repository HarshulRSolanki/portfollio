
function resolveResumeUrl() {
  const base = import.meta.env.BASE_URL || "/";
  const raw = (import.meta.env.VITE_RESUME_URL || "").trim();
  if (!raw) {
    return `${base}Resume.pdf`;
  }
  if (/^(\.\/)?public\/Resume\.pdf$/i.test(raw)) {
    return `${base}Resume.pdf`;
  }
  if (raw.startsWith("./")) {
    return `${base}${raw.slice(2)}`;
  }
  return raw;
}

export const personalInfo = {
  name: "Harshul R Solanki ",
  displayName: "Harshul Rajnikant Solanki",
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
    formEndpoint: import.meta.env.VITE_FORMSPREE_ENDPOINT || "harshulrsolanki@gmail.com",
  },

  // Configurable Resume Download Link / File (defaults to /public/Resume.pdf)
  resume: {
    downloadUrl: resolveResumeUrl(),
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
      "A multi-language code analysis and optimization platform designed to detect inefficient coding patterns, analyze code quality, provide optimization suggestions, and compare performance metrics.",
    technologies: ["React.js", "Tailwind CSS", "Python", "FastAPI", "Python AST", "Chart.js"],
    features: [
      "Multi-language code analysis.",
      "Detection of inefficient coding patterns.",
      "Optimization suggestions with explanations.",
      "Code execution and performance benchmarking.",
      "Execution time and memory comparison.",
      "Interactive performance dashboard.",
    ],
    architecture: {
      frontend: "React.js & Tailwind CSS interactive dashboard powered by Chart.js metrics.",
      backend: "Python & FastAPI service performing Python AST parsing and static pattern checks.",
    },
    screenshotUrl: "", // Configurable path in /public
    demoUrl: import.meta.env.VITE_UMCAO_DEMO_URL || "https://umcao.onrender.com/",
    githubUrl: import.meta.env.VITE_UMCAO_REPO_URL || "https://github.com/HarshulRSolanki/UMCAO",
    profileGithubFallback: "https://github.com/HarshulRSolanki/UMCAO",
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
    githubUrl: import.meta.env.VITE_BOOKSTORE_REPO_URL || "https://github.com/HarshulRSolanki/OnlineBookStore",
    profileGithubFallback: "https://github.com/HarshulRSolanki/OnlineBookStore",
    visualType: "bookstore",
  }
];

export const educationHistory = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "Anand Institute of Management and Information Science",
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
    institution: import.meta.env.VITE_BCA_COLLEGE || "Dharmsinh Desai University",
    duration: import.meta.env.VITE_BCA_DATES || "2022-2025",
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

// --- GitHub URL Normalization, Directory Link Construction & Live Tree Helpers ---

const repoMetaCache = new Map();
const dirContentsCache = new Map();

/**
 * Normalizes a repository folder/file path by collapsing extra slashes and stripping
 * leading/trailing slashes. Returns null if path traversal segments (..) are present.
 */
export function normalizeGitHubPath(rawPath = "") {
  if (typeof rawPath !== "string") return "";
  const cleaned = rawPath.trim().replace(/\\/g, "/").replace(/\/+/g, "/").replace(/^\/+|\/+$/g, "");
  if (!cleaned) return "";
  const segments = cleaned.split("/").filter((seg) => seg && seg !== ".");
  if (segments.some((seg) => seg === "..")) {
    return null;
  }
  return segments.join("/");
}

function encodeGitHubSegments(pathStr) {
  const normalized = normalizeGitHubPath(pathStr);
  if (normalized === null) return null;
  if (!normalized) return "";
  return normalized
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

/**
 * Builds canonical GitHub repository root URL: https://github.com/USERNAME/REPOSITORY
 */
export function buildGitHubRepoUrl(owner, repo) {
  const safeOwner = typeof owner === "string" ? owner.trim() : "";
  const safeRepo = typeof repo === "string" ? repo.trim().replace(/\.git$/i, "") : "";
  if (!safeOwner || !safeRepo) return null;
  return `https://github.com/${encodeURIComponent(safeOwner)}/${encodeURIComponent(safeRepo)}`;
}

/**
 * Builds canonical GitHub folder URL:
 * https://github.com/USERNAME/REPOSITORY/tree/BRANCH/FOLDER_PATH
 */
export function buildGitHubTreeUrl(owner, repo, branch = "main", folderPath = "") {
  const repoUrl = buildGitHubRepoUrl(owner, repo);
  const safeBranch = typeof branch === "string" && branch.trim() ? branch.trim() : "main";
  const encodedPath = encodeGitHubSegments(folderPath);
  if (!repoUrl || encodedPath === null) return null;
  const encodedBranch = safeBranch
    .split("/")
    .filter(Boolean)
    .map((s) => encodeURIComponent(s))
    .join("/");
  return encodedPath
    ? `${repoUrl}/tree/${encodedBranch}/${encodedPath}`
    : `${repoUrl}/tree/${encodedBranch}`;
}

/**
 * Builds canonical GitHub file URL:
 * https://github.com/USERNAME/REPOSITORY/blob/BRANCH/FILE_PATH
 */
export function buildGitHubFileUrl(owner, repo, branch = "main", filePath = "") {
  const repoUrl = buildGitHubRepoUrl(owner, repo);
  const safeBranch = typeof branch === "string" && branch.trim() ? branch.trim() : "main";
  const encodedPath = encodeGitHubSegments(filePath);
  if (!repoUrl || !encodedPath) return null;
  const encodedBranch = safeBranch
    .split("/")
    .filter(Boolean)
    .map((s) => encodeURIComponent(s))
    .join("/");
  return `${repoUrl}/blob/${encodedBranch}/${encodedPath}`;
}

/**
 * Parses and validates a GitHub repository, tree (folder), blob (file), or profile URL.
 * Cleans malformed duplicate slashes cleanly and rejects invalid hosts/paths gracefully.
 */
export function parseGitHubUrl(rawUrl) {
  if (typeof rawUrl !== "string" || !rawUrl.trim()) {
    return { isValid: false, isRepo: false, error: "GitHub URL is not configured." };
  }

  let parsed;
  try {
    parsed = new URL(rawUrl.trim());
  } catch {
    return { isValid: false, isRepo: false, error: "Malformed GitHub URL." };
  }

  if (!["github.com", "www.github.com"].includes(parsed.hostname.toLowerCase())) {
    return { isValid: false, isRepo: false, error: "URL does not point to github.com." };
  }

  const segments = parsed.pathname
    .replace(/\/+/g, "/")
    .replace(/^\/+|\/+$/g, "")
    .split("/")
    .filter(Boolean);

  if (segments.length === 0) {
    return { isValid: false, isRepo: false, error: "Missing GitHub username in URL." };
  }

  const owner = decodeURIComponent(segments[0]);
  if (segments.length === 1) {
    return {
      isValid: true,
      isRepo: false,
      kind: "profile",
      owner,
      canonicalUrl: `https://github.com/${encodeURIComponent(owner)}`,
    };
  }

  const repo = decodeURIComponent(segments[1]).replace(/\.git$/i, "");
  const repoUrl = buildGitHubRepoUrl(owner, repo);
  if (!repoUrl) {
    return { isValid: false, isRepo: false, error: "Invalid repository name." };
  }

  if (segments.length >= 4 && (segments[2] === "tree" || segments[2] === "blob")) {
    const kind = segments[2];
    const branch = decodeURIComponent(segments[3]);
    const subPath = normalizeGitHubPath(segments.slice(4).map(decodeURIComponent).join("/"));
    if (subPath === null) {
      return { isValid: false, isRepo: false, error: "Invalid GitHub path." };
    }
    const canonicalUrl =
      kind === "tree"
        ? buildGitHubTreeUrl(owner, repo, branch, subPath)
        : buildGitHubFileUrl(owner, repo, branch, subPath) || repoUrl;
    return {
      isValid: true,
      isRepo: true,
      kind,
      owner,
      repo,
      branch,
      initialPath: kind === "tree" ? subPath : "",
      filePath: kind === "blob" ? subPath : "",
      repoUrl,
      canonicalUrl,
    };
  }

  return {
    isValid: true,
    isRepo: true,
    kind: "repo",
    owner,
    repo,
    branch: "",
    initialPath: "",
    repoUrl,
    canonicalUrl: repoUrl,
  };
}

/**
 * Resolves clean GitHub link targets for a portfolio project.
 */
export function getProjectGitHubInfo(project) {
  const primary = parseGitHubUrl(project?.githubUrl);
  if (primary.isValid && primary.isRepo) {
    return primary;
  }
  const fallback = parseGitHubUrl(project?.profileGithubFallback || personalInfo.social.github);
  if (fallback.isValid) {
    return fallback;
  }
  return {
    isValid: false,
    isRepo: false,
    canonicalUrl: personalInfo.social.github,
    repoUrl: personalInfo.social.github,
    error: primary.error || "GitHub repository unavailable.",
  };
}

/**
 * Fetches GitHub repository metadata (real default_branch, visibility, existence).
 */
export async function fetchGitHubRepoMetadata(owner, repo) {
  const key = `${owner}/${repo}`.toLowerCase();
  if (repoMetaCache.has(key)) {
    return repoMetaCache.get(key);
  }

  const pending = (async () => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`,
        { headers: { Accept: "application/vnd.github+json" } }
      );
      if (response.status === 404) {
        return { ok: false, status: 404, error: "Repository not found or is private on GitHub." };
      }
      if (response.status === 403 || response.status === 429) {
        return {
          ok: false,
          status: response.status,
          error: "GitHub API rate limit reached temporarily; direct repository link remains available.",
        };
      }
      if (!response.ok) {
        return { ok: false, status: response.status, error: "Unable to load GitHub repository metadata." };
      }
      const data = await response.json();
      return {
        ok: true,
        defaultBranch: data.default_branch || "main",
        htmlUrl: data.html_url || buildGitHubRepoUrl(owner, repo),
        description: data.description || "",
        stargazersCount: data.stargazers_count ?? 0,
      };
    } catch {
      return { ok: false, status: 0, error: "Network error while contacting GitHub." };
    }
  })();

  repoMetaCache.set(key, pending);
  return pending;
}

/**
 * Fetches real directories and files from GitHub REST API for a given repository,
 * branch, and folder path, attaching canonical /tree/BRANCH/PATH and /blob/BRANCH/PATH URLs.
 */
export async function fetchGitHubDirectoryContents(owner, repo, branch = "", folderPath = "") {
  const normalizedPath = normalizeGitHubPath(folderPath);
  if (!owner || !repo || normalizedPath === null) {
    return { ok: false, error: "Invalid GitHub repository or directory path.", items: [] };
  }

  let resolvedBranch = typeof branch === "string" ? branch.trim() : "";
  if (!resolvedBranch) {
    const meta = await fetchGitHubRepoMetadata(owner, repo);
    if (!meta.ok) {
      return { ok: false, status: meta.status, error: meta.error, items: [], branch: "main" };
    }
    resolvedBranch = meta.defaultBranch;
  }

  const cacheKey = `${owner}/${repo}@${resolvedBranch}:${normalizedPath}`.toLowerCase();
  if (dirContentsCache.has(cacheKey)) {
    return dirContentsCache.get(cacheKey);
  }

  const pending = (async () => {
    const encodedPath = encodeGitHubSegments(normalizedPath);
    const apiPath = encodedPath ? `/${encodedPath}` : "";
    const endpoint = `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contents${apiPath}?ref=${encodeURIComponent(resolvedBranch)}`;

    try {
      const response = await fetch(endpoint, { headers: { Accept: "application/vnd.github+json" } });
      if (response.status === 404) {
        return {
          ok: false,
          status: 404,
          branch: resolvedBranch,
          error: normalizedPath
            ? `Directory "${normalizedPath}" was not found on branch "${resolvedBranch}".`
            : "Repository contents were not found.",
          items: [],
        };
      }
      if (response.status === 403 || response.status === 429) {
        return {
          ok: false,
          status: response.status,
          branch: resolvedBranch,
          error: "GitHub API rate limit reached temporarily; you can still open the repository directly.",
          items: [],
        };
      }
      if (!response.ok) {
        return {
          ok: false,
          status: response.status,
          branch: resolvedBranch,
          error: "Unable to load GitHub directory contents.",
          items: [],
        };
      }

      const raw = await response.json();
      if (!Array.isArray(raw)) {
        // Path points to a single file rather than a folder
        const fileUrl = buildGitHubFileUrl(owner, repo, resolvedBranch, raw.path || normalizedPath);
        return {
          ok: true,
          branch: resolvedBranch,
          isSingleFile: true,
          items: [
            {
              name: raw.name,
              path: raw.path,
              type: "file",
              size: raw.size ?? 0,
              githubUrl: fileUrl || raw.html_url,
            },
          ],
        };
      }

      const items = raw
        .map((entry) => {
          const isDir = entry.type === "dir";
          const entryUrl = isDir
            ? buildGitHubTreeUrl(owner, repo, resolvedBranch, entry.path)
            : buildGitHubFileUrl(owner, repo, resolvedBranch, entry.path);
          return {
            name: entry.name,
            path: entry.path,
            type: isDir ? "dir" : "file",
            size: entry.size ?? 0,
            githubUrl: entryUrl || entry.html_url,
          };
        })
        .filter((item) => Boolean(item.githubUrl))
        .sort((a, b) => {
          if (a.type !== b.type) return a.type === "dir" ? -1 : 1;
          return a.name.localeCompare(b.name);
        });

      return {
        ok: true,
        branch: resolvedBranch,
        items,
      };
    } catch {
      return {
        ok: false,
        status: 0,
        branch: resolvedBranch,
        error: "Unable to reach GitHub right now.",
        items: [],
      };
    }
  })();

  dirContentsCache.set(cacheKey, pending);
  return pending;
}
