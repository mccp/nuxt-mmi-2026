<script lang="ts" setup>
const route = useRoute()
</script>

<template>
  <div>
    <h1>l'article {{ route.params.slug }}</h1>
  </div>
</template>