<script setup lang="ts">
import {config} from "~/config";
import {filters} from "~/utils/helpers";

const list = ref([])
const firstVisibleDoc = ref(null)
const lastVisibleDoc = ref(null)
const isLoading = ref(true)
const totalTransactions = ref(0)
const paginationPage = ref(1)
const firestore = useFirestore()

const totalPageComputed = computed(() => {
  return Math.ceil(totalTransactions.value / config.transactions.limit)
})

const formatDate = (date: number) => {
  if (!date) return 'Date not valid'

  const parsedDate = new Date(date * 1000);

  const hours = parsedDate.getHours().toString().padStart(2, '0');
  const minutes = parsedDate.getMinutes().toString().padStart(2, '0');
  const day = parsedDate.getDate();

  const monthNames = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
  ];

  const month = monthNames[parsedDate.getMonth()];

  return `${day} ${month} - ${hours}:${minutes}`;
}

const createSubTitle = item => {
  const transactionDate = formatDate(item.date?.seconds)
  const transactionOwner = item.owner
  let basicString = transactionDate

  if (config.transactions.isShowOwner) {
    basicString += `/ ${transactionOwner}`
  }

  return basicString
}

const getTotalCount = async () => {
  totalTransactions.value = await firestore.countDocuments(config.firebase.firestore.collection.transactions)
}

const getTransactionsList = async (lastDoc = lastVisibleDoc.value, paginationForward = true) => {
  const tempList = await firestore.getDocument(config.firebase.firestore.collection.transactions, {
    count: config.transactions.limit,
    targetDoc: lastDoc,
    forward: paginationForward
  })

  tempList?.result && (list.value = tempList.result)
  tempList?.last && (lastVisibleDoc.value = tempList.last)
  tempList?.first && (firstVisibleDoc.value = tempList.first)
}

const getNextPage = async () => {
  try {
    await getTransactionsList(lastVisibleDoc.value)
  } catch (e) {
    console.error('Can\'t get next page', e)
  }
}

const getPrevPage = async () => {
  try {
    await getTransactionsList(firstVisibleDoc.value, false)
  } catch (e) {
    console.error('Can\'t get prev page', e)
  }
}

const init = async () => {
  try {
    isLoading.value = true
    firstVisibleDoc.value = null
    lastVisibleDoc.value = null

    await Promise.all([
      getTotalCount(),
      getTransactionsList(),
    ])
  } catch (e) {
    console.error('Cant get transactions data.', e)
  } finally {
    isLoading.value = false
  }
}

onMounted(init)
defineExpose({ init })
</script>

<template>
  <v-row class="mt-4">
    <v-col sm="12" md="8" offset-sm="0" offset-md="2" class="d-flex flex-column align-center" d-sm-flex>
      <v-progress-circular v-if="isLoading" indeterminate  />

      <v-list v-if="!isLoading" lines="two" class="w-100">
        <v-list-item
            v-for="item in list"
            :key="item.id"
            :subtitle="createSubTitle(item)"
            :title="config.category[item.category]?.text"
        >
          <template v-slot:prepend>
            <v-avatar :color="config.category[item.category]?.color">
              <v-icon color="black">{{ config.category[item.category]?.icon }}</v-icon>
            </v-avatar>
          </template>

          <template v-slot:append>
              <b :class="[ item.type === 'expense' ? 'color-red' : 'color-green' ]">
                <span v-if="item.type === 'expense'">-</span>
                <span v-else>+</span>
                {{ filters.thousands(item.sum) }}
              </b>
          </template>
        </v-list-item>
      </v-list>

      <v-pagination
          v-if="!isLoading"
          v-model="paginationPage"
          :length="totalPageComputed"
          :total-visible="0"
          :disabled="isLoading"
          @next="getNextPage"
          @prev="getPrevPage"
      ></v-pagination>
    </v-col>
  </v-row>

</template>

<style scoped>

</style>