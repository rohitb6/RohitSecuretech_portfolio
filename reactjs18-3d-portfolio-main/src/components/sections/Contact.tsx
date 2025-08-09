import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { config } from "../../constants/config";
import { SectionWrapper } from "../../hoc";
import { slideIn } from "../../utils/motion";
import { EarthCanvas } from "../canvas";
import EnvTest from "../EnvTest";

const INITIAL_STATE = {
  name: "",
  email: "",
  message: ""
};

const Contact = () => {
  const [form, setForm] = useState(INITIAL_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{type: 'success' | 'error' | null, message: string}>({type: null, message: ''});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic form validation
    if (!form.name || !form.email || !form.message) {
      setSubmitStatus({type: 'error', message: 'Please fill in all fields'});
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setSubmitStatus({type: 'error', message: 'Please enter a valid email address'});
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({type: null, message: ''});

    // Log environment variables (without exposing sensitive data)
    console.log('Environment variables check:', {
      hasServiceId: !!import.meta.env.VITE_EMAILJS_SERVICE_ID,
      hasTemplateId: !!import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      hasPublicKey: !!import.meta.env.VITE_EMAILJS_ACCESS_TOKEN,
      serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID ? '***' : 'MISSING',
      templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID ? '***' : 'MISSING',
      publicKey: import.meta.env.VITE_EMAILJS_ACCESS_TOKEN ? '***' : 'MISSING'
    });

    const templateParams = {
      from_name: form.name,
      from_email: form.email,
      message: form.message,
      to_name: config.html.fullName,
      to_email: config.html.email,
    };

    console.log('Sending email with params:', templateParams);

    try {
      // Initialize EmailJS with your public key
      emailjs.init(import.meta.env.VITE_EMAILJS_ACCESS_TOKEN);
      
      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams
      );
      
      console.log('EmailJS response:', response);
      
      if (response.status === 200) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you for your message. I will get back to you soon!'
        });
        setForm(INITIAL_STATE);
      }
    } catch (error) {
      console.error('Full error details:', error);
      console.log('Environment variables:', {
        serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
        templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        publicKey: import.meta.env.VITE_EMAILJS_ACCESS_TOKEN ? '*** (exists)' : 'MISSING'
      });
      
      let errorMessage = 'Failed to send message. ';
      
      if (error instanceof Error) {
        console.error('Error details:', {
          name: error.name,
          message: error.message,
          stack: error.stack
        });
        
        if (error.message.includes('Service not found')) {
          errorMessage += 'Invalid Service ID. Please check your EmailJS Service ID.';
        } else if (error.message.includes('Template not found')) {
          errorMessage += 'Invalid Template ID. Please check your EmailJS Template ID.';
        } else if (error.message.includes('Invalid user ID format')) {
          errorMessage += 'Invalid Public Key. Please check your EmailJS Public Key.';
        } else if (error.message.includes('Failed to fetch')) {
          errorMessage += 'Network error. Please check your internet connection.';
        } else {
          errorMessage += `Error: ${error.message}`;
        }
      } else {
        errorMessage += 'An unknown error occurred. Please check the console for details.';
      }
      
      setSubmitStatus({
        type: 'error',
        message: errorMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col-reverse gap-10 overflow-hidden xl:mt-12 xl:flex-row">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] rounded-2xl bg-black-100 p-8"
      >
        <p className="text-sm uppercase tracking-wider text-gray-400">Get in touch</p>
        <h3 className="mt-2 text-4xl font-bold text-white">Contact.</h3>

        {submitStatus.message && (
          <div className={`mt-4 p-4 rounded-lg ${
            submitStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {submitStatus.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-6">
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-2 font-medium text-white">
              Your Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
              className="rounded-lg border-none bg-tertiary px-4 py-3 font-medium text-white outline-none placeholder:text-secondary focus:ring-2 focus:ring-primary"
              disabled={isSubmitting}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2 font-medium text-white">
              Your Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email?"
              className="rounded-lg border-none bg-tertiary px-4 py-3 font-medium text-white outline-none placeholder:text-secondary focus:ring-2 focus:ring-primary"
              disabled={isSubmitting}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="message" className="mb-2 font-medium text-white">
              Your Message
            </label>
            <textarea
              id="message"
              rows={5}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What would you like to discuss?"
              className="rounded-lg border-none bg-tertiary px-4 py-3 font-medium text-white outline-none placeholder:text-secondary focus:ring-2 focus:ring-primary"
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`mt-4 w-fit rounded-xl bg-tertiary px-8 py-3 font-bold text-white shadow-md shadow-primary outline-none transition-all hover:bg-opacity-90 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black-100 ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="h-[350px] md:h-[550px] xl:h-auto xl:flex-1"
      >
        <EarthCanvas />
      </motion.div>
      {import.meta.env.DEV && <EnvTest />}
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
