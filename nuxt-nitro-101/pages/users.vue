<script setup lang="ts">
import useUsersData from "../composables/useUsersData";
import { userType } from "../utils/model";

const route = useRoute();
const { data, error } = await useAsyncData("users", () =>
  useUsersData(route.query.search as string)
);
</script>
<template>
  <div class="pt-20 pb-2 w-full flex flex-col items-center">
    <UsersTable :data="(data as userType[])"></UsersTable>
    <transition name="slide-down" appear>
      <span class="text-red-700 italic text-sm pt-2" v-if="error"
        >Error running useAsyncData in Cloudflare Worker {{ error }}</span
      >
    </transition>
  </div>
</template>
