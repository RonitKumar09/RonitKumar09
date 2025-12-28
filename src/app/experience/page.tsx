"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Calendar, MapPin, Briefcase } from "lucide-react"
import Link from "next/link"
import { EXPERIENCE_DATA, INTERNSHIP_DATA, Role } from "@/data/experience"
import { cn } from "@/lib/utils"

function ExperienceCard({ role, index }: { role: Role, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative pl-8 pb-12 border-l border-white/10 last:pb-0"
    >
      <div className="absolute left-[-5px] top-0 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background" />
      
      <div className="flex flex-col gap-4 p-6 rounded-2xl bg-card/50 border border-white/5 backdrop-blur-md hover:bg-card/70 transition-colors">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-xl font-semibold text-foreground">{role.role}</h3>
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
              {role.start_date} - {role.end_date}
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Briefcase className="w-4 h-4" />
            <span className="font-medium text-foreground/80">{role.company}</span>
            {role.payroll_company && (
              <span className="text-xs text-muted-foreground/60">
                (via {role.payroll_company})
              </span>
            )}
          </div>
          
          {role.location && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground/60">
              <MapPin className="w-3 h-3" />
              {role.location}
            </div>
          )}
        </div>

        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
          {role.responsibilities.map((resp, i) => (
            <li key={i}>{resp}</li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 pt-2">
          {role.technologies.map((tech) => (
            <span 
              key={tech} 
              className="px-2 py-1 text-xs rounded-md bg-white/5 border border-white/10 text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function ExperiencePage() {
  return (
    <div className="min-h-screen p-6 md:p-12 max-w-4xl mx-auto">
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
          <h1 className="text-3xl font-bold tracking-tight">Experience</h1>
          <p className="text-muted-foreground">
            Professional journey, roles, and impactful contributions.
          </p>
        </div>

        <div className="space-y-16">
          <section>
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-primary"></span>
              Full Time Roles
            </h2>
            <div className="ml-2">
              {EXPERIENCE_DATA.map((role, index) => (
                <ExperienceCard key={index} role={role} index={index} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-primary"></span>
              Internships
            </h2>
            <div className="ml-2">
              {INTERNSHIP_DATA.map((role, index) => (
                <ExperienceCard key={index} role={role} index={index + EXPERIENCE_DATA.length} />
              ))}
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  )
}
