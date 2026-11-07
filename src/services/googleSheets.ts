/**
 * WORD VENTURE - 구글 시트 연동 서비스 및 Google Apps Script 생성기
 * 대상: 초등 3학년 영어 단어 학습 데이터 (timestamp, name, play_count, correct_count, wrong_count)
 * 스프레드시트: https://docs.google.com/spreadsheets/d/1RrB0KEsvcvi77JBImshNQMF1TR6knQUdxQNdRuQTEpk/edit?usp=sharing
 */

import { SentenceTapStat } from '../types';

export const GOOGLE_SHEET_URL =
  'https://docs.google.com/spreadsheets/d/1RrB0KEsvcvi77JBImshNQMF1TR6knQUdxQNdRuQTEpk/edit?usp=sharing';
export const GOOGLE_SPREADSHEET_ID = '1RrB0KEsvcvi77JBImshNQMF1TR6knQUdxQNdRuQTEpk';

/**
 * 배포된 Google Apps Script Web App 기본 URL
 * 사용자가 제공한 실제 배포 Web App 실행 주소
 */
export const DEFAULT_WEB_APP_URL =
  'https://script.google.com/macros/s/AKfycbxNuyD8XCamsSiB813wOJd9yOxG2ZvtMjjSmHLhbFpOY2cTutjcjFUFMLC8MJH5XtVMJA/exec';

export type SyncStatus = 'verified' | 'pending_verify' | 'unsynced' | 'failed';

export interface GameRecord {
  id: string;
  timestamp: string;
  name: string;
  play_count: number;
  correct_count: number;
  wrong_count: number;
  stageLevel?: number;
  result?: 'win' | 'fail';
  synced?: boolean; // 하위 호환성 (syncStatus === 'verified')
  syncStatus?: SyncStatus; // 'verified' | 'pending_verify' | 'unsynced' | 'failed'
  syncError?: string;
  lastCheckedAt?: string;
  average_tap_count?: number; // 각 문장별 평균 탭 빈도
  total_taps?: number; // 해당 라운드 전체 탭 수
  sentence_tap_summary?: string; // 각 문장별 탭 요약 텍스트
  sentence_stats?: SentenceTapStat[]; // 각 문장별 탭 상세 데이터
}

export interface StudentProfile {
  name: string;
  totalPlayCount: number;
  totalCorrectCount: number;
  totalWrongCount: number;
  lastPlayedAt: string;
}

// Local storage keys
const KEY_STUDENT_NAME = 'wordventure_student_name';
const KEY_TOTAL_PLAYS = 'wordventure_total_plays';
const KEY_TOTAL_CORRECT = 'wordventure_total_correct';
const KEY_TOTAL_WRONG = 'wordventure_total_wrong';
const KEY_LAST_PLAYED = 'wordventure_last_played';
const KEY_WEBAPP_URL = 'wordventure_sheets_webapp_url';
const KEY_LOCAL_RECORDS = 'wordventure_local_records';

/**
 * 학생 이름 가져오기 (기본값: '초등3학년 탐험가')
 */
export function getStudentName(): string {
  try {
    const saved = localStorage.getItem(KEY_STUDENT_NAME);
    return saved && saved.trim() ? saved.trim() : '초등3학년 탐험가';
  } catch {
    return '초등3학년 탐험가';
  }
}

/**
 * 학생 이름 설정
 */
export function setStudentName(name: string): void {
  try {
    localStorage.setItem(KEY_STUDENT_NAME, name.trim() || '초등3학년 탐험가');
  } catch {
    // ignore
  }
}

/**
 * 학생 누적 프로필 통계 조회
 */
export function getStudentProfile(): StudentProfile {
  try {
    const name = getStudentName();
    const totalPlayCount = parseInt(localStorage.getItem(KEY_TOTAL_PLAYS) || '0', 10);
    const totalCorrectCount = parseInt(localStorage.getItem(KEY_TOTAL_CORRECT) || '0', 10);
    const totalWrongCount = parseInt(localStorage.getItem(KEY_TOTAL_WRONG) || '0', 10);
    const lastPlayedAt = localStorage.getItem(KEY_LAST_PLAYED) || '-';

    return {
      name,
      totalPlayCount,
      totalCorrectCount,
      totalWrongCount,
      lastPlayedAt
    };
  } catch {
    return {
      name: '초등3학년 탐험가',
      totalPlayCount: 0,
      totalCorrectCount: 0,
      totalWrongCount: 0,
      lastPlayedAt: '-'
    };
  }
}

/**
 * .env.local 파일에 설정된 NEXT_PUBLIC_GOOGLE_SCRIPT_URL 키 값을 가져옵니다.
 */
export function getEnvGoogleScriptUrl(): string {
  // 1. Vite import.meta.env (vite.config.ts의 envPrefix: ['VITE_', 'NEXT_PUBLIC_'] 로 주입)
  try {
    const metaVal = (import.meta as any).env?.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
    if (metaVal && typeof metaVal === 'string' && metaVal.trim()) {
      return metaVal.trim();
    }
  } catch {
    // ignore
  }

  // 2. process.env define fallback (vite.config.ts의 define으로 주입)
  try {
    if (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_GOOGLE_SCRIPT_URL) {
      const procVal = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
      if (procVal && typeof procVal === 'string' && procVal.trim()) {
        return procVal.trim();
      }
    }
  } catch {
    // ignore
  }

  return DEFAULT_WEB_APP_URL;
}

/**
 * Web App URL 가져오기
 * localStorage에 이전 구 버전 URL(AKfycbxZk7dm...)이 남아있다면 즉시 새 URL로 자동 갱신합니다.
 */
