"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SearchResult } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Command } from "lucide-react"

interface SearchResultsProps {
  results: SearchResult[]
  selectedIndex: number
  onSelect: (result: SearchResult) => void
  onHover: (index: number) => void
}

export function SearchResults({ results, selectedIndex, onSelect, onHover }: SearchResultsProps) {
  if (results.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute top-full left-0 right-0 mt-2 w-full overflow-hidden rounded-xl border border-white/20 bg-card/60 backdrop-blur-3xl shadow-2xl z-50 py-2"
    >
      <div className="px-2 pb-1 text-xs font-medium text-muted-foreground ml-2">
        Top Results
      </div>
      <ul className="space-y-0.5 px-2">
        {results.map((result, index) => (
          <li
            key={result.id}
            onMouseEnter={() => onHover(index)}
            onClick={() => onSelect(result)}
            className={cn(
              "group flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200",
              selectedIndex === index 
                ? "bg-primary text-primary-foreground shadow-sm" 
                : "text-foreground hover:bg-white/10 dark:hover:bg-white/5"
            )}
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-md border text-lg transition-colors",
                selectedIndex === index 
                  ? "border-transparent bg-white/20 text-white" 
                  : "border-border bg-gradient-to-br from-white/10 to-transparent"
              )}>
                {result.icon}
              </div>
              <div className="flex flex-col truncate">
                <span className="font-medium truncate">{result.title}</span>
                <span className={cn(
                  "text-xs truncate transition-colors",
                  selectedIndex === index 
                    ? "text-primary-foreground/80" 
                    : "text-muted-foreground"
                )}>
                  {result.subtitle}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {result.shortcut && (
                <div className={cn(
                  "flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[10px] font-medium transition-colors",
                  selectedIndex === index 
                    ? "bg-white/20 text-white" 
                    : "bg-muted text-muted-foreground"
                )}>
                  <span className="text-xs">⌘</span>
                  <span>{index + 1}</span>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
      
      {/* Visual footer hint */}
      <div className="mt-2 border-t border-white/10 px-4 py-2 flex items-center justify-between text-[10px] text-muted-foreground">
        <div className="flex gap-3">
          <span className="flex items-center gap-1">
            <kbd className="font-sans rounded bg-white/10 px-1 py-0.5">↩</kbd> to select
          </span>
          <span className="flex items-center gap-1">
            <kbd className="font-sans rounded bg-white/10 px-1 py-0.5">↑↓</kbd> to navigate
          </span>
        </div>
        <div className="flex items-center gap-1">
           <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
           AI Active
        </div>
      </div>
    </motion.div>
  )
}
