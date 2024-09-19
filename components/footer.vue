<template>
    <v-bottom-navigation :mandatory="true" grow color="teal" v-model="navigation">
      <v-btn :value="MAP.addExpense" @click="moveToPage(MAP.addExpense)">
        <v-icon>mdi-currency-eur</v-icon>

        <span>Учет расходов</span>
      </v-btn>

      <v-btn :value="MAP.Statistic" @click="moveToPage(MAP.Statistic)">
        <v-icon>mdi-chart-arc</v-icon>

        <span>Статистика</span>
      </v-btn>
    </v-bottom-navigation>
</template>

<script setup lang="ts">
const MAP = {
  addExpense: '/expense',
  Statistic: '/stats'
}

const navigation = ref('/expense')

const moveToPage = page => useRouter().push(page)
</script>