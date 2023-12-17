import { useEffect, useState } from 'react';
import { TbMail, TbTable } from 'react-icons/tb';

import { SingleChoice } from '@/components/common/single-choice';
import { EmailSelector } from '@/components/flow/target-selector/email-selector';
import { SheetSelector } from '@/components/flow/target-selector/sheet-selector/sheet-selector';
import { TargetWithEmail } from '@/types/target.type';

interface TargetSelectorProps {
  onTargetSelected: (targetsWithEmail?: TargetWithEmail[]) => void;
}

export function TargetSelector({ onTargetSelected }: TargetSelectorProps) {
  const [mode, setMode] = useState<'sheet' | 'email'>('sheet');
  useEffect(() => {
    onTargetSelected();
  }, [mode]);
  return (
    <>
      <SingleChoice
        options={[
          { label: 'Táblázat', value: 'sheet', icon: TbTable, color: '#01AC48' },
          { label: 'Közvetlen', value: 'email', icon: TbMail, color: '#FFC107' },
        ]}
        onOptionSelected={setMode}
      />
      {mode === 'sheet' && <SheetSelector onTargetsSelected={onTargetSelected} />}
      {mode === 'email' && <EmailSelector onTargetsSelected={onTargetSelected} />}
    </>
  );
}
