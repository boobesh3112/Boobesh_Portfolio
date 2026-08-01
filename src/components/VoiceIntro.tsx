import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Pause, Play, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { soundEffects } from '../utils/soundEffects';

export const VoiceIntro: React.FC = () => {
  const { theme } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [statusText, setStatusText] = useState('Voice Intro');

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const useAudioFileRef = useRef<boolean>(true);

  const introScript =
    "Hello there! Welcome to my portfolio. I'm Boobesh J, an AI and Data Science student, Full-Stack Developer, and Vibe Coder from India. I love building intelligent web apps, hardware prototypes, and creative digital experiences. Explore my featured projects and feel free to connect!";

  useEffect(() => {
    // Initialize Audio element with public /Voice.mp3
    const audio = new Audio('/Voice.mp3');
    audioRef.current = audio;

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    const handleEnded = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setStatusText('Voice Intro');
    };

    const handlePause = () => {
      if (!audio.ended && audio.currentTime > 0) {
        setIsPaused(true);
        setIsPlaying(false);
        setStatusText('Paused');
      }
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setIsPaused(false);
      setStatusText('Playing...');
    };

    const handleError = () => {
      console.warn('Voice.mp3 failed to play, switching to Speech Synthesis fallback');
      useAudioFileRef.current = false;
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('error', handleError);
      audio.pause();
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const handlePlay = async () => {
    soundEffects.playToggle();
    // 1. Try playing /Voice.mp3 audio file
    if (audioRef.current && useAudioFileRef.current) {
      try {
        if (isPaused) {
          await audioRef.current.play();
          return;
        }
        audioRef.current.currentTime = 0;
        await audioRef.current.play();
        return;
      } catch (err) {
        console.warn('Audio play error, using SpeechSynthesis fallback:', err);
        useAudioFileRef.current = false;
      }
    }

    // 2. Fallback to SpeechSynthesis
    if (!synthRef.current) return;

    if (isPaused) {
      synthRef.current.resume();
      setIsPaused(false);
      setIsPlaying(true);
      setStatusText('Speaking...');
      return;
    }

    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(introScript);

    const voices = synthRef.current.getVoices();
    const preferredVoice =
      voices.find(
        (v) =>
          v.lang.startsWith('en') &&
          (v.name.includes('Google') ||
            v.name.includes('Natural') ||
            v.name.includes('Samantha') ||
            v.name.includes('Daniel') ||
            v.name.includes('Karen'))
      ) || voices.find((v) => v.lang.startsWith('en')) || voices[0];

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.rate = 0.98;
    utterance.pitch = 1.02;

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
      setStatusText('Speaking...');
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setStatusText('Voice Intro');
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setStatusText('Voice Intro');
    };

    synthRef.current.speak(utterance);
  };

  const handlePause = () => {
    soundEffects.playClick();
    if (audioRef.current && useAudioFileRef.current && isPlaying) {
      audioRef.current.pause();
      return;
    }

    if (synthRef.current) {
      synthRef.current.pause();
      setIsPaused(true);
      setIsPlaying(false);
      setStatusText('Paused');
    }
  };

  const handleStop = () => {
    soundEffects.playClick();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setIsPlaying(false);
    setIsPaused(false);
    setStatusText('Voice Intro');
  };

  return (
    <div className="inline-flex items-center gap-2">
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onMouseEnter={() => soundEffects.playHover()}
        className="relative flex items-center gap-2.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border backdrop-blur-xl shadow-md cursor-pointer transition-colors"
        style={{
          backgroundColor: `${theme.bgSurface}e0`,
          borderColor: isPlaying ? theme.accentPrimary : theme.borderColor,
          boxShadow: isPlaying ? `0 0 20px ${theme.glowColor}` : 'none',
        }}
        onClick={isPlaying ? handlePause : handlePlay}
      >
        {/* Animated Voice Equalizer Waveform Bars */}
        <div className="flex items-center gap-0.5 h-4 w-5 justify-center">
          {isPlaying ? (
            [0.1, 0.4, 0.2, 0.5, 0.3].map((delay, idx) => (
              <motion.span
                key={idx}
                animate={{
                  height: ['20%', '100%', '30%', '90%', '20%'],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: 'mirror',
                  delay,
                  ease: 'easeInOut',
                }}
                className="w-0.5 rounded-full"
                style={{ backgroundColor: theme.accentPrimary }}
              />
            ))
          ) : (
            <Volume2 className="w-4 h-4" style={{ color: theme.accentPrimary }} />
          )}
        </div>

        <span
          className="text-xs sm:text-sm font-bold tracking-tight whitespace-nowrap"
          style={{ color: theme.textPrimary }}
        >
          {statusText}
        </span>

        {isPlaying ? (
          <Pause className="w-3 h-3 fill-current ml-0.5" style={{ color: theme.accentPrimary }} />
        ) : (
          <Play className="w-3 h-3 fill-current ml-0.5" style={{ color: theme.accentPrimary }} />
        )}
      </motion.div>

      {/* Stop Button when Playing / Paused */}
      <AnimatePresence>
        {(isPlaying || isPaused) && (
          <motion.button
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            onMouseEnter={() => soundEffects.playHover()}
            onClick={handleStop}
            className="p-1.5 rounded-full border backdrop-blur-md hover:opacity-80 transition-opacity cursor-pointer"
            style={{
              backgroundColor: theme.bgSurface,
              borderColor: theme.borderColor,
              color: theme.textSecondary,
            }}
            title="Stop Voice Intro"
          >
            <VolumeX className="w-3.5 h-3.5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

