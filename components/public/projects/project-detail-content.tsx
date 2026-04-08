"use client"

import React from "react"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { ArrowLeft, Github, ExternalLink, ChevronDown, Play, Pause } from "lucide-react"
import Link from "next/link"
import type { ProjectDetail } from "@/data/projects"

/* ── Scroll reveal hook ───────────────────────────────────── */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}

/* ── Shared section primitives ────────────────────────────── */
function SectionLabel({ label }: { label: string }) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">
      {label}
    </p>
  )
}

function NarrativeSection({
  label,
  children,
  delay = 0,
}: {
  label: string
  children: React.ReactNode
  delay?: number
}) {
  const { ref, isVisible } = useScrollReveal()
  return (
    <div
      ref={ref}
      className={cn(
        "py-16 sm:py-20 border-t border-border/30 opacity-0 translate-y-6 transition-all duration-700 ease-out",
        isVisible && "opacity-100 translate-y-0",
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <SectionLabel label={label} />
      {children}
    </div>
  )
}

/* ── AWS service icon helpers ────────────────────────────────── */
const awsServices = [
  { name: "VPC", icon: "network" },
  { name: "EC2", icon: "server" },
  { name: "ECS Fargate", icon: "container" },
  { name: "ECR", icon: "registry" },
  { name: "ALB", icon: "balancer" },
  { name: "RDS", icon: "database" },
  { name: "S3", icon: "storage" },
  { name: "CloudFront", icon: "cdn" },
  { name: "CloudWatch", icon: "monitor" },
  { name: "SNS", icon: "notify" },
  { name: "CloudTrail", icon: "audit" },
  { name: "IAM", icon: "security" },
]

function ServiceIcon({ type, className }: { type: string; className?: string }) {
  const cls = cn("h-5 w-5", className)
  switch (type) {
    case "network":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A8.966 8.966 0 0 1 3 12c0-1.257.26-2.453.727-3.538" />
        </svg>
      )
    case "server":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z" />
        </svg>
      )
    case "container":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
        </svg>
      )
    case "registry":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
        </svg>
      )
    case "balancer":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
        </svg>
      )
    case "database":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
        </svg>
      )
    case "storage":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
        </svg>
      )
    case "cdn":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A8.966 8.966 0 0 1 3 12c0-1.257.26-2.453.727-3.538" />
        </svg>
      )
    case "monitor":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
        </svg>
      )
    case "notify":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
        </svg>
      )
    case "audit":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
        </svg>
      )
    case "security":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
          <circle cx="12" cy="12" r="9" />
        </svg>
      )
  }
}

