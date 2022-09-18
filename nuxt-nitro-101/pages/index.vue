<script setup lang="ts">
const route = useRoute();
const { data, error, refresh } = await useAsyncData("posts", () =>
  usePostsData(route.query.search as string)
);
watch(
  () => route.query,
  async () => {
    await refresh();
  }
);
</script>
<template>
  <div class="pt-2 pb-4 w-full flex items-center flex-col">
    <PostList :data="data"></PostList>
    <span class="text-red-700 italic text-sm pt-2" v-if="error"
      >Error running useAsyncData in Cloudflare Worker {{ error }}</span
    >
  </div>
</template>
