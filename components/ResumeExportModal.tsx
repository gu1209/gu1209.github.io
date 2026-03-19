'use client';

import { useState } from 'react';
import { X, Printer, Minus, Plus } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  experiences: any[];
  projects: any[];
  lang: 'zh' | 'en';
}

// Skills data (mirrored from page.tsx for standalone use)
const SKILLS = {
  programming: ['Python', 'SQL', 'VBA'],
  dataTools: ['Pandas', 'NumPy', 'Scikit-learn', 'BERT', 'MySQL', 'Wind/Choice', 'Power BI', 'Jira'],
  finance: { zh: ['财务分析', 'DCF估值', '行业研究', '财务建模', '风险评估', '资产估值'], en: ['Financial Analysis', 'DCF Valuation', 'Industry Research', 'Financial Modeling', 'Risk Assessment'] },
  certs: {
    zh: ['CPA：通过4科（会计、财管、经济法、战略风管）', 'CTA：通过4科（财会、税法一、税法二、涉税实务）', '初级会计专业技术资格证书', '基金从业资格证书'],
    en: ['CPA: 4 subjects passed (Accounting, Financial Mgmt, Economic Law, Strategy)', 'CTA: 4 subjects passed (Financial Acct, Tax Law I & II, Tax Practice)', 'Junior Accounting Qualification Certificate', 'Fund Practitioner Certificate'],
  },
};

