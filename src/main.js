import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { supabaseService } from './services/supabaseService'
import { authService } from './services/authService'

const app = createApp(App)

app.use(router)

supabaseService.getSession().then(() => {
  authService.init().then(() => {
    app.mount('#app')
  })
}).catch(error => {
  console.error('Error initializing Supabase session:', error)
  app.mount('#app')
})