export function getSheetsWebAppUrl(): string {
  const envUrl = getEnvGoogleScriptUrl();
  try {
    const saved = localStorage.getItem(KEY_WEBAPP_URL);
    if (saved && saved.trim()) {
      // 이전 배포 URL이 저장되어 있다면 새 URL로 갱신
      if (
        saved.includes('AKfycbxZk7dmZY0VrsPlCgMNQXan9czt2AFl3LZbYssTFxILcTYLx-IKJXnHIdWyVxy1ycakcA') ||
        (envUrl && envUrl.includes('AKfycbxNuyD8XCamsSiB813wOJd9yOxG2ZvtMjjSmHLhbFpOY2cTutjcjFUFMLC8MJH5XtVMJA') && !saved.includes('AKfycbxNuyD8XCamsSiB813wOJd9yOxG2ZvtMjjSmHLhbFpOY2cTutjcjFUFMLC8MJH5XtVMJA'))
      ) {
        localStorage.setItem(KEY_WEBAPP_URL, envUrl);
        return envUrl;
      }
      return saved.trim();
    }
  } catch {
    // ignore
  }
  return envUrl;
}

/**
 * Web App URL이 정상 등록되어 있는지 확인
 */
export function isWebAppUrlConfigured(): boolean {
  const url = getSheetsWebAppUrl();
  return Boolean(url && url.startsWith('https://script.google.com'));
}

/**
 * Web App URL 저장
 */
export function setSheetsWebAppUrl(url: string): void {
  try {
    localStorage.setItem(KEY_WEBAPP_URL, url.trim());
  } catch {
    // ignore
  }
}

/**
 * 최근 로컬 게임 기록 가져오기 (최신순 50개)
 */
export function getLocalRecords(): GameRecord[] {
  try {
    const saved = localStorage.getItem(KEY_LOCAL_RECORDS);
    if (!saved) return [];
    return JSON.parse(saved);
  } catch {
    return [];
  }
}

/**
 * 로컬 기록 전체 삭제
 */
export function clearLocalRecords(): void {
  try {
    localStorage.removeItem(KEY_LOCAL_RECORDS);
  } catch {
    // ignore
  }
}

/**
 * 날짜 포맷 (YYYY-MM-DD HH:mm:ss)
 */
export function formatCurrentTimestamp(): string {
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');
  const yyyy = now.getFullYear();
  const mm = pad(now.getMonth() + 1);
  const dd = pad(now.getDate());
  const hh = pad(now.getHours());
  const mi = pad(now.getMinutes());
  const ss = pad(now.getSeconds());
  return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
}

// 중복 전송 방지를 위한 In-Flight Set (동시 중복 호출 차단)
const inFlightRecordIds = new Set<string>();

/**
 * 단일 로컬 기록의 상태 갱신 헬퍼
 */
export function updateSingleLocalRecord(updatedRecord: GameRecord): void {
  try {
    const list = getLocalRecords();
    const updated = list.map(item => (item.id === updatedRecord.id ? { ...updatedRecord } : item));
    localStorage.setItem(KEY_LOCAL_RECORDS, JSON.stringify(updated));
  } catch {
    // ignore
  }
}

/**
 * 서버(Google Apps Script)에 저장된 기록을 실시간으로 조회하여 특정 레코드의 저장 여부를 검증합니다.
 * (GET 요청은 브라우저에서 CORS가 지원되므로 실제 데이터를 직접 읽어 대조합니다)
 */
export async function verifyRecordOnServer(
  record: GameRecord
): Promise<{ verified: boolean; error?: string; serverRecord?: any }> {
  const webAppUrl = getSheetsWebAppUrl();
  if (!webAppUrl || !webAppUrl.startsWith('https://script.google.com')) {
    return { verified: false, error: '유효한 Web App URL이 아닙니다.' };
  }

  try {
    const queryUrl = `${webAppUrl}?action=read&name=${encodeURIComponent(record.name)}`;
    const res = await fetch(queryUrl, {
      method: 'GET',
      mode: 'cors'
    });

    if (!res.ok) {
      return { verified: false, error: `서버 응답 오류 (HTTP ${res.status})` };
    }

    const json = await res.json();
    if (!json || !json.success || !Array.isArray(json.records)) {
      return { verified: false, error: '서버 데이터 형식이 올바르지 않습니다.' };
    }

    // 서버 레코드 목록에서 일치하는 기록 검색 (이름 일치 + 플레이 카운트 또는 일시 날짜 일치)
    const match = json.records.find((r: any) => {
      const nameMatch = String(r.name || '').trim() === record.name.trim();
      const playMatch = Number(r.play_count) === Number(record.play_count);
      const timeMatch =
        record.timestamp &&
        r.timestamp &&
        String(r.timestamp).includes(record.timestamp.substring(0, 10));
      return nameMatch && (playMatch || timeMatch);
    });

    if (match) {
      return { verified: true, serverRecord: match };
    }

    return { verified: false, error: '시트에서 일치하는 기록을 찾지 못했습니다 (반영 대기 중).' };
  } catch (err: any) {
    return { verified: false, error: err?.message || '네트워크 검증 오류' };
  }
}

/**
 * 모든 로컬 기록을 구글 시트 실제 데이터와 일괄 대조하여 동기화 상태를 최신화합니다.
 */