// ── Resume Preview Component (renders inside modal + used for print HTML) ──
function ResumePreview({
  experiences, projects, selectedExps, selectedProjects,
  includeSkills, includeCerts, includeSelfEval, fontSize, lang,
}: {
  experiences: any[]; projects: any[]; selectedExps: Set<number>; selectedProjects: Set<number>;
  includeSkills: boolean; includeCerts: boolean; includeSelfEval: boolean; fontSize: number; lang: 'zh' | 'en';
}) {
  const isZh = lang === 'zh';
  const expList = experiences.filter((_, i) => selectedExps.has(i));
  const projList = projects.filter((_, i) => selectedProjects.has(i));

  const fs = (delta = 0) => `${fontSize + delta}pt`;
  const blue = '#1d4ed8';
  const gray = '#555';
  const dark = '#111827';

  const sectionTitle: React.CSSProperties = {
    fontSize: fs(1), fontWeight: 700, color: blue,
    borderBottom: `0.75pt solid #bfdbfe`, paddingBottom: '3pt', marginBottom: '5pt', marginTop: '0',
  };
  const bullet: React.CSSProperties = {
    fontSize: fs(-0.5), color: '#374151', paddingLeft: '10pt',
    marginBottom: '1.5pt', lineHeight: 1.3,
  };

  const selfEval = isZh
    ? '具备金融专业背景与CPA证书体系知识，熟练掌握Python数据分析与机器学习，能将LLM应用于金融场景。实习经历覆盖资金分析、资产交易、项目管理、行业研究等领域，具备快速学习能力和问题解决能力。'
    : 'Strong foundation in finance with CPA knowledge, proficient in Python data analytics and machine learning, experienced in applying LLMs to financial scenarios. Fast learner with strong problem-solving skills and diverse internship experience.';

  return (
    <div style={{
      width: '794px', minHeight: '1123px', background: '#fff',
      fontFamily: "'Microsoft YaHei', 'PingFang SC', 'Hiragino Sans GB', Arial, sans-serif",
      fontSize: fs(), lineHeight: 1.45, color: dark,
      padding: '32pt 40pt', boxSizing: 'border-box',
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', borderBottom: `1.5pt solid ${blue}`, paddingBottom: '8pt', marginBottom: '10pt' }}>
        <div style={{ fontSize: fs(7), fontWeight: 800, letterSpacing: '1px' }}>{isZh ? '顾杰' : 'Kris Gu'}</div>
        <div style={{ fontSize: fs(1), color: blue, margin: '3pt 0' }}>
          {isZh ? '金融 × 技术  |  数据分析  |  LLM应用' : 'Finance × Technology  |  Data Analytics  |  LLM Applications'}
        </div>
        <div style={{ fontSize: fs(-1), color: gray }}>
          gujie_kris@163.com &nbsp;|&nbsp; +86 192 9224 4363 &nbsp;|&nbsp; github.com/gu1209 &nbsp;|&nbsp; {isZh ? '天津' : 'Tianjin, China'}
        </div>
      </div>

      {/* Education */}
      <div style={{ marginBottom: '10pt' }}>
        <div style={sectionTitle}>{isZh ? '教育背景' : 'Education'}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3pt', fontSize: fs() }}>
          <span>
            <strong>{isZh ? '天津大学（985）' : 'Tianjin University (985)'}</strong>
            <span style={{ color: gray, marginLeft: '6pt' }}>{isZh ? '金融硕士在读 · 管理与经济学部' : "Master's in Finance (in progress) · Faculty of Management and Economics"}</span>
          </span>
          <span style={{ color: gray, flexShrink: 0 }}>2024.09 – 2027.01</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: fs() }}>
          <span>
            <strong>{isZh ? '中国矿业大学（211）' : 'China University of Mining & Technology (211)'}</strong>
            <span style={{ color: gray, marginLeft: '6pt' }}>{isZh ? '金融学士 · GPA 4.15/5.0，专业前15%' : "Bachelor's in Finance · GPA 4.15/5.0, Top 15% in major"}</span>
          </span>
          <span style={{ color: gray, flexShrink: 0 }}>2020.09 – 2024.06</span>
        </div>
      </div>

      {/* Experience */}
      {expList.length > 0 && (
        <div style={{ marginBottom: '10pt' }}>
          <div style={sectionTitle}>{isZh ? '实习经历' : 'Internship Experience'}</div>
          {expList.map((exp, i) => {
            const company = isZh ? exp.company : exp.companyEn;
            const role = isZh ? exp.role : exp.roleEn;
            const period = isZh ? exp.period : exp.periodEn;
            const allHighlights = isZh ? exp.highlights : exp.highlightsEn;
            // Use highlightsBold as key bullets (max 3)
            const boldIdx: number[] = exp.highlightsBold || [0, 1];
            const keyBullets = boldIdx.slice(0, 3).map((idx: number) => allHighlights[idx]).filter(Boolean);

            return (
              <div key={i} style={{ marginBottom: i < expList.length - 1 ? '7pt' : 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2pt' }}>
                  <div style={{ fontSize: fs(), fontWeight: 700 }}>
                    {company}
                    <span style={{ color: blue, fontWeight: 500, margin: '0 5pt' }}>·</span>
                    <span style={{ color: blue, fontWeight: 500 }}>{role}</span>
                  </div>
                  <span style={{ fontSize: fs(-1), color: gray, flexShrink: 0 }}>{period}</span>
                </div>
                {keyBullets.map((b: string, j: number) => (
                  <div key={j} style={bullet}>• {b}</div>
                ))}
              </div>
            );
          })}
        </div>
      )}

      {/* Projects */}
      {projList.length > 0 && (
        <div style={{ marginBottom: '10pt' }}>
          <div style={sectionTitle}>{isZh ? '研究项目' : 'Research Projects'}</div>
          {projList.map((proj, i) => {
            const title = isZh ? proj.title : proj.titleEn;
            const subtitle = isZh ? proj.subtitle : proj.subtitleEn;
            const status = isZh ? proj.status : proj.statusEn;
            const objective = isZh ? proj.objective : proj.objectiveEn;
            const techStr = proj.tech.slice(0, 6).join(' · ');

            return (
              <div key={i} style={{ marginBottom: i < projList.length - 1 ? '6pt' : 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2pt' }}>
                  <div style={{ fontSize: fs(), fontWeight: 700 }}>
                    {title}
                    <span style={{ color: gray, fontWeight: 400, fontSize: fs(-1), marginLeft: '6pt' }}>{subtitle}</span>
                  </div>
                  <span style={{ fontSize: fs(-1), color: gray, flexShrink: 0 }}>{status}</span>
                </div>
                <div style={{ ...bullet, marginBottom: '1.5pt' }}>
                  • {isZh ? '技术栈：' : 'Tech: '}<span style={{ color: blue }}>{techStr}</span>
                </div>
                <div style={bullet}>• {objective.length > 90 ? objective.slice(0, 90) + '…' : objective}</div>
              </div>
            );
          })}
        </div>
      )}

      {/* Skills */}
      {includeSkills && (
        <div style={{ marginBottom: '10pt' }}>
          <div style={sectionTitle}>{isZh ? '技术技能' : 'Technical Skills'}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2pt' }}>
            {[
              { label: isZh ? '编程语言' : 'Programming', value: SKILLS.programming.join('  ·  ') },
              { label: isZh ? '数据分析' : 'Data Tools', value: SKILLS.dataTools.join('  ·  ') },
              { label: isZh ? '金融技能' : 'Finance', value: (isZh ? SKILLS.finance.zh : SKILLS.finance.en).join('  ·  ') },
            ].map(({ label, value }) => (
              <div key={label} style={{ fontSize: fs(-0.5) }}>
                <strong style={{ color: blue }}>{label}：</strong>{value}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {includeCerts && (
        <div style={{ marginBottom: '10pt' }}>
          <div style={sectionTitle}>{isZh ? '专业认证' : 'Certifications'}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2pt' }}>
            {(isZh ? SKILLS.certs.zh : SKILLS.certs.en).map((c, i) => (
              <div key={i} style={{ ...bullet, paddingLeft: 0 }}>• {c}</div>
            ))}
          </div>
        </div>
      )}

      {/* Self-evaluation */}
      {includeSelfEval && (
        <div>
          <div style={sectionTitle}>{isZh ? '自我评价' : 'Self-Evaluation'}</div>
          <div style={{ fontSize: fs(-0.5), color: '#374151', lineHeight: 1.4 }}>{selfEval}</div>
        </div>
      )}
    </div>
  );
}

// ── Main Modal ──
export default function ResumeExportModal({ isOpen, onClose, experiences, projects, lang }: Props) {
  const [selectedExps, setSelectedExps] = useState<Set<number>>(new Set(experiences.map((_, i) => i)));
  const [selectedProjects, setSelectedProjects] = useState<Set<number>>(new Set(projects.map((_, i) => i)));
  const [includeSkills, setIncludeSkills] = useState(true);
  const [includeCerts, setIncludeCerts] = useState(true);
  const [includeSelfEval, setIncludeSelfEval] = useState(true);
  const [fontSize, setFontSize] = useState(9);

  if (!isOpen) return null;

  const isZh = lang === 'zh';

  const toggleExp = (i: number) => {
    const s = new Set(selectedExps);
    s.has(i) ? s.delete(i) : s.add(i);
    setSelectedExps(s);
  };
  const toggleProj = (i: number) => {
    const s = new Set(selectedProjects);
    s.has(i) ? s.delete(i) : s.add(i);
    setSelectedProjects(s);
  };

  // Print: open new window with rendered HTML
  const handlePrint = () => {
    // Collect inline styles by rendering to string via a hidden iframe trick.
    // Simplest approach: serialize the preview's outerHTML via a temporary DOM node.
    const previewEl = document.getElementById('resume-preview-content');
    if (!previewEl) return;

    const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>${isZh ? '顾杰_简历' : 'Kris_Gu_Resume'}</title>
<style>
  @page { size: A4 portrait; margin: 0; }
  * { -webkit-print-color-adjust: exact; print-color-adjust: exact; box-sizing: border-box; }
  body { margin: 0; padding: 0; background: #fff; }
</style>
</head>
<body>
${previewEl.outerHTML}
</body>
</html>`;

    const win = window.open('', '_blank', 'width=900,height=750');
    if (win) {
      win.document.write(html);
      win.document.close();
      // Small delay to ensure styles are applied
      setTimeout(() => {
        win.focus();
        win.print();
      }, 300);
    }
  };

  // Scale for preview display (A4 = 794px wide, show at ~65%)
  const SCALE = 0.63;
  const scaledW = Math.round(794 * SCALE);
  const scaledH = Math.round(1123 * SCALE);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-3">
      <div className="bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden" style={{ width: '96vw', maxWidth: '1100px', height: '92vh' }}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <div>
            <h2 className="text-lg font-bold text-gray-900">{isZh ? '简历预览与导出' : 'Resume Preview & Export'}</h2>
            <p className="text-xs text-gray-500 mt-0.5">{isZh ? '在左侧选择包含的内容，右侧实时预览 A4 效果' : 'Select sections on the left, preview A4 output on the right'}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-1 overflow-hidden">

          {/* ── Left Panel: Controls ── */}
          <div className="w-60 flex-shrink-0 border-r border-gray-100 overflow-y-auto px-4 py-5 space-y-5">

            {/* Font size */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{isZh ? '字体大小' : 'Font Size'}</p>
              <div className="flex items-center gap-2">
                <button onClick={() => setFontSize(s => Math.max(7, s - 1))} className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition">
                  <Minus size={13} />
                </button>
                <span className="text-sm font-semibold text-gray-800 w-8 text-center">{fontSize}pt</span>
                <button onClick={() => setFontSize(s => Math.min(12, s + 1))} className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition">
                  <Plus size={13} />
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-1">{isZh ? '推荐 8–10pt，内容多时调小' : 'Recommended 8–10pt'}</p>
            </div>

            {/* Experience */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{isZh ? '实习经历' : 'Experience'}</p>
              <div className="space-y-1.5">
                {experiences.map((exp, i) => (
                  <label key={i} className="flex items-start gap-2 cursor-pointer group">
                    <input
                      type="checkbox" checked={selectedExps.has(i)} onChange={() => toggleExp(i)}
                      className="mt-0.5 w-4 h-4 rounded text-primary-600 accent-blue-600 flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-sm text-gray-800 font-medium leading-tight group-hover:text-primary-600 transition-colors">
                        {isZh ? exp.company : exp.companyEn}
                      </p>
                      <p className="text-xs text-gray-400 truncate">{isZh ? exp.role : exp.roleEn}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{isZh ? '研究项目' : 'Projects'}</p>
              <div className="space-y-1.5">
                {projects.map((proj, i) => (
                  <label key={i} className="flex items-start gap-2 cursor-pointer group">
                    <input
                      type="checkbox" checked={selectedProjects.has(i)} onChange={() => toggleProj(i)}
                      className="mt-0.5 w-4 h-4 rounded text-primary-600 accent-blue-600 flex-shrink-0"
                    />
                    <p className="text-sm text-gray-800 font-medium leading-snug group-hover:text-primary-600 transition-colors">
                      {isZh ? proj.title : proj.titleEn}
                    </p>
                  </label>
                ))}
              </div>
            </div>

            {/* Fixed sections */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{isZh ? '其他板块' : 'Sections'}</p>
              <div className="space-y-1.5">
                {[
                  { label: isZh ? '技术技能' : 'Technical Skills', value: includeSkills, set: setIncludeSkills },
                  { label: isZh ? '专业认证' : 'Certifications', value: includeCerts, set: setIncludeCerts },
                  { label: isZh ? '自我评价' : 'Self-Evaluation', value: includeSelfEval, set: setIncludeSelfEval },
                ].map(({ label, value, set }) => (
                  <label key={label} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={value} onChange={e => set(e.target.checked)}
                      className="w-4 h-4 rounded accent-blue-600" />
                    <span className="text-sm text-gray-700">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Tip */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800 leading-relaxed">
              {isZh
                ? '💡 点击「打印/PDF」后，在浏览器打印对话框中选择「另存为 PDF」，目标纸张选 A4，去掉页眉页脚。'
                : '💡 Click "Print/PDF", then in the browser print dialog choose "Save as PDF", paper size A4, uncheck headers/footers.'}
            </div>
          </div>

          {/* ── Right Panel: A4 Preview ── */}
          <div className="flex-1 bg-gray-100 overflow-auto flex flex-col items-center py-6 px-4">
            <p className="text-xs text-gray-400 mb-3 flex-shrink-0">{isZh ? '预览（A4 · 缩放 63%）' : 'Preview (A4 · 63% scale)'}</p>

            {/* Scaled A4 wrapper */}
            <div
              className="flex-shrink-0 shadow-2xl rounded-sm overflow-hidden ring-1 ring-gray-200"
              style={{ width: `${scaledW}px`, height: `${scaledH}px`, position: 'relative' }}
            >
              <div style={{
                width: '794px', height: '1123px',
                transform: `scale(${SCALE})`,
                transformOrigin: 'top left',
                position: 'absolute', top: 0, left: 0,
                overflow: 'hidden',
              }}>
                <div id="resume-preview-content">
                  <ResumePreview
                    experiences={experiences} projects={projects}
                    selectedExps={selectedExps} selectedProjects={selectedProjects}
                    includeSkills={includeSkills} includeCerts={includeCerts}
                    includeSelfEval={includeSelfEval} fontSize={fontSize} lang={lang}
                  />
                </div>
              </div>
            </div>

            {/* Overflow warning */}
            <p className="text-xs text-gray-400 mt-3 flex-shrink-0">
              {isZh ? '如内容超出一页，请减少选项或调小字体' : 'If content overflows, deselect items or reduce font size'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 px-6 py-4 flex justify-end items-center gap-3 flex-shrink-0 bg-gray-50/50">
          <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition text-sm">
            {isZh ? '取消' : 'Cancel'}
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-primary-600 text-white px-6 py-2.5 rounded-xl hover:bg-primary-700 transition font-medium text-sm shadow-sm hover:shadow-md"
          >
            <Printer size={16} />
            {isZh ? '打印 / 导出 PDF' : 'Print / Save as PDF'}
          </button>
        </div>
      </div>
    </div>
  );
}
