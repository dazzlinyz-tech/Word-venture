import React, { useState, useEffect } from 'react';
import {
  X,
  FileSpreadsheet,
  Copy,
  Check,
  ExternalLink,
  Send,
  UserCheck,
  BarChart3,
  Code2,
  Settings,
  RefreshCw,
  Sparkles,
  AlertCircle,
  HelpCircle,
  Trophy,
  CheckCircle2,
  Clock,
  MousePointerClick
} from 'lucide-react';
import {
  GOOGLE_SHEET_URL,
  GOOGLE_SPREADSHEET_ID,
  GOOGLE_APPS_SCRIPT_SOURCE,
  DEFAULT_WEB_APP_URL,
  isWebAppUrlConfigured,
  getEnvGoogleScriptUrl,
  getStudentName,
  setStudentName,
  getStudentProfile,
  getSheetsWebAppUrl,
  setSheetsWebAppUrl,
  getLocalRecords,
  clearLocalRecords,
  testSheetsConnection,
  sendRecordToGoogleSheets,
  verifyAllLocalRecords,
  SyncStatus,
  GameRecord,
  StudentProfile
} from '../services/googleSheets';
import { playClickSound, playLevelUpSound } from '../utils/audio';

interface GoogleSheetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNameChange?: (newName: string) => void;
}

