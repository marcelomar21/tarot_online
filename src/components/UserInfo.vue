<template>
  <div v-if="currentUser" class="user-info-container">
    <div class="user-info">
      <h2>Olá, <span class="user-name">{{ currentUser.name }}</span>!</h2>
      <p class="credits">
        <span class="credits-label">Créditos:</span>
        <span class="credits-value">{{ currentUser.credits }}</span>
      </p>
    </div>
    <button @click="addCredits" class="add-credits-btn">
      <span class="btn-icon">+</span>
      Adicionar Créditos
    </button>
  </div>
</template>

<script>
import { computed } from 'vue'
import { authService } from '../services/authService'
import { creditService } from '../services/creditService'

export default {
  setup() {
    const currentUser = computed(() => authService.currentUser.value)

    const addCredits = () => {
      if (currentUser.value) {
        const updatedCredits = creditService.addCredits(currentUser.value.credits, 10)
        authService.updateUser({ credits: updatedCredits })
      }
    }

    return {
      currentUser,
      addCredits
    }
  }
}
</script>

<style scoped>
.user-info-container {
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.user-info-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
}

.user-info h2 {
  margin: 0;
  color: #ffffff;
  font-size: 2em;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.user-name {
  color: #ffd700;
  text-decoration: underline;
  text-decoration-color: #ffd700;
  text-decoration-thickness: 2px;
  text-underline-offset: 4px;
}

.credits {
  font-size: 1.4em;
  font-weight: bold;
  color: #ffffff;
  margin: 10px 0 0;
  display: flex;
  align-items: center;
}

.credits-label {
  margin-right: 10px;
  opacity: 0.9;
}

.credits-value {
  background-color: rgba(255, 255, 255, 0.2);
  color: #ffd700;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 1.1em;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.add-credits-btn {
  padding: 12px 25px;
  font-size: 1.1em;
  background: linear-gradient(45deg, #ff6b6b, #feca57);
  color: #ffffff;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.add-credits-btn:hover {
  background: linear-gradient(45deg, #ff5252, #ffd200);
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.btn-icon {
  font-size: 1.4em;
  margin-right: 8px;
}

@media (max-width: 768px) {
  .user-info-container {
    flex-direction: column;
    align-items: stretch;
    text-align: center;
    padding: 20px;
  }

  .user-info h2 {
    font-size: 1.8em;
  }

  .credits {
    justify-content: center;
    margin-top: 15px;
  }

  .add-credits-btn {
    margin-top: 20px;
    width: 100%;
    justify-content: center;
  }
}
</style>