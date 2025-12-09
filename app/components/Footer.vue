<script lang="ts" setup>
defineProps<{ logo: string, text: string }>()
</script>
<template>
  <footer>

    <img :src="logo" alt="">

    <p>{{ text }}</p>

    <ul>
      <li><a href="/">Homepage</a></li>
      <li><a href="/books">Liste des livres</a></li>
    </ul>

  </footer>
</template>
<style lang="scss" scoped>
</style>