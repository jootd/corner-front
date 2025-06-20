"use client";

import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import ModelViewer (no SSR)
const ModelViewer = dynamic(() => import("./ModelViewer"), { ssr: false });

const LogoAnimation = () => {
  const ref = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [images, setImages] = useState([]);
  const [currentFrame, setCurrentFrame] = useState(1);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("down");
  const [slideY, setSlideY] = useState(0);

  const totalFrames = 62;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["center end", "start start"],
  });

  // Load frame images
  useEffect(() => {
    let isMounted = true;
    const loadedImages = [];
    let loadedCount = 0;

    for (let i = 1; i <= totalFrames; i++) {
      const img = new window.Image();
      img.src = `/animation/frame_${i.toString().padStart(4, "0")}.webp`;

      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalFrames && isMounted) {
          setImagesLoaded(true);
        }
      };

      loadedImages.push(img);
    }

    if (isMounted) {
      setImages(loadedImages);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const render = useCallback(
    (index) => {
      if (images[index - 1] && ref.current) {
        const ctx = ref.current.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, ref.current.width, ref.current.height);
          ctx.drawImage(
            images[index - 1],
            0,
            0,
            ref.current.width,
            ref.current.height
          );
        }
      }
    },
    [images]
  );

  const currentIndex = useTransform(scrollYProgress, [0, 1], [1, totalFrames]);

  useMotionValueEvent(currentIndex, "change", (latest) => {
    const scrollY = window.scrollY;
    const direction = scrollY > lastScrollY ? "down" : "up";

    setScrollDirection(direction);
    setLastScrollY(scrollY);

    if (imagesLoaded) {
      let frameIndex = Math.max(1, Math.min(totalFrames, Math.round(latest)));

      if (direction === "up") {
        frameIndex = Math.max(1, frameIndex - 1);
      }

      setCurrentFrame(frameIndex);
      render(frameIndex);
    }
  });

  // Render first frame after loading
  useEffect(() => {
    if (imagesLoaded && currentFrame === 1) {
      render(1);
    }
  }, [imagesLoaded, render]);

  // Animate backwards on scroll to top
  useEffect(() => {
    let isMounted = true;

    if (scrollDirection === "up" && window.scrollY < 20) {
      let frame = currentFrame;

      const animateBackward = () => {
        if (!isMounted) return;

        if (frame > 1) {
          frame -= 1;
          render(frame);
          setCurrentFrame(frame);
          requestAnimationFrame(animateBackward);
        }
      };

      const animationFrame = requestAnimationFrame(animateBackward);

      return () => {
        isMounted = false;
        cancelAnimationFrame(animationFrame);
      };
    }
  }, [scrollDirection, currentFrame, imagesLoaded, render]);

  // Slide canvas when in mid-frame range
  useEffect(() => {
    if (currentFrame >= 30 && currentFrame <= 45) {
      setSlideY(scrollDirection === "down" ? 250 : 0);
    }
  }, [currentFrame, scrollDirection]);

  return (
    <div style={{ position: "relative" }}>
      {/* Left border */}
      <div
        style={{
          position: "absolute",
          left: 0,
          width: "3px",
          height: "100%",
          backgroundColor: "#eeeeee",
          zIndex: 100,
        }}
      />

      {/* Main animation container */}
      <div
        style={{
          backgroundColor: "transparent",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          zIndex: 2,
        }}
        className="2xl:h-[1400px] h-[900px]"
      >
        <div style={{ height: "700px" }} />

        {/* Canvas wrapper with slide animation */}
        <motion.div
          style={{
            height: "auto",
            width: "100%",
          }}
          animate={{ y: slideY }}
          transition={{ type: "easeInOut", stiffness: 100 }}
        >
          <canvas
            ref={ref}
            width={1300}
            height={500}
            style={{
              width: "100%",
              height: "auto",
              position: "relative",
              zIndex: 1,
            }}
          />
        </motion.div>

        {/* {currentFrame === totalFrames && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute top-0 left-0 w-full h-full z-50 pointer-events-none"
          >
            <ModelViewer />
          </motion.div>
        )} */}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "3px",
          height: "100%",
          backgroundColor: "#eeeeee",
          zIndex: 100,
        }}
      />
    </div>
  );
};

export default LogoAnimation;
