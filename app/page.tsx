'use client';

import { useState } from 'react';
import { Mail, Github, Phone, Award, Briefcase, Code, Database, BarChart3, Languages, Globe, GraduationCap, FileText } from 'lucide-react';

// Translations
const translations = {
  zh: {
    nav: { about: '关于我', experience: '实习经历', projects: '研究项目', skills: '技能与证书', contact: '联系方式' },
    hero: { title: '顾杰', subtitle: '金融 + 技术 | 量化分析 | LLM研究', description: '天津大学金融硕士在读，专注于金融数据分析、量化研究和LLM在金融领域的应用。', resume: '下载简历' },
    about: { title: '关于我', education: '教育背景', intro: '我是天津大学（985）金融硕士，具有扎实的量化分析能力、Python编程技能和LLM应用经验。我的研究聚焦于使用BERT和大语言模型改进股票行业分类以优化动量策略。', strengths: '我的独特优势在于CPA证书（已过4科）、金融专业知识和Python数据分析能力的结合，使我能够胜任金融分析、数据分析和量化研究等岗位。', location: '所在地', degree: '金融硕士', university: '天津大学', period: '2024.09 - 2027.01（预计）' },
    experience: { title: '实习经历', present: '至今', responsibilities: '核心职责', achievements: '关键成果' },
    projects: { title: '研究项目', viewProject: '查看项目', tech: '技术栈', objective: '研究目标', methodology: '研究方法', findings: '研究发现', status: '项目状态' },
    skills: { title: '技能与证书', programming: '编程语言', dataTools: '数据分析工具', finance: '金融与分析', certifications: '专业证书', languages: '语言能力' },
    contact: { title: '联系方式', email: '邮箱', github: 'GitHub', linkedin: '领英', phone: '电话', message: '我正在寻找金融分析、数据分析或量化研究相关的实习机会。欢迎随时联系我！' },
  },
  en: {
    nav: { about: 'About', experience: 'Experience', projects: 'Projects', skills: 'Skills & Certs', contact: 'Contact' },
    hero: { title: 'Kris Gu', subtitle: 'Finance + Technology | Quantitative Analysis | LLM Research', description: "Master's student at Tianjin University, pursuing a career in financial analysis, data analytics, and quantitative research.", resume: 'Download Resume' },
    about: { title: 'About Me', education: 'Education', intro: 'I am a Master\'s student in Finance at Tianjin University (985) with a strong background in quantitative analysis, Python programming, and LLM applications in finance. My research focuses on using BERT and large language models to improve stock industry classification for momentum strategies.', strengths: 'My unique combination of CPA certification (4 subjects passed), financial expertise, and technical skills (Python, SQL, Machine Learning) makes me well-suited for roles in financial analysis, data analytics, and quantitative research.', location: 'Location', degree: "Master's in Finance", university: 'Tianjin University', period: '2024.09 - 2027.01 (expected)' },
    experience: { title: 'Internship Experience', present: 'Present', responsibilities: 'Key Responsibilities', achievements: 'Key Achievements' },
    projects: { title: 'Research Projects', viewProject: 'View Project', tech: 'Technology', objective: 'Objective', methodology: 'Methodology', findings: 'Findings', status: 'Status' },
    skills: { title: 'Skills & Certifications', programming: 'Programming', dataTools: 'Data Tools', finance: 'Finance & Analysis', certifications: 'Certifications', languages: 'Languages' },
    contact: { title: 'Get In Touch', email: 'Email', github: 'GitHub', linkedin: 'LinkedIn', phone: 'Phone', message: "I'm currently looking for internships in financial analysis, data analytics, or quantitative research. Feel free to reach out!" },
  },
};

