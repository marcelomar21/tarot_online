<template>
  <div class="app-container">
    <Header @show-login="showLogin" @show-register="showRegister" />
    <div class="content container">
      <AuthToggle v-if="showAuthToggle" @close="closeAuthToggle" :authType="authType" />
      <router-view v-else></router-view>
    </div>
    <footer class="footer">
      <p>&copy; 2023 Tarozin. Todos os direitos reservados.</p>
    </footer>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import Header from './components/Header.vue'
import AuthToggle from './components/AuthToggle.vue'
import { authService } from './services/authService'

export default {
  components: {
    Header,
    AuthToggle
  },
  setup() {
    const showAuthToggle = ref(false)
    const authType = ref('')

    onMounted(() => {
      authService.init()
    })

    const showLogin = () => {
      showAuthToggle.value = true
      authType.value = 'login'
    }

    const showRegister = () => {
      showAuthToggle.value = true
      authType.value = 'register'
    }

    const closeAuthToggle = () => {
      showAuthToggle.value = false
      authType.value = ''
    }

    return {
      showAuthToggle,
      authType,
      showLogin,
      showRegister,
      closeAuthToggle
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');

body {
  font-family: 'Poppins', sans-serif;
  line-height: 1.6;
  margin: 0;
  padding: 0;
  background-color: #f0e6ff;
  color: #333;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex-grow: 1;
  padding: 2rem 0;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
}

button {
  font-family: 'Poppins', sans-serif;
  background-color: #8a2be2;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

button:hover {
  background-color: #9b30ff;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

button:disabled {
  background-color: #d8bfd8;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.form-container {
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.form-container input {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.form-container input:focus {
  border-color: #8a2be2;
  outline: none;
}

.footer {
  background-color: #6a11cb;
  color: white;
  text-align: center;
  padding: 1rem 0;
  margin-top: auto;
}

@media (max-width: 768px) {
  .container {
    padding: 0 15px;
  }

  button {
    padding: 8px 16px;
    font-size: 14px;
  }
}
</style>