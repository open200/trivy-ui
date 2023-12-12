<script setup lang="ts">
import type Keycloak from "keycloak-js";

const nuxtApp = useNuxtApp();
const keycloak = nuxtApp.$keycloak as Keycloak

const userProfile = await keycloak.loadUserProfile()

const fullName = computed(() => `${userProfile?.firstName} ${userProfile?.lastName}`);

const logout = async (): Promise<void> => {
  await keycloak.logout()
}
</script>

<template>
  <div class="flex gap-4 justify-end">
    <div class="flex gap-2 items-center">
      <UIcon name="i-heroicons-user" />
      {{ fullName }}
    </div>

    <UButton @click="logout">Logout</UButton>
  </div>
</template>
