<template>
  <header class="text-center">
    <h2 class="text-2xl font-bold uppercase mb-1">Register</h2>
    <p class="mb-4">Create an account to post gigs</p>
  </header>

  <form @submit="register">
    <div class="mb-6">
      <label for="name" class="inline-block text-lg mb-2"> Name </label>
      <input
        v-model="user.name"
        type="text"
        class="border border-gray-200 rounded p-2 w-full"
        name="name"
        autocomplete="name"
      />

      <div v-if="errors.name">
        <span class="text-sm text-red-500">{{ errors.name[0] }}</span>
      </div>
    </div>

    <div class="mb-6">
      <label for="email" class="inline-block text-lg mb-2">Email</label>
      <input
        v-model="user.email"
        type="email"
        class="border border-gray-200 rounded p-2 w-full"
        name="email"
        autocomplete="email"
      />

      <div v-if="errors.email">
        <span class="text-sm text-red-500">{{ errors.email[0] }}</span>
      </div>
    </div>

    <div class="mb-6">
      <label for="password" class="inline-block text-lg mb-2"> Password </label>
      <input
        v-model="user.password"
        type="password"
        class="border border-gray-200 rounded p-2 w-full"
        name="password"
        autocomplete="password"
      />

      <div v-if="errors.password">
        <span class="text-sm text-red-500">{{ errors.password[0] }}</span>
      </div>
    </div>

    <div class="mb-6">
      <label for="password_confirmation" class="inline-block text-lg mb-2">
        Confirm Password
      </label>
      <input
        v-model="user.password_confirmation"
        type="password"
        class="border border-gray-200 rounded p-2 w-full"
        name="password_confirmation"
        autocomplete="password"
      />

      <div v-if="errors.password_confirmation">
        <span class="text-sm text-red-500">{{ errors.password_confirmation[0] }}</span>
      </div>
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
        Sign Up
      </button>
    </div>

    <div class="mt-8">
      <p>
        Already have an account?
        <router-link
          :to="{ name: 'Login' }"
          class="font-semibold leading-6 text-black hover:text-green-600"
          >Login</router-link
        >
      </p>
    </div>
  </form>
</template>

<script setup>
import store from "../store";
import { useRouter } from "vue-router";
import { ref } from "vue";

const loading = ref(false);
const router = useRouter();
const errors = ref({});
const user = {
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
};

function register(e) {
  e.preventDefault();
  loading.value = true;
  store
    .dispatch("register", user)
    .then(() => {
      loading.value = false;
      router.push({
        name: "Home",
      });
    })
    .catch((err) => {
      loading.value = false;
      if (err.response.status === 422) {
        errors.value = err.response.data.errors;
      }
    });
}
</script>
