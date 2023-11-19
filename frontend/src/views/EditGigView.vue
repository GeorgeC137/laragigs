<template>
  <div class="mx-4">
    <div class="bg-gray-50 border border-gray-200 p-10 rounded max-w-lg mx-auto mt-24">
      <header class="text-center">
        <h2 class="text-2xl font-bold uppercase mb-1">Edit Gig</h2>
        <p class="mb-4">Edit: {{ model.title }}</p>
      </header>

      <div v-if="gigLoading" class="flex justify-center font-semibold">Loading...</div>

      <form v-else @submit.prevent="editGig">
        <div class="mb-6">
          <label for="company" class="inline-block text-lg mb-2">Company Name</label>
          <input
            v-model="model.company"
            type="text"
            class="border border-gray-200 rounded p-2 w-full"
            name="company"
            required
          />

          <div v-if="errors.company">
            <span class="text-red-500 text-sm">{{ errors.company[0] }}</span>
          </div>
        </div>

        <div class="mb-6">
          <label for="title" class="inline-block text-lg mb-2">Job Title</label>
          <input
            v-model="model.title"
            type="text"
            class="border border-gray-200 rounded p-2 w-full"
            name="title"
            placeholder="Example: Senior Laravel Developer"
            required
          />

          <div v-if="errors.title">
            <span class="text-red-500 text-sm">{{ errors.title[0] }}</span>
          </div>
        </div>

        <div class="mb-6">
          <label for="location" class="inline-block text-lg mb-2">Job Location</label>
          <input
            v-model="model.location"
            type="text"
            class="border border-gray-200 rounded p-2 w-full"
            name="location"
            placeholder="Example: Remote, Boston MA, etc"
            required
          />

          <div v-if="errors.location">
            <span class="text-red-500 text-sm">{{ errors.location[0] }}</span>
          </div>
        </div>

        <div class="mb-6">
          <label for="email" class="inline-block text-lg mb-2">Contact Email</label>
          <input
            v-model="model.email"
            type="text"
            class="border border-gray-200 rounded p-2 w-full"
            name="email"
            required
          />

          <div v-if="errors.email">
            <span class="text-red-500 text-sm">{{ errors.email[0] }}</span>
          </div>
        </div>

        <div class="mb-6">
          <label for="website" class="inline-block text-lg mb-2">
            Website/Application URL
          </label>
          <input
            v-model="model.website"
            type="text"
            class="border border-gray-200 rounded p-2 w-full"
            name="website"
            required
          />

          <div v-if="errors.website">
            <span class="text-red-500 text-sm">{{ errors.website[0] }}</span>
          </div>
        </div>

        <div class="mb-6">
          <label for="tags" class="inline-block text-lg mb-2">
            Tags (Comma Separated)
          </label>
          <input
            v-model="model.tags"
            type="text"
            class="border border-gray-200 rounded p-2 w-full"
            name="tags"
            required
            placeholder="Example: Laravel, Backend, Postgres, etc"
          />

          <div v-if="errors.tag">
            <span class="text-red-500 text-sm">{{ errors.tag[0] }}</span>
          </div>
        </div>

        <div class="mb-6">
          <label for="logo" class="inline-block text-lg mb-2"> Company Logo </label>
          <img
            v-if="model.logo_preview"
            :src="model.logo_preview"
            :alt="model.title"
            class="w-64 h-48 object-cover mb-2"
          />
          <input
            type="file"
            @change="onImageSelect"
            class="border border-gray-200 rounded p-2 w-full"
          />
        </div>

        <div class="mb-6">
          <label for="description" class="inline-block text-lg mb-2">
            Job Description
          </label>
          <textarea
            v-model="model.description"
            class="border border-gray-200 rounded p-2 w-full"
            name="description"
            rows="10"
            required
            placeholder="Include tasks, requirements, salary, etc"
          >
          </textarea>

          <div v-if="errors.description">
            <span class="text-red-500 text-sm">{{ errors.description[0] }}</span>
          </div>
        </div>

        <div class="mb-6">
          <button class="bg-laravel text-white rounded py-2 px-4 hover:bg-black text-lg">
            Create Gig
          </button>

          <router-link :to="{ name: 'Home' }" class="text-black ml-4"> Back </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import store from "../store";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const errors = ref({});
const route = useRoute();
const gigLoading = computed(() => store.state.currentGig.loading);

let model = ref({
  title: "",
  location: null,
  email: null,
  website: "",
  logo: null,
  tag: [],
  description: null,
  company: null,
});

function onImageSelect(e) {
  const file = e.target.files[0];

  const reader = new FileReader();

  reader.onload = () => {
    // Image to save in database
    model.value.logo = reader.result;

    // Image to preview
    model.value.logo_preview = reader.result;
  };

  reader.readAsDataURL(file);
}

// Watch current gig data and update model whenever it changes
watch(
  () => store.state.currentGig.data,
  (newVal, oldVal) => {
    model.value = {
      ...JSON.parse(JSON.stringify(newVal)),
    };
  }
);

if (route.params.id) {
  store.dispatch("getGig", route.params.id);
}

function editGig() {
  store
    .dispatch("saveGig", model.value)
    .then(() => {
      router.push({
        name: "Home",
      });
    })
    .catch((error) => {
      if (error.response.status == 422) {
        errors.value = error.response.data.errors;
      }
    });
}
</script>
