<script setup>
import { computed } from 'vue';
import AppIcon from '../../components/AppIcon.vue';
import { findMenuGroupByKey, findMenuItemByKey } from '../../data/erpMenu';
import {
  getBusinessMock,
  getBusinessStages,
  getBusinessStats
} from '../../data/moduleMocks';

const props = defineProps({
  groupKey: {
    type: String,
    required: true
  },
  menuKey: {
    type: String,
    required: true
  }
});

const selectedMenu = computed(() => findMenuItemByKey(props.menuKey));
const selectedGroup = computed(() => {
  return findMenuGroupByKey(props.groupKey) || findMenuGroupByKey(selectedMenu.value.groupKey);
});
const businessStats = computed(() => getBusinessStats(selectedGroup.value.key));
const businessStages = computed(() => getBusinessStages(selectedGroup.value.key));
const businessMock = computed(() => getBusinessMock(selectedGroup.value.key));

const businessFlowNodes = computed(() => {
  const upstreamNodes = selectedMenu.value.upstream.map((item, index) => ({
    name: item,
    status: 'done',
    owner: ['主数据', '计划部', '销售内勤'][index % 3],
    tag: '已完成'
  }));

  const currentNode = {
    name: selectedMenu.value.title,
    status: 'current',
    owner: selectedGroup.value.title,
    tag: '执行中'
  };

  const downstreamNodes = selectedMenu.value.downstream.map((item, index) => ({
    name: item,
    status: 'pending',
    owner: ['仓储', '财务', '制造'][index % 3],
    tag: '待流转'
  }));

  return [...upstreamNodes, currentNode, ...downstreamNodes].slice(0, 6);
});
</script>

