import React, { useState, useEffect } from 'react';

interface SmartImageProps {
  src: string;
  alt: string;
  fallbackSrcs?: string[];
  fallbackComponent?: React.ReactNode;
  className?: string;
  imgClassName?: string;
  onLoad?: () => void;
  onError?: (err: Error) => void;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt,
  fallbackSrcs = [],
  fallbackComponent,
  className = '',
  imgClassName = '',
  onLoad,
  onError
}) => {
  const [currentSrcIndex, setCurrentSrcIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  // Candidate URLs in priority order:
  // 1. Primary bundled Vite asset URL
  // 2. Any additional fallback URLs
  const candidateUrls = [src, ...fallbackSrcs].filter(Boolean);
  const activeUrl = candidateUrls[currentSrcIndex] || src;

  useEffect(() => {
    // Reset state if primary src changes
    setCurrentSrcIndex(0);
    setIsLoading(true);
    setHasError(false);
  }, [src]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const failedUrl = activeUrl;
    console.warn(`[WORD VENTURE Image Load Notice] Failed to load image: "${alt}" from candidate URL (${failedUrl}).`);

    if (currentSrcIndex + 1 < candidateUrls.length) {
      const nextIndex = currentSrcIndex + 1;
      const nextUrl = candidateUrls[nextIndex];
      console.info(`[WORD VENTURE Image Fallback] Retrying with secondary URL for "${alt}": ${nextUrl}`);
      setCurrentSrcIndex(nextIndex);
      setIsLoading(true);
    } else {
      console.error(
        `[WORD VENTURE Image Error] All image source candidates failed for "${alt}".`,
        `Attempted URLs:`, candidateUrls,
        `Falling back to designed SVG/vector representation.`
      );
      setIsLoading(false);
      setHasError(true);
      if (onError) {
        onError(new Error(`Failed to load image "${alt}" across all sources.`));
      }
    }
  };

  const handleImageLoad = () => {
    setIsLoading(false);
    setHasError(false);
    if (onLoad) onLoad();
  };

  if (hasError && fallbackComponent) {
    return <div className={`relative flex items-center justify-center ${className}`}>{fallbackComponent}</div>;
  }

  return (
    <div className={`relative overflow-hidden flex items-center justify-center ${className}`}>
      {/* Gentle shimmering placeholder during load */}
      {isLoading && (
        <div className="absolute inset-0 bg-slate-200/60 animate-pulse rounded-[inherit] z-10 flex items-center justify-center">
          <div className="w-5 h-5 rounded-full border-2 border-amber-400 border-t-transparent animate-spin opacity-80" />
        </div>
      )}

      {/* Main Figurine Image */}
      <img
        src={activeUrl}
        alt={alt}
        referrerPolicy="no-referrer"
        onLoad={handleImageLoad}
        onError={handleImageError}
        className={`${imgClassName} transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  );
};
