import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import DashboardPage from '../views/home/DashboardPage.vue';
import MenuPage from '../views/home/MenuPage.vue';
import { getAllMenuItems } from '../data/erpMenu';
import { getStoredUser } from '../utils/auth';

const menuRoutes = getAllMenuItems().map((item) => ({
  path: `${item.groupKey}/${item.key}`,
  name: item.routeName,
  component: MenuPage,
  props: {
    groupKey: item.groupKey,
    menuKey: item.key
  },
  meta: {
    title: item.title,
    breadcrumb: item.breadcrumb.join(' / '),
    groupTitle: item.groupTitle
  }
}));

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home/dashboard'
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
      component: HomeView,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '',
          redirect: { name: 'dashboard' }
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: DashboardPage,
          meta: {
            title: '首页',
            breadcrumb: '首页'
          }
        },
        ...menuRoutes
      ]
    }
  ]
});

router.beforeEach((to) => {
  const currentUser = getStoredUser();

  if (to.meta.requiresAuth && !currentUser) {
    return { name: 'login' };
  }

  if (to.meta.requiresGuest && currentUser) {
    return { name: 'dashboard' };
  }

  return true;
});

export default router;
