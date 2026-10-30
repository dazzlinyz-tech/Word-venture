import { AvatarId, MonsterVisualType } from '../types';

// High-Efficiency WebP Primary Assets (12KB ~ 33KB each, 97% smaller than raw JPGs)
import charRobiWebp from '../assets/images/char_robi_3d_1793326392398.webp';
import charChichiWebp from '../assets/images/char_chichi_3d_1793326394176.webp';
import charCocoWebp from '../assets/images/char_coco_3d_1793326395544.webp';
import charMinaWebp from '../assets/images/char_mina_3d_1793326389740.webp';
import charLunaWebp from '../assets/images/char_luna_3d_1793326393552.webp';
import charPupuWebp from '../assets/images/char_pupu_3d_1793326392627.webp';
import charLeoWebp from '../assets/images/char_leo_3d_1793326388782.webp';
import charKayaWebp from '../assets/images/char_kaya_3d_1793326395205.webp';
import charToriWebp from '../assets/images/char_tori_3d_1793326391080.webp';
import charSolWebp from '../assets/images/char_sol_3d_1793326395290.webp';

// Monster WebP Primary Assets
import monsterSlimeWebp from '../assets/images/monster_slime_3d_1793327241680.webp';
import monsterFlameWebp from '../assets/images/monster_flame_3d_1793327254668.webp';
import monsterIceWebp from '../assets/images/monster_ice_3d_1793327267938.webp';
import monsterForestWebp from '../assets/images/monster_forest_3d_1793327283488.webp';
import monsterMagicWebp from '../assets/images/monster_magic_3d_1793327300713.webp';
import monsterDarkWebp from '../assets/images/monster_dark_3d_1793327313729.webp';
import monsterElecWebp from '../assets/images/monster_elec_3d_1793327326432.webp';
import monsterBossWebp from '../assets/images/monster_boss_3d_1793327341591.webp';

// Retain original JPG assets as guaranteed compatibility fallbacks
import charRobiJpg from '../assets/images/char_robi_3d_1793326392398.jpg';
import charChichiJpg from '../assets/images/char_chichi_3d_1793326394176.jpg';
import charCocoJpg from '../assets/images/char_coco_3d_1793326395544.jpg';
import charMinaJpg from '../assets/images/char_mina_3d_1793326389740.jpg';
import charLunaJpg from '../assets/images/char_luna_3d_1793326393552.jpg';
import charPupuJpg from '../assets/images/char_pupu_3d_1793326392627.jpg';
import charLeoJpg from '../assets/images/char_leo_3d_1793326388782.jpg';
import charKayaJpg from '../assets/images/char_kaya_3d_1793326395205.jpg';
import charToriJpg from '../assets/images/char_tori_3d_1793326391080.jpg';
import charSolJpg from '../assets/images/char_sol_3d_1793326395290.jpg';

import monsterSlimeJpg from '../assets/images/monster_slime_3d_1793327241680.jpg';
import monsterFlameJpg from '../assets/images/monster_flame_3d_1793327254668.jpg';
import monsterIceJpg from '../assets/images/monster_ice_3d_1793327267938.jpg';
import monsterForestJpg from '../assets/images/monster_forest_3d_1793327283488.jpg';
import monsterMagicJpg from '../assets/images/monster_magic_3d_1793327300713.jpg';
import monsterDarkJpg from '../assets/images/monster_dark_3d_1793327313729.jpg';
import monsterElecJpg from '../assets/images/monster_elec_3d_1793327326432.jpg';
import monsterBossJpg from '../assets/images/monster_boss_3d_1793327341591.jpg';

export const AVATAR_IMAGES: Record<AvatarId, string> = {
  robi: charRobiWebp,
  chichi: charChichiWebp,
  coco: charCocoWebp,
  mina: charMinaWebp,
  luna: charLunaWebp,
  pupu: charPupuWebp,
  leo: charLeoWebp,
  kaya: charKayaWebp,
  tori: charToriWebp,
  sol: charSolWebp,
};

