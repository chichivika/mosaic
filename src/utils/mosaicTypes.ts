export type PinShape = 'round' | 'square';
export type PinSize = 's' | 'm' | 'l';

export type PaletteColor = {
    color: string;
};
export type Palette = PaletteColor[];

export type Point = [number, number];
export type Points = Point[];

export type MosaicCell = {
    point: Point;
    color: string | null;
};
export type MosaicRow = MosaicCell[];
export type MosaicGrid = MosaicRow[];
