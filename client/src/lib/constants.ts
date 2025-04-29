// Color configuration
export const COLORS = {
  primary: {
    DEFAULT: '#5928E5',
    light: '#7649F0',
    dark: '#4718C5'
  },
  secondary: {
    DEFAULT: '#03DAC5',
    light: '#4FF7E3',
    dark: '#018786'
  },
  accent: {
    DEFAULT: '#9D4EDD',
    light: '#BB86FC'
  },
  neutral: {
    dark: '#1E1E24',
    medium: '#6E6E78',
    light: '#F5F5F7'
  }
};

// Navigation items
export const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'Quem Somos', path: '/about' },
  { label: 'Serviços', path: '/services' },
  { label: 'Portfólio', path: '/portfolio' },
  { label: 'Planos', path: '/pricing' },
  { label: 'Contato', path: '/contact' }
];

// Service categories
export const SERVICE_CATEGORIES = [
  'Todos',
  'Websites',
  'E-commerce',
  'Aplicativos',
  'Marketing'
];

// Services data
export const SERVICES = [
  {
    title: "Criação de Sites",
    description: "Websites responsivos e otimizados para mecanismos de busca, garantindo maior visibilidade e conversão.",
    icon: "fas fa-laptop-code",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    color: "bg-primary",
    category: "Websites"
  },
  {
    title: "Lojas Virtuais",
    description: "E-commerces completos e integrados com sistemas de pagamento, aumentando suas vendas online.",
    icon: "fas fa-shopping-cart",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    color: "bg-secondary",
    category: "E-commerce"
  },
  {
    title: "Aplicativos",
    description: "Desenvolvimento de apps nativos para Android e iOS que oferecem experiências excepcionais.",
    icon: "fas fa-mobile-alt",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    color: "bg-accent",
    category: "Aplicativos"
  },
  {
    title: "Marketing Digital",
    description: "Estratégias de marketing que aumentam sua presença online e atraem clientes qualificados.",
    icon: "fas fa-bullhorn",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    color: "bg-primary-light",
    category: "Marketing"
  },
  {
    title: "Sistemas Personalizados",
    description: "Soluções sob medida para otimizar processos e melhorar a gestão do seu negócio.",
    icon: "fas fa-cogs",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    color: "bg-secondary-dark",
    category: "Websites"
  }
];

// Portfolio data
export const PORTFOLIO_ITEMS = [
  {
    title: "Website Corporativo",
    description: "Desenvolvimento de site institucional com design moderno e responsivo.",
    image: "https://images.unsplash.com/photo-1575586238819-970defb4105d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "Websites",
    ctaColor: "bg-primary"
  },
  {
    title: "E-commerce de Moda",
    description: "Loja virtual completa com gestão de estoque e integrações de pagamento.",
    image: "https://images.unsplash.com/photo-1629643501837-4cafc2809664?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "E-commerce",
    ctaColor: "bg-secondary"
  },
  {
    title: "Aplicativo de Delivery",
    description: "App para iOS e Android para entrega de alimentos com rastreamento em tempo real.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "Aplicativos",
    ctaColor: "bg-accent"
  },
  {
    title: "Sistema de Gestão",
    description: "Software completo para gerenciamento empresarial com módulos personalizados.",
    image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "Websites",
    ctaColor: "bg-primary-light"
  },
  {
    title: "Marketplace Regional",
    description: "Plataforma que conecta vendedores locais a consumidores de forma intuitiva.",
    image: "https://images.unsplash.com/photo-1621111848501-8d3634f82336?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "E-commerce",
    ctaColor: "bg-secondary-dark"
  },
  {
    title: "Landing Page de Conversão",
    description: "Página otimizada para captura de leads com alta taxa de conversão.",
    image: "https://images.unsplash.com/photo-1573867639040-6dd25fa5f597?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "Websites",
    ctaColor: "bg-accent"
  }
];

