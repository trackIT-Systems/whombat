import { useState, useEffect, useRef } from "react";
import { SpectrogramWindow, SpectrogramParameters, Recording } from "@/types";
import api from "@/app/api";

type SpectrogramSegmentKey = string;

type CacheEntry = {
    image: HTMLImageElement;
    size: number;
    timestamp: number;
};

/**
 * Cache for spectrogram segments.
 */
class SpectrogramCache {
    private cache: Map<SpectrogramSegmentKey, CacheEntry>;
    private totalSize: number;
    private maxSize: number;
    private insertOrder: SpectrogramSegmentKey[];

    constructor(maxSizeInMB: number = 10) {
        this.cache = new Map();
        this.totalSize = 0;
        this.maxSize = maxSizeInMB * 1024 * 1024; // Convert MB to bytes
        this.insertOrder = [];
    }

    /**
     * Calculate the size of an image in bytes
     */
    private getImageSize(image: HTMLImageElement): number {
        // Estimate size based on width, height, and 4 bytes per pixel (RGBA)
        return image.width * image.height * 4;
    }

    /**
     * Remove oldest entries until we're under the size limit
     */
    private enforceMaxSize(): void {
        while (this.totalSize > this.maxSize && this.insertOrder.length > 0) {
            const oldestKey = this.insertOrder.shift();
            if (oldestKey) {
                const entry = this.cache.get(oldestKey);
                if (entry) {
                    this.totalSize -= entry.size;
                    this.cache.delete(oldestKey);
                }
            }
        }
    }

    /**
     * Generate a unique key for a spectrogram segment
     */
    generateKey(
        recordingId: string,
        window: SpectrogramWindow,
        parameters: SpectrogramParameters
    ): SpectrogramSegmentKey {
        return JSON.stringify({
            recordingId,
            window,
            parameters,
        });
    }

    /**
     * Get an image from the cache. Updates last accessed time.
     */
    get(
        recordingId: string,
        window: SpectrogramWindow,
        parameters: SpectrogramParameters
    ): HTMLImageElement | null {
        const key = this.generateKey(recordingId, window, parameters);
        const entry = this.cache.get(key);

        if (entry) {
            return entry.image;
        }

        return null;
    }

    /**
     * Add an image to the cache
     */
    async set(
        recordingId: string,
        window: SpectrogramWindow,
        parameters: SpectrogramParameters,
        image: HTMLImageElement,
        imageSize: number
    ): Promise<void> {
        try {
            if (!image.complete) {
                await new Promise((resolve, reject) => {
                    image.onload = resolve;
                    image.onerror = reject;
                });
            }
            await image.decode();
            
            const key = this.generateKey(recordingId, window, parameters);
            
            // If this single image is larger than max size, don't cache it
            if (imageSize > this.maxSize) {
                console.warn('Image too large to cache:', imageSize, 'bytes');
                return;
            }

            // Remove old entry if it exists
            const existingEntry = this.cache.get(key);
            if (existingEntry) {
                this.totalSize -= existingEntry.size;
                const index = this.insertOrder.indexOf(key);
                if (index > -1) {
                    this.insertOrder.splice(index, 1);
                }
            }

            // Add new entry
            this.totalSize += imageSize;
            this.cache.set(key, {
                image,
                size: imageSize,
                timestamp: Date.now(),
            });
            this.insertOrder.push(key);

            // Enforce size limit
            this.enforceMaxSize();

        } catch (error) {
            console.error('Failed to cache image:', error);
        }
    }


    /**
     * Clear the entire cache
     */
    clear(): void {
        this.cache.clear();
        this.insertOrder = [];
        this.totalSize = 0;
    }

    /**
     * Get the current size of the cache in bytes
     */
    size(): number {
        return this.totalSize;
    }

    /**
     * Get the current number of items in the cache
     */
    count(): number {
        return this.cache.size;
    }
}

// Create a singleton instance
export const spectrogramCache = new SpectrogramCache(10);

/**
 * Hook to use the spectrogram cache
 */
export function useSpectrogramCache({
    recording,
    window,
    parameters,
    withSpectrogram,
    url,
}: {
    recording: Recording;
    window: SpectrogramWindow;
    parameters: SpectrogramParameters;
    withSpectrogram: boolean;
    url: string;
}) {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const [currentImage, setCurrentImage] = useState<HTMLImageElement | null>(null);

    useEffect(() => {
        if (!withSpectrogram) {
            setLoading(false);
            return;
        }

        // Check cache first
        const cachedImage = spectrogramCache.get(recording.uuid, window, parameters);
        if (cachedImage) {
            setCurrentImage(cachedImage);
            setLoading(false);
            setError(null);
            return;
        }

        // Create image only once per effect
        if (!imageRef.current) {
            imageRef.current = new Image();
        }
        const img = imageRef.current;

        // Use fetch to get the image and its size from headers
        const loadImage = async () => {
            try {
                const response = await fetch(url);
                const size = parseInt(response.headers.get('content-length') || '0', 10);
                const blob = await response.blob();
                const objectUrl = URL.createObjectURL(blob);

                img.onload = async () => {
                    try {
                        await img.decode();
                        await spectrogramCache.set(recording.uuid, window, parameters, img, size);
                        setCurrentImage(img);
                        setLoading(false);
                        setError(null);
                    } catch (err) {
                        setError("Failed to decode image");
                        setLoading(false);
                    } finally {
                        URL.revokeObjectURL(objectUrl);
                    }
                };

                img.onerror = () => {
                    setLoading(false);
                    setError("Failed to load spectrogram");
                    URL.revokeObjectURL(objectUrl);
                };

                img.src = objectUrl;
            } catch (err) {
                setError("Failed to fetch image");
                setLoading(false);
            }
        };

        loadImage();

        return () => {
            imageRef.current = null;
        };
    }, [recording.uuid, window, parameters, withSpectrogram, url]);

    return {
        image: currentImage,
        isLoading: loading,
        isError: error !== null,
        error,
    };
}
