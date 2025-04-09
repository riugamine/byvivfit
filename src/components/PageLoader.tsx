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
      // Define the loading sequence
      const loadingSequence = async () => {
        try {
          // 1. Animate the line growing
          lineHeight.set(0);
          const lineAnim = animate(
              lineHeight, 
            // @ts-ignore - TypeScript tiene problemas con la sobrecarga pero esto funciona
            100, 
            { duration: 1.5, easing: "ease-in-out" }
          );
          await lineAnim.finished;

          // 2. Small pause
          await new Promise(resolve => setTimeout(resolve, 300));

          // 3. Split the panels
          const leftAnim = animate(
              leftPanelX, 
            // @ts-ignore - Ignoramos el error de TypeScript
            -100, 
            { duration: 0.8, easing: "ease-in-out" }
          );
          
          const rightAnim = animate(
              rightPanelX, 
            // @ts-ignore - Ignoramos el error de TypeScript
            100, 
            { duration: 0.8, easing: "ease-in-out" }
          );
          
          await Promise.all([leftAnim.finished, rightAnim.finished]);

          // 4. Hide the loader
          loader.style.display = "none";
          
          // 5. Animate content appearing
          document.querySelectorAll('.content-reveal').forEach((element, index) => {
            if (element instanceof HTMLElement) {
              
              animate(
                element,
                {
                    // @ts-ignore - TypeScript tiene problemas con esta sobrecarga
                  opacity: [0, 1],
                  y: [20, 0]
                },
                { 
                  duration: 0.5, 
                  delay: 0.1 * index,
                  easing: "ease-out"
                }
              );
            }
          });
        } catch (error) {
          console.error("Error in loading animation:", error);
          // Fallback: hide loader if animation fails
          loader.style.display = "none";
        }
      };

      // Start the animation when the page is loaded
      const runAnimation = () => {
        requestAnimationFrame(() => {
          loadingSequence();
        });
      };

      if (document.readyState === "complete") {
        runAnimation();
      } else {
        window.addEventListener("load", runAnimation);
        return () => window.removeEventListener("load", runAnimation);
      }
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
        className="absolute w-0.5 bg-white z-10"
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