import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useParams, Link } from 'wouter';
import { Helmet } from 'react-helmet';
import gsap from 'gsap';
import { useGSAP } from '@/hooks/use-gsap';

const ProjectDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<any>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);
  
  // Hardcoded project data based on the URL slug
  const projectsData = [
    {
      id: 'website-corporativo',
      title: 'Website Corporativo',
      subtitle: 'Desenvolvimento de site institucional moderno',
      description: 'Criamos um site institucional responsivo e otimizado para SEO, com design moderno e focado na experiência do usuário. O projeto incluiu desenvolvimento de identidade visual, estratégia de conteúdo e integração com ferramentas de analytics.',
      client: 'Tech Solutions Inc.',
      services: ['Desenvolvimento Web', 'Design UX/UI', 'SEO', 'Branding Digital'],
      technologies: ['React', 'Next.js', 'TailwindCSS', 'Node.js', 'MongoDB'],
      results: ['Aumento de 210% no tráfego orgânico', '+45% no tempo médio de sessão', 'Redução de 35% na taxa de rejeição'],
      mainImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      images: [
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      // Protótipo de projeto com visualizações
      prototype: {
        title: 'Tech Solutions Website',
        description: 'Website corporativo com foco em UX e performance',
        views: [
          {
            name: 'Home',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            description: 'Página inicial com hero section e destaque para principais serviços'
          },
          {
            name: 'Sobre',
            image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            description: 'Página sobre a empresa com infográficos interativos e linha do tempo'
          },
          {
            name: 'Serviços',
            image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            description: 'Seção de serviços com cards interativos e CTA para cada serviço'
          }
        ],
        features: [
          'Carregamento progressivo para melhor performance',
          'Design responsivo para todas as telas',
          'Integração com Google Analytics e Tag Manager',
          'Sistema de blog com taxonomia personalizada'
        ]
      },
      testimonial: {
        quote: 'A equipe da VW Tech entendeu nossa visão desde o primeiro dia. O resultado foi um site que não só tem uma aparência incrível, mas também trouxe resultados tangíveis para nosso negócio.',
        author: 'Ricardo Mendes',
        role: 'CEO, Tech Solutions Inc.'
      },
      year: '2024',
      ctaColor: 'bg-primary'
    },
    {
      id: 'e-commerce-de-moda',
      title: 'E-commerce de Moda',
      subtitle: 'Loja virtual completa com gestão de estoque',
      description: 'Desenvolvemos uma loja virtual completa para o segmento de moda, com foco em experiência de compra, velocidade e sistema integrado de gestão de estoque e pagamentos. O projeto incluiu personalização completa de tema, integração com gateways de pagamento e configuração de métricas para otimização de conversão.',
      client: 'Fashion Forward',
      services: ['E-commerce', 'Web Design', 'Integrações de API', 'Gestão de Pagamentos'],
      technologies: ['Shopify', 'React', 'Node.js', 'MySQL', 'AWS'],
      // Protótipo de projeto com visualizações
      prototype: {
        title: 'Fashion Forward Store',
        description: 'E-commerce de moda com sistema integrado de gestão',
        views: [
          {
            name: 'Home',
            image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            description: 'Página inicial com carrossel de produtos em destaque e navegação por categorias'
          },
          {
            name: 'Categoria',
            image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            description: 'Página de categoria com filtros avançados e visualização por grid/lista'
          },
          {
            name: 'Produto',
            image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            description: 'Página de produto com zoom, múltiplas imagens e recomendações relacionadas'
          },
          {
            name: 'Carrinho',
            image: 'https://images.unsplash.com/photo-1580813089778-69e992256a5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            description: 'Carrinho de compras com processo de checkout simplificado em uma página'
          }
        ],
        features: [
          'Integração com múltiplos gateways de pagamento',
          'Sistema de gerenciamento de estoque em tempo real',
          'Recomendações de produtos por IA',
          'Checkout simplificado com análise de abandono',
          'Rastreamento de pedidos integrado'
        ]
      },
      results: ['Aumento de 180% nas vendas online', 'Redução de 25% no tempo de checkout', 'Aumento de 40% no valor médio do pedido'],
      mainImage: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      images: [
        'https://images.unsplash.com/photo-1560243563-062bfc001d68?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1561069934-eee225952461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      testimonial: {
        quote: 'Nossa nova loja virtual não só é bonita, mas também extremamente funcional. Vimos um aumento imediato nas vendas desde o lançamento e o feedback dos clientes tem sido incrível.',
        author: 'Amanda Torres',
        role: 'Diretora de Marketing, Fashion Forward'
      },
      year: '2023',
      ctaColor: 'bg-secondary'
    },
    {
      id: 'aplicativo-de-delivery',
      title: 'Aplicativo de Delivery',
      subtitle: 'App para iOS e Android com rastreamento em tempo real',
      description: 'Desenvolvemos um aplicativo de delivery completo para iOS e Android, com foco em usabilidade e recursos de rastreamento em tempo real. O projeto incluiu desenvolvimento de APIs robustas, sistema de notificações em tempo real e interface intuitiva para clientes e entregadores.',
      client: 'Express Food',
      services: ['Desenvolvimento de Aplicativo', 'UX/UI Design', 'Desenvolvimento de API', 'Integrações de Pagamento'],
      technologies: ['React Native', 'Node.js', 'Firebase', 'MongoDB', 'Google Maps API'],
      results: ['Mais de 50.000 downloads em 3 meses', 'Aumento de 150% no número de pedidos', 'Redução de 30% no tempo médio de entrega'],
      mainImage: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      images: [
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1601972599720-36938d4ecd31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      // Protótipo de projeto com visualizações
      prototype: {
        title: 'Express Food Delivery',
        description: 'Aplicativo de delivery para iOS e Android com rastreamento em tempo real',
        views: [
          {
            name: 'Home',
            image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            description: 'Tela inicial com restaurantes próximos e categorias populares'
          },
          {
            name: 'Restaurante',
            image: 'https://images.unsplash.com/photo-1601972599720-36938d4ecd31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            description: 'Página do restaurante com menu, avaliações e informações'
          },
          {
            name: 'Carrinho',
            image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            description: 'Carrinho de compras com opções de pagamento e endereço'
          },
          {
            name: 'Rastreamento',
            image: 'https://images.unsplash.com/photo-1605152276897-4f618f831968?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            description: 'Rastreamento em tempo real do pedido com mapa interativo'
          }
        ],
        features: [
          'Rastreamento em tempo real via GPS',
          'Múltiplos métodos de pagamento',
          'Sistema de avaliação para entregadores e restaurantes',
          'Notificações push em tempo real',
          'Chat integrado com entregador'
        ]
      },
      testimonial: {
        quote: 'O aplicativo transformou completamente nosso negócio. O sistema de rastreamento em tempo real não só melhorou nossa eficiência operacional, mas também a satisfação dos clientes.',
        author: 'Lucas Vieira',
        role: 'Fundador, Express Food'
      },
      year: '2023',
      ctaColor: 'bg-accent'
    },
    {
      id: 'sistema-de-gestão',
      title: 'Sistema de Gestão',
      subtitle: 'Software empresarial com módulos personalizados',
      description: 'Desenvolvemos um sistema de gestão empresarial completo com módulos personalizados para atender às necessidades específicas do cliente. O projeto incluiu análise de processos, desenvolvimento de soluções customizadas e implementação de fluxos de trabalho otimizados.',
      client: 'Business Solutions',
      services: ['Desenvolvimento de Software', 'Análise de Processos', 'Integração de Sistemas', 'Consultoria'],
      technologies: ['Vue.js', 'Laravel', 'PostgreSQL', 'Docker', 'AWS'],
      results: ['Redução de 40% no tempo de processamento de pedidos', 'Economia de 35% em custos operacionais', 'Aumento de 25% na produtividade da equipe'],
      mainImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      images: [
        'https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      testimonial: {
        quote: 'O sistema desenvolvido pela VW Tech não só atendeu como superou nossas expectativas. A atenção aos detalhes e o entendimento profundo de nossos processos resultaram em uma solução que realmente fez diferença em nossa operação.',
        author: 'Renata Oliveira',
        role: 'Diretora de Operações, Business Solutions'
      },
      year: '2023',
      ctaColor: 'bg-primary-light'
    },
    {
      id: 'marketplace-regional',
      title: 'Marketplace Regional',
      subtitle: 'Plataforma conectando vendedores locais a consumidores',
      description: 'Desenvolvemos uma plataforma de marketplace focada em conectar vendedores locais a consumidores de forma intuitiva e eficiente. O projeto incluiu desenvolvimento de funcionalidades de busca avançada, sistema de avaliações e ferramentas para vendedores gerenciarem seus produtos e pedidos.',
      client: 'Local Market',
      services: ['Desenvolvimento Web', 'UX/UI Design', 'Desenvolvimento de API', 'Sistemas de Pagamento'],
      technologies: ['React', 'Node.js', 'GraphQL', 'MongoDB', 'AWS'],
      results: ['Mais de 500 vendedores cadastrados no primeiro mês', 'Crescimento de 200% em transações em 6 meses', 'Taxa de retenção de usuários de 65%'],
      mainImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      images: [
        'https://images.unsplash.com/photo-1516321165247-4aa89a48be28?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1524050946488-2a67bde8fa7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      testimonial: {
        quote: 'A plataforma transformou o comércio local em nossa região. Pequenos vendedores agora têm acesso a um mercado muito maior, e os consumidores adoram a facilidade de encontrar produtos locais de qualidade.',
        author: 'Carlos Santos',
        role: 'CEO, Local Market'
      },
      year: '2022',
      ctaColor: 'bg-secondary-dark'
    },
    {
      id: 'landing-page-de-conversão',
      title: 'Landing Page de Conversão',
      subtitle: 'Página otimizada para captura de leads',
      description: 'Desenvolvemos uma landing page estrategicamente projetada para maximizar a conversão de visitantes em leads qualificados. O projeto incluiu testes A/B, otimização para SEO e integração com sistemas de automação de marketing para um funil de vendas eficiente.',
      client: 'Growth Marketing',
      services: ['Web Design', 'Otimização de Conversão', 'SEO', 'Automação de Marketing'],
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'HubSpot', 'Google Analytics'],
      results: ['Taxa de conversão de 28% (15% acima da média do setor)', 'Redução de 45% no custo por lead', 'Aumento de 65% na qualidade dos leads'],
      mainImage: 'https://images.unsplash.com/photo-1457305237443-44c3d5a30b89?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      images: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      testimonial: {
        quote: 'Os resultados superaram todas as nossas expectativas. Não apenas tivemos um aumento significativo no número de leads, mas também vimos uma melhoria na qualidade, o que impactou diretamente nossa receita.',
        author: 'Juliana Martins',
        role: 'CMO, Growth Marketing'
      },
      year: '2022',
      ctaColor: 'bg-accent'
    }
  ];

  useEffect(() => {
    // Find the project that matches the URL parameter
    const foundProject = projectsData.find(p => p.id === id);
    if (foundProject) {
      setProject(foundProject);
      document.title = `${foundProject.title} | VW Tech`;
    }
  }, [id]);

  // Animations using GSAP
  useGSAP(() => {
    if (headerRef.current && contentRef.current) {
      const tl = gsap.timeline();
      
      tl.from('.project-title', { 
        y: 50, 
        opacity: 0, 
        duration: 0.8, 
        ease: 'power3.out' 
      });
      
      tl.from('.project-subtitle', { 
        y: 30, 
        opacity: 0, 
        duration: 0.8, 
        ease: 'power3.out' 
      }, '-=0.6');
      
      tl.from('.project-image', { 
        y: 30, 
        opacity: 0, 
        duration: 0.8, 
        ease: 'power3.out' 
      }, '-=0.6');
      
      gsap.from('.content-section', {
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out'
      });
      
      gsap.from('.gallery-image', {
        scrollTrigger: {
          trigger: '.gallery-section',
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out'
      });
    }
  }, [headerRef, contentRef, project]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Projeto não encontrado</h1>
          <p className="text-muted-foreground mb-6">O projeto que você está procurando não existe ou foi removido.</p>
          <Link href="/portfolio">
            <Button className="bg-primary text-white">Voltar para o portfólio</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{project.title} | VW Tech</title>
        <meta name="description" content={project.description.substring(0, 160)} />
      </Helmet>
      
      <div className="bg-muted min-h-screen">
        {/* Hero Header */}
        <motion.div 
          ref={headerRef}
          className="relative h-[70vh] bg-black"
          style={{ opacity, scale }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ 
              backgroundImage: `url(${project.mainImage})`,
              filter: 'brightness(0.5) blur(2px)',
              transform: 'scale(1.05)'
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          
          <div className="container mx-auto px-4 h-full relative z-10 flex flex-col justify-end pb-16">
            <motion.h1 
              className="project-title text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {project.title}
            </motion.h1>
            <motion.p 
              className="project-subtitle text-xl text-gray-200 max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {project.subtitle}
            </motion.p>
            
            <div className="flex flex-wrap gap-3 mt-6">
              {project.services.map((service, index) => (
                <motion.span 
                  key={index}
                  className="bg-white/10 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                >
                  {service}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Project Content */}
        <div ref={contentRef} className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="content-section bg-white rounded-xl p-8 shadow-md mb-10">
                <h2 className="text-2xl font-bold mb-4">Sobre o Projeto</h2>
                <p className="text-muted-foreground mb-6">{project.description}</p>
                
                <h3 className="text-xl font-semibold mb-3">Resultados Alcançados</h3>
                <ul className="list-disc pl-5 mb-6 space-y-2">
                  {project.results.map((result, index) => (
                    <li key={index} className="text-muted-foreground">{result}</li>
                  ))}
                </ul>
              </div>
              
              {/* Seção de Protótipo */}
              {'prototype' in project && (
                <div className="content-section bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl border border-gray-100 shadow-md mb-10">
                  <h2 className="text-2xl font-bold mb-4">Protótipo do Projeto</h2>
                  <p className="text-muted-foreground mb-8">{project.prototype?.description}</p>
                  
                  <div className="space-y-8">
                    {/* Visualizações do Protótipo */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Visualizações</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {project.prototype?.views.map((view: any, index: number) => (
                          <div 
                            key={index}
                            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
                          >
                            <div className="relative">
                              <img 
                                src={view.image} 
                                alt={view.name} 
                                className="w-full h-48 object-cover"
                              />
                              <div className="absolute top-2 left-2 bg-black/70 px-3 py-1 rounded-full">
                                <span className="text-white text-xs font-semibold">{view.name}</span>
                              </div>
                            </div>
                            <div className="p-4">
                              <p className="text-sm text-muted-foreground">{view.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Funcionalidades */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Funcionalidades</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {project.prototype?.features.map((feature: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Gallery */}
              <div className="gallery-section mb-10">
                <h2 className="text-2xl font-bold mb-6">Galeria do Projeto</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.images.map((image, index) => (
                    <motion.div 
                      key={index} 
                      className="gallery-image overflow-hidden rounded-xl shadow-md"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img 
                        src={image} 
                        alt={`${project.title} - Imagem ${index + 1}`} 
                        className="w-full h-64 object-cover transition-transform hover:scale-105"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Testimonial */}
              <motion.div 
                className="content-section bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-8 shadow-md mb-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex flex-col items-center text-center">
                  <svg className="w-12 h-12 text-primary/30 mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-lg italic mb-4">{project.testimonial.quote}</p>
                  <div>
                    <p className="font-semibold">{project.testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{project.testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="content-section bg-white rounded-xl p-8 shadow-md mb-6 sticky top-24">
                <h2 className="text-2xl font-bold mb-6">Detalhes do Projeto</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Cliente</h3>
                    <p className="font-medium">{project.client}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Ano</h3>
                    <p className="font-medium">{project.year}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Serviços</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.services.map((service, index) => (
                        <span key={index} className="bg-muted text-xs px-2 py-1 rounded-md">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Tecnologias</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-md">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Link href="/contact">
                      <Button className={`w-full ${project.ctaColor} text-white`}>
                        Quero um projeto como este
                      </Button>
                    </Link>
                  </div>
                  
                  <div>
                    <Link href="/portfolio">
                      <Button variant="outline" className="w-full">
                        Ver mais projetos
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetailPage;