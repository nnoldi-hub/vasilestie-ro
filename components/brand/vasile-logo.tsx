import React from 'react';

interface VasileLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

const VasileLogo: React.FC<VasileLogoProps> = ({ 
  size = 'md', 
  showText = true, 
  className = '' 
}) => {
  const dimensions = {
    sm: { icon: 32, text: 'text-lg' },
    md: { icon: 40, text: 'text-xl' },
    lg: { icon: 48, text: 'text-2xl' },
    xl: { icon: 64, text: 'text-3xl' }
  };

  const { icon: iconSize, text: textSize } = dimensions[size];

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="relative">
        <svg 
          width={iconSize} 
          height={iconSize} 
          viewBox="0 0 64 64" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-sm"
        >
          {/* Background circle */}
          <circle 
            cx="32" 
            cy="32" 
            r="30" 
            fill="url(#vasile-bg)" 
            stroke="#1d4ed8" 
            strokeWidth="2"
          />
          
          {/* Vasile's cap */}
          <path
            d="M20 28 C20 24, 24 20, 32 20 C40 20, 44 24, 44 28 L42 30 L22 30 Z"
            fill="#1d4ed8"
          />
          <ellipse
            cx="32"
            cy="18"
            rx="14"
            ry="3"
            fill="#1e40af"
          />
          
          {/* Vasile's head */}
          <circle
            cx="32"
            cy="32"
            r="8"
            fill="#fbbf24"
          />
          
          {/* Vasile's smile */}
          <path
            d="M28 34 Q32 37, 36 34"
            stroke="#1d4ed8"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          
          {/* Eyes */}
          <circle cx="29" cy="30" r="1.5" fill="#1d4ed8" />
          <circle cx="35" cy="30" r="1.5" fill="#1d4ed8" />
          
          {/* Tool box handle */}
          <rect
            x="38"
            y="25"
            width="8"
            height="12"
            rx="2"
            fill="#f97316"
            transform="rotate(15 42 31)"
          />
          <rect
            x="39"
            y="27"
            width="6"
            height="2"
            fill="#ea580c"
            transform="rotate(15 42 28)"
          />
          
          {/* Mustache */}
          <path
            d="M28 32 Q30 33, 32 32 Q34 33, 36 32"
            stroke="#8b5cf6"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          
          <defs>
            <linearGradient id="vasile-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#dbeafe" />
              <stop offset="100%" stopColor="#bfdbfe" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold text-brand-primary leading-none ${textSize}`}>
            Vasile
          </span>
          <span className={`font-semibold text-brand-accent leading-none ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
            Știe
          </span>
        </div>
      )}
    </div>
  );
};

export default VasileLogo;
