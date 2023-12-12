<script setup lang="ts">
const nuxtApp = useNuxtApp();
const loading = ref(true);

nuxtApp.hook("page:finish", () => {
  loading.value = false;
});
</script>

<template>
  <div v-if="loading" class="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-around">
    <span class="i-heroicons-arrow-path-20-solid w-24 h-24 mx-auto text-gray-400 dark:text-gray-500 mb-4 animate-spin" aria-hidden="true"></span>
      <span class="sr-only">Loading...</span>
  </div>
  <div v-if="!loading">
    <Header />

    <vulnerability-reports v-if="nuxtApp.$userIsAuthenticated"></vulnerability-reports>
    <UAlert v-else
            class="mt-4"
            icon="i-heroicons-command-line"
            color="red"
            variant="solid"
            title="Authentication failed!"
            description="It appears that you are not authorised to access this content."
    />
  </div>
</template>
