<template>
  <v-row class="mt-1">
    <v-col class="v-col-auto justify-center pa-1" v-for="cat in categoryList" :key="cat.id">
      <v-btn :elevation="selectedCategory === cat.id ? 6 : 0"
             rounded="xl"
             density="default"
             :color="!selectedCategory ? cat.color : (selectedCategory === cat.id ? cat.color : '#e8e8e8')"
             :prepend-icon="cat.icon"
             @click="selectCategory(cat)">
        {{ config.category[cat.id].text }}
      </v-btn>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { config } from '@/config'

const selectedCategory = ref('')

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  }
})

const categoryList = computed(() => Object.values(config.category))

watch(() => props.modelValue, newValue => {
  selectedCategory.value = newValue
})

const selectCategory = cat => {
  selectedCategory.value = cat.id

  emit('update:modelValue', selectedCategory.value)
}
</script>

<style scoped>

</style>