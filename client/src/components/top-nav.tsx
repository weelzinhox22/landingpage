import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import gsap from 'gsap';
import styled from 'styled-components';

const TopNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const { scrollY } = useScroll();
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)']
  );
  
  const boxShadow = useTransform(
    scrollY,
    [0, 100],
    ['none', '0 4px 20px rgba(0, 0, 0, 0.2)']
  );
  
  // GSAP animation for menu items
  useEffect(() => {
    if (navRef.current) {
      gsap.from('.nav-item', {
        opacity: 0,
        y: -20,
        stagger: 0.1,
        delay: 0.5,
        duration: 0.8,
        ease: 'power3.out'
      });
      
      gsap.from('.logo', {
        opacity: 0,
        x: -30,
        duration: 1,
        ease: 'power2.out'
      });
    }
  }, []);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const menuItems = [
    { name: 'Home', target: 'home' },
    { name: 'Sobre', target: 'sobre' },
    { name: 'Serviços', target: 'servicos' },
    { name: 'Tecnologias', target: 'tech' },
    { name: 'Portfólio', target: 'portfolio' },
    { name: 'Preços', target: 'pricing' },
    { name: 'Contato', target: 'contact' }
  ];
  
  return (
    <Nav 
      ref={navRef}
      style={{ 
        backgroundColor, 
        boxShadow 
      }}
    >
      <Container>
        <LogoContainer className="logo">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Logo>VW<span>Tech</span></Logo>
          </motion.div>
        </LogoContainer>
        
        <MenuToggle onClick={toggleMenu}>
          <i className={isOpen ? 'fas fa-times' : 'fas fa-bars'} />
        </MenuToggle>
        
        <MenuItems isOpen={isOpen}>
          {menuItems.map((item, index) => (
            <MenuItem 
              key={index} 
              className="nav-item"
            >
              <motion.div
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                <StyledScrollLink
                  to={item.target}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </StyledScrollLink>
              </motion.div>
            </MenuItem>
          ))}
          
          <CallToAction className="nav-item">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ScrollLink
                to="contact"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                onClick={() => setIsOpen(false)}
              >
                Orçamento
              </ScrollLink>
            </motion.div>
          </CallToAction>
        </MenuItems>
      </Container>
    </Nav>
  );
};

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 15px 0;
  transition: all 0.3s ease;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoContainer = styled.div`
  z-index: 2;
`;

const Logo = styled.h1`
  font-size: 1.8rem;
  font-weight: 800;
  background: linear-gradient(to right, #3498db, #00c6ff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  
  span {
    background: linear-gradient(to right, #00c6ff, #0072ff);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const MenuToggle = styled.div`
  display: none;
  cursor: pointer;
  z-index: 2;
  font-size: 1.5rem;
  color: white;
  
  @media (max-width: 992px) {
    display: block;
  }
`;

const MenuItems = styled.ul<{ isOpen: boolean }>`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;
  
  @media (max-width: 992px) {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 250px;
    flex-direction: column;
    background: rgba(0, 0, 0, 0.95);
    backdrop-filter: blur(10px);
    padding: 80px 0 30px;
    transform: ${({ isOpen }) => isOpen ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform 0.3s ease;
    justify-content: flex-start;
    box-shadow: -5px 0 25px rgba(0, 0, 0, 0.3);
  }
`;

const MenuItem = styled.li`
  margin: 0 15px;
  
  @media (max-width: 992px) {
    margin: 15px 0;
  }
`;

const StyledScrollLink = styled(ScrollLink)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -4px;
    left: 0;
    background: linear-gradient(to right, #3498db, #00c6ff);
    transition: width 0.3s ease;
  }
  
  &:hover:after, &.active:after {
    width: 100%;
  }
  
  &.active {
    font-weight: 600;
  }
`;

const CallToAction = styled.li`
  margin-left: 20px;
  
  a {
    background: linear-gradient(to right, #3498db, #00c6ff);
    padding: 10px 20px;
    border-radius: 30px;
    color: white;
    text-decoration: none;
    font-weight: 600;
    display: inline-block;
    transition: all 0.3s ease;
    border: none;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(0, 198, 255, 0.3);
  }
  
  @media (max-width: 992px) {
    margin: 20px 0 0;
  }
`;

export default TopNav; 