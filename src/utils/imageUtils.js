/**
 * Image Utilities for Lils Spun Boutique
 * Handles automatic client-side WebP conversion, compression, and sizing
 */

/**
 * Format bytes into human-readable string (KB, MB)
 */
export function formatFileSize(bytes) {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

/**
 * Converts any Image File (JPEG, PNG, HEIC, GIF, BMP, etc.) into WebP format
 * using HTML5 Canvas with proportional resizing and quality compression.
 *
 * @param {File|Blob} file - The source image file
 * @param {Object} options - Configuration options
 * @param {number} [options.quality=0.82] - WebP quality factor (0.0 to 1.0)
 * @param {number} [options.maxWidth=1600] - Max width constraint
 * @param {number} [options.maxHeight=1600] - Max height constraint
 * @returns {Promise<Object>} Converted WebP details including dataUrl, blob, savings
 */
export function convertImageToWebP(file, { quality = 0.82, maxWidth = 1600, maxHeight = 1600 } = {}) {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(new Error('No file provided for conversion'));
    }

    const reader = new FileReader();

    reader.onerror = () => {
      reject(new Error('Failed to read image file'));
    };

    reader.onload = (e) => {
      const img = new Image();

      img.onerror = () => {
        reject(new Error('Failed to load image into browser memory'));
      };

      img.onload = () => {
        try {
          let { width, height } = img;

          // Calculate downscale factor if dimensions exceed maximums
          if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width = Math.round(width * ratio);
            height = Math.round(height * ratio);
          }

          // Render on canvas
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            return reject(new Error('Unable to acquire 2D canvas context'));
          }

          // Use high quality image smoothing
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);

          // Export as WebP Data URL
          const webpDataUrl = canvas.toDataURL('image/webp', quality);

          // Also export as Blob for storage upload if needed
          canvas.toBlob(
            (blob) => {
              const originalSize = file.size || 0;
              const webpSize = blob ? blob.size : Math.round((webpDataUrl.length * 3) / 4);
              const savingsPercent = originalSize > 0 
                ? Math.max(0, Math.round(((originalSize - webpSize) / originalSize) * 100))
                : 0;

              const cleanBaseName = (file.name || 'product-image')
                .replace(/\.[^/.]+$/, '')
                .replace(/[^a-zA-Z0-9-_]/g, '-');

              resolve({
                dataUrl: webpDataUrl,
                blob,
                name: `${cleanBaseName}.webp`,
                format: 'image/webp',
                width,
                height,
                originalSize,
                webpSize,
                originalSizeFormatted: formatFileSize(originalSize),
                webpSizeFormatted: formatFileSize(webpSize),
                savingsPercent,
                timestamp: Date.now()
              });
            },
            'image/webp',
            quality
          );
        } catch (err) {
          reject(err);
        }
      };

      img.src = e.target.result;
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Attempts to convert an external image URL to WebP via Canvas
 * Falls back to original URL if cross-origin policy prevents canvas export
 */
export async function convertUrlToWebP(imageUrl, options = {}) {
  if (!imageUrl) return null;
  if (imageUrl.startsWith('data:image/webp')) {
    return { dataUrl: imageUrl, format: 'image/webp', isAlreadyWebP: true };
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        const maxWidth = options.maxWidth || 1600;
        const maxHeight = options.maxHeight || 1600;
        let { width, height } = img;

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        const webpDataUrl = canvas.toDataURL('image/webp', options.quality || 0.82);
        resolve({
          dataUrl: webpDataUrl,
          width,
          height,
          format: 'image/webp'
        });
      } catch (err) {
        // Fallback to original URL if CORS blocks canvas read
        console.warn('CORS prevented WebP conversion of URL, keeping original:', err.message);
        resolve({
          dataUrl: imageUrl,
          format: 'original',
          isCORSFallback: true
        });
      }
    };

    img.onerror = () => {
      resolve({
        dataUrl: imageUrl,
        format: 'original',
        loadError: true
      });
    };

    img.src = imageUrl;
  });
}
