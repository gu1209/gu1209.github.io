/**
 * Rich resume content — independent from website display text.
 * Each experience has 2 bullets; each project has 2 bullets.
 * Use **text** for bold phrases (parsed in ResumeExportModal).
 * Edit this file to customise what appears in the exported resume.
 */

export interface BulletPair {
  zh: [string, string];
  en: [string, string];
}

// ── Internship experience bullets ─────────────────────────────────────────
// Key = exp.company (Chinese name from page.tsx)
export const EXP_CONTENT: Record<string, BulletPair> = {
  Momenta: {
    zh: [
      '**AI智能体与流程自动化开发：**针对财务团队向多家外资银行手动询价效率低、易出错的痛点，基于Coze平台搭建支持自然语言查询的询价AI智能体，集成QQ邮箱（IMAP收取+Outlook自动转发）实现银行报价邮件全自动抓取，AI提取价格/期限/风险等级生成结构化对比表，**询价效率提升60%**；同步开发覆盖美国/中国/全球三大经济维度的市场资讯日报/周报自动生成Skill，智能筛选公司重点关注信息后自动推送至财务团队，**减少人工编译时间80%**。',
      '**资金监控体系搭建与合规研究：**主导构建资金余额、流水监控、理财产品三大飞书仪表板，利用Claude Code开发每日数据报告自动化Skill，将原需1-2小时的数据整理工作压缩至5分钟以内，实现余额分布、流水预测、理财到期等多维度实时监控；针对美国《1940年投资公司法》开展深度合规研究，系统梳理资本保值投资90%测试的定义及适用条件，评估公司理财组合结构合规性并出具专项报告，**支持公司IPO合规筹备**；负责处理美元、日元、韩元等多币种海外应付账款，使用花旗银行网银完成跨境付款操作。',
    ],
    en: [
      "**AI Agent & Process Automation:** Addressed the finance team's inefficiency in manually inquiring multi-bank quotes by building a natural-language AI inquiry agent on Coze; integrated QQ email (IMAP + Outlook auto-forward) to auto-capture bank responses; AI extracts price/tenor/risk into structured comparison tables, **improving inquiry efficiency 60%**; developed automated daily/weekly market intelligence skill covering US/China/Global economy, intelligently filtering by company focus and auto-pushing to finance team, **reducing manual compilation 80%**.",
      '**Treasury Monitoring & Compliance Research:** Led development of three Feishu dashboards (balance/cashflow/wealth products) and built a daily automated report skill using Claude Code, compressing data consolidation from 1-2 hours to 5 minutes with real-time multi-dimensional monitoring; conducted in-depth compliance research on the US Investment Company Act of 1940, analyzed the 90% capital preservation test, assessed wealth portfolio compliance, and produced a specialist report **supporting IPO compliance preparation**; processed multi-currency overseas payables (USD/JPY/KRW) via Citibank.',
    ],
  },

  '中化天津有限公司': {
    zh: [
      '**资产处置与破产合规：**全程参与多项资产处置与破产重整项目，承担现场踏勘与流程合规支持。主导"蓝星清洗资产转让"项目现场接待，专业介绍资产现状、产能及区位优势，有效促成竞价氛围，**最终实现挂牌价50%溢价成交，超额完成处置目标**；依据《公司法》《企业破产法》及中国中化内部制度，系统梳理债权申报、债权人会议、资产清查等关键法律节点，为"厦门长蓝"破产重整项目完整制定合规工作流程，规避法律风险。',
      '**战略规划研究与专业写作：**参与中化天津物流"十五五"规划研究，深入调研存量土地厂房条件，探索建设仓储设施并接入中欧班列的可行性方案，测算投资回报并提供专题分析报告；为上海写字楼出售项目提供分析支持，依据国资管理要求梳理低效资产清单，开展区域租金水平横向对标并提出定价建议；**独立撰写3篇重点项目通讯稿**，全部发布于中化天津有限公司官方公众号。',
    ],
    en: [
      '**Asset Disposal & Bankruptcy Compliance:** Participated in multiple asset disposal and bankruptcy restructuring projects, responsible for site inspections and compliance support. Led on-site reception for "Blue Star Cleaning Asset Transfer," professionally introducing asset conditions, capacity and location advantages to build buyer confidence, **achieving 50% premium over listing price**; systematically mapped key legal milestones (creditor claims/creditor meetings/asset inventory) per Company Law, Enterprise Bankruptcy Law, and Sinochem internal regulations, developing a complete compliant workflow for "Xiamen Changlan" bankruptcy restructuring.',
      '**Strategic Research & Professional Writing:** Contributed to Sinochem Tianjin Logistics "15th Five-Year Plan" research, investigated feasibility of leveraging existing facilities to connect to the China-Europe Railway Express; provided analytical support for a Shanghai office building sale, compiled a low-efficiency asset list per state-owned asset requirements and benchmarked regional rental levels; **independently authored 3 project newsletters** published on the official company WeChat account.',
    ],
  },

  '中科曙光（存储产品事业部）': {
    zh: [
      '**版本全生命周期管理：**独立负责412d-1230（2025年3月）和421SP1（2025年7月）两个存储产品版本的全生命周期管理，覆盖需求排期、进度跟踪、评审组织及问题闭环全流程；期间**组织87场评审会议**（产品需求/技术需求/原型/Demo/测试），独立主持20余场Bug评审，建立标准化评审登记模板统一管理问题/责任人/截止时间，**重复沟通减少30-50%，问题关闭率从65%提升至88%**，两版本均按计划高质量发版。',
      '**项目可视化与效能提升：**使用Jira搭建需求与缺陷管理看板，配置Confluence文档空间规范项目文档结构，**研发信息检索效率提升40%**，新成员上手时间从2周缩短至3-5天；完成版本结项数据统计，分析需求完成率、代码产出、Bug解决率等核心指标，开展延期Bug根因分析（需求变更/技术债务/资源不足），主导文档合规审计，为后续版本迭代提供数据支撑。',
    ],
    en: [
      '**Version Lifecycle Management:** Independently managed full lifecycle of versions 412d-1230 (Mar 2025) and 421SP1 (Jul 2025), covering requirement scheduling, progress tracking, review coordination, and issue closure; **organized 87 review meetings** (requirements/design/prototype/Demo/testing), independently hosted 20+ bug reviews; established standardized review registration templates unifying issues/owners/deadlines, **reducing repetitive communication 30-50% and improving issue closure rate from 65% to 88%**, both versions released on schedule.',
      '**Project Visualization & Efficiency:** Built Jira Kanban for requirement and defect management, configured Confluence documentation standards, **improving R&D retrieval efficiency 40%** and reducing onboarding from 2 weeks to 3-5 days; completed version statistics (requirement completion rate, code output, bug resolution), conducted root cause analysis of delayed bugs (requirement changes/technical debt/resource constraints), led compliance audits to support subsequent iterations.',
    ],
  },

  '东吴证券（研究所）': {
    zh: [
      '**深度研究与估值建模：**深度参与三花智控（汽车零部件）、厦门钨业（钨钼材料）行业深度研究报告，负责三花智控热管理阀件在家电领域的应用数据搜集，分析厦门钨业产业布局及钨钼行业价格走势，搭建DCF与相对估值模型（PE/PEG）辅助投资判断；持续跟踪宁德时代、赣锋锂业等锂电池产业链核心标的，**整理上市公司调研及行业会议纪要20余篇**。',
      '**数据整理与财务分析：**针对谐波减速器领域，系统对比绿的谐波等国产厂商与哈默纳科在产品参数、成本优势及国产替代进展方面的差异；按月更新锂电池正极、负极、隔膜等核心部件产量数据；协助分析覆盖企业毛利率、研发费用率、ROE、资本开支等关键财务指标，参与定期财务简报撰写；熟练使用**Wind/Choice金融终端及Excel财务建模**工具产出研究报告供基金经理参考。',
    ],
    en: [
      '**In-depth Research & Valuation Modeling:** Deeply involved in research reports on Sanhua (auto components) and Xiamen Tungsten (tungsten/molybdenum), collected data on thermal management valve applications, analyzed industry positioning and price trends, built DCF and relative valuation models (PE/PEG) to support investment decisions; continuously tracked CATL, Ganfeng Lithium and other battery supply chain leaders, **organized 20+ meeting minutes from company research and industry conferences**.',
      '**Data Analysis & Financial Research:** Systematically benchmarked domestic harmonic reducer manufacturers (e.g., Leadshine) vs. Harmonic Drive on product specs, costs, and import substitution progress; updated monthly production data for cathode/anode/separator components; assisted financial analysis of covered companies (gross margin, R&D ratio, ROE, capex), contributed to periodic briefings using **Wind/Choice financial terminals and Excel financial modeling** for fund manager reference.',
    ],
  },
};

