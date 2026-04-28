<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import AppIcon from '../AppIcon.vue';
import { erpMenuTree, getGroupMenuCount } from '../../data/erpMenu';

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

function getStageMenuCount(stage) {
  return stage.children?.length || 0;
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
        <span class="admin-sidebar__link-icon">
          <AppIcon name="dashboard" />
        </span>
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
            <span class="admin-sidebar__group-icon">
              <AppIcon :name="groupIconMap[group.key]" />
            </span>
            <strong v-if="!collapsed">{{ group.title }}</strong>
          </span>

          <span v-if="!collapsed" class="admin-sidebar__group-meta">
            <span class="admin-sidebar__count-badge">{{ getGroupMenuCount(group.key) }}</span>
            <AppIcon
              :name="isExpanded(group) ? 'chevron-down' : 'chevron-right'"
              :size="16"
            />
          </span>
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
              <span class="admin-sidebar__branch-meta">
                <span class="admin-sidebar__count-badge admin-sidebar__count-badge-sub">
                  {{ getStageMenuCount(stage) }}
                </span>
                <AppIcon
                  :name="isExpanded(stage) ? 'chevron-down' : 'chevron-right'"
                  :size="14"
                />
              </span>
            </button>

            <div v-if="isExpanded(stage)" class="admin-sidebar__links">
              <RouterLink
                v-for="item in stage.children"
                :key="item.key"
                class="admin-sidebar__link"
                :class="{ 'admin-sidebar__link-active': route.name === item.routeName }"
                :to="{ name: item.routeName }"
              >
                <span class="admin-sidebar__leaf-dot"></span>
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
  background:
    linear-gradient(180deg, #ffffff 0%, #fbfdff 100%);
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
.admin-sidebar__branch-list,
.admin-sidebar__group-meta,
.admin-sidebar__branch-meta {
  display: flex;
}

.admin-sidebar__section,
.admin-sidebar__group {
  flex-direction: column;
  gap: 10px;
}

.admin-sidebar__branch,
.admin-sidebar__links,
.admin-sidebar__branch-list {
  flex-direction: column;
}

.admin-sidebar__caption {
  padding: 0 12px;
  color: #94a3b8;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
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
  border-radius: 14px;
  background: #ffffff;
  color: #374151;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  box-shadow: inset 0 0 0 1px #edf2f7;
  transition: background 0.2s ease, box-shadow 0.2s ease, color 0.2s ease;
}

.admin-sidebar__group-main {
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.admin-sidebar__group-icon,
.admin-sidebar__link-icon {
  width: 28px;
  height: 28px;
  border-radius: 10px;
  background: linear-gradient(180deg, #eef5ff 0%, #e0edff 100%);
  color: #2563eb;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.admin-sidebar__group-title strong {
  font-size: 14px;
}

.admin-sidebar__group-meta,
.admin-sidebar__branch-meta {
  align-items: center;
  gap: 8px;
  color: #94a3b8;
}

.admin-sidebar__count-badge {
  min-width: 22px;
  height: 20px;
  padding: 0 6px;
  border-radius: 999px;
  background: #eff6ff;
  color: #2563eb;
  font-size: 11px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.admin-sidebar__count-badge-sub {
  background: #f8fafc;
  color: #64748b;
}

.admin-sidebar__branch-list {
  gap: 10px;
}

.admin-sidebar__branch {
  margin-left: 10px;
  padding-left: 14px;
  border-left: 1px solid #e2e8f0;
  gap: 8px;
}

.admin-sidebar__branch-title {
  min-height: 36px;
  padding: 0 10px;
  color: #6b7280;
  font-size: 13px;
  background: #f8fbff;
  box-shadow: inset 0 0 0 1px #edf2f7;
}

.admin-sidebar__links {
  gap: 6px;
}

.admin-sidebar__link {
  position: relative;
  min-height: 38px;
  padding: 0 12px 0 16px;
  border-radius: 12px;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.admin-sidebar__link-static {
  justify-content: flex-start;
  gap: 10px;
  padding-left: 10px;
  border-radius: 14px;
  background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
  box-shadow: inset 0 0 0 1px #edf2f7;
}

.admin-sidebar-collapsed .admin-sidebar__link-static,
.admin-sidebar-collapsed .admin-sidebar__group-title {
  justify-content: center;
  padding-inline: 0;
}

.admin-sidebar__leaf-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #cbd5e1;
  flex-shrink: 0;
  transition: background 0.2s ease, transform 0.2s ease;
}

.admin-sidebar__group-title:hover,
.admin-sidebar__branch-title:hover,
.admin-sidebar__link:hover {
  background: #f8fbff;
  color: #1d4ed8;
}

.admin-sidebar__group-title:hover,
.admin-sidebar__branch-title:hover {
  box-shadow: inset 0 0 0 1px #dbeafe;
}

.admin-sidebar__link-active {
  background: linear-gradient(90deg, #eff6ff 0%, #e8f1ff 100%);
  color: #2563eb;
  font-weight: 700;
  box-shadow: inset 3px 0 0 #3b82f6;
}

.admin-sidebar__link-active .admin-sidebar__leaf-dot {
  background: #2563eb;
  transform: scale(1.15);
}

.admin-sidebar-collapsed .admin-sidebar__link-icon,
.admin-sidebar-collapsed .admin-sidebar__group-icon {
  margin: 0;
}
</style>
