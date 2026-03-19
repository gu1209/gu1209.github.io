'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { Mail, Github, Phone, Award, Code, Database, BarChart3, Languages, Globe, Download, Menu, X, ChevronDown, Sparkles, Lock, RotateCcw, LogOut } from 'lucide-react';
import ResumeExportModal from '@/components/ResumeExportModal';
import { STAR_DATA } from '@/lib/starData';
import { useAdminContent } from '@/lib/adminStore';

// ── Admin context ──────────────────────────────────────────────────────────
type AdminCtx = { isAdmin: boolean; get: (id: string, def: string) => string; save: (id: string, val: string) => void; };
const AdminContext = createContext<AdminCtx>({ isAdmin: false, get: (_, d) => d, save: () => {} });

/**
 * Editable text component — renders contenteditable in admin mode,
 * plain text otherwise. Wraps in the given HTML element (`as` prop).
 * Use `cls` for className.
 */
function E({ id, def, as = 'span', cls, style }: {
  id: string; def: string;
  as?: keyof JSX.IntrinsicElements; cls?: string; style?: React.CSSProperties;
}) {
  const { isAdmin, get, save } = useContext(AdminContext);
  const value = get(id, def);
  const Tag = as as any;
  if (!isAdmin) return <Tag className={cls} style={style}>{value}</Tag>;
  return (
    <Tag
      className={cls} style={style}
      contentEditable suppressContentEditableWarning
      data-admin-field="true"
      onBlur={(e: React.FocusEvent<HTMLElement>) => {
        const v = e.currentTarget.textContent ?? def;
        if (v !== get(id, def)) save(id, v);
      }}
    >
      {value}
    </Tag>
  );
}

// ============== TRANSLATION OBJECTS ==============
const translations = {
  zh: {
    nav: { about: '关于我', experience: '实习经历', projects: '研究项目', skills: '技能与证书', contact: '联系方式' },
    hero: { title: '顾杰', subtitle: '金融 × 技术 | 数据分析 | LLM应用', description: '天津大学金融硕士在读，专注于金融数据分析、机器学习与LLM在金融领域的应用。', contact: '联系我', github: 'GitHub' },
    about: { title: '关于我', education: '教育背景', intro: '天津大学（985）金融硕士在读，研究方向为机器学习在金融市场的应用。本科毕业于中国矿业大学（211）金融专业。具备扎实的Python数据分析能力、机器学习基础和金融专业知识。', strengths: '核心优势：CPA专业阶段4科通过 + 金融专业 + Python技术 + LLM应用经验，复合背景突出。', degree: '金融硕士', university: '天津大学', faculty: '管理与经济学部', facultyEn: 'Faculty of Management and Economics', major: '主修课程：大数据与金融风险、金融随机分析、金融计量经济学、金融数据分析、衍生金融工具、行为金融学、投资学、公司金融', period: '2024.09 - 2027.01（预计）', bachelor: '金融学士', bachelorUniv: '中国矿业大学（211）', bachelorFaculty: '经济管理学院', bachelorMajor: '主修课程：货币金融学、宏观经济学、微观经济学、管理学、商业银行经营管理、金融数据分析、大数据分析技术、金融经济学、证券投资学、基础会计学、Python数据分析', bachelorPeriod: '2020.09 - 2024.06', bachelorGpa: 'GPA: 4.15/5.0，专业前15%，二等学业奖学金' },
    experience: { title: '实习经历' },
    projects: { title: '研究项目', tech: '技术栈', objective: '研究目标', methodology: '研究方法', design: '研究设计', status: '状态' },
    skills: { title: '技能与证书', programming: '编程语言', dataTools: '数据分析工具', finance: '金融能力', certifications: '专业认证', languages: '语言能力' },
    contact: { title: '联系方式', email: '邮箱', github: 'GitHub', phone: '电话', message: '寻求金融分析、数据科学或量化相关实习机会。欢迎联系！' },
  },
  en: {
    nav: { about: 'About', experience: 'Experience', projects: 'Projects', skills: 'Skills & Certs', contact: 'Contact' },
    hero: { title: 'Kris Gu', subtitle: 'Finance × Technology | Data Analytics | LLM Applications', description: "Master's student at Tianjin University focusing on financial data analytics, machine learning, and LLM applications in finance.", contact: 'Contact Me', github: 'GitHub' },
    about: { title: 'About Me', education: 'Education', intro: "Master's in Finance at Tianjin University (985), research focus on machine learning in financial markets. Bachelor's in Finance from China University of Mining and Technology (211). Strong skills in Python data analytics, machine learning, and financial knowledge.", strengths: 'Core strengths: CPA 4 subjects passed + Finance expertise + Python programming + LLM application experience.', degree: "Master's in Finance", university: 'Tianjin University', faculty: 'Faculty of Management and Economics', major: 'Core Courses: Big Data & Financial Risk, Financial Stochastic Analysis, Financial Econometrics, Financial Data Analysis, Derivatives, Behavioral Finance, Investment, Corporate Finance', period: '2024.09 - 2027.01 (expected)', bachelor: 'Bachelor in Finance', bachelorUniv: 'China University of Mining and Technology (211)', bachelorFaculty: 'School of Economics & Management', bachelorMajor: 'Core Courses: Money & Banking, Macroeconomics, Microeconomics, Management, Commercial Bank Management, Financial Data Analysis, Big Data Analytics, Financial Economics, Securities Investment, Basic Accounting, Python Data Analysis', bachelorPeriod: 'Sep 2020 - Jun 2024', bachelorGpa: 'GPA: 4.15/5.0, Top 15% in major, Second-class Academic Scholarship' },
    experience: { title: 'Internship Experience' },
    projects: { title: 'Research Projects', tech: 'Tech Stack', objective: 'Objective', methodology: 'Methodology', design: 'Research Design', status: 'Status' },
    skills: { title: 'Skills & Certifications', programming: 'Programming', dataTools: 'Data Tools', finance: 'Finance Skills', certifications: 'Certifications', languages: 'Languages' },
    contact: { title: 'Get In Touch', email: 'Email', github: 'GitHub', phone: 'Phone', message: 'Seeking internships in financial analysis, data science, or quantitative roles. Feel free to reach out!' },
  },
};

// ============== DATA ==============
const experiences = [
  {
    company: 'Momenta',
    companyEn: 'Momenta',
    role: '资金分析实习生',
    roleEn: 'Fund Analysis Intern',
    period: '2025年12月 - 至今',
    periodEn: 'Dec 2025 - Present',
    highlights: [
      '基于Coze平台搭建AI智能体询价系统，支持自然语言查询（如"向外资行询问1000万美元，三个月双币存款的价格"），集成QQ邮箱（IMAP收取+Outlook自动转发）自动抓取银行回复，AI提取价格/期限/风险等级生成结构化表格，效率提升60%',
      '开发市场资讯周报和日报生成skill，覆盖美国/中国/全球经济三大维度，基于Momenta重点关注自动筛选信息，全自动生成飞书云文档并推送至财务团队，减少人工编译时间80%',
      '搭建资金余额、流水监控、理财产品三大飞书仪表板看板，利用Claude Code开发每日数据报告自动化生成skill，实现余额分布、流水预测、理财到期等多维度监控',
      '针对美国《1940年投资公司法》开展合规研究，梳理资本保值投资定义与适用条件，评估Momenta理财结构是否符合90%资本保值要求，提出投资限制建议支持上市筹备',
      '处理美元、日元、韩元等多币种海外应付账款，主要为供应商货款支付，使用花旗银行网银完成跨境付款操作',
    ],
    highlightsEn: [
      'Built AI inquiry system on Coze platform supporting natural language queries (e.g., "inquire about 10M USD three-month dual-currency deposit rates from foreign banks"), integrated QQ email (IMAP retrieval + Outlook auto-forward) to auto-capture bank responses, AI extracts price/tenor/risk level to generate structured tables, efficiency improved by 60%',
      'Developed market intelligence weekly/daily report generation skills covering US/China/Global economy dimensions, auto-filtering based on Momenta focus areas, fully automated Feishu doc creation and distribution to finance team, reducing manual compilation time by 80%',
      'Built three Feishu dashboard boards: fund balance, cash flow monitoring, wealth management products, leveraged Claude Code to develop daily data report automation skills, enabling multi-dimensional monitoring of balance distribution, cash flow forecasting, wealth maturity tracking',
      'Conducted compliance research on US Investment Company Act of 1940, sorted out definitions and conditions for capital preservation investments, assessed whether Momenta\'s wealth structure meets 90% capital preservation requirement, provided investment restriction recommendations for IPO preparation',
      'Handled multi-currency overseas accounts payable in USD, JPY, KRW, primarily for supplier goods payments, used Citibank online banking for cross-border payments',
    ],
    highlightsBold: [0, 1, 2],
    logo: '/logos/momenta.svg',
  },
  {
    company: '中化天津有限公司',
    companyEn: 'Sinochem Tianjin Co., Ltd.',
    role: '产权交易实习生',
    roleEn: 'Asset Transaction Intern',
    period: '2025年8月 - 2025年11月',
    periodEn: 'Aug 2025 - Nov 2025',
    highlights: [
      '参与多个资产处置与破产重整项目，负责现场踏勘与流程合规支持',
      '在"蓝星清洗资产转让"项目中现场带领意向方实地探勘并详细介绍资产，项目最终实现挂牌价50%溢价成交',
      '依据《公司法》《企业破产法》及中国中化内部制度，为"厦门长蓝"破产项目制定完整工作流程',
      '参与中化天津物流"十五五"规划研究，探索利用存量土地厂房建设仓储设施并接入中欧班列',
      '为上海写字楼出售项目提供分析支持，依据国资管理要求梳理低效资产清单并对比区域租金水平',
      '独立撰写3篇项目通讯稿，发布在中化天津官方公众号',
    ],
    highlightsEn: [
      'Participated in multiple asset disposal and bankruptcy restructuring projects, responsible for site inspection and process compliance support',
      'In "Blue Star Cleaning Asset Transfer" project, led potential buyers for on-site inspection and provided detailed asset introduction, project ultimately achieved 50% premium over listing price',
      'Developed complete workflow for "Xiamen Changlan" bankruptcy project according to Company Law, Enterprise Bankruptcy Law, and Sinochem internal regulations',
      'Contributed to Sinochem Tianjin Logistics "15th Five-Year Plan" research, explored utilizing existing land/warehouses for storage facilities and connecting to China-Europe Railway Express',
      'Provided analytical support for Shanghai office building sale project, compiled low-efficiency asset list per state-owned asset management requirements and compared regional rental levels',
      'Independently wrote 3 project newsletters published on Sinochem Tianjin official WeChat account',
    ],
    highlightsBold: [1, 5],
    logo: '/logos/sinochem.svg',
  },
  {
    company: '中科曙光（存储产品事业部）',
    companyEn: 'Sugon (Storage Products Division)',
    role: '项目管理实习生',
    roleEn: 'Project Management Intern',
    period: '2025年3月 - 2025年6月',
    periodEn: 'Mar 2025 - Jun 2025',
    highlights: [
      '管理412d-1230（2025年3月发版）和421SP1（2025年7月发版）两个版本全生命周期，覆盖需求排期、进度跟踪、评审组织、问题闭环',
      '组织87场评审会议（产品需求/技术需求/原型设计/Demo/测试用例），独立主持20+场Bug评审会并主导讨论与责任分配',
      '建立标准化评审登记模板，统一记录问题、责任人、截止时间，减少重复沟通约30-50%',
      '使用Jira搭建项目看板管理需求和缺陷，配置Confluence空间规范文档结构，研发信息检索效率提升40%',
      '完成版本数据统计（需求完成率、代码产出、Bug解决率），开展延期Bug根因分析，主导文档合规审计',
    ],
    highlightsEn: [
      'Managed full lifecycle of versions 412d-1230 (released Mar 2025) and 421SP1 (released Jul 2025), covering requirement scheduling, progress tracking, review coordination, issue closure',
      'Organized 87 review meetings (product requirements/technical requirements/prototype design/Demo/test cases), independently hosted 20+ bug review meetings and led discussions with responsibility assignment',
      'Established standardized review registration template, unified recording of issues, owners, deadlines, reduced repetitive communication by 30-50%',
      'Built project Kanban using Jira for requirement and defect management, configured Confluence spaces for documentation standards, R&D information retrieval efficiency improved by 40%',
      'Completed version data statistics (requirement completion rate, code output, bug resolution rate), conducted root cause analysis of delayed bugs, led documentation compliance audit',
    ],
    highlightsBold: [0, 2, 3],
    logo: '/logos/sugon.svg',
  },
  {
    company: '东吴证券（研究所）',
    companyEn: 'CSC Financial (Research Institute)',
    role: '行业研究实习生（电子设备与新能源）',
    roleEn: 'Industry Research Intern (Electronics & New Energy)',
    period: '2024年10月 - 2025年3月',
    periodEn: 'Oct 2024 - Mar 2025',
    highlights: [
      '深度参与三花智控（汽零）和厦门钨业（钨钼材料）深度报告，搭建DCF与相对估值模型（PE/PEG）',
      '持续跟踪宁德时代、赣锋锂业等锂电池产业链龙头，整理上市公司调研及行业会议纪要20+篇',
      '按月更新正极/负极/隔膜等核心部件产量数据，开展谐波减速器国产厂商（绿的谐波等）参数对比',
      '协助分析覆盖企业毛利率、研发费用率、ROE、资本开支等财务指标，参与定期财务简报撰写',
      '使用Choice/Wind金融终端、Excel财务建模工具，产出研究报告供基金经理参考',
    ],
    highlightsEn: [
      'Deeply involved in in-depth research reports on Sanhua (auto parts) and Xiamen Tungsten (tungsten & molybdenum), built DCF and relative valuation models (PE/PEG)',
      'Continuously tracked lithium battery industry leaders CATL and Ganfeng Lithium, compiled 20+ meeting minutes from listed company visits and industry conferences',
      'Updated monthly production data for cathode/anode/separator components, conducted parameter comparison of domestic harmonic reducer manufacturers (e.g., Leadshine)',
      'Assisted in analyzing financial metrics including gross margin, R&D expense ratio, ROE, capex for covered companies, contributed to regular financial briefing drafts',
      'Utilized Choice/Wind financial terminals and Excel financial modeling tools to produce research reports for fund managers\' reference',
    ],
    highlightsBold: [0, 1],
    logo: '/logos/csc.svg',
  },
];

