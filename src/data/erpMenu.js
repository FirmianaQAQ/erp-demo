export const erpProcessOverview = [
  {
    key: 'master-data',
    title: '基础资料',
    description: '维护业务计算的基础数据，为后续销售、采购、生产提供统一主数据。',
    items: ['物料管理', 'BOM 管理', '仓库预警管理']
  },
  {
    key: 'sales',
    title: '销售链路',
    description: '从销售报价到订单、发货通知，再进入发货与收款闭环。',
    items: ['销售报价管理', '销售订单管理', '销售价目表管理', '发货通知']
  },
  {
    key: 'planning',
    title: '计划运算',
    description: '通过 MRP 综合库存预警与销售订单，拆解采购、委外、生产三类需求。',
    items: ['MRP', '采购需求', '委外需求', '生产需求']
  },
  {
    key: 'execution',
    title: '执行落地',
    description: '分别进入采购、委外和生产执行，并完成各自检验、入库、补料与变更流程。',
    items: ['采购管理', '委外管理', '生产订单', '生产领料']
  },
  {
    key: 'finance',
    title: '财务结算',
    description: '库存与出入库数据沉淀为应收、应付、出纳、成本和总账数据。',
    items: ['应付账管理', '出纳管理', '应收款管理', '成本管理', '总账管理']
  }
];

