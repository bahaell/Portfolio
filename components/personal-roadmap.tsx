"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { cn } from "@/lib/utils"
import roadmapData from "@/data/roadmap.json"

/* ── Types (mirroring JSON shape) ──────────────────────────── */

interface Topic {
  id: string
  title: string
  hint: string
}

interface Domain {
  id: string
  title: string
  purpose: string
  topics: Topic[]
}

interface RoadmapData {
  title: string
  introduction: string
  domains: Domain[]
}

const data: RoadmapData = roadmapData

/* ── Topic node ────────────────────────────────────────────── */

function TopicNode({ topic }: { topic: Topic }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div className="relative flex flex-col items-center w-full">
      {/* Vertical connector to topic */}
      <div className="w-px h-4 bg-primary/25" />

      <div
        className="relative w-full max-w-sm sm:max-w-md"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className={cn(
            "flex items-center gap-3 rounded-lg border px-3 sm:px-4 py-2.5 sm:py-3 transition-all duration-300",
            "border-border/30 bg-card/20 backdrop-blur-sm",
            hovered && "border-primary/40 bg-card/40",
          )}
        >
          {/* Dot indicator */}
          <div
            className={cn(
              "h-2 w-2 shrink-0 rounded-full transition-all duration-300",
              hovered
                ? "bg-primary shadow-[0_0_8px_2px] shadow-primary/40"
                : "bg-border",
            )}
          />

          <div className="flex-1 min-w-0">
            <span className="font-mono text-xs sm:text-sm text-foreground/90 block truncate">
              {topic.title}
            </span>

            {/* Hint revealed on hover */}
            <div
              className={cn(
                "grid transition-all duration-300 ease-in-out",
                hovered
                  ? "grid-rows-[1fr] opacity-100 mt-1"
                  : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {topic.hint}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Domain node (Level 1) ─────────────────────────────────── */

function DomainNode({
  domain,
  index,
  isLast,
  isExpanded,
  onToggle,
}: {
  domain: Domain
  index: number
  isLast: boolean
  isExpanded: boolean
  onToggle: () => void
}) {
  return (
    <div className="relative flex flex-col items-center">
      {/* Spine connector from previous */}
      {index > 0 && <div className="w-px h-6 sm:h-8 bg-border/50" />}

      {/* Domain button */}
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          "group relative flex items-center gap-4 rounded-xl border px-4 sm:px-6 py-3 sm:py-4 transition-all duration-300 w-full max-w-md sm:max-w-lg cursor-pointer",
          "glass border-border/50 hover:border-primary/50",
          isExpanded && "border-primary/60 bg-primary/5",
        )}
      >
        {/* Index marker */}
        <div
          className={cn(
            "flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg border font-mono text-xs sm:text-sm font-medium transition-all duration-300",
            isExpanded
              ? "border-primary/60 bg-primary/15 text-primary"
              : "border-border/50 bg-card/50 text-muted-foreground group-hover:border-primary/40 group-hover:text-primary",
          )}
        >
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Title + purpose */}
        <div className="flex-1 text-left">
          <span className="font-mono text-sm sm:text-base font-medium tracking-tight text-foreground">
            {domain.title}
          </span>
          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
            {domain.purpose}
          </p>
        </div>

        {/* Expand indicator */}
        <div
          className={cn(
            "h-4 w-4 shrink-0 border-r-2 border-b-2 transition-transform duration-300",
            isExpanded
              ? "rotate-[225deg] border-primary translate-y-0.5"
              : "rotate-45 border-muted-foreground group-hover:border-primary -translate-y-0.5",
          )}
        />
      </button>

      {/* Expandable topics */}
      <div
        className={cn(
          "grid transition-all duration-400 ease-in-out overflow-hidden w-full",
          isExpanded
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col items-center pt-1">
            {domain.topics.map((topic) => (
              <TopicNode key={topic.id} topic={topic} />
            ))}
          </div>
        </div>
      </div>

      {/* Spine connector to next */}
      {!isLast && (
        <div
          className={cn(
            "w-px h-6 sm:h-8",
            isExpanded ? "bg-primary/30" : "bg-border/50",
          )}
        />
      )}
    </div>
  )
}

/* ── Main section ──────────────────────────────────────────── */

export function PersonalRoadmap() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0]?.isIntersecting) {
        setIsVisible(true)
      }
    },
    [],
  )

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [handleIntersection])

  const handleToggle = useCallback((id: string) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }, [])

  return (
    <section
      ref={sectionRef}
      className="px-4 sm:px-6 py-20 sm:py-28 border-t border-border/30"
    >
      <div className="mx-auto max-w-4xl">
        {/* Section header */}
        <div
          className={cn(
            "mb-12 sm:mb-16 space-y-3 opacity-0",
            isVisible && "animate-fade-in-up",
          )}
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-primary">
            Roadmap
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {data.title}
          </h2>
          <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            {data.introduction}
          </p>
        </div>

        {/* Roadmap spine */}
        <div className="flex flex-col items-center">
          {/* Top pulse dot */}
          <div
            className={cn(
              "h-3 w-3 rounded-full bg-primary animate-pulse-glow mb-2 opacity-0",
              isVisible && "animate-fade-in stagger-1",
            )}
          />

          {data.domains.map((domain, index) => (
            <div
              key={domain.id}
              className={cn("w-full opacity-0", isVisible && "animate-fade-in-up")}
              style={{ animationDelay: `${index * 80 + 200}ms` }}
            >
              <DomainNode
                domain={domain}
                index={index}
                isLast={index === data.domains.length - 1}
                isExpanded={expandedId === domain.id}
                onToggle={() => handleToggle(domain.id)}
              />
            </div>
          ))}

          {/* Bottom terminal dot */}
          <div className="w-px h-6 sm:h-8 bg-border/50" />
          <div
            className={cn(
              "h-3 w-3 rounded-full border-2 border-primary/50 opacity-0",
              isVisible && "animate-fade-in stagger-8",
            )}
          />
        </div>
      </div>
    </section>
  )
}
