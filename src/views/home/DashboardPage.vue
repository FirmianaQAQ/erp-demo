<script setup>
import { computed } from 'vue';
import AppIcon from '../../components/AppIcon.vue';
import {
  dashboardCards,
  dashboardInitiatedList,
  dashboardNotices,
  dashboardShortcuts,
  dashboardTodoList,
  dashboardWorkspace,
  getDashboardServices
} from '../../data/dashboard';
import { erpMenuTree, getGroupMenuCount, getMenuStats } from '../../data/erpMenu';

const stats = getMenuStats();
const services = getDashboardServices(stats);

const greeting = computed(() => {
  const hour = new Date().getHours();

  if (hour < 12) {
    return '早上好';
  }

  if (hour < 18) {
    return '下午好';
  }

  return '晚上好';
});

const processBars = computed(() => {
  return erpMenuTree.map((group, index) => ({
    key: group.key,
    title: group.title,
    value: getGroupMenuCount(group.key),
    color: ['#5b8ff9', '#22c55e', '#f59e0b', '#8b5cf6', '#14b8a6', '#ef4444', '#0f766e'][index]
  }));
});

const processSnapshots = computed(() => {
  return erpMenuTree.map((group) => ({
    key: group.key,
    title: group.title,
    stageSummary: group.children.map((stage) => stage.title).join(' / '),
    functionSummary: group.children
      .flatMap((stage) => stage.children.map((item) => item.title))
      .slice(0, 3)
      .join(' / ')
  }));
});
</script>

