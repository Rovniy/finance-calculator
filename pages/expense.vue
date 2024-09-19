<script setup lang="ts">
import { useUserStore } from "~/stores/user";

const userStore = useUserStore()

const totalSum = ref('')
const selectedCategoryID = ref('')
const transactionListRef = ref(null)

const resetData = () => {
  totalSum.value = ''
  selectedCategoryID.value = ''
  transactionListRef.value.init()
}

onMounted(userStore.mwPageAuth)
</script>

<template>
  <v-row justify="center" class="mt-2">
    <h2 class="h2">Учет расходов</h2>
  </v-row>

  <v-row class="mt-8">
    <v-col>
      <v-text-field prepend-icon="mdi-currency-eur" variant="outlined" v-model="totalSum" type="number" clearable autofocus label="Введи потраченную сумму в EUR" />
    </v-col>
  </v-row>

  <category v-model="selectedCategoryID" />

  <addTransactionBtn :sum="totalSum" :category-id="selectedCategoryID" @sent="resetData" />

  <transactionList ref="transactionListRef" />
</template>

<style scoped>

</style>