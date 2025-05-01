import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'wouter';
import { Helmet } from 'react-helmet';
import gsap from 'gsap';
import { useGSAP } from '@/hooks/use-gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

interface ServiceProject {
  title: string;
  description: string;
  features: string[];
  technologies: string[];
  screenshots: {
    title: string;
    description: string;
    image: string;
  }[];
  benefits: string[];
  color: string;
}

// Define projetos específicos para cada serviço
const serviceProjects: Record<string, ServiceProject> = {
  "Website Corporativo": {
    title: "Website Corporativo",
    description: "Desenvolvimento de um site institucional moderno, responsivo e de alta performance para a empresa TechSolutions, focado em transmitir profissionalismo e converter visitantes em leads qualificados. O projeto incluiu estratégia de UX/UI, otimização para SEO, integração com redes sociais, sistema de gerenciamento de conteúdo personalizado e implementação de analytics avançado.",
    features: [
      "Design responsivo para desktop, tablet e mobile",
      "Otimização avançada para motores de busca (SEO)",
      "Carregamento rápido com pontuação 90+ no PageSpeed",
      "Modo escuro/claro adaptativo e preferências do usuário",
      "Integração com Google Analytics e Tag Manager",
      "Painel administrativo personalizado para controle total",
      "Blog otimizado com categorias e busca avançada",
      "Formulários de contato com validação avançada",
      "Chatbot inteligente para atendimento 24/7",
      "Integrações com CRM e ferramentas de marketing"
    ],
    technologies: ["React", "Next.js", "TypeScript", "TailwindCSS", "Framer Motion", "GSAP", "Node.js", "GraphQL", "Prisma", "PostgreSQL", "AWS"],
    screenshots: [
      {
        title: "Página Inicial",
        description: "Design moderno com seções interativas, animações suaves e call-to-actions estratégicos que aumentaram a taxa de conversão em 37%",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      },
      {
        title: "Página Sobre",
        description: "Apresentação da empresa com recursos visuais, linha do tempo interativa e depoimentos de colaboradores",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Portfólio de Projetos",
        description: "Galeria de casos de sucesso com filtros dinâmicos e informações detalhadas sobre cada projeto",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Blog Institucional",
        description: "Hub de conteúdo com artigos técnicos, estudos de caso e recursos educacionais para posicionamento de autoridade no mercado",
        image: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Dashboard Administrativo",
        description: "Painel completo para gestão de conteúdo, análise de métricas e acompanhamento de leads",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Versão Mobile",
        description: "Experiência otimizada para dispositivos móveis com navegação intuitiva e alta performance",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
    ],
    benefits: [
      "Aumento de 43% no tráfego orgânico em 3 meses",
      "Crescimento de 37% na taxa de conversão de leads",
      "Redução de 65% na taxa de rejeição",
      "Tempo médio no site aumentado em 2.5x",
      "Melhoria de 28% no posicionamento para palavras-chave principais",
      "Dashboard personalizado para monitoramento de KPIs em tempo real",
      "Experiência do usuário otimizada com base em testes A/B",
      "Integração com ferramentas de marketing para automação do funil de vendas"
    ],
    color: "#3B82F6"
  },
  "E-commerce": {
    title: "E-commerce",
    description: "Desenvolvimento de loja virtual completa com sistema de pagamento integrado, gestão de estoque, carrinho de compras e área do cliente. Interface intuitiva e otimizada para conversão.",
    features: [
      "Sistema de pagamento seguro",
      "Gestão de estoque em tempo real",
      "Carrinho de compras persistente",
      "Área do cliente personalizada",
      "Sistema de cupons e descontos"
    ],
    technologies: ["React", "Next.js", "Stripe", "PostgreSQL", "Redis"],
    screenshots: [
      {
        title: "Vitrine",
        description: "Layout moderno com destaque para produtos em promoção",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      },
      {
        title: "Carrinho",
        description: "Interface intuitiva para finalização de compra",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
    ],
    benefits: [
      "Aumento nas vendas online",
      "Processo de compra simplificado",
      "Gestão eficiente do estoque",
      "Análise detalhada de vendas"
    ],
    color: "#10B981"
  },
  "Aplicativo Mobile": {
    title: "Aplicativo Mobile",
    description: "Desenvolvimento de aplicativo mobile nativo para iOS e Android, com foco em performance e experiência do usuário. Integração com APIs e recursos nativos dos dispositivos.",
    features: [
      "Design nativo para iOS e Android",
      "Notificações push personalizadas",
      "Modo offline",
      "Integração com câmera e GPS",
      "Animações fluidas"
    ],
    technologies: ["React Native", "TypeScript", "Firebase", "Redux", "Jest"],
    screenshots: [
      {
        title: "Tela Principal",
        description: "Interface limpa e intuitiva",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      },
      {
        title: "Perfil",
        description: "Área personalizada do usuário",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
    ],
    benefits: [
      "Maior engajamento dos usuários",
      "Presença nas lojas de aplicativos",
      "Recursos nativos aproveitados",
      "Performance otimizada"
    ],
    color: "#8B5CF6"
  },
  "E-commerce de Moda": {
    title: "E-commerce de Moda",
    description: "Desenvolvimento de loja virtual completa com sistema de pagamento integrado, gestão de estoque, carrinho de compras e área do cliente. Interface intuitiva e otimizada para conversão.",
    features: [
      "Sistema de pagamento seguro",
      "Gestão de estoque em tempo real",
      "Carrinho de compras persistente",
      "Área do cliente personalizada",
      "Sistema de cupons e descontos"
    ],
    technologies: ["React", "Next.js", "Stripe", "PostgreSQL", "Redis"],
    screenshots: [
      {
        title: "Vitrine",
        description: "Layout moderno com destaque para produtos em promoção",
        image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      },
      {
        title: "Carrinho",
        description: "Interface intuitiva para finalização de compra",
        image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
    ],
    benefits: [
      "Aumento nas vendas online",
      "Processo de compra simplificado",
      "Gestão eficiente do estoque",
      "Análise detalhada de vendas"
    ],
    color: "#10B981"
  },
  "Aplicativo de Delivery": {
    title: "Aplicativo de Delivery",
    description: "Desenvolvimento de aplicativo mobile nativo para iOS e Android, com foco em performance e experiência do usuário. Integração com APIs e recursos nativos dos dispositivos.",
    features: [
      "Design nativo para iOS e Android",
      "Notificações push personalizadas",
      "Modo offline",
      "Integração com câmera e GPS",
      "Animações fluidas"
    ],
    technologies: ["React Native", "TypeScript", "Firebase", "Redux", "Jest"],
    screenshots: [
      {
        title: "Tela Principal",
        description: "Interface limpa e intuitiva",
        image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      },
      {
        title: "Perfil",
        description: "Área personalizada do usuário",
        image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
    ],
    benefits: [
      "Maior engajamento dos usuários",
      "Presença nas lojas de aplicativos",
      "Recursos nativos aproveitados",
      "Performance otimizada"
    ],
    color: "#8B5CF6"
  },
  "Sistema de Gestão": {
    title: "Sistema de Gestão",
    description: "Desenvolvimento de software completo para gerenciamento empresarial com módulos personalizados, relatórios avançados e integração com outros sistemas.",
    features: [
      "Dashboard personalizado",
      "Relatórios em tempo real",
      "Gestão de usuários e permissões",
      "Integração com APIs externas",
      "Backup automático"
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "Redis", "Docker"],
    screenshots: [
      {
        title: "Dashboard",
        description: "Visão geral do sistema com métricas importantes",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      },
      {
        title: "Relatórios",
        description: "Análise detalhada de dados e métricas",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
    ],
    benefits: [
      "Aumento na produtividade",
      "Melhor tomada de decisão",
      "Redução de erros operacionais",
      "Escalabilidade do negócio"
    ],
    color: "#F59E0B"
  },
  "Marketplace Regional": {
    title: "Marketplace Regional",
    description: "Desenvolvimento de plataforma que conecta vendedores locais a consumidores de forma intuitiva, com sistema de avaliações, chat integrado e gestão de pedidos.",
    features: [
      "Cadastro de vendedores",
      "Sistema de avaliações",
      "Chat em tempo real",
      "Gestão de pedidos",
      "Pagamentos seguros"
    ],
    technologies: ["React", "Next.js", "WebSocket", "MongoDB", "AWS"],
    screenshots: [
      {
        title: "Página Principal",
        description: "Interface moderna com busca avançada",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      },
      {
        title: "Perfil do Vendedor",
        description: "Área personalizada para vendedores",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
    ],
    benefits: [
      "Maior alcance para vendedores",
      "Processo de compra simplificado",
      "Comunidade ativa",
      "Crescimento do mercado local"
    ],
    color: "#EC4899"
  },
  "Landing Page de Conversão": {
    title: "Landing Page de Conversão",
    description: "Desenvolvimento de página otimizada para captura de leads com alta taxa de conversão, utilizando técnicas avançadas de UX e A/B testing.",
    features: [
      "Design persuasivo",
      "Formulários otimizados",
      "A/B testing",
      "Integração com CRM",
      "Análise de comportamento"
    ],
    technologies: ["React", "TailwindCSS", "Google Analytics", "HubSpot", "Hotjar"],
    screenshots: [
      {
        title: "Hero Section",
        description: "Design impactante com call-to-action claro",
        image: "https://images.unsplash.com/photo-1457305237443-44c3d5a30b89?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      },
      {
        title: "Formulário",
        description: "Formulário otimizado para conversão",
        image: "https://images.unsplash.com/photo-1457305237443-44c3d5a30b89?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
    ],
    benefits: [
      "Aumento na captura de leads",
      "Melhor qualificação de leads",
      "Dados de comportamento do usuário",
      "ROI mensurável"
    ],
    color: "#6366F1"
  },
  "Criação de Sites": {
    title: "Website Responsivo",
    description: "Desenvolvimento de website com design moderno e totalmente responsivo, construído com as mais recentes tecnologias web para garantir desempenho e compatibilidade em todos os dispositivos. O projeto inclui otimização para SEO, integração com redes sociais e sistema de gerenciamento de conteúdo.",
    features: [
      "Design responsivo para todas as telas",
      "Otimização para motores de busca (SEO)",
      "Carregamento rápido e progressivo",
      "Integração com Google Analytics",
      "Painel administrativo personalizado"
    ],
    technologies: ["React", "Next.js", "TailwindCSS", "Node.js", "GraphQL"],
    screenshots: [
      {
        title: "Página Inicial",
        description: "Design moderno com seções interativas e call-to-action estratégicos",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      },
      {
        title: "Página Sobre",
        description: "Apresentação da empresa com recursos visuais e linha do tempo",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Blog",
        description: "Sistema de blog com categorias, tags e comentários",
        image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
    ],
    benefits: [
      "Aumento da presença digital",
      "Melhor experiência do usuário",
      "Maior conversão de visitantes em clientes",
      "Facilidade de atualização de conteúdo",
      "Dados estatísticos sobre visitantes"
    ],
    color: "bg-primary"
  },
  "Lojas Virtuais": {
    title: "E-commerce Completo",
    description: "Desenvolvimento de loja virtual completa com foco em experiência de compra, velocidade e gestão eficiente. O projeto inclui integrações com métodos de pagamento, sistema de estoque, cupons de desconto e estratégias de upsell/cross-sell para maximizar o valor médio do pedido.",
    features: [
      "Catálogo de produtos com filtragem avançada",
      "Carrinho de compras otimizado para conversão",
      "Integração com múltiplos meios de pagamento",
      "Sistema de gerenciamento de estoque",
      "Área do cliente com histórico de pedidos"
    ],
    technologies: ["React", "Node.js", "MongoDB", "Redux", "Stripe API"],
    screenshots: [
      {
        title: "Página Inicial",
        description: "Vitrine de produtos em destaque e navegação intuitiva",
        image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      },
      {
        title: "Página de Produto",
        description: "Visualização detalhada com zoom, variações e recomendações",
        image: "https://images.unsplash.com/photo-1560243563-062bfc001d68?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Checkout",
        description: "Processo de compra simplificado em uma única página",
        image: "https://images.unsplash.com/photo-1561069934-eee225952461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
    ],
    benefits: [
      "Aumento das vendas online",
      "Melhor gestão de estoque e pedidos",
      "Redução do abandono de carrinho",
      "Aumento do ticket médio",
      "Análise de comportamento do cliente"
    ],
    color: "bg-secondary"
  },
  "Aplicativos": {
    title: "Aplicativo Mobile Multiplataforma",
    description: "Desenvolvimento de aplicativo nativo para iOS e Android com experiência de usuário fluida e performance excepcional. O projeto inclui recursos offline, notificações push e integrações com APIs externas para proporcionar uma solução completa e escalável.",
    features: [
      "Interface nativa para iOS e Android",
      "Sincronização de dados em tempo real",
      "Suporte a modo offline",
      "Notificações push personalizadas",
      "Login social e autenticação segura"
    ],
    technologies: ["React Native", "Firebase", "Redux", "TypeScript", "Node.js"],
    screenshots: [
      {
        title: "Tela Inicial",
        description: "Dashboard personalizado com ações rápidas",
        image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      },
      {
        title: "Perfil de Usuário",
        description: "Área de usuário com preferências e histórico",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Recursos Interativos",
        description: "Funcionalidades específicas como mapas e gráficos",
        image: "https://images.unsplash.com/photo-1601972599720-36938d4ecd31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
    ],
    benefits: [
      "Presença nos principais marketplaces de apps",
      "Engajamento contínuo com usuários",
      "Coleta de dados e métricas valiosas",
      "Funcionamento offline para usuários sem conexão",
      "Interatividade e recursos exclusivos para mobile"
    ],
    color: "bg-accent"
  },
  "Marketing Digital": {
    title: "Estratégia Completa de Marketing Digital",
    description: "Desenvolvimento e implementação de estratégia completa de marketing digital para aumentar visibilidade, gerar leads qualificados e converter em vendas. O projeto inclui SEO, marketing de conteúdo, mídias sociais, email marketing e campanhas de mídia paga.",
    features: [
      "Análise de concorrência e público-alvo",
      "Otimização para motores de busca (SEO)",
      "Gestão de redes sociais e conteúdo",
      "Campanhas de mídia paga (Google Ads, Meta)",
      "Automação de email marketing"
    ],
    technologies: ["Google Analytics", "SEMrush", "HubSpot", "Meta Business Suite", "MailChimp"],
    screenshots: [
      {
        title: "Dashboard de Resultados",
        description: "Painel com métricas e KPIs de desempenho",
        image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Planejamento de Conteúdo",
        description: "Calendário editorial e estratégia de distribuição",
        image: "https://images.unsplash.com/photo-1432888622747-4a4d58e83b64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Campanhas de Anúncios",
        description: "Estrutura de campanhas segmentadas por público",
        image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
    ],
    benefits: [
      "Aumento do tráfego qualificado",
      "Melhoria no posicionamento nos buscadores",
      "Geração de leads com maior potencial de conversão",
      "Construção de autoridade no mercado",
      "ROI mensurável e escalável"
    ],
    color: "bg-primary-light"
  },
  "Sistemas Personalizados": {
    title: "Sistema de Gestão Empresarial",
    description: "Desenvolvimento de sistema personalizado para otimização de processos internos e gestão eficiente de recursos. O projeto inclui análise de requisitos, modelagem de dados, desenvolvimento de módulos específicos e integração com sistemas existentes.",
    features: [
      "Módulos personalizados para cada departamento",
      "Fluxos de trabalho automatizados",
      "Relatórios e dashboards gerenciais",
      "Controle de acesso por níveis de permissão",
      "Integração com sistemas legados"
    ],
    technologies: ["Vue.js", "Laravel", "PostgreSQL", "Docker", "AWS"],
    screenshots: [
      {
        title: "Dashboard Gerencial",
        description: "Visão consolidada de indicadores e alertas",
        image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Gestão de Projetos",
        description: "Módulo de acompanhamento de projetos e recursos",
        image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Relatórios Avançados",
        description: "Sistema de relatórios personalizáveis com exportação",
        image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
    ],
    benefits: [
      "Redução de processos manuais e erros",
      "Aumento da produtividade da equipe",
      "Centralização de informações empresariais",
      "Tomada de decisão baseada em dados",
      "Escalabilidade para crescimento do negócio"
    ],
    color: "bg-secondary-dark"
  }
};

const ProjectDetailPage = () => {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(location.split('?')[1] || '');
  const serviceName = searchParams.get('service') || '';
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState("overview");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const projectRef = useRef<HTMLDivElement>(null);
  const screenslideRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPosition({
      x: e.clientX,
      y: e.clientY
    });
  };
  
  const project = serviceProjects[serviceName] || {
    title: "Projeto não encontrado",
    description: "O projeto solicitado não está disponível.",
    features: [],
    technologies: [],
    screenshots: [],
    benefits: [],
    color: "#6b7280"
  };
  
  // Register ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);
  
  // Use useEffect instead of useGSAP to avoid type issues
  useEffect(() => {
    if (projectRef.current) {
      // Project title animation
      gsap.from(".project-title", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out"
      });
      
      // Project description animation
      gsap.from(".project-description", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.2,
        ease: "power2.out"
      });
      
      // Tab navigation animation
      gsap.from(".tab-nav", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.3,
        stagger: 0.1,
        ease: "power2.out"
      });
      
      // Features list staggered animation
      gsap.from(".feature-item", {
        opacity: 0,
        x: -20,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".features-list",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
      
      // Technologies list animation
      gsap.from(".tech-item", {
        opacity: 0,
        scale: 0.9,
        duration: 0.5,
        stagger: 0.07,
        scrollTrigger: {
          trigger: ".tech-stack",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
      
      // Benefits animation
      gsap.from(".benefit-item", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".benefits-list",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
      
      // Screenshot carousel animation
      if (project.screenshots.length > 0) {
        gsap.from(".screenshot-carousel", {
          opacity: 0,
          y: 40,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".screenshots-section",
            start: "top 80%",
            toggleActions: "play none none none"
          }
        });
        
        // 3D rotation for screenshot carousel - fix for null check
        if (screenslideRef.current) {
          gsap.to(".screenshot-slide", {
            xPercent: -100 * (project.screenshots.length - 1),
            ease: "none",
            scrollTrigger: {
              trigger: screenslideRef.current,
              pin: true,
              scrub: 1,
              end: () => {
                return screenslideRef.current ? 
                  "+=" + screenslideRef.current.offsetWidth * (project.screenshots.length - 1) : 
                  "+=1000";
              }
            }
          });
        }
      }
      
      // Clean up ScrollTrigger when component unmounts
      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }
  }, [project.screenshots.length]);
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === project.screenshots.length - 1 ? 0 : prev + 1
    );
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? project.screenshots.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    // Set page title based on project
    document.title = `${project.title} | VW Tech`;
  }, [project]);

  // Check if the project exists
  if (!serviceName || !serviceProjects[serviceName]) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Projeto não encontrado</h1>
          <p className="text-muted-foreground mb-8">O projeto que você está procurando não está disponível.</p>
          <Link href="/portfolio">
            <Button>Ver todos os projetos</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onMouseMove={handleMouseMove}
      className="relative"
    >
      <Helmet>
        <title>{project.title} | VW Tech Portfolio</title>
        <meta name="description" content={project.description} />
      </Helmet>
      
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div 
          className="absolute w-96 h-96 rounded-full filter blur-3xl opacity-10"
          style={{ 
            background: project.color || "#3B82F6", 
            top: cursorPosition.y / 5, 
            left: cursorPosition.x / 5
          }}
        />
        <div 
          className="absolute w-80 h-80 rounded-full filter blur-3xl opacity-10"
          style={{ 
            background: "#4c1d95", 
            bottom: cursorPosition.y / 8, 
            right: cursorPosition.x / 8
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 py-32" ref={projectRef}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <Button 
              variant="ghost" 
              size="sm" 
              asChild
              className="mb-6 hover:bg-background/80"
            >
              <Link href="/portfolio">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Voltar ao Portfólio
              </Link>
            </Button>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="project-title text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{project.title}</h1>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-8"></div>
              <p className="project-description text-xl text-muted-foreground max-w-3xl mx-auto">{project.description}</p>
            </motion.div>
            
            <div className="flex justify-center mt-10 space-x-4 border-b border-gray-200 dark:border-gray-800">
              <motion.button
                className={`tab-nav px-4 py-3 text-lg font-medium border-b-2 transition-colors ${activeTab === "overview" ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}
                onClick={() => setActiveTab("overview")}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                Visão Geral
              </motion.button>
              <motion.button
                className={`tab-nav px-4 py-3 text-lg font-medium border-b-2 transition-colors ${activeTab === "screenshots" ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}
                onClick={() => setActiveTab("screenshots")}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                Capturas de Tela
              </motion.button>
              <motion.button
                className={`tab-nav px-4 py-3 text-lg font-medium border-b-2 transition-colors ${activeTab === "technologies" ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}
                onClick={() => setActiveTab("technologies")}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                Tecnologias
              </motion.button>
              <motion.button
                className={`tab-nav px-4 py-3 text-lg font-medium border-b-2 transition-colors ${activeTab === "results" ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}
                onClick={() => setActiveTab("results")}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                Resultados
              </motion.button>
            </div>
          </div>
          
          {/* Overview Section */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-2xl font-bold mb-6 text-foreground">Funcionalidades Principais</h2>
                <ul className="features-list space-y-4">
                  {project.features.map((feature, index) => (
                    <motion.li 
                      key={index}
                      className="feature-item flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="rounded-full p-1 bg-primary/10 mr-3 mt-1 flex-shrink-0">
                        <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-6 text-foreground">Resultados & Benefícios</h2>
                <ul className="benefits-list space-y-4">
                  {project.benefits.map((benefit, index) => (
                    <motion.li 
                      key={index}
                      className="benefit-item flex items-start"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="rounded-full p-1 bg-secondary/10 mr-3 mt-1 flex-shrink-0">
                        <svg className="w-4 h-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                      <span>{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          
          {/* Screenshots Section */}
          {activeTab === "screenshots" && (
            <div className="screenshots-section">
              <h2 className="text-2xl font-bold mb-8 text-foreground">Capturas de Tela</h2>
              
              {project.screenshots.length > 0 && (
                <div className="relative screenshot-carousel">
                  <div className="relative overflow-hidden rounded-xl shadow-2xl">
                    <motion.div
                      className="screenshot-current relative"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <img 
                        src={project.screenshots[currentImageIndex].image} 
                        alt={project.screenshots[currentImageIndex].title}
                        className="w-full h-auto"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                        <h3 className="font-bold text-xl mb-2">{project.screenshots[currentImageIndex].title}</h3>
                        <p className="text-white/80">{project.screenshots[currentImageIndex].description}</p>
                      </div>
                    </motion.div>
                    
                    {/* Navigation Arrows */}
                    <button 
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-colors"
                      aria-label="Anterior"
                    >
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-colors"
                      aria-label="Próximo"
                    >
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Thumbnail Navigation */}
                  <div className="flex mt-6 space-x-4 justify-center">
                    {project.screenshots.map((screenshot, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${index === currentImageIndex ? 'border-primary scale-110 shadow-lg' : 'border-transparent opacity-60'}`}
                      >
                        <img
                          src={screenshot.image}
                          alt={`Miniatura ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Technologies Section */}
          {activeTab === "technologies" && (
            <div>
              <h2 className="text-2xl font-bold mb-8 text-foreground">Stack Tecnológica</h2>
              
              <div className="tech-stack grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {project.technologies.map((tech, index) => (
                  <motion.div
                    key={index}
                    className="tech-item bg-background rounded-lg p-4 border border-input text-center hover:border-primary/50 transition-colors"
                    whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)" }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="tech-icon w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                      {/* Tech icons would go here in a real implementation */}
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/50 flex items-center justify-center">
                        <span className="text-lg font-bold text-primary">{tech.charAt(0)}</span>
                      </div>
                    </div>
                    <h3 className="font-medium">{tech}</h3>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-16">
                <h2 className="text-2xl font-bold mb-6 text-foreground">Processo de Desenvolvimento</h2>
                <div className="relative pl-8 border-l-2 border-muted">
                  {[
                    { title: "Planejamento e UX Design", description: "Definição da arquitetura, fluxos de usuário e wireframes" },
                    { title: "UI Design e Prototipagem", description: "Criação da identidade visual e protótipos interativos" },
                    { title: "Desenvolvimento Frontend", description: "Implementação da interface e animações responsivas" },
                    { title: "Desenvolvimento Backend", description: "Criação de APIs e integração com banco de dados" },
                    { title: "Testes e Otimização", description: "Testes de usabilidade, performance e compatibilidade" },
                    { title: "Lançamento e Monitoramento", description: "Implementação de analytics e melhorias contínuas" }
                  ].map((step, index) => (
                    <div key={index} className="mb-8 relative">
                      <div className="absolute -left-10 w-5 h-5 rounded-full bg-primary border-4 border-background"></div>
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Results Section */}
          {activeTab === "results" && (
            <div>
              <h2 className="text-2xl font-bold mb-8 text-foreground">Resultados & Métricas</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {[
                  { metric: "+43%", label: "Tráfego Orgânico", icon: "chart-line" },
                  { metric: "+37%", label: "Taxa de Conversão", icon: "percentage" },
                  { metric: "-65%", label: "Taxa de Rejeição", icon: "arrow-down" },
                  { metric: "x2.5", label: "Tempo no Site", icon: "clock" },
                  { metric: "+28%", label: "Posicionamento SEO", icon: "search" },
                  { metric: "90+", label: "PageSpeed Score", icon: "tachometer-alt" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-background rounded-xl p-6 border border-input hover:border-primary/50 transition-all"
                    whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)" }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <h3 className="text-3xl font-bold mb-1">{item.metric}</h3>
                    <p className="text-muted-foreground">{item.label}</p>
                  </motion.div>
                ))}
              </div>
              
              <div className="bg-card rounded-xl p-8 border border-input">
                <h3 className="text-2xl font-bold mb-6">Depoimento do Cliente</h3>
                <blockquote className="text-lg italic mb-6">
                  "A VW Tech superou todas as nossas expectativas. O novo site não apenas tem um design incrível, mas também gerou resultados mensuráveis para o nosso negócio. A equipe foi extremamente profissional e atenciosa do início ao fim do projeto."
                </blockquote>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 mr-4 flex items-center justify-center font-bold text-primary">
                    TS
                  </div>
                  <div>
                    <p className="font-medium">Thiago Silva</p>
                    <p className="text-sm text-muted-foreground">CEO, TechSolutions</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-20 text-center">
            <h2 className="text-2xl font-bold mb-6">Pronto para transformar sua presença digital?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Vamos criar uma solução personalizada que atenda às necessidades específicas do seu negócio e impulsione seus resultados.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/contact">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg shadow-lg">
                  Solicitar um Orçamento
                  <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetailPage;