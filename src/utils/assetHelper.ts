import { AvatarId, MonsterVisualType } from '../types';

// ES Module imports ensure Vite hashes and bundles these assets into dist/assets/
// both in dev preview and in production / shared links.
import charLeoImg from '../assets/images/char_leo_3d_1793326388782.jpg';
import charMinaImg from '../assets/images/char_mina_3d_1793326389740.jpg';
import charToriImg from '../assets/images/char_tori_3d_1793326391080.jpg';
import charPupuImg from '../assets/images/char_pupu_3d_1793326392627.jpg';
import charRobiImg from '../assets/images/char_robi_3d_1793326392398.jpg';
import charLunaImg from '../assets/images/char_luna_3d_1793326393552.jpg';
import charChichiImg from '../assets/images/char_chichi_3d_1793326394176.jpg';
import charKayaImg from '../assets/images/char_kaya_3d_1793326395205.jpg';
import charCocoImg from '../assets/images/char_coco_3d_1793326395544.jpg';
import charSolImg from '../assets/images/char_sol_3d_1793326395290.jpg';

import monsterSlimeImg from '../assets/images/monster_slime_3d_1793327241680.jpg';
import monsterFlameImg from '../assets/images/monster_flame_3d_1793327254668.jpg';
import monsterIceImg from '../assets/images/monster_ice_3d_1793327267938.jpg';
import monsterForestImg from '../assets/images/monster_forest_3d_1793327283488.jpg';
import monsterMagicImg from '../assets/images/monster_magic_3d_1793327300713.jpg';
import monsterDarkImg from '../assets/images/monster_dark_3d_1793327313729.jpg';
import monsterElecImg from '../assets/images/monster_elec_3d_1793327326432.jpg';
import monsterBossImg from '../assets/images/monster_boss_3d_1793327341591.jpg';

export const AVATAR_IMAGES: Record<AvatarId, string> = {
  robi: charRobiImg,
  chichi: charChichiImg,
  coco: charCocoImg,
  mina: charMinaImg,
  luna: charLunaImg,
  pupu: charPupuImg,
  leo: charLeoImg,
  kaya: charKayaImg,
  tori: charToriImg,
  sol: charSolImg,
};

export const MONSTER_IMAGES: Record<string, string> = {
  slime: monsterSlimeImg,
  flame: monsterFlameImg,
  ice: monsterIceImg,
  forest: monsterForestImg,
  magic: monsterMagicImg,
  dark: monsterDarkImg,
  electric: monsterElecImg,
  boss: monsterBossImg,
  // backward compatibility aliases
  bat: monsterDarkImg,
  rock: monsterIceImg,
  jelly: monsterSlimeImg,
  cyclops: monsterMagicImg,
};

// Public fallback filenames in case bundled asset has network or path mismatch
const PUBLIC_BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export const AVATAR_PUBLIC_FALLBACKS: Record<AvatarId, string[]> = {
  robi: [`${PUBLIC_BASE}/assets/images/char_robi_3d_1793326392398.jpg`, `${PUBLIC_BASE}/images/char_robi_3d_1793326392398.jpg`],
  chichi: [`${PUBLIC_BASE}/assets/images/char_chichi_3d_1793326394176.jpg`, `${PUBLIC_BASE}/images/char_chichi_3d_1793326394176.jpg`],
  coco: [`${PUBLIC_BASE}/assets/images/char_coco_3d_1793326395544.jpg`, `${PUBLIC_BASE}/images/char_coco_3d_1793326395544.jpg`],
  mina: [`${PUBLIC_BASE}/assets/images/char_mina_3d_1793326389740.jpg`, `${PUBLIC_BASE}/images/char_mina_3d_1793326389740.jpg`],
  luna: [`${PUBLIC_BASE}/assets/images/char_luna_3d_1793326393552.jpg`, `${PUBLIC_BASE}/images/char_luna_3d_1793326393552.jpg`],
  pupu: [`${PUBLIC_BASE}/assets/images/char_pupu_3d_1793326392627.jpg`, `${PUBLIC_BASE}/images/char_pupu_3d_1793326392627.jpg`],
  leo: [`${PUBLIC_BASE}/assets/images/char_leo_3d_1793326388782.jpg`, `${PUBLIC_BASE}/images/char_leo_3d_1793326388782.jpg`],
  kaya: [`${PUBLIC_BASE}/assets/images/char_kaya_3d_1793326395205.jpg`, `${PUBLIC_BASE}/images/char_kaya_3d_1793326395205.jpg`],
  tori: [`${PUBLIC_BASE}/assets/images/char_tori_3d_1793326391080.jpg`, `${PUBLIC_BASE}/images/char_tori_3d_1793326391080.jpg`],
  sol: [`${PUBLIC_BASE}/assets/images/char_sol_3d_1793326395290.jpg`, `${PUBLIC_BASE}/images/char_sol_3d_1793326395290.jpg`],
};

export const MONSTER_PUBLIC_FALLBACKS: Record<string, string[]> = {
  slime: [`${PUBLIC_BASE}/assets/images/monster_slime_3d_1793327241680.jpg`, `${PUBLIC_BASE}/images/monster_slime_3d_1793327241680.jpg`],
  flame: [`${PUBLIC_BASE}/assets/images/monster_flame_3d_1793327254668.jpg`, `${PUBLIC_BASE}/images/monster_flame_3d_1793327254668.jpg`],
  ice: [`${PUBLIC_BASE}/assets/images/monster_ice_3d_1793327267938.jpg`, `${PUBLIC_BASE}/images/monster_ice_3d_1793327267938.jpg`],
  forest: [`${PUBLIC_BASE}/assets/images/monster_forest_3d_1793327283488.jpg`, `${PUBLIC_BASE}/images/monster_forest_3d_1793327283488.jpg`],
  magic: [`${PUBLIC_BASE}/assets/images/monster_magic_3d_1793327300713.jpg`, `${PUBLIC_BASE}/images/monster_magic_3d_1793327300713.jpg`],
  dark: [`${PUBLIC_BASE}/assets/images/monster_dark_3d_1793327313729.jpg`, `${PUBLIC_BASE}/images/monster_dark_3d_1793327313729.jpg`],
  electric: [`${PUBLIC_BASE}/assets/images/monster_elec_3d_1793327326432.jpg`, `${PUBLIC_BASE}/images/monster_elec_3d_1793327326432.jpg`],
  boss: [`${PUBLIC_BASE}/assets/images/monster_boss_3d_1793327341591.jpg`, `${PUBLIC_BASE}/images/monster_boss_3d_1793327341591.jpg`],
  bat: [`${PUBLIC_BASE}/assets/images/monster_dark_3d_1793327313729.jpg`, `${PUBLIC_BASE}/images/monster_dark_3d_1793327313729.jpg`],
  rock: [`${PUBLIC_BASE}/assets/images/monster_ice_3d_1793327267938.jpg`, `${PUBLIC_BASE}/images/monster_ice_3d_1793327267938.jpg`],
  jelly: [`${PUBLIC_BASE}/assets/images/monster_slime_3d_1793327241680.jpg`, `${PUBLIC_BASE}/images/monster_slime_3d_1793327241680.jpg`],
  cyclops: [`${PUBLIC_BASE}/assets/images/monster_magic_3d_1793327300713.jpg`, `${PUBLIC_BASE}/images/monster_magic_3d_1793327300713.jpg`],
};

/**
 * Preload all 3D character and monster textures into browser memory
 * to eliminate mobile layout shifts and flickering.
 */
export function preloadAllGameAssets(): void {
  if (typeof window === 'undefined') return;

  const allUrls = [
    ...Object.values(AVATAR_IMAGES),
    ...Object.values(MONSTER_IMAGES)
  ];

  allUrls.forEach((url) => {
    if (!url) return;
    const img = new Image();
    img.src = url;
  });
}
