import type { TechSkillKey } from '@/prisma/seeds/catalogs/tech-skills'

export type TechStackItem = {
  techKey: TechSkillKey
  name: string
  logo: string
}

export const useTechSkillCat = () => {
  const techSkillCat = useState<TechStackItem[]>('techSkillCat', () => [])

  const { error } = useFetch<TechStackItem[]>('/api/tech-cat', {
    immediate: techSkillCat.value.length === 0,
    onResponse({ response }) {
      techSkillCat.value = response._data ?? []
    },
    onResponseError() {
      fireErrorToast('No se pudo obtener el catálogo de tecnologías')
    }
  })

  return { techSkillCat, error }
}
