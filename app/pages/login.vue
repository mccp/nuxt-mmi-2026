<script lang="ts" setup>
const email = ref('')
const password = ref('')

const config = useRuntimeConfig()

async function onSubmit () {
  try {
    // Api call
    console.log('=> Api call to login')
    const response = await fetch(`${config.public.apiUrl}/api/users/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    })

    const json = await response.json()

    const token = json.data.token

    const cookie = useCookie('recipe_token')
    cookie.value = token

    // Redirect to dashboard if login is successful
    await navigateTo('/dashboard')

  } catch (err) {
    console.log(err)
  }
}
</script>

<template>
  <div>
    <h1>Connexion</h1>
    <form class="form" action="" @submit.prevent="onSubmit">
      <label for="email">Email</label>
      <input id="email" v-model="email" type="text">
      <label for="password">Mot de passe</label>
      <input id="password" v-model="password" type="password">
      <button type="submit">Se connecter</button>  
    </form>
  </div>
</template>
<style lang="scss" scoped>
.form {
  display: flex;
  flex-flow: column wrap;
  gap: 1rem;
}
</style>