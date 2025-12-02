<script setup lang="ts">
const config = useRuntimeConfig()

const { data: recipes, error } = await useAsyncData('recipes', async () => {
  const { data } = await $fetch<{ data: Recipe[] }>(`${config.public.apiUrl}/api/recipes`)
  return data
})

if (error && error.value) throw new Error('Page not Found')
</script>
<template>
  <div>
    <MyTitle as="h1">Homepage</MyTitle>
    <ul>
      <li v-for="(recipe, index) in recipes" :key="index">
        <NuxtLink :to="`/recipe/${recipe.recipe_id}`">{{ recipe.title }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>