import React, { useState } from 'react';

const DEFAULT_FALLBACK = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80';

export default function ImageWithFallback({
  src,
  alt = '',
  className = '',
  fallbackSrc = DEFAULT_FALLBACK,
  aspectRatio = 'aspect-[3/4]',
  ...props
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const finalSrc = hasError || !src ? fallbackSrc : src;

  return (
    <div className={`relative overflow-hidden bg-brand-ivory-muted ${aspectRatio} ${className}`}>
      {/* Skeleton / Shimmer background while loading */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 img-placeholder-shimmer" />
      )}

      <img
        src={finalSrc}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          if (!hasError) {
            setHasError(true);
            setIsLoaded(true);
          }
        }}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...props}
      />
    </div>
  );
}
