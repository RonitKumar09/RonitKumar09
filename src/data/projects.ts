export interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  company?: string;
}

export const PROJECTS_DATA: Project[] = [
  {
    title: "DC-Web & OI-Admin",
    description: "Core finance dashboards and reconciliation modules for OneInfinity. Built reusable UI components and optimized performance for complex data visualization.",
    tags: ["React.js", "Redux Toolkit", "React Query", "Highcharts", "Tailwind CSS"],
    company: "InfinityFlo Pvt. Ltd."
  },
  {
    title: "CubeNet Analytics",
    description: "Data-heavy dashboard application for managing complex datasets. Included advanced querying capabilities and dynamic reporting features.",
    tags: ["React.js", "TypeScript", "CubeJS", "TypeORM", "HighCharts"],
    company: "ITCube Solutions"
  },
  {
    title: "Enact Test Automation Suite",
    description: "Comprehensive end-to-end testing framework for enterprise applications (Terminator & C&B modules). Improved release confidence through automated regression testing.",
    tags: ["Playwright", "JavaScript", "Java", "Cucumber"],
    company: "Tavant Technologies"
  },
  {
    title: "Sports Analytics Platform",
    description: "Web application for analyzing sports performance metrics. Contributed to feature development and workflow efficiency for coaching staff.",
    tags: ["JavaScript", "Web Development", "Git"],
    company: "Digitrack Sports"
  },
  {
    title: "SIPO Web App",
    description: "Full-stack web application with admin panel for student placement management. Handled frontend and backend integration.",
    tags: ["React", "Redux", "Firebase", "Node.js"],
    company: "Edupillar"
  }
];