export async function verifyAllLocalRecords(): Promise<{
  totalChecked: number;
  verifiedCount: number;
  pendingCount: number;
  error?: string;
}> {
  const webAppUrl = getSheetsWebAppUrl();
  if (!webAppUrl || !webAppUrl.startsWith('https://script.google.com')) {
    return { totalChecked: 0, verifiedCount: 0, pendingCount: 0, error: 'URL 미설정' };
  }

  try {
    const res = await fetch(`${webAppUrl}?action=read`, {
      method: 'GET',
      mode: 'cors'
    });
    if (!res.ok) {
      return { totalChecked: 0, verifiedCount: 0, pendingCount: 0, error: `HTTP ${res.status}` };
    }

    const json = await res.json();
    if (!json || !Array.isArray(json.records)) {
      return { totalChecked: 0, verifiedCount: 0, pendingCount: 0, error: '데이터 형식 오류' };
    }

    const serverRecords = json.records;
    const localList = getLocalRecords();
    let verifiedCount = 0;
    let pendingCount = 0;

    const updated = localList.map(localRec => {
      const matched = serverRecords.find((s: any) => {
        const nameMatch = String(s.name || '').trim() === localRec.name.trim();
        const playMatch = Number(s.play_count) === Number(localRec.play_count);
        const timeMatch =
          localRec.timestamp &&
          s.timestamp &&
          String(s.timestamp).includes(localRec.timestamp.substring(0, 10));
        return nameMatch && (playMatch || timeMatch);
      });

      if (matched) {
        verifiedCount++;
        return {
          ...localRec,
          synced: true,
          syncStatus: 'verified' as SyncStatus,
          syncError: undefined,
          lastCheckedAt: formatCurrentTimestamp()
        };
      } else if (localRec.syncStatus === 'pending_verify' || localRec.synced) {
        pendingCount++;
        return {
          ...localRec,
          synced: false,
          syncStatus: 'pending_verify' as SyncStatus,
          syncError: '전송됨 (시트 반영 대조 대기)'
        };
      }
      return localRec;
    });

    localStorage.setItem(KEY_LOCAL_RECORDS, JSON.stringify(updated));
    return {
      totalChecked: localList.length,
      verifiedCount,
      pendingCount
    };
  } catch (err: any) {
    return {
      totalChecked: 0,
      verifiedCount: 0,
      pendingCount: 0,
      error: err?.message || '네트워크 대조 중 오류 발생'
    };
  }
}

/**
 * 게임 결과 기록 (로컬 저장 + 구글 시트 전송 시도)
 * @param roundCorrect 해당 판 맞힌 단어 수
 * @param roundWrong 해당 판 틀린 단어 수
 * @param stageLevel 스테이지 번호
 * @param result 'win' | 'fail'
 * @param sentenceStats 각 문장별 탭 세부 데이터
 * @param averageTapCount 각 문장별 평균 탭 빈도
 */
