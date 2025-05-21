<template>
  <section class="min-h-screen bg-gray-950 text-white flex flex-col items-center py-4 overflow-hidden">
    <Head>
      <Title>Ejemplo devfolio</Title>
    </Head>

    <main id="devfolio-container" as="main" class="border w-5xl flex flex-col items-center gap-8 px-8">
      <page-blocks-hero />

      <page-blocks-contact />

      <page-blocks-experience />

      <page-blocks-projects />

      <page-blocks-skills />

      <page-blocks-education />

      <blocks-certificates />
    </main>

    <footer class="mt-4">
      Creado con MyDevfolio
    </footer>
  </section>
</template>
