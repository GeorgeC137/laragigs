<template>
  <form @submit.prevent="searchGigs">
    <div class="relative border-2 border-gray-100 m-4 rounded-lg">
      <div class="absolute top-4 left-3">
        <i class="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i>
      </div>
      <input
        type="text"
        v-model="search"
        class="h-14 w-full pl-10 pr-20 rounded-lg z-0 focus:shadow focus:outline-none"
        placeholder="Search For Software Gigs..."
      />
      <div class="absolute top-2 right-2">
        <button
          type="submit"
          class="h-10 w-20 text-white rounded-lg bg-red-500 hover:bg-red-600"
        >
          Search
        </button>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";
import store from "../store";

const search = ref("");

function searchGigs() {
  if (search.value) {
    store.dispatch("searchGigs", search.value);
  } else {
    store.dispatch("getGigs");
  }
}
</script>
