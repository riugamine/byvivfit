import { motion } from 'framer-motion';
import type { ImageMetadata } from 'astro';

interface Props {
  src: string | ImageMetadata;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export default function AnimatedImage({ src, alt, width, height, className }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.02 }}
    >
      <img 
        src={typeof src === 'string' ? src : src.src} 
        alt={alt} 
        width={width} 
        height={height} 
        className={className}
      />
    </motion.div>
  );
}