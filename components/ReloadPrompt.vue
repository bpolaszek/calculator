<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue'

const { needRefresh, updateServiceWorker } = useRegisterSW()

const close = async () => {
  needRefresh.value = false
}

const update = async () => {
  await updateServiceWorker()
}
</script>

<template>
  <div
    v-if="needRefresh"
    class="fixed bottom-0 left-0 right-0 flex items-center justify-center p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
  >
    <div class="text-sm text-gray-700 dark:text-gray-300">
      {{ $t('new_content') }}
    </div>
    <button
      @click="update"
      class="ml-3 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
    >
      {{ $t('reload') }}
    </button>
    <button
      @click="close"
      class="ml-3 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-400"
    >
      {{ $t('close') }}
    </button>
  </div>
</template>