import { Template } from '@prisma/client';
import { useEffect, useMemo, useState } from 'react';

import { Card } from '@/components/card';
import { Chip } from '@/components/chip';
import { ErrorDisplay } from '@/components/error-display';
import { Loading } from '@/components/loading';
import { Select } from '@/components/select';
import { SuccessDisplay } from '@/components/success-display';
import { WarningDisplay } from '@/components/warning-display';
import { useTemplates } from '@/hooks/use-templates';
import { SpreadsheetValues } from '@/types/spreadsheet-values.type';
import { getParams } from '@/utils/parameter.utils';

interface TemplateSelectorProps {
  spreadsheetValues: SpreadsheetValues;
  onSelectedTemplate: (template: Template) => void;
}

export function TemplateSelector({ spreadsheetValues, onSelectedTemplate }: TemplateSelectorProps) {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>();
  const { data, isLoading, error } = useTemplates();
  const options = data?.map((template) => ({ value: template.id, label: template.name }));

  const selectedTemplate = useMemo(() => {
    return data?.find((template) => template.id === selectedTemplateId);
  }, [data, selectedTemplateId]);

  const difference = useMemo(() => {
    if (!selectedTemplate) return undefined;
    const params = getParams(selectedTemplate.mjml);
    const columns = spreadsheetValues?.values?.[0] ?? [];
    return compareParamsWithColumns([...params], columns);
  }, [selectedTemplate, spreadsheetValues]);

  useEffect(() => {
    if (selectedTemplate && difference?.remainingParams.length === 0) {
      onSelectedTemplate(selectedTemplate);
    }
  }, [selectedTemplate, difference, onSelectedTemplate]);

  return (
    <Card className='mx-auto w-96 max-w-full my-5'>
      <h2>Sablon kiválasztása</h2>
      {isLoading && <Loading />}
      {error && <ErrorDisplay text={error.message ?? 'Hiba történt'} />}
      {options && <Select options={options} onChange={setSelectedTemplateId} />}
      {difference && difference.remainingParams.length === 0 && (
        <SuccessDisplay text='A táblázat tartalmazza az összes paramétert' />
      )}
      {difference && difference.remainingParams.length > 0 && (
        <ErrorDisplay>
          <div className='flex gap-1 flex-wrap'>
            <p>A táblázat nem tartalmazza a következő paramétereket:</p>
            {difference.remainingParams.map((param) => (
              <Chip key={param}>{param}</Chip>
            ))}
          </div>
        </ErrorDisplay>
      )}
      {difference && difference.remainingColumns.length > 0 && (
        <WarningDisplay>
          <div className='flex gap-1 flex-wrap'>
            <p>A táblázat tartalmaz oszlopokat, amelyek nem szerepelnek a sablonban:</p>
            {difference.remainingColumns.map((column) => (
              <Chip key={column}>{column}</Chip>
            ))}
          </div>
        </WarningDisplay>
      )}
    </Card>
  );
}

function compareParamsWithColumns(params: string[], columns: string[]) {
  const remainingParams = [...params];
  const remainingColumns = [...columns];
  params.forEach((param) => {
    if (remainingColumns.includes(param)) {
      remainingParams.splice(remainingParams.indexOf(param), 1);
      remainingColumns.splice(remainingColumns.indexOf(param), 1);
    }
  });
  return { remainingParams, remainingColumns };
}
