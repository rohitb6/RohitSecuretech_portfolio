import { motion } from "framer-motion";
import { FaFileDownload } from "react-icons/fa";

import { styles } from "../../constants/styles";
import { ComputersCanvas } from "../canvas";
import { config } from "../../constants/config";

const Hero = () => {
  return (
    <section className={`relative mx-auto h-screen w-full`}>
      <div
        className={`absolute inset-0 top-[120px] mx-auto max-w-7xl ${styles.paddingX} flex flex-col md:flex-row items-center md:items-start gap-8`}
      >
        {/* Mobile Profile Photo - Only shown on mobile */}
        <motion.div 
          className="md:hidden relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.div
            className="absolute inset-0 z-10 rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, #915EFF, #FF6B6B, #FFD166, #06D6A0, #118AB2, #073B4C, #915EFF)',
              padding: '3px',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <div className="h-40 w-40 rounded-full" />
          </motion.div>
          
          <div className="h-40 w-40 overflow-hidden rounded-full border-4 border-transparent shadow-lg relative z-0">
            <img 
              src="/profile.jpg" 
              alt="Profile" 
              className="h-full w-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = 'https://via.placeholder.com/200';
              }}
            />
          </div>
        </motion.div>

        {/* Purple line - hidden on mobile, shown on desktop */}
        <div className="hidden md:flex flex-col items-center">
          <div className="h-5 w-5 rounded-full bg-[#915EFF]" />
          <div className="violet-gradient h-40 w-1 sm:h-80" />
        </div>

        {/* Desktop Profile Photo - Only shown on desktop */}
        <motion.div 
          className="hidden md:block relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.div
            className="absolute inset-0 z-10 rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, #915EFF, #FF6B6B, #FFD166, #06D6A0, #118AB2, #073B4C, #915EFF)',
              padding: '4px',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <div className="h-48 w-48 rounded-full" />
          </motion.div>
          
          <div className="h-48 w-48 overflow-hidden rounded-full border-4 border-transparent shadow-lg relative z-0">
            <img 
              src="/profile.jpg" 
              alt="Profile" 
              className="h-full w-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = 'https://via.placeholder.com/200';
              }}
            />
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="text-center md:text-left flex-1">
          <motion.h1 
            className={`${styles.heroHeadText} text-white`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row md:items-baseline">
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: 'auto' }}
                transition={{ duration: 1, delay: 0.5 }}
                className="inline-block overflow-hidden whitespace-nowrap align-middle"
              >
                Hi, I'm
              </motion.span>
              <motion.span 
                className="text-[#915EFF] md:ml-2 block md:inline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
              >
                {config.hero.name}
              </motion.span>
            </div>
          </motion.h1>
          <p className={`${styles.heroSubText} text-white-100 mt-2`}>
            {config.hero.p[0]} <br className="hidden sm:block" />
            {config.hero.p[1]}
          </p>
        </div>
      </div>

      <div className="relative h-[100%] w-full">
        <ComputersCanvas />
        
        {/* Resume Button - Bottom Right */}
        <motion.a
          href="RohitResume.pdf"
          download
          className="absolute right-8 bottom-8 z-50 rounded-full bg-[#915EFF] px-6 py-3 text-white shadow-lg transition-all hover:bg-opacity-90 hover:shadow-purple-500/30 flex items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.5 }}
        >
          <FaFileDownload className="h-4 w-4" />
          <span>Resume</span>
        </motion.a>
      </div>

      <div className="xs:bottom-10 absolute bottom-32 flex w-full items-center justify-center">
        <a href="#about">
          <div className="border-secondary flex h-[64px] w-[35px] items-start justify-center rounded-3xl border-4 p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="bg-secondary mb-1 h-3 w-3 rounded-full"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
