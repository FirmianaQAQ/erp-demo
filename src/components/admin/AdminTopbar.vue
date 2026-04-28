<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import AppIcon from '../AppIcon.vue';
import { getStoredUser } from '../../utils/auth';
import {
  findMenuItemByRouteName,
  getFirstMenuItemByGroup,
  getFirstMenuItemByStage
} from '../../data/erpMenu';

defineProps({
  sidebarCollapsed: {
    type: Boolean,
    default: false
  }
});

defineEmits(['logout', 'toggle-sidebar']);

const route = useRoute();
const user = computed(() => getStoredUser());
const currentTitle = computed(() => route.meta.title || '首页');
const currentBreadcrumb = computed(() => {
  if (route.name === 'dashboard') {
    return [
      {
        label: '首页',
        to: { name: 'dashboard' },
        current: true
      }
    ];
  }

  const currentMenu = findMenuItemByRouteName(route.name);

  if (!currentMenu) {
    return [
      {
        label: currentTitle.value,
        to: null,
        current: true
      }
    ];
  }

  const groupEntry = getFirstMenuItemByGroup(currentMenu.groupKey);
  const stageEntry = getFirstMenuItemByStage(currentMenu.groupKey, currentMenu.stageKey);

  return [
    {
      label: '首页',
      to: { name: 'dashboard' }
    },
    {
      label: currentMenu.groupTitle,
      to: { name: groupEntry.routeName }
    },
    {
      label: currentMenu.stageTitle,
      to: { name: stageEntry.routeName }
    },
    {
      label: currentMenu.title,
      to: { name: currentMenu.routeName },
      current: true
    }
  ];
});
</script>

<template>
  <header class="admin-topbar">
    <div class="admin-topbar__main">
      <div class="admin-topbar__left">
        <button
          class="admin-topbar__menu"
          type="button"
          aria-label="切换菜单"
          @click="$emit('toggle-sidebar')"
        >
          <span class="admin-topbar__menu-icon">
            <AppIcon name="menu" :size="16" />
          </span>
          <span class="admin-topbar__menu-copy">
            <strong>{{ sidebarCollapsed ? '菜单' : '菜单' }}</strong>
          </span>
        </button>

        <div class="admin-topbar__brand">
          <span class="admin-topbar__logo">
            <AppIcon name="brand" :size="22" />
          </span>
          <div class="admin-topbar__brand-copy">
            <strong>ERP系统</strong>
          </div>
        </div>
      </div>

      <div class="admin-topbar__actions">
        <button class="admin-topbar__text-action" type="button">
          <AppIcon name="phone" :size="16" />
          <span>联系我们</span>
        </button>

        <button class="admin-topbar__icon" type="button" aria-label="全屏">
          <AppIcon name="screen" />
        </button>
        <button class="admin-topbar__icon" type="button" aria-label="邮箱">
          <AppIcon name="mail" />
        </button>
        <button class="admin-topbar__icon" type="button" aria-label="通知">
          <AppIcon name="bell" />
        </button>

        <div class="admin-topbar__workspace">
          <span class="admin-topbar__workspace-badge">财</span>
          <div class="admin-topbar__workspace-copy">
            <strong>财务（Y）</strong>
            <span>{{ user?.name || '企业运营中心' }}</span>
          </div>
        </div>

        <button class="admin-topbar__logout" type="button" @click="$emit('logout')">
          退出
        </button>
      </div>
    </div>

    <div class="admin-topbar__sub">
      <div class="admin-topbar__crumb">
        <span class="admin-topbar__crumb-icon">
          <AppIcon name="home" :size="15" />
        </span>
        <div class="admin-topbar__crumb-copy">
          <strong>{{ currentTitle }}</strong>
          <nav class="admin-topbar__breadcrumb" aria-label="面包屑">
            <template v-for="(item, index) in currentBreadcrumb" :key="`${item.label}-${index}`">
              <RouterLink
                v-if="item.to"
                class="admin-topbar__breadcrumb-link"
                :class="{ 'admin-topbar__breadcrumb-link-current': item.current }"
                :to="item.to"
              >
                {{ item.label }}
              </RouterLink>
              <span
                v-else
                class="admin-topbar__breadcrumb-link admin-topbar__breadcrumb-link-current"
              >
                {{ item.label }}
              </span>

              <span
                v-if="index < currentBreadcrumb.length - 1"
                class="admin-topbar__breadcrumb-separator"
              >
                /
              </span>
            </template>
          </nav>
        </div>
      </div>

      <button class="admin-topbar__sub-action" type="button" aria-label="收起头部">
        <AppIcon :name="sidebarCollapsed ? 'chevron-right' : 'chevron-down'" :size="16" />
      </button>
    </div>
  </header>
