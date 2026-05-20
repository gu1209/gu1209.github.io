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
  'Momenta（初速度）': [
    {
      title: 'AI 智能助手产品设计与落地',
      titleEn: 'AI Assistant Product Design & Delivery',
      s: '财务团队日常高频问询场景（持仓分析、申购建议、汇率风险、现金流预测等）依赖口头沟通，缺乏标准化的 AI 辅助工具，信息获取效率低。',
      sEn: 'Finance team\'s high-frequency inquiries (position analysis, purchase recommendations, FX risk, cashflow forecasting) relied on verbal communication without standardized AI tools, causing inefficient information access.',
      t: '从零设计并落地 AI 智能助手产品，实现意图识别、场景化 Prompt、数据检索的完整链路，让团队日常使用。',
      tEn: 'Design and deliver an AI assistant product from scratch, implementing intent recognition, scenario-based prompts, and data retrieval for daily team use.',
      a: '梳理用户场景归纳为标准化问询类型；设计意图识别规则走差异化数据处理逻辑；编写角色分化 Prompt 模板（Chat 模式不提工具防幻觉，Agent 模式告知工具能力）；后端选用 SQL+语义层规则映射实现精准数据检索（非 RAG，因理财数据结构化、实时性强）；设定输出格式约束（中文、币种千分位、YYYY-MM-DD）；借助 Claude Code 完成开发并独立推动测试上线。',
      aEn: 'Mapped user scenarios into standardized inquiry types; designed intent recognition rules with differentiated data logic; wrote role-specific Prompts (Chat mode omits tools to prevent hallucination, Agent mode declares capabilities); chose SQL + semantic-layer rule mapping for precise retrieval (non-RAG, as treasury data is structured and real-time); enforced output format constraints (Chinese, currency with thousands separator, YYYY-MM-DD); built with Claude Code and independently drove testing to launch.',
      r: '系统已投入财务团队日常使用，独立完成从方案设计到上线交付全流程。',
      rEn: 'System now in daily team use; independently drove end-to-end delivery from design to production.',
    },
    {
      title: '自动化工作流建设',
      titleEn: 'Automated Workflow Construction',
      s: '理财询价与市场资讯采集完全依赖人工：发现到期产品→联系原行询价→联系常用行比价→归集报价→整理对比，单次耗时 1-2 小时；资讯分散多源，手动编译效率低。',
      sEn: 'Wealth product inquiry and market intelligence collection were fully manual: detect maturing products → inquire with banks → compare quotes → consolidate, taking 1-2 hours per task; intelligence scattered across sources, manual compilation inefficient.',
      t: '重构询价与资讯采集为自动化工作流，大幅压缩人工耗时，提升响应速度。',
      tEn: 'Redesign inquiry and intelligence collection as automated workflows to drastically reduce manual time and improve responsiveness.',
      a: '梳理完整人工流程识别自动化节点；设计自动化方案：系统监测到期日→自动触发询价→归集多家银行报价；基于 Claude Code Skills 机制实现市场资讯 Skill，联网检索标的并生成 HTML 研报；编写脚本抓取理财产品底层标的与合约数据，智能判定计息状态，自动触发备款与续作提醒。',
      aEn: 'Analyzed manual workflows to identify automation touchpoints; designed automation: system monitors maturity dates → auto-triggers inquiries → aggregates multi-bank quotes; implemented Market Intelligence Skill via Claude Code Skills for web search and HTML report generation; wrote scripts to scrape product underlying assets and contract data, auto-detect interest accrual status, trigger funding and renewal alerts.',
      r: '单次案头工作从 1-2 小时压缩至 2 分钟；自动化管理覆盖总资金池约 70%。',
      rEn: 'Per-task time reduced from 1-2 hours to 2 minutes; automated management covers ~70% of total capital pool.',
    },
    {
      title: '资金数据系统搭建',
      titleEn: 'Treasury Data System Construction',
      s: '约 $1.3B 资金池的管理数据分散在多个系统（银行流水、飞书审批、手工 Excel），缺乏统一视图，每周手工制作报表耗时且易出错。',
      sEn: '~$1.3B capital pool management data scattered across systems (bank statements, Feishu approvals, manual Excel), lacking unified view; weekly manual reporting was time-consuming and error-prone.',
      t: '搭建统一的资金数据系统，实现余额、理财、流动性多维度实时监控，替代手工周报。',
      tEn: 'Build a unified treasury data system for real-time multi-dimensional monitoring of balances, wealth products, and liquidity, replacing manual weekly reports.',
      a: '独立搭建局域网资金分析系统，包含资金余额看板、理财明细看板、流动性预估看板；对接招商银行 CBS API 实现联行号查询与审批；打通飞书审批流数据自动落表与境外银行 CBS 流水自动归集，消除跨系统数据孤岛。',
      aEn: 'Independently built LAN-based treasury analysis system with balance, wealth product detail, and liquidity forecast dashboards; integrated CMB CBS API for bank code lookup and approvals; bridged Feishu approval workflow auto-logging and overseas bank CBS statement auto-consolidation, eliminating cross-system data silos.',
      r: '替代传统手工周报，实现资金数据实时可视化与多维度监控。',
      rEn: 'Replaced traditional manual weekly reporting with real-time treasury data visualization and multi-dimensional monitoring.',
    },
    {
      title: '飞书生态集成与内部工具建设',
      titleEn: 'Feishu Ecosystem Integration & Internal Tools',
      s: '理财申购流程依赖手工操作，群聊消息、审批流、多维表格数据相互割裂，无法形成业务闭环。',
      sEn: 'Wealth subscription process relied on manual operations; group chat, approval workflows, and Bitable data were disconnected, unable to form a business closed loop.',
      t: '基于飞书开放平台打通全链路数据，实现理财申购自动化闭环，并建设内部工具矩阵。',
      tEn: 'Build end-to-end data pipeline via Feishu Open API for automated wealth subscription closed loop, and construct internal tool matrix.',
      a: '通过飞书 API 打通群聊消息→审批流→多维表格自动落表的完整数据链路；实现理财申购从发起到归档全流程自动化；为内部上线多个消息推送 Bot 与信息收集 Bot；深度实践飞书自建应用、多维表格自动化、审批流程配置及 API 调用。',
      aEn: 'Built complete data pipeline via Feishu API: group chat → approval workflow → Bitable auto-logging; automated wealth subscription from initiation to archiving; launched multiple notification bots and data-collection bots; deep hands-on with Feishu custom apps, Bitable automation, approval workflow configuration, and API integration.',
      r: '理财申购全流程实现自动落表与闭环管理，不再依赖手工操作。',
      rEn: 'Full wealth subscription process achieved auto-logging and closed-loop management, eliminating manual dependency.',
    },
    {
      title: '跨国资金运营',
      titleEn: 'Cross-Border Treasury Operations',
      s: '集团全球资金网络待搭建，海外主体银行账户和支付业务需从零开通；赴港上市需评估美国投资公司法合规影响。',
      sEn: 'Global treasury network needed to be built from scratch; overseas entity bank accounts and payment services required new setup; HK IPO preparation required US Investment Company Act compliance assessment.',
      t: '参与全球资金网络搭建，独立推进海外银行业务开通，支持赴港上市合规研究。',
      tEn: 'Participate in global treasury network setup, independently drive overseas banking service activation, support HK IPO compliance research.',
      a: '主导对接花旗银行（Citi）等跨国银行；独立推进海外主体账户开立；成功落地日本花旗企银付款线路；独立对接韩国花旗团队完成代发薪（Payroll）业务设定及首次代发；支持开立香港 IPO 收款账户；撰写案头研究报告分析《1940 年投资公司法案》对公司资本运作及底层资产配置的潜在合规影响。',
      aEn: 'Led engagement with Citi and other global banks; independently drove overseas entity account opening; successfully established Japan Citi corporate payment channels; independently coordinated with Korea Citi team for Payroll service setup and first payroll run; supported HK IPO receipt account opening; authored research report analyzing 1940 Investment Company Act compliance implications for capital operations and asset allocation.',
      r: '多项海外银行业务成功开通并投入运营；合规研究报告为上市筹备提供决策支持。',
      rEn: 'Multiple overseas banking services successfully activated and operational; compliance research provided decision support for IPO preparation.',
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