const experiences = [
  {
    company: 'Momenta',
    companyEn: 'Momenta',
    role: 'Fund Analysis Intern',
    roleEn: 'Fund Analysis Intern',
    period: '2025年12月 - 至今',
    periodEn: 'Dec 2025 - Present',
    highlights: [
      '搭建Coze平台智能询价和市场资讯总结工作流，实现自动化处理',
      '设计Agent自动提取银行简讯关键词，通过网络搜索并按模板生成云文档周报',
      '从零搭建资金看板、流水看板、银行账户看板，实现可视化监控',
      '为理财产品（1940ACT）上市提供深度研究支持，完成竞品分析和估值模型',
      '熟练使用Oracle ERP处理资金支付、应付账款核销、跨境汇款等全流程操作',
    ],
    highlightsEn: [
      'Built AI workflows on Coze platform for intelligent inquiries and market summaries',
      'Automated market newsletter generation using Agents: extracted keywords from bank briefings, web searched, and generated cloud documents weekly',
      'Developed three dashboards from scratch: fund tracking, cash flow monitoring, and bank account overview',
      'Provided research support for wealth management product (1940ACT) launch, including competitive analysis and valuation modeling',
      'Operated Oracle ERP for full-cycle payment processing, accounts payable reconciliation, and international remittances',
    ],
    highlightsBold: [0, 1, 2], // 突出第1-3点
  },
  {
    company: '中化天津有限公司',
    companyEn: 'Sinochem Tianjin Co., Ltd.',
    role: '产权交易实习生',
    roleEn: 'Asset Transaction Intern',
    period: '2025年8月 - 2025年11月',
    periodEn: 'Aug 2025 - Nov 2025',
    highlights: [
      '深度参与多项资产处置与破产重整项目，协助制定交易结构和尽职调查方案',
      '核心成果：主导"蓝星清洗资产转让"项目，通过市场策划和买家邀约，实现资产成交溢价超50%',
      '负责中化天津物流"十五五"规划编制，完成物流资产证券化可行性研究和写字楼资产出售策略分析',
      '撰写福建华橡等重大项目的通讯稿件和宣传材料，提升公司品牌影响力',
    ],
    highlightsEn: [
      'Participated in multiple asset disposal and bankruptcy restructuring projects, assisted in deal structuring and due diligence',
      'Key achievement: Led "Blue Star Cleaning Asset Transfer" project, achieving over 50% premium through strategic marketing and buyer outreach',
      'Responsible for Sinochem Tianjin Logistics "15th Five-Year Plan", completed logistics asset securitization feasibility study and Shanghai office sale strategy',
      'Authored press releases and marketing materials for key projects like "Fujian Huaxiang", enhancing corporate brand visibility',
    ],
    highlightsBold: [1],
  },
  {
    company: '东吴证券',
    companyEn: 'CSC Financial (East Wu Securities)',
    role: '行业研究实习生（电子设备与新能源）',
    roleEn: 'Industry Research Intern (Electronics & New Energy)',
    period: '2024年10月 - 2025年3月',
    periodEn: 'Oct 2024 - Mar 2025',
    highlights: [
      '深度覆盖三花智控、厦门钨业等标的，完成完整财务模型搭建和估值分析（DCF/PB/PE）',
      '持续跟踪宁德时代、赣锋锂业等锂电池产业链核心企业，累计整理会议纪要20+篇、调研报告5篇',
      '按月更新正极材料、负极材料、隔膜等锂电池核心部件产量数据，建立行业数据库',
      '参与覆盖公司财务分析，重点跟踪毛利率、研发投入占比、资本开支等关键指标变化',
    ],
    highlightsEn: [
      'Conducted in-depth research on Sanhua Intelligent Control and Xiamen Tungsten, built comprehensive financial models and valuation analysis (DCF/PB/PE)',
      'Continuously tracked lithium battery chain leaders including CATL and Ganfeng Lithium, summarized 20+ meeting minutes and 5 research reports',
      'Compiled monthly production data for cathode/anode/separator components, established industry database',
      'Analyzed financial metrics for covered companies, focusing on gross margin, R&D intensity, and capital expenditures trends',
    ],
    highlightsBold: [0, 1],
  },
  {
    company: '中科曙光（存储产品事业部）',
    companyEn: 'Sugon (Storage Products Division)',
    role: '项目管理实习生',
    roleEn: 'Project Management Intern',
    period: '2025年3月 - 2025年6月',
    periodEn: 'Mar 2025 - Jun 2025',
    highlights: [
      '参与412d-1230加强测试版、421SP1两个版本的全生命周期项目管理，负责需求跟踪、进度把控和风险预警',
      '协调需求评审、设计评审、测试评审共87项，独立主持20+场缺陷评审会，推动高优先级bug闭环率提升15%',
      '引入共享文档建立标准化评审登记机制，实现评审过程透明化，减少重复沟通30%',
      '使用Jira管理需求池、禅道跟踪缺陷、Confluence归档知识文档，打通项目全链路信息流',
    ],
    highlightsEn: [
      'Managed full lifecycle of versions 412d-1230 test release and 421SP1, responsible for requirement tracking, progress control, and risk预警',
      'Coordinated 87 reviews (requirements/design/test), hosted 20+ defect review meetings, improved high-priority bug closure rate by 15%',
      'Introduced shared documentation system for standardized review registration, increased transparency and reduced redundant communication by 30%',
      'Utilized Jira for requirement management, Changelog for defect tracking, and Confluence for knowledge documentation, enabling end-to-end information flow',
    ],
    highlightsBold: [2, 3],
  },
];

