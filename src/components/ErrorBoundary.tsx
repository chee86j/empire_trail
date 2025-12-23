import { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from "framer-motion";
import { toast } from 'react-toastify';
import '../styles/design-system.css';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log error to console in development
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    // Show user-friendly error message
    toast.error('Something went wrong. Please try refreshing the page.');
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="error-boundary" role="alert">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Oops! Something went wrong</h2>
            </div>
            <div className="error-content">
              <p>
                We're sorry, but something unexpected happened. This might be a temporary issue.
              </p>
              {import.meta.env.DEV && this.state.error && (
                <details className="error-details">
                  <summary>Error Details (Development Only)</summary>
                  <pre className="error-stack">
                    {this.state.error.toString()}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </details>
              )}
              <div className="error-actions">
                <motion.button 
                  className="btn btn-primary" 
                  onClick={this.handleRetry}
                  aria-label="Try again"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Try Again
                </motion.button>
                <motion.button 
                  className="btn btn-secondary" 
                  onClick={() => window.location.reload()}
                  aria-label="Refresh page"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Refresh Page
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
