'use client';
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const AnimatedSection = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0 });
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isInView) {
      setShow(true); // immediately show when in view
    } else {
      // delay hiding by 200ms to prevent flicker
      const timeout = setTimeout(() => setShow(false), 40);
      return () => clearTimeout(timeout);
    }
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 70 }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 70 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
