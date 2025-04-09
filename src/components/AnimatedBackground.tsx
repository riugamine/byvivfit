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
            "linear-gradient(90deg, #FF6B6B 0%, rgb(229, 100, 252) 100%)",
            "linear-gradient(90deg, #FF4081 0%, #FF9E80 100%)",
            "linear-gradient(90deg,rgb(229, 100, 252) 0%, #FF6B6B 100%)"
        ]
      },
      {
        duration: 3,
        repeat: Infinity,
        repeatType: "loop",
      }
    );
  }, [animate]);

  return (
    <div ref={scope} className="absolute inset-0 z-0" />
  );
}