<script lang="ts" setup>
const payload = ref({
  title: '',
  description: '',
  image_url: '',
  cuisine_id: 0,
  goal_id: 0,
  DietaryInformation_id: 0,
  AllergiesInformation_id: 0
})

const error = ref('')

const config = useRuntimeConfig()

async function onSubmit () {
  if (!payload.value.title || !payload.value.description || !payload.value.image_url || !payload.value.cuisine_id || !payload.value.goal_id || !payload.value.DietaryInformation_id || !payload.value.AllergiesInformation_id) {
    error.value = 'Tous les champs ne sont pas remplis'
    return
  }

  try {
    await fetch(`${config.public.apiUrl}/api/recipes`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${useCookie('recipe_token').value}`
      },
      body: JSON.stringify(payload.value)
    })
  } catch (err) {
    console.log(err)
  }
}
</script>
<template>
  <div class="c-add-recipe-form">
    {{ payload }}
    {{ error }}
    <form class="c-add-recipe-form__form" @submit.prevent="onSubmit">

      <div class="c-add-recipe-form__field">
        <label for="title">Titre</label>
        <input id="title" v-model="payload.title" type="text">
      </div>

      <div class="c-add-recipe-form__field">
        <label for="description">Description</label>
        <textarea id="description" v-model="payload.description" />
      </div>

      <div class="c-add-recipe-form__field">
        <label for="image_url">Image URL</label>
        <input id="image_url" v-model="payload.image_url" type="text">
      </div>

      <div class="c-add-recipe-form__field">
        <label for="cuisine">Type de cuisine</label>
        <select id="cuisine" v-model="payload.cuisine_id">
          <option value="1">Asiatique</option>
          <option value="2">Italienne</option>
          <option value="3">Chinoise</option>
          <option value="4">Française</option>
          <option value="5">Mexicaine</option>
          <option value="6">Indienne</option>
          <option value="7">Méditerranéenne</option>
          <option value="8">Américaine</option>
          <option value="9">Thaïlandaise</option>
          <option value="10">Japonaise</option>
        </select>
      </div>

      <div class="c-add-recipe-form__field">
        <label for="goal">Objectifs</label>
        <select id="goal" v-model="payload.goal_id">
          <option value="1">Perte de poids</option>
          <option value="2">Riche en protéines</option>
        </select>
      </div>

      <div class="c-add-recipe-form__field">
        <label for="diet">Information dietétique</label>
        <select id="diet" v-model="payload.DietaryInformation_id">
          <option value="1">Sans produits laitiers</option>
          <option value="2">Sans oeufs</option>
        </select>
      </div>

      <div class="c-add-recipe-form__field">
        <label for="allergy">Information sur les allergènes</label>
        <select id="allergy" v-model="payload.AllergiesInformation_id">
          <option value="1">Gluten</option>
          <option value="2">Produits laitiers</option>
        </select>
      </div>

      <button type="submit">Ajouter ma recette</button>

    </form>
  </div>
</template>
<style lang="scss" scoped>
.c-add-recipe-form {
  &__form {
    display: flex;
    flex-flow: column wrap;
    gap: 1rem;
  }
  
  &__field {
    display: flex;
    flex-flow: column wrap;
    gap: .5rem;
  }
}
</style>