import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

const ContactSection = () => {
  const { toast } = useToast();
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    // Section title animations
    gsap.from(".contact-title", {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none none"
      },
      y: 50,
      opacity: 0,
      duration: 0.8
    });

    gsap.from(".contact-divider", {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none none"
      },
      width: 0,
      opacity: 0,
      duration: 0.8,
      delay: 0.2
    });

    gsap.from(".contact-description", {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none none"
      },
      y: 20,
      opacity: 0,
      duration: 0.8,
      delay: 0.4
    });

    // Form field staggered animation
    gsap.from(".form-field", {
      scrollTrigger: {
        trigger: formRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6
    });

    // Form button animation
    gsap.from(".form-button", {
      scrollTrigger: {
        trigger: ".form-field:last-child",
        start: "top 90%",
        toggleActions: "play none none none"
      },
      scale: 0.9,
      opacity: 0,
      duration: 0.5,
      delay: 0.4
    });

    // Contact info section animations
    gsap.from(".contact-info", {
      scrollTrigger: {
        trigger: ".contact-info-wrapper",
        start: "top 80%",
        toggleActions: "play none none none"
      },
      x: 50,
      opacity: 0,
      duration: 0.8
    });

    // Contact items staggered animation
    gsap.from(".contact-item", {
      scrollTrigger: {
        trigger: ".contact-info",
        start: "top 80%",
        toggleActions: "play none none none"
      },
      x: 30,
      opacity: 0,
      stagger: 0.15,
      duration: 0.5,
      delay: 0.3
    });
    
    // Social media icons animation
    gsap.from(".social-icon", {
      scrollTrigger: {
        trigger: ".social-media-container",
        start: "top 90%",
        toggleActions: "play none none none"
      },
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.4,
      ease: "back.out(1.5)"
    });
    
    // Floating decorative elements
    gsap.to(".contact-float-1", {
      y: -30,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
    
    gsap.to(".contact-float-2", {
      y: -20,
      x: 15,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.5
    });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, service: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await apiRequest('POST', '/api/contact', formData);
      
      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Entraremos em contato em breve.",
        variant: "default",
      });
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Erro ao enviar mensagem",
        description: "Por favor, tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: "map-marker-alt",
      title: "Endereço",
      details: ["Av. Tecnologia, 1000 - Centro", "Salvador - BA, 40000-000"]
    },
    {
      icon: "phone-alt",
      title: "Telefone",
      details: ["(71) 3333-4444", "(71) 98765-4321"]
    },
    {
      icon: "envelope",
      title: "E-mail",
      details: ["contato@vwtech.com.br", "suporte@vwtech.com.br"]
    },
    {
      icon: "clock",
      title: "Horário de Atendimento",
      details: ["Segunda à Sexta: 9h às 18h", "Sábado: 9h às 13h"]
    }
  ];

  const socialMedia = [
    { icon: "facebook-f", color: "bg-[#3b5998]", url: "#" },
    { icon: "twitter", color: "bg-[#1da1f2]", url: "#" },
    { icon: "instagram", color: "bg-[#ea4c89]", url: "#" },
    { icon: "linkedin-in", color: "bg-[#0077b5]", url: "#" }
  ];

  return (
    <section ref={sectionRef} id="contact" className="relative py-24 overflow-hidden">
      {/* Background styling */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/50 to-primary/5"></div>
      
      {/* Decorative elements */}
      <div className="contact-float-1 absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-bl-full blur-3xl"></div>
      <div className="contact-float-2 absolute bottom-0 left-0 w-1/4 h-1/4 bg-secondary/5 rounded-tr-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            className="inline-block text-primary font-semibold mb-2 bg-primary/10 px-3 py-1 rounded-full text-sm"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Fale Conosco
          </motion.span>
          <motion.h2 
            className="contact-title text-3xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Vamos transformar<br className="hidden md:block" /><span className="text-primary"> sua ideia em realidade</span>
          </motion.h2>
          <motion.div 
            className="contact-divider w-20 h-1 bg-secondary mx-auto mb-6"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 80, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          ></motion.div>
          <motion.p 
            className="contact-description text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Compartilhe suas necessidades conosco e descubra como nossos serviços de tecnologia podem impulsionar seu negócio para o próximo nível.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Contact Form */}
          <motion.div 
            className="col-span-1 lg:col-span-3"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="contact-form bg-white p-8 md:p-10 rounded-xl shadow-xl relative overflow-hidden"
              whileHover={{ 
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                y: -5,
                transition: { duration: 0.3 }
              }}
            >
              {/* Form Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="10" cy="10" r="1.5" fill="#5000ca" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#dots)" />
                </svg>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-8">Envie sua mensagem</h3>
                
                <form ref={formRef} onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="form-field">
                      <Label htmlFor="name" className="block mb-2">Nome completo</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Seu nome"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border-gray-200 transition-colors focus:border-primary"
                      />
                    </div>
                    
                    <div className="form-field">
                      <Label htmlFor="email" className="block mb-2">E-mail</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border-gray-200 transition-colors focus:border-primary"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="form-field">
                      <Label htmlFor="phone" className="block mb-2">Telefone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="(00) 00000-0000"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full rounded-lg border-gray-200 transition-colors focus:border-primary"
                      />
                    </div>
                    
                    <div className="form-field">
                      <Label htmlFor="service" className="block mb-2">Serviço de interesse</Label>
                      <Select value={formData.service} onValueChange={handleSelectChange}>
                        <SelectTrigger className="w-full rounded-lg border-gray-200 transition-colors focus:border-primary">
                          <SelectValue placeholder="Selecione um serviço" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="website">Criação de Site</SelectItem>
                          <SelectItem value="ecommerce">Loja Virtual</SelectItem>
                          <SelectItem value="app">Aplicativo</SelectItem>
                          <SelectItem value="marketing">Marketing Digital</SelectItem>
                          <SelectItem value="consultoria">Consultoria</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="mb-6 form-field">
                    <Label htmlFor="message" className="block mb-2">Mensagem</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Descreva seu projeto ou dúvida..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border-gray-200 transition-colors focus:border-primary h-32"
                    />
                  </div>
                  
                  <div className="form-field">
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="form-button bg-primary hover:bg-primary/90 text-white rounded-lg py-3 px-6 shadow-lg shadow-primary/30 transition-all hover:shadow-xl hover:shadow-primary/40"
                    >
                      {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Contact Info */}
          <motion.div 
            className="contact-info-wrapper col-span-1 lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div 
              className="contact-info bg-gradient-to-br from-primary to-secondary p-8 md:p-10 rounded-xl text-white h-full shadow-xl overflow-hidden relative"
              whileHover={{ 
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                y: -5,
                transition: { duration: 0.3 }
              }}
            >
              {/* Background pattern for info box */}
              <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 0 10 L 40 10 M 10 0 L 10 40" fill="none" stroke="white" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-8">Informações de Contato</h3>
                
                <div className="space-y-8">
                  {contactInfo.map((info, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-start contact-item"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      whileHover={{ x: 5, transition: { duration: 0.2 } }}
                    >
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white mr-4 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          {info.icon === "map-marker-alt" && <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />}
                          {info.icon === "map-marker-alt" && <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />}
                          {info.icon === "phone-alt" && <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />}
                          {info.icon === "envelope" && <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />}
                          {info.icon === "clock" && <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />}
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-white/90">{info.title}</h4>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-white/70">{detail}</p>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="social-media-container mt-12 pt-8 border-t border-white/20">
                  <h4 className="font-bold mb-4 text-white/90">Nossas Redes Sociais</h4>
                  <div className="flex space-x-4">
                    {socialMedia.map((social, index) => (
                      <motion.a 
                        key={index} 
                        href={social.url} 
                        className="social-icon w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                        whileHover={{ y: -3, transition: { duration: 0.2 } }}
                      >
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          {social.icon === "facebook-f" && <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />}
                          {social.icon === "twitter" && <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />}
                          {social.icon === "instagram" && <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />}
                          {social.icon === "linkedin-in" && <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />}
                        </svg>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
