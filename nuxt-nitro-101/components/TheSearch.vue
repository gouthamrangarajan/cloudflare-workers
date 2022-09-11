<script setup lang="ts">
const searchTxt = ref<String>("");
const route = useRoute();
watch(
  () => route.query.search,
  (newVal, _) => {
    if ((newVal as string) != searchTxt.value)
      searchTxt.value = newVal as string;
  },
  { immediate: true }
);
const search = () => {
  let url = window.location.href;
  if (url.includes("?")) url = url.substring(0, url.indexOf("?"));
  if (searchTxt.value !== "") {
    url += `?search=${searchTxt.value}`;
  }
  nextTick(() => {
    window.location.href = url;
  });
};
</script>
<template>
  <div
    class="py-1 px-3 flex space-x-2 w-full border border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600/90 focus-within:ring-offset-2 focus-within:ring-offset-indigo-50 transition duration-300 rounded"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6 text-slate-600"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      />
    </svg>

    <input
      type="text"
      class="flex-1 appearance-none outline-none placeholder:text-slate-600"
      placeholder="Type & press enter to search..."
      v-model.trim="searchTxt"
      @keyup.enter="search"
    />
  </div>
</template>
<style scoped></style>
