<template>
  <div class="card">
    <div class="card-inner" :class="{ flipped: isFlipped }">
      <div class="card-front"></div>
      <div class="card-back">
        <img v-if="card && card.image" :src="card.image" :alt="card.name" loading="lazy">
        <p>{{ card ? card.name : 'Carta desconhecida' }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      default: () => ({})
    },
    isFlipped: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.card {
  width: 100px;
  height: 175px;
  perspective: 1000px;
  margin: 5px;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.card-inner.flipped {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-front {
  background-image: url('https://i.pinimg.com/originals/96/fe/b2/96feb2df0b9d41b2e1d9b6d2b1e2c7e1.jpg');
  background-size: cover;
  background-position: center;
}

.card-back {
  background-color: white;
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;
  box-sizing: border-box;
}

.card-back img {
  max-width: 90%;
  max-height: 70%;
  object-fit: contain;
  border-radius: 5px;
  margin-bottom: 5px;
}

.card-back p {
  font-size: 10px;
  margin: 0;
  text-align: center;
  word-wrap: break-word;
  max-width: 90%;
}

@media (max-width: 768px) {
  .card {
    width: 80px;
    height: 140px;
  }

  .card-back p {
    font-size: 8px;
  }
}
</style>