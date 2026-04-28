<script setup>
import { computed, ref } from 'vue';
import AppIcon from '../../components/AppIcon.vue';
import { dashboardShortcuts, dashboardWorkspace } from '../../data/dashboard';
import { erpMenuTree, getGroupMenuCount, getMenuStats } from '../../data/erpMenu';
import { getStoredUser } from '../../utils/auth';

const stats = getMenuStats();
const chartTabs = [
  { key: 'coverage', label: '菜单覆盖' },
  { key: 'load', label: '生产负荷' },
  { key: 'cost', label: '成本趋势' }
];

const moduleColors = ['#5b8ff9', '#22c55e', '#f59e0b', '#8b5cf6', '#14b8a6', '#ef4444', '#0f766e'];
const activeChartTab = ref('coverage');
const dashboardState = ref(createDashboardState());
const chartState = ref(createChartState(activeChartTab.value));
const currentUser = computed(() => getStoredUser());
const currentUserDisplayName = computed(() => {
  return currentUser.value?.name || currentUser.value?.username || '';
});
const greetingTitle = computed(() => {
  return currentUserDisplayName.value
    ? `${greeting.value}，${currentUserDisplayName.value}！`
    : `${greeting.value}！`;
});

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

const currentChart = computed(() => chartState.value);

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min, max, digits = 1) {
  return Number((Math.random() * (max - min) + min).toFixed(digits));
}

function randomPick(list) {
  return list[randomInt(0, list.length - 1)];
}

function getClockTime() {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');

  return `${hh}:${mm}:${ss}`;
}

function formatPercent(value) {
  return `${value}%`;
}

