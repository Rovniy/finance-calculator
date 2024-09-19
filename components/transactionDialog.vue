<template>
  <v-dialog max-width="500" :model-value="!!props.modelValue" @after-leave="closeModal">
    <v-card :prepend-icon="config.category[props.modelValue?.category]?.icon" :title="config.category[props.modelValue?.category]?.text">
      <v-card-text>
        <h4>ID: {{ props.modelValue?.id }}</h4>
        <h4>Сумма затрат: {{ props.modelValue?.sum }} EUR</h4>
        <h4>Дата: {{ formatDate(props.modelValue?.date?.seconds) }}</h4>
        <h4 v-if="config.transactions.isShowOwner">Автор: {{ props.modelValue?.owner }}</h4>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
            prepend-icon="mdi-trash-can-outline"
            color="red"
            text="Удалить"
            @click="() => deleteItem(props.modelValue)"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { config } from '~/config'
import { formatDate } from "~/utils/helpers"

const emit = defineEmits([ 'update:modelValue', 'close' ])

const props = defineProps({
  modelValue: {
    type: Object,
    default: null
  }
})

const closeModal = (updateList = false) => {
  emit('update:modelValue', null)
  emit('close', updateList)
}

const deleteItem = item => {
  useFirestore().deleteDocument(config.firebase.firestore.collection.transactions, item.id)

  return closeModal(true)
}
</script>