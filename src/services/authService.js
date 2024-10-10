import { ref } from 'vue'

function calculateAge(birthday) {
  const today = new Date()
  const birthDate = new Date(birthday)
  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

function getZodiacSign(birthday) {
  const birthDate = new Date(birthday)
  const month = birthDate.getMonth() + 1
  const day = birthDate.getDate()

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Áries'
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Touro'
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gêmeos'
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Câncer'
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leão'
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgem'
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra'
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Escorpião'
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagitário'
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricórnio'
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquário'
  return 'Peixes'
}

const currentUser = ref(null)

export const authService = {
  currentUser,

  login(user) {
    const age = calculateAge(user.birthday)
    const zodiacSign = getZodiacSign(user.birthday)
    currentUser.value = {
      ...user,
      age,
      zodiacSign,
      credits: user.credits || 10,
      gameHistory: user.gameHistory || []
    }
    this.saveUserToLocalStorage()
  },

  register(user) {
    const age = calculateAge(user.birthday)
    const zodiacSign = getZodiacSign(user.birthday)
    currentUser.value = {
      ...user,
      age,
      zodiacSign,
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
      const age = calculateAge(parsedUser.birthday)
      const zodiacSign = getZodiacSign(parsedUser.birthday)
      currentUser.value = {
        ...parsedUser,
        age,
        zodiacSign,
        credits: parsedUser.credits || 10,
        gameHistory: parsedUser.gameHistory || []
      }
    }
  },

  updateUser(updates) {
    if (currentUser.value) {
      if (updates.birthday) {
        currentUser.value.age = calculateAge(updates.birthday)
        currentUser.value.zodiacSign = getZodiacSign(updates.birthday)
      }
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