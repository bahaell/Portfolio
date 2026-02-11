import { getProjectBySlug, getAllProjectSlugs } from "@/data/projects"
import { ProjectDetailContent } from "@/components/public/projects/project-detail-content"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://eindev.ir"

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return { title: "Project Not Found" }

  return {
    title: project.title,
    description: project.description,
    keywords: project.tags,
    openGraph: {
      title: `${project.title} — BeE`,
      description: project.description,
      url: `${baseUrl}/projects/${slug}`,
      type: "article",
    },
    alternates: {
      canonical: `${baseUrl}/projects/${slug}`,
    },
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return <ProjectDetailContent project={project} />
}