<template>
  <div class="dashboard-page">
    <div class="dashboard-page__toolbar">
      <div>
        <h1>{{ greeting }}！</h1>
        <p class="dashboard-page__copy">
          今天建议优先关注财务工作台、流程待办与核心业务图表，页面结构已按业务门户样式重排。
        </p>
      </div>

      <div class="dashboard-page__toolbar-actions">
        <button class="dashboard-page__icon" type="button" aria-label="刷新">
          <AppIcon name="refresh" :size="18" />
        </button>
        <button class="dashboard-page__workbench-button" type="button">
          <AppIcon name="screen" :size="16" />
          <span>我的工作中心</span>
        </button>
      </div>
    </div>
    <section class="dashboard-page__metric-grid">
      <article
        v-for="card in dashboardCards"
        :key="card.key"
        class="dashboard-page__metric-card"
      >
        <header class="dashboard-page__metric-header">
          <div class="dashboard-page__metric-title">
            <span class="dashboard-page__metric-icon">
              <AppIcon :name="card.icon" />
            </span>
            <h3>{{ card.title }}</h3>
          </div>
        </header>

        <div class="dashboard-page__metric-body">
          <div>
            <strong>{{ card.value }}</strong>
            <p>{{ card.description }}</p>
          </div>

          <svg class="dashboard-page__metric-line" viewBox="0 0 108 48">
            <polyline
              fill="none"
              :points="card.points"
              :stroke="card.lineColor"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </article>
    </section>

    <section class="dashboard-page__main-grid">
      <article class="dashboard-page__panel dashboard-page__panel-span-2">
        <header class="dashboard-page__panel-header">
          <div class="dashboard-page__panel-title">
            <AppIcon name="reports" />
            <h3>ERP 模块流转分析</h3>
          </div>

          <div class="dashboard-page__tabs">
            <button class="dashboard-page__tab dashboard-page__tab-active" type="button">
              菜单覆盖
            </button>
            <button class="dashboard-page__tab" type="button">生产负荷</button>
            <button class="dashboard-page__tab" type="button">成本趋势</button>
          </div>
        </header>

        <div class="dashboard-page__chart-content">
          <div class="dashboard-page__chart-summary">
            <div>
              <h4>整体流程覆盖</h4>
              <p>
                当前已拆分 {{ stats.menuCount }} 个业务节点，覆盖 {{ stats.moduleCount }} 个一级模块。
              </p>
            </div>
            <div class="dashboard-page__badge">全链路视图</div>
          </div>

          <div class="dashboard-page__bar-chart">
            <div
              v-for="bar in processBars"
              :key="bar.key"
              class="dashboard-page__bar-column"
            >
              <div class="dashboard-page__bar-track">
                <div
                  class="dashboard-page__bar-fill"
                  :style="{
                    height: `${bar.value * 14 + 38}px`,
                    background: bar.color
                  }"
                ></div>
              </div>
              <span class="dashboard-page__bar-value">{{ bar.value }}</span>
              <span class="dashboard-page__bar-label">{{ bar.title }}</span>
            </div>
          </div>
        </div>
      </article>
    </section>

    <section class="dashboard-page__overview-grid">
      <article class="dashboard-page__panel dashboard-page__panel-span-2">
        <header class="dashboard-page__panel-header">
          <div class="dashboard-page__panel-title">
            <AppIcon name="dashboard" />
            <h3>快捷入口</h3>
          </div>
        </header>

        <div class="dashboard-page__shortcut-grid">
          <RouterLink
            v-for="item in dashboardShortcuts"
            :key="item.key"
            class="dashboard-page__shortcut-item"
            :to="{ name: item.routeName }"
          >
            <span
              class="dashboard-page__shortcut-icon"
              :class="`dashboard-page__shortcut-icon-${item.tone}`"
            >
              <AppIcon :name="item.icon" :size="18" />
            </span>
            <span class="dashboard-page__shortcut-label">{{ item.title }}</span>
          </RouterLink>
        </div>
      </article>

      <article class="dashboard-page__panel">
        <header class="dashboard-page__panel-header">
          <div class="dashboard-page__panel-title">
            <AppIcon name="base" />
            <h3>当前组织</h3>
          </div>
        </header>

        <div class="dashboard-page__workspace-card">
          <span class="dashboard-page__workspace-badge">{{ dashboardWorkspace.badge }}</span>
          <div class="dashboard-page__workspace-copy">
            <h4>{{ dashboardWorkspace.title }}</h4>
            <p>{{ dashboardWorkspace.company }}</p>
            <p>{{ dashboardWorkspace.department }}</p>
          </div>
        </div>
      </article>
    </section>

    <section class="dashboard-page__board-grid">
      <article class="dashboard-page__panel">
        <header class="dashboard-page__panel-header">
          <div class="dashboard-page__panel-title">
            <AppIcon name="bell" />
            <h3>我的待办</h3>
          </div>

          <div class="dashboard-page__panel-actions">
            <button class="dashboard-page__panel-icon" type="button" aria-label="刷新待办">
              <AppIcon name="refresh" :size="14" />
            </button>
            <button class="dashboard-page__panel-icon" type="button" aria-label="更多待办">
              <AppIcon name="chevron-right" :size="14" />
            </button>
          </div>
        </header>

        <ul class="dashboard-page__task-list">
          <li v-for="item in dashboardTodoList" :key="item.code" class="dashboard-page__task-item">
            <div>
              <strong>{{ item.title }}</strong>
              <p>{{ item.code }} · {{ item.owner }}</p>
            </div>
            <span>{{ item.deadline }}</span>
          </li>
        </ul>
      </article>

      <article class="dashboard-page__panel">
        <header class="dashboard-page__panel-header">
          <div class="dashboard-page__panel-title">
            <AppIcon name="flow" />
            <h3>我的发起</h3>
          </div>

          <div class="dashboard-page__panel-actions">
            <button class="dashboard-page__panel-icon" type="button" aria-label="刷新发起">
              <AppIcon name="refresh" :size="14" />
            </button>
            <button class="dashboard-page__panel-icon" type="button" aria-label="更多发起">
              <AppIcon name="chevron-right" :size="14" />
            </button>
          </div>
        </header>

        <ul class="dashboard-page__task-list">
          <li
            v-for="item in dashboardInitiatedList"
            :key="item.code"
            class="dashboard-page__task-item"
          >
            <div>
              <strong>{{ item.title }}</strong>
              <p>{{ item.code }} · {{ item.status }}</p>
            </div>
            <span>{{ item.updatedAt }}</span>
          </li>
        </ul>
      </article>
    </section>

    <section class="dashboard-page__bottom-grid">
      <article class="dashboard-page__panel">
        <header class="dashboard-page__panel-header">
          <div class="dashboard-page__panel-title">
            <AppIcon name="bell" />
            <h3>系统公告</h3>
          </div>
          <span class="dashboard-page__panel-badge">显示最新 20 条</span>
        </header>

        <ul class="dashboard-page__notice-list">
          <li v-for="notice in dashboardNotices" :key="notice.title" class="dashboard-page__notice-item">
            <span
              class="dashboard-page__notice-dot"
              :class="`dashboard-page__notice-dot-${notice.tone}`"
            ></span>
            <div>
              <strong>{{ notice.title }}</strong>
              <p>{{ notice.type }}</p>
            </div>
          </li>
        </ul>
      </article>

      <article class="dashboard-page__panel">
        <header class="dashboard-page__panel-header">
          <div class="dashboard-page__panel-title">
            <AppIcon name="function" />
            <h3>常用功能</h3>
          </div>
        </header>

        <div class="dashboard-page__quick-actions">
          <button class="dashboard-page__quick-action" type="button">销售订单管理</button>
          <button class="dashboard-page__quick-action" type="button">MRP 运算</button>
          <button class="dashboard-page__quick-action" type="button">生产领料</button>
          <button class="dashboard-page__quick-action" type="button">成本核算</button>
        </div>
      </article>

      <article class="dashboard-page__panel">
        <header class="dashboard-page__panel-header">
          <div class="dashboard-page__panel-title">
            <AppIcon name="reports" />
            <h3>服务可用性</h3>
          </div>
        </header>

        <div class="dashboard-page__service-list">
          <div
            v-for="item in services"
            :key="item.label"
            class="dashboard-page__service-item"
          >
            <span>{{ item.label }}</span>
            <strong>{{ item.value }}</strong>
            <p>{{ item.hint }}</p>
          </div>
        </div>
      </article>
            <article class="dashboard-page__panel">
        <header class="dashboard-page__panel-header">
          <div class="dashboard-page__panel-title">
            <AppIcon name="settings" />
            <h3>流程阶段</h3>
          </div>
        </header>

        <div class="dashboard-page__detail-content">
          <section
            v-for="(group, index) in processSnapshots"
            :key="group.key"
            class="dashboard-page__detail-block"
          >
            <h5>{{ index + 1 }}. {{ group.title }}</h5>
            <p>{{ group.stageSummary }}</p>
            <span>{{ group.functionSummary }}</span>
          </section>
        </div>
      </article>
    </section>
  </div>
