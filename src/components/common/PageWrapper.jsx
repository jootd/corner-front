"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

export default function PageWrapper({ children }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // You can remove `behavior` for instant scroll
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.2,
      }}
    >
      {children}
    </motion.div>
  );
}
