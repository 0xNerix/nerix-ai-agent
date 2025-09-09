import { toast } from '@/lib/hooks/use-toast';
import { logger } from './logger';


interface ErrorHandlerOptions {
  showToast?: boolean;
  toastTitle?: string;
  toastDescription?: string;
  logLevel?: 'error' | 'warn' | 'info';
  context?: Record<string, any>;
}

/**
 * Centralized error handler for components and hooks
 * Provides consistent error logging and user feedback
 */
export function handleError(
  error: any,
  defaultMessage: string,
  options: ErrorHandlerOptions = {}
) {
  const {
    showToast = true,
    toastTitle = 'Error',
    toastDescription = defaultMessage,
    logLevel = 'error',
    context = {}
  } = options;

  // Always log the error for debugging
  logger[logLevel](defaultMessage, { error, ...context });

  // Show user-friendly toast notification
  if (showToast) {
    toast({
      title: toastTitle,
      description: toastDescription,
      variant: 'destructive',
    });
  }
}

/**
 * Helper for async operations with error handling
 */
export async function withErrorHandling<T>(
  asyncFn: () => Promise<T>,
  errorMessage: string,
  options: ErrorHandlerOptions = {}
): Promise<T | null> {
  try {
    return await asyncFn();
  } catch (error) {
    handleError(error, errorMessage, options);
    return null;
  }
}

/**
 * Hook wrapper with error boundary-like behavior
 */
export function withComponentErrorHandling(
  fn: () => void,
  errorMessage: string,
  options: ErrorHandlerOptions = {}
) {
  try {
    return fn();
  } catch (error) {
    handleError(error, errorMessage, options);
    return null;
  }
}