<script setup lang="ts">
import { userType } from "../utils/model";

const route = useRoute();
const { data, error, refresh } = await useAsyncData("users", () =>
  useUsersData(route.query.search as string)
);
watch(
  () => route.query,
  async () => {
    await refresh();
  }
);
</script>
<template>
  <div class="pt-20 pb-2 w-full flex flex-col items-center">
    <UsersTable :data="(data as userType[])"></UsersTable>
    <span class="text-red-700 italic text-sm pt-2" v-if="error"
      >Error running useAsyncData in Cloudflare Worker {{ error }}</span
    >
  </div>
</template>
