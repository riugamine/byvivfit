import { motion } from "motion/react";
import { useRef } from "react";

interface ProgramFeatureCardProps {
  icon: string;
  title: string;
  description: string;
  delay?: number;
  fromLeft?: boolean;
}

export default function ProgramFeatureCard({ icon, title, description, delay = 0, fromLeft = true }: ProgramFeatureCardProps) {
  const ref = useRef(null);

  return (
    <motion.div
      ref={ref}
      className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
      initial={{ opacity: 0, x: fromLeft ? -100 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: delay }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-start">
        <div className="text-coral text-2xl mr-4">
          <i className={`fas ${icon}`}></i>
        </div>
        <div>
          <h3 className="text-xl font-opensauce font-bold mb-2">{title}</h3>
          <p className="font-agrandir text-gray-700">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}