export const MONSTER_IMAGES: Record<string, string> = {
  slime: monsterSlimeWebp,
  flame: monsterFlameWebp,
  ice: monsterIceWebp,
  forest: monsterForestWebp,
  magic: monsterMagicWebp,
  dark: monsterDarkWebp,
  electric: monsterElecWebp,
  boss: monsterBossWebp,
  // backward compatibility aliases
  bat: monsterDarkWebp,
  rock: monsterIceWebp,
  jelly: monsterSlimeWebp,
  cyclops: monsterMagicWebp,
};

const PUBLIC_BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export const AVATAR_PUBLIC_FALLBACKS: Record<AvatarId, string[]> = {
  robi: [charRobiJpg, `${PUBLIC_BASE}/assets/images/char_robi_3d_1793326392398.webp`, `${PUBLIC_BASE}/assets/images/char_robi_3d_1793326392398.jpg`],
  chichi: [charChichiJpg, `${PUBLIC_BASE}/assets/images/char_chichi_3d_1793326394176.webp`, `${PUBLIC_BASE}/assets/images/char_chichi_3d_1793326394176.jpg`],
  coco: [charCocoJpg, `${PUBLIC_BASE}/assets/images/char_coco_3d_1793326395544.webp`, `${PUBLIC_BASE}/assets/images/char_coco_3d_1793326395544.jpg`],
  mina: [charMinaJpg, `${PUBLIC_BASE}/assets/images/char_mina_3d_1793326389740.webp`, `${PUBLIC_BASE}/assets/images/char_mina_3d_1793326389740.jpg`],
  luna: [charLunaJpg, `${PUBLIC_BASE}/assets/images/char_luna_3d_1793326393552.webp`, `${PUBLIC_BASE}/assets/images/char_luna_3d_1793326393552.jpg`],
  pupu: [charPupuJpg, `${PUBLIC_BASE}/assets/images/char_pupu_3d_1793326392627.webp`, `${PUBLIC_BASE}/assets/images/char_pupu_3d_1793326392627.jpg`],
  leo: [charLeoJpg, `${PUBLIC_BASE}/assets/images/char_leo_3d_1793326388782.webp`, `${PUBLIC_BASE}/assets/images/char_leo_3d_1793326388782.jpg`],
  kaya: [charKayaJpg, `${PUBLIC_BASE}/assets/images/char_kaya_3d_1793326395205.webp`, `${PUBLIC_BASE}/assets/images/char_kaya_3d_1793326395205.jpg`],
  tori: [charToriJpg, `${PUBLIC_BASE}/assets/images/char_tori_3d_1793326391080.webp`, `${PUBLIC_BASE}/assets/images/char_tori_3d_1793326391080.jpg`],
  sol: [charSolJpg, `${PUBLIC_BASE}/assets/images/char_sol_3d_1793326395290.webp`, `${PUBLIC_BASE}/assets/images/char_sol_3d_1793326395290.jpg`],
};

