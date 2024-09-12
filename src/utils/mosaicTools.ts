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
  { color: 'red' },
  { color: 'orange' },
  { color: 'yellow' },
  { color: 'green' },
  { color: 'blue' },
  { color: 'violet' },
  { color: 'white' },
  { color: 'black' }
];
