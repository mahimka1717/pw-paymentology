export interface StandaloneBillboard {
  x: number;
  y: number;
  width: number;
  height: number;
  rotate: number;
  skewY: number;
}

export const standaloneBillboards: Record<string, StandaloneBillboard> = {
  fintech: { x: 670, y: 837, width: 50, height: 86, rotate: 0, skewY: -10.5 },
  government: { x: 480, y: 714, width: 50, height: 86, rotate: 0, skewY: -10.5 },
  telco: { x: 469, y: 661, width: 70, height: 130, rotate: -2, skewY: 6 },
  remittance: { x: 742, y: 796.5, width: 55, height: 92, rotate: 0, skewY: -12.4 },
  'digital-banks': { x: 583, y: 756, width: 54, height: 100, rotate: 0, skewY: -13 },
  banks: { x: 549, y: 730, width: 55, height: 96, rotate: -1, skewY: -14 },
};