<template>
  <div class="mx-4">
    <div class="bg-gray-50 border border-gray-200 p-10 rounded max-w-lg mx-auto mt-24">
      <header class="text-center">
        <h2 class="text-2xl font-bold uppercase mb-1">Edit Gig</h2>
        <p class="mb-4">Edit: {{ model.title }}</p>
      </header>

      <form @submit.prevent="editGig">
        <div class="mb-6">
          <label for="company" class="inline-block text-lg mb-2">Company Name</label>
          <input
            v-model="model.company"
            type="text"
            class="border border-gray-200 rounded p-2 w-full"
            name="company"
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
            v-model="model.tag"
            type="text"
            class="border border-gray-200 rounded p-2 w-full"
            name="tags"
            placeholder="Example: Laravel, Backend, Postgres, etc"
          />

          <div v-if="errors.tag">
            <span class="text-red-500 text-sm">{{ errors.tag[0] }}</span>
          </div>
        </div>

        <div class="mb-6 flex items-center">
          <label for="logo" class="inline-block text-lg mb-2"> Company Logo </label>
          <img
            v-if="model.logo_preview"
            :src="model.logo_preview"
            :alt="model.title"
            class="w-64 h-48 object-cover"
          />
          <span
            v-else
            class="flex items-center justify-between h-12 w-12 rounded-full overflow-hidden bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-[80%] w-[90%] text-gray-300"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </span>
          <button
            type="button"
            class="relative overflow-hidden ml-5 border border-gray-200 text-sm shadow-sm rounded-md py-2 px-3 leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:right-2 focus:ring-offset-2"
          >
            <input
              type="file"
              @change="onImageSelect"
              class="absolute left-0 top-0 right-0 bottom-0 opacity-0 cursor-pointer"
            />
            Change
          </button>
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
import { ref } from "vue";
import store from "../store";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const errors = ref({});
const route = useRoute();

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

if (route.params.id) {
  model.value = store.state.gigs.find((g) => g.id === route.params.id);
}

function onImageSelect(e) {
  const file = e.target.files[0];

  const reader = new FileReader();

  reader.onload = () => {
    // Image to save in database
    model.logo = reader.result;

    // Image to preview
    model.logo_preview = reader.result;
  };

  reader.readAsDataURL(file);
}

function editGig() {
  store
    .dispatch("saveGig", model.value)
    .then(({ data }) => {
      router.push({
        name: "Home",
        params: { id: data.data.id },
      });
    })
    .catch((error) => {
      if (error.response.status == 422) {
        errors.value = error.response.data.errors;
      }
    });
}
</script>