const projects = [
  {
    title: '动量效应研究：基于LLM的长文本相似度计算',
    titleEn: 'Momentum Strategy: LLM-based Long Text Similarity',
    subtitle: '采用BERT嵌入与GLM-4大语言模型优化股票行业分类',
    subtitleEn: 'Optimizing Stock Industry Classification using BERT Embeddings and GLM-4 LLM',
    tech: ['Python', 'Pandas', 'BERT', 'GLM-4-flash', 'Cosine Similarity', 'Spectral Clustering', 'T-test', 'ANOVA'],
    objective: '探索基于文本相似度的算法行业分类对动量策略表现的影响，旨在通过更精细的行业划分提升动量效应。',
    objectiveEn: 'Explore the impact of algorithm-based industry classification using text similarity on momentum strategy performance, aiming to enhance momentum effect through finer industry segmentation.',
    methodology: '调用GLM-4-flash API提取上市公司年报MD&A章节摘要；设计Prompt清洗年报文本；使用BERT模型计算文本嵌入和余弦相似度；基于相似度矩阵采用谱聚类算法进行行业再分类（约90个细分行业）；与证监会传统81个行业分类对比，分别构建传统动量策略和相似度增强策略，使用t检验和ANOVA分析收益差异的统计显著性；进行稳健性检验（不同形成期、持有期、相似度阈值）。',
    methodologyEn: 'Extracted MD&A summaries from annual reports using GLM-4-flash API; designed prompts for text cleaning; computed BERT embeddings and cosine similarity; reclassified industries using spectral clustering (~90 sub-industries); compared with CSRC classification (81 industries); constructed traditional and similarity-enhanced momentum strategies; tested statistical significance with t-tests and ANOVA; performed robustness checks across different formation/holding periods and similarity thresholds.',
    findings: '核心发现：1) 算法分类行业内平均文本相似度(0.1741)显著低于证监会分类(0.3809)，表明算法划分更细粒度；2) 证监会分类下传统动量策略年化5.5%但不显著，算法分类下传统动量策略年化-2.9%且显著为负，方向与经典文献相反；3) 相似度增强策略表现更弱，年化-23.1%；4) 策略夏普比率普遍较低或为负。当前结论尚不稳定，需要进一步优化算法参数、扩展样本期间（至2012年）和改进分类质量。',
    findingsEn: 'Key findings: 1) Algorithm classification yields lower average intra-industry text similarity (0.1741) vs CSRC (0.3809), indicating finer segmentation; 2) Traditional momentum strategy: CSRC classification yields 5.5% annualized (insignificant), algorithm classification yields -2.9% (significantly negative), contradicting classical literature; 3) Similarity-enhanced strategy underperforms with -23.1% annualized; 4) Sharpe ratios mostly negative. Results are not yet robust—need to optimize parameters, extend sample period (to 2012), and improve classification quality.',
    status: '2025年8月至今 - 研究进行中',
    statusEn: 'Aug 2025 - Ongoing',
  },
  {
    title: '江苏省大学生创新创业训练项目：投资者情绪指数构建',
    titleEn: 'Jiangsu College Student Innovation Project: Investor Sentiment Index',
    subtitle: '基于股吧文本挖掘的投资者情绪与股指期货市场功能实证研究',
    subtitleEn: 'Text Mining of Investor Sentiment from Stock Forums and Its Impact on Index Futures Market',
    tech: ['Python', 'Requests', 'BeautifulSoup', 'FDA', 'Text Mining', 'Sentiment Lexicon'],
    objective: '爬取东方财富股吧数据，构建高频投资者情绪指数，检验投资者情绪对我国股指期货市场价格发现功能的影响。',
    objectiveEn: 'Scrape East Money forum data to construct high-frequency investor sentiment index and test its impact on price discovery function of China\'s stock index futures.',
    methodology: '使用Python爬虫（Requests+BeautifulSoup）每日爬取东方财富股吧帖子；采用中文情感词典方法对帖子进行文本情感分析，构建日度情绪指数；由于情绪数据高频而期货数据低频，采用函数化数据分析方法（FDA）进行混频数据融合，将日度情绪转化为与期货数据匹配的周度/月度频率；使用VAR模型和脉冲响应分析检验情绪对期货价格发现的影响。',
    methodologyEn: 'Scraped East Money forum posts daily using Python (Requests+BeautifulSoup); applied Chinese sentiment lexicon for textual emotional analysis to construct daily sentiment index; used Functional Data Analysis (FDA) to mix-frequency fuse daily sentiment into weekly/monthly frequency matching futures data; employed VAR model and impulse response analysis to test sentiment impact on futures price discovery.',
    findings: '成功构建了2019-2022年高频投资者情绪指数，并通过VAR模型验证了投资者情绪对股指期货价格发现过程的显著影响，项目顺利结项并获得好评。研究成果形成一篇学术论文（待发表）。',
    findingsEn: 'Successfully constructed high-frequency sentiment index (2019-2022), verified significant impact of investor sentiment on futures price discovery via VAR model. Project completed with positive evaluation. Research formed an academic paper (pending publication).',
    status: '2022年4月 - 2024年4月（已结项）',
    statusEn: 'Apr 2022 - Apr 2024 (Completed)',
  },
  {
    title: '招商银行2025年数字金融训练营',
    titleEn: 'CMB 2025 Digital Finance Camp',
    subtitle: '用户行为预测与AI营销智能体开发',
    subtitleEn: 'User Behavior Prediction and AI Marketing Agent Development',
    tech: ['Python', 'Pandas', 'Scikit-learn', 'BERT', 'API Development', 'Flask'],
    objective: '构建用户广告点击预测模型、资讯分类模型和AI营销智能体，提升招商银行数字金融业务转化率。',
    objectiveEn: 'Build user ad click prediction model, news classification model, and AI marketing agent to boost conversion rates for China Merchants Bank digital finance services.',
    methodology: '移动窗口训练方法规避数据泄露问题；使用BERT预训练模型对用户咨询文本进行分类（8个类别）；基于Flask搭建AI营销智能体API服务，集成模型推理和业务规则；使用Pandas进行特征工程，优化AUC指标。',
    methodologyEn: 'Applied moving window training to prevent data leakage; used BERT pre-trained model for user consultation text classification (8 categories); built AI marketing agent API service with Flask, integrating model inference and business rules; performed feature engineering with Pandas to optimize AUC metrics.',
    findings: '在用户广告点击预测、资讯分类、AI营销智能体三项竞赛中均取得优异成绩，最终获得三等奖。项目代码和文档被训练营收录为优秀案例。',
    findingsEn: 'Achieved excellent results in all three competitions (ad click prediction, news classification, AI marketing agent), awarded third prize. Project code and documentation were collected as exemplary cases by the camp.',
    status: '2025年7月 - 2025年8月（已完成）',
    statusEn: 'Jul 2025 - Aug 2025 (Completed)',
  },
];

