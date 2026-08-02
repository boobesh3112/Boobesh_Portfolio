import React, { useState } from 'react';

interface LogoAvatarProps {
  className?: string;
  fallbackText?: string;
  alt?: string;
}

const CANDIDATE_SOURCES = [
  '/logo.png',
  '/profile.png',
  '/avatar.png',
  '/logo.jpg',
  '/profile.jpg',
  '/avatar.jpg',
  '/logo.jpeg',
  '/profile.jpeg',
  '/logo.svg',
];

export const LogoAvatar: React.FC<LogoAvatarProps> = ({
  className = '',
  fallbackText = 'BJ',
  alt = 'Boobesh J Logo',
}) => {
  const [srcIndex, setSrcIndex] = useState(0);
  const [imgFailed, setImgFailed] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const currentSrc = CANDIDATE_SOURCES[srcIndex];

  const handleError = () => {
    if (srcIndex + 1 < CANDIDATE_SOURCES.length) {
      setSrcIndex((prev) => prev + 1);
    } else {
      setImgFailed(true);
    }
  };

  const handleLoad = () => {
    setImgLoaded(true);
  };

  if (imgFailed) {
    return <span className="select-none">{fallbackText}</span>;
  }

  return (
    <div className={`relative w-full h-full flex items-center justify-center overflow-hidden ${className}`}>
      <img
        src={currentSrc}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          imgLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'
        }`}
      />
      {!imgLoaded && (
        <span className="select-none font-extrabold">{fallbackText}</span>
      )}
    </div>
  );
};
