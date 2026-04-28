<script setup>
import { useRouter } from 'vue-router';
import AdminSidebar from '../components/admin/AdminSidebar.vue';
import AdminTopbar from '../components/admin/AdminTopbar.vue';
import { logout } from '../utils/auth';

const router = useRouter();

async function handleLogout() {
  logout();
  await router.push({ name: 'login' });
}
</script>

<template>
  <main class="page page-home">
    <section class="home-layout">
      <AdminTopbar @logout="handleLogout" />

      <div class="home-layout__body">
        <AdminSidebar />

        <section class="home-layout__content">
          <router-view />
        </section>
      </div>
    </section>
  </main>
</template>

<style scoped>
.page-home {
  display: block;
  padding: 0;
}

.home-layout {
  width: 100%;
  min-height: 100vh;
  background: #f6f8fb;
}

.home-layout__body {
  display: grid;
  grid-template-columns: 272px minmax(0, 1fr);
  min-height: calc(100vh - 76px);
}

.home-layout__content {
  min-width: 0;
  padding: 28px;
}
</style>
