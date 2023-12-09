export type Spreadsheet = {
  spreadsheetId: string;
  properties: DataProperties;
  sheets: Sheet[];
  spreadsheetUrl: string;
};

export type DataProperties = {
  title: string;
  locale: string;
  autoRecalc: string;
  timeZone: string;
  defaultFormat: DefaultFormat;
  spreadsheetTheme: SpreadsheetTheme;
};

export type DefaultFormat = {
  backgroundColor: Color;
  padding: Padding;
  verticalAlignment: string;
  wrapStrategy: string;
  textFormat: TextFormat;
  backgroundColorStyle: BackgroundColorStyle;
};

export type Color = {
  red?: number;
  green?: number;
  blue?: number;
};

export type BackgroundColorStyle = {
  rgbColor: Color;
};

export type Padding = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export type TextFormat = {
  foregroundColor: Request;
  fontFamily: string;
  fontSize: number;
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  foregroundColorStyle: ForegroundColorStyle;
};

export type ForegroundColorStyle = {
  rgbColor: Request;
};

export type SpreadsheetTheme = {
  primaryFontFamily: string;
  themeColors: ThemeColor[];
};

export type ThemeColor = {
  colorType: string;
  color: BackgroundColorStyle;
};

export type Sheet = {
  properties: SheetProperties;
};

export type SheetProperties = {
  sheetId: number;
  title: string;
  index: number;
  sheetType: string;
  gridProperties: GridProperties;
};

export type GridProperties = {
  rowCount: number;
  columnCount: number;
};