</template>

<style scoped>
.dashboard-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.dashboard-page__toolbar,
.dashboard-page__toolbar-actions,
.dashboard-page__metric-header,
.dashboard-page__panel-header,
.dashboard-page__panel-title,
.dashboard-page__metric-title,
.dashboard-page__panel-actions,
.dashboard-page__workspace-card,
.dashboard-page__task-item {
  display: flex;
  align-items: center;
}

.dashboard-page__toolbar,
.dashboard-page__panel-header,
.dashboard-page__task-item {
  justify-content: space-between;
}

.dashboard-page h1,
.dashboard-page__metric-title h3,
.dashboard-page__panel-title h3,
.dashboard-page__chart-summary h4,
.dashboard-page__detail-block h5,
.dashboard-page__workspace-copy h4 {
  margin: 0;
  color: #111827;
}

.dashboard-page h1 {
  font-size: 34px;
  line-height: 1.2;
}

.dashboard-page__copy {
  margin: 10px 0 0;
  color: #6b7280;
  font-size: 15px;
}

.dashboard-page__toolbar-actions {
  gap: 12px;
}

.dashboard-page__icon,
.dashboard-page__panel-icon {
  border: none;
  background: #f3f4f6;
  color: #4b5563;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.dashboard-page__icon {
  width: 42px;
  height: 42px;
  border-radius: 50%;
}

.dashboard-page__workbench-button {
  height: 42px;
  padding: 0 18px;
  border-radius: 999px;
  background: linear-gradient(90deg, #2563eb, #3b82f6);
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
}

.dashboard-page__overview-grid {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(320px, 1fr);
  gap: 20px;
}

.dashboard-page__board-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.dashboard-page__metric-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
}

