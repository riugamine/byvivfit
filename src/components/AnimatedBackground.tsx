import { useAnimate } from "motion/react";
import { useEffect } from "react";

export default function AnimatedBackground() {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    // Animación con propiedades CSS válidas para Motion One
    animate(
      scope.current,
      { 
        backgroundImage: [
          "linear-gradient(90deg, #FF6B6B 0%, #FF8E8E 100%)",
          "linear-gradient(90deg, #FF8E8E 0%, #FFA5A5 100%)",
          "linear-gradient(90deg, #FF6B6B 0%, #FF8E8E 100%)"
        ]
      },
      {
        duration: 3,
        repeat: Infinity,
      }
    );
  }, [animate]);

  return (
    <div ref={scope} className="absolute inset-0 z-0" />
  );
}