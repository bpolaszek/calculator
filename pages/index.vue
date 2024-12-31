<template>
  <div class="relative">
    <button @click="navigateTo('/history')" 
            class="absolute -left-12 top-0 text-white hover:opacity-80">
      <Icon name="heroicons:clock" size="24" />
    </button>
    <Calculator />
  </div>
</template>

<script setup>
import Calculator from '~/components/Calculator.vue'
</script>