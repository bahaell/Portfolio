export interface ProjectDetail {
  id: number
  slug: string
  title: string
  description: string
  tags: string[]
  category: "Web Systems" | "Cloud & Infra" | "Intelligent Systems" | "Blockchain" | "Mobile"
  status: "shipped" | "in-progress" | "archived"
  year: string
  stars: number
  forks: number
  url: string
  homepage?: string
  featured: boolean
  highlight?: boolean
  // Detail page content
  videoUrl?: string
  imageUrl?: string
  context: {
    why: string
    problemSpace: string
    constraints: string
  }
  coreFeatures: {
    title: string
    description: string
  }[]
  engineeringDecisions: {
    decision: string
    reasoning: string
  }[]
  challenges: {
    obstacle: string
    resolution: string
  }[]
  impact: {
    summary: string
    points: string[]
  }
  architecture?: string
  keyLearnings?: string[]
}

export const projects: ProjectDetail[] = [
  {
    id: 8,
    slug: "intelligent-pfe-platform",
    title: "INTELLIGENT PFE PLATFORM",
    description:
      "A centralized, intelligent SaaS platform to manage the entire lifecycle of university Final-Year Projects (PFE) — from topic selection to final defense. Built with a microservices architecture for institutional scale.",
    tags: ["Next.js", "Spring Boot", "Firebase", "Microservices", "System Design"],
    category: "Web Systems",
    status: "in-progress",
    year: "2026",
    stars: 0,
    forks: 0,
    url: "https://github.com/bahaell/PFE_Management_Platform", // Placeholder
    homepage: undefined,
    featured: true,
    highlight: true,
    videoUrl: "https://res.cloudinary.com/dthmw5ptp/video/upload/q_auto/f_auto/v1775661999/PFE_wsfrsg.mp4",
    context: {
      why: "University Final-Year Project (PFE) management is often fragmented across emails, spreadsheets, and disconnected platforms. This leads to administrative chaos, lack of visibility for students, and coordination nightmares for departments.",
      problemSpace:
        "Build a centralized, intelligent, and scalable SaaS platform to manage the entire lifecycle of PFE projects — from topic selection to final defense — across multiple academic years, enforcing strict role-based access and data isolation.",
      constraints:
        "Must handle institutional scale (thousands of students/teachers). strict data isolation per academic year. Real-time collaboration required but must be isolated from core business transactions.",
    },
    coreFeatures: [
      {
        title: "User & Role Management (RBAC)",
        description:
          "Granular permission system for Students, Teachers (Supervisors), Coordinators, Jury Members, and Admins. Access to features is strictly gated by role and current academic year context.",
      },
      {
        title: "Academic Year Isolation",
        description:
          "Global selector for academic years. Data from previous years is strictly read-only. Current year is write-enabled. Ensures historical data integrity while allowing the system to reset for new cohorts.",
      },
      {
        title: "PFE Lifecycle Tracking",
        description:
          "State machine driving projects from Proposal -> Validation -> Development -> Report Submission -> Defense. Each stage has specific requirements and deadlines enforced by the system.",
      },
      {
        title: "Real-time Collaboration",
        description:
          "Integrated chat and notification system for students and supervisors. Pedagogical commits allow tracking of progress linked to specific project milestones. Powered by Firebase.",
      },
      {
        title: "AI Decision Support",
        description:
          "Assists Coordinators (not replaces them) by recommending supervisors based on skills/load and suggesting defense schedules that minimize conflicts. Uses a scoring engine.",
      },
    ],
    engineeringDecisions: [
      {
        decision: "Microservices Architecture with Spring Boot",
        reasoning:
          "The complexity of the domain (Scheduling, Document generation, Real-time chat, Core CRUD) warranted separation of concerns. Independent scaling and deployment of services (e.g., resource-heavy document generation vs lightweight user service).",
      },
      {
        decision: "Firebase for Side-Channel Real-time Data",
        reasoning:
          "Separated high-frequency, ephemeral data (chat, typing indicators, presence) from the transactional relational core. Reduces load on the main SQL database and provides out-of-the-box realtime sync.",
      },
      {
        decision: "Academic Year as a First-Class Concept",
        reasoning:
          "Instead of just a date filter, 'Academic Year' is a global context that partitions data visibility and write access. This architectural choice simplifies query logic and security rules for historical data.",
      },
    ],
    challenges: [
      {
        obstacle: "Complex Multi-Actor Workflows",
        resolution:
          "Implemented a rigid state machine for project status that listens to events from different actors. e.g., A student submits, Supervisor validates, Coordinator approves. Each transition is validated against the current state and actor permissions.",
      },
      {
        obstacle: "Scheduling Defense Sessions",
        resolution:
          "The 'Defense Scheduler' is a constraint satisfaction problem (Room availability, Jury availability, Student availability). Solved using a heuristic-based scheduling algorithm assisted by AI recommendations.",
      },
    ],
    impact: {
      summary:
        "Designed and currently building a system capable of handling the administrative workload of an entire university department, transforming a chaotic manual process into a streamlined digital workflow.",
      points: [
        "Centralized data source for all PFE related activities",
        "Drastic reduction in administrative overhead for Coordinators",
        "Improved visibility and fairness in supervisor allocation",
        "Digitized archive of past academic work",
      ],
    },
    architecture: `+-------------------------------------------------------------+
|                   FRONTEND (Next.js)                        |
|                                                             |
|   +--------------+   +--------------+   +---------------+   |
|   |  Student UI  |   |  Teacher UI  |   |   Coord. UI   |   |
|   +------+-------+   +------+-------+   +-------+-------+   |
|          |                  |                   |           |
+----------+------------------+-------------------+-----------+
           |                  |                   | HTTP / REST
           |        +---------v----------+        |
           |        |    API GATEWAY     |        |
           |        +---------+----------+        |
           |                  |                   |
+----------v------------------v-------------------v-----------+
|                    MICROSERVICES LAYER                      |
|                                                             |
| +------------+ +-------------+ +-------------+ +----------+ |
| |  User Svc  | | Project Svc | | Subject Svc | | Doc Svc  | |
| +-----+------+ +------+------+ +------+------+ +----+-----+ |
|       |               |               |             |       |
| +-----v------+ +------v------+ +------v------+ +----v-----+ |
| | PostgreSQL | |    MySQL    | |   MongoDB   | |    S3    | |
| +------------+ +-------------+ +-------------+ +----------+ |
+--------------+-----------------------------+----------------+
               |                             |
        Events | (RabbitMQ)         Realtime | (Firebase)
+--------------v-----------------------------v----------------+
|                 ASYNC & REALTIME INFRA                      |
+-------------------------------------------------------------+`,
    keyLearnings: [
      "Domain-Driven Design (DDD) is essential when modeling complex institutional processes like 'Academic Years' and 'Defense Sessions'",
      "Separating 'Business Transactional Data' (SQL) from 'Collaboration Data' (Firebase) keeps the core clean and performant",
      "Building for 'Multi-Tenancy' (even if tenants are just academic years) requires discipline in data isolation from day one",
    ],
  },
  {
    id: 4,
    slug: "aws-cloud-architecture",
    title: "AWS CLOUD ARCHITECTURE",
    description:
      "Design and implementation of a highly available, secure, and scalable AWS cloud infrastructure. The project starts with a traditional EC2-based architecture and evolves into a modern serverless container-based platform using ECS Fargate.",
    tags: ["AWS", "ECS Fargate", "Docker", "RDS", "CloudFront", "VPC", "CloudWatch", "Terraform"],
    category: "Cloud & Infra",
    status: "shipped",
    year: "2025",
    stars: 0,
    forks: 0,
    url: "",
    homepage: undefined,
    featured: false,
    highlight: false,
    imageUrl: "/im/aws.png",
    context: {
      why: "Cloud infrastructure design is the backbone of every production system. This academic project was built to demonstrate end-to-end AWS architecture — from network isolation to serverless container orchestration — at a level that mirrors real enterprise deployments.",
      problemSpace:
        "Design a 3-tier AWS architecture supporting a web application with strict availability, security, and scalability requirements. Then migrate the compute layer from EC2 Auto Scaling to a fully serverless ECS Fargate model without downtime.",
      constraints:
        "AWS Academy sandbox environment with limited IAM permissions. No access to Route 53 or advanced networking features. All infrastructure had to be reproducible and documented for academic evaluation.",
    },
    coreFeatures: [
      {
        title: "Multi-AZ VPC Design",
        description:
          "Custom VPC spanning multiple Availability Zones with isolated public and private subnets. NAT Gateways for outbound traffic from private subnets. Bastion Host for secure SSH access. Network ACLs and Security Groups enforcing least-privilege boundaries.",
      },
      {
        title: "EC2 Auto Scaling with ALB",
        description:
          "Initial compute layer using EC2 instances in Auto Scaling Groups behind an Application Load Balancer. Health checks, scaling policies based on CPU utilization, and cross-zone load balancing for even traffic distribution.",
      },
      {
        title: "ECS Fargate Migration",
        description:
          "Containerized the application with Docker, pushed images to Amazon ECR, and orchestrated with ECS Fargate. Eliminated EC2 instance management entirely. Task definitions with resource limits, service auto-scaling, and rolling deployments.",
      },
      {
        title: "RDS Multi-AZ with Read Replicas",
        description:
          "PostgreSQL database on Amazon RDS in Multi-AZ deployment with automatic failover. Primary/Standby configuration for high availability. Connection pooling and query optimization for the application layer.",
      },
      {
        title: "S3 + CloudFront CDN",
        description:
          "Static assets hosted on S3 with versioning and lifecycle policies. CloudFront distribution for global edge caching with custom cache behaviors and origin access identity for secure S3 access.",
      },
      {
        title: "Observability Stack",
        description:
          "CloudWatch dashboards for metrics, alarms for CPU/memory/request thresholds, and SNS notifications for operational alerts. CloudTrail enabled for API audit logging and security compliance.",
      },
    ],
    engineeringDecisions: [
      {
        decision: "ECS Fargate over EKS for container orchestration",
        reasoning:
          "Kubernetes was unnecessary complexity for this workload. Fargate eliminated node management entirely while providing the same container isolation. The application had no need for custom schedulers or operators.",
      },
      {
        decision: "Multi-AZ RDS over Aurora Serverless",
        reasoning:
          "Aurora Serverless v2 had cold start latency concerns for this workload pattern. Standard RDS Multi-AZ provided predictable failover behavior and was within the academic sandbox constraints.",
      },
      {
        decision: "CloudFront over direct S3 serving",
        reasoning:
          "Edge caching reduced latency for static assets globally. Origin Access Identity ensured S3 buckets remained private. Cache invalidation patterns were documented for deployment workflows.",
      },
      {
        decision: "Security Groups with least-privilege over broad rules",
        reasoning:
          "Each tier (ALB, compute, database) has its own security group allowing only the minimum required ingress. Database accepts connections only from the compute layer. No public access to any backend resource.",
      },
    ],
    challenges: [
      {
        obstacle: "Designing secure VPC networking with proper isolation",
        resolution:
          "Mapped out all traffic flows before creating any resources. Public subnets only for ALB and Bastion. Private subnets for compute and database. NAT Gateways in each AZ for redundant outbound access.",
      },
      {
        obstacle: "Migrating from EC2 to Fargate without service disruption",
        resolution:
          "Ran both compute layers in parallel behind the same ALB using target group weighting. Gradually shifted traffic from EC2 targets to Fargate tasks. Validated health checks and response times before full cutover.",
      },
      {
        obstacle: "Load balancing stateless containers across AZs",
        resolution:
          "Ensured application was fully stateless — sessions stored in RDS, no local file dependencies. ALB health checks configured with appropriate thresholds. Fargate service set to spread tasks across all available AZs.",
      },
      {
        obstacle: "Observability across distributed services",
        resolution:
          "Structured logging to CloudWatch Logs with correlation IDs. Custom CloudWatch metrics for application-level KPIs. SNS alarm chains for cascading failure detection.",
      },
    ],
    impact: {
      summary:
        "Delivered a production-grade AWS architecture demonstrating the full spectrum of cloud engineering — from network design to serverless orchestration — with documented migration patterns and operational runbooks.",
      points: [
        "High availability across multiple Availability Zones with automated failover",
        "Horizontal scalability via Fargate auto-scaling with zero instance management",
        "Infrastructure modernization path from EC2 to serverless containers",
        "Cost optimization through right-sized Fargate tasks vs over-provisioned EC2 instances",
        "Production-grade security posture with least-privilege networking and audit trails",
      ],
    },
    architecture: `+----------------------------------------------------------------------+
|                          AWS CLOUD                                   |
|                                                                      |
|  +-------------+     +------------------------------------------+    |
|  |  CloudFront |     |              VPC (Multi-AZ)              |    |
|  |     CDN     |     |                                          |    |
|  +------+------+     |  +-------------------------------------+ |    |
|         |            |  |         Public Subnets              | |    |
|         |            |  |  +-----------+   +--------------+   | |    |
|  +------v------+     |  |  |    ALB    |   |   Bastion    |   | |    |
|  |     S3      |     |  |  |  (Load    |   |    Host      |   | |    |
|  |   Bucket    |     |  |  | Balancer) |   |   (SSH)      |   | |    |
|  +-------------+     |  |  +-----+-----+   +--------------+   | |    |
|                      |  +--------+----------------------------+ |    |
|                      |           |                              |    |
|                      |  +--------+----------------------------+ |    |
|                      |  |        |   Private Subnets          | |    |
|                      |  |  +-----v------+   +--------------+  | |    |
|                      |  |  |    ECS     |   |   NAT        |  | |    |
|                      |  |  |  Fargate   |   |  Gateway     |  | |    |
|                      |  |  |  Tasks     |   |              |  | |    |
|                      |  |  +-----+------+   +--------------+  | |    |
|                      |  |        |                            | |    |
|                      |  |  +-----v------+                     | |    |
|                      |  |  |    RDS     |                     | |    |
|                      |  |  | PostgreSQL |                     | |    |
|                      |  |  | Multi-AZ   |                     | |    |
|                      |  |  +------------+                     | |    |
|                      |  +-------------------------------------+ |    |
|                      +------------------------------------------+    |
|                                                                      |
|  +---------+  +---------+  +----------+  +------+  +-----------+     |
|  |CloudWatch| |   SNS   |  |CloudTrail|  |  ECR |  |    IAM    |     |
|  |Monitoring| | Alerts  |  |  Audit   |  |Images|  |  Policies |     |
|  +---------+  +---------+  +----------+  +------+  +-----------+     |
+----------------------------------------------------------------------+`,
    keyLearnings: [
      "VPC design is the foundation — get the network topology wrong and every layer above it inherits the problem",
      "Fargate eliminates undifferentiated heavy lifting, but you still need to understand the EC2 model it abstracts",
      "Blue/green migration via ALB target group weighting is a safe, reversible path from EC2 to containers",
      "Least-privilege security groups are tedious to set up but trivial to audit — broad rules are the opposite",
      "CloudWatch is sufficient for most observability needs when combined with structured logging and correlation IDs",
    ],
  },
  {
    id: 5,
    slug: "lost-and-found-dapp",
    title: "LOST & FOUND DAPP",
    description:
      "A decentralized application that manages lost and found items using Ethereum smart contracts, IPFS storage, and an off-chain AI matching engine. Eliminates trust issues and centralization through on-chain state management and escrow-based reward logic.",
    tags: [
      "Solidity",
      "Ethereum",
      "React",
      "TypeScript",
      "IPFS",
      "Hardhat",
      "Wagmi",
      "Node.js",
    ],
    category: "Blockchain",
    status: "shipped",
    year: "2025",
    stars: 0,
    forks: 0,
    url: "https://github.com/Habib-Amami/projet-blockchain",
    homepage: undefined,
    featured: false,
    highlight: false,
    videoUrl: "https://res.cloudinary.com/dthmw5ptp/video/upload/q_auto/f_auto/v1775661959/Dapp_hfowyk.mp4",
    context: {
      why: "Traditional lost-and-found systems rely on trust between unknown parties and centralized intermediaries. There is no transparency, no immutability, and no mechanism to prevent fraud or false claims. Blockchain provides a natural solution to these coordination problems.",
      problemSpace:
        "Design a multi-layer decentralized application where item declarations, matches, confirmations, and reward transfers are all governed by deterministic smart contract logic. Integrate off-chain AI-based image similarity matching without breaking the trust model.",
      constraints:
        "Academic project deployed on Sepolia testnet. No mainnet budget. AI inference must remain off-chain due to gas costs. Smart contract storage must be minimized -- only IPFS CIDs and state transitions stored on-chain.",
    },
    coreFeatures: [
      {
        title: "LostAndFound.sol Smart Contract",
        description:
          "Core Solidity contract managing the entire item lifecycle. Data models for Item and Match with enum-driven state machines (LOST/FOUND, Pending/Approved/Returned). Escrow-based reward logic locks ETH on declaration and releases on confirmed return. Event-driven design emits lifecycle events consumed by off-chain listeners.",
      },
      {
        title: "IPFS-backed Item Storage",
        description:
          "Item images and metadata are uploaded to IPFS via Pinata. Only the content identifier (CID) is stored on-chain, minimizing gas costs while preserving data integrity through content-addressable hashing.",
      },
      {
        title: "Off-chain AI Matching Engine",
        description:
          "Node.js service running SigLIP/CLIP embeddings via Xenova Transformers. Computes cosine similarity between lost and found item images. Similarity results are reported back on-chain through a trusted reporter pattern with event confirmation flows.",
      },
      {
        title: "Mutual Confirmation Protocol",
        description:
          "Double-sided confirmation between item owner and finder before any reward transfer or data disclosure. Progressive data release -- contact details only shared after both parties confirm the match. Prevents false claims and protects privacy.",
      },
      {
        title: "React + Wagmi Frontend",
        description:
          "TypeScript React application using Wagmi and Viem for type-safe contract interaction. RainbowKit for wallet connection. Real-time contract event subscriptions update UI state without polling.",
      },
      {
        title: "Escrow & Automatic Reward Transfer",
        description:
          "When declaring a lost item, the owner deposits a reward in ETH. The contract holds funds in escrow until physical return is confirmed by both parties. Automatic transfer to the finder on confirmation -- no manual payout needed.",
      },
    ],
    engineeringDecisions: [
      {
        decision: "Off-chain AI matching instead of on-chain computation",
        reasoning:
          "Image similarity computation is computationally expensive and non-deterministic. Running it on-chain would be prohibitively costly in gas and technically infeasible in the EVM. A trusted off-chain reporter pattern with on-chain event verification preserves the trust model at acceptable cost.",
      },
      {
        decision: "IPFS CIDs on-chain instead of raw metadata",
        reasoning:
          "Storing images or large metadata directly in contract storage would cost thousands of dollars in gas. IPFS content-addressing provides data integrity verification while keeping on-chain footprint minimal -- one 32-byte CID per item.",
      },
      {
        decision: "Enum-based state machines for lifecycle control",
        reasoning:
          "Item and match states follow strict linear progressions (LOST -> MATCHED -> CONFIRMED -> RETURNED). Solidity enums enforce valid transitions at the contract level, eliminating entire categories of invalid state bugs.",
      },
      {
        decision: "Wagmi + Viem over ethers.js",
        reasoning:
          "Wagmi provides React hooks with built-in caching, automatic re-rendering on chain events, and TypeScript-first contract type generation from ABIs. Viem is lighter and more modular than ethers.js v6.",
      },
      {
        decision: "Hardhat over Foundry for development",
        reasoning:
          "The team had stronger JavaScript/TypeScript experience. Hardhat's plugin ecosystem (ethers, deploy, verify) and familiar testing patterns made it the faster path for an academic timeline.",
      },
    ],
    challenges: [
      {
        obstacle: "Gas cost optimization for storage-heavy operations",
        resolution:
          "Moved all large data off-chain to IPFS. Packed struct fields to minimize storage slots. Used events for historical data retrieval instead of on-chain arrays. Batch operations where possible to amortize base transaction costs.",
      },
      {
        obstacle: "Trust boundary between off-chain AI and on-chain state",
        resolution:
          "Implemented a reporter role that submits match results on-chain. Results are not auto-accepted -- both parties must independently confirm. The AI service is a suggestion engine, not an authority. On-chain logic remains the single source of truth.",
      },
      {
        obstacle: "UX friction from wallet interactions and confirmations",
        resolution:
          "Clear transaction state indicators (pending, confirming, confirmed). Optimistic UI updates with rollback on revert. Human-readable error messages wrapping Solidity revert reasons. RainbowKit for streamlined wallet connection.",
      },
      {
        obstacle: "Balancing transparency and user privacy",
        resolution:
          "Progressive data disclosure -- item descriptions are public, but owner/finder contact details are only revealed after mutual confirmation. On-chain addresses are pseudonymous. No PII stored on-chain or on IPFS.",
      },
      {
        obstacle: "Smart contract state complexity with multiple actors",
        resolution:
          "Strict role-based access control (owner, finder, moderator). Each function validates caller role and current state before execution. Comprehensive unit tests covering every state transition and edge case.",
      },
    ],
    impact: {
      summary:
        "Delivered a complete decentralized application demonstrating end-to-end DApp architecture -- from smart contract design and on-chain state management to off-chain AI integration and Web3 frontend development. The project proves blockchain applicability beyond financial speculation.",
      points: [
        "End-to-end DApp architecture from Solidity contracts to React frontend",
        "Secure smart contract design with escrow logic and state machine enforcement",
        "Hybrid on-chain/off-chain system with clear trust boundaries",
        "AI integration (SigLIP/CLIP) in a Web3 context without compromising decentralization",
        "Real-world use case demonstrating blockchain utility beyond DeFi and NFTs",
        "Gas-optimized contract design using IPFS for data and events for history",
      ],
    },
    architecture: `+------------------------------------------------------------------+
|                        FRONTEND (React + Wagmi)                  |
|  +--------------+  +--------------+  +------------------------+  |
|  |  RainbowKit  |  |   Contract   |  |  Event Subscriptions   |  |
|  |  Wallet UI   |  | Hooks (Viem) |  |  (Real-time updates)   |  |
|  +--------------+  +------+-------+  +------------+-----------+  |
+---------------------------+-----------------------+--------------+
                            |                       |
                 +----------v-----------------------v------------+
                 |              ETHEREUM (Sepolia)               |
                 |                                               |
                 |  +-----------------------------------------+  |
                 |  |           LostAndFound.sol              |  |
                 |  |                                         |  |
                 |  |   Item Registry ---- Match Engine       |  |
                 |  |        |                  |             |  |
                 |  |   State Machine ---- Escrow Logic       |  |
                 |  |        |                  |             |  |
                 |  |   Event Emitter ---- Access Control     |  |
                 |  +-----------------------------------------+  |
                 +----------------------+------------------------+
                                        | Events
                 +----------------------v------------------------+
                 |            OFF-CHAIN SERVICES                 |
                 |                                               |
                 |  +-----------------+  +--------------------+  |
                 |  |   AI Matching   |  |   IPFS / Pinata    |  |
                 |  |   Engine        |  |   (Image + Meta    |  |
                 |  |   (SigLIP/CLIP) |  |    Storage)        |  |
                 |  |   Node.js +     |  |                    |  |
                 |  |   Express       |  |  CID ---> On-chain |  |
                 |  +-----------------+  +--------------------+  |
                 +-----------------------------------------------+`,
    keyLearnings: [
      "Smart contract state machines eliminate entire categories of bugs -- if the enum transition is invalid, the transaction reverts",
      "Off-chain computation with on-chain verification is the pragmatic pattern for AI + blockchain integration",
      "Gas optimization is a design discipline, not an afterthought -- storage layout decisions compound across every transaction",
      "Web3 UX requires more state management than Web2 -- every action has pending, confirming, and confirmed phases",
      "IPFS content-addressing solves the data integrity problem without paying for on-chain storage",
      "DAO-based moderation and ZK-proofs for privacy verification are clear next steps for production hardening",
    ],
  },
  {
    id: 0,
    slug: "smart-campus-assistant",
    title: "SMART CAMPUS ASSISTANT",
    description:
      "Full-stack campus navigation and lost & found system. Integrated NLP chatbot with CNN-based image recognition for item tracking. Deployed with Docker microservices, NGINX reverse proxy, and automated CI/CD via GitHub Actions.",
    tags: ["Angular", "Spring Boot", "Docker", "CI/CD", "NLP", "CNN", "REST API"],
    category: "Intelligent Systems",
    status: "shipped",
    year: "2024",
    stars: 0,
    forks: 0,
    url: "https://github.com/bahaell/smart-campus-assistant",
    homepage: undefined,
    featured: true,
    highlight: false,
    videoUrl: "https://res.cloudinary.com/dthmw5ptp/video/upload/q_auto/f_auto/v1775661891/L_F_upnled.mp4",

    context: {
      why: "University campuses lack a unified digital layer for navigation, services, and lost item recovery. Students waste time with fragmented systems and manual processes.",
      problemSpace:
        "The system needed to handle real-time campus navigation, an NLP-driven chatbot for student queries, and a CNN-based image recognition pipeline for matching lost items against a database of found objects.",
      constraints:
        "Delivered within a single academic semester. Team of 4. No budget for cloud GPU instances. Had to run inference on CPU-only containers.",
    },
    coreFeatures: [
      {
        title: "NLP Chatbot Engine",
        description:
          "Intent classification and entity extraction pipeline that routes student queries to the correct campus service. Handles ambiguous input with fallback strategies.",
      },
      {
        title: "CNN Image Matching",
        description:
          "Convolutional neural network trained on campus-specific item categories. Accepts photo uploads and returns ranked similarity matches against the found-items database.",
      },
      {
        title: "Microservice Orchestration",
        description:
          "Each domain (navigation, chatbot, lost-and-found, auth) runs as an independent Docker container behind an NGINX reverse proxy. Services communicate over internal REST APIs.",
      },
      {
        title: "CI/CD Pipeline",
        description:
          "GitHub Actions workflow: lint, test, build Docker images, push to registry, deploy to staging. Automated rollback on health check failure.",
      },
    ],
    engineeringDecisions: [
      {
        decision: "Spring Boot over Express for backend services",
        reasoning:
          "The team had stronger Java experience. Spring Boot's dependency injection and built-in security made it faster to build secure REST APIs under time pressure.",
      },
      {
        decision: "Angular for the frontend",
        reasoning:
          "TypeScript-first, strong form handling, and RxJS for managing real-time chatbot streams. The opinionated structure kept 4 developers consistent.",
      },
      {
        decision: "CPU-only CNN inference",
        reasoning:
          "No GPU budget. Optimized the model with quantization and batch inference. Acceptable latency for the use case (sub-3s per image match).",
      },
      {
        decision: "Docker Compose for orchestration",
        reasoning:
          "Kubernetes was overkill for 4 services. Compose gave us reproducible local dev and simple production deployment on a single university server.",
      },
    ],
    challenges: [
      {
        obstacle: "CNN model accuracy on diverse item categories",
        resolution:
          "Data augmentation pipeline (rotation, color jitter, background swap) increased training set 5x. Fine-tuned a pre-trained ResNet-18 backbone instead of training from scratch.",
      },
      {
        obstacle: "Chatbot handling ambiguous or multi-intent queries",
        resolution:
          "Implemented a confidence threshold with clarification prompts. Below 0.6 confidence, the bot asks a disambiguation question instead of guessing.",
      },
      {
        obstacle: "Service discovery between containers",
        resolution:
          "Used Docker Compose networking with fixed service names. NGINX upstream blocks route by path prefix. No external service mesh needed.",
      },
    ],
    impact: {
      summary:
        "Delivered a production-ready campus platform that demonstrated full-stack architecture, ML inference pipelines, and containerized deployment in an academic context.",
      points: [
        "End-to-end system design from database schema to deployment pipeline",
        "Applied ML in a resource-constrained environment (CPU-only inference)",
        "Managed a 4-person team with Agile sprints and code review culture",
        "Automated deployment reduced release cycle from hours to minutes",
      ],
    },
    architecture: `+--------------+     +---------------+     +---------------+
|   Angular    |---->|     NGINX     |---->|  Spring Boot  |
|   Frontend   |     | Reverse Proxy |     |   Auth API    |
+--------------+     +-------+-------+     +---------------+
                             |
               +-------------+-------------+
               |             |             |
         +-----v----+  +-----v----+  +-----v----+
         |Navigation|  |  Chatbot |  |Lost&Found|
         | Service  |  |  Service |  | Service  |
         +----------+  +----------+  +-----+----+
                                           |
                                     +-----v----+
                                     | CNN Model|
                                     | Service  |
                                     +----------+`,
    keyLearnings: [
      "CPU-bound ML inference is viable for non-realtime use cases when you optimize aggressively",
      "Docker Compose scales well enough for small service counts -- don't reach for Kubernetes prematurely",
      "NLP confidence thresholds with fallback prompts dramatically improve chatbot UX over binary intent matching",
      "Automated CI/CD is non-negotiable even for academic projects -- it saved us from deployment-day chaos",
    ],
  },
  {
    id: 1,
    slug: "healthconnect",
    title: "HEALTHCONNECT",
    description:
      "Secure medical appointment booking platform. Implemented OAuth 2.0 and JWT-based authentication, real-time notifications, and AI chatbot powered by Gemini API. Dockerized full-stack with MongoDB and secure REST API design.",
    tags: ["Angular", "Node.js", "Express", "MySQL", "OAuth2", "JWT", "Docker"],
    category: "Web Systems",
    status: "archived",
    year: "2024",
    stars: 0,
    forks: 0,
    url: "https://github.com/bahaell/HealthConnect",
    homepage: undefined,
    featured: true,
    context: {
      why: "Medical appointment scheduling in many clinics still relies on phone calls and paper. Patients need self-service booking with secure health data handling.",
      problemSpace:
        "Build a secure appointment booking system that handles sensitive medical data, supports real-time availability, and integrates an AI assistant for patient queries.",
      constraints:
        "HIPAA-awareness required (data encryption at rest and in transit). OAuth 2.0 mandated for third-party auth. Two-month timeline.",
    },
    coreFeatures: [
      {
        title: "OAuth 2.0 + JWT Auth Pipeline",
        description:
          "Full authentication flow with Google OAuth, JWT access/refresh tokens, role-based access control for patients, doctors, and admins.",
      },
      {
        title: "Real-time Notification System",
        description:
          "WebSocket-based notifications for appointment confirmations, reminders, and cancellations. Graceful fallback to polling for unsupported clients.",
      },
      {
        title: "Gemini-powered AI Chatbot",
        description:
          "Patient-facing chatbot that answers scheduling questions, explains procedures, and suggests available time slots based on doctor availability.",
      },
      {
        title: "Appointment Conflict Resolution",
        description:
          "Optimistic concurrency control prevents double-booking. Database-level constraints with application-layer validation and user-friendly error recovery.",
      },
    ],
    engineeringDecisions: [
      {
        decision: "Express.js over Spring Boot for this project",
        reasoning:
          "Faster iteration speed for a two-month timeline. The team was more productive in TypeScript. Express middleware pattern fit well for auth pipelines.",
      },
      {
        decision: "MySQL over MongoDB for patient records",
        reasoning:
          "Medical data has strict relational integrity requirements. Foreign keys and transactions were necessary for appointment consistency.",
      },
      {
        decision: "WebSocket with polling fallback",
        reasoning:
          "Not all hospital network proxies support persistent WebSocket connections. The fallback ensures notifications work in restrictive network environments.",
      },
    ],
    challenges: [
      {
        obstacle: "JWT token refresh without disrupting user sessions",
        resolution:
          "Silent refresh using httpOnly cookies and a dedicated /refresh endpoint. Axios interceptor queues requests during refresh and replays them.",
      },
      {
        obstacle: "Gemini API rate limits during peak booking hours",
        resolution:
          "Response caching for common queries. Queue system for non-urgent requests. Fallback to pre-built FAQ responses when rate-limited.",
      },
    ],
    impact: {
      summary:
        "Built a production-grade medical booking platform demonstrating secure authentication patterns, real-time systems, and AI integration within healthcare constraints.",
      points: [
        "Implemented OAuth 2.0 + JWT from scratch with proper token rotation",
        "Designed real-time notification architecture with graceful degradation",
        "Integrated LLM-based chatbot with rate limiting and caching strategies",
        "Database-level concurrency control for appointment integrity",
      ],
    },
    architecture: `+--------------+     +---------------+
|   Angular    |---->|  Express.js   |
|   Frontend   |<----|   REST API    |
+------+-------+     +-------+-------+
       |   WebSocket         |
       +---------------------+
               +-------------+-------------+
               |             |             |
         +-----v----+  +-----v----+  +-----v----+
         |  MySQL   |  |   Auth   |  |  Gemini  |
         |    DB    |  |  OAuth2  |  | Chatbot  |
         +----------+  +----------+  +----------+`,
    keyLearnings: [
      "Silent JWT refresh with request queuing is essential for smooth auth UX",
      "LLM integration in production requires caching, rate limiting, and fallback strategies from day one",
      "WebSocket reliability varies wildly across network environments -- always have a polling fallback",
    ],
  },
  {
    id: 2,
    slug: "car-rental-platform",
    title: "CAR RENTAL PLATFORM",
    description:
      "End-to-end car rental system with interactive vehicle tracking map. Integrated QR code-based reservation confirmation, secure payment processing via Flouci API, and real-time availability management.",
    tags: ["Angular", "Node.js", "MongoDB", "Docker", "Payment API", "QR Code"],
    category: "Web Systems",
    status: "archived",
    year: "2023",
    stars: 0,
    forks: 0,
    url: "https://github.com/bahaell/CarRental",
    featured: false,
    context: {
      why: "Local car rental agencies in Tunisia relied on manual processes and phone-based booking. No digital system existed for small operators.",
      problemSpace:
        "Create a full booking pipeline: browse vehicles, reserve with payment, receive QR confirmation, and track vehicle location on an interactive map.",
      constraints:
        "Flouci API (Tunisian payment gateway) had limited documentation. MongoDB chosen for flexible vehicle schema. Mobile-first design requirement.",
    },
    coreFeatures: [
      {
        title: "Interactive Vehicle Tracking Map",
        description:
          "Leaflet-based map displaying real-time vehicle locations. Marker clustering for dense areas. Click-to-book directly from map view.",
      },
      {
        title: "QR-based Reservation System",
        description:
          "Each confirmed booking generates a unique QR code containing encrypted reservation data. Agency staff scan to verify pickups.",
      },
      {
        title: "Flouci Payment Integration",
        description:
          "Full payment flow with the Tunisian Flouci API. Handles payment initiation, webhook confirmation, and automatic booking status updates.",
      },
    ],
    engineeringDecisions: [
      {
        decision: "MongoDB over SQL for vehicle data",
        reasoning:
          "Vehicle attributes vary significantly (cars vs motorcycles vs vans). Document model avoided schema migration overhead for evolving vehicle types.",
      },
      {
        decision: "QR codes with encrypted payloads",
        reasoning:
          "Offline verification at pickup locations with unreliable internet. Encrypted payload prevents tampering without requiring a network call.",
      },
    ],
    challenges: [
      {
        obstacle: "Flouci API documentation gaps",
        resolution:
          "Reverse-engineered payment flow from their demo app. Built a comprehensive integration test suite to verify webhook behavior.",
      },
      {
        obstacle: "Map performance with 500+ vehicle markers",
        resolution:
          "Implemented marker clustering with Leaflet.markercluster. Lazy-loaded vehicle details on marker click instead of preloading all data.",
      },
    ],
    impact: {
      summary:
        "Delivered a complete rental platform for a local Tunisian agency, demonstrating payment integration, geolocation systems, and offline-capable verification.",
      points: [
        "Third-party payment API integration with limited documentation",
        "Offline-capable QR verification system for unreliable network environments",
        "Map-based UX with performance optimization for large marker datasets",
      ],
    },
    keyLearnings: [
      "Poorly documented APIs require investment in integration testing -- it pays off in deployment stability",
      "Offline-first patterns (QR with encrypted payload) solve real infrastructure problems in emerging markets",
    ],
  },
  {
    id: 3,
    slug: "access-control-crm",
    title: "ACCESS CONTROL & CRM SYSTEM",
    description:
      "Internship project: Facial recognition-based access control and membership management. Python-based face_recognition pipeline integrated with Spring Boot APIs. Automated booking system, real-time notifications, and Agile delivery process.",
    tags: ["Angular", "Spring Boot", "Python", "Facial Recognition", "MySQL", "REST API"],
    category: "Intelligent Systems",
    status: "archived",
    year: "2023",
    stars: 0,
    forks: 0,
    url: "undefined",
    featured: true,
    videoUrl: "https://res.cloudinary.com/dthmw5ptp/video/upload/q_auto/f_auto/v1775661924/CRM_hk4iiw.mp4",
    context: {
      why: "A fitness center needed to replace manual ID card check-ins with automated facial recognition and integrate it with their membership management system.",
      problemSpace:
        "Build a real-time facial recognition access control system that integrates with a CRM for membership tracking, automated billing, and booking management.",
      constraints:
        "Internship project with 3-month timeline. Had to integrate with existing security cameras. Python face_recognition library chosen for rapid prototyping.",
    },
    coreFeatures: [
      {
        title: "Real-time Facial Recognition Pipeline",
        description:
          "Python service captures camera frames, detects faces using dlib/HOG, encodes them, and matches against the member database with configurable similarity thresholds.",
      },
      {
        title: "CRM with Membership Lifecycle",
        description:
          "Full member management: registration with face enrollment, subscription tiers, automated renewal reminders, and access history logging.",
      },
      {
        title: "Automated Booking System",
        description:
          "Members book classes and facilities. System enforces capacity limits, handles waitlists, and sends confirmation via email and in-app notifications.",
      },
    ],
    engineeringDecisions: [
      {
        decision: "Python microservice for face recognition, Spring Boot for business logic",
        reasoning:
          "Python has the best face recognition ecosystem (dlib, face_recognition). Spring Boot handles the CRM, auth, and booking with stronger enterprise patterns.",
      },
      {
        decision: "Inter-service communication via REST, not message queue",
        reasoning:
          "Only two services needed to communicate. REST kept the architecture simple. Face recognition results were synchronous (wait for match before granting access).",
      },
    ],
    challenges: [
      {
        obstacle: "Face recognition accuracy under varying lighting conditions",
        resolution:
          "Histogram equalization preprocessing on camera frames. Multiple face encodings per member (different angles, lighting). Configurable threshold with admin override.",
      },
      {
        obstacle: "Camera integration with existing hardware",
        resolution:
          "Built an RTSP stream consumer that works with standard IP cameras. Abstracted camera interface so the system is hardware-agnostic.",
      },
    ],
    impact: {
      summary:
        "Delivered a working access control system deployed at a fitness center, replacing manual ID checks with automated facial recognition and integrated membership management.",
      points: [
        "Production ML pipeline with real hardware integration (IP cameras)",
        "Cross-language microservice architecture (Python + Java)",
        "Delivered under Agile methodology with sprint reviews and stakeholder demos",
        "System processed 200+ daily check-ins with sub-second recognition",
      ],
    },
    architecture: `+----------+     +--------------+     +---------------+
| IP Camera|---->|    Python    |---->|  Spring Boot  |
|  (RTSP)  |     | Face Service |     |   CRM API     |
+----------+     +--------------+     +-------+-------+
                                              |
                                +-------------+-------------+
                                |             |             |
                          +-----v----+  +-----v----+  +-----v----+
                          |  MySQL   |  | Booking  |  |  Notif.  |
                          |    DB    |  |  Engine  |  | Service  |
                          +----------+  +----------+  +----------+`,
    keyLearnings: [
      "Face recognition in production is 80% preprocessing and environment control, 20% model quality",
      "Cross-language service boundaries (Python + Java) work well when the interface contract is clear",
      "Agile ceremonies with real stakeholder demos kept the internship project on track and aligned",
    ],
  },
  {
    id: 6,
    slug: "portfolio-saas-platform",
    title: "PORTFOLIO SAAS PLATFORM",
    description:
      "A Portfolio-as-a-Service platform designed for developers and engineers who want a scalable, data-driven personal brand. Transforms a static portfolio into a real product with authentication, content management, analytics, and extensibility.",
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "MongoDB",
      "Mongoose",
      "Auth.js",
      "Vercel",
    ],
    category: "Web Systems",
    status: "in-progress",
    year: "2025",
    stars: 0,
    forks: 0,
    url: "https://github.com/bahaell/portfolio-saas",
    homepage: undefined,
    featured: true,
    highlight: false,
    context: {
      why: "Static portfolios don't scale. They have no separation between content, logic, and presentation. There's no analytics, no iteration loop, and no product thinking. This project exists to prove that a portfolio can be architected as a real SaaS product -- with data-driven content, extensible modules, and a platform mindset from day one.",
      problemSpace:
        "Design and build a modular portfolio platform that decouples content from presentation, supports multiple content types (projects, notes, roadmaps), and is architected for eventual multi-tenant SaaS delivery with authentication, admin CMS, and usage analytics.",
      constraints:
        "Solo developer. Must remain deployable and functional at every stage -- no big-bang releases. Architecture decisions made upfront to prevent rewrites as feature scope grows. Must work as a personal portfolio today while being extensible into a SaaS product tomorrow.",
    },
    coreFeatures: [
      {
        title: "Modular Project System",
        description:
          "Projects are defined as structured data objects with typed schemas. Each project contains metadata, case study content, engineering decisions, and architecture snapshots. Adding a new project requires only data -- no new components or routes.",
      },
      {
        title: "Engineering Notes / Technical Content",
        description:
          "A dedicated content system for technical writing, lab notes, and decision logs. Supports categorized, searchable content that serves as both a knowledge base and a portfolio differentiator.",
      },
      {
        title: "Dynamic Project Detail Pages",
        description:
          "Each project renders a full immersive detail page from structured data. Project-specific rendering logic (AWS services strip, blockchain timeline, etc.) is handled through conditional composition, not separate page templates.",
      },
      {
        title: "JSON-driven Content Structure",
        description:
          "All portfolio content is driven by typed data files. The rendering layer reads from data -- it never owns content. This separation enables future migration to a CMS or database backend without touching the UI.",
      },
    ],
    engineeringDecisions: [
      {
        decision: "MongoDB for flexible content modeling",
        reasoning:
          "Portfolio content evolves constantly -- new project types, new section formats, new metadata fields. MongoDB's schema-flexible documents accommodate this without migrations. Mongoose provides validation and type safety at the application layer.",
      },
      {
        decision: "JSON-driven UI for extensibility",
        reasoning:
          "Hard-coding content in components creates coupling that prevents iteration. Externalizing content into typed data structures means the rendering layer can evolve independently. It also enables future features like admin editing, content versioning, and A/B testing.",
      },
      {
        decision: "Next.js App Router for long-term maintainability",
        reasoning:
          "App Router provides server components, streaming, and built-in caching patterns that align with a platform architecture. Server-side rendering for SEO, client interactivity where needed, and API routes for backend logic -- all in one framework.",
      },
      {
        decision: "Architecture designed before feature expansion",
        reasoning:
          "The modular structure, data separation, and component composition patterns were established before adding complex features. This prevents the common trap of retrofitting architecture onto a codebase that has already accumulated tech debt.",
      },
    ],
    challenges: [
      {
        obstacle: "Designing before coding",
        resolution:
          "Spent time mapping the data model, component hierarchy, and routing structure before writing implementation code. Used TypeScript interfaces as living documentation of the architecture. Every component has a clear responsibility boundary.",
      },
      {
        obstacle: "Avoiding premature optimization",
        resolution:
          "Resisted the urge to build the CMS, auth system, and analytics before the core content rendering was solid. Each feature is added only when the foundation it builds on is stable and tested.",
      },
      {
        obstacle: "Building with SaaS mindset, not demo mindset",
        resolution:
          "Every architectural decision is evaluated against multi-tenant requirements. Data isolation, configurable theming, and modular content types are designed in -- not bolted on later.",
      },
      {
        obstacle: "Balancing product vision and engineering constraints",
        resolution:
          "Maintained a clear roadmap with three horizons: what works today (content rendering), what's next (auth + admin), and what's later (multi-tenant SaaS). Each horizon builds on the previous without breaking it.",
      },
    ],
    impact: {
      summary:
        "An actively evolving portfolio platform that demonstrates SaaS product thinking, modular architecture, and engineering discipline. The project serves as both a personal brand tool and a proof of concept for portfolio-as-a-service.",
      points: [
        "Clean separation of content, logic, and presentation layers",
        "Modular, data-driven architecture supporting multiple content types",
        "TypeScript-first design with typed schemas as living documentation",
        "Deployable and functional at every development stage",
        "Architected for multi-tenant SaaS from the ground up",
        "Product thinking applied to a personal engineering tool",
      ],
    },
    architecture: `+------------------------------------------------------------------+
|                     PORTFOLIO SAAS PLATFORM                      |
|                                                                  |
|  +------------------------------------------------------------+  |
|  |                    PRESENTATION LAYER                      |  |
|  |  Next.js App Router --- Server Components --- Tailwind CSS |  |
|  |  Dynamic Routes --- Conditional Composition --- Glass UI   |  |
|  +------------------------+-----------------------------------+  |
|                           |                                      |
|  +------------------------v-----------------------------------+  |
|  |                      DATA LAYER                            |  |
|  |  TypeScript Interfaces --- Typed Data Files --- Schemas    |  |
|  |  Projects --- Notes --- Roadmap --- Experience             |  |
|  +------------------------+-----------------------------------+  |
|                           |                                      |
|  +------------------------v-----------------------------------+  |
|  |                    BACKEND (Planned)                       |  |
|  |  API Routes --- Auth.js --- MongoDB / Mongoose             |  |
|  |  Admin CMS --- Analytics --- Multi-tenant Config           |  |
|  +------------------------------------------------------------+  |
|                                                                  |
|  +--------+  +---------+  +------------+  +------------------+   |
|  | Vercel |  | MongoDB |  |  Auth.js   |  |    Analytics     |   |
|  | Deploy |  |  Atlas  |  | (Planned)  |  |    (Planned)     |   |
|  +--------+  +---------+  +------------+  +------------------+   |
+------------------------------------------------------------------+`,
    keyLearnings: [
      "Architecture decisions compound -- establishing data separation early prevents the rewrite trap as features grow",
      "A portfolio is a product. Treating it as one changes every design and engineering decision for the better",
      "TypeScript interfaces as living documentation scales better than external specs that drift from implementation",
      "Building in public (in-progress visibility) creates accountability and demonstrates engineering transparency",
      "The best time to design for multi-tenancy is before the first tenant -- retrofitting isolation is always harder",
    ],
  },
  {
    id: 7,
    slug: "movie-app-flutter",
    title: "MOVIE APP",
    description:
      "A cross-platform movie discovery application built with Flutter and Firebase. Supports user authentication, favorites-based matching, role-based access (admin/user), and real-time movie management using Firebase services and the TMDB API.",
    tags: [
      "Flutter",
      "Dart",
      "Firebase",
      "Firestore",
      "Firebase Auth",
      "TMDB API",
      "Provider",
    ],
    category: "Mobile",
    status: "archived",
    year: "2025",
    stars: 0,
    forks: 0,
    url: "https://github.com/bahaell/movie_app",
    homepage: undefined,
    featured: true,
    highlight: false,
    context: {
      why: "Movie discovery apps are a saturated space, but most tutorials produce flat CRUD demos. This project was designed to demonstrate production-grade mobile architecture patterns -- role-based access, service-layer separation, real-time synchronization, and external API integration -- within a domain that is complex enough to demand real engineering decisions.",
      problemSpace:
        "Build a cross-platform mobile application that combines external movie data (TMDB) with a Firebase backend, supporting two distinct user roles (user/admin) with entirely different workflows, real-time data synchronization, and a matching system based on user preferences.",
      constraints:
        "Academic project with a fixed timeline. Firebase free tier for all backend services. TMDB API with rate limits. Flutter chosen for cross-platform delivery (iOS + Android from a single codebase).",
    },
    coreFeatures: [
      {
        title: "Movie Discovery & Filtering",
        description:
          "Browse movies by category (popular, top-rated, now playing, upcoming) with genre-based filtering. Dynamic data fetched from TMDB API with local caching for offline resilience. Search with debounced input and paginated results.",
      },
      {
        title: "Watchlist & Favorites System",
        description:
          "Real-time favorites management using Firestore arrayUnion/arrayRemove operations. UI listens via Firestore streams for instant updates across devices. Defensive handling of null users and race conditions on rapid add/remove actions.",
      },
      {
        title: "Favorites-Based User Matching",
        description:
          "Algorithmic matching that compares favorites list intersections between users. Suggests users with shared movie interests. Handles edge cases: empty favorites, null users, single-user scenarios. Engineering-driven, not recommendation-engine marketing.",
      },
      {
        title: "Admin Dashboard & Movie Import",
        description:
          "Role-protected admin interface for managing the movie library and user accounts. Admins search TMDB, preview results, and import movies into Firestore with normalized data schemas. User activation/deactivation controls with real-time enforcement.",
      },
      {
        title: "Authentication & Role Management",
        description:
          "Firebase Authentication with email/password. Firestore users collection controls isAdmin and disabled flags. Runtime role checks via AuthProvider. Admin-only routes protected at both UI and logic layers.",
      },
      {
        title: "TMDB Data Normalization Pipeline",
        description:
          "Movies imported from TMDB are normalized before Firestore insertion: title, poster path, overview, genre IDs resolved to names via TMDB genre mapping, vote average, and release date. Ensures consistent data shape regardless of API response variations.",
      },
    ],
    engineeringDecisions: [
      {
        decision: "Provider over Riverpod or BLoC for state management",
        reasoning:
          "Provider offers sufficient complexity for this app's state requirements without the boilerplate of BLoC or the learning curve of Riverpod. The team could move faster and maintain clearer separation between UI and business logic.",
      },
      {
        decision: "Firebase over custom backend",
        reasoning:
          "Firebase provides authentication, real-time database, and hosting in a single SDK. For an academic timeline, eliminating backend infrastructure management let the team focus on application architecture and user experience.",
      },
      {
        decision: "Firestore document model for user favorites",
        reasoning:
          "Storing favorites as an array field on the user document keeps reads cheap (single document fetch). arrayUnion/arrayRemove operations are atomic, preventing race conditions on concurrent add/remove actions.",
      },
      {
        decision: "TMDB API with local normalization over direct storage",
        reasoning:
          "TMDB data structures vary between endpoints. Normalizing before Firestore insertion ensures a consistent schema. Genre IDs are resolved to human-readable names at import time, not at render time.",
      },
      {
        decision: "Service-layer architecture over direct Firebase calls in widgets",
        reasoning:
          "All Firebase and TMDB interactions are encapsulated in dedicated service classes. Widgets never call Firebase directly. This separation enables unit testing, mocking, and potential backend migration without touching UI code.",
      },
    ],
    challenges: [
      {
        obstacle: "Managing real-time state across multiple user roles",
        resolution:
          "AuthProvider centrally manages role state and exposes it to the widget tree. Route guards check role before navigation. Admin-specific streams are only subscribed when the current user has admin privileges, reducing unnecessary Firestore reads.",
      },
      {
        obstacle: "Structuring Flutter beyond simple screens",
        resolution:
          "Adopted a layered architecture: services (API/Firebase), providers (business logic), and widgets (UI). Each layer has a clear responsibility boundary. Shared widgets are extracted into a component library to prevent duplication.",
      },
      {
        obstacle: "Handling edge cases in async Firebase flows",
        resolution:
          "Defensive null checks on user state before any Firestore operation. Optimistic UI updates with rollback on failure. Error boundaries at the provider level with user-friendly messages propagated to the UI.",
      },
      {
        obstacle: "TMDB API key security and environment separation",
        resolution:
          "API key stored in environment configuration, not hardcoded. Identified as a production concern: in a shipped product, API calls should be proxied through a backend to prevent key exposure in client bundles.",
      },
      {
        obstacle: "Favorites matching with inconsistent user data",
        resolution:
          "Matching algorithm validates input before computation: empty favorites return no matches, null users are filtered, and minimum intersection threshold prevents noise matches. Results are sorted by match strength.",
      },
    ],
    impact: {
      summary:
        "Delivered a cross-platform mobile application demonstrating production-grade Flutter architecture -- service-layer separation, real-time state management, role-based access control, and external API integration. The project positions mobile development as a serious engineering discipline, not a tutorial exercise.",
      points: [
        "Cross-platform delivery (iOS + Android) from a single Flutter codebase",
        "Role-based architecture with distinct admin and user workflows",
        "Real-time synchronization via Firestore streams with defensive state handling",
        "Service-layer separation enabling testability and backend portability",
        "External API integration with data normalization and caching patterns",
        "Algorithmic matching system with edge case handling and relevance scoring",
      ],
    },
    architecture: `+------------------------------------------------------------------+
|                       FLUTTER APPLICATION                        |
|                                                                  |
|  +------------------------------------------------------------+  |
|  |                     UI LAYER (Widgets)                     |  |
|  |  Movie Screens --- Admin Dashboard --- Auth Screens        |  |
|  |  Favorites View --- Matching View --- Search               |  |
|  +-------------------------+----------------------------------+  |
|                            |                                     |
|  +-------------------------v----------------------------------+  |
|  |                   PROVIDER LAYER (State)                   |  |
|  |  AuthProvider --- MovieProvider --- FavoritesProvider      |  |
|  |  AdminProvider --- MatchingProvider                        |  |
|  +-------------------------+----------------------------------+  |
|                            |                                     |
|  +-------------------------v----------------------------------+  |
|  |                   SERVICE LAYER (Data)                     |  |
|  |  TMDBService --- FirestoreService --- AuthService          |  |
|  |  MatchingService --- CacheService                          |  |
|  +-------------------------+----------------------------------+  |
|                            |                                     |
+----------------------------+-------------------------------------+
                             |
              +--------------+--------------+
              |              |              |
        +-----v-----+  +-----v-----+  +-----v-----+
        |  Firebase |  |  Firebase |  |   TMDB    |
        |   Auth    |  | Firestore |  |    API    |
        |           |  | (Movies,  |  |(External) |
        | Email/Pwd |  |  Users)   |  |           |
        +-----------+  +-----------+  +-----------+`,
    keyLearnings: [
      "Service-layer separation in Flutter pays dividends immediately -- mocking Firebase for tests becomes trivial when widgets never call it directly",
      "Provider is sufficient for most mobile state management needs. Reaching for BLoC or Riverpod prematurely adds complexity without proportional benefit",
      "Firestore arrayUnion/arrayRemove operations are atomic but not transactional -- defensive UI patterns are still necessary for rapid user actions",
      "API key management is a design decision, not a deployment detail. Client-side API calls should be proxied in production to prevent key exposure",
      "Role-based access control requires enforcement at both the UI level (route guards) and the data level (Firestore rules) to be meaningful",
    ],
  },
]

export function getProjectBySlug(slug: string): ProjectDetail | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug)
}
