import { motion } from "framer-motion";
import { config } from "../../constants/config";
import { SectionWrapper } from "../../hoc";
import { textVariant } from "../../utils/motion";

const ThankYou = () => {
  return (
    <div className="w-full">
      <motion.div variants={textVariant()}>
        <motion.div
          className="mx-auto max-w-7xl px-6 py-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            Thank You for Visiting!
          </h2>
          <motion.p 
            className="mx-auto mt-6 max-w-2xl text-lg text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            I appreciate you taking the time to explore my portfolio.
            Feel free to reach out if you'd like to connect or discuss potential opportunities.
          </motion.p>
          <motion.div 
            className="mt-8 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <a
              href={`mailto:${config.html.email}`}
              className="rounded-full bg-tertiary px-8 py-3 text-lg font-medium text-white transition-colors hover:bg-opacity-80"
            >
              Get In Touch
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(ThankYou, "thankyou");
