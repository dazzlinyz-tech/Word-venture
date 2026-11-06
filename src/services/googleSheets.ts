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
  'https://script.google.com/macros/s/AKfycbxZk7dmZY0VrsPlCgMNQXan9czt2AFl3LZbYssTFxILcTYLx-IKJXnHIdWyVxy1ycakcA/exec';

export interface GameRecord {
  id: string;
  timestamp: string;
  name: string;
  play_count: number;
  correct_count: number;
  wrong_count: number;
  stageLevel?: number;
  result?: 'win' | 'fail';
  synced?: boolean;
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
 * Web App URL 가져오기 (.env.local의 NEXT_PUBLIC_GOOGLE_SCRIPT_URL 우선)
 */
export function getSheetsWebAppUrl(): string {
  try {
    const saved = localStorage.getItem(KEY_WEBAPP_URL);
    if (saved && saved.trim()) {
      return saved.trim();
    }
  } catch {
    // ignore
  }
  return getEnvGoogleScriptUrl();
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
    synced: false
  };

  // Save to local records list
  try {
    const list = getLocalRecords();
    list.unshift(record);
    localStorage.setItem(KEY_LOCAL_RECORDS, JSON.stringify(list.slice(0, 100)));
  } catch {
    // ignore
  }

  // Google Sheets 전송 시도
  const syncResult = await sendRecordToGoogleSheets(record);
  if (syncResult.success) {
    record.synced = true;
    try {
      const list = getLocalRecords();
      const updated = list.map(item => (item.id === record.id ? { ...item, synced: true } : item));
      localStorage.setItem(KEY_LOCAL_RECORDS, JSON.stringify(updated));
    } catch {
      // ignore
    }
  }

  return {
    record,
    synced: syncResult.success,
    error: syncResult.error
  };
}

/**
 * 구글 시트로 레코드 전송 (Google Apps Script Web App 호출)
 */
export async function sendRecordToGoogleSheets(
  record: GameRecord
): Promise<{ success: boolean; error?: string }> {
  const webAppUrl = getSheetsWebAppUrl();
  if (!webAppUrl || !webAppUrl.startsWith('https://script.google.com')) {
    return {
      success: false,
      error: '구글 앱스 스크립트 웹 앱 URL이 등록되지 않았습니다.'
    };
  }

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
    // Google Apps Script Web App은 no-cors 모드로 전송하여 브라우저 CORS 차단을 방지합니다.
    await fetch(webAppUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    return { success: true };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || '네트워크 오류로 전송에 실패했습니다.'
    };
  }
}

/**
 * 구글 시트 웹앱 연결 테스트
 */
