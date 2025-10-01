import type { TechSkillKey } from '~/prisma/seeds/catalogs/tech-skills'

export type TechStackItem = {
  techKey: TechSkillKey
  name: string
  logo: string
}

export type IProjectItem = {
  id?: number
  title: string
  description: string
  deployUrl: string
  repositoryUrl?: string
  techStack: TechStackItem[]
  imageKey: string
}