/* ── AWS Services strip ───────────────────────────────────── */
function AwsServicesStrip() {
  const { ref, isVisible } = useScrollReveal()
  return (
    <div
      ref={ref}
      className={cn(
        "py-12 sm:py-16 border-t border-border/30 opacity-0 translate-y-6 transition-all duration-700 ease-out",
        isVisible && "opacity-100 translate-y-0",
      )}
    >
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-8">
        AWS Services Used
      </p>
      <div className="flex flex-wrap gap-4" role="list" aria-label="AWS services">
        {awsServices.map((service, i) => (
          <div
            key={service.name}
            className="flex items-center gap-2.5 rounded-lg border border-border/50 bg-secondary/30 px-4 py-2.5 font-mono text-xs text-muted-foreground transition-all duration-300 hover:border-primary/40 hover:text-primary hover:bg-primary/5"
            style={{ animationDelay: `${i * 50}ms` }}
            role="listitem"
          >
            <ServiceIcon type={service.icon} className="h-4 w-4" />
            <span>{service.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Tech stack strip (AWS) ──────────────────────────────── */
const awsTechStackItems = [
  { name: "AWS", label: "Cloud Platform" },
  { name: "Docker", label: "Containerization" },
  { name: "PostgreSQL", label: "Database" },
  { name: "Nginx", label: "Reverse Proxy" },
  { name: "CloudFormation", label: "IaC" },
]

function TechStackStrip({ items }: { items: { name: string; label: string }[] }) {
  const { ref, isVisible } = useScrollReveal()
  return (
    <div
      ref={ref}
      className={cn(
        "py-12 sm:py-16 border-t border-border/30 opacity-0 translate-y-6 transition-all duration-700 ease-out",
        isVisible && "opacity-100 translate-y-0",
      )}
    >
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-8">
        Tech Stack
      </p>
      <div className="flex flex-wrap gap-6">
        {items.map((item) => (
          <div key={item.name} className="flex flex-col items-center gap-1.5">
            <span className="font-mono text-sm font-medium text-foreground">{item.name}</span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── SaaS project: Tech Stack ─────────────────────────────── */
const saasTechStack = [
  { name: "Next.js", label: "App Router" },
  { name: "TypeScript", label: "Language" },
  { name: "Tailwind CSS", label: "Styling" },
  { name: "MongoDB", label: "Database" },
  { name: "Mongoose", label: "ODM" },
  { name: "Auth.js", label: "Auth (Planned)" },
  { name: "Vercel", label: "Deployment" },
]

/* ── SaaS project: Features Split ─────────────────────────── */
const implementedFeatures = [
  "Modular project system",
  "Engineering Notes / Technical content",
  "Dynamic project pages",
  "JSON-driven content structure",
  "Typed data schemas",
  "Project-specific rendering logic",
]

const plannedFeatures = [
  "Authentication & user dashboard",
  "Admin CMS for projects & notes",
  "Analytics (views, engagement)",
  "Content versioning",
  "Multi-portfolio support (future SaaS)",
  "Custom theming per tenant",
]

function FeaturesSplitSection() {
  const { ref, isVisible } = useScrollReveal()
  return (
    <div
      ref={ref}
      className={cn(
        "py-16 sm:py-20 border-t border-border/30 opacity-0 translate-y-6 transition-all duration-700 ease-out",
        isVisible && "opacity-100 translate-y-0",
      )}
    >
      <SectionLabel label="03 — Features Roadmap" />
      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-10 max-w-2xl">
        Current capabilities and planned extensions. Each planned feature builds on the existing architecture without requiring rewrites.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Implemented / In Progress</h4>
          </div>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {implementedFeatures.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-border/50 bg-secondary/20 p-6 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="h-2 w-2 rounded-full bg-yellow-500 animate-pulse" />
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Planned</h4>
          </div>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {plannedFeatures.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-muted-foreground/40 shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

/* ── SaaS project: Status Footer ──────────────────────────── */
function ProjectStatusFooter() {
  const { ref, isVisible } = useScrollReveal()
  return (
    <div
      ref={ref}
      className={cn(
        "py-16 sm:py-20 border-t border-border/30 opacity-0 translate-y-6 transition-all duration-700 ease-out",
        isVisible && "opacity-100 translate-y-0",
      )}
    >
      <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-500 opacity-40" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-yellow-500" />
          </span>
          <span className="font-mono text-sm font-medium text-foreground">Actively Building</span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed sm:border-l sm:border-border/50 sm:pl-4">
          This project is under active development and evolves alongside my engineering roadmap. Architecture and core systems are stable; new features are added incrementally.
        </p>
      </div>
    </div>
  )
}

/* ── Flutter/Mobile project: Tech Stack ─────────────────── */
const flutterTechStack = [
  { name: "Flutter", label: "Cross-platform UI" },
  { name: "Dart", label: "Language" },
  { name: "Firebase Auth", label: "Authentication" },
  { name: "Firestore", label: "Real-time Database" },
  { name: "TMDB API", label: "Movie Data" },
  { name: "Provider", label: "State Management" },
]

/* ── Flutter/Mobile: Role-Based Features Split ─────────── */
const userFeatures = [
  "Browse movies by category (popular, top-rated, now playing, upcoming)",
  "Genre-based filtering and debounced search",
  "Add/remove favorites with real-time Firestore sync",
  "View user matching based on shared favorites",
  "Cross-device favorites synchronization",
]

const adminFeatures = [
  "Search and import movies from TMDB into Firestore",
  "Normalize and validate movie data before insertion",
  "Manage user accounts (activate/deactivate)",
  "Real-time enforcement of user status changes",
  "Admin-only route protection at UI and logic layers",
]

function RoleBasedFeaturesSection() {
  const { ref, isVisible } = useScrollReveal()
  return (
    <div
      ref={ref}
      className={cn(
        "py-16 sm:py-20 border-t border-border/30 opacity-0 translate-y-6 transition-all duration-700 ease-out",
        isVisible && "opacity-100 translate-y-0",
      )}
    >
      <SectionLabel label="03 — Role-Based Architecture" />
      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-10 max-w-2xl">
        Two distinct user roles with entirely different workflows, protected at both the UI navigation and provider logic layers.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4 text-primary">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-primary">User Role</h4>
          </div>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {userFeatures.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-border/50 bg-secondary/20 p-6 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4 text-muted-foreground">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Admin Role</h4>
          </div>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {adminFeatures.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-muted-foreground/50 shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

/* ── Flutter/Mobile: Matching Algorithm Section ────────── */
function MatchingAlgorithmSection() {
  const { ref, isVisible } = useScrollReveal()
  const matchingSteps = [
    {
      step: "01",
      title: "Favorites Collection",
      detail: "Each user's favorites are stored as an array of movie IDs in their Firestore user document.",
    },
    {
      step: "02",
      title: "Intersection Computation",
      detail: "For each pair of users, compute the set intersection of their favorites arrays.",
    },
    {
      step: "03",
      title: "Edge Case Filtering",
      detail: "Filter out null users, empty favorites, single-user scenarios, and self-matches.",
    },
    {
      step: "04",
      title: "Relevance Scoring",
      detail: "Rank matches by intersection size. Minimum threshold applied to prevent noise matches.",
    },
    {
      step: "05",
      title: "Result Presentation",
      detail: "Display matched users with shared movie count and common titles. Sorted by match strength.",
    },
  ]

  return (
    <div
      ref={ref}
      className={cn(
        "py-16 sm:py-20 border-t border-border/30 opacity-0 translate-y-6 transition-all duration-700 ease-out",
        isVisible && "opacity-100 translate-y-0",
      )}
    >
      <SectionLabel label="04 — Matching System" />
      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-10 max-w-2xl">
        The favorites-based matching pipeline -- from data collection to ranked user suggestions.
      </p>

      <div className="rounded-xl border border-border/50 bg-secondary/20 p-6 sm:p-8">
        <div className="relative">
          {/* Vertical connector */}
          <div className="absolute left-[15px] sm:left-[17px] top-2 bottom-2 w-px bg-border/40" aria-hidden="true" />

          <div className="space-y-6">
            {matchingSteps.map((item, i) => (
              <div key={item.step} className="relative flex gap-4 sm:gap-5">
                <div className="relative z-10 flex shrink-0 items-start pt-0.5">
                  <div
                    className={cn(
                      "h-[8px] w-[8px] sm:h-[10px] sm:w-[10px] rounded-full border-2 border-primary bg-background transition-all duration-500",
                      isVisible && "bg-primary/20",
                    )}
                    style={{ transitionDelay: `${i * 80}ms` }}
                  />
                </div>
                <div
                  className={cn(
                    "flex-1 opacity-0 translate-y-2 transition-all duration-500 ease-out",
                    isVisible && "opacity-100 translate-y-0",
                  )}
                  style={{ transitionDelay: `${i * 80 + 40}ms` }}
                >
                  <div className="flex items-center gap-2.5 mb-1">
                    <span className="font-mono text-[10px] text-primary">{item.step}</span>
                    <h5 className="text-sm font-medium text-foreground">{item.title}</h5>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Blockchain-specific: Web3 Tech Stack ─────────────────── */
const web3TechStack = [
  { name: "Solidity", label: "Smart Contracts" },
  { name: "Ethereum", label: "Sepolia Testnet" },
  { name: "Hardhat", label: "Dev Framework" },
  { name: "React", label: "Frontend" },
  { name: "TypeScript", label: "Language" },
  { name: "Wagmi / Viem", label: "Contract Hooks" },
  { name: "RainbowKit", label: "Wallet UI" },
  { name: "IPFS / Pinata", label: "Decentralized Storage" },
  { name: "Node.js", label: "Off-chain API" },
  { name: "Xenova", label: "AI Embeddings" },
]

/* ── Blockchain-specific: Web3 Services strip with icons ──── */
function Web3ServiceIcon({ type, className }: { type: string; className?: string }) {
  const cls = cn("h-5 w-5", className)
  switch (type) {
    case "contract":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
      )
    case "chain":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
        </svg>
      )
    case "tool":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437" />
        </svg>
      )
    case "frontend":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
        </svg>
      )
    case "wallet":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1 0-6h.75A2.25 2.25 0 0 1 18 6v.008M21 12v6.75A2.25 2.25 0 0 1 18.75 21H5.25A2.25 2.25 0 0 1 3 18.75V5.25A2.25 2.25 0 0 1 5.25 3h13.5A2.25 2.25 0 0 1 21 5.25V12Z" />
        </svg>
      )
    case "storage":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
        </svg>
      )
    case "api":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z" />
        </svg>
      )
    case "ai":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={cls}>
          <circle cx="12" cy="12" r="9" />
        </svg>
      )
  }
}

const web3Services = [
  { name: "Solidity", icon: "contract" },
  { name: "Ethereum (Sepolia)", icon: "chain" },
  { name: "Hardhat", icon: "tool" },
  { name: "React + TypeScript", icon: "frontend" },
  { name: "Wagmi / Viem", icon: "chain" },
  { name: "RainbowKit", icon: "wallet" },
  { name: "IPFS / Pinata", icon: "storage" },
  { name: "Node.js + Express", icon: "api" },
  { name: "Xenova Transformers", icon: "ai" },
]

function Web3ServicesStrip() {
  const { ref, isVisible } = useScrollReveal()
  return (
    <div
      ref={ref}
      className={cn(
        "py-12 sm:py-16 border-t border-border/30 opacity-0 translate-y-6 transition-all duration-700 ease-out",
        isVisible && "opacity-100 translate-y-0",
      )}
    >
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-8">
        Web3 Stack
      </p>
      <div className="flex flex-wrap gap-4" role="list" aria-label="Web3 technologies">
        {web3Services.map((service, i) => (
          <div
            key={service.name}
            className="flex items-center gap-2.5 rounded-lg border border-border/50 bg-secondary/30 px-4 py-2.5 font-mono text-xs text-muted-foreground transition-all duration-300 hover:border-primary/40 hover:text-primary hover:bg-primary/5"
            style={{ animationDelay: `${i * 50}ms` }}
            role="listitem"
          >
            <Web3ServiceIcon type={service.icon} className="h-4 w-4" />
            <span>{service.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Blockchain-specific: User Flow Timeline ──────────────── */
const userFlowSteps = [
  {
    step: "01",
    title: "Item Declaration",
    description: "Owner reports a lost item. Image and metadata uploaded to IPFS. CID stored on-chain. Optional reward deposited to contract escrow.",
    layer: "On-chain + IPFS",
  },
  {
    step: "02",
    title: "Moderation & Approval",
    description: "Moderator reviews the declaration for validity. Approved items become visible and eligible for matching.",
    layer: "On-chain",
  },
  {
    step: "03",
    title: "AI Similarity Detection",
    description: "Off-chain service computes image embeddings (SigLIP/CLIP). Cosine similarity identifies potential matches between lost and found items.",
    layer: "Off-chain",
  },
  {
    step: "04",
    title: "Match Proposal",
    description: "AI results reported on-chain as match candidates. Both parties notified through contract events subscribed by the frontend.",
    layer: "On-chain + Off-chain",
  },
  {
    step: "05",
    title: "Mutual Confirmation",
    description: "Owner and finder independently confirm the match on-chain. Contact details progressively disclosed only after double confirmation.",
    layer: "On-chain",
  },
  {
    step: "06",
    title: "Physical Return & Reward",
    description: "After physical item return, both parties confirm on-chain. Smart contract automatically releases escrowed reward to the finder.",
    layer: "On-chain (Escrow)",
  },
]

function UserFlowTimeline() {
  const { ref, isVisible } = useScrollReveal()
  return (
    <div
      ref={ref}
      className={cn(
        "py-16 sm:py-20 border-t border-border/30 opacity-0 translate-y-6 transition-all duration-700 ease-out",
        isVisible && "opacity-100 translate-y-0",
      )}
    >
      <SectionLabel label="04 — User Flow Lifecycle" />
      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-10 max-w-2xl">
        The complete lifecycle of a lost item -- from declaration to reward transfer -- governed by deterministic smart contract logic.
      </p>

      <div className="relative">
        {/* Vertical spine */}
        <div className="absolute left-[19px] sm:left-[23px] top-0 bottom-0 w-px bg-border/50" aria-hidden="true" />

        <div className="space-y-0">
          {userFlowSteps.map((item, i) => (
            <div key={item.step} className="relative flex gap-5 sm:gap-6 pb-10 last:pb-0">
              {/* Node dot */}
              <div className="relative z-10 flex shrink-0 items-start pt-1">
                <div
                  className={cn(
                    "h-[10px] w-[10px] sm:h-[12px] sm:w-[12px] rounded-full border-2 border-primary bg-background transition-all duration-500",
                    isVisible && "bg-primary/20",
                  )}
                  style={{ transitionDelay: `${i * 100}ms` }}
                />
              </div>

              {/* Content */}
              <div
                className={cn(
                  "flex-1 opacity-0 translate-y-3 transition-all duration-500 ease-out",
                  isVisible && "opacity-100 translate-y-0",
                )}
                style={{ transitionDelay: `${i * 100 + 50}ms` }}
              >
                <div className="flex items-center gap-3 mb-1.5">
                  <span className="font-mono text-xs text-primary">{item.step}</span>
                  <h4 className="text-sm sm:text-base font-medium text-foreground">{item.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                  {item.description}
                </p>
                <span className="inline-block rounded-md border border-border/50 bg-secondary/30 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {item.layer}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Blockchain-specific: Smart Contract Design section ──── */
function SmartContractSection() {
  const { ref, isVisible } = useScrollReveal()
  return (
    <div
      ref={ref}
      className={cn(
        "py-16 sm:py-20 border-t border-border/30 opacity-0 translate-y-6 transition-all duration-700 ease-out",
        isVisible && "opacity-100 translate-y-0",
      )}
    >
      <SectionLabel label="03 — Smart Contract Design" />
      <div className="space-y-8">
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
          The core smart contract -- <span className="font-mono text-foreground">LostAndFound.sol</span> -- manages the entire item lifecycle through deterministic state machine logic, escrow-based rewards, and event-driven communication with off-chain services.
        </p>

        {/* Data models */}
        <div className="rounded-xl border border-border/50 bg-secondary/20 p-6 sm:p-8 space-y-6">
          <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Data Models & State Machines</h4>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-3">
              <h5 className="text-sm font-medium text-foreground">Item Struct</h5>
              <div className="font-mono text-xs text-muted-foreground leading-relaxed space-y-1">
                <p>{"owner: address"}</p>
                <p>{"ipfsCid: string"}</p>
                <p>{"reward: uint256"}</p>
                <p>{"status: ItemStatus"}</p>
                <p>{"timestamp: uint256"}</p>
              </div>
            </div>
            <div className="space-y-3">
              <h5 className="text-sm font-medium text-foreground">Match Struct</h5>
              <div className="font-mono text-xs text-muted-foreground leading-relaxed space-y-1">
                <p>{"lostItemId: uint256"}</p>
                <p>{"foundItemId: uint256"}</p>
                <p>{"similarity: uint8"}</p>
                <p>{"status: MatchStatus"}</p>
                <p>{"confirmedByOwner: bool"}</p>
                <p>{"confirmedByFinder: bool"}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-border/30 pt-6 grid gap-6 sm:grid-cols-2">
            <div className="space-y-3">
              <h5 className="text-sm font-medium text-foreground">ItemStatus Enum</h5>
              <div className="flex flex-wrap gap-2">
                {["LOST", "FOUND", "MATCHED", "RETURNED"].map((s) => (
                  <span key={s} className="rounded-md border border-primary/30 bg-primary/5 px-2.5 py-1 font-mono text-[11px] text-primary">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <h5 className="text-sm font-medium text-foreground">MatchStatus Enum</h5>
              <div className="flex flex-wrap gap-2">
                {["PENDING", "APPROVED", "CONFIRMED", "COMPLETED"].map((s) => (
                  <span key={s} className="rounded-md border border-primary/30 bg-primary/5 px-2.5 py-1 font-mono text-[11px] text-primary">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Key patterns */}
        <div className="space-y-6">
          <h4 className="text-sm font-medium text-foreground">Key Design Patterns</h4>
          <div className="space-y-4">
            {[
              {
                pattern: "Escrow Logic",
                detail: "ETH locked in contract on item declaration. Released to finder only after mutual confirmation of physical return. Refunded to owner if item is removed before matching.",
              },
              {
                pattern: "Event-Driven Architecture",
                detail: "All state transitions emit indexed events (ItemDeclared, MatchProposed, MatchConfirmed, RewardReleased). Off-chain services subscribe to events instead of polling contract state.",
              },
              {
                pattern: "Role-Based Access Control",
                detail: "Three roles: item owner, item finder, moderator. Each contract function validates msg.sender against the expected role before execution.",
              },
              {
                pattern: "Deterministic State Transitions",
                detail: "Solidity require() statements enforce valid state progressions. Invalid transitions revert with descriptive error messages. No ambiguous intermediate states.",
              },
            ].map((item) => (
              <div key={item.pattern} className="flex gap-4">
                <span className="mt-1 font-mono text-xs text-primary shrink-0">--</span>
                <div>
                  <h5 className="text-sm font-medium text-foreground mb-1">{item.pattern}</h5>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Blockchain-specific: On-chain / Off-chain section ────── */
function OnChainOffChainSection() {
  const { ref, isVisible } = useScrollReveal()
  return (
    <div
      ref={ref}
      className={cn(
        "py-16 sm:py-20 border-t border-border/30 opacity-0 translate-y-6 transition-all duration-700 ease-out",
        isVisible && "opacity-100 translate-y-0",
      )}
    >
      <SectionLabel label="05 — On-chain / Off-chain Interaction" />
      <div className="space-y-8">
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
          The system maintains a clear separation of concerns between deterministic on-chain logic and computationally expensive off-chain services.
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-primary">On-chain (Contract)</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {[
                "Item registration and state management",
                "Escrow deposits and reward transfers",
                "Match status tracking and confirmations",
                "Role-based access control enforcement",
                "Event emission for all state transitions",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-border/50 bg-secondary/20 p-6 space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Off-chain (Services)</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {[
                "AI image similarity computation (SigLIP/CLIP)",
                "IPFS uploads and metadata pinning",
                "Event listening and match proposal submission",
                "Image preprocessing and embedding generation",
                "API for frontend data aggregation",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-muted-foreground/50 shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-xl border border-border/50 bg-secondary/10 p-6">
          <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">Gas Optimization</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            All heavy computation remains off-chain. On-chain storage is minimized to IPFS CIDs (32 bytes) and state enums. Historical data is retrieved from events instead of storage arrays. Struct fields are packed to minimize storage slot usage.
          </p>
        </div>
      </div>
    </div>
  )
}

/* ── PFE / Intelligent Platform: Tech Stack ──────────────── */
const pfeTechStack = [
  { name: "Next.js", label: "Frontend" },
  { name: "Spring Boot", label: "Microservices" },
  { name: "PostgreSQL", label: "Core DB" },
  { name: "Firebase", label: "Real-time" },
  { name: "MongoDB", label: "Log Data" },
  { name: "RabbitMQ", label: "Async Events" },
  { name: "Docker", label: "Containerization" },
]

/* ── PFE / Intelligent Platform: System Actors Section ───── */
function SystemActorsSection() {
  const { ref, isVisible } = useScrollReveal()
  const actors = [
    { role: "Student", desc: "Submits proposals, tracks progress, communicates with supervisor" },
    { role: "Teacher", desc: "Validates topics, supervises students, evaluates reports" },
    { role: "Coordinator", desc: "Manages the academic year, assigns juries, schedules defenses" },
    { role: "Admin", desc: "System configuration, user management, academic year rollover" },
    { role: "Jury", desc: "External or internal evaluators for defense sessions" },
  ]

  return (
    <div
      ref={ref}
      className={cn(
        "py-16 sm:py-20 border-t border-border/30 opacity-0 translate-y-6 transition-all duration-700 ease-out",
        isVisible && "opacity-100 translate-y-0",
      )}
    >
      <SectionLabel label="02 — System Actors & RBAC" />
      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-10 max-w-2xl">
        A complex multi-actor system where each role has a distinct, isolated correlation context and permission set.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {actors.map((actor, i) => (
          <div
            key={actor.role}
            className="group relative overflow-hidden rounded-xl border border-primary/10 bg-primary/5 p-5 transition-all hover:bg-primary/10 hover:border-primary/20"
            style={{ transitionDelay: `${i * 50}ms` }}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <h4 className="font-mono text-xs uppercase tracking-wider text-primary">{actor.role}</h4>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {actor.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── PFE / Intelligent Platform: Functional Domains ──────── */
const functionalDomains = [
  {
    domain: "PFE Lifecycle",
    features: ["Topic Proposal", "Validation Workflow", "Pedagogical Commits", "Report Submission"]
  },
  {
    domain: "Defense Management",
    features: ["Jury Allocation", "Room Scheduling", "Planning Generation (CSP)", "Evaluation Rubrics"]
  },
  {
    domain: "Administration",
    features: ["User Import/Export", "Academic Year Rollover", "Settings & Config", "Audit Logs"]
  }
]

function PfeDomainScopeSection() {
  const { ref, isVisible } = useScrollReveal()
  return (
    <div
      ref={ref}
      className={cn(
        "py-16 sm:py-20 border-t border-border/30 opacity-0 translate-y-6 transition-all duration-700 ease-out",
        isVisible && "opacity-100 translate-y-0",
      )}
    >
      <SectionLabel label="03 — Functional Scope" />
      <div className="grid gap-6 sm:grid-cols-3">
        {functionalDomains.map((domain) => (
          <div key={domain.domain} className="rounded-xl border border-border/50 bg-secondary/20 p-6 space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground border-b border-border/40 pb-2 mb-2">{domain.domain}</h4>
            <ul className="space-y-2.5">
              {domain.features.map(feat => (
                <li key={feat} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-muted-foreground/60 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Video Hero ───────────────────────────────────────────── */
function VideoHero({ project, isVideoActive, setIsVideoActive }: { project: ProjectDetail, isVideoActive: boolean, setIsVideoActive: (val: boolean) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const isCloudProject = project.slug === "aws-cloud-architecture"
  const isBlockchainProject = project.slug === "lost-and-found-dapp"
  const isSaasProject = project.slug === "portfolio-saas-platform"
  const isFlutterProject = project.slug === "movie-app-flutter"
  const isPfeProject = project.slug === "intelligent-pfe-platform"

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (isVideoActive) {
      video.play().catch(() => { })
      // Optional: Enter fullscreen if supported
      // if (video.requestFullscreen) video.requestFullscreen();
    } else {
      video.pause()
    }
  }, [isVideoActive])

  return (
    <div className={cn("relative w-full flex items-end overflow-hidden transition-all duration-700", isVideoActive ? "h-screen min-h-screen" : "min-h-[70vh] sm:min-h-[80vh]")}>
      {/* Video controls */}
      {project.videoUrl && (
        <div className="absolute top-18 right-18 sm:top-25 sm:right-40 z-50">
          <button
            onClick={() => setIsVideoActive(!isVideoActive)}
            className="flex items-center justify-center h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-black/30 hover:bg-black/60 backdrop-blur-md border border-white/20 text-white shadow-xl transition-all hover:scale-105 hover:border-white/40"
            aria-label={isVideoActive ? "Pause video" : "Play video immersive"}
          >
            {isVideoActive ? <Pause className="h-10 w-10 sm:h-12 sm:w-12" /> : <Play className="h-10 w-10 sm:h-12 sm:w-12 ml-2" />}
          </button>
        </div>
      )}

      {/* Background (goes black when paused) */}
      <div className={cn("absolute inset-0 transition-colors duration-700", !isVideoActive ? "bg-black" : "")}>
        {project.videoUrl ? (
          <video
            ref={videoRef}
            src={project.videoUrl}
            muted
            loop
            playsInline
            preload="metadata"
            className={cn("h-full w-full object-cover transition-opacity duration-700", !isVideoActive ? "opacity-20" : "opacity-85")}
          />
        ) : project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="h-full w-full object-cover"
          />
        ) : isCloudProject ? (
          /* Cloud-themed gradient */
          <div className="h-full w-full relative">
            <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary to-background" />
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />
            <div className="absolute top-1/4 left-1/6 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute bottom-1/3 right-1/5 w-80 h-80 rounded-full bg-primary/3 blur-3xl" />
          </div>
        ) : isBlockchainProject ? (
          /* Blockchain-themed: dark with chain-link pattern and subtle nodes */
          <div className="h-full w-full relative">
            <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/80 to-background" />
            {/* Hex grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, currentColor 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            {/* Glowing nodes */}
            <div className="absolute top-1/3 left-1/4 w-48 h-48 rounded-full bg-primary/8 blur-3xl" />
            <div className="absolute bottom-1/4 right-1/3 w-56 h-56 rounded-full bg-primary/6 blur-3xl" />
            <div className="absolute top-1/2 left-2/3 w-40 h-40 rounded-full bg-primary/4 blur-3xl" />
            {/* Connecting lines (decorative) */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.04]" aria-hidden="true">
              <line x1="20%" y1="30%" x2="50%" y2="50%" stroke="currentColor" strokeWidth="1" />
              <line x1="50%" y1="50%" x2="80%" y2="35%" stroke="currentColor" strokeWidth="1" />
              <line x1="50%" y1="50%" x2="35%" y2="75%" stroke="currentColor" strokeWidth="1" />
              <line x1="35%" y1="75%" x2="65%" y2="70%" stroke="currentColor" strokeWidth="1" />
              <circle cx="20%" cy="30%" r="3" fill="currentColor" opacity="0.3" />
              <circle cx="50%" cy="50%" r="4" fill="currentColor" opacity="0.3" />
              <circle cx="80%" cy="35%" r="3" fill="currentColor" opacity="0.3" />
              <circle cx="35%" cy="75%" r="3" fill="currentColor" opacity="0.3" />
              <circle cx="65%" cy="70%" r="3" fill="currentColor" opacity="0.3" />
            </svg>
          </div>
        ) : isFlutterProject ? (
          /* Mobile-themed: phone silhouettes with app screens */
          <div className="h-full w-full relative">
            <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/70 to-background" />
            {/* Dot pattern for mobile feel */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            {/* Phone silhouettes */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.04]" aria-hidden="true">
              {/* Phone 1 */}
              <rect x="20%" y="20%" width="12%" height="22%" rx="8" stroke="currentColor" strokeWidth="1" fill="none" />
              <rect x="21.5%" y="23%" width="9%" height="15%" rx="2" stroke="currentColor" strokeWidth="0.5" fill="none" />
              <line x1="25%" y1="21.5%" x2="27%" y2="21.5%" stroke="currentColor" strokeWidth="0.5" />
              {/* Phone 2 */}
              <rect x="55%" y="15%" width="14%" height="25%" rx="8" stroke="currentColor" strokeWidth="1" fill="none" />
              <rect x="56.5%" y="18%" width="11%" height="18%" rx="2" stroke="currentColor" strokeWidth="0.5" fill="none" />
              <line x1="60.5%" y1="16.5%" x2="63.5%" y2="16.5%" stroke="currentColor" strokeWidth="0.5" />
              {/* Phone 3 */}
              <rect x="38%" y="50%" width="10%" height="18%" rx="6" stroke="currentColor" strokeWidth="1" fill="none" />
              <rect x="39.2%" y="52.5%" width="7.6%" height="12%" rx="2" stroke="currentColor" strokeWidth="0.5" fill="none" />
              {/* Connecting arcs */}
              <path d="M 32% 31% Q 40% 25% 55% 27%" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="4,4" />
              <path d="M 48% 55% Q 55% 45% 62% 40%" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="4,4" />
            </svg>
            {/* Glows */}
            <div className="absolute top-1/4 left-1/4 w-56 h-56 rounded-full bg-primary/6 blur-3xl" />
            <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-primary/4 blur-3xl" />
          </div>
        ) : isSaasProject ? (
          /* SaaS-themed: dashboard grid with module blocks */
          <div className="h-full w-full relative">
            <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/60 to-background" />
            {/* Dashboard grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
                backgroundSize: "64px 64px",
              }}
            />
            {/* Module blocks */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.03]" aria-hidden="true">
              <rect x="10%" y="15%" width="20%" height="25%" rx="8" stroke="currentColor" strokeWidth="1" fill="none" />
              <rect x="35%" y="20%" width="25%" height="15%" rx="8" stroke="currentColor" strokeWidth="1" fill="none" />
              <rect x="65%" y="10%" width="22%" height="30%" rx="8" stroke="currentColor" strokeWidth="1" fill="none" />
              <rect x="15%" y="50%" width="30%" height="20%" rx="8" stroke="currentColor" strokeWidth="1" fill="none" />
              <rect x="50%" y="55%" width="18%" height="25%" rx="8" stroke="currentColor" strokeWidth="1" fill="none" />
              <rect x="72%" y="48%" width="20%" height="18%" rx="8" stroke="currentColor" strokeWidth="1" fill="none" />
              {/* Connecting lines between modules */}
              <line x1="30%" y1="40%" x2="35%" y2="28%" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4,4" />
              <line x1="60%" y1="28%" x2="65%" y2="25%" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4,4" />
              <line x1="45%" y1="60%" x2="50%" y2="60%" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4,4" />
            </svg>
            {/* Subtle glow */}
            <div className="absolute top-1/3 left-1/3 w-72 h-72 rounded-full bg-primary/4 blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-56 h-56 rounded-full bg-primary/3 blur-3xl" />
          </div>
        ) : isPfeProject ? (
          /* PFE-themed: Institutional/Systems blue mix */
          <div className="h-full w-full relative">
            <div className="absolute inset-0 bg-gradient-to-br from-background via-blue-950/20 to-background" />

            {/* Microservices/Nodes Network Pattern */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.05]" aria-hidden="true">
              {/* Central Hub */}
              <circle cx="50%" cy="50%" r="40" stroke="currentColor" strokeWidth="1" fill="none" />
              <circle cx="50%" cy="50%" r="20" fill="currentColor" opacity="0.1" />

              {/* Satellites */}
              <circle cx="20%" cy="30%" r="15" stroke="currentColor" strokeWidth="1" fill="none" />
              <line x1="25%" y1="35%" x2="45%" y2="45%" stroke="currentColor" strokeWidth="0.5" />

              <circle cx="80%" cy="30%" r="15" stroke="currentColor" strokeWidth="1" fill="none" />
              <line x1="75%" y1="35%" x2="55%" y2="45%" stroke="currentColor" strokeWidth="0.5" />

              <circle cx="20%" cy="70%" r="15" stroke="currentColor" strokeWidth="1" fill="none" />
              <line x1="25%" y1="65%" x2="45%" y2="55%" stroke="currentColor" strokeWidth="0.5" />

              <circle cx="80%" cy="70%" r="15" stroke="currentColor" strokeWidth="1" fill="none" />
              <line x1="75%" y1="65%" x2="55%" y2="55%" stroke="currentColor" strokeWidth="0.5" />
            </svg>

            {/* Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl" />
          </div>
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-secondary via-background to-secondary" />
        )}
        {/* Dark overlay: Fades out completely in immersive mode to show raw video */}
        <div className={cn("absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30 transition-opacity duration-700", isVideoActive && "opacity-0")} />
      </div>

      {/* Hero content: Fades out in immersive mode */}
      <div className={cn("relative z-10 w-full px-4 sm:px-6 pb-12 sm:pb-16 pt-32 transition-all duration-700", isVideoActive && "opacity-0 pointer-events-none translate-y-8")}>
        <div className="mx-auto max-w-4xl">
          {/* Back link */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors mb-8 group"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            All Projects
          </Link>

          {/* Project subtitle */}
          {isCloudProject && (
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4 animate-fade-in-up">
              Academic Cloud Computing Project &middot; 2025
            </p>
          )}
          {isBlockchainProject && (
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4 animate-fade-in-up">
              Academic Blockchain Project &middot; Ethereum / Smart Contracts &middot; 2025
            </p>
          )}
          {isSaasProject && (
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4 animate-fade-in-up">
              Personal SaaS Product &middot; Full-Stack Engineering &middot; 2025
            </p>
          )}
          {isFlutterProject && (
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4 animate-fade-in-up">
              Cross-Platform Mobile &middot; Flutter + Firebase &middot; 2025
            </p>
          )}
          {isPfeProject && (
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4 animate-fade-in-up">
              Institutional SaaS &middot; Distributed Systems &middot; 2026
            </p>
          )}

          {/* Status + year */}
          <div className="flex items-center gap-4 mb-5 animate-fade-in-up">
            <span className="flex items-center gap-2">
              <span
                className={cn(
                  "h-2 w-2 rounded-full",
                  project.status === "shipped" && "bg-primary",
                  project.status === "in-progress" && "bg-yellow-500 animate-pulse",
                  project.status === "archived" && "bg-muted-foreground",
                )}
              />
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {project.status}
              </span>
            </span>
            <span className="font-mono text-xs text-muted-foreground">{project.year}</span>
          </div>

          {/* Title */}
          <h1 className={cn(
            "text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5 animate-fade-in-up stagger-1")}>
            {project.title}
          </h1>

          {/* Subtitle */}
          {isCloudProject && (
            <p className="text-lg sm:text-xl font-medium text-foreground/80 mb-4 animate-fade-in-up stagger-2">
              3-Tier Architecture &amp; ECS Fargate Migration
            </p>
          )}
          {isBlockchainProject && (
            <p className="text-lg sm:text-xl font-medium text-foreground/80 mb-4 animate-fade-in-up stagger-2">
              A trustless lost-and-found system powered by Ethereum smart contracts
            </p>
          )}
          {isSaasProject && (
            <p className="text-lg sm:text-xl font-medium text-foreground/80 mb-4 animate-fade-in-up stagger-2">
              Building a scalable portfolio-as-a-service platform
            </p>
          )}
          {isFlutterProject && (
            <p className="text-lg sm:text-xl font-medium text-foreground/80 mb-4 animate-fade-in-up stagger-2">
              Cross-platform movie discovery with role-based architecture and real-time sync
            </p>
          )}
          {isPfeProject && (
            <p className="text-lg sm:text-xl font-medium text-foreground/80 mb-4 animate-fade-in-up stagger-2">
              A massive-scale platform managing the full academic lifecycle of graduation projects
            </p>
          )}

          {/* Description */}
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mb-8 animate-fade-in-up stagger-2">
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 mb-8 animate-fade-in-up stagger-3">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-border/60 bg-secondary/40 backdrop-blur-sm px-3 py-1.5 font-mono text-xs text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-5 animate-fade-in-up stagger-4">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-primary transition-colors group/link"
            >
              <Github className="h-4 w-4 transition-transform group-hover/link:scale-110" />
              <span className="underline-animate">Source Code</span>
            </a>
            {project.homepage && (
              <a
                href={project.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-sm text-primary hover:text-foreground transition-colors group/link"
              >
                {/*<ExternalLink className="h-4 w-4 transition-transform group-hover/link:scale-110" />
                <span className="underline-animate">{isBlockchainProject ? "Testnet Demo" : "Live Demo"}</span>*/}
              </a>
            )}
          </div>

          {/* Scroll indicator */}
          <div className="mt-12 flex justify-center animate-fade-in stagger-5">
            <ChevronDown className="h-5 w-5 text-muted-foreground animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Main detail content ──────────────────────────────────── */
export function ProjectDetailContent({ project }: { project: ProjectDetail }) {
  const [isVideoActive, setIsVideoActive] = useState(false)
  const isCloudProject = project.slug === "aws-cloud-architecture"
  const isBlockchainProject = project.slug === "lost-and-found-dapp"
  const isSaasProject = project.slug === "portfolio-saas-platform"
  const isFlutterProject = project.slug === "movie-app-flutter"
  const isPfeProject = project.slug === "intelligent-pfe-platform"

  /* Compute section numbers dynamically based on project type */
  const getSectionNum = (baseIndex: number) => {
    return String(baseIndex).padStart(2, "0")
  }

  return (
    <article className="min-h-screen">
      {/* Hero */}
      <VideoHero project={project} isVideoActive={isVideoActive} setIsVideoActive={setIsVideoActive} />

      {/* Narrative content - Hide everything below hero when video is active */}
      <div className={cn("transition-all duration-700", isVideoActive ? "opacity-0 h-0 overflow-hidden" : "opacity-100")}>
        {!isVideoActive && (
          <div className="px-4 sm:px-6">
            <div className="mx-auto max-w-4xl">

              {/* AWS Services strip (cloud project only) */}
              {isCloudProject && <AwsServicesStrip />}

              {/* Web3 Services strip (blockchain project only) */}
              {isBlockchainProject && <Web3ServicesStrip />}

              {/* Context */}
              <NarrativeSection label="01 — Context">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-foreground mb-2">
                      {isBlockchainProject ? "Problem & Motivation" : "Why this exists"}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {project.context.why}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-foreground mb-2">Problem space</h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {project.context.problemSpace}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-foreground mb-2">Constraints</h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {project.context.constraints}
                    </p>
                  </div>
                </div>
              </NarrativeSection>

              {/* Core Features / Architecture Overview */}{isPfeProject ? null : (
                <NarrativeSection label={isCloudProject ? "02 — Architecture & Features" : "02 — System Architecture & Features"} delay={50}>
                  <div className="space-y-8">
                    {project.coreFeatures.map((feature, i) => (
                      <div key={feature.title} className="flex gap-4">
                        <span className="font-mono text-xs text-primary mt-1 shrink-0 w-6 text-right">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <h3 className="text-sm sm:text-base font-medium text-foreground mb-1.5">
                            {feature.title}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </NarrativeSection>
              )}

              {/* SaaS-specific: Features Split (Implemented vs Planned) */}
              {isSaasProject && <FeaturesSplitSection />}

              {/* PFE-specific: System Actors */}
              {isPfeProject && <SystemActorsSection />}

              {/* PFE-specific: Functional Scope */}
              {isPfeProject && <PfeDomainScopeSection />}

              {/* Flutter-specific: Role-Based Features Split */}
              {isFlutterProject && <RoleBasedFeaturesSection />}

              {/* Flutter-specific: Matching Algorithm */}
              {isFlutterProject && <MatchingAlgorithmSection />}

              {/* Blockchain-specific: Smart Contract Design */}
              {isBlockchainProject && <SmartContractSection />}

              {/* Blockchain-specific: User Flow Timeline */}
              {isBlockchainProject && <UserFlowTimeline />}

              {/* Engineering Decisions */}
              <NarrativeSection
                label={`${getSectionNum(isBlockchainProject ? 5 : isSaasProject ? 4 : isFlutterProject ? 5 : isPfeProject ? 4 : 3)} — Engineering Decisions`}
                delay={100}
              >
                <div className="space-y-8">
                  {project.engineeringDecisions.map((item) => (
                    <div key={item.decision}>
                      <h3 className="text-sm sm:text-base font-medium text-foreground mb-1.5">
                        {item.decision}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.reasoning}
                      </p>
                    </div>
                  ))}
                </div>
              </NarrativeSection>

              {/* Blockchain-specific: On-chain / Off-chain section */}
              {isBlockchainProject && <OnChainOffChainSection />}

              {/* Challenges */}
              <NarrativeSection
                label={`${getSectionNum(isBlockchainProject ? 7 : isSaasProject ? 5 : isFlutterProject ? 6 : isPfeProject ? 5 : 4)} — Challenges & Trade-offs`}
                delay={100}
              >
                <div className="space-y-8">
                  {project.challenges.map((item) => (
                    <div key={item.obstacle} className="space-y-2">
                      <h3 className="text-sm sm:text-base font-medium text-foreground">
                        {item.obstacle}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed pl-0 sm:pl-4 border-l-0 sm:border-l-2 sm:border-primary/30">
                        {item.resolution}
                      </p>
                    </div>
                  ))}
                </div>
              </NarrativeSection>

              {/* Architecture (optional) */}
              {project.architecture && (
                <NarrativeSection
                  label={`${getSectionNum(isBlockchainProject ? 8 : isSaasProject ? 6 : isFlutterProject ? 7 : isPfeProject ? 6 : 5)} — Architecture Snapshot`}
                  delay={50}
                >
                  <div className={cn(
                    "rounded-xl border border-border/50 bg-secondary/20 p-6 sm:p-8 overflow-x-auto",
                    isCloudProject && "border-primary/20",
                    isBlockchainProject && "border-primary/20",
                    isPfeProject && "border-primary/20",
                  )}>
                    <pre className="font-mono text-xs sm:text-sm text-muted-foreground leading-relaxed whitespace-pre">
                      {project.architecture}
                    </pre>
                  </div>
                </NarrativeSection>
              )}

              {/* Tech Stack strips */}
              {isCloudProject && <TechStackStrip items={awsTechStackItems} />}
              {isBlockchainProject && <TechStackStrip items={web3TechStack} />}
              {isSaasProject && <TechStackStrip items={saasTechStack} />}
              {isFlutterProject && <TechStackStrip items={flutterTechStack} />}
              {isPfeProject && <TechStackStrip items={pfeTechStack} />}

              {/* Value & Impact */}
              <NarrativeSection
                label={`${getSectionNum(isBlockchainProject ? 9 : isSaasProject ? 7 : isFlutterProject ? 8 : (project.architecture ? 6 : 5))} — Value & Engineering Impact`}
                delay={50}
              >
                <div className="space-y-5">
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {project.impact.summary}
                  </p>
                  <ul className="space-y-3">
                    {project.impact.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </NarrativeSection>

              {/* Key Learnings & Future (optional) */}
              {project.keyLearnings && project.keyLearnings.length > 0 && (
                <NarrativeSection
                  label={isBlockchainProject ? "10 — Learnings & Future Improvements" : isSaasProject ? "08 — Learnings & Design Philosophy" : isFlutterProject ? "09 — Learnings & Observations" : isPfeProject ? "08 — Key Learnings" : "Key Learnings"}
                  delay={50}
                >
                  <ul className="space-y-4">
                    {project.keyLearnings.map((learning) => (
                      <li key={learning} className="flex items-start gap-3">
                        <span className="mt-1 font-mono text-xs text-primary shrink-0">--</span>
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                          {learning}
                        </p>
                      </li>
                    ))}
                  </ul>
                </NarrativeSection>
              )}

              {/* SaaS-specific: Active Development Status Footer */}
              {isSaasProject && <ProjectStatusFooter />}

              {/* Back navigation */}
              <div className="py-16 sm:py-20 border-t border-border/30 flex justify-center">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2.5 font-mono text-sm text-muted-foreground hover:text-primary transition-colors group"
                >
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  Back to all projects
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
