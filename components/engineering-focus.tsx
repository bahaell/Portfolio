import { cn } from "@/lib/utils"
import { Code2, Lock, Container, Zap } from "lucide-react"

const pillars = [
  {
    id: 1,
    title: "Full-Stack Web Systems",
    description:
      "Designed, built, and deployed complete applications with end-to-end ownership — database schemas, API layers, authentication flows, and responsive frontends. Delivered working systems across Angular, React, Spring Boot, and Node.js with structured codebases maintained through production lifecycles.",
    icon: Code2,
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: 2,
    title: "Backend, APIs & Security",
    description:
      "Engineered RESTful APIs with structured routing, stateless JWT authentication, and middleware-level role-based access control. Enforced data integrity through input validation, parameterized queries, and encryption — securing every layer from transport to storage with least-privilege defaults.",
    icon: Lock,
    color: "from-red-500/20 to-orange-500/20",
  },
  {
    id: 3,
    title: "Cloud & DevOps",
    description:
      "Architected multi-AZ AWS infrastructure with VPC network isolation, ECS Fargate container orchestration, and CloudFront edge distribution. Automated build-test-deploy pipelines with GitHub Actions and Docker multi-stage builds, delivering reproducible deployments across isolated staging and production environments.",
    icon: Container,
    color: "from-emerald-500/20 to-teal-500/20",
  },
  {
    id: 4,
    title: "Intelligent Features & Automation",
    description:
      "Integrated NLP chatbots, facial recognition, and embedding-based similarity matching into deployed systems as first-class features. Built hybrid AI pipelines with proxy-layer isolation, rate limiting, and graceful degradation — ensuring intelligent capabilities operate within production reliability constraints.",
    icon: Zap,
    color: "from-purple-500/20 to-pink-500/20",
  },
]

export function EngineeringFocus() {
  return (
    <section className="px-4 sm:px-6 py-20 sm:py-28 border-t border-border/30">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 sm:mb-14 space-y-3 animate-fade-in-up">
          <p className="font-mono text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-primary">
            Engineering
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">What I Build</h2>
          <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            End-to-end systems designed for real-world constraints — security, scalability, and operational reliability from day one.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon
            return (
              <div
                key={pillar.id}
                className={cn(
                  "group relative overflow-hidden rounded-xl border border-border bg-card/40 glass p-6 sm:p-7 transition-all duration-400 hover:border-primary/40 hover:bg-card/60 hover-lift animate-fade-in-up",
                )}
                style={{ animationDelay: `${index * 100 + 200}ms` }}
              >
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                    pillar.color,
                  )}
                />

                <div className="relative z-10">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mb-3 text-lg font-semibold tracking-tight transition-colors duration-300 group-hover:text-gradient">
                    {pillar.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-muted-foreground">{pillar.description}</p>
                </div>

                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-transparent transition-all duration-500 group-hover:w-full" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
