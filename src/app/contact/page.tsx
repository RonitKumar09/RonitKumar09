"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Mail, Send, Github, Linkedin, Loader2 } from "lucide-react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export default function ContactPage() {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setError("")
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error("Failed to send message")

      setSuccess(true)
      reset()
    } catch (err) {
      setError("Something went wrong. Please try again.")
    }
  }

  return (
    <div className="min-h-screen p-6 md:p-12 max-w-4xl mx-auto flex flex-col justify-center">
      <Link 
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">Get in Touch</h1>
            <p className="text-muted-foreground text-lg">
              Have a project in mind or just want to chat? I'd love to hear from you.
            </p>
          </div>

          <div className="space-y-4">
            <a 
              href="mailto:contactronitkumar@gmail.com" 
              className="flex items-center gap-4 p-4 rounded-xl bg-card/30 border border-white/5 hover:bg-card/50 transition-colors group"
            >
              <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">contactronitkumar@gmail.com</p>
              </div>
            </a>
            
             <a 
              href="https://linkedin.com/in/itsyourronit" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl bg-card/30 border border-white/5 hover:bg-card/50 transition-colors group"
            >
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500 group-hover:bg-blue-500/20 transition-colors">
                <Linkedin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">LinkedIn</p>
                <p className="font-medium">in/itsyourronit</p>
              </div>
            </a>

            <a 
              href="https://github.com/RonitKumar09" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl bg-card/30 border border-white/5 hover:bg-card/50 transition-colors group"
            >
              <div className="p-2 rounded-lg bg-zinc-500/10 text-zinc-500 group-hover:bg-zinc-500/20 transition-colors">
                <Github className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">GitHub</p>
                <p className="font-medium">RonitKumar09</p>
              </div>
            </a>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.2 }}
           className="bg-card/30 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl"
        >
          {success ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 mb-4">
                <Send className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold">Message Sent!</h3>
              <p className="text-muted-foreground">Thanks for reaching out. I'll get back to you soon.</p>
              <button 
                onClick={() => setSuccess(false)}
                className="mt-4 text-primary hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium ml-1">Name</label>
                <input
                  {...register("name")}
                  className={cn(
                    "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:ring-2 focus:ring-primary/50 transition-all",
                    errors.name && "border-red-500/50 focus:ring-red-500/20"
                  )}
                  placeholder="Your Name"
                />
                {errors.name && <p className="text-xs text-red-500 ml-1">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium ml-1">Email</label>
                <input
                  {...register("email")}
                  className={cn(
                    "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:ring-2 focus:ring-primary/50 transition-all",
                    errors.email && "border-red-500/50 focus:ring-red-500/20"
                  )}
                  placeholder="hello@example.com"
                />
                {errors.email && <p className="text-xs text-red-500 ml-1">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium ml-1">Message</label>
                <textarea
                  {...register("message")}
                  rows={4}
                  className={cn(
                    "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none",
                    errors.message && "border-red-500/50 focus:ring-red-500/20"
                  )}
                  placeholder="How can I help you?"
                />
                {errors.message && <p className="text-xs text-red-500 ml-1">{errors.message.message}</p>}
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  )
}
