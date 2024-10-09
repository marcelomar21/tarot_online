<template>
  <nav class="nav-bar">
    <div class="nav-container">
      <template v-if="!isAuthenticated">
        <button @click="$emit('login')" class="nav-button">Login</button>
        <button @click="$emit('register')" class="nav-button">Cadastro</button>
      </template>
      <template v-else>
        <span class="welcome-message">Bem-vindo, {{ userName }}!</span>
        <router-link to="/" class="nav-button">Início</router-link>
        <router-link to="/history" class="nav-button">Histórico</router-link>
        <button @click="handleLogout" class="nav-button">Sair</button>
      </template>
    </div>
  </nav>
</template>

<script>
import { computed } from 'vue'
import { authService } from '../services/authService'

export default {
  emits: ['login', 'register'],
  setup() {
    const isAuthenticated = computed(() => authService.isAuthenticated())
    const userName = computed(() => authService.currentUser.value?.name || '')

    const handleLogout = () => {
      authService.logout()
    }

    return {
      isAuthenticated,
      userName,
      handleLogout
    }
  }
}
</script>

<style scoped>
.nav-bar {
  display: flex;
  justify-content: flex-end;
}

.nav-container {
  display: flex;
  align-items: center;
}

.nav-button {
  margin-left: 10px;
  padding: 8px 15px;
  background-color: rgba(255, 255, 255, 0.2);
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  text-decoration: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.nav-button:hover {
  background-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.welcome-message {
  color: #fff;
  margin-right: 15px;
  font-weight: bold;
}

@media (max-width: 768px) {
  .nav-container {
    flex-wrap: wrap;
    justify-content: center;
  }

  .nav-button {
    margin: 5px;
  }

  .welcome-message {
    width: 100%;
    text-align: center;
    margin-bottom: 10px;
  }
}
</style>