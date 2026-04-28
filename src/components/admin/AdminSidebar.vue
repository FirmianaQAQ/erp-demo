<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import AppIcon from '../AppIcon.vue';
import { erpMenuTree } from '../../data/erpMenu';

defineProps({
  collapsed: {
    type: Boolean,
    default: false
  }
});

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

const expandedKeys = ref(
  new Set(
    erpMenuTree.flatMap((group) => [group.key, group.children[0]?.key].filter(Boolean))
  )
);

function hasActiveDescendant(node) {
  if (node.routeName) {
    return route.name === node.routeName;
  }

  return node.children?.some((child) => hasActiveDescendant(child));
}

function isExpanded(node) {
  return expandedKeys.value.has(node.key) || hasActiveDescendant(node);
}

function toggleNode(nodeKey) {
  const nextKeys = new Set(expandedKeys.value);

  if (nextKeys.has(nodeKey)) {
    nextKeys.delete(nodeKey);
  } else {
    nextKeys.add(nodeKey);
  }

  expandedKeys.value = nextKeys;
}
</script>

<template>
  <aside class="admin-sidebar" :class="{ 'admin-sidebar-collapsed': collapsed }">
    <div class="admin-sidebar__section">
      <span v-if="!collapsed" class="admin-sidebar__caption">总览</span>
      <RouterLink
        class="admin-sidebar__link admin-sidebar__link-static"
        :class="{ 'admin-sidebar__link-active': route.name === 'dashboard' }"
        :to="{ name: 'dashboard' }"
        title="首页"
      >
        <AppIcon name="dashboard" />
        <span v-if="!collapsed">首页</span>
      </RouterLink>
    </div>

    <div class="admin-sidebar__section">
      <span v-if="!collapsed" class="admin-sidebar__caption">业务模块</span>

      <section
        v-for="group in erpMenuTree"
        :key="group.key"
        class="admin-sidebar__group"
      >
        <button
          class="admin-sidebar__group-title"
          type="button"
          :title="group.title"
          @click="toggleNode(group.key)"
        >
          <span class="admin-sidebar__group-main">
            <AppIcon :name="groupIconMap[group.key]" />
            <strong v-if="!collapsed">{{ group.title }}</strong>
          </span>

          <AppIcon
            v-if="!collapsed"
            :name="isExpanded(group) ? 'chevron-down' : 'chevron-right'"
            :size="16"
          />
        </button>

        <div v-if="!collapsed && isExpanded(group)" class="admin-sidebar__branch-list">
          <section
            v-for="stage in group.children"
            :key="stage.key"
            class="admin-sidebar__branch"
          >
            <button
              class="admin-sidebar__branch-title"
              type="button"
              @click="toggleNode(stage.key)"
            >
              <span>{{ stage.title }}</span>
              <AppIcon
                :name="isExpanded(stage) ? 'chevron-down' : 'chevron-right'"
                :size="14"
              />
            </button>

            <div v-if="isExpanded(stage)" class="admin-sidebar__links">
              <RouterLink
                v-for="item in stage.children"
                :key="item.key"
                class="admin-sidebar__link"
                :class="{ 'admin-sidebar__link-active': route.name === item.routeName }"
                :to="{ name: item.routeName }"
              >
                <span>{{ item.title }}</span>
              </RouterLink>
            </div>
          </section>
        </div>
      </section>
    </div>
  </aside>
</template>

<style scoped>
.admin-sidebar {
  padding: 18px 14px;
  border-right: 1px solid #e5e7eb;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 20px;
  transition: width 0.2s ease, padding 0.2s ease;
}

.admin-sidebar-collapsed {
  padding-inline: 10px;
}

.admin-sidebar__section,
.admin-sidebar__group,
.admin-sidebar__branch,
.admin-sidebar__links,
.admin-sidebar__branch-list {
  display: flex;
  flex-direction: column;
}

.admin-sidebar__section,
.admin-sidebar__group {
  gap: 10px;
}

.admin-sidebar__caption {
  padding: 0 10px;
  color: #9ca3af;
  font-size: 12px;
  font-weight: 700;
}

.admin-sidebar__group-title,
.admin-sidebar__branch-title,
.admin-sidebar__link {
  width: 100%;
  border: none;
  text-decoration: none;
  text-align: left;
}

.admin-sidebar__group-title,
.admin-sidebar__link-static {
  min-height: 42px;
}

.admin-sidebar__group-title,
.admin-sidebar__branch-title {
  padding: 0 10px;
  border-radius: 12px;
  background: transparent;
  color: #374151;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.admin-sidebar__group-main {
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.admin-sidebar__group-title strong {
  font-size: 14px;
}

.admin-sidebar__branch-list {
  gap: 8px;
}

.admin-sidebar__branch {
  margin-left: 10px;
  padding-left: 10px;
  border-left: 1px solid #e5e7eb;
  gap: 6px;
}

.admin-sidebar__branch-title {
  min-height: 34px;
  padding: 0 8px;
  color: #6b7280;
  font-size: 13px;
}

.admin-sidebar__links {
  gap: 6px;
}

.admin-sidebar__link {
  min-height: 38px;
  padding: 0 12px 0 18px;
  border-radius: 10px;
  color: #374151;
  display: flex;
  align-items: center;
}

.admin-sidebar__link-static {
  justify-content: flex-start;
  gap: 10px;
  padding-left: 10px;
}

.admin-sidebar-collapsed .admin-sidebar__link-static,
.admin-sidebar-collapsed .admin-sidebar__group-title {
  justify-content: center;
  padding-inline: 0;
}

.admin-sidebar__group-title:hover,
.admin-sidebar__branch-title:hover,
.admin-sidebar__link:hover {
  background: #f6f8fb;
}

.admin-sidebar__link-active {
  background: #e8f1ff;
  color: #2563eb;
  font-weight: 700;
}
</style>