// ── Research project bullets ───────────────────────────────────────────────
// Key = proj.title (Chinese name from page.tsx)
export const PROJ_CONTENT: Record<string, BulletPair> = {
  股票行业相似度与反转策略研究: {
    zh: [
      '**研究目标：**探索基于A股年报MD&A文本相似度的算法行业分类是否能比证监会行业分类更精准捕捉股票间基本面关联，改进A股反转策略的超额收益并识别行业间信息扩散规律，研究进行中。',
      '**研究方法：**对比TF-IDF、BERT、FinBERT、BGE-M3等5种Embedding模型，选取组内/组间分离度最优模型；基于余弦相似度矩阵使用Louvain算法进行无监督行业聚类；回测{2,4,6,8}周网格反转策略，初步结果显示算法分类下策略**夏普比率1.03优于证监会分类（0.68）**；同步检验相似股票间Lead-Lag信息扩散效应，发现top-10相似股2周超额收益显著（t-stat=2.35）。',
    ],
    en: [
      '**Objective:** Explore whether algorithmic industry classification based on A-share annual MD&A text similarity better captures fundamental connections among stocks than CSRC classification, to improve reversal strategy alpha and identify cross-industry information diffusion patterns (ongoing).',
      '**Methodology:** Compared 5 embedding models (TF-IDF/BERT/FinBERT/BGE-M3), selected optimal via intra/inter-group separation; applied Louvain clustering on cosine similarity matrix; backtested {2,4,6,8}-week reversal strategies — algorithmic classification achieved **Sharpe 1.03 vs. 0.68 for CSRC**; tested Lead-Lag information diffusion, finding significant 2-week abnormal returns for top-10 similar stocks (t-stat=2.35).',
    ],
  },

  投资者情绪指数与期货价格发现: {
    zh: [
      '**研究目标：**通过文本挖掘构建高频投资者情绪指数，检验其对股指期货市场价格发现功能的影响机制，利用函数化数据分析（FDA）解决高频情绪与低频期货数据的频率不匹配问题，**项目成功结项**。',
      '**研究方法：**通过Python爬虫系统采集东方财富股吧数据，结合中文情感词典（HowNet/BosonNLP）构建日度情绪指数；引入FDA方法进行混频数据融合，将情绪指数转化为周度/月度频率；运用VAR模型与脉冲响应函数（IRF）检验动态影响机制，发现情绪冲击在前2周对期货收益率正向显著（**脉冲响应峰值2.3%**），之后逐渐衰减至零，验证情绪短期预测能力。',
    ],
    en: [
      '**Objective:** Construct a high-frequency investor sentiment index via text mining to test its impact on stock index futures price discovery; apply Functional Data Analysis (FDA) to resolve mixed-frequency issues between high-frequency sentiment and low-frequency futures data. **Project successfully completed.**',
      '**Methodology:** Scraped East Money forum data with Python crawler, built daily sentiment index using Chinese sentiment lexicons (HowNet/BosonNLP); applied FDA for mixed-frequency fusion converting sentiment to weekly/monthly frequency; employed VAR and IRF to test dynamic mechanism — sentiment shock was significantly positive in the first 2 weeks (**peak IRF 2.3%**), gradually decaying to zero, validating short-term predictive power.',
    ],
  },

  招商银行数字金融训练营: {
    zh: [
      '**项目目标：**开发用户广告点击预测模型、资讯意图分类系统及AI营销智能体，提升招商银行数字金融场景的营销精准度与用户转化率，项目已完成。',
      '**技术实现：**采用移动窗口训练规避数据泄露；使用BERT-base-chinese对用户咨询进行8类意图识别；结合用户画像特征工程与XGBoost将**AUC从0.72提升至0.86**，准确率达84%；基于Flask构建RESTful推理API，响应时间<200ms，支持1000 QPS，成功接入招商银行营销系统，日均调用量50万+。',
    ],
    en: [
      '**Objective:** Develop user ad click prediction model, news intent classification, and AI marketing agent to improve targeting precision and conversion rates in CMB digital finance scenarios. Project completed.',
      '**Implementation:** Applied moving window training to prevent data leakage; used BERT-base-chinese for 8-class intent classification; combined user profile feature engineering with XGBoost to **improve AUC from 0.72 to 0.86** (accuracy 84%); built Flask RESTful API with <200ms response, 1000 QPS capacity, successfully integrated into CMB marketing system with 500k+ daily calls.',
    ],
  },
};
