import { motion } from 'framer-motion';
import ContactSection from '@/components/contact-section';
import FAQSection from '@/components/faq-section';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const ContactPage = () => {
  // Set page title and meta description
  useEffect(() => {
    document.title = 'Contato | VW Tech';
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Helmet>
        <title>Contato | VW Tech</title>
        <meta name="description" content="Entre em contato com a VW Tech para soluções digitais sob medida. Solicite um orçamento e transforme sua presença online com nossos especialistas." />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </Helmet>
      
      <div className="pt-20">
        <ContactSection />
        <FAQSection />
      </div>
    </motion.div>
  );
};

export default ContactPage;
