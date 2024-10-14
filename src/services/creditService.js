import { supabaseService } from './supabaseService'
import { authService } from './authService'

export const creditService = {
  async addCredits(amount) {
    if (authService.currentUser.value) {
      const newCredits = (authService.currentUser.value.credits || 0) + amount
      await supabaseService.updateCredits(authService.currentUser.value.id, newCredits)
      authService.currentUser.value.credits = newCredits
      return newCredits
    }
    return 0
  },

  async deductCredits(amount) {
    if (authService.currentUser.value) {
      const newCredits = Math.max(0, (authService.currentUser.value.credits || 0) - amount)
      await supabaseService.updateCredits(authService.currentUser.value.id, newCredits)
      authService.currentUser.value.credits = newCredits
      return newCredits
    }
    return 0
  }
}