export function convertSpreadsheetToObject(spreadsheetValues: string[][]): Record<string, string>[] {
  const [headerRow, ...dataRows] = spreadsheetValues;
  return dataRows.map((row) => {
    const rowObject: { [key: string]: string } = {};
    row.forEach((cell, index) => {
      rowObject[headerRow[index]] = cell;
    });
    return rowObject;
  });
}
