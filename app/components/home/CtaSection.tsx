"use client";
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaBookOpen, FaBook } from 'react-icons/fa';

const CtaSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section ref={ref} className="py-20 bg-[#0f172a]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto bg-gradient-to-br from-[#243447] to-[#1a2a3a] rounded-2xl p-8 md:p-12 shadow-xl border border-[#36d7b7]/20 relative overflow-hidden"
        >
          {/* Background decorative elements */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#36d7b7]/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#2ecc71]/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                Ready to Start Your <br/> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#36d7b7] to-[#2ecc71]">
                  Book Journey?
                </span>
              </h2>
              <p className="text-gray-300 max-w-md">
                Join our community today to buy, sell, and discover books that will change your perspective and enrich your life.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/buy" className="bg-gradient-to-r from-[#36d7b7] to-[#2ecc71] hover:from-[#2ecc71] hover:to-[#27ae60] text-white font-medium rounded-lg px-8 py-4 transition-all transform hover:-translate-y-1 hover:shadow-xl flex items-center justify-center">
                <FaBookOpen className="mr-2" />
                <span>Find Books</span>
              </Link>
              <Link href="/sell" className="border-2 border-[#36d7b7] text-[#36d7b7] hover:bg-[#36d7b7]/10 font-medium rounded-lg px-8 py-4 transition-all transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center">
                <FaBook className="mr-2" />
                <span>Sell Books</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