const projects = [
  {
    title: '股票行业相似度与反转策略研究',
    titleEn: 'Stock Industry Similarity and Reversal Strategy Research',
    subtitle: '基于年报MD&A文本的算法分类与信息扩散效应',
    subtitleEn: 'Algorithmic Classification and Information Diffusion based on Annual MD&A Text',
    tech: ['Python', 'Pandas', 'BERT', 'GLM-4', 'Cosine Similarity', 'Louvain', 'T-test', 'ANOVA'],
    objective: '探索基于MD&A文本相似度的算法行业分类能否更精准捕捉股票间基本面关联，从而改进A股反转策略并识别信息扩散规律。',
    objectiveEn: 'Explore whether algorithm-based industry classification using MD&A text similarity can better capture fundamental connections among stocks, improving A-share reversal strategies and identifying information diffusion patterns.',
    methodology: '研究分为四个部分：(1) Embedding模型比较：对比TF-IDF、BERT、FinBERT、LongBERT、BGE-M3，选取组内/组间分离度最高的模型；(2) Louvain社区检测：基于相似度矩阵构建加权图，使用Louvain算法进行无监督行业分类，与证监会分类对比；(3) 行业反转策略回测：在算法分类与证监会分类下分别构造输家-赢家组合，比较策略表现；(4) Lead-Lag信息扩散分析：验证相似股票间是否存在收益预测关系，构建多空组合。',
    methodologyEn: 'Research comprises four parts: (1) Embedding model comparison: compare TF-IDF, BERT, FinBERT, LongBERT, BGE-M3 to select model with best intra/inter-group separation; (2) Louvain community detection: build weighted graph from similarity matrix, apply Louvain algorithm for unsupervised industry classification, compare with CSRC; (3) Industry reversal strategy backtest: construct loser-winner portfolios under both classification schemes and compare performance; (4) Lead-Lag information diffusion: test whether similar stocks exhibit return predictability, construct long-short portfolios.',
    design: '研究设计采用实证分析框架。使用2012-2024年A股年报MD&A文本，基于选定的Embedding模型计算股票间余弦相似度。通过已知高同质性行业（银行、白酒、新能源车、航空）验证模型有效性。Louvain算法参数通过模块度最大化确定。反转策略形成期与持有期网格为{2,4,6,8}周，评估指标包括年化收益、夏普比率、最大回撤。Lead-Lag分析中，每周识别极端收益领先股，追踪其top-K相似跟随股的未来收益，使用t检验检验显著性。',
    designEn: 'Research design adopts empirical framework. Use 2012-2024 A-share annual MD&A texts to compute pairwise cosine similarities based on selected embedding model. Validate model effectiveness using known homogeneous industries (banking, liquor, NEV, airlines). Louvain parameters optimized via modularity maximization. Reversal strategy formation/holding periods grid: {2,4,6,8} weeks; performance metrics include annualized return, Sharpe ratio, max drawdown. Lead-Lag analysis: weekly identify extreme return leaders, track future returns of top-K similar followers, test significance with t-tests.',
    status: '进行中 (2025年8月 - 至今)',
    statusEn: 'Ongoing (Aug 2025 - Present)',
  },
  {
    title: '投资者情绪指数与期货价格发现',
    titleEn: 'Investor Sentiment Index and Futures Price Discovery',
    subtitle: '基于股吧文本挖掘的高频情绪指数构建',
    subtitleEn: 'Constructing High-Frequency Sentiment Index from Forum Text Mining',
    tech: ['Python', 'Requests', 'BeautifulSoup', 'FDA', 'Text Mining', 'Sentiment Lexicon', 'VAR'],
    objective: '爬取东方财富股吧数据，构建高频投资者情绪指数，检验其对股指期货市场价格发现功能的影响。重点解决高频情绪与低频期货数据的频率不匹配问题。',
    objectiveEn: 'Scrape East Money forum data to construct high-frequency investor sentiment index and test its impact on price discovery of stock index futures. Focus on addressing mixed-frequency issue between high-frequency sentiment and low-frequency futures data.',
    methodology: '每日爬取股吧帖子；采用中文情感词典进行文本情感分析，构建日度情绪指数；运用函数化数据分析(FDA)进行混频融合，将日度情绪转化为周度/月度频率以匹配期货数据；使用VAR模型和脉冲响应函数(IRF)检验情绪对价格发现的动态影响机制。',
    methodologyEn: 'Daily scraping of forum posts; apply Chinese sentiment lexicon for textual analysis to construct daily sentiment index; use Functional Data Analysis (FDA) for mixed-frequency fusion to convert daily sentiment to weekly/monthly frequency matching futures data; employ VAR and Impulse Response Functions to test dynamic impact mechanism.',
    design: '研究设计采用高频数据建模。情绪指数构建流程包括：数据爬取、文本清洗、情感打分、日度聚合。FDA混频方法将日度情绪转化为与期货周度收益率匹配的频率。VAR模型设定为多变量时间序列，包含期货收益率、情绪指数、成交量等变量。脉冲响应函数追踪情绪冲击对价格发现的动态效应。稳健性检验包括不同情感词典、不同 aggregated 频率、不同滞后阶数。',
    designEn: 'Research design employs high-frequency data modeling. Sentiment index construction includes: data scraping, text cleaning, sentiment scoring, daily aggregation. FDA converts daily sentiment to weekly frequency matching futures returns. VAR model includes futures returns, sentiment index, trading volume. IRF tracks dynamic effect of sentiment shock on price discovery. Robustness checks: alternative lexicons, different aggregation frequencies, different lag orders.',
    status: '已结项 (2022年4月 - 2024年4月)',
    statusEn: 'Completed (Apr 2022 - Apr 2024)',
  },
  {
    title: '招商银行数字金融训练营',
    titleEn: 'China Merchants Bank Digital Finance Camp',
    subtitle: '用户行为预测与AI营销智能体',
    subtitleEn: 'User Behavior Prediction and AI Marketing Agent',
    tech: ['Python', 'Pandas', 'Scikit-learn', 'BERT', 'Flask', 'API Design'],
    objective: '开发用户广告点击预测、资讯分类模型以及AI营销智能体，提升招商银行数字金融场景的转化率与用户体验。',
    objectiveEn: 'Develop user ad click prediction, news classification models, and AI marketing agent to boost conversion rates and user experience in CMB digital finance scenarios.',
    methodology: '采用移动窗口训练规避数据泄露；使用BERT-base-chinese对用户咨询文本进行多分类（8类意图识别）；基于Flask搭建轻量级API服务；Pandas进行特征工程与AUC优化。',
    methodologyEn: 'Applied moving window training to prevent data leakage; used BERT-base-chinese for multi-class text classification (8 intent categories); built lightweight API service with Flask; feature engineering and AUC optimization with Pandas.',
    design: '项目采用端到端机器学习工作流。数据预处理包括缺失值处理、文本分词、停用词去除。特征工程使用TF-IDF和BERT嵌入。模型训练采用时间序列交叉验证，移动窗口避免未来信息泄露。API设计遵循RESTful原则，支持实时推理。评估指标包括AUC、准确率、F1-score。',
    designEn: 'Project adopted end-to-end ML workflow. Data preprocessing: missing value handling, tokenization, stopword removal. Feature engineering: TF-IDF and BERT embeddings. Model training used time-series cross-validation with moving window to prevent look-ahead bias. API followed RESTful principles for real-time inference. Evaluation metrics: AUC, accuracy, F1-score.',
    status: '已完成 (2025年7月 - 2025年8月)',
    statusEn: 'Completed (Jul 2025 - Aug 2025)',
  },
];

