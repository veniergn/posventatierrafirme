import React from 'react';

interface BrandLogoProps {
  variant?: 'full' | 'icon' | 'white' | 'horizontal';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'full',
  className = '',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'h-6 text-sm',
    md: 'h-9 text-base',
    lg: 'h-12 text-xl',
    xl: 'h-16 text-2xl'
  };

  if (variant === 'icon') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {/* Exact Isotype: Top red bar with central red column and 4 grey square windows */}
        <svg
          viewBox="0 0 100 100"
          className={size === 'sm' ? 'w-6 h-6' : size === 'lg' ? 'w-12 h-12' : size === 'xl' ? 'w-16 h-16' : 'w-8 h-8'}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Top T header */}
          <rect x="15" y="10" width="70" height="24" fill="#8E1E19" rx="2" />
          {/* Left top block (gray) */}
          <rect x="15" y="38" width="20" height="24" fill="#6B7280" rx="2" />
          {/* Right top block (gray) */}
          <rect x="65" y="38" width="20" height="24" fill="#6B7280" rx="2" />
          {/* Central T column (red) */}
          <rect x="39" y="38" width="22" height="52" fill="#8E1E19" rx="2" />
          {/* Left bottom block (gray) */}
          <rect x="15" y="66" width="20" height="24" fill="#6B7280" rx="2" />
          {/* Right bottom block (gray) */}
          <rect x="65" y="66" width="20" height="24" fill="#6B7280" rx="2" />
        </svg>
      </div>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div className={`inline-flex items-center gap-3 ${className}`}>
        <svg
          viewBox="0 0 100 100"
          className="w-8 h-8 shrink-0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="15" y="10" width="70" height="24" fill="#8E1E19" rx="2" />
          <rect x="15" y="38" width="20" height="24" fill="#6B7280" rx="2" />
          <rect x="65" y="38" width="20" height="24" fill="#6B7280" rx="2" />
          <rect x="39" y="38" width="22" height="52" fill="#8E1E19" rx="2" />
          <rect x="15" y="66" width="20" height="24" fill="#6B7280" rx="2" />
          <rect x="65" y="66" width="20" height="24" fill="#6B7280" rx="2" />
        </svg>
        <div className="flex flex-col">
          <div className="flex items-center font-bold tracking-tight text-[#8E1E19] leading-none text-lg">
            <span>TIERRA FIRME</span>
            <span className="text-[9px] align-super ml-0.5 font-normal">®</span>
          </div>
          <span className="text-[8px] tracking-[0.24em] font-semibold text-[#6B7280] uppercase mt-0.5">
            Desarrollos Sólidos
          </span>
        </div>
      </div>
    );
  }

  // Full stacked logo like the official graphic
  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className={size === 'sm' ? 'w-10 h-10' : size === 'lg' ? 'w-20 h-20' : size === 'xl' ? 'w-24 h-24' : 'w-16 h-16'}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="15" y="10" width="70" height="24" fill="#8E1E19" rx="2" />
        <rect x="15" y="38" width="20" height="24" fill="#6B7280" rx="2" />
        <rect x="65" y="38" width="20" height="24" fill="#6B7280" rx="2" />
        <rect x="39" y="38" width="22" height="52" fill="#8E1E19" rx="2" />
        <rect x="15" y="66" width="20" height="24" fill="#6B7280" rx="2" />
        <rect x="65" y="66" width="20" height="24" fill="#6B7280" rx="2" />
      </svg>
      <div className="mt-3 text-center">
        <div className="flex items-center justify-center font-bold tracking-tight text-[#8E1E19] leading-tight text-xl md:text-2xl font-sans">
          <span>TIERRA FIRME</span>
          <span className="text-[10px] align-super ml-0.5 font-normal">®</span>
        </div>
        <div className="text-[10px] md:text-[11px] tracking-[0.28em] font-medium text-[#6B7280] uppercase mt-1">
          Desarrollos Sólidos
        </div>
      </div>
    </div>
  );
};
