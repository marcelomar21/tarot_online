<template>
  <div class="history-item">
    <h3>{{ getGameTypeName(game.gameType) }} - {{ formatDate(game.date) }}</h3>
    <div v-if="game.cards && game.cards.length > 0" class="cards-container">
      <Card v-for="(card, cardIndex) in game.cards" :key="cardIndex" :card="card" :isFlipped="true" />
    </div>
    <div v-else class="no-cards-message">
      Nenhuma carta disponível para este jogo.
    </div>
    <div v-if="game.interpretation" class="interpretation">
      <h4>Interpretação:</h4>
      <p>{{ game.interpretation }}</p>
    </div>
  </div>
</template>

<script>
import { formatDate } from '../utils/dateUtils'
import Card from './Card.vue'

export default {
  components: {
    Card
  },
  props: {
    game: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatDate,
    getGameTypeName(gameType) {
      switch (gameType) {
        case 'threeCards':
          return 'Jogo das 3 Cartas'
        case 'royalTable':
          return 'Mesa Real'
        default:
          return 'Jogo Desconhecido'
      }
    }
  }
}
</script>

<style scoped>
.history-item {
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

h3 {
  color: #4a0e78;
  margin-bottom: 15px;
  font-size: 1.2em;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.no-cards-message {
  text-align: center;
  font-style: italic;
  color: #666;
  margin: 20px 0;
}

.interpretation {
  background-color: #f0f0f0;
  border-radius: 5px;
  padding: 15px;
  margin-top: 20px;
}

.interpretation h4 {
  color: #4a0e78;
  margin-bottom: 10px;
}

.interpretation p {
  font-style: italic;
  color: #333;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .history-item {
    padding: 15px;
  }

  .cards-container {
    justify-content: flex-start;
  }
}
</style>