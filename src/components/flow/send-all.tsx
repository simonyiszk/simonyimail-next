import { Template } from '@prisma/generated';
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
  senderName: string;
  template: Template;
  targets: TargetWithEmail[];
}

export function SendAll({ template, targets, subject, senderName }: SendAllProps) {
  const { trigger } = useSendEmail();
  const [isInProgress, setIsInProgress] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);
  const [errors, setErrors] = useState<{ email: string; message: string }[]>([]);

  const onSendAll = async () => {
    setIsInProgress(true);
    setCompletedCount(0);
    setErrors([]);
    for (const target of targets) {
      const html = await getHtmlFromMjmlAndTarget(template.mjml, target);
      try {
        await trigger({ html, to: target.email, subject, from: senderName });
        setCompletedCount((v) => v + 1);
      } catch (e: any) {
        console.error(e);
        setErrors((v) => [...v, { email: target.email, message: e.response?.data?.error || e.message }]);
      }
    }
    setIsInProgress(false);
  };
  return (
    <Card>
      <h2>Összes küldése</h2>
      <WarningDisplay>
        <p>
          Összesen <b>{targets.length}</b> darab levelet fog elküldeni.
        </p>
      </WarningDisplay>
      {completedCount > 0 && <SuccessDisplay text={`Elküldve ${completedCount} db`} />}
      {errors.length > 0 && (
        <ErrorDisplay
          text={`Sikertelen ${errors.length} db: ${errors.map((e) => `${e.email}: ${e.message}`).join(', ')}`}
        />
      )}
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
