import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import GameHistory from '../views/GameHistory.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/history',
    name: 'GameHistory',
    component: GameHistory
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router