function buildPolyline(values, maxValue, width = 600, height = 220) {
  return values
    .map((value, index) => {
      const x = (width / Math.max(values.length - 1, 1)) * index;
      const y = height - (value / maxValue) * (height - 18) - 12;

      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
}

function buildAreaPath(values, maxValue, width = 600, height = 220) {
  const points = values.map((value, index) => {
    const x = (width / Math.max(values.length - 1, 1)) * index;
    const y = height - (value / maxValue) * (height - 18) - 12;

    return { x, y };
  });

  const linePath = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`)
    .join(' ');

  return `${linePath} L ${width} ${height} L 0 ${height} Z`;
}

function createDashboardCards() {
  const orderGrowth = randomFloat(4.2, 16.8);
  const mrpBacklog = randomInt(2, 11);
  const productionIssue = randomInt(1, 6);
  const settleAmount = randomInt(180, 460);

  return [
    {
      key: 'orders',
      icon: 'dashboard',
      title: '今日订单',
      value: String(randomInt(136, 286)),
      description: `较上一轮 +${orderGrowth}%`,
      lineColor: '#3b82f6',
      points: buildPolyline(
        Array.from({ length: 7 }, () => randomInt(48, 96)),
        100,
        108,
        48
      )
    },
    {
      key: 'mrp',
      icon: 'planning',
      title: 'MRP 运算',
      value: `${randomInt(18, 46)} 批`,
      description: `待释放 ${mrpBacklog} 批`,
      lineColor: '#22c55e',
      points: buildPolyline(
        Array.from({ length: 7 }, () => randomInt(38, 90)),
        100,
        108,
        48
      )
    },
    {
      key: 'production',
      icon: 'production',
      title: '在制工单',
      value: String(randomInt(48, 88)),
      description: `异常 ${productionIssue} 单`,
      lineColor: '#f59e0b',
      points: buildPolyline(
        Array.from({ length: 7 }, () => randomInt(42, 92)),
        100,
        108,
        48
      )
    },
    {
      key: 'finance',
      icon: 'finance',
      title: '待结算金额',
      value: `¥ ${settleAmount},000`,
      description: `回款达成 ${randomInt(78, 97)}%`,
      lineColor: '#6366f1',
      points: buildPolyline(
        Array.from({ length: 7 }, () => randomInt(36, 88)),
        100,
        108,
        48
      )
    }
  ];
}

function createTodoList() {
  const titles = [
    '财务底稿待复核',
    '固定资产折旧差异校验',
    '总账期末结转确认',
    '成本分摊规则复核',
    '销售出库单据抽查'
  ];
  const owners = ['王颖', '赵坤', '陈思', '刘倩', '高源'];

  return Array.from({ length: 3 }, (_, index) => ({
    title: titles[(index + randomInt(0, titles.length - 1)) % titles.length],
    code: `DB-${randomInt(1000, 9999)}`,
    owner: randomPick(owners),
    deadline: `${randomInt(4, 30)}-${String(randomInt(1, 28)).padStart(2, '0')} ${String(randomInt(9, 18)).padStart(2, '0')}:${String(randomInt(0, 59)).padStart(2, '0')}`
  }));
}

function createInitiatedList() {
  const titles = [
    '科目余额分析任务',
    '银行余额调节表复核',
    '应收账龄专项检查',
    '预算执行偏差说明',
    '成本归集抽样核验'
  ];
  const statuses = ['执行中', '待审批', '已提交', '已退回'];

  return Array.from({ length: 3 }, (_, index) => ({
    title: titles[(index + randomInt(0, titles.length - 1)) % titles.length],
    code: `FA-${randomInt(1000, 9999)}`,
    status: randomPick(statuses),
    updatedAt: `${randomInt(1, 23)} 小时前`
  }));
}

function createNotices() {
  const pool = [
    {
      title: '采购需求与生产需求联动校验待确认',
      type: '进行中',
      tone: 'processing'
    },
    {
      title: '销售订单排程存在交期冲突，请优先处理',
      type: '预警',
      tone: 'warning'
    },
    {
      title: '成品入仓与销售出库的成本过账已恢复正常',
      type: '成功',
      tone: 'success'
    },
    {
      title: '固定资产卡片新增后需同步折旧策略',
      type: '提醒',
      tone: 'processing'
    }
  ];

  return pool
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
}

function createServices() {
  return [
    {
      label: '模块覆盖率',
      value: `${stats.moduleCount}/${stats.moduleCount}`,
      hint: `活跃度 ${formatPercent(randomInt(84, 99))}`
    },
    {
      label: '流程节点数',
      value: `${stats.menuCount + randomInt(0, 5)}`,
      hint: `当天新增 ${randomInt(0, 4)} 个`
    },
    {
      label: '流程阶段',
      value: `${stats.processCount}`,
      hint: `平均闭环 ${randomInt(2, 6)} 天`
    }
  ];
}

function createProcessSnapshots() {
  return erpMenuTree.map((group) => ({
    key: group.key,
    title: group.title,
    stageSummary: group.children.map((stage) => stage.title).slice(0, 2).join(' / '),
    nodeCount: getGroupMenuCount(group.key),
    health: formatPercent(randomInt(82, 98))
  }));
}

function createQuickActions() {
  const pool = [
    '销售订单管理',
    'MRP 运算',
    '生产领料',
    '成本核算',
    '总账查询',
    '资产卡片',
    '账龄分析',
    '辅助余额表'
  ];

  return pool.sort(() => Math.random() - 0.5).slice(0, 4);
}

function createDashboardState() {
  return {
    updatedAt: getClockTime(),
    cards: createDashboardCards(),
    todoList: createTodoList(),
    initiatedList: createInitiatedList(),
    notices: createNotices(),
    services: createServices(),
    processSnapshots: createProcessSnapshots(),
    quickActions: createQuickActions()
  };
}

function createCoverageChart() {
  const bars = erpMenuTree.map((group, index) => {
    const baseValue = getGroupMenuCount(group.key);
    const value = baseValue + randomInt(0, 6);
    const rate = randomInt(76, 99);

    return {
      key: group.key,
      title: group.title,
      value,
      rate,
      color: moduleColors[index % moduleColors.length]
    };
  });

  return {
    key: 'coverage',
    title: '整体流程覆盖',
    description: `当前模拟拆分 ${bars.reduce((sum, item) => sum + item.value, 0)} 个业务节点，覆盖 ${stats.moduleCount} 个一级模块。`,
    badge: `刷新于 ${getClockTime()}`,
    bars
  };
}

function createLoadChart() {
  const labels = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];
  const planned = labels.map(() => randomInt(62, 84));
  const actual = planned.map((value) => Math.min(100, value + randomInt(-12, 16)));
  const maxValue = Math.max(...planned, ...actual, 100);
  const machineNames = ['冲压一线', '焊装二线', '装配三线', '喷涂单元'];

  return {
    key: 'load',
    title: '生产负荷趋势',
    description: `当前负荷峰值 ${Math.max(...actual)}%，平均开工率 ${Math.round(actual.reduce((sum, item) => sum + item, 0) / actual.length)}%。`,
    badge: `波动 ${randomInt(4, 16)}%`,
    labels,
    planned,
    actual,
    maxValue,
    plannedLine: buildPolyline(planned, maxValue),
    actualLine: buildPolyline(actual, maxValue),
    actualArea: buildAreaPath(actual, maxValue),
    machines: machineNames.map((name) => ({
      name,
      load: randomInt(64, 98),
      status: randomPick(['平稳', '偏高', '待调整'])
    }))
  };
}

function createCostChart() {
  const labels = ['1月', '2月', '3月', '4月', '5月', '6月'];
  const material = labels.map(() => randomInt(88, 156));
  const labor = material.map((value) => Math.max(36, value - randomInt(18, 54)));
  const maxValue = Math.max(...material, ...labor, 180);
  const materialTotal = material.reduce((sum, item) => sum + item, 0);
  const laborTotal = labor.reduce((sum, item) => sum + item, 0);

  return {
    key: 'cost',
    title: '成本趋势对比',
    description: `材料成本 ${materialTotal} 万，人工制费 ${laborTotal} 万，本期成本波动 ${randomInt(3, 11)}%。`,
    badge: `毛利率 ${formatPercent(randomInt(19, 34))}`,
    labels,
    material,
    labor,
    maxValue,
    materialLine: buildPolyline(material, maxValue),
    laborLine: buildPolyline(labor, maxValue),
    materialArea: buildAreaPath(material, maxValue),
    highlights: [
      { label: '材料成本', value: `${materialTotal} 万` },
      { label: '人工制费', value: `${laborTotal} 万` },
      { label: '成本偏差', value: `${randomInt(2, 9)}.0%` }
    ]
  };
}

function createChartState(tabKey) {
  if (tabKey === 'load') {
    return createLoadChart();
  }

  if (tabKey === 'cost') {
    return createCostChart();
  }

  return createCoverageChart();
}

function refreshDashboard() {
  dashboardState.value = createDashboardState();
  chartState.value = createChartState(activeChartTab.value);
}

function refreshChart(tabKey) {
  activeChartTab.value = tabKey;
  chartState.value = createChartState(tabKey);
}
</script>

<template>
  <div class="dashboard-page">
    <div class="dashboard-page__toolbar">
      <div>
        <h1>{{ greetingTitle }}</h1>
        <p class="dashboard-page__copy">
          当前看板数据均为动态随机生成的 mock 数据，本轮快照时间 {{ dashboardState.updatedAt }}。
        </p>
      </div>

      <div class="dashboard-page__toolbar-actions">
        <button class="dashboard-page__workbench-button" type="button" @click="refreshDashboard">
          <AppIcon name="refresh" :size="16" />
          <span>刷新工作台</span>
        </button>
      </div>
    </div>

    <section class="dashboard-page__metric-grid">
      <article
        v-for="card in dashboardState.cards"
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
            <button
              v-for="tab in chartTabs"
              :key="tab.key"
              class="dashboard-page__tab"
              :class="{ 'dashboard-page__tab-active': activeChartTab === tab.key }"
              type="button"
              @click="refreshChart(tab.key)"
            >
              {{ tab.label }}
            </button>
          </div>
        </header>

        <div class="dashboard-page__chart-content">
          <div class="dashboard-page__chart-summary">
            <div>
              <h4>{{ currentChart.title }}</h4>
              <p>{{ currentChart.description }}</p>
            </div>
            <div class="dashboard-page__badge">{{ currentChart.badge }}</div>
          </div>

          <div v-if="currentChart.key === 'coverage'" class="dashboard-page__bar-chart">
            <div
              v-for="bar in currentChart.bars"
              :key="bar.key"
              class="dashboard-page__bar-column"
            >
              <div class="dashboard-page__bar-track">
                <div
                  class="dashboard-page__bar-fill"
                  :style="{
                    height: `${bar.value * 12 + 36}px`,
                    background: bar.color
                  }"
                ></div>
              </div>
              <span class="dashboard-page__bar-value">{{ bar.value }}</span>
              <span class="dashboard-page__bar-label">{{ bar.title }}</span>
              <span class="dashboard-page__bar-meta">覆盖 {{ bar.rate }}%</span>
            </div>
          </div>

          <div v-else-if="currentChart.key === 'load'" class="dashboard-page__trend-panel">
            <svg class="dashboard-page__trend-chart" viewBox="0 0 600 240">
              <path class="dashboard-page__trend-area" :d="currentChart.actualArea"></path>
              <polyline
                class="dashboard-page__trend-line dashboard-page__trend-line-muted"
                :points="currentChart.plannedLine"
              />
              <polyline
                class="dashboard-page__trend-line"
                :points="currentChart.actualLine"
              />
            </svg>

            <div class="dashboard-page__trend-axis">
              <span v-for="label in currentChart.labels" :key="label">{{ label }}</span>
            </div>

            <div class="dashboard-page__trend-cards">
              <div
                v-for="item in currentChart.machines"
                :key="item.name"
                class="dashboard-page__trend-card"
              >
                <span>{{ item.name }}</span>
                <strong>{{ item.load }}%</strong>
                <p>{{ item.status }}</p>
              </div>
            </div>
          </div>

          <div v-else class="dashboard-page__trend-panel">
            <svg class="dashboard-page__trend-chart" viewBox="0 0 600 240">
              <path class="dashboard-page__cost-area" :d="currentChart.materialArea"></path>
              <polyline
                class="dashboard-page__trend-line"
                :points="currentChart.materialLine"
              />
              <polyline
                class="dashboard-page__trend-line dashboard-page__trend-line-gold"
                :points="currentChart.laborLine"
              />
            </svg>

            <div class="dashboard-page__trend-axis">
              <span v-for="label in currentChart.labels" :key="label">{{ label }}</span>
            </div>

            <div class="dashboard-page__trend-cards">
              <div
                v-for="item in currentChart.highlights"
                :key="item.label"
                class="dashboard-page__trend-card"
              >
                <span>{{ item.label }}</span>
                <strong>{{ item.value }}</strong>
                <p>本轮模拟结果</p>
              </div>
            </div>
          </div>
        </div>
      </article>

      <article class="dashboard-page__panel dashboard-page__panel-span-2">
        <header class="dashboard-page__panel-header">
          <div class="dashboard-page__panel-title">
            <AppIcon name="settings" />
            <h3>流程阶段</h3>
          </div>
        </header>

        <div class="dashboard-page__flow-card">
          <div class="dashboard-page__flow-start">开始</div>

          <div class="dashboard-page__flow-grid">
            <section
              v-for="(group, index) in dashboardState.processSnapshots"
              :key="group.key"
              class="dashboard-page__flow-node"
            >
              <div class="dashboard-page__flow-node-top">
                <span class="dashboard-page__flow-index">{{ index + 1 }}</span>
                <span class="dashboard-page__flow-health">{{ group.health }}</span>
              </div>
              <h5>{{ group.title }}</h5>
              <p>{{ group.stageSummary }}</p>
              <span>{{ group.nodeCount }} 个节点</span>
            </section>
          </div>

          <div class="dashboard-page__flow-end">结束</div>
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
    </section>

    <section class="dashboard-page__board-grid">
      <article class="dashboard-page__panel">
        <header class="dashboard-page__panel-header">
          <div class="dashboard-page__panel-title">
            <AppIcon name="bell" />
            <h3>我的待办</h3>
          </div>

          <div class="dashboard-page__panel-actions">
            <button class="dashboard-page__panel-icon" type="button" aria-label="刷新待办" @click="refreshDashboard">
              <AppIcon name="refresh" :size="14" />
            </button>
            <button class="dashboard-page__panel-icon" type="button" aria-label="更多待办" @click="refreshDashboard">
              <AppIcon name="chevron-right" :size="14" />
            </button>
          </div>
        </header>

        <ul class="dashboard-page__task-list">
          <li
            v-for="item in dashboardState.todoList"
            :key="item.code"
            class="dashboard-page__task-item"
          >
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
            <button class="dashboard-page__panel-icon" type="button" aria-label="刷新发起" @click="refreshDashboard">
              <AppIcon name="refresh" :size="14" />
            </button>
            <button class="dashboard-page__panel-icon" type="button" aria-label="更多发起" @click="refreshDashboard">
              <AppIcon name="chevron-right" :size="14" />
            </button>
          </div>
        </header>

        <ul class="dashboard-page__task-list">
          <li
            v-for="item in dashboardState.initiatedList"
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
          <span class="dashboard-page__panel-badge">随机生成</span>
        </header>

        <ul class="dashboard-page__notice-list">
          <li
            v-for="notice in dashboardState.notices"
            :key="notice.title"
            class="dashboard-page__notice-item"
          >
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
          <button
            v-for="item in dashboardState.quickActions"
            :key="item"
            class="dashboard-page__quick-action"
            type="button"
            @click="refreshDashboard"
          >
            {{ item }}
          </button>
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
            v-for="item in dashboardState.services"
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
.dashboard-page__task-item,
.dashboard-page__trend-axis,
.dashboard-page__trend-cards {
  display: flex;
  align-items: center;
}

.dashboard-page__toolbar,
.dashboard-page__panel-header,
.dashboard-page__task-item,
.dashboard-page__chart-summary {
  justify-content: space-between;
}

.dashboard-page h1,
.dashboard-page__metric-title h3,
.dashboard-page__panel-title h3,
.dashboard-page__chart-summary h4,
.dashboard-page__detail-block h5,
.dashboard-page__flow-node h5,
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

.dashboard-page__metric-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
}

.dashboard-page__main-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.55fr) minmax(320px, 1fr);
  gap: 20px;
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

.dashboard-page__bottom-grid {
  display: grid;
  grid-template-columns: 1.25fr 1fr 1fr;
  gap: 20px;
}

.dashboard-page__panel,
.dashboard-page__metric-card {
  background: #ffffff;
  border: 1px solid #e8edf5;
  border-radius: 20px;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.04);
}

.dashboard-page__panel {
  overflow: hidden;
}

.dashboard-page__panel-span-2 {
  grid-column: span 2;
}

.dashboard-page__metric-card {
  min-height: 188px;
  padding: 20px 20px 16px;
}

.dashboard-page__panel-header {
  min-height: 64px;
  padding: 0 20px;
  border-bottom: 1px solid #f0f2f5;
  gap: 16px;
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
.dashboard-page__detail-block span,
.dashboard-page__flow-node p,
.dashboard-page__flow-node span,
.dashboard-page__trend-card p {
  margin: 8px 0 0;
  color: #6b7280;
}

.dashboard-page__metric-line {
  width: 100%;
  height: 48px;
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
  transition: background 0.2s ease, color 0.2s ease;
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
  flex-shrink: 0;
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
.dashboard-page__bar-label,
.dashboard-page__bar-meta {
  font-size: 13px;
}

.dashboard-page__bar-value {
  color: #111827;
  font-weight: 700;
}

.dashboard-page__bar-label,
.dashboard-page__bar-meta {
  color: #6b7280;
}

.dashboard-page__bar-meta {
  font-size: 12px;
}

.dashboard-page__trend-panel {
  margin-top: 24px;
}

.dashboard-page__trend-chart {
  width: 100%;
  height: 260px;
}

.dashboard-page__trend-area {
  fill: rgba(59, 130, 246, 0.14);
}

.dashboard-page__cost-area {
  fill: rgba(16, 185, 129, 0.14);
}

.dashboard-page__trend-line {
  fill: none;
  stroke: #2563eb;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.dashboard-page__trend-line-muted {
  stroke: #94a3b8;
  stroke-dasharray: 6 6;
}

.dashboard-page__trend-line-gold {
  stroke: #f59e0b;
}

.dashboard-page__trend-axis {
  margin-top: 8px;
  justify-content: space-between;
  color: #94a3b8;
  font-size: 12px;
}

.dashboard-page__trend-cards {
  margin-top: 18px;
  gap: 12px;
}

.dashboard-page__trend-card {
  flex: 1;
  padding: 16px 18px;
  border-radius: 18px;
  background: #f8fbff;
}

.dashboard-page__trend-card span {
  color: #6b7280;
  font-size: 13px;
}

.dashboard-page__trend-card strong {
  display: block;
  margin-top: 8px;
  color: #111827;
  font-size: 24px;
}

.dashboard-page__detail-content,
.dashboard-page__service-list {
  padding: 20px;
}

.dashboard-page__flow-card {
  padding: 18px 18px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.dashboard-page__flow-start,
.dashboard-page__flow-end {
  align-self: flex-start;
  min-height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  background: #eff6ff;
  color: #2563eb;
  font-size: 12px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
}

.dashboard-page__flow-end {
  background: #f8fafc;
  color: #475569;
}

.dashboard-page__flow-grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px 12px;
}

.dashboard-page__flow-node {
  position: relative;
  min-height: 84px;
  padding: 12px 12px 10px;
  border-radius: 16px;
  background: linear-gradient(180deg, #fbfdff 0%, #f8fbff 100%);
  border: 1px solid #e8eef8;
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.04);
}

.dashboard-page__flow-node::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 10px;
  height: 10px;
  border-top: 1px solid #cbd5e1;
  border-right: 1px solid #cbd5e1;
  right: -7px;
  transform: translateY(-50%) rotate(45deg);
}

.dashboard-page__flow-node:nth-child(4n)::after,
.dashboard-page__flow-node:last-child::after {
  display: none;
}

.dashboard-page__flow-node-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.dashboard-page__flow-index {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #dbeafe;
  color: #2563eb;
  font-size: 12px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.dashboard-page__flow-health {
  min-height: 22px;
  padding: 0 8px;
  border-radius: 999px;
  background: #f0fdf4;
  color: #15803d;
  font-size: 11px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
}

.dashboard-page__flow-node h5 {
  margin-top: 8px;
  font-size: 14px;
}

.dashboard-page__flow-node p,
.dashboard-page__flow-node span {
  font-size: 12px;
  line-height: 1.4;
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
