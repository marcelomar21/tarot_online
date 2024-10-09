<template>
  <div class="game-history">
    <h2>Histórico de Jogos</h2>
    <button @click="$emit('close')" class="close-button">Fechar</button>
    <div v-if="history.length === 0" class="no-history">
      Você ainda não jogou nenhum jogo.
    </div>
    <div v-else class="history-list">
      <div v-for="(game, index) in history" :key="index" class="history-item">
        <h3>{{ game.gameType }} - {{ formatDate(game.date) }}</h3>
        <div class="cards-container">
          <div v-for="(card, cardIndex) in game.cards" :key="cardIndex" class="card">
            <img :src="card.image" :alt="card.name" />
            <p>{{ card.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['history'],
  methods: {
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(dateString).toLocaleDateString('pt-BR', options);
    }
  }
}
</script>

<style scoped>
.game-history {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
}

.close-button {
  float: right;
  padding: 5px 10px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.no-history {
  text-align: center;
  margin-top: 20px;
  font-style: italic;
}

.history-item {
  margin-bottom: 30px;
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.card {
  width: 80px;
  margin: 5px;
  text-align: center;
}

.card img {
  width: 100%;
  height: auto;
  border-radius: 5px;
}

.card p {
  font-size: 12px;
  margin-top: 5px;
}
</style>