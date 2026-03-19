// STAR data for each experience — shared by website cards and resume modal

export interface StarEntry {
  title: string;
  titleEn: string;
  s: string; sEn: string;
  t: string; tEn: string;
  a: string; aEn: string;
  r: string; rEn: string;
}

/** Map keyed by exp.company (Chinese name) */
export const STAR_DATA: Record<string, StarEntry[]> = {
  Momenta: [
    {
      title: 'AI智能体询价系统',
      titleEn: 'AI-Powered Inquiry System',
      s: '财务团队每日需向多家外资银行询价，手动处理邮件效率低且易出错，难以快速对比报价。',
      sEn: 'Finance team manually handled multi-bank inquiries daily — email processing was slow and error-prone.',
      t: '开发支持自然语言查询的自动化询价系统，自动抓取银行回复并生成结构化报价表。',
      tEn: 'Build natural-language inquiry system to auto-capture bank responses and generate structured quote tables.',
      a: '基于Coze平台搭建AI智能体；集成QQ邮箱IMAP收取+Outlook自动转发；AI自动提取价格/期限/风险等级填入表格。',
      aEn: 'Built AI agent on Coze; integrated QQ email (IMAP + Outlook auto-forward); AI extracts price/tenor/risk level into table.',
      r: '询价效率提升60%，准确率接近100%；财务团队可即时查看所有银行报价对比，决策速度显著提升。',
      rEn: 'Inquiry efficiency improved 60%, accuracy near 100%; team can instantly compare all bank quotes.',
    },
    {
      title: '市场资讯自动化日报/周报',
      titleEn: 'Automated Market Intelligence Reports',
      s: '市场资讯分散在多个来源，手动编译日报/周报耗时约2小时，信息延迟影响决策。',
      sEn: 'Market intelligence was scattered; manual daily/weekly reports took ~2 hours, causing information delays.',
      t: '构建覆盖美国/中国/全球三大经济维度的自动化系统，基于公司关注点智能筛选，全自动生成飞书云文档。',
      tEn: 'Build automated system covering US/China/Global economy, auto-filter by company focus, auto-generate Feishu docs.',
      a: '开发多维度资讯抓取与评分skill，按Momenta关注领域（美股/宏观/监管）分类，定时触发并自动推送至财务群。',
      aEn: 'Developed multi-source scraping/scoring skill, categorized by Momenta focus areas, scheduled auto-push to finance group.',
      r: '人工编译时间减少80%；资讯从次日报更新为实时推送，支持财务团队快速决策。',
      rEn: 'Manual compilation reduced 80%; reports shifted from next-day to real-time, enabling faster decisions.',
    },
    {
      title: '资金仪表板与自动化监控',
      titleEn: 'Treasury Dashboard & Automated Monitoring',
      s: '资金余额、流水、理财产品分散在多个系统，缺乏统一视图，每日需人工整理多份报表耗时1-2小时。',
      sEn: 'Treasury data (balances, cashflow, wealth products) scattered across systems, requiring 1-2 hrs daily manual consolidation.',
      t: '搭建统一资金监控平台，实现余额分布、流水预测、理财到期等关键信息的自动化展示与预警。',
      tEn: 'Build unified treasury monitoring platform with automated display of balance, cashflow, and wealth maturity alerts.',
      a: '利用Claude Code开发每日数据报告自动生成skill，通过飞书仪表板展示多维度数据，设置阈值自动推送提醒。',
      aEn: 'Used Claude Code to develop daily report generation skill, Feishu dashboard for multi-dimensional display, threshold alerts.',
      r: '数据整理时间从1-2小时缩短至5分钟，实现多维度实时监控，提升资金管理效率。',
      rEn: 'Data consolidation reduced from 1-2 hours to 5 minutes, enabling real-time multi-dimensional treasury monitoring.',
    },
  ],

  '中化天津有限公司': [
    {
      title: '资产处置实现50%溢价',
      titleEn: '50% Premium Asset Disposal',
      s: '"蓝星清洗"资产挂牌后潜在买家响应有限，信息不对称导致买家对资产价值认知不足。',
      sEn: '"Blue Star Cleaning" asset attracted limited buyer response; information asymmetry caused undervaluation.',
      t: '带领意向方实地踏勘，专业介绍资产价值与优势，提升买家信心，促成高价竞标。',
      tEn: 'Lead potential buyers for on-site inspection, professionally introduce asset value to boost buyer confidence.',
      a: '提前准备专业讲解材料；现场重点展示设备状况、产能及区位优势；详细解答买家技术细节问题；建立竞价氛围。',
      aEn: 'Prepared briefing materials; highlighted equipment condition, capacity and location advantages; answered technical questions.',
      r: '项目最终实现挂牌价50%溢价成交，超额完成处置目标。',
      rEn: 'Project achieved 50% premium over listing price, exceeding disposal targets.',
    },
    {
      title: '破产重整合规工作流程',
      titleEn: 'Bankruptcy Restructuring Workflow',
      s: '"厦门长蓝"破产重整法律程序复杂，流程不规范可能导致法律风险和项目延期。',
      sEn: '"Xiamen Changlan" bankruptcy involved complex legal procedures; improper workflow risked legal exposure.',
      t: '依据《公司法》《企业破产法》及中化内部制度，制定完整合规的破产重整工作流程。',
      tEn: 'Develop complete compliant workflow per Company Law, Enterprise Bankruptcy Law, and Sinochem regulations.',
      a: '系统梳理关键法律节点（债权申报/债权人会议/资产清查/处置方案），制定标准化文档，与法务团队多轮论证。',
      aEn: 'Mapped key legal milestones (claims/meetings/inventory/disposal), drafted standard docs, reviewed with legal team.',
      r: '形成完整可执行方案，为项目顺利推进提供制度保障，获得团队认可。',
      rEn: 'Delivered executable workflow providing institutional support for smooth project progress.',
    },
  ],

  '中科曙光（存储产品事业部）': [
    {
      title: '两版本全生命周期管理',
      titleEn: 'Dual-Version Lifecycle Management',
      s: '存储产品版本迭代周期长、跨团队协作多，传统管理方式导致需求排期混乱、延期频发。',
      sEn: 'Storage product versions had long cycles across multiple teams; chaotic scheduling caused frequent delays.',
      t: '管理412d-1230（2025年3月）和421SP1（2025年7月）两个版本全生命周期，确保需求、进度、质量、发布有序。',
      tEn: 'Manage full lifecycle of versions 412d-1230 (Mar 2025) and 421SP1 (Jul 2025), ensuring orderly delivery.',
      a: '建立版本管理制度；用Jira绘制甘特图并每周同步；组织87场评审会（需求/技术/原型/Demo/测试）；独立主持20+场Bug评审。',
      aEn: 'Established version management system; Jira Gantt + weekly sync; organized 87 reviews; independently hosted 20+ bug reviews.',
      r: '两版本均按计划发版，需求完成率>95%，延期问题减少约30%，团队协作效率显著提升。',
      rEn: 'Both versions released on schedule; requirement completion >95%; delays reduced ~30%.',
    },
    {
      title: '评审流程标准化降低沟通成本',
      titleEn: 'Review Process Standardization',
      s: '研发评审会议频繁但效果欠佳，问题记录分散、责任人不清，重复沟通占用大量时间。',
      sEn: 'Many reviews but poor effectiveness; scattered records, unclear ownership, high repetitive communication.',
      t: '建立标准化评审登记机制，统一记录问题、责任人、截止时间，实现闭环跟踪。',
      tEn: 'Build standardized review registration system to unify issue/owner/deadline tracking.',
      a: '设计标准化登记模板，要求每场会议必须填写；会后统一归档到Confluence；设置到期自动reminder。',
      aEn: 'Designed standard templates, mandatory per meeting; archived to Confluence; set auto-reminders for issue closure.',
      r: '重复沟通减少30-50%，问题关闭率从65%升至88%，研发信息检索效率提升40%。',
      rEn: 'Repetitive communication reduced 30-50%; issue closure rate 65%→88%; retrieval efficiency +40%.',
    },
  ],

  '东吴证券（研究所）': [
    {
      title: '深度报告与DCF/PE估值模型',
      titleEn: 'In-depth Research & DCF/PE Models',
      s: '基金经理需要精准的基本面研究和多维度估值数据，以支持行业覆盖和投资决策。',
      sEn: 'Fund managers needed precise fundamental research and multi-dimensional valuation for investment decisions.',
      t: '深度参与三花智控（汽零）、厦门钨业（钨钼）行业报告，搭建DCF与相对估值（PE/PEG）模型。',
      tEn: 'Deeply involved in Sanhua (auto parts) and Xiamen Tungsten reports; built DCF and PE/PEG valuation models.',
      a: '收集整理历史财务数据与可比公司数据；搭建含敏感性分析的Excel估值模型；编写详细假设文档并定期更新。',
      aEn: 'Collected financials and comps; built Excel models with sensitivity analysis; wrote assumption docs, regularly updated.',
      r: '完成2份深度报告，模型被研究团队采用，有效支持基金经理的行业标的覆盖与投资建议。',
      rEn: 'Completed 2 in-depth reports; models adopted by research team, supporting fund manager coverage and recommendations.',
    },
    {
      title: '锂电产业链数据库与调研纪要',
      titleEn: 'Lithium Battery Chain Database & Research',
      s: '锂电池产业链数据更新不及时、历史数据难以系统查询，影响对行业动态的把握和报告质量。',
      sEn: 'Lithium battery chain data was outdated and hard to query, hindering industry tracking and report quality.',
      t: '持续跟踪宁德时代、赣锋锂业等龙头，按月更新核心部件产量数据，系统整理调研纪要。',
      tEn: 'Track CATL and Ganfeng Lithium, monthly update component production data, systematically organize research minutes.',
      a: '建立月度数据收集模板，抓取正负极/隔膜产量；Excel+MySQL存储并绘制趋势；按标准模板整理20+篇调研纪要。',
      aEn: 'Built monthly templates; scraped cathode/anode/separator data; Excel+MySQL storage with trend charts; organized 20+ minutes.',
      r: '建立含30+核心指标的行业数据库（200+条数据）；纪要标准化率100%，团队信息获取效率显著提升。',
      rEn: 'Built database with 30+ metrics (200+ entries); 100% standardized minutes, significantly improved team information access.',
    },
  ],
};
