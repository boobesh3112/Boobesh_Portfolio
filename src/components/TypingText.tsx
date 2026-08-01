import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const ROLES = [
  'AI & Data Science Student',
  'Full-Stack Developer',
  'Vibe Coder',
];

export const TypingText: React.FC = () => {
  const { theme } = useTheme();
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayedText.length < currentRole.length) {
      // Typing phase: ~50ms per character
      timeout = setTimeout(() => {
        setDisplayedText(currentRole.slice(0, displayedText.length + 1));
      }, 50);
    } else if (!isDeleting && displayedText.length === currentRole.length) {
      // Pause when fully typed: ~1.8s
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 1800);
    } else if (isDeleting && displayedText.length > 0) {
      // Deleting phase: ~25ms per character
      timeout = setTimeout(() => {
        setDisplayedText(currentRole.slice(0, displayedText.length - 1));
      }, 25);
    } else if (isDeleting && displayedText.length === 0) {
      // Move to next role
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, roleIndex]);

  return (
    <span className="inline-flex items-center font-bold">
      <span style={{ color: theme.accentPrimary }}>{displayedText}</span>
      {/* Blinking Vertical Bar Cursor */}
      <span
        className="inline-block w-[3px] h-[1.1em] ml-1 animate-pulse rounded-full"
        style={{ backgroundColor: theme.accentSecondary }}
      />
    </span>
  );
};
