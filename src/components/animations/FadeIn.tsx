import React from 'react';
import { motion } from 'framer-motion';

interface FadeInProps {
  className?: string;
  options?: {
    delay?: number;
    duration?: number;
  };
}

const FadeInAnimation = ({
  className,
  options,
  children,
}: React.PropsWithChildren<FadeInProps>) => {
  return (
    <motion.div
      className={className}
      viewport={{ once: true }}
      initial="hidden"
      whileInView="visible"
      variants={{
        hidden: {
          opacity: 0,
        },
        visible: {
          opacity: 1,
        },
      }}
      transition={{
        duration: options?.duration || 0.5,
        delay: options?.delay || 0,
      }}
    >
      {children}
    </motion.div>
  );
};

export default FadeInAnimation;