export async function recordGameSession(
  roundCorrect: number,
  roundWrong: number,
  stageLevel: number,
  result: 'win' | 'fail',
  sentenceStats?: SentenceTapStat[],
  averageTapCount?: number
): Promise<{ record: GameRecord; synced: boolean; error?: string }> {
  const name = getStudentName();
  const timestamp = formatCurrentTimestamp();

  // 기존 누적 플레이 횟수 + 1
  let currentPlayCount = 1;
  let totalCorrect = roundCorrect;
  let totalWrong = roundWrong;

  try {
    currentPlayCount = parseInt(localStorage.getItem(KEY_TOTAL_PLAYS) || '0', 10) + 1;
    totalCorrect = parseInt(localStorage.getItem(KEY_TOTAL_CORRECT) || '0', 10) + roundCorrect;
    totalWrong = parseInt(localStorage.getItem(KEY_TOTAL_WRONG) || '0', 10) + roundWrong;

    localStorage.setItem(KEY_TOTAL_PLAYS, currentPlayCount.toString());
    localStorage.setItem(KEY_TOTAL_CORRECT, totalCorrect.toString());
    localStorage.setItem(KEY_TOTAL_WRONG, totalWrong.toString());
    localStorage.setItem(KEY_LAST_PLAYED, timestamp);
  } catch {
    // ignore
  }

  // 문장별 탭 빈도 및 평균 탭 수 계산
  const validSentenceStats = sentenceStats || [];
  const totalTaps = validSentenceStats.reduce((sum, item) => sum + (item.tapCount || 0), 0);
  const calculatedAvgTaps =
    averageTapCount != null
      ? averageTapCount
      : validSentenceStats.length > 0
      ? Number((totalTaps / validSentenceStats.length).toFixed(2))
      : 0;

  // 시트에 한눈에 요약 저장할 문자열 생성 (예: [#1 apple] I have an apple. (탭:1회) | ...)
  const sentenceTapSummary =
    validSentenceStats.length > 0
      ? validSentenceStats
          .map((s, idx) => `[#${idx + 1} ${s.word}] ${s.exampleSentence || s.word} (탭:${s.tapCount}회)`)
          .join(' | ')
      : '';

  const record: GameRecord = {
    id: `rec_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    timestamp,
    name,
    play_count: currentPlayCount,
    correct_count: roundCorrect, // 이번 플레이에서 맞힌 개수
    wrong_count: roundWrong, // 이번 플레이에서 틀린 개수
    stageLevel,
    result,
    average_tap_count: calculatedAvgTaps,
    total_taps: totalTaps,
    sentence_tap_summary: sentenceTapSummary,
    sentence_stats: validSentenceStats,
    synced: false,
    syncStatus: 'unsynced'
  };

  // 1. 로컬 저장 (오프라인/네트워크 지연 시에도 유실 방지)
  try {
    const list = getLocalRecords();
    list.unshift(record);
    localStorage.setItem(KEY_LOCAL_RECORDS, JSON.stringify(list.slice(0, 100)));
  } catch {
    // ignore
  }

  // 2. Google Sheets 전송 시도
  console.log('[GoogleSheets] 학습 세션 기록 시작 -> 구글 시트 전송 시도');
  const syncResult = await sendRecordToGoogleSheets(record);

  return {
    record,
    synced: syncResult.status === 'verified',
    error: syncResult.error
  };
}

/**
 * 구글 시트로 레코드 전송 (Google Apps Script Web App 호출 및 실시간 검증)
 */
export async function sendRecordToGoogleSheets(
  record: GameRecord,
  skipVerify = false
): Promise<{ success: boolean; status: SyncStatus; isPending?: boolean; error?: string }> {
  const webAppUrl = getSheetsWebAppUrl();
  if (!webAppUrl || !webAppUrl.startsWith('https://script.google.com')) {
    const err = '구글 앱스 스크립트 웹 앱 URL이 등록되지 않았거나 올바르지 않습니다.';
    console.error('[GoogleSheets] URL 오류:', err, webAppUrl);
    record.syncStatus = 'failed';
    record.syncError = err;
    record.synced = false;
    updateSingleLocalRecord(record);
    return {
      success: false,
      status: 'failed',
      error: err
    };
  }

  // 중복 전송 방지: 이미 동일한 레코드가 전송 중인 경우 건너뜀
  if (inFlightRecordIds.has(record.id)) {
    console.warn('[GoogleSheets] 이미 전송 중인 레코드입니다:', record.id);
    return {
      success: true,
      status: record.syncStatus || 'pending_verify',
      isPending: true
    };
  }

  inFlightRecordIds.add(record.id);

  const payload = {
    action: 'create',
    data: {
      timestamp: record.timestamp,
      name: record.name,
      play_count: record.play_count,
      correct_count: record.correct_count,
      wrong_count: record.wrong_count,
      stageLevel: record.stageLevel,
      result: record.result,
      average_tap_count: record.average_tap_count != null ? record.average_tap_count : 0,
      total_taps: record.total_taps != null ? record.total_taps : 0,
      sentence_tap_summary: record.sentence_tap_summary || '',
      sentence_stats: record.sentence_stats || []
    }
  };

  try {
    console.log(`[GoogleSheets] 구글 시트로 데이터 전송 중 (URL: ${webAppUrl}):`, payload.data);

    // 1. no-cors 모드로 POST 전송 (CORS 사전 차단 방지)
    await fetch(webAppUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    console.log('[GoogleSheets] no-cors 전송 요청 전달 완료. 상태: 확인 대기 중(pending_verify)');
    
    // no-cors 상태에서는 응답을 읽을 수 없으므로 무조건 성공으로 단정짓지 않고 "전송됨 (확인 대기)" 상태로 지정
    record.syncStatus = 'pending_verify';
    record.synced = false;
    record.syncError = '전송 요청 완료 (시트 저장 대조 대기)';
    updateSingleLocalRecord(record);

    // 2. 실시간 검증 (skipVerify가 아닐 경우)
    if (!skipVerify) {
      // 구글 시트 I/O 처리를 위해 900ms 대기 후 GET 검증
      await new Promise(resolve => setTimeout(resolve, 900));
      const verifyRes = await verifyRecordOnServer(record);
      
      if (verifyRes.verified) {
        console.log('[GoogleSheets] ✅ 구글 시트 저장 및 대조 확인 성공 (verified)!');
        record.syncStatus = 'verified';
        record.synced = true;
        record.syncError = undefined;
        record.lastCheckedAt = formatCurrentTimestamp();
        updateSingleLocalRecord(record);
        inFlightRecordIds.delete(record.id);
        return { success: true, status: 'verified' };
      }
    }

    inFlightRecordIds.delete(record.id);
    return {
      success: true,
      status: 'pending_verify',
      isPending: true,
      error: '전송 요청이 전달되었으나, 시트 반영 확인 대기 중입니다.'
    };
  } catch (err: any) {
    inFlightRecordIds.delete(record.id);
    const errMessage = err?.message || '네트워크 오류로 전송에 실패했습니다.';
    console.error('[GoogleSheets] ❌ fetch 전송 중 예외 오류 발생:', err);
    record.syncStatus = 'failed';
    record.synced = false;
    record.syncError = errMessage;
    updateSingleLocalRecord(record);
    return {
      success: false,
      status: 'failed',
      error: errMessage
    };
  }
}

/**
 * 구글 시트 웹앱 연결 테스트
 * 1단계: GET ping으로 서버 도달성 및 CORS 권한 사전 확인
 * 2단계: POST로 테스트 데이터 전송
 * 3단계: GET read로 실제 시트에 저장되었는지 대조 검증
 */
export async function testSheetsConnection(
  url: string
): Promise<{ success: boolean; message: string; isPending?: boolean }> {
  if (!url || !url.startsWith('https://script.google.com')) {
    return {
      success: false,
      message: '올바른 Google Apps Script Web App URL(https://script.google.com/macros/s/...)을 입력해 주세요.'
    };
  }

  try {
    // 1단계: 서버 상태 확인 (GET ping)
    console.log('[GoogleSheets Test] 1단계: 서버 상태 확인 (GET ping)...');
    try {
      const pingRes = await fetch(`${url}?action=ping`, { method: 'GET', mode: 'cors' });
      if (!pingRes.ok) {
        return {
          success: false,
          message: `❌ 웹 앱 서버 응답 오류 (HTTP ${pingRes.status}). Apps Script 배포 상태를 점검해 주세요.`
        };
      }
    } catch (pingErr: any) {
      return {
        success: false,
        message: '❌ Google Apps Script 웹 앱에 접근할 수 없습니다. URL 주소 및 Apps Script 배포 설정의 [액세스 권한: 모든 사용자 (Anyone)]을 확인해 주세요.'
      };
    }

    // 2단계: 테스트 데이터 생성 및 POST 전송
    const testRecord: GameRecord = {
      id: 'test_' + Date.now(),
      timestamp: formatCurrentTimestamp(),
      name: `${getStudentName()} (연동테스트)`,
      play_count: 1,
      correct_count: 1,
      wrong_count: 0,
      stageLevel: 1,
      result: 'win',
      average_tap_count: 1.5,
      total_taps: 3,
      sentence_tap_summary: '[#1 apple] I have an apple. (탭: 1회) | [#2 sun] The sun is bright. (탭: 2회)',
      sentence_stats: [
        {
          questionIndex: 0,
          word: 'apple',
          exampleSentence: 'I have an apple.',
          exampleTranslation: '나는 사과를 가지고 있어.',
          tapCount: 1,
          isCorrect: true
        },
        {
          questionIndex: 1,
          word: 'sun',
          exampleSentence: 'The sun is bright.',
          exampleTranslation: '태양이 밝게 빛나요.',
          tapCount: 2,
          isCorrect: true
        }
      ]
    };

    console.log('[GoogleSheets Test] 2단계: 테스트 데이터 POST 전송...');
    await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify({
        action: 'create',
        data: {
          timestamp: testRecord.timestamp,
          name: testRecord.name,
          play_count: testRecord.play_count,
          correct_count: testRecord.correct_count,
          wrong_count: testRecord.wrong_count,
          stageLevel: testRecord.stageLevel,
          result: testRecord.result,
          average_tap_count: testRecord.average_tap_count,
          total_taps: testRecord.total_taps,
          sentence_tap_summary: testRecord.sentence_tap_summary,
          sentence_stats: testRecord.sentence_stats
        }
      })
    });

    // 3단계: 시트 저장 실시간 대조 검증 (GET read)
    console.log('[GoogleSheets Test] 3단계: 시트 저장 실시간 대조 검증 중 (GET read)...');
    await new Promise(resolve => setTimeout(resolve, 1200));

    try {
      const readRes = await fetch(`${url}?action=read`, { method: 'GET', mode: 'cors' });
      if (readRes.ok) {
        const readJson = await readRes.json();
        const found =
          readJson &&
          Array.isArray(readJson.records) &&
          readJson.records.some((r: any) => String(r.name).includes(testRecord.name));

        if (found) {
          return {
            success: true,
            message: '✅ [검증 완료] 구글 시트로 데이터가 정상 전송되었고, 스프레드시트의 실제 저장 행이 확인되었습니다! (총 기록: ' + (readJson.totalCount || readJson.records.length) + '건)'
          };
        }
      }
    } catch {
      // ignore
    }

    return {
      success: true,
      isPending: true,
      message: 'ℹ️ [전송 완료] 서버로 테스트 데이터 전송 요청이 완료되었습니다. (시트 반영까지 수초 정도 소요될 수 있습니다. 스프레드시트를 새로고침하여 확인해 보세요.)'
    };
  } catch (err: any) {
    return {
      success: false,
      message: '❌ 전송 실패: ' + (err?.message || '알 수 없는 네트워크 오류')
    };
  }
}

/**
 * 완벽한 구글 앱스 스크립트(Google Apps Script) 원본 코드
 * 사용자 스프레드시트에 복사하여 붙여넣을 수 있는 완성형 스크립트입니다.
 * 문장별 탭 빈도 및 평균 자동 기록 지원
 */
export const GOOGLE_APPS_SCRIPT_SOURCE = `/**
 * ============================================================================
 * 🎮 WORD VENTURE (초등 3학년 영어 단어 게임) - 구글 시트 CRUD & 문장별 탭 로그 Apps Script
 * ============================================================================
 * 
 * 📌 대상 구글 시트 URL:
 * https://docs.google.com/spreadsheets/d/1RrB0KEsvcvi77JBImshNQMF1TR6knQUdxQNdRuQTEpk/edit?usp=sharing
 * 
 * 📌 기록 대상 컬럼:
 * [시트 1: 워드벤처_학습기록]
 * 1. timestamp            : 게임 일시 (예: 2026-10-30 11:20:00)
 * 2. name                 : 학생/플레이어 이름 (예: 김민준, 초등3학년 탐험가)
 * 3. play_count           : 총 플레이 누적 횟수
 * 4. correct_count        : 이번 게임 맞힌 단어 수
 * 5. wrong_count          : 이번 게임 틀린 단어 수
 * 6. average_tap_count    : 각 문장별 평균 탭 빈도 (예: 1.6회)
 * 7. sentence_tap_summary : 각 문장별 탭 빈도 요약 문자열
 * 
 * [시트 2: 문장별_탭_기록 (자동생성)]
 * - timestamp, name, stage, question_no, word, sentence, translation, tap_count, average_tap_count
 * 
 * ============================================================================
 * 🚀 [선생님/관리자 초간단 3단계 설치 가이드]
 * 1. 위의 구글 시트 열기 -> 상단 메뉴 [확장 프로그램] -> [Apps Script] 클릭
 * 2. 편집기에 있는 기존 코드를 모두 지우고 이 스크립트 전체를 복사-붙여넣기 후 [저장(Ctrl+S)]
 * 3. 우측 상단 [배포] -> [새 배포] 클릭
 *    - 유형 선택: [웹 앱 (Web app)]
 *    - 설명: 워드벤처 API
 *    - 다음 사용자 권한으로 실행: [나 (Me)]
 *    - 액세스 권한이 있는 사용자: [모든 사용자 (Anyone)] ★ 매우 중요!
 *    - [배포] 버튼 클릭 후 생성된 [웹 앱 URL]을 복사하여 게임의 .env.local 또는 연동 창에 등록!
 * ============================================================================
 */

// 고정 스프레드시트 ID (스프레드시트 URL의 고유 식별자)
var SPREADSHEET_ID = "1RrB0KEsvcvi77JBImshNQMF1TR6knQUdxQNdRuQTEpk";
var SHEET_NAME = "워드벤처_학습기록";
var SHEET_NAME_SENTENCES = "문장별_탭_기록";

/**
 * 메인 시트 객체 가져오기 (없으면 자동 생성 및 예쁜 헤더 서식 설정)
 */
function getTargetSheet() {
  var ss;
  try {
    ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  } catch (e) {
    ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  }

  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    var sheets = ss.getSheets();
    // 기존 시트가 1개만 있거나 기본 '시트1'/'Sheet1'인 경우 해당 시트를 바로 활용
    if (sheets.length === 1) {
      sheet = sheets[0];
      sheet.setName(SHEET_NAME);
    } else {
      var defaultSheet = ss.getSheetByName("시트1") || ss.getSheetByName("Sheet1");
      if (defaultSheet) {
        sheet = defaultSheet;
        sheet.setName(SHEET_NAME);
      } else {
        sheet = ss.insertSheet(SHEET_NAME);
      }
    }
  }

  if (sheet.getLastRow() === 0) {
    initSheetHeaders(sheet);
  }

  return sheet;
}

/**
 * 문장별 세부 탭 시트 객체 가져오기
 */
function getSentenceSheet() {
  var ss;
  try {
    ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  } catch (e) {
    ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  }

  var sheet = ss.getSheetByName(SHEET_NAME_SENTENCES);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME_SENTENCES);
    initSentenceSheetHeaders(sheet);
  }
  return sheet;
}

