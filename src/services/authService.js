import { ref } from 'vue'

const currentUser = ref(null)

export const authService = {
  currentUser,

  login(user) {
    currentUser.value = {
      ...user,
      credits: user.credits || 10,
      gameHistory: user.gameHistory || []
    }
    this.saveUserToLocalStorage()
  },

  register(user) {
    currentUser.value = {
      ...user,
      credits: 10,
      gameHistory: []
    }
    this.saveUserToLocalStorage()
  },

  logout() {
    currentUser.value = null
    localStorage.removeItem('user')
  },

  isAuthenticated() {
    return !!currentUser.value
  },

  init() {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      currentUser.value = {
        ...parsedUser,
        credits: parsedUser.credits || 10,
        gameHistory: parsedUser.gameHistory || []
      }
    }
  },

  updateUser(updates) {
    if (currentUser.value) {
      Object.assign(currentUser.value, updates)
      this.saveUserToLocalStorage()
    }
  },

  saveUserToLocalStorage() {
    if (currentUser.value) {
      localStorage.setItem('user', JSON.stringify(currentUser.value))
    }
  }
}