import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  textClassName?: string;
  monochrome?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  className,
  textClassName,
  monochrome = false
}) => {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-3xl',
    lg: 'text-4xl'
  };

  return (
    <div className={cn("flex items-center", className)}>
      <div className={cn(
        monochrome ? "text-white" : "text-primary", 
        sizeClasses[size]
      )}>
        <span className={cn(
          "logo-text relative",
          monochrome && "!bg-clip-text !text-white !bg-none"
        )}>
          <span className="absolute opacity-80" style={{ transform: "translateX(-3px)" }}>V</span>
          <span>W</span>
        </span>
      </div>
      <div className={cn(
        "font-bold tracking-tight", 
        sizeClasses[size] === 'text-2xl' ? 'text-lg' : sizeClasses[size] === 'text-3xl' ? 'text-xl' : 'text-2xl',
        monochrome ? "text-white" : "text-foreground",
        textClassName
      )}>
        Tech
      </div>
    </div>
  );
};

export default Logo;
