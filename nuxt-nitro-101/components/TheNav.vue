<script lang="ts" setup>
const activeMenu = ref("");
onMounted(() => {
  activeMenu.value = "";
  let url = window.location.href.toLowerCase();
  if (url.includes("users")) activeMenu.value = "users";
  else activeMenu.value = "posts";
});
</script>
<template>
  <nav class="py-2 px-4 sticky top-0 shadow w-full bg-white z-10">
    <div class="flex w-full items-center justify-between max-w-5xl mx-auto">
      <div class="flex-1 flex items-center space-x-6">
        <span class="text-xl text-teal-600 font-semibold">Nuxt</span>
        <span class="text-lg text-orange-500 font-semibold pt-1"
          >Cloudflare Worker</span
        >
      </div>
      <ul class="list-none flex items-center space-x-3 text-indigo-600">
        <li
          :class="[
            'relative transition duration-300',
            { 'font-semibold': activeMenu == 'posts' },
          ]"
        >
          <a
            href="/"
            class="apperance-none outline-none hover:opacity-90 transition duration-300"
            >Posts</a
          >
        </li>
        <li
          :class="[
            'relative transition duration-300',
            { 'font-semibold': activeMenu == 'users' },
          ]"
        >
          <a
            href="/users"
            class="apperance-none outline-none hover:opacity-90 transition duration-300"
            >Users</a
          >
        </li>
      </ul>
    </div>
  </nav>
</template>
<style scoped>
li a::after {
  content: "";
  position: absolute;
  top: 1.5rem;
  left: 0;
  width: 100%;
  background-color: rgb(79, 70, 229);
  height: 1.5px;
  transform: scaleX(0);
  transition: transform 0.3s;
  transform-origin: left;
}
li a:hover::after,
li a:focus::after {
  transform: scaleX(1);
  transition: transform 0.2s;
}
</style>
