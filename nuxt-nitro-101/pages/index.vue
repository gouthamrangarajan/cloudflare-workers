<script setup lang="ts">
import usePostsData from "../composables/usePostsData";

const route = useRoute();
const { data, error } = await useAsyncData("posts", () =>
  usePostsData(route.query.search as string)
);
</script>
<template>
  <div class="pt-2 pb-4 w-full flex items-center flex-col">
    <PostList :data="data"></PostList>
    <transition name="slide-down" appear>
      <span class="text-red-700 italic text-sm pt-2" v-if="error"
        >Error running useAsyncData in Cloudflare Worker {{ error }}</span
      >
    </transition>
  </div>
</template>
