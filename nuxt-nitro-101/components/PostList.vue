<script setup lang="ts">
import { postType } from "../utils/model";
defineProps({
  data: Array<postType>,
});
</script>
<template>
  <div class="w-11/12 max-w-5xl flex flex-col">
    <div
      class="flex flex-col lg:flex-row justify-between lg:items-center gap-2 py-3"
    >
      <span class="text-lg font-semibold text-gray-700 flex-1"
        >Nuxt Nitro SSR of User Posts from Cloudflare Worker</span
      >
      <div class="bg-white w-full lg:w-72">
        <TheSearch></TheSearch>
      </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Post v-for="dt in data" :key="dt.id" :data="dt"></Post>
      <p
        v-if="data.length == 0"
        class="text-center py-2 px-4 w-full text-orange-600 col-span-1 lg:col-span-2 font-semibold"
      >
        No data found...
      </p>
    </div>
    <div class="bg-white w-full lg:w-72 self-end mt-4">
      <TheSearch></TheSearch>
    </div>
  </div>
</template>
