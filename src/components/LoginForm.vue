<template>
  <div class="form-container">
    <h2>Login</h2>
    <form @submit.prevent="submitLogin">
      <input v-model="email" type="email" placeholder="Email" required>
      <input v-model="password" type="password" placeholder="Senha" required>
      <button type="submit">Entrar</button>
    </form>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { ref } from 'vue'
import { authService } from '../services/authService'

export default {
  emits: ['login'],
  setup(props, { emit }) {
    const email = ref('')
    const password = ref('')
    const errorMessage = ref('')

    const submitLogin = async () => {
      errorMessage.value = ''
      const result = await authService.login(email.value, password.value)
      if (result.success) {
        emit('login')
      } else {
        errorMessage.value = result.error
      }
    }

    return {
      email,
      password,
      errorMessage,
      submitLogin
    }
  }
}
</script>

<style scoped>
.error-message {
  color: red;
  margin-top: 10px;
}
</style>