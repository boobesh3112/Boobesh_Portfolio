import React, { useState, useEffect, lazy, Suspense } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { CursorProvider } from './context/CursorContext';
import { ParallaxProvider } from './context/ParallaxContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Parallax3DToggle } from './components/Parallax3DToggle';
import { Parallax3DCanvas } from './components/Parallax3DCanvas';
import { ScrollProgress } from './components/ScrollProgress';
import { SplashLoader } from './components/SplashLoader';
import { CustomCursor } from './components/CustomCursor';
import { ThemeTransitionBlob } from './components/ThemeTransitionBlob';
import { SkeletonLoader } from './components/SkeletonLoader';
import { startIdleAssetPreloading } from './utils/assetPreloader';

// Below the fold sections lazy loaded
const About = lazy(() => import('./components/About').then((m) => ({ default: m.About })));
const Projects = lazy(() => import('./components/Projects').then((m) => ({ default: m.Projects })));
const Craft = lazy(() => import('./components/Craft').then((m) => ({ default: m.Craft })));
const Skills = lazy(() => import('./components/Skills').then((m) => ({ default: m.Skills })));
const Interests = lazy(() => import('./components/Interests').then((m) => ({ default: m.Interests })));
const Contact = lazy(() => import('./components/Contact').then((m) => ({ default: m.Contact })));
const Connect = lazy(() => import('./components/Connect').then((m) => ({ default: m.Connect })));
const Footer = lazy(() => import('./components/Footer').then((m) => ({ default: m.Footer })));
const ThemeToggle = lazy(() => import('./components/ThemeToggle').then((m) => ({ default: m.ThemeToggle })));
const CursorSelector = lazy(() => import('./components/CursorSelector').then((m) => ({ default: m.CursorSelector })));
const KeyboardShortcutsModal = lazy(() => import('./components/KeyboardShortcutsModal').then((m) => ({ default: m.KeyboardShortcutsModal })));

export default function App() {
  const [splashFinished, setSplashFinished] = useState(false);

  useEffect(() => {
    startIdleAssetPreloading();
  }, []);

  return (
    <ThemeProvider>
      <CursorProvider>
        <ParallaxProvider>
          <div className="relative min-h-screen selection:bg-indigo-500 selection:text-white transition-colors duration-500">
            <Parallax3DCanvas />
            <ThemeTransitionBlob />
            <SplashLoader onComplete={() => setSplashFinished(true)} />
            <CustomCursor />
            <ScrollProgress />
            <Parallax3DToggle />
            <Navbar />
            {!splashFinished ? (
              <div className="absolute inset-0 z-20 pointer-events-none">
                <SkeletonLoader />
              </div>
            ) : null}
            <main className={splashFinished ? 'opacity-100 transition-opacity duration-700' : 'opacity-0 pointer-events-none'}>
              <Hero />
              <Suspense fallback={<div className="min-h-[400px] w-full flex items-center justify-center opacity-50 font-mono text-xs">Loading section...</div>}>
                <About />
                <Projects />
                <Craft />
                <Skills />
                <Interests />
                <Contact />
                <Connect />
              </Suspense>
            </main>
            <Suspense fallback={null}>
              <Footer />
              <ThemeToggle />
              <CursorSelector />
              <KeyboardShortcutsModal />
            </Suspense>
          </div>
        </ParallaxProvider>
      </CursorProvider>
    </ThemeProvider>
  );
}


