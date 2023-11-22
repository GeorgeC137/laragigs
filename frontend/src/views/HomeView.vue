<template>
  <!-- Search  -->
  <Search />

  <!-- Hero -->
  <Hero />

  <div v-if="gigsLoading" class="flex justify-center font-semibold">Loading...</div>

  <div v-else>
    <div class="lg:grid lg:grid-cols-2 gap-4 space-y-4 md:space-y-0 mx-4">
      <GigList
        v-for="(gig, ind) in gigs"
        :key="gig.id"
        :gig="gig"
        class="opacity-0 animate-fade-in-down"
        :style="{ animationDelay: `${ind * 0.1}s` }"
      />
    </div>

    <div class="flex justify-center mt-5">
      <nav
        class="relative z-0 inline-flex rounded-md justify-center shadow-sm"
        aria-label="Pagination"
      >
        <a
          v-for="(link, ind) in links"
          :key="ind"
          :disabled="!link.url"
          href="#"
          v-html="link.label"
          @click="getCurrentPage($event, link)"
          class="relative inline-flex items-center px-4 py-2 border text-sm font-medium whitespace-nowrap"
          aria-current="page"
          :class="[
            link.active
              ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
            ind === 0 ? 'rounded-l-md' : '',
            ind === links.length - 1 ? 'rounded-r-md' : '',
          ]"
        ></a>
      </nav>
    </div>
  </div>
</template>

<script setup>
import store from "../store";
import Hero from "../components/Hero.vue";
import Search from "../components/Search.vue";
import { computed } from "vue";
import GigList from "../components/GigList.vue";

const gigs = computed(() => store.state.gigs.data);
const links = computed(() => store.state.gigs.links);
const gigsLoading = computed(() => store.state.gigs.loading);

store.dispatch("getGigs");

function getCurrentPage(e, link) {
  e.preventDefault();
  if (!link.url || link.active) {
    return;
  }
  store.dispatch("getGigs", { url: link.url });
}
</script>
