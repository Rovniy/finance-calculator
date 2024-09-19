<script setup lang="ts">

const goToExpensePage = () => useRouter().push('/expense')

const init = async () => {
  try {
    const result = await useLogin().init()
    if (!result) return

    await goToExpensePage()
  } catch (e) {
    console.error('Can\'t init auth user:', e)
  }
}

const loginByGoogle = async () => {
  await useLogin().google()
  await goToExpensePage()
}

onMounted(init)
</script>

<template>
  <v-row class="h-100">
    <v-col class="d-flex justify-center align-center" cols="12">
      <v-btn color="blue" prepend-icon="mdi-google" @click="loginByGoogle">
        Login with Google
      </v-btn>
    </v-col>
  </v-row>
</template>
