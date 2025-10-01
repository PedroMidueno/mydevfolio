import { techSkillCat, type TechSkillKey } from '~/prisma/seeds/catalogs/tech-skills'

const techSkillsLogos = new Map<TechSkillKey, string>()

for (const techSkill of techSkillCat) {
  techSkillsLogos.set(techSkill.key, techSkill.logo)
}

export { techSkillsLogos }