<template>
  <div class="menu-page">
    <div class="menu-page__toolbar">
      <div>
        <p class="menu-page__eyebrow">{{ selectedGroup.title }}</p>
        <h1>{{ selectedMenu.title }}</h1>
        <p class="menu-page__copy">
          这里是业务模块执行视图，页面按模块路由拆分，展示当前节点的 mock 生产流程与任务数据。
        </p>
      </div>

      <div class="menu-page__actions">
        <button class="menu-page__icon" type="button" aria-label="搜索">
          <AppIcon name="search" :size="20" />
        </button>
        <button class="menu-page__icon" type="button" aria-label="刷新">
          <AppIcon name="refresh" :size="20" />
        </button>
      </div>
    </div>

    <section class="menu-page__stat-grid">
      <article v-for="item in businessStats" :key="item.label" class="menu-page__stat-card">
        <span>{{ item.label }}</span>
        <strong>{{ item.value }}</strong>
        <p>{{ item.hint }}</p>
      </article>
    </section>

    <section class="menu-page__main-grid">
      <article class="menu-page__panel menu-page__panel-span-2">
        <header class="menu-page__panel-header">
          <div class="menu-page__panel-title">
            <AppIcon name="flow" />
            <h3>生产流程泳道</h3>
          </div>
          <div class="menu-page__tabs">
            <button class="menu-page__tab menu-page__tab-active" type="button">执行链路</button>
            <button class="menu-page__tab" type="button">异常追踪</button>
          </div>
        </header>

        <div class="menu-page__lane-content">
          <div class="menu-page__lane-steps">
            <div
              v-for="(step, index) in businessFlowNodes"
              :key="`${step.name}-${index}`"
              class="menu-page__lane-step"
              :class="`menu-page__lane-step-${step.status}`"
            >
              <div class="menu-page__lane-node"></div>
              <div class="menu-page__lane-body">
                <strong>{{ step.name }}</strong>
                <p>{{ step.owner }}</p>
                <span>{{ step.tag }}</span>
              </div>
            </div>
          </div>

          <div class="menu-page__stage-strip">
            <span v-for="stage in businessStages" :key="stage" class="menu-page__stage-chip">
              {{ stage }}
            </span>
          </div>
        </div>
      </article>

      <article class="menu-page__panel">
        <header class="menu-page__panel-header">
          <div class="menu-page__panel-title">
            <AppIcon name="settings" />
            <h3>模块说明</h3>
          </div>
        </header>

        <div class="menu-page__detail-content">
          <section class="menu-page__detail-block">
            <h4>{{ selectedMenu.path }}</h4>
            <p>{{ selectedMenu.stage }}</p>
          </section>

          <section class="menu-page__detail-block">
            <h5>上游依赖</h5>
            <ul class="menu-page__detail-list">
              <li v-for="item in selectedMenu.upstream" :key="item">{{ item }}</li>
            </ul>
          </section>

          <section class="menu-page__detail-block">
            <h5>下游流转</h5>
            <ul class="menu-page__detail-list">
              <li v-for="item in selectedMenu.downstream" :key="item">{{ item }}</li>
            </ul>
          </section>
        </div>
      </article>

      <article class="menu-page__panel menu-page__panel-span-2">
        <header class="menu-page__panel-header">
          <div class="menu-page__panel-title">
            <AppIcon name="dashboard" />
            <h3>执行看板</h3>
          </div>
        </header>

        <div class="menu-page__board-grid">
          <section
            v-for="column in businessMock.board"
            :key="column.title"
            class="menu-page__board-column"
          >
            <h4>{{ column.title }}</h4>
            <ul>
              <li v-for="item in column.items" :key="item">{{ item }}</li>
            </ul>
          </section>
        </div>
      </article>

      <article class="menu-page__panel menu-page__panel-span-2">
        <header class="menu-page__panel-header">
          <div class="menu-page__panel-title">
            <AppIcon name="reports" />
            <h3>任务清单</h3>
          </div>
        </header>

        <div class="menu-page__table-wrapper">
          <table class="menu-page__table">
            <thead>
              <tr>
                <th>单号</th>
                <th>类型</th>
                <th>负责人</th>
                <th>状态</th>
                <th>计划时间</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in businessMock.rows" :key="row[0]">
                <td>{{ row[0] }}</td>
                <td>{{ row[1] }}</td>
                <td>{{ row[2] }}</td>
                <td>
                  <span class="menu-page__table-status">{{ row[3] }}</span>
                </td>
                <td>{{ row[4] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>

      <article class="menu-page__panel">
        <header class="menu-page__panel-header">
          <div class="menu-page__panel-title">
            <AppIcon name="function" />
            <h3>建议功能点</h3>
          </div>
        </header>

        <div class="menu-page__function-tags">
          <button
            v-for="item in selectedMenu.functions"
            :key="item"
            class="menu-page__function-tag"
            type="button"
          >
            {{ item }}
          </button>
        </div>
      </article>
    </section>
  </div>
</template>

<style scoped>
.menu-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.menu-page__toolbar {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
}

.menu-page__eyebrow {
  margin: 0;
  color: #9ca3af;
  font-size: 14px;
  font-weight: 700;
}

.menu-page h1 {
  margin: 12px 0 0;
  color: #111827;
  font-size: 32px;
  line-height: 1.2;
}

.menu-page__copy {
  margin: 14px 0 0;
  color: #6b7280;
  font-size: 15px;
}

.menu-page__actions {
  display: flex;
  gap: 12px;
}

.menu-page__icon {
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

.menu-page__stat-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
}

.menu-page__stat-card,
.menu-page__panel {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 24px;
}

.menu-page__stat-card {
  min-height: 148px;
  padding: 22px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.menu-page__stat-card span {
  color: #6b7280;
  font-size: 14px;
}

.menu-page__stat-card strong {
  color: #111827;
  font-size: 32px;
}

.menu-page__stat-card p {
  margin: 0;
  color: #94a3b8;
  font-size: 13px;
}

.menu-page__main-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(300px, 0.7fr);
  gap: 20px;
}

.menu-page__panel-span-2 {
  grid-column: span 2;
}

.menu-page__panel {
  overflow: hidden;
}

.menu-page__panel-header {
  min-height: 66px;
  padding: 0 20px;
  border-bottom: 1px solid #f0f2f5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.menu-page__panel-title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.menu-page__panel-title h3,
.menu-page__detail-block h4,
.menu-page__detail-block h5,
.menu-page__board-column h4 {
  margin: 0;
  color: #111827;
}

.menu-page__tabs {
  display: flex;
  gap: 8px;
}

.menu-page__tab {
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

.menu-page__tab-active {
  background: #111827;
  color: #fff;
}

.menu-page__lane-content {
  padding: 22px;
}

.menu-page__lane-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
}

.menu-page__lane-step {
  min-height: 126px;
  padding: 20px;
  border-radius: 20px;
  border: 1px solid #e5e7eb;
  background: #fff;
}

.menu-page__lane-step-done {
  background: linear-gradient(180deg, #f0fdf4, #ffffff);
}

.menu-page__lane-step-current {
  background: linear-gradient(180deg, #eff6ff, #ffffff);
  border-color: #bfdbfe;
  box-shadow: 0 10px 30px rgba(59, 130, 246, 0.08);
}

.menu-page__lane-step-pending {
  background: linear-gradient(180deg, #fff7ed, #ffffff);
}

.menu-page__lane-node {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #94a3b8;
}

.menu-page__lane-step-done .menu-page__lane-node {
  background: #22c55e;
}

.menu-page__lane-step-current .menu-page__lane-node {
  background: #3b82f6;
}

.menu-page__lane-step-pending .menu-page__lane-node {
  background: #f59e0b;
}

.menu-page__lane-body {
  margin-top: 18px;
}

.menu-page__lane-body strong {
  color: #111827;
  font-size: 16px;
}

.menu-page__lane-body p,
.menu-page__detail-block p {
  margin: 8px 0 0;
  color: #6b7280;
  font-size: 13px;
}

.menu-page__lane-body span {
  display: inline-flex;
  align-items: center;
  height: 28px;
  margin-top: 14px;
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.06);
  color: #334155;
  font-size: 12px;
  font-weight: 700;
}

.menu-page__stage-strip {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.menu-page__stage-chip {
  min-height: 34px;
  padding: 0 14px;
  border-radius: 999px;
  background: #f8fafc;
  color: #475569;
  font-size: 13px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
}

.menu-page__detail-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.menu-page__detail-block {
  padding-bottom: 18px;
  border-bottom: 1px solid #f3f4f6;
}

.menu-page__detail-block:last-child {
  padding-bottom: 0;
  border-bottom: none;
}

.menu-page__detail-list {
  list-style: none;
  margin: 14px 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.menu-page__detail-list li {
  color: #374151;
  font-size: 14px;
}

.menu-page__board-grid {
  padding: 22px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.menu-page__board-column {
  min-height: 220px;
  padding: 18px;
  border-radius: 20px;
  background: #f8fafc;
  border: 1px solid #edf2f7;
}

.menu-page__board-column ul {
  list-style: none;
  margin: 16px 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.menu-page__board-column li {
  padding: 12px 14px;
  border-radius: 14px;
  background: #fff;
  color: #374151;
  font-size: 14px;
}

.menu-page__table-wrapper {
  padding: 12px 20px 20px;
}

.menu-page__table {
  width: 100%;
  border-collapse: collapse;
}

.menu-page__table th,
.menu-page__table td {
  padding: 16px 12px;
  border-bottom: 1px solid #f1f5f9;
  text-align: left;
  white-space: nowrap;
}

.menu-page__table th {
  color: #94a3b8;
  font-size: 13px;
  font-weight: 700;
}

.menu-page__table td {
  color: #334155;
  font-size: 14px;
}

.menu-page__table-status {
  display: inline-flex;
  align-items: center;
  height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  background: #eef2ff;
  color: #4338ca;
  font-size: 12px;
  font-weight: 700;
}

.menu-page__function-tags {
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.menu-page__function-tag {
  min-height: 36px;
  padding: 0 14px;
  border: none;
  border-radius: 999px;
  background: #f3f4f6;
  color: #374151;
  font-size: 13px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}
</style>
