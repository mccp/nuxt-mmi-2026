<script lang="ts" setup>
import type { SanitySiteSettings } from '~/types/cms/site-settings'

defineProps<{ logo: SanitySiteSettings['logo'], navigation: SanitySiteSettings['navigation'] }>()

const isNavOpen = ref(false)

const onMenuClick = () => {
  isNavOpen.value = !isNavOpen.value
}

const { urlFor } = useSanityImage()
</script>
<template>
  <MyButton @click="onMenuClick">{{ isNavOpen ? 'Close' : 'Menu' }}</MyButton>
  <img v-if="logo && urlFor(logo)" :src="urlFor(logo)?.url()" alt="">
  <nav v-if="isNavOpen">
    <ul>
      <li>link 1</li>
      <li>link 2</li>
      <li>link 3</li>
    </ul>
  </nav>
</template>

<style lang="scss"></style>
