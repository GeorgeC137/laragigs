<template>
  <body class="mb-48">
    <nav class="flex justify-between items-center mb-4">
      <router-link :to="{ name: 'Home' }"
        ><img class="w-24" src="https://picsum.photos/600" alt="" :class="logo"
      /></router-link>
      <ul class="flex space-x-6 mr-6 text-lg">
        <li>
          <router-link :to="{ name: 'ManageGig' }" class="hover:text-laravel"
            ><i class="fa-solid fa-gear"></i> Manage Gigs</router-link
          >
        </li>
        <li>
          <a class="hover:text-laravel cursor-pointer" @click="logout"
            ><i class="fa-solid fa-door-closed"></i> Sign out</a
          >
        </li>
      </ul>
    </nav>

    <main>
      <router-view></router-view>
    </main>

    <footer
      class="fixed bottom-0 left-0 w-full flex items-center justify-start font-bold bg-laravel text-white h-24 mt-24 opacity-90 md:justify-center"
    >
      <p class="ml-2">Copyright &copy; 2022, All Rights reserved</p>

      <router-link
        :to="{ name: 'Login' }"
        class="absolute top-1/3 right-10 bg-black text-white py-2 px-5"
        >Post Job</router-link
      >
    </footer>
  </body>
</template>

<script setup>
import store from "../store";
import { useRouter } from "vue-router";

const router = useRouter();

function logout() {
  store.dispatch("logout").then(() => {
    router.push({
      name: "Login",
    });
  });
}
</script>
