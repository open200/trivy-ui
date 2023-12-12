<script setup lang="ts">
defineProps<{
  label: string
  count: number
}>()
</script>

<template>
  <div class="px-4 py-5 sm:px-6 border-gray-500 border rounded relative">
    <div class="text-sm">
      {{ label }}
    </div>
    <div class="text-4xl">
      {{ count }}
    </div>

      <div class="h-2 absolute left-0 bottom-0 right-0 rounded-b" :class="{ 'bg-red-400': label === 'Critical', 'bg-orange-300': label === 'High', 'bg-yellow-300': label === 'Medium', 'bg-gray-300': label === 'Low' }" />
  </div>
</template>
