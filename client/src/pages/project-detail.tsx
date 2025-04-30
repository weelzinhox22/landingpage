import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'wouter';
import { Helmet } from 'react-helmet';
import gsap from 'gsap';
import { useGSAP } from '@/hooks/use-gsap';

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
    description: "Desenvolvimento de site institucional com design moderno e responsivo, focado em apresentar a empresa de forma profissional e atraente. O projeto inclui otimização para SEO, integração com redes sociais e sistema de gerenciamento de conteúdo.",
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
      }
    ],
    benefits: [
      "Maior credibilidade e profissionalismo",
      "Melhor visibilidade nos motores de busca",
      "Experiência do usuário otimizada",
      "Facilidade de manutenção e atualização"
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
  const searchParams = new URLSearchParams(location.split('?')[1]);
  const serviceName = searchParams.get('service');
  
  const project = serviceName ? serviceProjects[serviceName] : null;

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Projeto não encontrado</h1>
          <p className="text-gray-600 mb-8">O projeto que você está procurando não existe.</p>
          <Link href="/">
            <Button>Voltar para a página inicial</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{serviceName} | VW Tech</title>
        <meta name="description" content={project.description} />
      </Helmet>
      
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div 
          className={`relative ${project.color} text-white overflow-hidden`}
        >
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/10 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
          </div>
          
          <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
            <div className="max-w-4xl mx-auto">
              <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Voltar
              </Link>
              
              <h1 className="project-title text-4xl md:text-6xl font-bold mb-4">
                {serviceName}
              </h1>
              
              <h2 className="project-subtitle text-xl md:text-2xl font-medium mb-8 text-white/90">
                {project.title}
              </h2>
              
              <div className="project-header-content bg-white/10 backdrop-blur-md rounded-xl p-6 md:p-8 shadow-xl">
                <p className="text-lg md:text-xl leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-16">
          {/* Principais características */}
          <div className="features-section mb-20">
            <h3 className="section-title text-3xl font-bold mb-8 text-gray-900">
              Principais Características
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.features.map((feature, index) => (
                <div 
                  key={index} 
                  className="feature-item bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100"
                >
                  <div className="flex items-start">
                    <div className={`${project.color} text-white rounded-full p-2 mr-4`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-lg text-gray-800 font-medium">{feature}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Screenshots */}
          <div className="screenshots-section mb-20">
            <h3 className="section-title text-3xl font-bold mb-8 text-gray-900">
              Visualizações do Projeto
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {project.screenshots.map((screenshot, index) => (
                <div 
                  key={index} 
                  className="screenshot-item group overflow-hidden rounded-xl shadow-lg"
                >
                  <div className="relative">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img 
                        src={screenshot.image} 
                        alt={screenshot.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 p-6 text-white">
                        <h4 className="text-xl font-semibold mb-2">{screenshot.title}</h4>
                        <p className="text-sm text-white/80">{screenshot.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 bg-white">
                    <h4 className="text-xl font-semibold mb-2 text-gray-800">{screenshot.title}</h4>
                    <p className="text-gray-600">{screenshot.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Tecnologias */}
          <div className="tech-section mb-20">
            <h3 className="section-title text-3xl font-bold mb-8 text-gray-900">
              Tecnologias Utilizadas
            </h3>
            
            <div className="flex flex-wrap gap-4">
              {project.technologies.map((tech, index) => (
                <div 
                  key={index} 
                  className="tech-item px-6 py-3 bg-gray-100 rounded-full text-gray-800 font-medium hover:bg-gray-200 transition-colors"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
          
          {/* Benefícios */}
          <div className="benefits-section mb-20">
            <h3 className="section-title text-3xl font-bold mb-8 text-gray-900">
              Benefícios
            </h3>
            
            <div className="bg-gray-50 rounded-xl p-8">
              <ul className="space-y-4">
                {project.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <div className={`${project.color} text-white rounded-full p-1 mr-4 mt-1`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-lg text-gray-800">{benefit}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="cta-section bg-gray-50 rounded-xl p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
              Pronto para impulsionar seu negócio?
            </h3>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
              Entre em contato conosco hoje mesmo e descubra como podemos ajudar a transformar suas ideias em realidade.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className={`${project.color} hover:opacity-90 text-white px-8 py-3 rounded-lg text-lg font-medium shadow-lg`}>
                  Solicitar Orçamento
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="outline" className="border-2 border-gray-300 hover:bg-gray-100 px-8 py-3 rounded-lg text-lg font-medium">
                  Ver Outros Projetos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetailPage;