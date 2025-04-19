export const ASSEMBLING_PRICE = "assemblingPrice";
export const ASSEMBLING_QUANTITY = "assemblingQuantity";
export const CAD = "cadPrice";
export const CASTING_PRICE = "castingPrice";
export const CASTING_QUANTITY = "castingQuantity";
export const CLEANING_PRICE = "cleaningPrice";
export const CLEANING_QUANTITY = "cleaningQuantity";
export const CLIENT_NAME = "clientName";
export const COLOR_STONES = "colorStone";
export const DIAMOND_PRICE = "diamondPrice";
export const DIAMOND_QUANTITY = "diamondQuantity";
export const ENGRAVING_PRICE = "engravingPrice";
export const ENGRAVING_QUANTITY = "engravingQuantity";
export const ESTIMATE_NAME = "name";
export const FINDINGS_PRICE = "findingsPrice";
export const FINDINGS_QUANTITY = "findingsQuantity";
export const GOLDEN_PRICE = "goldenPrice";
export const METAL_10_PRICE = "metal10Price";
export const METAL_10_QUANTITY = "metal10Quantity";
export const METAL_14_PRICE = "metal14Price";
export const METAL_14_QUANTITY = "metal14Quantity";
export const METAL_18_PRICE = "metal18Price";
export const METAL_18_QUANTITY = "metal18Quantity";
export const METAL_PLATINUM_PRICE = "metalPlatinumPrice";
export const METAL_PLATINUM_QUANTITY = "metalPlatinumQuantity";
export const METAL_PRICE = "metalPrice";
export const METAL_QUANTITY = "metalQuantity";
export const METAL_SILVER_PRICE = "metalSilverPrice";
export const METAL_SILVER_QUANTITY = "metalSilverQuantity";
export const METAL_TYPE = "metalType";
export const PICTURE_PRICE = "picturePrice";
export const PICTURE_QUANTITY = "pictureQuantity";
export const POLISHING_PRICE = "polishingPrice";
export const POLISHING_QUANTITY = "polishingQuantity";
export const RHODIOUM_PRICE = "rhodioumPrice";
export const RHODIOUM_QUANTITY = "rhodioumQuantity";
export const SETTING_CENTER_STONE = "settingCenterStone";
export const STONE_PRICE = "stonePrice";
export const STONE_QUANTITY = "stoneQuantity";
export const WAX_PRICE = "waxPrice";
export const WAX_QUANTITY = "waxQuantity";

export const INITIAL_VALUES = {
  [ASSEMBLING_PRICE]: 0,
  [ASSEMBLING_QUANTITY]: 1,
  [CAD]: 0,
  [CASTING_PRICE]: 0,
  [CASTING_QUANTITY]: 1,
  [CLEANING_PRICE]: 0,
  [CLEANING_QUANTITY]: 1,
  [CLIENT_NAME]: "",
  [COLOR_STONES]: 0,
  [DIAMOND_PRICE]: 0,
  [DIAMOND_QUANTITY]: 1,
  [ENGRAVING_PRICE]: 0,
  [ENGRAVING_QUANTITY]: 1,
  [ESTIMATE_NAME]: "",
  [FINDINGS_PRICE]: 0,
  [FINDINGS_QUANTITY]: 1,
  [GOLDEN_PRICE]: 0,
  [METAL_10_PRICE]: 0,
  [METAL_10_QUANTITY]: 0,
  [METAL_14_PRICE]: 0,
  [METAL_14_QUANTITY]: 0,
  [METAL_18_PRICE]: 0,
  [METAL_18_QUANTITY]: 0,
  [METAL_PLATINUM_PRICE]: 0,
  [METAL_PLATINUM_QUANTITY]: 0,
  [METAL_SILVER_PRICE]: 0,
  [METAL_SILVER_QUANTITY]: 0,
  [PICTURE_PRICE]: 0,
  [PICTURE_QUANTITY]: 1,
  [POLISHING_PRICE]: 0,
  [POLISHING_QUANTITY]: 1,
  [RHODIOUM_PRICE]: 0,
  [RHODIOUM_QUANTITY]: 1,
  [SETTING_CENTER_STONE]: 0,
  [STONE_PRICE]: 0,
  [STONE_QUANTITY]: 1,
  [WAX_PRICE]: 0,
  [WAX_QUANTITY]: 1,
};

export const FIXED_FIELDS = [CAD, SETTING_CENTER_STONE, COLOR_STONES];

export const OLD_METAL_TYPE = [[METAL_PRICE, METAL_QUANTITY]];

export const NEW_METALS = ['10K', '14K', '18K', 'Platinum', 'Silver'];

export const METAL_TYPES = (metal) => (
  [ [`metal${metal}Price`, `metal${metal}Quantity`]]
);
  
export const MULTIPLIED_FIELDS = [
  [WAX_PRICE, WAX_QUANTITY],
  [CASTING_PRICE, CASTING_QUANTITY],
  [STONE_PRICE, STONE_QUANTITY],
  [DIAMOND_PRICE, DIAMOND_QUANTITY],
  [CLEANING_PRICE, CLEANING_QUANTITY],
  [POLISHING_PRICE, POLISHING_QUANTITY],
  [ASSEMBLING_PRICE, ASSEMBLING_QUANTITY],
  [FINDINGS_PRICE, FINDINGS_QUANTITY],
  [RHODIOUM_PRICE, RHODIOUM_QUANTITY],
  [ENGRAVING_PRICE, ENGRAVING_QUANTITY],
  [PICTURE_PRICE, PICTURE_QUANTITY],
];