export const MONSTER_PUBLIC_FALLBACKS: Record<string, string[]> = {
  slime: [monsterSlimeJpg, `${PUBLIC_BASE}/assets/images/monster_slime_3d_1793327241680.webp`, `${PUBLIC_BASE}/assets/images/monster_slime_3d_1793327241680.jpg`],
  flame: [monsterFlameJpg, `${PUBLIC_BASE}/assets/images/monster_flame_3d_1793327254668.webp`, `${PUBLIC_BASE}/assets/images/monster_flame_3d_1793327254668.jpg`],
  ice: [monsterIceJpg, `${PUBLIC_BASE}/assets/images/monster_ice_3d_1793327267938.webp`, `${PUBLIC_BASE}/assets/images/monster_ice_3d_1793327267938.jpg`],
  forest: [monsterForestJpg, `${PUBLIC_BASE}/assets/images/monster_forest_3d_1793327283488.webp`, `${PUBLIC_BASE}/assets/images/monster_forest_3d_1793327283488.jpg`],
  magic: [monsterMagicJpg, `${PUBLIC_BASE}/assets/images/monster_magic_3d_1793327300713.webp`, `${PUBLIC_BASE}/assets/images/monster_magic_3d_1793327300713.jpg`],
  dark: [monsterDarkJpg, `${PUBLIC_BASE}/assets/images/monster_dark_3d_1793327313729.webp`, `${PUBLIC_BASE}/assets/images/monster_dark_3d_1793327313729.jpg`],
  electric: [monsterElecJpg, `${PUBLIC_BASE}/assets/images/monster_elec_3d_1793327326432.webp`, `${PUBLIC_BASE}/assets/images/monster_elec_3d_1793327326432.jpg`],
  boss: [monsterBossJpg, `${PUBLIC_BASE}/assets/images/monster_boss_3d_1793327341591.webp`, `${PUBLIC_BASE}/assets/images/monster_boss_3d_1793327341591.jpg`],
  bat: [monsterDarkJpg, `${PUBLIC_BASE}/assets/images/monster_dark_3d_1793327313729.webp`],
  rock: [monsterIceJpg, `${PUBLIC_BASE}/assets/images/monster_ice_3d_1793327267938.webp`],
  jelly: [monsterSlimeJpg, `${PUBLIC_BASE}/assets/images/monster_slime_3d_1793327241680.webp`],
  cyclops: [monsterMagicJpg, `${PUBLIC_BASE}/assets/images/monster_magic_3d_1793327300713.webp`],
};

// ============================================================================
// In-Memory Preload & Cache Acceleration Engine
// ============================================================================

const LOADED_IMAGE_SET = new Set<string>();
const IN_FLIGHT_PROMISES = new Map<string, Promise<boolean>>();

export interface ImageLoadMetric {
  name: string;
  url: string;
  durationMs: number;
  isCached: boolean;
  timestamp: number;
}

const PERFORMANCE_METRICS: ImageLoadMetric[] = [];

/**
 * Checks whether an image URL is already loaded and decoded in memory.
 */
export function isImagePreloaded(url: string): boolean {
  if (!url) return false;
  return LOADED_IMAGE_SET.has(url);
}

/**
 * Manually marks a URL as decoded/loaded in memory.
 */
export function markImageAsLoaded(url: string): void {
  if (url) {
    LOADED_IMAGE_SET.add(url);
  }
}

/**
 * Preload a single image into memory using Image() and asynchronous decode().
 * Returns a promise that resolves true on success or false on error.
 */
export function preloadSingleImage(url: string, name = 'asset'): Promise<boolean> {
  if (!url || typeof window === 'undefined') return Promise.resolve(false);

  // Instant return if already decoded in memory
  if (LOADED_IMAGE_SET.has(url)) {
    return Promise.resolve(true);
  }

  // Deduplicate in-flight network requests
  if (IN_FLIGHT_PROMISES.has(url)) {
    return IN_FLIGHT_PROMISES.get(url)!;
  }

  const startTime = performance.now();

  const promise = new Promise<boolean>((resolve) => {
    const img = new Image();
    img.decoding = 'async';

    img.onload = () => {
      LOADED_IMAGE_SET.add(url);
      const duration = performance.now() - startTime;
      recordMetric(name, url, duration, false);

      if ('decode' in img) {
        img.decode().catch(() => {}).finally(() => {
          IN_FLIGHT_PROMISES.delete(url);
          resolve(true);
        });
      } else {
        IN_FLIGHT_PROMISES.delete(url);
        resolve(true);
      }
    };

    img.onerror = () => {
      IN_FLIGHT_PROMISES.delete(url);
      resolve(false);
    };

    img.src = url;
  });

  IN_FLIGHT_PROMISES.set(url, promise);
  return promise;
}

/**
 * Preload an array of monster visual types by name.
 */
