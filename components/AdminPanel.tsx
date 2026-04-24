'use client';
import { useState } from 'react';
import { ChevronDown, ChevronUp, Plus, Trash2, Download, Upload, X, Save, RotateCcw } from 'lucide-react';

interface AdminPanelProps {
  content: any;
  onUpdate: (updater: (c: any) => any) => void;
  onImport: (data: any) => void;
  onExport: () => any;
  onReset: () => void;
  onClose: () => void;
}

export default function AdminPanel({ content, onUpdate, onImport, onExport, onReset, onClose }: AdminPanelProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ hero: true });
  const [importError, setImportError] = useState('');

  const toggle = (key: string) => setOpenSections(p => ({ ...p, [key]: !p[key] }));

  const handleExport = () => {
    const data = onExport();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio_content.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e: any) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target?.result as string);
          onImport(data);
          setImportError('');
        } catch {
          setImportError('JSON 格式错误，请检查文件');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  // ── Generic field editor ──
  const Field = ({ label, value, onChange, rows = 1, placeholder }: {
    label: string; value: string; onChange: (v: string) => void; rows?: number; placeholder?: string;
  }) => (
    <div className="mb-3">
      <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
      {rows === 1 ? (
        <input
          value={value} onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-primary-400"
        />
      ) : (
        <textarea
          value={value} onChange={e => onChange(e.target.value)}
          rows={rows} placeholder={placeholder}
          className="w-full text-sm border border-gray-200 rounded-lg px-3 py-1.5 resize-y focus:outline-none focus:border-primary-400"
        />
      )}
    </div>
  );

  // ── Section wrapper ──
  const Section = ({ id, title, children, defaultOpen }: {
    id: string; title: string; children: React.ReactNode; defaultOpen?: boolean;
  }) => {
    const isOpen = openSections[id] ?? defaultOpen ?? false;
    return (
      <div className="border border-gray-200 rounded-xl mb-3 overflow-hidden">
        <button
          onClick={() => toggle(id)}
          className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition text-sm font-semibold text-gray-700"
        >
          <span>{title}</span>
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {isOpen && <div className="p-4 bg-white">{children}</div>}
      </div>
    );
  };

  // ── Update nested translation field ──
  const updateTrans = (lang: string, section: string, field: string, value: string) => {
    onUpdate(c => {
      const next = JSON.parse(JSON.stringify(c));
      next.translations[lang][section][field] = value;
      return next;
    });
  };

  // ── Update array item field ──
  const updateArrayItem = (key: string, idx: number, field: string, value: any) => {
    onUpdate(c => {
      const next = JSON.parse(JSON.stringify(c));
      next[key][idx][field] = value;
      return next;
    });
  };

  // ── Update array item in nested array ──
  const updateArrayItemNested = (key: string, idx: number, field: string, arrIdx: number, value: string) => {
    onUpdate(c => {
      const next = JSON.parse(JSON.stringify(c));
      next[key][idx][field][arrIdx] = value;
      return next;
    });
  };

  // ── Add item to array ──
  const addArrayItem = (key: string, template: any) => {
    onUpdate(c => {
      const next = JSON.parse(JSON.stringify(c));
      next[key].push(JSON.parse(JSON.stringify(template)));
      return next;
    });
  };

  // ── Remove item from array ──
  const removeArrayItem = (key: string, idx: number) => {
    onUpdate(c => {
      const next = JSON.parse(JSON.stringify(c));
      next[key].splice(idx, 1);
      return next;
    });
  };

  return (
    <div className="fixed inset-0 z-[180] flex">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      {/* Panel */}
      <div className="relative ml-auto w-full max-w-xl bg-gray-50 shadow-2xl flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="flex-shrink-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-gray-900 text-sm">内容编辑器</h2>
            <span className="text-xs text-gray-400">修改实时保存</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button onClick={handleExport} title="导出 JSON" className="p-1.5 rounded-lg hover:bg-primary-50 text-gray-500 hover:text-primary-600 transition">
              <Download size={15} />
            </button>
            <button onClick={handleImport} title="导入 JSON" className="p-1.5 rounded-lg hover:bg-primary-50 text-gray-500 hover:text-primary-600 transition">
              <Upload size={15} />
            </button>
            <button onClick={() => { if (confirm('重置所有内容到默认值？')) onReset(); }} title="重置" className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition">
              <RotateCcw size={15} />
            </button>
            <button onClick={onClose} title="关闭" className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition">
              <X size={15} />
            </button>
          </div>
        </div>

        {importError && (
          <div className="flex-shrink-0 bg-red-50 text-red-600 text-xs px-4 py-2 border-b border-red-200">{importError}</div>
        )}

        {/* Content area */}
        <div className="flex-1 overflow-y-auto px-4 py-4">

          {/* ══ HERO ══ */}
          <Section id="hero" title="英雄区 (Hero)" defaultOpen>
            <div className="grid grid-cols-2 gap-x-4">
              <Field label="标题 (中文)" value={content?.translations?.zh?.hero?.title || ''} onChange={v => updateTrans('zh', 'hero', 'title', v)} />
              <Field label="Title (EN)" value={content?.translations?.en?.hero?.title || ''} onChange={v => updateTrans('en', 'hero', 'title', v)} />
            </div>
            <Field label="副标题 (中文)" value={content?.translations?.zh?.hero?.subtitle || ''} onChange={v => updateTrans('zh', 'hero', 'subtitle', v)} rows={2} />
            <Field label="Subtitle (EN)" value={content?.translations?.en?.hero?.subtitle || ''} onChange={v => updateTrans('en', 'hero', 'subtitle', v)} rows={2} />
            <Field label="描述 (中文)" value={content?.translations?.zh?.hero?.description || ''} onChange={v => updateTrans('zh', 'hero', 'description', v)} rows={3} />
            <Field label="Description (EN)" value={content?.translations?.en?.hero?.description || ''} onChange={v => updateTrans('en', 'hero', 'description', v)} rows={3} />
          </Section>

          {/* ══ ABOUT ══ */}
          <Section id="about" title="关于我 (About)">
            <Field label="简介 (中文)" value={content?.translations?.zh?.about?.intro || ''} onChange={v => updateTrans('zh', 'about', 'intro', v)} rows={3} />
            <Field label="简介 (EN)" value={content?.translations?.en?.about?.intro || ''} onChange={v => updateTrans('en', 'about', 'intro', v)} rows={3} />
            <Field label="核心优势 (中文)" value={content?.translations?.zh?.about?.strengths || ''} onChange={v => updateTrans('zh', 'about', 'strengths', v)} rows={2} />
            <Field label="核心优势 (EN)" value={content?.translations?.en?.about?.strengths || ''} onChange={v => updateTrans('en', 'about', 'strengths', v)} rows={2} />
            <div className="grid grid-cols-2 gap-x-4 mt-2">
              <Field label="硕士学校" value={content?.translations?.zh?.about?.university || ''} onChange={v => updateTrans('zh', 'about', 'university', v)} />
              <Field label="Master Univ (EN)" value={content?.translations?.en?.about?.university || ''} onChange={v => updateTrans('en', 'about', 'university', v)} />
              <Field label="硕士专业" value={content?.translations?.zh?.about?.degree || ''} onChange={v => updateTrans('zh', 'about', 'degree', v)} />
              <Field label="Degree (EN)" value={content?.translations?.en?.about?.degree || ''} onChange={v => updateTrans('en', 'about', 'degree', v)} />
              <Field label="硕士院系" value={content?.translations?.zh?.about?.faculty || ''} onChange={v => updateTrans('zh', 'about', 'faculty', v)} />
              <Field label="Faculty (EN)" value={content?.translations?.en?.about?.faculty || ''} onChange={v => updateTrans('en', 'about', 'faculty', v)} />
              <Field label="硕士课程" value={content?.translations?.zh?.about?.major || ''} onChange={v => updateTrans('zh', 'about', 'major', v)} rows={2} />
              <Field label="Courses (EN)" value={content?.translations?.en?.about?.major || ''} onChange={v => updateTrans('en', 'about', 'major', v)} rows={2} />
              <Field label="硕士时间" value={content?.translations?.zh?.about?.period || ''} onChange={v => updateTrans('zh', 'about', 'period', v)} />
              <Field label="Period (EN)" value={content?.translations?.en?.about?.period || ''} onChange={v => updateTrans('en', 'about', 'period', v)} />
            </div>
            <div className="border-t border-gray-100 mt-3 pt-3">
              <p className="text-xs font-semibold text-gray-400 mb-2">本科教育</p>
              <div className="grid grid-cols-2 gap-x-4">
                <Field label="本科学校" value={content?.translations?.zh?.about?.bachelorUniv || ''} onChange={v => updateTrans('zh', 'about', 'bachelorUniv', v)} />
                <Field label="Bachelor Univ (EN)" value={content?.translations?.en?.about?.bachelorUniv || ''} onChange={v => updateTrans('en', 'about', 'bachelorUniv', v)} />
                <Field label="本科专业" value={content?.translations?.zh?.about?.bachelor || ''} onChange={v => updateTrans('zh', 'about', 'bachelor', v)} />
                <Field label="Bachelor (EN)" value={content?.translations?.en?.about?.bachelor || ''} onChange={v => updateTrans('en', 'about', 'bachelor', v)} />
                <Field label="本科院系" value={content?.translations?.zh?.about?.bachelorFaculty || ''} onChange={v => updateTrans('zh', 'about', 'bachelorFaculty', v)} />
                <Field label="Bachelor Faculty (EN)" value={content?.translations?.en?.about?.bachelorFaculty || ''} onChange={v => updateTrans('en', 'about', 'bachelorFaculty', v)} />
                <Field label="本科课程" value={content?.translations?.zh?.about?.bachelorMajor || ''} onChange={v => updateTrans('zh', 'about', 'bachelorMajor', v)} rows={2} />
                <Field label="Bachelor Courses (EN)" value={content?.translations?.en?.about?.bachelorMajor || ''} onChange={v => updateTrans('en', 'about', 'bachelorMajor', v)} rows={2} />
                <Field label="本科时间" value={content?.translations?.zh?.about?.bachelorPeriod || ''} onChange={v => updateTrans('zh', 'about', 'bachelorPeriod', v)} />
                <Field label="Period (EN)" value={content?.translations?.en?.about?.bachelorPeriod || ''} onChange={v => updateTrans('en', 'about', 'bachelorPeriod', v)} />
              </div>
              <Field label="本科GPA" value={content?.translations?.zh?.about?.bachelorGpa || ''} onChange={v => updateTrans('zh', 'about', 'bachelorGpa', v)} />
            </div>
          </Section>

          {/* ══ EXPERIENCES ══ */}
          <Section id="experiences" title="实习经历 (Experiences)">
            {(content?.experiences || []).map((exp: any, idx: number) => (
              <div key={idx} className="mb-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0 last:mb-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gray-600">经历 #{idx + 1}</span>
                  <button onClick={() => { if (confirm('删除此经历？')) removeArrayItem('experiences', idx); }} className="text-red-400 hover:text-red-600">
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-x-4">
                  <Field label="公司 (中文)" value={exp.company || ''} onChange={v => updateArrayItem('experiences', idx, 'company', v)} />
                  <Field label="Company (EN)" value={exp.companyEn || ''} onChange={v => updateArrayItem('experiences', idx, 'companyEn', v)} />
                  <Field label="职位 (中文)" value={exp.role || ''} onChange={v => updateArrayItem('experiences', idx, 'role', v)} />
                  <Field label="Role (EN)" value={exp.roleEn || ''} onChange={v => updateArrayItem('experiences', idx, 'roleEn', v)} />
                  <Field label="时间 (中文)" value={exp.period || ''} onChange={v => updateArrayItem('experiences', idx, 'period', v)} />
                  <Field label="Period (EN)" value={exp.periodEn || ''} onChange={v => updateArrayItem('experiences', idx, 'periodEn', v)} />
                </div>
                <p className="text-xs text-gray-400 mt-2 mb-1">工作亮点 (中文) — 每行一条</p>
                {(exp.highlights || []).map((h: string, hi: number) => (
                  <div key={hi} className="flex gap-2 mb-1">
                    <input
                      value={h} onChange={e => updateArrayItemNested('experiences', idx, 'highlights', hi, e.target.value)}
                      className="flex-1 text-xs border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:border-primary-400"
                    />
                    <button onClick={() => {
                      onUpdate(c => {
                        const n = JSON.parse(JSON.stringify(c));
                        n.experiences[idx].highlights.splice(hi, 1);
                        if (n.experiences[idx].highlightsEn?.[hi]) n.experiences[idx].highlightsEn.splice(hi, 1);
                        return n;
                      });
                    }} className="text-red-300 hover:text-red-500 flex-shrink-0"><X size={12} /></button>
                  </div>
                ))}
                <button onClick={() => onUpdate(c => {
                  const n = JSON.parse(JSON.stringify(c));
                  n.experiences[idx].highlights.push('新亮点');
                  if (n.experiences[idx].highlightsEn) n.experiences[idx].highlightsEn.push('New highlight');
                  return n;
                })} className="text-xs text-primary-600 hover:text-primary-700 mt-1 flex items-center gap-1"><Plus size={12} /> 添加亮点</button>
                <p className="text-xs text-gray-400 mt-2 mb-1">工作亮点 (EN) — 每行一条</p>
                {(exp.highlightsEn || []).map((h: string, hi: number) => (
                  <div key={hi} className="flex gap-2 mb-1">
                    <input
                      value={h} onChange={e => updateArrayItemNested('experiences', idx, 'highlightsEn', hi, e.target.value)}
                      className="flex-1 text-xs border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:border-primary-400"
                    />
                  </div>
                ))}
              </div>
            ))}
            <button
              onClick={() => addArrayItem('experiences', { company: '新公司', companyEn: 'New Company', role: '职位', roleEn: 'Role', period: '时间', periodEn: 'Period', logo: '', highlightsBold: [], highlights: ['工作亮点'], highlightsEn: ['Highlight'] })}
              className="mt-2 flex items-center gap-1.5 text-xs bg-primary-600 text-white px-3 py-2 rounded-lg hover:bg-primary-700 transition font-medium"
            >
              <Plus size={13} /> 添加经历
            </button>
          </Section>

          {/* ══ PROJECTS ══ */}
          <Section id="projects" title="研究项目 (Projects)">
            {(content?.projects || []).map((proj: any, idx: number) => (
              <div key={idx} className="mb-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0 last:mb-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gray-600">项目 #{idx + 1}</span>
                  <button onClick={() => { if (confirm('删除此项目？')) removeArrayItem('projects', idx); }} className="text-red-400 hover:text-red-600">
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-x-4">
                  <Field label="标题 (中文)" value={proj.title || ''} onChange={v => updateArrayItem('projects', idx, 'title', v)} />
                  <Field label="Title (EN)" value={proj.titleEn || ''} onChange={v => updateArrayItem('projects', idx, 'titleEn', v)} />
                  <Field label="副标题 (中文)" value={proj.subtitle || ''} onChange={v => updateArrayItem('projects', idx, 'subtitle', v)} />
                  <Field label="Subtitle (EN)" value={proj.subtitleEn || ''} onChange={v => updateArrayItem('projects', idx, 'subtitleEn', v)} />
                </div>
                <Field label="技术栈 (逗号分隔)" value={(proj.tech || []).join(', ')} onChange={v => updateArrayItem('projects', idx, 'tech', v.split(',').map((s: string) => s.trim()))} />
                <div className="grid grid-cols-2 gap-x-4">
                  <Field label="状态 (中文)" value={proj.status || ''} onChange={v => updateArrayItem('projects', idx, 'status', v)} />
                  <Field label="Status (EN)" value={proj.statusEn || ''} onChange={v => updateArrayItem('projects', idx, 'statusEn', v)} />
                </div>
                <Field label="研究目标 (中文)" value={proj.objective || ''} onChange={v => updateArrayItem('projects', idx, 'objective', v)} rows={2} />
                <Field label="Objective (EN)" value={proj.objectiveEn || ''} onChange={v => updateArrayItem('projects', idx, 'objectiveEn', v)} rows={2} />
                <Field label="研究方法 (中文)" value={proj.methodology || ''} onChange={v => updateArrayItem('projects', idx, 'methodology', v)} rows={2} />
                <Field label="Methodology (EN)" value={proj.methodologyEn || ''} onChange={v => updateArrayItem('projects', idx, 'methodologyEn', v)} rows={2} />
                <Field label="研究设计 (中文)" value={proj.design || ''} onChange={v => updateArrayItem('projects', idx, 'design', v)} rows={2} />
                <Field label="Design (EN)" value={proj.designEn || ''} onChange={v => updateArrayItem('projects', idx, 'designEn', v)} rows={2} />
              </div>
            ))}
            <button
              onClick={() => addArrayItem('projects', { title: '新项目', titleEn: 'New Project', subtitle: '副标题', subtitleEn: 'Subtitle', tech: ['Python'], objective: '研究目标', objectiveEn: 'Objective', methodology: '研究方法', methodologyEn: 'Methodology', design: '研究设计', designEn: 'Design', status: '进行中', statusEn: 'Ongoing' })}
              className="mt-2 flex items-center gap-1.5 text-xs bg-primary-600 text-white px-3 py-2 rounded-lg hover:bg-primary-700 transition font-medium"
            >
              <Plus size={13} /> 添加项目
            </button>
          </Section>

          {/* ══ SKILLS ══ */}
          <Section id="skills" title="技能与证书 (Skills)">
            <Field label="编程语言 (逗号分隔)" value={(content?.skillsData?.programming || []).join(', ')} onChange={v => onUpdate(c => { const n = JSON.parse(JSON.stringify(c)); n.skillsData.programming = v.split(',').map((s: string) => s.trim()); return n; })} />
            <Field label="数据工具 (逗号分隔)" value={(content?.skillsData?.dataTools || []).join(', ')} onChange={v => onUpdate(c => { const n = JSON.parse(JSON.stringify(c)); n.skillsData.dataTools = v.split(',').map((s: string) => s.trim()); return n; })} rows={2} />
            <Field label="金融能力 (逗号分隔)" value={(content?.skillsData?.finance || []).join(', ')} onChange={v => onUpdate(c => { const n = JSON.parse(JSON.stringify(c)); n.skillsData.finance = v.split(',').map((s: string) => s.trim()); return n; })} rows={2} />
            <Field label="证书 (中文，每行一条)" value={(content?.skillsData?.certifications || []).join('\n')} onChange={v => onUpdate(c => { const n = JSON.parse(JSON.stringify(c)); n.skillsData.certifications = v.split('\n').filter(Boolean); return n; })} rows={4} />
            <Field label="证书 (EN，每行一条)" value={(content?.skillsData?.certificationsEn || []).join('\n')} onChange={v => onUpdate(c => { const n = JSON.parse(JSON.stringify(c)); n.skillsData.certificationsEn = v.split('\n').filter(Boolean); return n; })} rows={4} />
            <Field label="语言 (逗号分隔)" value={(content?.skillsData?.languages || []).join(', ')} onChange={v => onUpdate(c => { const n = JSON.parse(JSON.stringify(c)); n.skillsData.languages = v.split(',').map((s: string) => s.trim()); return n; })} />
          </Section>

          {/* ══ VIBE TOOLS ══ */}
          <Section id="tools" title="Vibe 小工具 (Tools)">
            {(content?.vibeTools || []).map((tool: any, idx: number) => (
              <div key={idx} className="mb-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gray-600">工具 #{idx + 1}</span>
                  <button onClick={() => removeArrayItem('vibeTools', idx)} className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
                </div>
                <div className="grid grid-cols-2 gap-x-4">
                  <Field label="名称 (中文)" value={tool.name || ''} onChange={v => updateArrayItem('vibeTools', idx, 'name', v)} />
                  <Field label="Name (EN)" value={tool.nameEn || ''} onChange={v => updateArrayItem('vibeTools', idx, 'nameEn', v)} />
                </div>
                <Field label="描述 (中文)" value={tool.desc || ''} onChange={v => updateArrayItem('vibeTools', idx, 'desc', v)} rows={2} />
                <Field label="Description (EN)" value={tool.descEn || ''} onChange={v => updateArrayItem('vibeTools', idx, 'descEn', v)} rows={2} />
                <Field label="技术栈 (逗号分隔)" value={(tool.tech || []).join(', ')} onChange={v => updateArrayItem('vibeTools', idx, 'tech', v.split(',').map((s: string) => s.trim()))} />
                <Field label="GitHub 链接" value={tool.github || ''} onChange={v => updateArrayItem('vibeTools', idx, 'github', v)} />
              </div>
            ))}
            <button
              onClick={() => addArrayItem('vibeTools', { name: '新工具', nameEn: 'New Tool', desc: '描述', descEn: 'Description', tech: ['Python'], github: '' })}
              className="mt-2 flex items-center gap-1.5 text-xs bg-primary-600 text-white px-3 py-2 rounded-lg hover:bg-primary-700 transition font-medium"
            >
              <Plus size={13} /> 添加工具
            </button>
          </Section>

          {/* ══ METRICS ══ */}
          <Section id="metrics" title="数据指标 (Metrics)">
            <p className="text-xs text-gray-400 mb-2">中文指标</p>
            {(content?.metrics?.zh || []).map((m: any, idx: number) => (
              <div key={idx} className="flex gap-2 mb-2 items-end">
                <div className="flex-1"><label className="text-[10px] text-gray-400">数值</label><input value={m.target} onChange={e => onUpdate(c => { const n = JSON.parse(JSON.stringify(c)); n.metrics.zh[idx].target = parseFloat(e.target.value) || 0; return n; })} type="number" className="w-full text-xs border border-gray-200 rounded px-2 py-1" /></div>
                <div className="flex-1"><label className="text-[10px] text-gray-400">前缀</label><input value={m.prefix || ''} onChange={e => onUpdate(c => { const n = JSON.parse(JSON.stringify(c)); n.metrics.zh[idx].prefix = e.target.value; return n; })} className="w-full text-xs border border-gray-200 rounded px-2 py-1" /></div>
                <div className="w-12"><label className="text-[10px] text-gray-400">后缀</label><input value={m.suffix || ''} onChange={e => onUpdate(c => { const n = JSON.parse(JSON.stringify(c)); n.metrics.zh[idx].suffix = e.target.value; return n; })} className="w-full text-xs border border-gray-200 rounded px-2 py-1" /></div>
                <div className="flex-1"><label className="text-[10px] text-gray-400">标签</label><input value={m.label || ''} onChange={e => onUpdate(c => { const n = JSON.parse(JSON.stringify(c)); n.metrics.zh[idx].label = e.target.value; return n; })} className="w-full text-xs border border-gray-200 rounded px-2 py-1" /></div>
                <button onClick={() => onUpdate(c => { const n = JSON.parse(JSON.stringify(c)); n.metrics.zh.splice(idx, 1); n.metrics.en?.splice(idx, 1); return n; })} className="text-red-300 hover:text-red-500 mb-1"><X size={14} /></button>
              </div>
            ))}
            <button onClick={() => onUpdate(c => { const n = JSON.parse(JSON.stringify(c)); n.metrics.zh.push({ target: 0, decimals: 0, suffix: '', prefix: '', label: '新指标' }); n.metrics.en?.push({ target: 0, decimals: 0, suffix: '', prefix: '', label: 'New' }); return n; })} className="text-xs text-primary-600 flex items-center gap-1 mt-1"><Plus size={12} /> 添加指标</button>
          </Section>

          {/* ══ NOTES ══ */}
          <Section id="notes" title="学习笔记 (Notes)">
            {(content?.notes || []).map((note: any, idx: number) => (
              <div key={idx} className="flex gap-2 mb-2 items-end">
                <div className="flex-1"><label className="text-[10px] text-gray-400">标题</label><input value={note.title || ''} onChange={e => updateArrayItem('notes', idx, 'title', e.target.value)} className="w-full text-xs border border-gray-200 rounded px-2 py-1" /></div>
                <div className="w-24"><label className="text-[10px] text-gray-400">标签</label><input value={note.tag || ''} onChange={e => updateArrayItem('notes', idx, 'tag', e.target.value)} className="w-full text-xs border border-gray-200 rounded px-2 py-1" /></div>
                <div className="flex-1"><label className="text-[10px] text-gray-400">链接</label><input value={note.href || ''} onChange={e => updateArrayItem('notes', idx, 'href', e.target.value)} className="w-full text-xs border border-gray-200 rounded px-2 py-1" /></div>
                <button onClick={() => removeArrayItem('notes', idx)} className="text-red-300 hover:text-red-500 mb-1"><X size={14} /></button>
              </div>
            ))}
            <button onClick={() => addArrayItem('notes', { id: Date.now().toString(), title: '新笔记', tag: '标签', href: '' })} className="text-xs text-primary-600 flex items-center gap-1 mt-1"><Plus size={12} /> 添加笔记</button>
          </Section>

          {/* ══ NOW ══ */}
          <Section id="now" title="最近在… (Now)">
            {(content?.now || []).map((item: any, idx: number) => (
              <div key={idx} className="mb-3">
                <div className="flex gap-2 mb-1 items-end">
                  <div className="w-10"><label className="text-[10px] text-gray-400">Emoji</label><input value={item.emoji || ''} onChange={e => updateArrayItem('now', idx, 'emoji', e.target.value)} className="w-full text-xs border border-gray-200 rounded px-2 py-1 text-center" /></div>
                  <div className="flex-1"><label className="text-[10px] text-gray-400">分类 (中)</label><input value={item.category || ''} onChange={e => updateArrayItem('now', idx, 'category', e.target.value)} className="w-full text-xs border border-gray-200 rounded px-2 py-1" /></div>
                  <div className="flex-1"><label className="text-[10px] text-gray-400">Category (EN)</label><input value={item.categoryEn || ''} onChange={e => updateArrayItem('now', idx, 'categoryEn', e.target.value)} className="w-full text-xs border border-gray-200 rounded px-2 py-1" /></div>
                  <button onClick={() => removeArrayItem('now', idx)} className="text-red-300 hover:text-red-500 mb-1"><X size={14} /></button>
                </div>
                <Field label="内容" value={item.content || ''} onChange={v => updateArrayItem('now', idx, 'content', v)} rows={2} />
              </div>
            ))}
            <button onClick={() => addArrayItem('now', { emoji: '✨', category: '新分类', categoryEn: 'New', content: '' })} className="text-xs text-primary-600 flex items-center gap-1 mt-1"><Plus size={12} /> 添加</button>
          </Section>

          {/* ══ CONTACT ══ */}
          <Section id="contact" title="联系方式 (Contact)">
            <Field label="邮箱" value={content?.contact?.email || ''} onChange={v => onUpdate(c => ({ ...c, contact: { ...c.contact, email: v } }))} />
            <Field label="GitHub" value={content?.contact?.github || ''} onChange={v => onUpdate(c => ({ ...c, contact: { ...c.contact, github: v } }))} />
            <Field label="小红书链接" value={content?.contact?.xiaohongshu || ''} onChange={v => onUpdate(c => ({ ...c, contact: { ...c.contact, xiaohongshu: v } }))} />
            <Field label="小红书UID" value={content?.contact?.xhsUid || ''} onChange={v => onUpdate(c => ({ ...c, contact: { ...c.contact, xhsUid: v } }))} />
            <Field label="B站链接" value={content?.contact?.bilibili || ''} onChange={v => onUpdate(c => ({ ...c, contact: { ...c.contact, bilibili: v } }))} />
            <Field label="B站名称" value={content?.contact?.biliName || ''} onChange={v => onUpdate(c => ({ ...c, contact: { ...c.contact, biliName: v } }))} />
            <Field label="电话" value={content?.contact?.phone || ''} onChange={v => onUpdate(c => ({ ...c, contact: { ...c.contact, phone: v } }))} />
          </Section>

          {/* ══ JSON PREVIEW ══ */}
          <Section id="json" title="JSON 原始数据">
            <pre className="text-[10px] text-gray-500 bg-gray-50 rounded-lg p-3 overflow-auto max-h-64 font-mono">
              {JSON.stringify(content, null, 2).slice(0, 3000)}
              {JSON.stringify(content, null, 2).length > 3000 ? '\n... (truncated)' : ''}
            </pre>
          </Section>

          <div className="h-6" />
        </div>
      </div>
    </div>
  );
}
