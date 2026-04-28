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
