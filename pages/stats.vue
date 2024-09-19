<script setup lang="ts">
import { useUserStore } from "~/stores/user";

const userStore = useUserStore()

onMounted(userStore.mwPageAuth)
</script>

<template>
  Statistic page
</template>

<style scoped>

</style>