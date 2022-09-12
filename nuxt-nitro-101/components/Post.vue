<script setup lang="ts">
import { postType } from "../utils/model";

defineProps<{
  data: postType;
}>();
const motionEl = useSlideDownMotion();
</script>
<template>
  <div
    class="shadow shadow-green-600/80 bg-white rounded-xl py-4 px-6 w-full flex flex-col relative"
    ref="motionEl"
  >
    <span
      class="text-lg text-orange-600 font-semibold truncate"
      :title="data.title"
      >{{ data.title }}</span
    >
    <p class="py-1 px-3 mt-3">
      {{ data.body }}
    </p>
    <span
      class="py-1 px-3 text-white bg-orange-600/90 absolute -bottom-2 right-6 rounded-full text-xs"
      v-if="data.user"
    >
      @{{ data.user.username }}
    </span>
  </div>
</template>

<style scoped></style>
