<template>
  <v-main>
    <v-container class="h-100">
      <slot />
    </v-container>
  </v-main>

  <Footer v-if="userStore.isUserLoggedIn"/>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user"

const userStore = useUserStore()
</script>