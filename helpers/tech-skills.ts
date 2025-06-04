import { techSkillCat } from '~/prisma/seeds/catalogs/tech-skills'

export type TechSkillKey = (typeof techSkillCat)[number]['key']

const techSkillsLogos = new Map<TechSkillKey, string>()

for (const techSkill of techSkillCat) {
  techSkillsLogos.set(techSkill.key, techSkill.logo)
}

export { techSkillsLogos }
