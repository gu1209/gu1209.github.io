'use client';

import { useState } from 'react';
import { X, Printer, Minus, Plus, ChevronDown, Pencil } from 'lucide-react';
import { EXP_CONTENT, PROJ_CONTENT } from '@/lib/resumeContent';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  experiences: any[];
  projects: any[];
  lang: 'zh' | 'en';
}

const EDU = {
  master: {
    school: { zh: '天津大学（985）', en: 'Tianjin University (985)' },
    major: { zh: '金融', en: 'Finance' },
    degree: { zh: '硕士', en: 'Master' },
    period: '2024.09-2027.01',
    gpa: { zh: 'GPA：92.21（专业前10%），天津大学二等学业奖学金', en: 'GPA: 92.21 (Top 10%), Second-class Scholarship' },
    courses: { zh: '大数据与金融风险、金融随机分析、金融数据分析、衍生金融工具、公司金融', en: 'Big Data & Financial Risk, Financial Stochastic Analysis, Financial Data Analysis, Derivatives, Corporate Finance' },
  },
  bachelor: {
    school: { zh: '中国矿业大学（211）', en: 'China University of Mining & Technology (211)' },
    major: { zh: '金融', en: 'Finance' },
    degree: { zh: '本科', en: 'Bachelor' },
    period: '2020.09-2024.06',
    gpa: { zh: 'GPA：4.15（专业前15%），中国矿业大学二等学业奖学金', en: 'GPA: 4.15 (Top 15%), Second-class Scholarship' },
    courses: { zh: '金融数据分析、宏观经济学、微观经济学、Python数据分析、金融经济学、证券投资', en: 'Financial Data Analysis, Macroeconomics, Microeconomics, Python Data Analysis, Financial Economics, Securities Investment' },
  },
};

const SKILLS_ZH = [
  { title: '数据分析', text: '熟练掌握Python（Pandas/NumPy/Scikit-learn/BERT）进行数据清洗与机器学习建模；使用Wind、Choice等金融终端获取专业数据；可运用MySQL进行数据查询与管理。' },
  { title: 'AI应用', text: '熟练借助Coze、Claude Code等AI工具搭建智能体与自动化Skill，具备清晰的Prompt设计能力，能高效实现代码生成、流程自动化与金融场景LLM应用。' },
  { title: '软件技能', text: '精通MS Office（Excel数据透视表/VLOOKUP/图表），掌握Power BI数据可视化，熟练使用Jira/Confluence，掌握SQL与VBA自动化。' },
  { title: '专业资质', text: 'CPA：通过4科（会计、财管、经济法、战略风管）；CTA：通过4科（财会、税法一、税法二、涉税实务）；初级会计资格证；基金从业资格。' },
  { title: '语言能力', text: '英语六级（CET-6），能熟练阅读英文行业报告，胜任工作场景下的口语交流。' },
];
const SKILLS_EN = [
  { title: 'Data Analytics', text: 'Proficient in Python (Pandas/NumPy/Scikit-learn/BERT) for data cleaning and ML modeling; Wind/Choice financial terminals; MySQL for data management.' },
  { title: 'AI Applications', text: 'Skilled in building AI agents and automation skills with Coze and Claude Code; clear prompt engineering; efficient LLM applications in financial scenarios.' },
  { title: 'Software Skills', text: 'Proficient in MS Office (Excel pivot/VLOOKUP/charts), Power BI, Jira/Confluence, SQL, and VBA automation.' },
  { title: 'Certifications', text: 'CPA: 4 subjects (Accounting, Financial Mgmt, Economic Law, Strategy); CTA: 4 subjects; Junior Accounting Certificate; Fund Practitioner Certificate.' },
  { title: 'Languages', text: 'CET-6 English — proficient in reading industry reports and professional oral communication.' },
];