/**
 * 메인 헤더 행 초기화
 */
function initSheetHeaders(sheet) {
  var headers = [
    "timestamp",
    "name",
    "play_count",
    "correct_count",
    "wrong_count",
    "stage_level",
    "result",
    "average_tap_count",
    "total_taps",
    "sentence_tap_summary"
  ];
  sheet.appendRow(headers);

  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground("#2563EB"); // Royal Blue
  headerRange.setFontColor("#FFFFFF");
  headerRange.setFontWeight("bold");
  headerRange.setFontSize(11);
  headerRange.setHorizontalAlignment("center");
  headerRange.setVerticalAlignment("middle");

  sheet.setRowHeight(1, 38);
  sheet.setColumnWidth(1, 180); // timestamp
  sheet.setColumnWidth(2, 140); // name
  sheet.setColumnWidth(3, 100); // play_count
  sheet.setColumnWidth(4, 110); // correct_count
  sheet.setColumnWidth(5, 110); // wrong_count
  sheet.setColumnWidth(6, 100); // stage_level
  sheet.setColumnWidth(7, 90);  // result
  sheet.setColumnWidth(8, 140); // average_tap_count
  sheet.setColumnWidth(9, 100); // total_taps
  sheet.setColumnWidth(10, 320); // sentence_tap_summary
  sheet.setFrozenRows(1);
}

