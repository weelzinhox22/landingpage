import { useEffect, useRef, useState } from 'react';
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
import gsap from 'gsap';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

const ContactSection = () => {
  const { toast } = useToast();
  const sectionRef = useRef<HTMLElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  useEffect(() => {
    if (sectionRef.current) {
      const ctx = gsap.context(() => {
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

        gsap.from(".contact-form", {
          scrollTrigger: {
            trigger: ".contact-description",
            start: "top 70%",
            toggleActions: "play none none none"
          },
          y: 50,
          opacity: 0,
          duration: 0.8
        });

        gsap.from(".contact-info", {
          scrollTrigger: {
            trigger: ".contact-description",
            start: "top 70%",
            toggleActions: "play none none none"
          },
          x: 50,
          opacity: 0,
          duration: 0.8,
          delay: 0.3
        });
      }, sectionRef);

      return () => ctx.revert();
    }
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
    <section ref={sectionRef} id="contato" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="contact-title text-3xl md:text-4xl font-bold mb-4">Entre em Contato</h2>
          <div className="contact-divider w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="contact-description text-muted-foreground max-w-2xl mx-auto">
            Envie sua mensagem e nossa equipe entrará em contato para entender suas necessidades e oferecer a melhor solução.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact Form */}
          <motion.div 
            className="lg:w-2/3"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form className="contact-form bg-white p-8 rounded-xl shadow-lg" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-20 transition-all"
                    placeholder="Seu nome"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-20 transition-all"
                    placeholder="Seu e-mail"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6 space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-20 transition-all"
                  placeholder="(00) 00000-0000"
                  required
                />
              </div>
              
              <div className="mb-6 space-y-2">
                <Label htmlFor="service">Serviço de Interesse</Label>
                <Select onValueChange={handleSelectChange} value={formData.service}>
                  <SelectTrigger className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-20 transition-all">
                    <SelectValue placeholder="Selecione o serviço" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="website">Criação de Site</SelectItem>
                    <SelectItem value="ecommerce">Loja Virtual</SelectItem>
                    <SelectItem value="app">Aplicativo</SelectItem>
                    <SelectItem value="marketing">Marketing Digital</SelectItem>
                    <SelectItem value="system">Sistema Personalizado</SelectItem>
                    <SelectItem value="other">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="mb-6 space-y-2">
                <Label htmlFor="message">Mensagem</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-20 transition-all"
                  placeholder="Descreva seu projeto ou necessidade"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-md"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
              </Button>
            </form>
          </motion.div>
          
          {/* Contact Info */}
          <motion.div 
            className="lg:w-1/3"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="contact-info bg-muted p-8 rounded-xl h-full">
              <h3 className="text-2xl font-bold mb-6">Informações de Contato</h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white mr-4 flex-shrink-0 mt-1">
                      <i className={`fas fa-${info.icon}`}></i>
                    </div>
                    <div>
                      <h4 className="font-bold">{info.title}</h4>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-muted-foreground">{detail}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <h4 className="font-bold mb-4">Nossas Redes Sociais</h4>
                <div className="flex space-x-4">
                  {socialMedia.map((social, index) => (
                    <a 
                      key={index} 
                      href={social.url} 
                      className={`w-10 h-10 rounded-full ${social.color} flex items-center justify-center text-white hover:opacity-90 transition-opacity`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className={`fab fa-${social.icon}`}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
