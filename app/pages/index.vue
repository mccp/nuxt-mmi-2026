<script setup lang="ts">
const config = useRuntimeConfig()

useHead({
  title: 'Mes recettes | Accueil',
  meta: [
    { name: 'description', content: 'Page d\'accueil de mon site de recettes' }
  ]
})

const [{ data: recipes, error }, { data: cuisines }] = await Promise.all([
  useAsyncData('recipes', async () => {
    const { data } = await $fetch<ApiResponse<Recipe[]>>(`${config.public.apiUrl}/api/recipes`)
    return data
  }),
  useAsyncData('cuisines', async () => {
    const { data } = await $fetch<ApiResponse<Cuisine[]>>(`${config.public.apiUrl}/api/cuisines`)
    return data
  })
])

const page = ref(1)
const RECIPES_PER_PAGE = 2

const search = ref('')
const filters = ref<Cuisine['name'][]>([])

function onCheckboxInput ($event: Event) {
  const target = $event.target
  if (!(target instanceof HTMLInputElement)) return
  const value = target.value
  if (!filters.value.includes(value)) {
    filters.value.push(value)
  } else {
    const index = filters.value.findIndex(filterValue => filterValue === value)
    filters.value.splice(index, 1)
  }
}

watch(() => [filters.value, search.value], () => {
  page.value = 1
})

const filteredRecipes = computed<Recipe[]>(() => {
  if (!recipes.value) return []

  let results = recipes.value

  if (filters.value && filters.value.length) {
    results = results.filter(recipe => filters.value.includes(recipe.cuisine_name))
  }

  if (search.value.length) {
    results = results.filter(recipe => {
      return recipe.title.toLowerCase().includes(search.value.toLowerCase())
    })
  }
  
  return results
})

const displayedRecipes = computed<Recipe[]>(() => {
  if (!filteredRecipes.value) return []
  return filteredRecipes.value.slice((page.value - 1) * RECIPES_PER_PAGE, page.value * RECIPES_PER_PAGE)
})

const totalPages = computed(() => {
  return Math.ceil(filteredRecipes.value.length / RECIPES_PER_PAGE)
})

function onPageClick (index: number) {
  page.value = index
}

if (error && error.value) throw new Error('Page not Found')
</script>
<template>
  <div>
    <MyTitle as="h1">Homepage</MyTitle>
    <input v-model="search" type="text">
    <br>
    search : {{ search }}
    <br>
    active filters: {{ filters }}
    <br>
    page : {{ page }} / {{ totalPages}}
    <div class="pages">
      <span v-for="n in totalPages" :key="`page-${n}`" @click="onPageClick(n)">
        {{ n }}
      </span>
    </div>
    <div class="recipes-filters">
      <div v-for="(cuisine, index) in cuisines" :key="index" class="recipes-filters__item">
        <input :id="cuisine.name" type="checkbox" :value="cuisine.name" @input="onCheckboxInput">
        <label :for="cuisine.name">{{ cuisine.name }}</label>
      </div>
    </div>
    <div class="recipes-grid">
      <div v-for="(recipe, index) in displayedRecipes" :key="index" class="recipes-grid__item">
        <NuxtImg :src="`/recipes/` + recipe.image_url" />
        <p>{{ recipe.cuisine_name }}</p>
        <NuxtLink :to="`/recipe/${recipe.recipe_id}`">{{ recipe.title }}</NuxtLink>
      </div>
    </div>
  </div>
</template>


<style lang=scss>
.pages {
  display: flex;
  flex-flow: row wrap;
  gap: 1rem;
}

.recipes-grid {
  display: flex;
  flex-flow: row wrap;

  &__item {
    width: 33.3333%;
  }
}
</style>