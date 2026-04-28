<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import AppIcon from '../components/AppIcon.vue';
import { getStoredUser, logout } from '../utils/auth';
import {
  erpMenuTree,
  findMenuItemByKey,
  getDefaultMenuItem,
  getMenuStats
} from '../data/erpMenu';

const router = useRouter();
const user = computed(() => getStoredUser());
const activeView = ref('dashboard');
const selectedMenuKey = ref(getDefaultMenuItem().key);
const stats = getMenuStats();

const groupIconMap = {
  base: 'base',
  sales: 'sales',
  planning: 'planning',
  purchase: 'purchase',
  outsource: 'outsource',
  production: 'production',
  finance: 'finance'
};

const selectedMenu = computed(() => findMenuItemByKey(selectedMenuKey.value));
const selectedGroup = computed(() => {
  return (
    erpMenuTree.find((group) =>
      group.children.some((item) => item.key === selectedMenuKey.value)
    ) || erpMenuTree[0]
  );
});

const dashboardCards = [
  {
    key: 'orders',
    icon: 'dashboard',
    title: '今日订单',
    value: '184',
    description: '较昨日 +12.4%',
    lineColor: '#3b82f6',
    points: '6,42 22,40 38,34 54,29 70,25 86,18 102,14'
  },
  {
    key: 'mrp',
    icon: 'planning',
    title: 'MRP 运算',
    value: '32 批',
    description: '待释放 6 批',
    lineColor: '#22c55e',
    points: '6,40 22,37 38,36 54,30 70,28 86,20 102,18'
  },
  {
    key: 'production',
    icon: 'production',
    title: '在制工单',
    value: '67',
    description: '异常 4 单',
    lineColor: '#f59e0b',
    points: '6,38 22,36 38,24 54,30 70,18 86,14 102,24'
  },
  {
    key: 'finance',
    icon: 'finance',
    title: '待结算金额',
    value: '¥ 286,000',
    description: '应收与应付合计',
    lineColor: '#6366f1',
    points: '6,41 22,39 38,35 54,25 70,29 86,12 102,21'
  }
];

const dashboardNotices = [
  {
    title: '本周需完成采购需求与生产需求联动校验',
    type: '进行中',
    tone: 'processing'
  },
  {
    title: '销售订单排程存在 2 个交期冲突，请优先处理',
    type: '预警',
    tone: 'warning'
  },
  {
    title: '成品入仓与销售出库的成本过账已恢复正常',
    type: '成功',
    tone: 'success'
  }
];

const dashboardServices = [
  {
    label: '模块覆盖率',
    value: `${stats.moduleCount}/7`,
    hint: '一级模块已齐备'
  },
  {
    label: '流程节点数',
    value: `${stats.menuCount}`,
    hint: '已收敛为菜单配置'
  },
  {
    label: '流程阶段',
    value: '5',
    hint: '基础资料到财务结算'
  }
];

const dashboardProcessBars = computed(() => {
  return erpMenuTree.map((group, index) => ({
    key: group.key,
    title: group.title,
    value: group.children.length,
    color: ['#5b8ff9', '#22c55e', '#f59e0b', '#8b5cf6', '#14b8a6', '#ef4444', '#0f766e'][index]
  }));
});

