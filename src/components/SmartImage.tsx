import React, { useState, useEffect, useRef } from 'react';
import { isImagePreloaded, markImageAsLoaded, logRenderPerformance } from '../utils/assetHelper';

interface SmartImageProps {
  src: string;
  alt: string;
  fallbackSrcs?: string[];
  fallbackComponent?: React.ReactNode;
  className?: string;
  imgClassName?: string;
  onLoad?: () => void;
  onError?: (err: Error) => void;
  priority?: 'high' | 'auto' | 'low';
}

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt,
  fallbackSrcs = [],
  fallbackComponent,
  className = '',
  imgClassName = '',
  onLoad,
  onError,
  priority = 'high'
}) => {
  const candidateUrls = [src, ...fallbackSrcs].filter(Boolean);
  const [currentSrcIndex, setCurrentSrcIndex] = useState<number>(0);
  const activeUrl = candidateUrls[currentSrcIndex] || src;

  // Check if image was preloaded in in-memory cache
  const isInitiallyCached = isImagePreloaded(activeUrl);
  const [isLoading, setIsLoading] = useState<boolean>(!isInitiallyCached);
  const [hasError, setHasError] = useState<boolean>(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const mountTimeRef = useRef<number>(performance.now());

  // Check synchronously if DOM image is already complete on render
  useEffect(() => {
    mountTimeRef.current = performance.now();
    setCurrentSrcIndex(0);

    if (isImagePreloaded(src)) {
      setIsLoading(false);
      setHasError(false);
      return;
    }

    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      markImageAsLoaded(src);
      setIsLoading(false);
      setHasError(false);
      return;
    }

    setIsLoading(true);
    setHasError(false);
  }, [src]);

  const handleImageError = () => {
    const failedUrl = activeUrl;
    console.warn(`[WORD VENTURE Image Load Notice] Failed to load image: "${alt}" (${failedUrl}).`);

    if (currentSrcIndex + 1 < candidateUrls.length) {
      const nextIndex = currentSrcIndex + 1;
      const nextUrl = candidateUrls[nextIndex];
      console.info(`[WORD VENTURE Fallback] Retrying with secondary URL for "${alt}": ${nextUrl}`);
      setCurrentSrcIndex(nextIndex);
      setIsLoading(!isImagePreloaded(nextUrl));
    } else {
      console.error(
        `[WORD VENTURE Image Error] All candidate URLs failed for "${alt}".`,
        candidateUrls
      );
      setIsLoading(false);
      setHasError(true);
      if (onError) {
        onError(new Error(`Failed to load image "${alt}" across all sources.`));
      }
    }
  };

  const handleImageLoad = () => {
    const duration = performance.now() - mountTimeRef.current;
    markImageAsLoaded(activeUrl);
    logRenderPerformance(alt, duration, isInitiallyCached);
    setIsLoading(false);
    setHasError(false);
    if (onLoad) onLoad();
  };

  if (hasError && fallbackComponent) {
    return <div className={`relative flex items-center justify-center ${className}`}>{fallbackComponent}</div>;
  }

  return (
    <div className={`relative overflow-hidden flex items-center justify-center ${className}`}>
      {/* Subtle pulse placeholder only if actually waiting on network download */}
      {isLoading && !isInitiallyCached && (
        <div className="absolute inset-0 bg-slate-200/50 animate-pulse rounded-[inherit] z-10 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full border-2 border-amber-400 border-t-transparent animate-spin opacity-80" />
        </div>
      )}

      {/* Main Figurine Image */}
      <img
        ref={imgRef}
        src={activeUrl}
        alt={alt}
        loading="eager"
        decoding="async"
        fetchPriority={priority}
        referrerPolicy="no-referrer"
        onLoad={handleImageLoad}
        onError={handleImageError}
        className={`${imgClassName} transition-opacity duration-150 ${
          isLoading && !isInitiallyCached ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  );
};
