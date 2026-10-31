import React from 'react';

interface PageWipeProps {
  isWiping: boolean;
}

export const PageWipe: React.FC<PageWipeProps> = ({ isWiping }) => {
  return (
    <div
      className={`wipe-container ${isWiping ? 'wipe-active' : ''}`}
      aria-hidden="true"
    >
      {Array.from({ length: 8 }, (_, i) => (
        <div
          key={i}
          className="wipe-stripe"
          style={{ '--n': i } as React.CSSProperties}
        />
      ))}
    </div>
  );
};
