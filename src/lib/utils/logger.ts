type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LoggerConfig {
  isDevelopment: boolean;
  enableConsoleLogging: boolean;
}

class Logger {
  private config: LoggerConfig;

  constructor() {
    this.config = {
      isDevelopment: process.env.NODE_ENV === 'development',
      enableConsoleLogging: process.env.NODE_ENV !== 'production',
    };
  }

  private shouldLog(level: LogLevel): boolean {
    if (level === 'error') return true; // Always log errors
    if (level === 'warn') return this.config.enableConsoleLogging;
    return this.config.isDevelopment;
  }

  debug(message: string, data?: any) {
    if (this.shouldLog('debug')) {
      console.log(`[DEBUG] ${message}`, data || '');
    }
  }

  info(message: string, data?: any) {
    if (this.shouldLog('info')) {
      console.info(`[INFO] ${message}`, data || '');
    }
  }

  warn(message: string, data?: any) {
    if (this.shouldLog('warn')) {
      console.warn(`[WARN] ${message}`, data || '');
    }
  }

  error(message: string, error?: any) {
    if (this.shouldLog('error')) {
      console.error(`[ERROR] ${message}`, error || '');
    }
  }
}

export const logger = new Logger();

// Re-export handleError for convenience so components only need to import from logger
export { handleError, withErrorHandling, withComponentErrorHandling } from './error-handler';