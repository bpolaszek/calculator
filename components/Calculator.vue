<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core'
import { useCalculatorStore } from '~/stores/calculator'
import { evaluateExpression } from '~/utils/calculator'

const expression = ref('0')
const result = ref('')
const calculatorStore = useCalculatorStore()
const activeKey = ref<string | null>(null)

const flashKey = (key: string) => {
  activeKey.value = key
  setTimeout(() => {
    activeKey.value = null
  }, 100)
}

onKeyStroke(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'], (e) => {
  e.preventDefault()
  flashKey(e.key)
  updateDisplay(e.key)
})

onKeyStroke(['+', '-', '(', ')'], (e) => {
  e.preventDefault()
  flashKey(e.key)
  updateDisplay(e.key)
})

onKeyStroke(['*', 'x', 'X'], (e) => {
  e.preventDefault()
  flashKey('×')
  updateDisplay('×')
})

onKeyStroke(['/', ':'], (e) => {
  e.preventDefault()
  flashKey('÷')
  updateDisplay('÷')
})

onKeyStroke(['=', 'Enter'], (e) => {
  e.preventDefault()
  flashKey('=')
  equals()
})

onKeyStroke('Escape', (e) => {
  e.preventDefault()
  flashKey('C')
  clear()
})

onKeyStroke('.', (e) => {
  e.preventDefault()
  flashKey('.')
  decimal()
})

onKeyStroke(',', (e) => {
  e.preventDefault()
  flashKey('.')
  decimal()
})

onKeyStroke('%', (e) => {
  e.preventDefault()
  flashKey('%')
  percentage()
})

onKeyStroke('Backspace', (e) => {
  // Prevent default behavior for calculator keys
  e.preventDefault()
  expression.value = expression.value.length > 1 ? expression.value.slice(0, -1) : '0'
})


const updateDisplay = (value: string): void => {
  expression.value = expression.value === '0' ? value : expression.value + value
}

const clear = (): void => {
  expression.value = '0'
  result.value = ''
}

const percentage = (): void => {
  updateDisplay('%')
}

const toggleSign = (): void => {
  if (expression.value === '0') return
  expression.value = expression.value.startsWith('-')
    ? expression.value.slice(1)
    : '-' + expression.value
}

const decimal = (): void => {
  updateDisplay('.')
}

const operate = (op: string): void => {
  updateDisplay(op)
}

const equals = (): void => {
  result.value = evaluateExpression(expression.value)
  if (result.value !== 'Error') {
    calculatorStore.addToHistory(expression.value, result.value)
  }
}
</script>

<template>
  <div class="max-w-xs mx-auto bg-[#323232] rounded-lg overflow-hidden shadow-xl">
    <div class="p-4 text-right space-y-2">
      <div class="text-white text-3xl font-light min-h-[36px]">{{ expression }}</div>
      <div class="text-white text-4xl font-light min-h-[48px]">{{ result }}</div>
    </div>
    <div class="grid grid-cols-4 gap-0.5">
      <!-- First row -->
      <button @click="[clear(), flashKey('C')]" :class="{ 'active': activeKey === 'C' }" class="btn aspect-square bg-[#A5A5A5] text-black">{{ $t('clear') }}</button>
      <button @click="[toggleSign(), flashKey('+/-')]" :class="{ 'active': activeKey === '+/-' }" class="btn aspect-square bg-[#A5A5A5] text-black">+/-</button>
      <button @click="[percentage(), flashKey('%')]" :class="{ 'active': activeKey === '%' }" class="btn aspect-square bg-[#A5A5A5] text-black">%</button>
      <button @click="[updateDisplay('÷'), flashKey('÷')]" :class="{ 'active': activeKey === '÷' }" class="btn aspect-square bg-[#FF9F0A]">÷</button>

      <!-- Number pad -->
      <button @click="[updateDisplay('7'), flashKey('7')]" :class="{ 'active': activeKey === '7' }" class="btn aspect-square bg-[#737373]">7</button>
      <button @click="[updateDisplay('8'), flashKey('8')]" :class="{ 'active': activeKey === '8' }" class="btn aspect-square bg-[#737373]">8</button>
      <button @click="[updateDisplay('9'), flashKey('9')]" :class="{ 'active': activeKey === '9' }" class="btn aspect-square bg-[#737373]">9</button>
      <button @click="[updateDisplay('×'), flashKey('×')]" :class="{ 'active': activeKey === '×' }" class="btn aspect-square bg-[#FF9F0A]">×</button>

      <button @click="[updateDisplay('4'), flashKey('4')]" :class="{ 'active': activeKey === '4' }" class="btn aspect-square bg-[#737373]">4</button>
      <button @click="[updateDisplay('5'), flashKey('5')]" :class="{ 'active': activeKey === '5' }" class="btn aspect-square bg-[#737373]">5</button>
      <button @click="[updateDisplay('6'), flashKey('6')]" :class="{ 'active': activeKey === '6' }" class="btn aspect-square bg-[#737373]">6</button>
      <button @click="[updateDisplay('-'), flashKey('-')]" :class="{ 'active': activeKey === '-' }" class="btn aspect-square bg-[#FF9F0A]">-</button>

      <button @click="[updateDisplay('1'), flashKey('1')]" :class="{ 'active': activeKey === '1' }" class="btn aspect-square bg-[#737373]">1</button>
      <button @click="[updateDisplay('2'), flashKey('2')]" :class="{ 'active': activeKey === '2' }" class="btn aspect-square bg-[#737373]">2</button>
      <button @click="[updateDisplay('3'), flashKey('3')]" :class="{ 'active': activeKey === '3' }" class="btn aspect-square bg-[#737373]">3</button>
      <button @click="[updateDisplay('+'), flashKey('+')]" :class="{ 'active': activeKey === '+' }" class="btn aspect-square bg-[#FF9F0A]">+</button>

      <!-- Last row -->
      <button @click="[updateDisplay('0'), flashKey('0')]" :class="{ 'active': activeKey === '0' }" class="btn bg-[#737373] col-span-2">0</button>
      <button @click="[decimal(), flashKey('.')]" :class="{ 'active': activeKey === '.' }" class="btn aspect-square bg-[#737373]">.</button>
      <button @click="[equals(), flashKey('=')]" :class="{ 'active': activeKey === '=' }" class="btn aspect-square bg-[#FF9F0A]">=</button>
    </div>
  </div>
</template>

<style scoped>
.btn {
  @apply text-2xl p-4 font-light text-white hover:opacity-80 transition-opacity;
  outline: none;
}

.active {
  @apply opacity-50;
  animation: flash 0.1s ease-out;
}

@keyframes flash {
  0% { opacity: 1; }
  100% { opacity: 0.5; }
}
</style>
