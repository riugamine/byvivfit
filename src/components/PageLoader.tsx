import { animate } from "motion";
import { motion } from "motion/react";
import { useMotionTemplate, useSpring } from "motion/react";
import { useEffect, useRef } from "react";

export default function PageLoader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  
  // Create motion values for the line height and panel positions
  const lineHeight = useSpring(0, { stiffness: 100, damping: 30 });
  const leftPanelX = useSpring(0, { stiffness: 100, damping: 20 });
  const rightPanelX = useSpring(0, { stiffness: 100, damping: 20 });
  
  // Create templates for transforms
  const leftTransform = useMotionTemplate`translateX(${leftPanelX}%)`;
  const rightTransform = useMotionTemplate`translateX(${rightPanelX}%)`;
  const lineHeightTemplate = useMotionTemplate`${lineHeight}%`;

  useEffect(() => {
    const loader = loaderRef.current;

    if (loader) {
      const loadingSequence = async () => {
        try {
          // Modified loading progress tracking
          let progress = 0;
          const updateProgress = () => {
            if (progress < 100) {
              progress += 2; // Increment progress smoothly
              lineHeight.set(progress);
              requestAnimationFrame(updateProgress);
            } else {
              // Continue with split animation
              setTimeout(async () => {
                const lineElement = document.querySelector('[data-line-element]');
                if (lineElement instanceof HTMLElement) {
                  lineElement.style.opacity = '0';
                }
                // @ts-ignore
                const leftAnim = animate(leftPanelX, -100, { 
                  duration: 0.8, 
                  easing: "ease-in-out" 
                });
                // @ts-ignore
                const rightAnim = animate(rightPanelX, 100, { 
                  duration: 0.8, 
                  easing: "ease-in-out" 
                });
                
                await Promise.all([leftAnim.finished, rightAnim.finished]);
                loader.style.display = "none";

                // Reveal content
                document.querySelectorAll('.content-reveal').forEach((element, index) => {
                  if (element instanceof HTMLElement) {
                    animate(element, {
                      // @ts-ignore
                      opacity: [0, 1],
                      y: [20, 0]
                    }, { 
                      duration: 0.5, 
                      delay: 0.1 * index,
                      easing: "ease-out"
                    });
                  }
                });
              }, 300);
            }
          };

          // Start the progress animation
          updateProgress();

        } catch (error) {
          console.error("Error in loading animation:", error);
          loader.style.display = "none";
        }
      };

      // Start the animation when component mounts
      loadingSequence();
    }
  }, []);

  return (
    <div ref={loaderRef} className="fixed inset-0 z-50 flex items-center justify-center">
      <motion.div 
        className="absolute top-0 left-0 w-1/2 h-full bg-coral"
        style={{ transform: leftTransform }}
      ></motion.div>
      <motion.div 
        className="absolute top-0 right-0 w-1/2 h-full bg-coral"
        style={{ transform: rightTransform }}
      ></motion.div>
      <motion.div 
        data-line-element
        className="absolute w-0.5 bg-white z-10 transition-opacity duration-300"
        style={{ 
          height: lineHeightTemplate,
          top: "0%",
          left: "50%",
          transform: "translateX(-50%)"
        }}
      ></motion.div>
    </div>
  );
}