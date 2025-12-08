<script setup>
import { jwtDecode } from 'jwt-decode'

definePageMeta({
  middleware: ['auth']
})

const decodedToken = jwtDecode(useCookie('recipe_token').value)

function onLogoutClick () {
  const cookie = useCookie('recipe_token')
  cookie.value = null
  navigateTo('/login')
}

const config = useRuntimeConfig()

await useAsyncData('my-recipes', () => {
  const cookie = useCookie('recipe_token')
  return $fetch(`${config.public.apiUrl}/api/recipes/my-recipes`, {
    headers: {
      Authorization: `Bearer ${cookie.value}`
    }
  })
})


</script>

<template>
  <div class="p-dashboard">
    <h1>Dashboard</h1>
    <p>{{ decodedToken }}</p>
    <div class="l-container">
      <RecipesList />
    </div>
    <button @click="onLogoutClick">Déconnexion</button>
    <AddRecipeForm />
  </div>
</template>