/**
 * 문장별 세부 시트 헤더 초기화
 */
function initSentenceSheetHeaders(sheet) {
  var headers = [
    "timestamp",
    "name",
    "stage",
    "question_no",
    "word",
    "sentence",
    "translation",
    "tap_count",
    "average_tap_count"
  ];
  sheet.appendRow(headers);

  var headerRange = sheet.getRange(1, 1, 1, 9);
  headerRange.setBackground("#059669"); // Emerald Green
  headerRange.setFontColor("#FFFFFF");
  headerRange.setFontWeight("bold");
  headerRange.setFontSize(11);
  headerRange.setHorizontalAlignment("center");
  headerRange.setVerticalAlignment("middle");

  sheet.setRowHeight(1, 38);
  sheet.setColumnWidth(1, 170); // timestamp
  sheet.setColumnWidth(2, 120); // name
  sheet.setColumnWidth(3, 80);  // stage
  sheet.setColumnWidth(4, 100); // question_no
  sheet.setColumnWidth(5, 120); // word
  sheet.setColumnWidth(6, 260); // sentence
  sheet.setColumnWidth(7, 240); // translation
  sheet.setColumnWidth(8, 100); // tap_count
  sheet.setColumnWidth(9, 140); // average_tap_count
  sheet.setFrozenRows(1);
}

/**
 * [CREATE] 1. 새 학습 기록 추가 (중복 방지, 메인 시트 10개 열 + 문장별 세부 저장)
 */
