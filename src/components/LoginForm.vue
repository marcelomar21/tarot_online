<template>
  <div class="form-container">
    <h2>Login</h2>
    <input v-model="email" type="email" placeholder="Email" required>
    <input v-model="password" type="password" placeholder="Senha" required>
    <button @click="submitLogin">Entrar</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    submitLogin() {
      this.$emit('login', this.email, this.password)
    }
  }
}
</script>