<template>
  <div>
    <Header />
    <main class="pt-4 pb-12">
      <Nuxt />
    </main>
    <Footer />
  </div>
</template>

<script lang="ts">
export default {
  name: 'ShopLayout',
  head: {
    bodyAttrs: {
      class: 'bg-gray-100'
    }
  }
};
</script>
