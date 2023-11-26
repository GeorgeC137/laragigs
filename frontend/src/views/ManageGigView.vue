<template>
  <div class="mx-4">
    <div class="bg-gray-50 border border-gray-200 p-10 rounded">
      <header>
        <h1 class="text-3xl text-center font-bold my-6 uppercase">Manage Gigs</h1>
      </header>

      <div class="flex justify-center font-semibold" v-if="gigsLoading">Loading..</div>

      <div class="flex justify-center font-semibold text-red-500" v-else-if="errorMsg">
        {{ errorMsg }}
      </div>

      <div v-else>
        <table class="w-full animate-fade-in-down table-auto rounded-sm">
          <tbody>
            <tr v-for="gig in gigs" :key="gig.id" class="border-gray-300">
              <td class="px-4 py-8 border-t border-b border-gray-300 text-lg">
                <router-link :to="{ name: 'ShowGig', params: { id: gig.id } }">
                  {{ gig.title }}
                </router-link>
              </td>
              <td class="px-4 py-8 border-t border-b border-gray-300 text-lg">
                <router-link
                  :to="{ name: 'EditGig', params: { id: gig.id } }"
                  class="text-blue-400 px-6 py-2 rounded-xl"
                  ><i class="fa-solid fa-pen-to-square"></i> Edit</router-link
                >
              </td>
              <td class="px-4 py-8 border-t border-b border-gray-300 text-lg">
                <button class="text-red-600" type="submit" @click="deleteGig(gig)">
                  <i class="fa-solid fa-trash-can"></i>
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="flex justify-center mt-5">
          <nav
            class="relative z-0 inline-flex rounded-md justify-center shadow-sm"
            aria-label="Pagination"
          >
            <a
              href="#"
              :disabled="!link.url"
              @click="getCurrentPage($event, link)"
              v-for="(link, ind) in links"
              :key="ind"
              v-html="link.label"
              aria-current="page"
              class="relative inline-flex items-center px-4 py-2 border text-sm font-medium whitespace-nowrap"
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
    </div>
  </div>
</template>

<script setup>
import store from "../store";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { ref } from "vue";

const gigs = computed(() => store.state.gigs.data);
const gigsLoading = computed(() => store.state.gigs.loading);
const links = computed(() => store.state.gigs.links);
const router = useRouter();
const errorMsg = ref("");

store.dispatch("getGigs");

function deleteGig(gig) {
  if (confirm("Are you sure you want to delete this gig?")) {
    // delete gig
    store
      .dispatch("deleteGig", gig.id)
      .then(() => {
        router.push({
          name: "Home",
        });
      })
      .catch((error) => {
        errorMsg.value = error.response.data.message;
      });
  }
}

function getCurrentPage(e, link) {
  e.preventDefault();
  if (!link.url || link.active) {
    return;
  }
  store.dispatch("getGigs", { url: link.url });
}
</script>
