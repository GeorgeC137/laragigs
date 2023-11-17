<template>
  <div class="mx-4">
    <div class="bg-gray-50 border border-gray-200 p-10 rounded max-w-lg mx-auto mt-24">
      <header class="text-center">
        <h2 class="text-2xl font-bold uppercase mb-1">Create a Gig</h2>
        <p class="mb-4">Post a gig to find a developer</p>
      </header>

      <form @submit.prevent="saveGig">
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
            <span class="text-sm text-red-500">{{ errors.company[0] }}</span>
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
            <span class="text-sm text-red-500">{{ errors.title[0] }}</span>
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
            <span class="text-sm text-red-500">{{ errors.location[0] }}</span>
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
            <span class="text-sm text-red-500">{{ errors.email[0] }}</span>
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
            <span class="text-sm text-red-500">{{ errors.website[0] }}</span>
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
            required
          />

          <div v-if="errors.tag">
            <span class="text-sm text-red-500">{{ errors.tag[0] }}</span>
          </div>
        </div>

        <div class="mb-6">
          <label for="logo" class="inline-block text-lg mb-2"> Company Logo </label>
          <input
            @change="onImageSelect"
            type="file"
            class="border border-gray-200 rounded p-2 w-full"
            name="logo"
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
            placeholder="Include tasks, requirements, salary, etc"
            required
          ></textarea>

          <div v-if="errors.description">
            <span class="text-sm text-red-500">{{ errors.description[0] }}</span>
          </div>
        </div>

        <div class="mb-6">
          <button
            class="bg-laravel text-white rounded py-2 px-4 hover:bg-black"
            type="submit"
          >
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
import { useRouter } from "vue-router";

const router = useRouter();
const errors = ref({});

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
  // Get file to send to backend
  const file = e.target.files[0];

  // File preview
  const reader = new FileReader();

  reader.onload = () => {
    // Image to store on database
    model.value.logo = reader.result;

    // Image to preview
    model.value.logo_preview = reader.result;
  };

  reader.readAsDataURL(file);
}

function saveGig() {
  store
    .dispatch("saveGig", model.value)
    .then(() => {
      router.push({
        name: "Home",
      });
    })
    .catch((err) => {
      if (err.response.status === 422) {
        errors.value = err.response.data.errors;
      }
    });
}
</script>
