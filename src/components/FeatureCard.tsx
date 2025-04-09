import { motion } from "motion/react";
import { useRef } from "react";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  delay?: number;
}

export default function FeatureCard({ icon, title, description, delay = 0 }: FeatureCardProps) {
  const ref = useRef(null);

  return (
    <motion.div
      ref={ref}
      className="bg-gray-50 p-6 sm:p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: delay }}
    >
      <div className="text-coral text-3xl sm:text-4xl mb-4">
        <i className={`fas ${icon}`}></i>
      </div>
      <h3 className="text-xl sm:text-2xl font-opensauce font-bold mb-3 sm:mb-4">
        {title}
      </h3>
      <p className="font-agrandir text-gray-700">
        {description}
      </p>
    </motion.div>
  );
}