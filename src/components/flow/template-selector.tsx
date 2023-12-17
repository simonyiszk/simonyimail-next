import { Template } from '@prisma/client';
import { useEffect, useMemo, useState } from 'react';

import { Card } from '@/components/common/card';
import { Chip } from '@/components/common/chip';
import { Loading } from '@/components/common/loading';
import { Select } from '@/components/common/select';
import { ErrorDisplay } from '@/components/common/status-display/error-display';
import { SuccessDisplay } from '@/components/common/status-display/success-display';
import { WarningDisplay } from '@/components/common/status-display/warning-display';
import { useTemplates } from '@/hooks/use-templates';
import { Target } from '@/types/target.type';
import { compareParamsWithColumns } from '@/utils/compare.utils';
import { getParams } from '@/utils/parameter.utils';

interface TemplateSelectorProps {
  targets: Target[];
  onSelectedTemplate: (template?: Template) => void;
}

export function TemplateSelector({ targets, onSelectedTemplate }: TemplateSelectorProps) {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>();
  const { data, isLoading, error } = useTemplates();
  const options = data?.map((template) => ({ value: template.id, label: template.name }));

  const selectedTemplate = useMemo(() => {
    return data?.find((template) => template.id === selectedTemplateId);
  }, [data, selectedTemplateId]);

  const difference = useMemo(() => {
    if (!selectedTemplate) return undefined;
    const params = getParams(selectedTemplate.mjml);
    const columns = targets[0] ? Object.keys(targets[0]) : [];
    return compareParamsWithColumns([...params], columns);
  }, [selectedTemplate, targets]);

  useEffect(() => {
    if (selectedTemplate && difference?.remainingParams.length === 0) {
      onSelectedTemplate(selectedTemplate);
    } else {
      onSelectedTemplate();
    }
  }, [selectedTemplate, difference, onSelectedTemplate]);

  return (
    <Card>
      <h2>Sablon kiválasztása</h2>
      {isLoading && <Loading />}
      {error && <ErrorDisplay text={error.message ?? 'Hiba történt'} />}
      {options && <Select options={options} onChange={setSelectedTemplateId} />}
      {difference && difference.remainingParams.length === 0 && (
        <SuccessDisplay text='A forrás tartalmazza az összes paramétert' />
      )}
      {difference && difference.remainingParams.length > 0 && (
        <ErrorDisplay>
          <div className='flex gap-1 flex-wrap'>
            <p>A forrás nem tartalmazza a következő paramétereket:</p>
            {difference.remainingParams.map((param) => (
              <Chip key={param}>{param}</Chip>
            ))}
          </div>
        </ErrorDisplay>
      )}
      {difference && difference.remainingColumns.length > 0 && (
        <WarningDisplay>
          <div className='flex gap-1 flex-wrap'>
            <p>A forrás tartalmaz mezőket, amelyek nem szerepelnek a sablonban:</p>
            {difference.remainingColumns.map((column) => (
              <Chip key={column}>{column}</Chip>
            ))}
          </div>
        </WarningDisplay>
      )}
    </Card>
  );
}
