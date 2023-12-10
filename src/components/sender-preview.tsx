import { Template } from '@prisma/client';
import mjml2html from 'mjml-browser';
import { useState } from 'react';
import { TbEye } from 'react-icons/tb';

import { Card } from '@/components/card';
import { EmailRenderer } from '@/components/email-renderer';
import { Modal } from '@/components/modal';
import { Pagination } from '@/components/pagination';
import { SingleEmailSend } from '@/components/single-email-send';
import { TargetWithEmail } from '@/types/target.type';
import { replaceParams } from '@/utils/parameter.utils';

interface SenderPreviewProps {
  targets: TargetWithEmail[];
  template: Template;
}

export function SenderPreview({ targets, template }: SenderPreviewProps) {
  const [currentTarget, setCurrentTarget] = useState(targets[0]);
  return (
    <Card>
      <h2>Előnézet és küldés</h2>
      <TargetPreview target={currentTarget} template={template} />
      <Pagination totalPages={targets.length} onPageChange={(page) => setCurrentTarget(targets[page])} />
    </Card>
  );
}

interface TargetPreviewProps {
  target: TargetWithEmail;
  template: Template;
}

function TargetPreview({ target, template }: TargetPreviewProps) {
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
            <button onClick={onOpen}>
              <TbEye /> Sablon előnézet
            </button>
          )}
        >
          <EmailRenderer mjml={mjmlWithParams} />
        </Modal>
        <SingleEmailSend to={target.email} html={html} />
      </div>
    </div>
  );
}
