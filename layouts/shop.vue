<template>
  <div>
    <Header />
    <Nuxt />
    <Footer />
  </div>
</template>

<script lang="ts">
export default {
  name: "ShopLayout",
  head: {
    bodyAttrs: {
      class: "bg-gray-100"
    }
  }
};
</script>
