import CharacterListFooter from '@/app/components/characters-list/CharacterListFooter';
import CharacterListHeader from '@/app/components/characters-list/CharacterListHeader';
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  params: {
    offset: number;
  };
}

export default function layout({ children, params }: LayoutProps) {
  return (
    <div className="flex flex-col items-center justify-center max-[1160px]:h-[700px]">
      <CharacterListHeader offset={params.offset} />
      {children}
      <CharacterListFooter offset={params.offset} />
    </div>
  );
}
