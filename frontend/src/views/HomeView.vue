<template>
  <!-- Search  -->
  <Search />

  <!-- Hero -->
  <Hero />

  <div v-if="gigsLoading" class="flex justify-center font-semibold">Loading...</div>

  <div v-else class="lg:grid lg:grid-cols-2 gap-4 space-y-4 md:space-y-0 mx-4">
    <GigList
      v-for="(gig, ind) in gigs"
      :key="gig.id"
      :gig="gig"
      class="opacity-0 animate-fade-in-down"
      :style="{ animationDelay: `${ind * 0.1}s` }"
    />
  </div>
</template>

<script setup>
import store from "../store";
import Hero from "../components/Hero.vue";
import Search from "../components/Search.vue";
import { computed } from "vue";
import GigList from "../components/GigList.vue";

const gigs = computed(() => store.state.gigs.data);
const gigsLoading = computed(() => store.state.gigs.loading);

store.dispatch("getGigs");
</script>
