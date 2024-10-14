<template>
  <div class="form-container">
    <h2>Cadastro</h2>
    <input v-model="name" type="text" placeholder="Nome" required>
    <input v-model="birthday" type="date" required>
    <input v-model="email" type="email" placeholder="Email" required>
    <input v-model="password" type="password" placeholder="Senha" required>
    <button @click="submitRegister">Cadastrar</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      birthday: '',
      email: '',
      password: ''
    }
  },
  methods: {
    submitRegister() {
      this.$emit('register', {
        name: this.name,
        birthday: this.birthday,
        email: this.email,
        password: this.password,
        credits: 10
      })
    }
  }
}
</script>