export function preloadMonsterTypes(types: (MonsterVisualType | string)[]): Promise<boolean[]> {
  const uniqueTypes = Array.from(new Set(types));
  const promises = uniqueTypes.map((type) => {
    const primaryUrl = MONSTER_IMAGES[type];
    if (primaryUrl) {
      return preloadSingleImage(primaryUrl, `monster-${type}`);
    }
    return Promise.resolve(false);
  });
  return Promise.all(promises);
}

/**
 * Preload Stage 1 initial monsters ('slime', 'flame', 'ice') immediately
 * so the very first battle screen displays monsters with 0ms latency.
 */
export function preloadInitialBattleMonsters(): void {
  preloadMonsterTypes(['slime', 'flame', 'ice']);
}

/**
 * Predictive background loader for upcoming stages:
 * While at Stage index N, preloads Stage N+1 and N+2 monsters in the background,
 * plus primes Boss assets when approaching late stages.
 */
export function preloadUpcomingMonstersForStage(currentIndex: number): void {
  if (typeof window === 'undefined') return;

  const nextIndex = currentIndex + 1;
  const targetTypes = new Set<string>();

  // Determine monsters that can appear in next questions
  if (nextIndex <= 2) {
    targetTypes.add('slime');
    targetTypes.add('flame');
    targetTypes.add('ice');
  } else if (nextIndex <= 6) {
    targetTypes.add('forest');
    targetTypes.add('magic');
    targetTypes.add('electric');
    targetTypes.add('flame');
  } else if (nextIndex <= 8) {
    targetTypes.add('dark');
    targetTypes.add('magic');
    targetTypes.add('electric');
    targetTypes.add('ice');
  }

  // Preload Boss ahead of time (from Stage 7 onwards)
  if (currentIndex >= 6) {
    targetTypes.add('boss');
  }

  if (targetTypes.size > 0) {
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        preloadMonsterTypes(Array.from(targetTypes));
      }, { timeout: 1500 });
    } else {
      setTimeout(() => {
        preloadMonsterTypes(Array.from(targetTypes));
      }, 100);
    }
  }
}

/**
 * Preload high-priority starter avatars (Robi, Chichi, Coco) on app launch.
 */
export function preloadStarterAvatars(): void {
  if (typeof window === 'undefined') return;
  ['robi', 'chichi', 'coco'].forEach((id) => {
    const url = AVATAR_IMAGES[id as AvatarId];
    if (url) preloadSingleImage(url, `avatar-${id}`);
  });
}

/**
 * Background idle loader for remaining assets without blocking the main thread.
 */
export function preloadAllGameAssets(): void {
  if (typeof window === 'undefined') return;

  // 1. High priority: First stage monsters and starter avatars
  preloadInitialBattleMonsters();
  preloadStarterAvatars();

  // 2. Low priority idle queue: all remaining monsters and avatars
  const remainingMonsterTypes = ['forest', 'magic', 'dark', 'electric', 'boss'];
  const remainingAvatars: AvatarId[] = ['mina', 'luna', 'pupu', 'leo', 'kaya', 'tori', 'sol'];

  const scheduleIdle = () => {
    preloadMonsterTypes(remainingMonsterTypes);
    remainingAvatars.forEach((id) => {
      const url = AVATAR_IMAGES[id];
      if (url) preloadSingleImage(url, `avatar-${id}`);
    });
  };

  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(scheduleIdle, { timeout: 2500 });
  } else {
    setTimeout(scheduleIdle, 800);
  }
}

function recordMetric(name: string, url: string, durationMs: number, isCached: boolean): void {
  PERFORMANCE_METRICS.push({
    name,
    url,
    durationMs: Number(durationMs.toFixed(1)),
    isCached,
    timestamp: Date.now()
  });
}

export function logRenderPerformance(name: string, durationMs: number, isCached: boolean): void {
  recordMetric(name, '', durationMs, isCached);
}

export function getMonsterLoadingMetrics(): ImageLoadMetric[] {
  return [...PERFORMANCE_METRICS];
}
