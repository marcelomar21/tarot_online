<template>
  <div class="game-history">
    <h2>Histórico de Jogos</h2>
    <router-link to="/" class="back-button" aria-label="Voltar para a página inicial">Voltar</router-link>
    
    <template v-if="isAuthenticated">
      <template v-if="hasGameHistory">
        <div class="history-list">
          <HistoryItem v-for="(game, index) in sortedGameHistory" :key="index" :game="game" />
        </div>
      </template>
      <div v-else class="no-history">
        Você ainda não jogou nenhum jogo.
      </div>
    </template>
    
    <div v-else class="login-message">
      <p>Faça login para ver seu histórico de jogos.</p>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import HistoryItem from '../components/HistoryItem.vue'
import { authService } from '../services/authService'
import { supabaseService } from '../services/supabaseService'

export default {
  components: {
    HistoryItem
  },
  setup() {
    const isAuthenticated = computed(() => authService.isAuthenticated())
    const gameHistory = ref([])

    const hasGameHistory = computed(() => gameHistory.value.length > 0)

    const sortedGameHistory = computed(() => {
      return [...gameHistory.value].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    })

    onMounted(async () => {
      if (isAuthenticated.value) {
        try {
          gameHistory.value = await supabaseService.getGameHistory(authService.currentUser.value.id)
        } catch (error) {
          console.error('Erro ao carregar o histórico de jogos:', error)
        }
      }
    })

    return {
      isAuthenticated,
      hasGameHistory,
      sortedGameHistory
    }
  }
}
</script>

<style scoped>
.game-history {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.back-button {
  display: inline-block;
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.back-button:hover {
  background-color: #45a049;
}

.no-history, .login-message {
  text-align: center;
  margin-top: 20px;
  font-style: italic;
  color: #666;
}

.history-list {
  margin-top: 20px;
}
</style>