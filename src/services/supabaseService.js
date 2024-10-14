import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fwjeyxycllcvtbzbtyqt.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3amV5eHljbGxjdnRiemJ0eXF0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyODczMjA3MywiZXhwIjoyMDQ0MzA4MDczfQ.L3y8vM2WFXnOR3pnriOOQWZChP-9WvRio-99NLc2_KI'

const supabase = createClient(supabaseUrl, supabaseKey)

export const supabaseService = {
  async signUp(email, password, userData) {
    console.log('supabaseService.signUp called with:', { email, userData })
    if (!email || !password || !userData) {
      console.error('Missing required data for signUp:', { email, password: password ? '[REDACTED]' : undefined, userData })
      throw new Error('Email, password, and user data are required')
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: userData.name,
            birthday: userData.birthday,
            credits: userData.credits || 10
          },
        },
      })

      console.log('Supabase signUp response:', JSON.stringify({ data, error }, null, 2))

      if (error) {
        console.error('Supabase signUp error:', error)
        throw error
      }

      if (!data || !data.user) {
        console.error('User data not returned from Supabase')
        throw new Error('User data not returned from Supabase')
      }

      console.log('User created in Supabase:', JSON.stringify(data.user, null, 2))

      return { user: data.user }
    } catch (error) {
      console.error('Error in signUp process:', error)
      throw error
    }
  },

  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
    return data
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  async getSession() {
    const { data, error } = await supabase.auth.getSession()
    if (error) {
      console.error('Error getting session:', error)
      return null
    }
    return data.session
  },

  async updateUser(updates) {
    const session = await this.getSession()
    if (!session) {
      throw new Error('No active session')
    }

    const { data, error } = await supabase.auth.updateUser({
      data: updates,
    })

    if (error) throw error
    return data
  },

  async getGameHistory(userId) {
    const { data, error } = await supabase
      .from('game_history')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  async addGameToHistory(userId, gameData) {
    const { data, error } = await supabase
      .from('game_history')
      .insert([
        {
          user_id: userId,
          ...gameData,
        },
      ])

    if (error) throw error
    return data
  },

  async updateCredits(userId, newCredits) {
    const { data, error } = await supabase
      .from('users')
      .update({ credits: newCredits })
      .eq('id', userId)

    if (error) throw error
    return data
  },
}