export const erpMenuTree = [
  {
    key: 'base',
    title: '基础资料',
    icon: '01',
    children: [
      {
        key: 'material',
        title: '物料管理',
        stage: '基础主数据',
        path: '基础资料 / 物料管理',
        upstream: ['主数据初始化'],
        downstream: ['BOM 管理', '销售报价管理', '采购管理'],
        functions: ['物料编码', '规格型号', '单位与分类', '状态启停']
      },
      {
        key: 'bom',
        title: 'BOM 管理',
        stage: '基础主数据',
        path: '基础资料 / BOM 管理',
        upstream: ['物料管理'],
        downstream: ['销售报价管理', 'MRP'],
        functions: ['产品 BOM', '版本管理', '替代料关系', '层级展开']
      },
      {
        key: 'warehouse-alert',
        title: '仓库预警管理',
        stage: '基础主数据',
        path: '基础资料 / 仓库预警管理',
        upstream: ['库存主数据'],
        downstream: ['MRP'],
        functions: ['安全库存', '最低库存', '超储预警', '缺料预警']
      }
    ]
  },
  {
    key: 'sales',
    title: '销售管理',
    icon: '02',
    children: [
      {
        key: 'sales-quote',
        title: '销售报价管理',
        stage: '销售链路',
        path: '销售管理 / 销售报价管理',
        upstream: ['BOM 管理', '物料管理'],
        downstream: ['销售订单管理'],
        functions: ['报价单录入', '价格核算', '毛利预估', '报价审批']
      },
      {
        key: 'sales-order',
        title: '销售订单管理',
        stage: '销售链路',
        path: '销售管理 / 销售订单管理',
        upstream: ['销售报价管理', '销售价目表管理'],
        downstream: ['MRP', '发货通知'],
        functions: ['订单录入', '交期确认', '订单变更', '订单跟踪']
      },
      {
        key: 'sales-price-list',
        title: '销售价目表管理',
        stage: '销售链路',
        path: '销售管理 / 销售价目表管理',
        upstream: ['销售政策'],
        downstream: ['销售订单管理'],
        functions: ['客户价目表', '生效区间', '折扣策略', '历史价格']
      },
      {
        key: 'delivery-notice',
        title: '发货通知',
        stage: '销售链路',
        path: '销售管理 / 发货通知',
        upstream: ['销售订单管理'],
        downstream: ['销售出库', '生产订单变更管理', '生产用料清单变更管理'],
        functions: ['待发排程', '备货确认', '发货单生成', '异常通知']
      },
      {
        key: 'sales-outbound',
        title: '销售出库',
        stage: '销售执行',
        path: '销售管理 / 销售出库',
        upstream: ['发货通知', '成品入仓'],
        downstream: ['应收款管理', '成本管理'],
        functions: ['出库单处理', '物流信息', '发票关联', '客户签收']
      }
    ]
  },
  {
    key: 'planning',
    title: '计划管理',
    icon: '03',
    children: [
      {
        key: 'mrp',
        title: 'MRP',
        stage: '计划运算',
        path: '计划管理 / MRP',
        upstream: ['仓库预警管理', '销售订单管理'],
        downstream: ['采购需求', '委外需求', '生产需求'],
        functions: ['净需求运算', '供需平衡', '批量建议', '计划下发']
      },
      {
        key: 'purchase-demand',
        title: '采购需求',
        stage: '计划运算',
        path: '计划管理 / 采购需求',
        upstream: ['MRP'],
        downstream: ['采购管理'],
        functions: ['请购建议', '缺料合并', '需求锁定', '交期匹配']
      },
      {
        key: 'outsource-demand',
        title: '委外需求',
        stage: '计划运算',
        path: '计划管理 / 委外需求',
        upstream: ['MRP'],
        downstream: ['委外管理'],
        functions: ['委外件识别', '工序拆分', '委外数量建议', '加工排期']
      },
      {
        key: 'production-demand',
        title: '生产需求',
        stage: '计划运算',
        path: '计划管理 / 生产需求',
        upstream: ['MRP'],
        downstream: ['生产订单'],
        functions: ['工单建议', '优先级排序', '产能匹配', '生产计划下达']
      }
    ]
  },
  {
    key: 'purchase',
    title: '采购管理',
    icon: '04',
    children: [
      {
        key: 'purchase-price-list',
        title: '采购价目表',
        stage: '采购执行',
        path: '采购管理 / 采购价目表',
        upstream: ['供应商策略'],
        downstream: ['采购管理'],
        functions: ['供应商报价', '比价基准', '生效周期', '价格追溯']
      },
      {
        key: 'purchase-order',
        title: '采购管理',
        stage: '采购执行',
        path: '采购管理 / 采购管理',
        upstream: ['采购需求', '采购价目表'],
        downstream: ['来料入库请检流程'],
        functions: ['采购单', '供应商交期', '采购变更', '到货跟踪']
      },
      {
        key: 'incoming-inspection',
        title: '来料入库请检流程',
        stage: '采购执行',
        path: '采购管理 / 来料入库请检流程',
        upstream: ['采购管理', '委外管理'],
        downstream: ['采购入库'],
        functions: ['到货登记', 'IQC 送检', '检验结论', '退货处理']
      },
      {
        key: 'purchase-inbound',
        title: '采购入库',
        stage: '采购执行',
        path: '采购管理 / 采购入库',
        upstream: ['来料入库请检流程'],
        downstream: ['应付账管理', '固定资产管理'],
        functions: ['入库单确认', '仓位上架', '批次记录', '入库过账']
      }
    ]
  },
  {
    key: 'outsource',
    title: '委外管理',
    icon: '05',
    children: [
      {
        key: 'outsource-order',
        title: '委外管理',
        stage: '委外执行',
        path: '委外管理 / 委外管理',
        upstream: ['委外需求'],
        downstream: ['委外领料', '来料入库请检流程'],
        functions: ['委外工单', '加工商排程', '发外跟踪', '委外结算']
      },
      {
        key: 'outsource-picking',
        title: '委外领料',
        stage: '委外执行',
        path: '委外管理 / 委外领料',
        upstream: ['委外管理'],
        downstream: ['委外报废退补流程'],
        functions: ['发外领料', '剩余料跟踪', '耗用回传', '委外在途']
      },
      {
        key: 'outsource-scrap',
        title: '委外报废退补流程',
        stage: '委外执行',
        path: '委外管理 / 委外报废退补流程',
        upstream: ['委外领料'],
        downstream: ['库存核算管理'],
        functions: ['报废申报', '补料申请', '退料入库', '责任归属']
      }
    ]
  },
  {
    key: 'production',
    title: '生产管理',
    icon: '06',
    children: [
      {
        key: 'production-order',
        title: '生产订单',
        stage: '生产执行',
        path: '生产管理 / 生产订单',
        upstream: ['生产需求'],
        downstream: ['生产领料', '生产订单变更管理'],
        functions: ['工单下达', '工序排产', '工单状态', '完工汇报']
      },
      {
        key: 'production-order-change',
        title: '生产订单变更管理',
        stage: '生产执行',
        path: '生产管理 / 生产订单变更管理',
        upstream: ['发货通知', '生产订单'],
        downstream: ['生产用料清单变更管理'],
        functions: ['数量变更', '交期调整', '工艺替换', '影响追踪']
      },
      {
        key: 'production-bom-change',
        title: '生产用料清单变更管理',
        stage: '生产执行',
        path: '生产管理 / 生产用料清单变更管理',
        upstream: ['生产订单变更管理'],
        downstream: ['生产报废退补流程'],
        functions: ['工单 BOM 调整', '替代料启用', '工序补料', '差异追踪']
      },
      {
        key: 'production-picking',
        title: '生产领料',
        stage: '生产执行',
        path: '生产管理 / 生产领料',
        upstream: ['生产订单', '委外管理'],
        downstream: ['生产报废退补流程', '成品入库请检流程'],
        functions: ['领料单', '倒冲领料', '补料申请', '在制品跟踪']
      },
      {
        key: 'production-scrap',
        title: '生产报废退补流程',
        stage: '生产执行',
        path: '生产管理 / 生产报废退补流程',
        upstream: ['生产领料', '生产用料清单变更管理'],
        downstream: ['生产退料补检流程'],
        functions: ['报废登记', '退料确认', '补料审批', '差异追溯']
      },
      {
        key: 'production-return-inspection',
        title: '生产退料补检流程',
        stage: '生产执行',
        path: '生产管理 / 生产退料补检流程',
        upstream: ['生产报废退补流程'],
        downstream: ['库存核算管理'],
        functions: ['退料送检', '补检判定', '让步放行', '库存调整']
      },
      {
        key: 'finished-inspection',
        title: '成品入库请检流程',
        stage: '生产执行',
        path: '生产管理 / 成品入库请检流程',
        upstream: ['生产领料'],
        downstream: ['成品入仓'],
        functions: ['完工报检', 'FQC 检验', '不良判定', '入库确认']
      },
      {
        key: 'finished-inbound',
        title: '成品入仓',
        stage: '生产执行',
        path: '生产管理 / 成品入仓',
        upstream: ['成品入库请检流程'],
        downstream: ['销售出库', '库存核算管理'],
        functions: ['成品入库', '批次管理', '库存增加', '可销售状态']
      }
    ]
  },
  {
    key: 'finance',
    title: '财务管理',
    icon: '07',
    children: [
      {
        key: 'fixed-assets',
        title: '固定资产管理',
        stage: '财务结算',
        path: '财务管理 / 固定资产管理',
        upstream: ['采购入库'],
        downstream: ['总账管理'],
        functions: ['资产建卡', '折旧策略', '资产变动', '资产盘点']
      },
      {
        key: 'payable',
        title: '应付账管理',
        stage: '财务结算',
        path: '财务管理 / 应付账管理',
        upstream: ['采购入库'],
        downstream: ['出纳管理'],
        functions: ['应付暂估', '对账结算', '发票匹配', '付款申请']
      },
      {
        key: 'cashier',
        title: '出纳管理',
        stage: '财务结算',
        path: '财务管理 / 出纳管理',
        upstream: ['应付账管理', '应收款管理'],
        downstream: ['总账管理'],
        functions: ['收付款单', '银行账户', '资金日报', '现金流水']
      },
      {
        key: 'receivable',
        title: '应收款管理',
        stage: '财务结算',
        path: '财务管理 / 应收款管理',
        upstream: ['销售出库'],
        downstream: ['出纳管理'],
        functions: ['应收确认', '账龄分析', '回款登记', '坏账跟踪']
      },
      {
        key: 'cost',
        title: '成本管理',
        stage: '财务结算',
        path: '财务管理 / 成本管理',
        upstream: ['销售出库', '成品入仓'],
        downstream: ['总账管理'],
        functions: ['材料成本', '人工制费', '成本分摊', '毛利分析']
      },
      {
        key: 'inventory-accounting',
        title: '存货核算管理',
        stage: '财务结算',
        path: '财务管理 / 存货核算管理',
        upstream: ['成品入仓', '委外报废退补流程', '生产退料补检流程'],
        downstream: ['总账管理'],
        functions: ['出入库计价', '库存调整', '期末结存', '差异结转']
      },
      {
        key: 'general-ledger',
        title: '总账管理',
        stage: '财务结算',
        path: '财务管理 / 总账管理',
        upstream: ['固定资产管理', '出纳管理', '成本管理', '存货核算管理'],
        downstream: ['报表管理'],
        functions: ['凭证生成', '账簿查询', '期末结账', '财务对账']
      },
      {
        key: 'reports',
        title: '报表管理',
        stage: '经营分析',
        path: '财务管理 / 报表管理',
        upstream: ['总账管理'],
        downstream: ['经营复盘'],
        functions: ['经营看板', '采购分析', '生产分析', '财务报表']
      }
    ]
  }
];

export function getDefaultMenuItem() {
  return erpMenuTree[0].children[0];
}

export function findMenuItemByKey(targetKey) {
  for (const group of erpMenuTree) {
    const matched = group.children.find((item) => item.key === targetKey);

    if (matched) {
      return matched;
    }
  }

  return getDefaultMenuItem();
}

export function getMenuStats() {
  return {
    moduleCount: erpMenuTree.length,
    menuCount: erpMenuTree.reduce((count, group) => count + group.children.length, 0),
    processCount: erpProcessOverview.length
  };
}
