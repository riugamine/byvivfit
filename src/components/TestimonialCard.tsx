import { useEffect } from "react";
import { animate } from "motion";

interface TestimonialCardProps {
  name: string;
  text: string;
  delay: number;
}

export default function TestimonialCard({ name, text, delay }: TestimonialCardProps) {
  useEffect(() => {
    const element = document.querySelector(`[data-testimonial="${name}"]`);
    if (element instanceof HTMLElement) {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        animate(
          element,
          { 
            //@ts-ignore
            opacity: 1, 
            transform: 'translateY(0px)' 
          },
          { 
            duration: 0.5, 
            easing: "ease-out" 
          }
        );
      }, delay * 1000);
    }
  }, []);

  return (
    <div
      data-testimonial={name}
      className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-coral rounded-full flex items-center justify-center text-white">
          <i className="fas fa-user text-xl"></i>
        </div>
        <div className="ml-4">
          <h4 className="font-opensauce font-bold text-base sm:text-lg">
            {name}
          </h4>
          <div className="text-coral">
            <i className="fas fa-star text-sm sm:text-base"></i>
            <i className="fas fa-star text-sm sm:text-base"></i>
            <i className="fas fa-star text-sm sm:text-base"></i>
            <i className="fas fa-star text-sm sm:text-base"></i>
            <i className="fas fa-star text-sm sm:text-base"></i>
          </div>
        </div>
      </div>
      <p className="italic font-agrandir text-gray-700 text-sm sm:text-base">
        "{text}"
      </p>
    </div>
  );
}