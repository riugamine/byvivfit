import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

interface TransformationModalProps {
  image: string;
  name: string;
  testimony: string;
}

export default function TransformationModal({ image, name, testimony }: TransformationModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isOpen) {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      setModalPosition({
        x: viewportWidth / 2,
        y: viewportHeight / 2
      });
    }
  }, [isOpen]);

  return (
    <>
      <motion.div
        className="cursor-pointer relative group"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.02 }}
      >
        <div className="relative h-[300px] sm:h-[350px] lg:h-[400px] rounded-lg overflow-hidden">
          <img src={image} alt="Transformación" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
            <span className="text-white font-opensauce font-bold">Ver transformación</span>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-50"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: "-50%", y: "-50%" }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                x: "-50%",
                y: "-50%",
                transition: { type: "spring", damping: 25, stiffness: 300 }
              }}
              exit={{ opacity: 0, scale: 0.95, x: "-50%", y: "-50%" }}
              style={{
                position: 'fixed',
                left: modalPosition.x,
                top: modalPosition.y,
                width: '90%',
                maxWidth: '48rem', // equivalent to max-w-3xl
                zIndex: 50
              }}
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
                <div className="relative h-[350px] sm:h-[450px] md:h-[550px] lg:h-[600px]">
                  <img 
                    src={image} 
                    alt="Transformación" 
                    className="w-full h-full object-contain bg-gray-50" 
                  />
                  <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 bg-coral/90 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                    Antes
                  </div>
                  <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 bg-coral/90 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                    Después
                  </div>
                </div>
                <div className="p-4 sm:p-6 md:p-8 bg-gradient-to-r from-coral to-salmon">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-opensauce font-bold text-white mb-2 sm:mb-4">
                    {name}
                  </h3>
                  <p className="text-sm sm:text-base font-agrandir text-white/90">
                    {testimony}
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-2 sm:top-4 right-2 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                >
                  <i className="fas fa-times text-sm sm:text-base"></i>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}