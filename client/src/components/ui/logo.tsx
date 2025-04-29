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
        sizeClasses[size],
        "font-bold tracking-tighter leading-none relative"
      )}>
        {/* Logo VW com overlap */}
        <div className="relative inline-flex overflow-visible">
          {/* V */}
          <span 
            className={cn(
              "logo-letter-v",
              monochrome ? "text-white" : "text-primary-600"
            )}
            style={{ marginRight: "-0.1em" }}
          >
            V
          </span>
          
          {/* W */}
          <span 
            className={cn(
              "logo-letter-w relative",
              monochrome ? "text-white" : "text-primary"
            )}
          >
            W
          </span>
        </div>
      </div>
      <div className={cn(
        "font-bold tracking-tight", 
        sizeClasses[size] === 'text-2xl' ? 'text-lg' : sizeClasses[size] === 'text-3xl' ? 'text-xl' : 'text-2xl',
        monochrome ? "text-white" : "text-foreground",
        textClassName,
        "ml-1"
      )}>
        Tech
      </div>
    </div>
  );
};

export default Logo;
