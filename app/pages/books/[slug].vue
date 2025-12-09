<script setup lang="ts">
import type { SanityBook } from '~/types/cms/book'
  
const BOOK_QUERY = groq`*[_type == "book" && slug.current == $slug][0]{ ..., author->{ name }, categories[]->{ ... } }`

const { params } = useRoute()
  
const { data: book } = await useLazySanityQuery<SanityBook>(BOOK_QUERY, params)

const { urlFor } = useSanityImage()
</script>
  
<template>
  <main
    v-if="book"
    class="p-single-book"
  >
    <a href="/books" class="">&larr; Back to books</a>
    <img
      v-if="book.cover"
      :src="urlFor(book.cover)?.width(550).height(310).url()"
      :alt="book?.title"
      class="aspect-video rounded-xl"
      width="550"
      height="310"
    >
    <h1 v-if="book.title" class="">{{ book.title }} écrit par {{ book.author.name }}</h1>
    <p>Catégories du livre</p>
    <ul>
      <li v-for="(category, index) in book.categories" :key="index">{{ category.label }}</li>
    </ul>
    <div class="prose">
      <p v-if="book.publishedAt">
        Published: {{ new Date(book.publishedAt).toLocaleDateString() }}
      </p>
      <SanityContent v-if="book.body" :value="book.body" />
    </div>
  </main>
</template>

<style lang="scss" scoped>
.p-single-book {
  &:deep(strong) {
    font-weight: 700;
  }
}
</style>