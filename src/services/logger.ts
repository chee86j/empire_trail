/* Logger Service

Provides centralized logging functionality to replace console statements
and enable proper log level management in production.
*/

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error'
}

class Logger {
  private isDevelopment = true; // Always log in development for now

  private shouldLog(level: LogLevel): boolean {
    if (this.isDevelopment) return true;
    
    // In production, only log warnings and errors
    return level === LogLevel.WARN || level === LogLevel.ERROR;
  }

  private formatMessage(level: LogLevel, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
  }

  debug(message: string, ...args: unknown[]): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      console.debug(this.formatMessage(LogLevel.DEBUG, message), ...args);
    }
  }

  info(message: string, ...args: unknown[]): void {
    if (this.shouldLog(LogLevel.INFO)) {
      console.info(this.formatMessage(LogLevel.INFO, message), ...args);
    }
  }

  warn(message: string, ...args: unknown[]): void {
    if (this.shouldLog(LogLevel.WARN)) {
      console.warn(this.formatMessage(LogLevel.WARN, message), ...args);
    }
  }

  error(message: string, ...args: unknown[]): void {
    if (this.shouldLog(LogLevel.ERROR)) {
      console.error(this.formatMessage(LogLevel.ERROR, message), ...args);
    }
  }

  /* Game-specific logging methods for development */
  gameAction(action: string, details?: string): void {
    if (this.isDevelopment) {
      this.info(`[GAME] ${action}${details ? `: ${details}` : ''}`);
    }
  }

  saveOperation(operation: string, slotId?: string): void {
    if (this.isDevelopment) {
      this.info(`[SAVE] ${operation}${slotId ? ` to slot ${slotId}` : ''}`);
    }
  }

  loadOperation(operation: string, slotId?: string): void {
    if (this.isDevelopment) {
      this.info(`[LOAD] ${operation}${slotId ? ` from slot ${slotId}` : ''}`);
    }
  }

  deleteOperation(operation: string, slotId?: string): void {
    if (this.isDevelopment) {
      this.info(`[DELETE] ${operation}${slotId ? ` slot ${slotId}` : ''}`);
    }
  }

  errorOperation(operation: string, error: unknown): void {
    this.error(`[ERROR] Error during ${operation}:`, error);
  }
}

export const logger = new Logger();
