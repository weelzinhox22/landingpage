import { useState, useEffect, useRef, useCallback } from 'react';

// IDs das seções que correspondem aos IDs no HTML
export type SectionId = 'home' | 'sobre' | 'servicos' | 'portfolio' | 'planos' | 'contato';

/**
 * Hook personalizado para detectar qual seção está mais visível na viewport
 * com tratamento específico para evitar múltiplas seções ativas
 */
export function useActiveSection(): SectionId {
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const intersectionObserver = useRef<IntersectionObserver | null>(null);
  const visibleSections = useRef<Map<string, number>>(new Map());
  
  // Função para atualizar a seção ativa baseada na visibilidade
  const updateActiveSection = useCallback(() => {
    // Se não há seções visíveis, mantém 'home' como padrão
    if (visibleSections.current.size === 0) {
      setActiveSection('home');
      return;
    }
    
    // Converte o Map para array para ordenação
    const sections = Array.from(visibleSections.current.entries());
    
    if (sections.length === 0) return;
    
    // Ordenar por visibilidade (maior ratio primeiro)
    sections.sort((a, b) => b[1] - a[1]);
    
    // Regras especiais para o item 'contato'
    if (sections[0][0] === 'contato') {
      // Nunca considera 'contato' como ativo a menos que tenha grande visibilidade
      // e esteja perto do final da página (scrollY alto)
      const isNearBottom = window.scrollY > document.body.scrollHeight - window.innerHeight * 1.5;
      
      if (!isNearBottom || sections[0][1] < 0.7) {
        // Se não estiver no final da página ou não estiver bem visível, 
        // use a próxima seção ou mantenha a atual se não houver outra
        if (sections.length > 1) {
          setActiveSection(sections[1][0] as SectionId);
        }
        return;
      }
    }
    
    // Define a seção com maior visibilidade como ativa
    setActiveSection(sections[0][0] as SectionId);
  }, []);
  
  useEffect(() => {
    // Reset ao montar o componente
    visibleSections.current.clear();
    
    // Callback para IntersectionObserver
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      let needsUpdate = false;
      
      entries.forEach(entry => {
        const targetId = entry.target.id as SectionId;
        
        if (entry.isIntersecting) {
          // Caso o scroll esteja no topo da página (< 100px)
          if (window.scrollY < 100 && targetId !== 'home') {
            visibleSections.current.set('home', 1.0);
            needsUpdate = true;
            return;
          }
          
          // Armazena a taxa de visibilidade
          visibleSections.current.set(targetId, entry.intersectionRatio);
          needsUpdate = true;
        } else {
          // Remove seções que não estão mais visíveis
          if (visibleSections.current.has(targetId)) {
            visibleSections.current.delete(targetId);
            needsUpdate = true;
          }
        }
      });
      
      // Se houve alterações, atualiza a seção ativa
      if (needsUpdate) {
        updateActiveSection();
      }
    };
    
    // Configuração do IntersectionObserver
    intersectionObserver.current = new IntersectionObserver(handleIntersection, {
      rootMargin: '-20% 0px -35% 0px', // Detecta elemento quando na parte visível central da tela
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
    });
    
    // Função para verificar se está no topo da página
    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection('home');
      } else {
        // Se não estiver no topo, recalcula baseado nas interseções
        updateActiveSection();
      }
    };
    
    // Observar as seções
    ['home', 'sobre', 'servicos', 'portfolio', 'planos', 'contato'].forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        intersectionObserver.current?.observe(element);
      }
    });
    
    // Adiciona listener de scroll
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Limpeza ao desmontar
    return () => {
      window.removeEventListener('scroll', handleScroll);
      intersectionObserver.current?.disconnect();
      visibleSections.current.clear();
    };
  }, [updateActiveSection]);
  
  return activeSection;
} 