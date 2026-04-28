<script setup>
import { computed } from 'vue';
import AppIcon from '../../components/AppIcon.vue';
import { dashboardCards, dashboardNotices, getDashboardServices } from '../../data/dashboard';
import { erpMenuTree, getMenuStats } from '../../data/erpMenu';

const stats = getMenuStats();
const services = getDashboardServices(stats);

const processBars = computed(() => {
  return erpMenuTree.map((group, index) => ({
    key: group.key,
    title: group.title,
    value: group.children.length,
    color: ['#5b8ff9', '#22c55e', '#f59e0b', '#8b5cf6', '#14b8a6', '#ef4444', '#0f766e'][index]
  }));
});
</script>

<template>
  <div class="dashboard-page">
    <div class="dashboard-page__toolbar">
      <div>
        <p class="dashboard-page__eyebrow">数据看板</p>
        <h1>ERP 整体运行概况</h1>
        <p class="dashboard-page__copy">
          这里展示 ERP 全链路运行情况，聚焦销售、计划、采购、生产和财务的总体状态。
        </p>
      </div>

      <div class="dashboard-page__actions">
        <button class="dashboard-page__icon" type="button" aria-label="搜索">
          <AppIcon name="search" :size="20" />
        </button>
        <button class="dashboard-page__icon" type="button" aria-label="刷新">
          <AppIcon name="refresh" :size="20" />
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

      <article class="dashboard-page__panel">
        <header class="dashboard-page__panel-header">
          <div class="dashboard-page__panel-title">
            <AppIcon name="settings" />
            <h3>流程阶段</h3>
          </div>
        </header>

        <div class="dashboard-page__detail-content">
          <section
            v-for="(group, index) in erpMenuTree"
            :key="group.key"
            class="dashboard-page__detail-block"
          >
            <h5>{{ index + 1 }}. {{ group.title }}</h5>
            <p>{{ group.children.map((item) => item.title).slice(0, 3).join(' / ') }}</p>
          </section>
        </div>
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
    </section>
  </div>
</template>

<style scoped>
.dashboard-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.dashboard-page__toolbar {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
}

.dashboard-page__eyebrow {
  margin: 0;
  color: #9ca3af;
  font-size: 14px;
  font-weight: 700;
}

.dashboard-page h1 {
  margin: 12px 0 0;
  color: #111827;
  font-size: 32px;
  line-height: 1.2;
}

.dashboard-page__copy {
  margin: 14px 0 0;
  color: #6b7280;
  font-size: 15px;
}

.dashboard-page__actions {
  display: flex;
  gap: 12px;
}

.dashboard-page__icon {
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  background: #f3f4f6;
  color: #4b5563;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.dashboard-page__metric-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
}

.dashboard-page__metric-card,
.dashboard-page__panel {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 24px;
}

.dashboard-page__metric-card {
  min-height: 188px;
  padding: 20px 20px 16px;
}

.dashboard-page__metric-header,
.dashboard-page__panel-header,
.dashboard-page__panel-title,
.dashboard-page__metric-title {
  display: flex;
  align-items: center;
}

.dashboard-page__metric-header,
.dashboard-page__panel-header {
  justify-content: space-between;
  gap: 16px;
}

.dashboard-page__metric-title,
.dashboard-page__panel-title {
  gap: 10px;
}

.dashboard-page__metric-title h3,
.dashboard-page__panel-title h3,
.dashboard-page__chart-summary h4,
.dashboard-page__detail-block h5 {
  margin: 0;
  color: #111827;
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
.dashboard-page__detail-block p,
.dashboard-page__notice-item p,
.dashboard-page__service-item p {
  margin: 8px 0 0;
  color: #6b7280;
}

.dashboard-page__metric-line {
  width: 100%;
  height: 48px;
}

.dashboard-page__main-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.55fr) minmax(320px, 1fr);
  gap: 20px;
}

.dashboard-page__panel-span-2 {
  grid-column: span 2;
}

.dashboard-page__panel {
  overflow: hidden;
}

.dashboard-page__panel-header {
  min-height: 66px;
  padding: 0 20px;
  border-bottom: 1px solid #f0f2f5;
}

.dashboard-page__tabs {
  display: flex;
  gap: 8px;
}

.dashboard-page__tab {
  height: 34px;
  padding: 0 12px;
  border: none;
  border-radius: 999px;
  background: transparent;
  color: #6b7280;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.dashboard-page__tab-active {
  background: #111827;
  color: #fff;
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
  list-style: none;
  margin: 0;
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
  border: none;
  border-radius: 999px;
  background: #eef2ff;
  color: #4338ca;
  font-size: 13px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
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
