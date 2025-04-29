import { motion } from 'framer-motion';
import PortfolioSection from '@/components/portfolio-section';
import CTASection from '@/components/cta-section';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const PortfolioPage = () => {
  // Set page title and meta description
  useEffect(() => {
    document.title = 'Portfólio | VW Tech';
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Helmet>
        <title>Portfólio | VW Tech</title>
        <meta name="description" content="Conheça os projetos desenvolvidos pela VW Tech que fizeram a diferença para nossos clientes. Websites, E-commerce, Aplicativos e mais." />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </Helmet>
      
      <div className="pt-20">
        <PortfolioSection />
        <CTASection />
      </div>
    </motion.div>
  );
};

export default PortfolioPage;
