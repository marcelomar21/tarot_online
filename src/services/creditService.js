export const creditService = {
  addCredits(currentCredits, amount) {
    return (currentCredits || 0) + amount
  },

  deductCredits(currentCredits, amount) {
    return Math.max(0, (currentCredits || 0) - amount)
  }
}