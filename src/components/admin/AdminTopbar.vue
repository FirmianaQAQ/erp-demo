<script setup>
import { computed } from 'vue';
import AppIcon from '../AppIcon.vue';
import { getStoredUser } from '../../utils/auth';

defineEmits(['logout']);

const user = computed(() => getStoredUser());
</script>

<template>
  <header class="admin-topbar">
    <div class="admin-topbar__left">
      <div class="admin-topbar__brand">
        <span class="admin-topbar__logo">
          <AppIcon name="brand" :size="22" />
        </span>
        <strong>ERP业务中台</strong>
      </div>

      <nav class="admin-topbar__nav">
        <a class="admin-topbar__link admin-topbar__link-active" href="javascript:void(0)">
          首页
        </a>
      </nav>
    </div>

    <div class="admin-topbar__actions">
      <button class="admin-topbar__icon" type="button" aria-label="消息提醒">
        <AppIcon name="bell" />
      </button>
      <button class="admin-topbar__icon" type="button" aria-label="终端状态">
        <AppIcon name="screen" />
      </button>
      <button class="admin-topbar__icon" type="button" aria-label="语言设置">
        <AppIcon name="language" />
      </button>

      <div class="admin-topbar__user">
        <span class="admin-topbar__avatar">{{ user?.name?.slice(0, 1) || '管' }}</span>
        <div>
          <strong>{{ user?.name || '管理员' }}</strong>
          <span>企业运营</span>
        </div>
      </div>

      <button class="admin-topbar__logout" type="button" @click="$emit('logout')">
        退出
      </button>
    </div>
  </header>
</template>

<style scoped>
.admin-topbar {
  height: 76px;
  padding: 0 28px;
  border-bottom: 1px solid #e5e7eb;
  background: rgba(255, 255, 255, 0.96);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  position: sticky;
  top: 0;
  z-index: 10;
  backdrop-filter: blur(12px);
}

.admin-topbar__left,
.admin-topbar__actions,
.admin-topbar__nav,
.admin-topbar__brand,
.admin-topbar__user {
  display: flex;
  align-items: center;
}

.admin-topbar__left,
.admin-topbar__actions {
  gap: 24px;
}

.admin-topbar__brand {
  gap: 12px;
  color: #111827;
}

.admin-topbar__brand strong {
  font-size: 18px;
}

.admin-topbar__logo {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, #fff7ed, #ffedd5);
  color: #ea580c;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.admin-topbar__nav {
  gap: 10px;
}

.admin-topbar__link {
  height: 40px;
  padding: 0 14px;
  border-radius: 10px;
  color: #111827;
  text-decoration: none;
  font-size: 15px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
}

.admin-topbar__link-active {
  background: #eef2ff;
  color: #4338ca;
}

.admin-topbar__icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: #f3f4f6;
  color: #4b5563;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.admin-topbar__user {
  gap: 10px;
  padding: 6px 10px 6px 6px;
  border-radius: 999px;
  background: #fff;
  border: 1px solid #e5e7eb;
}

.admin-topbar__avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #fde68a;
  color: #92400e;
  font-size: 14px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.admin-topbar__user strong,
.admin-topbar__user span {
  display: block;
}

.admin-topbar__user strong {
  color: #111827;
  font-size: 14px;
}

.admin-topbar__user span {
  color: #6b7280;
  font-size: 12px;
}

.admin-topbar__logout {
  height: 40px;
  padding: 0 16px;
  border: none;
  border-radius: 10px;
  background: #eff6ff;
  color: #1d4ed8;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}
</style>
