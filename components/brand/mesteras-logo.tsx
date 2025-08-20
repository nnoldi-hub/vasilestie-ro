'use client';

import React from 'react';

interface MesterasLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  variant?: 'full' | 'icon' | 'text';
}

const sizeMap = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
  xl: 'h-16 w-16'
};

export function MesterasLogo({ 
  className = '', 
  size = 'md', 
  showText = true, 
  variant = 'full' 
}: MesterasLogoProps) {
  const iconSize = sizeMap[size];

  const LogoIcon = () => (
    <svg 
      className={`${iconSize} ${className}`} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle */}
      <circle 
        cx="32" 
        cy="32" 
        r="30" 
        fill="url(#gradient1)" 
        stroke="url(#gradient2)" 
        strokeWidth="2"
      />
      
      {/* Character head */}
      <circle cx="32" cy="22" r="8" fill="#fbbf24" />
      
      {/* Hard hat */}
      <path 
        d="M24 18 C24 14, 28 12, 32 12 C36 12, 40 14, 40 18 L40 20 C40 18, 36 16, 32 16 C28 16, 24 18, 24 20 Z" 
        fill="#1e40af" 
      />
      <ellipse cx="32" cy="18" rx="8" ry="3" fill="#1d4ed8" />
      
      {/* Character body */}
      <rect x="26" y="28" width="12" height="16" rx="2" fill="#f97316" />
      
      {/* Arms */}
      <circle cx="20" cy="34" r="3" fill="#fbbf24" />
      <circle cx="44" cy="34" r="3" fill="#fbbf24" />
      <rect x="18" y="32" width="6" height="4" rx="2" fill="#f97316" />
      <rect x="40" y="32" width="6" height="4" rx="2" fill="#f97316" />
      
      {/* Tool box */}
      <rect x="46" y="30" width="8" height="6" rx="1" fill="#374151" />
      <rect x="47" y="31" width="6" height="1" fill="#f97316" />
      <circle cx="48" cy="33" r="0.5" fill="#6b7280" />
      <circle cx="52" cy="33" r="0.5" fill="#6b7280" />
      
      {/* Wrench in hand */}
      <rect x="16" y="36" width="8" height="2" rx="1" fill="#6b7280" />
      <circle cx="18" cy="37" r="1.5" fill="#6b7280" />
      
      {/* Legs */}
      <rect x="28" y="44" width="3" height="12" fill="#1e40af" />
      <rect x="33" y="44" width="3" height="12" fill="#1e40af" />
      
      {/* Boots */}
      <ellipse cx="29.5" cy="56" rx="2" ry="1.5" fill="#374151" />
      <ellipse cx="34.5" cy="56" rx="2" ry="1.5" fill="#374151" />
      
      {/* Smile */}
      <path d="M28 24 Q32 28 36 24" stroke="#374151" strokeWidth="1" fill="none" />
      
      {/* Eyes */}
      <circle cx="29" cy="21" r="1" fill="#374151" />
      <circle cx="35" cy="21" r="1" fill="#374151" />
      
      {/* Gradients */}
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#dbeafe" />
          <stop offset="100%" stopColor="#bfdbfe" />
        </linearGradient>
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1d4ed8" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
      </defs>
    </svg>
  );

  const LogoText = () => (
    <div className="flex flex-col">
      <span className="font-bold text-xl text-gray-900">Mesteras.ro</span>
      {size === 'xl' && (
        <span className="text-sm text-gray-600 -mt-1">
          Când ai nevoie, răspunde
        </span>
      )}
    </div>
  );

  if (variant === 'icon') {
    return <LogoIcon />;
  }

  if (variant === 'text') {
    return <LogoText />;
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <LogoIcon />
      {showText && <LogoText />}
    </div>
  );
}
