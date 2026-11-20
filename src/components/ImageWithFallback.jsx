import React, { useState } from 'react';

const DEFAULT_FALLBACK = '/images/products/rose-pink-kanjivaram-saree.jpg';

export function resolveAssetUrl(url) {
  if (!url || typeof url !== 'string') return url;
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = (base && base !== '.' && base !== './') ? (base.endsWith('/') ? base.slice(0, -1) : base) : '';
  const cleanPath = url.startsWith('/') ? url : `/${url}`;
  return cleanBase ? `${cleanBase}${cleanPath}` : cleanPath;
}

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

  const rawSrc = hasError || !src ? fallbackSrc : src;
  const finalSrc = resolveAssetUrl(rawSrc);

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
