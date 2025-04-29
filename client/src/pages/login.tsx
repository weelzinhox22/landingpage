import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { apiRequest } from '@/lib/queryClient';
import { Link, useLocation } from 'wouter';
import { Helmet } from 'react-helmet';
import Logo from '@/components/ui/logo';

const LoginPage = () => {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setLoginData((prev) => ({ ...prev, rememberMe: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await apiRequest('POST', '/api/login', {
        username: loginData.email,
        password: loginData.password,
        rememberMe: loginData.rememberMe
      });
      
      toast({
        title: "Login bem-sucedido!",
        description: "Você foi autenticado com sucesso.",
        variant: "default",
      });
      
      setLocation('/');
    } catch (error) {
      toast({
        title: "Falha no login",
        description: "E-mail ou senha incorretos. Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-muted py-20 px-4 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Helmet>
        <title>Login | VW Tech</title>
        <meta name="description" content="Faça login na sua conta VW Tech para acessar recursos exclusivos e gerenciar seus projetos." />
      </Helmet>
      
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <Link href="/">
              <a>
                <Logo size="md" />
              </a>
            </Link>
          </div>
          <CardTitle className="text-2xl font-bold">Bem-vindo de volta</CardTitle>
          <CardDescription>Faça login para acessar sua conta</CardDescription>
        </CardHeader>
        
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                className="w-full"
                placeholder="seu@email.com"
                required
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <a href="#" className="text-sm text-primary hover:text-primary/80">
                  Esqueceu a senha?
                </a>
              </div>
              <Input
                type="password"
                id="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                className="w-full"
                placeholder="********"
                required
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="rememberMe" 
                checked={loginData.rememberMe}
                onCheckedChange={handleCheckboxChange}
              />
              <Label htmlFor="rememberMe" className="text-sm text-muted-foreground">
                Lembrar-me
              </Label>
            </div>
            
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-primary text-white hover:bg-primary/90"
            >
              {isSubmitting ? 'Processando...' : 'Entrar'}
            </Button>
          </form>
        </CardContent>
        
        <CardFooter className="flex justify-center border-t pt-6">
          <p className="text-sm text-muted-foreground">
            Não tem uma conta? <a href="#" className="text-primary hover:text-primary/80">Cadastre-se</a>
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default LoginPage;
