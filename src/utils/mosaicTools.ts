import { PinShape, MosaicSize, Palette } from './mosaicTypes'

export type ShapeItem = {
    key: PinShape
};
export type ShapeItems = ShapeItem[];
export const shapesCatalog = [
  { key: 'round' },
  { key: 'square' }
];

export type SizeItem = {
    key: MosaicSize
};
export type SizeItems = SizeItem[];
export const sizesCatalog = [
  { key: 'xs', label: 'XS' },
  { key: 's', label: 'S' },
  { key: 'm', label: 'M' },
  { key: 'l', label: 'L' }
];

export const palette: Palette = [
  { color: '#d16969' },
  { color: '#eda758' },
  { color: '#ebed58' },
  { color: '#73d183' },
  { color: '#7bd4c9' },
  { color: '#598cd9' },
  { color: '#bb6ce0' },
  { color: '#e376d8' },
  { color: '#474747' }
];