// Parse **bold** markers → React nodes
function Bold({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return <>{parts.map((p, i) => i % 2 === 1 ? <strong key={i}>{p}</strong> : <span key={i}>{p}</span>)}</>;
}

function SectionTitle({ label, size }: { label: string; size: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6pt', marginBottom: '4pt' }}>
      <strong style={{ fontSize: size, flexShrink: 0, letterSpacing: '0.3px' }}>{label}</strong>
      <div style={{ flex: 1, height: '0.8pt', background: '#222' }} />
    </div>
  );
}

// ── Resume Preview ──────────────────────────────────────────────────────────
function ResumePreview({
  experiences, projects, selectedExps, selectedProjects,
  includeSkills, includeSelfEval, fontSize, lang,
  objective, includePhoto, expBullets, projBullets,
}: {
  experiences: any[]; projects: any[]; selectedExps: Set<number>; selectedProjects: Set<number>;
  includeSkills: boolean; includeSelfEval: boolean; fontSize: number;
  lang: 'zh' | 'en'; objective: string; includePhoto: boolean;
  expBullets: Record<string, [string, string]>; projBullets: Record<string, [string, string]>;
}) {
  const isZh = lang === 'zh';
  const expList = experiences.filter((_, i) => selectedExps.has(i));
  const projList = projects.filter((_, i) => selectedProjects.has(i));
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const f = (d = 0) => `${fontSize + d}pt`;
  const gray = '#555';

  const selfEval = isZh
    ? '具备金融专业背景与CPA/CTA证书体系知识，熟练掌握Python数据分析与机器学习，能将LLM应用于金融实际场景。实习经历覆盖资金分析、资产交易、项目管理、行业研究等多个领域，学习迅速、注重量化成果、善于跨部门协作。'
    : 'Strong finance foundation with CPA/CTA credentials, proficient in Python analytics and ML, experienced in applying LLMs to financial scenarios. Internship spans fund analysis, asset transactions, project management, and equity research. Fast learner, results-driven, effective cross-functional collaborator.';

  const bulletStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'flex-start', gap: '5pt',
    paddingLeft: '3pt', marginBottom: '2.5pt',
  };
  const textStyle: React.CSSProperties = { fontSize: f(-0.5), color: '#1a1a1a', lineHeight: 1.4 };

  return (
    <div id="resume-preview-content" style={{
      width: '794px', minHeight: '1123px', background: '#fff',
      fontFamily: "'Microsoft YaHei','PingFang SC','Hiragino Sans GB','SimHei',Arial,sans-serif",
      fontSize: f(), lineHeight: 1.5, color: '#111',
      padding: '26pt 36pt 20pt', boxSizing: 'border-box',
    }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10pt', borderBottom: '1.5pt solid #111', paddingBottom: '7pt', marginBottom: '8pt' }}>
        <img src={`${origin}/logos/tju_logo.svg`} alt="TJU" style={{ width: '40pt', height: '40pt', objectFit: 'contain', marginTop: '2pt', flexShrink: 0 }} />
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: f(11), fontWeight: 900, letterSpacing: '5px', lineHeight: 1, marginBottom: '4pt' }}>
            {isZh ? '顾杰' : 'Kris Gu'}
          </div>
          {objective.trim() && (
            <div style={{ fontSize: f(0.5), fontWeight: 700, marginBottom: '3pt' }}>
              {isZh ? '求职意向：' : 'Objective: '}{objective.trim()}
            </div>
          )}
          <div style={{ fontSize: f(-1), color: gray }}>
            (+86)19292244363&nbsp;&nbsp;│&nbsp;&nbsp;gujie_kris@163.com&nbsp;&nbsp;│&nbsp;&nbsp;github.com/gu1209&nbsp;&nbsp;│&nbsp;&nbsp;gu1209.github.io&nbsp;&nbsp;│&nbsp;&nbsp;{isZh ? '现居地：天津' : 'Tianjin, China'}
          </div>
        </div>
        {includePhoto && (
          <img src={`${origin}/images/profile.jpg`} alt="photo"
            style={{ width: '52pt', height: '66pt', objectFit: 'cover', border: '0.5pt solid #ccc', borderRadius: '2pt', flexShrink: 0 }} />
        )}
      </div>

      {/* Education */}
      <div style={{ marginBottom: '9pt' }}>
        <SectionTitle label={isZh ? '教育背景' : 'Education'} size={f(1)} />
        {[EDU.master, EDU.bachelor].map((edu, i) => (
          <div key={i} style={{ marginBottom: i === 0 ? '4pt' : 0 }}>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <strong style={{ fontSize: f(), flex: '0 0 auto', marginRight: '16pt' }}>{edu.school[isZh ? 'zh' : 'en']}</strong>
              <span style={{ marginRight: '16pt' }}>{edu.major[isZh ? 'zh' : 'en']}</span>
              <span style={{ marginRight: '16pt' }}>{edu.degree[isZh ? 'zh' : 'en']}</span>
              <span style={{ flex: 1, textAlign: 'right', color: gray, fontSize: f(-0.5) }}>{edu.period}</span>
            </div>
            <div style={{ fontSize: f(-0.5), color: '#333', paddingLeft: '2pt', lineHeight: 1.4 }}>{edu.gpa[isZh ? 'zh' : 'en']}</div>
            <div style={{ fontSize: f(-0.5), color: '#333', paddingLeft: '2pt', lineHeight: 1.4 }}>
              <strong>{isZh ? '主修课程：' : 'Key Courses: '}</strong>{edu.courses[isZh ? 'zh' : 'en']}
            </div>
          </div>
        ))}
      </div>

      {/* Experience */}
      {expList.length > 0 && (
        <div style={{ marginBottom: '9pt' }}>
          <SectionTitle label={isZh ? '实习经历' : 'Internship Experience'} size={f(1)} />
          {expList.map((exp, i) => {
            const company = isZh ? exp.company : exp.companyEn;
            const role = isZh ? exp.role : exp.roleEn;
            const period = (isZh ? exp.period : exp.periodEn).replace(/年/g, '.').replace(/月/g, '').replace(/\s/g, '');
            const bullets = expBullets[exp.company] || ['', ''];
            return (
              <div key={i} style={{ marginBottom: i < expList.length - 1 ? '6pt' : 0 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '2pt' }}>
                  <strong style={{ flex: '0 0 30%', fontSize: f() }}>{role}</strong>
                  <strong style={{ flex: '0 0 42%', textAlign: 'center', fontSize: f() }}>{company}</strong>
                  <span style={{ flex: '0 0 28%', textAlign: 'right', fontSize: f(-1), color: gray }}>{period}</span>
                </div>
                {bullets.filter(Boolean).map((b, bi) => (
                  <div key={bi} style={bulletStyle}>
                    <span style={{ flexShrink: 0, fontSize: f(-0.5), marginTop: '1pt' }}>•</span>
                    <span style={textStyle}><Bold text={b} /></span>
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
          <SectionTitle label={isZh ? '项目经历' : 'Research Projects'} size={f(1)} />
          {projList.map((proj, i) => {
            const title = isZh ? proj.title : proj.titleEn;
            const status = isZh ? proj.status : proj.statusEn;
            const bullets = projBullets[proj.title] || ['', ''];
            return (
              <div key={i} style={{ marginBottom: i < projList.length - 1 ? '6pt' : 0 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '2pt' }}>
                  <strong style={{ flex: '0 0 55%', fontSize: f() }}>{title}</strong>
                  <span style={{ flex: '0 0 20%', textAlign: 'center', fontSize: f(-1), color: gray }}>
                    {proj.tech.slice(0, 3).join('/')}
                  </span>
                  <span style={{ flex: '0 0 25%', textAlign: 'right', fontSize: f(-1), color: gray }}>{status}</span>
                </div>
                {bullets.filter(Boolean).map((b, bi) => (
                  <div key={bi} style={bulletStyle}>
                    <span style={{ flexShrink: 0, fontSize: f(-0.5), marginTop: '1pt' }}>•</span>
                    <span style={textStyle}><Bold text={b} /></span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}

      {/* Skills */}
      {includeSkills && (
        <div style={{ marginBottom: '9pt' }}>
          <SectionTitle label={isZh ? '技能＆证书' : 'Skills & Certifications'} size={f(1)} />
          {(isZh ? SKILLS_ZH : SKILLS_EN).map(({ title, text }, i) => (
            <div key={i} style={{ ...bulletStyle, marginBottom: '2pt' }}>
              <span style={{ flexShrink: 0, fontSize: f(-0.5), marginTop: '1pt' }}>•</span>
              <span style={textStyle}><strong>{title}：</strong>{text}</span>
            </div>
          ))}
        </div>
      )}

      {/* Self-eval */}
      {includeSelfEval && (
        <div>
          <SectionTitle label={isZh ? '自我评价' : 'Self-Evaluation'} size={f(1)} />
          <div style={{ ...textStyle, paddingLeft: '3pt' }}>{selfEval}</div>
        </div>
      )}
    </div>
  );
}

// ── Main Modal ──────────────────────────────────────────────────────────────
export default function ResumeExportModal({ isOpen, onClose, experiences, projects, lang }: Props) {
  const isZh = lang === 'zh';

  // Selection state
  const [selectedExps, setSelectedExps] = useState<Set<number>>(new Set([0, 1]));
  const [selectedProjects, setSelectedProjects] = useState<Set<number>>(new Set([0, 1]));
  const [includeSkills, setIncludeSkills] = useState(true);
  const [includeSelfEval, setIncludeSelfEval] = useState(false);
  const [includePhoto, setIncludePhoto] = useState(true);
  const [fontSize, setFontSize] = useState(9);
  const [objective, setObjective] = useState(isZh ? '财务BP实习生' : 'Finance / Data Analytics Intern');

  // Editable content — initialised from resumeContent.ts
  const [expBullets, setExpBullets] = useState<Record<string, [string, string]>>(() => {
    const out: Record<string, [string, string]> = {};
    experiences.forEach(exp => {
      const c = EXP_CONTENT[exp.company];
      if (c) out[exp.company] = isZh ? [c.zh[0], c.zh[1]] : [c.en[0], c.en[1]];
    });
    return out;
  });
  const [projBullets, setProjBullets] = useState<Record<string, [string, string]>>(() => {
    const out: Record<string, [string, string]> = {};
    projects.forEach(proj => {
      const c = PROJ_CONTENT[proj.title];
      if (c) out[proj.title] = isZh ? [c.zh[0], c.zh[1]] : [c.en[0], c.en[1]];
    });
    return out;
  });

  // Which items have their edit panel expanded
  const [editOpen, setEditOpen] = useState<Set<string>>(new Set());

  // Password gate
  const [pwVisible, setPwVisible] = useState(false);
  const [pwInput, setPwInput] = useState('');
  const [pwError, setPwError] = useState(false);

  if (!isOpen) return null;

  const toggleSel = (set: Set<number>, idx: number) => {
    const s = new Set(set); s.has(idx) ? s.delete(idx) : s.add(idx); return s;
  };
  const toggleEdit = (key: string) => {
    const s = new Set(editOpen); s.has(key) ? s.delete(key) : s.add(key); setEditOpen(s);
  };

  const doPrint = () => {
    const el = document.getElementById('resume-preview-content');
    if (!el) return;
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8">
<title>${isZh ? '顾杰_简历' : 'Kris_Gu_Resume'}</title>
<style>
  @page { size: A4 portrait; margin: 0; }
  * { -webkit-print-color-adjust: exact; print-color-adjust: exact; box-sizing: border-box; }
  body { margin: 0; padding: 0; background: #fff; }
</style></head><body>${el.outerHTML}</body></html>`;
    const win = window.open('', '_blank', 'width=900,height=750');
    if (win) { win.document.write(html); win.document.close(); setTimeout(() => { win.focus(); win.print(); }, 350); }
  };

  const handlePrintClick = () => { setPwInput(''); setPwError(false); setPwVisible(true); };
  const handlePwSubmit = () => {
    if (pwInput === '1209') { setPwVisible(false); setPwInput(''); setPwError(false); doPrint(); }
    else { setPwError(true); setPwInput(''); }
  };

  const SCALE = 0.62;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-3">
      <div className="bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        style={{ width: '96vw', maxWidth: '1240px', height: '93vh' }}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100 flex-shrink-0">
          <div>
            <h2 className="text-lg font-bold text-gray-900">{isZh ? '简历预览与导出' : 'Resume Preview & Export'}</h2>
            <p className="text-xs text-gray-400 mt-0.5">{isZh ? '左侧选择并编辑内容，右侧实时预览 A4' : 'Select & edit content on left, live A4 preview on right'}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition"><X size={20} /></button>
        </div>

        <div className="flex flex-1 overflow-hidden">

          {/* ── Left: controls + inline editor ── */}
          <div className="w-72 flex-shrink-0 border-r border-gray-100 overflow-y-auto px-4 py-4 space-y-4">

            {/* Objective */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">{isZh ? '求职意向' : 'Objective'}</label>
              <input
                value={objective} onChange={e => setObjective(e.target.value)}
                className="w-full text-sm border border-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-primary-400"
                placeholder={isZh ? '如：财务BP实习生' : 'e.g. Finance Intern'}
              />
            </div>

            {/* Photo + Font */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-1.5 cursor-pointer text-sm text-gray-700">
                <input type="checkbox" checked={includePhoto} onChange={e => setIncludePhoto(e.target.checked)} className="w-4 h-4 accent-blue-600" />
                {isZh ? '证件照' : 'Photo'}
              </label>
              <div className="flex items-center gap-1">
                <button onClick={() => setFontSize(s => Math.max(7, s - 1))} className="w-6 h-6 rounded border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-500"><Minus size={11} /></button>
                <span className="text-xs font-semibold w-7 text-center">{fontSize}pt</span>
                <button onClick={() => setFontSize(s => Math.min(11, s + 1))} className="w-6 h-6 rounded border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-500"><Plus size={11} /></button>
              </div>
            </div>

            {/* Experiences */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{isZh ? '实习经历' : 'Experience'}</p>
              <div className="space-y-2">
                {experiences.map((exp, i) => {
                  const key = exp.company;
                  const isSelected = selectedExps.has(i);
                  const isEditing = editOpen.has(key);
                  const bullets = expBullets[key] || ['', ''];
                  return (
                    <div key={i} className={`rounded-xl border transition-colors ${isSelected ? 'border-primary-200 bg-primary-50/30' : 'border-gray-100 bg-gray-50/50'}`}>
                      <div className="flex items-center gap-2 px-3 py-2">
                        <input type="checkbox" checked={isSelected} onChange={() => setSelectedExps(toggleSel(selectedExps, i))} className="w-4 h-4 accent-blue-600 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 leading-tight truncate">{isZh ? exp.company : exp.companyEn}</p>
                          <p className="text-xs text-gray-400">{isZh ? exp.period : exp.periodEn}</p>
                        </div>
                        {isSelected && (
                          <button onClick={() => toggleEdit(key)} className="flex-shrink-0 p-1 hover:bg-primary-100 rounded-lg transition" title="编辑内容">
                            {isEditing ? <ChevronDown size={14} className="text-primary-600 rotate-180 transition-transform" /> : <Pencil size={13} className="text-primary-500" />}
                          </button>
                        )}
                      </div>
                      {isSelected && isEditing && (
                        <div className="px-3 pb-3 space-y-2 border-t border-primary-100 pt-2">
                          {(['• 要点一', '• 要点二'] as const).map((ph, bi) => (
                            <textarea
                              key={bi}
                              value={bullets[bi]}
                              onChange={e => {
                                const updated: [string, string] = [bullets[0], bullets[1]];
                                updated[bi] = e.target.value;
                                setExpBullets(prev => ({ ...prev, [key]: updated }));
                              }}
                              rows={4}
                              className="w-full text-xs text-gray-700 border border-gray-200 rounded-lg px-2 py-1.5 resize-none focus:outline-none focus:border-primary-400 leading-relaxed"
                              placeholder={ph}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Projects */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{isZh ? '项目经历' : 'Projects'}</p>
              <div className="space-y-2">
                {projects.map((proj, i) => {
                  const key = proj.title;
                  const isSelected = selectedProjects.has(i);
                  const isEditing = editOpen.has(key);
                  const bullets = projBullets[key] || ['', ''];
                  return (
                    <div key={i} className={`rounded-xl border transition-colors ${isSelected ? 'border-primary-200 bg-primary-50/30' : 'border-gray-100 bg-gray-50/50'}`}>
                      <div className="flex items-start gap-2 px-3 py-2">
                        <input type="checkbox" checked={isSelected} onChange={() => setSelectedProjects(toggleSel(selectedProjects, i))} className="mt-0.5 w-4 h-4 accent-blue-600 flex-shrink-0" />
                        <p className="flex-1 text-sm font-medium text-gray-800 leading-snug text-sm">{isZh ? proj.title : proj.titleEn}</p>
                        {isSelected && (
                          <button onClick={() => toggleEdit(key)} className="flex-shrink-0 p-1 hover:bg-primary-100 rounded-lg transition">
                            {isEditing ? <ChevronDown size={14} className="text-primary-600 rotate-180 transition-transform" /> : <Pencil size={13} className="text-primary-500" />}
                          </button>
                        )}
                      </div>
                      {isSelected && isEditing && (
                        <div className="px-3 pb-3 space-y-2 border-t border-primary-100 pt-2">
                          {(['• 要点一', '• 要点二'] as const).map((ph, bi) => (
                            <textarea
                              key={bi}
                              value={bullets[bi]}
                              onChange={e => {
                                const updated: [string, string] = [bullets[0], bullets[1]];
                                updated[bi] = e.target.value;
                                setProjBullets(prev => ({ ...prev, [key]: updated }));
                              }}
                              rows={4}
                              className="w-full text-xs text-gray-700 border border-gray-200 rounded-lg px-2 py-1.5 resize-none focus:outline-none focus:border-primary-400 leading-relaxed"
                              placeholder={ph}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Other toggles */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{isZh ? '其他板块' : 'Sections'}</p>
              {[
                { label: isZh ? '技能＆证书' : 'Skills & Certs', v: includeSkills, set: setIncludeSkills },
                { label: isZh ? '自我评价' : 'Self-Eval', v: includeSelfEval, set: setIncludeSelfEval },
              ].map(({ label, v, set }) => (
                <label key={label} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={v} onChange={e => set(e.target.checked)} className="w-4 h-4 accent-blue-600" />
                  <span className="text-sm text-gray-700">{label}</span>
                </label>
              ))}
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800 leading-relaxed">
              {isZh
                ? '💡 点击铅笔图标可直接编辑简历文字。打印时选"另存为 PDF"，A4，关闭页眉页脚。'
                : '💡 Click the pencil icon to edit bullet text inline. Print → "Save as PDF", A4, no headers/footers.'}
            </div>
          </div>

          {/* ── Right: A4 preview ── */}
          <div className="flex-1 bg-gray-100 overflow-auto flex flex-col items-center py-5 px-4">
            <p className="text-xs text-gray-400 mb-3 flex-shrink-0">
              {isZh ? 'A4 预览（62%）· 内容过多时减少选项或调小字号' : 'A4 preview (62%) · reduce items or font size if overflowing'}
            </p>
            <div className="flex-shrink-0 shadow-2xl ring-1 ring-gray-200 overflow-hidden"
              style={{ width: `${Math.round(794 * SCALE)}px`, height: `${Math.round(1123 * SCALE)}px`, position: 'relative' }}>
              <div style={{
                width: '794px', height: '1123px',
                transform: `scale(${SCALE})`, transformOrigin: 'top left',
                position: 'absolute', top: 0, left: 0, overflow: 'hidden',
              }}>
                <ResumePreview
                  experiences={experiences} projects={projects}
                  selectedExps={selectedExps} selectedProjects={selectedProjects}
                  includeSkills={includeSkills} includeSelfEval={includeSelfEval}
                  fontSize={fontSize} lang={lang} objective={objective}
                  includePhoto={includePhoto} expBullets={expBullets} projBullets={projBullets}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 px-6 py-3.5 flex-shrink-0 bg-gray-50/50">
          {pwVisible && (
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm text-gray-600 flex-shrink-0">{isZh ? '请输入密码：' : 'Enter password:'}</span>
              <input
                type="password" value={pwInput}
                onChange={e => { setPwInput(e.target.value); setPwError(false); }}
                onKeyDown={e => e.key === 'Enter' && handlePwSubmit()}
                autoFocus
                className={`w-28 text-sm border rounded-lg px-2.5 py-1.5 focus:outline-none ${pwError ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-primary-400'}`}
                placeholder="••••"
              />
              <button onClick={handlePwSubmit} className="px-3 py-1.5 bg-primary-600 text-white rounded-lg text-sm hover:bg-primary-700 transition font-medium">{isZh ? '确认' : 'OK'}</button>
              <button onClick={() => { setPwVisible(false); setPwError(false); }} className="px-3 py-1.5 text-gray-500 hover:bg-gray-100 rounded-lg text-sm transition">{isZh ? '取消' : 'Cancel'}</button>
              {pwError && <span className="text-xs text-red-500 font-medium">{isZh ? '密码错误' : 'Wrong password'}</span>}
            </div>
          )}
          <div className="flex justify-end gap-3">
            <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition text-sm">{isZh ? '关闭' : 'Close'}</button>
            <button onClick={handlePrintClick} className="flex items-center gap-2 bg-primary-600 text-white px-6 py-2.5 rounded-xl hover:bg-primary-700 transition font-medium text-sm shadow-sm">
              <Printer size={16} />
              {isZh ? '打印 / 导出 PDF' : 'Print / Save as PDF'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
