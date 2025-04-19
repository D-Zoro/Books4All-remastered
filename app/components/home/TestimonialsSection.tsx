"use client";
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    content: "Books4All has completely changed how I buy and sell textbooks. The process is so simple and I've saved a ton of money on my college books.",
    author: "Jessica T.",
    role: "Engineering Student",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 2,
    content: "The AI recommendations are spot on! I've discovered so many great books I wouldn't have found otherwise. This platform is a game-changer.",
    author: "Michael R.",
    role: "Avid Reader",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 3,
    content: "As someone who sells used books regularly, this platform has made the process incredibly easy. The community is also very supportive!",
    author: "Aisha K.",
    role: "Book Collector",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg"
  },
  {
    id: 4,
    content: "The security and reliability of transactions on Books4All gives me peace of mind. I've never had an issue buying or selling.",
    author: "David M.",
    role: "Literature Professor",
    avatar: "https://randomuser.me/api/portraits/men/86.jpg"
  }
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  // Auto-advance testimonials
  useEffect(() => {
    if (!inView) return;
    
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <section ref={ref} className="py-20 bg-[#1a2a3a] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#36d7b7]/5 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-[#2ecc71]/5 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#36d7b7] to-[#2ecc71]">Community</span> Says
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join thousands of satisfied users who have transformed their reading and book exchange experience
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative h-[300px] md:h-[220px]">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="absolute w-full p-6 md:p-8 bg-gradient-to-br from-[#243447] to-[#1e293b] rounded-xl shadow-lg border border-white/5"
                initial={{ opacity: 0, x: 100 }}
                animate={{ 
                  opacity: index === activeIndex ? 1 : 0,
                  x: index === activeIndex ? 0 : 100,
                  scale: index === activeIndex ? 1 : 0.9
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-[#36d7b7]">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <p className="text-gray-300 italic mb-4">{testimonial.content}</p>
                    <div>
                      <h4 className="font-semibold text-white">{testimonial.author}</h4>
                      <p className="text-sm text-[#36d7b7]">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "bg-[#36d7b7] w-6" : "bg-gray-500 opacity-50 hover:opacity-75"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
