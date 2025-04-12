import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

interface TransformationModalProps {
  beforeImage: string;
  afterImage: string;
  name: string;
  testimony: string;
}

export default function TransformationModal({ beforeImage, afterImage, name, testimony }: TransformationModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        className="cursor-pointer relative group"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.02 }}
      >
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <div className="absolute inset-0 flex">
            <img src={beforeImage} alt="Antes" className="w-1/2 object-cover" />
            <img src={afterImage} alt="Después" className="w-1/2 object-cover" />
          </div>
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
              initial={{ opacity: 0, scale: 0.8, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 100 }}
              className="fixed inset-x-4 top-5 -translate-y-1/2 z-50 max-w-4xl mx-auto"
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
                <div className="relative h-[500px] sm:h-[600px]">
                  <div className="absolute inset-0 flex">
                    <div className="w-1/2 relative">
                      <img src={beforeImage} alt="Antes" className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute bottom-4 left-4 bg-coral/90 text-white px-3 py-1 rounded-full text-sm">
                        Antes
                      </div>
                    </div>
                    <div className="w-1/2 relative">
                      <img src={afterImage} alt="Después" className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute bottom-4 right-4 bg-coral/90 text-white px-3 py-1 rounded-full text-sm">
                        Después
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6 sm:p-8 bg-gradient-to-r from-coral to-salmon">
                  <h3 className="text-xl sm:text-2xl font-opensauce font-bold text-white mb-4">{name}</h3>
                  <p className="font-agrandir text-white/90">{testimony}</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}