'use client';
import { useState, useEffect } from 'react';

interface ContextMenuProps {
  position: { x: number; y: number } | null;
  onClose: () => void;
  onAction: (action: 'debug' | 'improve' | 'fix') => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ position, onClose, onAction }) => {
  useEffect(() => {
    const handleClick = () => onClose();
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [onClose]);

  if (!position) return null;

  return (
    <div 
      className="context-menu"
      style={{ left: position.x, top: position.y }}
    >
      <button onClick={() => onAction('debug')}>Debug Code</button>
      <button onClick={() => onAction('improve')}>Improve Code</button>
      <button onClick={() => onAction('fix')}>Fix Errors</button>
    </div>
  );
};

export default ContextMenu;