</template>

<style scoped>
.admin-topbar {
  position: sticky;
  top: 0;
  z-index: 20;
  box-shadow: 0 12px 28px rgba(37, 99, 235, 0.08);
}

.admin-topbar__main {
  min-height: 48px;
  padding: 0 20px 0 0;
  background: linear-gradient(90deg, #1d4ed8 0%, #2f80ed 48%, #2563eb 100%);
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  gap: 20px;
}

.admin-topbar__left,
.admin-topbar__actions,
.admin-topbar__brand,
.admin-topbar__workspace,
.admin-topbar__text-action,
.admin-topbar__crumb {
  display: flex;
  align-items: center;
}

.admin-topbar__left {
  min-width: 0;
}

.admin-topbar__menu {
  padding: 0 16px 0 14px;
  border: none;
  border-right: 1px solid rgba(255, 255, 255, 0.18);
  background: transparent;
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-align: left;
  transition: background 0.2s ease, transform 0.2s ease;
}

.admin-topbar__menu:hover {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.26), rgba(255, 255, 255, 0.1));
}

.admin-topbar__menu-icon {
  width: 30px;
  height: 30px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.16);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.admin-topbar__menu-copy {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.admin-topbar__menu-copy strong,
.admin-topbar__menu-copy small {
  display: block;
}

.admin-topbar__menu-copy strong {
  font-size: 13px;
  font-weight: 700;
}

.admin-topbar__menu-copy small {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.72);
}

.admin-topbar__brand {
  min-width: 0;
  padding-left: 2px;
  gap: 0px;
  color: #ffffff;
}

.admin-topbar__logo {
  width: 46px;
  height: 46px;
  border-radius: 4px;
  background: transparent;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.admin-topbar__brand-copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
}

.admin-topbar__brand-copy strong {
  font-size: 18px;
  line-height: 1;
}

.admin-topbar__brand-copy span {
  font-size: 10px;
  opacity: 0.78;
}

.admin-topbar__actions {
  gap: 10px;
  color: #ffffff;
}

.admin-topbar__text-action {
  height: 32px;
  padding: 0 12px;
  border: none;
  border-radius: 999px;
  background: transparent;
  color: inherit;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
}

.admin-topbar__icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.admin-topbar__workspace {
  margin-left: 4px;
  gap: 10px;
}

.admin-topbar__workspace-badge {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.22);
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.admin-topbar__workspace-copy {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.admin-topbar__workspace-copy strong {
  font-size: 14px;
}

.admin-topbar__workspace-copy span {
  font-size: 12px;
  opacity: 0.8;
}

.admin-topbar__logout {
  height: 34px;
  padding: 0 14px;
  border: none;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.15);
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
}

.admin-topbar__sub {
  min-height: 42px;
  padding: 0 12px 0 20px;
  background: linear-gradient(180deg, #f8fbff 0%, #f2f6fb 100%);
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.admin-topbar__crumb {
  min-width: 0;
  gap: 10px;
}

.admin-topbar__crumb-icon {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: #e8f1ff;
  color: #2f80ed;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.admin-topbar__crumb-copy {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.admin-topbar__crumb-copy strong {
  color: #111827;
  font-size: 14px;
}

.admin-topbar__breadcrumb {
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.admin-topbar__breadcrumb-link,
.admin-topbar__breadcrumb-separator {
  font-size: 12px;
}

.admin-topbar__breadcrumb-link {
  color: #94a3b8;
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.2s ease;
}

.admin-topbar__breadcrumb-link:hover {
  color: #2563eb;
}

.admin-topbar__breadcrumb-link-current {
  color: #2563eb;
  font-weight: 600;
}

.admin-topbar__breadcrumb-separator {
  color: #cbd5e1;
}

.admin-topbar__sub-action {
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: #94a3b8;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>
