import React from 'react';
import { motion } from 'framer-motion';

interface FadeRightProps {
  className?: string;
  options?: {
    delay?: number;
    duration?: number;
  };
}

const FadeRightAnimation = ({
  className,
  options,
  children,
}: React.PropsWithChildren<FadeRightProps>) => {
  return (
    <motion.div
      className={className}
      viewport={{ once: true }}
      initial="hidden"
      whileInView="visible"
      variants={{
        hidden: {
          opacity: 0,
          x: -50,
        },
        visible: {
          opacity: 1,
          x: 0,
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

export default FadeRightAnimation;
