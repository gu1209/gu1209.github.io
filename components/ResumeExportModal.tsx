'use client';

import { useState } from 'react';
import { Download, Check, X, Briefcase, BookOpen } from 'lucide-react';
import { ResumeConverter } from '@/lib/ResumeConverter';

interface ResumeExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  experiences: any[];
  projects: any[];
  lang: 'zh' | 'en';
}

export default function ResumeExportModal({ isOpen, onClose, experiences, projects, lang }: ResumeExportModalProps) {
  const [selectedExps, setSelectedExps] = useState<Set<number>>(new Set(experiences.map((_, i) => i)));
  const [selectedProjects, setSelectedProjects] = useState<Set<number>>(new Set(projects.map((_, i) => i)));
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const toggleExp = (idx: number) => {
    const newSet = new Set(selectedExps);
    if (newSet.has(idx)) newSet.delete(idx);
    else newSet.add(idx);
    setSelectedExps(newSet);
  };

  const toggleProj = (idx: number) => {
    const newSet = new Set(selectedProjects);
    if (newSet.has(idx)) newSet.delete(idx);
    else newSet.add(idx);
    setSelectedProjects(newSet);
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const selectedExpData = experiences.filter((_, i) => selectedExps.has(i));
      const selectedProjData = projects.filter((_, i) => selectedProjects.has(i));

      if (selectedExpData.length === 0 && selectedProjData.length === 0) {
        alert(lang === 'zh' ? '请选择至少一段经历或项目' : 'Please select at least one experience or project');
        setIsExporting(false);
        return;
      }

      const blob = await ResumeConverter.generateResume(selectedExpData, selectedProjData, lang);
      const filename = `顾杰_简历_${new Date().toISOString().split('T')[0]}.docx`;

      // 使用 saveAs 下载
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      onClose();
    } catch (error) {
      console.error('Export failed:', error);
      alert(lang === 'zh' ? '导出失败，请重试' : 'Export failed, please try again');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
          <h2 className="text-xl font-bold text-gray-900">{lang === 'zh' ? '导出简历' : 'Export Resume'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <p className="text-gray-600 mb-6">
            {lang === 'zh'
              ? '选择要包含在简历中的经历（已按STAR法则优化），生成的Word文档适配一页纸排版。'
              : 'Select experiences to include (optimized using STAR method). The generated Word document is formatted for one-page resume.'}
          </p>

          {/* Internship Experiences */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Briefcase size={18} />
              {lang === 'zh' ? '实习经历' : 'Internship Experiences'}
            </h3>
            <div className="space-y-2">
              {experiences.map((exp, idx) => (
                <label
                  key={idx}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition ${
                    selectedExps.has(idx)
                      ? 'bg-primary-50 border-primary-500'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedExps.has(idx)}
                    onChange={() => toggleExp(idx)}
                    className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{exp.company}</div>
                    <div className="text-sm text-gray-500">
                      {exp.role} · {exp.period}
                    </div>
                  </div>
                  {selectedExps.has(idx) && (
                    <Check className="ml-auto text-primary-600" size={20} />
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Research Projects */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <BookOpen size={18} />
              {lang === 'zh' ? '研究项目' : 'Research Projects'}
            </h3>
            <div className="space-y-2">
              {projects.map((proj, idx) => (
                <label
                  key={idx}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition ${
                    selectedProjects.has(idx)
                      ? 'bg-primary-50 border-primary-500'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedProjects.has(idx)}
                    onChange={() => toggleProj(idx)}
                    className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{proj.title}</div>
                    <div className="text-sm text-gray-500">
                      {lang === 'zh' ? '研究项目' : 'Research Project'} · {proj.status || proj.statusEn}
                    </div>
                  </div>
                  {selectedProjects.has(idx) && (
                    <Check className="ml-auto text-primary-600" size={20} />
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
            <p className="font-semibold mb-1">
              {lang === 'zh' ? '📌 简历结构' : '📌 Resume Structure'}
            </p>
            <ul className="list-disc list-inside space-y-1 text-blue-700">
              <li>{lang === 'zh' ? '求职意向' : 'Career Objective'}</li>
              <li>{lang === 'zh' ? '基础信息（姓名、联系方式、教育背景）' : 'Basic Info (Name, Contact, Education)'}</li>
              <li>{lang === 'zh' ? '实习经历（STAR法则）' : 'Internship Experience (STAR method)'}</li>
              <li>{lang === 'zh' ? '研究项目（STAR法则）' : 'Research Projects (STAR method)'}</li>
              <li>{lang === 'zh' ? '技能与证书' : 'Skills & Certifications'}</li>
              <li>{lang === 'zh' ? '自我评价' : 'Self-Evaluation'}</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t bg-gray-50 flex justify-end gap-3">
          <button
            onClick={() => { setSelectedExps(new Set(experiences.map((_, i) => i))); setSelectedProjects(new Set(projects.map((_, i) => i))); }}
            className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition"
          >
            {lang === 'zh' ? '全选' : 'Select All'}
          </button>
          <button
            onClick={() => { setSelectedExps(new Set()); setSelectedProjects(new Set()); }}
            className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition"
          >
            {lang === 'zh' ? '清空' : 'Clear'}
          </button>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center gap-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 transition font-medium"
          >
            <Download size={18} />
            {isExporting ? (lang === 'zh' ? '生成中...' : 'Generating...') : (lang === 'zh' ? '导出 Word' : 'Export Word')}
          </button>
        </div>
      </div>
    </div>
  );
}
