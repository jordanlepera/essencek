'use client';

import type { ImageProps } from 'next/image';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

type OptimizedImageProps = ImageProps & {
  containerClassName?: string;
};

/**
 * OptimizedImage - A drop-in replacement for Next.js Image with loading animations.
 *
 * Features:
 * - Shimmer skeleton animation while loading (pure CSS, GPU-accelerated)
 * - Smooth fade-in transition when image loads
 * - Zero performance impact on actual image loading
 */
export const OptimizedImage = ({
  className,
  containerClassName,
  alt,
  onLoad,
  fill,
  ...props
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={cn('relative overflow-hidden', fill && 'h-full w-full', containerClassName)}>
      {/* Skeleton shimmer - pure CSS, no performance impact */}
      <div
        className={cn(
          'absolute inset-0 bg-accent/30 transition-opacity duration-500',
          isLoaded ? 'opacity-0' : 'opacity-100',
        )}
      >
        <div className="absolute inset-0 animate-shimmer" />
      </div>

      {/* Image with fade-in transition */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={cn('h-full w-full', fill && 'absolute inset-0')}
      >
        <Image
          className={className}
          alt={alt}
          fill={fill}
          onLoad={(e) => {
            setIsLoaded(true);
            onLoad?.(e);
          }}
          {...props}
        />
      </motion.div>
    </div>
  );
};
