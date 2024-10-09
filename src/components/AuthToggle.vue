<template>
  <div class="auth-toggle">
    <login-form v-if="showLogin" @login="handleLogin" />
    <register-form v-if="showRegister" @register="handleRegister" />
    <button @click="$emit('close')" class="close-button">Fechar</button>
  </div>
</template>

<script>
import { computed } from 'vue'
import LoginForm from './LoginForm.vue'
import RegisterForm from './RegisterForm.vue'
import { authService } from '../services/authService'

export default {
  name: 'AuthToggle',
  components: {
    LoginForm,
    RegisterForm
  },
  props: {
    authType: {
      type: String,
      default: 'login'
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const showLogin = computed(() => props.authType === 'login')
    const showRegister = computed(() => props.authType === 'register')

    const handleLogin = (user) => {
      authService.login(user)
      emit('close')
    }

    const handleRegister = (user) => {
      authService.register(user)
      emit('close')
    }

    return {
      showLogin,
      showRegister,
      handleLogin,
      handleRegister
    }
  }
}
</script>

<style scoped>
.auth-toggle {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin-top: 20px;
}

.close-button {
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.close-button:hover {
  background-color: #d32f2f;
}
</style>