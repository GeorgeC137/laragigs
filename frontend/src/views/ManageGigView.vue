<template>
  <div class="mx-4">
    <div class="bg-gray-50 border border-gray-200 p-10 rounded">
      <header>
        <h1 class="text-3xl text-center font-bold my-6 uppercase">Manage Gigs</h1>
      </header>

      <div class="flex justify-center font-semibold" v-if="gigsLoading">Loading..</div>

      <table v-else class="w-full animate-fade-in-down table-auto rounded-sm">
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
    </div>
  </div>
</template>

<script setup>
import store from "../store";
import { computed } from "vue";
import { useRouter } from "vue-router";

const gigs = computed(() => store.state.gigs.data);
const gigsLoading = computed(() => store.state.gigs.loading);
const router = useRouter();

store.dispatch("getGigs");

function deleteGig(gig) {
  if (confirm("Are you sure you want to delete this gig?")) {
    // delete gig
    store.dispatch("deleteGig", gig.id).then(() => {
      router.push({
        name: "Home",
      });
    });
  }
}
</script>
