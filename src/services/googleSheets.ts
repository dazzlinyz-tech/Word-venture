/**
 * ============================================================================
 * 🎮 WORD VENTURE - Google Sheets & Apps Script 학습 기록 연동 서비스
 * ============================================================================
 * 
 * 📌 대상 구글 시트 링크:
 * https://docs.google.com/spreadsheets/d/1hbXESGzjIqjye0LA6tFrg6fULlASbBFLKcW2ZmrF3Vo/edit?usp=sharing
 * 
 * 📌 .env.local 환경 변수 키:
 * NEXT_PUBLIC_GOOGLE_SCRIPT_URL
 * 
 * 📌 기록 대상 열:
 * 1. timestamp            : 게임 일시 (예: 2026-11-06 20:28:30)
 * 2. name                 : 학생/플레이어 이름 (예: 김민준)
 * 3. play_count           : 총 플레이 횟수
 * 4. correct_count        : 맞힌 단어 수
 * 5. wrong_count          : 틀린 단어 수
 * 6. average_tap_count    : 각 문장별 평균 탭 빈도 (예: 1.5회)
 * 7. total_taps           : 이번 게임 총 탭 수
 * 8. sentence_tap_summary : 각 문장별 탭 빈도 요약 문자열
 * 
 * [시트 2: 문장별_탭_기록 (세부 데이터 자동 분할 저장)]
 * - timestamp, name, question_no, word, sentence, translation, tap_count, average_tap_count
 */

import { SentenceTapStat } from '../types';

export const GOOGLE_SHEET_URL =
  'https://docs.google.com/spreadsheets/d/1hbXESGzjIqjye0LA6tFrg6fULlASbBFLKcW2ZmrF3Vo/edit?usp=sharing';
export const GOOGLE_SPREADSHEET_ID = '1hbXESGzjIqjye0LA6tFrg6fULlASbBFLKcW2ZmrF3Vo';

/**
 * 기본 Web App URL (.env.local에 설정된 기본 배포 주소)
 */
export const DEFAULT_WEB_APP_URL =
  'https://script.google.com/macros/s/AKfycbymeTKYR1eUqz8OiZjSMs4nWgNKHszw47KoyClC3U40AS8QSkU9wpIj3sQBHBYmspYoZg/exec';

export interface SheetRecord {
  id: string;
  timestamp: string;
  name: string;
  play_count: number;
  correct_count: number;
  wrong_count: number;
  average_tap_count?: number; // 각 문장별 평균 탭 수
  total_taps?: number; // 이번 게임 총 탭 수
  sentence_tap_summary?: string; // 각 문장별 탭 요약
  sentence_stats?: SentenceTapStat[]; // 문장별 세부 데이터
  synced?: boolean;
}

const KEY_STUDENT_NAME = 'wordventure_student_name';
const KEY_TOTAL_PLAYS = 'wordventure_play_count';
const KEY_TOTAL_CORRECT = 'wordventure_total_correct';
const KEY_TOTAL_WRONG = 'wordventure_total_wrong';
const KEY_LOCAL_RECORDS = 'wordventure_sheet_records';
const KEY_WEBAPP_URL = 'wordventure_sheets_webapp_url';

export const DEFAULT_STUDENT_NAME = '초등3학년 탐험가';

/**
 * .env.local 파일에 설정된 NEXT_PUBLIC_GOOGLE_SCRIPT_URL 키 값을 가져옵니다.
 */
