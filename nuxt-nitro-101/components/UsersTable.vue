<script lang="ts" setup>
import { userType } from "../utils/model";
defineProps<{ data: userType[] }>();
</script>

<template>
  <div
    class="bg-white shadow shadow-green-600/80 rounded-xl py-2 lg:py-4 px-4 lg:px-6 w-11/12 lg:w-8/12 flex flex-col"
  >
    <span class="text-lg font-semibold text-gray-700 mb-6"
      >Nuxt Nitro SSR of User Table from Cloudflare Worker</span
    >
    <div class="w-full lg:w-72 self-end mb-1">
      <TheSearch></TheSearch>
    </div>
    <table class="table-fixed w-full border-collapse border-slate-500">
      <thead>
        <tr>
          <th
            class="text-left py-2 px-4 text-white bg-orange-600/90 font-normal border border-slate-200"
          >
            Name
          </th>
          <th
            class="text-left py-2 px-4 text-white bg-orange-600/90 font-normal border border-slate-200"
          >
            User Name
          </th>
          <th
            class="text-left py-2 px-4 text-white bg-orange-600/90 font-normal border border-slate-200"
          >
            Email
          </th>
          <th
            class="text-left py-2 px-4 text-white bg-orange-600/90 font-normal border border-slate-200"
          >
            Phone
          </th>
        </tr>
      </thead>
      <transition-group name="records" tag="tbody">
        <tr v-for="dt in data" :key="dt.id">
          <td class="py-2 px-4 border border-slate-200 break-all">
            {{ dt.name }}
          </td>
          <td class="py-2 px-4 border border-slate-200 break-all">
            {{ dt.username }}
          </td>
          <td class="py-2 px-4 border border-slate-200 break-all">
            {{ dt.email }}
          </td>
          <td class="py-2 px-4 border border-slate-200 break-all">
            {{ dt.phone }}
          </td>
        </tr>
        <template v-if="data.length == 0">
          <tr>
            <td
              colspan="4"
              class="text-center py-2 px-4 border border-slate-200 break-all text-gray-600"
            >
              No data found...
            </td>
          </tr>
        </template>
      </transition-group>
    </table>
  </div>
</template>

<style scoped></style>
