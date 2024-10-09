<template>
  <div class="game-selection">
    <h2>Escolha seu jogo</h2>
    <div class="game-buttons">
      <button 
        v-for="game in games" 
        :key="game.type"
        @click="$emit('play-game', game.type)" 
        :disabled="!canPlay" 
        class="game-btn"
      >
        <div class="game-btn-content">
          <img :src="game.image" :alt="game.title" class="game-btn-image">
          <div class="game-btn-text">
            <span class="game-btn-title">{{ game.title }}</span>
            <span class="game-btn-description">{{ game.description }}</span>
          </div>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    games: {
      type: Array,
      required: true
    },
    canPlay: {
      type: Boolean,
      required: true
    }
  },
  emits: ['play-game']
}
</script>

<style scoped>
.game-selection {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.game-selection h2 {
  text-align: center;
  color: #4a0e78;
  margin-bottom: 20px;
}

.game-buttons {
  display: flex;
  justify-content: space-around;
  gap: 15px; /* Reduzindo o espaçamento entre as cartas */
}

.game-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  font-size: 1em;
  background-color: #9370db;
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  overflow: hidden;
  max-width: 220px; /* Ajustando a largura máxima */
}

.game-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.game-btn:disabled {
  background-color: #d8bfd8;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.game-btn-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.game-btn-image {
  width: 100%;
  height: 200px; /* Diminuindo a altura da imagem */
  object-fit: cover;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.game-btn-text {
  padding: 12px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.7);
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.game-btn-title {
  font-size: 1.1em;
  font-weight: bold;
  margin-bottom: 5px;
}

.game-btn-description {
  font-size: 0.85em;
  opacity: 0.8;
  font-style: italic;
}

@media (max-width: 768px) {
  .game-buttons {
    flex-direction: column;
    align-items: center;
  }

  .game-btn {
    width: 85%; /* Ajustando a largura em telas menores */
    max-width: none;
    margin-bottom: 15px;
  }
}
</style>