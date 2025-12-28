"use client"

import * as React from "react"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, Loader2, Command, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useKeyboardShortcuts } from "@/components/spotlight/useKeyboardShortcuts"
import { SearchResults } from "@/components/spotlight/SearchResults"
import { SearchResult } from "@/lib/types"
import { cn } from "@/lib/utils"

// Default suggestions when search is empty
const DEFAULT_SUGGESTIONS: SearchResult[] = [
  {
    id: "experience",
    type: "navigation",
    title: "Experience",
    subtitle: "My professional journey & timeline",
    url: "/experience",
    icon: <span className="text-xl">💼</span>,
    shortcut: "Cmd+1"
  },
  {
    id: "projects",
    type: "navigation",
    title: "Projects",
    subtitle: "Showcase of my recent work",
    url: "/projects",
    icon: <span className="text-xl">🚀</span>,
    shortcut: "Cmd+2"
  },
  {
    id: "contact",
    type: "navigation",
    title: "Contact",
    subtitle: "Get in touch with me",
    url: "/contact",
    icon: <span className="text-xl">📧</span>,
    shortcut: "Cmd+3"
  },
  {
    id: "about",
    type: "navigation",
    title: "About Me",
    subtitle: "Skills, education, and interests",
    url: "/about",
    icon: <span className="text-xl">👋</span>,
    shortcut: "Cmd+4"
  }
];

export function SpotlightSearch() {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<SearchResult[]>(DEFAULT_SUGGESTIONS)
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Handle keyboard shortcuts
  useKeyboardShortcuts({
    onOpen: () => {
      setIsOpen(true)
      inputRef.current?.focus()
    },
    onClose: () => setIsOpen(false),
    onNavigate: (index) => {
      // Direct navigation via shortcuts (Cmd+1, etc.)
      const target = results[index];
      if (target) handleSelect(target);
    },
    onSelect: () => handleSelect(results[selectedIndex]),
    onArrowDown: () => setSelectedIndex(prev => (prev + 1) % results.length),
    onArrowUp: () => setSelectedIndex(prev => (prev - 1 + results.length) % results.length),
  })

  // AI Search Integration
  useEffect(() => {
    if (!query || query.length < 2) {
      setResults(DEFAULT_SUGGESTIONS)
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    const timer = setTimeout(async () => {
      try {
        const response = await fetch('/api/ai-search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query })
        });

        if (!response.ok) throw new Error('Search failed');

        const data = await response.json();
        
        // Map intent to a relevant result
        const intentMap: Record<string, SearchResult> = {
          'experience': {
            id: 'ai-exp', type: 'experience', title: 'Experience', subtitle: data.reasoning || 'View my work history', url: '/experience', icon: <span className="text-xl">💼</span>, shortcut: '↵'
          },
          'projects': {
            id: 'ai-proj', type: 'project', title: 'Projects', subtitle: data.reasoning || 'View my projects', url: '/projects', icon: <span className="text-xl">🚀</span>, shortcut: '↵'
          },
          'contact': {
            id: 'ai-contact', type: 'action', title: 'Contact', subtitle: data.reasoning || 'Get in touch', url: '/contact', icon: <span className="text-xl">📧</span>, shortcut: '↵'
          },
          'about': {
             id: 'ai-about', type: 'navigation', title: 'About Me', subtitle: data.reasoning || 'Learn more about me', url: '/about', icon: <span className="text-xl">👋</span>, shortcut: '↵'
          },
          'home': {
             id: 'ai-home', type: 'navigation', title: 'Home', subtitle: data.reasoning || 'Back to start', url: '/', icon: <span className="text-xl">🏠</span>, shortcut: '↵'
          }
        };

        const topResult = intentMap[data.intent];
        const newResults = topResult ? [topResult, ...DEFAULT_SUGGESTIONS.filter(r => r.url !== topResult.url)] : DEFAULT_SUGGESTIONS;
        
        setResults(newResults);
        setSelectedIndex(0);
      } catch (error) {
        console.error("Search error:", error);
        // Fallback to default filtering
        const filtered = DEFAULT_SUGGESTIONS.filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase()) || 
            item.subtitle.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered.length > 0 ? filtered : []);
      } finally {
        setIsLoading(false);
      }
    }, 600); // 600ms debounce

    return () => clearTimeout(timer)
  }, [query])

  const handleSelect = (result: SearchResult) => {
    if (!result) return
    
    // Animate out?
    setIsOpen(false)
    router.push(result.url)
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto font-sans z-50">
      {/* Search Input Container */}
      <motion.div
        layoutId="spotlight-container"
        className={cn(
          "relative flex items-center w-full h-16 rounded-2xl border transition-all duration-300",
          "bg-white/40 dark:bg-black/40 backdrop-blur-2xl shadow-2xl",
          "border-white/20 ring-1 ring-white/10",
          isOpen || query ? "rounded-b-none border-b-0" : ""
        )}
      >
        <div className="pl-5 pr-3 text-muted-foreground">
          {isLoading ? (
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          ) : (
            <Search className="w-6 h-6" />
          )}
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Ask me anything or navigate..."
          className="flex-1 bg-transparent border-none outline-none text-xl text-foreground placeholder:text-muted-foreground/60 h-full w-full"
          spellCheck={false}
        />

        <div className="pr-4 flex items-center gap-2">
           {!query && (
             <div className="flex items-center gap-1 text-xs text-muted-foreground bg-white/10 px-2 py-1 rounded">
               <Command className="w-3 h-3" />
               <span>K</span>
             </div>
           )}
           {query && (
             <div className="text-xs text-primary font-medium animate-pulse flex items-center gap-1">
               <Sparkles className="w-3 h-3" />
               AI
             </div>
           )}
        </div>
      </motion.div>

      {/* Results Dropdown */}
      <AnimatePresence>
        {(isOpen || query.length > 0) && (
          <SearchResults 
            results={results} 
            selectedIndex={selectedIndex}
            onSelect={handleSelect}
            onHover={setSelectedIndex}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
