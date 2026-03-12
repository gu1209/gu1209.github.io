'use client';

import { useState } from 'react';
import { Mail, Github, Phone, FileText, Award, Briefcase, Code, Database, BarChart3, Languages, Globe } from 'lucide-react';

// Translations
const translations = {
  zh: {
    nav: { about: '关于我', experience: '实习经历', projects: '研究项目', skills: '技能与证书', contact: '联系方式' },
    hero: { title: '顾杰', subtitle: '金融 + 技术 | 量化分析 | LLM研究', description: '天津大学金融硕士在读，专注于金融数据分析、量化研究和LLM在金融领域的应用。', resume: '下载简历' },
    about: { title: '关于我', education: '教育背景', intro: '我是天津大学（985）金融硕士，具有扎实的量化分析能力、Python编程技能和LLM应用经验。我的研究聚焦于使用BERT和大语言模型改进股票行业分类以优化动量策略。', strengths: '我的独特优势在于CPA证书（已过4科）、金融专业知识和Python数据分析能力的结合，使我能够胜任金融分析、数据分析和量化研究等岗位。', location: '所在地', degree: '金融硕士', university: '天津大学', period: '2024.09 - 2027.01（预计）' },
    experience: { title: '实习经历', present: '至今', responsibilities: '工作内容', achievements: '主要成果' },
    projects: { title: '研究项目', viewProject: '查看项目', tech: '技术栈', objective: '研究目标', methodology: '研究方法', findings: '研究发现' },
    skills: { title: '技能与证书', programming: '编程语言', dataTools: '数据分析工具', finance: '金融与分析', certifications: '专业证书', languages: '语言能力' },
    contact: { title: '联系方式', email: '邮箱', github: 'GitHub', linkedin: '领英', phone: '电话', message: '我正在寻找金融分析、数据分析或量化研究相关的实习机会。欢迎随时联系我！' },
  },
  en: {
    nav: { about: 'About', experience: 'Experience', projects: 'Projects', skills: 'Skills & Certs', contact: 'Contact' },
    hero: { title: 'Kris Gu', subtitle: 'Finance + Technology | Quantitative Analysis | LLM Research', description: "Master's student at Tianjin University, pursuing a career in financial analysis, data analytics, and quantitative research.", resume: 'Download Resume' },
    about: { title: 'About Me', education: 'Education', intro: 'I am a Master\'s student in Finance at Tianjin University (985) with a strong background in quantitative analysis, Python programming, and LLM applications in finance. My research focuses on using BERT and large language models to improve stock industry classification for momentum strategies.', strengths: 'My unique combination of CPA certification (4 subjects passed), financial expertise, and technical skills (Python, SQL, Machine Learning) makes me well-suited for roles in financial analysis, data analytics, and quantitative research.', location: 'Location', degree: "Master's in Finance", university: 'Tianjin University', period: '2024.09 - 2027.01 (expected)' },
    experience: { title: 'Internship Experience', present: 'Present', responsibilities: 'Key Responsibilities', achievements: 'Key Achievements' },
    projects: { title: 'Research Projects', viewProject: 'View Project', tech: 'Technology', objective: 'Objective', methodology: 'Methodology', findings: 'Findings' },
    skills: { title: 'Skills & Certifications', programming: 'Programming', dataTools: 'Data Tools', finance: 'Finance & Analysis', certifications: 'Certifications', languages: 'Languages' },
    contact: { title: 'Get In Touch', email: 'Email', github: 'GitHub', linkedin: 'LinkedIn', phone: 'Phone', message: "I'm currently looking for internships in financial analysis, data analytics, or quantitative research. Feel free to reach out!" },
  },
};