export async function testSheetsConnection(
  url: string
): Promise<{ success: boolean; message: string }> {
  if (!url || !url.startsWith('https://script.google.com')) {
    return {
      success: false,
      message: '올바른 Google Apps Script Web App URL(https://script.google.com/macros/s/...)을 입력해 주세요.'
    };
  }

  try {
    const testRecord: GameRecord = {
      id: 'test_' + Date.now(),
      timestamp: formatCurrentTimestamp(),
      name: `${getStudentName()} (테스트 전송)`,
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
          average_tap_count: testRecord.average_tap_count,
          total_taps: testRecord.total_taps,
          sentence_tap_summary: testRecord.sentence_tap_summary,
          sentence_stats: testRecord.sentence_stats
        }
      })
    });

    return {
      success: true,
      message: '✅ 문장별 탭 빈도 및 평균 테스트 데이터가 구글 시트로 성공적으로 전송되었습니다! 구글 시트에서 행이 추가되었는지 확인해보세요.'
    };
  } catch (err: any) {
    return {
      success: false,
      message: '❌ 전송 실패: ' + (err?.message || '알 수 없는 오류')
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
    "average_tap_count",
    "sentence_tap_summary"
  ];
  sheet.appendRow(headers);

  var headerRange = sheet.getRange(1, 1, 1, 7);
  headerRange.setBackground("#2563EB"); // Royal Blue
  headerRange.setFontColor("#FFFFFF");
  headerRange.setFontWeight("bold");
  headerRange.setFontSize(11);
  headerRange.setHorizontalAlignment("center");
  headerRange.setVerticalAlignment("middle");

  sheet.setRowHeight(1, 38);
  sheet.setColumnWidth(1, 180); // timestamp
  sheet.setColumnWidth(2, 140); // name
  sheet.setColumnWidth(3, 110); // play_count
  sheet.setColumnWidth(4, 120); // correct_count
  sheet.setColumnWidth(5, 120); // wrong_count
  sheet.setColumnWidth(6, 140); // average_tap_count
  sheet.setColumnWidth(7, 300); // sentence_tap_summary
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
 * [CREATE] 1. 새 학습 기록 추가 (단일 행 저장 및 문장별 세부 저장)
 */
function createRecord(data) {
  var sheet = getTargetSheet();
  
  var timestamp = data.timestamp || Utilities.formatDate(new Date(), "Asia/Seoul", "yyyy-MM-dd HH:mm:ss");
  var name = String(data.name || "초등3학년 탐험가").trim();
  var play_count = Number(data.play_count != null ? data.play_count : 1);
  var correct_count = Number(data.correct_count != null ? data.correct_count : 0);
  var wrong_count = Number(data.wrong_count != null ? data.wrong_count : 0);
  var average_tap_count = Number(data.average_tap_count != null ? data.average_tap_count : 0);
  var sentence_summary = String(data.sentence_tap_summary || "");

  var newRow = [timestamp, name, play_count, correct_count, wrong_count, average_tap_count, sentence_summary];
  sheet.appendRow(newRow);

  var lastRow = sheet.getLastRow();
  var numCols = newRow.length;
  var rowRange = sheet.getRange(lastRow, 1, 1, numCols);
  rowRange.setHorizontalAlignment("center");
  rowRange.setVerticalAlignment("middle");
  
  if (lastRow % 2 === 0) {
    rowRange.setBackground("#F8FAFC");
  } else {
    rowRange.setBackground("#FFFFFF");
  }

  // 문장별 세부 데이터(sentence_stats)가 있을 경우 문장별 탭 기록 시트에도 저장
  if (data.sentence_stats && Array.isArray(data.sentence_stats) && data.sentence_stats.length > 0) {
    try {
      var sentenceSheet = getSentenceSheet();
      for (var i = 0; i < data.sentence_stats.length; i++) {
        var s = data.sentence_stats[i];
        var sRow = [
          timestamp,
          name,
          data.stageLevel || 1,
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
    row: lastRow,
    data: {
      timestamp: timestamp,
      name: name,
      play_count: play_count,
      correct_count: correct_count,
      wrong_count: wrong_count,
      average_tap_count: average_tap_count,
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
    return { success: true, count: 0, records: [], summary: {} };
  }

  var values = sheet.getRange(2, 1, lastRow - 1, 5).getValues();
  var records = [];
  var studentSummary = {};

  for (var i = 0; i < values.length; i++) {
    var row = values[i];
    var sName = String(row[1] || "").trim();
    var pCount = Number(row[2]) || 0;
    var cCount = Number(row[3]) || 0;
    var wCount = Number(row[4]) || 0;

    var item = {
      rowIndex: i + 2,
      timestamp: row[0],
      name: sName,
      play_count: pCount,
      correct_count: cCount,
      wrong_count: wCount
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
 * [UPDATE] 3. 특정 행의 기록 수정
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
 * [DELETE] 4. 특정 행 삭제
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
      case "update":
        result = updateRecord(Number(data.rowIndex), data);
        break;
      case "delete":
        result = deleteRecord(Number(data.rowIndex));
        break;
      case "summary":
        result = readRecords();
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
 * 웹 앱 수신부: GET 요청 (상태 점검 및 간이 확인용)
 */
function doGet(e) {
  var action = (e && e.parameter && e.parameter.action) || "ping";
  var result;

  if (action === "read" || action === "summary") {
    result = readRecords(e.parameter ? e.parameter.name : null);
  } else {
    var sheet = getTargetSheet();
    result = {
      status: "online",
      service: "WORD VENTURE Google Sheets Sync API",
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
