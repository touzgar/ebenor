/**
 * Completely silence the console - NO logs, warnings, or errors
 */

if (typeof window !== 'undefined') {
  // Empty function that does nothing
  const noop = () => {};

  // Override ALL console methods
  console.log = noop;
  console.warn = noop;
  console.error = noop;
  console.info = noop;
  console.debug = noop;
  console.trace = noop;
  console.table = noop;
  console.dir = noop;
  console.dirxml = noop;
  console.group = noop;
  console.groupCollapsed = noop;
  console.groupEnd = noop;
  console.time = noop;
  console.timeEnd = noop;
  console.timeLog = noop;
  console.assert = noop;
  console.clear = noop;
  console.count = noop;
  console.countReset = noop;

  // Silence ALL window errors
  window.onerror = () => true;
  window.onunhandledrejection = () => true;

  // Block all error event listeners
  window.addEventListener('error', (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    return false;
  }, true);

  window.addEventListener('unhandledrejection', (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    return false;
  }, true);

  // Make console read-only so nothing can override it
  try {
    Object.defineProperty(window, 'console', {
      value: window.console,
      writable: false,
      configurable: false,
    });
  } catch (e) {
    // Ignore if already defined
  }
}

export {};
