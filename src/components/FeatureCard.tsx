import { motion } from "motion/react";
import { useRef } from "react";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  delay?: number;
  children?: React.ReactNode;
}

export default function FeatureCard({ icon, title, description, delay = 0, children }: FeatureCardProps) {
  const ref = useRef(null);

  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-xl p-6 border border-gray-100 shadow-md hover:shadow-lg transition-shadow duration-300"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: delay }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-coral/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className={`fas ${icon} text-3xl text-coral`}></i>
        </div>
        <h3 className="text-xl font-opensauce font-bold mb-3">
          {title}
        </h3>
        <p className="font-agrandir text-gray-700">
          {description}
        </p>
      </div>
      {children}
    </motion.div>
  );
}