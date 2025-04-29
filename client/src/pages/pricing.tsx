import { motion } from 'framer-motion';
import PricingSection from '@/components/pricing-section';
import FAQSection from '@/components/faq-section';
import CTASection from '@/components/cta-section';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const PricingPage = () => {
  // Set page title and meta description
  useEffect(() => {
    document.title = 'Planos | VW Tech';
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Helmet>
        <title>Planos | VW Tech</title>
        <meta name="description" content="Conheça os planos da VW Tech para criação de sites, lojas virtuais e sistemas. Escolha o plano ideal para o seu negócio com ótimo custo-benefício." />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </Helmet>
      
      <div className="pt-20">
        <PricingSection />
        <FAQSection />
        <CTASection />
      </div>
    </motion.div>
  );
};

export default PricingPage;