const businessStatsMap = {
  base: [
    { label: '基础档案', value: '1,286', hint: '已启用物料' },
    { label: 'BOM 版本', value: '218', hint: '待确认 5 个' },
    { label: '库存预警', value: '14', hint: '安全库存不足' },
    { label: '主数据变更', value: '7', hint: '待审批' }
  ],
  sales: [
    { label: '待审报价', value: '12', hint: '高优先 3 单' },
    { label: '销售订单', value: '48', hint: '今日新建' },
    { label: '待发通知', value: '16', hint: '需锁库' },
    { label: '准交率', value: '96.4%', hint: '本周均值' }
  ],
  planning: [
    { label: '待运算批次', value: '9', hint: 'MRP 计划池' },
    { label: '采购建议', value: '21', hint: '待下发' },
    { label: '委外建议', value: '8', hint: '待确认产能' },
    { label: '生产建议', value: '15', hint: '待释放工单' }
  ],
  purchase: [
    { label: '待下单', value: '18', hint: '采购需求转单' },
    { label: '在途到货', value: '26', hint: '本周预计到厂' },
    { label: '待检来料', value: '11', hint: 'IQC 排队' },
    { label: '入库及时率', value: '93.8%', hint: '近 7 天' }
  ],
  outsource: [
    { label: '委外工单', value: '13', hint: '执行中' },
    { label: '发外在途', value: '9', hint: '待回传耗用' },
    { label: '补料申请', value: '4', hint: '待审批' },
    { label: '加工商准交', value: '91.2%', hint: '月度均值' }
  ],
  production: [
    { label: '生产工单', value: '37', hint: '今日在制' },
    { label: '待领料', value: '10', hint: '生产领料池' },
    { label: '异常工单', value: '5', hint: '需退补处理' },
    { label: '完工达成', value: '94.6%', hint: '当班统计' }
  ],
  finance: [
    { label: '应收待核销', value: '¥128万', hint: '本月累计' },
    { label: '应付待付款', value: '¥93万', hint: '本周计划' },
    { label: '成本差异', value: '6 笔', hint: '待分摊' },
    { label: '总账待过账', value: '14', hint: '跨模块凭证' }
  ]
};

const businessStagesMap = {
  base: ['档案建模', 'BOM 维护', '预警校验', '主数据发布'],
  sales: ['报价核准', '订单确认', '锁库排程', '发货通知'],
  planning: ['需求归集', 'MRP 运算', '计划平衡', '任务下发'],
  purchase: ['请购转单', '供应商确认', '到货送检', '采购入库'],
  outsource: ['委外下单', '发外领料', '加工跟踪', '退补结算'],
  production: ['工单释放', '生产领料', '报废退补', '成品入仓'],
  finance: ['单据汇总', '应收应付', '成本核算', '总账报表']
};

