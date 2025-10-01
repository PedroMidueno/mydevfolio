export type TechSkillKey = 'html' | 'css' | 'javascript' | 'tailwindcss' | 'reactjs'
  | 'vuejs' | 'angular' | 'astrojs' | 'nodejs' | 'expressjs' | 'nestjs' | 'bash'
  | 'c' | 'cpp' | 'cobol' | 'dart' | 'graphql' | 'go' | 'java' | 'kotlin' | 'markdown'
  | 'php' | 'python' | 'ruby' | 'rust' | 'sass' | 'swift' | 'typescript' | 'zig'
  | 'bun' | 'deno' | 'drizzleorm' | 'prismaorm' | 'jquery' | 'lit' | 'piniastore'
  | 'preact' | 'prettier' | 'reactrouter' | 'redux' | 'rxjs' | 'shadcnui' | 'styledcomponents'
  | 'svelte' | 'tanstack' | 'taurijs' | 'tensorflow' | 'threejs' | 'webcomponents'
  | 'zod' | 'stripe' | 'spring' | 'csharp' | 'nuxtjs' | 'nextjs'

export interface ITechSkillCat {
  name: string
  logo: string
  key: TechSkillKey
}

export const techSkillCat: ITechSkillCat[] = [
  {
    name: 'HTML',
    logo: 'https://svgl.app/library/html5.svg',
    key: 'html'
  },
  {
    name: 'CSS',
    logo: 'https://svgl.app/library/css.svg',
    key: 'css'
  },
  {
    name: 'JavaScript',
    logo: 'https://svgl.app/library/javascript.svg',
    key: 'javascript'
  },
  {
    name: 'TailwindCSS',
    logo: 'https://svgl.app/library/tailwindcss.svg',
    key: 'tailwindcss'
  },
  {
    name: 'ReactJs',
    logo: 'https://svgl.app/library/react_dark.svg',
    key: 'reactjs'
  },
  {
    name: 'VueJs',
    logo: 'https://svgl.app/library/vue.svg',
    key: 'vuejs'
  },
  {
    name: 'Angular',
    logo: 'https://svgl.app/library/angular.svg',
    key: 'angular'
  },
  {
    name: 'AstroJs',
    logo: 'https://svgl.app/library/astro_dark.svg',
    key: 'astrojs'
  },
  {
    name: 'NodeJs',
    logo: 'https://svgl.app/library/nodejs.svg',
    key: 'nodejs'
  },
  {
    name: 'ExpressJs',
    logo: 'https://svgl.app/library/expressjs_dark.svg',
    key: 'expressjs'
  },
  {
    name: 'NestJs',
    logo: 'https://svgl.app/library/nestjs.svg',
    key: 'nestjs'
  },
  {
    name: 'Bash',
    logo: 'https://svgl.app/library/bash_dark.svg',
    key: 'bash'
  },
  {
    name: 'C',
    logo: 'https://svgl.app/library/c.svg',
    key: 'c'
  },
  {
    name: 'C++',
    logo: 'https://svgl.app/library/c-plusplus.svg',
    key: 'cpp'
  },
  {
    name: 'Cobol',
    logo: 'https://svgl.app/library/cobol.svg',
    key: 'cobol'
  },
  {
    name: 'Dart',
    logo: 'https://svgl.app/library/dart.svg',
    key: 'dart'
  },
  {
    name: 'GraphQL',
    logo: 'https://svgl.app/library/graphql.svg',
    key: 'graphql'
  },
  {
    name: 'Go',
    logo: 'https://svgl.app/library/golang_dark.svg',
    key: 'go'
  },
  {
    name: 'Java',
    logo: 'https://svgl.app/library/java.svg',
    key: 'java'
  },
  {
    name: 'Kotlin',
    logo: 'https://svgl.app/library/kotlin.svg',
    key: 'kotlin'
  },
  {
    name: 'Markdown',
    logo: 'https://svgl.app/library/markdown-dark.svg',
    key: 'markdown'
  },
  {
    name: 'PHP',
    logo: 'https://svgl.app/library/php_dark.svg',
    key: 'php'
  },
  {
    name: 'Python',
    logo: 'https://svgl.app/library/python.svg',
    key: 'python'
  },
  {
    name: 'Ruby',
    logo: 'https://svgl.app/library/ruby.svg',
    key: 'ruby'
  },
  {
    name: 'Rust',
    logo: 'https://svgl.app/library/rust_dark.svg',
    key: 'rust'
  },
  {
    name: 'Sass',
    logo: 'https://svgl.app/library/sass.svg',
    key: 'sass'
  },
  {
    name: 'Swift',
    logo: 'https://svgl.app/library/swift.svg',
    key: 'swift'
  },
  {
    name: 'TypeScript',
    logo: 'https://svgl.app/library/typescript.svg',
    key: 'typescript'
  },
  {
    name: 'Zig',
    logo: 'https://svgl.app/library/zig.svg',
    key: 'zig'
  },
  {
    name: 'Bun',
    logo: 'https://svgl.app/library/bun.svg',
    key: 'bun'
  },
  {
    name: 'Deno',
    logo: 'https://svgl.app/library/deno_dark.svg',
    key: 'deno'
  },
  {
    name: 'Drizzle ORM',
    logo: 'https://svgl.app/library/drizzle-orm_dark.svg',
    key: 'drizzleorm'
  },
  {
    name: 'Prisma ORM',
    logo: 'https://svgl.app/library/prisma_dark.svg',
    key: 'prismaorm'
  },
  {
    name: 'JQuery',
    logo: 'https://svgl.app/library/jquery_dark.svg',
    key: 'jquery'
  },
  {
    name: 'Lit',
    logo: 'https://svgl.app/library/lit.svg',
    key: 'lit'
  },
  {
    name: 'Pinia Store',
    logo: 'https://svgl.app/library/pinia.svg',
    key: 'piniastore'
  },
  {
    name: 'Preact',
    logo: 'https://svgl.app/library/preact.svg',
    key: 'preact'
  },
  {
    name: 'Prettier',
    logo: 'https://svgl.app/library/prettier-icon-dark.svg',
    key: 'prettier'
  },
  {
    name: 'React Router',
    logo: 'https://svgl.app/library/reactrouter.svg',
    key: 'reactrouter'
  },
  {
    name: 'Redux',
    logo: 'https://svgl.app/library/redux.svg',
    key: 'redux'
  },
  {
    name: 'RxJs',
    logo: 'https://svgl.app/library/rxjs.svg',
    key: 'rxjs'
  },
  {
    name: 'shadcn/ui',
    logo: 'https://svgl.app/library/shadcn-ui_dark.svg',
    key: 'shadcnui'
  },
  {
    name: 'Styled Components',
    logo: 'https://svgl.app/library/styledcomponents.svg',
    key: 'styledcomponents'
  },
  {
    name: 'Svelte',
    logo: 'https://svgl.app/library/svelte.svg',
    key: 'svelte'
  },
  {
    name: 'TanStack',
    logo: 'https://svgl.app/library/tanstack.svg',
    key: 'tanstack'
  },
  {
    name: 'TauriJS',
    logo: 'https://svgl.app/library/tauri.svg',
    key: 'taurijs'
  },
  {
    name: 'TensorFlow',
    logo: 'https://svgl.app/library/tensorflow.svg',
    key: 'tensorflow'
  },
  {
    name: 'ThreeJs',
    logo: 'https://svgl.app/library/threejs-dark.svg',
    key: 'threejs'
  },
  {
    name: 'Web Components',
    logo: 'https://svgl.app/library/webcomponents.svg',
    key: 'webcomponents'
  },
  {
    name: 'Zod',
    logo: 'https://svgl.app/library/zod.svg',
    key: 'zod'
  },
  {
    name: 'Stripe',
    logo: 'https://svgl.app/library/stripe.svg',
    key: 'stripe'
  },
  {
    name: 'Spring',
    logo: 'https://svgl.app/library/spring.svg',
    key: 'spring'
  },
  {
    name: 'C#',
    logo: 'https://svgl.app/library/csharp.svg',
    key: 'csharp'
  },
  {
    name: 'NuxtJs',
    logo: 'https://svgl.app/library/nuxt.svg',
    key: 'nuxtjs'
  },
  {
    name: 'NextJs',
    logo: 'https://svgl.app/library/nextjs_icon_dark.svg',
    key: 'nextjs'
  }
]
