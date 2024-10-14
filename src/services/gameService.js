import { ref } from 'vue'
import { tarotDeck } from '../utils/tarotDeck'
import { shuffleDeck, drawCards } from '../utils/deckUtils'
import { supabaseService } from './supabaseService'
import { authService } from './authService'

export const gameService = {
  flippedCards: ref({}),
  currentRevealIndex: ref(0),
  revealInterval: ref(null),

  playGame(gameType) {
    const shuffledDeck = shuffleDeck([...tarotDeck])
    const numberOfCards = gameType === 'threeCards' ? 3 : 32
    return drawCards(shuffledDeck, numberOfCards)
  },

  revealCards(cards, onComplete) {
    if (this.revealInterval.value) return

    this.revealInterval.value = setInterval(() => {
      if (this.currentRevealIndex.value < cards.length) {
        this.flippedCards.value[this.currentRevealIndex.value] = true
        this.currentRevealIndex.value++
      } else {
        clearInterval(this.revealInterval.value)
        this.revealInterval.value = null
        onComplete()
      }
    }, 300)
  },

  resetGame() {
    this.flippedCards.value = {}
    this.currentRevealIndex.value = 0
    if (this.revealInterval.value) {
      clearInterval(this.revealInterval.value)
      this.revealInterval.value = null
    }
  },

  async saveGame(gameData) {
    if (authService.currentUser.value) {
      await supabaseService.addGameToHistory(authService.currentUser.value.id, gameData)
    }
  }
}