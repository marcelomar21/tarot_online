<template>
  <div class="game-area">
    <h2>{{ gameTitle }}</h2>
    <button @click="revealCards" :disabled="allCardsRevealed" class="reveal-button">
      {{ allCardsRevealed ? 'Todas as cartas reveladas' : 'Revelar Cartas' }}
    </button>
    <div v-if="cards && cards.length > 0" :class="['cards-container', gameType]">
      <template v-if="gameType === 'royalTable'">
        <div v-for="row in 5" :key="`row-${row}`" class="card-row">
          <Card
            v-for="(card, index) in getRowCards(row)"
            :key="index"
            :card="card"
            :isFlipped="flippedCards[(row - 1) * 7 + index]"
          />
        </div>
      </template>
      <template v-else>
        <Card
          v-for="(card, index) in cards"
          :key="index"
          :card="card"
          :isFlipped="flippedCards[index]"
        />
      </template>
    </div>
    <div v-else class="no-cards-message">
      Nenhuma carta para exibir no momento.
    </div>
    <div v-if="gameType === 'royalTable'" class="royal-table-info">
      <p>A Mesa Real é composta por 32 cartas, representando diferentes aspectos da vida.</p>
    </div>
    <div v-if="allCardsRevealed" class="interpretation">
      <h3>Interpretação</h3>
      <p v-if="interpretation !== 'Carregando interpretação...' && interpretation !== ''">{{ interpretation }}</p>
      <p v-else>{{ interpretation }}</p>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import Card from './Card.vue'
import { interpretationService } from '../services/interpretationService'
import { authService } from '../services/authService'

export default {
  components: {
    Card
  },
  props: ['cards', 'gameType'],
  emits: ['interpretation-ready'],
  setup(props, { emit }) {
    const flippedCards = ref({})
    const interpretation = ref('')
    const revealInterval = ref(null)

    const gameTitle = computed(() => {
      return props.gameType === 'threeCards' ? 'Jogo das 3 Cartas' : 'Mesa Real'
    })

    const allCardsRevealed = computed(() => {
      return Object.keys(flippedCards.value).length === props.cards.length &&
             Object.values(flippedCards.value).every(flipped => flipped)
    })

    const revealCards = () => {
      if (revealInterval.value) return

      let currentIndex = 0
      revealInterval.value = setInterval(() => {
        if (currentIndex < props.cards.length) {
          flippedCards.value[currentIndex] = true
          currentIndex++
        } else {
          clearInterval(revealInterval.value)
          revealInterval.value = null
          generateInterpretation()
        }
      }, 300)
    }

    const generateInterpretation = async () => {
      try {
        interpretation.value = "Carregando interpretação...";
        const userInfo = authService.currentUser.value;
        interpretation.value = await interpretationService.generateInterpretation(props.cards, userInfo);
        emit('interpretation-ready', interpretation.value);
      } catch (error) {
        interpretation.value = "Erro ao gerar interpretação.";
        console.error('Erro ao gerar interpretação:', error);
      }
    }

    const getRowCards = (row) => {
      const startIndex = (row - 1) * 7
      const endIndex = row === 5 ? startIndex + 4 : startIndex + 7
      return props.cards.slice(startIndex, endIndex)
    }

    watch(() => props.cards, () => {
      flippedCards.value = {}
      interpretation.value = ''
      if (revealInterval.value) {
        clearInterval(revealInterval.value)
        revealInterval.value = null
      }
    })

    return {
      flippedCards,
      interpretation,
      gameTitle,
      allCardsRevealed,
      revealCards,
      getRowCards
    }
  }
}
</script>

<style scoped>
.game-area {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin-top: 20px;
}

.reveal-button {
  margin-bottom: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #8a2be2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.reveal-button:hover {
  background-color: #9b30ff;
}

.reveal-button:disabled {
  background-color: #d8bfd8;
  cursor: not-allowed;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.card-row {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
}

.interpretation {
  margin-top: 20px;
  padding: 15px;
  background-color: #f0e6ff;
  border-radius: 8px;
}

.royal-table-info {
  margin-top: 20px;
  font-style: italic;
  text-align: center;
}

@media (max-width: 768px) {
  .reveal-button {
    font-size: 14px;
    padding: 8px 16px;
  }
}
</style>