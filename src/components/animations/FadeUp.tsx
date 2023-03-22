import React from 'react';
import { motion, MotionProps } from 'framer-motion';

interface FadeUpProps {
  className?: string;
  options?: {
    delay?: number;
    duration?: number;
  };
}

const FadeUpAnimation = ({
  className,
  options,
  children,
}: React.PropsWithChildren<FadeUpProps>) => {
  return (
    <motion.div
      className={className}
      viewport={{ once: true }}
      initial="hidden"
      whileInView="visible"
      variants={{
        hidden: {
          opacity: 0,
          y: 50,
        },
        visible: {
          opacity: 1,
          y: 0,
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

export default FadeUpAnimation;
