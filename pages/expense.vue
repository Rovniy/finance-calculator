<template>
  <v-row justify="center" class="mt-2">
    <h2 class="h2">Учет расходов</h2>
  </v-row>

  <v-row class="mt-8" justify="space-between" align="stretch">
    <v-col cols="12" md="6" :class="paClassName">
      <v-text-field prepend-icon="mdi-currency-eur" variant="solo" v-model="totalSum" type="number" clearable autofocus label="Введи потраченную сумму в EUR" />
    </v-col>
    <v-col cols="12" md="6" :class="paClassName">
      <v-text-field prepend-icon="mdi-comment-alert-outline" variant="solo" v-model="comment" type="text" clearable label="Комментарий к затратам" />
    </v-col>
  </v-row>

  <category v-model="selectedCategoryID" />

  <addTransactionBtn :sum="totalSum" :comment="comment" :category-id="selectedCategoryID" @sent="resetData" />

  <transactionList ref="transactionListRef" />
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user"
import { useDisplay } from "vuetify"

const userStore = useUserStore()
const display = useDisplay()


const totalSum = ref('')
const comment = ref('')
const selectedCategoryID = ref('')
const transactionListRef = ref(null)

const paClassName = computed(() => {
  return display.lgAndUp.value ? 'pa-4' : 'pa-1'
})

const resetData = () => {
  totalSum.value = ''
  comment.value = ''
  selectedCategoryID.value = ''
  transactionListRef.value.init()
}

onMounted(userStore.mwPageAuth)
</script>
