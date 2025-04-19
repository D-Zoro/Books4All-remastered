"use client";
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';

const categories = [
  {
    id: 1,
    name: 'Fiction',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    count: '2,451 Books'
  },
  {
    id: 2,
    name: 'Textbooks',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    count: '1,873 Books'
  },
  {
    id: 3,
    name: 'Science',
    image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    count: '1,204 Books'
  },
  {
    id: 4,
    name: 'Art & Design',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    count: '952 Books'
  },
];

const FeaturedCategories = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-20 bg-[#1a2a3a]">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Browse by <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#36d7b7] to-[#2ecc71]">Category</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore our extensive collection of books across various categories to find exactly what you are looking for
          </p>
        </motion.div>

        <div 
          ref={containerRef} 
          className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group"
            >
              <Link href={`/buy?category=${category.name.toLowerCase()}`}>
                <div className="relative h-40 md:h-64 rounded-xl overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4 w-full">
                    <h3 className="text-lg md:text-xl font-semibold text-white">{category.name}</h3>
                    <p className="text-xs md:text-sm text-gray-300">{category.count}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <Link href="/buy" className="inline-flex items-center text-[#36d7b7] hover:text-white bg-transparent hover:bg-[#36d7b7]/20 px-6 py-3 rounded-lg transition-all duration-300 border border-[#36d7b7]">
            <span>View All Categories</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
