import React from 'react';
import '../styles/design-system.css';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  message = 'Loading...', 
  className = '' 
}) => {
  const sizeClass = size === 'lg' ? 'loading-spinner-lg' : 'loading-spinner';
  
  return (
    <div className={`loading-container ${className}`} role="status" aria-live="polite">
      <div className={sizeClass} aria-hidden="true"></div>
      <span className="sr-only">{message}</span>
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
