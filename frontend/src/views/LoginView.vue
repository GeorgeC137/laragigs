<template>
  <header class="text-center">
    <h2 class="text-2xl font-bold uppercase mb-1">Log In</h2>
    <p class="mb-4">Log in to post gigs</p>
  </header>
  <form @submit.prevent="login">
    <div
      v-if="errorMsg"
      class="bg-red-500 flex items-center justify-between rounded py-3 px-5 text-white mt-4 font-semibold"
    >
      {{ errorMsg }}
      <span
        @click="errorMsg = ''"
        class="w-8 h-8 flex items-center justify-center rounded-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.2)]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </span>
    </div>

    <div class="mb-6">
      <label for="email" class="inline-block text-lg mb-2">Email</label>
      <input
        v-model="user.email"
        type="email"
        class="border border-gray-200 rounded p-2 w-full"
        name="email"
        autocomplete="email"
        required
      />
    </div>

    <div class="mb-6">
      <label for="password" class="inline-block text-lg mb-2"> Password </label>
      <input
        v-model="user.password"
        type="password"
        class="border border-gray-200 rounded p-2 w-full"
        name="password"
        autocomplete="password"
        required
      />
    </div>

    <div class="mb-6">
      <label for="remember" class="inline-block mr-2"> Remember me </label>
      <input
        v-model="user.remember"
        type="checkbox"
        class="border border-gray-200 rounded p-2 sm:text-sm"
        name="remember"
        autocomplete="remember"
      />
    </div>

    <div class="mb-6">
      <button
        :disabled="loading"
        type="submit"
        class="bg-black text-white rounded py-2 px-4 hover:bg-green-600 w-full flex justify-center"
        :class="{ 'cursor-not-allowed': loading, 'hover:bg-green-500': loading }"
      >
        <svg
          v-if="loading"
          class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Sign In
      </button>
    </div>

    <div class="mt-8">
      <p>
        Don't have an account?
        <router-link
          :to="{ name: 'Register' }"
          class="font-semibold leading-6 text-black hover:text-green-600"
          >Register</router-link
        >
      </p>
    </div>
  </form>
</template>

<script setup>
import store from "../store";
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();
const errorMsg = ref("");
const loading = ref(false);
const user = {
  email: "",
  password: "",
  remember: false,
};

function login() {
  loading.value = true;
  store
    .dispatch("login", user)
    .then(() => {
      loading.value = false;
      router.push({
        name: "Home",
      });
    })
    .catch((err) => {
      loading.value = false;
      errorMsg.value = err.response.data.error;
    });
}
</script>
