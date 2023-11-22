<template>
  <!-- Search  -->
  <Search />
  <router-link :to="{ name: 'Home' }" class="inline-block text-black ml-4 mb-4"
    ><i class="fa-solid fa-arrow-left"></i> Back
  </router-link>

  <div v-if="gigLoading" class="flex justify-center font-semibold">Loading...</div>

  <div v-else class="mx-4 animate-fade-in-down">
    <div class="bg-gray-50 border border-gray-200 p-10 rounded">
      <div class="flex flex-col items-center justify-center text-center">
        <img
          class="w-48 mr-6 mb-6"
          :src="gig.logo_preview ? gig.logo_preview : 'https://picsum.photos/500'"
          :alt="gig.title"
        />

        <h3 class="text-2xl mb-2">{{ gig.title }}</h3>
        <div class="text-xl font-bold mb-4">{{ gig.company }}</div>
        <ul class="flex">
          <li
            v-for="(tag, index) in gig.tags.split(',').map((tag) => tag.trim())"
            :key="index"
            class="flex items-center justify-center bg-black text-white rounded-xl py-1 px-3 mr-2 text-xs"
          >
            <router-link to="#">{{ tag }}</router-link>
          </li>
        </ul>
        <div class="text-lg my-4">
          <i class="fa-solid fa-location-dot"></i> {{ gig.location }}
        </div>
        <div class="border border-gray-200 w-full mb-6"></div>
        <div>
          <h3 class="text-3xl font-bold mb-4">Job Description</h3>
          <div class="text-lg space-y-6">
            {{ gig.description }}

            <router-link
              :to="gig.email"
              class="block bg-laravel text-white mt-6 py-2 rounded-xl hover:opacity-80"
              ><i class="fa-solid fa-envelope"></i> Contact Employer</router-link
            >

            <router-link
              :to="gig.website"
              target="_blank"
              class="block bg-black text-white py-2 rounded-xl hover:opacity-80"
              ><i class="fa-solid fa-globe"></i> Visit Website</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Search from "../components/Search.vue";
import { computed } from "vue";
import store from "../store";
import { useRoute } from "vue-router";

const route = useRoute();
const gig = computed(() => store.state.currentGig.data);
const gigLoading = computed(() => store.state.currentGig.loading);

if (route.params.id) {
  store.dispatch("getGig", route.params.id);
}
</script>
