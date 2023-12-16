import { Template } from '@prisma/client';
import { useState } from 'react';

import { Button } from '@/components/common/button';
import { Card } from '@/components/common/card';
import { ErrorDisplay } from '@/components/common/status-display/error-display';
import { SuccessDisplay } from '@/components/common/status-display/success-display';
import { WarningDisplay } from '@/components/common/status-display/warning-display';
import { useSendEmail } from '@/hooks/use-send-email';
import { Param } from '@/types/param.type';
import { TargetWithEmail } from '@/types/target.type';
import { getHtmlForMjml } from '@/utils/convert-mjml';
import { replaceParams } from '@/utils/parameter.utils';

interface SendAllProps {
  subject: string;
  emailField: string;
  template: Template;
  targets: TargetWithEmail[];
}

export function SendAll({ emailField, template, targets, subject }: SendAllProps) {
  const { trigger } = useSendEmail();
  const [isInProgress, setIsInProgress] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const onSendAll = async () => {
    setIsInProgress(true);
    setCompletedCount(0);
    setErrorCount(0);
    for (const target of targets) {
      const html = getHtmlFromMjmlAndTarget(template.mjml, target);
      try {
        await trigger({ html, to: target.email, subject });
        setCompletedCount((v) => v + 1);
      } catch (e) {
        setErrorCount((v) => v + 1);
      }
    }
    setIsInProgress(false);
  };
  return (
    <Card>
      <h2>Összes küldése</h2>
      <WarningDisplay>
        <p>
          A(z) <b>{emailField}</b> oszlopban található címekre fogja elküldeni a leveleket, összesen{' '}
          <b>{targets.length}</b> darabot.
        </p>
      </WarningDisplay>
      {completedCount > 0 && <SuccessDisplay text={`Elküldve ${completedCount} db`} />}
      {errorCount > 0 && <ErrorDisplay text={`Sikertelen ${errorCount} db`} />}
      <Button variant='primary' isLoading={isInProgress} onClick={onSendAll}>
        Küldés
      </Button>
    </Card>
  );
}

function getParamsFromTarget(target: TargetWithEmail): Param[] {
  return Object.entries(target).map(([key, value]) => ({ key, value }));
}

function getHtmlFromMjmlAndTarget(mjml: string, target: TargetWithEmail) {
  const params = getParamsFromTarget(target);
  const mjmlWithParams = replaceParams(mjml, params);
  return getHtmlForMjml(mjmlWithParams);
}
