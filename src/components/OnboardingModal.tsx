import React, { useState, useEffect } from 'react';
import '../styles/design-system.css';
import '../styles/OnboardingModal.css';

interface OnboardingStep {
  id: string;
  title: string;
  content: string;
  image?: string;
  action?: string;
  actionKey?: string;
}

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const OnboardingModal: React.FC<OnboardingModalProps> = ({ 
  isOpen, 
  onClose, 
  onComplete 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const onboardingSteps: OnboardingStep[] = [
    {
      id: 'welcome',
      title: 'Welcome to Empire Trail!',
      content: 'Build your real estate empire by traveling across America, making strategic investments, and growing your wealth. Let\'s get you started!',
      action: 'Get Started',
      actionKey: 'Space or Enter'
    },
    {
      id: 'profession',
      title: 'Choose Your Profession',
      content: 'Each profession has different starting capital and monthly salary. Use arrow keys (↑↓) to navigate, number keys (1-6) for quick selection, and Enter/Space to confirm.',
      action: 'Next',
      actionKey: 'Space or Enter'
    },
    {
      id: 'city',
      title: 'Explore Cities',
      content: 'Travel between cities to find investment opportunities. Use T to travel, R to rest (advance time), V to view your portfolio, and F to find deals.',
      action: 'Next',
      actionKey: 'Space or Enter'
    },
    {
      id: 'deals',
      title: 'Find Investment Deals',
      content: 'Browse available properties with their costs, renovation needs, and potential returns. Use arrow keys to navigate and P to purchase properties you can afford.',
      action: 'Next',
      actionKey: 'Space or Enter'
    },
    {
      id: 'portfolio',
      title: 'Manage Your Portfolio',
      content: 'Track your properties, rent them out for income, or sell them for profit. Properties need time to renovate before they can be rented or sold.',
      action: 'Next',
      actionKey: 'Space or Enter'
    },
    {
      id: 'events',
      title: 'Handle Random Events',
      content: 'Life happens! Random events can affect your bank balance. Some are good, some are bad - adapt your strategy accordingly.',
      action: 'Next',
      actionKey: 'Space or Enter'
    },
    {
      id: 'shortcuts',
      title: 'Keyboard Shortcuts',
      content: 'Press F1 anytime to see all available keyboard shortcuts. The game is designed for both mouse and keyboard users.',
      action: 'Start Playing!',
      actionKey: 'Space or Enter'
    }
  ];

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      setIsCompleted(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'Escape':
          event.preventDefault();
          handleClose();
          break;
        case ' ':
        case 'Enter':
          event.preventDefault();
          handleNext();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
          }
          break;
        case 'ArrowRight':
          event.preventDefault();
          handleNext();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, currentStep]);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setIsCompleted(true);
    onComplete();
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  if (!isOpen) return null;

  const currentStepData = onboardingSteps[currentStep];
  const progress = ((currentStep + 1) / onboardingSteps.length) * 100;

  return (
    <div 
      className="onboarding-overlay" 
      role="dialog" 
      aria-modal="true"
      aria-labelledby="onboarding-title"
    >
      <div className="onboarding-modal">
        <div className="onboarding-header">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
              aria-label={`Progress: ${Math.round(progress)}%`}
            />
          </div>
          <button 
            className="onboarding-close" 
            onClick={handleClose}
            aria-label="Close onboarding"
          >
            ×
          </button>
        </div>

        <div className="onboarding-content">
          <h2 id="onboarding-title" className="onboarding-title">
            {currentStepData.title}
          </h2>
          
          <div className="onboarding-body">
            <p className="onboarding-text">
              {currentStepData.content}
            </p>
            
            {currentStepData.image && (
              <div className="onboarding-image">
                <img 
                  src={currentStepData.image} 
                  alt={currentStepData.title}
                  loading="lazy"
                />
              </div>
            )}
          </div>

          <div className="onboarding-navigation">
            <button 
              className="btn btn-secondary"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              aria-label="Previous step"
            >
              Previous
            </button>
            
            <div className="step-indicators">
              {onboardingSteps.map((_, index) => (
                <button
                  key={index}
                  className={`step-dot ${index === currentStep ? 'active' : ''}`}
                  onClick={() => setCurrentStep(index)}
                  aria-label={`Go to step ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              className="btn btn-primary"
              onClick={handleNext}
              aria-label={currentStep === onboardingSteps.length - 1 ? 'Complete onboarding' : 'Next step'}
            >
              {currentStepData.action}
            </button>
          </div>

          <div className="onboarding-help">
            <p className="keyboard-help">
              Tip: {currentStepData.actionKey} to continue, ESC to skip, ← → to navigate
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;
