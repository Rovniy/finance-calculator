<script setup lang="ts">
import { useUserStore } from "~/stores/user";
import { config } from "~/config";
import { filters, getHeatColor } from "~/utils/helpers";

const userStore = useUserStore()
const firestore = useFirestore()

const data = ref({})
const selectedMonth = ref({})
const isLoading = ref(true)

const categoryList = computed(() => {
  if (data.value.length === 0) return []

  const list = []

  Object.keys(data.value).map(i => {
    list.push({
      title: createCategoryText(i),
      sum: data.value[i],
      value: createCost(data.value[i]),
      percentage: calculatePercentage(data.value[i]),
      icon: createCategoryIcon(i),
      color: createCategoryColor(i)
    })
  })

  return list.sort((a, b) => b.sum - a.sum)
})
const monthsList = computed(() => Object.values(config.datetime.month).map(i => i.text))
const currentMonth = computed(() => new Date().getMonth() + 1)
const selectedMonthIndex = computed(() => monthsList.value.findIndex(i => i === selectedMonth.value) + 1)
const calculateTotalSum = computed(() => {
  return Object.values(data.value).reduce((total, sum) => {
    total += sum

    return total
  }, 0)
})

const getStatisticByMonth = async month => {
  try {
    isLoading.value = true

    data.value = await firestore.getStatsByMonth(config.firebase.firestore.collection.transactions, month)
  } finally {
    isLoading.value = false
  }
}

const createCategoryText = category => config.category[category]?.text
const createCategoryIcon = category => config.category[category]?.icon
const createCategoryColor = category => config.category[category]?.color
const createCost = sum => `${filters.thousands(sum)} EUR`
const calculatePercentage = sum => {
  const value = Math.floor(100 / calculateTotalSum.value * sum)

  return value.toFixed(0)
}

onMounted(async () => {
  await userStore.mwPageAuth()

  selectedMonth.value = monthsList.value[currentMonth.value - 1]
  return getStatisticByMonth(selectedMonthIndex.value)
})
</script>

<template>
  <v-select v-model="selectedMonth" label="Месяц" :items="monthsList" variant="outlined" @update:modelValue="() => getStatisticByMonth(selectedMonthIndex)" />

  <h2 class="h2">Все расходы: {{ filters.thousands(calculateTotalSum) }} EUR</h2>

  <v-row>
    <v-col sm="12" md="8" offset-sm="0" offset-md="2" class="d-flex flex-column align-center mt-4" d-sm-flex>
      <v-progress-circular v-if="isLoading" indeterminate  />

      <v-list lines="two" class="mt-0 w-100">
        <v-list-item
            v-for="item in categoryList"
            :key="item"
            :subtitle="item.value"
            :title="item.title">

          <template v-slot:prepend>
            <v-avatar :color="item.color">
              <v-icon color="black">{{ item.icon }}</v-icon>
            </v-avatar>
          </template>

          <template v-slot:append>
            <v-progress-circular
                :model-value="item.percentage"
                :size="45"
                :color="getHeatColor(item.percentage)"
            >
              <span style="color: black;">{{ item.percentage }}%</span>
            </v-progress-circular>
          </template>
        </v-list-item>
      </v-list>
    </v-col>
  </v-row>
</template>