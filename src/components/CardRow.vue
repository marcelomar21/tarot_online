<template>
  <div class="card-row">
    <Card
      v-for="(card, index) in rowCards"
      :key="index"
      :card="card"
      :isFlipped="flippedCards[getCardIndex(index)]"
    />
  </div>
</template>

<script>
import Card from './Card.vue'

export default {
  components: {
    Card
  },
  props: {
    rowCards: {
      type: Array,
      required: true
    },
    flippedCards: {
      type: Object,
      required: true
    },
    rowIndex: {
      type: Number,
      required: true
    }
  },
  methods: {
    getCardIndex(columnIndex) {
      return this.rowIndex * 7 + columnIndex
    }
  }
}
</script>

<style scoped>
.card-row {
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>