function createRecord(data) {
  var sheet = getTargetSheet();
  var lastRow = sheet.getLastRow();
  
  var timestamp = data.timestamp || Utilities.formatDate(new Date(), "Asia/Seoul", "yyyy-MM-dd HH:mm:ss");
  var name = String(data.name || "초등3학년 탐험가").trim();
  var play_count = Number(data.play_count != null ? data.play_count : 1);
  var correct_count = Number(data.correct_count != null ? data.correct_count : 0);
  var wrong_count = Number(data.wrong_count != null ? data.wrong_count : 0);
  var stageLevel = Number(data.stageLevel || 1);
  var result = String(data.result || "win");
  var average_tap_count = Number(data.average_tap_count != null ? data.average_tap_count : 0);
  var total_taps = Number(data.total_taps != null ? data.total_taps : 0);
  var sentence_summary = String(data.sentence_tap_summary || "");

  // [중복 저장 방지 검사] 최근 25개 행 검사
  if (lastRow > 1) {
    var checkCount = Math.min(lastRow - 1, 25);
    var startRow = lastRow - checkCount + 1;
    var recentValues = sheet.getRange(startRow, 1, checkCount, Math.min(sheet.getLastColumn(), 5)).getValues();

    for (var r = recentValues.length - 1; r >= 0; r--) {
      var rTime = String(recentValues[r][0] || "").trim();
      var rName = String(recentValues[r][1] || "").trim();
      var rPlay = Number(recentValues[r][2]);

      // 학생 이름 + 플레이 횟수가 같고, 일시가 동일하거나 같은 분(minute) 내인 경우 중복으로 간주
      if (rName === name && rPlay === play_count) {
        if (rTime === timestamp || (timestamp && rTime.indexOf(timestamp.substring(0, 16)) !== -1)) {
          return {
            success: true,
            duplicate: true,
            message: "이미 저장된 학습 기록입니다 (중복 저장 방지됨).",
            row: startRow + r,
            data: { timestamp: timestamp, name: name, play_count: play_count }
          };
        }
      }
    }
  }

  // 메인 시트에 10개 열 저장
  var newRow = [
    timestamp,
    name,
    play_count,
    correct_count,
    wrong_count,
    stageLevel,
    result,
    average_tap_count,
    total_taps,
    sentence_summary
  ];
  sheet.appendRow(newRow);

  var newLastRow = sheet.getLastRow();
  var numCols = newRow.length;
  var rowRange = sheet.getRange(newLastRow, 1, 1, numCols);
  rowRange.setHorizontalAlignment("center");
  rowRange.setVerticalAlignment("middle");
  
  if (newLastRow % 2 === 0) {
    rowRange.setBackground("#F8FAFC");
  } else {
    rowRange.setBackground("#FFFFFF");
  }

  // 문장별 세부 데이터(sentence_stats)가 있을 경우 [문장별_탭_기록] 시트에도 저장
  if (data.sentence_stats && Array.isArray(data.sentence_stats) && data.sentence_stats.length > 0) {
    try {
      var sentenceSheet = getSentenceSheet();
      for (var i = 0; i < data.sentence_stats.length; i++) {
        var s = data.sentence_stats[i];
        var sRow = [
          timestamp,
          name,
          stageLevel,
          (s.questionIndex != null ? s.questionIndex + 1 : i + 1),
          s.word || "",
          s.exampleSentence || "",
          s.exampleTranslation || "",
          Number(s.tapCount || 0),
          average_tap_count
        ];
        sentenceSheet.appendRow(sRow);
      }
    } catch (sErr) {
      // ignore
    }
  }

  return {
    success: true,
    message: "학습 기록 및 문장별 탭 빈도가 성공적으로 저장되었습니다.",
    row: newLastRow,
    data: {
      timestamp: timestamp,
      name: name,
      play_count: play_count,
      correct_count: correct_count,
      wrong_count: wrong_count,
      stageLevel: stageLevel,
      result: result,
      average_tap_count: average_tap_count,
      total_taps: total_taps,
      sentence_tap_summary: sentence_summary
    }
  };
}

/**
 * [READ] 2. 기록 조회 (전체 또는 특정 학생)
 */
function readRecords(targetName) {
  var sheet = getTargetSheet();
  var lastRow = sheet.getLastRow();
  if (lastRow <= 1) {
    return { success: true, totalCount: 0, count: 0, records: [], summary: {} };
  }

  var numCols = Math.max(sheet.getLastColumn(), 5);
  var values = sheet.getRange(2, 1, lastRow - 1, numCols).getValues();
  var records = [];
  var studentSummary = {};

  for (var i = 0; i < values.length; i++) {
    var row = values[i];
    var sName = String(row[1] || "").trim();
    if (!sName || sName === "name") continue; // 헤더 행 스킵

    var pCount = Number(row[2]) || 0;
    var cCount = Number(row[3]) || 0;
    var wCount = Number(row[4]) || 0;
    var stageLvl = row.length > 5 && typeof row[5] === 'number' ? row[5] : (row.length > 6 ? row[5] : undefined);
    var resVal = row.length > 6 && typeof row[6] === 'string' ? row[6] : undefined;
    var avgTaps = row.length >= 8 && typeof row[7] === 'number' ? row[7] : (row.length >= 6 && typeof row[5] === 'number' ? row[5] : undefined);
    var totTaps = row.length >= 9 && typeof row[8] === 'number' ? row[8] : undefined;
    var sSummary = row.length >= 10 ? String(row[9] || "") : (row.length >= 7 ? String(row[6] || "") : "");

    var item = {
      rowIndex: i + 2,
      timestamp: row[0],
      name: sName,
      play_count: pCount,
      correct_count: cCount,
      wrong_count: wCount,
      stageLevel: stageLvl,
      result: resVal,
      average_tap_count: avgTaps,
      total_taps: totTaps,
      sentence_tap_summary: sSummary
    };

    if (!studentSummary[sName]) {
      studentSummary[sName] = {
        name: sName,
        totalSessions: 0,
        maxPlayCount: 0,
        totalCorrect: 0,
        totalWrong: 0,
        lastTimestamp: item.timestamp
      };
    }
    studentSummary[sName].totalSessions += 1;
    studentSummary[sName].maxPlayCount = Math.max(studentSummary[sName].maxPlayCount, pCount);
    studentSummary[sName].totalCorrect += cCount;
    studentSummary[sName].totalWrong += wCount;
    studentSummary[sName].lastTimestamp = item.timestamp;

    if (!targetName || sName === targetName) {
      records.push(item);
    }
  }

  return {
    success: true,
    totalCount: records.length,
    records: records.slice(-50), // 최근 50건 반환
    summary: studentSummary
  };
}

/**
 * [VERIFY] 3. 특정 기록 저장 여부 대조 검증
 */
