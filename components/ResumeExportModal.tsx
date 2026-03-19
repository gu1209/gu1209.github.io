'use client';

import { useState } from 'react';
import { X, Printer, Minus, Plus, User } from 'lucide-react';
import { STAR_DATA } from '@/lib/starData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  experiences: any[];
  projects: any[];
  lang: 'zh' | 'en';
}

// Education data with courses
const EDU = {
  master: {
    school: { zh: '天津大学（985）', en: 'Tianjin University (985)' },
    faculty: { zh: '管理与经济学部', en: 'Faculty of Management and Economics' },
    degree: { zh: '金融硕士（在读）', en: "Master's in Finance (in progress)" },
    period: '2024.09 – 2027.01',
    courses: {
      zh: '大数据与金融风险、金融随机分析、金融计量经济学、衍生金融工具、行为金融学、投资学、公司金融',
      en: 'Big Data & Financial Risk, Financial Stochastic Analysis, Financial Econometrics, Derivatives, Behavioral Finance, Investment, Corporate Finance',
    },
  },
  bachelor: {
    school: { zh: '中国矿业大学（211）', en: 'China University of Mining & Technology (211)' },
    faculty: { zh: '经济管理学院', en: 'School of Economics & Management' },
    degree: { zh: '金融学士', en: "Bachelor's in Finance" },
    period: '2020.09 – 2024.06',
    gpa: { zh: 'GPA 4.15/5.0，专业前15%', en: 'GPA 4.15/5.0, Top 15% in major' },
    courses: {
      zh: '货币金融学、宏观/微观经济学、商业银行经营管理、金融数据分析、证券投资学、基础会计学、Python数据分析',
      en: 'Money & Banking, Macro/Microeconomics, Commercial Bank Management, Financial Data Analysis, Securities Investment, Accounting, Python',
    },
  },
};

// Skills/certs data
const SKILLS = {
  programming: ['Python', 'SQL', 'VBA'],
  dataTools: ['Pandas', 'NumPy', 'Scikit-learn', 'BERT', 'MySQL', 'Wind/Choice', 'Power BI', 'Jira'],
  finance: { zh: ['财务分析', 'DCF估值', '行业研究', '财务建模', '风险评估', '资产估值'], en: ['Financial Analysis', 'DCF Valuation', 'Industry Research', 'Financial Modeling', 'Risk Assessment', 'Asset Valuation'] },
  certs: {
    zh: ['CPA：4科通过（会计、财管、经济法、战略风管）', 'CTA：4科通过（财会、税法一、税法二、涉税实务）', '初级会计资格证', '基金从业资格', 'CET-6'],
    en: ['CPA: 4 subjects (Accounting, Financial Mgmt, Economic Law, Strategy)', 'CTA: 4 subjects (Financial Acct, Tax Law I & II, Tax Practice)', 'Junior Accounting Certificate', 'Fund Practitioner Certificate', 'CET-6'],
  },
};