.dashboard-page__panel,
.dashboard-page__metric-card {
  background: #ffffff;
  border: 1px solid #e8edf5;
  border-radius: 20px;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.04);
}

.dashboard-page__panel-span-2 {
  grid-column: span 2;
}

.dashboard-page__metric-card {
  min-height: 188px;
  padding: 20px 20px 16px;
}

.dashboard-page__metric-title,
.dashboard-page__panel-title {
  gap: 10px;
}

.dashboard-page__metric-icon {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #eef2ff;
  color: #4f46e5;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.dashboard-page__metric-body {
  margin-top: 20px;
  min-height: 108px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.dashboard-page__metric-body strong {
  color: #111827;
  font-size: 24px;
}

.dashboard-page__metric-body p,
.dashboard-page__chart-summary p,
.dashboard-page__notice-item p,
.dashboard-page__service-item p,
.dashboard-page__task-item p,
.dashboard-page__workspace-copy p,
.dashboard-page__detail-block p,
.dashboard-page__detail-block span {
  margin: 8px 0 0;
  color: #6b7280;
}

.dashboard-page__metric-line {
  width: 100%;
  height: 48px;
}

.dashboard-page__panel {
  overflow: hidden;
}

.dashboard-page__panel-header {
  min-height: 64px;
  padding: 0 20px;
  border-bottom: 1px solid #f0f2f5;
  gap: 16px;
}

.dashboard-page__shortcut-grid {
  padding: 18px 20px 20px;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 16px 12px;
}

.dashboard-page__shortcut-item {
  min-height: 88px;
  padding: 10px 6px;
  border-radius: 14px;
  background: transparent;
  color: #111827;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

.dashboard-page__shortcut-item:hover {
  background: #f8fbff;
  transform: translateY(-1px);
  box-shadow: inset 0 0 0 1px #e0edff;
}

.dashboard-page__shortcut-icon {
  width: 38px;
  height: 38px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.dashboard-page__shortcut-icon-teal {
  background: #dbf5f0;
  color: #0f766e;
}

.dashboard-page__shortcut-icon-blue {
  background: #dbeafe;
  color: #2563eb;
}

.dashboard-page__shortcut-icon-amber {
  background: #fef3c7;
  color: #d97706;
}

.dashboard-page__shortcut-icon-cyan {
  background: #d9f4ff;
  color: #0284c7;
}

.dashboard-page__shortcut-icon-indigo {
  background: #e0e7ff;
  color: #4f46e5;
}

.dashboard-page__shortcut-icon-sky {
  background: #e0f2fe;
  color: #0369a1;
}

.dashboard-page__shortcut-icon-emerald {
  background: #dcfce7;
  color: #059669;
}

.dashboard-page__shortcut-icon-mint {
  background: #def7ec;
  color: #10b981;
}

.dashboard-page__shortcut-icon-azure {
  background: #dbeafe;
  color: #1d4ed8;
}

.dashboard-page__shortcut-icon-ghost {
  border: 1px dashed #cbd5e1;
  color: #94a3b8;
}

.dashboard-page__shortcut-label {
  font-size: 14px;
  text-align: center;
}

.dashboard-page__workspace-card {
  height: calc(100% - 64px);
  padding: 24px;
  align-items: center;
  gap: 18px;
}

.dashboard-page__workspace-badge {
  width: 92px;
  height: 92px;
  border-radius: 50%;
  background: linear-gradient(180deg, #60a5fa 0%, #3b82f6 100%);
  color: #ffffff;
  font-size: 46px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.dashboard-page__workspace-copy h4 {
  font-size: 16px;
}

.dashboard-page__workspace-copy p {
  font-size: 14px;
}

.dashboard-page__panel-actions {
  gap: 8px;
}

.dashboard-page__panel-icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
}

.dashboard-page__task-list,
.dashboard-page__notice-list {
  list-style: none;
  margin: 0;
}

.dashboard-page__task-list {
  padding: 8px 20px 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.dashboard-page__task-item {
  min-height: 72px;
  padding: 14px 16px;
  border-radius: 16px;
  background: #f8fbff;
  gap: 16px;
}

.dashboard-page__task-item strong {
  color: #111827;
  font-size: 14px;
}

.dashboard-page__task-item span {
  color: #2563eb;
  font-size: 13px;
  font-weight: 600;
  flex-shrink: 0;
}

.dashboard-page__main-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.55fr) minmax(320px, 1fr);
  gap: 20px;
}

.dashboard-page__tabs {
  display: flex;
  gap: 8px;
}

.dashboard-page__tab {
  height: 34px;
  padding: 0 12px;
  border-radius: 999px;
  background: transparent;
  color: #6b7280;
  font-size: 13px;
  font-weight: 600;
}

.dashboard-page__tab-active {
  background: #111827;
  color: #ffffff;
}

.dashboard-page__chart-content {
  padding: 24px 24px 20px;
}

.dashboard-page__chart-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.dashboard-page__badge {
  height: 34px;
  padding: 0 14px;
  border-radius: 999px;
  background: #eef2ff;
  color: #4f46e5;
  font-size: 13px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
}

.dashboard-page__bar-chart {
  height: 360px;
  margin-top: 28px;
  padding: 0 8px;
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 18px;
  align-items: end;
}

.dashboard-page__bar-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.dashboard-page__bar-track {
  width: 100%;
  height: 280px;
  border-radius: 18px 18px 0 0;
  background:
    linear-gradient(180deg, rgba(229, 231, 235, 0.2), rgba(229, 231, 235, 0)),
    repeating-linear-gradient(
      to top,
      transparent 0,
      transparent 56px,
      rgba(226, 232, 240, 0.7) 56px,
      rgba(226, 232, 240, 0.7) 57px
    );
  display: flex;
  align-items: flex-end;
}

.dashboard-page__bar-fill {
  width: 100%;
  border-radius: 18px 18px 0 0;
}

.dashboard-page__bar-value,
.dashboard-page__bar-label {
  color: #6b7280;
  font-size: 13px;
}

.dashboard-page__bar-value {
  color: #111827;
  font-weight: 700;
}

.dashboard-page__detail-content,
.dashboard-page__service-list {
  padding: 20px;
}

.dashboard-page__detail-content {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.dashboard-page__detail-block {
  padding-bottom: 18px;
  border-bottom: 1px solid #f3f4f6;
}

.dashboard-page__detail-block:last-child {
  padding-bottom: 0;
  border-bottom: none;
}

.dashboard-page__detail-block span {
  display: block;
  font-size: 13px;
}

.dashboard-page__bottom-grid {
  display: grid;
  grid-template-columns: 1.25fr 1fr 1fr;
  gap: 20px;
}

.dashboard-page__panel-badge {
  height: 28px;
  padding: 0 10px;
  border: 1px solid #e5e7eb;
  border-radius: 999px;
  color: #6b7280;
  font-size: 12px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
}

.dashboard-page__notice-list {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.dashboard-page__notice-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.dashboard-page__notice-item strong {
  color: #111827;
  font-size: 14px;
}

.dashboard-page__notice-dot {
  width: 10px;
  height: 10px;
  margin-top: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

.dashboard-page__notice-dot-processing {
  background: #3b82f6;
}

.dashboard-page__notice-dot-warning {
  background: #f59e0b;
}

.dashboard-page__notice-dot-success {
  background: #10b981;
}

.dashboard-page__quick-actions {
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.dashboard-page__quick-action {
  min-height: 36px;
  padding: 0 14px;
  border-radius: 999px;
  background: #eef2ff;
  color: #4338ca;
  font-size: 13px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
}

.dashboard-page__service-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.dashboard-page__service-item {
  padding: 16px 18px;
  border-radius: 18px;
  background: #f9fafb;
}

.dashboard-page__service-item span {
  color: #6b7280;
  font-size: 13px;
}

.dashboard-page__service-item strong {
  display: block;
  margin-top: 8px;
  color: #111827;
  font-size: 22px;
}
</style>
