<template>
  <!-- Search  -->
  <Search />

  <!-- Hero -->
  <Hero />
  <div class="lg:grid lg:grid-cols-2 gap-4 space-y-4 md:space-y-0 mx-4">
    <div
      v-for="gig in gigs"
      :key="gig.id"
      class="bg-gray-50 border border-gray-200 rounded p-6"
    >
      <div class="flex">
        <img :src="gig.logo" alt="" class="hidden w-48 mr-6 md:block" />
        <div>
          <h3 class="text-2xl">
            <router-link :to="{ name: 'ShowGig', params: { id: gig.id } }">{{
              gig.title
            }}</router-link>
          </h3>
          <div class="text-xl font-bold mb-4">{{ gig.company }}</div>
          <ul class="flex">
            <li
              v-for="(tag, index) in gig.tag"
              :key="index"
              class="flex items-center justify-center bg-black text-white rounded-xl py-1 px-3 mr-2 text-xs"
            >
              <router-link to="#">{{ tag }}</router-link>
            </li>
          </ul>
          <div class="text-lg mt-4">
            <i class="fa-solid fa-location-dot"></i> {{ gig.location }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import store from "../store";
import Hero from "../components/Hero.vue";
import Search from "../components/Search.vue";
import { computed } from "vue";

const gigs = computed(() => store.state.gigs);
</script>