const skillsData = {
  programming: ['Python', 'SQL', 'VBA', 'R (basic)'],
  dataTools: ['Pandas', 'NumPy', 'Scikit-learn', 'BERT', 'MySQL', 'Wind/Choice', 'Octoparse', 'Power BI', 'Tableau', 'Jira', 'Confluence'],
  finance: ['Financial Analysis', 'DCF Valuation', 'Industry Research', 'Momentum Strategies', 'Financial Modeling', 'Risk Management', 'Asset Valuation', 'Due Diligence'],
  certifications: [
    'CPA: 4 subjects passed (Accounting, Financial Management, Corporate Strategy & Risk Management, Economic Law)',
    'CTA (Tax Advisor): 4 subjects passed (Financial & Accounting, Tax Law I, Tax Law II, Tax Service Practice)',
    'Junior Accounting Certificate',
    'Fund Practitioner Certificate',
    'CET-6 (Professional English proficiency)',
  ],
  languages: ['中文（母语）', 'English (Professional working proficiency)'],
};

export default function Home() {
  const [lang, setLang] = useState<'zh' | 'en'>('zh');
  const t = translations[lang];

  const toggleLanguage = () => {
    setLang(lang === 'zh' ? 'en' : 'zh');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <a href="#" className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center text-white text-sm font-bold">KG</div>
              <span>Kris Gu</span>
            </a>
            <div className="hidden md:flex items-center gap-8">
              <a href="#about" className="text-gray-600 hover:text-primary-600 transition">{t.nav.about}</a>
              <a href="#experience" className="text-gray-600 hover:text-primary-600 transition">{t.nav.experience}</a>
              <a href="#projects" className="text-gray-600 hover:text-primary-600 transition">{t.nav.projects}</a>
              <a href="#skills" className="text-gray-600 hover:text-primary-600 transition">{t.nav.skills}</a>
              <a href="#contact" className="text-gray-600 hover:text-primary-600 transition">{t.nav.contact}</a>
              <button onClick={toggleLanguage} className="flex items-center gap-1 text-gray-600 hover:text-primary-600 transition border border-gray-300 px-3 py-1 rounded-full text-sm">
                <Globe size={16} />
                <span>{lang === 'en' ? '中文' : 'EN'}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-primary-50 via-white to-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {t.hero.title}
              </h1>
              <h2 className="text-xl text-primary-600 font-medium mb-6">
                {t.hero.subtitle}
              </h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                {t.hero.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#contact" className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition shadow-md">
                  <Mail size={20} />
                  {t.contact.title}
                </a>
                <a href="https://github.com/gu1209" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-primary-500 hover:text-primary-600 transition">
                  <Github size={20} />
                  GitHub
                </a>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative">
                <div className="w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-gradient-to-br from-primary-400 to-primary-600">
                  <img
                    src="/images/profile.jpg"
                    alt="Kris Gu"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback if image fails to load */}
                  <div className="w-full h-full flex items-center justify-center text-white text-center p-4" style={{ display: 'none' }}>
                    <div>
                      <div className="text-8xl font-bold mb-2">KG</div>
                      <div className="text-sm opacity-80">Photo</div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600">Open to opportunities</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 flex items-center gap-3">
            <div className="w-10 h-1 bg-primary-600 rounded"></div>
            {t.about.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-6">
              <p className="text-gray-700 leading-relaxed text-lg">
                {t.about.intro}
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                {t.about.strengths}
              </p>
              <div className="bg-gradient-to-r from-primary-50 to-blue-50 p-6 rounded-xl border border-primary-100">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Award className="text-primary-600" size={20} />
                  {t.skills.certifications}
                </h3>
                <ul className="space-y-2 text-gray-700">
                  {skillsData.certifications.slice(0, 3).map((cert, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm">{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <GraduationCap className="text-primary-600" size={22} />
                  {t.about.education}
                </h3>
                <div className="space-y-6">
                  <div className="pb-4 border-b border-gray-200">
                    <p className="font-medium text-gray-900 text-lg">{t.about.degree}</p>
                    <p className="text-primary-600 font-medium">{t.about.university}</p>
                    <p className="text-sm text-gray-500 mt-1">{t.about.period}</p>
                  </div>
                  <div className="pb-4 border-b border-gray-200">
                    <p className="font-medium text-gray-900 text-lg">金融学士</p>
                    <p className="text-primary-600 font-medium">中国矿业大学（211）</p>
                    <p className="text-sm text-gray-500 mt-1">2020.09 - 2024.06</p>
                    <p className="text-xs text-gray-400 mt-1">GPA: 4.15/5.0，专业前15%，二等学业奖学金</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Languages className="text-primary-600" size={22} />
                  {t.skills.languages}
                </h3>
                <div className="space-y-2">
                  {skillsData.languages.map((langItem, i) => (
                    <div key={i} className="bg-gray-50 px-4 py-2 rounded-lg text-sm text-gray-700">
                      {langItem}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 flex items-center gap-3">
            <Briefcase className="text-primary-600" size={28} />
            {t.experience.title}
          </h2>
          <div className="space-y-8">
            {experiences.map((exp, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary-600"></div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{lang === 'en' ? exp.companyEn : exp.company}</h3>
                    <p className="text-primary-600 font-medium text-lg">{lang === 'en' ? exp.roleEn : exp.role}</p>
                  </div>
                  <span className="bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap">
                    {lang === 'en' ? exp.periodEn : exp.period}
                  </span>
                </div>
                <div className="space-y-4">
                  {(lang === 'en' ? exp.highlightsEn : exp.highlights).map((highlight, i) => (
                    <div key={i} className={`flex items-start gap-3 ${exp.highlightsBold && exp.highlightsBold.includes(i) ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="leading-relaxed">{highlight}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 flex items-center gap-3">
            <BarChart3 className="text-primary-600" size={28} />
            {t.projects.title}
          </h2>
          <div className="space-y-12">
            {projects.map((project, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{lang === 'en' ? project.titleEn : project.title}</h3>
                  <p className="text-primary-600 mb-4">{lang === 'en' ? project.subtitleEn : project.subtitle}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, i) => (
                      <span key={i} className="text-xs bg-gradient-to-r from-primary-50 to-blue-50 text-primary-700 px-3 py-1.5 rounded-full font-medium border border-primary-100">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <div className="w-1 h-4 bg-primary-600 rounded"></div>
                      {t.projects.objective}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{lang === 'en' ? project.objectiveEn : project.objective}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <div className="w-1 h-4 bg-primary-600 rounded"></div>
                      {t.projects.methodology}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{lang === 'en' ? project.methodologyEn : project.methodology}</p>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <div className="w-1 h-4 bg-primary-600 rounded"></div>
                    {t.projects.findings}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{lang === 'en' ? project.findingsEn : project.findings}</p>
                </div>
                <div className="mt-4 text-right">
                  <span className="text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
                    {lang === 'en' ? project.statusEn : project.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 flex items-center gap-3">
            <Award className="text-primary-600" size={28} />
            {t.skills.title}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Code size={20} className="text-primary-600" />
                {t.skills.programming}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillsData.programming.map((skill, i) => (
                  <span key={i} className="bg-gray-50 px-4 py-2 rounded-lg text-gray-700 text-sm border border-gray-200 hover:border-primary-300 transition">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Database size={20} className="text-primary-600" />
                {t.skills.dataTools}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillsData.dataTools.map((skill, i) => (
                  <span key={i} className="bg-gray-50 px-4 py-2 rounded-lg text-gray-700 text-sm border border-gray-200 hover:border-primary-300 transition">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <BarChart3 size={20} className="text-primary-600" />
                {t.skills.finance}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillsData.finance.map((skill, i) => (
                  <span key={i} className="bg-gray-50 px-4 py-2 rounded-lg text-gray-700 text-sm border border-gray-200 hover:border-primary-300 transition">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 md:col-span-2 lg:col-span-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Award size={20} className="text-primary-600" />
                {t.skills.certifications}
              </h3>
              <ul className="space-y-3">
                {skillsData.certifications.map((cert, i) => (
                  <li key={i} className="bg-gray-50 px-4 py-3 rounded-lg text-gray-700 text-sm border border-gray-200 flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">{t.contact.title}</h2>
          <p className="text-primary-100 mb-12 max-w-2xl mx-auto text-lg">
            {t.contact.message}
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <a href="mailto:gujie_kris@163.com" className="group bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition">
              <Mail className="mx-auto mb-4" size={32} />
              <h3 className="font-semibold mb-2">{t.contact.email}</h3>
              <p className="text-primary-100 text-sm">gujie_kris@163.com</p>
            </a>
            <a href="https://github.com/gu1209" target="_blank" rel="noopener noreferrer" className="group bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition">
              <Github className="mx-auto mb-4" size={32} />
              <h3 className="font-semibold mb-2">{t.contact.github}</h3>
              <p className="text-primary-100 text-sm">gu1209</p>
            </a>
            <a href="tel:+8619292244363" className="group bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition">
              <Phone className="mx-auto mb-4" size={32} />
              <h3 className="font-semibold mb-2">{t.contact.phone}</h3>
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
            <span className="font-medium">Kris Gu</span>
          </div>
          <p className="text-gray-400 mb-4">© {new Date().getFullYear()} All rights reserved.</p>
          <p className="text-gray-500 text-sm">
            Built with Next.js, Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}