const experiences = [
  {
    company: 'Momenta',
    role: 'Fund Analysis Intern',
    period: 'Dec 2025 - Present',
    periodZh: '2025年12月 - 至今',
    highlights: [
      'Built AI workflows on Coze platform for intelligent inquiries and market summaries',
      'Automated market newsletter generation using Agents for bank briefings and weekly reports',
      'Developed dashboards for funds, cash flow, and bank account tracking from scratch',
      'Conducted product research for wealth management products (e.g., 1940ACT)',
      'Operated Oracle ERP for payment processing, accounts payable, and remittances',
    ],
    highlightsZh: [
      '在Coze平台搭建智能询价和市场总结工作流',
      '通过Agent自动化处理银行简讯和周报，自动提取关键词、网络搜索、按模板生成云文档',
      '从0到1搭建资金看板、流水看板、银行账户看板',
      '为理财产品（如1940ACT）上市准备提供研究支持',
      '熟练使用Oracle ERP处理支付、应付账款、汇款等事务',
    ],
  },
  // ... other experiences
  {
    company: 'Sinochem Tianjin',
    role: 'Asset Transaction Intern',
    period: 'Aug 2025 - Nov 2025',
    periodZh: '2025年8月 - 2025年11月',
    highlights: [
      'Participated in multiple asset disposal and bankruptcy planning projects',
      'Key achievement: Assisted "Blue Star Cleaning Asset Transfer" project with over 50% premium',
      'Conducted industry analysis for Sinochem Tianjin Logistics "15th Five-Year Plan" and Shanghai office sale',
      'Authored press releases for key projects including "Fujian Huaxiang"',
    ],
    highlightsZh: [
      '参与多项资产处置与破产规划项目',
      '核心成果：协助"蓝星清洗资产转让"项目实现资产超50%溢价成交',
      '完成中化天津物流"十五五"规划、上海写字楼出售等项目的行业分析与汇报材料',
      '负责"福建华橡"等重点项目的通讯稿件',
    ],
  },
  {
    company: 'CSC Financial',
    role: 'Industry Research Intern',
    period: 'Oct 2024 - Mar 2025',
    periodZh: '2024年10月 - 2025年3月',
    highlights: [
      'Deep research on Sanhua智控 and Xiamen Tungsten, built financial valuation models',
      'Tracked lithium battery industry chain (CATL, Ganfeng Lithium), summarized 20+ meeting minutes',
      'Compiled monthly production data for cathode/anode/separator components',
      'Analyzed financial metrics (gross margin, R&D investment) for covered companies',
    ],
    highlightsZh: [
      '参与三花智控、厦门钨业深度报告撰写，建立财务估值模型',
      '跟踪宁德时代、赣锋锂业等锂电池产业链标的，整理会议纪要20+篇',
      '按月更新锂电池正极/负极/隔膜等核心部件产量数据',
      '协助分析覆盖企业财务数据（毛利率、研发投入等关键指标）',
    ],
  },
  {
    company: 'Sugon',
    role: 'Project Management Intern',
    period: 'Mar 2025 - Jun 2025',
    periodZh: '2025年3月 - 2025年6月',
    highlights: [
      'Managed full lifecycle of version 412d-1230 test release and 421SP1 updates',
      'Coordinated 87 requirement/design/test reviews, hosted 20+ bug评审会',
      'Introduced shared documentation system, improving collaboration efficiency',
      'Used Jira/禅道/Confluence for end-to-end requirement and defect management',
    ],
    highlightsZh: [
      '参与412d-1230加强测试版、421SP1两个版本的全周期项目管理',
      '协调需求/设计/测试评审87项，独立主持20+场bug评审会',
      '引入共享文档建立标准化评审登记机制，减少重复沟通，提升协作效率',
      'Jira/禅道/Confluence全链路管理需求与缺陷',
    ],
  },
];