const businessMockByGroup = {
  base: {
    board: [
      { title: '待建档', items: ['M-1024 伺服壳体', 'M-1025 接插件', 'M-1026 电源板'] },
      { title: '待审批', items: ['BOM V2.3 替代料', '仓库预警阈值调整', '物料状态启停'] },
      { title: '已发布', items: ['产品族 A 主数据', '标准工艺路线', '物料分类层级'] }
    ],
    rows: [
      ['MAT240428', '物料编码新增', '工程部', '待审核', '2026-04-28 10:20'],
      ['BOM240426', 'BOM 版本升版', '工艺部', '处理中', '2026-04-28 11:00'],
      ['ALT240425', '替代料关系发布', '计划部', '已完成', '2026-04-28 14:30']
    ]
  },
  sales: {
    board: [
      { title: '待报价', items: ['SOQ-240428-01 华东大客户', 'SOQ-240428-02 医疗项目'] },
      { title: '待确认', items: ['SO-240427-08 交期锁定', 'SO-240428-03 价格复核'] },
      { title: '待发货', items: ['DN-240428-05 华南仓', 'DN-240428-06 海外补货'] }
    ],
    rows: [
      ['SO24042801', '销售订单', '李静', '待排产', '2026-04-30'],
      ['SO24042806', '发货通知', '周航', '备货中', '2026-04-29'],
      ['SQ24042711', '销售报价', '陈晓', '待审批', '2026-04-28']
    ]
  },
  planning: {
    board: [
      { title: '待运算', items: ['MRP-B01 一车间', 'MRP-B02 海外订单', 'MRP-B03 安全库存补足'] },
      { title: '待平衡', items: ['采购需求缺口', '产能冲突', '委外负荷不足'] },
      { title: '待释放', items: ['采购建议 21 条', '委外建议 8 条', '工单建议 15 条'] }
    ],
    rows: [
      ['MRP240428A', '净需求运算', '计划部', '待确认', '16:00'],
      ['PLN240428B', '产能平衡', '生产计划', '处理中', '17:30'],
      ['REL240428C', '计划下发', 'PMC', '待释放', '18:00']
    ]
  },
  purchase: {
    board: [
      { title: '待下单', items: ['铜件供应商 A', '包装材料 B', '电子料 C'] },
      { title: '在途跟催', items: ['PO24042508 延期 1 天', 'PO24042611 提前到货'] },
      { title: '待检入库', items: ['IQC 队列 11 批', '急料 2 批', '让步放行 1 批'] }
    ],
    rows: [
      ['PO24042818', '采购订单', '王涛', '待供应商确认', '2026-04-29'],
      ['IQC24042807', '来料检验', '何琳', '检验中', '2026-04-28'],
      ['GR24042803', '采购入库', '周莉', '待过账', '2026-04-28']
    ]
  },
  outsource: {
    board: [
      { title: '待发外', items: ['OS24042801 壳体喷涂', 'OS24042803 铣削件'] },
      { title: '加工中', items: ['供应商 S1 4 批', '供应商 S2 3 批'] },
      { title: '异常处理', items: ['补料申请 2 笔', '退料判定 1 笔'] }
    ],
    rows: [
      ['OS24042801', '委外工单', '刘洋', '加工中', '2026-04-30'],
      ['PK24042802', '委外领料', '高宁', '已发外', '2026-04-28'],
      ['RT24042801', '退补处理', '徐松', '待审批', '2026-04-28']
    ]
  },
  production: {
    board: [
      { title: '待开工', items: ['WO24042812 装配线 1', 'WO24042815 装配线 3'] },
      { title: '执行中', items: ['领料完成 8 单', '在制报工 21 单', '品质复判 2 单'] },
      { title: '异常待处置', items: ['报废退补 5 单', '工艺替换 1 单', '欠料 3 单'] }
    ],
    rows: [
      ['WO24042812', '生产订单', '赵凯', '执行中', '18:30'],
      ['PK24042809', '生产领料', '韩宇', '待补料', '17:50'],
      ['FG24042804', '成品入仓', '孙悦', '待检验', '19:20']
    ]
  },
  finance: {
    board: [
      { title: '待核销', items: ['AR-华东客户', 'AR-海外代理', 'AP-铜件供应商'] },
      { title: '待分摊', items: ['材料成本 4 笔', '人工制费 2 笔'] },
      { title: '待过账', items: ['库存凭证 6 笔', '成本凭证 3 笔', '资金凭证 5 笔'] }
    ],
    rows: [
      ['AR24042805', '应收核销', '周宁', '待回款', '2026-04-30'],
      ['AP24042803', '应付付款', '刘丹', '待付款', '2026-04-29'],
      ['GL24042809', '总账过账', '孙杰', '处理中', '2026-04-28']
    ]
  }
};

const businessStats = computed(() => businessStatsMap[selectedGroup.value.key]);
const businessStages = computed(() => businessStagesMap[selectedGroup.value.key]);
const businessMock = computed(() => businessMockByGroup[selectedGroup.value.key]);

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

function goDashboard() {
  activeView.value = 'dashboard';
}

function handleSelectMenu(menuKey) {
  selectedMenuKey.value = menuKey;
  activeView.value = 'module';
}

async function handleLogout() {
  logout();
  await router.push({ name: 'login' });
}
</script>

