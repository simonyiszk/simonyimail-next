export function compareParamsWithColumns(params: string[], columns: string[]) {
  const remainingParams = [...params];
  const remainingColumns = [...columns];
  params.forEach((param) => {
    if (remainingColumns.includes(param)) {
      remainingParams.splice(remainingParams.indexOf(param), 1);
      remainingColumns.splice(remainingColumns.indexOf(param), 1);
    }
  });
  const remainingColumnsWithoutEmail = remainingColumns.filter((column) => column !== 'email');
  return { remainingParams, remainingColumns: remainingColumnsWithoutEmail };
}
