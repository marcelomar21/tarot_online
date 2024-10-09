<template>
  <div class="home">
    <template v-if="authService.isAuthenticated()">
      <user-info />
      <game-selection :games="games" :canPlay="canPlay" @play-game="playGame" />
      <game-area v-if="currentGame" :cards="drawnCards" :gameType="currentGame" @interpretation-ready="saveGame" />
    </template>
    <template v-else>
      <WelcomeMessage />
    </template>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import UserInfo from '../components/UserInfo.vue'
import GameSelection from '../components/GameSelection.vue'
import GameArea from '../components/GameArea.vue'
import WelcomeMessage from '../components/WelcomeMessage.vue'
import { gameService } from '../services/gameService'
import { creditService } from '../services/creditService'
import { canStartGame } from '../utils/gameGuards'
import { authService } from '../services/authService'

export default {
  components: {
    UserInfo,
    GameSelection,
    GameArea,
    WelcomeMessage
  },
  setup() {
    const drawnCards = ref([])
    const currentGame = ref(null)

    const games = [
      { type: 'threeCards', title: '3 Cartas', description: 'Jogo rápido e direto', image: 'https://i.pinimg.com/originals/b2/46/80/b2468064211974c62b228a248b58df0b.png' },
      { type: 'royalTable', title: 'Mesa Real', description: 'Leitura completa e detalhada', image: 'https://img.elo7.com.br/product/zoom/1A1D17F/mesa-real-cartas-fechadas-mesareal-baralhocigano-pano-toalha-oraculo-cartomante-taro-esoterico.jpg' }
    ]

    const canPlay = computed(() => {
      return canStartGame(authService.currentUser.value)
    })

    const playGame = (gameType) => {
      console.log('Tentando jogar:', gameType)
      console.log('Créditos atuais:', authService.currentUser.value?.credits)
      console.log('Pode jogar?', canPlay.value)

      if (canPlay.value) {
        drawnCards.value = gameService.playGame(gameType)
        currentGame.value = gameType
        const updatedCredits = creditService.deductCredits(authService.currentUser.value.credits, 1)
        authService.updateUser({ credits: updatedCredits })
        console.log('Jogo iniciado. Créditos restantes:', updatedCredits)
      } else {
        alert('Você não tem créditos suficientes para jogar.')
      }
    }

    const saveGame = (interpretation) => {
      if (authService.currentUser.value) {
        const gameHistory = authService.currentUser.value.gameHistory || []
        gameHistory.push({
          date: new Date().toISOString(),
          gameType: currentGame.value,
          cards: drawnCards.value,
          interpretation
        })
        authService.updateUser({ gameHistory })
      }
    }

    return {
      authService,
      drawnCards,
      currentGame,
      games,
      canPlay,
      playGame,
      saveGame
    }
  }
}
</script>

<style scoped>
.home {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}
</style>