const skillsData = {
  programming: ['Python', 'SQL', 'VBA'],
  dataTools: ['Pandas', 'NumPy', 'Scikit-learn', 'BERT', 'MySQL', 'Wind/Choice', 'Power BI', 'Jira', 'Confluence'],
  finance: ['财务分析', 'DCF估值', '行业研究', '财务建模', '风险评估', '资产估值'],
  certifications: [
    'CPA：通过会计、财务成本管理、经济法、公司战略与风险管理（4科）',
    '税务师（CTA）：通过财务与会计、税法一、税法二、涉税服务实务（4科）',
    '初级会计专业技术资格证书',
    '基金从业资格证书',
    'CET-6（英语六级）',
  ],
  certificationsEn: [
    'CPA: 4 subjects passed (Accounting, Financial Management, Economic Law, Corporate Strategy & Risk Management)',
    'CTA (Tax Advisor): 4 subjects passed (Financial & Accounting, Tax Law I, Tax Law II, Tax Service Practice)',
    'Junior Accounting Qualification Certificate',
    'Fund Practitioner Certificate',
    'CET-6 (College English Test Band 6)',
  ],
  languages: ['中文（母语）', 'English（CET-6，专业工作语言）'],
};

const skillCategories = [
  { key: 'programming', icon: Code, label: '编程语言' },
  { key: 'dataTools', icon: Database, label: '数据分析工具' },
  { key: 'finance', icon: BarChart3, label: '金融能力' },
];

