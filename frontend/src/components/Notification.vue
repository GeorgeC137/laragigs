<template>
  <div
    v-if="notification.show"
    class="text-white fixed top-0 left-1/2 transform -translate-x-1/2 px-48 py-3 font-bold animate-fade-in-down"
    :class="[notification.type === 'success' ? 'bg-emerald-500' : 'bg-red-500']"
  >
    {{ notification.message }}
  </div>
</template>

<script setup>
import { computed } from "vue";
import store from "../store";

const notification = computed(() => store.state.notification);
</script>
