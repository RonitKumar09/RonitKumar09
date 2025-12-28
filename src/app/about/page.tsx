"use client"

import { motion } from "framer-motion"
import { ArrowLeft, GraduationCap, Code2, Database, Terminal, Layout } from "lucide-react"
import Link from "next/link"
import { SKILLS_DATA, EDUCATION_DATA } from "@/data/skills"

export default function AboutPage() {
  const categories = [
    { name: "Frontend", icon: Layout, skills: SKILLS_DATA.frontend },
    { name: "Backend", icon: Code2, skills: SKILLS_DATA.backend },
    { name: "Databases", icon: Database, skills: SKILLS_DATA.databases },
    { name: "Testing & Tools", icon: Terminal, skills: [...SKILLS_DATA.testing, ...SKILLS_DATA.tooling] },
  ]

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
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-16"
      >
        {/* Intro */}
        <section className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">About Me</h1>
          <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed">
            <p>
              Hi, I'm Ronit Kumar. I'm a passionate Frontend & Full Stack Developer with over 4 years of experience (including internships) in building scalable web applications.
              Currently based in Bengaluru, I specialize in the JavaScript ecosystem, focusing on React, Next.js, and automated testing with Playwright.
            </p>
            <p className="mt-4">
              I value clear code, ownership, and practical engineering. Whether it's optimizing huge data dashboards or building smooth user interfaces, I love solving complex problems.
            </p>
          </div>
        </section>

        {/* Skills */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Technical Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((cat, idx) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-card/30 border border-white/5 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <cat.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-medium text-foreground">{cat.name}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span 
                      key={skill}
                      className="px-2.5 py-1 text-sm rounded-md bg-white/5 hover:bg-white/10 transition-colors border border-white/5"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold flex items-center gap-3">
             <GraduationCap className="w-6 h-6 text-primary" />
             Education
          </h2>
          <div className="p-6 rounded-2xl bg-card/30 border border-white/5 backdrop-blur-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">{EDUCATION_DATA.university}</h3>
              <p className="text-muted-foreground">{EDUCATION_DATA.degree} in {EDUCATION_DATA.field}</p>
            </div>
            <div className="text-right md:text-left">
              <span className="block text-sm font-medium text-primary">{EDUCATION_DATA.graduation_year}</span>
              <span className="text-xs text-muted-foreground">CGPA: {EDUCATION_DATA.cgpa}</span>
            </div>
          </div>
        </section>
      </motion.div>
    </div>
  )
}
