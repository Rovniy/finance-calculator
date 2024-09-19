<template>
  <v-row justify="center" class="mt-4">
    <v-btn
        class="w-100"
        size="x-large"
        color="blue"
        :loading="isLoading"
        :disabled="!isBtnEnabled"
        prepend-icon="mdi-plus"
        @click="submitOrder">
      Добавить
    </v-btn>
  </v-row>

  <v-snackbar
      v-model="isSuccess"
      color="primary"
      class="justify-center"
      :close-on-back="true"
      text="Запись успешно добавлена" />
</template>

<script setup lang="ts">
import { serverTimestamp } from 'firebase/firestore'
import { config } from '@/config'
import { useUserStore } from "~/stores/user";

const userStore = useUserStore()

const firestore = useFirestore()

const isLoading = ref(false)
const isSuccess = ref(false)

const emit = defineEmits(['sent']);

const props = defineProps({
  sum: {
    type: [String, Number],
    default: '',
  },
  categoryId: {
    type: String,
    default: '',
  }
});

const isBtnEnabled = computed(() => {
  return props.sum && props.categoryId && !isLoading.value
})

const submitOrder = async () => {
  try {
    isLoading.value = true;

    const payload = {
      type: 'expense', //income
      sum: props.sum,
      category: props.categoryId,
      date: serverTimestamp(),
      owner: userStore?.userData?.displayName || config.owner.andrei,
    }

    await firestore.addDocument(`transactions/`, payload)

    emit('sent', payload)

    isSuccess.value = true
  } catch(e) {
    console.error(e);
  } finally {
    isLoading.value = false;
  }
}
</script>
