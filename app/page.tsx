'use client';

import { useState, useEffect } from 'react';
import { Mail, Github, Phone, Award, Briefcase, Code, Database, BarChart3, Languages, Globe, GraduationCap, Building2, BookOpen } from 'lucide-react';

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
      '基于Coze平台搭建智能询价与市场资讯自动化工作流，实现月报生成效率提升60%',
      '设计Agent架构自动提取银行简讯关键词，结合网络搜索生成周度市场报告',
      '从零搭建资金、流水、银行账户三大可视化看板，支持实时数据监控',
      '支持理财产品（1940ACT，基于美国1940年投资公司法案）上市研究，完成竞品分析与估值模型',
      '操作Oracle ERP完成资金支付、应付账款核销、跨境汇款等全流程财务操作',
    ],
    highlightsEn: [
      'Built AI workflows on Coze platform for intelligent inquiries and market intelligence, improving monthly report generation efficiency by 60%',
      'Designed Agent architecture to extract keywords from bank briefings, generating weekly market reports via web search integration',
      'Developed three dashboards from scratch: fund tracking, cash flow, and bank account monitoring with real-time data',
      'Supported wealth management product (1940ACT, based on US Investment Company Act of 1940) launch research, completed competitive analysis and valuation modeling',
      'Performed full-cycle financial operations in Oracle ERP: payment processing, AP reconciliation, international remittances',
    ],
    highlightsBold: [0, 1, 2],
    logo: '/logos/momenta.svg', // Placeholder - add actual logo
  },
  {
    company: '中化天津有限公司',
    companyEn: 'Sinochem Tianjin Co., Ltd.',
    role: '产权交易实习生',
    roleEn: 'Asset Transaction Intern',
    period: '2025年8月 - 2025年11月',
    periodEn: 'Aug 2025 - Nov 2025',
    highlights: [
      '参与多个资产处置与破产重整项目，协助交易结构设计与尽职调查报告',
      '主笔"蓝星清洗资产转让"项目方案，通过精准市场定位实现成交溢价超50%',
      '负责中化天津物流"十五五"规划编制，完成资产证券化可行性论证',
      '撰写福建华橡等重点项目宣传文案，提升企业品牌曝光度',
    ],
    highlightsEn: [
      'Participated in multiple asset disposal and bankruptcy restructuring projects, assisted in deal structuring and due diligence',
      'Authored "Blue Star Cleaning Asset Transfer" project plan, achieving over 50% premium through strategic positioning',
      'Led Sinochem Tianjin Logistics "15th Five-Year Plan", completed asset securitization feasibility study',
      'Wrote press releases for key projects like "Fujian Huaxiang", enhancing corporate brand visibility',
    ],
    highlightsBold: [1],
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
      '参与412d-1230、421SP1两个版本全生命周期管理，覆盖需求追踪到版本发布',
      '协调87场评审会议（需求/设计/测试），主持20+场缺陷评审，推动高优先级Bug闭环率提升15%',
      '建立共享文档标准化评审流程，实现信息透明化，减少重复沟通约30%',
      '使用Jira+禅道+Confluence构建项目管理信息系统，打通需求-缺陷-知识全链路',
    ],
    highlightsEn: [
      'Managed full lifecycle of versions 412d-1230 and 421SP1, covering requirement tracking to release',
      'Coordinated 87 review meetings (requirements/design/test), hosted 20+ defect reviews, improved high-priority bug closure by 15%',
      'Established shared documentation for standardized review process, increased transparency and reduced redundant communication by ~30%',
      'Built PM information system using Jira/Changelog/Confluence, connecting requirements-defects-knowledge end-to-end',
    ],
    highlightsBold: [2, 3],
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
      '深度覆盖三花智控、厦门钨业等标的，搭建DCF/PB/PE多维度估值模型',
      '持续跟踪宁德时代、赣锋锂业等产业链龙头企业，产出会议纪要20+篇、深度报告5篇',
      '按月更新正极/负极/隔膜等核心部件产量数据，构建行业数据库',
      '分析覆盖公司财务指标，重点监控毛利率、研发费用率、资本开支等变化趋势',
    ],
    highlightsEn: [
      'Conducted in-depth research on Sanhua and Xiamen Tungsten, built DCF/PB/PE multi-method valuation models',
      'Continuously tracked industry leaders CATL and Ganfeng Lithium, produced 20+ meeting minutes and 5 research reports',
      'Compiled monthly production data for cathode/anode/separator components, established industry database',
      'Analyzed financial metrics of covered companies, focusing on gross margin, R&D expense ratio, capex trends',
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

// Skill categories for grid layout
const skillCategories = [
  { key: 'programming', icon: Code, label: '编程语言' },
  { key: 'dataTools', icon: Database, label: '数据分析工具' },
  { key: 'finance', icon: BarChart3, label: '金融能力' },
];

export default function Home() {
  const [lang, setLang] = useState<'zh' | 'en'>('zh');
  const [mounted, setMounted] = useState(false);
  const t = translations[lang];

  useEffect(() => { setMounted(true); }, []);

  const toggleLanguage = () => { setLang(lang === 'zh' ? 'en' : 'zh'); };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-white selection:bg-primary-200 selection:text-primary-900" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-200/50 shadow-sm transition-all duration-300">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <a href="#" className="text-xl font-bold text-gray-900 flex items-center gap-2 hover:opacity-80 transition">
              <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-md">KG</div>
              <span className="font-semibold tracking-tight">Kris Gu</span>
            </a>
            <div className="hidden md:flex items-center gap-8">
              {['about', 'experience', 'projects', 'skills', 'contact'].map((item) => (
                <a key={item} href={`#${item}`} className="text-gray-600 hover:text-primary-600 text-sm font-medium transition-colors relative group">
                  {t.nav[item as keyof typeof t.nav]}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all group-hover:w-full"></span>
                </a>
              ))}
              <button onClick={toggleLanguage} className="flex items-center gap-1.5 text-gray-600 hover:text-primary-600 border border-gray-300 px-3 py-1.5 rounded-full text-xs font-medium transition hover:border-primary-400 hover:shadow-sm">
                <Globe size={14} />
                <span>{lang === 'en' ? '中文' : 'EN'}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-primary-50 via-white to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent)]"></div>
        <div className="max-w-6xl mx-auto relative">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="flex-1 space-y-6">
              <div className="inline-block px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium mb-2 border border-primary-100">
                {lang === 'zh' ? '欢迎访问我的个人主页' : 'Welcome to my portfolio'}
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
                {t.hero.title}
              </h1>
              <h2 className="text-xl md:text-2xl text-primary-600 font-medium leading-relaxed">
                {t.hero.subtitle}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed max-w-lg">
                {t.hero.description}
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <a href="#contact" className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl hover:bg-primary-700 transition shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform duration-200 font-medium">
                  <Mail size={20} />
                  {t.contact.title}
                </a>
                <a href="https://github.com/gu1209" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:border-primary-500 hover:text-primary-600 transition hover:shadow-md font-medium">
                  <Github size={20} />
                  GitHub
                </a>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative group">
                <div className="w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-gradient-to-br from-primary-400 to-primary-700 group-hover:scale-105 transition-transform duration-500">
                  <img
                    src="/images/profile.jpg"
                    alt="Kris Gu"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const fallback = e.currentTarget.nextElementSibling as HTMLElement | null;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full flex items-center justify-center text-white text-center p-4 bg-gradient-to-br from-primary-400 to-primary-700" style={{ display: 'none' }}>
                    <div>
                      <div className="text-8xl font-bold mb-2">KG</div>
                      <div className="text-sm opacity-80">Photo</div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-5 border border-gray-100 hover:shadow-2xl transition-shadow">
                  <div className="flex items-center gap-2.5">
                    <div className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">{lang === 'zh' ? '开放工作机会' : 'Open to opportunities'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About & Education Section - Vertical Layout */}
      <section id="about" className="py-20 px-6 scroll-mt-24">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-1.5 h-8 bg-primary-600 rounded-full"></div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{t.about.title}</h2>
          </div>
          
          <div className="space-y-10">
            {/* Intro */}
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed text-lg">{t.about.intro}</p>
              <p className="text-gray-700 leading-relaxed text-lg">{t.about.strengths}</p>
            </div>

            {/* Education Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Master's */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center">
                    <img src="/logos/tju_logo.png" alt="TJU" className="w-8 h-8 object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling.style.display = 'block'; }} />
                    <div className="text-primary-700 font-bold text-sm" style={{ display: 'none' }}>TJU</div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{t.about.university}</h3>
                    <p className="text-sm text-primary-600">{t.about.faculty}</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <p className="font-semibold text-gray-900">{t.about.degree}</p>
                  <p className="text-gray-600">{t.about.major}</p>
                  <p className="text-gray-500">{t.about.period}</p>
                </div>
              </div>

              {/* Bachelor's */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center">
                    <img src="/logos/cumt_logo.png" alt="CUMT" className="w-8 h-8 object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling.style.display = 'block'; }} />
                    <div className="text-primary-700 font-bold text-sm" style={{ display: 'none' }}>CUMT</div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{t.about.bachelorUniv}</h3>
                    <p className="text-sm text-primary-600">{t.about.bachelorFaculty}</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <p className="font-semibold text-gray-900">{t.about.bachelor}</p>
                  <p className="text-gray-600">{t.about.bachelorMajor}</p>
                  <p className="text-gray-500">{t.about.bachelorPeriod}</p>
                  <p className="text-xs text-gray-400">{t.about.bachelorGpa}</p>
                </div>
              </div>
            </div>

            {/* Certifications Preview */}
            <div className="bg-gradient-to-r from-primary-50 to-blue-50 p-6 rounded-2xl border border-primary-100/50">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2 text-lg">
                <Award className="text-primary-600" size={22} />
                {t.skills.certifications}
              </h3>
              <ul className="grid md:grid-cols-2 gap-3">
                {skillsData.certifications.slice(0, 4).map((cert, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 leading-relaxed text-sm">{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6 bg-gradient-to-b from-gray-50/50 to-white scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-1.5 h-8 bg-primary-600 rounded-full"></div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{t.experience.title}</h2>
          </div>
          <div className="space-y-6">
            {experiences.map((exp, idx) => (
              <div key={idx} className="group bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-primary-100 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary-500 to-primary-700"></div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                  <div className="flex items-center gap-4">
                    {exp.logo && (
                      <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center p-2">
                        <img src={exp.logo} alt={exp.company} className="w-8 h-8 object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold text-gray-900">{lang === 'en' ? exp.companyEn : exp.company}</h3>
                      </div>
                      <p className="text-primary-600 font-medium text-lg">{lang === 'en' ? exp.roleEn : exp.role}</p>
                    </div>
                  </div>
                  <span className="bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-medium border border-primary-100 whitespace-nowrap">
                    {lang === 'en' ? exp.periodEn : exp.period}
                  </span>
                </div>
                <ul className="space-y-3">
                  {(lang === 'en' ? exp.highlightsEn : exp.highlights).map((highlight, i) => (
                    <li key={i} className={`flex items-start gap-3 ${exp.highlightsBold?.includes(i) ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0 group-hover:scale-150 transition-transform"></div>
                      <span className="leading-relaxed">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-1.5 h-8 bg-primary-600 rounded-full"></div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{t.projects.title}</h2>
          </div>
          <div className="space-y-12">
            {projects.map((project, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-primary-100 transition-all duration-300">
                <div className="mb-6">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2.5 py-1 rounded-full border border-primary-100">
                      {lang === 'en' ? project.statusEn : project.status}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{lang === 'en' ? project.titleEn : project.title}</h3>
                  <p className="text-primary-600/80 mb-4">{lang === 'en' ? project.subtitleEn : project.subtitle}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, i) => (
                      <span key={i} className="text-xs bg-gradient-to-r from-primary-50 to-blue-50 text-primary-700 px-3 py-1.5 rounded-full font-medium border border-primary-100">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <div className="w-1 h-4 bg-primary-600 rounded"></div>
                        {t.projects.objective}
                      </h4>
                      <p className="text-gray-600 leading-relaxed text-sm">{lang === 'en' ? project.objectiveEn : project.objective}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <div className="w-1 h-4 bg-primary-600 rounded"></div>
                        {t.projects.methodology}
                      </h4>
                      <p className="text-gray-600 leading-relaxed text-sm">{lang === 'en' ? project.methodologyEn : project.methodology}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <div className="w-1 h-4 bg-primary-600 rounded"></div>
                        {t.projects.design}
                      </h4>
                      <p className="text-gray-600 leading-relaxed text-sm">{lang === 'en' ? project.designEn : project.design}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section - New Layout */}
      <section id="skills" className="py-20 px-6 bg-gradient-to-b from-gray-50/30 to-white scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-1.5 h-8 bg-primary-600 rounded-full"></div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{t.skills.title}</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {skillCategories.map((cat) => (
              <div key={cat.key} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition">
                <div className="flex items-center gap-3 mb-4">
                  <cat.icon className="text-primary-600" size={24} />
                  <h3 className="text-lg font-semibold text-gray-900">{t.skills[cat.key as keyof typeof t.skills]}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skillsData[cat.key as keyof typeof skillsData].map((skill, i) => (
                    <span key={i} className="bg-gray-50 px-4 py-2 rounded-lg text-gray-700 text-sm border border-gray-200 hover:border-primary-300 transition hover:bg-primary-50">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Certifications - List Layout */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition">
            <div className="flex items-center gap-3 mb-4">
              <Award className="text-primary-600" size={24} />
              <h3 className="text-lg font-semibold text-gray-900">{t.skills.certifications}</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-3">
                {(lang === 'zh' ? skillsData.certifications : skillsData.certificationsEn).slice(0, 3).map((cert, i) => (
                  <li key={i} className="flex items-start gap-2.5 bg-gray-50 px-4 py-3 rounded-xl text-gray-700 text-sm border border-gray-200/60">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
              <ul className="space-y-3">
                {(lang === 'zh' ? skillsData.certifications : skillsData.certificationsEn).slice(3).map((cert, i) => (
                  <li key={i} className="flex items-start gap-2.5 bg-gray-50 px-4 py-3 rounded-xl text-gray-700 text-sm border border-gray-200/60">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Languages */}
          <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition">
            <div className="flex items-center gap-3 mb-4">
              <Languages className="text-primary-600" size={24} />
              <h3 className="text-lg font-semibold text-gray-900">{t.skills.languages}</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {skillsData.languages.map((langItem, i) => (
                <span key={i} className="bg-gray-50 px-4 py-2 rounded-lg text-gray-700 text-sm border border-gray-200">
                  {langItem}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-gradient-to-br from-primary-600 to-primary-800 text-white scroll-mt-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">{t.contact.title}</h2>
          <p className="text-primary-100 mb-12 max-w-2xl mx-auto text-lg leading-relaxed">
            {t.contact.message}
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <a href="mailto:gujie_kris@163.com" className="group bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300">
              <Mail className="mx-auto mb-4" size={32} />
              <h3 className="font-semibold mb-2 text-lg">{t.contact.email}</h3>
              <p className="text-primary-100 text-sm">gujie_kris@163.com</p>
            </a>
            <a href="https://github.com/gu1209" target="_blank" rel="noopener noreferrer" className="group bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300">
              <Github className="mx-auto mb-4" size={32} />
              <h3 className="font-semibold mb-2 text-lg">{t.contact.github}</h3>
              <p className="text-primary-100 text-sm">gu1209</p>
            </a>
            <a href="tel:+8619292244363" className="group bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300">
              <Phone className="mx-auto mb-4" size={32} />
              <h3 className="font-semibold mb-2 text-lg">{t.contact.phone}</h3>
              <p className="text-primary-100 text-sm">+86 192 9224 4363</p>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center text-white text-sm font-bold">KG</div>
            <span className="font-medium tracking-wide">Kris Gu</span>
          </div>
          <p className="text-gray-400 mb-4 text-sm">© {new Date().getFullYear()} All rights reserved.</p>
          <p className="text-gray-500 text-xs">
            Built with Next.js, Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}
