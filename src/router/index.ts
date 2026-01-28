import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/speech-words',
      name: 'speech-words',
      component: () => import('../views/SpeechWordsView.vue'),
    },
  ],
})

export default router
