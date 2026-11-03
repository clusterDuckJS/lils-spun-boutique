import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Upload,
  Image as ImageIcon,
  Trash2,
  Star,
  Check,
  AlertCircle,
  Loader2,
  Sparkles,
  Layers,
  Tag,
  Palette,
  FileCheck2,
  ExternalLink
} from 'lucide-react';
import { convertImageToWebP, convertUrlToWebP } from '../../utils/imageUtils';
import { VALID_CATEGORIES, CATEGORY_NAMES } from '../../services/productService';

const PRESET_OCCASIONS = [
  'Festive Celebrations',
  'Wedding Guest',
  'Everyday Elegance',
  'Special Occasions'
];

const CATEGORY_SIZE_PRESETS = {
  'ready-made': ['S (36)', 'M (38)', 'L (40)', 'XL (42)', 'XXL (44)'],
  'churidar-materials': ['Top: 2.50m', 'Bottom: 2.00m', 'Dupatta: 2.30m', 'Custom Tailoring Fabric'],
  'sarees': ['Free Size (5.5m + 0.8m Blouse)', '5.5 Metres Drape'],
  'kids-wear': ['2-3 Years', '4-5 Years', '6-7 Years', '8-9 Years', '10-12 Years']
};

export default function ProductFormModal({ isOpen, onClose, onSave, product = null }) {
  const isEdit = Boolean(product && product.id);

  // Form State
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('ready-made');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [fabric, setFabric] = useState('');
  const [occasion, setOccasion] = useState('Festive Celebrations');
  const [description, setDescription] = useState('');
  const [care, setCare] = useState('');
  const [available, setAvailable] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [newArrival, setNewArrival] = useState(true);

  // Dynamic Lists State
  const [images, setImages] = useState([]); // array of { url, originalSize, webpSize, savingsPercent, isWebp }
  const [sizes, setSizes] = useState([]);
  const [newSizeInput, setNewSizeInput] = useState('');
  const [colours, setColours] = useState([]);
  const [newColourName, setNewColourName] = useState('');
  const [newColourHex, setNewColourHex] = useState('#B8977E');
  const [details, setDetails] = useState([]);
  const [newDetailInput, setNewDetailInput] = useState('');
  const [tags, setTags] = useState([]);
  const [newTagInput, setNewTagInput] = useState('');

  // Processing & UI State
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [isConvertingUrl, setIsConvertingUrl] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);

  // Populate or reset form whenever modal opens or product changes
  useEffect(() => {
    if (isOpen) {
      if (product) {
        setName(product.name || '');
        setSlug(product.slug || '');
        setCategory(product.category || 'ready-made');
        setPrice(product.price != null ? String(product.price) : '');
        setOriginalPrice(product.originalPrice != null ? String(product.originalPrice) : '');
        setFabric(product.fabric || '');
        setOccasion(product.occasion || 'Festive Celebrations');
        setDescription(product.description || '');
        setCare(product.care || '');
        setAvailable(product.available !== false);
        setFeatured(Boolean(product.featured));
        setNewArrival(Boolean(product.newArrival));

        // Format existing images
        const existingImages = (product.images || []).map((img, idx) => ({
          id: `img-${idx}-${Date.now()}`,
          url: typeof img === 'string' ? img : (img.url || img.dataUrl),
          isWebp: typeof img === 'string' ? (img.includes('webp') || img.startsWith('data:image/webp')) : true,
          badge: typeof img === 'string' && img.startsWith('data:image/webp') ? 'WebP Encoded' : 'Ready'
        }));
        setImages(existingImages);

        setSizes(Array.isArray(product.sizes) ? [...product.sizes] : []);
        setColours(Array.isArray(product.colours) ? [...product.colours] : []);
        setDetails(Array.isArray(product.details) ? [...product.details] : []);
        setTags(Array.isArray(product.tags) ? [...product.tags] : []);
      } else {
        // Defaults for new product
        setName('');
        setSlug('');
        setCategory('ready-made');
        setPrice('');
        setOriginalPrice('');
        setFabric('');
        setOccasion('Festive Celebrations');
        setDescription('');
        setCare('Dry clean only. Store in a breathable muslin bag.');
        setAvailable(true);
        setFeatured(false);
        setNewArrival(true);
        setImages([]);
        setSizes(['S (36)', 'M (38)', 'L (40)', 'XL (42)']);
        setColours([{ name: 'Champagne Gold', hex: '#D8C4A5' }]);
        setDetails([
          'Handcrafted by traditional boutique artisans',
          'Intricate border detailing and royal drape',
          'Soft comfortable breathable inner lining'
        ]);
        setTags(['Ready Made', 'Bestseller', 'New Arrival']);
      }
      setErrorMessage('');
    }
  }, [isOpen, product]);

  // Auto-generate slug when name changes (if not manual or editing)
  const handleNameChange = (val) => {
    setName(val);
    if (!isEdit) {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setSlug(generated);
    }
  };

  // Switch size preset when category changes
  const handleCategoryChange = (newCat) => {
    setCategory(newCat);
    if (!isEdit && sizes.length === 0 && CATEGORY_SIZE_PRESETS[newCat]) {
      setSizes(CATEGORY_SIZE_PRESETS[newCat]);
    }
  };

  /**
   * Handle File Upload & Convert to WebP automatically
   */
  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsProcessingImage(true);
    setErrorMessage('');

    try {
      for (const file of files) {
        // Automatically convert any image to WebP format
        const webpResult = await convertImageToWebP(file, { quality: 0.82, maxWidth: 1600, maxHeight: 1600 });

        setImages((prev) => [
          ...prev,
          {
            id: `webp-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
            url: webpResult.dataUrl,
            isWebp: true,
            originalName: file.name,
            originalSize: webpResult.originalSizeFormatted,
            webpSize: webpResult.webpSizeFormatted,
            savingsPercent: webpResult.savingsPercent,
            badge: `WebP (${webpResult.webpSizeFormatted}${webpResult.savingsPercent > 0 ? ` • -${webpResult.savingsPercent}%` : ''})`
          }
        ]);
      }
    } catch (err) {
      console.error('WebP conversion failed:', err);
      setErrorMessage(`Image WebP conversion failed: ${err.message}`);
    } finally {
      setIsProcessingImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  /**
   * Handle external image URL addition & optional WebP conversion
   */
  const handleAddUrl = async () => {
    if (!urlInput.trim()) return;
    setIsConvertingUrl(true);
    setErrorMessage('');

    try {
      // Attempt conversion to WebP data URL
      const res = await convertUrlToWebP(urlInput.trim(), { quality: 0.82 });
      setImages((prev) => [
        ...prev,
        {
          id: `url-${Date.now()}`,
          url: res.dataUrl,
          isWebp: res.format === 'image/webp',
          badge: res.format === 'image/webp' ? 'WebP Converted' : 'External URL'
        }
      ]);
      setUrlInput('');
    } catch (err) {
      // Fallback: save as raw URL
      setImages((prev) => [
        ...prev,
        {
          id: `url-${Date.now()}`,
          url: urlInput.trim(),
          isWebp: urlInput.includes('.webp'),
          badge: 'External URL'
        }
      ]);
      setUrlInput('');
    } finally {
      setIsConvertingUrl(false);
    }
  };

  const removeImage = (indexToRemove) => {
    setImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const setAsPrimaryImage = (index) => {
    if (index === 0) return;
    setImages((prev) => {
      const copy = [...prev];
      const [item] = copy.splice(index, 1);
      copy.unshift(item);
      return copy;
    });
  };

  // Size chips
  const addSize = (size) => {
    const clean = size.trim();
    if (clean && !sizes.includes(clean)) {
      setSizes([...sizes, clean]);
      setNewSizeInput('');
    }
  };

  const removeSize = (idx) => {
    setSizes(sizes.filter((_, i) => i !== idx));
  };

  // Colours
  const addColour = () => {
    if (!newColourName.trim()) return;
    setColours([...colours, { name: newColourName.trim(), hex: newColourHex }]);
    setNewColourName('');
  };

  const removeColour = (idx) => {
    setColours(colours.filter((_, i) => i !== idx));
  };

  // Details
  const addDetail = () => {
    if (!newDetailInput.trim()) return;
    setDetails([...details, newDetailInput.trim()]);
    setNewDetailInput('');
  };

  const removeDetail = (idx) => {
    setDetails(details.filter((_, i) => i !== idx));
  };

  // Tags
  const addTag = (tag) => {
    const clean = tag.trim();
    if (clean && !tags.includes(clean)) {
      setTags([...tags, clean]);
      setNewTagInput('');
    }
  };

  const removeTag = (idx) => {
    setTags(tags.filter((_, i) => i !== idx));
  };

  // Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Please provide a product title');
      return;
    }
    if (!price || Number(price) <= 0) {
      setErrorMessage('Please provide a valid price in INR');
      return;
    }
    if (images.length === 0) {
      setErrorMessage('Please upload at least 1 image for the listing');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        id: product?.id,
        name: name.trim(),
        slug: slug.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        category,
        categoryName: CATEGORY_NAMES[category] || category,
        price: Number(price),
        originalPrice: originalPrice ? Number(originalPrice) : null,
        fabric: fabric.trim(),
        occasion,
        description: description.trim(),
        care: care.trim(),
        available,
        featured,
        newArrival,
        images: images.map((img) => img.url),
        sizes,
        colours,
        details,
        tags,
        rating: product?.rating || 5.0,
        reviewsCount: product?.reviewsCount || 0
      };

      await onSave(payload);
      onClose();
    } catch (err) {
      console.error('Save product error:', err);
      setErrorMessage(err.message || 'Failed to save product listing.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-brand-navy/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-luxury border border-brand-border overflow-hidden my-6 flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-4.5 bg-brand-ivory border-b border-brand-border flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-navy text-brand-champagne flex items-center justify-center font-serif text-lg">
              {isEdit ? '✎' : '+'}
            </div>
            <div>
              <h2 className="font-serif text-lg sm:text-xl text-brand-navy font-normal">
                {isEdit ? `Edit Listing: ${product?.name}` : 'Create New Boutique Listing'}
              </h2>
              <p className="text-[11px] text-brand-muted">
                Images automatically convert to high-performance WebP &amp; save directly to the database.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-brand-muted hover:text-brand-navy rounded-full hover:bg-brand-blush/30 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6 flex-1">
          {errorMessage && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form id="product-form" onSubmit={handleSubmit} className="space-y-6">
            
            {/* 1. Basic Information */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-widest text-brand-rose font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>1. Core Listing Information</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-brand-navy mb-1.5">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="e.g. Embroidered Georgette Anarkali Ready Made Gown"
                    className="w-full px-3.5 py-2.5 bg-brand-ivory/30 border border-brand-border rounded-xl text-xs sm:text-sm text-brand-navy focus:outline-none focus:border-brand-rose focus:ring-1 focus:ring-brand-rose"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-brand-navy mb-1.5">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="auto-generated-from-title"
                    className="w-full px-3.5 py-2.5 bg-brand-ivory/30 border border-brand-border rounded-xl text-xs sm:text-sm text-brand-navy focus:outline-none focus:border-brand-rose focus:ring-1 focus:ring-brand-rose"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-brand-navy mb-1.5">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-brand-ivory/30 border border-brand-border rounded-xl text-xs sm:text-sm text-brand-navy focus:outline-none focus:border-brand-rose focus:ring-1 focus:ring-brand-rose"
                  >
                    {VALID_CATEGORIES.map((catKey) => (
                      <option key={catKey} value={catKey}>
                        {CATEGORY_NAMES[catKey]}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-brand-navy mb-1.5">
                    Price (₹ INR) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="1"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g. 6850"
                    className="w-full px-3.5 py-2.5 bg-brand-ivory/30 border border-brand-border rounded-xl text-xs sm:text-sm text-brand-navy focus:outline-none focus:border-brand-rose focus:ring-1 focus:ring-brand-rose"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-brand-navy mb-1.5">
                    Original Price / MRP (₹ INR)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    placeholder="e.g. 8500"
                    className="w-full px-3.5 py-2.5 bg-brand-ivory/30 border border-brand-border rounded-xl text-xs sm:text-sm text-brand-navy focus:outline-none focus:border-brand-rose focus:ring-1 focus:ring-brand-rose"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-brand-navy mb-1.5">
                    Fabric &amp; Craftsmanship
                  </label>
                  <input
                    type="text"
                    value={fabric}
                    onChange={(e) => setFabric(e.target.value)}
                    placeholder="e.g. Pure Mulberry Silk with Antique Gold Zari"
                    className="w-full px-3.5 py-2.5 bg-brand-ivory/30 border border-brand-border rounded-xl text-xs sm:text-sm text-brand-navy focus:outline-none focus:border-brand-rose focus:ring-1 focus:ring-brand-rose"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-brand-navy mb-1.5">
                    Occasion
                  </label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-brand-ivory/30 border border-brand-border rounded-xl text-xs sm:text-sm text-brand-navy focus:outline-none focus:border-brand-rose focus:ring-1 focus:ring-brand-rose"
                  >
                    {PRESET_OCCASIONS.map((occ) => (
                      <option key={occ} value={occ}>
                        {occ}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-brand-navy mb-1.5">
                  Detailed Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detailed aesthetic description of silhouette, motifs, fall, and styling..."
                  className="w-full px-3.5 py-2.5 bg-brand-ivory/30 border border-brand-border rounded-xl text-xs sm:text-sm text-brand-navy focus:outline-none focus:border-brand-rose focus:ring-1 focus:ring-brand-rose"
                />
              </div>
            </div>

            {/* 2. AUTOMATIC WEBP IMAGE CONVERTER & GALLERY */}
            <div className="space-y-4 pt-4 border-t border-brand-border/60">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-brand-rose font-semibold flex items-center gap-1.5">
                    <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>2. Automatic WebP Media Studio</span>
                  </h3>
                  <p className="text-[11px] text-brand-muted">
                    Any image file selected here (PNG, JPG, HEIC, etc.) is automatically converted to optimized WebP in memory and saved to the database.
                  </p>
                </div>
                <span className="text-xs font-semibold text-brand-navy bg-brand-ivory px-3 py-1 rounded-full border border-brand-border">
                  {images.length} Image{images.length !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Upload Dropzone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-brand-border hover:border-brand-rose/60 bg-brand-ivory/40 hover:bg-brand-rose/5 rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 group"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="w-12 h-12 rounded-2xl bg-white group-hover:scale-105 border border-brand-border flex items-center justify-center text-brand-navy group-hover:text-brand-rose shadow-2xs transition-all">
                  {isProcessingImage ? (
                    <Loader2 className="w-6 h-6 animate-spin text-brand-rose" />
                  ) : (
                    <Upload className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-brand-navy">
                    {isProcessingImage ? 'Converting to WebP...' : 'Click to Upload Images or Drag & Drop'}
                  </p>
                  <p className="text-[11px] text-brand-muted mt-0.5">
                    PNG, JPG, JPEG, WEBP, GIF, SVG • Auto-resizes and converts to lightweight WebP
                  </p>
                </div>
              </div>

              {/* URL Input option */}
              <div className="flex gap-2">
                <input
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="Or paste external image URL (e.g. Unsplash or CDN)..."
                  className="flex-1 px-3.5 py-2 bg-brand-ivory/30 border border-brand-border rounded-xl text-xs text-brand-navy focus:outline-none focus:border-brand-rose"
                />
                <button
                  type="button"
                  disabled={isConvertingUrl || !urlInput.trim()}
                  onClick={handleAddUrl}
                  className="px-4 py-2 bg-brand-navy hover:bg-brand-navy-light text-brand-champagne rounded-xl text-xs font-semibold uppercase tracking-wider transition-all disabled:opacity-50 flex items-center gap-1.5"
                >
                  {isConvertingUrl ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                  <span>Add WebP</span>
                </button>
              </div>

              {/* Image Previews Gallery */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {images.map((img, idx) => (
                    <div
                      key={img.id || idx}
                      className={`relative group rounded-2xl overflow-hidden border bg-brand-ivory/50 aspect-3/4 flex flex-col ${
                        idx === 0 ? 'border-brand-rose ring-2 ring-brand-rose/20' : 'border-brand-border'
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={`Listing visual ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />

                      {/* Primary Badge */}
                      {idx === 0 && (
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-brand-navy/90 text-brand-champagne text-[10px] font-semibold tracking-wide backdrop-blur-xs flex items-center gap-1">
                          <Star className="w-2.5 h-2.5 fill-brand-champagne" />
                          <span>Primary</span>
                        </div>
                      )}

                      {/* WebP Indicator Badge */}
                      <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center text-[10px] bg-black/75 text-white backdrop-blur-xs px-2 py-1 rounded-lg">
                        <span className="font-mono font-medium truncate">
                          {img.badge || 'WEBP'}
                        </span>
                      </div>

                      {/* Hover Actions */}
                      <div className="absolute inset-0 bg-brand-navy/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        {idx !== 0 && (
                          <button
                            type="button"
                            onClick={() => setAsPrimaryImage(idx)}
                            title="Set as main photo"
                            className="p-2 rounded-xl bg-white text-brand-navy hover:text-brand-rose shadow-md transition-colors"
                          >
                            <Star className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          title="Delete image"
                          className="p-2 rounded-xl bg-red-600 text-white hover:bg-red-700 shadow-md transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 3. SIZES, COLOURS & SPECIFICATIONS */}
            <div className="space-y-4 pt-4 border-t border-brand-border/60">
              <h3 className="text-xs uppercase tracking-widest text-brand-rose font-semibold flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>3. Sizes, Colours &amp; Craft Details</span>
              </h3>

              {/* Sizes manager */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-brand-navy mb-1.5">
                  Available Sizes / Dimensions
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {sizes.map((s, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-brand-ivory border border-brand-border text-brand-navy font-medium"
                    >
                      {s}
                      <button
                        type="button"
                        onClick={() => removeSize(idx)}
                        className="hover:text-red-500 ml-0.5"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSizeInput}
                    onChange={(e) => setNewSizeInput(e.target.value)}
                    placeholder="Add size (e.g. M (38) or Top: 2.5m)..."
                    className="flex-1 px-3 py-1.5 bg-brand-ivory/30 border border-brand-border rounded-xl text-xs text-brand-navy focus:outline-none focus:border-brand-rose"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addSize(newSizeInput);
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => addSize(newSizeInput)}
                    className="px-3 py-1.5 bg-brand-navy text-white text-xs rounded-xl hover:bg-brand-navy-light font-medium"
                  >
                    + Add Size
                  </button>
                </div>
              </div>

              {/* Colours manager */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-brand-navy mb-1.5">
                  Colours &amp; Palettes
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {colours.map((c, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg bg-white border border-brand-border text-brand-navy font-medium shadow-2xs"
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                      <button
                        type="button"
                        onClick={() => removeColour(idx)}
                        className="hover:text-red-500 ml-1 text-xs"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    type="color"
                    value={newColourHex}
                    onChange={(e) => setNewColourHex(e.target.value)}
                    className="w-8 h-8 rounded-lg border border-brand-border cursor-pointer bg-white"
                  />
                  <input
                    type="text"
                    value={newColourName}
                    onChange={(e) => setNewColourName(e.target.value)}
                    placeholder="Colour name (e.g. Rose Gold, Rani Pink)..."
                    className="flex-1 px-3 py-1.5 bg-brand-ivory/30 border border-brand-border rounded-xl text-xs text-brand-navy focus:outline-none focus:border-brand-rose"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addColour();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={addColour}
                    className="px-3 py-1.5 bg-brand-navy text-white text-xs rounded-xl hover:bg-brand-navy-light font-medium"
                  >
                    + Add Colour
                  </button>
                </div>
              </div>

              {/* Craft Details manager */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-brand-navy mb-1.5">
                  Artisanal Craft Details (Bullet Points)
                </label>
                <div className="space-y-1.5 mb-2">
                  {details.map((d, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-xs px-3 py-1.5 rounded-xl bg-brand-ivory/60 border border-brand-border text-brand-navy"
                    >
                      <span className="truncate">• {d}</span>
                      <button
                        type="button"
                        onClick={() => removeDetail(idx)}
                        className="hover:text-red-500 ml-2"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newDetailInput}
                    onChange={(e) => setNewDetailInput(e.target.value)}
                    placeholder="Add highlight (e.g. Pure Zari borders, Includes blouse piece)..."
                    className="flex-1 px-3 py-1.5 bg-brand-ivory/30 border border-brand-border rounded-xl text-xs text-brand-navy focus:outline-none focus:border-brand-rose"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addDetail();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={addDetail}
                    className="px-3 py-1.5 bg-brand-navy text-white text-xs rounded-xl hover:bg-brand-navy-light font-medium"
                  >
                    + Add Highlight
                  </button>
                </div>
              </div>

              {/* Care Instructions */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-brand-navy mb-1.5">
                  Care Instructions
                </label>
                <input
                  type="text"
                  value={care}
                  onChange={(e) => setCare(e.target.value)}
                  placeholder="e.g. Dry clean only. Wrap in white muslin cloth."
                  className="w-full px-3.5 py-2.5 bg-brand-ivory/30 border border-brand-border rounded-xl text-xs text-brand-navy focus:outline-none focus:border-brand-rose"
                />
              </div>

              {/* Tags manager */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-brand-navy mb-1.5">
                  Search &amp; Filter Tags
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-brand-blush/40 text-brand-rose border border-brand-rose/20 font-medium"
                    >
                      #{t}
                      <button
                        type="button"
                        onClick={() => removeTag(idx)}
                        className="hover:text-red-600 ml-0.5"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTagInput}
                    onChange={(e) => setNewTagInput(e.target.value)}
                    placeholder="Add tag (e.g. Bestseller, Silk Saree)..."
                    className="flex-1 px-3 py-1.5 bg-brand-ivory/30 border border-brand-border rounded-xl text-xs text-brand-navy focus:outline-none focus:border-brand-rose"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag(newTagInput);
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => addTag(newTagInput)}
                    className="px-3 py-1.5 bg-brand-navy text-white text-xs rounded-xl hover:bg-brand-navy-light font-medium"
                  >
                    + Add Tag
                  </button>
                </div>
              </div>
            </div>

            {/* 4. VISIBILITY & AVAILABILITY TOGGLES */}
            <div className="space-y-3 pt-4 border-t border-brand-border/60">
              <h3 className="text-xs uppercase tracking-widest text-brand-rose font-semibold">
                4. Listing Status
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className="flex items-center gap-3 p-3 bg-brand-ivory/60 rounded-2xl border border-brand-border cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={available}
                    onChange={(e) => setAvailable(e.target.checked)}
                    className="w-4 h-4 rounded text-brand-rose focus:ring-brand-rose/20 accent-brand-rose"
                  />
                  <div>
                    <p className="text-xs font-semibold text-brand-navy">In Stock (Available)</p>
                    <p className="text-[10px] text-brand-muted">Visible for purchase</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-brand-ivory/60 rounded-2xl border border-brand-border cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="w-4 h-4 rounded text-brand-rose focus:ring-brand-rose/20 accent-brand-rose"
                  />
                  <div>
                    <p className="text-xs font-semibold text-brand-navy">Featured Item</p>
                    <p className="text-[10px] text-brand-muted">Spotlight on homepage</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-brand-ivory/60 rounded-2xl border border-brand-border cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={newArrival}
                    onChange={(e) => setNewArrival(e.target.checked)}
                    className="w-4 h-4 rounded text-brand-rose focus:ring-brand-rose/20 accent-brand-rose"
                  />
                  <div>
                    <p className="text-xs font-semibold text-brand-navy">New Arrival</p>
                    <p className="text-[10px] text-brand-muted">Highlighted with badge</p>
                  </div>
                </label>
              </div>
            </div>

          </form>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-brand-ivory border-t border-brand-border flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-5 py-2.5 bg-white border border-brand-border hover:border-brand-navy text-xs font-semibold uppercase tracking-wider text-brand-navy rounded-xl transition-colors"
          >
            Cancel
          </button>

          <button
            type="submit"
            form="product-form"
            disabled={isSubmitting || isProcessingImage}
            className="px-7 py-2.5 bg-brand-navy hover:bg-brand-navy-light text-brand-champagne rounded-xl text-xs uppercase tracking-luxury font-semibold shadow-md transition-all flex items-center gap-2 disabled:opacity-60 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-brand-champagne" />
                <span>Saving to Database...</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                <span>{isEdit ? 'Update Listing' : 'Publish Listing'}</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
