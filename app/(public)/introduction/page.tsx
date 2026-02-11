import { Code2, Layers, FileText, Zap, Bot, Globe } from "lucide-react";
import { InnovativeImage } from "@/components/ui/innovative-image";

export default function IntroductionPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] px-4 sm:px-6 pt-28 sm:pt-32 pb-16 sm:pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">

            {/* Left Column: Text Content */}
            <div className="space-y-6 sm:space-y-8 animate-fade-in-up">
              <div className="space-y-2">
                <p className="font-mono text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-muted-foreground">
                  Software Engineer
                </p>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-balance">
                  Building{" "}
                  <span className="bg-gradient-to-l from-primary/50 to-accent text-transparent bg-clip-text">
                    production-ready systems
                  </span>
                </h1>
              </div>

              <p className="text-base sm:text-lg leading-relaxed text-muted-foreground max-w-xl">
                Software engineer with hands-on experience across full-stack development, cloud infrastructure, and DevOps. I design, build, and deploy systems that handle real-world constraints — security, scalability, and reliability. Open to international internship and remote engineering opportunities.
              </p>
            </div>

            {/* Right Column: Innovative Image */}
            <div className="relative flex justify-center lg:justify-end animate-scale-in stagger-1">
              <div className="relative w-full max-w-md aspect-square">
                {/* 
                    TODO: Replace with actual user image. 
                    Place 'me.jpg' in public/images/ and update src below.
                 */}
                <InnovativeImage
                  src="/me1.png"
                  alt="Bahaeddine Ellouze"
                  className="w-full h-full"
                />

                {/* Decorative elements behind image */}
                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full bg-primary/10 blur-3xl" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative px-4 sm:px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="rounded border border-border/50 bg-card/50 p-6 sm:p-10 backdrop-blur-sm space-y-8">
            <div className="space-y-4">
              <p className="font-mono text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary">
                About Me
              </p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Engineering-Focused Development
              </h2>
            </div>

            <div className="space-y-6 text-base sm:text-lg leading-relaxed text-muted-foreground">
              <p>
                I approach software engineering as a systems discipline. Every project I build starts with the same questions: how will this scale, how will it fail, and how will it be maintained. This mindset shapes the way I design APIs, structure databases, and architect deployment pipelines — whether the system serves ten users or ten thousand.
              </p>

              <p>
                On the backend, I work primarily with Spring Boot and Node.js, designing RESTful APIs with token-based authentication, role-based access control, and structured error handling. On the frontend, I build with Angular and React, focusing on component architecture and clean state management. My database experience spans both relational (MySQL, PostgreSQL) and document-based (MongoDB, Firestore) systems, chosen based on the data model each project demands.
              </p>

              <p>
                I also invest in the infrastructure layer. I containerize applications with Docker, automate CI/CD pipelines with GitHub Actions, and have designed multi-tier AWS architectures including VPC networking, ECS Fargate orchestration, and CloudFront CDN distribution. Where it makes sense, I integrate AI capabilities — NLP-powered chatbots, image recognition systems, and intelligent automation — as first-class features within production systems, not standalone experiments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="relative px-4 sm:px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 space-y-4 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary">
              Technical Expertise
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Skills & Experience
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Code2,
                title: "Full-Stack Development",
                description:
                  "Designed and built complete web applications from database schema to UI. Worked with Angular, React, Spring Boot, and Node.js across multiple deployed projects.",
              },
              {
                icon: Layers,
                title: "Backend & APIs",
                description:
                  "Implemented RESTful APIs with structured routing, input validation, and token-based authentication. Experience with both relational (MySQL, PostgreSQL) and document (MongoDB, Firestore) databases.",
              },
              {
                icon: FileText,
                title: "Cloud & DevOps",
                description:
                  "Built multi-AZ AWS architectures with VPC isolation, ECS Fargate, and CloudFront CDN. Containerized applications with Docker and automated CI/CD pipelines using GitHub Actions.",
              },
              {
                icon: Zap,
                title: "Distributed Systems & Performance",
                description:
                  "Designed systems spanning multiple services with structured logging, health checks, and auto-scaling. Applied database indexing, query optimization, and caching strategies across projects.",
              },
              {
                icon: Bot,
                title: "AI & Intelligent Systems",
                description:
                  "Integrated NLP chatbots, image recognition, and embedding-based similarity matching into production applications. Built hybrid on-chain/off-chain AI pipelines and TMDB-powered recommendation systems.",
              },
              {
                icon: Globe,
                title: "Security & Reliability",
                description:
                  "Implemented role-based access control, encrypted authentication flows, and least-privilege networking. Designed escrow-based smart contract logic and secure data handling across multiple system layers.",
              },
            ].map((skill, index) => (
              <div
                key={index}
                className="group rounded border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card/80"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded border border-primary/30 bg-primary/10 text-primary transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                  <skill.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-mono text-sm font-semibold uppercase tracking-wider text-foreground">
                  {skill.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
