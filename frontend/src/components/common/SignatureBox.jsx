import React from 'react';

const SignatureBox = ({ 
  children, 
  className = '', 
  containerClassName = '', 
  rounded = 'rounded-2xl', 
  hoverGlow = false,
  backgroundEffect = null,
  as: Component = 'div',
  ...props 
}) => {
  return (
    <Component 
      className={`relative group ${rounded} ${containerClassName}`} 
      {...props}
    >
      {/* Base Signature Layer */}
      <div 
        className={`absolute inset-0 bg-[#09090b]/80 shadow-top border border-white/5 ${rounded} transition-all duration-300 z-0 ${
          hoverGlow ? 'group-hover:bg-[#09090b] group-hover:border-[#6366f1]/50 group-hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]' : 'group-hover:bg-[#09090b]'
        }`}
      />
      
      {/* Optional Custom Background Effect (e.g. Gradients) */}
      {backgroundEffect}
      
      {/* Content Layer */}
      <div className={`relative z-10 h-full w-full ${className}`}>
        {children}
      </div>
    </Component>
  );
};

export default SignatureBox;
