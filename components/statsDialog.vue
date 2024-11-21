<template>
  <v-dialog max-width="500" :model-value="!!props.modelValue" @after-leave="closeModal">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" text="Open Dialog"/>
    </template>

    <template v-slot:default>
      <transactionDialog v-model="dialogOpen" @close="handleCloseItemDialog" />

      <v-card :prepend-icon="config.category[props.modelValue?.category]?.icon"
              :title="config.category[props.modelValue?.category]?.text">
        <v-row>
          <v-col class="d-flex flex-column align-center" d-sm-flex>
            <v-progress-circular v-if="isLoading" indeterminate/>

            <v-list v-if="!isLoading" lines="two" class="w-100">
              <v-list-item
                  v-for="item in list"
                  :key="item.id"
                  :title="config.category[item.category]?.text"
                  @click="() => dialogOpen = item">

                <span class="comment" v-if="item?.comment">{{ item?.comment }}</span>

                <template v-slot:subtitle>
                  <span v-html="createSubTitle(item)"/>
                </template>

                <template v-slot:prepend>
                  <v-avatar :color="config.category[item.category]?.color">
                    <v-icon color="black">{{ config.category[item.category]?.icon }}</v-icon>
                  </v-avatar>
                </template>

                <template v-slot:append>
                  <span v-if="item.type === 'expense'">-</span>
                  <span v-else>+</span>
                  <b>{{ filters.thousands(item.sum) }}</b>&nbsp;EUR
                </template>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Close" variant="elevated" color="green" @click="closeModal"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import {config} from '~/config'
import {createSubTitle, filters} from "~/utils/helpers";

const list = ref([])
const isLoading = ref(true)
const dialogOpen = ref(null)
const firestore = useFirestore()

const emit = defineEmits(['updateAll', 'close'])

async function getTransactionsList() {
  try {
    const tempList = await firestore.getDocumentByType(
        config.firebase.firestore.collection.transactions,
        props.modelValue.monthIndex,
        props.modelValue.category)

    if (!tempList?.result) return

    list.value = tempList.result
  } finally {
    isLoading.value = false
  }
}

function handleCloseItemDialog(updateList) {
  dialogOpen.value = null

  getTransactionsList()

  if (updateList) {
    emit('updateAll')
  }
}

const props = defineProps({
  modelValue: {
    type: Object,
    default: null
  }
})

const closeModal = (updateList = false) => {
  emit('close', updateList)
}

onMounted(() => {
  getTransactionsList()
})
</script>
