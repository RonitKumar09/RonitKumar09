"use client"

import { useEffect } from 'react';

type KeyHandler = (e: KeyboardEvent) => void;

interface ShortcutConfig {
  onOpen?: () => void;
  onClose?: () => void;
  onNavigate?: (index: number) => void;
  onSelect?: () => void;
  onArrowDown?: () => void;
  onArrowUp?: () => void;
}

export function useKeyboardShortcuts({
  onOpen,
  onClose,
  onNavigate,
  onSelect,
  onArrowDown,
  onArrowUp,
}: ShortcutConfig) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Cmd+Space to open (standard spotlight shortcuts)
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        onOpen?.();
      }

      // Escape to close
      if (e.key === 'Escape') {
        onClose?.();
      }

      // Arrow navigation
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        onArrowDown?.();
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        onArrowUp?.();
      }

      // Enter to select
      if (e.key === 'Enter') {
        onSelect?.();
      }

      // Command + Number (1-9)
      if ((e.metaKey || e.ctrlKey) && /^[1-9]$/.test(e.key)) {
        e.preventDefault();
        const index = parseInt(e.key) - 1;
        onNavigate?.(index);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpen, onClose, onNavigate, onSelect, onArrowDown, onArrowUp]);
}
