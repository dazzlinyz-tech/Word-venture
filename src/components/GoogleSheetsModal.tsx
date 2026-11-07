import React, { useState } from 'react';
import {
  X,
  FileSpreadsheet,
  CheckCircle2,
  Copy,
  ExternalLink,
  Send,
  User,
  Activity,
  Code2,
  HelpCircle
} from 'lucide-react';
import {
  GOOGLE_SHEET_URL,
  GOOGLE_SPREADSHEET_ID,
  GOOGLE_APPS_SCRIPT_SOURCE,
  getStudentName,
  setStudentName,
  getPlayCount,
  getSheetsWebAppUrl,
  setSheetsWebAppUrl,
  testSheetsConnection,
  getLocalRecords,
  SheetRecord
} from '../services/googleSheets';
import { playClickSound } from '../utils/audio';

interface GoogleSheetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNameChange?: (name: string) => void;
}

export const GoogleSheetsModal: React.FC<GoogleSheetsModalProps> = ({
  isOpen,
  onClose,
  onNameChange
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'settings' | 'script'>('settings');
  const [nameInput, setNameInput] = useState(getStudentName());
  const [nameSavedMsg, setNameSavedMsg] = useState(false);
  const [webAppUrl, setWebAppUrl] = useState(getSheetsWebAppUrl());
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [copiedScript, setCopiedScript] = useState(false);
  const [records, setRecords] = useState<SheetRecord[]>(() => getLocalRecords());

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    setStudentName(nameInput);
    if (onNameChange) onNameChange(nameInput.trim() || '초등3학년 탐험가');
    setNameSavedMsg(true);
    setTimeout(() => setNameSavedMsg(false), 2000);
  };

  const handleSaveUrl = () => {
    setSheetsWebAppUrl(webAppUrl);
    setTestResult({
      success: true,
      message: '✅ 웹 앱 URL이 저장되었습니다.'
    });
  };

  const handleTestConnection = async () => {
    if (!webAppUrl.trim()) {
      setTestResult({
        success: false,
        message: 'Google Apps Script 웹 앱 URL을 먼저 입력해 주세요.'
      });
      return;
    }
    setTesting(true);
    setTestResult(null);
    setSheetsWebAppUrl(webAppUrl);

    const res = await testSheetsConnection(webAppUrl.trim());
    setTesting(false);
    setTestResult(res);
    setRecords(getLocalRecords());
  };

  const handleCopyScript = async () => {
    try {
      await navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_SOURCE);
      setCopiedScript(true);
      setTimeout(() => setCopiedScript(false), 2500);
    } catch {
      // fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-4 border-blue-400 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-linear-to-r from-blue-600 via-indigo-600 to-blue-700 text-white p-4 sm:p-5 flex items-center justify-between shadow-md shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner">
              <FileSpreadsheet className="w-6 h-6 text-yellow-300" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black font-title flex items-center gap-2">
                Google Sheets 학습 기록 연동
              </h2>
              <p className="text-xs text-blue-100">
                초등 3학년 영어 게임 5개 열 자동 저장 시스템
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all active:scale-90"
            title="닫기"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-slate-200 bg-slate-50 shrink-0">
          <button
            onClick={() => {
              playClickSound();
              setActiveTab('settings');
            }}
            className={`flex-1 py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all border-b-2 ${
              activeTab === 'settings'
                ? 'border-blue-600 text-blue-700 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>학생 이름 & 연동 설정</span>
          </button>
          <button
            onClick={() => {
              playClickSound();
              setActiveTab('script');
            }}
            className={`flex-1 py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all border-b-2 ${
              activeTab === 'script'
                ? 'border-blue-600 text-blue-700 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Google Apps Script 코드</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-slate-700">
          {activeTab === 'settings' ? (
            <>
              {/* Target Spreadsheet Link Card */}
              <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                    <FileSpreadsheet className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>연동 대상 구글 스프레드시트</span>
                  </div>
                  <p className="text-[11px] text-blue-700 font-mono truncate mt-0.5">
                    ID: {GOOGLE_SPREADSHEET_ID}
                  </p>
                </div>
                <a
                  href={GOOGLE_SHEET_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shrink-0 flex items-center gap-1 shadow-xs transition-all"
                >
                  <span>시트 열기</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* 1. Student Name Setting */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-blue-600" />
                  <span>1. 학생 이름 등록 (name 열에 기록)</span>
                </h3>
                <form onSubmit={handleSaveName} className="flex gap-2">
                  <input
                    type="text"
                    value={nameInput}
                    onChange={e => setNameInput(e.target.value)}
                    placeholder="학생 이름을 입력하세요 (예: 김민준)"
                    maxLength={15}
                    className="flex-1 px-4 py-2 rounded-xl border-2 border-slate-300 focus:border-blue-500 focus:outline-hidden text-sm font-bold text-slate-800 bg-white"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs active:scale-95 transition-all"
                  >
                    이름 저장
                  </button>
                </form>
                {nameSavedMsg && (
                  <p className="text-xs text-emerald-600 font-bold mt-1.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>학생 이름이 성공적으로 저장되었습니다!</span>
                  </p>
                )}
                <p className="text-[11px] text-slate-500 mt-2">
                  게임이 끝날 때마다 이 이름과 함께 총 플레이 횟수({getPlayCount()}회), 맞힌 단어 수, 틀린 단어 수가 기록됩니다.
                </p>
              </div>

              {/* 2. Web App URL Setting */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Send className="w-4 h-4 text-indigo-600" />
                    <span>2. Apps Script 웹 앱 배포 URL</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      playClickSound();
                      setActiveTab('script');
                    }}
                    className="text-xs text-blue-600 hover:underline font-bold flex items-center gap-1"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>URL 만드는 법 (코드 복사)</span>
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="url"
                    value={webAppUrl}
                    onChange={e => setWebAppUrl(e.target.value)}
                    placeholder="https://script.google.com/macros/s/.../exec"
                    className="flex-1 px-4 py-2 rounded-xl border-2 border-slate-300 focus:border-indigo-500 focus:outline-hidden text-xs font-mono text-slate-800 bg-white"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleSaveUrl}
                      className="px-3 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-all"
                    >
                      URL 저장
                    </button>
                    <button
                      type="button"
                      onClick={handleTestConnection}
                      disabled={testing}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs active:scale-95 transition-all disabled:opacity-50"
                    >
                      {testing ? (
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Send className="w-3.5 h-3.5" />
                      )}
                      <span>연동 테스트</span>
                    </button>
                  </div>
                </div>

                {testResult && (
                  <div
                    className={`p-3 rounded-xl text-xs font-bold ${
                      testResult.success
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-rose-50 text-rose-800 border border-rose-200'
                    }`}
                  >
                    {testResult.message}
                  </div>
                )}
              </div>

              {/* 3. Columns Summary & Local Log */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold text-slate-700">
                    📌 구글 시트에 기록되는 열 규격 (문장별 탭 빈도 및 평균 자동 저장)
                  </h3>
                  <span className="text-[10px] font-mono bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">
                    .env.local 연동
                  </span>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-1 text-center text-[10px] font-mono font-bold bg-white p-2.5 rounded-xl border border-slate-200">
                  <span className="bg-blue-100 text-blue-800 py-1 rounded">timestamp</span>
                  <span className="bg-emerald-100 text-emerald-800 py-1 rounded">name</span>
                  <span className="bg-amber-100 text-amber-800 py-1 rounded">play_count</span>
                  <span className="bg-teal-100 text-teal-800 py-1 rounded">correct_count</span>
                  <span className="bg-rose-100 text-rose-800 py-1 rounded">wrong_count</span>
                  <span className="bg-purple-100 text-purple-800 py-1 rounded">avg_taps</span>
                  <span className="bg-indigo-100 text-indigo-800 py-1 rounded">total_taps</span>
                  <span className="bg-sky-100 text-sky-800 py-1 rounded">tap_summary</span>
                </div>

                {records.length > 0 && (
                  <div className="mt-3">
                    <h4 className="text-[11px] font-bold text-slate-500 mb-1">
                      최근 기록 ({records.length}건)
                    </h4>
                    <div className="max-h-36 overflow-y-auto space-y-1">
                      {records.slice(0, 5).map(r => (
                        <div
                          key={r.id}
                          className="flex items-center justify-between text-[11px] p-2 bg-white rounded-lg border border-slate-200 gap-1.5"
                        >
                          <span className="text-slate-500 font-mono shrink-0">{r.timestamp.substring(5)}</span>
                          <span className="font-bold text-slate-800 truncate">{r.name}</span>
                          <span className="text-blue-700 shrink-0">#{r.play_count}회</span>
                          <span className="text-emerald-600 font-bold shrink-0">정답 {r.correct_count}</span>
                          <span className="text-rose-500 font-bold shrink-0">오답 {r.wrong_count}</span>
                          <span className="text-indigo-700 font-bold shrink-0">평균탭 {r.average_tap_count != null ? `${r.average_tap_count}회` : '1회'}</span>
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0 ${r.synced ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                            {r.synced ? '전송됨' : '로컬보관'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Tab 2: Apps Script Code */
            <div className="space-y-4">
              <div className="p-3.5 bg-indigo-50 border border-indigo-200 rounded-2xl flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-xs font-black text-indigo-950 flex items-center gap-1.5">
                    <Code2 className="w-4 h-4 text-indigo-600" />
                    <span>생성된 Google Apps Script 코드</span>
                  </h3>
                  <p className="text-[11px] text-indigo-700 mt-0.5">
                    구글 시트의 [확장 프로그램] ➔ [Apps Script]에 붙여넣어 웹 앱으로 배포하세요.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCopyScript}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black flex items-center gap-1.5 shadow-sm active:scale-95 transition-all shrink-0"
                >
                  {copiedScript ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                      <span>복사 완료!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>코드 전체 복사</span>
                    </>
                  )}
                </button>
              </div>

              {/* 3 Step Guide */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs space-y-2">
                <h4 className="font-bold text-slate-800">🚀 간편 3단계 배포 가이드</h4>
                <ol className="list-decimal list-inside space-y-1.5 text-slate-600 leading-relaxed">
                  <li>
                    <strong className="text-blue-700">구글 시트</strong> 상단 메뉴에서 <strong>[확장 프로그램] ➔ [Apps Script]</strong>를 누릅니다.
                  </li>
                  <li>
                    기존 코드를 지우고 아래 <strong>코드 전체를 붙여넣기</strong> 한 후 저장(<kbd className="px-1 py-0.5 bg-white border rounded">Ctrl+S</kbd>)합니다.
                  </li>
                  <li>
                    우측 상단 <strong>[배포] ➔ [새 배포]</strong> 클릭 ➔ 유형: <strong>웹 앱</strong> ➔ 액세스 권한: <strong>[모든 사용자 (Anyone)]</strong> 선택 후 배포한 웹 앱 URL을 등록합니다!
                  </li>
                </ol>
              </div>

              {/* Code block */}
              <div className="relative">
                <pre className="p-4 bg-slate-900 text-slate-200 rounded-2xl text-[11px] font-mono overflow-x-auto max-h-72 leading-relaxed border border-slate-800 select-all">
                  <code>{GOOGLE_APPS_SCRIPT_SOURCE}</code>
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-100 p-3 sm:p-4 border-t border-slate-200 flex justify-end shrink-0">
          <button
            type="button"
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-800 text-white font-bold text-xs shadow-xs active:scale-95 transition-all"
          >
            확인 및 닫기
          </button>
        </div>

      </div>
    </div>
  );
};