function verifyRecord(data) {
  var sheet = getTargetSheet();
  var lastRow = sheet.getLastRow();
  if (lastRow <= 1) {
    return { success: true, verified: false, message: "시트에 기록이 없습니다." };
  }

  var searchCount = Math.min(lastRow - 1, 30);
  var startRow = lastRow - searchCount + 1;
  var values = sheet.getRange(startRow, 1, searchCount, Math.min(sheet.getLastColumn(), 5)).getValues();
  var targetName = String(data.name || "").trim();
  var targetPlay = data.play_count != null ? Number(data.play_count) : null;
  var targetTimestamp = String(data.timestamp || "").trim();

  for (var i = values.length - 1; i >= 0; i--) {
    var row = values[i];
    var rTime = String(row[0] || "").trim();
    var rName = String(row[1] || "").trim();
    var rPlay = Number(row[2]) || 0;

    var nameMatch = !targetName || rName === targetName;
    var playMatch = targetPlay == null || rPlay === targetPlay;
    var timeMatch = !targetTimestamp || rTime === targetTimestamp || (targetTimestamp && rTime.indexOf(targetTimestamp.substring(0, 10)) !== -1);

    if (nameMatch && playMatch && timeMatch) {
      return {
        success: true,
        verified: true,
        rowIndex: startRow + i,
        record: {
          timestamp: row[0],
          name: rName,
          play_count: rPlay,
          correct_count: Number(row[3]) || 0,
          wrong_count: Number(row[4]) || 0
        }
      };
    }
  }

  return { success: true, verified: false, message: "일치하는 기록을 찾지 못했습니다." };
}

/**
 * [UPDATE] 4. 특정 행의 기록 수정
 */
function updateRecord(rowIndex, data) {
  var sheet = getTargetSheet();
  var lastRow = sheet.getLastRow();
  if (rowIndex < 2 || rowIndex > lastRow) {
    return { success: false, error: "유효하지 않은 행 번호입니다: " + rowIndex };
  }

  if (data.timestamp) sheet.getRange(rowIndex, 1).setValue(data.timestamp);
  if (data.name) sheet.getRange(rowIndex, 2).setValue(String(data.name).trim());
  if (data.play_count != null) sheet.getRange(rowIndex, 3).setValue(Number(data.play_count));
  if (data.correct_count != null) sheet.getRange(rowIndex, 4).setValue(Number(data.correct_count));
  if (data.wrong_count != null) sheet.getRange(rowIndex, 5).setValue(Number(data.wrong_count));

  return { success: true, message: rowIndex + "행이 수정되었습니다." };
}

/**
 * [DELETE] 5. 특정 행 삭제
 */
function deleteRecord(rowIndex) {
  var sheet = getTargetSheet();
  var lastRow = sheet.getLastRow();
  if (rowIndex < 2 || rowIndex > lastRow) {
    return { success: false, error: "삭제할 행 번호가 잘못되었습니다." };
  }
  sheet.deleteRow(rowIndex);
  return { success: true, message: rowIndex + "행이 삭제되었습니다." };
}

/**
 * 웹 앱 수신부: POST 요청 (게임 앱에서 전송된 JSON 데이터 처리)
 */
function doPost(e) {
  try {
    var raw = (e && e.postData && e.postData.contents) ? e.postData.contents : "";
    var body = {};
    if (raw) {
      try {
        body = JSON.parse(raw);
      } catch (err) {
        body = { action: "create", data: e.parameter };
      }
    } else if (e && e.parameter) {
      body = { action: e.parameter.action || "create", data: e.parameter };
    }

    var action = (body.action || "create").toLowerCase();
    var data = body.data || body;
    var result;

    switch (action) {
      case "create":
      case "append":
      case "log":
        result = createRecord(data);
        break;
      case "read":
      case "get":
        result = readRecords(data.name);
        break;
      case "verify":
        result = verifyRecord(data);
        break;
      case "update":
        result = updateRecord(Number(data.rowIndex), data);
        break;
      case "delete":
        result = deleteRecord(Number(data.rowIndex));
        break;
      case "summary":
        result = readRecords();
        break;
      case "ping":
        result = { status: "online", service: "WORD VENTURE API", timestamp: new Date() };
        break;
      default:
        result = createRecord(data);
        break;
    }

    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 웹 앱 수신부: GET 요청 (상태 점검 및 실시간 기록 조회/검증용)
 */
function doGet(e) {
  var action = (e && e.parameter && e.parameter.action) || "ping";
  var result;

  if (action === "read" || action === "summary") {
    result = readRecords(e.parameter ? e.parameter.name : null);
  } else if (action === "verify") {
    result = verifyRecord(e.parameter || {});
  } else {
    var sheet = getTargetSheet();
    result = {
      status: "online",
      service: "WORD VENTURE Google Sheets API",
      target: "초등 3학년 영어 단어 학습 기록",
      spreadsheetId: SPREADSHEET_ID,
      sheetName: sheet.getName(),
      totalRecords: Math.max(0, sheet.getLastRow() - 1),
      timestamp: Utilities.formatDate(new Date(), "Asia/Seoul", "yyyy-MM-dd HH:mm:ss")
    };
  }

  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * 스프레드시트 열 때 상단 [🎮 워드 벤처 관리] 맞춤 메뉴 추가
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("🎮 워드 벤처 관리")
    .addItem("1. 헤더 및 서식 초기화", "menuSetupHeaders")
    .addItem("2. 샘플 학습 데이터 1건 추가", "menuAddSample")
    .addSeparator()
    .addItem("3. 전체 학습 통계 보기", "menuShowStats")
    .addToUi();
}

function menuSetupHeaders() {
  var sheet = getTargetSheet();
  initSheetHeaders(sheet);
  SpreadsheetApp.getUi().alert("✅ 헤더 설정이 완료되었습니다! (timestamp, name, play_count, correct_count, wrong_count)");
}

function menuAddSample() {
  createRecord({
    name: "김민준 (초등3-1)",
    play_count: 1,
    correct_count: 10,
    wrong_count: 0
  });
  SpreadsheetApp.getUi().alert("✅ 샘플 데이터가 1건 추가되었습니다!");
}

function menuShowStats() {
  var res = readRecords();
  var studentCount = Object.keys(res.summary).length;
  var msg = "총 기록 건수: " + res.totalCount + "건\\n등록된 학생 수: " + studentCount + "명";
  SpreadsheetApp.getUi().alert("📊 [워드 벤처] 학습 통계 요약\\n\\n" + msg);
}
`;
