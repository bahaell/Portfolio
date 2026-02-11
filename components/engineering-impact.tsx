"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { cn } from "@/lib/utils"
import experienceData from "@/data/experience.json"

/* ── Types ─────────────────────────────────────────────────── */

interface ExperienceContext {
  type: string
  timeframe: string
  team: string
}

interface Experience {
  id: string
  context: ExperienceContext
  problem: string
  decisions: string[]
  outcome: string
  relatedProject: string | null
  relatedNote: string | null
}

interface ExperienceData {
  title: string
  introduction: string
  experiences: Experience[]
}

const data: ExperienceData = experienceData

/* ── Experience Block ──────────────────────────────────────── */

function ExperienceBlock({
  experience,
  index,
  isVisible,
}: {
  experience: Experience
  index: number
  isVisible: boolean
}) {
  return (
    <article
      className={cn(
        "relative opacity-0",
        isVisible && "animate-fade-in-up",
      )}
      style={{ animationDelay: `${index * 120 + 200}ms` }}
    >
      {/* Context line */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-5">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
          {experience.context.type}
        </span>
        <span className="text-border">{"/"}</span>
        <span className="font-mono text-xs text-muted-foreground">
          {experience.context.timeframe}
        </span>
        <span className="text-border">{"/"}</span>
        <span className="font-mono text-xs text-muted-foreground">
          {experience.context.team}
        </span>
      </div>

      {/* Problem */}
      <div className="mb-6">
        <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-2">
          Problem
        </h3>
        <p className="text-sm sm:text-base text-foreground/90 leading-relaxed max-w-2xl">
          {experience.problem}
        </p>
      </div>

      {/* Engineering Decisions */}
      <div className="mb-6">
        <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
          Engineering Decisions
        </h3>
        <ul className="space-y-2.5 max-w-2xl">
          {experience.decisions.map((decision, i) => (
            <li key={i} className="flex items-start gap-3">
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60"
                aria-hidden="true"
              />
              <span className="text-sm text-foreground/80 leading-relaxed">
                {decision}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Outcome */}
      <div className="mb-2">
        <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-2">
          Outcome
        </h3>
        <p className="text-sm sm:text-base text-foreground/90 leading-relaxed max-w-2xl">
          {experience.outcome}
        </p>
      </div>

      {/* Optional links */}
      {(experience.relatedProject || experience.relatedNote) && (
        <div className="flex flex-wrap gap-4 mt-4">
          {experience.relatedProject && (
            <a
              href={experience.relatedProject}
              className="font-mono text-xs text-primary underline-animate hover:text-primary/80 transition-colors"
            >
              View related project
            </a>
          )}
          {experience.relatedNote && (
            <a
              href={experience.relatedNote}
              className="font-mono text-xs text-primary underline-animate hover:text-primary/80 transition-colors"
            >
              Read engineering note
            </a>
          )}
        </div>
      )}
    </article>
  )
}

/* ── Main Section ──────────────────────────────────────────── */

export function EngineeringImpact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

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
      threshold: 0.05,
      rootMargin: "0px 0px -40px 0px",
    })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [handleIntersection])

  return (
    <section
      ref={sectionRef}
      className="px-4 sm:px-6 py-20 sm:py-28 border-t border-border/30"
    >
      <div className="mx-auto max-w-4xl">
        {/* Section header */}
        <div
          className={cn(
            "mb-14 sm:mb-20 space-y-3 opacity-0",
            isVisible && "animate-fade-in-up",
          )}
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-primary">
            Impact
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {data.title}
          </h2>
          <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            {data.introduction}
          </p>
        </div>

        {/* Experience blocks */}
        <div className="space-y-0">
          {data.experiences.map((experience, index) => (
            <div key={experience.id}>
              <ExperienceBlock
                experience={experience}
                index={index}
                isVisible={isVisible}
              />

              {/* Separator between blocks */}
              {index < data.experiences.length - 1 && (
                <div className="my-12 sm:my-16 flex items-center gap-4">
                  <div className="h-px flex-1 bg-border/30" />
                  <div className="h-1.5 w-1.5 rounded-full bg-border/50" />
                  <div className="h-px flex-1 bg-border/30" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