export function getEnvGoogleScriptUrl(): string {
  // 1. Vite import.meta.env
  try {
    const metaVal = (import.meta as any).env?.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
    if (metaVal && typeof metaVal === 'string' && metaVal.trim()) {
      return metaVal.trim();
    }
  } catch {
    // ignore
  }

  // 2. process.env define fallback
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
 * 학생 이름 가져오기
 */
export function getStudentName(): string {
  try {
    const saved = localStorage.getItem(KEY_STUDENT_NAME);
    if (saved && saved.trim()) return saved.trim();
  } catch {
    // ignore
  }
  return DEFAULT_STUDENT_NAME;
}

/**
 * 학생 이름 저장하기
 */
export function setStudentName(name: string): void {
  try {
    const trimmed = name.trim();
    if (trimmed) {
      localStorage.setItem(KEY_STUDENT_NAME, trimmed);
    } else {
      localStorage.setItem(KEY_STUDENT_NAME, DEFAULT_STUDENT_NAME);
    }
  } catch {
    // ignore
  }
}

/**
 * 누적 플레이 횟수 가져오기
 */
export function getPlayCount(): number {
  try {
    return parseInt(localStorage.getItem(KEY_TOTAL_PLAYS) || '0', 10);
  } catch {
    return 0;
  }
}

/**
 * 환경 변수(.env.local의 NEXT_PUBLIC_GOOGLE_SCRIPT_URL) 또는 로컬스토리지에서 Web App URL 가져오기
 */
export function getSheetsWebAppUrl(): string {
  const envUrl = getEnvGoogleScriptUrl();
  try {
    const saved = localStorage.getItem(KEY_WEBAPP_URL);
    if (saved && saved.trim()) {
      // 이전 배포 URL이 저장되어 있다면 새 배포 URL로 자동 갱신
      if (
        saved.includes('AKfycbzq3Dh') ||
        saved.includes('AKfycbxNuy') ||
        saved.includes('AKfycbxZk7')
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
 * 최근 로컬 게임 기록 가져오기
 */
export function getLocalRecords(): SheetRecord[] {
  try {
    const saved = localStorage.getItem(KEY_LOCAL_RECORDS);
    if (!saved) return [];
    return JSON.parse(saved);
  } catch {
    return [];
  }
}

/**
 * 현재 일시 포맷 (YYYY-MM-DD HH:mm:ss)
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
 * 게임 종료 시 Google Sheets 및 로컬에 학습 세션 기록
 * - NEXT_PUBLIC_GOOGLE_SCRIPT_URL 키 값을 이용하여
 * - timestamp, name, play_count, correct_count, wrong_count
 * - 각 문장별 탭 빈도(sentence_tap_summary)와 평균(average_tap_count)을 저장합니다.
 */
export async function recordGameSession(
  roundCorrect: number,
  roundWrong: number,
  sentenceStats?: SentenceTapStat[],
  averageTapCount?: number,
  totalTapCount?: number
): Promise<{ record: SheetRecord; synced: boolean; error?: string }> {
  const name = getStudentName();
  const timestamp = formatCurrentTimestamp();

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
  } catch {
    // ignore
  }

  // 문장별 탭 빈도 및 평균 탭 수 계산
  const validSentenceStats = sentenceStats || [];
  const calculatedTotalTaps =
    totalTapCount != null
      ? totalTapCount
      : validSentenceStats.reduce((sum, item) => sum + (item.tapCount || 0), 0);

  const calculatedAvgTaps =
    averageTapCount != null
      ? averageTapCount
      : validSentenceStats.length > 0
      ? Number((calculatedTotalTaps / validSentenceStats.length).toFixed(2))
      : 0;

  // 시트에 저장할 문장별 탭 요약 텍스트
  const sentenceTapSummary =
    validSentenceStats.length > 0
      ? validSentenceStats
          .map((s, idx) => `[#${idx + 1} ${s.word}] ${s.exampleSentence || s.word} (탭:${s.tapCount}회)`)
          .join(' | ')
      : '';

  const record: SheetRecord = {
    id: `rec_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    timestamp,
    name,
    play_count: currentPlayCount,
    correct_count: roundCorrect,
    wrong_count: roundWrong,
    average_tap_count: calculatedAvgTaps,
    total_taps: calculatedTotalTaps,
    sentence_tap_summary: sentenceTapSummary,
    sentence_stats: validSentenceStats,
    synced: false
  };

  // 1. 로컬 저장 (오프라인 시에도 유실 방지)
  try {
    const list = getLocalRecords();
    list.unshift(record);
    localStorage.setItem(KEY_LOCAL_RECORDS, JSON.stringify(list.slice(0, 100)));
  } catch {
    // ignore
  }

  // 2. Google Sheets Web App으로 전송 (.env.local의 NEXT_PUBLIC_GOOGLE_SCRIPT_URL 사용)
  const webAppUrl = getSheetsWebAppUrl();
  if (!webAppUrl || !webAppUrl.startsWith('https://script.google.com')) {
    console.warn('[GoogleSheets] 유효한 Web App URL이 설정되지 않았습니다:', webAppUrl);
    return { record, synced: false };
  }

  try {
    console.log(`[GoogleSheets] 구글 시트로 데이터 전송 중 (URL: ${webAppUrl}):`, {
      name: record.name,
      play_count: record.play_count,
      average_tap_count: calculatedAvgTaps,
      total_taps: calculatedTotalTaps,
      sentence_tap_summary: sentenceTapSummary
    });

    await fetch(webAppUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify({
        action: 'create',
        data: {
          timestamp: record.timestamp,
          name: record.name,
          play_count: record.play_count,
          correct_count: record.correct_count,
          wrong_count: record.wrong_count,
          average_tap_count: calculatedAvgTaps,
          total_taps: calculatedTotalTaps,
          sentence_tap_summary: sentenceTapSummary,
          sentence_stats: validSentenceStats
        }
      })
    });

    record.synced = true;
    try {
      const list = getLocalRecords();
      const updated = list.map(item => (item.id === record.id ? { ...record, synced: true } : item));
      localStorage.setItem(KEY_LOCAL_RECORDS, JSON.stringify(updated));
    } catch {
      // ignore
    }

    return { record, synced: true };
  } catch (err: any) {
    console.error('[GoogleSheets] 전송 오류:', err);
    return { record, synced: false, error: err?.message };
  }
}

/**
 * 웹 앱 연결 테스트 전송
 */
export async function testSheetsConnection(
  url: string
): Promise<{ success: boolean; message: string }> {
  if (!url || !url.startsWith('https://script.google.com')) {
    return {
      success: false,
      message: '올바른 Google Apps Script Web App URL(https://script.google.com/macros/s/.../exec)을 입력해 주세요.'
    };
  }

  try {
    const testRecord = {
      timestamp: formatCurrentTimestamp(),
      name: `${getStudentName()} (테스트)`,
      play_count: getPlayCount() || 1,
      correct_count: 5,
      wrong_count: 0,
      average_tap_count: 1.5,
      total_taps: 3,
      sentence_tap_summary: '[#1 apple] I have an apple. (탭:1회) | [#2 sun] The sun is bright. (탭:2회)',
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
        data: testRecord
      })
    });

    return {
      success: true,
      message: '✅ 테스트 데이터 전송 요청이 성공적으로 전달되었습니다! (문장별 탭 빈도 및 평균 포함)'
    };
  } catch (err: any) {
    return {
      success: false,
      message: '❌ 전송 실패: ' + (err?.message || '네트워크 오류')
    };
  }
}

/**
 * ============================================================================
 * 📋 생성된 Google Apps Script 전체 소스 코드
 * ============================================================================
 * 문장별 탭 빈도(sentence_tap_summary)와 평균(average_tap_count) 자동 저장 지원
 */
export const GOOGLE_APPS_SCRIPT_SOURCE = `/**
 * ============================================================================
 * 🎮 WORD VENTURE (초등 3학년 영어 단어 게임) - Google Sheets 학습 기록 연동 스크립트
 * ============================================================================
 * 
 * 📌 대상 구글 시트 링크:
 * https://docs.google.com/spreadsheets/d/1hbXESGzjIqjye0LA6tFrg6fULlASbBFLKcW2ZmrF3Vo/edit?usp=sharing
 * 
 * 📌 메인 시트: [워드벤처_학습기록]
 * 1. timestamp            : 게임 일시 (예: 2026-11-06 20:28:30)
 * 2. name                 : 학생/플레이어 이름 (예: 김민준)
 * 3. play_count           : 총 플레이 횟수
 * 4. correct_count        : 맞힌 단어 수
 * 5. wrong_count          : 틀린 단어 수
 * 6. average_tap_count    : 각 문장별 평균 탭 빈도 (예: 1.5회)
 * 7. total_taps           : 이번 게임 총 탭 수
 * 8. sentence_tap_summary : 각 문장별 탭 빈도 요약 문자열
 * 
 * 📌 보조 시트: [문장별_탭_기록] (세부 탭 데이터 자동 분할 저장)
 * - timestamp, name, question_no, word, sentence, translation, tap_count, average_tap_count
 */

var SPREADSHEET_ID = "1hbXESGzjIqjye0LA6tFrg6fULlASbBFLKcW2ZmrF3Vo";
var SHEET_NAME = "워드벤처_학습기록";
var SHEET_NAME_SENTENCES = "문장별_탭_기록";

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
    if (sheets.length === 1 && sheets[0].getLastRow() === 0) {
      sheet = sheets[0];
      sheet.setName(SHEET_NAME);
    } else {
      sheet = ss.insertSheet(SHEET_NAME);
    }
  }

  if (sheet.getLastRow() === 0) {
    initSheetHeaders(sheet);
  } else if (sheet.getLastColumn() === 5) {
    // 기존 5개 열만 있던 시트를 8개 열로 자동 확장
    expandSheetHeaders(sheet);
  }

  return sheet;
}

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

function initSheetHeaders(sheet) {
  var headers = [
    "timestamp",
    "name",
    "play_count",
    "correct_count",
    "wrong_count",
    "average_tap_count",
    "total_taps",
    "sentence_tap_summary"
  ];
  sheet.appendRow(headers);

  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground("#2563EB");
  headerRange.setFontColor("#FFFFFF");
  headerRange.setFontWeight("bold");
  headerRange.setFontSize(11);
  headerRange.setHorizontalAlignment("center");
  headerRange.setVerticalAlignment("middle");

  sheet.setRowHeight(1, 38);
  sheet.setColumnWidth(1, 180); // timestamp
  sheet.setColumnWidth(2, 140); // name
  sheet.setColumnWidth(3, 110); // play_count
  sheet.setColumnWidth(4, 110); // correct_count
  sheet.setColumnWidth(5, 110); // wrong_count
  sheet.setColumnWidth(6, 140); // average_tap_count
  sheet.setColumnWidth(7, 100); // total_taps
  sheet.setColumnWidth(8, 320); // sentence_tap_summary
  sheet.setFrozenRows(1);
}

function expandSheetHeaders(sheet) {
  sheet.getRange(1, 6, 1, 3).setValues([["average_tap_count", "total_taps", "sentence_tap_summary"]]);
  var extraRange = sheet.getRange(1, 6, 1, 3);
  extraRange.setBackground("#2563EB");
  extraRange.setFontColor("#FFFFFF");
  extraRange.setFontWeight("bold");
  extraRange.setHorizontalAlignment("center");
  extraRange.setVerticalAlignment("middle");
  sheet.setColumnWidth(6, 140);
  sheet.setColumnWidth(7, 100);
  sheet.setColumnWidth(8, 320);
}

function initSentenceSheetHeaders(sheet) {
  var headers = [
    "timestamp",
    "name",
    "question_no",
    "word",
    "sentence",
    "translation",
    "tap_count",
    "average_tap_count"
  ];
  sheet.appendRow(headers);

  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground("#059669");
  headerRange.setFontColor("#FFFFFF");
  headerRange.setFontWeight("bold");
  headerRange.setFontSize(11);
  headerRange.setHorizontalAlignment("center");
  headerRange.setVerticalAlignment("middle");

  sheet.setRowHeight(1, 38);
  sheet.setColumnWidth(1, 170);
  sheet.setColumnWidth(2, 120);
  sheet.setColumnWidth(3, 100);
  sheet.setColumnWidth(4, 120);
  sheet.setColumnWidth(5, 260);
  sheet.setColumnWidth(6, 240);
  sheet.setColumnWidth(7, 100);
  sheet.setColumnWidth(8, 140);
  sheet.setFrozenRows(1);
}

function createRecord(data) {
  var sheet = getTargetSheet();
  
  var timestamp = data.timestamp || Utilities.formatDate(new Date(), "Asia/Seoul", "yyyy-MM-dd HH:mm:ss");
  var name = String(data.name || "초등3학년 탐험가").trim();
  var play_count = Number(data.play_count != null ? data.play_count : 1);
  var correct_count = Number(data.correct_count != null ? data.correct_count : 0);
  var wrong_count = Number(data.wrong_count != null ? data.wrong_count : 0);
  var average_tap_count = Number(data.average_tap_count != null ? data.average_tap_count : 0);
  var total_taps = Number(data.total_taps != null ? data.total_taps : 0);
  var sentence_summary = String(data.sentence_tap_summary || "");

  var newRow = [
    timestamp,
    name,
    play_count,
    correct_count,
    wrong_count,
    average_tap_count,
    total_taps,
    sentence_summary
  ];
  sheet.appendRow(newRow);

  var newLastRow = sheet.getLastRow();
  var rowRange = sheet.getRange(newLastRow, 1, 1, newRow.length);
  rowRange.setHorizontalAlignment("center");
  rowRange.setVerticalAlignment("middle");

  if (newLastRow % 2 === 0) {
    rowRange.setBackground("#F8FAFC");
  } else {
    rowRange.setBackground("#FFFFFF");
  }

  // 문장별 세부 데이터(sentence_stats)가 있을 경우 [문장별_탭_기록] 시트에도 분할 저장
  if (data.sentence_stats && Array.isArray(data.sentence_stats) && data.sentence_stats.length > 0) {
    try {
      var sentenceSheet = getSentenceSheet();
      for (var i = 0; i < data.sentence_stats.length; i++) {
        var s = data.sentence_stats[i];
        var sRow = [
          timestamp,
          name,
          (s.questionIndex != null ? s.questionIndex + 1 : i + 1),
          s.word || "",
          s.exampleSentence || "",
          s.exampleTranslation || "",
          Number(s.tapCount || 0),
          average_tap_count
        ];
        sentenceSheet.appendRow(sRow);
      }
    } catch (sErr) {}
  }

  return {
    success: true,
    message: "학습 기록 및 문장별 탭 통계가 성공적으로 저장되었습니다.",
    row: newLastRow,
    data: {
      timestamp: timestamp,
      name: name,
      play_count: play_count,
      correct_count: correct_count,
      wrong_count: wrong_count,
      average_tap_count: average_tap_count,
      total_taps: total_taps,
      sentence_tap_summary: sentence_summary
    }
  };
}

function readRecords() {
  var sheet = getTargetSheet();
  var lastRow = sheet.getLastRow();
  if (lastRow <= 1) {
    return { success: true, count: 0, records: [] };
  }

  var numCols = Math.max(sheet.getLastColumn(), 5);
  var values = sheet.getRange(2, 1, lastRow - 1, numCols).getValues();
  var records = [];
  for (var i = 0; i < values.length; i++) {
    var row = values[i];
    records.push({
      rowIndex: i + 2,
      timestamp: row[0],
      name: row[1],
      play_count: Number(row[2]) || 0,
      correct_count: Number(row[3]) || 0,
      wrong_count: Number(row[4]) || 0,
      average_tap_count: row.length >= 6 ? Number(row[5]) : undefined,
      total_taps: row.length >= 7 ? Number(row[6]) : undefined,
      sentence_tap_summary: row.length >= 8 ? String(row[7] || "") : ""
    });
  }

  return {
    success: true,
    count: records.length,
    records: records.slice(-50)
  };
}

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

    if (action === "read" || action === "get") {
      result = readRecords();
    } else {
      result = createRecord(data);
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

function doGet(e) {
  var action = (e && e.parameter && e.parameter.action) || "ping";
  var result;

  if (action === "read" || action === "list") {
    result = readRecords();
  } else {
    var sheet = getTargetSheet();
    result = {
      status: "online",
      service: "WORD VENTURE Apps Script API",
      spreadsheetId: SPREADSHEET_ID,
      sheetName: sheet.getName(),
      totalRecords: Math.max(0, sheet.getLastRow() - 1),
      columns: [
        "timestamp",
        "name",
        "play_count",
        "correct_count",
        "wrong_count",
        "average_tap_count",
        "total_taps",
        "sentence_tap_summary"
      ]
    };
  }

  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("🎮 워드 벤처 관리")
    .addItem("1. 헤더 서식 초기화 (8개 열)", "menuSetupHeaders")
    .addItem("2. 샘플 학습 데이터 1건 추가", "menuAddSample")
    .addToUi();
}

function menuSetupHeaders() {
  var sheet = getTargetSheet();
  initSheetHeaders(sheet);
  SpreadsheetApp.getUi().alert("✅ 헤더 설정이 완료되었습니다! (timestamp, name, play_count, correct_count, wrong_count, average_tap_count, total_taps, sentence_tap_summary)");
}

function menuAddSample() {
  createRecord({
    name: "김민준 (초등3)",
    play_count: 1,
    correct_count: 10,
    wrong_count: 0,
    average_tap_count: 1.5,
    total_taps: 3,
    sentence_tap_summary: "[#1 apple] I have an apple. (탭:1회) | [#2 sun] The sun is bright. (탭:2회)"
  });
  SpreadsheetApp.getUi().alert("✅ 샘플 데이터 1건이 시트에 추가되었습니다!");
}
`;