// Pricing plans
export const PRICING_PLANS = [
  {
    title: "Plano Básico",
    price: "R$799",
    period: "/único",
    features: [
      "Criação de site simples",
      "Design responsivo",
      "Hospedagem por 6 meses",
      "Formulário de contato",
      "Links personalizados",
      "Suporte mensal (R$39,99)",
      "SEO básico"
    ],
    isPopular: false,
    accent: false
  },
  {
    title: "Plano Start II",
    price: "R$1.299",
    period: "/único",
    features: [
      "Criação de site profissional",
      "Design customizado",
      "Hospedagem por 1 ano",
      "Integração com redes sociais",
      "Suporte técnico básico",
      "SEO básico",
      "Segurança SSL"
    ],
    isPopular: true,
    accent: false
  },
  {
    title: "Plano Profissional",
    price: "R$1.999",
    period: "/único",
    features: [
      "Criação de loja virtual",
      "Design otimizado para vendas",
      "Integração com pagamentos",
      "Hospedagem por 1 ano",
      "Suporte técnico completo",
      "SEO avançado",
      "Treinamento de uso"
    ],
    isPopular: false,
    accent: false
  },
  {
    title: "Plano E-commerce",
    price: "R$2.999",
    period: "/único",
    features: [
      "Loja virtual customizada",
      "Design totalmente responsivo",
      "Hospedagem por 2 anos",
      "Integrações avançadas",
      "Consultoria estratégica SEO",
      "Suporte completo 24/7",
      "Marketing integrado"
    ],
    isPopular: false,
    accent: true,
    special: "Recomendado"
  }
];

// Testimonials
export const TESTIMONIALS = [
  {
    quote: "A VW Tech transformou completamente meu negócio online. O site que desenvolveram não só é bonito, mas também funcional e otimizado para vendas. O atendimento foi impecável do início ao fim.",
    name: "Carlos Mendes",
    title: "Empreendedor Digital",
    initials: "CM",
    color: "bg-primary"
  },
  {
    quote: "Eu tinha uma cafeteria e dependia apenas de clientes locais, mas sabia que precisava de uma presença online para crescer. A VW Tech criou uma solução perfeita que atraiu novos clientes desde o lançamento.",
    name: "Renata Oliveira",
    title: "Proprietária de Cafeteria",
    initials: "RO",
    color: "bg-accent"
  },
  {
    quote: "Procurei a VW Tech quando percebi que estava perdendo vendas por não estar online. Eles entenderam meu negócio e criaram uma loja virtual que superou todas as minhas expectativas. O ROI foi impressionante.",
    name: "Marcos Silva",
    title: "Lojista",
    initials: "MS",
    color: "bg-secondary"
  },
  {
    quote: "A solução de e-commerce que a VW Tech desenvolveu para minha empresa não só é bonita visualmente, mas também extremamente funcional. As vendas aumentaram 150% nos primeiros três meses.",
    name: "Juliana Rios",
    title: "Empresária",
    initials: "JR",
    color: "bg-primary-light"
  }
];

// FAQ questions
export const FAQS = [
  {
    question: "Por que criar um site ou aplicativo para meu negócio?",
    answer: "Ter presença digital é essencial nos dias de hoje. Um site ou aplicativo bem desenvolvido aumenta sua visibilidade, atrai novos clientes, melhora sua credibilidade e pode gerar vendas 24/7. É um investimento que traz retorno contínuo para seu negócio."
  },
  {
    question: "Qual é o tempo médio para desenvolver um site ou e-commerce?",
    answer: "O tempo de desenvolvimento varia de acordo com a complexidade do projeto. Um site institucional simples pode levar de 2 a 4 semanas, enquanto um e-commerce completo pode levar de 6 a 12 semanas. Sempre estabelecemos um cronograma detalhado no início do projeto."
  },
  {
    question: "Quais são as vantagens de ter um site responsivo?",
    answer: "Um site responsivo se adapta automaticamente a diferentes tamanhos de tela (desktop, tablet, smartphone). Isso melhora a experiência do usuário, é favorecido pelo Google nos rankings de busca, reduz a taxa de rejeição e aumenta o tempo de permanência dos visitantes."
  },
  {
    question: "O que é SEO e por que é importante para meu site?",
    answer: "SEO (Search Engine Optimization) é o conjunto de técnicas para melhorar o posicionamento do seu site nos resultados de busca como Google. Um bom SEO aumenta a visibilidade do seu negócio, traz tráfego qualificado e gratuito, gerando mais leads e vendas com menor custo por aquisição."
  },
  {
    question: "Qual a diferença entre um site simples e uma loja virtual?",
    answer: "Um site simples geralmente apresenta informações sobre a empresa, produtos ou serviços, enquanto uma loja virtual (e-commerce) permite a realização de compras online. A loja virtual inclui catálogo de produtos, carrinho de compras, gateway de pagamento, gestão de estoque e outras funcionalidades específicas para vendas."
  }
];

// Company info for contact section
export const CONTACT_INFO = [
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

// Social media links
export const SOCIAL_MEDIA = [
  { icon: "facebook-f", color: "bg-[#3b5998]", url: "#" },
  { icon: "twitter", color: "bg-[#1da1f2]", url: "#" },
  { icon: "instagram", color: "bg-[#ea4c89]", url: "#" },
  { icon: "linkedin-in", color: "bg-[#0077b5]", url: "#" }
];
