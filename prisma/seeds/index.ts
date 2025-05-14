import { techSkillCat } from './catalogs/tech-skills'
import prisma from '@/lib/prisma'

async function main() {
  const queries = []

  for (const techSkillItem of techSkillCat) {
    const { key, name, logo } = techSkillItem

    const query = prisma.techSkillCat.upsert({
      where: { key },
      create: { key, name, logo },
      update: { name, logo }
    })

    queries.push(query)
  }

  return prisma.$transaction(queries)
}

main()
  .then(() => {
    console.log('Seed executed successfully!!!')
  })
  .catch(error => {
    console.log('error =>', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
