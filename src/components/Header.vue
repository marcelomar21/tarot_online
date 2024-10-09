<template>
  <header>
    <div class="container header-content">
      <h1 class="title">
        <span class="title-text">Tarozin</span>
        <span class="title-emoji">🔮</span>
      </h1>
      <nav-bar 
        @logout="handleLogout" 
        @login="$emit('show-login')" 
        @register="$emit('show-register')" 
      />
    </div>
  </header>
</template>

<script>
import { computed } from 'vue'
import NavBar from './NavBar.vue'
import { authService } from '../services/authService'

export default {
  name: 'Header',
  components: {
    NavBar
  },
  emits: ['show-login', 'show-register'],
  setup(props, { emit }) {
    const currentUser = computed(() => authService.currentUser.value)

    const handleLogout = () => {
      authService.logout()
    }

    return {
      currentUser,
      handleLogout
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap');

header {
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  padding: 1rem 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-family: 'Cinzel', serif;
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.title-text {
  background: linear-gradient(to right, #FFD700, #FFA500);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
}

.title-emoji {
  font-size: 2rem;
  margin-left: 0.5rem;
  vertical-align: middle;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: center;
  }

  .title {
    margin-bottom: 1rem;
  }
}
</style>