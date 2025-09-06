/* Accessibility Utilities
 * Helper functions for improving accessibility and focus management
 */

/**
 * Trap focus within a modal or container
 */
export const trapFocus = (container: HTMLElement): (() => void) => {
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  };

  container.addEventListener('keydown', handleTabKey);
  
  // Focus first element
  if (firstElement) {
    firstElement.focus();
  }

  return () => {
    container.removeEventListener('keydown', handleTabKey);
  };
};

/**
 * Announce message to screen readers
 */
export const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

/**
 * Get accessible button text for screen readers
 */
export const getAccessibleButtonText = (buttonText: string, context?: string): string => {
  if (context) {
    return `${buttonText}, ${context}`;
  }
  return buttonText;
};

/**
 * Format currency for screen readers
 */
export const formatCurrencyForScreenReader = (amount: number): string => {
  return `$${amount.toLocaleString()} dollars`;
};

/**
 * Create accessible table headers
 */
export const createAccessibleTableHeaders = (headers: string[]): string => {
  return headers.map((header, index) => `Column ${index + 1}: ${header}`).join(', ');
};

/**
 * Generate accessible property description
 */
export const generatePropertyDescription = (property: {
  name: string;
  purchaseCost: number;
  closingCost: number;
  renovationCost: number;
  arvRentalIncome: number;
  arvSalePrice: number;
}): string => {
  const totalCost = property.purchaseCost + property.closingCost + property.renovationCost;
  const roi = ((property.arvSalePrice - totalCost) / totalCost * 100).toFixed(1);
  
  return `${property.name}. Purchase cost: ${formatCurrencyForScreenReader(property.purchaseCost)}. ` +
         `Closing cost: ${formatCurrencyForScreenReader(property.closingCost)}. ` +
         `Renovation cost: ${formatCurrencyForScreenReader(property.renovationCost)}. ` +
         `Total investment: ${formatCurrencyForScreenReader(totalCost)}. ` +
         `Monthly rental income: ${formatCurrencyForScreenReader(property.arvRentalIncome)}. ` +
         `Sale price: ${formatCurrencyForScreenReader(property.arvSalePrice)}. ` +
         `Return on investment: ${roi} percent.`;
};

/**
 * Handle keyboard navigation for lists
 */
export const handleListNavigation = (
  event: KeyboardEvent,
  currentIndex: number,
  totalItems: number,
  onNavigate: (newIndex: number) => void
) => {
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault();
      onNavigate(currentIndex < totalItems - 1 ? currentIndex + 1 : 0);
      break;
    case 'ArrowUp':
      event.preventDefault();
      onNavigate(currentIndex > 0 ? currentIndex - 1 : totalItems - 1);
      break;
    case 'Home':
      event.preventDefault();
      onNavigate(0);
      break;
    case 'End':
      event.preventDefault();
      onNavigate(totalItems - 1);
      break;
  }
};

/**
 * Validate form accessibility
 */
export const validateFormAccessibility = (form: HTMLFormElement): string[] => {
  const errors: string[] = [];
  
  // Check for labels
  const inputs = form.querySelectorAll('input, select, textarea');
  inputs.forEach((input, index) => {
    const id = input.getAttribute('id');
    const label = form.querySelector(`label[for="${id}"]`);
    const ariaLabel = input.getAttribute('aria-label');
    const ariaLabelledBy = input.getAttribute('aria-labelledby');
    
    if (!label && !ariaLabel && !ariaLabelledBy) {
      errors.push(`Input ${index + 1} is missing a label or aria-label`);
    }
  });
  
  // Check for error messages
  const requiredInputs = form.querySelectorAll('input[required], select[required], textarea[required]');
  requiredInputs.forEach((input, index) => {
    const ariaDescribedBy = input.getAttribute('aria-describedby');
    if (!ariaDescribedBy) {
      errors.push(`Required input ${index + 1} should have aria-describedby for error messages`);
    }
  });
  
  return errors;
};