// ============== HELPER COMPONENTS ==============
function SectionHeading({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-10">
      <div className="w-1 h-7 bg-primary-600 rounded-full" />
      <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{label}</h2>
    </div>
  );
}

// ============== MAIN COMPONENT ==============
export default function Home() {
  const [lang, setLang] = useState<'zh' | 'en'>('zh');
  const [mounted, setMounted] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedProject, setExpandedProject] = useState<number | null>(0);
  const [expandedStarExp, setExpandedStarExp] = useState<number | null>(null);
  const t = translations[lang];

  // Admin mode
  const { isAdmin, get, save, reset, login, logout } = useAdminContent();
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPwInput, setAdminPwInput] = useState('');
  const [adminPwError, setAdminPwError] = useState(false);
  const adminCtx: AdminCtx = { isAdmin, get, save };

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.07 }
    );
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [mounted]);

  const toggleLanguage = () => setLang(lang === 'zh' ? 'en' : 'zh');

  return (
    <AdminContext.Provider value={adminCtx}>
    <div className={`min-h-screen bg-white selection:bg-primary-200 selection:text-primary-900${isAdmin ? ' admin-mode' : ''}`} style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>

      {/* ── Navigation ── */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <a href="#" className="flex items-center gap-2.5 hover:opacity-80 transition">
              <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-md">KG</div>
              <span className="font-semibold text-gray-900 tracking-tight">Kris Gu</span>
            </a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-7">
              {(['about', 'experience', 'projects', 'skills', 'contact'] as const).map(item => (
                <a key={item} href={`#${item}`} className="text-gray-600 hover:text-primary-600 text-sm font-medium transition-colors relative group">
                  {t.nav[item]}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all group-hover:w-full" />
                </a>
              ))}
              <button
                onClick={() => setIsExportModalOpen(true)}
                className="flex items-center gap-1.5 bg-primary-50 text-primary-700 hover:bg-primary-100 border border-primary-200 px-4 py-2 rounded-full text-sm font-medium transition hover:shadow-sm"
              >
                <Download size={15} />
                <span>{lang === 'zh' ? '导出简历' : 'Resume'}</span>
              </button>
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 text-gray-500 hover:text-primary-600 border border-gray-200 px-3 py-1.5 rounded-full text-xs font-medium transition hover:border-primary-400"
              >
                <Globe size={13} />
                <span>{lang === 'en' ? '中文' : 'EN'}</span>
              </button>
              <button
                onClick={() => isAdmin ? logout() : setShowAdminLogin(true)}
                title={isAdmin ? '退出管理模式' : '管理员登录'}
                className={`p-1.5 rounded-full transition ${isAdmin ? 'text-amber-600 bg-amber-100 hover:bg-amber-200' : 'text-gray-300 hover:text-gray-500'}`}
              >
                <Lock size={13} />
              </button>
            </div>

            {/* Mobile controls */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1 text-gray-500 border border-gray-200 px-2.5 py-1.5 rounded-full text-xs font-medium"
              >
                <Globe size={12} />
                {lang === 'en' ? '中文' : 'EN'}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-600 hover:text-primary-600 transition"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-6 pt-4 pb-5">
            <div className="space-y-1 mb-4">
              {(['about', 'experience', 'projects', 'skills', 'contact'] as const).map(item => (
                <a
                  key={item}
                  href={`#${item}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2.5 px-2 text-gray-700 font-medium rounded-lg hover:bg-gray-50 hover:text-primary-600 transition-colors"
                >
                  {t.nav[item]}
                </a>
              ))}
            </div>
            <button
              onClick={() => { setIsExportModalOpen(true); setMobileMenuOpen(false); }}
              className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-primary-700 transition"
            >
              <Download size={16} />
              {lang === 'zh' ? '导出简历' : 'Export Resume'}
            </button>
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section className="pt-28 pb-20 px-6 relative overflow-hidden bg-white">
        {/* Dot-grid background decoration */}
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        {/* Fade to white at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent" />
        {/* Soft radial glow top-left */}
        <div className="absolute top-0 left-0 w-[600px] h-[400px] bg-gradient-to-br from-primary-50/70 to-transparent rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto relative">
          <div className="flex flex-col md:flex-row gap-14 items-center">
            {/* Left content */}
            <div className="flex-1 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full text-xs font-medium border border-primary-100">
                <span className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
                {lang === 'zh' ? '欢迎访问我的个人主页' : 'Welcome to my portfolio'}
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
                <E id={`hero.${lang}.title`} def={t.hero.title} />
              </h1>
              <h2 className="text-xl md:text-2xl text-primary-600 font-medium leading-relaxed">
                <E id={`hero.${lang}.subtitle`} def={t.hero.subtitle} />
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed max-w-lg">
                <E id={`hero.${lang}.description`} def={t.hero.description} />
              </p>

              {/* Quick-stat chips */}
              <div className="flex flex-wrap gap-2.5 pt-1">
                {[
                  lang === 'zh' ? '4段实习经历' : '4 Internships',
                  lang === 'zh' ? 'CPA 4科通过' : 'CPA 4 Subjects',
                  lang === 'zh' ? '3个研究项目' : '3 Research Projects',
                ].map((chip, i) => (
                  <span key={i} className="text-sm text-gray-600 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg font-medium">
                    {chip}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 pt-1">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl hover:bg-primary-700 transition shadow-md hover:shadow-lg hover:-translate-y-0.5 transform duration-200 font-medium"
                >
                  <Mail size={18} />
                  {t.hero.contact}
                </a>
                <a
                  href="https://github.com/gu1209"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:border-primary-400 hover:text-primary-600 transition font-medium"
                >
                  <Github size={18} />
                  GitHub
                </a>
              </div>
            </div>

            {/* Right: profile photo */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-72 h-72 md:w-80 md:h-80 rounded-2xl overflow-hidden border border-gray-200 shadow-2xl">
                  <img src="/images/profile.jpg" alt="Kris Gu" className="w-full h-full object-cover" />
                </div>
                {/* Status badge */}
                <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                      {lang === 'zh' ? '开放工作机会' : 'Open to opportunities'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── About & Education ── */}
      <section id="about" className="py-20 px-6 scroll-mt-24 bg-gray-50/50">
        <div className="max-w-4xl mx-auto">
          <SectionHeading label={t.about.title} />
          <div className="space-y-6">
            {/* Intro card */}
            <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm animate-on-scroll">
              <E id={`about.${lang}.intro`} def={t.about.intro} as="p" cls="text-gray-700 leading-relaxed mb-4" />
              <div className="flex items-start gap-3 bg-primary-50 border border-primary-100 rounded-xl px-4 py-3">
                <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary-500" />
                <E id={`about.${lang}.strengths`} def={t.about.strengths} as="p" cls="text-primary-800 text-sm font-medium leading-relaxed" />
              </div>
            </div>

            {/* Education cards */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4 px-1">{t.about.education}</p>
              <div className="grid md:grid-cols-2 gap-5">
                {/* Master's */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition animate-on-scroll" style={{ transitionDelay: '60ms' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl flex items-center justify-center border border-primary-100 p-1.5">
                      <img
                        src="/logos/tju_logo.svg"
                        alt="TJU"
                        className="w-full h-full object-contain"
                        onError={e => { e.currentTarget.style.display = 'none'; (e.currentTarget.nextElementSibling as HTMLElement | null)!.style.display = 'flex'; }}
                      />
                      <div className="hidden w-full h-full items-center justify-center text-primary-700 font-bold text-xs">TJU</div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm">{t.about.university}</h3>
                      <p className="text-xs text-primary-600 mt-0.5">{t.about.faculty}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-gray-900">{t.about.degree}</p>
                    <p className="text-gray-500 leading-relaxed">{t.about.major}</p>
                    <p className="text-gray-400 text-xs">{t.about.period}</p>
                  </div>
                </div>

                {/* Bachelor's */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition animate-on-scroll" style={{ transitionDelay: '120ms' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl flex items-center justify-center border border-primary-100 p-1.5">
                      <img
                        src="/logos/cumt_logo.svg"
                        alt="CUMT"
                        className="w-full h-full object-contain"
                        onError={e => { e.currentTarget.style.display = 'none'; (e.currentTarget.nextElementSibling as HTMLElement | null)!.style.display = 'flex'; }}
                      />
                      <div className="hidden w-full h-full items-center justify-center text-primary-700 font-bold text-xs">CUMT</div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm">{t.about.bachelorUniv}</h3>
                      <p className="text-xs text-primary-600 mt-0.5">{t.about.bachelorFaculty}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-gray-900">{t.about.bachelor}</p>
                    <p className="text-gray-500 leading-relaxed">{t.about.bachelorMajor}</p>
                    <p className="text-gray-400 text-xs">{t.about.bachelorPeriod}</p>
                    <p className="text-gray-400 text-xs">{t.about.bachelorGpa}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Experience — Timeline ── */}
      <section id="experience" className="py-20 px-6 scroll-mt-24">
        <div className="max-w-4xl mx-auto">
          <SectionHeading label={t.experience.title} />

          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-5 top-5 bottom-5 w-px bg-gradient-to-b from-primary-400 via-primary-200 to-primary-50 hidden md:block" />

            <div className="space-y-5">
              {experiences.map((exp, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-5 animate-on-scroll"
                  style={{ transitionDelay: `${idx * 60}ms` }}
                >
                  {/* Timeline node — logo circle on the line */}
                  <div className="hidden md:flex flex-shrink-0 w-10 h-10 rounded-xl bg-white border-2 border-primary-200 shadow-sm items-center justify-center p-1.5 relative z-10 mt-4">
                    {exp.logo && (
                      <img
                        src={exp.logo}
                        alt={exp.company}
                        className="w-full h-full object-contain"
                        onError={e => { e.currentTarget.style.display = 'none'; }}
                      />
                    )}
                  </div>

                  {/* Card */}
                  <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary-100 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-5">
                      <div className="flex items-center gap-3">
                        {/* Mobile logo */}
                        <div className="flex md:hidden w-10 h-10 rounded-xl bg-white border border-gray-100 shadow-sm items-center justify-center p-1.5 flex-shrink-0">
                          {exp.logo && (
                            <img
                              src={exp.logo}
                              alt={exp.company}
                              className="w-full h-full object-contain"
                              onError={e => { e.currentTarget.style.display = 'none'; }}
                            />
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg leading-tight">
                            <E id={`exp.${idx}.${lang === 'en' ? 'companyEn' : 'company'}`} def={lang === 'en' ? exp.companyEn : exp.company} />
                          </h3>
                          <p className="text-primary-600 font-medium text-sm mt-0.5">
                            <E id={`exp.${idx}.${lang === 'en' ? 'roleEn' : 'role'}`} def={lang === 'en' ? exp.roleEn : exp.role} />
                          </p>
                        </div>
                      </div>
                      <span className="bg-gray-50 text-gray-500 px-3 py-1.5 rounded-full text-xs font-medium border border-gray-200 whitespace-nowrap self-start">
                        <E id={`exp.${idx}.${lang === 'en' ? 'periodEn' : 'period'}`} def={lang === 'en' ? exp.periodEn : exp.period} />
                      </span>
                    </div>

                    <ul className="space-y-2.5">
                      {(lang === 'en' ? exp.highlightsEn : exp.highlights).map((highlight, i) => (
                        <li
                          key={i}
                          className={`flex items-start gap-2.5 text-sm leading-relaxed ${
                            exp.highlightsBold?.includes(i) ? 'font-medium text-gray-800' : 'text-gray-600'
                          }`}
                        >
                          <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary-400" />
                          <E id={`exp.${idx}.h.${lang}.${i}`} def={highlight} />
                        </li>
                      ))}
                    </ul>

                    {/* STAR detail toggle */}
                    {STAR_DATA[exp.company] && (
                      <div className="mt-4">
                        <button
                          onClick={() => setExpandedStarExp(expandedStarExp === idx ? null : idx)}
                          className="flex items-center gap-1.5 text-xs font-medium text-primary-600 hover:text-primary-700 border border-primary-200 hover:border-primary-400 bg-primary-50 hover:bg-primary-100 px-3 py-1.5 rounded-full transition-all"
                        >
                          <Sparkles size={12} />
                          {expandedStarExp === idx
                            ? (lang === 'zh' ? '收起 STAR 详情' : 'Hide STAR Details')
                            : (lang === 'zh' ? '查看 STAR 详情' : 'View STAR Details')}
                          <ChevronDown size={12} className={`transition-transform duration-200 ${expandedStarExp === idx ? 'rotate-180' : ''}`} />
                        </button>

                        {expandedStarExp === idx && (
                          <div className="mt-3 space-y-4 border-t border-primary-100 pt-4 accordion-body">
                            {STAR_DATA[exp.company].map((entry, ei) => (
                              <div key={ei} className="bg-primary-50/50 rounded-xl p-4 border border-primary-100">
                                <p className="text-sm font-semibold text-primary-800 mb-3">
                                  {lang === 'zh' ? entry.title : entry.titleEn}
                                </p>
                                <div className="space-y-2">
                                  {[
                                    { label: 'S', labelFull: lang === 'zh' ? '情境' : 'Situation', content: lang === 'zh' ? entry.s : entry.sEn, color: 'bg-blue-100 text-blue-700' },
                                    { label: 'T', labelFull: lang === 'zh' ? '任务' : 'Task', content: lang === 'zh' ? entry.t : entry.tEn, color: 'bg-purple-100 text-purple-700' },
                                    { label: 'A', labelFull: lang === 'zh' ? '行动' : 'Action', content: lang === 'zh' ? entry.a : entry.aEn, color: 'bg-amber-100 text-amber-700' },
                                    { label: 'R', labelFull: lang === 'zh' ? '结果' : 'Result', content: lang === 'zh' ? entry.r : entry.rEn, color: 'bg-green-100 text-green-700' },
                                  ].map(({ label, labelFull, content, color }) => (
                                    <div key={label} className="flex items-start gap-2.5">
                                      <span className={`flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${color}`}>
                                        {label}
                                      </span>
                                      <div className="flex-1 min-w-0">
                                        <span className="text-xs font-semibold text-gray-500 mr-1.5">{labelFull}</span>
                                        <span className="text-sm text-gray-700 leading-relaxed">{content}</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Projects — Accordion ── */}
      <section id="projects" className="py-20 px-6 scroll-mt-24 bg-gray-50/50">
        <div className="max-w-4xl mx-auto">
          <SectionHeading label={t.projects.title} />
          <div className="space-y-3">
            {projects.map((project, idx) => {
              const isExpanded = expandedProject === idx;
              const title = lang === 'en' ? project.titleEn : project.title;
              const subtitle = lang === 'en' ? project.subtitleEn : project.subtitle;
              const status = lang === 'en' ? project.statusEn : project.status;
              const isOngoing = status.includes('进行') || status.includes('Ongoing');

              return (
                <div
                  key={idx}
                  className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all duration-200 animate-on-scroll ${
                    isExpanded ? 'border-primary-200 shadow-md' : 'border-gray-100 hover:border-gray-200 hover:shadow-md'
                  }`}
                  style={{ transitionDelay: `${idx * 70}ms` }}
                >
                  {/* Header — always visible, click to expand */}
                  <button
                    className="w-full text-left p-6 flex items-start gap-4 hover:bg-gray-50/60 transition-colors"
                    onClick={() => setExpandedProject(isExpanded ? null : idx)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2.5">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                          isOngoing
                            ? 'bg-green-50 text-green-700 border-green-200'
                            : 'bg-gray-50 text-gray-500 border-gray-200'
                        }`}>
                          {status}
                        </span>
                        <span className="text-xs text-gray-300 font-mono tracking-wider">0{idx + 1}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1 leading-snug">
                        <E id={`proj.${idx}.${lang === 'en' ? 'titleEn' : 'title'}`} def={title} />
                      </h3>
                      <p className="text-primary-600/80 text-sm mb-3">
                        <E id={`proj.${idx}.${lang === 'en' ? 'subtitleEn' : 'subtitle'}`} def={subtitle} />
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech.map((tech: string, i: number) => (
                          <span
                            key={i}
                            className="text-xs bg-primary-50 text-primary-700 px-2.5 py-1 rounded-full font-medium border border-primary-100"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ChevronDown
                      size={20}
                      className={`flex-shrink-0 mt-1 text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {/* Expanded content */}
                  {isExpanded && (
                    <div className="border-t border-gray-100 px-6 pb-6 pt-5 accordion-body">
                      <div className="grid md:grid-cols-3 gap-5">
                        {[
                          { label: t.projects.objective, key: lang === 'en' ? 'objectiveEn' : 'objective', content: lang === 'en' ? project.objectiveEn : project.objective },
                          { label: t.projects.methodology, key: lang === 'en' ? 'methodologyEn' : 'methodology', content: lang === 'en' ? project.methodologyEn : project.methodology },
                          { label: t.projects.design, key: lang === 'en' ? 'designEn' : 'design', content: lang === 'en' ? project.designEn : project.design },
                        ].map(({ label, content, key: contentKey }) => (
                          <div key={label}>
                            <h4 className="font-semibold text-gray-800 text-sm mb-2.5 flex items-center gap-1.5">
                              <span className="w-1 h-3.5 bg-primary-500 rounded-full flex-shrink-0" />
                              {label}
                            </h4>
                            <E id={`proj.${idx}.${contentKey}`} def={content} as="p" cls="text-gray-600 text-sm leading-relaxed" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills" className="py-20 px-6 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <SectionHeading label={t.skills.title} />

          {/* 3-column skill categories */}
          <div className="grid md:grid-cols-3 gap-5 mb-5">
            {skillCategories.map((cat, i) => (
              <div
                key={cat.key}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition animate-on-scroll"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <cat.icon className="text-primary-600" size={20} />
                  <h3 className="font-semibold text-gray-900 text-sm">{t.skills[cat.key as keyof typeof t.skills]}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(skillsData[cat.key as keyof typeof skillsData] as string[]).map((skill, j) => (
                    <span
                      key={j}
                      className="bg-gray-50 px-3 py-1.5 rounded-lg text-gray-700 text-xs font-medium border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition cursor-default"
                    >
                      <E id={`skill.${cat.key}.${j}`} def={skill} />
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition mb-5 animate-on-scroll">
            <div className="flex items-center gap-2.5 mb-4">
              <Award className="text-primary-600" size={20} />
              <h3 className="font-semibold text-gray-900 text-sm">{t.skills.certifications}</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {(lang === 'zh' ? skillsData.certifications : skillsData.certificationsEn).map((cert, i) => (
                <div key={i} className="flex items-start gap-2.5 bg-gray-50 px-4 py-3 rounded-xl border border-gray-100">
                  <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary-400" />
                  <E id={`cert.${lang}.${i}`} def={cert} cls="text-gray-700 text-sm leading-relaxed" />
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition animate-on-scroll">
            <div className="flex items-center gap-2.5 mb-4">
              <Languages className="text-primary-600" size={20} />
              <h3 className="font-semibold text-gray-900 text-sm">{t.skills.languages}</h3>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {skillsData.languages.map((langItem, i) => (
                <span key={i} className="bg-gray-50 px-4 py-2.5 rounded-xl text-gray-700 text-sm border border-gray-200 font-medium">
                  <E id={`lang.item.${i}`} def={langItem} />
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-20 px-6 bg-gradient-to-br from-primary-600 to-primary-800 text-white scroll-mt-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">{t.contact.title}</h2>
          <p className="text-primary-100 mb-12 max-w-xl mx-auto leading-relaxed">
            <E id={`contact.${lang}.message`} def={t.contact.message} />
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <a
              href="mailto:gujie_kris@163.com"
              className="bg-white/10 backdrop-blur-sm p-7 rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-[1.03] transition-all duration-200"
            >
              <Mail className="mx-auto mb-3" size={28} />
              <h3 className="font-semibold mb-1">{t.contact.email}</h3>
              <p className="text-primary-100 text-sm">gujie_kris@163.com</p>
            </a>
            <a
              href="https://github.com/gu1209"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-sm p-7 rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-[1.03] transition-all duration-200"
            >
              <Github className="mx-auto mb-3" size={28} />
              <h3 className="font-semibold mb-1">{t.contact.github}</h3>
              <p className="text-primary-100 text-sm">gu1209</p>
            </a>
            <a
              href="tel:+8619292244363"
              className="bg-white/10 backdrop-blur-sm p-7 rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-[1.03] transition-all duration-200"
            >
              <Phone className="mx-auto mb-3" size={28} />
              <h3 className="font-semibold mb-1">{t.contact.phone}</h3>
              <p className="text-primary-100 text-sm">+86 192 9224 4363</p>
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-gray-950 text-white py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center text-white text-sm font-bold">KG</div>
            <span className="font-medium">Kris Gu</span>
          </div>
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} · Built with Next.js & Tailwind CSS</p>
        </div>
      </footer>

      <ResumeExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        experiences={experiences}
        projects={projects}
        lang={lang}
      />

      {/* Admin login dialog */}
      {showAdminLogin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[200]">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-80">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Lock size={16} /> 管理员登录</h3>
            <input
              type="password" value={adminPwInput}
              onChange={e => { setAdminPwInput(e.target.value); setAdminPwError(false); }}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  if (login(adminPwInput)) { setShowAdminLogin(false); setAdminPwInput(''); }
                  else { setAdminPwError(true); setAdminPwInput(''); }
                }
              }}
              autoFocus placeholder="密码"
              className={`w-full border rounded-xl px-3 py-2 text-sm mb-3 focus:outline-none ${adminPwError ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-primary-400'}`}
            />
            {adminPwError && <p className="text-xs text-red-500 mb-2">密码错误</p>}
            <div className="flex gap-2">
              <button
                onClick={() => { if (login(adminPwInput)) { setShowAdminLogin(false); setAdminPwInput(''); } else { setAdminPwError(true); setAdminPwInput(''); } }}
                className="flex-1 bg-primary-600 text-white py-2 rounded-xl text-sm font-medium hover:bg-primary-700 transition"
              >进入</button>
              <button onClick={() => { setShowAdminLogin(false); setAdminPwInput(''); setAdminPwError(false); }} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl text-sm transition">取消</button>
            </div>
          </div>
        </div>
      )}

      {/* Admin mode banner */}
      {isAdmin && (
        <div className="fixed bottom-0 left-0 right-0 z-[150] bg-amber-400 text-amber-900 px-6 py-2.5 flex items-center justify-between shadow-xl">
          <span className="text-sm font-semibold">⚙ 管理员编辑模式 — 点击任意高亮文字即可编辑，失焦自动保存到 localStorage</span>
          <div className="flex items-center gap-3">
            <button onClick={reset} className="flex items-center gap-1 text-xs font-medium underline hover:no-underline">
              <RotateCcw size={12} /> 重置所有修改
            </button>
            <button onClick={logout} className="flex items-center gap-1.5 bg-amber-900 text-amber-100 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-amber-800 transition">
              <LogOut size={12} /> 退出
            </button>
          </div>
        </div>
      )}
    </div>
    </AdminContext.Provider>
  );
}
