export const businessStatsMap = {
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

export const businessStagesMap = {
  base: ['档案建模', 'BOM 维护', '预警校验', '主数据发布'],
  sales: ['报价核准', '订单确认', '锁库排程', '发货通知'],
  planning: ['需求归集', 'MRP 运算', '计划平衡', '任务下发'],
  purchase: ['请购转单', '供应商确认', '到货送检', '采购入库'],
  outsource: ['委外下单', '发外领料', '加工跟踪', '退补结算'],
  production: ['工单释放', '生产领料', '报废退补', '成品入仓'],
  finance: ['单据汇总', '应收应付', '成本核算', '总账报表']
};

export const businessMockByGroup = {
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

export function getBusinessStats(groupKey) {
  return businessStatsMap[groupKey] || businessStatsMap.base;
}

export function getBusinessStages(groupKey) {
  return businessStagesMap[groupKey] || businessStagesMap.base;
}

export function getBusinessMock(groupKey) {
  return businessMockByGroup[groupKey] || businessMockByGroup.base;
}