export const GoogleSheetsModal: React.FC<GoogleSheetsModalProps> = ({
  isOpen,
  onClose,
  onNameChange
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'code' | 'connect'>('profile');
  const [nameInput, setNameInput] = useState(getStudentName());
  const [webAppUrlInput, setWebAppUrlInput] = useState(getSheetsWebAppUrl());
  const [profile, setProfile] = useState<StudentProfile>(getStudentProfile());
  const [records, setRecords] = useState<GameRecord[]>(getLocalRecords());

  const [copiedCode, setCopiedCode] = useState(false);
  const [testStatus, setTestStatus] = useState<{ loading: boolean; message: string; isError?: boolean } | null>(null);
  const [saveNameSuccess, setSaveNameSuccess] = useState(false);
  const [saveUrlSuccess, setSaveUrlSuccess] = useState(false);
  const [syncingAll, setSyncingAll] = useState(false);
  const [verifyingAll, setVerifyingAll] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setNameInput(getStudentName());
      setWebAppUrlInput(getSheetsWebAppUrl());
      setProfile(getStudentProfile());
      setRecords(getLocalRecords());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveName = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = nameInput.trim() || '초등3학년 탐험가';
    setStudentName(trimmed);
    setNameInput(trimmed);
    setProfile(getStudentProfile());
    setSaveNameSuccess(true);
    playClickSound();
    if (onNameChange) onNameChange(trimmed);
    setTimeout(() => setSaveNameSuccess(false), 2000);
  };

  const handleSaveWebAppUrl = () => {
    setSheetsWebAppUrl(webAppUrlInput);
    setSaveUrlSuccess(true);
    playClickSound();
    setTimeout(() => setSaveUrlSuccess(false), 2000);
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_SOURCE);
      setCopiedCode(true);
      playClickSound();
      setTimeout(() => setCopiedCode(false), 2500);
    } catch {
      // Fallback
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2500);
    }
  };

  const handleTestConnection = async () => {
    if (!webAppUrlInput.trim()) {
      setTestStatus({
        loading: false,
        message: '구글 앱스 스크립트 웹 앱 URL을 먼저 입력해 주세요!',
        isError: true
      });
      return;
    }

    setTestStatus({ loading: true, message: '구글 시트 웹 앱 연결 상태 및 저장 대조 검증 중...' });
    setSheetsWebAppUrl(webAppUrlInput);

    const result = await testSheetsConnection(webAppUrlInput.trim());
    if (result.success) {
      playLevelUpSound();
      setTestStatus({
        loading: false,
        message: result.message,
        isError: false
      });
      setProfile(getStudentProfile());
      setRecords(getLocalRecords());
    } else {
      setTestStatus({ loading: false, message: result.message, isError: true });
    }
  };

  // 구글 시트 실제 저장 데이터와 대조 검증
  const handleVerifyServerRecords = async () => {
    setVerifyingAll(true);
    setTestStatus({ loading: true, message: '구글 시트에 실제 저장된 학습 기록을 실시간으로 조회하여 대조하는 중...' });

    const result = await verifyAllLocalRecords();
    setVerifyingAll(false);
    setRecords(getLocalRecords());

    if (result.error) {
      setTestStatus({
        loading: false,
        message: `❌ 시트 대조 실패: ${result.error}`,
        isError: true
      });
    } else {
      playLevelUpSound();
      setTestStatus({
        loading: false,
        message: `📊 [대조 완료] 시트 저장 확인: ${result.verifiedCount}건 / 확인 대기: ${result.pendingCount}건 (총 ${result.totalChecked}건 검사)`,
        isError: false
      });
    }
  };

  const handleSyncUnsyncedRecords = async () => {
    const unsynced = records.filter(r => r.syncStatus !== 'verified');
    if (unsynced.length === 0) {
      setTestStatus({ loading: false, message: '모든 기록이 이미 구글 시트 저장 검증을 마쳤습니다. 대기 중인 기록이 없습니다.' });
      return;
    }

    setSyncingAll(true);
    setTestStatus({ loading: true, message: `${unsynced.length}건의 기록을 구글 시트로 전송 및 대조 검증 중...` });

    let sentCount = 0;
    for (const rec of unsynced) {
      const res = await sendRecordToGoogleSheets(rec, true); // 빠른 순차 전송
      if (res.success) {
        sentCount++;
      }
    }

    // 전송 후 전체 시트와 실시간 대조 검증 실행
    await new Promise(r => setTimeout(r, 1000));
    const verifyResult = await verifyAllLocalRecords();

    setRecords(getLocalRecords());
    setSyncingAll(false);
    playLevelUpSound();
    setTestStatus({
      loading: false,
      message: `✅ ${sentCount}건 전송 완료! 시트 저장 확인: ${verifyResult.verifiedCount}건 (확인 대기: ${verifyResult.pendingCount}건)`
    });
  };

  const accuracyRate =
    profile.totalCorrectCount + profile.totalWrongCount > 0
      ? Math.round(
          (profile.totalCorrectCount / (profile.totalCorrectCount + profile.totalWrongCount)) * 100
        )
      : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-3xl max-h-[92vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border-4 border-blue-400">
        
        {/* Modal Top Header */}
        <div className="bg-linear-to-r from-blue-600 via-indigo-600 to-sky-500 p-4 sm:p-5 text-white flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center border border-white/40 shadow-inner">
              <FileSpreadsheet className="w-6 h-6 text-yellow-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold bg-yellow-400 text-yellow-950 px-2 py-0.5 rounded-full">
                  초등 3학년 학습 연동
                </span>
                <span className="text-xs font-semibold bg-emerald-400/30 text-emerald-100 border border-emerald-300/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-ping" />
                  실시간 연동 활성화
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black tracking-tight drop-shadow-xs">
                구글 시트 연동 & Apps Script 관리
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={GOOGLE_SHEET_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-all border border-white/30 shadow-xs"
              title="새 창으로 구글 시트 열기"
            >
              <span>시트 열기</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all hover:rotate-90 active:scale-95"
              aria-label="닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-3 pt-2 shrink-0 gap-1 sm:gap-2">
          <button
            onClick={() => {
              playClickSound();
              setActiveTab('profile');
            }}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-black transition-all ${
              activeTab === 'profile'
                ? 'bg-white text-blue-600 border-t-2 border-blue-600 shadow-xs'
                : 'text-slate-600 hover:text-blue-500 hover:bg-white/60'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>학생 이름 & 기록 통계</span>
          </button>

          <button
            onClick={() => {
              playClickSound();
              setActiveTab('code');
            }}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-black transition-all ${
              activeTab === 'code'
                ? 'bg-white text-blue-600 border-t-2 border-blue-600 shadow-xs'
                : 'text-slate-600 hover:text-blue-500 hover:bg-white/60'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>앱스 스크립트 코드</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse hidden sm:inline-block" />
          </button>

          <button
            onClick={() => {
              playClickSound();
              setActiveTab('connect');
            }}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-black transition-all ${
              activeTab === 'connect'
                ? 'bg-white text-blue-600 border-t-2 border-blue-600 shadow-xs'
                : 'text-slate-600 hover:text-blue-500 hover:bg-white/60'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>웹 앱 URL 등록 & 테스트</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/50">
          
          {/* TAB 1: Student Profile & History Logs */}
          {activeTab === 'profile' && (
            <div className="space-y-5">
              
              {/* Student Name Editor Card */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-blue-200 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">✏️</span>
                    <h3 className="font-black text-slate-800 text-sm sm:text-base">
                      학생/탐험가 이름 설정 (구글 시트의 name 열)
                    </h3>
                  </div>
                  <span className="text-xs text-slate-500">초등 3학년용 식별명</span>
                </div>
                <p className="text-xs text-slate-600 mb-3">
                  게임을 플레이하면 이 이름으로 구글 시트에{' '}
                  <span className="font-bold text-blue-600">timestamp, name, play_count, correct_count, wrong_count</span>가 자동 저장됩니다.
                </p>

                <form onSubmit={handleSaveName} className="flex gap-2">
                  <input
                    type="text"
                    value={nameInput}
                    onChange={e => setNameInput(e.target.value)}
                    placeholder="예: 김민준(3-1), 이서윤"
                    maxLength={30}
                    className="flex-1 px-4 py-2.5 rounded-xl border-2 border-slate-300 focus:border-blue-500 focus:outline-hidden text-sm font-bold text-slate-800 bg-slate-50/80"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm transition-all shadow-md active:scale-95 flex items-center gap-1.5 shrink-0"
                  >
                    {saveNameSuccess ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-300" />
                        <span>저장됨!</span>
                      </>
                    ) : (
                      <>
                        <span>이름 저장</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* 4 Cumulative Stat Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-linear-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-3.5 flex flex-col items-center text-center shadow-xs">
                  <span className="text-xs font-bold text-blue-700 mb-1">🎮 총 플레이 횟수</span>
                  <span className="text-2xl font-black text-blue-900">{profile.totalPlayCount}회</span>
                  <span className="text-[10px] text-slate-500 mt-1">play_count 열</span>
                </div>

                <div className="bg-linear-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-3.5 flex flex-col items-center text-center shadow-xs">
                  <span className="text-xs font-bold text-emerald-700 mb-1">⭕ 맞힌 단어 합계</span>
                  <span className="text-2xl font-black text-emerald-900">{profile.totalCorrectCount}개</span>
                  <span className="text-[10px] text-slate-500 mt-1">correct_count 열</span>
                </div>

                <div className="bg-linear-to-br from-rose-50 to-orange-50 border border-rose-200 rounded-2xl p-3.5 flex flex-col items-center text-center shadow-xs">
                  <span className="text-xs font-bold text-rose-700 mb-1">❌ 틀린 단어 합계</span>
                  <span className="text-2xl font-black text-rose-900">{profile.totalWrongCount}개</span>
                  <span className="text-[10px] text-slate-500 mt-1">wrong_count 열</span>
                </div>

                <div className="bg-linear-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl p-3.5 flex flex-col items-center text-center shadow-xs">
                  <span className="text-xs font-bold text-amber-700 mb-1">🎯 정답률</span>
                  <span className="text-2xl font-black text-amber-900">{accuracyRate}%</span>
                  <span className="text-[10px] text-slate-500 mt-1">초등 단어 숙련도</span>
                </div>
              </div>

              {/* Recent Game Log List */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    <h3 className="font-black text-slate-800 text-sm sm:text-base">
                      최근 플레이 기록 ({records.length}건)
                    </h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={handleVerifyServerRecords}
                      disabled={verifyingAll || syncingAll}
                      className="px-2.5 py-1 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-all border border-indigo-200 flex items-center gap-1 shadow-2xs"
                      title="구글 시트에 실제 저장된 행을 직접 읽어와 로컬 기록과 실시간 대조합니다"
                    >
                      <RefreshCw className={`w-3 h-3 ${verifyingAll ? 'animate-spin text-indigo-600' : ''}`} />
                      <span>{verifyingAll ? '시트 대조 중...' : '시트 대조 확인'}</span>
                    </button>
                    <button
                      onClick={handleSyncUnsyncedRecords}
                      disabled={syncingAll || verifyingAll}
                      className="px-2.5 py-1 text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-lg transition-all border border-blue-200 flex items-center gap-1 shadow-2xs"
                    >
                      <Send className={`w-3 h-3 ${syncingAll ? 'animate-bounce' : ''}`} />
                      <span>{syncingAll ? '동기화 중...' : '미전송 동기화'}</span>
                    </button>
                    {records.length > 0 && (
                      <button
                        onClick={() => {
                          if (confirm('로컬 기록을 초기화하시겠습니까? (구글 시트의 기록은 삭제되지 않습니다)')) {
                            clearLocalRecords();
                            setRecords([]);
                            playClickSound();
                          }
                        }}
                        className="text-xs text-slate-400 hover:text-red-500 ml-1"
                      >
                        기록 비우기
                      </button>
                    )}
                  </div>
                </div>

                {records.length === 0 ? (
                  <div className="text-center py-8 text-slate-400 text-xs sm:text-sm">
                    <p className="text-2xl mb-1">📖</p>
                    <p>아직 플레이 기록이 없습니다.</p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      스테이지 게임을 마치면 여기에 자동으로 기록이 쌓이고 구글 시트로 전송됩니다.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto max-h-60 rounded-xl border border-slate-200">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead className="bg-slate-100 text-slate-700 font-bold sticky top-0">
                        <tr>
                          <th className="p-2.5 text-center">timestamp (일시)</th>
                          <th className="p-2.5 text-center">name (이름)</th>
                          <th className="p-2.5 text-center">play_count</th>
                          <th className="p-2.5 text-center">correct_count</th>
                          <th className="p-2.5 text-center">wrong_count</th>
                          <th className="p-2.5 text-center text-indigo-700">평균 탭 (문장당)</th>
                          <th className="p-2.5 text-center">동기화 상태</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium">
                        {records.map((rec) => {
                          const status = rec.syncStatus || (rec.synced ? 'verified' : 'unsynced');
                          return (
                            <tr key={rec.id} className="hover:bg-blue-50/50">
                              <td className="p-2 text-center text-slate-500 font-mono text-[11px]">
                                {rec.timestamp}
                              </td>
                              <td className="p-2 text-center font-bold text-slate-800">
                                {rec.name}
                              </td>
                              <td className="p-2 text-center text-blue-600 font-bold">
                                {rec.play_count}회
                              </td>
                              <td className="p-2 text-center text-emerald-600 font-bold">
                                {rec.correct_count}
                              </td>
                              <td className="p-2 text-center text-rose-500 font-bold">
                                {rec.wrong_count}
                              </td>
                              <td className="p-2 text-center text-indigo-600 font-bold font-mono">
                                {rec.average_tap_count != null ? `${rec.average_tap_count}회` : '-'}
                              </td>
                              <td className="p-2 text-center">
                                {status === 'verified' ? (
                                  <span
                                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold"
                                    title="구글 시트에 실제 저장된 데이터와 일치함을 검증했습니다."
                                  >
                                    <Check className="w-2.5 h-2.5 text-emerald-600" /> 시트저장확인
                                  </span>
                                ) : status === 'pending_verify' ? (
                                  <span
                                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold"
                                    title="전송 요청이 서버로 전달되었습니다. [시트 대조 확인]을 눌러 반영 여부를 검증하세요."
                                  >
                                    <Clock className="w-2.5 h-2.5 text-blue-600 animate-pulse" /> 전송됨 (대조대기)
                                  </span>
                                ) : status === 'failed' ? (
                                  <span
                                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold"
                                    title={rec.syncError || '전송 실패'}
                                  >
                                    <AlertCircle className="w-2.5 h-2.5 text-rose-600" /> 전송실패
                                  </span>
                                ) : (
                                  <span
                                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold"
                                    title="로컬 브라우저에만 저장되어 있습니다. [미전송 동기화]를 눌러 시트로 전송하세요."
                                  >
                                    로컬보관
                                  </span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: Complete Google Apps Script Code */}
          {activeTab === 'code' && (
            <div className="space-y-4">
              
              {/* Top Banner Guide */}
              <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 flex items-start gap-3">
                <span className="text-2xl shrink-0">💡</span>
                <div className="text-xs sm:text-sm text-slate-700">
                  <p className="font-black text-amber-950 mb-1">
                    구글 시트와 게임을 연결해 주는 완전한 Google Apps Script 코드입니다!
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    구글 시트의 <span className="font-bold text-blue-700">[확장 프로그램] → [Apps Script]</span>에 
                    아래 코드를 붙여넣고 <span className="font-bold text-blue-700">[배포] → [새 배포]</span>를 
                    진행하시면 초등학생들의 모든 플레이 기록이 실시간으로 스프레드시트에 영구 저장됩니다.
                  </p>
                </div>
              </div>

              {/* 3 Step Instructions */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 text-xs">
                <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-black flex items-center justify-center text-xs mb-1.5">
                    1
                  </div>
                  <h4 className="font-black text-slate-800">구글 시트 열기</h4>
                  <p className="text-slate-500 mt-1">
                    제공해주신 시트 링크를 열고 상단 메뉴 <strong>[확장 프로그램] → [Apps Script]</strong>를 클릭합니다.
                  </p>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-black flex items-center justify-center text-xs mb-1.5">
                    2
                  </div>
                  <h4 className="font-black text-slate-800">코드 붙여넣기 및 저장</h4>
                  <p className="text-slate-500 mt-1">
                    기존 내용을 지우고 아래의 스크립트 코드를 붙여넣은 뒤 <strong>Ctrl+S</strong>로 저장합니다.
                  </p>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-black flex items-center justify-center text-xs mb-1.5">
                    3
                  </div>
                  <h4 className="font-black text-slate-800">웹 앱으로 배포</h4>
                  <p className="text-slate-500 mt-1">
                    <strong>[배포] → [새 배포]</strong> 클릭 후 액세스 권한을 <strong>[모든 사용자(Anyone)]</strong>로 지정하고 배포 URL을 게임에 등록합니다.
                  </p>
                </div>
              </div>

              {/* Code Box with 1-Click Copy */}
              <div className="bg-slate-900 rounded-2xl overflow-hidden border-2 border-slate-700 shadow-lg">
                <div className="bg-slate-800 px-4 py-3 flex items-center justify-between border-b border-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                    <span className="text-xs font-mono text-slate-300 ml-2">Code.gs (Apps Script)</span>
                  </div>

                  <button
                    onClick={handleCopyCode}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-xs transition-all shadow-md active:scale-95 ${
                      copiedCode
                        ? 'bg-emerald-500 text-white'
                        : 'bg-blue-600 hover:bg-blue-500 text-white'
                    }`}
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>복사 완료!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>전체 코드 1-클릭 복사</span>
                      </>
                    )}
                  </button>
                </div>

                <pre className="p-4 text-[11px] sm:text-xs font-mono text-emerald-300 overflow-x-auto max-h-72 leading-relaxed selection:bg-blue-600 selection:text-white">
                  <code>{GOOGLE_APPS_SCRIPT_SOURCE}</code>
                </pre>
              </div>

              {/* Target Sheet Link Card */}
              <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-3 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-700">연동 대상 구글 시트 ID: </span>
                  <code className="bg-white px-2 py-0.5 rounded text-blue-700 font-mono text-[11px] border border-blue-200">
                    {GOOGLE_SPREADSHEET_ID}
                  </code>
                </div>
                <a
                  href={GOOGLE_SHEET_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 underline"
                >
                  <span>스프레드시트 열기</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {/* TAB 3: Connect Web App URL & Live Test */}
          {activeTab === 'connect' && (
            <div className="space-y-5">
              
              <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-indigo-200 shadow-xs">
                <div className="flex items-center gap-2 mb-2">
                  <Settings className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-black text-slate-800 text-sm sm:text-base">
                    Google Apps Script 웹 앱 URL (.env.local 연동)
                  </h3>
                </div>
                <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                  <code className="bg-indigo-50 text-indigo-800 font-mono font-bold px-1.5 py-0.5 rounded border border-indigo-200">.env.local</code> 파일의 <code className="bg-indigo-50 text-indigo-800 font-mono font-bold px-1.5 py-0.5 rounded border border-indigo-200">NEXT_PUBLIC_GOOGLE_SCRIPT_URL</code> 키를 통해 게임이 끝날 때마다 <strong>각 문장별 탭 빈도</strong>와 <strong>평균 탭 수</strong>가 구글 시트로 자동 전송됩니다.
                </p>

                {/* Env Var Info Badge */}
                <div className="mb-4 p-3 bg-linear-to-r from-blue-50 to-indigo-50 rounded-xl border border-indigo-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                  <div>
                    <span className="font-bold text-slate-700 block">환경 변수 키: </span>
                    <span className="font-mono text-blue-700 font-bold text-[11px]">NEXT_PUBLIC_GOOGLE_SCRIPT_URL</span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    .env.local 키 활성화됨
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      웹 앱 URL (Web App URL)
                    </label>
                    <input
                      type="url"
                      value={webAppUrlInput}
                      onChange={e => setWebAppUrlInput(e.target.value)}
                      placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 focus:border-indigo-500 focus:outline-hidden text-xs sm:text-sm font-mono text-slate-800 bg-slate-50"
                    />
                  </div>

                  {/* Active Connection Indicator */}
                  {webAppUrlInput === DEFAULT_WEB_APP_URL && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                        <span className="font-bold text-emerald-900">
                          배포된 Google Apps Script Web App이 정상 연결되어 있습니다!
                        </span>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                        문장별 탭 자동 기록 ON
                      </span>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 pt-1">
                    <button
                      onClick={handleSaveWebAppUrl}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs transition-all shadow-xs active:scale-95 flex items-center gap-1.5"
                    >
                      {saveUrlSuccess ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-300" />
                          <span>저장 완료!</span>
                        </>
                      ) : (
                        <span>URL 저장</span>
                      )}
                    </button>

                    <button
                      onClick={handleTestConnection}
                      disabled={testStatus?.loading}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs transition-all shadow-xs active:scale-95 flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{testStatus?.loading ? '전송 중...' : '연동 테스트 전송'}</span>
                    </button>

                    {webAppUrlInput !== DEFAULT_WEB_APP_URL && (
                      <button
                        onClick={() => {
                          setWebAppUrlInput(DEFAULT_WEB_APP_URL);
                          setSheetsWebAppUrl(DEFAULT_WEB_APP_URL);
                          setSaveUrlSuccess(true);
                          playClickSound();
                          setTimeout(() => setSaveUrlSuccess(false), 2000);
                        }}
                        className="px-3 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs transition-all shadow-xs active:scale-95 flex items-center gap-1"
                        title="사용자가 배포한 기본 Web App URL로 재설정"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>기본 URL로 복원</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Test Result Message Box */}
                {testStatus && (
                  <div
                    className={`mt-4 p-3.5 rounded-xl border text-xs leading-relaxed flex items-start gap-2.5 ${
                      testStatus.isError
                        ? 'bg-rose-50 border-rose-200 text-rose-800'
                        : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    }`}
                  >
                    {testStatus.isError ? (
                      <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="font-bold">{testStatus.isError ? '연동 안내' : '전송 성공'}</p>
                      <p>{testStatus.message}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Troubleshooting Card */}
              <div className="bg-slate-100 rounded-2xl p-4 border border-slate-200 text-xs text-slate-600 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <HelpCircle className="w-4 h-4 text-blue-500" />
                  <span>배포 시 자주 묻는 질문 (FAQ)</span>
                </div>
                <ul className="list-disc list-inside space-y-1 pl-1 text-[11px] leading-relaxed">
                  <li>
                    <strong>Q. 학생이 로그인하지 않아도 기록이 전송되나요?</strong>
                    <br />
                    네! Apps Script 배포 시 <strong>[액세스 권한: 모든 사용자 (Anyone)]</strong>으로 지정하시면, 초등학생들이 구글 계정으로 로그인하지 않아도 원격 시트에 즉시 기록됩니다.
                  </li>
                  <li>
                    <strong>Q. 구글 시트 열이 자동으로 생성되나요?</strong>
                    <br />
                    네! 첫 번째 전송 또는 상단 [🎮 워드 벤처 관리] 메뉴를 누르면 <code>timestamp, name, play_count, correct_count, wrong_count</code> 5개 열이 예쁜 색상과 함께 자동 세팅됩니다.
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="bg-slate-100 p-3 sm:p-4 px-6 border-t border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-bold text-blue-600">현재 탐험가:</span>
            <span className="font-extrabold text-slate-800">{nameInput}</span>
          </div>

          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-black text-xs sm:text-sm transition-all shadow-sm active:scale-95"
          >
            닫기
          </button>
        </div>

      </div>
    </div>
  );
};
