<script setup lang="ts">
import { useCalculatorStore } from '~/stores/calculator'

const formatDate = useFormatDate()
const calculatorStore = useCalculatorStore()

const clearHistory = () => {
  calculatorStore.clearHistory()
}

const deleteEntry = (id: string) => {
  calculatorStore.deleteEntry(id)
}

</script>

<template>
  <div class="max-w-xl mx-auto bg-[#323232] rounded-lg overflow-hidden shadow-xl">
    <div class="p-4 flex justify-between items-center border-b border-gray-700">
      <button @click="navigateTo('/')" class="text-white hover:opacity-80">
        <Icon name="heroicons:arrow-left" size="24" />
      </button>
      <h2 class="text-white text-xl">{{ $t('history') }}</h2>
      <button @click="clearHistory" class="text-white hover:opacity-80">
        <Icon name="heroicons:trash" size="24" />
      </button>
    </div>
    
    <div class="divide-y divide-gray-700">
      <div v-for="item in calculatorStore.history" 
           :key="item.id" 
           class="p-4 flex justify-between items-center">
        <div class="text-white">
          <div class="text-lg">{{ item.expression }} = {{ item.result }}</div>
          <div class="text-sm text-gray-400">{{ formatDate(item.timestamp) }}</div>
          <div v-if="item.label" class="text-sm text-blue-400">{{ item.label }}</div>
        </div>
        <button @click="deleteEntry(item.id)" class="text-white hover:opacity-80">
          <Icon name="heroicons:x-mark" size="20" />
        </button>
      </div>
      
      <div v-if="calculatorStore.history.length === 0" 
           class="p-8 text-center text-gray-400">
        {{ $t('no_history') }}
      </div>
    </div>
  </div>
</template>