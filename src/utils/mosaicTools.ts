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
  { key: 'xs' },
  { key: 's' },
  { key: 'm' },
  { key: 'l' },
  { key: 'xl' }
];
