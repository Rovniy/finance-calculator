<script setup lang="ts">
const navigation = ref('AddExpenses')
</script>

<template>
  <v-row>
    <v-bottom-navigation grow color="teal" v-model="navigation">
      <v-btn value="AddExpenses">
        <v-icon>mdi-currency-eur</v-icon>

        <span>Add expenses</span>
      </v-btn>

      <v-btn value="statistic">
        <v-icon>mdi-chart-arc</v-icon>

        <span>Statistic</span>
      </v-btn>
    </v-bottom-navigation>
  </v-row>


</template>

<style scoped>

</style>