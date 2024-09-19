<script setup lang="ts">
const MAP = {
  addExpense: '/expense',
  Statistic: '/stats'
}

const navigation = ref('AddExpenses')

const moveToPage = page => useRouter().push(page)
</script>

<template>
    <v-bottom-navigation grow color="teal" v-model="navigation">
      <v-btn :value="MAP.addExpense" @click="moveToPage(MAP.addExpense)">
        <v-icon>mdi-currency-eur</v-icon>

        <span>Add expenses</span>
      </v-btn>

      <v-btn :value="MAP.Statistic" @click="moveToPage(MAP.Statistic)">
        <v-icon>mdi-chart-arc</v-icon>

        <span>Statistic</span>
      </v-btn>
    </v-bottom-navigation>
</template>

<style scoped>

</style>