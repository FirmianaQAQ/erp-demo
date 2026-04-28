import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import { getStoredUser } from '../utils/auth';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to) => {
  const currentUser = getStoredUser();

  if (to.meta.requiresAuth && !currentUser) {
    return { name: 'login' };
  }

  if (to.meta.requiresGuest && currentUser) {
    return { name: 'home' };
  }

  return true;
});

export default router;
