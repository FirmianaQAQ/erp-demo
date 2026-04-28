<script setup>
import { useRoute } from 'vue-router';
import AppIcon from '../AppIcon.vue';
import { erpMenuTree } from '../../data/erpMenu';

const route = useRoute();

const groupIconMap = {
  base: 'base',
  sales: 'sales',
  planning: 'planning',
  purchase: 'purchase',
  outsource: 'outsource',
  production: 'production',
  finance: 'finance'
};
</script>

<template>
  <aside class="admin-sidebar">
    <div class="admin-sidebar__section">
      <span class="admin-sidebar__caption">总览</span>
      <RouterLink
        class="admin-sidebar__link admin-sidebar__link-static"
        :class="{ 'admin-sidebar__link-active': route.name === 'dashboard' }"
        :to="{ name: 'dashboard' }"
      >
        <AppIcon name="dashboard" />
        <span>数据看板</span>
      </RouterLink>
    </div>

    <div class="admin-sidebar__section">
      <span class="admin-sidebar__caption">业务模块</span>

      <section
        v-for="group in erpMenuTree"
        :key="group.key"
        class="admin-sidebar__group"
      >
        <div class="admin-sidebar__group-title">
          <AppIcon :name="groupIconMap[group.key]" />
          <strong>{{ group.title }}</strong>
        </div>

        <RouterLink
          v-for="item in group.children"
          :key="item.key"
          class="admin-sidebar__link"
          :class="{ 'admin-sidebar__link-active': route.name === item.routeName }"
          :to="{ name: item.routeName }"
        >
          <span>{{ item.title }}</span>
        </RouterLink>
      </section>
    </div>
  </aside>
</template>

<style scoped>
.admin-sidebar {
  padding: 24px 18px;
  border-right: 1px solid #e5e7eb;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.admin-sidebar__section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.admin-sidebar__caption {
  padding: 0 12px;
  color: #9ca3af;
  font-size: 13px;
  font-weight: 700;
}

.admin-sidebar__group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.admin-sidebar__group-title {
  min-height: 36px;
  padding: 0 12px;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 10px;
}

.admin-sidebar__group-title strong {
  font-size: 14px;
}

.admin-sidebar__link {
  min-height: 42px;
  padding: 0 12px 0 42px;
  border-radius: 12px;
  color: #374151;
  text-align: left;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
}

.admin-sidebar__link-static {
  padding-left: 12px;
}

.admin-sidebar__link:hover {
  background: #f3f4f6;
}

.admin-sidebar__link-active {
  background: #e8f1ff;
  color: #2563eb;
  font-weight: 700;
}
</style>
