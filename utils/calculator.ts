import evaluate from '@emmetio/math-expression'

export function evaluateExpression(expr: string): string {
  try {
    // Handle implicit multiplication with parentheses
    let expression = expr
      .replace(/(\d)\(/g, '$1*(')
      // Replace operators to match math-expression syntax
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      // Handle percentages
      .replace(/(\d+(?:\.\d+)?)\s*%/g, (_, num) => `(${num}/100)`)
    
    // Handle percentage in operations (e.g. 50+10% = 55)
    const parts = expression.split(/([+\-*/])/)
    if (parts.length > 1) {
      const firstNumber = evaluate(parts[0])
      expression = expression.replace(/([+\-])\s*\((\d+(?:\.\d+)?)\/100\)/g, 
        (_, op, num) => `${op}(${num}/100*${firstNumber})`)
    }

    const result = evaluate(expression)
    return Number.isInteger(result) ? result.toString() : result.toFixed(8).replace(/\.?0+$/, '')
  } catch (error) {
    console.error('Calculation error:', error)
    return 'Error'
  }
}