// ─────────────────────────────────────────
// Resume Preview Component
// ─────────────────────────────────────────
function ResumePreview({
  experiences, projects, selectedExps, selectedProjects,
  includeSkillsCerts, includeSelfEval, fontSize, lang, objective, includePhoto,
}: {
  experiences: any[]; projects: any[]; selectedExps: Set<number>; selectedProjects: Set<number>;
  includeSkillsCerts: boolean; includeSelfEval: boolean; fontSize: number;
  lang: 'zh' | 'en'; objective: string; includePhoto: boolean;
}) {
  const isZh = lang === 'zh';
  const expList = experiences.filter((_, i) => selectedExps.has(i));
  const projList = projects.filter((_, i) => selectedProjects.has(i));
  const fs = (d = 0) => `${fontSize + d}pt`;
  const blue = '#1d4ed8';
  const gray = '#555';

  // Use absolute URL so print window can load the image
  const photoSrc = typeof window !== 'undefined' ? `${window.location.origin}/images/profile.jpg` : '/images/profile.jpg';

  const selfEval = isZh
    ? '具备金融专业背景与CPA/CTA证书体系知识，熟练掌握Python数据分析与机器学习，能将LLM应用于金融场景。实习经历覆盖资金分析、资产交易、项目管理、行业研究等领域，快速学习、注重细节、追求量化结果。'
    : 'Strong finance foundation with CPA/CTA credentials, proficient in Python data analytics and ML, experienced applying LLMs to financial scenarios. Internship experience spans fund analysis, asset transactions, project management, and research. Fast learner, detail-oriented, results-driven.';

  const secTitle: React.CSSProperties = {
    fontSize: fs(1), fontWeight: 700, color: blue,
    borderBottom: `0.75pt solid #bfdbfe`, paddingBottom: '2pt', marginBottom: '5pt',
  };
  const bullet: React.CSSProperties = { fontSize: fs(-0.5), color: '#374151', paddingLeft: '8pt', marginBottom: '1.5pt', lineHeight: 1.3 };

  return (
    <div id="resume-preview-content" style={{
      width: '794px', minHeight: '1123px', background: '#fff',
      fontFamily: "'Microsoft YaHei','PingFang SC','Hiragino Sans GB',Arial,sans-serif",
      fontSize: fs(), lineHeight: 1.45, color: '#111827',
      padding: '28pt 36pt', boxSizing: 'border-box',
    }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16pt', borderBottom: `1.5pt solid ${blue}`, paddingBottom: '8pt', marginBottom: '9pt' }}>
        {/* Text */}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: fs(7), fontWeight: 800, letterSpacing: '1px', marginBottom: '2pt' }}>{isZh ? '顾杰' : 'Kris Gu'}</div>
          <div style={{ fontSize: fs(1), color: blue, marginBottom: '3pt' }}>
            {isZh ? '金融 × 技术  |  数据分析  |  LLM应用' : 'Finance × Technology  |  Data Analytics  |  LLM Applications'}
          </div>
          <div style={{ fontSize: fs(-1), color: gray, lineHeight: 1.6 }}>
            gujie_kris@163.com  ·  +86 192 9224 4363  ·  github.com/gu1209  ·  gu1209.github.io
          </div>
        </div>
        {/* Photo */}
        {includePhoto && (
          <div style={{ flexShrink: 0, width: '52pt', height: '65pt', border: `0.5pt solid #d1d5db`, borderRadius: '3pt', overflow: 'hidden', background: '#f3f4f6' }}>
            <img src={photoSrc} alt="photo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}
      </div>

      {/* Objective */}
      {objective.trim() && (
        <div style={{ marginBottom: '9pt' }}>
          <div style={secTitle}>{isZh ? '求职意向' : 'Career Objective'}</div>
          <div style={{ fontSize: fs(-0.5), color: '#374151', lineHeight: 1.4 }}>{objective.trim()}</div>
        </div>
      )}

      {/* Education */}
      <div style={{ marginBottom: '9pt' }}>
        <div style={secTitle}>{isZh ? '教育背景' : 'Education'}</div>
        {[
          {
            school: EDU.master.school[isZh ? 'zh' : 'en'],
            faculty: EDU.master.faculty[isZh ? 'zh' : 'en'],
            degree: EDU.master.degree[isZh ? 'zh' : 'en'],
            period: EDU.master.period,
            courses: EDU.master.courses[isZh ? 'zh' : 'en'],
            extra: '',
          },
          {
            school: EDU.bachelor.school[isZh ? 'zh' : 'en'],
            faculty: EDU.bachelor.faculty[isZh ? 'zh' : 'en'],
            degree: EDU.bachelor.degree[isZh ? 'zh' : 'en'],
            period: EDU.bachelor.period,
            courses: EDU.bachelor.courses[isZh ? 'zh' : 'en'],
            extra: EDU.bachelor.gpa[isZh ? 'zh' : 'en'],
          },
        ].map((edu, i) => (
          <div key={i} style={{ marginBottom: i === 0 ? '5pt' : 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span>
                <strong style={{ fontSize: fs() }}>{edu.school}</strong>
                <span style={{ color: gray, fontSize: fs(-0.5), marginLeft: '5pt' }}>{edu.faculty}  ·  {edu.degree}{edu.extra ? `  ·  ${edu.extra}` : ''}</span>
              </span>
              <span style={{ color: gray, fontSize: fs(-1), flexShrink: 0 }}>{edu.period}</span>
            </div>
            <div style={{ fontSize: fs(-1), color: '#6b7280', paddingLeft: '4pt', marginTop: '1pt' }}>
              <strong style={{ color: '#374151' }}>{isZh ? '主要课程：' : 'Key Courses: '}</strong>{edu.courses}
            </div>
          </div>
        ))}
      </div>

      {/* Experience — STAR format */}
      {expList.length > 0 && (
        <div style={{ marginBottom: '9pt' }}>
          <div style={secTitle}>{isZh ? '实习经历' : 'Internship Experience'}</div>
          {expList.map((exp, i) => {
            const company = isZh ? exp.company : exp.companyEn;
            const role = isZh ? exp.role : exp.roleEn;
            const period = isZh ? exp.period : exp.periodEn;
            const stars = STAR_DATA[exp.company] || [];

            return (
              <div key={i} style={{ marginBottom: i < expList.length - 1 ? '7pt' : 0 }}>
                {/* Company header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '3pt' }}>
                  <div>
                    <strong style={{ fontSize: fs(), color: '#111827' }}>{company}</strong>
                    <span style={{ color: blue, fontSize: fs(-0.5), margin: '0 4pt' }}>·</span>
                    <span style={{ color: blue, fontSize: fs(-0.5), fontWeight: 500 }}>{role}</span>
                  </div>
                  <span style={{ color: gray, fontSize: fs(-1), flexShrink: 0 }}>{period}</span>
                </div>

                {/* STAR entries */}
                {stars.map((entry, ei) => (
                  <div key={ei} style={{ marginBottom: '3pt', paddingLeft: '4pt' }}>
                    <div style={{ fontSize: fs(-0.5), fontWeight: 700, color: '#1f2937', marginBottom: '1.5pt' }}>
                      ▸ {isZh ? entry.title : entry.titleEn}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1pt 6pt' }}>
                      {[
                        { label: 'S', content: isZh ? entry.s : entry.sEn, color: '#1d4ed8' },
                        { label: 'T', content: isZh ? entry.t : entry.tEn, color: '#7c3aed' },
                        { label: 'A', content: isZh ? entry.a : entry.aEn, color: '#b45309' },
                        { label: 'R', content: isZh ? entry.r : entry.rEn, color: '#15803d' },
                      ].map(({ label, content, color }) => (
                        <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: '3pt', fontSize: fs(-1.5) }}>
                          <span style={{ flexShrink: 0, fontWeight: 700, color, minWidth: '8pt' }}>{label}</span>
                          <span style={{ color: '#4b5563', lineHeight: 1.25 }}>{content}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}

      {/* Projects */}
      {projList.length > 0 && (
        <div style={{ marginBottom: '9pt' }}>
          <div style={secTitle}>{isZh ? '研究项目' : 'Research Projects'}</div>
          {projList.map((proj, i) => {
            const title = isZh ? proj.title : proj.titleEn;
            const subtitle = isZh ? proj.subtitle : proj.subtitleEn;
            const status = isZh ? proj.status : proj.statusEn;
            const objective = isZh ? proj.objective : proj.objectiveEn;
            const techStr = proj.tech.slice(0, 6).join(' · ');

            return (
              <div key={i} style={{ marginBottom: i < projList.length - 1 ? '5pt' : 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.5pt' }}>
                  <div>
                    <strong style={{ fontSize: fs() }}>{title}</strong>
                    <span style={{ color: gray, fontSize: fs(-1), marginLeft: '5pt' }}>{subtitle}</span>
                  </div>
                  <span style={{ color: gray, fontSize: fs(-1), flexShrink: 0 }}>{status}</span>
                </div>
                <div style={bullet}>• <strong style={{ color: blue }}>{isZh ? '技术栈：' : 'Tech: '}</strong>{techStr}</div>
                <div style={bullet}>• {objective.length > 80 ? objective.slice(0, 80) + '…' : objective}</div>
              </div>
            );
          })}
        </div>
      )}

      {/* Skills + Certifications (combined) */}
      {includeSkillsCerts && (
        <div style={{ marginBottom: '9pt' }}>
          <div style={secTitle}>{isZh ? '技术技能 & 专业认证' : 'Skills & Certifications'}</div>
          {[
            { label: isZh ? '编程' : 'Programming', value: SKILLS.programming.join('  ·  ') },
            { label: isZh ? '数据分析' : 'Data Tools', value: SKILLS.dataTools.join('  ·  ') },
            { label: isZh ? '金融技能' : 'Finance', value: (isZh ? SKILLS.finance.zh : SKILLS.finance.en).join('  ·  ') },
          ].map(({ label, value }) => (
            <div key={label} style={{ fontSize: fs(-0.5), marginBottom: '1.5pt' }}>
              <strong style={{ color: blue }}>{label}：</strong>{value}
            </div>
          ))}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5pt 8pt', marginTop: '2pt' }}>
            {(isZh ? SKILLS.certs.zh : SKILLS.certs.en).map((c, i) => (
              <div key={i} style={{ fontSize: fs(-0.5), color: '#374151' }}>• {c}</div>
            ))}
          </div>
        </div>
      )}

      {/* Self-evaluation */}
      {includeSelfEval && (
        <div>
          <div style={secTitle}>{isZh ? '自我评价' : 'Self-Evaluation'}</div>
          <div style={{ fontSize: fs(-0.5), color: '#374151', lineHeight: 1.4 }}>{selfEval}</div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────
// Toggle row helper
// ─────────────────────────────────────────
function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} className="w-4 h-4 rounded accent-blue-600 flex-shrink-0" />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );
}

// ─────────────────────────────────────────
// Main Modal
// ─────────────────────────────────────────
export default function ResumeExportModal({ isOpen, onClose, experiences, projects, lang }: Props) {
  const isZh = lang === 'zh';

  // Default: first 2 experiences + first 2 projects
  const [selectedExps, setSelectedExps] = useState<Set<number>>(new Set([0, 1]));
  const [selectedProjects, setSelectedProjects] = useState<Set<number>>(new Set([0, 1]));
  const [includeSkillsCerts, setIncludeSkillsCerts] = useState(true);
  const [includeSelfEval, setIncludeSelfEval] = useState(true);
  const [includePhoto, setIncludePhoto] = useState(true);
  const [fontSize, setFontSize] = useState(8);
  const [objective, setObjective] = useState(
    isZh
      ? '寻求金融分析 / 数据科学 / 量化研究方向实习，期望将金融专业知识与Python数据分析、LLM应用能力结合，参与有挑战性的金融项目。'
      : 'Seeking internship in financial analysis / data science / quantitative research, eager to apply finance expertise with Python analytics and LLM capabilities to impactful financial projects.'
  );

  if (!isOpen) return null;

  const toggleExp = (i: number) => {
    const s = new Set(selectedExps); s.has(i) ? s.delete(i) : s.add(i); setSelectedExps(s);
  };
  const toggleProj = (i: number) => {
    const s = new Set(selectedProjects); s.has(i) ? s.delete(i) : s.add(i); setSelectedProjects(s);
  };

  const handlePrint = () => {
    const el = document.getElementById('resume-preview-content');
    if (!el) return;
    const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8">
<title>${isZh ? '顾杰_简历' : 'Kris_Gu_Resume'}</title>
<style>
  @page { size: A4 portrait; margin: 0; }
  * { -webkit-print-color-adjust: exact; print-color-adjust: exact; box-sizing: border-box; }
  body { margin: 0; padding: 0; background: #fff; }
</style></head>
<body>${el.outerHTML}</body></html>`;
    const win = window.open('', '_blank', 'width=900,height=750');
    if (win) { win.document.write(html); win.document.close(); setTimeout(() => { win.focus(); win.print(); }, 350); }
  };

  const SCALE = 0.62;
  const scaledW = Math.round(794 * SCALE);
  const scaledH = Math.round(1123 * SCALE);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-3">
      <div className="bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden" style={{ width: '96vw', maxWidth: '1120px', height: '93vh' }}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-gray-100 flex-shrink-0">
          <div>
            <h2 className="text-lg font-bold text-gray-900">{isZh ? '简历预览与导出' : 'Resume Preview & Export'}</h2>
            <p className="text-xs text-gray-400 mt-0.5">{isZh ? 'A4 实时预览 · 选择内容 · 打印/PDF' : 'Live A4 preview · select sections · print/PDF'}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition"><X size={20} /></button>
        </div>

        {/* Body */}
        <div className="flex flex-1 overflow-hidden">

          {/* ── Left Panel ── */}
          <div className="w-64 flex-shrink-0 border-r border-gray-100 overflow-y-auto px-4 py-4 space-y-4">

            {/* Objective */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">{isZh ? '求职意向' : 'Objective'}</p>
              <textarea
                value={objective}
                onChange={e => setObjective(e.target.value)}
                rows={4}
                className="w-full text-xs text-gray-700 border border-gray-200 rounded-lg px-2.5 py-2 resize-none focus:outline-none focus:border-primary-400 leading-relaxed"
                placeholder={isZh ? '输入求职意向…' : 'Enter career objective…'}
              />
            </div>

            {/* Photo + Font */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={includePhoto} onChange={e => setIncludePhoto(e.target.checked)} className="w-4 h-4 rounded accent-blue-600" />
                <span className="text-sm text-gray-700 flex items-center gap-1"><User size={13} />{isZh ? '证件照' : 'Photo'}</span>
              </label>
              <div className="flex items-center gap-1.5">
                <button onClick={() => setFontSize(s => Math.max(7, s - 1))} className="w-6 h-6 rounded-md border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-600"><Minus size={11} /></button>
                <span className="text-xs font-semibold w-8 text-center text-gray-700">{fontSize}pt</span>
                <button onClick={() => setFontSize(s => Math.min(11, s + 1))} className="w-6 h-6 rounded-md border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-600"><Plus size={11} /></button>
              </div>
            </div>

            {/* Experiences */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{isZh ? '实习经历' : 'Experience'}</p>
              <div className="space-y-2">
                {experiences.map((exp, i) => (
                  <label key={i} className="flex items-start gap-2 cursor-pointer group">
                    <input type="checkbox" checked={selectedExps.has(i)} onChange={() => toggleExp(i)} className="mt-0.5 w-4 h-4 rounded accent-blue-600 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm text-gray-800 font-medium leading-tight group-hover:text-primary-600 transition-colors">{isZh ? exp.company : exp.companyEn}</p>
                      <p className="text-xs text-gray-400 truncate">{isZh ? exp.role : exp.roleEn}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{isZh ? '研究项目' : 'Projects'}</p>
              <div className="space-y-2">
                {projects.map((proj, i) => (
                  <label key={i} className="flex items-start gap-2 cursor-pointer group">
                    <input type="checkbox" checked={selectedProjects.has(i)} onChange={() => toggleProj(i)} className="mt-0.5 w-4 h-4 rounded accent-blue-600 flex-shrink-0" />
                    <p className="text-sm text-gray-800 font-medium leading-snug group-hover:text-primary-600 transition-colors">{isZh ? proj.title : proj.titleEn}</p>
                  </label>
                ))}
              </div>
            </div>

            {/* Other sections */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{isZh ? '其他板块' : 'Sections'}</p>
              <Toggle label={isZh ? '技能 & 认证' : 'Skills & Certs'} checked={includeSkillsCerts} onChange={setIncludeSkillsCerts} />
              <Toggle label={isZh ? '自我评价' : 'Self-Evaluation'} checked={includeSelfEval} onChange={setIncludeSelfEval} />
            </div>

            {/* Tip */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800 leading-relaxed">
              {isZh
                ? '💡 打印时选"另存为 PDF"，纸张 A4，关闭页眉页脚，缩放选"适合页面"。'
                : '💡 When printing, choose "Save as PDF", A4 paper, no headers/footers, scale "Fit to page".'}
            </div>
          </div>

          {/* ── Right Panel: Preview ── */}
          <div className="flex-1 bg-gray-100 overflow-auto flex flex-col items-center py-5 px-4">
            <p className="text-xs text-gray-400 mb-3 flex-shrink-0">{isZh ? 'A4 预览（62%）· 内容超出一页时减少选项或调小字体' : 'A4 preview (62%) · reduce items or font if overflowing'}</p>
            <div
              className="flex-shrink-0 shadow-2xl ring-1 ring-gray-200 overflow-hidden"
              style={{ width: `${scaledW}px`, height: `${scaledH}px`, position: 'relative' }}
            >
              <div style={{ width: '794px', height: '1123px', transform: `scale(${SCALE})`, transformOrigin: 'top left', position: 'absolute', top: 0, left: 0, overflow: 'hidden' }}>
                <ResumePreview
                  experiences={experiences} projects={projects}
                  selectedExps={selectedExps} selectedProjects={selectedProjects}
                  includeSkillsCerts={includeSkillsCerts} includeSelfEval={includeSelfEval}
                  fontSize={fontSize} lang={lang} objective={objective} includePhoto={includePhoto}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 px-6 py-3.5 flex justify-end items-center gap-3 flex-shrink-0 bg-gray-50/50">
          <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition text-sm">{isZh ? '取消' : 'Cancel'}</button>
          <button onClick={handlePrint} className="flex items-center gap-2 bg-primary-600 text-white px-6 py-2.5 rounded-xl hover:bg-primary-700 transition font-medium text-sm shadow-sm">
            <Printer size={16} />
            {isZh ? '打印 / 导出 PDF' : 'Print / Save as PDF'}
          </button>
        </div>
      </div>
    </div>
  );
}
