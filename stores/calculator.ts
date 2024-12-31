import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export interface CalculationHistory {
  id: string
  expression: string
  result: string
  timestamp: Date
  label?: string
}

export const useCalculatorStore = defineStore('calculator', {
  state: () => ({
    history: useStorage('calculator-history', [] as CalculationHistory[])
  }),

  actions: {
    addToHistory(expression: string, result: string) {
      const config = useRuntimeConfig()
      const maxSize = config.public.maxHistorySize

      this.history.unshift({
        id: crypto.randomUUID(),
        expression,
        result,
        timestamp: new Date().toISOString()
      })

      // Keep only the most recent operations
      if (this.history.length > maxSize) {
        this.history.length = maxSize
      }
    },

    setLabel(id: string, label: string) {
      const item = this.history.find(h => h.id === id)
      if (item) {
        item.label = label
      }
    },

    deleteEntry(id: string) {
      this.history = this.history.filter(item => item.id !== id)
    },

    clearHistory() {
      this.history = []
    }
  }
})