export const dashboardCards = [
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

export const dashboardShortcuts = [
  {
    key: 'asset-depreciation',
    title: '资产折旧表',
    icon: 'function',
    tone: 'teal',
    routeName: 'menu-asset-depreciation'
  },
  {
    key: 'subject-balance',
    title: '科目余额表',
    icon: 'home',
    tone: 'blue',
    routeName: 'menu-subject-balance'
  },
  {
    key: 'voucher-amount',
    title: '资产明细余额表',
    icon: 'finance',
    tone: 'amber',
    routeName: 'menu-asset-balance-detail'
  },
  {
    key: 'general-ledger',
    title: '总账',
    icon: 'dashboard',
    tone: 'cyan',
    routeName: 'menu-general-ledger'
  },
  {
    key: 'sub-ledger',
    title: '辅助余额表',
    icon: 'planning',
    tone: 'indigo',
    routeName: 'menu-assist-balance'
  },
  {
    key: 'timing-ledger',
    title: '序时账',
    icon: 'reports',
    tone: 'sky',
    routeName: 'menu-timing-ledger'
  },
  {
    key: 'asset-card',
    title: '资产卡片',
    icon: 'purchase',
    tone: 'emerald',
    routeName: 'menu-asset-card'
  },
  {
    key: 'subject-assist',
    title: '科目(辅助)余额表',
    icon: 'base',
    tone: 'mint',
    routeName: 'menu-subject-assist-balance'
  },
  {
    key: 'account-analysis',
    title: '账龄分析',
    icon: 'dashboard',
    tone: 'azure',
    routeName: 'menu-account-aging'
  },
  {
    key: 'add-more',
    title: '添加更多',
    icon: 'plus',
    tone: 'ghost',
    routeName: 'menu-reports'
  }
];

export const dashboardWorkspace = {
  title: '财务（Y）',
  company: '投资集团有限公司',
  department: '投资集团有限公司',
  badge: '财'
};

export const dashboardTodoList = [
  {
    title: '财务底稿待复核',
    code: 'SJ-2026-0418',
    owner: '王颖',
    deadline: '今天 18:00'
  },
  {
    title: '固定资产折旧差异校验',
    code: 'ZJ-2026-0421',
    owner: '赵坤',
    deadline: '04-29 10:30'
  },
  {
    title: '总账期末结转确认',
    code: 'GL-2026-0428',
    owner: '陈思',
    deadline: '04-30 16:00'
  }
];

export const dashboardInitiatedList = [
  {
    title: '科目余额分析任务',
    code: 'FA-2026-0407',
    status: '执行中',
    updatedAt: '2 小时前'
  },
  {
    title: '银行余额调节表复核',
    code: 'CW-2026-0415',
    status: '待审批',
    updatedAt: '今天 09:20'
  },
  {
    title: '应收账龄专项检查',
    code: 'YS-2026-0420',
    status: '已提交',
    updatedAt: '昨天 17:42'
  }
];

export const dashboardNotices = [
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

export function getDashboardServices(stats) {
  return [
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
      value: `${stats.processCount}`,
      hint: '基础资料到财务结算'
    }
  ];
}
