<template>
  <div class="bg-gray-50 border border-gray-200 rounded p-6">
    <div class="flex">
      <img
        :src="gig.logo_preview ? gig.logo_preview : 'https://picsum.photos/300'"
        :alt="gig.title"
        class="hidden w-48 mr-6 md:block"
      />
      <div>
        <h3 class="text-2xl">
          <router-link :to="{ name: 'ShowGig', params: { id: gig.id } }">{{
            gig.title
          }}</router-link>
        </h3>
        <div class="text-xl font-bold mb-4">{{ gig.company }}</div>
        <ul class="flex">
          <li
            v-for="(tag, index) in gig.tags.split(',').map((tag) => tag.trim())"
            :key="index"
            class="flex items-center justify-center bg-black text-white rounded-xl py-1 px-3 mr-2 text-xs"
          >
            <router-link :to="tag">{{ tag }}</router-link>
          </li>
        </ul>
        <div class="text-lg mt-4">
          <i class="fa-solid fa-location-dot"></i> {{ gig.location }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { gig } = defineProps({
  gig: Object,
});
</script>
