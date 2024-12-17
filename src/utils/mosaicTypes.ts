export type PinShape = 'round' | 'square';
export type PinSizeAlias = 's' | 'm' | 'l';

export type PaletteColor = {
    color: string;
};
export type Palette = PaletteColor[];

export type Point = [number, number];
export type Points = Point[];

export type MosaicCell = {
    outerPoint: Point;
    point: Point;
    color: string | null;
};
export type MosaicRow = MosaicCell[];
export type MosaicGrid = MosaicRow[];

export type CellColor = {
    color: string | null;
};
export type RowColors = CellColor[];
export type GridColors = RowColors[];
