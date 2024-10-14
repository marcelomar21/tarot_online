import { ref } from 'vue'
import { supabaseService } from './supabaseService'

const currentUser = ref(null)

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

export const authService = {
  currentUser,

  async login(email, password) {
    try {
      const { user } = await supabaseService.signIn(email, password)
      if (user) {
        const age = calculateAge(user.user_metadata.birthday)
        const zodiacSign = getZodiacSign(user.user_metadata.birthday)
        currentUser.value = {
          ...user,
          ...user.user_metadata,
          age,
          zodiacSign,
        }
        return { success: true }
      } else {
        return { success: false, error: 'Usuário não encontrado' }
      }
    } catch (error) {
      console.error('Login error:', error)
      if (error.code === 'invalid_credentials') {
        return { success: false, error: 'Email ou senha incorretos' }
      }
      return { success: false, error: 'Erro ao fazer login. Tente novamente.' }
    }
  },

  async register(userData) {
    console.log('Starting registration process with userData:', JSON.stringify(userData, null, 2))
    try {
      if (!userData || !userData.email || !userData.password || !userData.name || !userData.birthday) {
        console.error('Incomplete user data:', JSON.stringify(userData, null, 2))
        return { success: false, error: 'Dados de usuário incompletos' }
      }

      console.log('Calling supabaseService.signUp with:', {
        email: userData.email,
        name: userData.name,
        birthday: userData.birthday,
        credits: 10,
      })

      const { user } = await supabaseService.signUp(userData.email, userData.password, {
        name: userData.name,
        birthday: userData.birthday,
        credits: 10,
      })

      console.log('supabaseService.signUp response:', JSON.stringify({ user }, null, 2))
      
      if (user) {
        console.log('User data received from Supabase:', JSON.stringify(user, null, 2))
        const age = calculateAge(user.user_metadata.birthday)
        const zodiacSign = getZodiacSign(user.user_metadata.birthday)
        currentUser.value = {
          ...user,
          ...user.user_metadata,
          age,
          zodiacSign,
        }
        console.log('Current user set to:', JSON.stringify(currentUser.value, null, 2))
        return { success: true }
      } else {
        console.error('No user data returned from Supabase')
        return { success: false, error: 'Dados do usuário não retornados do registro' }
      }
    } catch (error) {
      console.error('Registration error:', error)
      if (error.code === 'user_already_registered') {
        return { success: false, error: 'Este email já está registrado' }
      }
      return { success: false, error: 'Erro ao registrar. Tente novamente.' }
    }
  },

  async logout() {
    try {
      await supabaseService.signOut()
      currentUser.value = null
      return { success: true }
    } catch (error) {
      console.error('Logout error:', error)
      return { success: false, error: 'Erro ao fazer logout. Tente novamente.' }
    }
  },

  isAuthenticated() {
    return !!currentUser.value
  },

  async init() {
    try {
      const session = await supabaseService.getSession()
      console.log('Session from Supabase:', JSON.stringify(session, null, 2))
      if (session) {
        const user = session.user
        if (user && user.user_metadata) {
          console.log('User metadata:', JSON.stringify(user.user_metadata, null, 2))
          const age = calculateAge(user.user_metadata.birthday)
          const zodiacSign = getZodiacSign(user.user_metadata.birthday)
          currentUser.value = {
            ...user,
            ...user.user_metadata,
            age,
            zodiacSign,
          }
          console.log('Current user set to:', JSON.stringify(currentUser.value, null, 2))
        }
      }
    } catch (error) {
      console.error('Error initializing auth:', error)
      currentUser.value = null
    }
  },

  async updateUser(updates) {
    console.log('Updating user with:', JSON.stringify(updates, null, 2))
    if (currentUser.value) {
      try {
        const session = await supabaseService.getSession()
        if (!session) {
          throw new Error('No active session')
        }

        if (updates.birthday) {
          updates.age = calculateAge(updates.birthday)
          updates.zodiacSign = getZodiacSign(updates.birthday)
        }
        const { user } = await supabaseService.updateUser(updates)
        if (user) {
          console.log('Updated user data:', JSON.stringify(user, null, 2))
          Object.assign(currentUser.value, user.user_metadata, updates)
          console.log('Current user after update:', JSON.stringify(currentUser.value, null, 2))
          return { success: true }
        } else {
          return { success: false, error: 'Falha ao atualizar usuário' }
        }
      } catch (error) {
        console.error('Error updating user:', error)
        if (error.message === 'No active session') {
          await this.logout()
          return { success: false, error: 'Sessão expirada. Faça login novamente.' }
        }
        return { success: false, error: 'Erro ao atualizar usuário. Tente novamente.' }
      }
    } else {
      return { success: false, error: 'Nenhum usuário logado' }
    }
  },
}