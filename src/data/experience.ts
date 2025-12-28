export interface Role {
  company: string;
  payroll_company?: string;
  role: string;
  start_date: string;
  end_date: string;
  location?: string;
  duration?: string;
  technologies: string[];
  responsibilities: string[];
  projects?: string[];
}

export const EXPERIENCE_DATA: Role[] = [
  {
    company: "Quixent Deliverables Pvt. Ltd.",
    role: "Quality Analyst",
    start_date: "2025-10-17",
    end_date: "Present",
    location: "Bengaluru",
    technologies: ["TypeScript", "JavaScript", "Playwright", "Automated Testing"],
    responsibilities: [
      "Built and maintained end-to-end test automation using Playwright",
      "Ensured frontend quality across complex web applications"
    ]
  },
  {
    company: "InfinityFlo Pvt. Ltd. (OneInfinity)",
    role: "Frontend Developer",
    start_date: "2024-11-04",
    end_date: "2025-06-11",
    duration: "7 months",
    technologies: [
      "React.js", "Redux Toolkit", "React Query", "Highcharts", 
      "CubeJS", "TypeORM", "Node.js", "REST APIs", "Tailwind CSS"
    ],
    responsibilities: [
      "Delivered core finance dashboards and reconciliation flows used by ops teams",
      "Built reusable, scalable UI components improving maintainability and performance"
    ],
    projects: ["DC-Web", "OI-Admin", "DC-Web-Connector", "Reconciliation Module", "Finance Dashboard"]
  },
  {
    company: "Tavant Technologies",
    payroll_company: "Bloom Consulting Services",
    role: "JavaScript Developer",
    start_date: "2023-05",
    end_date: "2024-10",
    duration: "1 year 6 months",
    technologies: ["JavaScript", "Java", "Playwright", "Cucumber"],
    responsibilities: [
      "Designed and implemented automated testing suites for enterprise apps",
      "Collaborated with cross-functional teams to improve release quality"
    ],
    projects: ["Enact Terminator", "Enact C&B"]
  },
  {
    company: "ITCube Solutions Pvt. Ltd.",
    role: "Software Engineer (React + Redux)",
    start_date: "2022-02",
    end_date: "2023-03",
    duration: "1 year 1 month",
    technologies: [
      "React.js", "Redux", "TypeScript", "Node.js", 
      "React Query", "HighCharts", "TypeORM", "CubeJS"
    ],
    responsibilities: [
      "Built data-heavy dashboards improving decision visibility for management",
      "Optimized data querying and frontend performance"
    ],
    projects: ["CubeNet", "Compex Analytics"]
  }
];

export const INTERNSHIP_DATA: Role[] = [
  {
    company: "Twenty Twenty Interior Design Software India Pvt. Ltd.",
    role: "Software Development Engineer - Trainee",
    start_date: "Jul 2021",
    end_date: "Oct 2021",
    technologies: ["React.js", "Backbone.js", "jQuery"],
    responsibilities: [
      "Worked on legacy frontend systems and modern React components",
      "Fixed production bugs and improved performance"
    ]
  },
  {
    company: "Digitrack Sports Pvt. Ltd.",
    role: "Software Developer - Trainee",
    start_date: "Feb 2021",
    end_date: "Jul 2021",
    technologies: ["JavaScript", "Web Development", "Git"],
    responsibilities: [
      "Contributed to a sports analytics web application",
      "Improved feature efficiency and team workflows"
    ]
  },
  {
    company: "Edupillar",
    role: "React Redux Intern",
    start_date: "Jun 2020",
    end_date: "Aug 2020",
    technologies: ["React", "Redux", "Firebase", "Webpack", "ESLint"],
    responsibilities: [
      "Built SIPO web app and parallel admin panel",
      "Deployed applications and improved admin efficiency"
    ]
  }
];