const projects = [
  {
    title: 'Momentum Strategy Research',
    titleZh: '动量效应研究',
    subtitle: 'LLM-based Long Text Similarity for Stock Classification',
    tech: ['Python', 'Pandas', 'BERT', 'GLM-4-flash', 'Cosine Similarity'],
    objective: 'Optimize momentum strategy performance through improved stock industry classification using BERT-based text similarity.',
    objectiveZh: '基于BERT的股票行业相似度计算，用更优的行业分类优化动量策略。',
    methodology: 'Called LLMs to extract MD&A summaries from annual reports, designed prompts for large-scale text cleaning, computed BERT embeddings for similarity, reclassified stocks into industries, compared with CSRC classification using t-tests and ANOVA.',
    methodologyZh: '调用LLM提取年报MD&A文本摘要；设计Prompt完成大规模文本清洗；BERT Embedding计算相似度；实现股票行业再分类；对比证监会分类的动量效应，进行t检验/ANOVA。',
    findings: 'Discovered that current algorithm classification needs optimization. Planning to improve from dynamic parameters, weighted enhancement, bidirectional enhancement, and robustness checks.',
    findingsZh: '已发现分类效果待优化，计划从动态参数、加权增强、双向增强、稳健性检验等方向深化。',
    status: 'Ongoing since Aug 2025',
  },
  {
    title: 'Investor Sentiment Index',
    titleZh: '投资者情绪指数构建',
    subtitle: 'Empirical Study on Stock Index Futures Market',
    tech: ['Python', 'Requests', 'BeautifulSoup', 'FDA', 'Text Mining'],
    objective: 'Build a high-frequency investor sentiment index from East Money Forum data and study its impact on China\'s stock index futures market.',
    objectiveZh: '爬取股吧数据构建高频投资者情绪指数，研究其对我股指期货市场功能的影响。',
    methodology: 'Used Python crawlers (Requests/BeautifulSoup) to scrape East Money forum data, applied sentiment lexicon for emotional analysis, used Functional Data Analysis (FDA) for mixed-frequency data fusion to upsample low-frequency data.',
    methodologyZh: 'Python爬虫（Requests/BeautifulSoup）爬取东方财富股吧数据；情感词典方法进行情绪分析；使用函数化数据分析方法（FDA）进行混频数据融合，实现低频数据高频化。',
    findings: 'Successfully constructed a high-frequency investor sentiment index and completed the research project with positive results.',
    findingsZh: '成功构建高频投资者情绪指数，项目顺利结项。',
    status: 'Completed (Apr 2022 - Apr 2024)',
  },
  {
    title: 'CMB Digital Finance Camp',
    titleZh: '招商银行数字金融训练营',
    subtitle: 'User Behavior Prediction and AI Marketing',
    tech: ['Python', 'Pandas', 'Scikit-learn', 'BERT', 'API Development'],
    objective: 'Predict user ad clicks, classify news content, and build AI marketing agents.',
    objectiveZh: '用户广告点击预测、资讯分类、AI营销智能体搭建。',
    methodology: 'Applied moving window training to avoid data leakage, used BERT pre-trained models for text classification, developed API for AI marketing agent.',
    methodologyZh: '移动窗口训练规避数据泄露；BERT预训练模型文本分类；API搭建AI营销智能体。',
    findings: 'Competed in 3 competitions (user ad click prediction, news classification, AI marketing agent) and achieved good rankings.',
    findingsZh: '参加三项竞赛（用户广告点击预测、资讯分类、AI营销智能体），获得三等奖。',
    status: 'Completed (Jul 2025 - Aug 2025)',
  },
];

const skillsData = {
  programming: ['Python', 'SQL', 'VBA', 'R (basic)'],
  dataTools: ['Pandas', 'NumPy', 'Scikit-learn', 'BERT', 'MySQL', 'Wind/Choice', 'Octoparse', 'Power BI', 'Tableau'],
  finance: ['Financial Analysis', 'DCF Valuation', 'Industry Research', 'Momentum Strategies', 'Financial Modeling', 'Risk Management'],
  certifications: [
    'CPA: 4 subjects passed (Accounting, Financial Management, Strategy, Economic Law)',
    'CTA (Tax Advisor): 4 subjects passed',
    'Junior Accounting Certificate',
    'Fund Practitioner Certificate',
    'CET-6',
  ],
  languages: ['Chinese (Native)', 'English (Professional, CET-6)'],
};

