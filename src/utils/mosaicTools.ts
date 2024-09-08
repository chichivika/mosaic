import { PinShape, MosaicSize } from './mosaicTypes'

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
