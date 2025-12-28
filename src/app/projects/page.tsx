"use client"

import { motion } from "framer-motion"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"
import Link from "next/link"
import { PROJECTS_DATA, Project } from "@/data/projects"

function ProjectCard({ project, index }: { project: Project, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className="group relative flex flex-col justify-between p-6 rounded-2xl bg-card/40 border border-white/5 backdrop-blur-md hover:bg-card/60 transition-all hover:scale-[1.02] hover:shadow-2xl"
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>
        
        {project.company && (
          <div className="text-xs font-medium text-muted-foreground/60 uppercase tracking-wider">
            {project.company}
          </div>
        )}
        
        <p className="text-sm text-muted-foreground leading-relaxed">
          {project.description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span 
            key={tag} 
            className="px-2 py-1 text-[10px] font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen p-6 md:p-12 max-w-6xl mx-auto">
      <Link 
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12"
      >
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            A selection of my work in frontend development, automation, and dashboard analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS_DATA.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
