import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: {
        about: 'About',
        experience: 'Experience',
        projects: 'Projects',
        skills: 'Skills & Certs',
        contact: 'Contact',
      },
      hero: {
        title: 'Kris Gu',
        subtitle: 'Finance + Technology | Quantitative Analysis | LLM Research',
        description: 'Master\'s student at Tianjin University, pursuing a career in financial analysis, data analytics, and quantitative research.',
        resume: 'Download Resume',
      },
      about: {
        title: 'About Me',
        education: 'Education',
        intro: 'I am a Master\'s student in Finance at Tianjin University (985) with a strong background in quantitative analysis, Python programming, and LLM applications in finance. My research focuses on using BERT and large language models to improve stock industry classification for momentum strategies.',
        strengths: 'My unique combination of CPA certification (4 subjects passed), financial expertise, and technical skills (Python, SQL, Machine Learning) makes me well-suited for roles in financial analysis, data analytics, and quantitative research.',
        location: 'Location',
        degree: "Master's in Finance",
        university: 'Tianjin University',
        period: '2024.09 - 2027.01 (expected)',
      },
      experience: {
        title: 'Internship Experience',
        present: 'Present',
        responsibilities: 'Key Responsibilities',
        achievements: 'Key Achievements',
      },
      projects: {
        title: 'Research Projects',
        viewProject: 'View Project',
        tech: 'Technology',
        objective: 'Objective',
        methodology: 'Methodology',
        findings: 'Findings',
      },
      skills: {
        title: 'Skills & Certifications',
        programming: 'Programming',
        dataTools: 'Data Tools',
        finance: 'Finance & Analysis',
        certifications: 'Certifications',
        languages: 'Languages',
      },
      contact: {
        title: 'Get In Touch',
        email: 'Email',
        github: 'GitHub',
        linkedin: 'LinkedIn',
        phone: 'Phone',
        message: 'I\'m currently looking for internships in financial analysis, data analytics, or quantitative research. Feel free to reach out!',
      },
    },
  },
  zh: {
    translation: {
      nav: {
        about: '关于我',
        experience: '实习经历',
        projects: '研究项目',
        skills: '技能与证书',
        contact: '联系方式',
      },
      hero: {
        title: '顾杰',
        subtitle: '金融 + 技术 | 量化分析 | LLM研究',
        description: '天津大学金融硕士在读，专注于金融数据分析、量化研究和LLM在金融领域的应用。',
        resume: '下载简历',
      },
      about: {
        title: '关于我',
        education: '教育背景',
        intro: '我是天津大学（985）金融硕士，具有扎实的量化分析能力、Python编程技能和LLM应用经验。我的研究聚焦于使用BERT和大语言模型改进股票行业分类以优化动量策略。',
        strengths: '我的独特优势在于CPA证书（已过4科）、金融专业知识和Python数据分析能力的结合，使我能够胜任金融分析、数据分析和量化研究等岗位。',
        location: '所在地',
        degree: '金融硕士',
        university: '天津大学',
        period: '2024.09 - 2027.01（预计）',
      },
      experience: {
        title: '实习经历',
        present: '至今',
        responsibilities: '工作内容',
        achievements: '主要成果',
      },
      projects: {
        title: '研究项目',
        viewProject: '查看项目',
        tech: '技术栈',
        objective: '研究目标',
        methodology: '研究方法',
        findings: '研究发现',
      },
      skills: {
        title: '技能与证书',
        programming: '编程语言',
        dataTools: '数据分析工具',
        finance: '金融与分析',
        certifications: '专业证书',
        languages: '语言能力',
      },
      contact: {
        title: '联系方式',
        email: '邮箱',
        github: 'GitHub',
        linkedin: '领英',
        phone: '电话',
        message: '我正在寻找金融分析、数据分析或量化研究相关的实习机会。欢迎随时联系我！',
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'zh',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
