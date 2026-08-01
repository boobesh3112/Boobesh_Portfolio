import React from 'react';
import { motion } from 'motion/react';

interface StaggerTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  style?: React.CSSProperties;
  staggerDelay?: number;
  wordClassName?: string;
  highlightWords?: string[];
  highlightStyle?: React.CSSProperties;
}

export const StaggerText: React.FC<StaggerTextProps> = ({
  text,
  className = '',
  as = 'h2',
  style,
  staggerDelay = 0.04,
  wordClassName = '',
  highlightWords = [],
  highlightStyle,
}) => {
  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 18,
      filter: 'blur(4px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const Component = motion[as] as typeof motion.h2;

  return (
    <Component
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={`inline-flex flex-wrap gap-x-[0.28em] gap-y-1 ${className}`}
      style={style}
    >
      {words.map((word, i) => {
        const cleanWord = word.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '');
        const isHighlighted = highlightWords.some(
          (hw) => hw.toLowerCase() === cleanWord.toLowerCase()
        );

        return (
          <motion.span
            key={`${word}-${i}`}
            variants={wordVariants}
            className={`inline-block ${wordClassName}`}
            style={isHighlighted && highlightStyle ? highlightStyle : undefined}
          >
            {word}
          </motion.span>
        );
      })}
    </Component>
  );
};
