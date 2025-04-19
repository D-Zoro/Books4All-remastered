"use client";
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { FaExchangeAlt, FaRobot, FaUserFriends, FaShieldAlt } from 'react-icons/fa';

const benefits = [
  {
    icon: <FaExchangeAlt className="h-7 w-7" />,
    title: "Easy Exchange",
    description: "Buy and sell books with just a few clicks. Our platform makes transactions simple and transparent."
  },
  {
    icon: <FaRobot className="h-7 w-7" />,
    title: "AI Support",
    description: "Get personalized book recommendations and assistance from our advanced AI support system."
  },
  {
    icon: <FaUserFriends className="h-7 w-7" />,
    title: "Community",
    description: "Connect with fellow book lovers, share reviews, and discover new titles through our active community."
  },
  {
    icon: <FaShieldAlt className="h-7 w-7" />,
    title: "Secure Transactions",
    description: "Our secure platform ensures your transactions and personal information are always protected."
  }
];

const BenefitsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-[#1a2a3a] to-[#0f172a]">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#36d7b7] to-[#2ecc71]">Books4All</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We provide a seamless experience for buying and selling books with features designed to make your literary journey exceptional
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-[#243447]/50 backdrop-blur-sm p-6 rounded-xl border border-[#36d7b7]/20 hover:border-[#36d7b7]/60 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-[#36d7b7] to-[#2ecc71] rounded-lg flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform duration-300 shadow-lg">
                <div className="text-white">
                  {benefit.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#36d7b7] transition-colors duration-300">{benefit.title}</h3>
              <p className="text-gray-400">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection;
