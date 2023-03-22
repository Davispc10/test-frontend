import React from 'react';
import { motion } from 'framer-motion';

interface HoverScaleProps {
  className?: string;
  options?: {
    delay?: number;
    duration?: number;
    scale?: number;
  };
}

const HoverScaleAnimation = ({
  className,
  options,
  children,
}: React.PropsWithChildren<HoverScaleProps>) => {
  return (
    <motion.div
      className={className}
      whileHover={{
        scale: options?.scale || 1.1,
      }}
      transition={{
        duration: options?.duration || 0.1,
        delay: options?.delay || 0,
      }}
    >
      {children}
    </motion.div>
  );
};

export default HoverScaleAnimation;
