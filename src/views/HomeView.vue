<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import AdminSidebar from '../components/admin/AdminSidebar.vue';
import AdminTopbar from '../components/admin/AdminTopbar.vue';
import { logout } from '../utils/auth';

const router = useRouter();
const sidebarCollapsed = ref(false);

const bodyStyle = computed(() => ({
  gridTemplateColumns: sidebarCollapsed.value ? '84px minmax(0, 1fr)' : '296px minmax(0, 1fr)'
}));

async function handleLogout() {
  logout();
  await router.push({ name: 'login' });
}

function toggleSidebar() {
  sidebarCollapsed.value = !sidebarCollapsed.value;
}
</script>

<template>
  <main class="page page-home">
    <section class="home-layout">
      <AdminTopbar
        :sidebar-collapsed="sidebarCollapsed"
        @logout="handleLogout"
        @toggle-sidebar="toggleSidebar"
      />

      <div class="home-layout__body" :style="bodyStyle">
        <AdminSidebar :collapsed="sidebarCollapsed" />

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
  min-height: calc(100vh - 90px);
  transition: grid-template-columns 0.2s ease;
}

.home-layout__content {
  min-width: 0;
  padding: 24px;
}
</style>
