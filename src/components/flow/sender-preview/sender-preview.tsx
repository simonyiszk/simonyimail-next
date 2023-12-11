import { Template } from '@prisma/client';
import mjml2html from 'mjml-browser';
import { useState } from 'react';
import { TbEye } from 'react-icons/tb';

import { Button } from '@/components/common/button';
import { Card } from '@/components/common/card';
import { Modal } from '@/components/common/modal';
import { Pagination } from '@/components/common/pagination';
import { EmailRenderer } from '@/components/email-renderer';
import { SingleEmailSend } from '@/components/flow/sender-preview/single-email-send';
import { TargetWithEmail } from '@/types/target.type';
import { replaceParams } from '@/utils/parameter.utils';

interface SenderPreviewProps {
  targets: TargetWithEmail[];
  template: Template;
  subject: string;
}

export function SenderPreview({ targets, template, subject }: SenderPreviewProps) {
  const [currentTarget, setCurrentTarget] = useState(targets[0]);
  return (
    <Card>
      <h2>Előnézet és küldés</h2>
      <TargetPreview target={currentTarget} template={template} subject={subject} />
      <Pagination totalPages={targets.length} onPageChange={(page) => setCurrentTarget(targets[page])} />
    </Card>
  );
}

interface TargetPreviewProps {
  target: TargetWithEmail;
  template: Template;
  subject: string;
}

function TargetPreview({ target, template, subject }: TargetPreviewProps) {
  const mjmlWithParams = replaceParams(
    template.mjml,
    Object.entries(target).map(([key, value]) => ({ key, value }))
  );

  const html = mjml2html(mjmlWithParams).html;
  return (
    <div>
      {Object.entries(target).map(([key, value]) => (
        <div className='grid grid-cols-2 grid-rows-1 w-full border-b-2 border-slate-100 p-2' key={key}>
          <p className='truncate'>{key}</p>
          <p className='truncate'>{value}</p>
        </div>
      ))}
      <div className='flex justify-between items-center mt-3'>
        <Modal
          button={(onOpen) => (
            <Button onClick={onOpen}>
              <TbEye /> Sablon előnézet
            </Button>
          )}
        >
          <EmailRenderer mjml={mjmlWithParams} />
        </Modal>
        <SingleEmailSend to={target.email} html={html} subject={subject} />
      </div>
    </div>
  );
}