<template>
  <main class="page page-home">
    <section class="workspace-shell-admin">
      <header class="topbar">
        <div class="topbar-left">
          <div class="brand">
            <span class="brand-logo">
              <AppIcon name="brand" :size="22" />
            </span>
            <strong>ERP业务中台</strong>
          </div>

          <nav class="top-nav">
            <a class="top-nav-link top-nav-link-active" href="javascript:void(0)">
              首页
            </a>
          </nav>
        </div>

        <div class="topbar-actions">
          <button class="icon-action" type="button" aria-label="消息提醒">
            <AppIcon name="bell" />
          </button>
          <button class="icon-action" type="button" aria-label="终端状态">
            <AppIcon name="screen" />
          </button>
          <button class="icon-action" type="button" aria-label="语言设置">
            <AppIcon name="language" />
          </button>

          <div class="user-chip">
            <span class="user-avatar">{{ user?.name?.slice(0, 1) || '管' }}</span>
            <div>
              <strong>{{ user?.name || '管理员' }}</strong>
              <span>企业运营</span>
            </div>
          </div>

          <button class="ghost-button ghost-button-compact" type="button" @click="handleLogout">
            退出
          </button>
        </div>
      </header>

      <div class="admin-layout">
        <aside class="sidebar">
          <div class="sidebar-section">
            <span class="sidebar-caption">总览</span>
            <button
              class="sidebar-link sidebar-link-static"
              :class="{ 'sidebar-link-active': activeView === 'dashboard' }"
              type="button"
              @click="goDashboard"
            >
              <AppIcon name="dashboard" />
              <span>数据看板</span>
            </button>
          </div>

          <div class="sidebar-section">
            <span class="sidebar-caption">业务模块</span>

            <section
              v-for="group in erpMenuTree"
              :key="group.key"
              class="sidebar-group"
            >
              <div class="sidebar-group-title">
                <AppIcon :name="groupIconMap[group.key]" />
                <strong>{{ group.title }}</strong>
              </div>

              <button
                v-for="item in group.children"
                :key="item.key"
                class="sidebar-link"
                :class="{ 'sidebar-link-active': activeView === 'module' && item.key === selectedMenuKey }"
                type="button"
                @click="handleSelectMenu(item.key)"
              >
                <span>{{ item.title }}</span>
              </button>
            </section>
          </div>
        </aside>

        <section class="content-area">
          <template v-if="activeView === 'dashboard'">
            <div class="content-toolbar">
              <div>
                <p class="toolbar-eyebrow">数据看板</p>
                <h1>晚上好，{{ user?.name || '管理员' }}</h1>
                <p class="toolbar-copy">
                  这里展示 ERP 全链路运行概况，聚焦销售、计划、采购、生产与财务的整体运行态势。
                </p>
              </div>

              <div class="toolbar-actions">
                <button class="icon-action icon-action-large" type="button" aria-label="搜索">
                  <AppIcon name="search" :size="20" />
                </button>
                <button class="icon-action icon-action-large" type="button" aria-label="刷新">
                  <AppIcon name="refresh" :size="20" />
                </button>
              </div>
            </div>

            <section class="metric-grid">
              <article
                v-for="card in dashboardCards"
                :key="card.key"
                class="metric-card"
              >
                <header class="metric-header">
                  <div class="metric-title">
                    <span class="metric-icon">
                      <AppIcon :name="card.icon" />
                    </span>
                    <h3>{{ card.title }}</h3>
                  </div>
                </header>

                <div class="metric-body">
                  <div>
                    <strong>{{ card.value }}</strong>
                    <p>{{ card.description }}</p>
                  </div>

                  <svg class="metric-line" viewBox="0 0 108 48" xmlns="http://www.w3.org/2000/svg">
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

            <section class="dashboard-main">
              <article class="panel panel-chart panel-span-2">
                <header class="panel-header">
                  <div class="panel-title">
                    <AppIcon name="reports" />
                    <h3>ERP 模块流转分析</h3>
                  </div>

                  <div class="panel-tabs">
                    <button class="panel-tab panel-tab-active" type="button">菜单覆盖</button>
                    <button class="panel-tab" type="button">生产负荷</button>
                    <button class="panel-tab" type="button">成本趋势</button>
                  </div>
                </header>

                <div class="chart-content">
                  <div class="chart-summary">
                    <div>
                      <h4>整体流程覆盖</h4>
                      <p>当前已拆分 {{ stats.menuCount }} 个业务节点，覆盖 {{ stats.moduleCount }} 个一级模块。</p>
                    </div>
                    <div class="stage-badge">全链路视图</div>
                  </div>

                  <div class="bar-chart">
                    <div
                      v-for="bar in dashboardProcessBars"
                      :key="bar.key"
                      class="bar-column"
                    >
                      <div class="bar-track">
                        <div
                          class="bar-fill bar-fill-active"
                          :style="{
                            height: `${bar.value * 14 + 38}px`,
                            background: bar.color
                          }"
                        ></div>
                      </div>
                      <span class="bar-value">{{ bar.value }}</span>
                      <span class="bar-label">{{ bar.title }}</span>
                    </div>
                  </div>
                </div>
              </article>

              <article class="panel panel-detail">
                <header class="panel-header">
                  <div class="panel-title">
                    <AppIcon name="settings" />
                    <h3>流程阶段</h3>
                  </div>
                </header>

                <div class="detail-content">
                  <section
                    v-for="(group, index) in erpMenuTree"
                    :key="group.key"
                    class="detail-block"
                  >
                    <h5>{{ index + 1 }}. {{ group.title }}</h5>
                    <p>{{ group.children.map((item) => item.title).slice(0, 3).join(' / ') }}</p>
                  </section>
                </div>
              </article>
            </section>

            <section class="dashboard-bottom">
              <article class="panel bottom-panel">
                <header class="panel-header">
                  <div class="panel-title">
                    <AppIcon name="bell" />
                    <h3>系统公告</h3>
                  </div>
                  <span class="panel-badge">显示最新 20 条</span>
                </header>

                <ul class="notice-list">
                  <li v-for="notice in dashboardNotices" :key="notice.title" class="notice-item">
                    <span class="notice-dot" :class="`notice-dot-${notice.tone}`"></span>
                    <div>
                      <strong>{{ notice.title }}</strong>
                      <p>{{ notice.type }}</p>
                    </div>
                  </li>
                </ul>
              </article>

              <article class="panel bottom-panel">
                <header class="panel-header">
                  <div class="panel-title">
                    <AppIcon name="function" />
                    <h3>常用功能</h3>
                  </div>
                </header>

                <div class="quick-actions">
                  <button class="quick-action" type="button">销售订单管理</button>
                  <button class="quick-action" type="button">MRP 运算</button>
                  <button class="quick-action" type="button">生产领料</button>
                  <button class="quick-action" type="button">成本核算</button>
                </div>
              </article>

              <article class="panel bottom-panel">
                <header class="panel-header">
                  <div class="panel-title">
                    <AppIcon name="reports" />
                    <h3>服务可用性</h3>
                  </div>
                </header>

                <div class="service-list">
                  <div
                    v-for="item in dashboardServices"
                    :key="item.label"
                    class="service-item"
                  >
                    <span>{{ item.label }}</span>
                    <strong>{{ item.value }}</strong>
                    <p>{{ item.hint }}</p>
                  </div>
                </div>
              </article>
            </section>
          </template>

          <template v-else>
            <div class="content-toolbar">
              <div>
                <p class="toolbar-eyebrow">{{ selectedGroup.title }}</p>
                <h1>{{ selectedMenu.title }}</h1>
                <p class="toolbar-copy">
                  这里是业务模块执行视图，使用 mock 的生产流转与任务数据展示，不再复用看板统计卡逻辑。
                </p>
              </div>

              <div class="toolbar-actions">
                <button class="icon-action icon-action-large" type="button" aria-label="搜索">
                  <AppIcon name="search" :size="20" />
                </button>
                <button class="icon-action icon-action-large" type="button" aria-label="刷新">
                  <AppIcon name="refresh" :size="20" />
                </button>
              </div>
            </div>

            <section class="business-stat-grid">
              <article
                v-for="item in businessStats"
                :key="item.label"
                class="business-stat-card"
              >
                <span>{{ item.label }}</span>
                <strong>{{ item.value }}</strong>
                <p>{{ item.hint }}</p>
              </article>
            </section>

            <section class="business-main-grid">
              <article class="panel panel-span-2">
                <header class="panel-header">
                  <div class="panel-title">
                    <AppIcon name="flow" />
                    <h3>生产流程泳道</h3>
                  </div>
                  <div class="panel-tabs">
                    <button class="panel-tab panel-tab-active" type="button">执行链路</button>
                    <button class="panel-tab" type="button">异常追踪</button>
                  </div>
                </header>

                <div class="lane-content">
                  <div class="lane-steps">
                    <div
                      v-for="(step, index) in businessFlowNodes"
                      :key="`${step.name}-${index}`"
                      class="lane-step"
                      :class="`lane-step-${step.status}`"
                    >
                      <div class="lane-node"></div>
                      <div class="lane-step-body">
                        <strong>{{ step.name }}</strong>
                        <p>{{ step.owner }}</p>
                        <span>{{ step.tag }}</span>
                      </div>
                    </div>
                  </div>

                  <div class="lane-stage-strip">
                    <span
                      v-for="stage in businessStages"
                      :key="stage"
                      class="lane-stage-chip"
                    >
                      {{ stage }}
                    </span>
                  </div>
                </div>
              </article>

              <article class="panel">
                <header class="panel-header">
                  <div class="panel-title">
                    <AppIcon name="settings" />
                    <h3>模块说明</h3>
                  </div>
                </header>

                <div class="detail-content">
                  <section class="detail-block">
                    <h4>{{ selectedMenu.path }}</h4>
                    <p>{{ selectedMenu.stage }}</p>
                  </section>
                  <section class="detail-block">
                    <h5>上游依赖</h5>
                    <ul class="detail-list">
                      <li v-for="item in selectedMenu.upstream" :key="item">{{ item }}</li>
                    </ul>
                  </section>
                  <section class="detail-block">
                    <h5>下游流转</h5>
                    <ul class="detail-list">
                      <li v-for="item in selectedMenu.downstream" :key="item">{{ item }}</li>
                    </ul>
                  </section>
                </div>
              </article>

              <article class="panel panel-span-2">
                <header class="panel-header">
                  <div class="panel-title">
                    <AppIcon name="dashboard" />
                    <h3>执行看板</h3>
                  </div>
                </header>

                <div class="board-grid">
                  <section
                    v-for="column in businessMock.board"
                    :key="column.title"
                    class="board-column"
                  >
                    <h4>{{ column.title }}</h4>
                    <ul>
                      <li v-for="item in column.items" :key="item">{{ item }}</li>
                    </ul>
                  </section>
                </div>
              </article>

              <article class="panel panel-span-2">
                <header class="panel-header">
                  <div class="panel-title">
                    <AppIcon name="reports" />
                    <h3>任务清单</h3>
                  </div>
                </header>

                <div class="task-table-wrapper">
                  <table class="task-table">
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
                          <span class="table-status">{{ row[3] }}</span>
                        </td>
                        <td>{{ row[4] }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </article>

              <article class="panel">
                <header class="panel-header">
                  <div class="panel-title">
                    <AppIcon name="function" />
                    <h3>建议功能点</h3>
                  </div>
                </header>

                <div class="quick-actions quick-actions-module">
                  <button
                    v-for="item in selectedMenu.functions"
                    :key="item"
                    class="quick-action"
                    type="button"
                  >
                    {{ item }}
                  </button>
                </div>
              </article>
            </section>
          </template>
        </section>
      </div>
    </section>
  </main>
</template>
