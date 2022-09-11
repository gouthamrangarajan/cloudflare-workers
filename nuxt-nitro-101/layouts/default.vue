<template>
  <div class="flex flex-col">
    <TheNav></TheNav>
    <slot></slot>
  </div>
</template>
<style>
.slide-down-enter-active {
  transition: all 0.3s ease-in-out;
}
.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-2px);
}
.slide-down-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>