export default function Home() {
  const [lang, setLang] = useState<'zh' | 'en'>('zh');
  const t = translations[lang];

  const toggleLanguage = () => {
    setLang(lang === 'zh' ? 'en' : 'zh');
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <a href="#" className="text-xl font-bold text-gray-900">KG</a>
            <div className="flex items-center gap-8">
              <a href="#about" className="text-gray-600 hover:text-primary-600">{t.nav.about}</a>
              <a href="#experience" className="text-gray-600 hover:text-primary-600">{t.nav.experience}</a>
              <a href="#projects" className="text-gray-600 hover:text-primary-600">{t.nav.projects}</a>
              <a href="#skills" className="text-gray-600 hover:text-primary-600">{t.nav.skills}</a>
              <a href="#contact" className="text-gray-600 hover:text-primary-600">{t.nav.contact}</a>
              <button onClick={toggleLanguage} className="flex items-center gap-1 text-gray-600 hover:text-primary-600">
                <Globe size={18} />
                <span className="text-sm">{lang === 'en' ? '中文' : 'EN'}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-primary-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <h1 className="text-5xl font-bold text-gray-900 mb-4">{t.hero.title}</h1>
              <h2 className="text-xl text-primary-600 font-medium mb-6">{t.hero.subtitle}</h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">{t.hero.description}</p>
              <div className="flex gap-4">
                <a href="/resume.pdf" download className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition">
                  <FileText size={20} />
                  {t.hero.resume}
                </a>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="w-80 h-80 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-6xl font-bold shadow-2xl">KG</div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">{t.about.title}</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <p className="text-gray-600 leading-relaxed mb-4">{t.about.intro}</p>
              <p className="text-gray-600 leading-relaxed">{t.about.strengths}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.about.education}</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-gray-900">{t.about.degree}</p>
                  <p className="text-gray-600">{t.about.university}</p>
                  <p className="text-sm text-gray-500">{t.about.period}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 flex items-center gap-3">
            <Briefcase className="text-primary-600" size={28} />
            {t.experience.title}
          </h2>
          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <div key={idx} className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{exp.company}</h3>
                    <p className="text-primary-600 font-medium">{exp.role}</p>
                  </div>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{lang === 'en' ? exp.period : exp.periodZh}</span>
                </div>
                <div className="space-y-3">
                  {(lang === 'en' ? exp.highlights : exp.highlightsZh).map((highlight, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-600">{highlight}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 flex items-center gap-3">
            <BarChart3 className="text-primary-600" size={28} />
            {t.projects.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <div key={idx} className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-primary-600 text-sm mb-4">{project.subtitle}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded">{tech}</span>
                  ))}
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{t.projects.objective}</h4>
                    <p className="text-sm text-gray-600">{lang === 'en' ? project.objective : project.objectiveZh}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{t.projects.methodology}</h4>
                    <p className="text-sm text-gray-600">{lang === 'en' ? project.methodology : project.methodologyZh}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{t.projects.findings}</h4>
                    <p className="text-sm text-gray-600">{lang === 'en' ? project.findings : project.findingsZh}</p>
                  </div>
                  <p className="text-xs text-gray-400 mt-4">{project.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 flex items-center gap-3">
            <Award className="text-primary-600" size={28} />
            {t.skills.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Code size={20} className="text-primary-600" />
                {t.skills.programming}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillsData.programming.map((skill, i) => (
                  <span key={i} className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 text-gray-700">{skill}</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Database size={20} className="text-primary-600" />
                {t.skills.dataTools}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillsData.dataTools.map((skill, i) => (
                  <span key={i} className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 text-gray-700">{skill}</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <BarChart3 size={20} className="text-primary-600" />
                {t.skills.finance}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillsData.finance.map((skill, i) => (
                  <span key={i} className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 text-gray-700">{skill}</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Award size={20} className="text-primary-600" />
                {t.skills.certifications}
              </h3>
              <ul className="space-y-2">
                {skillsData.certifications.map((cert, i) => (
                  <li key={i} className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 text-gray-700 text-sm">{cert}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Languages size={20} className="text-primary-600" />
                {t.skills.languages}
              </h3>
              <ul className="space-y-2">
                {skillsData.languages.map((langItem, i) => (
                  <li key={i} className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 text-gray-700 text-sm">{langItem}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.contact.title}</h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">{t.contact.message}</p>
          <div className="grid md:grid-cols-3 gap-8">
            <a href="mailto:gujie_kris@163.com" className="group bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <Mail className="mx-auto mb-4 text-primary-600" size={32} />
              <h3 className="font-semibold text-gray-900 mb-2">{t.contact.email}</h3>
              <p className="text-gray-600 text-sm">gujie_kris@163.com</p>
            </a>
            <a href="https://github.com/gu1209" target="_blank" rel="noopener noreferrer" className="group bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <Github className="mx-auto mb-4 text-primary-600" size={32} />
              <h3 className="font-semibold text-gray-900 mb-2">{t.contact.github}</h3>
              <p className="text-gray-600 text-sm">gu1209</p>
            </a>
            <a href="tel:+8619292244363" className="group bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <Phone className="mx-auto mb-4 text-primary-600" size={32} />
              <h3 className="font-semibold text-gray-900 mb-2">{t.contact.phone}</h3>
              <p className="text-gray-600 text-sm">+86 192 9224 4363</p>
            </a>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-500 text-sm">{t.hero.description}</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400 mb-4">© {new Date().getFullYear()} Kris Gu. All rights reserved.</p>
          <p className="text-gray-500 text-sm">Built with Next.js, Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}
